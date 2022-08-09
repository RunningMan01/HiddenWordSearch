'use strict';

var _modalSettings;
var _wordSearchRender;
var _wordSearchService;
var _hiddenWordSearch;
var _startSelected = false;

window.onload = function () {
    // alert("page loaded");
    var buttonSettings = document.getElementById("buttonSettings");
    buttonSettings.addEventListener("click", showSettingsModal);

    var buttonCreateWordsearch = document.getElementById("buttonCreateWordsearch");
    buttonCreateWordsearch.addEventListener("click", createWordSearch);

    var canvasGrid = document.getElementById("canvasGrid");
    canvasGrid.addEventListener("click", canvasGridClicked);

    _wordSearchRender = new WordSearchRender("canvasGrid");
    _wordSearchService = new WordSearchService(_wordSearchRender);
}

function showSettingsModal() {
    _modalSettings = new bootstrap.Modal(document.getElementById('exampleModal'), {
        keyboard: false
    })
    _modalSettings.show();
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
    _modalSettings.hide();
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