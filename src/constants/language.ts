export const LANGUAGES: string[] = ["javascript", "java", "go"];

export const LANGUAGE_ID: { [key: string]: number } = {
  javascript: 63,
  java: 62,
  go: 60,
};
export const MAIN_SNIPPET: { [key: string]: string } = {
  java: `import java.util.*;

  public class Main {
    public static void main(String[] args) {
      
    }
  }`,
  javascript: `const TEST_CASES = [];
  for (let i = 0; i < TEST_CASES.length; i++) {
    solution(TEST_CASES[i]);
  }`,
  go: `package main

  import "fmt"
  
  func main() {
    fmt.Println("Hello, Go!")
  }`,
  python: `print("Hello, Python!")`,
};
