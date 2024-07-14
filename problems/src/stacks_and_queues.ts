import { ListNode } from "./interfaces";

(function () {
  // EXPECT is_unqiue to be true

  console.warn("\n\n\n#################################")
  console.warn("Stacks and Queues!")
  console.warn("#################################\n\n\n")
  console.warn("*********************\n")
}());
/*
 * TODO: Implement a method to prerform a basic string compression using the counts of repeated characters. "aabcccccaaa" => "a2b1c5a3".
 *
 * NOTE: What is you cannot use additional data structures?
 * */

class Stack<T> {
  top: ListNode<T> | null
  length: number

  constructor() {
    this.top = null;
    this.length = 0
  }

  pop(): T | undefined {
    if (!this.top) return;
    this.length--;
    var out = this.top.val;
    this.top = this.top.next || null
    return out;
  }

  push(item: T): void {
    var top = new ListNode(item)
    this.length++
    if (!this.top) {
      this.top = top;
      return;
    }
    top.next = this.top;
    this.top = top;
    return;

  }

  peek(): T | undefined {
    return this.top?.val || undefined
  }

  isEmpty(): boolean | undefined {
    return this.top === null
    // return this.length >= 1
  }

  print(): T[] {
    var out = []
    if (!this.top) return []
    var n = this.top;
    while (n !== null) {
      out.push(n.val);
      if (!n.next) break;
      n = n.next
    }
    return out;
  }


}

(function () {

  console.warn("Testing: stack impl...")

  var stack = new Stack();
  stack.push(5)
  if (stack.peek() !== 5) {
    throw new Error(`Expected \n    ${stack.peek()} \nto be \n    ${5} \n`)
  }
  var pop = stack.pop();
  if (pop !== 5) {
    throw new Error(`Expected \n    ${pop} \nto be \n    ${5} \n`)
  }
  if (!stack.isEmpty()) {
    throw new Error(`Expected \n    ${stack.isEmpty()} \nto be \n    ${true} \n`)
  }
  stack.push(5)
  stack.push(10)
  stack.push(15)
  if (stack.length !== 3) {
    throw new Error(`Expected \n    stack.length \nto be \n    ${3}\nbut got\n     ${stack.length}`)
  }

  stack.pop();
  if (stack.peek() !== 10) {
    throw new Error(`Expected \n    ${stack.peek()} \nto be \n    ${15}\n`)
  }
  stack.pop();
  if (stack.peek() !== 5) {
    throw new Error(`Expected \n    ${stack.peek()} \nto be \n    ${15}\n`)
  }
  stack.pop();
  if (stack.peek() || stack.length) {
    throw new Error(`Expected \n    ${stack.peek()} \nto be \n    ${undefined}\n`)
  }



  console.log("[stack impl]: Success!\n")
  console.warn("*********************\n")

}())

