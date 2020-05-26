import React from 'react';

import './App.css';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import HeaderComponent from './components/layouts/HeaderComponent';
import 'bootstrap/dist/css/bootstrap.min.css';
import RegisterUser from './components/forms/RegisterUser';
import LoginUser from './components/forms/LoginUser';
import HomeComponent from './components/layouts/HomeComponent';
import Dashboard from './components/Dashboard';
import { Provider } from "react-redux";
import LogoutUser from './components/layouts/LogoutUser';
import Protected from './components/utils/Protected';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store';
import UploadProductPage from './components/forms/UploadProductPage';

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <div className="App">
      <Router>
          <HeaderComponent></HeaderComponent>
          <Switch>
                  <Route exact path="/" component={HomeComponent}/>
                  <Route path="/login" component={LoginUser}/>
                  <Route path="/register" component={RegisterUser}/>
                  <Route path="/logout" component={LogoutUser}/>
                  <Protected path="/upload" component={UploadProductPage}/>
                  <Protected path="/dashboard" component={Dashboard}/>
          </Switch>
      </Router>
    </div>
      </PersistGate>
   
    </Provider>
  );
}

export default App;
