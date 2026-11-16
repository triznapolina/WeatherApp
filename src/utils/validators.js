const CITY_REGEXP = /^[A-Za-zА-Яа-яЁё\s-]+$/;
const EMAIL_REGEXP = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateSettings(values) {
    const errors = {};
    const city = values.city.trim();
    const email = values.email.trim();

    if (city === '') {
        errors.city = 'Введите название города';
    } else if (city.length < 2) {
        errors.city = 'Название должно содержать минимум 2 символа';
    } else if (!CITY_REGEXP.test(city)) {
        errors.city = 'Допустимы только буквы, пробел и дефис';
    }

    if (email === '') {
        errors.email = 'Введите e-mail для рассылки';
    } else if (!EMAIL_REGEXP.test(email)) {
        errors.email = 'Некорректный формат e-mail';
    }

    return errors;
}

export function validateSubscription(values) {
    const errors = {};
    const email = values.email.trim();
    const threshold = values.threshold.trim();

    if (email === '') {
        errors.email = 'Введите e-mail';
    } else if (!EMAIL_REGEXP.test(email)) {
        errors.email = 'Некорректный формат e-mail';
    }

    if (threshold === '') {
        errors.threshold = 'Введите порог температуры';
    } else if (!/^-?\d+$/.test(threshold)) {
        errors.threshold = 'Порог — целое число';
    } else if (Number(threshold) < -50 || Number(threshold) > 50) {
        errors.threshold = 'Порог должен быть от -50 до 50';
    }

    return errors;
}
