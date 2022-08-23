'use strict';

var _modalSettings;
var _wordSearchRender;
var _wordSearchService;
var _configureModal;
var _hiddenWordSearch;
var _startSelected = false;

window.onload = function () {
    var buttonSettings = document.getElementById("buttonConfigure");
    buttonSettings.addEventListener("click", showSettingsModal);

    var canvasGrid = document.getElementById("canvasGrid");
    canvasGrid.addEventListener("click", canvasGridClicked);

    _configureModal = new ConfigureModal(createWordSearch);
    _wordSearchRender = new WordSearchRender("canvasGrid");
    _wordSearchService = new WordSearchService(_wordSearchRender);
}

function showSettingsModal() {
    _configureModal.showConfigureModal();
}

function createWordSearch() {
    var wordSearchSettings = {
        title: $("#wordSearchTitle").val(),
        rows: $("#wordSearchRows").val(),
        cols: $("#wordSearchCols").val(),
        words: $("#wordSearchWords").val()
    };
   
    var ajaxFunctions = new AjaxFunctions();
    ajaxFunctions.requestWithCallback("/Home/GetWordSearch", wordSearchSettings, wordSearchCreatedCallback);

    _configureModal.hideConfigureModal();
}

function wordSearchCreatedCallback(hiddenWordSearch) {
    _hiddenWordSearch = hiddenWordSearch;
    _wordSearchService.HiddenWordSearch = hiddenWordSearch;
    _wordSearchRender.renderGrid(hiddenWordSearch);
}

function canvasGridClicked(evt) {
    console.log("canvas clicked: X:" + evt.clientX + ", Y:" + evt.clientY);
    console.log("canvas clicked: X:" + evt.offsetX + ", Y:" + evt.offsetY);

    _wordSearchService.letterClicked(evt.offsetX, evt.offsetY);
}