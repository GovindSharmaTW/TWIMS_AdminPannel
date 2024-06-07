export const validateEmail = (email: string) => {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}

export const validatePhone = (phone: string) => {
    var regx = /^[6-9]\d{9}$/;
    return regx.test(phone);
}