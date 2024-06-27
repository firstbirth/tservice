<template>
	<ion-page>
		<ion-header>
			<ion-toolbar>
				<ion-buttons slot="start">
					<ion-back-button default-href="/"></ion-back-button>
				</ion-buttons>
				<ion-title>{{ name }}</ion-title>
			</ion-toolbar>
		</ion-header>
		<ion-content :fullscreen="true">
			<ion-header collapse="condense">
				<ion-toolbar>
					<ion-buttons slot="start">
						<ion-back-button default-href="/"></ion-back-button>
					</ion-buttons>
					<ion-title>{{ name }}</ion-title>
				</ion-toolbar>
			</ion-header>

			<section class="content">
				<!-- {{ id }} -->

				<center>
					<ion-avatar>
					<img
						:src="`https://source.boringavatars.com/beam/128/${name}}?colors=000000,9f111b,b11623,292c37,cccccc`"
					/>
				</ion-avatar>
				</center>
				<p>{{ name }}</p>
				<p>{{ role }}</p>
				<p>{{ email }}</p>
				<p>{{ phone }}</p>
				
			</section>
		</ion-content>
	</ion-page>
</template>

<script setup lang="ts">
import {
	IonAvatar,
	IonPage,
	IonHeader,
	IonToolbar,
	IonTitle,
	IonContent,
	IonButtons,
	IonBackButton,
} from "@ionic/vue";
import ExploreContainer from "@/components/ExploreContainer.vue";

import { useRouter } from "vue-router";
import { onMounted, ref } from "vue";

const router = useRouter();

const id = ref(0);
const name = ref("");
const email = ref("");
const phone = ref("");
const role = ref("");

onMounted(() => {
	id.value = Number(router.currentRoute.value.params.id);
	name.value = router.currentRoute.value.query.name as string;
	email.value = router.currentRoute.value.query.email as string;
	phone.value = router.currentRoute.value.query.phone as string;
	role.value = router.currentRoute.value.query.role as string;
});
</script>

<style scoped>
section.content {
	display: flex;
	flex-direction: column;
	padding: 20px;
	align-self: center;
	justify-content: center;
	text-align: center;
	width: 100%;
	height: 100%;
}
ion-avatar {
	width: 128px;
	height: 128px;
}
</style>
