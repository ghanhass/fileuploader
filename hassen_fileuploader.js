/**
 * hfu is the general class for the plugin
 * @param {Object} config - general configuration object when instanciating hfu().
 * 
 * //config elements:
 * @param {String} config.hfuFileinputPrototype - Main file input to apply the plugin on. (CSS selector)  => mandatory
 * @param {String} config.hfuFilesList - HTMLElement in which the selected files' names menu will be shown up. (CSS selector) => mandatory
 * @param {Array} config.hfuContainerDivClass - Array of custom classes to apply on the outer container DIV of the plugin. => optional
 * @param {Array} config.hfuDropHereClass - Array of custom classes to apply on the drop-here text of the plugin. => optional
 * @param {Array} config.hfuFilesListClass - Array of custom classes to apply on the files list of the plugin. => optional
 * @param {String} config.hfuContainerDivFocusClass - custom class to apply on the outer container DIV of the plugin in focus mode (on hover). => optional
 * @param {String} config.hfuDropHereFocusClass - custom class to apply on the drop-here text of the plugin in focus mode (on hover). => optional
 * @param {String} config.lang - main language of the plugin. (en/fr). - defaults to en => optional
 * @param {Array} config.fileTypes - Array of allowed file extensions (strings). => optional
 * @param {String} config.fileName - File name to use for the input element in the server script (php) => mandatory
 * @param {Bool} config.showTumbnail - true/false whether a thumbnail of the selected file should be shown (only images) - defaults to false => optional
 */
class hfu {
    constructor(config) {
        try {
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
            this.hfuFileinputPrototype = config.hfuFileinputPrototype;
            this.hfuFilesList = config.hfuFilesList;
            this.hfuFilesListClass = config.hfuFilesListClass;
            this.hfuContainerDivClass = config.hfuContainerDivClass;
            this.hfuContainerDivFocusClass = config.hfuContainerDivFocusClass;
            this.hfuDropHereClass = config.hfuDropHereClass;
            this.hfuDropHereFocusClass = config.hfuDropHereFocusClass;
            this.lang = config.lang;
            this.fileName = config.fileName;
            this.hfuRemoveFileBtnClass = config.hfuRemoveFileBtnClass;
            this.hfuFilenameSpanClass = config.hfuFilenameSpanClass;

            //START checking for errors
            if (document.querySelector(this.hfuFileinputPrototype)) { //hfuFileinputPrototype is a valid element ?
                if (!(document.querySelector(this.hfuFileinputPrototype).tagName == "INPUT" && document.querySelector(this.hfuFileinputPrototype).getAttribute("type") == "file")) {
                    throw ("hfu ERROR: hfuFileinputPrototype must be a file input element name (one-element css selector string)");
                }
            } else {
                throw ("hfu ERROR: hfuFileinputPrototype property is mandatory (one-element css selector string)");
            }
            //
            console.log(document.querySelector(this.hfuFilesList));
            if (!document.querySelector(this.hfuFilesList)) {
                throw ("hfu ERROR: hfuFilesList property is mandatory (one-element css selector string)");
            } else if (this.fileName.indexOf(" ") != -1) {
                throw ("hfu ERROR: fileName property is mandatory (string)");
            }
            //
            if (this.hfuFilesListClass != undefined) {
                if (Array.isArray(this.hfuFilesListClass)) {
                    for (let i = 0; i < this.hfuFilesListClass.length; i++) {
                        if (this.hfuFilesListClass[i].indexOf(" ") != -1) {
                            throw ("hfu ERROR: hfuFilesListClass property must be an Array of class names");
                            break;
                        }
                    }
                } else {
                    throw ("hfu ERROR: hfuFilesListClass property must be an Array of class names");
                }
            }
            //
            if (this.hfuContainerDivClass != undefined) {
                if (typeof(this.hfuContainerDivClass) != "string") {
                    throw ("hfu ERROR: hfuContainerDivClass property must be a class name (String)");
                } else {
                    if (this.hfuContainerDivClass.indexOf(" ") != -1) {
                        throw ("hfu ERROR: hfuContainerDivClass property must be a class name (non-spaced String)");
                    }
                }
            }
            //
            if (this.hfuContainerDivFocusClass != undefined) {
                if (typeof(this.hfuContainerDivFocusClass) != "string") {
                    throw ("hfu ERROR: hfuContainerDivFocusClass property must be a class name (String)");
                } else {
                    if (this.hfuContainerDivFocusClass.indexOf(" ") != -1) {
                        throw ("hfu ERROR: hfuContainerDivFocusClass property must be a class name (non-spaced String)");
                    }
                }
            }
            //
            if (this.hfuDropHereClass != undefined) {
                if (typeof(this.hfuDropHereClass) != "string") {
                    throw ("hfu ERROR: hfuDropHereClass property must be a class name (String)");
                } else {
                    if (this.hfuDropHereClass.indexOf(" ") != -1) {
                        throw ("hfu ERROR: hfuDropHereClass property must be a class name (non-spaced String)");
                    }
                }
            }
            //
            if (this.hfuDropHereFocusClass != undefined) {
                if (typeof(this.hfuDropHereFocusClass) != "string") {
                    throw ("hfu ERROR: hfuDropHereFocusClass property must be a class name (String)");
                } else {
                    if (this.hfuDropHereFocusClass.indexOf(" ") != -1) {
                        throw ("hfu ERROR: hfuDropHereFocusClass property must be a class name (non-spaced String)");
                    }
                }
            }
            //
            if (this.lang != undefined) {
                if (typeof(this.lang) != "string") {
                    throw ("hfu ERROR: lang property must be a String");
                }
            }
            //
            if (this.fileName != undefined) {
                if (typeof(this.fileName) != "string") {
                    throw ("hfu ERROR: fileName property must be an input name (String)");
                } else {
                    if (this.fileName.indexOf(" ") == -1) {
                        throw ("hfu ERROR: fileName property must be an input name (non-spaced String)");
                    }
                }
            }
            //
            if (this.hfuRemoveFileBtnClass != undefined) {
                if (typeof(this.hfuRemoveFileBtnClass) != "string") {
                    throw ("hfu ERROR: hfuRemoveFileBtnClass property must be a class name (String)");
                } else {
                    if (this.hfuRemoveFileBtnClass.indexOf(" ")) {
                        throw ("hfu ERROR: hfuRemoveFileBtnClass property must be a class name (non-spaced String)");
                    }
                }
            }
            //
            if (this.hfuFilenameSpanClass != undefined) {
                if (typeof(this.hfuFilenameSpanClass) != "string") {
                    throw ("hfu ERROR: hfuFilenameSpanClass property must be a class name (String)");
                } else {
                    if (this.hfuFilenameSpanClass.indexOf(" ")) {
                        throw ("hfu ERROR: hfuRemoveFileBtnClass property must be a class name (non-spaced String)");
                    }
                }
            }
            //

            //END checking for errors

            let hfuFileinputPrototype = document.querySelector(this.hfuFileinputPrototype);
            let hfuFilesList = document.querySelector(config.hfuFilesList);
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
            let hfuContainerDiv = document.createElement("div");
            let hfuAbsoluteDiv = document.createElement("div");
            let hfuDropHere = document.createElement("h3");
            let hfuDataDiv = document.createElement("div");

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
                for (let i = 0; i < config.hfuContainerDivClass.length; i++) {
                    hfuContainerDiv.classList.add(config.hfuContainerDivClass[i]);
                }
            }
            //
            if (Array.isArray(config.hfuDropHereClass)) { //User list of custom classes for hfuDropHere
                for (let i = 0; i < config.hfuDropHereClass.length; i++) {
                    hfuDropHere.classList.add(config.hfuDropHereClass[i]);
                }
            }
            //
            if (Array.isArray(config.hfuFilesListClass)) { //User list of custom classes for hfuFilesList
                for (let i = 0; i < config.hfuFilesListClass.length; i++) {
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


            //START events 
            hfuFileinputPrototype.addEventListener("change", function(event) {
                console.log("input changed !");
                console.log(this);
                console.log(this.files);
                console.log(event.timeStamp);
                let newDivElement = document.createElement("div");
                let hfuFilenameSpan = document.createElement("span");
                hfuFilenameSpan.textContent = this.files[0].name;
                hfuFilenameSpan.classList.add("hfuFilenameSpan");
                let hfuRemoveFileBtn = document.createElement("button");

                hfuRemoveFileBtn.setAttribute("type", "button");
                hfuRemoveFileBtn.classList.add("hfuRemoveFileBtn");
                hfuRemoveFileBtn.dataset.id = event.timeStamp;
                hfuRemoveFileBtn.textContent = 'X';
                newDivElement.appendChild(hfuFilenameSpan);
                newDivElement.appendChild(hfuRemoveFileBtn);

                hfuFilesList.appendChild(newDivElement);

                //Start - add custom classes for hfuRemoveFileBtn  and  hfuFilenameSpan  DOM elements

                if (Array.isArray(config.hfuFilenameSpanClass)) { //User list of custom classes for hfuFilenameSpan
                    for (let i = 0; i < config.hfuFilenameSpanClass.length; i++) {
                        hfuFilenameSpan.classList.add(config.hfuFilenameSpanClass[i]);
                    }
                }
                //
                if (Array.isArray(config.hfuRemoveFileBtnClass)) { //User list of custom classes for hfuRemoveFileBtn
                    for (let i = 0; i < config.hfuRemoveFileBtnClass.length; i++) {
                        hfuRemoveFileBtn.classList.add(config.hfuRemoveFileBtnClass[i]);
                    }
                }

                //END - add custom classes for hfuRemoveFileBtn  and  hfuFilenameSpan  DOM elements
                let newInput = this.cloneNode(true);
                newInput.setAttribute("name", config.fileName);

                newInput.removeAttribute("id");
                newInput.removeAttribute("name");
                newInput.removeAttribute("class");
                newInput.removeAttribute("title");

                newInput.style.cssText = "display: none";
                newInput.dataset.id = event.timeStamp;
                hfuDataDiv.appendChild(newInput);
            });

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
                    let removeBtnElement = event.target;
                    console.log(removeBtnElement);
                    //console.log("remove btn clicked");
                    let inputElement = document.querySelector("input[data-id='" + removeBtnElement.dataset.id + "']");
                    console.log(inputElement);
                    inputElement.parentNode.removeChild(inputElement);
                    let divElement = removeBtnElement.parentNode;
                    console.log(divElement);
                    divElement.parentNode.removeChild(divElement);
                }
            });
            //END events  
        } catch (err) {
            console.log(err);
        }
    }

    destroy() {

    }
}

/*function hfu(config) {}*/
//