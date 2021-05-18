import {useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import useAPi from '../services/api';

export default () =>{
    const api = useAPi();
    const history = useHistory();
    useEffect(()=>{
        const doLogout = async () =>{
            await api.logout();
            history.push('/login');
        }   
        doLogout();
    },[])
    return null;
}