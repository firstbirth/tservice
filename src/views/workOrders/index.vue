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
                <ion-title>Заказ-наряды</ion-title>
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
            <ion-col>
                <ion-title>
                    <ion-select aria-label="statuses" placeholder="Выберите статусы" interface="action-sheet"
                        :multiple="true" @ionChange="handleChange($event)">
                        <ion-select-option value="INWORK">В работе</ion-select-option>
                        <ion-select-option value="CLOSED">Закрыт</ion-select-option>
                        <ion-select-option value="DRAFT">Черновик</ion-select-option>
                        <ion-select-option value="QUEUE">В очереди</ion-select-option>
                        <ion-select-option value="COMPLETED">Завершен</ion-select-option>
                        <ion-select-option value="SUSPENDED">Приостановлен</ion-select-option>
                        <ion-select-option value="DENY">Отказ клиента</ion-select-option>
                    </ion-select>
                </ion-title>
            </ion-col>

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
                <ion-card v-for="workorder in results" :key="workorder.workOrderId" :button="true"
                @click="() => openWorkOrder(workorder.workOrderId)">
                    <ion-card-header>
                        <ion-card-title>
                            <ion-row>
                                <ion-col class="ion-no-padding">
                                    Заказ-наряд:
                                    {{
                                        workorder.number
                                            ? workorder.number
                                            : "Номер не указан"
                                    }}
                                </ion-col>
                                <ion-col size="auto" class="ion-no-padding">
                                    <ion-chip :color="statusColors[workorder.status]" class="ion-no-margin">
                                        <ion-label>Статус: {{ workOrdersRU[workorder.status] }}</ion-label>
                                    </ion-chip>
                                </ion-col>
                            </ion-row>
                        </ion-card-title>
                    </ion-card-header>

                    <ion-card-content>
                        <ion-row>
                            <ion-col class="ion-no-padding">
                                <ion-chip :class="`ion-no-margin ${workorder.number}`" style="margin-right: 0.5rem;">

                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                        class="bi bi-briefcase" viewBox="0 0 16 16">
                                        <path
                                            d="M6.5 1A1.5 1.5 0 0 0 5 2.5V3H1.5A1.5 1.5 0 0 0 0 4.5v8A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-8A1.5 1.5 0 0 0 14.5 3H11v-.5A1.5 1.5 0 0 0 9.5 1h-3zm0 1h3a.5.5 0 0 1 .5.5V3H6v-.5a.5.5 0 0 1 .5-.5zm1.886 6.914L15 7.151V12.5a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5V7.15l6.614 1.764a1.5 1.5 0 0 0 .772 0zM1.5 4h13a.5.5 0 0 1 .5.5v1.616L8.129 7.948a.5.5 0 0 1-.258 0L1 6.116V4.5a.5.5 0 0 1 .5-.5z" />
                                    </svg>
                                    <!-- <ion-spinner v-if="task.status === 'NEW'" name="dots"></ion-spinner> -->
                                    <ion-label style="margin-left: .25rem">
                                        Заказчик: {{ workorder.client }}
                                    </ion-label>

                                </ion-chip>

                                <ion-chip :class="`ion-no-margin ${workorder.number}`" style="margin-right: 0.5rem;">

                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                        class="bi bi-calendar" viewBox="0 0 16 16">
                                        <path
                                            d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z" />
                                    </svg>
                                    <!-- <ion-spinner v-if="task.status === 'NEW'" name="dots"></ion-spinner> -->
                                    <ion-label style="margin-left: .25rem">
                                        Дата: {{ formatDateToLocaleString(workorder.date) }}
                                    </ion-label>

                                </ion-chip>
                                <ion-chip :class="`ion-no-margin ${workorder.number}`">

                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                        class="bi bi-gear-fill" viewBox="0 0 16 16">
                                        <path
                                            d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z" />
                                    </svg>
                                    <!-- <ion-spinner v-if="task.status === 'NEW'" name="dots"></ion-spinner> -->
                                    <ion-label style="margin-left: .25rem">
                                        Авто: {{ workorder.auto }}
                                    </ion-label>

                                </ion-chip>
                            </ion-col>

                            <ion-col size="auto" class="ion-no-padding">
                                <ion-chip class="ion-no-margin ion-no-padding" color="black">
                                    <ion-label>Описание: {{ workorder.comment ? workorder.comment : 'не указано' }}</ion-label>
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
                <ion-fab-button color="primary" shape="round" @click="this.content.scrollToTop(400);">
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
import { HttpService, API_URL } from "../../services/http.service";
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

const openWorkOrder = (workOrderId: number) => {
    router.push({
        path: `/workorders/${workOrderId}/details`
    });
};

import { TaskService } from "@/services/task.service";
import { Task } from "@/interfaces/task.interface";
import { WorkOrder } from "@/interfaces/workorder.interface";
import store from "@/store";

const connectionError = ref(false);

var isActiveFilter = <boolean>false;

const hideFilterTabs = ref(false);

const tasks = ref<Task[]>([]);
const results = ref<WorkOrder[]>([]);
const loading = ref(true);

let selectedStatuses = [];

const statusColors: { [key: string]: string } = {
    'DRAFT': 'light',
    'DECLINED': 'danger',
    'QUEUE': 'warning',
    'INWORK': 'primary',
    'SUSPENDED': 'medium',
    'COMPLETED': 'success',
    'CLOSED': 'danger',
}


const workOrders = ref<WorkOrder[]>([]);

const is_admin = computed(() => store.getters["isAdmin"]);

const start = ref<number>(0);
const limit = ref<number>(5);
const allTasksLoaded = ref<boolean>(false);

const statusesRU: { [key: string]: string } = {
    'NEW': 'НОВАЯ',
    'DONE': 'ЗАВЕРШЕНА'
}

const workOrdersRU: { [key: string]: string } = {
    'DRAFT': 'Черновик',
    'DENY': 'Отказ клиента',
    'QUEUE': 'В очереди',
    'INWORK': 'В работе',
    'SUSPENDED': 'Приостановлен',
    'COMPLETED': 'Завершен',
    'CLOSED': 'Закрыт',
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

function handleChange($event) {
    selectedStatuses = event.detail.value;

    if (selectedStatuses.length == 0) {
        fetchTasks();
    }
    else {
        filterTasksByStatusINWORK();
    }
    console.log('Selected statuses array:', selectedStatuses);
}

const fetchTasks = async () => {
    loading.value = true;

    // workOrders.value = [];

    let task_data;

    try {
        task_data = await HttpService.post({
            url: `${API_URL}/GetWorkOrders/v4/`,
            params: {
                userId: '1',
                start: start.value.toString(),
                limit: limit.value.toString()
            },
        });
    } catch (error) {
        console.error("Error:", error);
    }
    finally {
        loading.value = false;
    }

    if (task_data && task_data.data.length > 0) {
        workOrders.value.push(...task_data.data);
        results.value.push(...task_data.data);

        // console.log("Products:", workOrders.value);
        start.value += limit.value;

        loading.value = false;
        return workOrders;
    };
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
        loading.value = false;
        event.target.complete();
    }, 150);
};

const loadMoreTasks = async (event: CustomEvent) => {
    if (allTasksLoaded.value) {
        (event.target as HTMLIonInfiniteScrollElement).complete();
        (event.target as HTMLIonInfiniteScrollElement).disabled = true;
    } else {
        await fetchTasks();
        // Тестовый вариант проверки работы фильтра заказ-наряда, нужно
        // сделать для каждого фильтра и переименовать сами функции. 
        // Логика - при начальной загрузке получаем все заказ наряды,
        // При нажатии на кнопку фильтра В ОЧЕРЕДИ фильтруются текущие заказ-наряды и приходящие новые через пагинацию
        if (isActiveFilter) {

            filterTasksByStatusINWORK();
        }
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

const filterTasksByStatusINWORK = () => {
    loading.value = true;
    // const query = event.target.value.toLowerCase();
    results.value = workOrders.value.filter((order) =>
        selectedStatuses.includes(order.status)
    );

    // Включение флага фильтра для фильтрации новых заказ-нарядов при бесконечном скролле
    isActiveFilter = true;

    loading.value = false;
};

const filterTasksByImportant = () => {
    loading.value = true;
    // const query = event.target.value.toLowerCase();
    results.value = workOrders.value.filter(
        (workOrders) => workOrders.status === "draft"
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
