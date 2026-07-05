import { formatDate } from '@/utils/formatters';

export function sayHello(name: string): string {
    const today = new Date();
    const formattedDate = formatDate(today);
    return `Hello, ${name}! Сегодня ${formattedDate}.`;
}