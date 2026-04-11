const stack = [];
const queue = [];
const operators = {
  "(": "(",
  ")": ")",
  "*": { precedence: 2, op: multiply },
  "/": { precedence: 2, op: divide },
  "+": { precedence: 1, op: add },
  "-": { precedence: 1, op: subtract },
};

let calcText = "03+22-42/(1+5)-1"; // 17

function add(n1, n2) {
  return n1 + n2;
}
function subtract(n1, n2) {
  return n1 - n2;
}
function multiply(n1, n2) {
  return n1 * n2;
}
function divide(n1, n2) {
  if (n2 === 0) throw Error("Cannot Divide By Zero.");
  return n1 / n2;
}

function isNumerical(char) {
  const cc = char.codePointAt(0);
  return cc > 47 && cc < 58;
}

function getOperator(char) {
  const op = operators[char];
  if (!op) throw Error(`Unknown operator ${char}`);
  return op;
}

function pushOperator(op) {
  if (op === "(") {
    stack.push(op);
    return;
  }
  if (op === ")") {
    while (stack[stack.length - 1] !== "(") queue.push(stack.pop());
    stack.pop();
    return;
  }

  while (
    stack.length > 0 &&
    stack[stack.length - 1] !== "(" &&
    op.precedence <= stack[stack.length - 1].precedence
  )
    queue.push(stack.pop());

  stack.push(op);
}

function shuntingYard(txt) {
  for (let i = 0; i < txt.length; ) {
    if (isNumerical(txt[i])) {
      const numStartIdx = i++;
      while (i < txt.length && isNumerical(txt[i])) i++;
      queue.push(parseInt(txt.slice(numStartIdx, i)));
    } else {
      pushOperator(getOperator(txt[i]));
      i++;
    }
  }
  while (stack.length > 0) queue.push(stack.pop());
}

function solvePostfix() {
  for (let i = 0; i < queue.length; i++) {
    if (typeof queue[i] === "number") stack.push(queue[i]);
    else {
      let num2 = stack.pop();
      let num1 = stack.pop();
      stack.push(queue[i].op(num1, num2));
    }
  }
}

function evaluate() {
  shuntingYard(calcText);
  solvePostfix();
  queue.length = 0;
  return stack.pop();
}
