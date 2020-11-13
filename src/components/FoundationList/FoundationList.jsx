import React, { useContext, useState } from 'react';
import bemCssModule from 'bem-css-modules'

import {default as foundationStyles} from '../Content/ContentStyles.module.scss';
import { StoreContext } from '../../store/StoreProvider';

import Foundation from '../Foundation/Foundation'
import AddFoundationPopup from '../Foundation/subcomponent/AddFoundationPopup'

const style = bemCssModule(foundationStyles)


const FoundationList = (props) =>{
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {foundations} = useContext(StoreContext)
  const {foundationCategory }= useContext(StoreContext)

  const {id, name, description, foundationCategoryId}= props
  // console.log(id, foundationCategoryId )

  // console.log(props)
  const foundationsFilterList= foundations
      .filter(foundation => foundation.foundationCategoryId===id)
      .map(foundation => <Foundation key={foundation.id}{...foundation} foundationCategoryId={id}/>)


  const handleOnClick = ()=> setIsModalOpen(true);
 
  const handleOnClose=()=>setIsModalOpen(false);    


  return(
    <section>
      <div className={style('content-header-container')}>
        <h2>Fundacje kategorii: {name}</h2>
        <button onClick={handleOnClick} className={style('content-header-button')}>Dodaj nową fundację</button>
      </div>
      <AddFoundationPopup handleOnClose={handleOnClose} isModalOpen={isModalOpen} foundationCategoryId={id} isEditMode={false}/>
      <ul className={style('list')}>
        {foundationsFilterList}
      </ul>
    </section>
  )
};

export default FoundationList 