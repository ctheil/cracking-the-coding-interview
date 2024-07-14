# Layout:

Each section of the book gets its own file in `./src`.

For the most part, each problem starts with a commented section defining the problem. For class based problems, the solutions are built into the class definition.
The commented explanation will look like this:


```/*
 * TODO: Implement an algorythm to determine if a string has all unique characters. 
 *
 * NOTE: What is you cannot use additional data structures?
 * */
```

The solution will likely look like this: 
```ts
function is_unqiue(str: string): boolean {
  ...
}
```

## Tests:
Tests for each problem (or the class as a whole) exist in self-calling functions laid out like so:
```ts
(function () {
  // EXPECT is_unqiue to be true
  console.warn("Testing: is_unique...")
  var trueStr = "abcdefg"
  var falseStr = "racecar";

  if (!is_unqiue(trueStr)) {
    throw new Error(`Expected ${trueStr} to be true`)
  }
  if (is_unqiue(falseStr)) {
    throw new Error(`Expected ${falseStr} to be false`)
  }

  console.log("[is_unique]: Success!\n")
  console.warn("*********************\n")
}())
```
These tests will throw an error if they fail, otherwise they will log and allow the next solution's tests to execute.
