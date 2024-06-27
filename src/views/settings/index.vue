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

			<section class="content">
				<ion-list lines="full">
					<ion-item>
						<ion-label>
							Тёмная тема
						</ion-label>
						<ion-toggle id="themeToggle" slot="end" aria-label="Тёмная тема" :checked="darkMode"
							@ionChange="toggleDarkMode"></ion-toggle>
					</ion-item>

					<ion-item lines="full">
						<ion-label>
							<h2>🩼 Режим костылей</h2>
							<p>Включает или выключает использование в приложении каких-либо обходных путей для обеспечения его функциональности.</p>
						</ion-label>
						<ion-toggle id="crutchesToggle"
						slot="end" aria-label="Костыли" :checked="crutches"
							@ionChange="toggleCrutches()"></ion-toggle>
					</ion-item>
				</ion-list>
			</section>
		</ion-content>
	</ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonBackButton, IonList, IonItem, IonToggle, IonLabel } from '@ionic/vue';

import { useStore } from 'vuex';

const store = useStore();

let darkMode = store.state.darkMode;
let crutches = store.state.crutches;

const toggleDarkMode = (event: any) => {
	store.commit('toggleDarkMode');
	console.log(store.state.darkMode);
}

const toggleCrutches = (event: any) => {
	store.commit('toggleCrutches');
	console.log(store.state.crutches);
}
</script>

<style scoped>
section.content {
	padding: 20px;
	display: flex;
	flex-direction: column;
	gap: 20px;
	background-color: #f2f2f2 !important;
}
</style>