import {useNavigate} from 'react-router-dom';

export default function Unauthorized() {
    const navigate = useNavigate();
    const handleBack = () => {
        navigate(-1);
    };
    return (
        <div>
        <h1>Unauthorized</h1>
        <button onClick={handleBack}>Back</button>
        </div>
    );
    }
//