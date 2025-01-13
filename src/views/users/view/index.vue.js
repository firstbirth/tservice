/* __placeholder__ */
import { IonAvatar, IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonBackButton, } from "@ionic/vue";
import { useRouter } from "vue-router";
import { onMounted, ref } from "vue";
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
const router = useRouter();
const id = ref(0);
const name = ref("");
const email = ref("");
const phone = ref("");
const role = ref("");
onMounted(() => {
    id.value = Number(router.currentRoute.value.params.id);
    name.value = router.currentRoute.value.query.name;
    email.value = router.currentRoute.value.query.email;
    phone.value = router.currentRoute.value.query.phone;
    role.value = router.currentRoute.value.query.role;
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
    // CSS variable injection 
    // CSS variable injection end 
    let __VLS_resolvedLocalAndGlobalComponents;
    // @ts-ignore
    const __VLS_0 = {}
        .IonPage;
    ({}.IonPage);
    ({}.IonPage);
    __VLS_components.IonPage;
    __VLS_components.ionPage;
    __VLS_components.IonPage;
    __VLS_components.ionPage;
    // @ts-ignore
    [IonPage, IonPage,];
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({}));
    const __VLS_2 = __VLS_1({}, ...__VLS_functionalComponentArgsRest(__VLS_1));
    ({}({}));
    // @ts-ignore
    const __VLS_6 = {}
        .IonHeader;
    ({}.IonHeader);
    ({}.IonHeader);
    __VLS_components.IonHeader;
    __VLS_components.ionHeader;
    __VLS_components.IonHeader;
    __VLS_components.ionHeader;
    // @ts-ignore
    [IonHeader, IonHeader,];
    // @ts-ignore
    const __VLS_7 = __VLS_asFunctionalComponent(__VLS_6, new __VLS_6({}));
    const __VLS_8 = __VLS_7({}, ...__VLS_functionalComponentArgsRest(__VLS_7));
    ({}({}));
    // @ts-ignore
    const __VLS_12 = {}
        .IonToolbar;
    ({}.IonToolbar);
    ({}.IonToolbar);
    __VLS_components.IonToolbar;
    __VLS_components.ionToolbar;
    __VLS_components.IonToolbar;
    __VLS_components.ionToolbar;
    // @ts-ignore
    [IonToolbar, IonToolbar,];
    // @ts-ignore
    const __VLS_13 = __VLS_asFunctionalComponent(__VLS_12, new __VLS_12({}));
    const __VLS_14 = __VLS_13({}, ...__VLS_functionalComponentArgsRest(__VLS_13));
    ({}({}));
    // @ts-ignore
    const __VLS_18 = {}
        .IonButtons;
    ({}.IonButtons);
    ({}.IonButtons);
    __VLS_components.IonButtons;
    __VLS_components.ionButtons;
    __VLS_components.IonButtons;
    __VLS_components.ionButtons;
    // @ts-ignore
    [IonButtons, IonButtons,];
    // @ts-ignore
    const __VLS_19 = __VLS_asFunctionalComponent(__VLS_18, new __VLS_18({ slot: ("start"), }));
    const __VLS_20 = __VLS_19({ slot: ("start"), }, ...__VLS_functionalComponentArgsRest(__VLS_19));
    ({}({ slot: ("start"), }));
    // @ts-ignore
    const __VLS_24 = {}
        .IonBackButton;
    ({}.IonBackButton);
    ({}.IonBackButton);
    __VLS_components.IonBackButton;
    __VLS_components.ionBackButton;
    __VLS_components.IonBackButton;
    __VLS_components.ionBackButton;
    // @ts-ignore
    [IonBackButton, IonBackButton,];
    // @ts-ignore
    const __VLS_25 = __VLS_asFunctionalComponent(__VLS_24, new __VLS_24({ defaultHref: ("/"), }));
    const __VLS_26 = __VLS_25({ defaultHref: ("/"), }, ...__VLS_functionalComponentArgsRest(__VLS_25));
    ({}({ defaultHref: ("/"), }));
    const __VLS_29 = __VLS_pickFunctionalComponentCtx(__VLS_24, __VLS_26);
    (__VLS_23.slots).default;
    const __VLS_23 = __VLS_pickFunctionalComponentCtx(__VLS_18, __VLS_20);
    // @ts-ignore
    const __VLS_30 = {}
        .IonTitle;
    ({}.IonTitle);
    ({}.IonTitle);
    __VLS_components.IonTitle;
    __VLS_components.ionTitle;
    __VLS_components.IonTitle;
    __VLS_components.ionTitle;
    // @ts-ignore
    [IonTitle, IonTitle,];
    // @ts-ignore
    const __VLS_31 = __VLS_asFunctionalComponent(__VLS_30, new __VLS_30({}));
    const __VLS_32 = __VLS_31({}, ...__VLS_functionalComponentArgsRest(__VLS_31));
    ({}({}));
    (__VLS_ctx.name);
    // @ts-ignore
    [name,];
    (__VLS_35.slots).default;
    const __VLS_35 = __VLS_pickFunctionalComponentCtx(__VLS_30, __VLS_32);
    (__VLS_17.slots).default;
    const __VLS_17 = __VLS_pickFunctionalComponentCtx(__VLS_12, __VLS_14);
    (__VLS_11.slots).default;
    const __VLS_11 = __VLS_pickFunctionalComponentCtx(__VLS_6, __VLS_8);
    // @ts-ignore
    const __VLS_36 = {}
        .IonContent;
    ({}.IonContent);
    ({}.IonContent);
    __VLS_components.IonContent;
    __VLS_components.ionContent;
    __VLS_components.IonContent;
    __VLS_components.ionContent;
    // @ts-ignore
    [IonContent, IonContent,];
    // @ts-ignore
    const __VLS_37 = __VLS_asFunctionalComponent(__VLS_36, new __VLS_36({ fullscreen: ((true)), }));
    const __VLS_38 = __VLS_37({ fullscreen: ((true)), }, ...__VLS_functionalComponentArgsRest(__VLS_37));
    ({}({ fullscreen: ((true)), }));
    // @ts-ignore
    const __VLS_42 = {}
        .IonHeader;
    ({}.IonHeader);
    ({}.IonHeader);
    __VLS_components.IonHeader;
    __VLS_components.ionHeader;
    __VLS_components.IonHeader;
    __VLS_components.ionHeader;
    // @ts-ignore
    [IonHeader, IonHeader,];
    // @ts-ignore
    const __VLS_43 = __VLS_asFunctionalComponent(__VLS_42, new __VLS_42({ collapse: ("condense"), }));
    const __VLS_44 = __VLS_43({ collapse: ("condense"), }, ...__VLS_functionalComponentArgsRest(__VLS_43));
    ({}({ collapse: ("condense"), }));
    // @ts-ignore
    const __VLS_48 = {}
        .IonToolbar;
    ({}.IonToolbar);
    ({}.IonToolbar);
    __VLS_components.IonToolbar;
    __VLS_components.ionToolbar;
    __VLS_components.IonToolbar;
    __VLS_components.ionToolbar;
    // @ts-ignore
    [IonToolbar, IonToolbar,];
    // @ts-ignore
    const __VLS_49 = __VLS_asFunctionalComponent(__VLS_48, new __VLS_48({}));
    const __VLS_50 = __VLS_49({}, ...__VLS_functionalComponentArgsRest(__VLS_49));
    ({}({}));
    // @ts-ignore
    const __VLS_54 = {}
        .IonButtons;
    ({}.IonButtons);
    ({}.IonButtons);
    __VLS_components.IonButtons;
    __VLS_components.ionButtons;
    __VLS_components.IonButtons;
    __VLS_components.ionButtons;
    // @ts-ignore
    [IonButtons, IonButtons,];
    // @ts-ignore
    const __VLS_55 = __VLS_asFunctionalComponent(__VLS_54, new __VLS_54({ slot: ("start"), }));
    const __VLS_56 = __VLS_55({ slot: ("start"), }, ...__VLS_functionalComponentArgsRest(__VLS_55));
    ({}({ slot: ("start"), }));
    // @ts-ignore
    const __VLS_60 = {}
        .IonBackButton;
    ({}.IonBackButton);
    ({}.IonBackButton);
    __VLS_components.IonBackButton;
    __VLS_components.ionBackButton;
    __VLS_components.IonBackButton;
    __VLS_components.ionBackButton;
    // @ts-ignore
    [IonBackButton, IonBackButton,];
    // @ts-ignore
    const __VLS_61 = __VLS_asFunctionalComponent(__VLS_60, new __VLS_60({ defaultHref: ("/"), }));
    const __VLS_62 = __VLS_61({ defaultHref: ("/"), }, ...__VLS_functionalComponentArgsRest(__VLS_61));
    ({}({ defaultHref: ("/"), }));
    const __VLS_65 = __VLS_pickFunctionalComponentCtx(__VLS_60, __VLS_62);
    (__VLS_59.slots).default;
    const __VLS_59 = __VLS_pickFunctionalComponentCtx(__VLS_54, __VLS_56);
    // @ts-ignore
    const __VLS_66 = {}
        .IonTitle;
    ({}.IonTitle);
    ({}.IonTitle);
    __VLS_components.IonTitle;
    __VLS_components.ionTitle;
    __VLS_components.IonTitle;
    __VLS_components.ionTitle;
    // @ts-ignore
    [IonTitle, IonTitle,];
    // @ts-ignore
    const __VLS_67 = __VLS_asFunctionalComponent(__VLS_66, new __VLS_66({}));
    const __VLS_68 = __VLS_67({}, ...__VLS_functionalComponentArgsRest(__VLS_67));
    ({}({}));
    (__VLS_ctx.name);
    // @ts-ignore
    [name,];
    (__VLS_71.slots).default;
    const __VLS_71 = __VLS_pickFunctionalComponentCtx(__VLS_66, __VLS_68);
    (__VLS_53.slots).default;
    const __VLS_53 = __VLS_pickFunctionalComponentCtx(__VLS_48, __VLS_50);
    (__VLS_47.slots).default;
    const __VLS_47 = __VLS_pickFunctionalComponentCtx(__VLS_42, __VLS_44);
    __VLS_elementAsFunction(__VLS_intrinsicElements.section, __VLS_intrinsicElements.section)({ ...{ class: ("content") }, });
    // @ts-ignore
    const __VLS_72 = {}
        .center;
    ({}.center);
    ({}.center);
    __VLS_components.Center;
    __VLS_components.center;
    __VLS_components.Center;
    __VLS_components.center;
    // @ts-ignore
    [Center, Center,];
    // @ts-ignore
    const __VLS_73 = __VLS_asFunctionalComponent(__VLS_72, new __VLS_72({}));
    const __VLS_74 = __VLS_73({}, ...__VLS_functionalComponentArgsRest(__VLS_73));
    ({}({}));
    // @ts-ignore
    const __VLS_78 = {}
        .IonAvatar;
    ({}.IonAvatar);
    ({}.IonAvatar);
    __VLS_components.IonAvatar;
    __VLS_components.ionAvatar;
    __VLS_components.IonAvatar;
    __VLS_components.ionAvatar;
    // @ts-ignore
    [IonAvatar, IonAvatar,];
    // @ts-ignore
    const __VLS_79 = __VLS_asFunctionalComponent(__VLS_78, new __VLS_78({}));
    const __VLS_80 = __VLS_79({}, ...__VLS_functionalComponentArgsRest(__VLS_79));
    ({}({}));
    __VLS_elementAsFunction(__VLS_intrinsicElements.img)({ src: ((`https://source.boringavatars.com/beam/128/${__VLS_ctx.name}}?colors=000000,9f111b,b11623,292c37,cccccc`)), });
    // @ts-ignore
    [name,];
    (__VLS_83.slots).default;
    const __VLS_83 = __VLS_pickFunctionalComponentCtx(__VLS_78, __VLS_80);
    (__VLS_77.slots).default;
    const __VLS_77 = __VLS_pickFunctionalComponentCtx(__VLS_72, __VLS_74);
    __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
    (__VLS_ctx.name);
    // @ts-ignore
    [name,];
    __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
    (__VLS_ctx.role);
    // @ts-ignore
    [role,];
    __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
    (__VLS_ctx.email);
    // @ts-ignore
    [email,];
    __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
    (__VLS_ctx.phone);
    // @ts-ignore
    [phone,];
    (__VLS_41.slots).default;
    const __VLS_41 = __VLS_pickFunctionalComponentCtx(__VLS_36, __VLS_38);
    (__VLS_5.slots).default;
    const __VLS_5 = __VLS_pickFunctionalComponentCtx(__VLS_0, __VLS_2);
    if (typeof __VLS_styleScopedClasses === 'object' && !Array.isArray(__VLS_styleScopedClasses)) {
        __VLS_styleScopedClasses['content'];
    }
    var __VLS_slots;
    return __VLS_slots;
    const __VLS_componentsOption = {};
    let __VLS_name;
    let __VLS_defineComponent;
    const __VLS_internalComponent = __VLS_defineComponent({
        setup() {
            return {
                IonAvatar: IonAvatar,
                IonPage: IonPage,
                IonHeader: IonHeader,
                IonToolbar: IonToolbar,
                IonTitle: IonTitle,
                IonContent: IonContent,
                IonButtons: IonButtons,
                IonBackButton: IonBackButton,
                name: name,
                email: email,
                phone: phone,
                role: role,
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
