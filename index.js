/*
Given an input string s and a pattern p, implement regular expression matching with support for '.' and '*' where:

'.' Matches any single character.​​​​
'*' Matches zero or more of the preceding element.
The matching should cover the entire input string (not partial).

 

Example 1:

Input: s = "aa", p = "a"
Output: false
Explanation: "a" does not match the entire string "aa".
Example 2:

Input: s = "aa", p = "a*"
Output: true
Explanation: '*' means zero or more of the preceding element, 'a'. Therefore, by repeating 'a' once, it becomes "aa"
*/
// SOLUTION:
/**
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
var isMatch = function (s, p) {
  const dp = new Array(s.length + 1)
    .fill(false)
    .map(() => new Array(p.length + 1).fill(false));

  dp[0][0] = true;

  // Handle patterns with '*'
  for (let j = 1; j <= p.length; j++) {
    if (p[j - 1] === "*") {
      dp[0][j] = dp[0][j - 2];
    }
  }

  for (let i = 1; i <= s.length; i++) {
    for (let j = 1; j <= p.length; j++) {
      if (s[i - 1] === p[j - 1] || p[j - 1] === ".") {
        dp[i][j] = dp[i - 1][j - 1];
      } else if (p[j - 1] === "*") {
        dp[i][j] =
          dp[i][j - 2] ||
          (dp[i - 1][j] && (s[i - 1] === p[j - 2] || p[j - 2] === "."));
      }
    }
  }

  return dp[s.length][p.length];
};

// Example usage:
console.log(isMatch("aa", "a")); // Output: false
console.log(isMatch("aa", "a*")); // Output: true
console.log(isMatch("ab", ".*")); // Output: true


/*
Regular expression matching can be solved using dynamic programming.
 You can create a 2D boolean array to store the intermediate results.
Here's a JavaScript solution with optimized time and space complexity:
This solution uses a 2D array to store intermediate results, allowing 
it to efficiently compute the regular expression matching. 
It has a time complexity of O(s.length * p.length) and a 
space complexity of O(s.length * p.length), which is quite efficient for most cases.

Certainly! In terms of N, where N is the length of the input string s, 
the time and space complexities for the provided solution are as follows:

Time Complexity: O(N^2)
The time complexity is quadratic in terms of N because we have a nested loop where both loops iterate 
up to the length of the input string s, which is N. So, in big O notation, it's O(N * N), 
which simplifies to O(N^2).

Space Complexity: O(N^2)
The space complexity is also quadratic in terms of N. We create a 2D array of 
size (N+1) x (N+1) to store the intermediate results, resulting in a space complexity of O(N^2).
*/ 