'use strict';

class WordSearchRender {
    #colours = ["red", "green", "blue", "purple", "orange"];
    #currentColour = 0;
    #startLetterImage = null;

    constructor(canvasId) {
        this.canvasId = canvasId;
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext("2d");
        this.fontSize = 24;
        this.gap = this.fontSize * 0.75;
        this.scale = 2;
        this.grid = null;
    }

    #createWordSearchCanvas(hiddenWordSearch) {
        //var canvasWidth = (hiddenWordSearch.wordGrid.columns + 1) * (this.fontSize + this.gap);
        //var canvasHeight = (hiddenWordSearch.wordGrid.rows + 1) * (this.fontSize + this.gap);

        var canvasWidth = (hiddenWordSearch.wordGrid.columns) * (this.fontSize + this.gap) + (this.fontSize / 2.0);
        var canvasHeight = (hiddenWordSearch.wordGrid.rows) * (this.fontSize + this.gap); // + this.gap;
     
        //this.canvas.style.width = canvasWidth;
        //this.canvas.style.height = canvasHeight;     

        this.canvas.width = canvasWidth;
        this.canvas.height = canvasHeight;
        
        this.ctx.textAlign = "center";
        this.ctx.textBaseline = "middle";
        this.ctx.font = "24px Arial Black";

        var wordSearch = document.getElementById("wordSearch");
        wordSearch.style = "visibility: visible";
    }

    #createWordSearchGrid(hiddenWordSearch) {
        var columnPos = this.fontSize;
        var rowPos = this.fontSize;
        var idx = 0;

        for (var row = 1; row <= hiddenWordSearch.wordGrid.rows; row++) {
            this.grid[row - 1] = new Array(hiddenWordSearch.wordGrid.columns);
            for (var column = 1; column <= hiddenWordSearch.wordGrid.columns; column++) {
                var letter = hiddenWordSearch.wordGrid.grid.charAt(idx);
                this.ctx.fillText(letter, columnPos, rowPos);

                this.grid[row - 1][column - 1] = letter;
                idx++;
                columnPos = columnPos + this.fontSize + this.gap;
            }
            rowPos = rowPos + this.fontSize + this.gap;
            columnPos = this.fontSize;
        }
    }

    #displayHiddenWordList(hiddenWordSearch) {
        var numWords = hiddenWordSearch.hiddenWords.length;
        var divWordList = document.getElementById("divWordList");
        divWordList.innerHTML = '';        

        var list = document.createElement("ul");
        divWordList.appendChild(list);

        for (var idx = 0; idx < numWords; idx++) {
            console.log(`${hiddenWordSearch.hiddenWords[idx].word}`);
            var item = document.createElement("p");
            // item.setAttribute("index", idx);
            item.setAttribute("word", hiddenWordSearch.hiddenWords[idx].word);
            item.classList.add("hiddenWord");
            item.innerHTML = hiddenWordSearch.hiddenWords[idx].word;
            list.appendChild(item);
        }
    }

    renderGrid(hiddenWordSearch) {
        this.grid = new Array(hiddenWordSearch.wordGrid.rows); // ToDo - not sure about this line, move it
        this.#hideElement("cardWelcome");
        this.#showElement("cardWordSearch");        
        this.#setWordSearchTitle(hiddenWordSearch.title)
        this.#createWordSearchCanvas(hiddenWordSearch);
        this.#createWordSearchGrid(hiddenWordSearch);
        this.#displayHiddenWordList(hiddenWordSearch);
    }
   
    highlightLetter(location) {
        // given the row and column, find centre point of the letter
        console.log(`highlightLetter: Row ${location.row}, Column ${location.column}`);              

        var screenPos = this.#getScreenPositionFromRowColumn(location.row, location.column);
        
        var letter = this.grid[location.row][location.column];
        this.#drawCircle(screenPos.x, screenPos.y);
        this.#drawLetter(screenPos.x, screenPos.y, "white", letter);
    }

    #setWordSearchTitle(title) {
        var element = document.getElementById("wordSearchDisplayTitle");
        element.innerText = title;
    }

    #hideElement(id) {
        var element = document.getElementById(id);
        element.style = "display:none";
    }

    #showElement(id) {
        var element = document.getElementById(id);
        element.style = "display:block";
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

    copyLetterImage(startLetterLocation) {
        var screenPos = this.#getScreenPositionFromRowColumn(startLetterLocation.row, startLetterLocation.column);
        screenPos.x -= this.fontSize / 2.0;
        screenPos.y -= this.fontSize / 2.0;
        this.#startLetterImage = this.ctx.getImageData(screenPos.x, screenPos.y, this.fontSize, this.fontSize);
    }

    replaceLetterimage(startLetterLocation) {
        var screenPos = this.#getScreenPositionFromRowColumn(startLetterLocation.row, startLetterLocation.column);
        screenPos.x -= this.fontSize / 2.0;
        screenPos.y -= this.fontSize / 2.0;
        this.ctx.putImageData(this.#startLetterImage, screenPos.x, screenPos.y);
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

    crossOutWord(word) {
        word = word.toUpperCase();

        var selector = "p[word='" + word + "']";
        var hiddenWord = document.querySelector(selector);
        if (hiddenWord != null) {
            hiddenWord.style.textDecoration = "line-through";
        }
    }
}