import React from 'react';
import './App.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      actualTodo: {text: '', done: false},
      todos: []
    }
  }
  update(e) {
    this.setState({actualTodo: {
      text: e.target.value,
      done: this.state.actualTodo.done,
      index: this.state.todos.length
    }});
  }
  appendTodo(e) {
    let todos = this.state.todos;
    console.log(this.state.actualTodo.text);
    if (this.state.actualTodo.text !== '') {
      todos.push(this.state.actualTodo);
      this.setState({todos, actualTodo: {
        text: '',
        done: false
      }});
    }
    return false;
  }
  appendOnEnter(e) {
    console.log(e.key);
    if (e.key === 'Enter') {
      this.appendTodo();
    }
  }
  editTodo(editIndex) {
    this.setState({actualTodo: this.state.todos[editIndex]});
    this.removeTodo.bind(this, editIndex)();
  }
  removeTodo(removeIndex) {
    let todos = this.state.todos.filter((todo, index) => {
      return removeIndex !== index;
    });
    this.setState({todos});
  }
  toggleTodoDone(toggleIndex) {
    let todos = this.state.todos;
    todos.map((todo, index) => {
      if (toggleIndex === index) {
        todo.done = !todo.done;
      }
      return todo;
    });
    this.setState({todos});
    console.log(todos);
  }
  render() {
    let todos = this.state.todos;
    return (
      <div id="app">
        <TodoInput val={this.state.actualTodo.text}
          appendMethod={this.appendTodo.bind(this)}
          changeMethod={this.update.bind(this)}
          appendOnEnterMethod={this.appendOnEnter.bind(this)}/>
        { todos.map((todo, index) => (
          <Todo key={`todo-${index}`}
                index={index}
                text={todo.text}
                done={todo.done}
                editMethod={this.editTodo.bind(this, index)}
                removeMethod={this.removeTodo.bind(this, index)}
                toggleMethod={this.toggleTodoDone.bind(this, index)}/>
            )
        )}
      </div>
    );
  }
}

const TodoInput = (props) => (
  <div id="input">
    <input value={props.val} type="text" onChange={props.changeMethod} onKeyPress={props.appendOnEnterMethod}/>
    <button onClick={props.appendMethod}>Add</button>
  </div>
)

const Todo = (props) => (
  <div className="todo">
    <span onClick={props.toggleMethod} className={props.done ? 'done' : 'pending'}>
      {props.index}.- {props.text}
    </span>
    <button onClick={props.editMethod}>Edit</button>
    <button onClick={props.removeMethod}>Remove</button>
  </div>
);

Todo.propTypes = {
  text: React.PropTypes.string
}

export default App;
