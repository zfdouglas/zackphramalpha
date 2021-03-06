# Documentation for ZackframAlpha v 1.0.0:

**Assumptions:** </br> A user does not require a specific precision for their answer. </br> A
user is not intending to do algebraic work in the calculator that includes
letters. </br> A user is not intending to use any operators outside of +, -, \*, / </br> A
user will not use the divided symbol and will use / instead

**UseCase:**  This is a calculator webapp intended to give correct answers for
arithmetic. 

**Acceptance Criteria:**

1. When a user opens up the application, they are able to see a webpage
   consisting of an input area for which to input a problem, a calculate button,
   and a clear equation button.
2. When a user inputs an equation that is valid (what is valid is outlined
   below) and presses the computer button (or enter), the app will solve for
   their equation and return a correct answer in the UI
3. When a user inputs an invalid equation, the UI will give a warning and clear the equation NOTE: Future
   Release intends to include functionality to specify what is invalid in
   equation in error
4. Documentation is provided for the application

**Accepted Inputs:** This webapp uses regex matching to ascertain that only positive
and negative numbers, decimals, and operators (+,-,\*,/) are allowed. It is not
necessary and in fact not allowed to include '='. Furthermore, though open and
closed parentheses should be allowed, because that functionality was not built
out- parentheses are currently not supported. Parentheses will be added on next
iteration when the functionality for parentheses is present.

**Planned Future Work:**
1. Patch Bug Where Negative Numbers with Decimals Are Not allowed 
2. Include Parentheses Handling
3. Add responsiveness for use as mobile app.
4. Returns what is specifically invalid in equation to user if equation is invalid
