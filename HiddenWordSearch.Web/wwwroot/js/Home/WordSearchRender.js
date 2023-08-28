'use strict';

class WordSearchRender {
    #colours = ["red", "green", "blue", "purple", "orange"];
    #letterHighlightColour = "white";
    #currentColour = 0;
    #startLetterImage = null;
    #wordSearchId = "cardWordSearch";
    #welcomeId = "cardWelcome";

    constructor(canvasId) {
        this.canvasId = canvasId;
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext("2d");
        this.fontSize = 24;
        this.gap = this.fontSize * 0.75;
        this.scale = 2;
        this.grid = null;
    }

    // cross out found word in the list
    crossOutWord(word) {
        word = word.toUpperCase();

        var selector = "p[word='" + word + "']";
        var hiddenWord = document.querySelector(selector);
        if (hiddenWord != null) {
            hiddenWord.style.textDecoration = "line-through";
        }
    }

    // Make a copy of starting letter prior to highlighting it. This will be restored if a correct word
    // is not found    
    copyLetterImage(startLetterLocation) {
        var screenPos = this.#getScreenPositionFromRowColumn(startLetterLocation.row, startLetterLocation.column);
        screenPos.x -= this.fontSize / 2.0;
        screenPos.y -= this.fontSize / 2.0;
        this.#startLetterImage = this.ctx.getImageData(screenPos.x, screenPos.y, this.fontSize, this.fontSize);
    }

    // Restore copied image of start letter taken prior to highlighting
    replaceLetterImage(startLetterLocation) {
        var screenPos = this.#getScreenPositionFromRowColumn(startLetterLocation.row, startLetterLocation.column);
        screenPos.x -= this.fontSize / 2.0;
        screenPos.y -= this.fontSize / 2.0;
        this.ctx.putImageData(this.#startLetterImage, screenPos.x, screenPos.y);
    }

    // draws a line to highlight the found hidden word
    highlightWord(startLocation, endLocation) {
        this.#fillInWord(startLocation, endLocation);
        this.#fillInLetters(startLocation, endLocation);
        this.#pickNextColour();
    }

    // draws word search grid
    renderGrid(hiddenWordSearch) {
        this.grid = new Array(hiddenWordSearch.wordGrid.rows);
        this.#hideElement(this.#welcomeId);
        this.#showElement(this.#wordSearchId);        
        this.#setWordSearchTitle(hiddenWordSearch.title)
        this.#createWordSearchCanvas(hiddenWordSearch);
        this.#createWordSearchGrid(hiddenWordSearch);
        this.#displayHiddenWordList(hiddenWordSearch);
    }

    // highlights the letter given by location, used when user clicks on a start letter
    highlightLetter(location) {      
        console.log(`highlightLetter: Row ${location.row}, Column ${location.column}`); 
        
        // given the row and column, find centre point of the letter
        var screenPos = this.#getScreenPositionFromRowColumn(location.row, location.column);
        
        var letter = this.grid[location.row][location.column];
        this.#drawCircle(screenPos.x, screenPos.y);
        this.#drawLetter(screenPos.x, screenPos.y, this.#letterHighlightColour, letter);
    }

    // create canvas that word search grid will be drawn on
    #createWordSearchCanvas(hiddenWordSearch) {
        var canvasWidth = (hiddenWordSearch.wordGrid.columns) * (this.fontSize + this.gap) + (this.fontSize / 2.0);
        var canvasHeight = (hiddenWordSearch.wordGrid.rows) * (this.fontSize + this.gap);

        this.canvas.width = canvasWidth;
        this.canvas.height = canvasHeight;

        this.ctx.textAlign = "center";
        this.ctx.textBaseline = "middle";
        this.ctx.font = "24px Arial Black";

        this.#showElement(this.#wordSearchId);
    }

    // draw all letters of the grid on the page
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

    // display all hidden words on page
    #displayHiddenWordList(hiddenWordSearch) {
        var numWords = hiddenWordSearch.hiddenWords.length;
        var divWordList = document.getElementById("divWordList");
        divWordList.innerHTML = '';

        var list = document.createElement("ul");
        divWordList.appendChild(list);

        for (var idx = 0; idx < numWords; idx++) {
            console.log(`${hiddenWordSearch.hiddenWords[idx].word}`);
            var item = document.createElement("p");
            item.setAttribute("word", hiddenWordSearch.hiddenWords[idx].word);
            item.classList.add("hiddenWord");
            item.innerHTML = hiddenWordSearch.hiddenWords[idx].word;
            list.appendChild(item);
        }
    }

    // set innterTest of given element id
    #setWordSearchTitle(title) {
        var element = document.getElementById("wordSearchDisplayTitle");
        element.innerText = title;
    }

    // make sure the element given by id is not visible
    #hideElement(id) {
        var element = document.getElementById(id);
        element.style = "display:none";
    }

    // make sure the element given by id is visible
    #showElement(id) {
        var element = document.getElementById(id);
        element.style = "display:block";
    }

    // given the start and end positions, return the increment required to get from start to end
    // end is either in same plane as start, before it or after it
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

    // highlights just the letters of the word after main rectangle to highlight is drawn
    #fillInLetters(startLocation, endLocation) {
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

    // returns actual screen x, y position relative to top left corner of the canvas, given the row and column
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

    // highlights a selected word on the grid
    #fillInWord(startLocation, endLocation, colour) {        
        var start = this.#getScreenPositionFromRowColumn(startLocation.row, startLocation.column);
        var end = this.#getScreenPositionFromRowColumn(endLocation.row, endLocation.column);
        
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

    // get next colour to use when highlighting the selected word
    #getCurrentColour() {
        var colour = this.#colours[this.#currentColour];
        return colour;
    }

    // pick next colour in sequence of colours
    #pickNextColour() {
        var numColours = this.#colours.length;
        this.#currentColour = (this.#currentColour + 1) % numColours;
    }

    // draws the circle to highlight the starting letter the user has selected
    #drawCircle(x, y) {
        this.ctx.beginPath();
        this.ctx.arc(x, y, this.fontSize / this.scale, 0, 2 * Math.PI, false);
        this.ctx.fillStyle = this.#getCurrentColour();
        this.ctx.fill();
    }

    // draws the highlighted letter white to stand out a bit more
    #drawLetter(x, y, colour, letter) {
        this.ctx.fillStyle = colour;
        this.ctx.fillText(letter, x, y);
    }
}