import React, { useState } from "react";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import styles from "./list.module.css";
import { ElementStates } from "../../types/element-states";
import { DELAY_IN_MS } from "../../constants/delays";
import { LinkedList } from "../utils/list-class";
import { generateArray, setTimer } from "../utils/utils";

export const ListPage: React.FC = () => {
  interface IList {
    element: string | number,
    color: ElementStates,
  }

  const [input, setInput] = useState<string>('');
  const [enteredIndex, setIndex] = useState<string>('');

  const [letters, setLetters] = useState<Array<string>>([]);
  const [list] = useState<LinkedList<any>>(new LinkedList());
  const [listArray, setListArray] = useState<Array<IList>>([]);

  const [isNeedCircleTop, setIsNeedCircleTop] = useState<boolean>(false);
  const [isNeedCircleBottom, setIsNeedCircleBottom] = useState<boolean>(false);
  const [indexToRenderCirclesTop, setIndexToRenderCirclesTop] = useState<number>(0);
  const [indexToRenderCirclesBottom, setIndexToRenderCirclesBottom] = useState<number>(0);
  const [symbolForSmallCircle, setSymbolForSmallCircle] = useState<string>();

  const [addHeadButtonLoader, setAddHeadButtonLoader] = useState<boolean>(false);
  const [addTailButtonLoader, setAddTailButtonLoader] = useState<boolean>(false);
  const [deleteHeadButtonLoader, setDeleteHeadButtonLoader] = useState<boolean>(false);
  const [deleteTailButtonLoader, setDeleteTailButtonLoader] = useState<boolean>(false);

  const [addByIndexButtonLoader, setAddByIndexButtonLoader] = useState<boolean>(false);
  const [deleteByIndexButtonLoader, setDeleteByIndexButtonLoader] = useState<boolean>(false);

  const transformArray = (arr: string[]| number[]): IList[] => {
    return arr.map(element => {
      return {element: element, color: ElementStates.Default}
    })
  }

  const addElementToHead = async () => {
    setAddHeadButtonLoader(true);
    setIndexToRenderCirclesTop(0);

    await setIsSmallCircleRender("top");

    list.prepend(input);

    await changeSymbolStatus(transformArray(list.toArray()), ElementStates.Modified, 0, false);
    await changeSymbolStatus(transformArray(list.toArray()), ElementStates.Default, 0, true);

    setAddHeadButtonLoader(false);
    setInput('');
    setIndex('');
  }

  const addElementToTail = async () => {
    setAddTailButtonLoader(true);

    setIndexToRenderCirclesTop(list.toArray().length - 1);
    await setIsSmallCircleRender("top");

    list.append(input);

    await changeSymbolStatus(
      transformArray(list.toArray()),
      ElementStates.Modified, list.toArray().length - 1, false
      );
    await changeSymbolStatus(
      transformArray(list.toArray()),
      ElementStates.Default, list.toArray().length - 1, true
      );

    setAddTailButtonLoader(false);
    setInput('');
    setIndex('');
  }

  const deleteElementFromHead = async () => {
    setDeleteHeadButtonLoader(true);
    setIndexToRenderCirclesBottom(0);

    await changeCircleToEmpty(transformArray(list.toArray()), 0, true, true);

    list.deleteHead();

    setIsNeedCircleBottom(false);
    await changeCircleToEmpty(transformArray(list.toArray()), 0, false, false);

    setDeleteHeadButtonLoader(false);
  }

  const deleteElementFromTail = async () => {
    setDeleteTailButtonLoader(true);
    setIndexToRenderCirclesBottom(list.toArray().length - 1);

    await changeCircleToEmpty(transformArray(list.toArray()), list.toArray().length - 1, true, true);

    list.deleteTail();
    setIsNeedCircleBottom(false);

    await changeCircleToEmpty(transformArray(list.toArray()), list.toArray().length - 1, false, false);
    setDeleteTailButtonLoader(false);
  }

  const addElementByIndex = async () => {
    let index = parseInt(enteredIndex);

    if (index >= 0 && index <= list.toArray().length - 1) {
      setAddByIndexButtonLoader(true);
    }

    await changeEachCircleRendering(transformArray(list.toArray()), index);

    list.addByIndex(input, index);

    await changeSymbolStatus(transformArray(list.toArray()), ElementStates.Modified, index, false);
    await changeSymbolStatus(transformArray(list.toArray()), ElementStates.Default, index, true);

    setAddByIndexButtonLoader(false);
    setInput('');
    setIndex('');
  }

  const deleteElementByIndex = async () => {
    let index = parseInt(enteredIndex);

    if (index >= 0 && index <= list.toArray().length - 1) {
      setDeleteByIndexButtonLoader(true);
    }

    setIndexToRenderCirclesBottom(index);

    await changeEachSymbolRendering(transformArray(list.toArray()), index);
    await changeCircleToEmpty(transformArray(list.toArray()), index, true, true);

    if (index === 0) {
      list.deleteHead();
    } else {
      list.deleteByIndex(index);
    }

    setIsNeedCircleBottom(false);
    await changeCircleToEmpty(transformArray(list.toArray()), index, false, false);
    setDeleteByIndexButtonLoader(false);
    setIndex('');
  }

  React.useEffect(()=> {
    let standartArray = generateArray(5, 2, 99);
    for (let index = 0; index < standartArray.length; index++) {
      list.append(standartArray[index]);
    }
    setListArray(transformArray(standartArray))
  },[list])

  const changeSymbolStatus = async (arr: IList[], color: ElementStates, currIndex: number, isAsync: boolean) => {
    if (isAsync) {
      await setTimer(DELAY_IN_MS);
    } if (currIndex < 0 || currIndex >= arr.length) {
      return;
    } if (color) {
      arr[currIndex].color = color;
    }
    setListArray([...arr]);
  }

  const setIsSmallCircleRender = async (position: "top" | "bottom") => {
    if (position === "top") {
      setIsNeedCircleTop(true);
      await setTimer(DELAY_IN_MS);
      setIsNeedCircleTop(false);
    } else if (position === "bottom") {
      setIsNeedCircleBottom(true);
      await setTimer(DELAY_IN_MS);
      setIsNeedCircleBottom(false);
    } else {
      throw new Error("position is incorrect");
    }
  }

  const renderSmallCircleBeforeDelete = async (arr: IList[], index: number, isEmptyCircle: boolean) => {
    if (isEmptyCircle) {
      setIsNeedCircleBottom(true);
      setSymbolForSmallCircle(arr[index].element.toString());
      arr[index].element = '';
      setListArray([...arr]);
    }
  }

  const changeCircleToEmpty = async (arr: IList[], index: number, isEmptyCircle: boolean, isAsync: boolean) => {
    await renderSmallCircleBeforeDelete(arr, index, isEmptyCircle);
    if (isAsync) {
      await setTimer(DELAY_IN_MS);
    }
    setListArray([...arr]);
  }

  const changeEachCircleRendering = async (arr: IList[], index: number) => {
    setIsNeedCircleTop(true);
    let i = 0;
    while (i <= index && index < arr.length) {
      setIndexToRenderCirclesTop(i);
      if (i !== 0) {
        await changeSymbolStatus(arr, ElementStates.Changing, i - 1, false);
      }
      await setTimer(DELAY_IN_MS);
      i++;
    }
    setIsNeedCircleTop(false);
  }

  const changeEachSymbolRendering = async (arr: IList[], index: number) => {
    let i = 0;
    while (i <= index && index < arr.length) {
      await changeSymbolStatus(arr, ElementStates.Changing, i, true);
      ++i;
    }
  }

  const renderSmallCircles = (position: "top" | "bottom", keyInd: number, element?: string) => {
    return (
      <>
        {
          position === "top" ? 
            <div className={styles['small-circle-top']}>
              {
                <Circle extraClass={styles['small-circle']} key={'top' + keyInd} state={ElementStates.Changing} letter={input} isSmall={true}/>
              }
            </div> 
            : 
            <div className={styles['small-circle-bottom']}>
              {
                <Circle extraClass={styles['small-circle']} key={'bottom' + keyInd} state={ElementStates.Changing} 
                  letter={element} isSmall={true}/>
              }
            </div>
        }
      </>
    )
  }

  const renderCircles = () => {
    let circlesContainer: Array<any> = [];
    for (let i = 0; i < listArray.length; i++) {
      circlesContainer.push(
        <div key={i} className={styles['circle-box']}>
          <div className={styles.circles}>
            {
              isNeedCircleTop && i === indexToRenderCirclesTop &&
              renderSmallCircles("top", i)
            }
            {
              i === 0 && listArray.length === 1 ? 
                <Circle state={listArray[i].color} letter={listArray[i].element.toString()} index={i} head="head" tail="tail"/> : 
                i === 0 ? 
                  <Circle state={listArray[i].color} letter={listArray[i].element.toString()} index={i} head="head"/> : 
                  i === listArray.length - 1 ? 
                    <Circle state={listArray[i].color} letter={listArray[i].element.toString()} index={i} tail="tail"/> : 
                    <Circle state={listArray[i].color} letter={listArray[i].element.toString()} index={i}/>
            }
            {
              isNeedCircleBottom && i === indexToRenderCirclesBottom &&
              renderSmallCircles("bottom", i, symbolForSmallCircle)
            }
          </div>
          {
            i !== listArray.length - 1 &&
            <ArrowIcon/>
          }
        </div>
      )
    }
    return circlesContainer;
  }
  
  return (
    <SolutionLayout title="Связный список">
      <div className={styles['list-block']}>
        <form className={styles['list-form']} onSubmit={(e) => e.preventDefault()}>
          <div className={styles['list-elements']}>
            <Input
              extraClass={styles.inputs}
              disabled={
                addHeadButtonLoader ||
                addTailButtonLoader ||
                deleteHeadButtonLoader ||
                deleteTailButtonLoader ||
                addByIndexButtonLoader ||
                deleteByIndexButtonLoader ||
                list.size >= 6
              }
              maxLength={4}
              isLimitText={true}
              placeholder="Введите значение"
              onChange={event => setInput((event.target as HTMLInputElement).value)}
              value={input} />
            <Button 
              extraClass={styles['edit-button']} 
              disabled={
                addTailButtonLoader || 
                deleteHeadButtonLoader || 
                deleteTailButtonLoader ||
                addByIndexButtonLoader || 
                deleteByIndexButtonLoader || 
                input === '' ||
                list.size >= 6
              } 
              isLoader={addHeadButtonLoader} 
              text="Добавить в head" 
              onClick={addElementToHead} />
            <Button 
              extraClass={styles['edit-button']}
              disabled={
                addHeadButtonLoader || 
                deleteHeadButtonLoader || 
                deleteTailButtonLoader || 
                addByIndexButtonLoader || 
                deleteByIndexButtonLoader || 
                input === '' ||
                list.size >= 6
              } 
              isLoader={addTailButtonLoader} 
              text="Добавить в tail" 
              onClick={addElementToTail}/>
            <Button
              extraClass={styles['edit-button']}
              disabled={
                addHeadButtonLoader ||
                addTailButtonLoader ||
                deleteTailButtonLoader ||
                addByIndexButtonLoader ||
                deleteByIndexButtonLoader || 
                list.size === 0
              }
              isLoader={deleteHeadButtonLoader}
              text="Удалить из head"
              onClick={deleteElementFromHead}/>
            <Button
              extraClass={styles['edit-button']}
              disabled={
                addHeadButtonLoader ||
                addTailButtonLoader ||
                deleteHeadButtonLoader ||
                addByIndexButtonLoader ||
                deleteByIndexButtonLoader || 
                list.size === 0
              }
              isLoader={deleteTailButtonLoader}
              text="Удалить из tail"
              onClick={deleteElementFromTail}/>
          </div>
          <div className={styles['list-elements']}>
            <Input
              extraClass={styles.inputs}
              disabled={
                addHeadButtonLoader ||
                addTailButtonLoader ||
                deleteHeadButtonLoader ||
                deleteTailButtonLoader ||
                addByIndexButtonLoader ||
                deleteByIndexButtonLoader
              }
              maxLength={1}
              type={'number'}
              max={5} min={0}
              placeholder="Введите индекс"
              onChange={event => setIndex((event.target as HTMLInputElement).value)}
              value={enteredIndex}/>
            <Button
              extraClass={styles['index-button']}
              disabled={
                addHeadButtonLoader ||
                addTailButtonLoader ||
                deleteHeadButtonLoader ||
                deleteTailButtonLoader ||
                deleteByIndexButtonLoader ||
                enteredIndex === '' ||
                input === '' ||
                list.size >= 6
              }
              isLoader={addByIndexButtonLoader}
              text="Добавить по индексу"
              onClick={addElementByIndex} />
            <Button
              extraClass={styles['index-button']}
              disabled={
                addHeadButtonLoader ||
                addTailButtonLoader ||
                deleteHeadButtonLoader ||
                deleteTailButtonLoader ||
                addByIndexButtonLoader ||
                enteredIndex === '' ||
                list.size === 0
              }
              isLoader={deleteByIndexButtonLoader}
              text="Удалить по индексу"
              onClick={deleteElementByIndex}/>
          </div>
        </form>
        <div className={styles['circle-box']}>
          {
            renderCircles()
          }
        </div>
      </div>
    </SolutionLayout>
  );
};
