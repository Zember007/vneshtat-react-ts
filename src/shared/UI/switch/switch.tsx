import {SwitchProps} from "@/shared/UI/switch/switch.props";

const Switch = ({
                    extraClass,
                    firstChild,
                    secondChild,
                    extraChildClass,
                    isSelected,
                    selectedBg = "#fafafa",
                    unselectedBg = "#eceef1",
                    setter,
                }: SwitchProps) => {
    return (
        <div className={`flex flex-row items-center bg-secondary p-1 rounded-primary w-fit ${extraClass}`}>
            <div
                className={`rounded-secondary cursor-pointer h-7 flex justify-center items-center py-1.5 px-2.5 ${extraChildClass}`}
                style={{
                    backgroundColor: isSelected ? selectedBg : unselectedBg,
                    transition: "background-color 0.3s ease",
                }}
                onClick={() => setter(true)}
            >
                {firstChild}
            </div>
            <div
                className={`rounded-secondary cursor-pointer h-7 flex justify-center items-center py-1.5 px-2.5 ${extraChildClass}`}
                style={{
                    backgroundColor: !isSelected ? selectedBg : unselectedBg,
                    transition: "background-color 0.3s ease",
                }}
                onClick={() => setter(false)}
            >
                {secondChild}
            </div>
        </div>
    );
};

export {Switch};
