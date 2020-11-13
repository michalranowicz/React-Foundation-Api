import React, { useContext, useEffect, useState } from 'react';
import bemCssModule from 'bem-css-modules';

import {Link} from 'react-router-dom'


import {default as AsideMenuStyle} from '../AsideMenu.module.scss'
import  { StoreContext } from '../../../store/StoreProvider';
import request from '../../../helpers/request';
import AddCategoryPopup from './AddCategoryPopup';
const style = bemCssModule(AsideMenuStyle);


const FoundationCategoryItem = (props) =>{
  // const[isPopupOpen, setIsPopupOpen]= useState(false)

  const {setFoundationCategory} = useContext(StoreContext);
  const {setUpdateStore}= useContext(StoreContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
//  const [isEditMode, setIsEditMode] = useState(false)

  const {id, name}=props


const handleDeleteCategory= async (event)=>{
  console.log(event.target.value);

  const {status} = await request.delete(`/FoundationCategory/${event.target.value}`);
  if(status===200){
    setUpdateStore(true);
  }
}
const handleOnClick = ()=> setIsModalOpen(true);
 
const handleOnClose=()=>setIsModalOpen(false);


// useEffect(()=>{
//   handleNavidate()
// },[handleNavidate()])
// const handleOnClose = (event)=>{
//   if(event){
//     event.preventDefault();
//   }
//   setIsPopupOpen(false)
// }

  return(
    <div>
      <li className={style('link')} ><Link to={`/${id}`}>{name}</Link></li>
      <button onClick={handleDeleteCategory}className={style('link')}value={id}>Usuń</button>
      <button onClick={handleOnClick}className={style('link')}>Edytuj</button>
      <AddCategoryPopup handleOnClose={handleOnClose} isModalOpen={isModalOpen} id={id} />
 

    </div>

  )
}
export default FoundationCategoryItem;