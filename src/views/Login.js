import React, {useState} from 'react';
import {
  CAlert,
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import useApi from 'src/services/api';
import {useHistory} from 'react-router-dom';

const Login = () => {
  const api = useApi();
  const history = useHistory();
  const [email, setEmail] = useState(''); // salvando o email digitado (como se fosse o session no php)
  const [senha, setSenha] = useState(''); // salvando a senha digitada (como se fosse o session no php)
  const [error, setError] = useState(''); // salvando o erro  (como se fosse o session no php)
  const [loading, setLoading] = useState(false);
  const handleLoginButton = async () =>{ // funcao envia a requisicao para api
    if(email && senha){// se o email e senha estiverem preenchido 
      setLoading(true);
      const result = await api.login(email, senha); // faz a requisicao
      setLoading(false);
      if(result.error === ''){ // se for diferente de vazio, salva no localstorage
        localStorage.setItem('token', result.token);
        history.push('/');
      }else{
        setError(result.error);
      }
    }else{ // se nao estiver preenchido, manda alerta danger
      setError("Digite os dados");
    }
  }
  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="5">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Login</h1>
                    <p className="text-muted">Digite seus dados de acesso</p>

                    {error !== '' && // se houver um erro, mostra este alerta
                      <CAlert color="danger">{error}</CAlert>
                    }
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="text" placeholder="E-mail" disabled={loading} value={email} onChange={e=>setEmail(e.target.value)}/>
                    </CInputGroup>

                    <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="password" placeholder="Senha" disabled={loading} value={senha} onChange={e=>setSenha(e.target.value)} />
                    </CInputGroup>

                    <CRow>
                      <CCol xs="6">
                        <CButton 
                          color="primary" 
                          className="px-4" 
                          onClick={handleLoginButton} 
                          disabled={loading}>
                          {loading ? 'Carregando...' : 'Entrar'}
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
