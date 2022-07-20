import React, { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import styles from "./fibonacci.module.css";
import { setTimer } from "../utils/utils";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";

export const FibonacciPage: React.FC = () => {
  const [circles, setCircles] = useState<boolean>(false);
  const [loader, setLoader] = useState<boolean>(false);
  const [input, setInput] = useState<string>('');
  const [fibonacci, setFibonacci] = useState<Array<number>>([]);

  let fibonacciArray: Array<number> ;

  const fib = (n:number) => {
    let array: number[] = [1,1];
    for (let i = 2; i <= n; i ++) {
      array.push(array[i-1] + array[i-2]);
    }
    return array;
  }
  
  const fibonacciRender = async () => {
    setFibonacci([]);
    if (input) {
      fibonacciArray = fib(parseInt(input));
      for (let index = 0; index <= parseInt(input); index++) {
        await setTimer(SHORT_DELAY_IN_MS);
        setFibonacci(fibonacciArray.slice(0, index + 1));
      }
    }
    setLoader(false)
  }
  
  const clicked = (): void => {
    setLoader(true);
    setCircles(true);
    fibonacciRender();
  }

  React.useEffect(()=> {
    if (parseInt(input) >= 20) {
      setInput('19')
    } else if ((parseInt(input) < 0)) {
      setInput('0')
    }
  },[input])

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
     <div className={styles['fibonacci-block']}>
        <form className={styles['fibonacci-form']} onSubmit={(e) => e.preventDefault()}>
          <Input disabled={loader} extraClass={styles['fibonacci-input']} type={'number'} isLimitText={true} maxLength={2} max={19} min={1} onChange={event => setInput((event.target as HTMLInputElement).value)} value={input} />
          <Button text="Рассчитать" disabled={input === ''} onClick={clicked} isLoader={loader}/>
        </form>
        {circles &&
        <div className={styles['circle-box']}>
          {fibonacci.map((letter, index) => (
            <Circle key={index} index={index} letter={`${letter}`} extraClass={`${styles.circle}`}/>
          ))}
        </div>
        }
      </div>
    </SolutionLayout>
  );
};
