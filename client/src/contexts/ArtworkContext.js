import { createContext,useState, useEffect } from 'react';

export const ArtworkContext = createContext(null);

function ArtContext ({children}){
  const [wishlist, setWhishlit] = useState([])

  
  return (
    <ArtworkContext.Provider value={{wishlist, setWhishlit}}>

      {children}
    </ArtworkContext.Provider>
  )
}