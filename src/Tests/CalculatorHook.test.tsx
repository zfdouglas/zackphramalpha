import calculateProblemHook from "../Hooks/CalculateHook";

test("simple one digit addition returns correctly", () => {
  let testEquation = "2+3";
  let expectedResponse = "5";
  expect(calculateProblemHook(testEquation)).toBe(expectedResponse);
});

test("simple one by one digit subtraction returns correctly", () => {
  let testEquation = "6-3";
  let expectedResponse = "3";
  expect(calculateProblemHook(testEquation)).toBe(expectedResponse);
});

test("simple one by one digit multiplication returns correctly", () => {
  let testEquation = "6*3";
  let expectedResponse = "18";
  expect(calculateProblemHook(testEquation)).toBe(expectedResponse);
});

test("simple one by one digit division returns correctly", () => {
  let testEquation = "6/3";
  let expectedResponse = "2";
  expect(calculateProblemHook(testEquation)).toBe(expectedResponse);
});

test("test spaces do not cause issue", () => {
  let testEquation = "  6 /    3";
  let expectedResponse = "2";
  expect(calculateProblemHook(testEquation)).toBe(expectedResponse);
});

test("test multi digit by multi digit addition", () => {
  let testEquation = "22+33";
  let expectedResponse = "55";
  expect(calculateProblemHook(testEquation)).toBe(expectedResponse);
});
test("test multi digit by multi digit subtraction", () => {
  let testEquation = "33-11";
  let expectedResponse = "22";
  expect(calculateProblemHook(testEquation)).toBe(expectedResponse);
});
test("test multi digit by multi digit multiplication", () => {
  let testEquation = "11*11";
  let expectedResponse = "121";
  expect(calculateProblemHook(testEquation)).toBe(expectedResponse);
});
test("test multi digit by multi digit division", () => {
  let testEquation = "120/20";
  let expectedResponse = "6";
  expect(calculateProblemHook(testEquation)).toBe(expectedResponse);
});
test("test multi operator ", () => {
  let testEquation = "12 + 2 - 1 *3";
  let expectedResponse = "11";
  expect(calculateProblemHook(testEquation)).toBe(expectedResponse);
});
test("test negative single number", () => {
  let testEquation = "-23";
  let expectedResponse = "-23";
  expect(calculateProblemHook(testEquation)).toBe(expectedResponse);
});
test("test negative in problem", () => {
  let testEquation = "-23 * 2";
  let expectedResponse = "-46";
  expect(calculateProblemHook(testEquation)).toBe(expectedResponse);
});
test("test decimals", () => {
  let testEquation = "10/3";
  let expectedResponse = "3.3333333333333335";
  expect(calculateProblemHook(testEquation)).toBe(expectedResponse);
});
//not implemented but will work when parentheses are implemented
// test("test use of parentheses", () => {
//   let testEquation = "2*4+(2+8)";
//   let expectedResponse = "18";
//   expect(calculateProblemHook(testEquation)).toBe(expectedResponse);
// });

// fails currently because decimal Numbers that are negatives fail
test("test of negative decimal numbers", () => {
  let testEquation = "5+-2.8";
  let expectedResponse = "2.2";
  expect(calculateProblemHook(testEquation)).toBe(expectedResponse);
});
