import {View, Text, StyleSheet, StatusBar, ImageBackground} from 'react-native';
import formatDate from '../utils/formatDate';
import {FC} from 'react';

const AppHeader: FC = () => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/images/pattern.png')}
        style={styles.image}
        resizeMode="stretch">
        <View style={styles.innerContainer}>
          <Text style={styles.topic}>Good Morning!</Text>
          <Text style={styles.date}>{formatDate(new Date())}</Text>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#145df0',
    height: '20%',
    borderBottomLeftRadius: 21,
    borderBottomRightRadius: 21,
    overflow: 'hidden',
  },
  image: {
    height: '100%',
    paddingHorizontal: 18,
  },
  innerContainer: {
    paddingTop: (StatusBar.currentHeight || 0) + 20,
  },
  topic: {
    fontSize: 28,
    fontFamily: 'Jakarta-Bold',
    color: '#fff',
  },
  date: {
    fontSize: 18,
    fontFamily: 'Jakarta-Regular',
    color: '#fff',
  },
});

export default AppHeader;
