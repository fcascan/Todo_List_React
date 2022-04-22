import React from 'react'
import Todo from './Todo'

export default function TodoList ({todoList, toggleTodo}) {
  //Componente de la lista de tareas. Crea una lista de tareas con items de objetos tipo todo.
  //recibe una lista de tareas y una función para cambiar el estado de la tarea.
  return (
    <>
      <h2>Lista de tareas pendientes</h2>
      {todoList.map((todo) => {
        return <Todo key={todo.id} todo={todo} toggleTodo={toggleTodo} />;
      })}
    </>
  );
};