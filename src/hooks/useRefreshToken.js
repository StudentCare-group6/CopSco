import axios from '../api/posts'
import useAuth from './useAuth'

const useRefreshToken = () => {
    const {setAuth} = useAuth();
     
    const refresh = async () =>{
        const response = await axios.get('auth/refresh',{
            withCredentials: true
        });
        setAuth(prev=>{
            console.log(JSON.stringify(prev));
            console.log(response.data.accessToken);
            console.log(response.data.userrole);
            console.log(response.data.username);
            return {
                ...prev,
                role: response.data.userrole,
                user: response.data.username,
                fname : response.data.fname,
                accessToken:response.data.accessToken}
        });
        return response.data.accessToken;
    }
    return refresh;
};

export default useRefreshToken;
