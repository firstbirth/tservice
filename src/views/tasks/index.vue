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
		</ion-header>
		<ion-content :fullscreen="true">
			<ion-header collapse="condense">
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
			</ion-header>

			<ion-fab slot="fixed" vertical="bottom" horizontal="end">
				<ion-fab-button color="danger" @click="openNewTodo">
					<ion-icon :icon="add"></ion-icon>
				</ion-fab-button>
			</ion-fab>

			<ExploreContainer name="Список задач" />
		</ion-content>
	</ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonButton, IonIcon, IonFab, IonFabButton } from '@ionic/vue';
import { cogOutline, notificationsOutline, add } from 'ionicons/icons';

import ExploreContainer from '@/components/ExploreContainer.vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const openSettings = () => {
	router.push('/settings');
}

const openNotifications = () => {
	router.push('/notifications');
}

const openNewTodo = () => {
	router.push('/tasks/add');
}
</script>

<style>
ion-fab-button {
	/* --background: #b7f399; */
	/* --background-activated: #87d361; */
	/* --background-hover: #a3e681; */
	--border-radius: 15px;
	--box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.3), 0px 1px 3px 1px rgba(0, 0, 0, 0.15);
	--color: black;
}
</style>