import ListNode from "./interfaces"

function arraysEqual<T>(a: T[], b: T[]): boolean {
  if (a === b) return true
  if (a === null || b === null) return false
  if (a.length !== b.length) return false

  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return false
  }

  return true

}

(function () {
  // EXPECT is_unqiue to be true

  console.warn("\n\n\n#################################")
  console.warn("Linked Lists")
  console.warn("#################################\n\n\n")
  console.warn("*********************\n")
}())
/*
 * TODO: Singly LinkedList
 *
 * */

class SLinkedList<T> {
  head: ListNode<T> | null
  public length: number

  constructor() {
    this.head = null;
    this.length = 0;
  }

  // ######################################
  // UTIL
  // ######################################
  print(): T[] {
    var n = this.head;
    if (!n) return [];
    var out: T[] = [n.val];

    while (n.next) {
      out.push(n.next.val)
      n = n.next
    }

    return out;
  }
  // ######################################
  // UTIL
  // ######################################

  appendToTail(val: T): void {
    var end = new ListNode(val);
    this.length++;
    if (!this.head) {
      this.head = end;
      return;
    }
    var n = this.head;
    while (n.next) {
      n = n.next
    }
    n.next = end;
  }
  prepend(val: T): void {
    var head = new ListNode(val);
    if (!this.head) {
      this.head = head;
      return;
    }
    head.next = this.head;
    this.head = head;
  }

  deleteNode(d: T): T | undefined {
    if (!this.head) return;
    var n = this.head;
    if (n.val === d) {
      this.length--
      this.head = null;
      return n.val
    }

    while (n.next !== null) {
      if (n.next.val === d) {
        this.length--
        var tmp = n.next.val
        n.next = n.next.next;
        return tmp
      }
      n = n.next
    }
    return undefined;

  }

  removeDuplicates(): T[] {
    if (!this.head) return []
    var dups: T[] = []
    let n: ListNode<T> | null = this.head;
    var seen: { [key: string]: boolean } = {};

    while (n.next !== null) {
      seen[`${n.val}`] = true;
      if (seen[`${n.next.val}`]) {
        //remove dup
        dups.push(n.next.val);
        this.length--
        n.next = n.next.next
      } else {
        seen[`${n.next.val}`] = true;
        n = n.next
      }
    }

    return dups
  }

  kth_to_last(k: number): T | undefined {
    if (k > this.length || !this.head) return undefined;

    var n = this.head;
    for (let i = 0; i < this.length - k; i++) {
      if (!n.next) return undefined;
      n = n.next;
    }
    return n.val;
  }

  partition(val: T): void {
    if (!this.head) return;
    var left = new SLinkedList<T>()
    var right = new SLinkedList<T>()
    let n = this.head;
    while (n !== null) {
      if (n.val < val) left.appendToTail(n.val)
      else right.appendToTail(n.val)
      if (!n.next) break;
      n = n.next
    }

    this.head = left.head

    if (!right.head) return
    n = right.head
    while (n !== null) {
      this.appendToTail(n.val)
      if (!n.next) break;
      n = n.next
    }

  }


}

(function (): void {
  //EXPECT is_unqiue to be true
  console.warn("Testing: IMPL: singly-linked list...")

  let list = new SLinkedList<number>();
  list.appendToTail(12);
  list.appendToTail(11);
  list.appendToTail(10);
  if (!arraysEqual(list.print(), [12, 11, 10])) {
    throw new Error(`Expected \n    ${list.print()} \nto equal\n    [12, 11, 10]\nwith a length of\n    3`)
  }

  var deleted = list.deleteNode(11);
  if (!arraysEqual(list.print(), [12, 10])) {
    throw new Error(`Expected \n    ${deleted} \nto be\n    11\nwith a length of\n    2`)
  }

  list.appendToTail(11);
  list.appendToTail(12);
  list.appendToTail(11);
  list.appendToTail(10);

  if (!arraysEqual(list.print(), [12, 10, 11, 12, 11, 10])) {
    throw new Error(`Expected \n    ${list.print()} \nto equal\n    [12, 11, 10]\n`)
  }
  var dups = list.removeDuplicates()
  if (!arraysEqual(list.print(), [12, 10, 11])) {
    throw new Error(`Expected \n    ${list.print()} \nto equal\n    [12, 11, 10]\n`)
  }

  list.appendToTail(13);
  list.appendToTail(14);
  list.appendToTail(15);

  if (list.kth_to_last(2) !== 14) {
    throw new Error(`Expected \n    ${list.kth_to_last(2)} \nto equal\n    14\n`)
  }
  if (list.kth_to_last(5) !== 10) {
    throw new Error(`Expected \n    ${list.kth_to_last(2)} \nto equal\n    10\n`)
  }
  list.appendToTail(16);

  list = new SLinkedList<number>();
  list.appendToTail(20)
  list.appendToTail(21)
  list.appendToTail(22)
  list.appendToTail(13)
  list.appendToTail(12)
  list.appendToTail(11)
  list.appendToTail(10)
  console.log("PRE_PARTITION: ", list.print())
  list.partition(13)
  console.log("POST_PARTITION: ", list.print())
  var expected = [12, 11, 10, 20, 21, 22, 13]

  if (!arraysEqual(list.print(), expected)) {
    throw new Error(`Expected \n    ${list.print()} \nto equal\n    ${expected}\n`)
  }

  console.log("[singly_linked_list]: Success!\n")
  console.warn("*********************\n")

}());

/*
 * TODO: Sum Lists: You have two numbers represented by aLinked list. Where each node contains a single digit. the digits are stored in reverse order, such that the 1s digit is at the head. Wiret a functon that adds the two numbers and retuns the sum as a linked list;
 *
 * NOTE: What is you cannot use additional data structures?
 * */
function sum_lists(l1: SLinkedList<number>, l2: SLinkedList<number>): SLinkedList<number> | undefined {
  let numOne = "";
  if (!l1.head || !l2.head) return undefined
  var n1 = l1.head;
  while (n1 !== null) {
    numOne += n1.val;
    if (!n1.next) break;
    n1 = n1.next
  }
  numOne = numOne.split("").reverse().join("")
  let numTwo = "";
  var n2 = l2.head;
  while (n2 !== null) {
    numTwo += n2.val;
    if (!n2.next) break;
    n2 = n2.next
  }
  numTwo = numTwo.split("").reverse().join("")

  var intRes = +numOne + +numTwo
  var resArr = String(intRes).split("")

  var listOut = new SLinkedList<number>();
  for (let i = resArr.length - 1; i >= 0; i--) {
    listOut.appendToTail(+resArr[i]);
  }
  return listOut;
}


//
(function () {
  console.warn("Testing: sum_lists...")
  var list_one: SLinkedList<number> = new SLinkedList()
  list_one.appendToTail(7)
  list_one.appendToTail(1)
  list_one.appendToTail(6)

  var list_two: SLinkedList<number> = new SLinkedList()
  list_two.appendToTail(5)
  list_two.appendToTail(9)
  list_two.appendToTail(2)
  var expected: SLinkedList<number> = new SLinkedList()
  expected.appendToTail(2)
  expected.appendToTail(1)
  expected.appendToTail(9)

  var result = sum_lists(list_one, list_two);
  if (!result) return;
  if (!arraysEqual(expected.print(), result.print())) {
    throw new Error(`Expected \n    ${result?.print()} \nto equal\n    ${expected.print()}\n`)

  }

  // var ins = ["aabcccccaaa", "abcdefg", "tessst"]
  // var outs = ["a2b1c5a3", "abcdefg", "t1e1s3t1"]
  //
  // for (let i = 0; i < ins.length; i++) {
  //   var res = compress_string(ins[i])
  //   if (res !== outs[i]) {
  //     throw new Error(`Expected \n    ${ins[i]} \nto be \n    ${outs[i]} \nbut got \n    ${res}\n`)
  //   }
  //   // console.log(`${ins[i]} => ${outs[i]}`)
  // }

  console.log("[sum_lists]: Success!\n")
  console.warn("*********************\n")
}());

