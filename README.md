# ngSimpleImageUpload
ngSimpleImageUpload is a Light weight angular directive for uploading images using drag and drop

See demo page over [here](http://ngSimpleImageUpload.azurewebsites.net/demo/index.html)

Features
* Drag and drop images to upload images
* Drag drop or select files through HTML Input file type
* Customize UI to accomodate app specific drag and drop implementation
* .....

### Version
1.0.0

### Installation
Manual: download latest from [here](https://github.com/aamolgote/ngSimpleImageUpload)

### Using ngSimpleImageUpload

Include jQuery, angular and bootstrap (JS and CSS)
```html
    <link href="styles/bootstrap.css" rel="stylesheet" />
    <script src="scripts/jquery-2.2.3.js"></script>
    <script src="scripts/bootstrap.js"></script>
    <script src="scripts/angular.js"></script>
```
Include ngSimpleImageUpload js file and CSS. Customize CSS as peer your app needs.
```html
	<link href="styles/ngSimpleImageUpload.css" rel="stylesheet" />
    <script src="scripts/ngSimpleImageUpload.min.js"></script>
```

Register the 'simpleMultiSelectDropdown' module with main app module.
```javascript
var app = angular.module('ngSimpleImageUploadDemoApp', ['simpleImageUpload']);
```

You can use the directive like shown below, 
```html
	<ng-simple-image-upload on-photos-selected-for-upload="onImagesSelectedForUpload">
    </ng-simple-image-upload>
```
 * **on-photos-selected-for-upload** - This is callback function which will invoked when upload files are dragged and dropped or selected through HTML Input file type.
    
