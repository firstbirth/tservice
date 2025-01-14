<template>
  <div>
    <ion-buttons slot="end">
      <ion-button @click="isDateFilterModalOpen = true">
        <ion-icon :icon="filterOutline" slot="start"></ion-icon>
        Фильтр по дате
      </ion-button>
    </ion-buttons>

    <ion-modal :is-open="isDateFilterModalOpen" @didDismiss="isDateFilterModalOpen = false">
      <ion-header>
        <ion-toolbar>
          <ion-title>Фильтр по дате</ion-title>
          <ion-buttons slot="end">
            <ion-button @click="isDateFilterModalOpen = false">Закрыть</ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>
      
      <ion-content class="ion-padding">
        <ion-item>
          <ion-datetime 
            v-model="startDate" 
            presentation="date" 
            :multiple="true" 
            @ionChange="handleDateChange"
            locale="ru-RU"
            :first-day-of-week="1"
          ></ion-datetime>
        </ion-item>
        
        <div class="ion-padding">
          <ion-button expand="block" @click="applyDateFilter">
            Применить фильтр
          </ion-button>
          <ion-button expand="block" fill="clear" @click="clearDateFilter">
            Сбросить
          </ion-button>
        </div>
      </ion-content>
    </ion-modal>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits } from 'vue';
import { 
  IonButton, 
  IonButtons, 
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonDatetime,
  IonIcon
} from '@ionic/vue';
import { filterOutline } from 'ionicons/icons';
import type { WorkOrder } from '@/interfaces/work-order.interface';
import type { Task } from '@/interfaces/task.interface';
// Определяем типы для пропсов
interface Props {
  results: WorkOrder[] | Task[];
  allOrders: WorkOrder[] | Task[];
  isFilterActive: boolean;
  activeDateRange: {
    start_date: number | null;
    end_date: number | null;
  };
}

// Определяем пропсы
const props = defineProps<Props>();

// Определяем эмиты с учетом обоих типов
const emit = defineEmits<{
  'update:results': [orders: WorkOrder[] | Task[]];
  'update:isFilterActive': [value: boolean];
  'update:activeDateRange': [range: { start_date: number | null; end_date: number | null; }];
}>();

// Состояние компонента
const isDateFilterModalOpen = ref(false);
const startDate = ref<string[]>([]);
const dateRange = ref<{
  start_date: number | null;
  end_date: number | null;
}>({
  start_date: null,
  end_date: null
});

// Обработчик изменения даты
const handleDateChange = (event: CustomEvent) => {
  const selectedDates = event.detail.value as string[];
  
  if (selectedDates.length > 0) {
    const dates = selectedDates.sort();
    startDate.value = dates;
    
    // Конвертируем даты в Unix timestamp
    dateRange.value = {
      start_date: new Date(dates[0]).getTime() / 1000,
      end_date: new Date(dates[dates.length - 1]).getTime() / 1000 + 86399 // Добавляем 24 часа - 1 секунда
    };
  }
};

// Применение фильтра с учетом обоих типов
const applyDateFilter = () => {
  if (dateRange.value.start_date && dateRange.value.end_date) {
    const filteredItems = props.allOrders.filter(item => {
      // Проверяем тип элемента и используем соответствующее поле даты
      const itemDate = 'date' in item ? item.date : item.dateCreated;
      return itemDate >= dateRange.value.start_date! && 
             itemDate <= dateRange.value.end_date!;
    });
    
    emit('update:results', filteredItems);
    emit('update:isFilterActive', true);
    emit('update:activeDateRange', dateRange.value);
  }
  isDateFilterModalOpen.value = false;
};

// Сброс фильтра с учетом обоих типов
const clearDateFilter = () => {
  startDate.value = [];
  dateRange.value = {
    start_date: null,
    end_date: null
  };
  
  emit('update:results', props.allOrders as typeof props.results);
  emit('update:isFilterActive', false);
  emit('update:activeDateRange', dateRange.value);
  isDateFilterModalOpen.value = false;
};
</script>