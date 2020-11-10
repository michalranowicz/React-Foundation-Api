import React from 'react';
import bemCssModules from 'bem-css-modules'

import FoundationCategory from './subcomponent/FoundationCategory'


import {default as AsideMenuStyles} from './AsideMenu.module.scss';


const style = bemCssModules(AsideMenuStyles)

const AsideMenu = () =>{
  return(
    <section className={style()}>
      <div className={style('nav-wrapper')}>
        <FoundationCategory/>
      </div>
    </section>
  )

};

export default AsideMenu;