'use strict';

var grid;

class WordSearchRender {
    constructor(canvasId) {
        this.canvasId = canvasId;
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext("2d");
        this.fontSize = 14;
        this.scale = 2;
    }

    #createCanvas(hiddenWordSearch) {
        var canvasWidth = hiddenWordSearch.wordGrid.rows * (this.fontSize + 1);
        var canvasHeight = hiddenWordSearch.wordGrid.columns * (this.fontSize + 1);

        window.devicePixelRatio = this.scale;
        this.canvas.style.width = canvasWidth;
        this.canvas.style.height = canvasHeight;
        var scale = window.devicePixelRatio;

        this.canvas.width = Math.floor(canvasWidth * scale);
        this.canvas.height = Math.floor(canvasHeight * scale);

        this.ctx.scale(scale, scale);
        
        this.ctx.textAlign = "center";
        this.ctx.textBaseline = "middle";
        this.ctx.font = "14px Tahoma"; // "14px Comic Sans MS";
        // this.fontSize = 14;
    }

    renderGrid(hiddenWordSearch) {
        var rowPos = this.fontSize;
        var columnPos = this.fontSize;
        var idx = 0;
        grid = new Array(hiddenWordSearch.wordGrid.rows);

        this.#createCanvas(hiddenWordSearch);

        for (var row = 1; row <= hiddenWordSearch.wordGrid.rows; row++) {
            // var rowArray = new Array(hiddenWordSearch.wordGrid.columns)
            grid[row - 1] = new Array(hiddenWordSearch.wordGrid.columns);
            for (var column = 1; column <= hiddenWordSearch.wordGrid.columns; column++) { 
                var letter = hiddenWordSearch.wordGrid.grid.charAt(idx);
                this.ctx.fillText(letter, columnPos, rowPos);
                //rowArray[column-1] = letter;
                grid[row - 1][column - 1] = letter;
                idx++;
                columnPos = columnPos + this.fontSize * 1;
            }
            // console.log(rowStr);
            //grid[row - 1] = rowArray;
            rowPos = rowPos + this.fontSize * 1;
            columnPos = this.fontSize;
        }

        // temp
        //for (var i = 0; i < 10; i++) {
        //    for (var j = 0; j < 10; j++) {
        //        console.log(grid[i][j]);
        //    }
        //}
        
    }

    highlightLetter(row, column) {
        // given the row and column, find centre point of the letter

        var x = column * this.fontSize;
        var y = row * this.fontSize;

        console.log("drawing at x,y: " + x + ", " + y);
        var letter = grid[row - 1][column - 1];
        this.#drawCircle(x, y);
        this.#drawLetter(x, y, "white", letter);
    }

    highlightWord(startLocation, endLocation) {
        var startx = (startLocation.column + 1) * this.fontSize;
        var starty = (startLocation.row + 1) * this.fontSize
        var endx = (endLocation.column + 1) * this.fontSize;
        var endy = (endLocation.row + 1) * this.fontSize;

        var minx = startx < endx ? startx : endx;
        var miny = starty < endy ? starty : endy;

        var maxx = startx > endx ? startx : endx;
        var maxy = starty > endy ? starty : endy;

        var incx = maxx > minx ? 1 : 0;
        var incy = maxy > miny ? 1 : 0;

        var reachedEnd = false;
        do {            
            this.#drawCircle(minx, miny);
            minx+=incx;
            miny+=incy;
            reachedEnd = minx > maxx || miny > miny;
        } while (!reachedEnd);
    }

    #drawCircle(x, y) {
        this.ctx.beginPath();
        this.ctx.arc(x, y, this.fontSize / this.scale, 0, 2 * Math.PI, false);
        this.ctx.fillStyle = 'red';
        this.ctx.fill();
    }

    #drawLetter(x, y, colour, letter) {
        this.ctx.fillStyle = colour;
        this.ctx.fillText(letter, x, y);
    }
}