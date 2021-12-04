import React, { useState } from "react";
import style from './TodoItem.module.css'
import { useDispatch } from "react-redux";
import { deleteByID } from './todoSlice.js'
import { ModalForm } from "./ModalForm";

function Action(props){
  const dispatch = useDispatch()
  const isFinish = props.data.status === 1

  if(isFinish){
    return (
      <div>
        <button onClick={props.onClickEdit}>Edit</button>
      </div>
    )
  }

  return (
    <div>
      <button onClick={props.onClickEdit}>Edit</button>
      <button onClick={(e)=> dispatch(deleteByID(props.data.id))}>Delete</button>
    </div>
  )
}

export function TodoItem(props){
  const [showModalForm, setShowModalForm] = useState(false)

  return (
    <div>
      <ModalForm show={showModalForm} onClose={()=> setShowModalForm(false)} data={props.data} action="edit"/>
      <div className={style.container}>
        <div>
          {props.data.title} ({props.data.description})
        </div>
        <Action data={props.data} onClickEdit={()=> setShowModalForm(true)}/>
      </div>
    </div>
  )
}