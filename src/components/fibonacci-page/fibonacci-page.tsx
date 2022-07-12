import React, { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import styles from "./fibonacci.module.css";

export const FibonacciPage: React.FC = () => {
  const [circles, setCircles] = useState<boolean>(false);
  const [loader, setLoader] = useState<boolean>(false);
  const [input, setInput] = useState<string>();
  const [fibonacci, setFibonacci] = useState<Array<number>>([1,1]);

  let fibonacciArray: Array<number> = fibonacci;

  // for (i = 2; i < n; i ++) {
  //   // Получаем i-й элемент последовательности как сумму предыдущих двух
  //   fibonacci[i] = fibonacci[i-1] + fibonacci[i-2];
  // }

  let index = 1;
  const loop = () => {
    index++;
    setTimeout(()=>{
      if (input) {
        if (index <= parseInt(input)) {
          fibonacciArray[index] = fibonacciArray[index-1] + fibonacciArray[index-2]
          setFibonacci(fibonacciArray)
        }
        loop()
      }
      if (input && index === parseInt(input)) {
        setLoader(false)
      }
    },500)
  }
  
  const clicked = (): void => {
    setLoader(true)
    fibonacciArray = [1,1]
    setCircles(true)
    loop()
  }

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
     <div className={styles['fibonacci-block']}>
        <form className={styles['fibonacci-form']}>
          <Input extraClass={styles['fibonacci-input']} type={'number'} max={19} min={1} onChange={event => setInput((event.target as HTMLInputElement).value)} value={input?? 1} />
          <Button text="Рассчитат" onClick={clicked} isLoader={loader}/>
        </form>
        {circles &&
        <div className={styles['circle-box']}>
          {fibonacciArray.map((letter, index) => (
            <Circle key={index} index={index} letter={`${letter}`} extraClass={`${styles.circle}`}/>
          ))}
        </div>
        }
      </div>
    </SolutionLayout>
  );
};
