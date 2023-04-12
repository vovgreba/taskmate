import React from "react";
import AllTasks from "./AllTasks/AllTasks";
import useTaskStore from "../TasksStore/TasksStore";
import AddTasks from "./AddTasks/AddTasks";
import СonfirmationModal from "../ConfirmationModal/СonfirmationModal";
import EdditTasks from "./EditTasks/EditTasks";

function IndexPages() {

  const {addPages, showConfirmationModal, hideConfirmationModal, deleteTask, edditPages} = useTaskStore()

  return (
    <>
      {addPages ? <AddTasks />: edditPages ? <EdditTasks /> : <AllTasks />}
      {showConfirmationModal && <СonfirmationModal onClickFalse={hideConfirmationModal}
      onClickTrue={deleteTask}/>}
    </>
    
  )
}

export default IndexPages