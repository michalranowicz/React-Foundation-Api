import React, { createContext, useEffect, useState } from 'react';

import request from '../helpers/request'

export const StoreContext = createContext(null);

const StoreProvider = ({children})=>{
  const [foundations, setFoundations]= useState([]);

 

  const  fetchDataFoundation = async () => {

    const { data } = await request.get('/Foundation');

    setFoundations(data);
    
  };



  useEffect(()=>{
    fetchDataFoundation();
 
  }, [])

  return(
    <StoreContext.Provider value={{
      foundations,
      setFoundations,
    }}>
      {children}
    </StoreContext.Provider>
  );
}

export default StoreProvider