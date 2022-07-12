import React, { useState } from "react";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";

import styles from "./queue.module.css";

export const QueuePage: React.FC = () => {
  const [input, setInput] = useState<string>('');
  const [letters, setLetters] = useState<Array<string>>([]);
  const [queue, setQueue] = useState<Array<string>>([]);
  
  const clearElements = () => {

  }

  const deleteElement = () => {

  }

  const addElement = () => {

  }

  return (
    <SolutionLayout title="Очередь">
      <div className={styles['queue-block']}>
        <form className={styles['queue-form']}>
          <Input maxLength={4} isLimitText={true} onChange={event => setInput((event.target as HTMLInputElement).value)} value={input} />
          <Button extraClass={styles['edit-button']} text="Добавить" onClick={addElement} />
          <Button extraClass={styles['edit-button']} text="Удалить" onClick={deleteElement}/>
          <Button extraClass={styles['clear-button']} text="Очистить" onClick={clearElements}/>
        </form>
        <div className={styles['circle-box']}>
          <Circle index={0} extraClass={`${styles.circle}`}/>
          <Circle index={1} extraClass={`${styles.circle}`}/>
          <Circle index={2} extraClass={`${styles.circle}`}/>
          <Circle index={3} extraClass={`${styles.circle}`}/>
          <Circle index={4} extraClass={`${styles.circle}`}/>
          <Circle index={5} extraClass={`${styles.circle}`}/>
          <Circle index={6} extraClass={`${styles.circle}`}/>
        </div>
      </div>
    </SolutionLayout>
  );
};
