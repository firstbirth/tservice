import { maskitoAddOnFocusPlugin, maskitoCaretGuard, maskitoPrefixPostprocessorGenerator, maskitoRemoveOnBlurPlugin, } from "@maskito/kit";
// При вставке в поле номера через восьмёрку "89123456789" => "+7 (912) 345-67-89"
function createCompletePhoneInsertionPreprocessor() {
    const trimPrefix = (value) => value.replace(/^(\+?7?\s?8?)\s?/, "");
    const countDigits = (value) => value.replaceAll(/\D/g, "").length;
    return ({ elementState, data }) => {
        const { value, selection } = elementState;
        return {
            elementState: {
                selection,
                value: countDigits(value) > 11 ? trimPrefix(value) : value,
            },
            data: countDigits(data) >= 11 ? trimPrefix(data) : data,
        };
    };
}
export default {
    mask: [
        "+",
        "7",
        " ",
        "(",
        /\d/,
        /\d/,
        /\d/,
        ")",
        " ",
        /\d/,
        /\d/,
        /\d/,
        "-",
        /\d/,
        /\d/,
        "-",
        /\d/,
        /\d/,
    ],
    postprocessors: [
        // префикс который нельзя удалить
        maskitoPrefixPostprocessorGenerator("+7 "),
    ],
    preprocessors: [createCompletePhoneInsertionPreprocessor()],
    plugins: [
        maskitoAddOnFocusPlugin("+7 "),
        maskitoRemoveOnBlurPlugin("+7 "),
        // Запрещает устанавливать каретку перед неудаляемым префиксом
        // Но позволяет выделить всё значение поля целиком
        maskitoCaretGuard((value, [from, to]) => [
            from === to ? "+7 ".length : 0,
            value.length,
        ]),
    ],
    elementPredicate: (el) => {
        return new Promise((resolve) => {
            requestAnimationFrame(async () => {
                const input = await el.getInputElement();
                resolve(input);
            });
        });
    },
};
