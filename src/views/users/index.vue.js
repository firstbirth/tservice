import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonBackButton, IonList, IonItemSliding, IonItem, IonAvatar, IonLabel, IonFooter, IonItemOptions, IonItemOption, IonSegment, IonSegmentButton, IonSearchbar, } from "@ionic/vue";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { UserService } from "@/services/user.service";
import { Browser } from "@capacitor/browser";
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
const users = ref([]);
const results = ref([]);
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
const openUser = (id, data) => {
    router.push({ path: `/users/${id}`, query: {
            name: data.worker,
            role: data.role,
            status: data.userStatus,
            phone: data.phone,
            email: data.email
        } });
};
const openWhatsapp = (phone) => {
    phone = phone.replace(/\D/g, "");
    Browser.open({ url: `https://wa.me/${phone}` });
};
const call = (phone) => {
    phone = phone.replace(/\D/g, "");
    window.open(`tel:${phone}`);
};
const email = (email) => {
    Browser.open({ url: `mailto:${email}` });
};
const handleInput = (event) => {
    const query = event.target.value.toLowerCase();
    results.value = users.value.filter((user) => {
        return (user.worker.toLowerCase().indexOf(query) > -1 ||
            user.role.toLowerCase().indexOf(query) > -1);
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
    (__VLS_35.slots).default;
    const __VLS_35 = __VLS_pickFunctionalComponentCtx(__VLS_30, __VLS_32);
    (__VLS_17.slots).default;
    const __VLS_17 = __VLS_pickFunctionalComponentCtx(__VLS_12, __VLS_14);
    if (!__VLS_ctx.connectionError) {
        // @ts-ignore
        const __VLS_36 = {}
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
        const __VLS_37 = __VLS_asFunctionalComponent(__VLS_36, new __VLS_36({}));
        const __VLS_38 = __VLS_37({}, ...__VLS_functionalComponentArgsRest(__VLS_37));
        ({}({}));
        // @ts-ignore
        const __VLS_42 = {}
            .IonSearchbar;
        ({}.IonSearchbar);
        ({}.IonSearchbar);
        __VLS_components.IonSearchbar;
        __VLS_components.ionSearchbar;
        __VLS_components.IonSearchbar;
        __VLS_components.ionSearchbar;
        // @ts-ignore
        [IonSearchbar, IonSearchbar,];
        // @ts-ignore
        const __VLS_43 = __VLS_asFunctionalComponent(__VLS_42, new __VLS_42({ ...{ 'onIonInput': {} }, inputmode: ("search"), ...{ class: ("custom") }, placeholder: ("Поиск"), debounce: ((350)), animated: ((true)), }));
        const __VLS_44 = __VLS_43({ ...{ 'onIonInput': {} }, inputmode: ("search"), ...{ class: ("custom") }, placeholder: ("Поиск"), debounce: ((350)), animated: ((true)), }, ...__VLS_functionalComponentArgsRest(__VLS_43));
        ({}({ ...{ 'onIonInput': {} }, inputmode: ("search"), ...{ class: ("custom") }, placeholder: ("Поиск"), debounce: ((350)), animated: ((true)), }));
        let __VLS_48;
        const __VLS_49 = {
            onIonInput: (...[$event]) => {
                if (!((!__VLS_ctx.connectionError)))
                    return;
                __VLS_ctx.handleInput($event);
                // @ts-ignore
                [connectionError, handleInput,];
            }
        };
        const __VLS_47 = __VLS_pickFunctionalComponentCtx(__VLS_42, __VLS_44);
        let __VLS_45;
        let __VLS_46;
        (__VLS_41.slots).default;
        const __VLS_41 = __VLS_pickFunctionalComponentCtx(__VLS_36, __VLS_38);
    }
    (__VLS_11.slots).default;
    const __VLS_11 = __VLS_pickFunctionalComponentCtx(__VLS_6, __VLS_8);
    // @ts-ignore
    const __VLS_50 = {}
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
    const __VLS_51 = __VLS_asFunctionalComponent(__VLS_50, new __VLS_50({ fullscreen: ((true)), }));
    const __VLS_52 = __VLS_51({ fullscreen: ((true)), }, ...__VLS_functionalComponentArgsRest(__VLS_51));
    ({}({ fullscreen: ((true)), }));
    // @ts-ignore
    const __VLS_56 = {}
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
    const __VLS_57 = __VLS_asFunctionalComponent(__VLS_56, new __VLS_56({ collapse: ("condense"), }));
    const __VLS_58 = __VLS_57({ collapse: ("condense"), }, ...__VLS_functionalComponentArgsRest(__VLS_57));
    ({}({ collapse: ("condense"), }));
    // @ts-ignore
    const __VLS_62 = {}
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
    const __VLS_63 = __VLS_asFunctionalComponent(__VLS_62, new __VLS_62({}));
    const __VLS_64 = __VLS_63({}, ...__VLS_functionalComponentArgsRest(__VLS_63));
    ({}({}));
    // @ts-ignore
    const __VLS_68 = {}
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
    const __VLS_69 = __VLS_asFunctionalComponent(__VLS_68, new __VLS_68({ slot: ("start"), }));
    const __VLS_70 = __VLS_69({ slot: ("start"), }, ...__VLS_functionalComponentArgsRest(__VLS_69));
    ({}({ slot: ("start"), }));
    // @ts-ignore
    const __VLS_74 = {}
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
    const __VLS_75 = __VLS_asFunctionalComponent(__VLS_74, new __VLS_74({ defaultHref: ("/"), }));
    const __VLS_76 = __VLS_75({ defaultHref: ("/"), }, ...__VLS_functionalComponentArgsRest(__VLS_75));
    ({}({ defaultHref: ("/"), }));
    const __VLS_79 = __VLS_pickFunctionalComponentCtx(__VLS_74, __VLS_76);
    (__VLS_73.slots).default;
    const __VLS_73 = __VLS_pickFunctionalComponentCtx(__VLS_68, __VLS_70);
    // @ts-ignore
    const __VLS_80 = {}
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
    const __VLS_81 = __VLS_asFunctionalComponent(__VLS_80, new __VLS_80({}));
    const __VLS_82 = __VLS_81({}, ...__VLS_functionalComponentArgsRest(__VLS_81));
    ({}({}));
    (__VLS_85.slots).default;
    const __VLS_85 = __VLS_pickFunctionalComponentCtx(__VLS_80, __VLS_82);
    (__VLS_67.slots).default;
    const __VLS_67 = __VLS_pickFunctionalComponentCtx(__VLS_62, __VLS_64);
    if (!__VLS_ctx.connectionError) {
        // @ts-ignore
        const __VLS_86 = {}
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
        const __VLS_87 = __VLS_asFunctionalComponent(__VLS_86, new __VLS_86({}));
        const __VLS_88 = __VLS_87({}, ...__VLS_functionalComponentArgsRest(__VLS_87));
        ({}({}));
        // @ts-ignore
        const __VLS_92 = {}
            .IonSearchbar;
        ({}.IonSearchbar);
        ({}.IonSearchbar);
        __VLS_components.IonSearchbar;
        __VLS_components.ionSearchbar;
        __VLS_components.IonSearchbar;
        __VLS_components.ionSearchbar;
        // @ts-ignore
        [IonSearchbar, IonSearchbar,];
        // @ts-ignore
        const __VLS_93 = __VLS_asFunctionalComponent(__VLS_92, new __VLS_92({ ...{ 'onIonInput': {} }, inputmode: ("search"), ...{ class: ("custom") }, placeholder: ("Поиск"), debounce: ((350)), animated: ((true)), }));
        const __VLS_94 = __VLS_93({ ...{ 'onIonInput': {} }, inputmode: ("search"), ...{ class: ("custom") }, placeholder: ("Поиск"), debounce: ((350)), animated: ((true)), }, ...__VLS_functionalComponentArgsRest(__VLS_93));
        ({}({ ...{ 'onIonInput': {} }, inputmode: ("search"), ...{ class: ("custom") }, placeholder: ("Поиск"), debounce: ((350)), animated: ((true)), }));
        let __VLS_98;
        const __VLS_99 = {
            onIonInput: (...[$event]) => {
                if (!((!__VLS_ctx.connectionError)))
                    return;
                __VLS_ctx.handleInput($event);
                // @ts-ignore
                [connectionError, handleInput,];
            }
        };
        const __VLS_97 = __VLS_pickFunctionalComponentCtx(__VLS_92, __VLS_94);
        let __VLS_95;
        let __VLS_96;
        (__VLS_91.slots).default;
        const __VLS_91 = __VLS_pickFunctionalComponentCtx(__VLS_86, __VLS_88);
    }
    (__VLS_61.slots).default;
    const __VLS_61 = __VLS_pickFunctionalComponentCtx(__VLS_56, __VLS_58);
    // @ts-ignore
    const __VLS_100 = {}
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
    const __VLS_101 = __VLS_asFunctionalComponent(__VLS_100, new __VLS_100({}));
    const __VLS_102 = __VLS_101({}, ...__VLS_functionalComponentArgsRest(__VLS_101));
    ({}({}));
    for (const [user] of __VLS_getVForSourceType((__VLS_ctx.results))) {
        // @ts-ignore
        const __VLS_106 = {}
            .IonItemSliding;
        ({}.IonItemSliding);
        ({}.IonItemSliding);
        __VLS_components.IonItemSliding;
        __VLS_components.ionItemSliding;
        __VLS_components.IonItemSliding;
        __VLS_components.ionItemSliding;
        // @ts-ignore
        [IonItemSliding, IonItemSliding,];
        // @ts-ignore
        const __VLS_107 = __VLS_asFunctionalComponent(__VLS_106, new __VLS_106({ ...{ class: ("fadeIn") }, }));
        const __VLS_108 = __VLS_107({ ...{ class: ("fadeIn") }, }, ...__VLS_functionalComponentArgsRest(__VLS_107));
        ({}({ ...{ class: ("fadeIn") }, }));
        // @ts-ignore
        const __VLS_112 = {}
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
        const __VLS_113 = __VLS_asFunctionalComponent(__VLS_112, new __VLS_112({ ...{ 'onClick': {} }, ...{ class: (((user.userStatus === 'ACTIVE') ? '' : 'inactive')) }, detail: ((true)), button: ((true)), }));
        const __VLS_114 = __VLS_113({ ...{ 'onClick': {} }, ...{ class: (((user.userStatus === 'ACTIVE') ? '' : 'inactive')) }, detail: ((true)), button: ((true)), }, ...__VLS_functionalComponentArgsRest(__VLS_113));
        ({}({ ...{ 'onClick': {} }, ...{ class: (((user.userStatus === 'ACTIVE') ? '' : 'inactive')) }, detail: ((true)), button: ((true)), }));
        __VLS_styleScopedClasses = ((user.userStatus === 'ACTIVE') ? '' : 'inactive');
        let __VLS_118;
        const __VLS_119 = {
            onClick: (...[$event]) => {
                __VLS_ctx.openUser(String(user.oid), user);
                // @ts-ignore
                [results, openUser,];
            }
        };
        // @ts-ignore
        const __VLS_120 = {}
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
        const __VLS_121 = __VLS_asFunctionalComponent(__VLS_120, new __VLS_120({ slot: ("start"), }));
        const __VLS_122 = __VLS_121({ slot: ("start"), }, ...__VLS_functionalComponentArgsRest(__VLS_121));
        ({}({ slot: ("start"), }));
        __VLS_elementAsFunction(__VLS_intrinsicElements.img)({ src: ((`https://source.boringavatars.com/beam/128/${user.worker}}?colors=000000,9f111b,b11623,292c37,cccccc`)), });
        (__VLS_125.slots).default;
        const __VLS_125 = __VLS_pickFunctionalComponentCtx(__VLS_120, __VLS_122);
        // @ts-ignore
        const __VLS_126 = {}
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
        const __VLS_127 = __VLS_asFunctionalComponent(__VLS_126, new __VLS_126({}));
        const __VLS_128 = __VLS_127({}, ...__VLS_functionalComponentArgsRest(__VLS_127));
        ({}({}));
        __VLS_elementAsFunction(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
        (user.worker !== ""
            ? user.worker
            : "Без имени");
        __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
        (user.role);
        (__VLS_131.slots).default;
        const __VLS_131 = __VLS_pickFunctionalComponentCtx(__VLS_126, __VLS_128);
        (__VLS_117.slots).default;
        const __VLS_117 = __VLS_pickFunctionalComponentCtx(__VLS_112, __VLS_114);
        let __VLS_115;
        let __VLS_116;
        // @ts-ignore
        const __VLS_132 = {}
            .IonItemOptions;
        ({}.IonItemOptions);
        ({}.IonItemOptions);
        __VLS_components.IonItemOptions;
        __VLS_components.ionItemOptions;
        __VLS_components.IonItemOptions;
        __VLS_components.ionItemOptions;
        // @ts-ignore
        [IonItemOptions, IonItemOptions,];
        // @ts-ignore
        const __VLS_133 = __VLS_asFunctionalComponent(__VLS_132, new __VLS_132({}));
        const __VLS_134 = __VLS_133({}, ...__VLS_functionalComponentArgsRest(__VLS_133));
        ({}({}));
        if (user.email) {
            // @ts-ignore
            const __VLS_138 = {}
                .IonItemOption;
            ({}.IonItemOption);
            ({}.IonItemOption);
            __VLS_components.IonItemOption;
            __VLS_components.ionItemOption;
            __VLS_components.IonItemOption;
            __VLS_components.ionItemOption;
            // @ts-ignore
            [IonItemOption, IonItemOption,];
            // @ts-ignore
            const __VLS_139 = __VLS_asFunctionalComponent(__VLS_138, new __VLS_138({ ...{ 'onClick': {} }, color: ("dark"), }));
            const __VLS_140 = __VLS_139({ ...{ 'onClick': {} }, color: ("dark"), }, ...__VLS_functionalComponentArgsRest(__VLS_139));
            ({}({ ...{ 'onClick': {} }, color: ("dark"), }));
            let __VLS_144;
            const __VLS_145 = {
                onClick: (...[$event]) => {
                    if (!((user.email)))
                        return;
                    __VLS_ctx.email(user.email);
                    // @ts-ignore
                    [email,];
                }
            };
            __VLS_elementAsFunction(__VLS_intrinsicElements.svg, __VLS_intrinsicElements.svg)({ xmlns: ("http://www.w3.org/2000/svg"), width: ("24"), height: ("24"), fill: ("currentColor"), ...{ class: ("bi bi-envelope-open") }, viewBox: ("0 0 16 16"), });
            __VLS_elementAsFunction(__VLS_intrinsicElements.path)({ d: ("M8.47 1.318a1 1 0 0 0-.94 0l-6 3.2A1 1 0 0 0 1 5.4v.817l5.75 3.45L8 8.917l1.25.75L15 6.217V5.4a1 1 0 0 0-.53-.882zM15 7.383l-4.778 2.867L15 13.117zm-.035 6.88L8 10.082l-6.965 4.18A1 1 0 0 0 2 15h12a1 1 0 0 0 .965-.738ZM1 13.116l4.778-2.867L1 7.383v5.734ZM7.059.435a2 2 0 0 1 1.882 0l6 3.2A2 2 0 0 1 16 5.4V14a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V5.4a2 2 0 0 1 1.059-1.765z"), });
            (__VLS_143.slots).default;
            const __VLS_143 = __VLS_pickFunctionalComponentCtx(__VLS_138, __VLS_140);
            let __VLS_141;
            let __VLS_142;
        }
        // @ts-ignore
        const __VLS_146 = {}
            .IonItemOption;
        ({}.IonItemOption);
        ({}.IonItemOption);
        __VLS_components.IonItemOption;
        __VLS_components.ionItemOption;
        __VLS_components.IonItemOption;
        __VLS_components.ionItemOption;
        // @ts-ignore
        [IonItemOption, IonItemOption,];
        // @ts-ignore
        const __VLS_147 = __VLS_asFunctionalComponent(__VLS_146, new __VLS_146({ ...{ 'onClick': {} }, color: ("primary"), }));
        const __VLS_148 = __VLS_147({ ...{ 'onClick': {} }, color: ("primary"), }, ...__VLS_functionalComponentArgsRest(__VLS_147));
        ({}({ ...{ 'onClick': {} }, color: ("primary"), }));
        let __VLS_152;
        const __VLS_153 = {
            onClick: (...[$event]) => {
                __VLS_ctx.call(user);
                // @ts-ignore
                [call,];
            }
        };
        __VLS_elementAsFunction(__VLS_intrinsicElements.svg, __VLS_intrinsicElements.svg)({ xmlns: ("http://www.w3.org/2000/svg"), width: ("24"), height: ("24"), fill: ("currentColor"), ...{ class: ("bi bi-telephone-outbound") }, viewBox: ("0 0 16 16"), });
        __VLS_elementAsFunction(__VLS_intrinsicElements.path)({ d: ("M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.6 17.6 0 0 0 4.168 6.608 17.6 17.6 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.68.68 0 0 0-.58-.122l-2.19.547a1.75 1.75 0 0 1-1.657-.459L5.482 8.062a1.75 1.75 0 0 1-.46-1.657l.548-2.19a.68.68 0 0 0-.122-.58zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877zM11 .5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V1.707l-4.146 4.147a.5.5 0 0 1-.708-.708L14.293 1H11.5a.5.5 0 0 1-.5-.5"), });
        (__VLS_151.slots).default;
        const __VLS_151 = __VLS_pickFunctionalComponentCtx(__VLS_146, __VLS_148);
        let __VLS_149;
        let __VLS_150;
        if (!user.phone.includes('+77152')) {
            // @ts-ignore
            const __VLS_154 = {}
                .IonItemOption;
            ({}.IonItemOption);
            ({}.IonItemOption);
            __VLS_components.IonItemOption;
            __VLS_components.ionItemOption;
            __VLS_components.IonItemOption;
            __VLS_components.ionItemOption;
            // @ts-ignore
            [IonItemOption, IonItemOption,];
            // @ts-ignore
            const __VLS_155 = __VLS_asFunctionalComponent(__VLS_154, new __VLS_154({ ...{ 'onClick': {} }, ...{ class: ("whatsapp") }, }));
            const __VLS_156 = __VLS_155({ ...{ 'onClick': {} }, ...{ class: ("whatsapp") }, }, ...__VLS_functionalComponentArgsRest(__VLS_155));
            ({}({ ...{ 'onClick': {} }, ...{ class: ("whatsapp") }, }));
            let __VLS_160;
            const __VLS_161 = {
                onClick: (...[$event]) => {
                    if (!((!user.phone.includes('+77152'))))
                        return;
                    __VLS_ctx.openWhatsapp(user.phone);
                    // @ts-ignore
                    [openWhatsapp,];
                }
            };
            __VLS_elementAsFunction(__VLS_intrinsicElements.svg, __VLS_intrinsicElements.svg)({ xmlns: ("http://www.w3.org/2000/svg"), width: ("24"), height: ("24"), fill: ("currentColor"), ...{ class: ("bi bi-whatsapp") }, viewBox: ("0 0 16 16"), });
            __VLS_elementAsFunction(__VLS_intrinsicElements.path)({ d: ("M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"), });
            (__VLS_159.slots).default;
            const __VLS_159 = __VLS_pickFunctionalComponentCtx(__VLS_154, __VLS_156);
            let __VLS_157;
            let __VLS_158;
        }
        (__VLS_137.slots).default;
        const __VLS_137 = __VLS_pickFunctionalComponentCtx(__VLS_132, __VLS_134);
        (__VLS_111.slots).default;
        const __VLS_111 = __VLS_pickFunctionalComponentCtx(__VLS_106, __VLS_108);
    }
    (__VLS_105.slots).default;
    const __VLS_105 = __VLS_pickFunctionalComponentCtx(__VLS_100, __VLS_102);
    (__VLS_55.slots).default;
    const __VLS_55 = __VLS_pickFunctionalComponentCtx(__VLS_50, __VLS_52);
    // @ts-ignore
    const __VLS_162 = {}
        .IonFooter;
    ({}.IonFooter);
    ({}.IonFooter);
    __VLS_components.IonFooter;
    __VLS_components.ionFooter;
    __VLS_components.IonFooter;
    __VLS_components.ionFooter;
    // @ts-ignore
    [IonFooter, IonFooter,];
    // @ts-ignore
    const __VLS_163 = __VLS_asFunctionalComponent(__VLS_162, new __VLS_162({}));
    const __VLS_164 = __VLS_163({}, ...__VLS_functionalComponentArgsRest(__VLS_163));
    ({}({}));
    // @ts-ignore
    const __VLS_168 = {}
        .IonSegment;
    ({}.IonSegment);
    ({}.IonSegment);
    __VLS_components.IonSegment;
    __VLS_components.ionSegment;
    __VLS_components.IonSegment;
    __VLS_components.ionSegment;
    // @ts-ignore
    [IonSegment, IonSegment,];
    // @ts-ignore
    const __VLS_169 = __VLS_asFunctionalComponent(__VLS_168, new __VLS_168({ value: ("active"), color: ("danger"), ...{ class: ("task_filter fadeInDown") }, }));
    const __VLS_170 = __VLS_169({ value: ("active"), color: ("danger"), ...{ class: ("task_filter fadeInDown") }, }, ...__VLS_functionalComponentArgsRest(__VLS_169));
    ({}({ value: ("active"), color: ("danger"), ...{ class: ("task_filter fadeInDown") }, }));
    // @ts-ignore
    const __VLS_174 = {}
        .IonSegmentButton;
    ({}.IonSegmentButton);
    ({}.IonSegmentButton);
    __VLS_components.IonSegmentButton;
    __VLS_components.ionSegmentButton;
    __VLS_components.IonSegmentButton;
    __VLS_components.ionSegmentButton;
    // @ts-ignore
    [IonSegmentButton, IonSegmentButton,];
    // @ts-ignore
    const __VLS_175 = __VLS_asFunctionalComponent(__VLS_174, new __VLS_174({ ...{ 'onClick': {} }, value: ("active"), }));
    const __VLS_176 = __VLS_175({ ...{ 'onClick': {} }, value: ("active"), }, ...__VLS_functionalComponentArgsRest(__VLS_175));
    ({}({ ...{ 'onClick': {} }, value: ("active"), }));
    let __VLS_180;
    const __VLS_181 = {
        onClick: (...[$event]) => {
            __VLS_ctx.filterActive();
            // @ts-ignore
            [filterActive,];
        }
    };
    // @ts-ignore
    const __VLS_182 = {}
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
    const __VLS_183 = __VLS_asFunctionalComponent(__VLS_182, new __VLS_182({}));
    const __VLS_184 = __VLS_183({}, ...__VLS_functionalComponentArgsRest(__VLS_183));
    ({}({}));
    (__VLS_187.slots).default;
    const __VLS_187 = __VLS_pickFunctionalComponentCtx(__VLS_182, __VLS_184);
    (__VLS_179.slots).default;
    const __VLS_179 = __VLS_pickFunctionalComponentCtx(__VLS_174, __VLS_176);
    let __VLS_177;
    let __VLS_178;
    // @ts-ignore
    const __VLS_188 = {}
        .IonSegmentButton;
    ({}.IonSegmentButton);
    ({}.IonSegmentButton);
    __VLS_components.IonSegmentButton;
    __VLS_components.ionSegmentButton;
    __VLS_components.IonSegmentButton;
    __VLS_components.ionSegmentButton;
    // @ts-ignore
    [IonSegmentButton, IonSegmentButton,];
    // @ts-ignore
    const __VLS_189 = __VLS_asFunctionalComponent(__VLS_188, new __VLS_188({ ...{ 'onClick': {} }, value: ("inactive"), }));
    const __VLS_190 = __VLS_189({ ...{ 'onClick': {} }, value: ("inactive"), }, ...__VLS_functionalComponentArgsRest(__VLS_189));
    ({}({ ...{ 'onClick': {} }, value: ("inactive"), }));
    let __VLS_194;
    const __VLS_195 = {
        onClick: (...[$event]) => {
            __VLS_ctx.filterInactive();
            // @ts-ignore
            [filterInactive,];
        }
    };
    // @ts-ignore
    const __VLS_196 = {}
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
    const __VLS_197 = __VLS_asFunctionalComponent(__VLS_196, new __VLS_196({}));
    const __VLS_198 = __VLS_197({}, ...__VLS_functionalComponentArgsRest(__VLS_197));
    ({}({}));
    (__VLS_201.slots).default;
    const __VLS_201 = __VLS_pickFunctionalComponentCtx(__VLS_196, __VLS_198);
    (__VLS_193.slots).default;
    const __VLS_193 = __VLS_pickFunctionalComponentCtx(__VLS_188, __VLS_190);
    let __VLS_191;
    let __VLS_192;
    (__VLS_173.slots).default;
    const __VLS_173 = __VLS_pickFunctionalComponentCtx(__VLS_168, __VLS_170);
    (__VLS_167.slots).default;
    const __VLS_167 = __VLS_pickFunctionalComponentCtx(__VLS_162, __VLS_164);
    (__VLS_5.slots).default;
    const __VLS_5 = __VLS_pickFunctionalComponentCtx(__VLS_0, __VLS_2);
    if (typeof __VLS_styleScopedClasses === 'object' && !Array.isArray(__VLS_styleScopedClasses)) {
        __VLS_styleScopedClasses['custom'];
        __VLS_styleScopedClasses['custom'];
        __VLS_styleScopedClasses['fadeIn'];
        __VLS_styleScopedClasses['bi'];
        __VLS_styleScopedClasses['bi-envelope-open'];
        __VLS_styleScopedClasses['bi'];
        __VLS_styleScopedClasses['bi-telephone-outbound'];
        __VLS_styleScopedClasses['whatsapp'];
        __VLS_styleScopedClasses['bi'];
        __VLS_styleScopedClasses['bi-whatsapp'];
        __VLS_styleScopedClasses['task_filter'];
        __VLS_styleScopedClasses['fadeInDown'];
    }
    var __VLS_slots;
    return __VLS_slots;
    const __VLS_componentsOption = {};
    let __VLS_name;
    let __VLS_defineComponent;
    const __VLS_internalComponent = __VLS_defineComponent({
        setup() {
            return {
                IonPage: IonPage,
                IonHeader: IonHeader,
                IonToolbar: IonToolbar,
                IonTitle: IonTitle,
                IonContent: IonContent,
                IonButtons: IonButtons,
                IonBackButton: IonBackButton,
                IonList: IonList,
                IonItemSliding: IonItemSliding,
                IonItem: IonItem,
                IonAvatar: IonAvatar,
                IonLabel: IonLabel,
                IonFooter: IonFooter,
                IonItemOptions: IonItemOptions,
                IonItemOption: IonItemOption,
                IonSegment: IonSegment,
                IonSegmentButton: IonSegmentButton,
                IonSearchbar: IonSearchbar,
                results: results,
                openUser: openUser,
                openWhatsapp: openWhatsapp,
                call: call,
                email: email,
                handleInput: handleInput,
                filterActive: filterActive,
                filterInactive: filterInactive,
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
