<template>
	<ion-page>
		<ion-header>
			<ion-toolbar>
				<ion-buttons slot="start">
					<ion-back-button default-href="/"></ion-back-button>
				</ion-buttons>
				<ion-title>Настройки</ion-title>
			</ion-toolbar>
		</ion-header>
		<ion-content :fullscreen="true">
			<ion-header collapse="condense">
				<ion-toolbar>
					<ion-buttons slot="start">
						<ion-back-button default-href="/"></ion-back-button>
					</ion-buttons>
					<ion-title>Настройки</ion-title>
				</ion-toolbar>
			</ion-header>

			<ion-list>
				<ion-item lines="full">
					<ion-label>
						Тёмная тема
					</ion-label>
					<ion-toggle id="themeToggle" slot="end" aria-label="Тёмная тема"
						:checked="!darkMode" @ionChange="toggleDarkMode"
					></ion-toggle>
				</ion-item>
			</ion-list>
		</ion-content>
	</ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonBackButton, IonList, IonItem, IonToggle, IonLabel } from '@ionic/vue';

import { useStore } from 'vuex';

const store = useStore();

let darkMode = store.state.darkMode;

const toggleDarkMode = (event: any) => {
	store.commit('toggleDarkMode');
	console.log(store.state.darkMode);
}
</script>
