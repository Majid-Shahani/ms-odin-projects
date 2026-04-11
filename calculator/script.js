const operators = {
  "(": "(",
  ")": ")",
  "+": { precedence: 1, op: (n1, n2) => n1 + n2 },
  "-": { precedence: 1, op: (n1, n2) => n1 - n2 },
  "*": { precedence: 2, op: (n1, n2) => n1 * n2 },
  "/": { precedence: 2, op: (n1, n2) => n1 / n2 },
};

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

function isNumerical(char) {
  const cc = char.codePointAt(0);
  return cc > 47 && cc < 58;
}

function shuntingYard(txt, stack, queue) {
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

function solvePostfix(stack, queue) {
  for (let i = 0; i < queue.length; i++) {
    if (typeof queue[i] === "number") stack.push(queue[i]);
    else {
      let num2 = stack.pop();
      let num1 = stack.pop();
      stack.push(queue[i].op(num1, num2));
    }
  }
}

function evaluate(calcText) {
  const operatorStack = [];
  const numberQueue = [];
  shuntingYard(calcText, operatorStack, numberQueue);
  solvePostfix(operatorStack, numberQueue);
  return operatorStack.pop();
}
