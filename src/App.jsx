import React from 'react';
import {HashRouter as Router} from 'react-router-dom' 




import Header from './components/Header/Header';
import StoreProvider from './store/StoreProvider';

// Components


const App = ()=>{

  return(
    <StoreProvider>
      <Header/>
      <Router>
        <div className={'content-wrapper'}></div>
      </Router>
    </StoreProvider>
    
  )
};

export default App;