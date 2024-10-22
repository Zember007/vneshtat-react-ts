import CloseImg from '@/assets/icons/close.svg?react'
import { useClickAway } from '@/shared/hooks/use-click-away';
import { ReactNode, useEffect, useRef } from 'react';
const ModalRight = ({ active, close, title, description, button, children }: { active: boolean; close: Function; title: string; button: string; description: string; children: ReactNode }) => {

    useEffect(() => {

        window.addEventListener('keyup', (e) => {
            if (e.code == 'Escape') {
                close()
            }

        })

        return () => {
            window.removeEventListener('keyup', () => { })
        }
    }, [])

    const box = useRef<HTMLDivElement | null>(null)

    useClickAway(box, () => { close() })

    return (
        <div className={`z-[100] fixed bg-[#1212124d] top-0 bottom-0 right-0 left-0 transition-all duration-500 ${!active && 'invisible opacity-0'} `}>
            <div ref={box} className={`fixed top-0 bottom-0 right-0 p-[30px] rounded-l-[36px] bg-primary w-[500px] flex flex-col justify-between transition-all duration-500 ${!active && 'translate-x-[100%]'}`}>
                <div className="flex flex-col gap-[15px]  h-full">
                    <div className="flex flex-col gap-[10px]">
                        <div className="flex justify-between">
                            <span className="text-[25px] font-medium leading-[1]">{title}</span>
                            <button onClick={() => { close() }}><CloseImg className='w-[25px] h-[25px] *:fill-[#BDBFC7]' /></button>
                        </div>
                        <p className='text-[#787B86] text-[14px] leading-[1.2]'>
                            {description}
                        </p>
                    </div>
                    {children}
                </div>
                <button className='text-[#787B86] text-[16px] py-[10.5px] px-[52px] rounded-[13px] bg-[#ECEEF1] self-end'>{button}</button>
            </div>
        </div>
    );
};

export { ModalRight };