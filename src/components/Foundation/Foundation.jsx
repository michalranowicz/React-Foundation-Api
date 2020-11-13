import React, { useContext, useState } from 'react';
import bemCssModule from 'bem-css-modules';

// styles
import {default as FoundationStyles} from './FoundationStyles.module.scss';
import { StoreContext } from '../../store/StoreProvider';
import request from '../../helpers/request'
import AddFoundationPopup from './subcomponent/AddFoundationPopup'

const style = bemCssModule(FoundationStyles);


const Foundation = (props) =>{
  const {setUpdateStore}= useContext(StoreContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {foundationCategory} = useContext(StoreContext);
  const {id, name, shortDescription, foundationCategoryId}= props

  const handleDeleteFoundation = async (event) =>{
     console.log(event.target.value)

     const {status} = await request.delete(`/Foundation/${event.target.value}`)

     if(status === 200){
       console.log(status)
        setUpdateStore(true)
     }
  }
 
  const handleOnClick = ()=> setIsModalOpen(true);
 
  const handleOnClose=()=>setIsModalOpen(false);


  
  return(
    <li >
      <article className={style()}>
        <h3 className={style('title')}>{name}</h3>
        <p className={style('description-title')}>Opis fundacji:</p>
        <p className={style('description')}>{shortDescription}</p>
        <div className={style('card-button-container')}>
          <button onClick={handleDeleteFoundation} value={id}>Usuń</button>
          <button onClick={handleOnClick}>Edytuj</button>
        </div>
        <AddFoundationPopup handleOnClose={handleOnClose} isModalOpen={isModalOpen} {...props}/>
      </article>
    </li>
  )
};


export default Foundation;

