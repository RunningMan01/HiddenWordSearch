'use strict';

class WordSearchService {
    constructor(wordSearchRender) {
        this.wordSearchRender = wordSearchRender;
        this.startLetterSelected = false;
        this.startLetterLocation = null;
    }

    set HiddenWordSearch(hiddenWordSearch) {
        if (hiddenWordSearch != null) {
            this.hiddenWordSearch = hiddenWordSearch;
        }        
    }

    // ToDo - this isn't working. Cant seem to find valid words, might be comapring 0 based against 1 based ??
    #findHiddenWord(startLetterLocation, endLetterLocation) {

        var numHiddenWords = this.hiddenWordSearch.hiddenWords.length;
        var hiddenWords = this.hiddenWordSearch.hiddenWords;

        for (var idx = 0; idx < numHiddenWords; idx++) {
            if (this.#compareGridLocations(hiddenWords[idx].startLocation, startLetterLocation) &&
                this.#compareGridLocations(hiddenWords[idx].endLocation, endLetterLocation)) {
                    console.log("we have a match: " + hiddenWords[idx].Word)
                    return hiddenWords[idx];
            }
        }

        console.log("not found");
        return null;
    }

    #compareGridLocations(location1, location2) {
        if (location1.row != location2.row) return false;
        if (location2.column != location1.column) return false;

        return true;
    }

    // ToDo - refactor this method
    letterClicked(x, y) {
        var offsetY = y + (this.wordSearchRender.fontSize * this.wordSearchRender.scale * 0.5);
        var row = offsetY / (this.wordSearchRender.fontSize * this.wordSearchRender.scale * 1.0);
        row = Math.floor(row);
        if (row < 1 || row > this.hiddenWordSearch.wordGrid.rows) return;

        var offsetX = x + (this.wordSearchRender.fontSize * this.wordSearchRender.scale * 0.5);
        var column = offsetX / (this.wordSearchRender.fontSize * this.wordSearchRender.scale * 1.0);
        column = Math.floor(column);
        if (column < 1 || this.hiddenWordSearch.wordGrid.columns > 10) return;        
       
        if (this.startLetterSelected) {
            console.log("start letter is selected");
            // start letter previously selected, check the letter just selected and the start is one
            // of the hidden words
            var endLetterLocation = {
                row: row - 1,
                column: column - 1
            }
            var hiddenWord = this.#findHiddenWord(this.startLetterLocation, endLetterLocation);
            if (hiddenWord != null) {
                this.wordSearchRender.highlightWord(this.startLetterLocation, endLetterLocation);
                // this.wordSearchRender.crossOutWord(hiddenWord);
                this.startLetterSelected = false;
                this.startLetterLocation = null;
            }            
        }
        else {
            console.log("start letter not selected");
            // start letter clicked on, store this
            this.startLetterSelected = true;
            this.startLetterLocation = {
                row: row - 1,
                column: column - 1
            }
            this.wordSearchRender.highlightLetter(row, column);
        }        
    }
}