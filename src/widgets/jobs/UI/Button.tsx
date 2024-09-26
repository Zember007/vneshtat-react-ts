import { Link } from "react-router-dom";

const Button = ({to, title, Class}:{to:string; title: string | JSX.Element; Class?:string}) => {
    return (
        <Link to={to} className={'px-[25px] py-[15px] rounded-[13px] bg-[#FAFAFA] font-normal transition-all ' + Class}>{title}</Link>

    );
};

export default Button;