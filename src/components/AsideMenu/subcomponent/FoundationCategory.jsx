import React, { useContext, useState } from 'react';
import bemCssModule from 'bem-css-modules'

import {Link} from 'react-router-dom'


import {default as AsideMenuStyle} from '../AsideMenu.module.scss'
import { StoreContext } from '../../../store/StoreProvider';
import FoundationCategoryItem from './FoundationCategoryItem';
import AddCategoryPopup from './AddCategoryPopup';

  const style = bemCssModule(AsideMenuStyle);
   
  const {foundationCategory} = useContext(StoreContext);



const FoundationCategory = ()=>{
  const [isModalOpen, setIsModalOpen] = useState(false);

  const foundationCategoryListItem = foundationCategory.map(category =>(<FoundationCategoryItem key={category.id} {...category}/>
 ))
 const handleOnClose = ()=> setIsModalOpen(false);

 const handleOnClick = ()=> setIsModalOpen(true);

// const hidePopup = (event)=>{
//   if(event){
//     event.preventDefault();
//   }
//   setIsPopupOpen(false);
// } ;

  return(
    <React.Fragment>
      <p className={style('title')}>Katalog fundacji</p>
      <nav>
          <ul className={style('list')}>
            <li className={style('link')}>
              <Link to="/">Wszystkie</Link>
            </li>
            {foundationCategoryListItem}
          </ul>
      </nav>
      <button onClick={handleOnClick}>Dodaj kategorię fundacji</button>
      <AddCategoryPopup handleOnClose={handleOnClose} isModalOpen={isModalOpen} isEditMode={false} />
    
  </React.Fragment>
  )
};

export default FoundationCategory;