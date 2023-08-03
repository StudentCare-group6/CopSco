import {createContext, useState, useEffect} from "react" ;
import { useForm } from 'react-hook-form';

const FormContext = createContext({});

export const FormProvider = ({children}) => {
    const title = {
        0: "Sign up to CopSco",
        1: "Verify yourself",
        2: "OTP Verification",
        3: "OTP Verification",
        4: "Verification Docs",
        5: "Congratulations"
    }

    const subtitle = {
        0:"You're taking the first step towards safer roads !",
        1:"We require a photo of you for verification purposes only !",
        2:"We're sending you an OTP to verify your account",
        3:"We've sent you an OTP to your contact number",
        4:"You can upload these documents here itself or verify yourself manually from the nearest police station",
        5:"We'll verify your details and send a notification to your contact number"
        
    }

    const [page, setPage] = useState(0); //keep track of the page
    const [data,setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        photo: "",
        contact: "",
        nic: "",
        driverLicense: "",
        nicFileName: "",
        driverLicenseFileName: ""
    });

    // const handleChange = e =>{
    //     const type = e.target.type;
    //     const name = e.target.name;
    //     const value = type === "file" ? e.target.files[0] : e.target.value;
    //     setData(prevData => ({
    //         ...prevData,
    //         [name]: value
    //     }))
    // }

    const form = useForm({
        mode: "onTouched",
        reValidateMode: "onSubmit",
    });
    const { register, control, handleSubmit, formState, watch, getValues, setValue } = form;
    const { errors } = formState;

    const {nicFileName, driverLicenseFileName, ...requiredInputs} = data;
    const canSubmit = [...Object.values(requiredInputs)].every(Boolean) && page === Object.keys(title).length - 1; //only allow submit if all required fields are filled and on the last page


    return (
        <FormContext.Provider value={{title, subtitle, page, setPage, data, setData, form, register, control, handleSubmit, errors, canSubmit, watch, getValues, setValue}}>
            {children}
        </FormContext.Provider>
    )
}

export default FormContext;