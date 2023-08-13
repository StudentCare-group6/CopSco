import {createContext, useState, useEffect} from "react" ;

const userFinesContext = createContext({});

export const FineProvider = ({children}) => {

    const [spotFines, setSpotFines] = useState({}); 
    const [uploadData, setUploadData] = useState({});
    const [videoFines, setVideoFines] = useState({});


    return (
        <userFinesContext.Provider value={{ spotFines, setSpotFines, uploadData, setUploadData, videoFines, setVideoFines }}>
            {children}
        </userFinesContext.Provider>
    )
}

export default userFinesContext;
