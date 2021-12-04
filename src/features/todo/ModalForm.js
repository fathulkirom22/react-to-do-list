import React, { useState, useEffect } from "react";
import style from './ModalForm.module.css'
import { useDispatch } from "react-redux";
import { create, edit } from './todoSlice'

export function ModalForm(props){
  const [title, setTitle] = useState('Title')
  const [description, setDescription] = useState('lorem ipsum')
  const [status, setStatus] = useState(0)
  const dispatch = useDispatch()

  useEffect(() => {
    if(props.action === 'edit'){
      setTitle(props.data.title)
      setDescription(props.data.description)
      setStatus(props.data.status)
    }
  }, [props, setTitle, setDescription, setStatus])

  const headleSubmit = () => {
    if(props.action === 'edit'){
      const payload = {
        ...props.data,
        title: title,
        description: description,
        status: status,
      }
      dispatch(edit(payload))
    } else if (props.action === 'add') {
      const payload = {
        title: title,
        description: description,
        status: status,
      }
      dispatch(create(payload))
    }
    props.onClose()
  }

  if(!props.show){
    return null
  }

  return(
    <div className={style.modal}>
      <div className={style.modalContent}>
        <div className={style.modalHeader}>
          <div className={style.modalTitle}>Form {props.action} To-Do List</div>
          <div>
            <button onClick={props.onClose}>close</button>
          </div>
        </div>
        <div className={style.modalBody}>
          <div className={style.groupInput}>
            <div>Title</div>
            <input type="text" value={title} onChange={(e)=>setTitle(e.target.value)}/>
          </div>
          <div className={style.groupInput}>
            <div>Description</div>
            <textarea value={description} onChange={(e)=>setDescription(e.target.value)}></textarea>
          </div>
          <div className={style.groupInput}>
            <div>Status</div>
            <input type='radio' name='status' checked={status === 0} onChange={e => {}} onClick={()=>setStatus(0)} value="0" id="unfinish"/> <label htmlFor="unfinish">Unfinish</label>
            <input type='radio' name='status' checked={status === 1} onChange={e => {}} onClick={()=>setStatus(1)} value="1" id="finish"/> <label htmlFor="finish">Finish</label>
          </div>
          <div>
            <button onClick={headleSubmit}>{props.action}</button>
          </div>
        </div>
      </div>
    </div>
  )
}