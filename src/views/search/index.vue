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
				<ion-title>Поиск товаров</ion-title>
			</ion-toolbar>

			<ion-toolbar v-if="!connectionError">
				<ion-searchbar inputmode="search" class="custom" placeholder="Введите наименование или код вендора"
							   :debounce="500" :animated="true" @ionInput="handleInput($event)"></ion-searchbar>
			</ion-toolbar>

		</ion-header>

		<ion-content :fullscreen="true">
			<ion-refresher slot="fixed" :pull-factor="0.5" :pull-min="100" :pull-max="200"
						   @ionRefresh="handleRefresh($event)">
				<ion-refresher-content :pulling-icon="chevronDownCircleOutline" pulling-text="Протяните для обновления"
									   refreshing-spinner="circles" refreshing-text="Загрузка...">
				</ion-refresher-content>
			</ion-refresher>

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
				<ion-card v-for="product in products" :button="true" :key="product.productOid"
						  @click="() => openProduct(product.scanCode)">
					<ion-card-header>

						<ion-row>
							<ion-col class="ion-no-padding" size="auto">
								<ion-chip class="ion-no-margin"
										  style="margin-right: 0.5rem; margin-bottom: 0.5rem; align-items: center;">

									{{ truncatedClientName(product.productName) }}
								</ion-chip>
							</ion-col>
							<ion-chip color="primary" class="ion-no-margin"
									  style="margin-right: 0.5rem; margin-bottom: 0.5rem; align-items: center;">
								<ion-label>Код вендора: {{ product.vendorCode }}</ion-label>
							</ion-chip>
							<ion-col class="ion-no-padding" size="auto">
								<ion-chip color="tertiary" class="ion-no-margin">
									<ion-label>Скан-код: {{ product.scanCode }}</ion-label>
								</ion-chip>
							</ion-col>
						</ion-row>
					</ion-card-header>
					<ion-card-content>
						<ion-row>
							<ion-col size="auto" class="ion-no-padding">
								<ion-chip class="ion-no-margin ion-no-padding" color="black" v-if="product.productName">
									<ion-label>Цена: {{ product.price }} тг.</ion-label>
								</ion-chip>
							</ion-col>
						</ion-row>
					</ion-card-content>
				</ion-card>

				<div class="block ion-padding" v-if="!loading && products.length < 1">
					<div class="error-block-content">
						<h2>Ничего не найдено</h2>
						<p>
							Проверьте корректность введенных данных для поиска.
						</p>
					</div>
				</div>

				<div class="block ion-padding" v-if="allTasksLoaded && products.length > 0">
					<div class="error-block-content">
						<p>Количество найденных результатов: {{ products.length }}</p>
					</div>
				</div>

				<ion-infinite-scroll ref="infiniteScroll" @ionInfinite="loadMoreTasks">
					<ion-infinite-scroll-content loading-text="Загрузка..."
												 loading-spinner="circular"></ion-infinite-scroll-content>
				</ion-infinite-scroll>
			</section>
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
	IonToggle,
} from "@ionic/vue";
import { HttpService, API_URL } from "../../services/http.service";
import { cogOutline, notificationsOutline, add, alertCircleOutline } from "ionicons/icons";

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
import { Product } from "@/interfaces/product.interface";

import store from "@/store";
import { log10 } from "chart.js/helpers";

const connectionError = ref(false);

const hideFilterTabs = ref(false);

const typedProductName = ref("");

const tasks = ref<Task[]>([]);
const results = ref<Task[]>([]);
const loading = ref(false);

const products = ref<Product[]>([]);
const fromLoadingNew = ref<Product[]>([]);

const is_admin = computed(() => store.getters["isAdmin"]);

const start = ref<number>(0);
const limit = ref<number>(5);
const allTasksLoaded = ref<boolean>(false);

const statusesRU = {
	"NEW": "НОВАЯ",
	"DONE": "ЗАВЕРШЕНА",
};

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


const truncatedClientName = (clientName: string) => {
	return clientName.length > 25
		? clientName.slice(0, 25) + "..."
		: clientName;
};


// const fetchTasks = async () => {
// 	console.log(1111111122);
// 	try {
// 		const data = await TaskService.getTasks(
// 			store.state.crutches ? 1 : store.getters["getUserId"],
// 			start.value,
// 			limit.value,
// 		);
//
// 		if (data && data.length > 0) {
// 			tasks.value.push(...data);
// 			results.value.push(...data);
// 			start.value += limit.value;
//
// 			// TODO: Сортировку надо бы реализовать на бэкенде
//
// 			// tasks.value = sortTasksByDateCreated(tasks.value);
// 			// results.value = sortTasksByDateCreated(results.value);
//
// 			console.log(results.value);
// 		} else {
// 			allTasksLoaded.value = true;
// 		}
// 	} catch (error) {
// 		connectionError.value = true;
// 		hideFilterTabs.value = true;
// 	} finally {
// 		loading.value = false;
// 	}
// };


onMounted(() => {
	// fetchTasks();
});

const handleRefresh = (event: CustomEvent) => {
	setTimeout(() => {
		tasks.value = [];
		results.value = [];
		start.value = 0;
		// fetchTasks();
		event.target.complete();
	}, 150);
};

const loadMoreTasks = async (event: CustomEvent) => {
	if (allTasksLoaded.value) {
		(event.target as HTMLIonInfiniteScrollElement).complete();
		(event.target as HTMLIonInfiniteScrollElement).disabled = true;
	} else {
		await loadFromScroll(typedProductName.value);
		(event.target as HTMLIonInfiniteScrollElement).complete();
	}
};

const formatDateToLocaleString = (
	unixTimestamp: number,
	locale: string = "ru-RU",
	options?: Intl.DateTimeFormatOptions,
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

const openProduct = (scanCode: string) => {
	router.push({
		path: `/search/${scanCode}`,
	});
};

const loadFromScroll = async (productName: string) => {
	loading.value = true;
	let products_data;

	if (productName === "") {
		loading.value = false;
		return;
	}
	try {
		products_data = await HttpService.post({
			url: `${API_URL}/SearchProduct/v3/`,
			params: {
				searchString: productName,
				start: start.value.toString(),
				limit: limit.value.toString(),
			},
			shouldEncodeUrlParams: false,
		});

		console.log("PRODUCTS_DATA", products_data);
	} catch (error) {
		console.log("Error from fetching:", error);
	} finally {
		loading.value = false;
	}

	if (products_data && products_data.data.length > 0) {
		// fromLoadingNew.value.push(...products_data.data); // НОВЫЕ ПРИШЕДШИЕ ДАННЫЕ
		products.value.push(...products_data.data); // ДОБАВЛЕНИЕ В ОБЩИЙ СПИСОК

		console.log("Products:", products.value);
		start.value += limit.value;

		// console.log(task_data?.data);
		loading.value = false;
		return products;
	}


};

const handleInput = async (event: { target: { value: string } }) => {
	// loading.value = true;


	if (event.target.value === "") {
		products.value = [];
		typedProductName.value = "";
		loading.value = false;
		start.value = 0;
		return null;
	} else typedProductName.value = event.target.value;

	console.log(event.target.value);

	let task_data;

	try {
		task_data = await HttpService.post({
			url: `${API_URL}/SearchProduct/v3/`,
			params: {
				searchString: event.target.value,
				start: start.value.toString(),
				limit: limit.value.toString(),
			},
			shouldEncodeUrlParams: false,
		});

		console.log("TASK_DATA_HANDLE_INPUT", task_data);
		console.log("event.target.value", event.target.value);
	} catch (error) {
		console.error("Error:", error);
	} finally {
		loading.value = false;
	}

	if (task_data && task_data.data.length > 0) {
		products.value.push(...task_data.data);

		console.log("Products:", products.value);
		start.value += limit.value;

		// console.log(task_data?.data);
		loading.value = false;
		return products;
	}
	;
};

const filterTasksByStatus = (
	event: { target: { value: string } },
	task_status: string,
) => {
	loading.value = true;
	// const query = event.target.value.toLowerCase();
	results.value = tasks.value.filter(
		(task) => task.status.toLowerCase().indexOf(task_status) > -1,
	);

	loading.value = false;
};

const filterTasksByImportant = () => {
	loading.value = true;
	// const query = event.target.value.toLowerCase();
	results.value = tasks.value.filter(
		(task) => task.isImportant === "IMPORTANT",
	);
	loading.value = false;
};

const filterOverdue = () => {
	loading.value = true;
	// const query = event.target.value.toLowerCase();
	results.value = tasks.value.filter(
		(task) => task.dateDeadline < Date.now() / 1e3,
	);

	loading.value = false;
};

const filterActual = () => {
	loading.value = true;
	// const query = event.target.value.toLowerCase();
	results.value = tasks.value.filter(
		(task) => task.dateDeadline > Date.now() / 1e3,
	);

	loading.value = false;
};

const filterOnlyForMe = () => {
	loading.value = true;
	console.log(store.getters["getUserId"]);
	results.value = tasks.value.filter(
		(task) => task.authorId === store.getters["getUserId"],
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
