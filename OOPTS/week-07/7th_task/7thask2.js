"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
function fetchUsers(city) {
    return __awaiter(this, void 0, void 0, function () {
        var response, users, filteredUsers, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch('https://jsonplaceholder.typicode.com/users')];
                case 1:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error("\u041E\u0448\u0438\u0431\u043A\u0430 HTTP: ".concat(response.status));
                    }
                    return [4 /*yield*/, response.json()];
                case 2:
                    users = _a.sent();
                    if (city) {
                        filteredUsers = users.filter(function (user) { var _a; return ((_a = user.address) === null || _a === void 0 ? void 0 : _a.city) === city; });
                        console.log("\u041D\u0430\u0439\u0434\u0435\u043D\u043E \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u0435\u0439 \u0438\u0437 \u0433\u043E\u0440\u043E\u0434\u0430 ".concat(city, ": ").concat(filteredUsers.length));
                        return [2 /*return*/, filteredUsers];
                    }
                    console.log("\u0412\u0441\u0435\u0433\u043E \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u0435\u0439: ".concat(users.length));
                    return [2 /*return*/, users];
                case 3:
                    error_1 = _a.sent();
                    console.error('Не удалось загрузить список пользователей:', error_1);
                    return [2 /*return*/, []];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function displayUsersByCity() {
    return __awaiter(this, void 0, void 0, function () {
        var allUsers, usersFromGwenborough;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetchUsers()];
                case 1:
                    allUsers = _a.sent();
                    console.log('Все пользователи:', allUsers);
                    return [4 /*yield*/, fetchUsers('Gwenborough')];
                case 2:
                    usersFromGwenborough = _a.sent();
                    console.log('Пользователи из Gwenborough:', usersFromGwenborough);
                    return [2 /*return*/];
            }
        });
    });
}
