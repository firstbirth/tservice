<template>
	<ion-page>
		<ion-header>
			<ion-toolbar>
				<ion-buttons slot="secondary">
					<ion-button @click="openNotifications">
						<ion-icon slot="icon-only" :ios="notificationsOutline" :md="notificationsOutline"></ion-icon>
					</ion-button>
					<ion-button @click="openSettings">
						<ion-icon slot="icon-only" :ios="cogOutline" :md="cogOutline"></ion-icon>
					</ion-button>
				</ion-buttons>
				<ion-title>Задачи</ion-title>
			</ion-toolbar>

			<ion-toolbar v-if="!connectionError">
				<ion-searchbar inputmode="search" class="custom" placeholder="Поиск" :debounce="350" :animated="true"
					@ionInput="handleInput($event)"></ion-searchbar>
			</ion-toolbar>
		</ion-header>
		<ion-content :fullscreen="true">
			<ion-refresher slot="fixed" :pull-factor="0.5" :pull-min="100" :pull-max="200"
				@ionRefresh="handleRefresh($event)">
				<ion-refresher-content :pulling-icon="chevronDownCircleOutline" pulling-text="Протяните для обновления"
					refreshing-spinner="circles" refreshing-text="Загрузка...">
				</ion-refresher-content>
			</ion-refresher>

			<ion-segment v-if="!hideFilterTabs" :scrollable="true" value="all" color="primary"
				class="task_filter fadeInDown">
				<ion-segment-button value="important" @click="filterTasksByImportant()">
					<ion-label>🔥</ion-label>
				</ion-segment-button>

				<ion-segment-button value="default" @click="($event) => {
					filterTasksByStatus($event, 'new');
				}
					">
					<ion-label>Новые</ion-label>
				</ion-segment-button>
				<ion-segment-button value="segment" @click="filterTasksByStatus($event, 'done')">
					<ion-label>Выполненные</ion-label>
				</ion-segment-button>
				<ion-segment-button value="buttons" @click="filterOverdue()">
					<ion-label>Просроченные</ion-label>
				</ion-segment-button>
			</ion-segment>

			<div v-if="loading" class="spinner-container">
				<ion-spinner name="crescent"></ion-spinner>
			</div>

			<section class="content" v-touch:swipe.left="() => {
				console.log('swipe left');
			}
				" v-touch:swipe.right="() => {
					console.log('swipe right');
				}
					">
				<ion-card v-for="task in results" :key="task.taskUID" :button="true"
					@click="() => openTask(task.taskUID, task.dateDeadline)">
					<ion-card-header>
						<ion-card-title>
							<ion-row>
								<ion-col class="ion-no-padding">
									{{
										task.description
											? task.description
											: "Без названия"
									}}
								</ion-col>
								<ion-col size="auto" class="ion-no-padding">
									<ion-chip v-if="
										task.dateDeadline < Date.now() / 1e3
									" color="danger" class="ion-no-margin">
										<ion-label> Просрочена </ion-label>
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
						</ion-card-title>
						<ion-card-subtitle v-if="task.dateDeadline">
							<p class="ion-no-margin">{{ formatDateToLocaleString(task.dateCreated) }} &mdash; {{
								formatDateToLocaleString(task.dateDeadline) }}</p>
						</ion-card-subtitle>
					</ion-card-header>

					<ion-card-content>
						<ion-row>
							<ion-col class="ion-no-padding">
								<ion-chip :class="`ion-no-margin ${task.status.toLowerCase()}`">

									<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
										class="bi bi-check-all" viewBox="0 0 16 16" v-if="task.status === 'DONE'">
										<path
											d="M8.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L2.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093L8.95 4.992zm-.92 5.14.92.92a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 1 0-1.091-1.028L9.477 9.417l-.485-.486z" />
									</svg>
									<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
										class="bi bi-plus-square" viewBox="0 0 16 16" v-if="task.status === 'NEW'">
										<path
											d="M2.5 3.5a.5.5 0 0 1 0-1h11a.5.5 0 0 1 0 1h-11zm2-2a.5.5 0 0 1 0-1h7a.5.5 0 0 1 0 1h-7zM0 13a1.5 1.5 0 0 0 1.5 1.5h13A1.5 1.5 0 0 0 16 13V6a1.5 1.5 0 0 0-1.5-1.5h-13A1.5 1.5 0 0 0 0 6v7zm1.5.5A.5.5 0 0 1 1 13V6a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5h-13z" />
									</svg>
									<!-- <ion-spinner v-if="task.status === 'NEW'" name="dots"></ion-spinner> -->
									<ion-label style="margin-left: .25rem">
										{{ statusesRU[task.status] || 'Неизвестный статус' }}
									</ion-label>

								</ion-chip>
							</ion-col>
							<ion-col size="auto" class="ion-no-padding">
								<ion-chip class="ion-no-margin ion-no-padding" color="black" v-if="task.author">
									<ion-label>{{ task.author }}</ion-label>
								</ion-chip>
								<ion-chip class="ion-no-margin ion-no-padding" color="black" v-if="task.performer">
									<svg xmlns="http://www.w3.org/2000/svg" width="16" height="33" fill="currentColor"
										class="chevron-divider" viewBox="0 0 16 16">
										<path fill-rule="evenodd"
											d="M6.776 1.553a.5.5 0 0 1 .671.223l3 6a.5.5 0 0 1 0 .448l-3 6a.5.5 0 1 1-.894-.448L9.44 8 6.553 2.224a.5.5 0 0 1 .223-.671" />
									</svg>
								</ion-chip>
								<ion-chip class="ion-no-margin ion-no-padding" color="black" v-if="task.performer">
									<ion-label>{{ task.performer }}</ion-label>
								</ion-chip>
							</ion-col>
						</ion-row>
					</ion-card-content>
				</ion-card>

				<div class="block ion-padding" v-if="!loading && results.length < 1">
					<div class="error-block-content">
						<h2>Ничего не найдено</h2>
						<p>
							Проверьте параметры поиска или выберите другой
							фильтр.
						</p>
					</div>
				</div>

				<div class="block ion-padding" v-if="allTasksLoaded && results.length > 0">
					<div class="error-block-content">
						<p>Все задачи загружены.</p>
					</div>
				</div>

				<ion-infinite-scroll ref="infiniteScroll" @ionInfinite="loadMoreTasks">
					<ion-infinite-scroll-content loading-text="Загрузка..."
						loading-spinner="circular"></ion-infinite-scroll-content>
				</ion-infinite-scroll>
			</section>

			<ion-fab slot="fixed" vertical="bottom" horizontal="end" v-if="is_admin && !connectionError">
				<ion-fab-button color="primary" shape="round" @click="openNewTodo">
					<ion-icon :icon="add"></ion-icon>
				</ion-fab-button>
			</ion-fab>
		</ion-content>

		<ion-footer v-if="connectionError">
			<div class="block ion-padding">
				<div class="error-block-content">
					<p>Проблемы с соединением</p>
					<p>
						Не удаётся получить список задач. Попробуйте повторить
						попытку позже.
					</p>
					<ion-button expand="block" @click="fetchTasks">Обновить</ion-button>
				</div>
			</div>
		</ion-footer>

		<ion-footer v-if="is_admin">
			<ion-segment color="danger" value="all">
				<ion-segment-button value="all" @click="resetFilters()">
					Все
				</ion-segment-button>
				<ion-segment-button value="my" @click="() => {
					filterOnlyForMe();
				}
					">
					Мои
				</ion-segment-button>
			</ion-segment>
		</ion-footer>
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
	IonPage,
	IonSegment,
	IonSegmentButton,
	IonSearchbar,
	IonHeader,
	IonToolbar,
	IonTitle,
	IonContent,
	IonButtons,
	IonButton,
	IonLabel,
	IonIcon,
	IonFab,
	IonFabButton,
	IonInfiniteScroll,
	IonInfiniteScrollContent,
	IonRefresher,
	IonRefresherContent,
	IonModal,
	IonFooter,
	IonSpinner,
} from "@ionic/vue";
import { cogOutline, notificationsOutline, add, key } from "ionicons/icons";

import { useRouter } from "vue-router";

import { ref, onMounted, computed } from "vue";

import { chevronDownCircleOutline } from "ionicons/icons";

const router = useRouter();

const openSettings = () => {
	router.push("/settings");
};

const openNotifications = () => {
	router.push("/notifications");
};

const openNewTodo = () => {
	router.push("/tasks/add");
};

import { TaskService } from "@/services/task.service";
import { Task } from "@/interfaces/task.interface";
import store from "@/store";

const connectionError = ref(false);

const hideFilterTabs = ref(false);

const tasks = ref<Task[]>([]);
const results = ref<Task[]>([]);
const loading = ref(true);

const is_admin = computed(() => store.getters["isAdmin"]);

const start = ref<number>(0);
const limit = ref<number>(5);
const allTasksLoaded = ref<boolean>(false);

const statusesRU: { [key: string]: string } = {
	'NEW': 'НОВАЯ',
	'DONE': 'ЗАВЕРШЕНА'
}

// TODO: Вохможно тут придётся реализовать переключатель фильтров
const filters = ref({
	my: false,
	important: false,
	deadline: false,
	current: false,
	closed: false,
	all: true,
});

function sortTasksByDateCreated(tasks: Task[]): Task[] {
	return tasks.sort((a, b) => a.dateCreated - b.dateCreated);
}

const fetchTasks = async () => {
	try {
		const data = await TaskService.getTasks(
			store.state.crutches ? 1 : store.getters["getUserId"],
			start.value,
			limit.value
		);

		if (data && data.length > 0) {
			tasks.value.push(...data);
			results.value.push(...data);
			start.value += limit.value;

			// TODO: Сортировку надо бы реализовать на бэкенде

			// tasks.value = sortTasksByDateCreated(tasks.value);
			// results.value = sortTasksByDateCreated(results.value);

			console.log(results.value);
		} else {
			allTasksLoaded.value = true;
		}
	} catch (error) {
		connectionError.value = true;
		hideFilterTabs.value = true;
	} finally {
		loading.value = false;
	}
};

onMounted(() => {
	fetchTasks();
});

const handleRefresh = (event: CustomEvent) => {
	setTimeout(() => {
		tasks.value = [];
		results.value = [];
		start.value = 0;
		fetchTasks();
		event.target.complete();
	}, 150);
};

const loadMoreTasks = async (event: CustomEvent) => {
	if (allTasksLoaded.value) {
		(event.target as HTMLIonInfiniteScrollElement).complete();
		(event.target as HTMLIonInfiniteScrollElement).disabled = true;
	} else {
		await fetchTasks();
		(event.target as HTMLIonInfiniteScrollElement).complete();
	}
};

const formatDateToLocaleString = (
	unixTimestamp: number,
	locale: string = "ru-RU",
	options?: Intl.DateTimeFormatOptions
): string => {
	const date = new Date(unixTimestamp * 1e3);

	const defaultOptions: Intl.DateTimeFormatOptions = {
		year: "numeric",
		month: "numeric",
		day: "numeric",
		hour: "2-digit",
		minute: "2-digit",
	};

	const formatOptions = { ...defaultOptions, ...options };

	return date.toLocaleString(locale, formatOptions);
};

const openTask = (taskUID: string, _datedeadline: number) => {
	router.push({
		path: `/tasks/${taskUID}`,
		query: { dateDeadline: _datedeadline },
	});
};

const handleInput = (event: { target: { value: string } }) => {
	loading.value = true;
	hideFilterTabs.value = true;

	const query = event.target.value.toLowerCase();
	results.value = tasks.value.filter(
		(task) => task.description.toLowerCase().indexOf(query) > -1
	);

	if (query.length === 0) {
		hideFilterTabs.value = false;
		results.value = [...tasks.value];
	}

	console.log(results.value);
	console.log(query);

	loading.value = false;
};

const filterTasksByStatus = (
	event: { target: { value: string } },
	task_status: string
) => {
	loading.value = true;
	// const query = event.target.value.toLowerCase();
	results.value = tasks.value.filter(
		(task) => task.status.toLowerCase().indexOf(task_status) > -1
	);

	loading.value = false;
};

const filterTasksByImportant = () => {
	loading.value = true;
	// const query = event.target.value.toLowerCase();
	results.value = tasks.value.filter(
		(task) => task.isImportant === "IMPORTANT"
	);
	loading.value = false;
};

const filterOverdue = () => {
	loading.value = true;
	// const query = event.target.value.toLowerCase();
	results.value = tasks.value.filter(
		(task) => task.dateDeadline < Date.now() / 1e3
	);

	loading.value = false;
};

const filterActual = () => {
	loading.value = true;
	// const query = event.target.value.toLowerCase();
	results.value = tasks.value.filter(
		(task) => task.dateDeadline > Date.now() / 1e3
	);

	loading.value = false;
};

const filterOnlyForMe = () => {
	loading.value = true;
	console.log(store.getters["getUserId"])
	results.value = tasks.value.filter(
		(task) => task.authorId === store.getters["getUserId"]
	);
	loading.value = false;
};

const resetFilters = () => {
	results.value = tasks.value;
};
</script>

<style scoped>
ion-fab-button {
	/* --background: #b7f399; */
	/* --background-activated: #87d361; */
	/* --background-hover: #a3e681; */
	width: 3rem;
	height: 3rem;
	--border-radius: 50%;
	--box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.3),
		0px 1px 3px 1px rgba(0, 0, 0, 0.15);
	--color: black;
}

ion-content {
	--background: transparent;
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

ion-card {
	box-shadow: 0px 0.8px 2.2px rgba(0, 0, 0, 0.05),
		0px 2px 5.3px rgba(0, 0, 0, 0.036), 0px 3.8px 10px rgba(0, 0, 0, 0.03),
		0px 6.7px 17.9px rgba(0, 0, 0, 0.025),
		0px 12.5px 33.4px rgba(0, 0, 0, 0.02),
		0px 30px 80px rgba(0, 0, 0, 0.014) !important;
}

/* ion-segment {
    --background: #f5f5f5;
  } */

ion-refresher {
	padding-block: 1rem;

	ion-refresher-content {
		padding: 2rem;
	}
}

ion-searchbar.custom {
	--background: #f2f2f2;
	--color: #171717;
	--placeholder-color: #666;
	--icon-color: #666;
	--clear-button-color: #666;

	--border-radius: 0.5rem;

	--box-shadow: none;
}

/* 
ion-searchbar.ios.custom {
	--cancel-button-color: #19422d;
}

ion-searchbar.md.custom {
	--cancel-button-color: #fff;
} */

.task_filter {
	background-color: #f2f2f2 !important;
	margin: 0 !important;
	padding-top: 0.5rem !important;
}

section.content {
	background-color: #f2f2f2 !important;
	padding-top: 0.75rem !important;
	margin-top: calc(-1 * 0.5rem - 2px) !important;
}

.card-enter-from {
	opacity: 0;
	transform: translateZ(60px);
}

.card-enter-to {
	opacity: 1;
}

.card-enter-active {
	transition: all 0.35s;
}

ion-modal {
	--height: auto;
}

ion-footer {
	background-color: white;
}

.error-block-content {
	color: black;
	text-align: center;
}

.spinner-container {
	display: flex;
	width: 100%;
	align-items: center;
	justify-content: center;
}

.ms-3 {
	margin-left: 0.5rem;
}
</style>
