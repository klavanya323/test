/**
 * Created by lavs on 9/19/2015.
 */

var app=angular.module("myApp",['ui.router']);

var products = [];


var count = 0;

app.controller("IndexController", ["$scope", "$rootScope", "$http", "$state", function ($scope, $rootScope, $http , $state){
        try {
            $scope.name = "Lavanya";
            $http({
                url: '/api/GetProducts',
                
                method: "get",
                headers: { 'Content-Type': "application/json" }
            }).then(function (res) {
                
                res.data.forEach(function (product) { products.push(product);});
                $scope.products = products;
                
            }, function (err) {
                console.log("Couldnt get phones" + err);
            });
            
            
        }
        catch (err){
           
        }       
}]);


app.controller("PhonesCtrl", ["$scope", "$rootScope", "$http", "$state", function ($scope, $rootScope, $http , $state) {
        
        var selectedPhone = null;

            
        $http({
            url: '/api/phones',
            
            method: "get",
            headers: { 'Content-Type': "application/json" }
        }).then(function (res) {
            $scope.phones = res.data;

        }, function (err) {
            console.log("Couldnt get phones" + err);

        });

        $scope.DisplayProduct = function (phoneName) {
            $rootScope.selectedPhone = phoneName;
            $state.go('phone');
        };

       
    }]);

app.controller("PhoneCtrl", ["$scope", "$rootScope", "$http", "$state", function ($scope, $rootScope, $http , $state) {
        
        var str = "/getPhones/" + $rootScope.selectedPhone;
        $http({
            url: str,
            method: "get",
            headers: { 'Content-Type': "application/json" }
        }).then(function (res) {
            $scope.selectedPhone = res.data;

           
            //selectedProduct = $scope.selectedPhone.name;
            
            //app.stateProvider.state(selectedProduct, 
            //        {
            //    url: '/selectedProduct',
            //    templateUrl: "/partials/partial-phone.html"
            //});

        }, function (err) {
            console.log("Couldnt get selected phone data" + err);

        });

       
    }]);




//app.controller("cartCtrl", function ($scope) {
    
   
//    $scope.addToCart = function () {

//        var productAddedToCart = productAddedToCart;
//        $http({
//            url: "/api/productAddedToCart",
//            method: "post",
//            headers: { 'Content-Type': "application/json" }
//        }).then(function (res) { 
//            $scope.count += 1;
        
//        }, function (err) { 
        
        
        
//        });
      
//    };


    
    
    app.controller("TabletsCtrl", ["$scope", "$http", "$state", function ($scope, $http , $state) {
            $http({
                url: '/api/tablets',
                
                method: "get",
                headers: { 'Content-Type': "application/json" }
            }).then(function (res) {
                $scope.tablets = res.data;

            }, function (err) {
                console.log("Couldnt get tablets" + err);

            });

       
        }]);


app.controller("ChromebooksCtrl", ["$scope", "$http", "$state", function ($scope, $http , $state) {
            $http({
                url: '/api/chromebooks',
                
                method: "get",
                headers: { 'Content-Type': "application/json" }
            }).then(function (res) {
                $scope.chromebooks = res.data;

            }, function (err) {
                console.log("Couldnt get chromebooks" + err);

            });

       
        }]);


app.controller("TvAudioCtrl", ["$scope", "$http", "$state", function ($scope, $http , $state) {
            $http({
                url: '/api/tvAudio',
                
                method: "get",
                headers: { 'Content-Type': "application/json" }
            }).then(function (res) {
                $scope.phones = res.data;

            }, function (err) {
                console.log("Couldnt get phones" + err);

            });

       
        }]);

app.controller("AndroidCtrl", ["$scope", "$http", "$state", function ($scope, $http , $state) {
            $http({
                url: '/api/androidwear',
                
                method: "get",
                headers: { 'Content-Type': "application/json" }
            }).then(function (res) {
                $scope.phones = res.data;

            }, function (err) {
                console.log("Couldnt get phones" + err);

            });

       
        }]);


app.controller("HomeCtrl", ["$scope", "$http", "$state", function ($scope, $http , $state) {
            $http({
                url: '/api/home',
                
                method: "get",
                headers: { 'Content-Type': "application/json" }
            }).then(function (res) {
                $scope.phones = res.data;

            }, function (err) {
                console.log("Couldnt get phones" + err);

            });

       
        }]);


app.controller("AccesoriesCtrl", ["$scope", "$http", "$state", function ($scope, $http , $state) {
            $http({
                url: '/api/accesories',
                
                method: "get",
                headers: { 'Content-Type': "application/json" }
            }).then(function (res) {
                $scope.phones = res.data;

            }, function (err) {
                console.log("Couldnt get phones" + err);

            });

       
        }]);



app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider, $http) {
        app.stateProvider = $stateProvider;
        $urlRouterProvider.otherwise('/');
        
        //products.forEach(function (product) {
        //    app.stateProvider.state(product.Name, 
        //            {
        //        url: product.Url,
        //        controller: product.Controller,
        //        templateUrl: product.templateUrl
        //    });});

        $stateProvider
        .state('Phones', {
            url: '/Phones',
            controller: "PhonesCtrl",
            templateUrl: '/partials/partial-phones.html'
        })
       .state('phone', {
            url: '/phone',
            controller: "PhoneCtrl",
            templateUrl: '/partials/partial-phone.html'
        });
       //.state(products[3].Name, {
       //     url: '/Phones',
       //     controller: "PhonesCtrl",
       //     templateUrl: '/partials/partial-phones.html'
       // })
       //.state(products[4].Name, {
       //     url: '/Phones',
       //     controller: "phonesCtrl",
       //     templateUrl: '/partials/partial-phones.html'
       // })
       //.state(products[5].Name, {
       //     url: '/Phones',
       //     controller: "PhonesCtrl",
       //     templateUrl: '/partials/partial-phones.html'
       // })
       // .state(products[6].Name, {
       //     url: '/Phones',
       //     controller: "PhonesCtrl",
       //     templateUrl: '/partials/partial-phones.html'
        
        
}]);

$('#mobile-nav').click(function(event) {
    $('nav').toggleClass('active');
});
