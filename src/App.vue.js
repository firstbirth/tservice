/* __placeholder__ */
import { IonApp, IonRouterOutlet } from "@ionic/vue";
import { computed, onMounted } from "vue";
import { useStore } from "vuex";
import CustomIconset from "@/components/CustomIconset.vue";
import { PlatformService } from "@/services/platform.service";
import { StatusBar, Style } from "@capacitor/status-bar";
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
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
    let __VLS_resolvedLocalAndGlobalComponents;
    // @ts-ignore
    const __VLS_0 = {}
        .IonApp;
    ({}.IonApp);
    ({}.IonApp);
    __VLS_components.IonApp;
    __VLS_components.ionApp;
    __VLS_components.IonApp;
    __VLS_components.ionApp;
    // @ts-ignore
    [IonApp, IonApp,];
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({ ...{ class: (({ dark: __VLS_ctx.darkMode })) }, }));
    const __VLS_2 = __VLS_1({ ...{ class: (({ dark: __VLS_ctx.darkMode })) }, }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    ({}({ ...{ class: (({ dark: __VLS_ctx.darkMode })) }, }));
    __VLS_styleScopedClasses = ({ dark: darkMode });
    // @ts-ignore
    [CustomIconset,];
    // @ts-ignore
    const __VLS_6 = __VLS_asFunctionalComponent(CustomIconset, new CustomIconset({}));
    const __VLS_7 = __VLS_6({}, ...__VLS_functionalComponentArgsRest(__VLS_6));
    ({}({}));
    // @ts-ignore
    [darkMode,];
    const __VLS_10 = __VLS_pickFunctionalComponentCtx(CustomIconset, __VLS_7);
    // @ts-ignore
    const __VLS_11 = {}
        .IonRouterOutlet;
    ({}.IonRouterOutlet);
    __VLS_components.IonRouterOutlet;
    __VLS_components.ionRouterOutlet;
    // @ts-ignore
    [IonRouterOutlet,];
    // @ts-ignore
    const __VLS_12 = __VLS_asFunctionalComponent(__VLS_11, new __VLS_11({}));
    const __VLS_13 = __VLS_12({}, ...__VLS_functionalComponentArgsRest(__VLS_12));
    ({}({}));
    const __VLS_16 = __VLS_pickFunctionalComponentCtx(__VLS_11, __VLS_13);
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
                IonApp: IonApp,
                IonRouterOutlet: IonRouterOutlet,
                CustomIconset: CustomIconset,
                darkMode: darkMode,
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
