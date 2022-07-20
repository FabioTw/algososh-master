import React, { useState } from "react";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { ElementStates } from "../../types/element-states";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { setTimer } from "../utils/utils";
import styles from "./stack.module.css";

import { Stack, TStack } from "../utils/stack-class";

export const StackPage: React.FC = () => {
  interface IStack {
    element: string,
    color: ElementStates,
  }

  const [circles, setCircles] = useState<boolean>(false);
  const [input, setInput] = useState<string>('');
  const [stackArray, setStackArray] = useState<Array<IStack>>([]);
  const [stack] = useState<Stack<IStack>>(new Stack<IStack>());
  const [addLoader, setAddLoader] = useState(false);
  const [deleteLoader, setDeleteLoader] = useState(false);

  const clearElements = () => {
    stack.clean();
    setStackArray(stack.elements);
  }

  const deleteElement = async () => {
    setDeleteLoader(true);
    await changeStatus(true, stack, ElementStates.Changing, stack.size-1, true);
    stack.pop();
    setStackArray(stack.elements);
  }

  const addElement = async () => {
    setAddLoader(true);
    stack.push({element: input, color:ElementStates.Changing});
    setStackArray(stack.elements);
    setInput('');
  }


  const changeStatus = async (timer:boolean, arr: Stack<IStack>, color: ElementStates, index: number, isDeliting?: boolean) => {
    timer && addLoader && await setTimer(SHORT_DELAY_IN_MS)
    if (arr.size>0) {
      arr.elements[index].color = color;
    }
    timer && isDeliting && await setTimer(SHORT_DELAY_IN_MS)
    setStackArray([...arr.elements])
    setAddLoader(false);
    setDeleteLoader(false);
  };

  React.useEffect(()=> {
    if (stack) {
      setCircles(true);
    }
    if (addLoader) {
      changeStatus(true, stack, ElementStates.Default, stack.size-1)
    }
  },[stackArray, deleteLoader, addLoader])

  return (
    <SolutionLayout title="Стек">
      <div className={styles['stack-block']}>
        <form className={styles['stack-form']} onSubmit={(e) => e.preventDefault()}>
          <Input extraClass={styles.input} disabled={addLoader || stackArray.length === 12} maxLength={4} isLimitText={true} onChange={event => setInput((event.target as HTMLInputElement).value)} value={input} />
          <Button disabled={input.length === 0} extraClass={styles['edit-button']} isLoader={addLoader} text="Добавить" onClick={addElement} />
          <Button disabled={stackArray.length === 0 || addLoader} isLoader={deleteLoader} extraClass={styles['edit-button']} text="Удалить" onClick={deleteElement}/>
          <Button disabled={stackArray.length === 0 || addLoader} extraClass={styles['clear-button']} text="Очистить" onClick={clearElements}/>
        </form>
        {circles && stackArray.length > 0 &&
        <div className={styles['circle-box']}>
          {stackArray.map((item, index) => (
            <Circle key={index} index={index} head={index === stackArray.length-1?'top': null} letter={item.element} state={item.color} extraClass={`${styles.circle}`}/>
          ))}
        </div>
        }
      </div>
    </SolutionLayout>
  );
};
