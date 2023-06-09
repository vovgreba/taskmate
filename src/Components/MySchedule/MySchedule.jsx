import React from "react";
import { BlockSelectInterval, Button } from "../BasicComponents/BasicComponents";
import styles from './MySchedule.module.css'
import useStoreSchedule from "./MyScheduleStore";

function MySchedule() {
  const {days, hundleClick, buttonClass, addIntervalTime, closeInterval,  indexElementButton, newButtonClass, content, handleSelectorData, intervalsByDay, saveSchedule} = useStoreSchedule()
  
  return (
    <div className={styles.mySchedule_container}>
      <h2 className={styles.mySchedule_title}>Мій графік</h2>
      {days.map((el, index)=> {
        return(
          
        <React.Fragment key = {`day-${index}`}>
          <Button key={index} className={index === indexElementButton ? styles[newButtonClass]
            : styles[buttonClass] } name={el}
           onClick={ev => hundleClick('mySchedule_button__dayShow', index)}/>

          {content && index === indexElementButton && (
            <div className={styles.mySchedule_interval}>
              <p>Робочий час</p>
              {intervalsByDay[index] && intervalsByDay[index].map((el, selectIndex) => (
                <BlockSelectInterval
                  key={selectIndex}
                  onChangeFrom={ev => handleSelectorData(index, ev.target.value, 'from', selectIndex)}
                  onChangeTo={ev => handleSelectorData(index, ev.target.value, 'to', selectIndex)}
                  onClose={ev => closeInterval(index, selectIndex)}
                  index={index}
                  id={el} selectIndex={selectIndex} 
                />
              ))}
              <Button onClick={ev => addIntervalTime(index)} className={styles.mySchedule_button__interval} name='+ додати інтервал'/>
            </div>
          )}

        </React.Fragment>        
        ) 
      })}
      <Button onClick={() => saveSchedule()} className={styles.mySchedule_button__save} name='Зберегти'/>
    </div>
  )

}

export default MySchedule;
