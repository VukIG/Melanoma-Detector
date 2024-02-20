import { View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { useGlobalStyle } from '../../hooks/useGlobalStyle';
import { useState, useContext } from 'react';
import FormContext from '../../context/FormContext';

const Slider = ({ items, setItems }) => {
  const [open, setOpen] = useState(false);
  const { locVal, setLocVal } = useContext(FormContext);

  const basicStyles = useGlobalStyle();
  return (
    <View style={[basicStyles.CENTER_COL]}>
      <DropDownPicker
        style={[basicStyles.FONTBLACK, { backgroundColor: 'transparent' }]}
        open={open}
        value={locVal}
        items={items}
        setOpen={setOpen}
        setValue={setLocVal}
        setItems={setItems}
        placeholder={'Choose the location of the mole'}
      />
    </View>
  );
};

export default Slider;
