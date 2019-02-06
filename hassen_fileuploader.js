/** Hassen File Uploader     
 * hfu is the general class for the plugin
 * @param {Object} config - general configuration object when instanciating hfu().
 *            
 * //config elements:
 * @param {String} config.hfuFileinput - mandatory - Main file input to apply the plugin on. (CSS selector)
 * @param {String} config.hfuFilesList - mandatory - HTML Element in which the selected files' names menu will be shown up. (CSS selector)
 * @param {String} config.fileName - mandatory - File name to use for the input element in the server script
 * @param {Array} config.hfuContainerDivClass - optional - Array of custom classes to apply on the outer container DIV of the plugin. 
 * @param {Array} config.hfuDropHereTextClass - optional - Array of custom classes to apply on the drop-here text of the plugin. 
 * @param {Array} config.hfuDropHereAreaClass - optional - Array of custom classes to apply on the drop-here area of the plugin. 
 * @param {Array} config.hfuFilesListClass - optional - Array of custom classes to apply on the files list of the plugin. 
 * @param {Array} config.hfuContainerDivFocusClass - optional - Array of custom classes to apply on the outer container DIV of the plugin in focus mode (on hover). 
 * @param {Array} config.hfuDropHereTextFocusClass - optional - Array of custom classes to apply on the drop-here text of the plugin in focus mode (on hover). 
 * @param {Array} config.hfuDropHereAreaFocusClass - optional - Array of custom classes to apply on the drop-here area of the plugin in focus mode (on hover). 
 * @param {Array} config.hfuRemoveFileBtnClass - optional - Array of custom classes to apply on the hfuRemoveFileBtn element . 
 * @param {Array} config.hfuFilenameSpanClass - optional - Array of custom classes to apply on the hfuFilenameSpan element . 
 * @param {Array} config.hfuSpanBtnContainerClass - optional - Array of custom classes to apply on the div container of hfuFilenameSpan and hfuRemoveFileBtn elements . 
 * @param {String} config.lang - optional - main language of the plugin. (en/fr). - defaults to en 
 * @param {Array} config.fileTypes - optional - Array of allowed file extensions (strings). 
 * @param {Bool} config.showTumbnail - optional - true/false whether a thumbnail of the selected file should be shown (only images) - defaults to false
 */
class hfu {
    constructor(config) {
        try {
            this.texts = {
                "dropHereText": {
                    'en': 'Drop files here',
                    'fr': 'Glissez vos fichiers ici',
                },
                "deleteFile": {
                    'en': 'Delete file',
                    'fr': 'Supprimer le fichier',
                },
            }
            this.hfuFileinputOriginal = document.querySelector(config.hfuFileinput);
            this.hfuFileinputPrototype = document.createElement('input');
            this.hfuFileinputPrototype.setAttribute("type", "file");
            this.hfuFilesList = document.querySelector(config.hfuFilesList);
            this.hfuFilesListClass = config.hfuFilesListClass;
            this.hfuContainerDivClass = config.hfuContainerDivClass;
            this.hfuContainerDivFocusClass = config.hfuContainerDivFocusClass;
            this.hfuDropHereTextClass = config.hfuDropHereTextClass;
            this.hfuDropHereTextFocusClass = config.hfuDropHereTextFocusClass;
            this.lang = config.lang;
            this.fileName = config.fileName;
            this.hfuRemoveFileBtnClass = config.hfuRemoveFileBtnClass;
            this.hfuFilenameSpanClass = config.hfuFilenameSpanClass;
            this.showTumbnail = config.showTumbnail;
            var self = this;

            //START checking for errors
            //console.log(this.hfuFileinputOriginal);
            if (this.hfuFileinputOriginal) { //hfuFileinputPrototype is a valid element ?
                if (!(this.hfuFileinputOriginal.tagName == "INPUT" && this.hfuFileinputOriginal.getAttribute("type") == "file")) {
                    throw ("hfu ERROR: hfuFileinputPrototype must be a file input element name (one-element css selector string)");
                }
            } else {
                throw ("hfu ERROR: hfuFileinputPrototype property is mandatory (one-element css selector string)");
            }
            //
            //console.log(document.querySelector(this.hfuFilesList));
            if (!this.hfuFilesList) {
                throw ("hfu ERROR: hfuFilesList property is mandatory (one-element css selector string)");
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
                if (Array.isArray(this.hfuContainerDivClass)) {
                    for (let i = 0; i < this.hfuContainerDivClass.length; i++) {
                        if (this.hfuContainerDivClass[i].indexOf(" ") != -1) {
                            throw ("hfu ERROR: hfuContainerDivClass property must be an Array of class names");
                            break;
                        }
                    }
                } else {
                    throw ("hfu ERROR: hfuContainerDivClass property must be an Array of class names");
                }
            }
            //
            if (this.hfuContainerDivFocusClass != undefined) {
                if (Array.isArray(this.hfuContainerDivFocusClass)) {
                    for (let i = 0; i < this.hfuContainerDivFocusClass.length; i++) {
                        if (this.hfuContainerDivFocusClass[i].indexOf(" ") != -1) {
                            throw ("hfu ERROR: hfuContainerDivFocusClass property must be an Array of class names");
                            break;
                        }
                    }
                } else {
                    throw ("hfu ERROR: hfuContainerDivFocusClass property must be an Array of class names");
                }
            }
            //
            if (this.hfuDropHereAreaClass != undefined) {
                if (Array.isArray(this.hfuDropHereAreaClass)) {
                    for (let i = 0; i < this.hfuDropHereAreaClass.length; i++) {
                        if (this.hfuDropHereAreaClass[i].indexOf(" ") != -1) {
                            throw ("hfu ERROR: hfuDropHereAreaClass property must be an Array of class names");
                            break;
                        }
                    }
                } else {
                    throw ("hfu ERROR: hfuDropHereAreaClass property must be an Array of class names");
                }
            }
            //

            if (this.hfuDropHereAreaFocusClass != undefined) {
                if (Array.isArray(this.hfuDropHereAreaFocusClass)) {
                    for (let i = 0; i < this.hfuDropHereAreaFocusClass.length; i++) {
                        if (this.hfuDropHereAreaFocusClass[i].indexOf(" ") != -1) {
                            throw ("hfu ERROR: hfuDropHereAreaFocusClass property must be an Array of class names");
                            break;
                        }
                    }
                } else {
                    throw ("hfu ERROR: hfuDropHereAreaFocusClass property must be an Array of class names");
                }
            }
            //
            if (this.hfuDropHereTextClass != undefined) {
                if (Array.isArray(this.hfuDropHereTextClass)) {
                    for (let i = 0; i < this.hfuDropHereTextClass.length; i++) {
                        if (this.hfuDropHereTextClass[i].indexOf(" ") != -1) {
                            throw ("hfu ERROR: hfuDropHereTextClass property must be an Array of class names");
                            break;
                        }
                    }
                } else {
                    throw ("hfu ERROR: hfuDropHereTextClass property must be an Array of class names");
                }
            }
            //
            if (this.hfuDropHereTextFocusClass != undefined) {
                if (Array.isArray(this.hfuDropHereTextFocusClass)) {
                    for (let i = 0; i < this.hfuDropHereTextFocusClass.length; i++) {
                        if (this.hfuDropHereTextFocusClass[i].indexOf(" ") != -1) {
                            throw ("hfu ERROR: hfuDropHereTextFocusClass property must be an Array of class names");
                            break;
                        }
                    }
                } else {
                    throw ("hfu ERROR: hfuDropHereTextFocusClass property must be an Array of class names");
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
                    if (this.fileName.indexOf(" ") != -1) {
                        throw ("hfu ERROR: fileName property must be an input name (non-spaced String)");
                    }
                }
            }
            //
            if (this.hfuRemoveFileBtnClass != undefined) {
                if (Array.isArray(this.hfuRemoveFileBtnClass)) {
                    for (let i = 0; i < this.hfuRemoveFileBtnClass.length; i++) {
                        if (this.hfuRemoveFileBtnClass[i].indexOf(" ") != -1) {
                            throw ("hfu ERROR: hfuRemoveFileBtnClass property must be an Array of class names");
                            break;
                        }
                    }
                } else {
                    throw ("hfu ERROR: hfuRemoveFileBtnClass property must be an Array of class names");
                }
            }
            //
            if (this.hfuFilenameSpanClass != undefined) {
                if (Array.isArray(this.hfuFilenameSpanClass)) {
                    for (let i = 0; i < this.hfuFilenameSpanClass.length; i++) {
                        if (this.hfuFilenameSpanClass[i].indexOf(" ") != -1) {
                            throw ("hfu ERROR: hfuFilenameSpanClass property must be an Array of class names");
                            break;
                        }
                    }
                } else {
                    throw ("hfu ERROR: hfuFilenameSpanClass property must be an Array of class names");
                }
            }
            //
            //END checking for errors

            //X let hfuFileinputPrototype = document.querySelector(this.hfuFileinputOriginal);
            //this.hfuFileinputOriginalOriginal = this.hfuFileinputOriginal.cloneNode(true);

            //let hfuFilesList = document.querySelector(config.hfuFilesList);
            
            if (!this.hfuFileinputPrototype.classList.contains("hfuFileinputPrototype")) { //targetted file input does NOT  have the 'hfuFileinputPrototype' class ? add it
                this.hfuFileinputPrototype.classList.add("hfuFileinputPrototype");
            }

            this.hfuFileinputPrototype.removeAttribute("multiple");
            this.hfuFileinputPrototype.multiple = false;

            ////START - building elements
            let hfuContainerDiv = document.createElement("div");
            let hfuDropHereArea = document.createElement("div");
            let hfuDropHereText = document.createElement("h3");
            let hfuDataDiv = document.createElement("div");

            //START - setting texts
            if (Object.keys(this.texts.dropHereText).indexOf(this.lang) != -1) { //lang chosen for the hfuDropHereText is valid?
                hfuDropHereText.textContent = this.texts.dropHereText[this.lang];
                this.hfuFileinputPrototype.setAttribute("title", this.texts.dropHereText[this.lang]);
            } else { // english default for the hfuDropHereText
                hfuDropHereText.textContent = this.texts.dropHereText.en;
                this.hfuFileinputPrototype.setAttribute("title", this.texts.dropHereText.en);
            }
            //END - setting texts

            hfuContainerDiv.classList.add("hfuContainerDiv");
            hfuDropHereArea.classList.add("hfuDropHereArea");
            hfuDropHereText.classList.add("hfuDropHereText");
            hfuDataDiv.classList.add("hfuDataDiv");

            if (Array.isArray(this.hfuContainerDivClass)) { //User list of custom classes for hfuContainerDiv defined ?
                for (let i = 0; i < this.hfuContainerDivClass.length; i++) {
                    hfuContainerDiv.classList.add(this.hfuContainerDivClass[i]);
                }
            }
            //
            if (Array.isArray(this.hfuDropHereTextClass)) { //User list of custom classes for hfuDropHereText defined ?
                for (let i = 0; i < this.hfuDropHereTextClass.length; i++) {
                    hfuDropHereText.classList.add(this.hfuDropHereTextClass[i]);
                }
            }
            //
            if (Array.isArray(this.hfuDropHereAreaClass)) { //User list of custom classes for hfuDropHereArea defined ?
                for (let i = 0; i < this.hfuDropHereAreaClass.length; i++) {
                    hfuDropHereArea.classList.add(this.hfuDropHereAreaClass[i]);
                }
            }
            //
            if (Array.isArray(this.hfuFilesListClass)) { //User list of custom classes for hfuFilesList defined ?
                for (let i = 0; i < this.hfuFilesListClass.length; i++) {
                    this.hfuFilesList.classList.add(this.hfuFilesListClass[i]);
                }
            }
            //

            hfuDropHereArea.appendChild(hfuDropHereText);
            
            hfuContainerDiv.appendChild(this.hfuFileinputPrototype);
            hfuContainerDiv.appendChild(hfuDropHereArea);
            hfuContainerDiv.appendChild(hfuDataDiv);

            this.hfuFilesList.parentNode.insertBefore(hfuContainerDiv, this.hfuFilesList);
            this.hfuFileinputOriginal.style.display = 'none';
            //this.hfuFileinputOriginal.parentNode.removeChild(this.hfuFileinputOriginal);
            ////END building elements


            //START events 
            //console.log(this.hfuFileinputPrototype)
            this.hfuFileinputPrototype.addEventListener("change", function(event) {
                self.checkFileType(this);
                console.log("input changed !");
                //console.log(this);
                //console.log(this.files);
                //console.log(event.timeStamp);
                let newDivElement = document.createElement("div");
                newDivElement.classList.add("hfuSpanBtnContainer");
                //
                let hfuFilenameSpan = document.createElement("span");
                let currentFile = this.files[0];
                hfuFilenameSpan.textContent = currentFile.name;
                hfuFilenameSpan.classList.add("hfuFilenameSpan");
                //
                let hfuRemoveFileBtn = document.createElement("button");
                hfuRemoveFileBtn.setAttribute("type", "button");
                hfuRemoveFileBtn.classList.add("hfuRemoveFileBtn");
                hfuRemoveFileBtn.dataset.id = event.timeStamp;
                hfuRemoveFileBtn.textContent = 'X';
                hfuRemoveFileBtn.setAttribute("title",self.texts.deleteFile[self.lang]);
                newDivElement.appendChild(hfuFilenameSpan);
                newDivElement.appendChild(hfuRemoveFileBtn);
                if(self.showTumbnail){//show thumbnail is on ?
                    let imgElement = document.createElement("img");
                    if(currentFile.type.startsWith('image')){//image file selelcted ?
                        let fileReader = new FileReader();
                        fileReader.addEventListener('load', function(e){
                            let resultData = e.target.result;
                            imgElement.src = resultData;
                        });
                        if(currentFile){
                            fileReader.readAsDataURL(currentFile);
                        }
                    }
                    else{
                        imgElement.src = './img/file.png';
                    }
                    imgElement.style.height = '40px';
                    imgElement.style.maxWidth = '33.33%';
                    newDivElement.insertBefore(imgElement, newDivElement.firstChild);
                }
                newDivElement.setAttribute('title', currentFile.name);
                //
                if (Array.isArray(self.hfuSpanBtnContainerClass)) { //User list of custom classes for the div container of hfuFilenameSpan and hfuRemoveFileBtn
                    for (let i = 0; i < self.hfuFilesListClass.length; i++) {
                        self.hfuFilesList.classList.add(self.hfuFilesListClass[i]);
                    }
                }
                //
                self.hfuFilesList.appendChild(newDivElement);

                //Start - add custom classes for hfuRemoveFileBtn  and  hfuFilenameSpan and hfuSpanBtnContainer DOM elements
                if (Array.isArray(self.hfuFilenameSpanClass)) { //User list of custom classes for hfuFilenameSpan
                    for (let i = 0; i < self.hfuFilenameSpanClass.length; i++) {
                        hfuFilenameSpan.classList.add(self.hfuFilenameSpanClass[i]);
                    }
                }
                //
                if (Array.isArray(self.hfuRemoveFileBtnClass)) { //User list of custom classes for hfuRemoveFileBtn
                    for (let i = 0; i < self.hfuRemoveFileBtnClass.length; i++) {
                        hfuRemoveFileBtn.classList.add(self.hfuRemoveFileBtnClass[i]);
                    }
                }

                if (Array.isArray(self.hfuSpanBtnContainerClass)) { //User list of custom classes for newDivElement
                    for (let i = 0; i < self.hfuSpanBtnContainerClass.length; i++) {
                        newDivElement.classList.add(self.hfuSpanBtnContainerClass[i]);
                    }
                }
                //END - add custom classes for hfuRemoveFileBtn  and  hfuFilenameSpan and hfuSpanBtnContainer DOM elements

                //START - keep cloned inputs from the updated 
                let newInput = this.cloneNode(true);

                newInput.removeAttribute("id");
                newInput.removeAttribute("name");
                newInput.removeAttribute("class");
                newInput.removeAttribute("title");

                newInput.setAttribute("name", config.fileName);
                newInput.style.cssText = "display: none";
                newInput.dataset.id = event.timeStamp;
                hfuDataDiv.appendChild(newInput);
            });

            document.addEventListener("drop", function(event) {
                if (!event.target.isEqualNode(self.hfuFileinputPrototype)) { //drop NOT happened on the drop file zone ?
                    //event.preventDefault();
                } else {
                    console.log("drop !");

                    if (hfuDropHereText.classList.contains('hfuDropHereTextFocus')) { //remove .hfuDropHereTextFocus from hfuDropHereText after DROP
                        hfuDropHereText.classList.remove('hfuDropHereTextFocus');
                    }
				    self.removeClasses(hfuDropHereText, self.hfuDropHereTextFocusClass);

                    if (hfuContainerDiv.classList.contains('hfuContainerDivFocus')) { //remove .hfuContainerDivFocus from hfuContainerDiv after DROP
                        hfuContainerDiv.classList.remove('hfuContainerDivFocus');
                    }
					self.removeClasses(hfuContainerDiv, self.hfuContainerDivFocusClass);
				    self.removeClasses(hfuDropHereArea, self.hfuDropHereAreaFocusClass);
                }
            });

            document.addEventListener("dragover", function(event) {
                if (!event.target.isEqualNode(self.hfuFileinputPrototype)) { //dragover NOT happened on the drop file zone ?
                    //event.preventDefault();
                } else {
                    console.log("dragover !");
                    if (!hfuContainerDiv.classList.contains('hfuContainerDivFocus')) {
                        hfuContainerDiv.classList.add('hfuContainerDivFocus');
                    }
                    
                    self.addClasses(hfuContainerDiv, self.hfuContainerDivFocusClass);//add self.hfuContainerDivFocusClass from hfuDropHere after DROP
                    
                    if (!hfuDropHereText.classList.contains('hfuDropHereTextFocus')) {
                        hfuDropHereText.classList.add('hfuDropHereTextFocus');
                    }

                    self.addClasses(hfuDropHereText, self.hfuDropHereTextFocusClass); //add self.hfuDropHereTextFocusClass from hfuDropHereText after DROP
                    self.addClasses(hfuDropHereArea, self.hfuDropHereAreaFocusClass); //add self.hfuDropHereAreaFocusClass from hfuDropHereArea after DROP

                }
            });
            document.addEventListener("dragleave", function(event) {
                if (event.target.isEqualNode(self.hfuFileinputPrototype)) { //dragleave happened on the drop file zone ?
                    console.log("dragleave !");
                    if (hfuDropHereText.classList.contains('hfuDropHereTextFocus')) {
                        hfuDropHereText.classList.remove('hfuDropHereTextFocus');
                    }
                    self.removeClasses(hfuDropHereText, self.hfuDropHereTextFocusClass); //remove self.hfuDropHereTextFocusClass from hfuDropHereText after DROP

                    if (hfuContainerDiv.classList.contains('hfuContainerDivFocus')) {
                        hfuContainerDiv.classList.remove('hfuContainerDivFocus');
                    }
                    self.removeClasses(hfuContainerDiv, self.hfuContainerDivFocusClass); //remove  self.hfuContainerDivFocusClass from hfuDropHere after DROP
                    self.removeClasses(hfuDropHereArea, self.hfuDropHereAreaFocusClass);
                }
            });
            document.addEventListener("click", function(event) {
                if (event.target.classList.contains("hfuRemoveFileBtn")) {
                    let removeBtnElement = event.target;
                    //console.log(removeBtnElement);
                    //console.log("remove btn clicked");
                    let inputElement = document.querySelector("input[data-id='" + removeBtnElement.dataset.id + "']");
                    //console.log(inputElement);
                    inputElement.parentNode.removeChild(inputElement);
                    let divElement = removeBtnElement.parentNode;
                    //console.log(divElement);
                    divElement.parentNode.removeChild(divElement);
                }
            });
            //END events  
        } catch (err) {
            console.error(err);
        }
    }

    removeClasses(domElement, classArray){
		if (Array.isArray(classArray)) {//Array of classes is really an existant array ?
			classArray.forEach(function(oneClass){		
				domElement.classList.remove(oneClass);
			});
        }
    }
    
    addClasses(domElement, classArray){
		if (Array.isArray(classArray)) {//Array of classes is really an existant array ?
			classArray.forEach(function(oneClass){		
				domElement.classList.add(oneClass);
			});
        }
    }
    checkFileType(fileInputElement){
        //nothing yet :D
        console.log(fileInputElement.files[0])
    }

    destroy() {
        try
        {
            let parent0 = document.querySelector(".hfuContainerDiv").parentNode;
            parent0.insertBefore(this.hfuFileinputOriginal, document.querySelector(".hfuContainerDiv"));
            this.hfuFileinputOriginal.style.display = '';
            parent0.removeChild(document.querySelector(".hfuContainerDiv"));
            this.hfuFilesList.innerHTML = "";
        }
        catch(err){
            console.log(err);
        }
    }
    
}

/*function hfu(config) {}*/
//