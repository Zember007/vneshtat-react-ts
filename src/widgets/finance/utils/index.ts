 interface banks {
    id: number;
    title: string;
    account_number: string;
    bank: string;
    city: string;
    bic: string;
    account_corporate: string;
    status: boolean;
}

export const banks: banks[] = [
    {
        id: 0,
        title: 'Сбербанк',
        account_number: '4400 2493 2871 7824 2873',
        bank: 'Волго-вятский банк ПАО Сбербанк',
        city: 'г. Нижний Новгород',
        bic: '034920843',
        account_corporate: '0309090084920843',
        status: true
    },
    {
        id: 1,
        title: 'Сбербанк',
        account_number: '4400 2493 2871 7824 2873',
        bank: 'Волго-вятский банк ПАО Сбербанк',
        city: 'г. Нижний Новгород',
        bic: '034920843',
        account_corporate: '0309090084920843',
        status: true
    },
]