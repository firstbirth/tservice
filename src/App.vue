<template>
	<ion-app :class="{ dark: darkMode }">
		<custom-iconset />
		<ion-router-outlet />
	</ion-app>
</template>

<script setup lang="ts">
import { IonApp, IonRouterOutlet } from "@ionic/vue";
import { computed, onMounted } from "vue";
import { useStore } from "vuex";
import CustomIconset from "@/components/CustomIconset.vue";

import { PlatformService } from "@/services/platform.service";
import { StatusBar, Style } from "@capacitor/status-bar";


const components = {
	CustomIconset,
};

let darkMode = computed(() => false); // Используем локальное вычисляемое свойство, пока не будет доступно состояние из хранилища

onMounted(() => {
	const store = useStore();
	const darkMode = computed(() => store.state.darkMode);

	// Использование сервиса для определения платформы
	if (PlatformService.isIOS()) {
		StatusBar.setBackgroundColor({ color: "#fff" });
		StatusBar.setStyle({ style: Style.Light });
	}
});
</script>
