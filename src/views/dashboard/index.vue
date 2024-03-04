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
				<ion-title>Truck Service</ion-title>
			</ion-toolbar>
		</ion-header>
		<ion-content :fullscreen="true">
			<ion-header collapse="condense">
				<ion-toolbar>
					<ion-buttons slot="secondary">
						<ion-button>
							<ion-icon slot="icon-only" :ios="notificationsOutline" :md="notificationsOutline"></ion-icon>
						</ion-button>
						<ion-button @click="openSettings">
							<ion-icon slot="icon-only" :ios="cogOutline" :md="cogOutline"></ion-icon>
						</ion-button>
					</ion-buttons>
					<ion-title>Truck Service</ion-title>
				</ion-toolbar>
			</ion-header>

			<div class="content">

				<span class="greeting">
					{{ greeting ?? 'Здравствуйте' }}, {{ username ? username : "" }}!
				</span>

				<CurrentBalance />
				<TimeManager />
				<TaskList />
				<BalanceHistory />
			</div>

		</ion-content>
	</ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonButton, IonIcon } from '@ionic/vue';
import { cogOutline, notificationsOutline } from 'ionicons/icons';

// import BalanceHistory from '@/components/dashboard/balancehistory/index.vue';
import BalanceHistory from '@/components/dashboard/balancehistory/index.vue';
import TaskList from '@/components/dashboard/tasklist/index.vue';
import TimeManager from '@/components/dashboard/timemanager/index.vue';
import CurrentBalance from '@/components/dashboard/currentbalance/index.vue';
import store from "@/store"; // импортируем объект store из файла хранилища Vuex

import { useRouter } from 'vue-router';

const router = useRouter();

const openSettings = () => {
	router.push('/settings');
}

const openNotifications = () => {
	router.push('/notifications');
}

import { ref, onMounted } from 'vue';

const username = ref('');
const greeting = ref('');

const get_greeting = () => {
	const current_time = new Date();
	const current_hour = current_time.getHours();

	if (current_hour < 6) {
		return 'Здравствуйте';
	} else if (current_hour < 12) {
		return 'Доброе утро';
	} else if (current_hour < 18) {
		return 'Добрый день';
	} else {
		return 'Добрый вечер';
	}
};

onMounted(() => {
	username.value = store.state.username;
	greeting.value = get_greeting();
});
</script>

<style scoped>
.content {
	padding: 20px;
	display: flex;
	flex-direction: column;
	gap: 20px;

	background-color: #f0f0f0;
}
</style>