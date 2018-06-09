<!DOCTYPE html>  
<html>
<head>
<meta charset='utf-8'>
<meta name="viewport" content="width=device-width,initial-scale=1">
<link href="hassen_fileuploader.css" rel="stylesheet">

<!-- styles of stories-->
<style>
.myFilesList{
  float: left;
  min-width: 200px;
  overflow-y: auto;
  max-height: 211px;
  overflow-x: hidden;
  padding-right:5px;
  padding-left:5px;
}
.myFilesList>div>span {
    float: left;
    margin-right: 5px;
    max-width: 80%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.myFilesList>div>button {
    float: right;
    height: 23px;
    width: 23px;
    padding: 1px;
}

.myFilesList div {
    width: 100%;
    min-height: 25px;
    border: 1px solid grey;
    max-width: 400px;
    max-height: 30px;
    margin-bottom: 2px;
}
.myContainerClass{
  float:left;
  margin-right:10px;
}
</style>
</head>
<body>	
<input id='myFileinput' type="file" name='myFileinput' multiple="multiple" >
<div id='filesList'>
</div>
<script src="hassen_fileuploader.js">
</script>
<script>
hfu({
'hfuFileinputPrototype' : "#myFileinput",

"hfuFilesList" : "#filesList",
"hfuFilesListClass" : ["myFilesList","myFilesList_1","myFilesList_2"],

"hfuContainerDivClass" : ["myContainerClass","myContainerClass_1","myContainerClass_2"],
"hfuContainerDivFocusClass" : "focus_ContainerDiv",
"hfuDropHereClass" : ["myDropHereClass_1","myDropHereClass_2"],
"hfuDropHereFocusClass" : "focus_DropHere",
"lang" : "fr",
"fileName" : "myFile[]"
});
</script>
</body>
</html>
