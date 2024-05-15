export const checkIsEmpty = (value: any) => {
    if (value.trim() == '' || value == undefined || value == null) {
        return true;
    }
    else {

        return false;
    }
}

export const getCurrentDate = () => {
    const currentDate = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

    return currentDate;
}