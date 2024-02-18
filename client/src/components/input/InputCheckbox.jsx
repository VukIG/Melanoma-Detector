import { View, Text, TouchableOpacity } from 'react-native';
import { useGlobalStyle } from '../../hooks/useGlobalStyle';
import { scaleVertical } from '../../helpers/scale';

const InputCheckbox = ({ name, label, text}) => {
  const basicStyles = useGlobalStyle();

  return (
    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', marginBottom: scaleVertical(10) }}>
      <View style={[basicStyles.CENTER_COL, { backgroundColor: basicStyles.primaryColor }]} />
      <Text style={basicStyles.FONT16}>jesam</Text>
    </TouchableOpacity>
  );
};

export default InputCheckbox;