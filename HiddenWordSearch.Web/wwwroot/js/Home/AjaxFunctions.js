// ToDo - Move this to generic area rather than Home folder
'use strict';

class AjaxFunctions {
    constructor() {              
    }

    requestWithCallback(url, settings, callback) {      
        var request;
        if (window.XMLHttpRequest) {
            request = new XMLHttpRequest();
        }

        if (request != null) {
            var url = "/Home/GetWordSearch";
            request.open("POST", url);
            request.setRequestHeader("Content-Type", "application/json");
            request.onreadystatechange = function () {
                var hiddenWordSearch;
                console.log(request.readyState);
                if (request.readyState == 4 && request.status == 200) {
                    hiddenWordSearch = JSON.parse(request.responseText);
                    callback(hiddenWordSearch);
                }
            };

            console.log("Title: " + settings.title);
            console.log("Rows: " + settings.rows);
            console.log("Cols: " + settings.cols);
            console.log("Words: " + settings.words);
            request.send(JSON.stringify(settings));
        }
    }
}