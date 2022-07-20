import React, { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Column } from "../ui/column/column";
import styles from "./sorting.module.css";
import { Button } from "../ui/button/button";
import { Direction } from "../../types/direction";
import { ElementStates } from "../../types/element-states";
import {SHORT_DELAY_IN_MS} from "../../constants/delays";
import { generateArray, setTimer } from "../utils/utils";

export const SortingPage: React.FC = () => {
  interface IColumn {
    number: number,
    color: ElementStates
  }

  let columArray: Array<IColumn> = [] 

  const [array, setArray] = useState<Array<number>>(generateArray(18, 3, 100));
  const [finalArray, setFinalArray] = useState<Array<IColumn>>([])
  const [checkedChoice, setCheckedChoice] = useState<boolean>(true);
  const [ascendingSort, setAscendingSort] = useState<boolean>(false);
  const [descendingSort, setDescendingSort] = useState<boolean>(false);

  const generateRandomArray = () => {
    setArray(generateArray(18, 3, 100))
  }

  const changeStatus = async (timer:boolean, arr: Array<IColumn>, color: ElementStates, firstIndex: number, secondIndex?: number) => {
    timer && await setTimer(SHORT_DELAY_IN_MS);
    arr[firstIndex].color = color;
    if (secondIndex) {
      arr[secondIndex].color = color;
    }
    setFinalArray([...arr])
  };

  const selectionSort = async (arr: Array<IColumn>, isAscending: boolean) => {
    for (let index = 0, len = arr.length, k = len - 1; index < k; index++) {
      let indexMin = index;
      await changeStatus(true, arr, ElementStates.Changing, indexMin)
      for (let j = index + 1; j < len; j++) {
        changeStatus(false, arr, ElementStates.Changing, j);
        if (isAscending ? arr[indexMin].number > arr[j].number : arr[indexMin].number < arr[j].number) {
          indexMin = j;
        }
        await changeStatus(true, arr, ElementStates.Default, j)
      }
      if (indexMin !== index) {
          [arr[index], arr[indexMin]] = [arr[indexMin], arr[index]];
          changeStatus(false, arr, ElementStates.Default, indexMin)
      }
      changeStatus(false, arr, ElementStates.Modified, index)
    }
    changeStatus(false, arr, ElementStates.Modified, arr.length - 1)
    isAscending ? setAscendingSort(false) : setDescendingSort(false);
  };

  const bubbleSort = async (arr: Array<IColumn>, isAscending: boolean) => {
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        changeStatus(false, arr, ElementStates.Changing, j, j+1)
        if (isAscending ? arr[j].number > arr[j + 1].number : arr[j].number < arr[j + 1].number) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        }
        await changeStatus(true, arr, ElementStates.Default, j, j+1)
        changeStatus(false, arr, ElementStates.Modified, j+1)
      }
      changeStatus(false, arr, ElementStates.Modified, 0)
    }
    isAscending ? setAscendingSort(false) : setDescendingSort(false);
  } 

  React.useEffect(()=>{
    Array.from(array, item => columArray.push({number:item, color:ElementStates.Default}))
    setFinalArray(columArray)
  },[array])

  const ascendingSorting = () => {
    setAscendingSort(true);
    setDescendingSort(false);
    checkedChoice ? 
      selectionSort(finalArray, true) :
      bubbleSort(finalArray, true)
  }
  
  const descendingSorting = () => {
    setAscendingSort(false);
    setDescendingSort(true);
    checkedChoice ? 
      selectionSort(finalArray, false) :
      bubbleSort(finalArray, false)
  }

  const selectRadioChoice = () => {
    setCheckedChoice(true)
  }

  const selectRadioBubble = () => {
    setCheckedChoice(false)
  }

  return (
    <SolutionLayout title="Сортировка массива">
      <div className={styles['sorting-block']}>
        <form className={styles['sorting-form']}>
          <div className={styles['sorting-radios']}>
            <RadioInput extraClass={styles['radio']} onChange={selectRadioChoice} checked={checkedChoice} label="Выбор"/>
            <RadioInput extraClass={styles['radio']} onChange={selectRadioBubble} checked={!checkedChoice} label="Пузырек"/>
          </div>
          <Button disabled={descendingSort} isLoader={ascendingSort} sorting={Direction.Ascending} extraClass={styles['sort-button']} text="По возрастанию" onClick={ascendingSorting} />
          <Button disabled={ascendingSort} isLoader={descendingSort} sorting={Direction.Descending} extraClass={styles['sort-button']} text="По убыванию" onClick={descendingSorting}/>
          <Button disabled={ascendingSort || descendingSort} extraClass={styles['generate-button']} text="Новый массив" onClick={generateRandomArray}/>
        </form>
        <div className={styles['column-box']}>
          {finalArray.map((column, index) => (
            <Column extraClass={styles['sorting-column']} key={index} index={column.number} state={column.color}/>
          ))}
        </div>
      </div>
    </SolutionLayout>
  );
};
