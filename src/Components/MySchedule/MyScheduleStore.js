import { create } from "zustand";
import { v4 as uuidv4 } from 'uuid';

const startHour = 7;
const endHour = 20;
const interval = 15;

const hours = Array.from({length: endHour - startHour + 1   }, (_, i) =>  startHour + i )
const minutes = Array.from({length: 60 / 15  }, (_, x) => x * interval )

const times = hours.reduce((acc, hour) => {
  const time = minutes.map(minute => {
    const hourFormatted = String(hour).padStart(2, '0'); // форматування години
    const minuteFormatted = String(minute).padStart(2, '0'); // форматування хвилини
    return `${hourFormatted}:${minuteFormatted}`; // повернення форматованого часу
  });
  if(hour < 20) {
    return [...acc, ...time];
  } else {
    return [...acc, ...time.slice(0,1)];
  }
}, []);

const useStoreSchedule = create((set,get) => ({
  days:['Понеділок','Вівторок','Середа','Четверг','Пятниця','Суббота','Неділя'],
  buttonClass: 'mySchedule_button__day',
  newButtonClass: null,
  indexElementButton: null,
  content: false,
  intervalsByDay: {},
  time: times,
  intervalsByDays: {},

  hundleClick: (newClass, index) => {
    
    if(get().content && index === get().indexElementButton) {
      set(state => ({content: false, newButtonClass: state.buttonClass, indexElementButton: index }))
    } else {
      set({content: true, newButtonClass: newClass, indexElementButton: index})
    }

  },
  addIntervalTime: (index) => {

    set(state => {
      const currentIntervals = state.intervalsByDay[index] || [];
      return {intervalsByDay: {...state.intervalsByDay, [index]: [...currentIntervals, `newInterval${uuidv4()}`]}}
    })
  },
  handleSelectorData: (index, value, interval, selectIndex) => {
    
    set(state => {
      
      const currentIntervals = state.intervalsByDays[index] || { from: [], to: [] };
      const updatedIntervals = { ...currentIntervals };
    
      if (interval === 'from') {
        if (updatedIntervals.from[selectIndex]) {
          updatedIntervals.from[selectIndex] = value;
        } else {
          updatedIntervals.from[selectIndex] = value;
        }
      } else {
        if (updatedIntervals.to[selectIndex]) {
          updatedIntervals.to[selectIndex] = value;
        } else {
          updatedIntervals.to[selectIndex] = value;
        }
      }
    
      return {
        intervalsByDays: {
          ...state.intervalsByDays,
          [index]: updatedIntervals
        }
      };
    });

      console.log(get().intervalsByDays)
  },
  closeInterval: (index, selectIndex) => {
    
    set(state => {
      const currentArray = state.intervalsByDay[index] || [];
      const currentArrayInterval = state.intervalsByDays[index] || { from: [], to: [] };

      currentArray.splice(selectIndex, 1 )
      currentArrayInterval.from.splice(selectIndex, 1)
      currentArrayInterval.to.splice(selectIndex, 1)
      
      return {intervalsByDay: {...state.intervalsByDay, [index]: [...currentArray]},

      intervalsByDays: { ...state.intervalsByDays, [index]: {...currentArrayInterval}}
    }
      
    })
  },
  saveSchedule: () => {

    function getDay(index) {
      const day = get().days.find((el, indexEl) => {
        if(indexEl === index) {
          return el
        }
        return null
      })
      return day
    }
      const updateSchedule = {}
      const currentSchedule = {...get().intervalsByDays}
      
      for(let keys in currentSchedule) {
        const arrayInterval = currentSchedule[keys].from.map((el,index) => {
          const fullInterval = `${el}-${currentSchedule[keys].to[index]}`
          return fullInterval
        })
        if(arrayInterval.length !== 0) {
          updateSchedule[getDay(+keys)] = [...arrayInterval]
        }
      }
      console.log(updateSchedule)

      // сортування об'єкта schedule
      const sortedKeys = Object.keys(updateSchedule).sort((a,b) => {
        const days = get().days
        return days.indexOf(a) - days.indexOf(b) 
      })
      
      
      const sortedObject = {}
      sortedKeys.forEach(key => {
        sortedObject[key] = updateSchedule[key]
      })
      console.log(sortedObject)

  }
}))

export default useStoreSchedule



