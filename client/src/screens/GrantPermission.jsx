import { View, Text } from "react-native";
import { BaseScreen } from "../components/common/BaseScreen";
import { useGlobalStyle } from "../hooks/useGlobalStyle";
import { PrimaryButton } from "../components/button/PrimaryButton";
import { ProgressStepBar } from "../components/ProgressStepBar";
import { scaleVertical } from "../helpers/scale";

const GrantPermissionScreen = ({ navigation }) => {
  const basicStyles = useGlobalStyle();

  return (
    <BaseScreen>
      <View
        style={[
          basicStyles.CENTER_COL,
          { flex: 1, paddingVertical: scaleVertical(30) },
        ]}>
        <View style={[basicStyles.CENTER_COL, { width: "100%", flex: 1 }]}>
          <Text>Grant Permission screen</Text>
          <PrimaryButton title={"Back"} onPress={() => navigation.goBack()} />
        </View>
        <ProgressStepBar stepSize={4} currentStepIndex={1} />
      </View>
    </BaseScreen>
  );
};
export default GrantPermissionScreen;
