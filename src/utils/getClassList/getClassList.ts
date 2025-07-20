import { GetClassList } from './types';

/**
 * Функция для объединения классов в строку.
 * Принимает массив строк или массивы строк и возвращает одну строку с классами.
 */
export const getClassList = (...className: GetClassList): string => {
    if (!className || className.length === 0) {
        return '';
    }

    return className
        .flatMap((item) => (typeof item === 'string' ? item.split(' ') : item))
        .filter(Boolean)
        .join(' ');
};
