<template>
	<ion-card id="task-card">
		<ion-card-header>
			Мои задачи
		</ion-card-header>
		<ion-card-content>
			<ion-list>
				<ion-item-sliding v-for="(task, index) in tasks" :key="index">
					<ion-item>
						<ion-checkbox slot="start" :aria-label="'Чекбокс для задачи ' + task.name"></ion-checkbox>
						<ion-label>{{ task.important ? '🔥 ' : '' }} {{ task.name }}</ion-label>
					</ion-item>

					<ion-item-options>
						<ion-item-option>Подробнее</ion-item-option>
						<ion-item-option color="danger">Удалить</ion-item-option>
					</ion-item-options>
				</ion-item-sliding>
			</ion-list>
			<ion-row>
				<ion-col size="10">
					<ion-input v-model="newTask" placeholder="Название новой задачи"></ion-input>
				</ion-col>
				<ion-col size="2">
					<ion-button @click="addTask()" color="dark" fill="clear">
						<ion-icon slot="icon-only" :icon="addOutline" color="dark"></ion-icon>
					</ion-button>
				</ion-col>
			</ion-row>
		</ion-card-content>
	</ion-card>
</template>

<script lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardContent, IonList, IonItem, IonCheckbox, IonLabel, IonButton, IonRow, IonCol, IonInput, IonIcon, IonItemSliding, IonItemOptions, IonItemOption } from '@ionic/vue';
import { addOutline } from 'ionicons/icons';

export default {
	components: {
		IonPage,
		IonHeader,
		IonToolbar,
		IonTitle,
		IonContent,
		IonCard,
		IonCardHeader,
		IonCardContent,
		IonList,
		IonItem,
		IonCheckbox,
		IonLabel,
		IonButton,
		IonRow,
		IonCol,
		IonInput,
		IonIcon,
		IonItemSliding,
		IonItemOptions,
		IonItemOption,
	},
	data() {
		return {
			tasks: [
				{ name: 'Задача 1', time: '10:00:00', important: true },
				{ name: 'Задача 2', time: '12:30:00', important: false },
				{ name: 'Задача 3', time: '15:45:00', important: false },
			],
			newTask: '',
		};
	},

	setup() {
		return { addOutline };
	},

	methods: {
		addTask() {
			if (this.newTask.trim() !== '') {
				this.tasks.push({ name: this.newTask, time: this.getCurrentTime() });
				this.newTask = '';
			}
		},
		getCurrentTime() {
			const now = new Date();
			return `${this.padZero(now.getHours())}:${this.padZero(now.getMinutes())}:${this.padZero(now.getSeconds())}`;
		},
		padZero(num: number) {
			return (num < 10 ? '0' : '') + num;
		},
		openMenu(index) {
			// Логика для открытия меню для задачи с индексом index
			// Здесь можно реализовать логику для отображения меню
		},
	},
};
</script>

<style scoped>
#task-card {
	background: white;
	margin: 0;
}

#task-card .card-content {
	padding: 1rem;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: space-between;
	gap: 1rem;
}

#task-card .card-content .item {
	display: flex;
	align-items: flex-start;
	gap: 0;
	flex-direction: column;
}

#task-card ion-card-header {
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
	padding-bottom: 0 !important;
}

.add-task {
	width: 44px;
	height: 44px;
}

ion-item {
	--ion-safe-area-right: 0;
	--ion-safe-area-left: 0;
}
</style>