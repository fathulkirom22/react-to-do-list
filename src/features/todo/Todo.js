import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { 
  selectTodoFinish, 
  selectTodoUnfinish, 
  selectStatus, 
  getTodo 
} from "./todoSlice";
import style from "./Todo.module.css"
import { TodoItem } from "./TodoItem";
import { ModalForm } from "./ModalForm";

export function Todo(){
  const [showModalForm, setShowModalForm] = useState(false)
  const todoFinish = useSelector(selectTodoFinish)
  const todoUnfinish = useSelector(selectTodoUnfinish)
  const status = useSelector(selectStatus)
  const dispatch = useDispatch()
  
  useEffect(() => {
    if (status === 'idle') {
      dispatch(getTodo())
    }
  }, [status, dispatch])

  return (
    <div>
      <ModalForm show={showModalForm} onClose={()=> setShowModalForm(false)} action="add"/>
      <div className={style.header}>
        <div className={style.title}>
          To-Do List
        </div>
        <button onClick={()=> setShowModalForm(true)}>Add</button>
      </div>
      <div className={style.card}>
        <div className={style.subtitle}>Unfinish</div>
        {todoUnfinish.map(elm => {
          return <TodoItem key={elm.id} data={elm}/>
        })}
      </div>
      <div className={style.card}>
        <div className={style.subtitle}>Finish</div>
        {todoFinish.map(elm => {
          return <TodoItem key={elm.id} data={elm}/>
        })}
      </div>
    </div>
  )
}