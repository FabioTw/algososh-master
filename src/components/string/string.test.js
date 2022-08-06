import { render, getByTestId, fireEvent, waitFor, cleanup} from '@testing-library/react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { DELAY_IN_MS } from '../../constants/delays';
import { setTimer } from '../utils/utils';
import { StringComponent } from './string';

jest.setTimeout(100000)
afterEach(cleanup)

describe('Разворот строки', ()=> {
  it("Разворот строки с нечетным кол-вом работает без ошибок", async () => {
    const testWord = 'HELLO'
    const { container } = render(<BrowserRouter><StringComponent /></BrowserRouter>);
    const inputField = getByTestId(container, "input");
    const reverseButton = getByTestId(container, "submit");
    fireEvent.change(inputField, {target: {value: testWord}})
    fireEvent.click(reverseButton);
    await waitFor(()=> 
        expect(getByTestId(container, "circle").textContent).toBe("OLLEH"), {
        timeout: (DELAY_IN_MS*testWord.split('').length*2)
      }
    )
  }); 

  it("Разворот строки с четным кол-вом работает без ошибок", async () => {
    const testWord = 'HELL'
    const { container } = render(<BrowserRouter><StringComponent /></BrowserRouter>);
    const inputField = getByTestId(container, "input");
    const reverseButton = getByTestId(container, "submit");
    fireEvent.change(inputField, {target: {value: testWord}})
    fireEvent.click(reverseButton);
    await waitFor(()=> 
        expect(getByTestId(container, "circle").textContent).toBe("LLEH"), {
        timeout: (DELAY_IN_MS*testWord.split('').length*2)
      }
    )
  }); 

  it("Разворот строки с одним симвлом работает без ошибок", async () => {
    const testWord = 'H'
    const { container } = render(<BrowserRouter><StringComponent /></BrowserRouter>);
    const inputField = getByTestId(container, "input");
    const reverseButton = getByTestId(container, "submit");
    fireEvent.change(inputField, {target: {value: testWord}})
    fireEvent.click(reverseButton);
    
    await waitFor(()=> 
        expect(getByTestId(container, "circle").textContent).toBe("H"), {
        timeout: (DELAY_IN_MS*testWord.split('').length*2)
      }
    )
  }); 

  it("Разворот строки без символа работает без ошибок", async () => {
    const testWord = ''
    const { container } = render(<BrowserRouter><StringComponent /></BrowserRouter>);
    const inputField = getByTestId(container, "input");
    const reverseButton = getByTestId(container, "submit");
    fireEvent.change(inputField, {target: {value: testWord}})

    expect(reverseButton).toBeDisabled;
  });
})
