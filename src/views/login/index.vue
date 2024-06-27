<template>
	<ion-page>
		<ion-content :fullscreen="true">
			<div class="login-content">
				<div id="container">
					<ion-img class="login-screen-logo" src="/assets/main_logo.svg"
						alt="Truck Service Kazakhstan"></ion-img>
					<form @submit.prevent="loginHandler" class="login-screen-form">
						<ion-item>
							<ion-input
							class="login-input" v-model="phoneNumber" v-maskito="phoneOptions"
							@input="handle_value($event)"
								:clear-input="true" label="Номер телефона" label-placement="floating"
								placeholder="+7 (___) ___-__-__" type="tel" required />
						</ion-item>
						<ion-item>
							<ion-input class="login-input" v-model="pinCode" inputmode="numeric" label="PIN-код"
								label-placement="floating" placeholder="_ _ _ _ _ _ _" type="password" required />
						</ion-item>
						<ion-button expand="block" type="submit" class="login-button" color="dark">ВХОД</ion-button>
					</form>
				</div>
			</div>
		</ion-content>
	</ion-page>
</template>

<script setup lang="ts">
import { IonImg, IonPage, IonButton, IonItem, IonInput, IonContent, IonIcon } from '@ionic/vue';
import { useRouter } from 'vue-router'; // Import useRouter hook from Vue Router
import { ref } from 'vue';
import { login } from '@/services/AuthService';
import { maskito } from '@maskito/vue';

import phoneOptions from './mask';

const router = useRouter();

const pinCode = ref<string>('');
const phoneNumber = ref<string>('');
let unmaskedPhoneNumber: string = '';

const handle_value = (e: any) => {
	if (e.target.value.replace(/\D/g, '').length === 11) {
		// console.log('accept', e.target.value);
		// unmaskedPhoneNumber = e.detail.value.replace(/\D/g, '');
		unmaskedPhoneNumber = e.target.value.replace(/\D/g, '').slice(1);
		// console.log('unmasked', unmaskedPhoneNumber);
	}
}

const loginHandler = async () => {
	try {
		// Call your login function passing phone number and PIN code
		const success = await login(unmaskedPhoneNumber, pinCode.value);
		if (success) {
			// Redirect user to dashboard or desired route upon successful login
			router.push('/dashboard'); // Use the router instance to push to the desired route
		} else {
			// Handle invalid login credentials
			console.error('Invalid credentials');
		}
	} catch (error) {
		console.error('Login error:', error);
	}
};
</script>

<script lang="ts">

export default {
	components: { IonInput },
	directives: { maskito },
	data: () => ({ phoneOptions }),
};
</script>


<style scoped>
#container {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	flex-wrap: nowrap;
	gap: 64px;
	position: relative;
	width: 100%;
	height: 100%;
	margin: 0 auto;
	padding: 20px;
}

.login-screen-logo {
	max-width: 320px;
	height: auto;
}

.login-screen-form {
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: 1rem;
}

.login-button {
	height: 50px;
}

.login-content {
	padding: 20px;
	display: flex;
	flex-direction: column;
	flex-wrap: wrap;
	gap: 20px;
	height: 100%;

	background-color: #f0f0f0;
}

.input-label-placement-floating.has-focus.sc-ion-input-md-h .label-text-wrapper.sc-ion-input-md,
.input-label-placement-stacked.has-focus.sc-ion-input-md-h .label-text-wrapper.sc-ion-input-md {
	--highlight-color: #b1000d !important;
}

ion-item {
	--ion-safe-area-right: 0;
	--ion-safe-area-left: 0;
}

ion-item label {
	padding-inline: 1rem !important;
}
</style>