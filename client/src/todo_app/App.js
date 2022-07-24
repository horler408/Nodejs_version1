import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import '../App.css';
import { addTodoAction, removeTodoAction } from './actions/todoActions';

const App = () => {
  const [todo, setTodo] = useState();

  //   To access the store
  const dispatch = useDispatch();
  //   To access the state
  const Todo = useSelector((state) => state.Todo);

  const { todos } = Todo;

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addTodoAction(todo));
  };

  const removeHandler = (t) => {
    dispatch(removeTodoAction(t));
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Todo List App in Redux</h1>
        <form onSubmit={handleSubmit}>
          <input
            placeholder="Enter a todo"
            style={{
              width: 350,
              padding: 10,
              borderRadius: 20,
              border: 'none',
              fontSize: 20,
            }}
            onChange={(e) => setTodo(e.target.value)}
          />
          <button
            type="submit"
            style={{
              padding: 12,
              borderRadius: 25,
              fontSize: 15,
              marginLeft: 15,
            }}
          >
            Go
          </button>
        </form>
        <ul className="todos">
          {todos &&
            todos.map((item) => (
              <li key={item.id} className="single-todo">
                <span className="todo-text">{item.todo}</span>
                <button
                  style={{
                    borderRadius: 25,
                    padding: 10,
                    margin: 10,
                    border: '1px solid white',
                    color: 'white',
                    backgroundColor: 'orange',
                  }}
                  onClick={(t) => removeHandler(t)}
                >
                  Delete
                </button>
              </li>
            ))}
        </ul>
      </header>
    </div>
  );
};

export default App;
