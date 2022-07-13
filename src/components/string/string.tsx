import React, { useEffect, useState } from "react";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { ElementStates } from "../../types/element-states";

import styles from "./string.module.css";
import circleStyles from "../ui/circle/circle.module.css";
import { Circle } from "../ui/circle/circle";
import { DELAY_IN_MS } from "../../constants/delays";
import { setTimer } from "../utils/utils";

export const StringComponent: React.FC = () => {

  interface Inverted {
    letter: string,
    color: ElementStates,
  }

  const [circles, setCircles] = useState<boolean>(false);
  const [loader, setLoader] = useState<boolean>(false);
  const [input, setInput] = useState<string>('');
  const [invertedLetters, setInvertedLetters] = useState<Array<Inverted>>([]);

  let tempInverting: Array<string> = [];
  let stringArray: Array<Inverted> = [];

  React.useEffect(()=>{
    tempInverting = input.split('');
    Array.from(tempInverting, (item) => stringArray.push({letter:item, color:ElementStates.Default}))
    setInvertedLetters(stringArray);
  },[input])

  const changeStatus = async (timer:boolean, arr: Array<Inverted>, color: ElementStates, firstIndex: number, secondIndex: number) => {
    timer && await setTimer(DELAY_IN_MS);
    if (firstIndex <= secondIndex) {
      arr[firstIndex].color = color;
      arr[secondIndex].color = color;
    }
    setInvertedLetters([...arr])
  };


  const loop = async (arr: Array<Inverted>) => {
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
      loop(invertedLetters);
  }

  return (
    <SolutionLayout title="Строка">
      <div className={styles['string-block']}>
        <form className={styles['string-form']}>
          <Input extraClass={styles['string-input']} maxLength={11} disabled={loader} isLimitText={true} onChange={event => setInput((event.target as HTMLInputElement).value)} value={input} />
          <Button text="Развернуть" onClick={reverse} isLoader={loader} disabled={input === ''}/>
        </form>
        {circles &&
        <div className={styles['circle-box']}>
          {invertedLetters.map((letter, index) => (
            <Circle key={index} state={letter.color} letter={letter.letter} extraClass={`${styles.circle}`}/>
          ))}
        </div>
        }
      </div>
    </SolutionLayout>
  );
};
