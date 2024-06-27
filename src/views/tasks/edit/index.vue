<template>
	<ion-page>
		<ion-header>
			<ion-toolbar>
				<ion-buttons slot="start">
					<ion-back-button default-href="/"></ion-back-button>
				</ion-buttons>
				<ion-title>Редактировать задачу</ion-title>
			</ion-toolbar>
		</ion-header>
		<ion-content :fullscreen="true">
			<ion-list :inset="false">
				<ion-item>
					<ion-checkbox
						justify="space-between"
						:checked="task_is_important"
						v-model="task_is_important"
						@ionClick="task_is_important = !task_is_important"
						>🔥 Это срочная задача</ion-checkbox
					>
				</ion-item>

				<ion-item>
					<ion-select
						label="Исполнитель"
						:interface-options="customAlertOptions"
						:inputs="alertInputs"
						label-placement="floating"
						:value="task?.performer"
						@ionChange="selectUser"
					>
						<ion-select-option
							v-for="user in users"
							:value="user.worker"
						>
							{{ user.worker }}
						</ion-select-option>
					</ion-select>
				</ion-item>

				<ion-item justify="space-between">
					<ion-label>Срок</ion-label>
					<ion-datetime-button
						datetime="datetime"
						:show-default-buttons="true"
					></ion-datetime-button>
				</ion-item>

				<ion-item>
					<ion-textarea
						v-model="task_description"
						label="Описание задачи"
						label-placement="floating"
						placeholder="Введите описание задачи"
						:auto-grow="true"
						:counter="true"
						:maxlength="256"
					>
					</ion-textarea>
				</ion-item>
			</ion-list>
		</ion-content>

		<ion-footer>
			<ion-button expand="block" color="danger"
				@click="updateTask()"
				>Сохранить изменения</ion-button
			>
		</ion-footer>

		<ion-modal :keep-contents-mounted="true">
			<ion-datetime
				id="datetime"
				ref="datetime"
				:value="dateDeadline"
				:format-options="formatOptions"
			>
				<span slot="title">Дата выполнения задачи</span>
				<ion-buttons slot="buttons">
					<ion-button color="primary" @click="cancel()"
						>Отмена</ion-button
					>
					<ion-button color="danger" @click="reset()"
						>Сброс</ion-button
					>
					<ion-button color="primary" @click="confirm()"
						>Готово</ion-button
					>
				</ion-buttons>
			</ion-datetime>
		</ion-modal>


		<ion-modal
			:is-open="successModalOpen"
			@didDismiss="closeModal"
			:initial-breakpoint="1"
			:breakpoints="[0, 1]"
		>
			<div class="block ion-padding">
				<div class="modal-content" v-if="!pending">
					<p>Задача обновлена</p>
					<ion-button expand="block" @click="openTask(taskUID)"
						>Перейти к задаче</ion-button
					>
				</div>
				<div class="modal-content pending" v-else>Сохранение...</div>
			</div>
		</ion-modal>

	</ion-page>
</template>

<script setup lang="ts">
import {
	IonPage,
	IonHeader,
	IonToolbar,
	IonTitle,
	IonContent,
	IonButtons,
	IonButton,
	IonBackButton,
	IonDatetimeButton,
	IonList,
	IonLabel,
	IonItem,
	IonTextarea,
	IonCheckbox,
	IonSelect,
	IonSelectOption,
	IonModal,
	IonDatetime,
	IonFooter,
} from "@ionic/vue";
import { ref, onMounted } from "vue";

function isoToUnixTimestamp(dateString: string): number {
  const date = new Date(dateString);
  const timestamp = Math.floor(date.getTime() / 1000);
  console.log(timestamp);
  return timestamp;
}


const customAlertOptions = {
	header: "Исполнитель",
	message: "Выберите ответственного из списка сотрудников",
	translucent: true,
};

const alertInputs = [
	{
		placeholder: "Name",
	},
	{
		placeholder: "Nickname (max 8 characters)",
		attributes: {
			maxlength: 8,
		},
	},
	{
		type: "number",
		placeholder: "Age",
		min: 1,
		max: 100,
	},
	{
		type: "textarea",
		placeholder: "A little about yourself",
	},
];

import { User } from "@/interfaces/user.interface";
import { UserService } from "@/services/user.service";

import { Haptics, ImpactStyle } from "@capacitor/haptics";
import store from "@/store";
import { useRouter } from "vue-router";

import { TaskService } from "@/services/task.service";
import { Task } from "@/interfaces/task.interface";

const users = ref<User[]>([]);
const taskUID = ref();
const router = useRouter();
const task = ref<Task>();
const dateDeadline = ref("");

const task_performer = ref("");
const task_performer_id = ref(0);
const task_description = ref("");

const task_is_important = ref(false);

const datetime = ref();
const reset = () => datetime.value?.$el.reset();
const cancel = () => datetime.value?.$el.cancel(true);

const successModalOpen = ref(false);
const pending = ref(false);

const confirm = () => {
	datetime.value?.$el.confirm(true);
	console.log(datetime.value.$el.value);
	dateDeadline.value = isoToUnixTimestamp(datetime.value.$el.value).toString();
};

onMounted(async () => {
	// поставить задачу можно только активному пользователю
	users.value = await UserService.getUsers();

	let _users = [...users.value];

	// Администратор у нас INACTIVE поэтому если задача назначена ему, то его не будет в списке!
	_users = [...users.value].filter((user) => {
		return user.userStatus !== "ACTIVE";
	});

	// console.log(users.value);
	// console.log(_users);

	users.value = _users;

	taskUID.value = router.currentRoute.value.params.id;

	task.value = await TaskService.getTaskByUID(taskUID.value);
	task.value = task.value[0];

	task_description.value = task.value?.description;

	dateDeadline.value = convertTimestamp(task.value.dateDeadline);

	console.log(task.value);

	task_is_important.value = (task?.isImportant === 'IMPORTANT') ? false : true;

	console.log(task_is_important.value);
});

const closeModal = () => {
	successModalOpen.value = false;
	router.go(-1);
};

const openTask = (taskUID: string) => {
	successModalOpen.value = false;
	router.push(-1);
};

const selectUser = (event: any) => {
	let user_idx = users.value.findIndex(
		(user) => user.worker === event.target.value
	);
	task_performer_id.value = users.value[user_idx].oid;
	task_performer.value = event.target.value;

	console.log(task_performer_id.value);
	console.log(task_performer.value);
};

const getLocalTimezoneOffset = (): number => {
	return new Date().getTimezoneOffset() / -60;
};

const convertTimestamp = (timestamp: number): string => {
	const date = new Date(timestamp * 1000);
	const timezoneOffset = getLocalTimezoneOffset();
	const offsetInMilliseconds = timezoneOffset * 60 * 60 * 1000;
	const adjustedDate = new Date(date.getTime() + offsetInMilliseconds);
	return adjustedDate.toISOString().slice(0, -1); // Remove the 'Z' at the end to reflect local time
};

const formatOptions = {
	date: {
		weekday: "short",
		month: "long",
		day: "2-digit",
		year: "numeric",
	},
	time: {
		hour: "2-digit",
		minute: "2-digit",
	},
};

import { eventBus } from "@/eventBus.js";

const updateTask = async () => {
	let _data = {
		taskUID: taskUID.value,
		dateCreated: task.value?.dateCreated,
		dateDeadline: dateDeadline.value.length > 10 ? isoToUnixTimestamp(dateDeadline.value) : dateDeadline.value	,
		author: task.value?.author,
		authorId: task.value?.authorId,
		performer: task_performer.value,
		performerId: task_performer_id.value,
		description: task_description.value,
		status: task.value?.status,
		isImportant: task_is_important.value ? "IMPORTANT" : "ORDINARY",
	};

	console.log(_data);

	await TaskService.updateTask(_data).then(async (response) => {
		if (response.success) {
			// show success alert
			Haptics.notification({ style: ImpactStyle.Light });
			successModalOpen.value = true;
			console.log(response.taskUID);

			let _updated_task = await TaskService.getTaskByUID(taskUID.value);
			console.log(_updated_task);

			eventBus.emit("taskUpdated");
		} else {
			// show error alert
			// router.push(-1);
		}
	});
};
</script>

<style scoped>
ion-content {
	--background: #fff;
}
ion-fab-button {
	--border-radius: 128px;
	--box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.3),
		0px 1px 3px 1px rgba(0, 0, 0, 0.15);
	--color: black;
}

ion-footer ion-button {
	height: 44px;
	margin: 0 !important;
	--border-radius: 0 !important;
}

ion-list ion-item:last-child {
	--inner-border-width: 0;
}

ion-modal {
	--height: auto;
}
</style>
