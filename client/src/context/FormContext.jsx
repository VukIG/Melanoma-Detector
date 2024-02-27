import ImageContext from './ImageContext';
import { createContext, useContext, useState } from 'react';

const FormContext = createContext();

export const FormProvider = ({ children }) => {

  const { setImage } = useContext(ImageContext);

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

  const sendData = () => {
    try {
      const formData = new FormData();
      formData.append('age', age);
      formData.append('gender', gender);
      formData.append('localization', locVal);

      formData.append('photo', { base64: setImage });
      
      console.log(formData);

      const res = axios.post(
        'http://192.168.1.172:8000/predict',
        {
          form: formData, //CRITICAL CHANGED IMAGE TO FORM
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      console.log(res);
    } catch (error) {
      console.error('Error uploading image:', error);
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
