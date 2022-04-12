import {makeAutoObservable} from 'mobx';

class Todo {
  // инициируем массив объектов ToDo листа
  todos = [{id: '0100da', title: 'Hello world!', completed: false}];

  // makeAutoObservable делает все свойства наблюдаемыми по умолчанию
  constructor() {
    makeAutoObservable(this);
  }

  // стор в mobx мутабельный, поэтому просто пушим в него новую задачу
  createTodo(todo) {
    console.log('create : ' + todo.id + ' / ' + todo.title);
    this.todos.push(todo);
  }

  // удаляем по id задачу, отфильтрованный массив по id
  deleteTodo(id) {
    console.log('delete : ' + id);
    this.todos = this.todos.filter(todo => todo.id !== id);
  }

  // ставим  true completed выполненной задаче или false в противном случае
  completeTodo(id) {
    console.log('complete : ' + id);
    this.todos = this.todos.map(todo =>
      todo.id === id ? {...todo, completed: !todo.completed} : todo,
    );
  }
}

export default new Todo();
