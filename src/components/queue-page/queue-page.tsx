import React, { useState } from "react";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { ElementStates } from "../../types/element-states";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { setTimer } from "../utils/utils";

import styles from "./queue.module.css";

export const QueuePage: React.FC = () => {
  interface Queue {
    item: string,
    index: number,
    color: ElementStates,
  }


  const [input, setInput] = useState<string>('');
  const [letters, setLetters] = useState<Array<string>>([]);
  const [queue, setQueue] = useState<Array<Queue>>([]);
  const [head, setHead] = useState<number>(0);
  const [tail, setTail] = useState<number>(0);
  const [length, setLength] = useState<number>(0);

  const [addButtonLoader, setAddButtonLoader] = useState<boolean>(false);
  const [delButtonLoader, setDelButtonLoader] = useState<boolean>(false);

  const size: number = 7;
  
  const changeStatus = async (timer:boolean, arr: Array<Queue>, color: ElementStates, firstIndex: number) => {
    timer && await setTimer(SHORT_DELAY_IN_MS);
    arr[firstIndex].color = color;
    setQueue([...arr]);
    if(timer) {
      setAddButtonLoader(false);
      setDelButtonLoader(false);
    }
  };

  const clearElements = () => {
    setHead(0);
    setTail(0);
    setQueue([]);
    setLength(0);
  }

  const deleteElement = async () => {
    if (length === 0) {
      throw new Error("No elements in the queue");
    }
    if (queue) {
      setDelButtonLoader(true);
      changeStatus(false, queue, ElementStates.Changing, head*-1)
      await changeStatus(true, queue, ElementStates.Default, head*-1)
      let changedItem = queue;
      changedItem[head*-1].item = '';
      setQueue(changedItem)
      setHead(head != -7 ? head-1: -6);
    }
  }

  const addElement = () => {
      if (length >= size) {
        throw new Error("Maximum length exceeded");
      }
      setQueue([...queue, {item: input, index: length, color: ElementStates.Changing}])
      setTail(tail != 7? tail+1 : 7);
      setLength(length+1);
      setInput('');
      setAddButtonLoader(true);
  }

  React.useEffect(()=>{
    if (addButtonLoader) {
      changeStatus(true, queue, ElementStates.Default, length-1)
    }
  },[queue])

  const getCircles = () => {
    let content = [];
    for (let i = 0; i < size; i++) {
      content.push(
      <Circle key={i} index={i} letter={queue[i] ? queue[i].item : ''} 
        tail={tail === i+1 && queue[i]?.item!=''? 'tail' : ''} 
        head={head*-1 === i && queue[i]? 'head' : ''} 
        state={queue[i] ? queue[i].color : ElementStates.Default} extraClass={`${styles.circle}`}/>);
    }
    return content;
  };
  
  return (
    <SolutionLayout title="Очередь">
      <div className={styles['queue-block']}>
        <form className={styles['queue-form']}>
          <Input maxLength={4} isLimitText={true} onChange={event => setInput((event.target as HTMLInputElement).value)} value={input} />
          <Button extraClass={styles['edit-button']} 
            disabled={input==='' || length >= size || delButtonLoader} 
            isLoader={addButtonLoader} text="Добавить" onClick={addElement} />
          <Button extraClass={styles['edit-button']} 
            disabled={head===-7 || queue[queue.length-1]?.item === '' || addButtonLoader} 
            isLoader={delButtonLoader} text="Удалить" onClick={deleteElement}/>
          <Button extraClass={styles['clear-button']} 
            disabled={length===0 || addButtonLoader || delButtonLoader} 
            text="Очистить" onClick={clearElements}/>
        </form>
        <div className={styles['circle-box']}>
          {
            getCircles()
          }
        </div>
      </div>
    </SolutionLayout>
  );
};
