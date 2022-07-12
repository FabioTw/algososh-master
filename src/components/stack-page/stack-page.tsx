import React, { useState } from "react";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./stack.module.css";
export const StackPage: React.FC = () => {
  const [circles, setCircles] = useState<boolean>(false);
  const [input, setInput] = useState<string>('');
  const [letters, setLetters] = useState<Array<string>>([]);
  const [stack, setStack] = useState<Array<string>>([]);
  
  const clearElements = () => {

  }

  const deleteElement = () => {

  }

  const addElement = () => {

  }

  return (
    <SolutionLayout title="Стек">
      <div className={styles['stack-block']}>
        <form className={styles['stack-form']}>
          <Input maxLength={4} isLimitText={true} onChange={event => setInput((event.target as HTMLInputElement).value)} value={input} />
          <Button extraClass={styles['edit-button']} text="Добавить" onClick={addElement} />
          <Button extraClass={styles['edit-button']} text="Удалить" onClick={deleteElement}/>
          <Button extraClass={styles['clear-button']} text="Очистить" onClick={clearElements}/>
        </form>
        {circles &&
        <div className={styles['circle-box']}>
          {stack.map((letter, index) => (
            <Circle key={index} letter={letter} extraClass={`${styles.circle}`}/>
          ))}
        </div>
        }
      </div>
    </SolutionLayout>
  );
};
