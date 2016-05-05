(function () {
    'use strict';
    var app = angular.module('ngSimpleImageUploadDemoApp', ['simpleImageUpload']);
    app.controller('ngSimpleImageUploadCtrl', ['$scope', '$q', 'submitImageService', function ($scope, $q, submitImageService) {
      
        $scope.onImagesSelectedForUpload = function (selectedFiles) {
            if (selectedFiles && selectedFiles.length > 0) {
                $scope.submitPhotosDisabled = true;
                $scope.message = "Please wait for all the photos to finish uploading before leaving...";
                var uploadPhotos = [];
                for (var count = 0; count < selectedFiles.length; count++) {

                    uploadPhotos.push({
                        fileName: selectedFiles[count].name,
                        filePath: "",
                        uploadMessage: "Photo Upload in progress...",
                        selectedFile: selectedFiles[count],
                        status: 'upload'
                    });
                };
                $scope.uploadPhotos = uploadPhotos;
                $scope.$apply();
                var submitPhotoPromises = [];
                angular.forEach(uploadPhotos, function (item, key) {
                    var submitPhotoPromise = submitImageService.submitImage(item);
                    submitPhotoPromises.push(submitPhotoPromise);
                    submitPhotoPromise.then(function (data) {
                        if (data.StatusCode === 200) {
                            item.uploadMessage = data.Message;
                            item.status = 'uploaded';
                        }
                        else if (data.StatusCode === 500) {
                            item.uploadMessage = err.Message;
                            item.status = 'error';
                            alert('Error uploading Photo \n Error message:' + JSON.stringify(err))
                        }
                    }, function (err) {
                        item.uploadMessage = "Error uploading Photo";
                        item.status = 'error';
                        alert('Error uploading Photo \n Error message:' + JSON.stringify(err))
                    });
                });

                $q.all(submitPhotoPromises).then(function (data) {
                    $scope.submitPhotosDisabled = false;
                    $scope.message = "All Photos Uploaded.."
                },
                function (err) {
                    $scope.submitPhotosDisabled = false;
                    $scope.message = "Errror Occured Uploading some photos.."
                });

                $("#myModal").modal()
            }
        }
    }]);
})();