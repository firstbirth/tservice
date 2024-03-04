<template>
	<ion-page>
		<ion-header>
			<ion-toolbar>
				<ion-buttons slot="start">
					<ion-back-button default-href="/"></ion-back-button>
				</ion-buttons>
				<ion-title>Поставить задачу</ion-title>
			</ion-toolbar>
		</ion-header>
		<ion-content :fullscreen="true">
			<ExploreContainer name="Форма постановки задачи" />
		</ion-content>
	</ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonBackButton } from '@ionic/vue';
import ExploreContainer from '@/components/ExploreContainer.vue';
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