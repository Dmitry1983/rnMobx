import React, {useState} from 'react';
import {
  View,
  Text,
  Button,
  ScrollView,
  TextInput,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import {observer} from 'mobx-react-lite';
import {nanoid} from 'nanoid/non-secure';
import TodoStore from '../store/todo';

const styles = StyleSheet.create({
  scroll: {
    padding: 10,
  },
  input: {
    height: 50,
    borderColor: 'black',
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 10,
    //alignItems: 'center',
    paddingLeft: 10,
  },
  title: {
    paddingHorizontal: 5,
    // backgroundColor: 'grey',
  },
  viewLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50,
  },
  buttonView: {
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topLine: {
    flexDirection: 'row',
    marginBottom: 20,
  },
});

// оборачиваем компонент в observer
// для отслеживания изменений в сторе Mobx
const Todo = observer(() => {
  const {height, width} = useWindowDimensions();
  const initialState = '';
  const [text, setText] = useState(initialState);

  return (
    <ScrollView style={[styles.scroll, {width: width, height: height}]}>
      <View style={styles.topLine}>
        <TextInput
          style={[styles.input, {width: (width * 2) / 3}]}
          placeholder="Create"
          onChangeText={t => setText(t)}
          defaultValue={text}
        />
        <View style={[styles.buttonView, {width: width / 3}]}>
          <Button
            title="Add Todo"
            onPress={() => {
              TodoStore.createTodo({id: nanoid(10), title: text});
              setText(initialState);
            }}
          />
        </View>
      </View>

      {TodoStore.todos.map(({id, title, completed}) => (
        <View style={styles.viewLine} key={id}>
          <CheckBox
            value={completed}
            tintColor="grey"
            onCheckColor="green"
            onTintColor="green"
            onValueChange={() => TodoStore.completeTodo(id)}
          />

          <Text style={[styles.title, {maxWidth: (width / 3) * 2}]}>
            {title}
          </Text>

          <Button
            title="Remove"
            onPress={() => TodoStore.deleteTodo(id)}
            color="red"
          />
        </View>
      ))}
    </ScrollView>
  );
});

export default Todo;
