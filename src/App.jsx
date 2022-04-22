import React from 'react'
import { useState, useRef, useEffect } from 'react';
import TodoList from './TodoList'; 
import { v4 as uuidv4} from 'uuid'; //Generador de id aleatorios, se descarga con npm i uuid. Sino podria haber usado Date.now().

const LOCAL_STORAGE_KEY = "storedList";

function App() {
  //Funcion principal del componente.
  const [todoList, setTodoList] = useState([]);
  const todoNameRef = useRef();

  useEffect(() => {
    //Este efecto solo ocurre al incio de la App, y se encarga de cargar la lista guardada localmente en caso de un refresh de pagina
    const storedList = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storedList) setTodoList(storedList);
  }, []);

  useEffect(() => {
    //Este efecto ocurre cada vez que la lista cambia, y guarda una copia como un JSON.
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todoList));
  }, [todoList]);

  function toggleTodo(id){
    //Funcion que permite que se cambie el check de un item de la lista
    const newTodoList = [...todoList];
    const todo = newTodoList.find(todo => todo.id === id);
    todo.completed = !todo.completed;
    setTodoList(newTodoList);
  }

  function handleAddTodo(e) {
    //Funcion que maneja el evento de agregar un item
    const name = todoNameRef.current.value;
    if (name === '') return;  //Caso campo vacio no hago nada
    e.preventDefault(); //Evita que se refresque la pagina
    const newTodo = {
      id: uuidv4(),
      name: name,
      completed: false,
    };
    setTodoList([...todoList, newTodo]);  //Agrega el nuevo item al arreglo
    todoNameRef.current.value = null;     //Vaciar campo de texto
  }

  function handleClearTodos (e){
    //Funcion que remueve de la lista todos los items que esten marcados como completados
    const newTodoList = todoList.filter(todo => !todo.completed);
    setTodoList(newTodoList);
  }

  function handleEmptyTodos (e){
    //Funcion que remueve de la lista todos los items
     const newTodoList = [];
     setTodoList(newTodoList);
  }

  return (
    <>
      <TodoList todoList={todoList} toggleTodo={toggleTodo} />
      <hr />
      <button onClick={handleClearTodos}>Eliminar completados</button>
      <button onClick={handleEmptyTodos}>Borrar Lista</button>
      <hr />
      <input
        ref={todoNameRef}
        type="text"
        onKeyDown={
          //Para que la tecla Enter agregue el item
          (e) => (e.key === "Enter" ? handleAddTodo(e) : null)
        }
      />
      <button onClick={handleAddTodo}>Agregar</button>
      <div>{todoList.filter((todo) => !todo.completed).length} restantes</div>
    </>
  );
}

export default App;
