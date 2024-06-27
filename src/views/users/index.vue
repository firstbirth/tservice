<template>
	<ion-page>
		<ion-header>
			<ion-toolbar>
				<ion-buttons slot="start">
					<ion-back-button default-href="/"></ion-back-button>
				</ion-buttons>
				<ion-title>Список сотрудников</ion-title>
			</ion-toolbar>
			<ion-toolbar v-if="!connectionError">
				<ion-searchbar
					inputmode="search"
					class="custom"
					placeholder="Поиск"
					:debounce="350"
					:animated="true"
					@ionInput="handleInput($event)"
				></ion-searchbar>
			</ion-toolbar>
		</ion-header>
		<ion-content :fullscreen="true">
			<ion-header collapse="condense">
				<ion-toolbar>
					<ion-buttons slot="start">
						<ion-back-button default-href="/"></ion-back-button>
					</ion-buttons>
					<ion-title>Список сотрудников</ion-title>
				</ion-toolbar>
				<ion-toolbar v-if="!connectionError">
					<ion-searchbar
						inputmode="search"
						class="custom"
						placeholder="Поиск"
						:debounce="350"
						:animated="true"
						@ionInput="handleInput($event)"
					></ion-searchbar>
				</ion-toolbar>
			</ion-header>

			<ion-list>
				<ion-item-sliding v-for="user in results" class="fadeIn">
					<ion-item
						:class="(user.userStatus === 'ACTIVE') ? '' : 'inactive'"
						@click="openUser(String(user.oid), user)"
						:detail="true"
						:button="true"
					>
						<ion-avatar slot="start">
							<img
								:src="`https://source.boringavatars.com/beam/128/${user.worker}}?colors=000000,9f111b,b11623,292c37,cccccc`"
							/>
						</ion-avatar>
						<ion-label>
							<h3>
								{{
									user.worker !== ""
										? user.worker
										: "Без имени"
								}}
							</h3>
							<p>{{ user.role }}</p>
						</ion-label>
					</ion-item>

					<ion-item-options>
						<ion-item-option
							color="dark"
							v-if="user.email"
							@click="email(user.email)"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								fill="currentColor"
								class="bi bi-envelope-open"
								viewBox="0 0 16 16"
							>
								<path
									d="M8.47 1.318a1 1 0 0 0-.94 0l-6 3.2A1 1 0 0 0 1 5.4v.817l5.75 3.45L8 8.917l1.25.75L15 6.217V5.4a1 1 0 0 0-.53-.882zM15 7.383l-4.778 2.867L15 13.117zm-.035 6.88L8 10.082l-6.965 4.18A1 1 0 0 0 2 15h12a1 1 0 0 0 .965-.738ZM1 13.116l4.778-2.867L1 7.383v5.734ZM7.059.435a2 2 0 0 1 1.882 0l6 3.2A2 2 0 0 1 16 5.4V14a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V5.4a2 2 0 0 1 1.059-1.765z"
								/>
							</svg>
						</ion-item-option>
						<ion-item-option color="primary" @click="call(user)">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								fill="currentColor"
								class="bi bi-telephone-outbound"
								viewBox="0 0 16 16"
							>
								<path
									d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.6 17.6 0 0 0 4.168 6.608 17.6 17.6 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.68.68 0 0 0-.58-.122l-2.19.547a1.75 1.75 0 0 1-1.657-.459L5.482 8.062a1.75 1.75 0 0 1-.46-1.657l.548-2.19a.68.68 0 0 0-.122-.58zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877zM11 .5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V1.707l-4.146 4.147a.5.5 0 0 1-.708-.708L14.293 1H11.5a.5.5 0 0 1-.5-.5"
								/>
							</svg>
						</ion-item-option>
						<ion-item-option
							class="whatsapp"
							v-if="!user.phone.includes('+77152')"
							@click="openWhatsapp(user.phone)"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								fill="currentColor"
								class="bi bi-whatsapp"
								viewBox="0 0 16 16"
							>
								<path
									d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"
								/>
							</svg>
						</ion-item-option>
					</ion-item-options>
				</ion-item-sliding>
			</ion-list>
		</ion-content>

		<ion-footer>
			<ion-segment
				value="active"
				color="danger"
				class="task_filter fadeInDown"
			>
				<ion-segment-button value="active" @click="filterActive()">
					<ion-label>Активные</ion-label>
				</ion-segment-button>

				<ion-segment-button value="inactive" @click="filterInactive()">
					<ion-label>Неактивные</ion-label>
				</ion-segment-button>
			</ion-segment>
		</ion-footer>
	</ion-page>
</template>

<script setup lang="ts">
import {
	IonPage,
	IonHeader,
	IonToolbar,
	IonTitle,
	IonContent,
	IonButtons,
	IonBackButton,
	IonList,
	IonItemSliding,
	IonItem,
	IonAvatar,
	IonLabel,
	IonIcon,
	IonFooter,
	IonItemOptions,
	IonItemOption,
	IonSegment,
	IonSegmentButton,
	IonSearchbar,
} from "@ionic/vue";

import { archive, heart, trash } from "ionicons/icons";

import { onMounted, ref } from "vue";

import { useRouter } from "vue-router";

import { User } from "@/interfaces/user.interface";
import { UserService } from "@/services/user.service";

import { Browser } from "@capacitor/browser";

const users = ref<User[]>([]);
const results = ref<User[]>([]);

const router = useRouter();

onMounted(async () => {
	users.value = await UserService.getUsers();
	results.value = [...users.value];
	filterActive();
	// console.log(users.value);
});

// const openUser = (id: string) => {
// 	router.push(`/users/${id}`);
// };

const openUser = (id: string, data: any) => {
	router.push({ path: `/users/${id}`, query: {
		name: data.worker,
		role: data.role,
		status: data.userStatus,
		phone: data.phone,
		email: data.email
	} })
};

const openWhatsapp = (phone: string) => {
	phone = phone.replace(/\D/g, "");
	Browser.open({ url: `https://wa.me/${phone}` });
};

const call = (phone: string) => {
	phone = phone.replace(/\D/g, "");
	window.open(`tel:${phone}`);
};

const email = (email: string) => {
	Browser.open({ url: `mailto:${email}` });
};

const handleInput = (event: { target: { value: string } }) => {
	const query = event.target.value.toLowerCase();
	results.value = users.value.filter((user) => {
		return (
			user.worker.toLowerCase().indexOf(query) > -1 ||
			user.role.toLowerCase().indexOf(query) > -1
		);
	});

	if (query.length === 0) {
		results.value = [...users.value];
	}
};

const filterActive = () => {
	results.value = [...users.value].filter((user) => {
		return user.userStatus !== "ACTIVE";
	});
};

const filterInactive = () => {
	results.value = [...users.value].filter((user) => {
		return user.userStatus === "ACTIVE";
	});
};
</script>

<style scoped>
ion-item-option {
	aspect-ratio: 1/1;
}

.whatsapp {
	--background: #337f66;
	--background-hover: #456f61;
	--background-activated: #2d6955;
	--background-focused: #337f66;
	--color: white;
}

ion-searchbar.custom {
	--background: #f2f2f2;
	--color: #171717;
	--placeholder-color: #666;
	--icon-color: #666;
	--clear-button-color: #666;

	--border-radius: 0.5rem;

	--box-shadow: none;
}

ion-footer {
	background-color: white;
}

</style>
