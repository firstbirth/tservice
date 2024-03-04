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
				<ion-title>Ещё</ion-title>
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
					<ion-title>Ещё</ion-title>
				</ion-toolbar>
			</ion-header>

			<div class="content">
				<ion-button expand="block" fill="outline" color="danger" @click="makeLogout">Выйти из аккаунта</ion-button>
			</div>

		</ion-content>
	</ion-page>
</template>

<script setup lang="ts">
import { logout } from '@/services/AuthService';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonButton, IonIcon } from '@ionic/vue';
import { cogOutline, notificationsOutline } from 'ionicons/icons';
import { useRouter } from 'vue-router';

const router = useRouter();

const openSettings = () => {
	router.push('/settings');
}

const openNotifications = () => {
	router.push('/notifications');
}

const makeLogout = async () => {
	// await logout then redirect
	await logout();
	
	// Redirect user to dashboard
	router.push('/dashboard');
}

</script>

<style scoped>
.content {
	padding: 20px;
}
</style>
