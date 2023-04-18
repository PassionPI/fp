/**
 * @description 链表节点
 */
class LinkNode<T> {
  value: T;
  next: null | LinkNode<T> = null;

  constructor(value: T) {
    this.value = value;
  }
}
/**
 * @description 链表
 */
class LinkList<T> {
  #head: null | LinkNode<T> = null;
  #last: null | LinkNode<T> = null;
  #size = 0;

  size() {
    return this.#size;
  }

  clear() {
    this.#head = null;
    this.#last = null;
    this.#size = 0;
  }

  shift(): undefined | T {
    const head = this.#head;
    if (this.#size) {
      this.#head = head!.next;
      this.#size--;
    }
    if (!this.#size) {
      this.#head = null;
      this.#last = null;
    }
    return head?.value;
  }

  push(value: T): void {
    const last = new LinkNode(value);
    if (this.#size) {
      this.#last!.next = last;
      this.#last! = last;
    } else {
      this.#head! = last;
      this.#last! = last;
    }
    this.#size++;
  }
}

/**
 *
 * @description 并发控制函数
 *
 * 1、是否有空闲
 * 2、数量池
 * 3、排队等待
 */
type Task<T> = () => Promise<T>;

type TaskItem<T> = {
  task: Task<T>;
  resolve: (value: T) => void;
  reject: (reason?: unknown) => void;
};

export class Concurrent {
  #max_concurrency: number;
  #current_count = 0;
  #queue = new LinkList<TaskItem<any>>();

  static of(...args: ConstructorParameters<typeof Concurrent>) {
    return new Concurrent(...args);
  }

  constructor(config?: { max_concurrency?: number }) {
    const { max_concurrency } = config || {};
    this.#max_concurrency = max_concurrency ?? 2;
  }

  add = <T>(task: Task<T>): Promise<T> => {
    return new Promise((resolve, reject) => {
      this.#queue.push({
        task,
        resolve,
        reject,
      });
      this.#next();
    });
  };

  busy = (): boolean => {
    return this.#current_count === this.#max_concurrency;
  };

  clear = (): void => {
    this.#queue.clear();
  };

  #next = (): void => {
    while (!this.busy() && this.#queue.size() > 0) {
      const { task, reject, resolve } = this.#queue.shift()!;
      this.#current_count++;
      Promise.resolve()
        .then(task)
        .then(resolve)
        .catch(reject)
        .finally(() => {
          this.#current_count--;
          this.#next();
        });
    }
  };
}
