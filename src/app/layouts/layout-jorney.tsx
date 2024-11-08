import { ReactNode } from "react";


interface props {
    block?: ReactNode;
    block1?: ReactNode;
    block2?: ReactNode;
}

const Layout = ({ block, block1, block2 }: props) => {
    return (
        <div className="flex flex-col gap-[15px] grow">
            <div className="rounded-[26px] bg-primary p-[30px]">
                {block}
            </div>
            <div className="flex gap-[15px] grow">
                <div className="rounded-[26px] bg-primary p-[30px] grow">
                    {block1}
                </div>
                {!block2 ? <div className="rounded-[26px] bg-primary p-[30px] min-w-[300px]"></div> : block2}
            </div>
        </div>
    );
};

export default Layout;