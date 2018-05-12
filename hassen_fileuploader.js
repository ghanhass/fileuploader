function hfu(config){
	var texts = { 
		"en" : {
    		'drophereText' : 'Drop files here',
		},
    	"fr" : {
			'drophereText' : 'Glissez vos fichiers ici',
		},
	}
   	var hfuFileinputPrototype = document.querySelector(config.hfuFileinputPrototype);
  	if(!hfuFileinputPrototype.classList.contains("hfuFileinputPrototype")){//targetted file input does NOT  have the 'hfuFileinputPrototype' class ? add it
    	hfuFileinputPrototype.classList.add("hfuFileinputPrototype");
	}
	if(hfuFileinputPrototype.multiple){//targetted file has the multiple attribute ?
  		hfuFileinputPrototype.setAttribute("name","hfuFileinputPrototype[]");
  	}
    else{
  		hfuFileinputPrototype.setAttribute("name","hfuFileinputPrototype");
  	}

	////START - building elements
  	var hfuContainerDiv = document.createElement("div");
  	var hfuAbsoluteDiv = document.createElement("div");
  	var hfuDropHere =  document.createElement("h3");
    var hfuDataDiv = document.createElement("div");

  	//START - setting texts
  	if(config.lang && Object.keys(texts).indexOf(config.lang) != -1){ //lang chosen for the hfuDropHere ?
  		hfuDropHere.textContent = texts[config.lang].drophereText;
		hfuFileinputPrototype.setAttribute("title", texts[config.lang].drophereText);
  	}
  	else{// english default for the hfuDropHere
		hfuDropHere.textContent = texts.en.drophereText;
		hfuFileinputPrototype.setAttribute("title", texts.en.drophereText);
  	}
  //END - setting texts

  hfuContainerDiv.classList.add("hfuContainerDiv");
  hfuAbsoluteDiv.classList.add("hfuAbsoluteDiv");
  hfuDropHere.classList.add("hfuDropHere");
  hfuDataDiv.classList.add("hfuDataDiv");
  
  if(config.hfuContainerDivClass){//User custom class for hfuContainerDiv
	 hfuContainerDiv.classList.add(config.hfuContainerDivClass);
  }
  if(config.hfuDropHereClass){// User custom class for hfuDropHere
	 hfuDropHere.classList.add(config.hfuDropHereClass);
  }

  hfuAbsoluteDiv.appendChild(hfuDropHere);
  
  hfuContainerDiv.appendChild(hfuAbsoluteDiv);
  hfuContainerDiv.appendChild(hfuFileinputPrototype.cloneNode(true));
  hfuContainerDiv.appendChild(hfuDataDiv);


  hfuFileinputPrototype.parentNode.insertBefore(hfuContainerDiv,hfuFileinputPrototype);
  hfuFileinputPrototype.parentNode.removeChild(hfuFileinputPrototype);
  hfuFileinputPrototype = document.querySelector(config.hfuFileinputPrototype);
  ////END building elements

  hfuFileinputPrototype.addEventListener("change", function(){
    console.log("input changed !");
    console.log(this);
    console.log(this.files);
  });

  //START events
  document.addEventListener("drop", function(event){
    if (!event.target.isSameNode(hfuFileinputPrototype)) {//drop NOT happened on the drop file zone ?
      //event.preventDefault();
    }
    else{
	  console.log("drop !");

	  if(hfuDropHere.classList.contains('hfuDropHereFocus')){//remove .hfuDropHereFocus from hfuDropHere after DROP
	  	hfuDropHere.classList.remove('hfuDropHereFocus');
	  }

	  if(hfuContainerDiv.classList.contains('hfuContainerDivFocus')){//remove .hfuContainerDivFocus from hfuContainerDiv after DROP
	  	hfuContainerDiv.classList.remove('hfuContainerDivFocus');
	  }
    }
  });

  document.addEventListener("dragover", function(event){
    if (!event.target.isSameNode(hfuFileinputPrototype)) {//dragover NOT happened on the drop file zone ?
      //event.preventDefault();
    }
    else{
      console.log("dragover !");
	  if(!hfuContainerDiv.classList.contains('hfuContainerDivFocus')){
	  	hfuContainerDiv.classList.add('hfuContainerDivFocus');
	  }
	  if(!hfuDropHere.classList.contains('hfuDropHereFocus')){
	  	hfuDropHere.classList.add('hfuDropHereFocus');
	  }
    }
  });
  document.addEventListener("dragleave", function(event){
    if (event.target.isSameNode(hfuFileinputPrototype)) {//dragleave happened on the drop file zone ?
	  console.log("dragleave !");
	  if(hfuDropHere.classList.contains('hfuDropHereFocus')){
	  	hfuDropHere.classList.remove('hfuDropHereFocus');
	  }

	  if(hfuContainerDiv.classList.contains('hfuContainerDivFocus')){
	  	hfuContainerDiv.classList.remove('hfuContainerDivFocus');
	  }
    }
  });

//END events  
}
//
function draw_file(file,hfuFilesList){

}
