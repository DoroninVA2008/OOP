// Импорт именованных экспортов import { sum, PI } from '@/math.ts';

// Импорт с переименованием (если есть конфликт имен) import { sum as add } from '@/math.ts';

// Импорт всего содержимого модуля в один объект import { sayHello } from '@/components/greeter.ts';

import * as MathUtils from '@/math.ts';
console.log(MathUtils.sum(2, 2));

// Импорт экспорта по умолчанию import Calculator from '@/math.ts';