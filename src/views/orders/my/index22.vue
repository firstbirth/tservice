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
				<ion-title>Ваши заказы</ion-title>
			</ion-toolbar>
			<ion-item>
					<ion-datetime v-model="startDateOne" presentation="date" :multiple="true" @ionChange="handleDateChange"></ion-datetime>
			</ion-item>
				<ion-button @click="filterOrdersByDate">Фильтровать по дате</ion-button>
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
				<ion-card v-for="order in results" :key="order.clientOrderId" :button="true"
						  @click="() => openClientOrder(order.clientOrderId, order.authorId)">
					<ion-card-header>
						<ion-card-title>
							<ion-row>
								<ion-col class="ion-no-padding">
									Заказ:
									{{
										order.number
											? order.number
											: "Номер не указан"
									}}
								</ion-col>
							</ion-row>
						</ion-card-title>
					</ion-card-header>

					<ion-card-content>
						<ion-row>
							<ion-col class="ion-no-padding" size="auto">
								<ion-chip :class="`ion-no-margin ${order.number}`"
										  style="margin-right: 0.5rem; margin-bottom: 0.5rem; align-items: center;">

									<!-- Иконка с фиксированным размером -->
									<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
										 class="bi bi-briefcase" viewBox="0 0 16 16" style="flex-shrink: 0;">
										<path
											d="M6.5 1A1.5 1.5 0 0 0 5 2.5V3H1.5A1.5 1.5 0 0 0 0 4.5v8A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-8A1.5 1.5 0 0 0 14.5 3H11v-.5A1.5 1.5 0 0 0 9.5 1h-3zm0 1h3a.5.5 0 0 1 .5.5V3H6v-.5a.5.5 0 0 1 .5-.5zm1.886 6.914L15 7.151V12.5a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5V7.15l6.614 1.764a1.5 1.5 0 0 0 .772 0zM1.5 4h13a.5.5 0 0 1 .5.5v1.616L8.129 7.948a.5.5 0 0 1-.258 0L1 6.116V4.5a.5.5 0 0 1 .5-.5z" />
									</svg>

									<!-- Текст с отступом -->
									<ion-label style="margin-left: .25rem">
										{{ truncatedClientName(order.client) }}
									</ion-label>
								</ion-chip>


								<ion-chip :class="`ion-no-margin ${order.number}`"
										  style="margin-right: 0.5rem; margin-bottom: 0.5rem">

									<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
										 class="bi bi-calendar" viewBox="0 0 16 16">
										<path
											d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z" />
									</svg>
									<ion-label style="margin-left: .25rem">
										Дата: {{ formatDateToLocaleString(order.date) }}
									</ion-label>

								</ion-chip>
								<ion-chip :class="`ion-no-margin ${order.number}`">

									<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
										 class="bi bi-gear-fill" viewBox="0 0 16 16">
										<path
											d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z" />
									</svg>
									<ion-label style="margin-left: .25rem">
										Ответственный: {{ order.author }}
									</ion-label>

								</ion-chip>
							</ion-col>
						</ion-row>
						<ion-col size="auto" class="ion-no-padding">
							<ion-chip class="ion-no-margin ion-no-padding" color="black">
								<ion-label>Комментарий: {{ order.comment ? order.comment : "не указан"
									}}
								</ion-label>
							</ion-chip>
						</ion-col>
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

				<div class="block ion-padding" v-if="allWorkOrdersLoaded && results.length > 0">
					<div class="error-block-content">
						<p>Все заказы загружены.</p>
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
					<ion-button expand="block" @click="fetchOrders">Обновить</ion-button>
				</div>
			</div>
		</ion-footer>

		<ion-footer v-if="is_admin">
			<
			<ion-segment color="danger" value="my">
				<ion-segment-button value="all" @click="openAllOrders">
					Все
				</ion-segment-button>
				<ion-segment-button value="my" @click="openMyOrders">
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

const openMyOrders = () => {
	router.push("/orders/my");
};

const openAllOrders = () => {
	router.push("/orders/all");
};
const openClientOrder = (clientOrderId: number, userId:number) => {
	router.push({
		path: `/orders/${clientOrderId}/${userId}/details`,

	});
};
import { HttpService, API_URL } from "../../../services/http.service";
import { Task } from "@/interfaces/task.interface";
import { ClientOrder } from "@/interfaces/client-order.interface";

import store from "@/store";
import { ClientOrderService } from "@/services/client-order.service";

const connectionError = ref(false);

let isActiveFilter = <boolean>false;

const hideFilterTabs = ref(false);

const tasks = ref<ClientOrder[]>([]);
const results = ref<ClientOrder[]>([]);
const loading = ref(true);

let selectedStatuses: string[] = [];

const statusColors: { [key: string]: string } = {
	"DRAFT": "light",
	"DECLINED": "danger",
	"QUEUE": "warning",
	"INWORK": "primary",
	"SUSPENDED": "medium",
	"COMPLETED": "success",
	"CLOSED": "danger",
};

const allOrders = ref<ClientOrder[]>([]);

const is_admin = computed(() => store.getters["isAdmin"]);

const start = ref<number>(0);
const limit = ref<number>(5);

const allWorkOrdersLoaded = ref<boolean>(false);

const workOrdersRU: { [key: string]: string } = {
	"DRAFT": "Черновик",
	"DENY": "Отказ клиента",
	"QUEUE": "В очереди",
	"INWORK": "В работе",
	"SUSPENDED": "Приостановлен",
	"COMPLETED": "Завершен",
	"CLOSED": "Закрыт",
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

function handleChange($event) {
	selectedStatuses = event.detail.value;

	if (selectedStatuses.length == 0) {
		fetchOrders();
	} else {
		filterTasksByStates();
	}
	console.log("Selected statuses array:", selectedStatuses);
}

const truncatedClientName = (clientName: string) => {
	return clientName.length > 25
		? clientName.slice(0, 25) + "..."
		: clientName;
};

// Добавляем реактивные переменные для хранения дат
const startDate = ref<string[]>([]);
const endDate = ref<string | null>(null);

// Объявляем объект для хранения дат
const dateRange = ref({
	start_date: null,
	end_date: null
});

const handleDateChange = (event: CustomEvent) => {
	const selectedDates = event.detail.value as string[];
	
	if (selectedDates.length > 1) {
		const dates: string[] = [];
		const start = new Date(Math.min(...selectedDates.map(date => new Date(date).getTime())));
		const end = new Date(Math.max(...selectedDates.map(date => new Date(date).getTime())));
		
		const currentDate = new Date(start);
		while (currentDate <= end) {
			dates.push(currentDate.toISOString().split('T')[0]);
			currentDate.setDate(currentDate.getDate() + 1);
		}
		
		startDate.value = dates;
	} else {
		startDate.value = selectedDates;
	}
	
	if (startDate.value.length > 0) {
		dateRange.value.start_date = new Date(startDate.value[0]).getTime() / 1000;
		dateRange.value.end_date = new Date(startDate.value[startDate.value.length - 1]).getTime() / 1000;
		console.log('Диапазон дат:', dateRange.value);
	}
};

// Добавляем флаг для отслеживания активного фильтра по дате
const isDateFilterActive = ref(false);

// Обновляем функцию фильтрации по датам
const filterOrdersByDate = () => {
	if (dateRange.value.start_date && dateRange.value.end_date) {
		isDateFilterActive.value = true;
		results.value = allOrders.value.filter(order => {
			const orderTimestamp = order.date;
			return orderTimestamp >= dateRange.value.start_date! && 
				   orderTimestamp <= dateRange.value.end_date!;
		});
	} else {
		isDateFilterActive.value = false;
		results.value = allOrders.value;
	}
};

const fetchOrders = async () => {
	results.value = [];
	loading.value = true;

	// workOrders.value = [];

	let task_data;

	try {
		task_data = await ClientOrderService.getClientOrders(store.getters["getUserId"] === 0 ? 1 : store.getters["getUserId"], 10);
	} catch (error) {
		console.error("Error:", error);
	} finally {
		loading.value = false;
	}

	if (task_data && task_data.length > 0) {
		allOrders.value.push(...task_data);
		results.value.push(...task_data);

		// console.log("Products:", workOrders.value);
		start.value += limit.value;

		loading.value = false;
		return allOrders;
	}
};
const fetchOrdersForMe = async () => {
	loading.value = true;

	// workOrders.value = [];
	// allOrders.value = [];
	let task_data;

	try {
		task_data = await ClientOrderService.getClientOrders(store.getters['getUserId'] === 0 ? 1 : store.state.userid, start.value, limit.value);
		console.log(task_data);
		console.log(111111);
	} catch (error) {
		console.error("Error:", error);
	} finally {
		loading.value = false;
	}

	if (task_data && task_data.length > 0) {
		allOrders.value.push(...task_data);
		results.value.push(...task_data); // подгружающиеся данные

		console.log("ALLORDERS:", allOrders);
		console.log("RESULTS", results);
		// console.log("Products:", workOrders.value);
		start.value += limit.value;

		if (task_data.length < limit.value) {
			allWorkOrdersLoaded.value = true; // Устанавливаем флаг, что все заказы загружены
		}

	} else {
		// Если заказы не были загружены, устанавливаем флаг
		allWorkOrdersLoaded.value = true;
	}
	loading.value = false;
	return allOrders;
};

onMounted(() => {
	fetchOrdersForMe();
});

const handleRefresh = (event: CustomEvent) => {
	setTimeout(() => {
		tasks.value = [];
		results.value = [];
		start.value = 0;
		fetchOrdersForMe();
		loading.value = false;
		event.target.complete();
	}, 150);
};

const loadMoreTasks = async (event: CustomEvent) => {
	if (allWorkOrdersLoaded.value) {
		(event.target as HTMLIonInfiniteScrollElement).complete();
		(event.target as HTMLIonInfiniteScrollElement).disabled = true;
	} else {

		await fetchOrdersForMe();

		console.log("hihiih");
		if (isActiveFilter) {

			filterTasksByStates();
		}
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

const handleInput = async (event: { target: { value: string } }) => {
	loading.value = true;

	results.value = [];
	console.log(event.target.value);

	let task_data;

	try {
		task_data = await HttpService.post({
			url: `${API_URL}/SearchProduct/v3/`,
			params: { searchString: event.target.value },
		});
	} catch (error) {
		console.error("Error:", error);
	} finally {
		loading.value = false;
	}

	if (task_data && task_data.data.length > 0) {
		products.value.push(...task_data.data);

		console.log("Products:", products.value);


		// console.log(task_data?.data);
		loading.value = false;
		return products;
	}
	;
};

const filterTasksByStates = () => {
	loading.value = true;
	// const query = event.target.value.toLowerCase();
	results.value = allOrders.value.filter((order) =>
		selectedStatuses.includes(order.status),
	);

	// Включение флага фильтра для фильтрации новых заказ-нарядов при бесконечном скролле
	isActiveFilter = true;

	loading.value = false;
};

const filterOnlyForMe = () => {
	loading.value = true;
	console.log(store.getters["getUserId"]);
	console.log("filterforme allorders", results.value);
	allOrders.value = results.value.filter(
		(task) => task.authorId === 1,
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
