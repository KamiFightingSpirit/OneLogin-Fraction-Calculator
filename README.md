# Fractional-Calculator

Fractional Calculator

Notes:

This was an open-ended project where the task was to build a calculator that could handle specific inputs consisting of fractions, whole numbers, and a few math operators. The original ask was for a calculator that could handle 3 inputs (including the math operator), but I extended that task to be able to handle a stream of data (for fun!).

A user should be aware, that while the calculator can accurately handle a number that is equivalent to zero (e.g. "0", "000000") it will not handle fractions that are equivalent to zero, (e.g. "0/100", "0_0/100") or numbers that lead with a zero outside of zero itself (e.g. "0_12/12"). These are flagged as syntax errors by the program, my reasoning was that if a user had input superfluous data, it is better to flag that to them rather than assume that they intended to enter the useless data that way.

This same line of thinking was used to write other tests which results in a rigid manner of inputting data into the program.

A. There are four data inputs that are accepted by the program:

    i. Integers e.g. 10, 1029039, 129 etc.

    ii. Proper and improper fractions: e.g 6/7, 77/5, 12823/2 etc.

    iii. Integers with a proper or improper fraction: e.g. 10_7/8, 123_66/12 etc.

    iv. Math operations: i.e. [+, -, *, /]

How to Get Up and Running:

A. Requirements:

    i. Node.js

B. Instructions:

    i. Fork the repository and create a local copy

    ii. Open bash in the project directory

    iii. Type "cd src" into the console

    iv. Type node index.js YOUR ARGUMENTS HERE

        Example: node index.js 10 + 67_6/7 * 6/7 + 2_70/6 - 2_5/8

C. Running the Tests:

    i. From your command line, within the root directory, type cd src/tests

    i. To run all the tests, type node tests.js
