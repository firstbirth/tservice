<template>
	<ion-page>
		<ion-tabs>
			<ion-router-outlet></ion-router-outlet>

			<ion-tab-bar slot="bottom" v-if="isAuthenticated()">
				<ion-tab-button tab="todo" href="/tasks">
					<svg class="icon">
						<use xlink:href="#ui-checks"></use>
					</svg>
					<ion-label>Задачи</ion-label>
				</ion-tab-button>

				<ion-tab-button tab="posts" href="/posts">
					<svg class="icon">
						<use xlink:href="#calendar-week"></use>
					</svg>
					<ion-label>Посты</ion-label>
				</ion-tab-button>

				<ion-tab-button tab="dashboard" href="/dashboard">
					<svg class="icon">
						<use xlink:href="#person-circle"></use>
					</svg>
					<ion-label>Профиль</ion-label>
				</ion-tab-button>

				<ion-tab-button tab="orders" href="/orders">
					<svg class="icon">
						<use xlink:href="#layout-text-sidebar-reverse"></use>
					</svg>
					<ion-label>Заказы</ion-label>
				</ion-tab-button>

				<ion-tab-button tab="misc" href="/misc">
					<svg class="icon">
						<use xlink:href="#three-dots"></use>
					</svg>
					<ion-label>Ещё</ion-label>
				</ion-tab-button>

			</ion-tab-bar>
		</ion-tabs>
	</ion-page>
</template>

<script setup lang="ts">
import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonPage, IonRouterOutlet } from '@ionic/vue';
import { isAuthenticated } from "@/services/AuthService";

</script>

<style scoped>
.icon {
	width: 24px;
	height: 24px;
	margin-bottom: 4px;
}

ion-tab-button {
	color: black;
}

ion-tab-button.tab-selected {
	color: var(--ion-color-danger);
}

ion-tab-button:hover {
	color: var(--ion-color-danger);
}

</style>
