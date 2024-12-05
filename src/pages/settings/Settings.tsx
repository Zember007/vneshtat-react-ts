import { Interface, Notifications } from "@/widgets/settings";
import { useLocation } from "react-router-dom";

const Settings = () => {

    const location = useLocation().pathname

    return (
        <div className="grow h-full flex flex-col gap-[15px]">
            <Interface active={!location.includes('/settings/notifications')}/>
            <Notifications active={location.includes('/settings/notifications')}/>
        </div>
    );
};

export default Settings;