import React, {useContext, useState, useEffect} from 'react';
import bemCssModule from 'bem-css-modules';


// components
import Modal from '../../Modal/Modal'


import{default as AddFoundationPopupStyles} from './AddFoundationPopup.module.scss';
import { StoreContext } from '../../../store/StoreProvider';
import request from '../../../helpers/request'

const style = bemCssModule(AddFoundationPopupStyles);

const validateForm = (checkName, nameFoundation, shortDescription, isGlobal, setValidateMessage)=>{
  if (Boolean(checkName) ){
    setValidateMessage('Podana nazwa fundacji istnieje');
     return 'Podana nazwa fundacji istnieje';
  }else if(nameFoundation.length<=3){
    setValidateMessage('nazwa za krótka! min 3 znaki');
     return 'nazwa za krótka! min 3 znaki';
  }else if(nameFoundation.length> 128){
    setValidateMessage('nazwa za długa! max 128 znaków');
    return 'nazwa za długa! max 128 znaków';
  }else if(shortDescription.length> 512 ){
    setValidateMessage('Opis kategorii za długi max 512 znaków');
    return 'Opis kategorii za długi max 512 znaków';
  }else if(shortDescription.length< 1 ){
    setValidateMessage('Brak opisu kategorii');
    return 'Brak opisu kategorii';
  }else if(isGlobal === "off"){
    setValidateMessage('Brak zatwierdzenia');
    return 'Brak zatwierdzenia'
  }
  
  return null
}

const AddFoundationPopup = ({
  handleOnClose,
  isModalOpen,
  isEditMode=true,
  id,
  foundationCategoryId,
}) =>{

  const [nameFoundation, setNameFoundation]= useState('');
  const [shortDescription, setShortDescription]= useState('');
  const [htmlDescription, setHtmlDescription] = useState('');
  const [isGlobal, setIsGlobal]= useState(false);
  const [validateMessage, setValidateMessage] = useState('')

  const {foundations}= useContext(StoreContext);
  const {setUpdateStore} = useContext(StoreContext);

  const handleOnChangeNameFoundation = (event) =>setNameFoundation(event.target.value)
  const handleOnChangeShortDescription = (event) =>setShortDescription(event.target.value)
  const handleOnChangeHtmlDescription = (event) =>setHtmlDescription(event.target.value)
  const handleOnChangeIsGlobal = (event) =>setIsGlobal(true);

  const checkName = foundations.find(el => el.name === nameFoundation);

  const editFoundation= {
    id:id,
    name: nameFoundation,
    shortDescription: shortDescription,
    htmlDescription: htmlDescription,
    foundationCategoryId: foundationCategoryId,
    isGlobal: isGlobal
  };
  const addFoundation= {
    name: nameFoundation,
    shortDescription: shortDescription,
    htmlDescription: htmlDescription,
    foundationCategoryId: foundationCategoryId,
    isGlobal: isGlobal
  };

  const resetStateOfInput = ()=>{
    setNameFoundation('');
    setShortDescription('');
    setHtmlDescription('');
    setIsGlobal(false);
    setValidateMessage('');
    
  };


// OBSŁUGA SUBMITA
  const handleOnSubmit =async (event)=>{
    event.preventDefault();

    const errorMsg = validateForm(checkName, nameFoundation, shortDescription, isGlobal,setValidateMessage)
    if(errorMsg){
      console.log(errorMsg);
      return;
    }
    if(isEditMode){
      console.log(isEditMode)
      console.log("EDYCJA", editFoundation);
      const {status} = await request.put('/Foundation', editFoundation);
      console.log(status)

      if(status === 200){
        setUpdateStore(true)
      }
    }else{
      console.log("ADD",addFoundation);
      const {status} = await request.post('Foundation', addFoundation);
      console.log(status)
      if (status===201){
        setUpdateStore(true);
      }
    }
    handleOnClose()
  }



  const handleOnCloseModal= (event)=>{
    event.preventDefault();
    handleOnClose();
    resetStateOfInput();
  }
  useEffect(()=>{
    if(isModalOpen){
      resetStateOfInput();
      // setIsGlobal(false)
    }
    
  }, [isModalOpen]);
  const correctLabel = isEditMode ? 'Edytuj fundację' : 'Dodaj fundację';

  const validationMessageComponent = validateMessage.length ? <p className={style('validate-message')}>{validateMessage}</p>: null

  
  return(
    <Modal handleOnClose={handleOnClose} isOpen={isModalOpen} shouldBeCloseOnOutsideClick={true} isEditMode={isEditMode}>
      {validationMessageComponent}
      <div className={style()}>
        {correctLabel}
        <form className={style('form')} method="submit" onSubmit={handleOnSubmit}>
          <div className={style('form-row')}>
            <label>
              Nazwa fundacji:     
              <input onChange={handleOnChangeNameFoundation} className={style('input')} type="text" value={nameFoundation}/>
            </label>
          </div>
          <div className={style('form-row')}>
            <label>
              Krótki opis :
              <input onChange={handleOnChangeShortDescription} className={style('input')} type="text" value={shortDescription}/>
            </label>
          </div>
          <div className={style('form-row')}>
            <label>
              Słowa kluczowe :
              <input onChange={handleOnChangeHtmlDescription} className={style('input')} type="text" value={htmlDescription}/>
            </label>
          </div>
          <div className={style('form-row')}>
            <label>
              Potwierdź :
              <input onChange={handleOnChangeIsGlobal} className={style('input-checkbox')} type="checkbox" value={isGlobal}/>
            </label>
          </div>
          <button type="submit">Zatwierdź</button>
          <button onClick={handleOnCloseModal} type="button">Anuluj</button>
        </form>
      </div>
    </Modal>
  )
};

export default AddFoundationPopup