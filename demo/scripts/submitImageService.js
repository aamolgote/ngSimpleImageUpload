(function () {
    'use strict';
    var submitImages = angular.module('ngSimpleImageUploadDemoApp');
    submitImages.factory('submitImageService', ['$http', '$q', '$timeout',
        function ($http, $q, $timeout) {
            return {
                submitImage: submitImage
            };
            var baseUrl = '/api/'
            function submitImage(uploadPhoto) {
                var deferredData = $q.defer();
                //Commented code configure your Service Url and Upload API should work
                /*var apiUrl = baseUrl + '?originalFileName=' + uploadPhoto.fileName;
                var request = $http.post(apiUrl, uploadPhoto.selectedFile, {
                    headers: {
                        'Content-Type': undefined
                    }
                });
                request.success(function (data) {
                    deferredData.resolve(data);
                }).error(function (err) {
                    deferredData.reject(err);
                });*/
                $timeout(function () {
                    deferredData.resolve({StatusCode: 200, Message: "Success"});
                    console.log('Promise resolved through timeout fake service. Uncomment the code from submitImageService and configure your APi call.')
                }, 3000);
                return deferredData.promise;
            }
        }]);
})();