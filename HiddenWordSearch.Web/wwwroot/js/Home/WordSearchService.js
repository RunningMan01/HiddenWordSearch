'use strict';

class WordSearchService {
    constructor(wordSearchRender) {
        this.wordSearchRender = wordSearchRender;
        this.startLetterSelected = false;
        this.startLetterLocation = null;
    }

    // property setter for hidden word search
    set HiddenWordSearch(hiddenWordSearch) {
        if (hiddenWordSearch != null) {
            this.hiddenWordSearch = hiddenWordSearch;
        }        
    }

    // User has selected a potential word, check to see if this potential word matches
    // the list of words in the list to find    
    #findHiddenWord(startLetterLocation, endLetterLocation) {
        var numHiddenWords = this.hiddenWordSearch.hiddenWords.length;
        var hiddenWords = this.hiddenWordSearch.hiddenWords;

        for (var idx = 0; idx < numHiddenWords; idx++) {
            if (this.#gridLocationsMatch(hiddenWords[idx].startLocation, startLetterLocation) &&
                this.#gridLocationsMatch(hiddenWords[idx].endLocation, endLetterLocation)) {
                    console.log("we have a match: " + hiddenWords[idx].Word)
                    return hiddenWords[idx];
            }
        }
       
        return null;
    }

    // compares two locations, returns true if they match, otherwise false
    #gridLocationsMatch(location1, location2) {
        if (location1.row != location2.row) return false;
        if (location2.column != location1.column) return false;

        return true;
    }

    // returns true if user has clicked on an actual letter, rather than a gap between the letters
    // value is either row or column clicked on, could be a part value
    #isLetterClicked(value) {
        var clicked = true;
        if (value < 0) clicked = false;
        if (value - parseInt(value) >= 0.5) clicked = false;
        return clicked;
    }

    // returns true if original start letter is clicked again
    #startLocationClickedAgain (startLetterLocation, endLetterLocation) {
        if (startLetterLocation.row != endLetterLocation.row) return false;
        if (startLetterLocation.column != endLetterLocation.column) return false;

        return true;
    }

    #getGridPositionFromScreenPosition(screenPosition) {
        var gridPosition = (screenPosition - this.wordSearchRender.fontSize / 2.0) / (this.wordSearchRender.fontSize + this.wordSearchRender.gap);
        return gridPosition;
    }
    
    letterClicked(screenX, screenY) {                
        console.log(`letterClicked: x ${screenX}, y ${screenY}`);
        
        var row = this.#getGridPositionFromScreenPosition(screenY);
        var column = this.#getGridPositionFromScreenPosition(screenX);

        // if a letter is not directly clicked on then return
        if (!(this.#isLetterClicked(row) && this.#isLetterClicked(column))) return;

        row = Math.floor(row);
        column = Math.floor(column);

        console.log(`letterClicked ${row}, ${column}`);
       
        if (this.startLetterSelected) {
            console.log("start letter has previously been selected");

            // start letter was previously selected
            var endLetterLocation = { row: row, column: column }

            if (this.#startLocationClickedAgain(this.startLetterLocation, endLetterLocation)) {
                // replace saved letter image as start letter was clicked again
                this.wordSearchRender.replaceLetterImage(this.startLetterLocation);
            }
            else {
                var hiddenWord = this.#findHiddenWord(this.startLetterLocation, endLetterLocation);
                if (hiddenWord != null) {
                    // User has correctly identified the start and end letter of a hidden word
                    this.wordSearchRender.highlightWord(this.startLetterLocation, endLetterLocation);
                    this.wordSearchRender.crossOutWord(hiddenWord.word);
                }
            }

            this.startLetterSelected = false;
            this.startLetterLocation = null;
        }
        else {
            // User has clicked on start letter, store this
            this.startLetterSelected = true;
            this.startLetterLocation = {
                row: row,
                column: column
            }
            // Store image of start letter and highlight it
            this.wordSearchRender.copyLetterImage(this.startLetterLocation);
            this.wordSearchRender.highlightLetter(this.startLetterLocation);
        }        
    }
}