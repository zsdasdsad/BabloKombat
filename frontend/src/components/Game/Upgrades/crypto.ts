let cryptoInterval: NodeJS.Timeout | null = null;

export function startCrypto(level: number, modifyBalance: (amount: number) => void) {
    if (level > 0) {
        setCryptoInterval(level, modifyBalance);
    }
}

export function stopCrypto() {
    if (cryptoInterval) {
        clearInterval(cryptoInterval);
        cryptoInterval = null;
    }
}

function setCryptoInterval(level: number, modifyBalance: (amount: number) => void) {
    stopCrypto();

    if (level > 0) {
        const intervalTime = 50000;

        cryptoInterval = setInterval(() => {
            const multiplier = 1.05 * level;
            modifyBalance(multiplier);
        }, intervalTime);
    }
}
