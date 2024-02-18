import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { View, Text } from 'react-native';
const Checkbox = ({ gender, setGender }) => {
  return (
    <View>
      <Text style={{ fontSize: 18, marginBottom: 10 }}>
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
          iconImageStyle={{ borderColor: 'blue' }}
          textStyle={{ fontFamily: 'JosefinSans-Regular' }}
        />
        <BouncyCheckbox
          isChecked={gender.female}
          onPress={() => handleGenderChange('female')}
          text="Female"
          iconImageStyle={{ borderColor: 'pink' }}
          textStyle={{ fontFamily: 'JosefinSans-Regular' }}
        />
      </View>
    </View>
  );
};

export default Checkbox;
