import {View, Text, StyleSheet, Image} from 'react-native';
import TasksFilter from './TasksFilter';

const HeadingText = () => {
  
  return (
    <View>
      <View style={styles.innerContainer}>
        <Image
          source={require('../assets/images/todo.png')}
          style={{width: 28, height: 28}}
          resizeMode="center"
        />
        <Text style={styles.BoldText}>My Tasks</Text>
      </View>
    </View>
  );
};

export default HeadingText;

const styles = StyleSheet.create({
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 16,
    paddingBottom: 20,
    paddingStart: 18,
    backgroundColor: 'white',
  },
  BoldText: {
    fontSize: 24,
    fontFamily: 'Jakarta-Bold',
    color: 'black',
    marginStart: 5,
  },
});
