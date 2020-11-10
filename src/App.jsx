import React from 'react';
import {HashRouter as Router} from 'react-router-dom' 

// components
import Header from './components/Header/Header';
import AsideMenu from './components/AsideMenu/AsideMenu'


import StoreProvider from './store/StoreProvider';

// Components


const App = ()=>{

  return(
    <StoreProvider>
      <Header/>
      <Router>
        <div className={'content-wrapper'}>
          <AsideMenu/>
        </div>
      </Router>
    </StoreProvider>
    
  )
};

export default App;