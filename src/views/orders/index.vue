<template>
	<ion-page>
		<ion-header>
			<ion-toolbar>
				<ion-buttons slot="secondary">
					<ion-button @click="openNotifications">
						<ion-icon
							slot="icon-only"
							:ios="notificationsOutline"
							:md="notificationsOutline"
						></ion-icon>
					</ion-button>
					<ion-button @click="openSettings">
						<ion-icon
							slot="icon-only"
							:ios="cogOutline"
							:md="cogOutline"
						></ion-icon>
					</ion-button>
				</ion-buttons>
				<ion-title>Заказы</ion-title>
			</ion-toolbar>
		</ion-header>
		<ion-content :fullscreen="true">
			<ion-refresher
				slot="fixed"
				:pull-factor="0.5"
				:pull-min="100"
				:pull-max="200"
				@ionRefresh="handleRefresh($event)"
			>
				<ion-refresher-content
					:pulling-icon="chevronDownCircleOutline"
					pulling-text="Протяните для обновления"
					refreshing-spinner="circles"
					refreshing-text="Загрузка..."
				>
				</ion-refresher-content>
			</ion-refresher>
			<ion-header collapse="condense">
				<ion-toolbar>
					<ion-buttons slot="secondary">
						<ion-button @click="openNotifications">
							<ion-icon
								slot="icon-only"
								:ios="notificationsOutline"
								:md="notificationsOutline"
							></ion-icon>
						</ion-button>
						<ion-button @click="openSettings">
							<ion-icon
								slot="icon-only"
								:ios="cogOutline"
								:md="cogOutline"
							></ion-icon>
						</ion-button>
					</ion-buttons>
					<ion-title>Заказы</ion-title>
				</ion-toolbar>
			</ion-header>
			<ion-segment
				value="all"
				color="primary"
				class="task_filter fadeInDown"
			>
				<ion-segment-button value="important">
					<ion-label>Заказы</ion-label>
				</ion-segment-button>
				<ion-segment-button value="default">
					<ion-label>Заказ-наряды</ion-label>
				</ion-segment-button>
			</ion-segment>

			<ion-card
				v-for="order in clientOrders"
				:key="order.clientOrderId"
				:button="true"
				@click="() => {}"
			>
				<ion-card-header>
					<ion-card-title>
						<ion-row>
							<ion-col class="ion-no-padding">
								{{ order.number ? order.number : "Без номера" }}
								{{ order.client }}
							</ion-col>
						</ion-row>
					</ion-card-title>
					<ion-card-subtitle v-if="order.date">
						<p class="ion-no-margin">
							Дата: {{ formatDateToLocaleString(order.date) }}
						</p>
						<p class="ion-no-margin">
							<b>Сумма: {{ order.totalSum }}</b>
						</p>
					</ion-card-subtitle>
				</ion-card-header>
				<ion-card-content>
					<ion-row>
						<ion-col size="auto" class="ion-no-padding">
							<ion-chip
								class="ion-no-margin ion-no-padding"
								color="black"
								v-if="order.author"
							>
								<ion-label>Автор: {{ order.author }}</ion-label>
							</ion-chip>
							<p>
								<ion-chip
									class="ion-no-margin ion-no-padding"
									color="black"
									v-if="order.comment"
								>
									<ion-label>
										Комментарий:
										{{ order.comment }}</ion-label
									>
								</ion-chip>
							</p>
						</ion-col>
					</ion-row>
				</ion-card-content>
			</ion-card>
		</ion-content>

		<ion-footer v-if="connectionError">
			<div class="block ion-padding">
				<div class="error-block-content">
					<p>Проблемы с соединением</p>
					<p>
						Не удаётся получить список задач. Попробуйте повторить
						попытку позже.
					</p>
					<ion-button expand="block" @click="fetchClientOrders"
						>Обновить</ion-button
					>
				</div>
			</div>
		</ion-footer>

		<ion-footer v-if="is_admin">
			<ion-segment color="danger" value="all">
				<ion-segment-button value="all"> Все </ion-segment-button>
				<ion-segment-button value="my"> Мои </ion-segment-button>
			</ion-segment>
		</ion-footer>
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
	IonIcon,
} from "@ionic/vue";
import {
	cogOutline,
	notificationsOutline,
	chevronDownCircleOutline,
} from "ionicons/icons";
import { useRouter } from "vue-router";
import { computed, onMounted, ref } from "vue";
import store from "@/store";
import { ClientOrder } from "@/interfaces/client-order.interface";
import { ClientOrderService } from "@/services/client-order.service";

const router = useRouter();

const openSettings = () => {
	router.push("/settings");
};
const openNotifications = () => {
	router.push("/notifications");
};

const is_admin = computed(() => store.getters["isAdmin"]);
const loading = ref<boolean>(true);
const connectionError = ref<boolean>(false);
const allTasksLoaded = ref<boolean>(false);

const clientOrders = ref<ClientOrder[]>([]);

const fetchClientOrders = async () => {
	try {
		const data = await ClientOrderService.getClientOrders(1);

		if (data.length !== 0) {
			clientOrders.value.push(...data);
		} else {
			allTasksLoaded.value = true;
		}
	} catch (error) {
		console.log(error);
		connectionError.value = true;
	} finally {
		loading.value = false;
	}
};

onMounted(() => {
	fetchClientOrders();
});

const handleRefresh = (event: CustomEvent) => {
	setTimeout(() => {
		clientOrders.value = [];
		fetchClientOrders();
		event.target.complete();
	}, 150);
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
</script>
<style>
ion-segment {
	--background: #fff;
}
</style>
