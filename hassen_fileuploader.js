function hfu(config){
	var texts = { 
		"en" : {
    		'drophereText' : 'Drop files here',
		},
    	"fr" : {
			'drophereText' : 'Glissez ici',
		},
	}
  var hfuFileinputPrototype = document.querySelector(config.hfuFileinputPrototype);
  if(!hfuFileinputPrototype.classList.contains("hfuFileinputPrototype")){//targetted file input does NOT  have the 'hfuFileinputPrototype' class ?
    hfuFileinputPrototype.classList.add("hfuFileinputPrototype");
  }
  hfuFileinputPrototype.setAttribute("name","hfuFileinputPrototype");

  var hfuContainerDiv = document.createElement("div");
  var hfuAbsoluteDiv = document.createElement("div");
  var hfuDropHere =  document.createElement("h3");

  if(config.lang && Object.keys(texts).indexOf(config.lang) != -1){
  	hfuDropHere.textContent = texts[config.lang].drophereText;
  }
  else{
	hfuDropHere.textContent = texts.en.drophereText;
  }

  hfuContainerDiv.classList.add("hfuContainerDiv");
  hfuAbsoluteDiv.classList.add("hfuAbsoluteDiv");
  hfuDropHere.classList.add("hfuDropHere");
  
  if(config.hfuContainerDivClass){
	 hfuContainerDiv.classList.add(config.hfuContainerDivClass);
  }
  if(config.hfuDropHereClass){
	 hfuContainerDiv.classList.add(config.hfuDropHereClass);
  }

  hfuAbsoluteDiv.appendChild(hfuDropHere);
  hfuContainerDiv.appendChild(hfuAbsoluteDiv);
  hfuContainerDiv.appendChild(hfuFileinputPrototype.cloneNode(true));

  hfuFileinputPrototype.parentNode.insertBefore(hfuContainerDiv,hfuFileinputPrototype);
  hfuFileinputPrototype.parentNode.removeChild(hfuFileinputPrototype);
  hfuFileinputPrototype = document.querySelector(config.hfuFileinputPrototype);

  

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

	  if(hfuDropHere.classList.contains('hfuDropHereFocus')){
	  	hfuDropHere.classList.remove('hfuDropHereFocus');
	  }

	  if(hfuContainerDiv.classList.contains('hfuContainerDivFocus')){
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

  
}


