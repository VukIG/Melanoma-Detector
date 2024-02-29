import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { useGlobalStyle } from '../../hooks/useGlobalStyle';
import { scaleVertical } from '../../helpers/scale';
import { colors } from '../../constants/color';
const Input = ({ placeholder, type, setState, value }) => {
  const basicStyles = useGlobalStyle();

  const handleTextChange = (text) => {
    const numericValue = text.replace(/[^0-9]/g, '');
    setState(numericValue);
  };

  return (
    <TouchableOpacity
      style={[
        basicStyles.CENTER_COL,
        {
          flexDirection: 'row',
          width: '100%',
          marginBottom: scaleVertical(10),
        },
      ]}
    >
      <View style={{ backgroundColor: basicStyles.primaryColor }} />
      <TextInput
        value={value}
        onChangeText={handleTextChange}
        keyboardType={type}
        placeholder={placeholder}
        style={[
          basicStyles.FONTPRIMARY,
          {
            width: '100%',
            borderWidth: 1,
            borderRadius: 5,
            padding: 10,
            borderColor: colors.primaryColor,
          },
        ]}
      />
    </TouchableOpacity>
  );
};

export default Input;
