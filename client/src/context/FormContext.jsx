import { createContext, useContext, useState } from 'react';
import ImageContext from './ImageContext';

const FormContext = createContext();

export const FormProvider = ({ children }) => {
  const [age, setAge] = useState();
  const [gender, setGender] = useState({ male: false, female: false });
  const [location, setLocation] = useState([
    { label: 'Abdomen ', value: 'abdomen' },
    { label: 'Back', value: 'back' },
    { label: 'Trunk', value: 'trunk' },
    { label: 'Upper extremity', value: 'upper extremity' },
    { label: 'Lower extremity', value: 'lower extremity' },
  ]);

  const { image } = useContext(ImageContext);

  const sendData = async () => {
    try {
      const formData = new FormData();
      formData.append({
        image: image,
        age: age,
        gender: gender,
        location: location,
      });
      fetch('https://mda-server-api.onrender.com/predict', {
        method: 'POST',
        body: formData,
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error('Network response was not ok');
          }
          return res.json();
        })
        .then((data) => console.log(data.message))
        .catch((error) => console.error('Error:', error));
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
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export default FormContext;
