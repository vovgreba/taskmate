import React from "react";
import styles from './СonfirmationModal.module.css'
import { Button } from '../BasicComponents/BasicComponents'



function СonfirmationModal(props) {
  return(
    <div className={styles.confirmationModal_background}>
      <div className={styles.confirmationModal_block}>
        <h1 className={styles.confirmationModal_title}> Видалити задачу ?</h1>
        <Button onClick={props.onClickTrue} className={styles.confirmationModal_button__true} name='Так'/>
        <Button onClick={props.onClickFalse} className={styles.confirmationModal_button__false} name='Ні'/>
      </div>
    </div>

  )
}

export default СonfirmationModal