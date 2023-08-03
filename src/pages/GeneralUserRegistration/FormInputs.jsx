import GeneralDetails from './GeneralDetails';
import UserCredentials from './UserCredentials';
import UserImage from './UserImage';
import ContactDetails from './ContactDetails';
import OtpVerification from './OtpVerification';
import VerificationDocs from './VerificationDocs';
import FinalPage from './FinalPage';
import useFormContext from  '../../hooks/useFormContext';

export default function FormInputs() {
    const {page} = useFormContext();

    const display = {
       0: <GeneralDetails />,
       1: <UserCredentials />,
       2: <UserImage />,
       3: <VerificationDocs/>,
       4: <ContactDetails />,
       5: <OtpVerification />,
       6: <FinalPage />
    }

    return(
        <>
            {display[page]} 
        </>
    )
}