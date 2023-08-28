'use strict';

class ConfigureModal extends EventTarget{
    #event = null;
    #configureModalForm = null;
    #createWordSearchButtonId = "buttonCreateWordsearch";
    #cancelButton = "buttonModalConfigureCancel";
    #configureModalId = "configureModal";
    // todo - this needs to be passedd in
    #wordSearchConfiguration = {
        title: "my word search",
        rows: 10,
        columns: 10,
        words: ""
    };        
    
    constructor(callback) {
        super();
        
        var buttonCreateWordsearch = document.getElementById(this.#createWordSearchButtonId);
        buttonCreateWordsearch.addEventListener("click", this.#storeWordSearchSettings.bind(this));

        var buttonCancel = document.getElementById(this.#cancelButton);
        buttonCancel.addEventListener("click", this.hideConfigureModal.bind(this));              
    }

    // todo - this would be retrieved from calling javascript, no need for callback
    get wordSearchConfiguration() {
        return this.#wordSearchConfiguration;
    }

    // todo - pass in array of values
    showConfigureModal() {
        // todo - save current settings
        this.#restoreWordSearchSettings(); // todo - this updates modal to show current configuration
        this.#configureModalForm = new bootstrap.Modal(document.getElementById(this.#configureModalId), {
            keyboard: false
        })
        this.#configureModalForm.show();
    }

    // called when cancel clicked, set property to indicate
    hideConfigureModal() {
        //this.#action = 0;
        //console.log("hideConfigureModal: action is " + this.#action);
        this.#configureModalForm.hide();
    }

    // called when create word search clicked, store user defined settings for wordsearch
    #storeWordSearchSettings() {
        this.#configureModalForm.hide();
        //this.#action = 1;
        //console.log("storeWordSearchSettings: action is " + this.#action);        

        this.#wordSearchConfiguration = {
            title: $("#wordSearchTitle").val(),
            rows: $("#wordSearchRows").val(),
            columns: $("#wordSearchCols").val(),
            words: $("#wordSearchWords").val()
        }

        // Raise event to with user defined wordsearch settings
        this.#event = new CustomEvent("createWordSearch", { wordSearchConfiguration: this.#wordSearchConfiguration });
        this.dispatchEvent(this.#event);
    }

    #restoreWordSearchSettings() {
        $("#wordSearchTitle").val(this.#wordSearchConfiguration.title);
        $("#wordSearchRows").val(this.#wordSearchConfiguration.rows);
        $("#wordSearchCols").val(this.#wordSearchConfiguration.columns);
        $("#wordSearchWords").val(this.#wordSearchConfiguration.words);

    }

    // todo - restore this if attempt to set values and retrieve fails
    //#ValidateWordSearch() {
    //    // ToDo - should form be validated, or validated within c# hiddenWordSsearch class (probably this !)
    //    // Create method here, populateErrors as they are returned from controller
    //    // rows, columns < 15
    //    // no words greater than rows / columns max size
    //    // at least 5 words specified ?
    //    // title entered
    //    this.callback();
    //}
}