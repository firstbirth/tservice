<template>
	<ion-card id="task-card">
		<ion-card-header> Мои задачи </ion-card-header>
		<ion-card-content>
			<ion-list>
				<ion-item
					:detail="true"
					:button="true"
				v-for="(task, index) in tasks" :key="index"
					@click="
								() => {
									openTask(task.taskUID);
									console.log(task.taskUID);
								}
							"
				>
						<ion-label>
							{{ task.isImportant == "IMPORTANT" ? "🔥 " : "" }}
								{{ task.description !== '' ? task.description : 'Без названия' }}
						</ion-label>
					</ion-item>
			</ion-list>
		</ion-card-content>
	</ion-card>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import {
	IonCard,
	IonCardContent,
	IonCardHeader,
	IonCardSubtitle,
	IonCardTitle,
	IonChip,
	IonCol,
	IonRow,
	IonPage,
	IonHeader,
	IonToolbar,
	IonTitle,
	IonContent,
	IonList,
	IonItem,
	IonCheckbox,
	IonLabel,
	IonItemSliding,
	IonItemOptions,
	IonItemOption,
} from "@ionic/vue";
import { Task } from "@/interfaces/task.interface";
import { TaskService } from "@/services/task.service";
import store from "@/store";

import { useRouter } from "vue-router";
const router = useRouter();

const tasks = ref<Task[]>([]);

const getTasks = async () => {
	const userId = store.state.crutches ? 1 : store.getters["getUserId"];
	const fetchedTasks = await TaskService.getTasks(userId === 0 ? 1 : userId, 0, 5);

	// Фильтруем задачи для текущего пользователя, если это необходимо
	// tasks.value = fetchedTasks.filter(task => task.performerId === userId);
	tasks.value = fetchedTasks; // Уберите комментарий, если фильтрация не нужна

	console.log(tasks.value);
};

// Получаем задачи при монтировании компонента
onMounted(async () => {
	const userId = store.state.crutches ? 1 : store.getters["getUserId"];
	tasks.value = await TaskService.getTasks(store.getters['getUserId'] === 0 ? 1 : store.state.userid, 0, 5);

	// TODO: Пока в задачах не возвращается поле performerId отключаем фильтр, потом вернем
	// здесь нужно оставить только задачи для текущего пользователя, не важно админ он или нет

	// tasks.value = tasks.value.filter(
	// 	(task) => task.performerId === store.getters["getUserId"]
	// );

	console.log(tasks.value);
});

const openTask = (taskUID: string) => {
	router.push({ path: `/tasks/${taskUID}` });
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

ion-list ion-item:last-child {
	--inner-border-width: 0;
}
</style>
