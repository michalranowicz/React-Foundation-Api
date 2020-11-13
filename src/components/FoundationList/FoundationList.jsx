import React, { useContext, useState } from 'react';
import bemCssModule from 'bem-css-modules'

import {default as foundationStyles} from './FoundationStyles.module.scss';
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
      <h2>kundacje kategorii: {name}</h2>
      <button onClick={handleOnClick}>Dodaj nową fundację</button>
      <AddFoundationPopup handleOnClose={handleOnClose} isModalOpen={isModalOpen} foundationCategoryId={id} isEditMode={false}/>
      <ul>
        {foundationsFilterList}
      </ul>
    </section>
  )
};

export default FoundationList 