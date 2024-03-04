<template>
	<ion-card id="balance-card" @click="openBalance" :button="true">
		<div class="card-content">
			<ion-row class="w-100">
				<ion-col size="10" class="balance-data">
					<div class="item">
						<strong>Мой баланс</strong>
						<span class="current">{{ balance ? formatNumber(balance) : 0 }} ₸</span>
					</div>
					<div class="item">
						<strong>Открытые ЗН</strong>
						<span class="pending">+ {{ pending_balance ? formatNumber(pending_balance) : 0 }} ₸</span>
					</div>
				</ion-col>
				<ion-col size="2">
					<div class="flex-centered">
						<svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" fill="white"
							class="bi bi-chevron-compact-right" viewBox="0 0 16 16">
							<path fill-rule="evenodd"
								d="M6.776 1.553a.5.5 0 0 1 .671.223l3 6a.5.5 0 0 1 0 .448l-3 6a.5.5 0 1 1-.894-.448L9.44 8 6.553 2.224a.5.5 0 0 1 .223-.671" />
						</svg>
					</div>
				</ion-col>
			</ion-row>
		</div>
	</ion-card>
</template>

<script setup lang="ts">
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonButton, IonCol, IonRow } from '@ionic/vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// разделить число на разряды
const formatNumber = (x: number) => {
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

let balance: number = 123456;
let pending_balance: number = 74815;

const openBalance = () => {
	router.push('/dashboard/balance');
}
</script>

<style scoped>
#balance-card {
	background-image: radial-gradient(circle, rgba(0, 33, 66, .5) 0%, rgba(255, 255, 255, 1) 50%, rgba(255, 255, 255, 1) 100%), url('/assets/images/dashboard/balance-card-bg.jpg');
	background-size: 200% 200%, cover;
	background-position: 0% center, center;
	background-repeat: no-repeat;
	margin: 0;
}

#balance-card .card-content {
	padding: 1rem;
}

.balance-data {
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: space-between;
	gap: .5rem;
}

#balance-card .card-content .item {
	display: flex;
	align-items: flex-start;
	gap: 0px;
	flex-direction: column;
}

#balance-card .card-content span.current {
	color: #369;
	font-family: Roboto, var(--default-font-family);
	font-size: 24px;
	font-weight: 900;
	line-height: 24px;
	text-align: left;
	white-space: nowrap;
}

#balance-card .card-content span.pending {
	color: var(--ion-color-danger);
	font-family: Roboto, var(--default-font-family);
	font-size: 24px;
	font-weight: 900;
	line-height: 24px;
	text-align: left;
	white-space: nowrap;
}

#balance-card .card-content strong {
	flex-shrink: 0;
	flex-basis: auto;
	color: #666666;
	font-family: Roboto, var(--default-font-family);
	font-size: 10px;
	font-weight: 500;
	line-height: 16px;
	text-align: left;
	text-transform: uppercase;
	white-space: nowrap;
	letter-spacing: 1.5px;
}

.w-100 {
	width: 100%;
}

.icon-chevron {
	width: 24px;
	height: 24px;
}

.flex-centered {
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
}
</style>