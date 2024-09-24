



const Services = () => {

    
    return (
        <>

            <div className="search_block">
                <div className="search_block__inputs">
                </div>
                <div className="search_block__filters">

                    <input type="checkbox" id='input_type' className='input_type' />

                    <label htmlFor="input_type" className="type">

                        <span>Все</span>

                        <span>Активные</span>

                    </label>




                </div>
            </div>
            <div className="reports">
                <div className="reports__top">
                    <div className="reports__title">Счета</div>
                    <button className="reports__download">
                        <span>Скачать все</span>
                        
                    </button>
                </div>
                <div className="reports__box overflow-y-auto scroll">
                   
                </div>
            </div>

        </>
    );
};

export {Services};