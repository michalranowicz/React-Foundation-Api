import React, {useContext, useEffect,  useState} from 'react';
import bemCssModules from 'bem-css-modules';

import Modal from '../../Modal/Modal';

import {default as AddCategoryPopupStyles} from './AddCategoryPopup.module.scss';
import { StoreContext } from '../../../store/StoreProvider';
import FoundationCategory from './FoundationCategory';
import request from '../../../helpers/request';

const style = bemCssModules(AddCategoryPopupStyles);

const validateForm = (checkName,nameCategory,categoryDescription, setValidateMessage) =>{

  if (Boolean(checkName) ){
    setValidateMessage('Podana kategoria fundacji istnieje');
     return 'Podana kategoria fundacji istnieje';
    
  }else if(nameCategory.length <= 3){
    setValidateMessage('nazwa za krótka! min 3 znaki');
     return 'nazwa za krótka! min 3 znaki';
    
    
  }else if(nameCategory.length> 128){
    setValidateMessage('nazwa za długa! max 128 znaków');
    return 'nazwa za długa! max 128 znaków'
  }else if(categoryDescription.length> 512 ){
    setValidateMessage('Opis kategorii za długi max 512 znaków')
    return 'Opis kategorii za długi max 512 znaków'
  }else if(categoryDescription.length< 1 ){
    setValidateMessage('Brak opisu kategorii')
    return 'Brak opisu kategorii';
  }
  return null
 
}


const AddCategoryPopup = ({
  handleOnClose,
  isModalOpen,
  isEditMode=true,
  id,
})=>{

  const [nameCategory, setNameCategory]= useState('');
  const [categoryDescription, setCategoryDescription] = useState('');
  const [validateMessage, setValidateMessage] = useState('')
  const {foundationCategory, setFoundationCategory} = useContext(StoreContext);
  const {updateStore, setUpdateStore}= useContext(StoreContext);
  
  const handleOnChangeNameCategory= (event)=> setNameCategory(event.target.value);

  const handleOnChangeCategoryDescription = (event)=> setCategoryDescription(event.target.value);
  
  const checkName = foundationCategory.find(el=>el.name ===nameCategory);
  const addCategory={
    name: nameCategory,
    description: categoryDescription
  };
  const editCategory ={
    id: id,
    name:nameCategory,
    description: categoryDescription
  };

  const resetStateOfInput = ()=>{
    setNameCategory('');
    setCategoryDescription('');
    setValidateMessage('');
    
  };

// obsługa submita
  const handleOnSubmit = async ( event) =>{
    event.preventDefault();
    // setValidateMessage('');
    const errorMsg = validateForm(checkName,nameCategory,categoryDescription,setValidateMessage)
    if(errorMsg){
      console.log(errorMsg);
      return;
    }
    if(isEditMode){
      console.log(editCategory)

      const {status} = await request.put('/FoundationCategory',editCategory);
        if(status === 200){
          setUpdateStore(true);
          console.log(editCategory)
        }
    }else {
      console.log(addCategory)

      const {status} = await request.post('/FoundationCategory', addCategory);
        if(status===201){
          setUpdateStore(true);
          console.log(addCategory)
        }
    }
   
  handleOnClose();

  };

  const handleOnCloseModal= (event)=>{
    event.preventDefault();
    handleOnClose();
  }


  useEffect(()=>{
    if(isModalOpen){
      resetStateOfInput();
    }
    
  }, [isModalOpen]);

  const correctLabel = isEditMode ? 'Edytuj kategorię fundacji' : 'Dodaj kategorię fundacji';

  const validationMessageComponent = validateMessage.length ? <p className={style('validate-message')}>{validateMessage}</p>: null

  return(
    <Modal handleOnClose={handleOnClose} isOpen={isModalOpen} shouldBeCloseOnOutsideClick={true} isEditMode={isEditMode}>
      {validationMessageComponent}
      <div className={style()}>{correctLabel}
        <form className={style('form')} method="submit" onSubmit={handleOnSubmit}>
          <div className={style('form-row')}>
            Nazwa kategorii fundacji:
            <label>
              <input onChange={handleOnChangeNameCategory}className={style('input')} type="text" value={nameCategory}/>
            </label>
          </div>
          <div className={style('form-row')}>
            Opis kategorii:
            <label>
              <input onChange={handleOnChangeCategoryDescription}className={style('input')} type="text" value={categoryDescription}/>
            </label>
          </div>
          <button type="submit">Zatwierdź</button>
          <button onClick={handleOnCloseModal} type="button">Anuluj</button>

        </form>
      </div>

    </Modal>
  )
}

export default AddCategoryPopup;