'use strict';

class ConfigureModal {
    #configureModalForm = null;
    #createWordSearchButtonId = "buttonCreateWordsearch";
    #configureModalId = "configureModal";
    
    constructor(callback) {       
        this.callback = callback;

        var buttonCreateWordsearch = document.getElementById(this.#createWordSearchButtonId);
        buttonCreateWordsearch.addEventListener("click", this.#ValidateWordSearch.bind(this));
    }

    showConfigureModal() {
        this.#configureModalForm = new bootstrap.Modal(document.getElementById(this.#configureModalId), {
            keyboard: false
        })
        this.#configureModalForm.show();
    }

    hideConfigureModal() {
        this.#configureModalForm.hide();
    }

    #ValidateWordSearch() {
        // ToDo - should form be validated, or validated within c# hiddenWordSsearch class (probably this !)
        // Create method hear, populateErrors as they are returned from controller
        // rows, columns < 15
        // no words greater than rows / columns max size
        // at least 5 words specified ?
        // title entered
        this.callback();
    }
}