import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { useGlobalStyle } from '../../hooks/useGlobalStyle';
import { colors } from '../../constants/color';

const Checkbox = () => {
  const basicStyles = useGlobalStyle();

  const [gender, setGender] = useState({ male: false, female: false }); 

  return (
    <View>
      <Text style={[basicStyles.FONT16, { fontSize: 18, marginBottom: 10 }]}>
        Choose your gender:
      </Text>
      <View style={styles.row}>
        <BouncyCheckbox
          isChecked={gender.male}
          onPress={() => setGender({ male: true, female: false })}
          fillColor={colors.primary}
          unfillColor="#FFFFFF"
          iconStyle={{ borderColor: colors.primary }}
        />
        <TouchableOpacity>
          <Text style={[basicStyles.FONT16, { fontWeight: '400', color: 'black' }]}>
            Male
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <BouncyCheckbox
          isChecked={gender.female}
          onPress={() => setGender({ male: false, female: true })}
          fillColor={colors.primary}
          unfillColor="#FFFFFF"
          iconStyle={{ borderColor: colors.primary }}
        />
        <TouchableOpacity>
          <Text style={[basicStyles.FONT16, { fontWeight: '400', color: 'black' }]}>
            Female
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
});

export default Checkbox;


  // const handleGenderChange = (newGender) => {
  //   if (newGender === 'male') {
  //     setGender({ male: true, female: false });
  //   } else if (newGender === 'female') {
  //     setGender({ male: false, female: true });
  //   }
  // };