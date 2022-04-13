import React, {useState} from 'react';
import {
  View,
  Text,
  Button,
  ScrollView,
  TextInput,
  StyleSheet,
  useWindowDimensions,
  //   Modal,
  //   Alert,
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
    paddingLeft: 10,
  },
  title: {
    paddingHorizontal: 5,
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
  checkBoxColors: {
    tintColor: 'grey',
    onCheckColor: 'green',
    onTintColor: 'green',
  },
});

// оборачиваем компонент в observer
// для отслеживания изменений в сторе Mobx
const Todo = observer(() => {
  const {height, width} = useWindowDimensions();
  const initialState = '';
  const [text, setText] = useState(initialState);
  //   const [modalVisible, setModalVisible] = useState(false);

  const addTodo = () => {
    TodoStore.createTodo({id: nanoid(10), title: text});
    setText(initialState);
  };

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
          <Button title="Add Todo" onPress={() => text !== '' && addTodo()} />
        </View>
      </View>

      {TodoStore.todos.map(({id, title, completed}) => (
        <View style={styles.viewLine} key={id}>
          <CheckBox
            value={completed}
            {...styles.checkBoxColors}
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
