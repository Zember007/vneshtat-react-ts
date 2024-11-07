import {useConfirmToken} from "@/shared/hooks/use-confirm-token";
import {useSearchParams} from "react-router-dom";

const RegistrationConfirm = () => {
    console.log('connect');
    const [query] = useSearchParams();
    const token = query.get("token") || "";

    useConfirmToken(token);
    
    return null;
};

export default RegistrationConfirm;