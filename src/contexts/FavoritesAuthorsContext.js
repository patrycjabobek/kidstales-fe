import  {createContext, useState} from 'react';


export const FavoritesAuthorsContext = createContext({
    favoritesAuthors: [],

});

export const FavoritesAuthorsProvider = ({children}) => {
    const [favoritesAuthors, setFavoritesAuthors] = useState([]);
    const value = {favoritesAuthors, setFavoritesAuthors};


    return <FavoritesAuthorsContext.Provider value={value}>{children}</FavoritesAuthorsContext.Provider>
}