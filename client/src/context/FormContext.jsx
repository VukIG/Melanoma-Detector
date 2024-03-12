import ImageContext from './ImageContext';
import axios from 'axios';
import * as FileSystem from 'expo-file-system';
import { createContext, useContext, useState } from 'react';

const FormContext = createContext();

export const FormProvider = ({ children }) => {
  const { image, imgUri, setImage } = useContext(ImageContext);

  const [age, setAge] = useState();
  const [gender, setGender] = useState({ male: false, female: false }); // not sure how to get the string of 'male' or 'female', so i would suggest to just get the value that is selected from this form
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
      const date = new Date();

      formData.append('age', age);
      formData.append('gender', 'male');
      formData.append('localization', locVal);
      formData.append('photo', {
        uri: imgUri,
        type: 'image/jpeg',
        name: 'userImg.jpg',
        // name: date.getTime().toString() + "_USER_IMAGE" + ".jpg" 
      });

      console.log(age);

      const res = await axios.post(
        'http://192.168.1.172:8000/predict',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      console.log(res.data);
    } catch (err) {
      console.log('Error sending data: ', err);
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
