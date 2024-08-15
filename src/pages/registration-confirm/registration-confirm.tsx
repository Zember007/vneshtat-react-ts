import {useConfirmToken} from "@/shared/hooks/use-confirm-token";
import {useSearchParams} from "react-router-dom";

const RegistrationConfirm = () => {
    const [query] = useSearchParams();
    const token = query.get("token") || "";
    useConfirmToken(token);
    return null;
};

export default RegistrationConfirm;