import React, { useState } from "react";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { ElementStates } from "../../types/element-states";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { setTimer } from "../utils/utils";
import styles from "./stack.module.css";

export const StackPage: React.FC = () => {
  interface Stack {
    element: string,
    color: ElementStates,
  }

  const [circles, setCircles] = useState<boolean>(false);
  const [input, setInput] = useState<string>('');
  const [stack, setStack] = useState<Array<Stack>>([]);

  const [addLoader, setAddLoader] = useState(false);
  const [deleteLoader, setDeleteLoader] = useState(false);

  const clearElements = () => {
    setStack([]);
  }

  const deleteElement = async () => {
    setDeleteLoader(true);
    await changeStatus(true, stack, ElementStates.Changing, stack.length-1, true);
    setStack(stack.slice(0,-1));
  }

  const addElement = async () => {
    setAddLoader(true);
    setStack([...stack, {element: input, color:ElementStates.Changing}]);
    setInput('');
  }


  const changeStatus = async (timer:boolean, arr: Array<Stack>, color: ElementStates, index: number, isDeliting?: boolean) => {
    timer && addLoader && await setTimer(SHORT_DELAY_IN_MS)
    if (arr.length>0) {
      arr[index].color = color;
    }
    timer && isDeliting && await setTimer(SHORT_DELAY_IN_MS)
    setStack([...arr])
    setAddLoader(false);
    setDeleteLoader(false);
  };

  React.useEffect(()=> {
    if (stack) {
      setCircles(true);
    }
    if (addLoader) {
      changeStatus(true, stack, ElementStates.Default, stack.length-1)
    }
  },[stack, deleteLoader])

  return (
    <SolutionLayout title="Стек">
      <div className={styles['stack-block']}>
        <form className={styles['stack-form']}>
          <Input disabled={addLoader || stack.length === 12} maxLength={4} isLimitText={true} onChange={event => setInput((event.target as HTMLInputElement).value)} value={input} />
          <Button disabled={input.length === 0} extraClass={styles['edit-button']} isLoader={addLoader} text="Добавить" onClick={addElement} />
          <Button disabled={stack.length === 0 || addLoader} extraClass={styles['edit-button']} text="Удалить" onClick={deleteElement}/>
          <Button disabled={stack.length === 0 || addLoader} extraClass={styles['clear-button']} text="Очистить" onClick={clearElements}/>
        </form>
        {circles && stack.length > 0 &&
        <div className={styles['circle-box']}>
          {stack.map((item, index) => (
            <Circle key={index} index={index} head={index === stack.length-1?'top': null} letter={item.element} state={item.color} extraClass={`${styles.circle}`}/>
          ))}
        </div>
        }
      </div>
    </SolutionLayout>
  );
};
