'use strict';

var _modalSettings;
var _wordSearchRender;
var _wordSearchService;
var _configureModal;
var _hiddenWordSearch;
var _startSelected = false;
var _createWordSearchUrl = "/Home/GetWordSearch";
//var _wordSearchConfiguration;
var _wordSearchConfiguration = {
    title: "my word search",
    rows: 10,
    columns: 10,
    words: ""
};  

window.onload = function () {
    var buttonSettings = document.getElementById("buttonConfigure");
    buttonSettings.addEventListener("click", showSettingsModal);

    var canvasGrid = document.getElementById("canvasGrid");
    canvasGrid.addEventListener("click", canvasGridClicked);

    var buttonRegenerate = document.getElementById("buttonRegenerateWordSearch");
    buttonRegenerate.addEventListener("click", createWordSearch);

    var buttonEdit = document.getElementById("buttonEditWordSearch");
    buttonEdit.addEventListener("click", editWordSearch);

    _configureModal = new ConfigureModal(createWordSearch);
    _wordSearchRender = new WordSearchRender("canvasGrid");
    _wordSearchService = new WordSearchService(_wordSearchRender);

    _configureModal.addEventListener("createWordSearch", function (e) {
        console.log("createWordSearch event ", e);
        createWordSearch();
    });
}

//ToDoo - needs to accept a settings object
function showSettingsModal() {    
    _configureModal.showConfigureModal(_wordSearchConfiguration);
    console.log("_configureModal.action: " + _configureModal.action);    
}

function editWordSearch() {
    console.log("editWordSearch: " + JSON.stringify(_configureModal.wordSearchConfiguration));
    showSettingsModal();    
}

//ToDoo - can we retrieve these settings for Edit option as well ?
function createWordSearch() {
    var ajaxFunctions = new AjaxFunctions();
    
    ajaxFunctions.requestWithCallback(_createWordSearchUrl, _configureModal.wordSearchConfiguration, wordSearchCreatedCallback);   
}

// wordSearchCreatedCallback - This is the main wordSearch grid render routine, called from the Ajax method
// requestWithCallback
function wordSearchCreatedCallback(hiddenWordSearch) {
    console.log("hiddenWordSearch: start");
    console.log(JSON.stringify(hiddenWordSearch));

    _hiddenWordSearch = hiddenWordSearch;
    _wordSearchService.HiddenWordSearch = hiddenWordSearch;
    _wordSearchRender.renderGrid(hiddenWordSearch);
}

// User has clicked on the canvas
function canvasGridClicked(evt) {
    console.log("canvas clicked: X:" + evt.clientX + ", Y:" + evt.clientY);
    console.log("canvas clicked: X:" + evt.offsetX + ", Y:" + evt.offsetY);

    _wordSearchService.letterClicked(evt.offsetX, evt.offsetY);
}