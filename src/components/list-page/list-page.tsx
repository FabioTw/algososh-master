import React, { useState } from "react";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";

import styles from "./list.module.css";

export const ListPage: React.FC = () => {
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
    <SolutionLayout title="Связный список">
      <div className={styles['list-block']}>
        <form className={styles['list-form']}>
          <div className={styles['list-elements']}>
            <Input maxLength={4} isLimitText={true} placeholder="Введите значение" onChange={event => setInput((event.target as HTMLInputElement).value)} value={input} />
            <Button extraClass={styles['edit-button']} text="Добавить в head" onClick={addElement} />
            <Button extraClass={styles['edit-button']} text="Добавить в tail" onClick={addElement}/>
            <Button extraClass={styles['edit-button']} text="Удалить из head" onClick={deleteElement}/>
            <Button extraClass={styles['edit-button']} text="Удалить из tail" onClick={deleteElement}/>
          </div>
          <div className={styles['list-elements']}>
            <Input maxLength={4} isLimitText={true} placeholder="Введите индекс" onChange={event => setInput((event.target as HTMLInputElement).value)} value={input} />
            <Button extraClass={styles['index-button']} text="Добавить по индексу" onClick={addElement} />
            <Button extraClass={styles['index-button']} text="Удалить по индексу" onClick={deleteElement}/>
          </div>
        </form>
        <div className={styles['circle-box']}>
          <Circle index={0} head='head' extraClass={`${styles.circle}`}/>
          <Circle index={1} extraClass={`${styles.circle}`}/>
          <Circle index={2} extraClass={`${styles.circle}`}/>
          <Circle index={3} tail='tail' extraClass={`${styles.circle}`}/>
        </div>
      </div>
    </SolutionLayout>
  );
};
