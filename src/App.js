import React, { Component,Suspense } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './scss/style.scss';

const loading = (
  <div className="pt-3 text-center" style={{background: '#000000'}}>
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const TheLayout = React.lazy(() => import('./containers/TheLayout'));

// Pages
const Login = React.lazy(() => import('./views/Login'));

const App = () => {
  return(
    <BrowserRouter>
      <Suspense fallback={loading}>
        <Switch>
          <Route exact path="/login" name="Login Page" render={props => <Login {...props}/>} />
          <Route path="/" name="Home" render={props => <TheLayout {...props}/>} />
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
