import React from "react";
import styles from './AddTasks.module.css'
import back from '../../Images/back.svg'
import { Button, InputWidthLabel, TextAreaWidthLabel } from "../../BasicComponents/BasicComponents";
import useTaskStore from "../../TasksStore/TasksStore";

function AddTasks(params) {
  const {backClick, addTask, inputHandler } = useTaskStore()

  return(
    <div className={styles.addTasks_container}>
      <img onClick={backClick} className={styles.addTasks_image} src={back} alt="back" />
      <InputWidthLabel onChange={(ev)=> {
        inputHandler(ev.target.name, ev.target.value)
      }} wrapper={styles.addTasks_input_block} name='task' id='task' label='Назва задачі'/>
      <TextAreaWidthLabel onChange={(ev)=> {
        inputHandler(ev.target.name, ev.target.value)
      }} label='Опис' name='description' id='description'/>
      <Button onClick={addTask} className={styles.addTasks_button} name='Додати задачу'/>
    </div>
  )
  

}

export default AddTasks