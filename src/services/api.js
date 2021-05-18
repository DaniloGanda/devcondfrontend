const baseUrl = 'https://api.b7web.com.br/devcond/api/admin';
const request = async (method, endpoint, params, token = null) =>{// criando a requisição para a API 
    method = method.toLowerCase();
    let fullUrl = `${baseUrl}${endpoint}`;
    let body = null;
    switch(method){// fazendo a verificação no metodo
        case 'get':
            let queryString = new URLSearchParams(params).toString();
            fullUrl +=`?${queryString}`; // concatenando a url com a requisição via get
        break;
        case 'post':
        case 'put':
        case 'delete':
            body = JSON.stringify(params);// converte valores em javascript para uma String  JSON
        break;
    }
    let headers = {'Content-Type': 'application/json'}
    if(token){ // se existir um token no parametro
        headers.Authorization = `Bearer ${token}`;
    }
    let req = await fetch(fullUrl, {method, headers, body});// fazendo a requisição da API
    let json = await req.json();// fazendo a requisição da API
    return json; // retornando o resultado
}
export default () =>{ 
    return{
        //Parte de login
        getToken: () =>{ //token no localStorage
            return localStorage.getItem('token');
        },
        validateToken: async () =>{// validando o token
            let token = localStorage.getItem('token');
            let json = await request('post', '/auth/validate', {}, token);
            return json;
        },
        login: async (email, password) =>{// autenticando o login 
            let json = await request('post', '/auth/login', {email, password});
            return json;
        },
        logout: async () =>{// logout
            let token = localStorage.getItem('token');
            let json = await request('post', '/auth/validate', {}, token);
            localStorage.removeItem('token');
            return json;
        },
        /// Parte da pagina de avisos

        getWall: async () => {// pegando a lista de avisos 
            let token = localStorage.getItem('token');
            let json = await request('get', '/walls', {}, token); 
            return json;
        },
        updateWall: async (id, data) =>{
            let token = localStorage.getItem('token');
            let json = await request('put', `/wall/${id}`, data, token); 
            return json;
        },

        addWall: async (data) =>{
            let token = localStorage.getItem('token');
            let json = await request('post', '/walls', data, token); 
            return json;
        },
        removeWall: async (id) =>{
            let token = localStorage.getItem('token');
            let json = await request('delete', `/wall/${id}`, {}, token); 
            return json;
        }
    }
}