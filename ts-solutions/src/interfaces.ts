
export class ListNode<T> {
  val: T
  next: ListNode<T> | null

  constructor(val: T) {
    this.val = val;
    this.next = null;
  }
}

