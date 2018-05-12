<!DOCTYPE html>
<html>
<head>
<meta charset='utf-8'>
<meta name="viewport" content="width=device-width,initial-scale=1">
<link href="bootstrap-3.3.7-dist/css/bootstrap.min.css" rel="stylesheet">
<link href="hassen_fileuploader.css" rel="stylesheet">

<!-- styles of stories-->

</head>
<body>	
<input type="file" name='fileinput_prototype' multiple="multiple" id="fileinput_prototype" >
<script src="hassen_fileuploader.js">
</script>
<script>
hfu({
	'hfuFileinputPrototype' : "#fileinput_prototype",
	   "lang" : "fr",
	   "hfuContainerDivClass" : "myContainerClass",
	   "hfuDropHereClass" : "myDropHereClass",
});
</script>
</body>
</html>
