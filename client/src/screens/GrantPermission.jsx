import { View, Text } from "react-native";
import { BaseScreen } from "../components/common/BaseScreen";
import { useGlobalStyle } from "../hooks/useGlobalStyle";
import { PrimaryButton } from "../components/button/PrimaryButton";
import { SecondaryButton } from "../components/button/SecondaryButton";
import { ProgressStepBar } from "../components/ProgressStepBar";
import { scaleVertical } from "../helpers/scale";
import { AllowCamera } from "../constants/svg";


const GrantPermissionScreen = ({ navigation }) => {
  const basicStyles = useGlobalStyle();

  return (
    <BaseScreen>
      <View
        style={[
          basicStyles.CENTER_COL,
          { flex: 1, paddingVertical: scaleVertical(30) },
        ]}>
        <View style={{ width:'100%',height:'70%',transform: [{ translateX: 35},{ translateY: 100 }]}}>
          <AllowCamera width={"100%"} height={"60%"} />
        </View>
        <Text style={[
          basicStyles.FONTPRIMARY,
          {fontSize:40, textAlign: 'center', marginTop: -40}
        ]}>
          Allow your camera
        </Text>
        <View style={[
          basicStyles.CENTER_COL,
          { width: "70%", flex: 1, gap: 20 }
        ]}>
          <Text>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</Text>
          <PrimaryButton title={"Back"} onPress={() => navigation.goBack()} />
          <SecondaryButton title={"Back"} onPress={() => navigation.goBack()} />
        </View>
        <ProgressStepBar stepSize={4} currentStepIndex={1} />
      </View>
    </BaseScreen>
  );
};
export default GrantPermissionScreen;
