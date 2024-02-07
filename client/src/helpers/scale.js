import { Dimensions } from "react-native";

// Guideline sizes are based on standard screen mobile device
const guidelineBaseWidth = 428;
const guidelineBaseHeight = 926;

const realWidth = Dimensions.get("screen").width;
const realHeight = Dimensions.get("screen").height;

const innerScale =
  Dimensions.get("screen").scale / Dimensions.get("window").scale;
const baseRatio = guidelineBaseWidth / guidelineBaseHeight;
const realRatio = realWidth / realHeight;

const width = Dimensions.get("window").width * innerScale;
const height =
  (Dimensions.get("window").height * innerScale) /
  (realRatio > baseRatio ? realRatio / baseRatio : 1);

const scale = (size) => (width / guidelineBaseWidth) * size;
const scaleVertical = (size) => (height / guidelineBaseHeight) * size;
const scaleModerate = (size, factor = 0.5) =>
  size + (scale(size) - size) * factor;
const scaleImage = (width, height, targetHeight) => ({
  width: (targetHeight / height) * width,
  height: targetHeight,
});

export {
  baseRatio,
  width,
  height,
  scale,
  scaleVertical,
  scaleModerate,
  scaleImage,
};
