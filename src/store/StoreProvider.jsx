import React, { createContext, useEffect, useState } from 'react';

import request from '../helpers/request'

export const StoreContext = createContext(null);

const StoreProvider = ({children})=>{
  const [foundations, setFoundations]= useState([]);
  const [user, setUser]= useState(null);

 

  const  fetchData = async () => {

    const { data } = await request.get('/Foundation');

    setFoundation(data);
    
  };

  useEffect(()=>{
    fetchData();
  }, [])

  return(
    <StoreContext.Provider value={{
      foundations,
      setFoundations,
      user,
      setUser
    }}>
      {children}
    </StoreContext.Provider>
  );
}

export default StoreProvider