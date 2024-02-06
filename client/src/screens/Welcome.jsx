import { View, Text } from "react-native";
import { BaseScreen } from "../components/common/BaseScreen";
import { WelcomeSvg } from "../constants/svg";
import { useGlobalStyle } from "../hooks/useGlobalStyle";
import { scale, scaleVertical } from "../helpers/scale";
import { PrimaryButton } from "../components/button/PrimaryButton";
import { ProgressStepBar } from "../components/ProgressStepBar";

const WelcomeScreen = ({ navigation }) => {
  const basicStyles = useGlobalStyle();

  return (
    <BaseScreen>
      <View style={{ flex: 1, paddingVertical: scaleVertical(30) }}>
        <WelcomeSvg width={"100%"} height={"60%"} />
        <View
          style={[
            basicStyles.CENTER_COL_BETWEEN,
            { flex: 1, paddingHorizontal: scale(30) },
          ]}>
          <View
            style={[
              basicStyles.CENTER_COL,
              {
                flex: 1,
                width: "100%",
                gap: scaleVertical(8),
              },
            ]}>
            <Text style={[basicStyles.FONT32, basicStyles.FONTPRIMARY]}>
              Welcome to CDA
            </Text>
            <Text
              style={[
                basicStyles.FONTBLACK,
                {
                  lineHeight: scale(20),
                  paddingHorizontal: scale(32),
                  textAlign: "center",
                },
              ]}>
              {
                "Lorem ipsum dolor sit amet,\nconsectetur adipiscing elit,\nsed do eiusmod tempor"
              }
            </Text>
            <PrimaryButton
              title={"Get Started"}
              style={{
                marginTop: scaleVertical(30),
                paddingHorizontal: scale(48),
              }}
              onPress={() => navigation.navigate("GrantPermission")}
            />
          </View>
        </View>
        <ProgressStepBar stepSize={4} currentStepIndex={0} />
      </View>
    </BaseScreen>
  );
};
export default WelcomeScreen;
