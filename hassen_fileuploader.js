/**
 * hfu is the general function to generate the plugin
 * @param {Object} config - general configuration object when calling hfu().
 * 
 * //config elements:
 * @param {HTMLElement} config.hfuFileinputPrototype - main file input to apply the plugin on. (CSS selector)
 * @param {HTMLElement} config.hfuFilesList - HTMLElement in which the selected files' names menu will be shown up. (CSS selector)
 * @param {Array} config.hfuContainerDivClass - Array of custom classes to apply on the outer container DIV of the plugin.
 * @param {Array} config.hfuDropHereClass - Array of custom classes to apply on the drop-here text of the plugin.
 * @param {Array} config.hfuFilesListClass - Array of custom classes to apply on the files list of the plugin.
 * @param {String} config.hfuContainerDivFocusClass - custom class to apply on the outer container DIV of the plugin in focus mode (on hover).
 * @param {String} config.hfuDropHereFocusClass - custom class to apply on the drop-here text of the plugin in focus mode (on hover).
 * @param {String} config.lang - main language of the plugin. (en/fr). - defaults to en
 * @param {Array} config.fileTypes - Array of allowed file extensions (strings).
 * @param {String} config.fileName - File name to use for the input element in the server script (php)
 * @param {Bool} config.showTumbnail - true/false whether a thumbnail of the selected file should be shown (only images) - defaults to false
 */
function hfu(config) {
    var texts = {
        "dropHereText": {
            'en': 'Drop files here',
            'fr': 'Glissez vos fichiers ici',
        },
        "deleteFile": {
            'en': 'Delete file',
            'fr': 'Supprimer le fichier',
        },
    }
    var hfuFileinputPrototype = document.querySelector(config.hfuFileinputPrototype);
    var hfuFilesList = document.querySelector(config.hfuFilesList);
    if (!hfuFileinputPrototype.classList.contains("hfuFileinputPrototype")) { //targetted file input does NOT  have the 'hfuFileinputPrototype' class ? add it
        hfuFileinputPrototype.classList.add("hfuFileinputPrototype");
    }
    if (config.isMultiple) { //targetted file has the multiple attribute ?
        hfuFileinputPrototype.setAttribute("name", "hfuFileinputPrototype[]");
    } else {
        hfuFileinputPrototype.setAttribute("name", "hfuFileinputPrototype");
    }

    hfuFileinputPrototype.removeAttribute("multiple");
    hfuFileinputPrototype.multiple = false;

    ////START - building elements
    var hfuContainerDiv = document.createElement("div");
    var hfuAbsoluteDiv = document.createElement("div");
    var hfuDropHere = document.createElement("h3");
    var hfuDataDiv = document.createElement("div");

    //START - setting texts
    if (Object.keys(texts.dropHereText).indexOf(config.lang) != -1) { //lang chosen for the hfuDropHere is valid?
        hfuDropHere.textContent = texts.dropHereText[config.lang];
        hfuFileinputPrototype.setAttribute("title", texts.dropHereText[config.lang]);
    } else { // english default for the hfuDropHere
        hfuDropHere.textContent = texts.dropHereText.en;
        hfuFileinputPrototype.setAttribute("title", texts.dropHereText.en);
    }
    //END - setting texts

    hfuContainerDiv.classList.add("hfuContainerDiv");
    hfuAbsoluteDiv.classList.add("hfuAbsoluteDiv");
    hfuDropHere.classList.add("hfuDropHere");
    hfuDataDiv.classList.add("hfuDataDiv");

    if (Array.isArray(config.hfuContainerDivClass)) { //User list of custom classes for hfuContainerDiv
        for (let i = 0; i < config.hfuContainerDivClass.length; i++){
            hfuContainerDiv.classList.add(config.hfuContainerDivClass[i]);
        }
    }
    //
    if (Array.isArray(config.hfuDropHereClass)) { //User list of custom classes for hfuDropHere
        for (let i = 0; i < config.hfuDropHereClass.length; i++){
            hfuDropHere.classList.add(config.hfuDropHereClass[i]);
        }
    }
    //
    if (Array.isArray(config.hfuFilesListClass)) { //User list of custom classes for hfuFilesList
        for (let i = 0; i < config.hfuFilesListClass.length; i++){
            hfuFilesList.classList.add(config.hfuFilesListClass[i]);
        }
    }
    //

    hfuAbsoluteDiv.appendChild(hfuDropHere);

    hfuContainerDiv.appendChild(hfuAbsoluteDiv);
    hfuContainerDiv.appendChild(hfuFileinputPrototype.cloneNode(true));
    hfuContainerDiv.appendChild(hfuDataDiv);


    hfuFileinputPrototype.parentNode.insertBefore(hfuContainerDiv, hfuFileinputPrototype);
    hfuFileinputPrototype.parentNode.removeChild(hfuFileinputPrototype);
    hfuFileinputPrototype = document.querySelector(config.hfuFileinputPrototype);
    ////END building elements

    hfuFileinputPrototype.addEventListener("change", function(event) {
        console.log("input changed !");
        console.log(this);
        console.log(this.files);
        console.log(event.timeStamp);
	    var newDivElement = document.createElement("div");
	    var hfuFilenameSpan = document.createElement("span");
	    hfuFilenameSpan.textContent = this.files[0].name;
 	    hfuFilenameSpan.classList.add("hfuFilenameSpan");
        var hfuRemoveFileBtn = document.createElement("button");
	    
	    hfuRemoveFileBtn.setAttribute("type", "button");
	    hfuRemoveFileBtn.classList.add("hfuRemoveFileBtn");
	   	hfuRemoveFileBtn.dataset.id = event.timeStamp;
	    hfuRemoveFileBtn.textContent = 'X';
     	newDivElement.appendChild(hfuFilenameSpan);
     	newDivElement.appendChild(hfuRemoveFileBtn);
	    
        hfuFilesList.appendChild(newDivElement);

	   	//Start - add custom classes for hfuRemoveFileBtn  and  hfuFilenameSpan  DOM elements
	    
		if (Array.isArray(config.hfuFilenameSpanClass)) { //User list of custom classes for hfuFilenameSpan
	        for (let i = 0; i < config.hfuFilenameSpanClass.length; i++){
            	hfuFilenameSpan.classList.add(config.hfuFilenameSpanClass[i]);
        	}
		}
	    //
	    if (Array.isArray(config.hfuRemoveFileBtnClass)) { //User list of custom classes for hfuRemoveFileBtn
	        for (let i = 0; i < config.hfuRemoveFileBtnClass.length; i++){
            	hfuRemoveFileBtn.classList.add(config.hfuRemoveFileBtnClass[i]);
        	}
    	}

	    //END - add custom classes for hfuRemoveFileBtn  and  hfuFilenameSpan  DOM elements
        var newInput = this.cloneNode(true);
        newInput.setAttribute("name", config.fileName);

        newInput.removeAttribute("id");
        newInput.removeAttribute("name");
        newInput.removeAttribute("class");
        newInput.removeAttribute("title");

        newInput.style.cssText = "display: none";
        newInput.dataset.id = event.timeStamp;
        hfuDataDiv.appendChild(newInput);
    });

    //START events
    document.addEventListener("drop", function(event) {
        if (!event.target.isSameNode(hfuFileinputPrototype)) { //drop NOT happened on the drop file zone ?
            //event.preventDefault();
        } else {
            console.log("drop !");

            if (hfuDropHere.classList.contains('hfuDropHereFocus')) { //remove .hfuDropHereFocus from hfuDropHere after DROP
                hfuDropHere.classList.remove('hfuDropHereFocus');
            }
            if (config.hfuDropHereFocusClass) {
                if (hfuDropHere.classList.contains(config.hfuDropHereFocusClass)) { //remove config.hfuDropHereFocusClass from hfuDropHere after DROP
                    hfuDropHere.classList.remove(config.hfuDropHereFocusClass);
                }
            }

            if (hfuContainerDiv.classList.contains('hfuContainerDivFocus')) { //remove .hfuContainerDivFocus from hfuContainerDiv after DROP
                hfuContainerDiv.classList.remove('hfuContainerDivFocus');
            }
            if (config.hfuContainerDivFocusClass) {
                if (hfuContainerDiv.classList.contains(config.hfuContainerDivFocusClass)) { //remove config.hfuContainerDivFocusClass from hfuDropHere after DROP
                    hfuContainerDiv.classList.remove(config.hfuContainerDivFocusClass);
                }
            }

        }
    });

    document.addEventListener("dragover", function(event) {
        if (!event.target.isSameNode(hfuFileinputPrototype)) { //dragover NOT happened on the drop file zone ?
            //event.preventDefault();
        } else {
            console.log("dragover !");
            if (!hfuContainerDiv.classList.contains('hfuContainerDivFocus')) {
                hfuContainerDiv.classList.add('hfuContainerDivFocus');
            }
            if (!hfuContainerDiv.classList.contains('hfuContainerDivFocus')) {
                hfuContainerDiv.classList.add('hfuContainerDivFocus');
            }
            if (config.hfuContainerDivFocusClass) {
                if (!hfuContainerDiv.classList.contains(config.hfuContainerDivFocusClass)) { //add config.hfuContainerDivFocusClass from hfuDropHere after DROP
                    hfuContainerDiv.classList.add(config.hfuContainerDivFocusClass);
                }
            }

            if (!hfuDropHere.classList.contains('hfuDropHereFocus')) {
                hfuDropHere.classList.add('hfuDropHereFocus');
            }
            if (config.hfuDropHereFocusClass) {
                if (!hfuDropHere.classList.contains(config.hfuDropHereFocusClass)) { //add config.hfuDropHereFocusClass from hfuDropHere after DROP
                    hfuDropHere.classList.add(config.hfuDropHereFocusClass);
                }
            }
        }
    });
    document.addEventListener("dragleave", function(event) {
        if (event.target.isSameNode(hfuFileinputPrototype)) { //dragleave happened on the drop file zone ?
            console.log("dragleave !");
            if (hfuDropHere.classList.contains('hfuDropHereFocus')) {
                hfuDropHere.classList.remove('hfuDropHereFocus');
            }
            if (config.hfuDropHereFocusClass) {
                if (hfuDropHere.classList.contains(config.hfuDropHereFocusClass)) { //remove config.hfuDropHereFocusClass from hfuDropHere after DROP
                    hfuDropHere.classList.remove(config.hfuDropHereFocusClass);
                }
            }

            if (hfuContainerDiv.classList.contains('hfuContainerDivFocus')) {
                hfuContainerDiv.classList.remove('hfuContainerDivFocus');
            }
            if (config.hfuContainerDivFocusClass) {
                if (hfuContainerDiv.classList.contains(config.hfuContainerDivFocusClass)) { //remove config.hfuContainerDivFocusClass from hfuDropHere after DROP
                    hfuContainerDiv.classList.remove(config.hfuContainerDivFocusClass);
                }
            }
        }
    });
    document.addEventListener("click", function(event) {
        if (event.target.classList.contains("hfuRemoveFileBtn")) {
            removeBtnElement = event.target;
            console.log("remove btn clicked");
            var inputElement = document.querySelector("input[data-id='" + removeBtnElement.dataset.id + "']");
            inputElement.parentNode.removeChild(inputElement);
            var divElement = removeBtnElement.parentNode;
            divElement.parentNode.removeChild(divElement);
        }
    })

    //END events  
}
//
