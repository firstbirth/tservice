<template>
	<ion-page>
		<ion-header>
			<ion-toolbar>
				<ion-buttons slot="start">
					<ion-back-button default-href="/"></ion-back-button>
				</ion-buttons>
				<ion-title>{{ title !== "" ? title : "Комментарии" }}</ion-title>
			</ion-toolbar>
		</ion-header>

		<ion-content :fullscreen="true">
			<section class="content">
				<ion-card v-for="comment in task_comments">
					<ion-card-content class="ion-no-padding">
						<ion-list lines="none">
							<ion-item v-if="task_comments.length === 0">Комментарии не указаны</ion-item>
							<ion-item v-else :key="comment.id">
								<ion-label>
									<h2>{{ comment.author }}</h2>
									<p>{{ decodeURIComponent(comment.comment)}}</p>
								</ion-label>


							</ion-item>
							<ion-item class="marg">
								<div>
									<ion-button slot="start" color="danger" @click="deleteComment(comment.id)">
										Удалить
									</ion-button>
									<ion-button color="tertiary" @click="openUpdateComment(comment)">
										Редактировать
									</ion-button>
								</div>
							</ion-item>

						</ion-list>
					</ion-card-content>
				</ion-card>
			</section>
		</ion-content>

		<ion-modal :is-open="modal" :initial-breakpoint="1"
				   :breakpoints="[0, 1]">
			<div class="block ion-padding">
				<div class="modal-content" v-if="!pending">
					<ion-textarea
						v-model="selectedComment.comment"
						label="Комментарий"
						label-placement="floating"
						placeholder="Добавьте комментарий"
						:auto-grow="true"
						:counter="true"
						:maxlength="256"
					>
					</ion-textarea>

					<ion-button expand="block"
								@click="saveComment">
						Сохранить
					</ion-button>
				</div>
			</div>
		</ion-modal>


		<ion-modal
			:is-open="successModalOpen"
			@didDismiss="closeModal"
			:initial-breakpoint="1"
			:breakpoints="[0, 1]"
		>
			<div class="block ion-padding">
				<div class="modal-content" v-if="!pending">
					<p>Комментарий удален</p>
					<ion-button expand="block" @click="goBack(taskUID)">Перейти к задаче
					</ion-button>
				</div>
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
	alertController, IonTextarea,
} from "@ionic/vue";

import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { Haptics, ImpactStyle } from "@capacitor/haptics";
import { Task } from "@/interfaces/task.interface";
import store from "@/store";
import { eventBus } from "@/eventBus";

import { TaskService } from "@/services/task.service";

const successModalOpen = ref(false);
const selectedComment = ref({});
const modal = ref(false);

const deleteComment = async (commentUID: string) => {
	let data = await TaskService.deleteComment(commentUID);
	const index = tasks.value[0].responsibles.findIndex(
		(responsible) => responsible.responsibleId === commentUID,
	);

	// Если элемент найден, удаляем его из массива
	if (index !== -1) {
		tasks.value[0].responsibles.splice(index, 1);  // Удаляем из массива
	}

	successModalOpen.value = true;

	eventBus.emit("taskUpdated");
	console.log(tasks.value[0].responsibles);
};

const router = useRouter();

const tasks = ref<Task[]>([]);

const taskUID = ref("");

const title = ref("");

const dateDeadline = ref(0);

const task_is_done = ref(false);

const timeToDeadline = ref("" as string | false);


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

eventBus.on("commentUpdated", () => {
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

const openUpdateComment = (comment) => {
	selectedComment.value = { ...comment };
	modal.value = true;
	// router.push(`/tasks/comments/${commentId}/update`);
};

const saveComment = async () => {
	console.log("COMMENT:", selectedComment.value.comment);
	let data = await TaskService.updateComment(selectedComment.value.id, Math.floor(Date.now() / 1000), selectedComment.value.author, selectedComment.value.authorId, selectedComment.value.comment);
	console.log("DATAHERE:", JSON.stringify(data.data, null, 2));
	console.log("DATAHERE2:", data);

	eventBus.emit("commentUpdated");
	eventBus.emit("taskUpdated");

	modal.value = false;
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


const goBack = (taskUID: string) => {
	successModalOpen.value = false;
	router.go(-1);

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
