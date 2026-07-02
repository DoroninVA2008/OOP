"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Timer = void 0;
var react_1 = require("react");
var Timer = function (_a) {
    var _b = _a.initialSeconds, initialSeconds = _b === void 0 ? 10 : _b;
    var _c = (0, react_1.useState)(initialSeconds), seconds = _c[0], setSeconds = _c[1];
    var _d = (0, react_1.useState)(false), timeIsUp = _d[0], setTimeIsUp = _d[1];
    (0, react_1.useEffect)(function () {
        if (seconds <= 0) {
            setTimeIsUp(true);
            return;
        }
        var interval = setInterval(function () {
            setSeconds(function (predSecond) { return predSecond - 1; });
        }, 1000);
        return function () {
            clearInterval(interval);
        };
    }, [seconds]);
    return (<div>
      {timeIsUp ? (<p>Time's up!</p>) : (<p>Осталось {seconds} сек.</p>)}
    </div>);
};
exports.Timer = Timer;
