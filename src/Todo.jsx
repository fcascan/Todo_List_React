import React from 'react'

export default function Todo ({ todo, toggleTodo }) {
  //Componente que muestra un item de la lista 
  //Recibe un objeto correspondiente al item, y una funcion para cambiar el check

  function handleTodoClick() {
    //Funcion que permite cambiar el estado de un item de la lista
    toggleTodo(todo.id);
  }

  return (
    <div>
      <label>
        <input type="checkbox" checked={todo.completed} onChange={handleTodoClick}/>
        {todo.name}
      </label>
    </div>
  );
};
