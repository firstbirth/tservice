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
				<ion-title>Ещё</ion-title>
			</ion-toolbar>
		</ion-header>
		<ion-content :fullscreen="true">
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
					<ion-title>Ещё</ion-title>
				</ion-toolbar>
			</ion-header>

			<section class="content">
				<ion-list>
					<ion-item
						v-if="store.state.role === 'Админы'"
						:button="true"
						class="ion-no-padding"
						@click="openUserList"
						:detail="true"
					>
						<ion-label>Список сотрудников</ion-label>
					</ion-item>

					<ion-item
						:button="true"
						class="ion-no-padding"
						@click="openSettings"
						:detail="true"
					>
						<ion-icon
							:ios="cogOutline"
							:md="cogOutline"
						></ion-icon>
						<ion-label>Настройки</ion-label>
					</ion-item>
					<ion-item
						:button="true"
						class="ion-no-padding"
						@click="openSearch"
						:detail="true"
					>
						<ion-icon
							:ios="searchCircleOutline"
							:md="searchCircleOutline"
						></ion-icon>
						<ion-label>Поиск товаров</ion-label>
					</ion-item>
				</ion-list>

				<ion-button
					expand="block"
					fill="outline"
					color="danger"
					@click="presentAlert"
					>Выйти из аккаунта</ion-button
				>
			</section>
		</ion-content>
	</ion-page>
</template>

<script setup lang="ts">


import { logout } from "@/services/AuthService";
import {
	IonList,
	IonItem,
	IonLabel,
	IonPage,
	IonHeader,
	IonToolbar,
	IonTitle,
	IonContent,
	IonButtons,
	IonButton,
	IonIcon,
	alertController,
} from "@ionic/vue";
import { cogOutline, notificationsOutline, searchCircleOutline } from "ionicons/icons";
import { useRouter } from "vue-router";
import store from "@/store";


const router = useRouter();

const openSearch = () => {
	router.push("/search");
};
const openSettings = () => {
	router.push("/settings");
};

const openNotifications = () => {
	router.push("/notifications");
};

const makeLogout = async () => {
	// await logout then redirect
	await logout();

	// Redirect user to dashboard
	router.push("/dashboard");
};

const presentAlert = async () => {
	const alert = await alertController.create({
		header: "Выход",
		message: "Вы собираетесь выйти из аккаунта. Продолжить?",
		buttons: [
			{
				text: "Отмена",
				role: "cancel",
				htmlAttributes: {
					"aria-label": "отмена",
				},
				handler: () => {},
			},
			{
				text: "Выход",
				role: "destructive",
				htmlAttributes: {
					"aria-label": "выход",
				},
				handler: () => {
					makeLogout();
				},
			},
		],
	});

	await alert.present();
};

const openUserList = () => {
	router.push("/users");
};
</script>

<style scoped>
.content {
	padding: 20px;
}
svg.icon {
	margin-right: 0;
}
.icon {
	width: 24px;
	height: 24px;
	color: #171717;
}

ion-list {
	--background: transparent;
	--ion-item-background: transparent;
	--ion-background-color: transparent;
}

ion-list ion-item {
	--background: transparent;
	--ion-item-background: transparent;
	--ion-background-color: transparent;

	ion-icon,
	svg.icon {
		margin-right: 1rem
	}
}

</style>
