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
import { IonCard, IonCardHeader, IonCardContent } from '@ionic/vue';
import { defineComponent } from 'vue';
import Chart from 'chart.js/auto';

export default defineComponent({
	components: {
		IonCard,
		IonCardHeader,
		IonCardContent,
	},
	data() {
		return {
			// зарплаты за каждый месяц
			salaries: [
				175990,
				188271,
				205011,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0
			]
		};
	},
	mounted() {
		this.renderChart();
	},
	methods: {
		renderChart() {
			const ctx = (this.$refs.chart as HTMLCanvasElement).getContext('2d');
			if (!ctx) return;

			const monthNames = [
				'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
				'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
			];

			new Chart(ctx, {
				type: 'bar',
				data: {
					labels: Array.from({ length: 12 }, (_, i) => i + 1),
					datasets: [{
						label: 'Зарплата за месяц',
						data: this.salaries,
						backgroundColor: this.salaries.map((_, i) => i + 1 === new Date().getMonth() + 1 ? '#eb445a' : '#ccc'),
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
								title: function (context) {
									const labelIndex = context[0].dataIndex;
									return monthNames[labelIndex];
								}
							}
						}
					},
				},
			});
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