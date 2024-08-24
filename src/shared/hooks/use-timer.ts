import { useEffect, useState } from "react";

const useTimer = (secondsAmount: number, startTimer: boolean) => {
    const [seconds, setSeconds] = useState<number>(secondsAmount);

    useEffect(() => {
        let timeoutId: NodeJS.Timeout | undefined;

        if (startTimer && seconds > 0) {
            timeoutId = setTimeout(() => {
                setSeconds(prev => prev - 1);
            }, 1000);
        }

        return () => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        };
    }, [startTimer, seconds]);

    useEffect(() => {
        if (!startTimer) {
            setSeconds(secondsAmount);
        }
    }, [startTimer, secondsAmount]);

    return seconds;
};

export { useTimer };
