<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-back-button default-href="/workorders/"></ion-back-button>
                </ion-buttons>
                <ion-title>{{ title !== '' ? title : "Товары" }}</ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content :fullscreen="true">
            <ion-segment :scrollable="true" value="all" color="primary" class="task_filter fadeInDown">
                <ion-segment-button value="important" type="button"
                    @click="router.push(`/workorders/${workOrderId}/details`)">
                    <ion-label>Детали</ion-label>
                </ion-segment-button>

                <ion-segment-button value="default" @click="fetchWorkOrderProducts(workOrderId)">
                    <ion-label>Товары</ion-label>
                </ion-segment-button>
                <ion-segment-button value="segment" type="button"
                    @click="router.push(`/workorders/${workOrderId}/services`)">
                    <ion-label>Услуги</ion-label>
                </ion-segment-button>

            </ion-segment>
            <section class="content">
                <ion-title v-if="workOrderProducts.length == 0">
                    <div class="block ion-padding">
                        <div class="error-block-content">
                            <p>Товары не найдены.</p>
                        </div>
                    </div>
                </ion-title>
                <ion-card v-for="workOrderProduct in workOrderProducts" :key="workOrderProduct.rowId">


                    <ion-item :button="true" :detail="false">
                        <ion-label>
                            <h2>Товар: {{
									workOrderProduct?.product
										? workOrderProduct?.product
										: "Не указан"
								}}</h2>
                        </ion-label>
                    </ion-item>
                    <ion-item :button="true" :detail="false">
                        <ion-label>
                            <h2>Количество: {{ workOrderProduct.quantity }} шт.</h2>
                        </ion-label>
                    </ion-item>
                    <ion-item :button="true" :detail="false">
                        <ion-label>
                            <h2>Цена: {{ workOrderProduct?.price }} тг.</h2>
                        </ion-label>
                    </ion-item>
                    <ion-item :button="true" :detail="false">
                        <ion-label>
                            <h2>Место хранения: {{ workOrderProduct?.storagePlace }}</h2>
                        </ion-label>
                    </ion-item>

                </ion-card>
            </section>
        </ion-content>
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
    alertController
} from "@ionic/vue";

import { HttpService, API_URL } from "../../../services/http.service";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { Haptics, ImpactStyle } from "@capacitor/haptics";
import { Task } from "@/interfaces/task.interface";
import store from "@/store";
import { eventBus } from "@/eventBus";

import { Product } from "@/interfaces/product.interface";
import { TaskService } from "@/services/task.service";
import { WorkOrder } from "@/interfaces/workorder.interface";
import { WorkOrderProduct } from "@/interfaces/workorderproduct.interface";

const router = useRouter();

const tasks = ref<Task[]>([]);

const results = ref<WorkOrder[]>([]);
const workOrder = ref<WorkOrder>();
const workOrderProducts = ref<WorkOrderProduct[]>([]);

const product = ref<Product>();



const taskUID = ref("");

const title = ref("");

const dateDeadline = ref(0);

const task_is_done = ref(false);

const timeToDeadline = ref("" as string | false);

const successModalOpen = ref(false);

let isDetails = true;

const pending = ref(false);

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

let pathParts = window.location.pathname.split('/');
let workOrderId = pathParts[pathParts.length - 2];



const workOrdersRU: { [key: string]: string } = {
    'DRAFT': 'Черновик',
    'DENY': 'Отказ клиента',
    'QUEUE': 'В очереди',
    'INWORK': 'В работе',
    'SUSPENDED': 'Приостановлен',
    'COMPLETED': 'Завершен',
    'CLOSED': 'Закрыт',
}

const fetchTaskData = async (scanCode: string) => {
    let task_data;
    isDetails = true;

    try {
        task_data = await HttpService.post({
            url: `${API_URL}/GetWorkOrderById/v4/`,
            params: {
                workOrderOid: scanCode,
                userId: '1'
            },
        });
    } catch (error) {
        console.error("Error:", error);
    }

    if (task_data && task_data.data.length > 0) {
        workOrder.value = task_data.data[0];
        title.value = workOrder.value?.number
        console.log("WorkOrder data:", workOrder.value);


    };
};

const openWorkOrderProducts = (workOrderId: string) => {
    router.push({
        path: `/workorders/${workOrderId}/products1`
    });
};



const fetchWorkOrderProducts = async (workOrderId: string) => {
    let task_data;
    isDetails = false;


    try {
        task_data = await HttpService.post({
            url: `${API_URL}/GetWorkOrderProductsById/v3/`,
            params: {
                workOrderOid: workOrderId,
                userId: '1'
            },
        });
    } catch (error) {
        console.error("Error:", error);
    }

    if (task_data && task_data.data.length > 0) {
        workOrderProducts.value = [];
        workOrderProducts.value.push(...task_data.data)
        console.log("WorkOrderProducts:", workOrderProducts.value);

        title.value = `Товары заказ-наряда`


    }
    else { isEmpty = true }
};

eventBus.on("taskUpdated", () => {
    fetchTaskData(scancode);
}
);

onMounted(async () => {
    pathParts = window.location.pathname.split('/');
    workOrderId = pathParts[pathParts.length - 2];
    let isEmpty = false;
    fetchWorkOrderProducts(workOrderId);

});

const getTimeRemaining = (timestamp: number): string | false => {
    const now = new Date().getTime();
    const targetTime = timestamp * 1000; // Convert seconds to milliseconds

    const timeDifference = targetTime - now;

    if (timeDifference <= 0) {
        return false; // The target time has passed
    }

    const days = String(
        Math.floor(timeDifference / (1000 * 60 * 60 * 24))
    ).padStart(2, "0");
    const hours = String(
        Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    ).padStart(2, "0");
    const minutes = String(
        Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60))
    ).padStart(2, "0");
    const seconds = String(
        Math.floor((timeDifference % (1000 * 60)) / 1000)
    ).padStart(2, "0");

    return `${days}дн. ${hours}:${minutes}:${seconds}`;
};

const formatDateToLocaleString = (
    unixTimestamp: number,
    locale: string = "ru-RU",
    options?: Intl.DateTimeFormatOptions
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

const editTask = (taskUID: string) => {
    router.push(
        {
            path: `/tasks/edit/${taskUID}`,
        }
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

.analogues-list {
    list-style-type: none;
    padding-left: 0;
    margin: 2;
}

.analogues-list li {
    margin-bottom: 0.5rem;
    /* Расстояние между элементами */
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
