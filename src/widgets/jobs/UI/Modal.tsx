
interface props {
    title: String,
    button?: String,
    text: String,
    body: JSX.Element,
    action: Function
}

const Modal = (props: props) => {

    return (
        <div className="fixed top-0 bottom-0 right-0 left-0 bg-[#00000066] z-[1000]">
            <div className='absolute top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%] rounded-[36px] p-8 min-w-[540px] flex flex-col gap-[15px] bg-[#fafafa]'>
                <div className="flex flex-col gap-[10px]">
                    <div className="flex justify-between">
                        <div className="font-medium text-[1.56rem] leading-8 leading-[100%] text-[#121212]">{props.title}</div>
                        <button onClick={() => {props.action(false)}}>
                            <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M19.9355 6.04661C20.2067 5.77541 20.2067 5.33571 19.9355 5.06451C19.6643 4.79332 19.2246 4.79332 18.9534 5.06451L12.5 11.5179L6.04658 5.06451C5.77538 4.79332 5.33568 4.79332 5.06448 5.06451C4.79328 5.33571 4.79328 5.77541 5.06448 6.04661L11.5179 12.5L5.06448 18.9534C4.79329 19.2246 4.79329 19.6643 5.06448 19.9355C5.33568 20.2067 5.77538 20.2067 6.04658 19.9355L12.5 13.4821L18.9534 19.9355C19.2246 20.2067 19.6643 20.2067 19.9355 19.9355C20.2067 19.6643 20.2067 19.2246 19.9355 18.9534L13.4821 12.5L19.9355 6.04661Z" fill="#BDBFC7" />
                            </svg>
                        </button>
                    </div>
                    <div className="font-normal text-sm text-[#121212]">
                        {props.text}
                    </div>
                </div>
                <div className="flex gap-[10px]">
                    {props.body}
                </div>
                {props.button && <button onClick={() => {props.action(false)}} className='rounded-[13px] bg-[#eceef1] py-[15px]  px-[35px]  font-normal text-base text-center text-[#787b86] self-end'>
                    {props.button}
                </button> }
            </div>
        </div>
    );
};

export default Modal;