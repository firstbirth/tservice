<template>
  <ion-app :class="{ dark: darkMode }">
    <custom-iconset />
    <ion-router-outlet />
  </ion-app>
</template>

<script setup lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import CustomIconset from '@/components/CustomIconset.vue';

const components = {
	CustomIconset
};

let darkMode = computed(() => false); // Используем локальное вычисляемое свойство, пока не будет доступно состояние из хранилища

onMounted(() => {
  const store = useStore();
  const darkMode = computed(() => store.state.darkMode);
});
</script>
