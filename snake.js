const SNAKE_SIZE = 100;
const CELL_SIZE = 20;
const VELOCITY = 20;
const MOVE_INTERNAL = 1 / VELOCITY;

document.addEventListener('DOMContentLoaded', () => {
  var body = document.body;
  var acc = 0;
  var grid = [];
  var lastKey = 'KeyD';
  var moves = {
    'KeyA': { row: 0, col: -1 },
    'KeyD': { row: 0, col: 1 },
    'KeyW': { row: -1, col: 0 },
    'KeyS': { row: 1, col: 0 },
  };
  var w = body.clientWidth;
  var h = body.clientHeight;
  var gridWidth = Math.floor(w / CELL_SIZE);
  var gridHeight = Math.floor(h / CELL_SIZE);
  var prevTimestamp = 0;
  var fpsAvg = [];
  var fpsLabel = document.createElement('div');
  fpsLabel.classList.add('fps');

  var food;
  let k = 0;
  var snake = new Array(SNAKE_SIZE).fill({}).map(() => {
    k++;
    return { row: 10, col: 10 + k};
  });

  function createGrid() {
    const r = document.getElementById('root');
    if (r) r.remove();

    const root = document.createElement('div');
    root.id = 'root';
    root.style.position = 'relative';

    for (let row = 0; row < gridHeight; row++) {
      if (!grid[row]) grid.push([]);

      for (let col = 0; col < gridWidth; col++) {
        const div = document.createElement('div');
        div.style.width = `${CELL_SIZE}px`;
        div.style.height = `${CELL_SIZE}px`;
        div.style.position = 'absolute';
        div.style.top = `${row * CELL_SIZE}px`;
        div.style.left = `${col * CELL_SIZE}px`;

        grid[row].push(div);
        root.appendChild(div);
      }
    }

    root.appendChild(fpsLabel);
    body.appendChild(root);
  }

  function updateGrid() {
    for (let row = 0; row < gridHeight; row++) {
      for (let col = 0; col < gridWidth; col++) {
        grid[row][col].className = 'empty';

        if (food.row === row && food.col === col) {
            grid[row][col].className = 'food';
        }
      }
    }

    for (let i = 0; i < snake.length; i++) {
      grid[Math.min(snake[i].row, gridHeight-1)][Math.min(snake[i].col, gridWidth-1)].className = 'filled';
    }
  }

  function fpsInfo(timestamp) {
    const deltaTime = (timestamp - prevTimestamp) / 1000;
    prevTimestamp = timestamp;
    fpsAvg.push(deltaTime);

    if (fpsAvg.length >= 60) fpsAvg.shift();

    const fps = fpsAvg.reduce((a, b) => a + b) / fpsAvg.length;
    fpsLabel.textContent = Math.floor(1 / fps);

    return deltaTime;
  }

  function computeSnake(deltaTime) {
    acc += deltaTime;

    while (acc >= MOVE_INTERNAL) {
      let cur = snake.length - 1;
      let old = { ...snake[cur] };
      snake[cur].row = snake[cur].row + moves[lastKey].row;
      snake[cur].col = snake[cur].col + moves[lastKey].col;

      const head = snake[cur];
      if (head.col >= gridWidth) head.col = 0;
      else if (head.col < 0) head.col = gridWidth - 1;
      else if (head.row >= gridHeight) head.row = 0;
      else if (head.row < 0) head.row = gridHeight - 1;

      while (cur) {
        const s = { ...snake[cur - 1] };
        snake[cur - 1].col = old.col;
        snake[cur - 1].row = old.row;
        old = s;
        cur -= 1;
      }

      if (snake[snake.length - 1].col === food.col && snake[snake.length - 1].row === food.row) {
        snake.unshift({ row: old.row, col: old.col });
        generateFood();
      }

      acc -= MOVE_INTERNAL;
    }
  }

  function changeSnakeDirection(event) {
    switch (event.code) {
      case 'KeyA':
        if (lastKey === 'KeyD') return;
        lastKey = event.code;
        break;
      case 'KeyD':
        if (lastKey === 'KeyA') return;
        lastKey = event.code;
        break;
      case 'KeyW':
        if (lastKey === 'KeyS') return;
        lastKey = event.code;
        break;
      case 'KeyS':
        if (lastKey === 'KeyW') return;
        lastKey = event.code;
        break;
    }
  }

  function drawElements(timestamp) {
    const deltaTime = fpsInfo(timestamp);

    updateGrid();
    computeSnake(deltaTime);
    window.requestAnimationFrame(drawElements);
  }

  function generateFood() {
    const row = Math.floor(Math.random() * gridHeight);
    const col = Math.floor(Math.random() * gridWidth);
    food = { row, col };
  }

  function resize() {
    w = body.clientWidth;
    h = body.clientHeight;
    gridWidth = Math.floor(w / CELL_SIZE);
    gridHeight = Math.floor(h / CELL_SIZE);

    createGrid();
  }

  createGrid();
  generateFood();

  window.addEventListener('resize', resize);
  window.addEventListener('keydown', changeSnakeDirection);
  window.requestAnimationFrame(timestamp => {
    prevTimestamp = timestamp;
    window.requestAnimationFrame(drawElements);
  });
});
