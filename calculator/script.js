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

function pushOperator(op, stack, queue) {
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
      pushOperator(getOperator(txt[i]), stack, queue);
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

function setupDOM() {
  const result = document.querySelector("#calcResult");
  const input = document.querySelector("#calcInput");

  // Setup Operation Buttons:
  const del = (ev) => {
    input.textContent = input.textContent.slice(
      0,
      input.textContent.length - 1,
    );
  };
  const ac = (ev) => {
    input.textContent = "";
    result.textContent = "";
  };
  const mul = (ev) => (input.textContent += "*");
  const div = (ev) => (input.textContent += "/");
  const add = (ev) => (input.textContent += "+");
  const sub = (ev) => (input.textContent += "-");
  const exe = (ev) => {
    result.textContent = evaluate(input.textContent);
    input.textContent = result.textContent;
  };

  document.querySelector("#del").addEventListener("click", del);
  document.querySelector("#AC").addEventListener("click", ac);
  document.querySelector("#multButton").addEventListener("click", mul);
  document.querySelector("#divideButton").addEventListener("click", div);
  document.querySelector("#addButton").addEventListener("click", add);
  document.querySelector("#subButton").addEventListener("click", sub);
  document.querySelector("#exec").addEventListener("click", exe);

  // Setup number Buttons
  const numberKeys = document.querySelector("#numButtons");
  const addButton = (face) => {
    let key = document.createElement("button");
    key.setAttribute(
      "class",
      typeof face === "number" ? "numButton" : "opButton",
    );
    if (face === "(") {
      key.addEventListener("click", (ev) => {
        const length = input.textContent.length;
        if (length > 0) {
          if (isNumerical(input.textContent[length - 1])) mul(ev);
        }
        input.textContent += "(";
      });
    } else {
      key.addEventListener("click", (ev) => (input.textContent += face));
    }
    key.textContent = face;
    numberKeys.appendChild(key);
  };

  addButton(0);
  addButton("(");
  addButton(")");
  for (let i = 1; i < 10; i++) addButton(i);
}

setupDOM();
