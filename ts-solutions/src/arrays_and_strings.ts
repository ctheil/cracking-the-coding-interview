(function () {
  // EXPECT is_unqiue to be true

  console.warn("\n\n\n#################################")
  console.warn("String: Arrays and Strings Tests!")
  console.warn("#################################\n\n\n")
  console.warn("*********************\n")
}())
/*
 * TODO: Implement an algorythm to determine if a string has all unique characters. 
 *
 * NOTE: What is you cannot use additional data structures?
 * */
function is_unqiue(str: string): boolean {
  // WITHR ADD DS
  var seen: { [key: string]: boolean } = {}
  var is_uq = true;

  for (let char of str) {
    if (seen[char]) {
      is_uq = false;
      break;
    }
    seen[char] = true;
  }
  return is_uq

  // WITHOUT ADD DS
  // var is_uq = true;
  //
  // for (let i = 0; i < str.length; i++) {
  //   for (let j = i + 1; j < str.length; j++) {
  //     if (str[i] === str[j]) {
  //       is_uq = false;
  //     }
  //   }
  //   if (!is_uq) {
  //     break
  //   }
  // }
  // return is_uq
}

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


/*
 * TODO: Given two strings, write a method to decide if one is a permutation of the other:
 *
 * NOTE: in order to be a permutation, str1 needs all the same characters as str2, or the other way around. If this is the case, then by default, a permutation exists
 *
 * BUG: Analysis:
 * O(26 + n + 26) === O(52 + n) === O(n)
 * */
function is_permutation(str1: string, str2: string): boolean {
  var is_permu = true;

  var chars1: { [key: string]: number } = {}
  var chars2: { [key: string]: number } = {}
  // BUG: O(26)
  for (let i = 0; i < 26; i++) {
    var key = String.fromCharCode(97 + i)
    chars1[key] = chars2[key] = 0;
  }

  // BUG: O(n)
  for (let i = 0; i < Math.max(str1.length, str2.length); i++) {
    str1.length < i && chars1[str1[i]]++;
    str2.length < i && chars2[str2[i]]++;
  }

  // BUG: O(26)
  for (let i = 0; i < 26; i++) {
    var target = String.fromCharCode(97 + i)
    if (chars1[target] !== chars2[target]) {
      is_permu = false;
    }

  }

  return is_permu
}

(function () {
  // EXPECT is_unqiue to be true
  console.warn("Testing: is_permutations...")
  var trueArgs = ["racecar", "carracer"];
  var falseArgs = ["racecar", "test"];

  if (!is_permutation(trueArgs[0], trueArgs[1])) {
    throw new Error(`Expected ${trueArgs} to be true, but got false`)
  }
  if (!is_permutation(falseArgs[0], falseArgs[1])) {
    throw new Error(`Expected ${falseArgs} to be false, but got true`)
  }

  console.log("[is_unique]: Success!\n")
  console.warn("*********************\n")
}())


/*
 * TODO: Write a method to replace all spaces in a string with '%20'. You may assume that the string has sufficent space at the end to hold the additional characters, and that you are given the "true" length of the string.
 *
 * BUG: Analysis:
 * O(n)
 * SPACE COMPLEXITY: NOT IN PLACE: bigger?
 * */
function URLify(str: string): string {

  // NOT IN PLACE!!!
  var out = [];
  let curr = "";
  for (let i = 0; i < str.length; i++) {
    if (str[i] !== " ") {
      curr += str[i];
    } else if (curr.length > 0) {
      out.push(curr);
      curr = ""
    }
  }
  if (curr.length > 0) {
    out.push(curr);
  }
  return out.join("%20")

  // IN PLACE

}

(function () {
  // EXPECT is_unqiue to be true
  console.warn("Testing: URLify...")
  var ins = ["Mr   Jon     Smith     ", "This is   a t2est, I am tessssttt tt ing"];
  var outs = ["Mr%20Jon%20Smith", "This%20is%20a%20t2est,%20I%20am%20tessssttt%20tt%20ing"];

  for (let i = 0; i < ins.length; i++) {
    var result = URLify(ins[i])
    // console.log("in:       ", ins[i])
    // console.log("out:      ", result)
    // console.log("expected: ", outs[i], "\n\n")
    if (result !== outs[i]) {
      throw new Error(`Expected \n    ${ins[i]} \nto equal \n    ${outs[i]}\n but got: \n    ${result}`)
    }

  }



  console.log("[URLift]: Success!\n")
  console.warn("*********************\n")
}())



/*
 * TODO: There are three types of edits that can be preformed on strings:
 *        Insert a character
 *        REmove a character
 *        or replace a character.
 *       Given two strings, write a function to check if they are one edit (or zero edits) away;
 *
 * BUG: Analysis:
 * */

// function can_insert_or_remove(str1: string, str2: string): boolean {
//   console.log("[test_insert]: ", str1, str2)
//   if (str2.length !== str1.length + 1 && str1.length !== str2.length + 1) {
//     console.log("early return...")
//     return false;
//   }
//
//   var targetChar = "";
//   var seen: { [key: string]: boolean } = {}
//
//   let longestString = str1;
//   let shortestString = str2;
//
//   if (Math.max(str1.length, str2.length) === str2.length) {
//     longestString = str2;
//     shortestString = str1
//   }
//
//   for (let i = 0; i < shortestString.length; i++) {
//     seen[shortestString[i]] = true;
//   }
//   for (let i = 0; i < longestString.length; i++) {
//     if (!seen[longestString[i]]) {
//       targetChar += longestString[i];
//     }
//   }
//
//   if (targetChar.length !== 1) {
//     console.log("[can_insert_or_remove]: ", "fails!")
//     return false
//   } else {
//     console.log("[can_insert_or_remove]: ", "works!")
//     return true;
//   }
// }
// function test_remove(str1: string, str2: string): boolean {
//   console.log("[test_remove]: ", str1, str2)
//   if (str2.length !== str1.length - 1 && str1.length !== str2.length - 1) {
//     console.log("early return...")
//     return false;
//   }
//   let works = true;
//   var seen: { [key: string]: [number, number] } = {}
//   for (let i = 0; i < Math.max(str1.length, str2.length); i++) {
//     if (str1[i] && !Array.isArray(seen[str1[i]])) {
//       seen[str1[i]] = [0, 0]
//     }
//     if (str1[i] && !Array.isArray(seen[str2[i]])) {
//       seen[str2[i]] = [0, 0]
//     }
//     str1[i] && seen[str1[i]][0]++
//     str2[i] && seen[str2[i]][1]++
//   }
//
//   for (var key in seen) {
//     var first = seen[key][0];
//     var second = seen[key][0]
//     if ((first + second) % 2 !== 0) {
//       works = false;
//     }
//   }
//   console.log(seen)
//   console.log(`[test_remove]: ${works ? "works" : "fails"}!`)
//
//   return works;
//
// }
// function test_replace(str1: string, str2: string): boolean {
//   console.log("[test_replace]: ", str1, str2)
//   if (str2.length !== str1.length) {
//     console.log("early return")
//     return false;
//   }
//   let works = false;
//
//   return works;
//
// }
// function generate_diff(str1: string, str2: string): { [key: string]: [number, number] } {
//   var diff: { [key: string]: [number, number] } = {}
//   for (let i = 0; i < Math.max(str1.length, str2.length); i++) {
//     if (str1[i] && !Array.isArray(diff[str1[i]])) {
//       diff[str1[i]] = [0, 0]
//     }
//     if (str2[i] && !Array.isArray(diff[str2[i]])) {
//       diff[str2[i]] = [0, 0]
//     }
//     str1[i] && diff[str1[i]][0]++
//     str2[i] && diff[str2[i]][1]++
//   }
//   return diff;
//
// }
// function one_away(str1: string, str2: string): boolean {
//   if (str1 === str2) {
//     console.log("WORKS: already same! (zero edits)")
//     return true;
//   }
//   let works = false;
//   var diff = generate_diff(str1, str2);
//   // Insert AND/OR Remove a character 
//   //  To insert/remove , the diff needs to be off by one (really two based on the math I've done repalacing 0's with -1's to also calc replace with same vars)
//   // var numDiff = Object.keys(diff).reduce((prev: [number, number], curr, acc): [number, number] => {
//   //   var lDiff = prev[0] + (diff[curr][0] === 0 ? -1 : diff[curr][0])
//   //   var rDiff = prev[1] + (diff[curr][1] === 0 ? -1 : diff[curr][1])
//   //   return [lDiff, rDiff]
//   //
//   // }, [0, 0])
//
//   let _prev: [number, number] = [10, 10]
//   var numDiff = Object.keys(diff).reduce((prev, curr, acc): number => {
//     if (_prev[1] === diff[curr][0] && _prev[0] === diff[curr][1]) {
//       console.log("skipping...")
//       return prev += 0;
//     }
//     var _diff = Math.abs(diff[curr][0] - diff[curr][1])
//     console.log("diff[curr]", curr, diff[curr], _diff)
//     _prev = [...diff[curr]]
//     return prev += _diff
//
//   }, 0)
//   if (str1.length === str2.length) {
//     works = numDiff === 2 || numDiff === 1 || numDiff === 0
//   } else {
//     works = numDiff === 1 || numDiff === 0
//
//   }
//   // return diff === 1 || diff === 0
//   // var diffSum = numDiff[0] - numDiff[1];
//   console.log("DIFF: \n", diff, "\nDIFF_SUM:\n", 0, "\nNUM_DIFF\n", numDiff)
//   // // if (diffSum === 2 || diffSum === -2 || diffSum === -1 || diffSum === 1) {
//   // if (diffSum === 2 || diffSum === -2) {
//   //   console.log("WORKS: can insert or remove");
//   //   works = true;
//   //   return works;
//   // }
//   //
//   // // Replace
//   // //    To replace, the numDiff needs to be one away from the length of the original string
//   // //    Replacing zeros in the numDiff allows us to see if the difference in letters from one string to the other produces a diff less than the length - 1
//   // if (numDiff[0] === str1.length - 1 && numDiff[1] === str2.length - 1) {
//   //   console.log("WORKS: can replace");
//   //   works = true;
//   //   return works;
//   // }
//   // console.log("FAILS: can not insert, remove, or replace");
//   //
//   return works;
// }
//
function one_away(str1: string, str2: string): boolean {
  if (str1 === str2) return true;

  let longest = str1, shortest = str2;
  if (Math.max(str1.length, str2.length) === str2.length) {
    longest = str2; shortest = str1;
  }

  var seen: { [key: string]: number } = {};
  for (let i = 0; i < shortest.length; i++) {

    if (!seen[shortest[i]]) {
      seen[shortest[i]] = 1;
      continue
    }
    seen[shortest[i]] = seen[shortest[i]] + 1
  }
  let diff = 0;
  for (let i = 0; i < longest.length; i++) {
    if (!seen[longest[i]] || seen[longest[i]] <= 0) {
      diff++;
    } else {
      seen[longest[i]]--
    }
  }
  return diff <= 1

}

(function () {
  // EXPECT is_unqiue to be true
  console.warn("Testing: one_away...")
  var tests: [string, string, boolean][] = [
    ["pale", "ple", true],
    ["pales", "pale", true],
    ["pale", "bale", true],
    ["pale", "bake", false],
    // ["t", "", true],
    // ["tt", "ttt", true],
    // ["aaabbba", "aaabba", true],
    // ["aaaaaa", "aaaaaaaa", false],
    // ["pale", "pale", true],
  ];

  for (let i = 0; i < tests.length; i++) {
    var result = one_away(tests[i][0], tests[i][1])
    // console.log("in:       ", tests[i][0], " one_away from ", tests[i][1])
    // console.log("result:   ", result)
    // console.log("expected: ", tests[i][2], "\n\n")
    if (result !== tests[i][2]) {
      throw new Error(`Expected \n    ${tests[i]} \nto be \n    ${tests[i][2]} \nbut got \n    ${result}\n`)
    }

  }



  console.log("[URLift]: Success!\n")
  console.warn("*********************\n")
}())

/*
 * TODO: Implement a method to prerform a basic string compression using the counts of repeated characters. "aabcccccaaa" => "a2b1c5a3".
 *
 * NOTE: What is you cannot use additional data structures?
 * */
function compress_string(str: string): string {
  let out = ""
  let curr = str[0];
  let count = 1;
  let maxCount = 0;
  for (let i = 1; i < str.length; i++) {
    if (str[i] === curr) {
      count++
    } else {
      out += count > 0 ? `${curr}${count}` : curr;
      curr = str[i];
      maxCount = Math.max(count, maxCount);
      count = 1;
    }

  }
  if (count > 0) {
    out += `${curr}${count}`
  }
  if (maxCount <= 1) {
    return str;
  }
  return out;

}

(function () {
  // EXPECT is_unqiue to be true
  console.warn("Testing: compress_string...")
  var ins = ["aabcccccaaa", "abcdefg", "tessst"]
  var outs = ["a2b1c5a3", "abcdefg", "t1e1s3t1"]

  for (let i = 0; i < ins.length; i++) {
    var res = compress_string(ins[i])
    if (res !== outs[i]) {
      throw new Error(`Expected \n    ${ins[i]} \nto be \n    ${outs[i]} \nbut got \n    ${res}\n`)
    }
    // console.log(`${ins[i]} => ${outs[i]}`)
  }

  console.log("[compress_string]: Success!\n")
  console.warn("*********************\n")
}())

