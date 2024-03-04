<!-- src/components/TestComponent.vue -->

<template>
	<div id="container">
		<strong>Имя: {{ data.username }}</strong>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ApiService from '@/services/ApiService';

export default defineComponent({
	data() {
		return {
			data: {
				username: 'user_name'
			}
		};
	},
	async mounted() {
		try {
			this.data = {
				username: localStorage.getItem('username') ?? ""
			};
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	}
});
</script>

<style>
#container {
	text-align: center;
	position: absolute;
	left: 0;
	right: 0;
	top: 50%;
	transform: translateY(-50%);
}

#container strong {
	font-size: 20px;
	line-height: 26px;
}

#container p {
	font-size: 16px;
	line-height: 22px;
	color: #8c8c8c;
	margin: 0;
}

#container a {
	text-decoration: none;
}
</style>
