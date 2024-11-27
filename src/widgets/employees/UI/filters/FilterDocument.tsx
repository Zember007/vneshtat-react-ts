
import { useEffect, useState } from "react";
import PlusImg from '@/assets/icons/plus.svg?react'
import TrashImg from "@/assets/icons/trash.svg?react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/config/store";
import InputSelect from "@/widgets/jobs/UI/InputSelect";
import { changeStaffersDocuments, delDocument, setCategoryDocument, setDocument, setStaffersDocuments } from "../../model/index.store";
import InputDate from "@/widgets/jobs/UI/InputDate";
import { getNameDocument } from "../../utils";
import { getAccessToken } from "@/shared/utils";

const FilterDocument = ({ selectId, passenger }: { selectId: number | null, passenger?: boolean }) => {

    const dispatch = useDispatch()


    const [documentAdd, setDocumentAdd] = useState<boolean>(false)

    const categoryDocuments = useSelector((state: RootState) => state.employees.categoryDocuments);
    const categorySelect = categoryDocuments.find(item => item.isSelected);
    const documentsAdds = useSelector((state: RootState) => state.employees.documents).filter(item => item.category === categorySelect?.code);


    const documents = useSelector((state: RootState) => state.employees.StaffersDocuments).find(item => item.EmployeeId === selectId)?.Documents;

    const documents_rf = documents?.find(item => item.Type === 'documents_rf')
    const international_document  = documents?.find(item => item.Type === 'international_document')

    const AccessToken = getAccessToken()
    const EmployeeId = localStorage.getItem('EmployeeId')



    const getDocuments = async () => {
        const url = new URL(import.meta.env.VITE_API_URL + '/company/employees_profile/get_employees_profile_documents');
        url.searchParams.append('EmployeeId', EmployeeId || '');
        url.searchParams.append('EmployeesId', selectId?.toString() || '');
        try {
            const res = await fetch(url, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${AccessToken}`
                }
            });
            const data = await res.json();
            if (data.status === "error") {
                console.log("error", data);
            }

            if (data.status === "success" && data.data) {
                const information: any[] = data.data
                const documents: any[] = information[0].Documents
                documents.forEach(el => {
                    el.content = getNameDocument(el.DocumentType)
                })
                dispatch(setStaffersDocuments(information))
                console.log(information)
            }
        } catch (error) {

            console.log(error);

        }

    }


    useEffect(() => {

        if (!documents) {
            getDocuments()
        }

    }, [selectId])

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
                            dispatch(setDocument({ id: id, user_id: selectId }))
                            setDocumentAdd(false)
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
                            <button
                                onClick={() => {
                                    if (item.New) {
                                        dispatch(delDocument({ id_document: item.id, id: selectId, passenger: false }))
                                    } else {

                                    }
                                }}>
                                <TrashImg />
                            </button>
                        </div>
                        {(item.DocumentType === 'residence_permit' || item.DocumentType === 'service_passport' || item.DocumentType === 'diplomatic_passport') && <div className="flex items-center justify-between rounded-[13px] py-[8px] px-[10px] bg-[#FAFAFA]">
                            <span className=" text-[12px] font-medium text-[#9B9FAD] whitespace-nowrap">Гражданство</span>
                            <input
                                disabled={selectId != EmployeeId}
                                onInput={(e) => {
                                    dispatch(changeStaffersDocuments({ id_document: item.id, passenger: passenger, id: selectId, field: 'Nationality', value: e.currentTarget.value }))
                                }}
                                value={item.Nationality} type="text" className="w-full bg-[transparent] text-[12px] font-medium text-right" />
                        </div>}
                        {item.DocumentType === 'foreign_passport' && <div className="flex items-center justify-between rounded-[13px] py-[8px] px-[10px] bg-[#FAFAFA]">
                            <span className=" text-[12px] font-medium text-[#9B9FAD] whitespace-nowrap">Вид документа</span>
                            <input
                                disabled={selectId != EmployeeId}
                                onInput={(e) => {
                                    dispatch(changeStaffersDocuments({ id_document: item.id, passenger: passenger, id: selectId, field: 'Species', value: e.currentTarget.value }))
                                }}
                                value={item.Species} type="text" className="w-full bg-[transparent] text-[12px] font-medium text-right" />
                        </div>}
                        {(item.DocumentType === 'passport_rf' || item.DocumentType === 'transpartncy_rf') && <div className="flex items-center justify-between rounded-[13px] py-[8px] px-[10px] bg-[#FAFAFA]">
                            <span className=" text-[12px] font-medium text-[#9B9FAD] whitespace-nowrap">Серия и номер</span>
                            <input
                                disabled={selectId != EmployeeId}
                                onInput={(e) => {
                                    dispatch(changeStaffersDocuments({ id_document: item.id, passenger: passenger, id: selectId, field: 'Number', value: e.currentTarget.value }))
                                }}
                                value={item.Number} type="text" className="w-full bg-[transparent] text-[12px] font-medium text-right" />
                        </div>}

                        {(item.DocumentType !== 'passport_rf' && item.DocumentType !== 'transpartncy_rf') && <div className="flex items-center justify-between rounded-[13px] py-[8px] px-[10px] bg-[#FAFAFA]">
                            <span className=" text-[12px] font-medium text-[#9B9FAD] whitespace-nowrap">Номер</span>
                            <input
                                disabled={selectId != EmployeeId}
                                onInput={(e) => {
                                    dispatch(changeStaffersDocuments({ id_document: item.id, passenger: passenger, id: selectId, field: 'Number', value: e.currentTarget.value }))
                                }}
                                value={item.Number} type="text" className="w-full bg-[transparent] text-[12px] font-medium text-right" />
                        </div>}
                        {(item.DocumentType === 'birth_certificate' || item.DocumentType === 'medical_birth_certificate') && <div className="flex items-center justify-between rounded-[13px] py-[8px] px-[10px] bg-[#FAFAFA]">
                            <span className=" text-[12px] font-medium text-[#9B9FAD] whitespace-nowrap">Дата выдачи</span>
                            <InputDate
                            disabled={selectId != EmployeeId}
                            value={item.ValidityDeadline ? new Date(item.ValidityDeadline) : null} ClassCalendar="!w-[260px] translate-x-[23px]" change={(date: Date) => {
                                const data = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
                                dispatch(changeStaffersDocuments({ id_document: item.id, passenger: passenger, id: selectId, field: 'ValidityDeadline', value: data }))
                            }} />
                        </div>}

                        {(item.DocumentType === 'transpartncy_rf' || item.DocumentType === 'foreign_passport' || item.DocumentType === 'seafarers_id_card' || item.DocumentType === 'servicemans_id_card') && <div className="flex items-center justify-between rounded-[13px] py-[8px] px-[10px] bg-[#FAFAFA]">
                            <span className=" text-[12px] font-medium text-[#9B9FAD] whitespace-nowrap">Срок действия</span>
                            <InputDate
                            disabled={selectId != EmployeeId}
                            value={item.DateOfIssue ? new Date(item.DateOfIssue) : null} ClassCalendar="!w-[260px] translate-x-[23px]" change={(date: Date) => {
                                const data = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
                                dispatch(changeStaffersDocuments({ id_document: item.id, passenger: passenger, id: selectId, field: 'DateOfIssue', value: data }))
                            }} />
                        </div>}
                        {(item.DocumentType === 'transpartncy_rf' || item.DocumentType === 'foreign_passport') && <div className="flex items-center justify-between rounded-[13px] py-[8px] px-[10px] bg-[#FAFAFA]">
                            <span className=" text-[12px] font-medium text-[#9B9FAD] whitespace-nowrap">Фамилия (лат.)</span>
                            <input
                                disabled={selectId != EmployeeId}
                                onInput={(e) => {
                                    dispatch(changeStaffersDocuments({ id_document: item.id, passenger: passenger, id: selectId, field: 'Surname', value: e.currentTarget.value }))
                                }}
                                value={item.Surname} type="text" className="w-full bg-[transparent] text-[12px] font-medium text-right" />
                        </div>}
                        {(item.DocumentType === 'transpartncy_rf' || item.DocumentType === 'foreign_passport') && <div className="flex items-center justify-between rounded-[13px] py-[8px] px-[10px] bg-[#FAFAFA]">
                            <span className=" text-[12px] font-medium text-[#9B9FAD] whitespace-nowrap">Имя (лат.)</span>
                            <input
                                disabled={selectId != EmployeeId}
                                onInput={(e) => {
                                    dispatch(changeStaffersDocuments({ id_document: item.id, passenger: passenger, id: selectId, field: 'Name', value: e.currentTarget.value }))
                                }}
                                value={item.Name} type="text" className="w-full bg-[transparent] text-[12px] font-medium text-right" />
                        </div>}

                        {(item.DocumentType === 'service_passport' || item.DocumentType === 'diplomatic_passport') && <div className="flex items-center justify-between rounded-[13px] py-[8px] px-[10px] bg-[#FAFAFA]">
                            <span className=" text-[12px] font-medium text-[#9B9FAD] whitespace-nowrap">Фамилия</span>
                            <input
                                disabled={selectId != EmployeeId}
                                onInput={(e) => {
                                    dispatch(changeStaffersDocuments({ id_document: item.id, passenger: passenger, id: selectId, field: 'Surname', value: e.currentTarget.value }))
                                }}
                                value={item.Surname} type="text" className="w-full bg-[transparent] text-[12px] font-medium text-right" />
                        </div>}
                        {(item.DocumentType === 'service_passport' || item.DocumentType === 'diplomatic_passport') && <div className="flex items-center justify-between rounded-[13px] py-[8px] px-[10px] bg-[#FAFAFA]">
                            <span className=" text-[12px] font-medium text-[#9B9FAD] whitespace-nowrap">Имя</span>
                            <input
                                disabled={selectId != EmployeeId}
                                onInput={(e) => {
                                    dispatch(changeStaffersDocuments({ id_document: item.id, passenger: passenger, id: selectId, field: 'Name', value: e.currentTarget.value }))
                                }}
                                value={item.Name} type="text" className="w-full bg-[transparent] text-[12px] font-medium text-right" />
                        </div>}
                        {(item.DocumentType === 'service_passport' || item.DocumentType === 'diplomatic_passport') && <div className="flex items-center justify-between rounded-[13px] py-[8px] px-[10px] bg-[#FAFAFA]">
                            <span className=" text-[12px] font-medium text-[#9B9FAD] whitespace-nowrap">Отчество</span>
                            <input
                                disabled={selectId != EmployeeId}
                                onInput={(e) => {
                                    dispatch(changeStaffersDocuments({ id_document: item.id, passenger: passenger, id: selectId, field: 'MiddleName', value: e.currentTarget.value }))
                                }}
                                value={item.MiddleName} type="text" className="w-full bg-[transparent] text-[12px] font-medium text-right" />
                        </div>}
                    </div>
                ))}



                <div className="rounded-[23px] flex flex-col gap-[6px] p-[13px] bg-[#ECEEF1]">
                    <span className="font-medium text-[14px]">
                        Российский документ <br /> по умолчанию
                    </span>
                    <InputSelect data={documents || []} activeId={documents_rf?.id} change={(id: number) => {
                        dispatch(changeStaffersDocuments({ id_document: documents_rf?.id, passenger: passenger, id: selectId, field: 'Type', value: '' }))
                        dispatch(changeStaffersDocuments({ id_document: id, passenger: passenger, id: selectId, field: 'Type', value: 'documents_rf' }))
                    }} default="Документ не выбран" />
                </div>

                <div className="rounded-[23px] flex flex-col gap-[6px] p-[13px] bg-[#ECEEF1]">
                    <span className="font-medium text-[14px]">
                        Международный документ <br /> по умолчанию
                    </span>
                    <InputSelect data={documents || []} activeId={international_document?.id} change={(id: number) => {
                        dispatch(changeStaffersDocuments({ id_document: international_document?.id, passenger: passenger, id: selectId, field: 'Type', value: '' }))
                        dispatch(changeStaffersDocuments({ id_document: id, passenger: passenger, id: selectId, field: 'Type', value: 'international_document' }))
                    }} default="Документ не выбран" />
                </div>
            </div>

            {
                (selectId == EmployeeId || passenger) &&
                <div className="pt-[15px] border-0 border-t border-solid border-[#E5E7EA]">
                    <button
                        onClick={() => { setDocumentAdd(true) }}
                        className="w-full flex justify-between items-center p-[13px] border border-solid border-[#E5E7EA] rounded-[23px]">
                        <span className="text-[12px] text-[#787B86]">Добавить документ</span>
                        <PlusImg />
                    </button>
                </div>
            }
        </div>
    );
};

export default FilterDocument;