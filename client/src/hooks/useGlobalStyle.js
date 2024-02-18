import { StyleSheet } from 'react-native';
import { colors } from '../constants/color';
import { scale } from '../helpers/scale';

export const useGlobalStyle = () => {
  return StyleSheet.create({
    // layout
    CENTER_ROW: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    CENTER_COL: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    REVERSE_COL: {
      display: 'flex',
      flexDirection: 'column-reverse',
      justifyContent: 'center',
      alignItems: 'center',
    },
    REVERSE_ROW: {
      display: 'flex',
      flexDirection: 'row-reverse',
      justifyContent: 'center',
      alignItems: 'center',
    },
    CENTER_COL_BETWEEN: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    CENTER_ROW_BETWEEN: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    START_ROW_LAYOUT: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    START_COL_CENTER: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    BETWEEN_ROW_START: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
    },
    START_ROW_START: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
    },
    CENTER_COL_START: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'flex-start',
    },
    CENTER_COL_END: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    END_COL_END: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
    },
    CENTER_ROW_END: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    //font
    FONT32: {
      fontSize: scale(32),
      fontStyle: 'normal',
      fontFamily: 'Montserrat_400Regular',
    },
    FONT28: {
      fontSize: scale(28),
      fontStyle: 'normal',
      fontFamily: 'Montserrat_400Regular',
    },
    FONT16: {
      fontSize: scale(16),
      fontStyle: 'normal',
      fontFamily: 'Montserrat_400Regular',
    },
    FONT20: {
      fontSize: scale(20),
      fontStyle: 'normal',
      fontFamily: 'Montserrat_400Regular',
    },
    FONTPRIMARY: {
      color: colors.primary,
      fontFamily: 'Montserrat_400Regular',
    },
    FONTBLACK: {
      color: colors.black,
      fontFamily: 'Montserrat_400Regular',
    },
    FONTWHITE: {
      color: colors.white,
      fontFamily: 'Montserrat_400Regular',
    },
  });
};
