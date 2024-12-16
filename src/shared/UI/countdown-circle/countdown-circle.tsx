import CircleImg from "@/assets/icons/red-circle.svg?react";

const CountdownCircle = ({countdown, onCancel, extraClass, extraCircleClass , extraTextClass}: {
    countdown: number,
    onCancel?: Function,
    extraClass?: string
    extraCircleClass?: string
    extraTextClass?: string
}) => {
    const circumference = 2 * Math.PI * 8;

    return (
        <button onClick={() => {onCancel ? onCancel() : null}} className={`min-w-5 min-h-5 relative flex justify-center items-center ${extraClass}`}>
            <p className={`text-xs text-[#FF64A3] ${extraTextClass}`}>{countdown}</p>
            <CircleImg
                className={`absolute min-h-5 min-w-5 ${extraCircleClass}`}
                style={{
                    strokeDasharray: `${circumference}`,
                    strokeDashoffset: `${circumference - (circumference * (countdown - 1)) / 4}`,
                    transition: "stroke-dashoffset 1s linear",
                }}
            />
        </button>
    );
};

export {CountdownCircle};