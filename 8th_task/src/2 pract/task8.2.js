"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Timer = void 0;
var react_1 = require("react"); // useRef может быть полезен
var Timer = function (_a) {
    var initialSeconds = _a.initialSeconds;
    var _b = (0, react_1.useState)(initialSeconds), seconds = _b[0], setSeconds = _b[1]; // @ts-ignore
    var timerIdRef = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(function () {
        // 1. Условие остановки: если время вышло, ничего не делаем
        if (seconds <= 0) {
            console.log('Проверка timerIdRef при seconds <= 0:', timerIdRef.current);
            // debugger;
            if (timerIdRef.current) { //
                clearTimeout(timerIdRef.current);
                timerIdRef.current = null;
            }
            return;
        }
        // 2. Устанавливаем таймер на следующий "тик"
        timerIdRef.current = setTimeout(function () {
            setSeconds(function (predSecond) { return predSecond - 1; });
        }, 1000);
        // 3. Функция очистки: ОБЯЗАТЕЛЬНО очищаем текущий таймер
        return function () {
            if (timerIdRef.current) {
                clearTimeout(timerIdRef.current);
                timerIdRef.current = null;
            }
        };
    }, [seconds]); // Эффект зависит от `seconds` и перезапускается на каждом изменении
    return (<div>
      {seconds > 0 ? (<p>Осталось {seconds} сек.</p>) : (<p>Время вышло!</p>)}
    </div>);
};
exports.Timer = Timer;
