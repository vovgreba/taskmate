import React from "react";
import styles from './BasicComponents.module.css'
import deleteImg from '../Images/delete.svg'

export function Button(props) {
  return(
    <button onClick={props.onClick} type='button' className={props.className}>{props.name}</button>
  )
}

export function InputWidthLabel(props) {
  return(
    <div className={props.wrapper}>
      <label className={styles.label} htmlFor={props.name}>{props.label}</label>
      <input className={styles.input} name={props.name} value={props.value} onChange={props.onChange} type={props.type} id={props.id} />
    </div>

  )
}
export function TextAreaWidthLabel(props) {
  return(
    <div className={props.wrapper}>
      <label className={styles.label} htmlFor={props.name}>{props.label}</label>
      <textarea className={styles.textarea} name={props.name} value={props.value} onChange={props.onChange} type='text' id={props.id} />
    </div>
  )
}

export function BlockTasks(props) {
  return(
    <div onClick={props.onEddit} className={styles.taskBlock} id={props.id}>
      <div className={styles.taskBlock_name}>{props.name}</div>
      <img className={styles.taskBlock_img}src={deleteImg} alt="delete" onClick={props.onDelete} />
    </div>
  )
}