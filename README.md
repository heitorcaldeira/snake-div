# Snake Game HTML Divs

## It is just a performance test using the snake game as an example. 

The game is implemented using HTML divs and CSS.

Each cell of the game is a div element with a specific class that represents the state of the cell.

The main goal is to test the performance of the game using different methods to update HTML.

CPU: AMD Ryzen 7 7800x3d

### First implementation:
- 800x600 and snake size 10 -> ~60 FPS
- 800x600 and snake size 50 -> ~60 FPS
- 800x600 and snake size 100 -> ~51 FPS
- 800x600 and snake size 500 -> ~14 FPS
- 800x600 and snake size 1000 -> ~7 FPS

- 1920x1080 and snake size 10 -> ~34 FPS
- 1920x1080 and snake size 50 -> ~22 FPS
- 1920x1080 and snake size 100 -> ~15 FPS
- 1920x1080 and snake size 500 -> ~4 FPS
- 1920x1080 and snake size 1000 -> ~2 FPS

```console
$ python3 -m http.server 42069
```
