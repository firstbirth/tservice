<template>
	<ion-page>
		<ion-header>
			<ion-toolbar>
				<ion-buttons slot="start">
					<ion-back-button default-href="/"></ion-back-button>
				</ion-buttons>
				<ion-title>Поставить задачу</ion-title>
			</ion-toolbar>
		</ion-header>
		<ion-content :fullscreen="true">
			<ion-list>
				<ion-item>
					<ion-checkbox
						justify="space-between"
						v-model="task_is_important"
						>🔥 Это срочная задача</ion-checkbox
					>
				</ion-item>

				<ion-item>
					<ion-select
						label="Исполнитель"
						:interface-options="customAlertOptions"
						@ionChange="selectUser"
						label-placement="floating"
					>
						<ion-select-option v-for="user in users">
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
			<ion-button expand="block" color="primary" @click="submitTask()"
				>Поставить задачу</ion-button
			>
		</ion-footer>

		<ion-modal :keep-contents-mounted="true">
			<ion-datetime
				id="datetime"
				ref="datetime"
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
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="64"
						height="64"
						fill="currentColor"
						class="bi bi-calendar2-check"
						viewBox="0 0 16 16"
					>
						<path
							d="M10.854 8.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L7.5 10.793l2.646-2.647a.5.5 0 0 1 .708 0"
						/>
						<path
							d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M2 2a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1z"
						/>
						<path
							d="M2.5 4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H3a.5.5 0 0 1-.5-.5z"
						/>
					</svg>
					<p>Задача поставлена</p>
					<ion-button expand="block" @click="openTask(newTaskUID)"
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
	IonItemDivider,
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
	return Math.floor(date.getTime() / 1000);
}

const customAlertOptions = {
	header: "Исполнитель",
	message: "Выберите ответственного из списка сотрудников",
	translucent: true,
};

import { User } from "@/interfaces/user.interface";
import { UserService } from "@/services/user.service";
import { TaskService } from "@/services/task.service";

import { Haptics, ImpactStyle } from "@capacitor/haptics";

import store from "@/store";
import { useRouter } from "vue-router";

const router = useRouter();

const successModalOpen = ref(false);
const newTaskUID = ref();
const pending = ref(false);

const users = ref<User[]>([]);

const task_is_important = ref(false);
const task_deadline = ref(new Date(Date.now()).getTime() / 1000);
const task_author = ref("");
const task_author_id = ref(0);
const task_description = ref("");
const task_performer = ref("");
const task_performer_id = ref(0);

onMounted(async () => {
	// поставить задачу можно только активному пользователю
	users.value = await UserService.getUsers();

	let _users = [...users.value];

	_users = [...users.value].filter((user) => {
		return user.userStatus !== "ACTIVE";
	});

	// console.log(users.value);
	// console.log(_users);

	users.value = _users;

	task_author.value = store.state.username;
	task_author_id.value = store.state.userid;
});

const selectUser = (event: any) => {
	let user_idx = users.value.findIndex(
		(user) => user.worker === event.target.value
	);
	task_performer_id.value = users.value[user_idx].oid;
	task_performer.value = event.target.value;

	console.log(task_performer_id.value);
	console.log(task_performer.value);
};

const datetime = ref();

const reset = () => datetime.value?.$el.reset();
const cancel = () => datetime.value?.$el.cancel(true);

const confirm = () => {
	datetime.value?.$el.confirm(true);
	task_deadline.value = isoToUnixTimestamp(datetime.value.$el.value);
};

const openTask = (taskUID: string) => {
	router.push({ path: `/tasks/${taskUID}` });
	successModalOpen.value = false;
};

const closeModal = () => {
	successModalOpen.value = false;
	// router.go(-1);
};

const submitTask = async () => {
	let _data = {
		dateCreated: Math.round(new Date(Date.now()).getTime() / 1000),
		dateDeadline: task_deadline.value.toFixed(2),
		author: store.state.crutches ? "Администратор" : task_author.value,
		authorId: store.state.crutches ? 1 : task_author_id.value,
		performer: task_performer.value,
		performerId: task_performer_id.value,
		description: task_description.value,
		status: "NEW",
		isImportant: task_is_important.value ? "IMPORTANT" : "ORDINARY",
	};

	console.log(_data);

	await TaskService.createTask(_data).then((response) => {
		if (response.success) {
			// show success alert
			Haptics.notification({ style: ImpactStyle.Light });
			successModalOpen.value = true;
			newTaskUID.value = response.taskUID;
			console.log("TASKDATAINFO:", response);
		} else {
			// show error alert
			// router.push(-1);
		}
	});
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
</script>

<style scoped>
ion-fab-button {
	--border-radius: 50%;
	--box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.3),
		0px 1px 3px 1px rgba(0, 0, 0, 0.15);
	--color: black;
}
ion-modal {
	--height: auto;
}

.modal-content {
	text-align: center;
}

ion-footer ion-button {
	height: 44px;
	margin: 0 !important;
	--border-radius: 0 !important;
}

ion-list ion-item:last-child {
	--inner-border-width: 0;
}
</style>
