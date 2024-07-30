import {useState, FC} from 'react';
import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewProps,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import CustomBottomSheets from './CustomBottomSheets';

interface addButtonProps {
  style?: StyleProp<ViewProps>;
}

const AddButton: FC<addButtonProps> = ({style}) => {
  const [isActive, setIsActive] = useState(false);

  const onPress = () => {
    setIsActive(true);
  };

  return (
    <>
      {!isActive ? (
        <View style={styles.container}>
          <View style={[styles.innerContainer, style]}>
            <Pressable
              android_ripple={{color: '#B1B1B1'}}
              style={styles.button}
              onPress={onPress}>
                <View style={{flexDirection: 'row'}}>
                  <Icon name="add-circle" color="white" size={30} />
                  <Text style={styles.title}>Add New Task</Text>
                </View>
            </Pressable>
          </View>
        </View>
      ) : (
        <CustomBottomSheets setIsActive={setIsActive} />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 25,
    backgroundColor: '#ececec'
  },
  innerContainer: {
    width: '80%',
    alignSelf: 'center',
    height: 50,
    overflow: 'hidden',
    elevation: 4,
    backgroundColor: '#145df0',
    borderRadius: 15,
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  title: {
    fontFamily: 'Jakarta-Medium',
    fontSize: 18,
    color: 'white',
    marginStart: 8,
  },
});

export default AddButton;
