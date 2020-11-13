import React, { createContext, useEffect, useState } from 'react';
import FoundationCategory from '../components/AsideMenu/subcomponent/FoundationCategory';

import request from '../helpers/request'

export const StoreContext = createContext(null);

const StoreProvider = ({children})=>{
  const [foundations, setFoundations]= useState([]);
  const [foundationCategory, setFoundationCategory] = useState([]);
  const [updateStore, setUpdateStore]= useState(false);

  const  fetchDataFoundation = async () => {

    const { data } = await request.get('/Foundation');

    setFoundations(data);
    
  };

  const fetchDataFoundationCategory = async () => {
    const {data} = await request.get('/FoundationCategory');

    setFoundationCategory(data)
  }

  useEffect(()=>{
    fetchDataFoundation();
    fetchDataFoundationCategory();

 
  }, [])
  useEffect(()=>{
    fetchDataFoundation();
    fetchDataFoundationCategory();
    setUpdateStore(false);
  },[updateStore])


  return(
    <StoreContext.Provider value={{
      foundations,
      setFoundations,
      foundationCategory,
      setFoundationCategory,
      updateStore,
      setUpdateStore,
      
    }}>
      {children}
    </StoreContext.Provider>
  );
}

export default StoreProvider