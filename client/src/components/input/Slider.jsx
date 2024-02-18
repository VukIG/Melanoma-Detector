import { View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { useGlobalStyle } from '../../hooks/useGlobalStyle';
import { useState } from 'react';

const Slider = ({ items, setItems }) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);

  const basicStyles = useGlobalStyle();
  return (
    <View style={[basicStyles.CENTER_COL]}>
      <DropDownPicker
        style={[basicStyles.FONTBLACK, { backgroundColor: 'transparent' }]}
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        placeholder={'Choose the location of the mole'}
      />
    </View>
  );
};

export default Slider;
