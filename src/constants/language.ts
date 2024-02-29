export const LANGUAGES: string[] = ["Javascript", "Java", "Go", "Python"];

export const LANGUAGE_ID: { [key: string]: number } = {
  Javascript: 63,
  Java: 62,
  Go: 60,
  Python: 71,
};
export const MAIN_SNIPPET: { [key: string]: string } = {
  Java: `import java.util.*;
  
  public class Main {
    public static void main(String[] args) {
      /*
      The predefined code consideres test case as an integer array
      The soultion function defined here return an integer...
      Make changes accordingly to the problem 
      */
     Scanner scanner = new Scanner(System.in);
     //Takes in input from api
     String inputString = scanner.nextLine();
     String[] arrayString = inputString.split(" ");
     //Change datatype according to the problem
     int[] array = new int[arrayString.length];
     for (int i = 0; i < arrayString.length; i++) {
       //Change the logic according to the problem
       array[i] = Integer.parseInt(arrayString[i]);
      }
      Solution solution = new Solution();
      System.out.println(solution.sum(array));
    }
  }
  class Solution{
    public int sum(int[] arr){
      int sum = 0;
      for(int i=0;i<arr.length;i++){
        sum += arr[i];
      }
      return sum;
    }
  }`,
  Javascript: `const readline = require('readline');

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  function problemName(arr) {
    // Implement the solution logic here
    // For now, let's just return the sum of array elements as an example
    return arr.reduce((sum, num) => sum + num, 0);
  }
  
  rl.on('line', (inputString) => {
    // Split the input string into an array of strings
    const arrayString = inputString.split(' ');
  
    // Convert the array of strings to an array of integers
    const array = arrayString.map(element => parseInt(element));
  
    // Call the solution function
    const result = problemName(array);
  
    // Output the result
    console.log(result);
  
    rl.close();
  });
  `,
  Go: `package main

  import (
    "fmt"
    "strconv"
    "strings"
    "bufio"
    "os"
  )
  
  func problemName(arr []int) int {
    // Implement the solution logic here
    // For now, let's just return the sum of array elements as an example
    sum := 0
    for _, num := range arr {
      sum += num
    }
    return sum
  }
  
  func main() {
    // Takes in input from api
    reader := bufio.NewReader(os.Stdin)
    inputString,_ := reader.ReadString("\\n")
    // Split the input string into an array of strings
    arrayString := strings.Split(inputString, " ")
  
    // Convert the array of strings to an array of integers
    var array []int
    for _, element := range arrayString {
      // Change the logic according to the problem
      num, _ := strconv.Atoi(element)
      array = append(array, num)
    }
  
    // Call the solution function
    result := problemName(array)
  
    // Output the result
    fmt.Println(result)
  }`,
  Python: `print("Hello, Python!")`,
};

// export const LANGUAGE_DATA_TYPES: { [key: string]: string[] } = {
//   javascript: ["var"],
//   java: [
//     "String",
//     "int",
//     "float",
//     "long",
//     "boolean",
//     "boolean[]",
//     "float[]",
//     "long[]",
//     "int[]",
//     "int[][]",
//     "String[]",
//     "String[][]",
//     "long[][]",
//     "List<Integer>",
//     "List<String>",
//     "List<List<String>>",
//     "List<List<Integer>>",
//     "List<Boolean>",
//   ],
//   go: ["int32", "int64", "[] int32", "[] int64"],
// };
