/* __placeholder__ */
import { IonCard, IonCardHeader, IonCardContent } from '@ionic/vue';
import { defineComponent } from 'vue';
import Chart from 'chart.js/auto';
export default defineComponent({
    components: {
        IonCard,
        IonCardHeader,
        IonCardContent,
    },
    data() {
        return {
            // зарплаты за каждый месяц
            salaries: [
                175990,
                188271,
                205011,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0
            ]
        };
    },
    mounted() {
        this.renderChart();
    },
    methods: {
        renderChart() {
            const ctx = this.$refs.chart.getContext('2d');
            if (!ctx)
                return;
            const monthNames = [
                'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
                'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
            ];
            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: Array.from({ length: 12 }, (_, i) => i + 1),
                    datasets: [{
                            label: 'Зарплата за месяц',
                            data: this.salaries,
                            backgroundColor: this.salaries.map((_, i) => i + 1 === new Date().getMonth() + 1 ? '#eb445a' : '#ccc'),
                        }],
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true,
                        },
                    },
                    plugins: {
                        legend: {
                            display: false, // Отключение легенды
                        },
                        tooltip: {
                            callbacks: {
                                title: function (context) {
                                    const labelIndex = context[0].dataIndex;
                                    return monthNames[labelIndex];
                                }
                            }
                        }
                    },
                },
            });
        },
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
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({ id: ("salary-card"), }));
    const __VLS_2 = __VLS_1({ id: ("salary-card"), }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    ({}({ id: ("salary-card"), }));
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
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.canvas, __VLS_intrinsicElements.canvas)({ ref: ("chart"), });
    // @ts-ignore
    (__VLS_ctx.chart);
    // @ts-ignore
    [chart,];
    (__VLS_17.slots).default;
    const __VLS_17 = __VLS_pickFunctionalComponentCtx(__VLS_12, __VLS_14);
    (__VLS_5.slots).default;
    const __VLS_5 = __VLS_pickFunctionalComponentCtx(__VLS_0, __VLS_2);
    if (typeof __VLS_styleScopedClasses === 'object' && !Array.isArray(__VLS_styleScopedClasses)) {
    }
    var __VLS_slots;
    return __VLS_slots;
    const __VLS_componentsOption = {
        IonCard,
        IonCardHeader,
        IonCardContent,
    };
    const __VLS_name = undefined;
    let __VLS_internalComponent;
}
