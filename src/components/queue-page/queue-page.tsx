import React, { useState } from "react";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { ElementStates } from "../../types/element-states";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { setTimer } from "../utils/utils";
import { Queue } from "../utils/queue-class";
import styles from "./queue.module.css";

export const QueuePage: React.FC = () => {
  interface IQueue {
    item: string,
    index: number,
    color: ElementStates,
  }

  const size: number = 7;

  const [input, setInput] = useState<string>('');
  const [queue] = useState<Queue<IQueue>>(new Queue<IQueue>(size));
  const [queueArray, setQueueArray] = useState<Array<IQueue|null>>([]);
  const [head, setHead] = useState<number>(0);
  const [tail, setTail] = useState<number>(0);
  const [length, setLength] = useState<number>(0);

  const [addButtonLoader, setAddButtonLoader] = useState<boolean>(false);
  const [delButtonLoader, setDelButtonLoader] = useState<boolean>(false);

  const changeStatus = async (timer:boolean, arr: Queue<IQueue>, color: ElementStates, index: number) => {
    console.log(arr.elements, index)
    timer && await setTimer(SHORT_DELAY_IN_MS);
    arr.elements[index]!.color = color;
    setQueueArray([...arr.elements]);
    if(timer) {
      setAddButtonLoader(false);
      setDelButtonLoader(false);
    }
  };

  const clearElements = () => {
    queue.clean()
    setHead(queue.head.index);
    setTail(queue.tail.index);
    setQueueArray([]);
    setLength(queue.length);
  }

  const deleteElement = async () => {
    if (length === 0) {
      throw new Error("No elements in the queue");
    }
    if (queue) {
      setDelButtonLoader(true);
      changeStatus(false, queue, ElementStates.Changing, head)
      await changeStatus(true, queue, ElementStates.Default, head)
      queue.dequeue();
      setQueueArray(queue.elements)
      setHead(queue.head.index);
    }
  }

  const addElement = () => {
      if (length >= size) {
        throw new Error("Maximum length exceeded");
      }
      queue.enqueue({item: input, index: length, color: ElementStates.Changing});
      setQueueArray(queue.elements);
      setTail(queue.tail.index);
      setLength(queue.length);
      setInput('');
      setAddButtonLoader(true);
  }

  React.useEffect(()=>{
    if (addButtonLoader) {
      changeStatus(true, queue, ElementStates.Default, tail-1)
    }
  },[queue, addButtonLoader, delButtonLoader, queueArray])

  const getCircles = () => {
    let content = [];
    for (let i = 0; i < size; i++) {
      content.push(
      <Circle key={i} index={i} letter={queueArray[i] ? queueArray[i]!.item : ''} 
        tail={tail === i+1 && queueArray[i]?.item!==''? 'tail' : ''} 
        head={head === i && queueArray[i]? 'head' : ''} 
        state={queueArray[i] ? queueArray[i]!.color : ElementStates.Default} extraClass={`${styles.circle}`}/>);
    }
    return content;
  };
  
  return (
    <SolutionLayout title="Очередь">
      <div className={styles['queue-block']}>
        <form className={styles['queue-form']}>
          <Input maxLength={4} isLimitText={true} onChange={event => setInput((event.target as HTMLInputElement).value)} value={input} />
          <Button extraClass={styles['edit-button']} 
            disabled={input === '' || length >= size || tail === size || delButtonLoader} 
            isLoader={addButtonLoader} text="Добавить" onClick={addElement} />
          <Button extraClass={styles['edit-button']} 
            disabled={head === size || length === 0 || addButtonLoader} 
            isLoader={delButtonLoader} text="Удалить" onClick={deleteElement}/>
          <Button extraClass={styles['clear-button']} 
            disabled={length === 0 || addButtonLoader || delButtonLoader} 
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
