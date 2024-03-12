import ImageContext from './ImageContext';
import axios from 'axios';
import { createContext, useContext, useState } from 'react';

const FormContext = createContext();

export const FormProvider = ({ children }) => {

  const { image, setImage } = useContext(ImageContext);

  const [age, setAge] = useState();
  const [gender, setGender] = useState({ male: false, female: false });
  const [locVal, setLocVal] = useState(null);
  const [location, setLocation] = useState([
    { label: 'Abdomen ', value: 'abdomen' },
    { label: 'Back', value: 'back' },
    { label: 'Trunk', value: 'trunk' },
    { label: 'Upper extremity', value: 'upper extremity' },
    { label: 'Lower extremity', value: 'lower extremity' },
  ]);

  const sendData = async () => {
    try {
      const formData = new FormData();
      formData.append('image', { 
        base64: image,
        gender: gender,
        age: age,
        bodyLocation: locVal,
      });

      const res = await axios.post(
        'http://192.168.1.172:8000/predict',
        {
          data: formData,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <FormContext.Provider
      value={{
        age,
        setAge,
        gender,
        setGender,
        location,
        setLocation,
        sendData,
        locVal,
        setLocVal,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export default FormContext;
