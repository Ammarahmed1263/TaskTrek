import {Pressable, StyleSheet, Text, View} from 'react-native';
import FilterItem from './FilterItem';
import { Dispatch, FC, SetStateAction, useRef, useState } from 'react';

interface TasksFilterProps {
  filter: string;
  setFilter: Dispatch<SetStateAction<string>>
}

const TasksFilter: FC<TasksFilterProps> = ({filter, setFilter}) => {

  const handleFilterChange = (text: string) => {
    setFilter(text);
  };

  return (
    <View style={styles.container}>
      <FilterItem title='All Tasks' isActive={filter == 'all'} onPress={() => handleFilterChange('all')}/>
      <FilterItem title='In Progress' isActive={filter == 'in-progress'} onPress={() => handleFilterChange('in-progress')}/>
      <FilterItem title='Completed' isActive={filter == 'completed'} onPress={() => handleFilterChange('completed')}/>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: 'white',
    height: 50,
  }
})

export default TasksFilter;
