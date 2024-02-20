import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { View, Text } from 'react-native';
import { useGlobalStyle } from '../../hooks/useGlobalStyle';
import { colors } from '../../constants/color';
const Checkbox = ({ gender, setGender }) => {
  const basicStyles = useGlobalStyle();

  const handleGenderChange = (newGender) => {
    // When a checkbox is selected, set the other to false
    setGender({ male: newGender === 'male', female: newGender === 'female' });
  };

  return (
    <View>
      <Text style={[basicStyles.FONT16, { fontSize: 18, marginBottom: 10 }]}>
        Choose your gender:
      </Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 20,
        }}
      >
        <BouncyCheckbox
          isChecked={gender.male}
          onPress={() => handleGenderChange('male')}
          text="Male"
          iconImageStyle={{ borderColor: colors.primary }}
          textStyle={[
            basicStyles.FONT16,
            { fontWeight: '400', color: 'black' },
          ]}
        />
        <BouncyCheckbox
          isChecked={gender.female}
          onPress={() => handleGenderChange('female')}
          text="Female"
          iconImageStyle={{ borderColor: colors.primary }}
          textStyle={[
            basicStyles.FONT16,
            { fontWeight: '400', color: 'black' },
          ]}
        />
      </View>
    </View>
  );
};

export default Checkbox;
