/*! ng Simple Image Upload - v1.0.0 - 2016-05-06
* Copyright (c) 2016 ; Licensed  */
(function () {
    'use strict';
    var simpleImageUpload = angular.module('simpleImageUpload', []);
    simpleImageUpload.directive('ngSimpleImageUpload', ['$timeout', '$document', function ($timeout, $document) {
        return {
            restrict: 'E',
            replace: false,
            templateUrl: '/src/templates/imageupload.html',
            scope: {
                onPhotosSelectedForUpload: '&'
            },
            link: function (scope, elem, attr) {
                scope.showImageUploadArea = false;
                var imageUploadDragDropArea = elem.find('#imageUploadDragDropArea');
                var imageUploadButton = elem.find('#imageUploadButton');
                var imageUploadFileInput = elem.find('#imageUploadFileInput');
                scope.displayImageUploadArea = function (e) {
                    scope.showImageUploadArea = !scope.showImageUploadArea;
                    if (scope.showImageUploadArea) {
                        $document.bind('click', documentClick);
                    }
                }

                imageUploadDragDropArea.on('dragenter', function (e) {
                    e.stopPropagation();
                    e.preventDefault();
                });

                imageUploadDragDropArea.on('dragover', function (e) {
                    e.stopPropagation();
                    e.preventDefault();
                });

                imageUploadDragDropArea.on('drop', function (e) {
                    e.stopPropagation();
                    e.preventDefault();
                    if (e.originalEvent && e.originalEvent.dataTransfer) {
                        var dt = e.originalEvent.dataTransfer;
                        var files = dt.files;
                        filterAndUploadFiles(files);
                    }
                });

                imageUploadButton.on('click', function (e) {
                    $timeout(function () {
                        if (imageUploadFileInput && imageUploadFileInput[0])
                            imageUploadFileInput[0].click();
                    }, 0);
                });

                imageUploadFileInput.on('change', function () {
                    filterAndUploadFiles(imageUploadFileInput[0].files);
                });

                elem.on('keyup', function (event) {
                    console.log(event.which);
                    if (event.which === 27) {
                        if (scope.showImageUploadArea) {
                            hideImageUploadArea();
                        }
                    }
                });

                scope.$on('$destroy', function () {
                    $document.unbind('click', documentClick);
                    imageUploadDragDropArea.off('dragenter');
                    imageUploadDragDropArea.off('dragover');
                    imageUploadDragDropArea.off('drop');
                    imageUploadButton.off('click');
                    imageUploadFileInput.off('change');
                    elem.off('keyup');
                });

                scope.dragDropAreaClick = function (e) {
                    var target = e.target;
                    if (target.id !== "imageUploadIcon"
                        && target.id !== "imageUploadButton" && target.id !== "imageUploadFileInput"
                        && scope.showImageUploadArea) {
                        e.stopPropagation();
                        e.preventDefault();
                    }
                }

                function documentClick(e) {
                    var target = e.target;
                    if (target.parentElement && target.parentElement.id !== "imageUploadIcon"
                        && target.id !== "imageUploadButton" && target.id !== "imageUploadFileInput"
                        && scope.showImageUploadArea) {
                        hideImageUploadArea();
                    }
                }

                function hideImageUploadArea() {
                    scope.showImageUploadArea = false;
                    $document.unbind('click', documentClick);
                    scope.$apply();
                }

                function filterAndUploadFiles(files) {
                    var filesToBePushed = [];
                    for (var count = 0; count < files.length; count++) {
                        var file = files[count];
                        if (file.type.indexOf("image") === 0) {
                            filesToBePushed.push(file);
                        }
                    }

                    if (filesToBePushed.length > 0) {
                        scope.onPhotosSelectedForUpload()(filesToBePushed);
                        scope.showImageUploadArea = false;
                    }
                }
            }
        }
    }]);
})();
angular.module('simpleImageUpload').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('src/templates/imageUpload.html',
    "<a id=\"imageUploadIcon\" href=\"#\" class=\"tools\" ng-click=\"displayImageUploadArea($event)\" title=\"Upload media\"><span class=\"glyphicon glyphicon-upload\"></span></a><div id=\"imageUpload\" class=\"panel drag-drop-container\" ng-show=\"showImageUploadArea\" ng-click=\"dragDropAreaClick($event)\"><div id=\"imageUploadDragDropArea\" class=\"drag-drop-area\"><span class=\"glyphicon glyphicon-upload ico-upload\"></span><h3>Drop files here to upload<br>or</h3><input id=\"imageUploadButton\" type=\"button\" class=\"btn btn-primary\" value=\"Select Files\"> <input id=\"imageUploadFileInput\" type=\"file\" style=\"display:none\" multiple accept=\"image/*\"></div></div>"
  );

}]);
