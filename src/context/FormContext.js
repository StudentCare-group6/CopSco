import {createContext, useState, useEffect} from "react" ;
import { useForm } from 'react-hook-form';
import api from '../api/posts';

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

    const onSubmit = async e => {

        if (page === 3) {
            // if (!getValues('nic')) {
            //     alert("Enter NIC number");
            // } else {
            //     if (getValues('verifyMode') === '1') {
            //         if (!getValues('nicFrontFile') || !getValues('nicRearFile')) {
            //             alert("Error: Check whether you've uploaded files ");
            //         } else {
            //             const frontFile = e.nicFrontFile[0]; // Assuming the file is stored in an array
            //             const backFile = e.nicRearFile[0]; // Assuming the file is stored in an array
            //             const userImageBlob = localStorage.getItem('takenPhoto');
            //             const nicNum = getValues('nic');

            //             const FrontName = getValues('nic') + '_front.png';
            //             const BackName = getValues('nic') + '_rear.png';
            //             const UserImageName = getValues('nic') + '_img.png';

            //             // Create a new File object with the preferred name
            //             const renamedFrontFile = new File([frontFile], FrontName, {
            //                 type: frontFile.type,
            //             });
            //             const renamedBackFile = new File([backFile], BackName, {
            //                 type: backFile.type,
            //             });
            //             const userImageFile = new File([userImageBlob], UserImageName, {
            //                 type: userImageBlob.type,
            //             });

            //             const formData = new FormData();
            //             formData.append('nic_front', renamedFrontFile);
            //             formData.append('nice_back', renamedBackFile);
            //             formData.append('user_img', userImageFile);
            //             formData.append('nic_num', nicNum);

            //             try{
            //                 const response = await api.post('/upload', formData);
            //                 console.log(response.data);
            //                 setPage(page + 1);
            //             }catch(err){
            //                 console.log(err.response.data);
            //                 console.log(err.response.status);
            //                 console.log(err.response.headers);
            //             }
            //             setPage(page + 1);
            //         }
            //     } else {
            //         setPage(page + 1);
            //     }
            // }
            setPage(page + 1);
        } else if (page === 5) {
            if (!getValues('otp')) {
                alert("Enter OTP");
            } else {
                const formData = new FormData();
                formData.append('otp', getValues('otp'));
                try{
                    const response = await api.post('auth/verify-otp', formData);
                    if(response.data.message === 'OTP verification successful'){
                        console.log(response.data);
                        setPage(page + 1);
                    }else{
                        alert("Error: " + response.data.message);
                    }
                    
                }catch(err){
                    alert("Error occurred");
                    console.log(err.response.data);
                    console.log(err.response.status);
                    console.log(err.response.headers);
                }
            }
        } else {
            setValue('username', getValues('nic'));
            const data = getValues();
            try{
                const response = await api.post('auth/register', data);
                if(response.data.message === 'User created and OTP sent successfully'){
                        const frontFile = e.nicFrontFile[0]; // Assuming the file is stored in an array
                        const backFile = e.nicRearFile[0]; // Assuming the file is stored in an array
                        const userImageBlob = localStorage.getItem('takenPhoto');
                        const nicNum = getValues('nic');

                        const FrontName = getValues('nic') + '_front.png';
                        const BackName = getValues('nic') + '_rear.png';
                        const UserImageName = getValues('nic') + '_img.png';

                        // Create a new File object with the preferred name
                        const renamedFrontFile = new File([frontFile], FrontName, {
                            type: frontFile.type,
                        });
                        const renamedBackFile = new File([backFile], BackName, {
                            type: backFile.type,
                        });
                        const userImageFile = new File([userImageBlob], UserImageName, {
                            type: userImageBlob.type,
                        });

                        const formData = new FormData();
                        formData.append('nic_front', renamedFrontFile);
                        formData.append('nice_back', renamedBackFile);
                        formData.append('user_img', userImageFile);
                        formData.append('nic_num', nicNum);

                        try{
                            const response = await api.post('/upload/verify-doc', formData);
                            console.log(response.data);
                            setPage(page + 1);
                        }catch(err){
                            console.log(err.response.data);
                            console.log(err.response.status);
                            console.log(err.response.headers);
                        }
                }else{
                    alert("Error: " + response.data.message);
                }
                setPage(page + 1);
            }catch(err){
                console.log(err.response.data);
                console.log(err.response.status);
                console.log(err.response.headers);
            }
            setPage(page + 1);
        }

    };

    return (
        <FormContext.Provider value={{title, subtitle, page, setPage, form, register, control, handleSubmit, onSubmit, errors, watch, getValues, setValue}}>
            {children}
        </FormContext.Provider>
    )
}

export default FormContext;