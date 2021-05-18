import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import { TheContent, TheSidebar, TheFooter } from './index';
import useAPi from '../services/api';

const TheLayout = () => {
  const [loading, setLoading] = useState(true);

  const api = useAPi(); // instanciando a funcao que faz a requisicao na api
  const history = useHistory();//instancionado o router 

  useEffect(()=>{
    const checklogin = async () =>{ // checkando o login 
      if(api.getToken()){// se o token existir (diferente de vazio)
        const result = await api.validateToken();
        if(result.error === ''){ // se nao der erro seta o loading
          setLoading(false);
        }else{// se der erro manda ele para a pagina de login 
          alert(result.error);
          history.push('/login');
        }
      }else{// se for vazio, manda ele para o login 
          history.push('/login');
      }
    }
    checklogin();
  }, []);
  return (
    <div className="c-app c-default-layout">
      {!loading && // só vai mostrar a pagina inicial se o usuario tiver feito o login
        <>
          <TheSidebar/>
            <div className="c-wrapper">
                <div className="c-body">
                  <TheContent/>
                </div>
              <TheFooter/>
            </div>
        </>
      }
    </div>
  )
}

export default TheLayout
