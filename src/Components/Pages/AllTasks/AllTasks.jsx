import React, { useEffect } from "react";
import styles from './AllTasks.module.css'
import addImage from '../../Images/add.svg'
import { BlockTasks } from "../../BasicComponents/BasicComponents";
import useTaskStore from "../../TasksStore/TasksStore";


function AllTasks(params) {

  const {showAddTask, tasks, getTasks, showDeleteConfirmationModal, edditTask} = useTaskStore()
  useEffect(() => {
    const responce = async () => {
      await getTasks()
    }
    responce()
  }, [getTasks])
  
  return(
    <div className={styles.allTasks_container}>
      <header className={styles.allTasks_header}>
        <h1>Мої задачі</h1>
        <img onClick={showAddTask } src={addImage} alt="plus" />
      </header>
      {tasks.map(el => {
        return <BlockTasks onDelete={(ev) => {
          ev.stopPropagation();
          showDeleteConfirmationModal(el.id)
        }} id={el.id} onEddit={() => {edditTask(el.id)}} name={el.name} key={el.id}/>
      }) }
    </div>
  )
  

}

export default AllTasks