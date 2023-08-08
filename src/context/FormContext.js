import {createContext, useState, useEffect} from "react" ;
import { useForm } from 'react-hook-form';


const FormContext = createContext({});

export const FormProvider = ({children}) => {
    const title = {
        0: "Sign up to CopSco",
        1: "Set up a password",
        2: "Verify yourself",
        3: "Verification Docs",
        4: "OTP Verification",
        5: "OTP Verification",
        6: "Congratulations"
    }

    const subtitle = {
        0:"You're taking the first step towards safer roads !",
        1:"Set up a strong password to protect your account",
        2:"We require a photo of you for verification purposes only !",
        3:"You can upload these documents here itself or verify yourself manually from the nearest police station",
        4:"We're sending you an OTP to verify your account",
        5:"We've sent you an OTP to your contact number",
        6:"We'll verify your details and send a notification to your contact number"
    }

    const [page, setPage] = useState(0); //keep track of the page
    const form = useForm({
        mode: "onTouched",
        reValidateMode: "onSubmit",
        defaultValues: {
            verifyMode: "0"
        }
    });
    const { register, control, handleSubmit, formState, watch, getValues, setValue } = form;
    const { errors } = formState;

    return (
        <FormContext.Provider value={{title, subtitle, page, setPage, form, register, control, handleSubmit,errors, watch, getValues, setValue}}>
            {children}
        </FormContext.Provider>
    )
}

export default FormContext;