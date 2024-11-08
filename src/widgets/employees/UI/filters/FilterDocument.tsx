
import { useEffect, useState } from "react";
import PlusImg from '@/assets/icons/plus.svg?react'
import TrashImg from "@/assets/icons/trash.svg?react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/config/store";
import InputSelect from "@/widgets/jobs/UI/InputSelect";
import { changeStaffersDocuments, setCategoryDocument, setDocument } from "../../model/index.store";
import InputDate from "@/widgets/jobs/UI/InputDate";
import { getNameDocument } from "../../utils";

const FilterDocument = ({ selectId, passenger }: { selectId: number | null, passenger?: boolean }) => {

    const dispatch = useDispatch()


    const [documentAdd, setDocumentAdd] = useState<boolean>(false)

    const categoryDocuments = useSelector((state: RootState) => state.employees.categoryDocuments);
    const categorySelect = categoryDocuments.find(item => item.isSelected);
    const documentsAdds = useSelector((state: RootState) => state.employees.documents).filter(item => item.category === categorySelect?.code);


    const documents = useSelector((state: RootState) => state.employees.StaffersDocuments).find(item => item.EmployeeId === selectId)?.Documents;

    useEffect(() => {
        console.log(passenger);

    }, [])

    return (
        <div className="flex flex-col grow justify-between">
            <div className="flex flex-col gap-[10px]">
                {documentAdd &&
                    <div className="rounded-[23px] flex flex-col gap-[6px] p-[13px] bg-[#ECEEF1]">
                        <div className="flex items-center justify-between pb-[4px]">
                            <span className="font-medium text-[14px]">
                                Новый документ
                            </span>
                            <button onClick={() => setDocumentAdd(false)}>
                                <TrashImg />
                            </button>
                        </div>
                        <InputSelect data={categoryDocuments} change={(id: number) => {
                            dispatch(setCategoryDocument(id))
                        }} center={true} default="Категория документа" />
                        <InputSelect data={documentsAdds} change={(id: number) => {
                            dispatch(setDocument(id))
                        }} center={true} default="Документ" />
                    </div>
                }
                {/* <div className="flex flex-col gap-[6px] rounded-[23px] p-[13px] bg-[#ECEEF1]">
                    <div className="flex items-center justify-between rounded-[13px] py-[8px] px-[10px] bg-[#FAFAFA]">
                        <span className=" text-[12px] font-medium text-[#9B9FAD] whitespace-nowrap">Паспорт РФ</span>
                        <input value={'5017 574839'} type="text" className="w-full bg-[transparent] text-[12px] font-medium text-right" />
                    </div>
                </div> */}
                {documents?.map(item => (
                    <div className="rounded-[23px] flex flex-col gap-[6px] p-[13px] bg-[#ECEEF1]">
                        <div className="flex items-center justify-between pb-[4px]">
                            <span className="font-medium text-[14px]">
                                {getNameDocument(item.DocumentType)}
                            </span>
                            <button>
                                <TrashImg />
                            </button>
                        </div>
                        {item.Number && <div className="flex items-center justify-between rounded-[13px] py-[8px] px-[10px] bg-[#FAFAFA]">
                            <span className=" text-[12px] font-medium text-[#9B9FAD] whitespace-nowrap">Серия и номер</span>
                            <input
                                onInput={(e) => {
                                    dispatch(changeStaffersDocuments({ id: selectId, field: 'Number', value: e.currentTarget.value }))
                                }}
                                value={item.Number} type="text" className="w-full bg-[transparent] text-[12px] font-medium text-right" />
                        </div>}
                        {item.ValidityDeadline && <div className="flex items-center justify-between rounded-[13px] py-[8px] px-[10px] bg-[#FAFAFA]">
                            <span className=" text-[12px] font-medium text-[#9B9FAD] whitespace-nowrap">Срок действия</span>
                            <InputDate value={new Date(item.ValidityDeadline)} ClassCalendar="!w-[260px] translate-x-[23px]" change={(date: Date) => {
                                const data = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
                                dispatch(changeStaffersDocuments({ id: selectId, field: 'DateOfIssue', value: data }))
                            }} />
                        </div>}

                        {item.DateOfIssue && <div className="flex items-center justify-between rounded-[13px] py-[8px] px-[10px] bg-[#FAFAFA]">
                            <span className=" text-[12px] font-medium text-[#9B9FAD] whitespace-nowrap">Срок действия</span>
                            <InputDate value={new Date(item.DateOfIssue)} ClassCalendar="!w-[260px] translate-x-[23px]" change={(date: Date) => {
                                const data = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
                                dispatch(changeStaffersDocuments({ id: selectId, field: 'DateOfIssue', value: data }))
                            }} />
                        </div>}
                        {item.Surname && <div className="flex items-center justify-between rounded-[13px] py-[8px] px-[10px] bg-[#FAFAFA]">
                            <span className=" text-[12px] font-medium text-[#9B9FAD] whitespace-nowrap">Фамилия (лат.)</span>
                            <input
                                onInput={(e) => {
                                    dispatch(changeStaffersDocuments({ id: selectId, field: 'Surname', value: e.currentTarget.value }))
                                }}
                                value={item.Surname} type="text" className="w-full bg-[transparent] text-[12px] font-medium text-right" />
                        </div>}
                        {item.Name && <div className="flex items-center justify-between rounded-[13px] py-[8px] px-[10px] bg-[#FAFAFA]">
                            <span className=" text-[12px] font-medium text-[#9B9FAD] whitespace-nowrap">Имя (лат.)</span>
                            <input
                                onInput={(e) => {
                                    dispatch(changeStaffersDocuments({ id: selectId, field: 'Name', value: e.currentTarget.value }))
                                }}
                                value={item.Name} type="text" className="w-full bg-[transparent] text-[12px] font-medium text-right" />
                        </div>}
                    </div>
                ))}



                <div className="rounded-[23px] flex flex-col gap-[6px] p-[13px] bg-[#ECEEF1]">
                    <span className="font-medium text-[14px]">
                        Российский документ <br /> по умолчанию
                    </span>
                    <InputSelect data={[]} change={(id: number) => {
                        dispatch(setDocument(id))
                    }} default="Документ не выбран" />
                </div>

                <div className="rounded-[23px] flex flex-col gap-[6px] p-[13px] bg-[#ECEEF1]">
                    <span className="font-medium text-[14px]">
                        Международный документ <br /> по умолчанию
                    </span>
                    <InputSelect data={[]} change={(id: number) => {
                        dispatch(setDocument(id))
                    }} default="Документ не выбран" />
                </div>
            </div>

            <div className="pt-[15px] border-0 border-t border-solid border-[#E5E7EA]">
                <button
                    onClick={() => { setDocumentAdd(true) }}
                    className="w-full flex justify-between items-center p-[13px] border border-solid border-[#E5E7EA] rounded-[23px]">
                    <span className="text-[12px] text-[#787B86]">Добавить документ</span>
                    <PlusImg />
                </button>
            </div>
        </div>
    );
};

export default FilterDocument;