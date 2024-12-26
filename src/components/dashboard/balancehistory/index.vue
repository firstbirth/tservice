<template>
	<ion-card id="salary-card">
		<ion-card-header>
			Баланс за этот год
		</ion-card-header>
		<ion-card-content>
			<div>
				<canvas ref="chart"></canvas>
			</div>
		</ion-card-content>
	</ion-card>
</template>

<script lang="ts">
import { IonCard, IonCardHeader, IonCardContent } from "@ionic/vue";
import { defineComponent, onMounted, ref } from "vue";
import Chart from "chart.js/auto";
import { BalanceService } from "@/services/balance.service";
import store from "@/store";

export default defineComponent({
	components: {
		IonCard,
		IonCardHeader,
		IonCardContent,
	},
	data() {
		return {
			// зарплаты за каждый месяц
			salaries: Array(12).fill(0), // Инициализация массива с нулями
		};
	},
	mounted() {
		this.getSalary(); // Загрузка данных сразу при монтировании
	},
	methods: {
		renderChart() {
			const ctx = (this.$refs.chart as HTMLCanvasElement).getContext("2d");
			if (!ctx) return;

			const monthNames = [
				"Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
				"Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь",
			];

			new Chart(ctx, {
				type: "bar",
				data: {
					labels: monthNames, // Используем месяцы как метки
					datasets: [{
						label: "Зарплата за месяц",
						data: this.salaries,
						backgroundColor: this.salaries.map((_, i) => i + 1 === new Date().getMonth() ? "#eb445a" : "#ccc"), // Цвет для текущего месяца
					}],
				},
				options: {
					scales: {
						y: {
							beginAtZero: true,
						},
					},
					plugins: {
						legend: {
							display: false, // Отключение легенды
						},
						tooltip: {
							callbacks: {
								title: function(context) {
									const labelIndex = context[0].dataIndex;
									return monthNames[labelIndex]; // Названия месяцев для тултипов
								},
							},
						},
					},
				},
			});
		},

		async getSalary() {
			let salary_data;

			try {
				salary_data = await BalanceService.getUserSalary(store.getters["getUserId"] === 0 ? 1 : store.getters["getUserId"]);
			} catch (error) {
				console.error("Error:", error);
			}

			// Проверяем, что данные получены
			if (salary_data) {
				const salaryMapping = {
					1: "top1",
					2: "top2",
					3: "top3",
					4: "top4",
					5: "top5",
					6: "top6",
					7: "top7",
					8: "top8",
					9: "top9",
					10: "top10",
					11: "top11",
					12: "top12",
				};

				// Инициализация массива с нулями
				let updatedSalaries = Array(12).fill(0);

				// Проходим по данным с сервера и заполняем зарплаты для соответствующих месяцев
				for (let month = 1; month <= 5; month++) {
					const salaryKey = salaryMapping[month];
					if (salary_data[salaryKey] !== undefined) {
						updatedSalaries[month - 1] = salary_data[salaryKey]; // Устанавливаем зарплату в соответствующий месяц
					}
				}

				// Обновляем массив зарплат в компоненте
				this.salaries = updatedSalaries;

				// После обновления данных перерисовываем график
				this.$nextTick(() => {
					this.renderChart(); // Перерисовываем график после обновления данных
				});
			}
		},
	},
});

</script>

<style scoped>
#salary-card {
	margin: 0;
}

#salary-card ion-card-header {
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
</style>