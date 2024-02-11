import { TouchableOpacity, Text } from "react-native";
import PropTypes from "prop-types";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "../../constants/color";
import { useGlobalStyle } from "../../hooks/useGlobalStyle";
import { scale, scaleVertical } from "../../helpers/scale";

export const PrimaryButton = ({ title, style, onPress }) => {
  const basicStyles = useGlobalStyle();

  return (
    <TouchableOpacity style={[{ width: "100%" }, style]} onPress={onPress}>
      <LinearGradient
        style={[
          basicStyles.CENTER_COL,
          {
            width: "100%",
            paddingHorizontal: scale(12),
            paddingVertical: scaleVertical(12),
            borderRadius: scale(16),
          },
        ]}
        colors={[colors.primary, colors.secondary]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        locations={[0.2, 1]}
      >
        <Text style={[basicStyles.FONT20, basicStyles.FONTWHITE]}>{title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

PrimaryButton.propTypes = {
  title: PropTypes.string.isRequired,
  style: PropTypes.object,
  onPress: PropTypes.func,
};
