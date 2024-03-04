<template>
	<ion-card id="time-card">
		<ion-card-header>
			Мои заказ-наряды
		</ion-card-header>
		<ion-card-content>
			<ion-list>
				<ion-item :button="true" :detail="false" v-for="(task, index) in tasks" :key="index">
					<div class="column">
						<ion-text class="order-name">
							{{ task.name }}
						</ion-text>

						<ion-row class="timer" :class="{ 'timer-running': task.running }">
							<ion-col size="6">
								<div class="task-authors">
									<ion-avatar v-if="task.author && task.author.name">
										<ion-img :src="task.author.avatar"></ion-img>
									</ion-avatar>

									<ion-avatar v-if="task.engineer && task.engineer.name">
										<ion-img :src="task.engineer.avatar"></ion-img>
									</ion-avatar>

									<ion-avatar v-if="task.master && task.master.name">
										<ion-img :src="task.master.avatar"></ion-img>
									</ion-avatar>
								</div>
							</ion-col>
							<ion-col size="6">
								<div class="time-controls">

									{{ formatTime(task.time) }}

									<ion-button :color="task.running ? 'success' : 'dark'"
										:fill="task.running ? 'outline' : 'outline'" shape="round"
										@click="toggleTimer(index)"
										:class="{ 'task-timer-button-running': task.running, 'task-timer-button-stopped': !task.running }">
										<ion-icon :icon="task.running ? pauseIcon : playIcon"
											class="custom-icon"></ion-icon>
									</ion-button>

								</div>
							</ion-col>
						</ion-row>

					</div>

				</ion-item>
			</ion-list>
		</ion-card-content>
	</ion-card>
</template>
  
<script lang="ts">
import {
	IonCard, IonCardHeader, IonCardContent, IonText, IonImg,
	IonList, IonItem, IonAvatar, IonLabel, IonButton, IonIcon, IonRow, IonCol
} from '@ionic/vue';
import { flag, play, pause } from 'ionicons/icons';

export default {
	components: {
		IonCard,
		IonCardHeader,
		IonCardContent,
		IonList,
		IonItem,
		IonText,
		IonAvatar,
		IonLabel,
		IonButton,
		IonIcon,
		IonImg,
		IonRow,
		IonCol,
	},
	data() {
		return {
			tasks: [
				{
					name: 'Длинное название заказ-наряда в несколько строк для наглядной демонстрации',
					time: 0,
					running: false,

					author: {
						name: 'Автор',
						avatar: 'https://ionicframework.com/docs/img/demos/avatar.svg'
					},
					engineer: {
						name: 'Инженер',
						avatar: 'https://ionicframework.com/docs/img/demos/avatar.svg'
					},
					master: {
						name: 'Мастер',
						avatar: 'https://ionicframework.com/docs/img/demos/avatar.svg'
					}
				},
				{
					name: 'Заказ-наряд 2',
					time: 0,
					running: false,

					author: {
						name: 'Автор',
						avatar: 'https://ionicframework.com/docs/img/demos/avatar.svg'
					},
					master: {
						name: 'Мастер',
						avatar: 'https://ionicframework.com/docs/img/demos/avatar.svg'
					}
				},
				{
					name: 'Заказ-наряд 3',
					time: 0,
					running: false,

					author: {
						name: 'Автор',
						avatar: 'https://ionicframework.com/docs/img/demos/avatar.svg'
					},
					master: {
						name: 'Мастер',
						avatar: 'https://ionicframework.com/docs/img/demos/avatar.svg'
					}
				},
			],
			playIcon: play,
			pauseIcon: pause,
			flagIcon: flag,
			intervalId: null,
		};
	},
	methods: {
		toggleTimer(index: number) {
			const task = this.tasks[index];

			// Если таймер уже запущен, останавливаем его
			if (task.timerId) {
				clearInterval(task.timerId);
				task.timerId = undefined;
				task.running = false;
			} else {
				// Запускаем таймер, сохраняем его идентификатор в объекте задачи
				task.timerId = setInterval(() => {
					task.time++;
				}, 1000);
				task.running = true;
			}
		},
		formatTime(seconds: number) {
			const hours = Math.floor(seconds / 3600);
			const minutes = Math.floor((seconds % 3600) / 60);
			const secs = seconds % 60;
			return `${this.padZero(hours)}:${this.padZero(minutes)}:${this.padZero(secs)}`;
		},
		padZero(num: number) {
			return num.toString().padStart(2, '0');
		},
	},
	beforeUnmount() {
		// Очищаем все интервалы перед удалением компонента
		this.tasks.forEach(task => {
			if (task.timerId) {
				clearInterval(task.timerId);
			}
		});
	},
};
</script>

<style scoped>
#time-card {
	background: white;
	margin: 0;
}

#time-card .card-content {
	padding: 0 !important;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: space-between;
	gap: 1rem;
}

#time-card .card-content .item {
	display: flex;
	align-items: flex-start;
	gap: 0;
	flex-direction: column;
}
#time-card .card-content strong {
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

.order-name {
	font-weight: bold;
	margin-bottom: 0;
	padding-block: 0;
}

.timer {
	font-size: 1.2em;
	font-weight: bold;
	color: #666;
	align-items: center;
}

.time-controls {
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 1rem;
}

.timer-running {
	color: #3b9e62;
}

.task-timer-button-running,
.task-timer-button-stopped {
	width: 44px;
	height: 44px;
}

.task-timer-button-running {
	--ion-color-base: #3b9e62 !important;
	/* Цвет кнопки при запущенном таймере */
}

.task-timer-button-stopped {
	/* --background: #666; */
	/* Цвет кнопки при остановленном таймере */
	--border-color: #3b9e62;
}

.custom-icon {
	width: 24px;
	height: 24px;
}

#time-card ion-card-header {
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

.task-authors {
	display: flex;
	align-items: center;
	gap: 1rem;
}

.task-authors ion-avatar {
	width: 24px;
	height: 24px;
}

.column {
	display: flex !important;
	flex-direction: column !important;
	width: 100%;
	padding: 1rem;
	padding-bottom: .5rem;
}

ion-item {
	--ion-safe-area-right: 0;
	--ion-safe-area-left: 0;
}
</style>