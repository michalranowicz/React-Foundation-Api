import React, { useContext } from 'react';
import bemCssModules from 'bem-css-modules'


import {default as ContentStyles} from './ContentStyles.module.scss';
import {Route,Redirect, Switch } from 'react-router-dom';

import Foundations from '../Foundations/Foundations'
import FoundationsList from '../FoundationList/FoundationList'
import { StoreContext } from '../../store/StoreProvider';


const style = bemCssModules(ContentStyles);

const Content = () =>{
  const {foundationCategory} = useContext(StoreContext);
  const foundationslist = foundationCategory
    .map(category =>( <Route key={category.id} exact path={`/${category.id}`} render={()=> <FoundationsList {...category}/>}/>
  ));



  return(
    <main className={style()}>
      <Switch>
        <Route exact path="/" render={()=><Foundations/>}/>
        {foundationslist}
        <Redirect to="/"></Redirect>
      </Switch>
    </main>
  );
};


export default Content;