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
					>🔥 Это срочная задача
					</ion-checkbox
					>
				</ion-item>

				<ion-item>
					<ion-select
						label="Исполнитель"
						:interface-options="customAlertOptions"
						label-placement="floating"
						:value="task?.performers"
						@ionChange="selectUser"
						:multiple="true"
					>
						<ion-select-option
							v-for="user in users"
							:key="user.oid"
							:value="user.worker"
						>
							{{ user.worker }}
						</ion-select-option>
					</ion-select>
				</ion-item>
				<ion-item>
					<ion-select
						label="Ответственные"
						:interface-options="customAlertOptions"
						label-placement="floating"
						:value="task?.responsibles"
						@ionChange="selectResponsible"
						:multiple="false"
					>
						<ion-select-option
							v-for="user in users"
							:key="user.oid"
							:value="user.worker"
						>
							{{ user.worker }}
						</ion-select-option>
					</ion-select>
				</ion-item>

				<ion-item :button="true" :detail="true" @click="() => openModal()">
					<ion-label>
						<h2>Исполнитель с ролью</h2>
						<p>
						</p>
					</ion-label>
					<ion-modal :is-open="modal" expand="block">
						<ion-toolbar>
							<ion-title>Все с ролью</ion-title>
							<ion-button @click="closeModalResponsible" slot="end" color="danger" expand="block">
								Закрыть
							</ion-button>

						</ion-toolbar>
						<div class="block ion-padding">
							<div class="modal-content" v-if="!pending">
								<ion-select
									label="Все пользователи с ролью:"
									:interface-options="customAlertOptions"
									label-placement="floating"
									:value="task?.performers"
									@ionChange="selectUserGroup"
								>
									<ion-select-option
										v-for="role in userGroups"
										:value="role"
									>
										{{ role }}
									</ion-select-option>
								</ion-select>
								<ion-button expand="block"
											@click="commitContractorsByGroup">
									Назначить
								</ion-button>
								<div v-if="errorMessage" class="error-message">
									<ion-text color="danger">
										<p>{{ errorMessage.message }}</p>
									</ion-text>
								</div>
								<ion-toast trigger="modal" message="This toast will disappear after 5 seconds"
										   :duration="5000"></ion-toast>

							</div>
						</div>
					</ion-modal>
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
				<ion-item>
					<ion-textarea
						v-model="task_newComment"
						label="Комментарий"
						label-placement="floating"
						placeholder="Добавьте комментарий"
						:auto-grow="true"
						:counter="true"
						:maxlength="256"
					>
					</ion-textarea>
				</ion-item>
			</ion-list>
		</ion-content>

		<ion-footer>
			<ion-button expand="block" color="danger" @click="updateTask()"
			>Сохранить изменения
			</ion-button
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
					>Отмена
					</ion-button
					>
					<ion-button color="danger" @click="reset()"
					>Сброс
					</ion-button
					>
					<ion-button color="primary" @click="confirm()"
					>Готово
					</ion-button
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
					>Перейти к задаче
					</ion-button
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

const isoToUnixTimestamp = (dateString: string): number => {
	const date = new Date(dateString);
	const timestamp = Math.floor(date.getTime() / 1000);
	console.log(timestamp);
	return timestamp;
};

const customAlertOptions = {
	header: "Исполнители",
	message: "Выберите ответственных из списка сотрудников",
	translucent: true,
};

import { User } from "@/interfaces/user.interface";
import { UserService } from "@/services/user.service";

import { Haptics, ImpactStyle } from "@capacitor/haptics";
import store from "@/store";
import { useRouter } from "vue-router";

import { TaskService } from "@/services/task.service";
import { Task, Performer } from "@/interfaces/task.interface";

const users = ref<User[]>([]);
const taskUID = ref();
const router = useRouter();
const task = ref<Task>();
const dateDeadline = ref("");

const errorMessage = ref("");

const modal = ref(false);
const selectedComment = ref({});

const task_performer = ref<string[]>([]);
const task_performer_id = ref<string[]>([]);
const task_performer_ids = ref<string>("");
const task_description = ref("");
const task_newComment = ref("");
const task_is_important = ref(false);

const datetime = ref();
const reset = () => datetime.value?.$el.reset();
const cancel = () => datetime.value?.$el.cancel(true);

const successModalOpen = ref(false);
const pending = ref(false);

const confirm = () => {
	datetime.value?.$el.confirm(true);
	console.log(datetime.value.$el.value);
	dateDeadline.value = isoToUnixTimestamp(
		datetime.value.$el.value,
	).toString();
};

const task_comments = ref([]);

const userGroups: string[] = [
	"Админы",
	"Менеджер",
	"Склад",
	"Инженер",
];

const userTaskRoles: { [key: string]: string } = {
	"Администратор": "Администратор",
	"Директор": "Директор",
	"Кладовщик": "Кладовщик",
	"Мастер Приемщик": "МастерПриемщик",
	"Менеджер": "Менеджер",
	"Руководитель Подразделения": "РуководительПодразделения",
	"Сервис": "Сервис",
};

onMounted(async () => {
	// поставить задачу можно только активному пользователю
	users.value = await UserService.getUsers();

	let _users = [...users.value];

	// Администратор у нас INACTIVE поэтому если задача назначена ему, то его не будет в списке!
	_users = [...users.value].filter((user) => {
		return user.userStatus !== "ACTIVE";
	});

	console.log("USERS VALUE", users.value);
	console.log("_USERS VALUE", _users);

	users.value = _users;

	taskUID.value = router.currentRoute.value.params.id;

	task.value = await TaskService.getTaskByUID(taskUID.value);
	task.value = task.value[0];

	task_description.value = task.value?.description;

	console.log("TASK_PERFORMERS:", task.value?.performers);

	dateDeadline.value = convertTimestamp(task.value.dateDeadline);

	console.log(task.value);

	task_is_important.value = task?.isImportant === "IMPORTANT" ? false : true;

	task_comments.value = await TaskService.getTaskComments(taskUID.value);
	console.log("TASK COMMENTS:", task_comments.value);
	console.log(task_is_important.value);
});

const closeModal = () => {
	successModalOpen.value = false;
	router.go(-1);
};

const openModal = () => {
	modal.value = true;
};

const closeModalResponsible = () => {
	modal.value = false;
	errorMessage.value = "";
};

const openTask = (taskUID: string) => {
	successModalOpen.value = false;
	router.push(-1);
};

const roleAssignment = {
	UserGroup: "",  // Например, "Админы"
	TaskRole: "",    // Например, "Менеджеры"
};

const selectUserGroup = (event: any) => {
	console.log("USERGROUP:", event.target.value);
	roleAssignment.UserGroup = event.target.value;
};

const selectTaskRole = (event: any) => {
	console.log("TASKROLE:", event.target.value);
	console.log("FROM DICT", userTaskRoles[event.target.value]);
	roleAssignment.TaskRole = userTaskRoles[event.target.value];
	console.log("ROLEASSIGNMENT", roleAssignment);
};

const selectUser = (event: any) => {
	// Получаем массив выбранных пользователей
	const selectedUsers = event.target.value;

	console.log(selectedUsers);

	// Массив для хранения выбранных пользователей (id и имен)
	const selectedUserIds: string[] = [];
	const selectedUserNames: string[] = [];
	const selectedUserNamesRoles: string[] = [];

	// Проходим по каждому выбранному пользователю
	selectedUsers.forEach((userName: string) => {
		const userIdx = users.value.findIndex(
			(user) => user.worker === userName,
		);

		if (userIdx !== -1) {
			// Добавляем в массивы id и имя пользователя
			selectedUserIds.push(users.value[userIdx].oid.toString());
			selectedUserNames.push(userName);
			selectedUserNamesRoles.push(users.value[userIdx].role);

		}
	});

	console.log("selectedUserIds", selectedUserIds);

	// Обновляем значения для task_performer и task_performer_id
	task_performer_id.value = selectedUserIds;
	task_performer.value = selectedUserNames;

	const userIdsString = `[${selectedUserIds.join(", ")}]`;
	// Выводим в консоль для проверки
	// console.log('Selected user IDs:', selectedUserIds);
	// console.log('Selected user names:', selectedUserNames);

	// console.log('Selected user roles:', selectedUserNamesRoles);
	// console.log('string userids:', userIdsString);

	task_performer_ids.value = userIdsString;
	console.log("TASK_PERFORMER_IDS:", task_performer_ids.value);
};

const selectedResponsibleIds = ref("");
const selectedResponsibleNames: string[] = [];
const selectedResponsibleNamesWorker = ref("");

const selectResponsible = (event: any) => {
	// Получаем массив выбранных пользователей
	const selectedResponsibles = event.target.value;

	console.log("SELECT_REsponsible", selectedResponsibles);

	if (selectedResponsibles.length > 0) {
		const userName = selectedResponsibles;

		const userIdx = users.value.findIndex(
			(user) => user.worker === userName,
		);

		if (userIdx !== -1) {
			// Добавляем id и имя пользователя
			selectedResponsibleIds.value = users.value[userIdx].oid.toString();
			selectedResponsibleNames.push(userName);
			selectedResponsibleNamesWorker.value = users.value[userIdx].worker;
		}
	}

	console.log("selectedResponsiblesIds", selectedResponsibleIds);
	console.log("selectedResponsiblesWorker", selectedResponsibleNamesWorker);

	// Обновляем значения для task_performer и task_performer_id
	// task_performer_id.value = selectedUserIds;
	// task_performer.value = selectedUserNames;
	//
	// const userIdsString = `[${selectedUserIds.join(", ")}]`;
	// Выводим в консоль для проверки
	// console.log('Selected user IDs:', selectedUserIds);
	// console.log('Selected user names:', selectedUserNames);

	// console.log('Selected user roles:', selectedUserNamesRoles);
	// console.log('string userids:', userIdsString);

	// task_performer_ids.value = userIdsString;
	// console.log("TASK_PERFORMER_IDS:", task_performer_ids.value);
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

const commitContractorsByGroup = async () => {
	let data = await TaskService.AddContractorsByGroup(taskUID.value, roleAssignment.UserGroup);

	if (data === true) {
		modal.value = false;
	} else {
		errorMessage.value = data.data[0];
	}
	console.log(data);
};

const updateTask = async () => {
	let _data = {
		taskUID: taskUID.value,
		dateCreated: task.value?.dateCreated,
		dateDeadline:
			dateDeadline.value.length > 10
				? isoToUnixTimestamp(dateDeadline.value)
				: dateDeadline.value,
		author: task.value?.author,
		authorId: task.value?.authorId,
		performers: task_performer_ids.value,
		description: task_description.value,
		status: task.value?.status,
		isImportant: task_is_important.value ? "IMPORTANT" : "ORDINARY",
		isExpired: task.value?.isExpired,
	};

	console.log("_DATA", _data);

	if (task_newComment.value !== "") {
		let data = await TaskService.addComment(_data.taskUID, _data.dateCreated, _data.dateCreated, _data.author, _data.authorId, task_newComment.value);
		console.log("DATA FROM ADD COMMENT", data);
	}

	if (selectedResponsibleIds.value.length > 0) {
		let data = await TaskService.addResponsible(_data.taskUID, selectedResponsibleIds.value, selectedResponsibleNamesWorker.value);
		console.log("DATA FROM ADD RESPONSIBLE", data);
	}

	await TaskService.updateTask(_data).then(async (response) => {
		if (response.success) {
			// show success alert
			Haptics.notification({ style: ImpactStyle.Light });
			successModalOpen.value = true;
			console.log(response.taskUID);

			let _updated_task = await TaskService.getTaskByUID(taskUID.value);
			console.log("_updated_task", _updated_task);

			eventBus.emit("taskUpdated");
		} else {
			console.log(response);
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
