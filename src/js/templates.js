angular.module('simpleImageUpload').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('src/templates/imageUpload.html',
    "<a id=\"imageUploadIcon\" href=\"#\" class=\"tools\" ng-click=\"displayImageUploadArea($event)\" title=\"Upload media\"><span class=\"glyphicon glyphicon-upload\"></span></a><div id=\"imageUpload\" class=\"panel drag-drop-container\" ng-show=\"showImageUploadArea\" ng-click=\"dragDropAreaClick($event)\"><div id=\"imageUploadDragDropArea\" class=\"drag-drop-area\"><span class=\"glyphicon glyphicon-upload ico-upload\"></span><h3>Drop files here to upload<br>or</h3><input id=\"imageUploadButton\" type=\"button\" class=\"btn btn-primary\" value=\"Select Files\"> <input id=\"imageUploadFileInput\" type=\"file\" style=\"display:none\" multiple accept=\"image/*\"></div></div>"
  );

}]);
