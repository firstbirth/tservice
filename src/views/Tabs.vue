<template>
	<ion-page>
		<ion-tabs>
			<ion-router-outlet></ion-router-outlet>

			<ion-tab-bar slot="bottom" v-if="isAuthenticated()">
				<ion-tab-button
					tab="todo"
					href="/tasks"
					@click="hapticsImpactLight"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						fill="currentColor"
						class="icon bi bi-clipboard-check"
						viewBox="0 0 16 16"
					>
						<path
							fill-rule="evenodd"
							d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0"
						/>
						<path
							d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1z"
						/>
						<path
							d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0z"
						/>
					</svg>

					<ion-label>Задачи</ion-label>
				</ion-tab-button>

				<ion-tab-button
					tab="posts"
					href="/posts"
					@click="hapticsImpactLight"
				>
					<svg class="icon">
						<use xlink:href="#calendar-week"></use>
					</svg>
					<ion-label>Посты</ion-label>
				</ion-tab-button>

				<ion-tab-button
					tab="dashboard"
					href="/dashboard"
					@click="hapticsImpactLight"
				>
					<svg class="icon">
						<use xlink:href="#person-circle"></use>
					</svg>
					<ion-label>Профиль</ion-label>
				</ion-tab-button>

				<ion-tab-button
					tab="orders"
					href="/orders"
					@click="hapticsImpactLight"
				>
					<svg class="icon">
						<use xlink:href="#layout-text-sidebar-reverse"></use>
					</svg>
					<ion-label>Заказы</ion-label>
				</ion-tab-button>

				<ion-tab-button
					tab="misc"
					href="/misc"
					@click="hapticsImpactLight"
				>
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
import {
	IonTabBar,
	IonTabButton,
	IonTabs,
	IonLabel,
	IonPage,
	IonRouterOutlet,
} from "@ionic/vue";
import { isAuthenticated } from "@/services/AuthService";

import { Haptics, ImpactStyle } from "@capacitor/haptics";

const hapticsImpactLight = async () => {
	await Haptics.impact({ style: ImpactStyle.Light });
};
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
