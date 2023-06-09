import React from "react";
import styles from './BasicComponents.module.css'
import deleteImg from '../Images/delete.svg'
import closeImg from '../Images/close.svg'
import useStoreSchedule from "../MySchedule/MyScheduleStore";
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


function Select(props) {
  
  return(
    <select className={styles.select} onChange={props.onChange} name="time" id={props.intervalId} value={props.value}>
      {props.time.map((el) => {
        return (
          <option key={`${props.intervalId}-${el}`} value={el} >
            {el}
          </option>
        );
      })}
    </select>
  )
}
export function BlockSelectInterval(props) {
  const {time, intervalsByDays} = useStoreSchedule()

  const selectedFrom = intervalsByDays?.[props.index]?.from?.[props.selectIndex];
  const selectedTo = intervalsByDays?.[props.index]?.to?.[props.selectIndex]
  const fromId = `${props.id}-from`;
  const toId = `${props.id}-to`;
  
  return(
    <div className={styles.blockSelectInterval} id={props.id}>
      <div className={styles.blockSelectInterval__from}>
        <p>з</p>
        <Select onChange={props.onChangeFrom} time={time} 
        value={selectedFrom} intervalId={fromId}/>
      </div>
      <div className={styles.blockSelectInterval__to}>
      <p>до</p>
      <Select onChange={props.onChangeTo} time={time}
       value={selectedTo} intervalId={toId}/>
      </div>
      <img className={styles.blockSelectInterval__img}src={closeImg} alt="close" onClick={props.onClose} />
    </div>
  )
}