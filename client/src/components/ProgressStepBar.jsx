import { View } from "react-native";
import PropTypes from "prop-types";
import { scale } from "../helpers/scale";
import { useGlobalStyle } from "../hooks/useGlobalStyle";
import { colors } from "../constants/color";

export const ProgressStepBar = ({ stepSize = 4, currentStepIndex = 0 }) => {
  const basicStyles = useGlobalStyle();

  const StepCircle = ({ isPending = false }) => (
    <View
      style={{
        backgroundColor: colors.gray,
        width: isPending ? scale(16) : scale(12),
        height: isPending ? scale(16) : scale(12),
        borderRadius: isPending ? scale(16) : scale(12),
      }}
    />
  );
  return (
    <View style={[basicStyles.CENTER_ROW, { gap: scale(8) }]}>
      {Array.from({ length: stepSize }).map((item, index) => (
        <StepCircle
          key={"progressstep" + index}
          isPending={index === currentStepIndex}
        />
      ))}
    </View>
  );
};

ProgressStepBar.propTypes = {
  stepSize: PropTypes.number,
  currentStepIndex: PropTypes.number,
};
