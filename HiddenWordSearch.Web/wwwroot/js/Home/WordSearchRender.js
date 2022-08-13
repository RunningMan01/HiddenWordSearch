'use strict';

//var grid;
// var colours = ["red", "green", "blue", "purple", "orange"];

class WordSearchRender {
    #colours = ["red", "green", "blue", "purple", "orange"];
    #currentColour = 0;

    constructor(canvasId) {
        this.canvasId = canvasId;
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext("2d");
        this.fontSize = 24;
        this.gap = this.fontSize * 0.75;
        this.scale = 2;
        this.grid = null;
    }

    #createCanvas(hiddenWordSearch) {
        var canvasWidth = (hiddenWordSearch.wordGrid.rows + 1) * (this.fontSize + this.gap);
        var canvasHeight = (hiddenWordSearch.wordGrid.columns + 1) * (this.fontSize + this.gap);

        //window.devicePixelRatio = this.scale;
        this.canvas.style.width = canvasWidth;
        this.canvas.style.height = canvasHeight;
        //var scale = window.devicePixelRatio;

        this.canvas.width = canvasWidth; // Math.floor(canvasWidth * scale);
        this.canvas.height = canvasHeight; // Math.floor(canvasHeight * scale);

        //this.ctx.scale(scale, scale);
        
        this.ctx.textAlign = "center";
        this.ctx.textBaseline = "middle";
        this.ctx.font = "24px Comic Sans MS"; // "14px Comic Sans MS";
        // this.fontSize = 14;
    }

    renderGrid(hiddenWordSearch) {
        var rowPos = this.fontSize; // + this.gap;
        var columnPos = this.fontSize; // + this.gap;
        //var gap = this.fontSize / 1.25;
        var idx = 0;

        this.grid = new Array(hiddenWordSearch.wordGrid.rows);
        this.#createCanvas(hiddenWordSearch);

        for (var row = 1; row <= hiddenWordSearch.wordGrid.rows; row++) {
            // var rowArray = new Array(hiddenWordSearch.wordGrid.columns)
            this.grid[row - 1] = new Array(hiddenWordSearch.wordGrid.columns);
            for (var column = 1; column <= hiddenWordSearch.wordGrid.columns; column++) { 
                var letter = hiddenWordSearch.wordGrid.grid.charAt(idx);
                //console.log(`Drawing letter at ${columnPos}, ${rowPos}`);
                this.ctx.fillText(letter, columnPos, rowPos);
                // ToDo - following is temporary
                // this.#drawLine(columnPos, rowPos);

                //rowArray[column-1] = letter;
                this.grid[row - 1][column - 1] = letter;
                idx++;
                columnPos = columnPos + this.fontSize + this.gap;
            }
            // console.log(rowStr);
            //grid[row - 1] = rowArray;
            rowPos = rowPos + this.fontSize + this.gap;
            // ToDo - following is temporary
            // this.#drawLine(columnPos, rowPos);
            columnPos = this.fontSize;// + this.gap;
        }        
    }
    // ToDo - this is temporary
    #drawLine(x, y) {
        // console.log(`#drawLine: x ${x}, y ${y}`);
        this.ctx.beginPath();
        this.ctx.moveTo(0, y);
        this.ctx.lineTo(100, y);
        this.ctx.stroke();
    }

    //ToDo - calling this but wrong values for Row and Column
    highlightLetter(location) {
        // given the row and column, find centre point of the letter
        console.log(`highlightLetter: Row ${location.row}, Column ${location.column}`);              

        var screenPos = this.#getScreenPositionFromRowColumn(location.row, location.column);
        
        var letter = this.grid[location.row][location.column];
        this.#drawCircle(screenPos.x, screenPos.y);
        this.#drawLetter(screenPos.x, screenPos.y, "white", letter);
    }

    #getIncrement(startPosition, endPosition) {
        var increment = 0;

        if (startPosition > endPosition) {
            increment = -1;
        }
        else if (endPosition > startPosition) {
            increment = 1;
        }

        return increment;
    }

    // ToDo - might not need this, not currently called
    #fillInLetters(startLocation, endLocation) {
        var row = startLocation.row;
        var column = startLocation.column;

        var incx = this.#getIncrement(startLocation.column, endLocation.column);
        var incy = this.#getIncrement(startLocation.row, endLocation.row);

        var reachedEnd = false;
        this.highlightLetter(startLocation);
        do {
            startLocation.row += incy;
            startLocation.column += incx;
            this.highlightLetter(startLocation);
            reachedEnd = startLocation.row == endLocation.row && startLocation.column == endLocation.column;
        } while (!reachedEnd);
    }

    #getScreenPositionFromRowColumn(row, column) {
        var x = (column + 1) * this.fontSize;
        if (column > 0) {
            x = x + (column * this.gap);
        }

        var y = (row + 1) * this.fontSize;
        if (row > 0) {
            y = y + (row * this.gap);
        }

        return { x: x, y: y };
    }

    #fillInWord(startLocation, endLocation, colour) {
        //var startx = (startLocation.column + 1) * this.fontSize;
        //var starty = (startLocation.row + 1) * this.fontSize

        var start = this.#getScreenPositionFromRowColumn(startLocation.row, startLocation.column);
        var end = this.#getScreenPositionFromRowColumn(endLocation.row, endLocation.column);

        //var endx = (endLocation.column + 1) * this.fontSize;
        //var endy = (endLocation.row + 1) * this.fontSize;
        var incx = this.#getIncrement(start.x, end.x);
        var incy = this.#getIncrement(start.y, end.y); 

        var reachedEnd = false;
        this.#drawCircle(start.x, start.y, colour);
        do {
            start.x += incx;
            start.y += incy;
            this.#drawCircle(start.x, start.y, colour);
            reachedEnd = start.x == end.x && start.y == end.y;
        } while (!reachedEnd);
    }

    // ToDo - sort out colour selection - use module level var
    highlightWord(startLocation, endLocation) {
        //var colour = this.#getCurrentColour;
        //console.log(`highlightWord: ${colour}`);
        // ToDo - following in separater function - fillInWord
        this.#fillInWord(startLocation, endLocation);
        // ToDo - followed by a method to highlights letters in word
        this.#fillInLetters(startLocation, endLocation);

        this.#pickNextColour();
    }

    #getCurrentColour() {
        var colour = this.#colours[this.#currentColour];
        return colour;
    }

    #pickNextColour() {
        var numColours = this.#colours.length;
        this.#currentColour = (this.#currentColour + 1) % numColours;
    }

    #drawCircle(x, y) {
        this.ctx.beginPath();
        this.ctx.arc(x, y, this.fontSize / this.scale, 0, 2 * Math.PI, false);
        this.ctx.fillStyle = this.#getCurrentColour();
        this.ctx.fill();
    }

    #drawLetterRowColumn(row, column) {        
        var x = column * this.fontSize;
        var y = row * this.fontSize;
        var letter = this.grid[row - 1][column - 1];
        
        this.#drawLetter(x, y, this.#getCurrentColour(), letter);
    }

    #drawLetter(x, y, colour, letter) {
        this.ctx.fillStyle = "white";
        this.ctx.fillText(letter, x, y);
    }
}