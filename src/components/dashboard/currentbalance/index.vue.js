/* __placeholder__ */
import { IonCard, IonCol, IonRow } from '@ionic/vue';
import { useRouter } from 'vue-router';
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
const router = useRouter();
// разделить число на разряды
const formatNumber = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};
let balance = 123456;
let pending_balance = 74815;
const openBalance = () => {
    router.push('/dashboard/balance');
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
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({ ...{ 'onClick': {} }, id: ("balance-card"), button: ((true)), }));
    const __VLS_2 = __VLS_1({ ...{ 'onClick': {} }, id: ("balance-card"), button: ((true)), }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    ({}({ ...{ 'onClick': {} }, id: ("balance-card"), button: ((true)), }));
    let __VLS_6;
    const __VLS_7 = {
        onClick: (__VLS_ctx.openBalance)
    };
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("card-content") }, });
    // @ts-ignore
    const __VLS_8 = {}
        .IonRow;
    ({}.IonRow);
    ({}.IonRow);
    __VLS_components.IonRow;
    __VLS_components.ionRow;
    __VLS_components.IonRow;
    __VLS_components.ionRow;
    // @ts-ignore
    [IonRow, IonRow,];
    // @ts-ignore
    const __VLS_9 = __VLS_asFunctionalComponent(__VLS_8, new __VLS_8({ ...{ class: ("w-100") }, }));
    const __VLS_10 = __VLS_9({ ...{ class: ("w-100") }, }, ...__VLS_functionalComponentArgsRest(__VLS_9));
    ({}({ ...{ class: ("w-100") }, }));
    // @ts-ignore
    const __VLS_14 = {}
        .IonCol;
    ({}.IonCol);
    ({}.IonCol);
    __VLS_components.IonCol;
    __VLS_components.ionCol;
    __VLS_components.IonCol;
    __VLS_components.ionCol;
    // @ts-ignore
    [IonCol, IonCol,];
    // @ts-ignore
    const __VLS_15 = __VLS_asFunctionalComponent(__VLS_14, new __VLS_14({ size: ("10"), ...{ class: ("balance-data") }, }));
    const __VLS_16 = __VLS_15({ size: ("10"), ...{ class: ("balance-data") }, }, ...__VLS_functionalComponentArgsRest(__VLS_15));
    ({}({ size: ("10"), ...{ class: ("balance-data") }, }));
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("item") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
    // @ts-ignore
    [openBalance,];
    __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("current") }, });
    (__VLS_ctx.balance ? __VLS_ctx.formatNumber(__VLS_ctx.balance) : 0);
    // @ts-ignore
    [balance, balance, formatNumber,];
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("item") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("pending") }, });
    (__VLS_ctx.pending_balance ? __VLS_ctx.formatNumber(__VLS_ctx.pending_balance) : 0);
    // @ts-ignore
    [formatNumber, pending_balance, pending_balance,];
    (__VLS_19.slots).default;
    const __VLS_19 = __VLS_pickFunctionalComponentCtx(__VLS_14, __VLS_16);
    // @ts-ignore
    const __VLS_20 = {}
        .IonCol;
    ({}.IonCol);
    ({}.IonCol);
    __VLS_components.IonCol;
    __VLS_components.ionCol;
    __VLS_components.IonCol;
    __VLS_components.ionCol;
    // @ts-ignore
    [IonCol, IonCol,];
    // @ts-ignore
    const __VLS_21 = __VLS_asFunctionalComponent(__VLS_20, new __VLS_20({ size: ("2"), }));
    const __VLS_22 = __VLS_21({ size: ("2"), }, ...__VLS_functionalComponentArgsRest(__VLS_21));
    ({}({ size: ("2"), }));
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex-centered") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.svg, __VLS_intrinsicElements.svg)({ xmlns: ("http://www.w3.org/2000/svg"), width: ("44"), height: ("44"), fill: ("white"), ...{ class: ("bi bi-chevron-compact-right") }, viewBox: ("0 0 16 16"), });
    __VLS_elementAsFunction(__VLS_intrinsicElements.path)({ "fill-rule": ("evenodd"), d: ("M6.776 1.553a.5.5 0 0 1 .671.223l3 6a.5.5 0 0 1 0 .448l-3 6a.5.5 0 1 1-.894-.448L9.44 8 6.553 2.224a.5.5 0 0 1 .223-.671"), });
    (__VLS_25.slots).default;
    const __VLS_25 = __VLS_pickFunctionalComponentCtx(__VLS_20, __VLS_22);
    (__VLS_13.slots).default;
    const __VLS_13 = __VLS_pickFunctionalComponentCtx(__VLS_8, __VLS_10);
    (__VLS_5.slots).default;
    const __VLS_5 = __VLS_pickFunctionalComponentCtx(__VLS_0, __VLS_2);
    let __VLS_3;
    let __VLS_4;
    if (typeof __VLS_styleScopedClasses === 'object' && !Array.isArray(__VLS_styleScopedClasses)) {
        __VLS_styleScopedClasses['card-content'];
        __VLS_styleScopedClasses['w-100'];
        __VLS_styleScopedClasses['balance-data'];
        __VLS_styleScopedClasses['item'];
        __VLS_styleScopedClasses['current'];
        __VLS_styleScopedClasses['item'];
        __VLS_styleScopedClasses['pending'];
        __VLS_styleScopedClasses['flex-centered'];
        __VLS_styleScopedClasses['bi'];
        __VLS_styleScopedClasses['bi-chevron-compact-right'];
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
                IonCol: IonCol,
                IonRow: IonRow,
                formatNumber: formatNumber,
                balance: balance,
                pending_balance: pending_balance,
                openBalance: openBalance,
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
