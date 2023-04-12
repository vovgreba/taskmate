import React from "react";
import styles from './EditTasks.module.css'
import back from '../../Images/back.svg'
import { Button, InputWidthLabel, TextAreaWidthLabel } from "../../BasicComponents/BasicComponents";
import useTaskStore from "../../TasksStore/TasksStore";

function EdditTasks(params) {
  const { backClick, task, onChangeTask, inputHandler} = useTaskStore()
  return(
    <div className={styles.edditTasks_container}>
      <img onClick={backClick} className={styles.edditTasks_image} src={back} alt="back" />
      <InputWidthLabel onChange={(ev) => {inputHandler(ev.target.name, ev.target.value)}} wrapper={styles.edditTasks_input_block} value={task.name} name='task' id='task' label='Назва задачі'/>
      <TextAreaWidthLabel onChange={(ev) => {inputHandler(ev.target.name, ev.target.value)}} value={task.comment} label='Опис' name='description' id='description'/>
      <Button onClick={onChangeTask} className={styles.edditTasks_button} name='Зберегти'/>
    </div>
  )
}

export default EdditTasks