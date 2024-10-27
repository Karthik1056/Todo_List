import { useEffect, useState } from 'react'
import React from 'react'
import './App.css'
import { TodoProvider } from './context'
import TodoForm from './components/TodoForm'
import TodoItem from './components/TodoItem'

function App() {
  const [todos, setTodos] = useState([])

  const addTodo = (todo) => {
    // setTodos([...todos , todo]) //create a new array with existing todos in the useState

    setTodos((prev) => [{ id: Date.now(), ...todo }, ...prev])
  }

  const updateTodo = (id, todo) => {
    // using map to iterate to the todos array in the useSate and matching the id with the iteration of todos array if the id is true then update the todos element with new 'todo' or its fasle make it same by prevTodo as it is

    setTodos((prev) => prev.map((prevtodo) => (prevtodo.id === id ? todo : prevtodo)))
  }

  const delTodo = (id) => {
    //to delete map is not used as in delete funtionality i need a new array of todos in which the id that is passed in the delTodos should not be present

    //we user filter as it makes sure the todo.id should not be included in the todos array of useState
    setTodos((prev) => prev.filter((todo) => todo.id !== id))
  }

  //firstly match the todos with the id and if it is true the update the preTodo completed with not making changes to the other elements but changing the completed to inverse unsing "!" to (completed: !prevTodo.completed)
  const toggleComplete = (id) => {
    setTodos((prev) =>
      prev.map((prevTodo) =>
        prevTodo.id === id ? { ...prevTodo, completed: !prevTodo.completed } : prevTodo
      )
    );
  };
  
  // use effect is used to when ever the web page loades id there is a todo in the todos array it should be displayed via local storage so " But we need to feed the todo to local storage whenever i am adding a new todo to the array of todos "
  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"))

    if (todos && todos.length > 0) {
      setTodos(todos)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])

  return (
    < TodoProvider value={{ todos, addTodo, delTodo, updateTodo, toggleComplete }}>
      <div className="bg-[#172842] min-h-screen w-full py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
          <div className="mb-4">
            {/* Todo form goes here */}

            <TodoForm />
          </div>
          <div className="flex flex-wrap gap-y-3">
            {/*Loop and Add TodoItem here */}
            {todos.map((todo) => (
              <div key={todo.id} className='w-full'>
                <TodoItem todo={todo} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </TodoProvider>
  )
}


export default App
