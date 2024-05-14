export const checkIsEmpty = (value: any) => {
    if (value.trim() == '' || value == undefined || value == null) {
        return true;
    }
    else {

        return false;
    }

}