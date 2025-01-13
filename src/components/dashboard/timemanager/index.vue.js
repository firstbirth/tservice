import { IonCard, IonCardHeader, IonCardContent, IonText, IonImg, IonList, IonItem, IonAvatar, IonLabel, IonButton, IonIcon, IonRow, IonCol } from '@ionic/vue';
import { flag, play, pause } from 'ionicons/icons';
export default (await import('vue')).defineComponent({
    components: {
        IonCard,
        IonCardHeader,
        IonCardContent,
        IonList,
        IonItem,
        IonText,
        IonAvatar,
        IonLabel,
        IonButton,
        IonIcon,
        IonImg,
        IonRow,
        IonCol,
    },
    data() {
        return {
            tasks: [
                {
                    name: 'Длинное название заказ-наряда в несколько строк для наглядной демонстрации',
                    time: 0,
                    running: false,
                    author: {
                        name: 'Автор',
                        avatar: 'https://ionicframework.com/docs/img/demos/avatar.svg'
                    },
                    engineer: {
                        name: 'Инженер',
                        avatar: 'https://ionicframework.com/docs/img/demos/avatar.svg'
                    },
                    master: {
                        name: 'Мастер',
                        avatar: 'https://ionicframework.com/docs/img/demos/avatar.svg'
                    }
                },
                {
                    name: 'Заказ-наряд 2',
                    time: 0,
                    running: false,
                    author: {
                        name: 'Автор',
                        avatar: 'https://ionicframework.com/docs/img/demos/avatar.svg'
                    },
                    master: {
                        name: 'Мастер',
                        avatar: 'https://ionicframework.com/docs/img/demos/avatar.svg'
                    }
                },
                {
                    name: 'Заказ-наряд 3',
                    time: 0,
                    running: false,
                    author: {
                        name: 'Автор',
                        avatar: 'https://ionicframework.com/docs/img/demos/avatar.svg'
                    },
                    master: {
                        name: 'Мастер',
                        avatar: 'https://ionicframework.com/docs/img/demos/avatar.svg'
                    }
                },
            ],
            playIcon: play,
            pauseIcon: pause,
            flagIcon: flag,
            intervalId: null,
        };
    },
    methods: {
        toggleTimer(index) {
            const task = this.tasks[index];
            // Если таймер уже запущен, останавливаем его
            if (task.timerId) {
                clearInterval(task.timerId);
                task.timerId = undefined;
                task.running = false;
            }
            else {
                // Запускаем таймер, сохраняем его идентификатор в объекте задачи
                task.timerId = setInterval(() => {
                    task.time++;
                }, 1000);
                task.running = true;
            }
        },
        formatTime(seconds) {
            const hours = Math.floor(seconds / 3600);
            const minutes = Math.floor((seconds % 3600) / 60);
            const secs = seconds % 60;
            return `${this.padZero(hours)}:${this.padZero(minutes)}:${this.padZero(secs)}`;
        },
        padZero(num) {
            return num.toString().padStart(2, '0');
        },
    },
    beforeUnmount() {
        // Очищаем все интервалы перед удалением компонента
        this.tasks.forEach(task => {
            if (task.timerId) {
                clearInterval(task.timerId);
            }
        });
    },
});
;
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
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({ id: ("time-card"), }));
    const __VLS_2 = __VLS_1({ id: ("time-card"), }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    ({}({ id: ("time-card"), }));
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
        const __VLS_25 = __VLS_asFunctionalComponent(__VLS_24, new __VLS_24({ button: ((true)), detail: ((false)), key: ((index)), }));
        const __VLS_26 = __VLS_25({ button: ((true)), detail: ((false)), key: ((index)), }, ...__VLS_functionalComponentArgsRest(__VLS_25));
        ({}({ button: ((true)), detail: ((false)), key: ((index)), }));
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("column") }, });
        // @ts-ignore
        const __VLS_30 = {}
            .IonText;
        ({}.IonText);
        ({}.IonText);
        __VLS_components.IonText;
        __VLS_components.ionText;
        __VLS_components.IonText;
        __VLS_components.ionText;
        // @ts-ignore
        [IonText, IonText,];
        // @ts-ignore
        const __VLS_31 = __VLS_asFunctionalComponent(__VLS_30, new __VLS_30({ ...{ class: ("order-name") }, }));
        const __VLS_32 = __VLS_31({ ...{ class: ("order-name") }, }, ...__VLS_functionalComponentArgsRest(__VLS_31));
        ({}({ ...{ class: ("order-name") }, }));
        (task.name);
        // @ts-ignore
        [tasks,];
        (__VLS_35.slots).default;
        const __VLS_35 = __VLS_pickFunctionalComponentCtx(__VLS_30, __VLS_32);
        // @ts-ignore
        const __VLS_36 = {}
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
        const __VLS_37 = __VLS_asFunctionalComponent(__VLS_36, new __VLS_36({ ...{ class: ("timer") }, ...{ class: (({ 'timer-running': task.running })) }, }));
        const __VLS_38 = __VLS_37({ ...{ class: ("timer") }, ...{ class: (({ 'timer-running': task.running })) }, }, ...__VLS_functionalComponentArgsRest(__VLS_37));
        ({}({ ...{ class: ("timer") }, ...{ class: (({ 'timer-running': task.running })) }, }));
        __VLS_styleScopedClasses = ({ 'timer-running': task.running });
        // @ts-ignore
        const __VLS_42 = {}
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
        const __VLS_43 = __VLS_asFunctionalComponent(__VLS_42, new __VLS_42({ size: ("6"), }));
        const __VLS_44 = __VLS_43({ size: ("6"), }, ...__VLS_functionalComponentArgsRest(__VLS_43));
        ({}({ size: ("6"), }));
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("task-authors") }, });
        if (task.author && task.author.name) {
            // @ts-ignore
            const __VLS_48 = {}
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
            const __VLS_49 = __VLS_asFunctionalComponent(__VLS_48, new __VLS_48({}));
            const __VLS_50 = __VLS_49({}, ...__VLS_functionalComponentArgsRest(__VLS_49));
            ({}({}));
            // @ts-ignore
            const __VLS_54 = {}
                .IonImg;
            ({}.IonImg);
            ({}.IonImg);
            __VLS_components.IonImg;
            __VLS_components.ionImg;
            __VLS_components.IonImg;
            __VLS_components.ionImg;
            // @ts-ignore
            [IonImg, IonImg,];
            // @ts-ignore
            const __VLS_55 = __VLS_asFunctionalComponent(__VLS_54, new __VLS_54({ src: ((task.author.avatar)), }));
            const __VLS_56 = __VLS_55({ src: ((task.author.avatar)), }, ...__VLS_functionalComponentArgsRest(__VLS_55));
            ({}({ src: ((task.author.avatar)), }));
            const __VLS_59 = __VLS_pickFunctionalComponentCtx(__VLS_54, __VLS_56);
            (__VLS_53.slots).default;
            const __VLS_53 = __VLS_pickFunctionalComponentCtx(__VLS_48, __VLS_50);
        }
        if (task.engineer && task.engineer.name) {
            // @ts-ignore
            const __VLS_60 = {}
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
            const __VLS_61 = __VLS_asFunctionalComponent(__VLS_60, new __VLS_60({}));
            const __VLS_62 = __VLS_61({}, ...__VLS_functionalComponentArgsRest(__VLS_61));
            ({}({}));
            // @ts-ignore
            const __VLS_66 = {}
                .IonImg;
            ({}.IonImg);
            ({}.IonImg);
            __VLS_components.IonImg;
            __VLS_components.ionImg;
            __VLS_components.IonImg;
            __VLS_components.ionImg;
            // @ts-ignore
            [IonImg, IonImg,];
            // @ts-ignore
            const __VLS_67 = __VLS_asFunctionalComponent(__VLS_66, new __VLS_66({ src: ((task.engineer.avatar)), }));
            const __VLS_68 = __VLS_67({ src: ((task.engineer.avatar)), }, ...__VLS_functionalComponentArgsRest(__VLS_67));
            ({}({ src: ((task.engineer.avatar)), }));
            const __VLS_71 = __VLS_pickFunctionalComponentCtx(__VLS_66, __VLS_68);
            (__VLS_65.slots).default;
            const __VLS_65 = __VLS_pickFunctionalComponentCtx(__VLS_60, __VLS_62);
        }
        if (task.master && task.master.name) {
            // @ts-ignore
            const __VLS_72 = {}
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
            const __VLS_73 = __VLS_asFunctionalComponent(__VLS_72, new __VLS_72({}));
            const __VLS_74 = __VLS_73({}, ...__VLS_functionalComponentArgsRest(__VLS_73));
            ({}({}));
            // @ts-ignore
            const __VLS_78 = {}
                .IonImg;
            ({}.IonImg);
            ({}.IonImg);
            __VLS_components.IonImg;
            __VLS_components.ionImg;
            __VLS_components.IonImg;
            __VLS_components.ionImg;
            // @ts-ignore
            [IonImg, IonImg,];
            // @ts-ignore
            const __VLS_79 = __VLS_asFunctionalComponent(__VLS_78, new __VLS_78({ src: ((task.master.avatar)), }));
            const __VLS_80 = __VLS_79({ src: ((task.master.avatar)), }, ...__VLS_functionalComponentArgsRest(__VLS_79));
            ({}({ src: ((task.master.avatar)), }));
            const __VLS_83 = __VLS_pickFunctionalComponentCtx(__VLS_78, __VLS_80);
            (__VLS_77.slots).default;
            const __VLS_77 = __VLS_pickFunctionalComponentCtx(__VLS_72, __VLS_74);
        }
        (__VLS_47.slots).default;
        const __VLS_47 = __VLS_pickFunctionalComponentCtx(__VLS_42, __VLS_44);
        // @ts-ignore
        const __VLS_84 = {}
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
        const __VLS_85 = __VLS_asFunctionalComponent(__VLS_84, new __VLS_84({ size: ("6"), }));
        const __VLS_86 = __VLS_85({ size: ("6"), }, ...__VLS_functionalComponentArgsRest(__VLS_85));
        ({}({ size: ("6"), }));
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("time-controls") }, });
        (__VLS_ctx.formatTime(task.time));
        // @ts-ignore
        const __VLS_90 = {}
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
        const __VLS_91 = __VLS_asFunctionalComponent(__VLS_90, new __VLS_90({ ...{ 'onClick': {} }, color: ((task.running ? 'success' : 'dark')), fill: ((task.running ? 'outline' : 'outline')), shape: ("round"), ...{ class: (({ 'task-timer-button-running': task.running, 'task-timer-button-stopped': !task.running })) }, }));
        const __VLS_92 = __VLS_91({ ...{ 'onClick': {} }, color: ((task.running ? 'success' : 'dark')), fill: ((task.running ? 'outline' : 'outline')), shape: ("round"), ...{ class: (({ 'task-timer-button-running': task.running, 'task-timer-button-stopped': !task.running })) }, }, ...__VLS_functionalComponentArgsRest(__VLS_91));
        ({}({ ...{ 'onClick': {} }, color: ((task.running ? 'success' : 'dark')), fill: ((task.running ? 'outline' : 'outline')), shape: ("round"), ...{ class: (({ 'task-timer-button-running': task.running, 'task-timer-button-stopped': !task.running })) }, }));
        __VLS_styleScopedClasses = ({ 'task-timer-button-running': task.running, 'task-timer-button-stopped': !task.running });
        let __VLS_96;
        const __VLS_97 = {
            onClick: (...[$event]) => {
                __VLS_ctx.toggleTimer(index);
                // @ts-ignore
                [formatTime, toggleTimer,];
            }
        };
        // @ts-ignore
        const __VLS_98 = {}
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
        const __VLS_99 = __VLS_asFunctionalComponent(__VLS_98, new __VLS_98({ icon: ((task.running ? __VLS_ctx.pauseIcon : __VLS_ctx.playIcon)), ...{ class: ("custom-icon") }, }));
        const __VLS_100 = __VLS_99({ icon: ((task.running ? __VLS_ctx.pauseIcon : __VLS_ctx.playIcon)), ...{ class: ("custom-icon") }, }, ...__VLS_functionalComponentArgsRest(__VLS_99));
        ({}({ icon: ((task.running ? __VLS_ctx.pauseIcon : __VLS_ctx.playIcon)), ...{ class: ("custom-icon") }, }));
        // @ts-ignore
        [pauseIcon, playIcon,];
        const __VLS_103 = __VLS_pickFunctionalComponentCtx(__VLS_98, __VLS_100);
        (__VLS_95.slots).default;
        const __VLS_95 = __VLS_pickFunctionalComponentCtx(__VLS_90, __VLS_92);
        let __VLS_93;
        let __VLS_94;
        (__VLS_89.slots).default;
        const __VLS_89 = __VLS_pickFunctionalComponentCtx(__VLS_84, __VLS_86);
        (__VLS_41.slots).default;
        const __VLS_41 = __VLS_pickFunctionalComponentCtx(__VLS_36, __VLS_38);
        (__VLS_29.slots).default;
        const __VLS_29 = __VLS_pickFunctionalComponentCtx(__VLS_24, __VLS_26);
    }
    (__VLS_23.slots).default;
    const __VLS_23 = __VLS_pickFunctionalComponentCtx(__VLS_18, __VLS_20);
    (__VLS_17.slots).default;
    const __VLS_17 = __VLS_pickFunctionalComponentCtx(__VLS_12, __VLS_14);
    (__VLS_5.slots).default;
    const __VLS_5 = __VLS_pickFunctionalComponentCtx(__VLS_0, __VLS_2);
    if (typeof __VLS_styleScopedClasses === 'object' && !Array.isArray(__VLS_styleScopedClasses)) {
        __VLS_styleScopedClasses['column'];
        __VLS_styleScopedClasses['order-name'];
        __VLS_styleScopedClasses['timer'];
        __VLS_styleScopedClasses['task-authors'];
        __VLS_styleScopedClasses['time-controls'];
        __VLS_styleScopedClasses['custom-icon'];
    }
    var __VLS_slots;
    return __VLS_slots;
    const __VLS_componentsOption = {
        IonCard,
        IonCardHeader,
        IonCardContent,
        IonList,
        IonItem,
        IonText,
        IonAvatar,
        IonLabel,
        IonButton,
        IonIcon,
        IonImg,
        IonRow,
        IonCol,
    };
    const __VLS_name = undefined;
    let __VLS_internalComponent;
}
