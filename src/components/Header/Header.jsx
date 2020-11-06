import React from 'react';
import bemCssModule from 'bem-css-modules';

import {default as HeaderStyles} from './Header.module.scss';

const style = bemCssModule(HeaderStyles);

const Header = () =>{
  return(
    <header className={style()}>
      <div className={style('logo-wrapper')}>
      </div>
      <h1 className={style('title')}>Katalog fundacji z wykorzystaniem Swagger API</h1>
    </header>
  )
};

export default Header;