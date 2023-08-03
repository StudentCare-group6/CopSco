import FirstPage from "./FirstPage";
import SecondPage from "./SecondPage";
import ThirdPage from "./ThirdPage";
import FourthPage from "./FourthPage";
import FifthPage from "./FifthPage";
import FinalPage from "./FinalPage";
import useFormContext from  '../../hooks/useFormContext';

export default function FormInputs() {
    const {page} = useFormContext();

    const display = {
        0: <FirstPage/>,
        1: <SecondPage/>,
        2: <ThirdPage/>,
        3: <FourthPage/>,
        4: <FifthPage/>,
        5: <FinalPage/>
    }

    return(
        <>
            {display[page]} 
        </>
    )
}