
let autoClickInterval: NodeJS.Timeout | null = null;

export function startAutoClick(level: number, handleClick: () => void) {
    if (level > 0) {
        setAutoClickInterval(level, handleClick);
    }
}

export function stopAutoClick() {
    if (autoClickInterval) {
        clearInterval(autoClickInterval);
        autoClickInterval = null;
    }
}

function setAutoClickInterval(level: number, handleClick: () => void) {
    stopAutoClick();  // Останавливаем предыдущий интервал

    if (level > 0) {
        const intervalTime = 30000 / level;  // Расчет времени между автокликами

        autoClickInterval = setInterval(() => {
            handleClick();  // Вызываем функцию клика
        }, intervalTime);
    }
}
