/* __placeholder__ */
import { ref, onMounted } from "vue";
import { IonCard, IonCardContent, IonCardHeader, IonList, IonItem, IonLabel, } from "@ionic/vue";
import { TaskService } from "@/services/task.service";
import store from "@/store";
import { useRouter } from "vue-router";
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
const router = useRouter();
const tasks = ref([]);
// Получаем задачи при монтировании компонента
onMounted(async () => {
    const userId = store.state.crutches ? 1 : store.getters["getUserId"];
    tasks.value = await TaskService.getTasks(userId, 0, 5);
    // TODO: Пока в задачах не возвращается поле performerId отключаем фильтр, потом вернем
    // здесь нужно оставить только задачи для текущего пользователя, не важно админ он или нет
    // tasks.value = tasks.value.filter(
    // 	(task) => task.performerId === store.getters["getUserId"]
    // );
    console.log(tasks.value);
});
const openTask = (taskUID) => {
    router.push({ path: `/tasks/${taskUID}` });
};
const __VLS_fnComponent = (await import('vue')).defineComponent({});
let __VLS_functionalComponentProps;
const __VLS_modelEmitsType = {};
function __VLS_template() {
    let __VLS_ctx;
    /* Components */
    let __VLS_otherComponents;
    let __VLS_own;
    let __VLS_localComponents;
    let __VLS_components;
    let __VLS_styleScopedClasses;
    // CSS variable injection 
    // CSS variable injection end 
    let __VLS_resolvedLocalAndGlobalComponents;
    // @ts-ignore
    const __VLS_0 = {}
        .IonCard;
    ({}.IonCard);
    ({}.IonCard);
    __VLS_components.IonCard;
    __VLS_components.ionCard;
    __VLS_components.IonCard;
    __VLS_components.ionCard;
    // @ts-ignore
    [IonCard, IonCard,];
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({ id: ("task-card"), }));
    const __VLS_2 = __VLS_1({ id: ("task-card"), }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    ({}({ id: ("task-card"), }));
    // @ts-ignore
    const __VLS_6 = {}
        .IonCardHeader;
    ({}.IonCardHeader);
    ({}.IonCardHeader);
    __VLS_components.IonCardHeader;
    __VLS_components.ionCardHeader;
    __VLS_components.IonCardHeader;
    __VLS_components.ionCardHeader;
    // @ts-ignore
    [IonCardHeader, IonCardHeader,];
    // @ts-ignore
    const __VLS_7 = __VLS_asFunctionalComponent(__VLS_6, new __VLS_6({}));
    const __VLS_8 = __VLS_7({}, ...__VLS_functionalComponentArgsRest(__VLS_7));
    ({}({}));
    (__VLS_11.slots).default;
    const __VLS_11 = __VLS_pickFunctionalComponentCtx(__VLS_6, __VLS_8);
    // @ts-ignore
    const __VLS_12 = {}
        .IonCardContent;
    ({}.IonCardContent);
    ({}.IonCardContent);
    __VLS_components.IonCardContent;
    __VLS_components.ionCardContent;
    __VLS_components.IonCardContent;
    __VLS_components.ionCardContent;
    // @ts-ignore
    [IonCardContent, IonCardContent,];
    // @ts-ignore
    const __VLS_13 = __VLS_asFunctionalComponent(__VLS_12, new __VLS_12({}));
    const __VLS_14 = __VLS_13({}, ...__VLS_functionalComponentArgsRest(__VLS_13));
    ({}({}));
    // @ts-ignore
    const __VLS_18 = {}
        .IonList;
    ({}.IonList);
    ({}.IonList);
    __VLS_components.IonList;
    __VLS_components.ionList;
    __VLS_components.IonList;
    __VLS_components.ionList;
    // @ts-ignore
    [IonList, IonList,];
    // @ts-ignore
    const __VLS_19 = __VLS_asFunctionalComponent(__VLS_18, new __VLS_18({}));
    const __VLS_20 = __VLS_19({}, ...__VLS_functionalComponentArgsRest(__VLS_19));
    ({}({}));
    for (const [task, index] of __VLS_getVForSourceType((__VLS_ctx.tasks))) {
        // @ts-ignore
        const __VLS_24 = {}
            .IonItem;
        ({}.IonItem);
        ({}.IonItem);
        __VLS_components.IonItem;
        __VLS_components.ionItem;
        __VLS_components.IonItem;
        __VLS_components.ionItem;
        // @ts-ignore
        [IonItem, IonItem,];
        // @ts-ignore
        const __VLS_25 = __VLS_asFunctionalComponent(__VLS_24, new __VLS_24({ ...{ 'onClick': {} }, detail: ((true)), button: ((true)), key: ((index)), }));
        const __VLS_26 = __VLS_25({ ...{ 'onClick': {} }, detail: ((true)), button: ((true)), key: ((index)), }, ...__VLS_functionalComponentArgsRest(__VLS_25));
        ({}({ ...{ 'onClick': {} }, detail: ((true)), button: ((true)), key: ((index)), }));
        let __VLS_30;
        const __VLS_31 = {
            onClick: (() => {
                __VLS_ctx.openTask(task.taskUID);
                console.log(task.taskUID);
            })
        };
        // @ts-ignore
        const __VLS_32 = {}
            .IonLabel;
        ({}.IonLabel);
        ({}.IonLabel);
        __VLS_components.IonLabel;
        __VLS_components.ionLabel;
        __VLS_components.IonLabel;
        __VLS_components.ionLabel;
        // @ts-ignore
        [IonLabel, IonLabel,];
        // @ts-ignore
        const __VLS_33 = __VLS_asFunctionalComponent(__VLS_32, new __VLS_32({}));
        const __VLS_34 = __VLS_33({}, ...__VLS_functionalComponentArgsRest(__VLS_33));
        ({}({}));
        (task.isImportant == "IMPORTANT" ? "🔥 " : "");
        (task.description !== '' ? task.description : 'Без названия');
        // @ts-ignore
        [tasks, openTask,];
        (__VLS_37.slots).default;
        const __VLS_37 = __VLS_pickFunctionalComponentCtx(__VLS_32, __VLS_34);
        (__VLS_29.slots).default;
        const __VLS_29 = __VLS_pickFunctionalComponentCtx(__VLS_24, __VLS_26);
        let __VLS_27;
        let __VLS_28;
    }
    (__VLS_23.slots).default;
    const __VLS_23 = __VLS_pickFunctionalComponentCtx(__VLS_18, __VLS_20);
    (__VLS_17.slots).default;
    const __VLS_17 = __VLS_pickFunctionalComponentCtx(__VLS_12, __VLS_14);
    (__VLS_5.slots).default;
    const __VLS_5 = __VLS_pickFunctionalComponentCtx(__VLS_0, __VLS_2);
    if (typeof __VLS_styleScopedClasses === 'object' && !Array.isArray(__VLS_styleScopedClasses)) {
    }
    var __VLS_slots;
    return __VLS_slots;
    const __VLS_componentsOption = {};
    let __VLS_name;
    let __VLS_defineComponent;
    const __VLS_internalComponent = __VLS_defineComponent({
        setup() {
            return {
                IonCard: IonCard,
                IonCardContent: IonCardContent,
                IonCardHeader: IonCardHeader,
                IonList: IonList,
                IonItem: IonItem,
                IonLabel: IonLabel,
                tasks: tasks,
                openTask: openTask,
            };
        },
    });
}
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
;
