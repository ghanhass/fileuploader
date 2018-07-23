<!DOCTYPE html>  
<html>
<head>
<meta charset='utf-8'>
<meta name="viewport" content="width=device-width,initial-scale=1">
<link href="./css/hassen_fileuploader.css" rel="stylesheet">
<link href="./css/bootstrap.min.css" rel="stylesheet">

<!-- styles of stories-->
<style>
.myFilesList{
  float: left;
  width: 225px;
  overflow-y: auto;
  max-height: 211px;
  overflow-x: hidden;
  padding-right:5px;
  padding-left:5px;
}
.myFilesList .MyFilenameSpanClass {
    float: left;
    margin-right: 5px;
    max-width: 80%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.myFilesList .MyRemoveFileBtnClass {
    float: right;
    height: 23px;
    width: 23px;
    padding: 1px;
}

.MyContainerDivClass{
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
hfu_object = new hfu({
'hfuFileinputPrototype' : "#myFileinput",

"hfuFilesList" : "#filesList",
"hfuFilesListClass" : ["myFilesList","myFilesList_1","myFilesList_2"],

"hfuContainerDivClass" : ["MyContainerDivClass","MyContainerDivClass_1","MyContainerDivClass_2"],
"hfuContainerDivFocusClass" : ["MyContainerDivFocusClass"],
"hfuDropHereAreaClass" : ["MyDropHereAreaClass","MyDropHereAreaClass_2"],
"hfuDropHereTextClass" : ["MyDropHereTextClass","MyDropHereTextClass_2"],
"hfuDropHereTextFocusClass" : ["MyDropHereTextFocusClass"],
"lang" : "en",
"fileName" : "myFile[]",
"hfuRemoveFileBtnClass": ["MyRemoveFileBtnClass","btn","btn-xs", "btn-danger"],
"hfuFilenameSpanClass": ["MyFilenameSpanClass","MyFilenameSpanClass_2", "MyFilenameSpanClass_3"],
"hfuSpanBtnContainerClass": ["well","well-nice"],

});
</script>
</body>
</html>
