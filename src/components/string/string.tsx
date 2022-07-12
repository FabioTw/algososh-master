import React, { useEffect, useState } from "react";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { ElementStates } from "../../types/element-states";

import styles from "./string.module.css";
import circleStyles from "../ui/circle/circle.module.css";
import { Circle } from "../ui/circle/circle";

export const StringComponent: React.FC = () => {
  const [circles, setCircles] = useState<boolean>(false);
  const [loader, setLoader] = useState<boolean>(false);
  const [input, setInput] = useState<string>('');
  const [letters, setLetters] = useState<Array<string>>([]);
  const [invertedLetters, setInvertedLetters] = useState<Array<string>>([]);

  let tempInverting: Array<string> = [];
  let invertEnd: Array<string> = [];
  let invertStart: Array<string> = [];

  tempInverting = Object.assign([], letters);

  let index = -1;
  const loop = () => {
    setTimeout(()=>{
      index++;
      if (index < Math.floor(letters.length/2)){
        invertStart.push(letters[index])
        tempInverting[index] = invertEnd[index];
        tempInverting[letters.length - index - 1] = invertStart[index];
        setInvertedLetters(tempInverting);
        loop();
      }
      setLoader(false)
    },1000)
  }

  const cons = (): void => {
    if (invertedLetters != letters) {
      setInvertedLetters(letters);
      setCircles(true);
      setLoader(true);
      for (let index = letters.length; index > letters.length/2; index--) {
        invertEnd.push(letters[index-1])
      }
      loop();
    }
  }

  React.useEffect(()=> {
    setLetters(Array.from(input))
  },[input])

  return (
    <SolutionLayout title="Строка">
      <div className={styles['string-block']}>
        <form className={styles['string-form']}>
          <Input extraClass={styles['string-input']} maxLength={11} isLimitText={true} onChange={event => setInput((event.target as HTMLInputElement).value)} value={input} />
          <Button text="Развернуть" onClick={cons} isLoader={loader}/>
        </form>
        {circles &&
        <div className={styles['circle-box']}>
          {invertedLetters.map((letter, index) => (
            <Circle key={index} state={letter !== tempInverting[index] ? ElementStates.Modified : ElementStates.Default} letter={letter} extraClass={`${styles.circle}`}/>
          ))}
        </div>
        }
      </div>
    </SolutionLayout>
  );
};
