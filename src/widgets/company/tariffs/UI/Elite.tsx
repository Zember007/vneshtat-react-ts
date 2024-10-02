import Img from '@/assets/img/company/bonus.webp'


const Elite = () => {
    return (
        <div className="h-full flex justify-center items-center">
            <div className="relative bg-[#292933] w-full h-full  max-h-[460px] rounded-[26px] flex flex-col justify-end items-center gap-[12px] text-center px-[28px] py-[32px]">
                <img src={Img} alt="bonus" className='absolute bottom-0 right-[50%] translate-x-[50%] max-w-full z-0' />
                <span className='text-[32px] font-medium text-primary relative max-w-[520px]'>
                    Специальные условия для тех, кто путешествует ооочень* много
                </span>
                <p className='text-[14px] font-medium text-primary relative'>*Более 100 поездок в месяц</p>
            </div>
        </div>
    );
};

export default Elite;