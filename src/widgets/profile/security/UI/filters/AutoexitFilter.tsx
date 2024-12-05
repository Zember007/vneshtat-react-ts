import InputSelect from '@/widgets/jobs/UI/InputSelect'
import { setIdleTime, setSwitchExit } from '../../../model/profile.store'

import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/app/config/store'

const AutoexitFilter = () => {

    const dispatch = useDispatch()

    const switchExit = useSelector((state: RootState) => state.profile.autoExitSwith);
    const idleTime = useSelector((state: RootState) => state.profile.idleTime);

    return (
        <div className="flex flex-col gap-[15px] justify-between grow ">

            <div className="flex flex-col gap-[10px] p-[13px] rounded-[23px] bg-[#ECEEF1]">
                <InputSelect data={switchExit} change={(id: number) => {
                    dispatch(setSwitchExit(id))
                }} title='Автовыход' />

                <InputSelect data={idleTime} change={(id: number) => {
                    dispatch(setIdleTime(id))
                }} title='Время бездействия' />
            </div>

            <div className="flex flex-col gap-[10px] pt-[15px] border-0 border-t border-solid border-[#D9D9D9]">
            </div>
        </div>
    );
};

export default AutoexitFilter;