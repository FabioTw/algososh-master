import React, { useEffect, useRef, useState } from "react";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { ElementStates } from "../../types/element-states";

import styles from "./string.module.css";
import circleStyles from "../ui/circle/circle.module.css";
import { Circle } from "../ui/circle/circle";
import { DELAY_IN_MS } from "../../constants/delays";
import { setTimer } from "../utils/utils";
import { useStateIfMounted } from "use-state-if-mounted";

export const StringComponent: React.FC = () => {

  interface ILetters {
    letter: string,
    color: ElementStates,
  }

  const [circles, setCircles] = useState<boolean>(false);
  const [loader, setLoader] = useStateIfMounted<boolean>(false);
  const [input, setInput] = useState<string>('');
  const [invertedLetters, setInvertedLetters] = useStateIfMounted<Array<ILetters>>([]);

  const isUnmountedRef = useRef(false);

  let tempInverting: Array<string> = [];
  let stringArray: Array<ILetters> = [];

  React.useEffect(()=>{
    tempInverting = input.split('');
    Array.from(tempInverting, (item) => stringArray.push({letter:item, color:ElementStates.Default}))
    setInvertedLetters(stringArray);
    return () => {
      isUnmountedRef.current = true;
    }
  },[input])

  const changeStatus = async (timer:boolean, arr: Array<ILetters>, color: ElementStates, firstIndex: number, secondIndex: number) => {
    timer && await setTimer(DELAY_IN_MS);
    if (firstIndex <= secondIndex) {
      arr[firstIndex].color = color;
      arr[secondIndex].color = color;
    }
    // if(!isUnmountedRef.current){
      setInvertedLetters([...arr])
    // }
  };

  const stringReverse = async (arr: Array<ILetters>) => {
    setInvertedLetters([...arr])
    for (let index = 0, last = arr.length; index < last; index++) {
      if (input[index] === arr[index].letter) {
        await changeStatus(true, arr, ElementStates.Changing, index, last-1);
        [arr[index], arr[last-1]] = [arr[last-1], arr[index]];
        await changeStatus(true, arr, ElementStates.Modified, index, last-1);
      }
      last--;
    }
    setLoader(false)
  }

  const reverse = async () => {
    setCircles(true);
    setLoader(true);
    stringReverse(invertedLetters);
  }

  return (
    <SolutionLayout title="Строка">
      <div className={styles['string-block']}>
        <form className={styles['string-form']} onSubmit={(e) => e.preventDefault()}>
          <Input data-testid="input" extraClass={styles['string-input']} maxLength={11} disabled={loader} isLimitText={true} onChange={event => setInput((event.target as HTMLInputElement).value)} value={input} />
          <Button data-testid="submit" text="Развернуть" onClick={reverse} isLoader={loader} disabled={input === ''}/>
        </form>
        {circles &&
        <div className={styles['circle-box']} data-testid="circle">
          {invertedLetters.map((letter, index) => (
            <Circle key={index}
              state={letter.color} letter={letter.letter} 
              extraClass={`${styles.circle}`}/>
          ))}
        </div>
        }
      </div>
    </SolutionLayout>
  );
};
