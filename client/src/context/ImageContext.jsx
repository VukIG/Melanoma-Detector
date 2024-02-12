import { createContext, useState } from "react";
import * as ImagePicker from 'expo-image-picker';

const ImageContext = createContext();

export const ImageProvider = ({ children }) => {
    const [image, setImage] = useState('');

    return(
        <ImageContext.Provider
            value={{

            
            }}
        >
            {children}
        </ImageContext.Provider>
    )
}