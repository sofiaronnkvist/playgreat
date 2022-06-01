<img src="https://media.giphy.com/media/3o7TKGMZHi73yzCumQ/giphy.gif" />

# Sewing machine racing

This is a sewing machine racing game built with PixiJS where the goal is to not sew into pins or your hands. You can [play it online here.](https://sewingmachineracing.netlify.app/)

# Installation

Clone this repository to your computer and fire up a local server.

# Changelog

-   [#1 - Changed size of sewing machine.](https://github.com/sofiaronnkvist/playgreat/pull/1)
-   [#2 - Trying out the branches again.](https://github.com/sofiaronnkvist/playgreat/pull/2)
-   [#3 - gameloop.](https://github.com/sofiaronnkvist/playgreat/pull/3)
-   [#4 - Added a bunch of functions.](https://github.com/sofiaronnkvist/playgreat/pull/4)
-   [#5 - animation needle, pins.](https://github.com/sofiaronnkvist/playgreat/pull/5)
-   [#6 - Changed the structure and added more images.](https://github.com/sofiaronnkvist/playgreat/pull/6)
-   [#7 - Made the pins functions and intervals work better.](https://github.com/sofiaronnkvist/playgreat/pull/7)
-   [#8 - Final changes.](https://github.com/sofiaronnkvist/playgreat/pull/8)

# Code Review

1. `example.js:10-15` - Remember to think about X and this could be refactored using the amazing Y function.
2. `index.js 103` - Use Pixi's Ticker instead app.ticker.add(gameLoop)
3. `index.js 64` - Why isn't the animte function ran in the gameLoop?
4. `setIntervals 109 & 116` - You can remove these and instead remove a needle everytime its Y value is less than the fabrics, this would happen in the 'gameLoop' function 🙂
5. `index.js 205` - You can use event.key === "ArrowLeft" instead of the keys code.
6. `index.js` Everything is put in a single file. The code would be easier to read if it was divided up into different files. 
7. `index.html 25` PIXI JS is hotlinked as a script instead of being imported as a node module.
8. `index.js 46` A lot of code is repeated twice. For example left hand and right hand could instead be a single class that you just switch out the image of.
9. `index.js 70` It is super clever to use Math.Sin(delta) To make the movement speed up and down like a sewing machine!
10. `index.js` Very good variable names and function names. 
11. Lovely illustrations! Great work and was it was fun to play. 😊

# Testers

Tested by the following people:

1. Hanna Rosenberg
2. Theo Sandell
3. Patrik Staaf
4. Johanna Jönsson

Tested by the following muggles (non-coders):

1. Daniella Andersson
2. Malin Rönnkvist
3. Isac Blixt
4. Amanda Bånstedt
