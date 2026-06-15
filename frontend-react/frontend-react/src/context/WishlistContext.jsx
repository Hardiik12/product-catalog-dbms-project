import {

  createContext,

  useContext,

  useState,

} from "react";

export const WishlistContext = createContext();

export function WishlistProvider({

  children,
}) {

  const [wishlist,setWishlist] = useState([]);

  // ADD TO WISHLIST

  const addToWishlist = (product) => {

    setWishlist((prev)=>[

      ...prev,

      product,
    ]);
  };

  // REMOVE FROM WISHLIST

  const removeFromWishlist = (id) => {

    setWishlist(

      wishlist.filter((item)=>

        item.id !== id
      )
    );
  };

  return (

    <WishlistContext.Provider
      value={{

        wishlist,

        addToWishlist,

        removeFromWishlist,
      }}
    >

      {children}

    </WishlistContext.Provider>
  );
}

export function useWishlist() {

  return useContext(WishlistContext);
}