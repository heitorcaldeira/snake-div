const CELL_SIZE = 20;

document.addEventListener('DOMContentLoaded', () => {
  var body = document.body;
  var grid = [];
  var w = body.clientWidth;
  var h = body.clientHeight;
  var gridWidth = Math.floor(w / CELL_SIZE);
  var gridHeight = Math.floor(h / CELL_SIZE);
  var prevTimestamp = 0;
  var fpsAvg = [];
  var fpsLabel = document.createElement('div');
  fpsLabel.classList.add('fps');

  var snake = {
    '10-11': true,
    '10-12': true,
    '10-13': true,
  };

  function createGrid() {
    const g = [];

    for (let row = 0; row < gridHeight; row++) {
      if (!g[row]) g.push([]);

      for (let col = 0; col < gridWidth; col++) {
        const div = document.createElement('div');
        div.style.width = `${CELL_SIZE}px`;
        div.style.height = `${CELL_SIZE}px`;
        div.style.position = 'absolute';
        div.style.top = `${row * CELL_SIZE}px`;
        div.style.left = `${col * CELL_SIZE}px`;

        if (snake[`${row}-${col}`]) {
          div.classList.add('filled');
        } else {
          div.classList.add('empty');
        }

        g[row].push(div);
      }
    }

    return g;
  }

  function fpsInfo(timestamp) {
    const deltaTime = (timestamp - prevTimestamp) / 1000;
    prevTimestamp = timestamp;
    fpsAvg.push(deltaTime);

    if (fpsAvg.length >= 60) fpsAvg.shift();

    const fps = fpsAvg.reduce((a, b) => a + b) / fpsAvg.length;
    fpsLabel.textContent = Math.floor(1 / fps);
  }

  function computeSnake(timestamp) {
    // TODO
  }

  function drawElements(timestamp) {
    fpsInfo(timestamp);

    computeSnake(timestamp);

    const r = document.getElementById('root');
    if (r) r.remove();

    grid = createGrid();

    const root = document.createElement('div');
    root.id = 'root';
    root.style.position = 'relative';
    root.style.height = '100%';

    for (let row = 0; row < gridHeight; row++) {
      for (let col = 0; col < gridWidth; col++) {
        root.appendChild(grid[row][col]);
      }
    }

    root.appendChild(fpsLabel);
    body.appendChild(root);

    window.requestAnimationFrame(drawElements);
  }

  function resize() {
    w = body.clientWidth;
    h = body.clientHeight;
    gridWidth = Math.floor(w / CELL_SIZE);
    gridHeight = Math.floor(h / CELL_SIZE);
  }

  window.addEventListener('resize', resize);
  window.requestAnimationFrame(timestamp => {
    prevTimestamp = timestamp;
    window.requestAnimationFrame(drawElements);
  });
});
