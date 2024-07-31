import {BottomSheetTextInput} from '@gorhom/bottom-sheet';
import {FC} from 'react';
import {
  Text,
  View,
  TextInputProps,
  StyleSheet,
  StyleProp,
  TextStyle,
} from 'react-native';

interface labelInputProps extends TextInputProps {
  label: string;
  style?: StyleProp<TextStyle>;
}

const LabelInput: FC<labelInputProps> = ({label, style, ...props}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <BottomSheetTextInput
        placeholderTextColor="#e0e0e0"
        style={[styles.input, style]}
        {...props}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  label: {
    fontFamily: 'Jakarta-Bold',
    fontSize: 20,
    color: 'black',
    marginStart: 8,
  },
  input: {
    borderWidth: 2,
    borderRadius: 15,
    borderColor: 'rgba(151, 151, 151, 0.25)',
    backgroundColor: '#f5f5f5',
    fontSize: 18,
    fontFamily: 'Jakarta-Medium',
    color: 'black',
    marginVertical: 5,
    paddingHorizontal: 18,
    paddingVertical: 8,
    shadowColor: '#3e3e3e',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 4,
  },
});

export default LabelInput;
