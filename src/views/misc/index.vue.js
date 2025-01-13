/* __placeholder__ */
import { logout } from "@/services/AuthService";
import { IonList, IonItem, IonLabel, IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonButton, IonIcon, alertController, } from "@ionic/vue";
import { cogOutline, notificationsOutline, searchCircleOutline } from "ionicons/icons";
import { useRouter } from "vue-router";
import store from "@/store";
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
const router = useRouter();
const openSearch = () => {
    router.push("/search");
};
const openSettings = () => {
    router.push("/settings");
};
const openNotifications = () => {
    router.push("/notifications");
};
const makeLogout = async () => {
    // await logout then redirect
    await logout();
    // Redirect user to dashboard
    router.push("/dashboard");
};
const presentAlert = async () => {
    const alert = await alertController.create({
        header: "Выход",
        message: "Вы собираетесь выйти из аккаунта. Продолжить?",
        buttons: [
            {
                text: "Отмена",
                role: "cancel",
                htmlAttributes: {
                    "aria-label": "отмена",
                },
                handler: () => { },
            },
            {
                text: "Выход",
                role: "destructive",
                htmlAttributes: {
                    "aria-label": "выход",
                },
                handler: () => {
                    makeLogout();
                },
            },
        ],
    });
    await alert.present();
};
const openUserList = () => {
    router.push("/users");
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
    const __VLS_19 = __VLS_asFunctionalComponent(__VLS_18, new __VLS_18({ slot: ("secondary"), }));
    const __VLS_20 = __VLS_19({ slot: ("secondary"), }, ...__VLS_functionalComponentArgsRest(__VLS_19));
    ({}({ slot: ("secondary"), }));
    // @ts-ignore
    const __VLS_24 = {}
        .IonButton;
    ({}.IonButton);
    ({}.IonButton);
    __VLS_components.IonButton;
    __VLS_components.ionButton;
    __VLS_components.IonButton;
    __VLS_components.ionButton;
    // @ts-ignore
    [IonButton, IonButton,];
    // @ts-ignore
    const __VLS_25 = __VLS_asFunctionalComponent(__VLS_24, new __VLS_24({ ...{ 'onClick': {} }, }));
    const __VLS_26 = __VLS_25({ ...{ 'onClick': {} }, }, ...__VLS_functionalComponentArgsRest(__VLS_25));
    ({}({ ...{ 'onClick': {} }, }));
    let __VLS_30;
    const __VLS_31 = {
        onClick: (__VLS_ctx.openNotifications)
    };
    // @ts-ignore
    const __VLS_32 = {}
        .IonIcon;
    ({}.IonIcon);
    ({}.IonIcon);
    __VLS_components.IonIcon;
    __VLS_components.ionIcon;
    __VLS_components.IonIcon;
    __VLS_components.ionIcon;
    // @ts-ignore
    [IonIcon, IonIcon,];
    // @ts-ignore
    const __VLS_33 = __VLS_asFunctionalComponent(__VLS_32, new __VLS_32({ slot: ("icon-only"), ios: ((__VLS_ctx.notificationsOutline)), md: ((__VLS_ctx.notificationsOutline)), }));
    const __VLS_34 = __VLS_33({ slot: ("icon-only"), ios: ((__VLS_ctx.notificationsOutline)), md: ((__VLS_ctx.notificationsOutline)), }, ...__VLS_functionalComponentArgsRest(__VLS_33));
    ({}({ slot: ("icon-only"), ios: ((__VLS_ctx.notificationsOutline)), md: ((__VLS_ctx.notificationsOutline)), }));
    // @ts-ignore
    [openNotifications, notificationsOutline, notificationsOutline,];
    const __VLS_37 = __VLS_pickFunctionalComponentCtx(__VLS_32, __VLS_34);
    (__VLS_29.slots).default;
    const __VLS_29 = __VLS_pickFunctionalComponentCtx(__VLS_24, __VLS_26);
    let __VLS_27;
    let __VLS_28;
    // @ts-ignore
    const __VLS_38 = {}
        .IonButton;
    ({}.IonButton);
    ({}.IonButton);
    __VLS_components.IonButton;
    __VLS_components.ionButton;
    __VLS_components.IonButton;
    __VLS_components.ionButton;
    // @ts-ignore
    [IonButton, IonButton,];
    // @ts-ignore
    const __VLS_39 = __VLS_asFunctionalComponent(__VLS_38, new __VLS_38({ ...{ 'onClick': {} }, }));
    const __VLS_40 = __VLS_39({ ...{ 'onClick': {} }, }, ...__VLS_functionalComponentArgsRest(__VLS_39));
    ({}({ ...{ 'onClick': {} }, }));
    let __VLS_44;
    const __VLS_45 = {
        onClick: (__VLS_ctx.openSettings)
    };
    // @ts-ignore
    const __VLS_46 = {}
        .IonIcon;
    ({}.IonIcon);
    ({}.IonIcon);
    __VLS_components.IonIcon;
    __VLS_components.ionIcon;
    __VLS_components.IonIcon;
    __VLS_components.ionIcon;
    // @ts-ignore
    [IonIcon, IonIcon,];
    // @ts-ignore
    const __VLS_47 = __VLS_asFunctionalComponent(__VLS_46, new __VLS_46({ slot: ("icon-only"), ios: ((__VLS_ctx.cogOutline)), md: ((__VLS_ctx.cogOutline)), }));
    const __VLS_48 = __VLS_47({ slot: ("icon-only"), ios: ((__VLS_ctx.cogOutline)), md: ((__VLS_ctx.cogOutline)), }, ...__VLS_functionalComponentArgsRest(__VLS_47));
    ({}({ slot: ("icon-only"), ios: ((__VLS_ctx.cogOutline)), md: ((__VLS_ctx.cogOutline)), }));
    // @ts-ignore
    [openSettings, cogOutline, cogOutline,];
    const __VLS_51 = __VLS_pickFunctionalComponentCtx(__VLS_46, __VLS_48);
    (__VLS_43.slots).default;
    const __VLS_43 = __VLS_pickFunctionalComponentCtx(__VLS_38, __VLS_40);
    let __VLS_41;
    let __VLS_42;
    (__VLS_23.slots).default;
    const __VLS_23 = __VLS_pickFunctionalComponentCtx(__VLS_18, __VLS_20);
    // @ts-ignore
    const __VLS_52 = {}
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
    const __VLS_53 = __VLS_asFunctionalComponent(__VLS_52, new __VLS_52({}));
    const __VLS_54 = __VLS_53({}, ...__VLS_functionalComponentArgsRest(__VLS_53));
    ({}({}));
    (__VLS_57.slots).default;
    const __VLS_57 = __VLS_pickFunctionalComponentCtx(__VLS_52, __VLS_54);
    (__VLS_17.slots).default;
    const __VLS_17 = __VLS_pickFunctionalComponentCtx(__VLS_12, __VLS_14);
    (__VLS_11.slots).default;
    const __VLS_11 = __VLS_pickFunctionalComponentCtx(__VLS_6, __VLS_8);
    // @ts-ignore
    const __VLS_58 = {}
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
    const __VLS_59 = __VLS_asFunctionalComponent(__VLS_58, new __VLS_58({ fullscreen: ((true)), }));
    const __VLS_60 = __VLS_59({ fullscreen: ((true)), }, ...__VLS_functionalComponentArgsRest(__VLS_59));
    ({}({ fullscreen: ((true)), }));
    // @ts-ignore
    const __VLS_64 = {}
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
    const __VLS_65 = __VLS_asFunctionalComponent(__VLS_64, new __VLS_64({ collapse: ("condense"), }));
    const __VLS_66 = __VLS_65({ collapse: ("condense"), }, ...__VLS_functionalComponentArgsRest(__VLS_65));
    ({}({ collapse: ("condense"), }));
    // @ts-ignore
    const __VLS_70 = {}
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
    const __VLS_71 = __VLS_asFunctionalComponent(__VLS_70, new __VLS_70({}));
    const __VLS_72 = __VLS_71({}, ...__VLS_functionalComponentArgsRest(__VLS_71));
    ({}({}));
    // @ts-ignore
    const __VLS_76 = {}
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
    const __VLS_77 = __VLS_asFunctionalComponent(__VLS_76, new __VLS_76({ slot: ("secondary"), }));
    const __VLS_78 = __VLS_77({ slot: ("secondary"), }, ...__VLS_functionalComponentArgsRest(__VLS_77));
    ({}({ slot: ("secondary"), }));
    // @ts-ignore
    const __VLS_82 = {}
        .IonButton;
    ({}.IonButton);
    ({}.IonButton);
    __VLS_components.IonButton;
    __VLS_components.ionButton;
    __VLS_components.IonButton;
    __VLS_components.ionButton;
    // @ts-ignore
    [IonButton, IonButton,];
    // @ts-ignore
    const __VLS_83 = __VLS_asFunctionalComponent(__VLS_82, new __VLS_82({ ...{ 'onClick': {} }, }));
    const __VLS_84 = __VLS_83({ ...{ 'onClick': {} }, }, ...__VLS_functionalComponentArgsRest(__VLS_83));
    ({}({ ...{ 'onClick': {} }, }));
    let __VLS_88;
    const __VLS_89 = {
        onClick: (__VLS_ctx.openNotifications)
    };
    // @ts-ignore
    const __VLS_90 = {}
        .IonIcon;
    ({}.IonIcon);
    ({}.IonIcon);
    __VLS_components.IonIcon;
    __VLS_components.ionIcon;
    __VLS_components.IonIcon;
    __VLS_components.ionIcon;
    // @ts-ignore
    [IonIcon, IonIcon,];
    // @ts-ignore
    const __VLS_91 = __VLS_asFunctionalComponent(__VLS_90, new __VLS_90({ slot: ("icon-only"), ios: ((__VLS_ctx.notificationsOutline)), md: ((__VLS_ctx.notificationsOutline)), }));
    const __VLS_92 = __VLS_91({ slot: ("icon-only"), ios: ((__VLS_ctx.notificationsOutline)), md: ((__VLS_ctx.notificationsOutline)), }, ...__VLS_functionalComponentArgsRest(__VLS_91));
    ({}({ slot: ("icon-only"), ios: ((__VLS_ctx.notificationsOutline)), md: ((__VLS_ctx.notificationsOutline)), }));
    // @ts-ignore
    [openNotifications, notificationsOutline, notificationsOutline,];
    const __VLS_95 = __VLS_pickFunctionalComponentCtx(__VLS_90, __VLS_92);
    (__VLS_87.slots).default;
    const __VLS_87 = __VLS_pickFunctionalComponentCtx(__VLS_82, __VLS_84);
    let __VLS_85;
    let __VLS_86;
    // @ts-ignore
    const __VLS_96 = {}
        .IonButton;
    ({}.IonButton);
    ({}.IonButton);
    __VLS_components.IonButton;
    __VLS_components.ionButton;
    __VLS_components.IonButton;
    __VLS_components.ionButton;
    // @ts-ignore
    [IonButton, IonButton,];
    // @ts-ignore
    const __VLS_97 = __VLS_asFunctionalComponent(__VLS_96, new __VLS_96({ ...{ 'onClick': {} }, }));
    const __VLS_98 = __VLS_97({ ...{ 'onClick': {} }, }, ...__VLS_functionalComponentArgsRest(__VLS_97));
    ({}({ ...{ 'onClick': {} }, }));
    let __VLS_102;
    const __VLS_103 = {
        onClick: (__VLS_ctx.openSettings)
    };
    // @ts-ignore
    const __VLS_104 = {}
        .IonIcon;
    ({}.IonIcon);
    ({}.IonIcon);
    __VLS_components.IonIcon;
    __VLS_components.ionIcon;
    __VLS_components.IonIcon;
    __VLS_components.ionIcon;
    // @ts-ignore
    [IonIcon, IonIcon,];
    // @ts-ignore
    const __VLS_105 = __VLS_asFunctionalComponent(__VLS_104, new __VLS_104({ slot: ("icon-only"), ios: ((__VLS_ctx.cogOutline)), md: ((__VLS_ctx.cogOutline)), }));
    const __VLS_106 = __VLS_105({ slot: ("icon-only"), ios: ((__VLS_ctx.cogOutline)), md: ((__VLS_ctx.cogOutline)), }, ...__VLS_functionalComponentArgsRest(__VLS_105));
    ({}({ slot: ("icon-only"), ios: ((__VLS_ctx.cogOutline)), md: ((__VLS_ctx.cogOutline)), }));
    // @ts-ignore
    [openSettings, cogOutline, cogOutline,];
    const __VLS_109 = __VLS_pickFunctionalComponentCtx(__VLS_104, __VLS_106);
    (__VLS_101.slots).default;
    const __VLS_101 = __VLS_pickFunctionalComponentCtx(__VLS_96, __VLS_98);
    let __VLS_99;
    let __VLS_100;
    (__VLS_81.slots).default;
    const __VLS_81 = __VLS_pickFunctionalComponentCtx(__VLS_76, __VLS_78);
    // @ts-ignore
    const __VLS_110 = {}
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
    const __VLS_111 = __VLS_asFunctionalComponent(__VLS_110, new __VLS_110({}));
    const __VLS_112 = __VLS_111({}, ...__VLS_functionalComponentArgsRest(__VLS_111));
    ({}({}));
    (__VLS_115.slots).default;
    const __VLS_115 = __VLS_pickFunctionalComponentCtx(__VLS_110, __VLS_112);
    (__VLS_75.slots).default;
    const __VLS_75 = __VLS_pickFunctionalComponentCtx(__VLS_70, __VLS_72);
    (__VLS_69.slots).default;
    const __VLS_69 = __VLS_pickFunctionalComponentCtx(__VLS_64, __VLS_66);
    __VLS_elementAsFunction(__VLS_intrinsicElements.section, __VLS_intrinsicElements.section)({ ...{ class: ("content") }, });
    // @ts-ignore
    const __VLS_116 = {}
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
    const __VLS_117 = __VLS_asFunctionalComponent(__VLS_116, new __VLS_116({}));
    const __VLS_118 = __VLS_117({}, ...__VLS_functionalComponentArgsRest(__VLS_117));
    ({}({}));
    if (__VLS_ctx.store.state.role === 'Админы') {
        // @ts-ignore
        const __VLS_122 = {}
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
        const __VLS_123 = __VLS_asFunctionalComponent(__VLS_122, new __VLS_122({ ...{ 'onClick': {} }, button: ((true)), ...{ class: ("ion-no-padding") }, detail: ((true)), }));
        const __VLS_124 = __VLS_123({ ...{ 'onClick': {} }, button: ((true)), ...{ class: ("ion-no-padding") }, detail: ((true)), }, ...__VLS_functionalComponentArgsRest(__VLS_123));
        ({}({ ...{ 'onClick': {} }, button: ((true)), ...{ class: ("ion-no-padding") }, detail: ((true)), }));
        let __VLS_128;
        const __VLS_129 = {
            onClick: (__VLS_ctx.openUserList)
        };
        // @ts-ignore
        const __VLS_130 = {}
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
        const __VLS_131 = __VLS_asFunctionalComponent(__VLS_130, new __VLS_130({}));
        const __VLS_132 = __VLS_131({}, ...__VLS_functionalComponentArgsRest(__VLS_131));
        ({}({}));
        // @ts-ignore
        [store, openUserList,];
        (__VLS_135.slots).default;
        const __VLS_135 = __VLS_pickFunctionalComponentCtx(__VLS_130, __VLS_132);
        (__VLS_127.slots).default;
        const __VLS_127 = __VLS_pickFunctionalComponentCtx(__VLS_122, __VLS_124);
        let __VLS_125;
        let __VLS_126;
    }
    // @ts-ignore
    const __VLS_136 = {}
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
    const __VLS_137 = __VLS_asFunctionalComponent(__VLS_136, new __VLS_136({ ...{ 'onClick': {} }, button: ((true)), ...{ class: ("ion-no-padding") }, detail: ((true)), }));
    const __VLS_138 = __VLS_137({ ...{ 'onClick': {} }, button: ((true)), ...{ class: ("ion-no-padding") }, detail: ((true)), }, ...__VLS_functionalComponentArgsRest(__VLS_137));
    ({}({ ...{ 'onClick': {} }, button: ((true)), ...{ class: ("ion-no-padding") }, detail: ((true)), }));
    let __VLS_142;
    const __VLS_143 = {
        onClick: (__VLS_ctx.openSettings)
    };
    // @ts-ignore
    const __VLS_144 = {}
        .IonIcon;
    ({}.IonIcon);
    ({}.IonIcon);
    __VLS_components.IonIcon;
    __VLS_components.ionIcon;
    __VLS_components.IonIcon;
    __VLS_components.ionIcon;
    // @ts-ignore
    [IonIcon, IonIcon,];
    // @ts-ignore
    const __VLS_145 = __VLS_asFunctionalComponent(__VLS_144, new __VLS_144({ ios: ((__VLS_ctx.cogOutline)), md: ((__VLS_ctx.cogOutline)), }));
    const __VLS_146 = __VLS_145({ ios: ((__VLS_ctx.cogOutline)), md: ((__VLS_ctx.cogOutline)), }, ...__VLS_functionalComponentArgsRest(__VLS_145));
    ({}({ ios: ((__VLS_ctx.cogOutline)), md: ((__VLS_ctx.cogOutline)), }));
    // @ts-ignore
    [openSettings, cogOutline, cogOutline,];
    const __VLS_149 = __VLS_pickFunctionalComponentCtx(__VLS_144, __VLS_146);
    // @ts-ignore
    const __VLS_150 = {}
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
    const __VLS_151 = __VLS_asFunctionalComponent(__VLS_150, new __VLS_150({}));
    const __VLS_152 = __VLS_151({}, ...__VLS_functionalComponentArgsRest(__VLS_151));
    ({}({}));
    (__VLS_155.slots).default;
    const __VLS_155 = __VLS_pickFunctionalComponentCtx(__VLS_150, __VLS_152);
    (__VLS_141.slots).default;
    const __VLS_141 = __VLS_pickFunctionalComponentCtx(__VLS_136, __VLS_138);
    let __VLS_139;
    let __VLS_140;
    // @ts-ignore
    const __VLS_156 = {}
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
    const __VLS_157 = __VLS_asFunctionalComponent(__VLS_156, new __VLS_156({ ...{ 'onClick': {} }, button: ((true)), ...{ class: ("ion-no-padding") }, detail: ((true)), }));
    const __VLS_158 = __VLS_157({ ...{ 'onClick': {} }, button: ((true)), ...{ class: ("ion-no-padding") }, detail: ((true)), }, ...__VLS_functionalComponentArgsRest(__VLS_157));
    ({}({ ...{ 'onClick': {} }, button: ((true)), ...{ class: ("ion-no-padding") }, detail: ((true)), }));
    let __VLS_162;
    const __VLS_163 = {
        onClick: (__VLS_ctx.openSearch)
    };
    // @ts-ignore
    const __VLS_164 = {}
        .IonIcon;
    ({}.IonIcon);
    ({}.IonIcon);
    __VLS_components.IonIcon;
    __VLS_components.ionIcon;
    __VLS_components.IonIcon;
    __VLS_components.ionIcon;
    // @ts-ignore
    [IonIcon, IonIcon,];
    // @ts-ignore
    const __VLS_165 = __VLS_asFunctionalComponent(__VLS_164, new __VLS_164({ ios: ((__VLS_ctx.searchCircleOutline)), md: ((__VLS_ctx.searchCircleOutline)), }));
    const __VLS_166 = __VLS_165({ ios: ((__VLS_ctx.searchCircleOutline)), md: ((__VLS_ctx.searchCircleOutline)), }, ...__VLS_functionalComponentArgsRest(__VLS_165));
    ({}({ ios: ((__VLS_ctx.searchCircleOutline)), md: ((__VLS_ctx.searchCircleOutline)), }));
    // @ts-ignore
    [openSearch, searchCircleOutline, searchCircleOutline,];
    const __VLS_169 = __VLS_pickFunctionalComponentCtx(__VLS_164, __VLS_166);
    // @ts-ignore
    const __VLS_170 = {}
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
    const __VLS_171 = __VLS_asFunctionalComponent(__VLS_170, new __VLS_170({}));
    const __VLS_172 = __VLS_171({}, ...__VLS_functionalComponentArgsRest(__VLS_171));
    ({}({}));
    (__VLS_175.slots).default;
    const __VLS_175 = __VLS_pickFunctionalComponentCtx(__VLS_170, __VLS_172);
    (__VLS_161.slots).default;
    const __VLS_161 = __VLS_pickFunctionalComponentCtx(__VLS_156, __VLS_158);
    let __VLS_159;
    let __VLS_160;
    (__VLS_121.slots).default;
    const __VLS_121 = __VLS_pickFunctionalComponentCtx(__VLS_116, __VLS_118);
    // @ts-ignore
    const __VLS_176 = {}
        .IonButton;
    ({}.IonButton);
    ({}.IonButton);
    __VLS_components.IonButton;
    __VLS_components.ionButton;
    __VLS_components.IonButton;
    __VLS_components.ionButton;
    // @ts-ignore
    [IonButton, IonButton,];
    // @ts-ignore
    const __VLS_177 = __VLS_asFunctionalComponent(__VLS_176, new __VLS_176({ ...{ 'onClick': {} }, expand: ("block"), fill: ("outline"), color: ("danger"), }));
    const __VLS_178 = __VLS_177({ ...{ 'onClick': {} }, expand: ("block"), fill: ("outline"), color: ("danger"), }, ...__VLS_functionalComponentArgsRest(__VLS_177));
    ({}({ ...{ 'onClick': {} }, expand: ("block"), fill: ("outline"), color: ("danger"), }));
    let __VLS_182;
    const __VLS_183 = {
        onClick: (__VLS_ctx.presentAlert)
    };
    // @ts-ignore
    [presentAlert,];
    (__VLS_181.slots).default;
    const __VLS_181 = __VLS_pickFunctionalComponentCtx(__VLS_176, __VLS_178);
    let __VLS_179;
    let __VLS_180;
    (__VLS_63.slots).default;
    const __VLS_63 = __VLS_pickFunctionalComponentCtx(__VLS_58, __VLS_60);
    (__VLS_5.slots).default;
    const __VLS_5 = __VLS_pickFunctionalComponentCtx(__VLS_0, __VLS_2);
    if (typeof __VLS_styleScopedClasses === 'object' && !Array.isArray(__VLS_styleScopedClasses)) {
        __VLS_styleScopedClasses['content'];
        __VLS_styleScopedClasses['ion-no-padding'];
        __VLS_styleScopedClasses['ion-no-padding'];
        __VLS_styleScopedClasses['ion-no-padding'];
    }
    var __VLS_slots;
    return __VLS_slots;
    const __VLS_componentsOption = {};
    let __VLS_name;
    let __VLS_defineComponent;
    const __VLS_internalComponent = __VLS_defineComponent({
        setup() {
            return {
                IonList: IonList,
                IonItem: IonItem,
                IonLabel: IonLabel,
                IonPage: IonPage,
                IonHeader: IonHeader,
                IonToolbar: IonToolbar,
                IonTitle: IonTitle,
                IonContent: IonContent,
                IonButtons: IonButtons,
                IonButton: IonButton,
                IonIcon: IonIcon,
                cogOutline: cogOutline,
                notificationsOutline: notificationsOutline,
                searchCircleOutline: searchCircleOutline,
                store: store,
                openSearch: openSearch,
                openSettings: openSettings,
                openNotifications: openNotifications,
                presentAlert: presentAlert,
                openUserList: openUserList,
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
