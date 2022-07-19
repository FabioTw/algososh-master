export type TQueue<T> = {
  head: { value: T | null, index: number };
  tail: { value: T | null, index: number };
  elements: Array<T | null>;
  isEmpty: boolean;

  enqueue: (item: T) => void;
  dequeue: () => void;
  peak: () => T | null;
}

export class Queue<T> implements TQueue<T> {
  private container: Array<T | null>;
  private _head: number = 0;
  private _tail: number = 0;
  private readonly size: number = 0;
  length: number = 0;

  constructor(size: number) {
    this.size = size;
    this.container = new Array(size);
  }

  get isEmpty() {
    return this.length === 0
  }

  get elements() {
    return this.container
  }

  get head() {
    return ({
      value: this.container[this._head],
      index: this._head
    })
  }

  get tail() {
    return {
      value: this.container[this._tail],
      index: this._tail
    }
  }

  enqueue = (item: T) => {
    if (this.length >= this.size) {
      throw new Error("Maximum length exceeded");
    }
    this.container[this._tail] = item;
    this._tail !== this.size ? this._tail++ : this._tail = this.size
    this.length++;
  };

  dequeue = () => {
    if (this.isEmpty) {
      throw new Error("No elements in the queue");
    }
    this.container[this._head] = null;
    this.length--;
    this._head !== this.size ? this._head++: this._head = this.size-1;
  };

  peak = (): T | null => {
    if (this.isEmpty) {
      throw new Error("No elements in the queue");
    } 
    return this.container[this._head]
  };

  clean = (): void => {
    this.container = Array(this.size);
    this._head = 0;
    this._tail = 0;
    this.length = 0;
  }
}