﻿'use strict';

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

    #isLetterClicked(value) {
        var clicked = true;
        if (value < 0) clicked = false;
        if (value - parseInt(value) >= 0.5) clicked = false;
        return clicked;
    }

    #startLocationClickedAgain (startLetterLocation, endLetterLocation) {
        if (startLetterLocation.x != endLetterLocation.x) return false;
        if (startLetterLocation.y != endLetterLocation.y) return false;

        return true;
    }

    // ToDo - refactor this method
    letterClicked(x, y) {        
        // ToDo - Seperate function - x, y to row, column
        console.log(`letterClicked: x ${x}, y ${y}`);
        var row = (y - this.wordSearchRender.fontSize / 2.0) / (this.wordSearchRender.fontSize + this.wordSearchRender.gap);
        var column = (x - this.wordSearchRender.fontSize / 2.0) / (this.wordSearchRender.fontSize + this.wordSearchRender.gap);

        // if letter is not directly clikced on then reutnr
        if (!(this.#isLetterClicked(row) && this.#isLetterClicked(column))) return;
        row = Math.floor(row);
        column = Math.floor(column);

        console.log(`letterClicked ${row}, ${column}`);    
       
        if (this.startLetterSelected) {
            console.log("start letter has previously been selected selected");

            // start letter previously selected, check the letter just selected and the start is one
            // of the hidden words
            var endLetterLocation = {
                row: row,
                column: column
            }

            if (this.#startLocationClickedAgain(this.startLetterLocation, endLetterLocation)) {
                // replace letter image as it was
                this.wordSearchRender.replaceLetterimage(this.startLetterLocation);
            }

            var hiddenWord = this.#findHiddenWord(this.startLetterLocation, endLetterLocation);
            if (hiddenWord != null) {
                this.wordSearchRender.highlightWord(this.startLetterLocation, endLetterLocation);
                this.wordSearchRender.crossOutWord(hiddenWord.word);
            }

            this.startLetterSelected = false;
            this.startLetterLocation = null;
        }
        else {
            console.log("start letter not selected");
            // start letter clicked on, store this
            this.startLetterSelected = true;
            this.startLetterLocation = {
                row: row,
                column: column
            }
            this.wordSearchRender.copyLetterImage(this.startLetterLocation);
            this.wordSearchRender.highlightLetter(this.startLetterLocation);
        }        
    }
}