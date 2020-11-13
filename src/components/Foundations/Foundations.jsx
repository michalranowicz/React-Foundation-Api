import React, { useContext } from 'react';
import bemCssModule from 'bem-css-modules';

// components
import Foundation from '../Foundation/Foundation'

import {default as FoundationsStyles} from '../Content/ContentStyles.module.scss';
import { StoreContext } from '../../store/StoreProvider';

const style = bemCssModule(FoundationsStyles);

const Foundations = () => {

  const {foundations}= useContext(StoreContext);

  const foundationsAllList = foundations.map(foundation => <Foundation key={foundation.id} {...foundation}/>);

  return(
    <section>
      <h2 className={style('content-header-container')}>Wszystkie fundacje</h2>
      <ul className={style('list')}>
        {foundationsAllList}
      </ul>
    </section>
  )
};

export default Foundations;