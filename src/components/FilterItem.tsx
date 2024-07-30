import { FC } from "react"
import { Pressable, View, Text, StyleSheet } from "react-native"

interface FilterItemProps {
  title: string
  isActive: boolean
  onPress: () => void
}

const FilterItem: FC<FilterItemProps> = ({title = 'All', isActive, onPress}) => {
  return (
    <View style={[styles.container, isActive && styles.activeContainer]}>
        <Pressable android_ripple={{color: '#B1B1B1'}} onPress={onPress} style={styles.innerContainer}>
          <Text style={[styles.text, isActive && styles.activeText]}>{title}</Text>
        </Pressable>
    </View>
  )
}

export default FilterItem;

const styles = StyleSheet.create({
  container: {
    flex: 1 / 3,
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: 'Jakarta-Medium',
    fontSize: 15,
    color: '#898989'
  },
  activeContainer: {
    borderBottomWidth: 2.5,
    borderBottomColor: '#145df0'
  },
  activeText: {
    color: '#145df0',
    fontFamily: 'Jakarta-Bold',
    fontSize: 17
  }
})