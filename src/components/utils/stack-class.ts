export type TStack<T> = {
  elements: Array<T>;
  size: number;

  push: (item: T) => void;
  pop: () => void;
  peak: () => T | null;
  clean: () => void;
}

export class Stack<T> implements TStack<T> {
  private container: Array<T> = [];
  private last: T | null | undefined;

  constructor() {
    this.last = null;
  }

  get elements() {
    return this.container;
  }

  get size() {
    return this.container.length;
  }

  push = (item: T): void => {
    this.container.push(item);
    this.last = item;
  };

  pop = (): void => {
    if (this.container.length !== 0) {
      this.container.pop();
    }
  };

  peak = (): T | null => {
    if (this.container.length !== 0) {
      this.last = this.container.pop();
    }
    if (this.last !== undefined) {
      return this.last;
    } else {
      return null;
    }
  };

  clean = (): void => {
    this.container = [];
  }
}