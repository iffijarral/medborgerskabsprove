import * as yup from 'yup';

export const changePasswordSchema = yup.object().shape({            
    oldPassword: yup.string().min(4).max(20).required("It is a required field"),
    newPassword: yup.string().min(4).max(20).required("It is a required field"),
    confirmPassword: yup.string().oneOf([yup.ref("newPassword"), null], "passwords don't match").required("It is a required field")

});