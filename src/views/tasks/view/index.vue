<template>
	<ion-page>
		<ion-header>
			<ion-toolbar>
				<ion-buttons slot="start">
					<ion-back-button default-href="/"></ion-back-button>
				</ion-buttons>
				<ion-title>{{ title !== "" ? title : "Без названия" }}</ion-title>
			</ion-toolbar>
		</ion-header>

		<ion-content :fullscreen="true">
			<section class="content">
				<ion-card v-for="task in tasks">
					<img v-if="task.image" alt="Silhouette of mountains"
						 src="https://ionicframework.com/docs/img/demos/card-media.png" />
					<ion-card-header>
						<ion-card-title>
							<ion-row>
								<ion-col class="ion-no-padding">

									<ion-chip :class="`ion-no-margin ${task.status.toLowerCase()}`">

										<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
											 fill="currentColor" class="bi bi-check-all" viewBox="0 0 16 16"
											 v-if="task.status === 'DONE'">
											<path
												d="M8.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L2.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093L8.95 4.992zm-.92 5.14.92.92a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 1 0-1.091-1.028L9.477 9.417l-.485-.486z" />
										</svg>
										<ion-spinner v-if="task.status === 'NEW'" name="dots"></ion-spinner>
										<ion-label style="margin-left: .25rem">
											{{ statusesRU[task.status] }}
										</ion-label>
									</ion-chip>
								</ion-col>
								<ion-col size="auto" class="ion-no-padding">
									<ion-chip v-if="dateDeadline < Date.now() / 1e3" color="danger"
											  class="ion-no-margin">
										<ion-label> Просрочена</ion-label>
									</ion-chip>

									<ion-chip v-if="task.isImportant === 'IMPORTANT'" color="warning"
											  class="ion-no-margin ms-3">
										<ion-label>
											{{
												task.isImportant === "IMPORTANT"
													? "🔥"
													: ""
											}}
										</ion-label>
									</ion-chip>
								</ion-col>
							</ion-row>
							<ion-row>
								<ion-col class="ion-no-padding">
									<h1>
										{{
											task.description
												? task.description
												: "Без названия"
										}}
									</h1>
								</ion-col>
							</ion-row>
						</ion-card-title>
						<ion-card-subtitle v-if="dateDeadline" class="">
							до {{ formatDateToLocaleString(dateDeadline) }}
						</ion-card-subtitle>
					</ion-card-header>
					<ion-card-content class="ion-no-padding">
						<ion-list :inset="false">
							<ion-item :button="true" :detail="false" @click="() => openUser(task.authorId)">
								<ion-label>
									<h2>Постановщик</h2>
									<p>{{ task.author }}</p>
								</ion-label>
							</ion-item>
							<ion-item v-if="task.responsibles" :button="true"
									  :detail="task.responsibles.length >0 ? true : false"
									  @click="() => openResponsibles(task.taskUID)">
								<ion-label>
									<h2>Ответственные</h2>
									<p>
										<!-- Проверяем, есть ли исполнители -->
										<span v-if="task.responsibles.length === 0">
											Не указаны
										</span>
										<span v-else>
											<!-- Выводим список всех исполнителей -->
											<span v-for="(responsible, index) in task.responsibles"
												  :key="responsible.responsibleId">
												{{ responsible.responsible }}<span
												v-if="index < task.responsibles.length - 1">, </span>
											</span>
										</span>
									</p>
								</ion-label>

							</ion-item>
							<ion-item v-if="task.performers" :button="true" :detail="false"
									  @click="() => editTask(task.taskUID)">
								<ion-label>
									<h2>Исполнители</h2>
									<p>
										<!-- Проверяем, есть ли исполнители -->
										<span v-if="task.performers.length === 0">
											⚠️ Исполнители не указаны
										</span>
										<span v-else>
											<!-- Выводим список всех исполнителей -->
											<span v-for="(performer, index) in task.performers"
												  :key="performer.performerId">
												{{ performer.performer }}<span
												v-if="index < task.performers.length - 1">, </span>
											</span>
										</span>
									</p>
								</ion-label>

							</ion-item>
							<ion-item v-else :button="true" :detail="true" @click="() => openUser(task.performerId)">
								<ion-label>
									<h2>Исполнитель</h2>
									<p>
										{{
											task.performerId === ""
												? "⚠️ Исполнитель не указан"
												: task.performer
										}}
									</p>
								</ion-label>
							</ion-item>

							<ion-item>
								<ion-label>
									<h2>Открыто</h2>
									<p>
										{{
											formatDateToLocaleString(
												task.dateCreated,
											)
										}}
									</p>
								</ion-label>
							</ion-item>

							<ion-item>
								<ion-label>
									<h2>Крайний срок</h2>
									<p>
										{{
											formatDateToLocaleString(
												dateDeadline,
											)
										}}
									</p>
								</ion-label>
							</ion-item>

							<ion-item v-if="
								timeToDeadline !== false &&
								timeToDeadline !== ''
							" class="fadeIn">
								<ion-label>
									<h2>Осталось</h2>
									<p>{{ timeToDeadline }}</p>
								</ion-label>
							</ion-item>

							<!-- <ion-item lines="none">
								<ion-label>
									<h2>Заголовок</h2>
									<p>Текст</p>
								</ion-label>
							</ion-item> -->
							<ion-item v-if="task.responsibles" :button="true"
									  :detail="task_comments.length >0"
									  @click="() => openComments(task.taskUID)">
								<ion-label>
									<h2>Комментарии</h2>
									<p>
										<!-- Проверяем, есть ли комментарии -->
										<span v-if="task_comments.length === 0">
											Не указаны
										</span>
										<span v-else>
											<!-- Выводим список всех комментариев -->
											<span v-for="comment in task_comments">
												<div>{{ comment.author }} - {{ comment.comment }}</div>

											</span>
										</span>
									</p>
								</ion-label>
							</ion-item>


							<ion-item-divider>
								<ion-label>
									Прикреплённые файлы (пример)
								</ion-label>
							</ion-item-divider>
<!--							<ion-item-divider>-->
<!--								<ion-label>-->
<!--									Комментарии-->
<!--									<ion-label v-for="comment in task_comments">{{ comment.comment }}</ion-label>-->
<!--									<ion-label>{{ task.comment }}</ion-label>-->
<!--								</ion-label>-->
<!--							</ion-item-divider>-->

							<ion-item class="attachment-item" v-for="file in attachments"
									  @click="openFile(file.secureUrl)" :button="true" :detail="true">
								<ion-thumbnail slot="start">
									<img v-if="file.file_type.includes('image')" alt="Silhouette of mountains"
										 :src="file.secureUrl" />
								</ion-thumbnail>
								<ion-label>
									<h3>Имя файла</h3>
									<p>{{ file.title }}</p>
								</ion-label>
							</ion-item>
						</ion-list>
					</ion-card-content>
				</ion-card>
			</section>
		</ion-content>

		<ion-footer>
			<ion-row>
				<ion-col class="ion-no-padding">
					<ion-button expand="block" fill="clear" color="info	" @click="editTask(taskUID)">
						Редактировать
					</ion-button>
				</ion-col>

				<ion-col v-if="!task_is_done" class="ion-no-padding">
					<ion-button v-if="!task_is_done" expand="full" fill="clear" color="danger"
								@click="completeTaskAlert">
						Завершить
					</ion-button>
				</ion-col>
			</ion-row>
		</ion-footer>


		<ion-modal v-if="successModalOpen" :is-open="successModalOpen" @didDismiss="closeModal" :initial-breakpoint="1"
				   :breakpoints="[0, 1]">
			<div class="block ion-padding">
				<div class="modal-content" v-if="!pending">
					<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="currentColor"
						 class="bi bi-calendar2-check" viewBox="0 0 16 16">
						<path
							d="M10.854 8.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L7.5 10.793l2.646-2.647a.5.5 0 0 1 .708 0" />
						<path
							d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M2 2a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1z" />
						<path d="M2.5 4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H3a.5.5 0 0 1-.5-.5z" />
					</svg>
					<p>Задача завершена</p>
					<ion-button expand="block" @click="router.push('/tasks')">Перейти к списку задач</ion-button>
				</div>
				<div class="modal-content pending" v-else>Сохранение...</div>
			</div>
		</ion-modal>

	</ion-page>
</template>

<script setup lang="ts">
import {
	IonCard,
	IonCardContent,
	IonCardHeader,
	IonCardSubtitle,
	IonCardTitle,
	IonChip,
	IonCol,
	IonRow,
	IonThumbnail,
	IonSegment,
	IonSegmentButton,
	IonSearchbar,
	IonButton,
	IonLabel,
	IonModal,
	IonIcon,
	IonItemDivider,
	IonFooter,
	IonList,
	IonItem,
	IonPage,
	IonHeader,
	IonToolbar,
	IonTitle,
	IonContent,
	IonButtons,
	IonBackButton,
	IonSpinner,
	alertController,
} from "@ionic/vue";

import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { Haptics, ImpactStyle } from "@capacitor/haptics";
import { Task } from "@/interfaces/task.interface";
import store from "@/store";
import { eventBus } from "@/eventBus";

import { TaskService } from "@/services/task.service";

const router = useRouter();

const tasks = ref<Task[]>([]);

const taskUID = ref("");

const title = ref("");

const dateDeadline = ref(0);

const task_is_done = ref(false);

const timeToDeadline = ref("" as string | false);

const successModalOpen = ref(false);

const pending = ref(false);

const statusesRU: { [key: string]: string } = {
	"NEW": "НОВАЯ",
	"DONE": "ЗАВЕРШЕНА",
};

const attachments = ref([
	{
		secureUrl: "https://ionicframework.com/docs/img/demos/card-media.png",
		title: "title.png",
		file_type: "image/png",
	},

	{
		secureUrl: "https://ionicframework.com/docs/img/demos/card-media.png",
		title: "title.jpg",
		file_type: "image/jpg",
	},
]);

const task_comments = ref([]);

const fetchTaskData = async () => {
	const id = router.currentRoute.value.params.id;
	taskUID.value = Array.isArray(id) ? id[0] : id;
	tasks.value = await TaskService.getTaskByUID(taskUID.value);

	console.log(tasks.value);

	task_comments.value = await TaskService.getTaskComments(taskUID.value);

	console.log("TASKCOMMENTS VALUE:", task_comments.value);

	// if (store.state.crutches) {
	// 	dateDeadline.value = parseInt(
	// 		router.currentRoute.value.query.dateDeadline?.toString()
	// 	);
	// }

	dateDeadline.value = tasks.value[0].dateDeadline;
	console.log(dateDeadline.value);

	title.value = tasks.value[0].description;

	task_is_done.value = tasks.value[0].status === "DONE";

	setInterval(() => {
		timeToDeadline.value = getTimeRemaining(dateDeadline.value);
	}, 1000);


};

eventBus.on("taskUpdated", () => {
		fetchTaskData();
	},
);

onMounted(async () => {
	fetchTaskData();
});

const getTimeRemaining = (timestamp: number): string | false => {
	const now = new Date().getTime();
	const targetTime = timestamp * 1000; // Convert seconds to milliseconds

	const timeDifference = targetTime - now;

	if (timeDifference <= 0) {
		return false; // The target time has passed
	}

	const days = String(
		Math.floor(timeDifference / (1000 * 60 * 60 * 24)),
	).padStart(2, "0");
	const hours = String(
		Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
	).padStart(2, "0");
	const minutes = String(
		Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60)),
	).padStart(2, "0");
	const seconds = String(
		Math.floor((timeDifference % (1000 * 60)) / 1000),
	).padStart(2, "0");

	return `${days}дн. ${hours}:${minutes}:${seconds}`;
};

const formatDateToLocaleString = (
	unixTimestamp: number,
	locale: string = "ru-RU",
	options?: Intl.DateTimeFormatOptions,
): string => {
	const date = new Date(unixTimestamp * 1e3);

	const defaultOptions: Intl.DateTimeFormatOptions = {
		year: "numeric",
		month: "long",
		day: "numeric",
		hour: "2-digit",
		minute: "2-digit",
	};

	const formatOptions = { ...defaultOptions, ...options };

	return date.toLocaleString(locale, formatOptions);
};

const openUser = (id: string) => {
	router.push(`/users/${id}`);
};

const openResponsibles = (taskUID: string) => {
	router.push(`/tasks/responsibles/${taskUID}`);
};

const openComments = (taskUID: string) => {
	router.push(`/tasks/comments/${taskUID}`);
};

const editTask = (taskUID: string) => {
	router.push(
		{
			path: `/tasks/edit/${taskUID}`,
		},
	);
};

import { Browser } from "@capacitor/browser";

const openFile = (url: string) => {
	Browser.open({ url: url, presentationStyle: "popover" });
};

const closeModal = () => {
	successModalOpen.value = false;
	// router.go(-1);
};

const completeTaskAlert = async () => {
	const alert = await alertController.create({
		header: "Закрыть задачу",
		message: "Вы собираетесь закрыть задачу. Продолжить?",
		buttons: [
			{
				text: "Отмена",
				role: "cancel",
				htmlAttributes: {
					"aria-label": "отмена",
				},
				handler: () => {
					console.log("Код отмены");
				},
			},
			{
				text: "Закрыть задачу",
				role: "destructive",
				htmlAttributes: {
					"aria-label": "Закрыть задачу",
				},
				handler: async () => {
					console.log("Код закрытия задачи.");
					let result = await TaskService.completeTask(taskUID.value).then(() => {
						successModalOpen.value = false;
						Haptics.notification({ style: ImpactStyle.Light });
					});
				},
			},
		],
	});

	await alert.present();
};
</script>

<style scoped>
ion-fab-button {
	--border-radius: 128px;
	--box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.3),
	0px 1px 3px 1px rgba(0, 0, 0, 0.15);
	--color: black;
}

ion-card {
	/* box-shadow: 0px 0.8px 2.2px rgba(0, 0, 0, 0.05),
		0px 2px 5.3px rgba(0, 0, 0, 0.036), 0px 3.8px 10px rgba(0, 0, 0, 0.03),
		0px 6.7px 17.9px rgba(0, 0, 0, 0.025),
		0px 12.5px 33.4px rgba(0, 0, 0, 0.02),
		0px 30px 80px rgba(0, 0, 0, 0.014) !important; */
	border-radius: 0.75rem;
}

ion-chip {
	border-radius: 0.5rem !important;
}

section.content {
	background-color: #f2f2f2 !important;
	padding-top: 0.75rem !important;
}

ion-footer {
	background-color: #fff !important;
}

ion-thumbnail {
	--size: 64px;
	--border-radius: .5rem;
	aspect-ratio: 1 / 1;
}

.attachments-content {
	padding-block: 0.75rem;
	padding-inline: 0 !important;
}

.attachments-card {
	border-radius: 1rem;
}

ion-item-divider {
	--background: transparent;
	--color: #171717;

	--padding-top: 10px;
	--padding-bottom: 10px;
	--padding-start: 20px;
	--padding-end: 20px;
}

.attachment-item {
	margin-bottom: 1rem !important;
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

ion-chip {
	border-radius: 0.5rem !important;

	&.new {
		padding: 0 !important;
		--background: #fff !important;
		--color: var(--ion-color-primary) !important;
		/* border: 1px solid var(--ion-color-primary) !important; */
	}

	&.done {
		padding: 0 !important;
		--background: #fff !important;
		--color: green !important;
		/* border: 1px solid var(--ion-color-medium) !important; */
	}
}
</style>
