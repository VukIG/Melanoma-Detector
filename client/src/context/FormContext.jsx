import { createContext, useContext, useState } from 'react';
import ImageContext from './ImageContext';
import axios from 'axios';

const FormContext = createContext();

export const FormProvider = ({ children }) => {
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

  const { image } = useContext(ImageContext);

  const sendData = async () => {
    try {
      const formData = new FormData();
      formData.append('userInfo', image);
      // fetch('https://mda-server-api.onrender.com/predict', {
      fetch('http://192.168.1.172:8000/user-data', {
        method: 'POST',
        body: { data: formData },
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error('Network response was not ok');
          }
          return res.json();
        })
        // .then((data) => console.log('data: ', data))
        .catch((error) => console.error('Error:', error));
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const sendData1 = async () => {
    try {
      const formData = new FormData();
      formData.append('userInfo', { 
        base64: image,
        gender: gender,
        age: age,
        bodyLocation: locVal,
      });

      const res = await axios.post(
        'http://192.168.1.172:8000/user-data',
        {
          data: formData,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      // console.log('AHHAHAHHA', res.data.message);
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
        sendData1,
        locVal,
        setLocVal,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export default FormContext;
