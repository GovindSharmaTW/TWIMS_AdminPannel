export const checkIsEmpty = (value: any) => {

    if (typeof (value) !== 'object' && typeof (value) !== 'boolean') {
        if (value == undefined || value == null || value.trim() == '') {
            return true;
        }
        else {
            return false;
        }
    }
    else
    {
        return false;
    }
}

export const getCurrentDate = () => {
    const currentDate = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

    return currentDate;
}

export const checkIsObjectEmpty = (object: {}) => {
    if (Object.keys(object).length > 0) {
        return false;
    }
    else {
        return true
    }
}