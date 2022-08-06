import { render, getByTestId, fireEvent, waitFor, cleanup } from '@testing-library/react';
import { BrowserRouter } from "react-router-dom";
import { DELAY_IN_MS } from '../../constants/delays';
import { SortingPage } from './sorting-page';

jest.setTimeout(100000)
afterEach(cleanup)

describe('Сортировка нескольких элементов', ()=> {
  it("Сортировка массива по возрастанию пузырьком работает без ошибок", async () => {
    const standartArray = [14, 3, 9]
    const { container } = render(<BrowserRouter><SortingPage standartArray={standartArray} /></BrowserRouter>);
    const selectBubble = getByTestId(container, "bubble");
    const ascendingSort = getByTestId(container, "ascending");
    
    fireEvent.click(selectBubble);
    fireEvent.click(ascendingSort);
    
    await waitFor(()=> 
        expect(getByTestId(container, "collumns").textContent).toBe("3914"), {
        timeout: (DELAY_IN_MS*standartArray.length*2)
      }
    )
  }); 

  it("Сортировка массива по убыванию пузырьком работает без ошибок", async () => {
    const standartArray = [14, 32, 9]
    const { container } = render(<BrowserRouter><SortingPage standartArray={standartArray} /></BrowserRouter>);
    const selectBubble = getByTestId(container, "bubble");
    const descendingSort = getByTestId(container, "descending");
    
    fireEvent.click(selectBubble);
    fireEvent.click(descendingSort);
    
    await waitFor(()=> 
        expect(getByTestId(container, "collumns").textContent).toBe("32149"), {
        timeout: (DELAY_IN_MS*standartArray.length*2)
      }
    )
  }); 

  it("Сортировка массива по возрастанию выбором работает без ошибок", async () => {
    const standartArray = [14, 32, 9]
    const { container } = render(<BrowserRouter><SortingPage standartArray={standartArray} /></BrowserRouter>);
    const selectChoice = getByTestId(container, "choice");
    const ascendingSort = getByTestId(container, "ascending");
    
    fireEvent.click(selectChoice);
    fireEvent.click(ascendingSort);
    
    await waitFor(()=> 
        expect(getByTestId(container, "collumns").textContent).toBe("91432"), {
        timeout: (DELAY_IN_MS*standartArray.length*2)
      }
    )
  }); 

  it("Сортировка массива по убыванию выбором работает без ошибок", async () => {
    const standartArray = [14, 32, 9]
    const { container } = render(<BrowserRouter><SortingPage standartArray={standartArray} /></BrowserRouter>);
    const selectChoice = getByTestId(container, "choice");
    const descendingSort = getByTestId(container, "descending");
    
    fireEvent.click(selectChoice);
    fireEvent.click(descendingSort);
    
    await waitFor(()=> 
        expect(getByTestId(container, "collumns").textContent).toBe("32149"), {
        timeout: (DELAY_IN_MS*standartArray.length*2)
      }
    )
  }); 
});

describe('Сортировка 1 элемент', ()=> {
  it("Сортировка массива по возрастанию пузырьком работает без ошибок", async () => {
    const standartArray = [14]
    const { container } = render(<BrowserRouter><SortingPage standartArray={standartArray} /></BrowserRouter>);
    const selectBubble = getByTestId(container, "bubble");
    const ascendingSort = getByTestId(container, "ascending");
    
    fireEvent.click(selectBubble);
    fireEvent.click(ascendingSort);
    
    await waitFor(()=> 
        expect(getByTestId(container, "collumns").textContent).toBe("14"), {
        timeout: (DELAY_IN_MS*standartArray.length*2)
      }
    )
  }); 

  it("Сортировка массива по убыванию пузырьком работает без ошибок", async () => {
    const standartArray = [14]
    const { container } = render(<BrowserRouter><SortingPage standartArray={standartArray} /></BrowserRouter>);
    const selectBubble = getByTestId(container, "bubble");
    const descendingSort = getByTestId(container, "descending");
    
    fireEvent.click(selectBubble);
    fireEvent.click(descendingSort);
    
    await waitFor(()=> 
        expect(getByTestId(container, "collumns").textContent).toBe("14"), {
        timeout: (DELAY_IN_MS*standartArray.length*2)
      }
    )
  }); 

  it("Сортировка массива по возрастанию выбором работает без ошибок", async () => {
    const standartArray = [14]
    const { container } = render(<BrowserRouter><SortingPage standartArray={standartArray} /></BrowserRouter>);
    const selectChoice = getByTestId(container, "choice");
    const ascendingSort = getByTestId(container, "ascending");
    
    fireEvent.click(selectChoice);
    fireEvent.click(ascendingSort);
    
    await waitFor(()=> 
        expect(getByTestId(container, "collumns").textContent).toBe("14"), {
        timeout: (DELAY_IN_MS*standartArray.length*2)
      }
    )
  }); 

  it("Сортировка массива по убыванию выбором работает без ошибок", async () => {
    const standartArray = [32]
    const { container } = render(<BrowserRouter><SortingPage standartArray={standartArray} /></BrowserRouter>);
    const selectChoice = getByTestId(container, "choice");
    const descendingSort = getByTestId(container, "descending");
    
    fireEvent.click(selectChoice);
    fireEvent.click(descendingSort);
    
    await waitFor(()=> 
        expect(getByTestId(container, "collumns").textContent).toBe("32"), {
        timeout: (DELAY_IN_MS*standartArray.length*2)
      }
    )
  }); 
});

describe('Сортировка пустого массива', ()=> {
  it("Сортировка массива по возрастанию пузырьком работает без ошибок", async () => {
    const standartArray = []
    const { container } = render(<BrowserRouter><SortingPage standartArray={standartArray} /></BrowserRouter>);
    const selectBubble = getByTestId(container, "bubble");
    const ascendingSort = getByTestId(container, "ascending");
    
    fireEvent.click(selectBubble);
    fireEvent.click(ascendingSort);
    
    await waitFor(()=> 
        expect(getByTestId(container, "collumns").textContent).toBe(""), {
        timeout: (DELAY_IN_MS*standartArray.length*2)
      }
    )
  }); 

  it("Сортировка массива по убыванию пузырьком работает без ошибок", async () => {
    const standartArray = []
    const { container } = render(<BrowserRouter><SortingPage standartArray={standartArray} /></BrowserRouter>);
    const selectBubble = getByTestId(container, "bubble");
    const descendingSort = getByTestId(container, "descending");
    
    fireEvent.click(selectBubble);
    fireEvent.click(descendingSort);
    
    await waitFor(()=> 
        expect(getByTestId(container, "collumns").textContent).toBe(""), {
        timeout: (DELAY_IN_MS*standartArray.length*2)
      }
    )
  }); 

  it("Сортировка массива по возрастанию выбором работает без ошибок", async () => {
    const standartArray = []
    const { container } = render(<BrowserRouter><SortingPage standartArray={standartArray} /></BrowserRouter>);
    const selectChoice = getByTestId(container, "choice");
    const ascendingSort = getByTestId(container, "ascending");
    
    fireEvent.click(selectChoice);
    fireEvent.click(ascendingSort);
    
    await waitFor(()=> 
        expect(getByTestId(container, "collumns").textContent).toBe(""), {
        timeout: (DELAY_IN_MS*standartArray.length*2)
      }
    )
  }); 

  it("Сортировка массива по убыванию выбором работает без ошибок", async () => {
    const standartArray = []
    const { container } = render(<BrowserRouter><SortingPage standartArray={standartArray} /></BrowserRouter>);
    const selectChoice = getByTestId(container, "choice");
    const descendingSort = getByTestId(container, "descending");
    
    fireEvent.click(selectChoice);
    fireEvent.click(descendingSort);
    
    await waitFor(()=> 
        expect(getByTestId(container, "collumns").textContent).toBe(""), {
        timeout: (DELAY_IN_MS*standartArray.length*2)
      }
    )
  }); 
});