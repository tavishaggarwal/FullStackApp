'use strict';

angular.module('confusionApp')

        .controller('MenuController', ['$scope', 'menuFactory', function($scope, menuFactory) {
            
            $scope.tab = 1;
            $scope.filtText = '';
            $scope.showDetails = false;

            menuFactory.getDish().query()
                .$promise.then(
                    function (response) {
                    $scope.dishes = response;
                    },
                    function (response) {
                    $scope.message = 'Error: ' + response.status + ' ' + response.statusText;
                    }
                );

                        
            $scope.select = function(setTab) {
                $scope.tab = setTab;
                
                if (setTab === 2) {
                    $scope.filtText = "appetizer";
                }
                else if (setTab === 3) {
                    $scope.filtText = "mains";
                }
                else if (setTab === 4) {
                    $scope.filtText = "dessert";
                }
                else {
                    $scope.filtText = "";
                }
            };

            $scope.isSelected = function (checkTab) {
                return ($scope.tab === checkTab);
            };
    
            $scope.toggleDetails = function() {
                $scope.showDetails = !$scope.showDetails;
            };
        }])

        .controller('ContactController', ['$scope', function($scope) {

            $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };
            
            var channels = [{value:"tel", label:"Tel."}, {value:"Email",label:"Email"}];
            
            $scope.channels = channels;
            $scope.invalidChannelSelection = false;
                        
        }])

        .controller('FeedbackController', ['$scope','feedbackFactory', function($scope,feedbackFactory) {
            
            $scope.sendFeedback = function() {

                    console.log($scope.feedback);

                    if ($scope.feedback.agree && ($scope.feedback.mychannel === '')) {
                        $scope.invalidChannelSelection = true;
                        console.log('Cannot submit form');
                    }
                    else {

                        feedbackFactory.getFeedback().save($scope.feedback);

                        $scope.invalidChannelSelection = false;
                        $scope.feedback = {
                        mychannel: '',
                        firstName: '',
                        lastName: '',
                        agree: false,
                        email: ''
                        };

                        $scope.feedback.mychannel = '';
                        $scope.feedbackForm.$setPristine();
                    }
            };
        }])

        .controller('DishDetailController', ['$scope', '$stateParams', 'menuFactory', function($scope, $stateParams, menuFactory) {


                menuFactory.getDish().get({ id: $stateParams.id })
                .$promise.then(
                    function (response) {
                    $scope.dish = response;
                    },
                    function (response) {
                    $scope.message = 'Error: ' + response.status + ' ' + response.statusText;
                    }
                );
            
        }])

        .controller('DishCommentController', ['$scope', function($scope) {
            
            $scope.mycomment = {rating:5, comment:"", author:"", date:""};
            
            $scope.submitComment = function () {
                
                $scope.mycomment.date = new Date().toISOString();
                console.log($scope.mycomment);
                
                $scope.dish.comments.push($scope.mycomment);
                
                $scope.commentForm.$setPristine();
                
                $scope.mycomment = {rating:5, comment:"", author:"", date:""};
            };
        }])

        // implement the IndexController and About Controller here
        .controller('IndexController',['$scope','menuFactory','corporateFactory', function($scope,menuFactory,corporateFactory){
           menuFactory.getDish().get({ id: 0 })
                .$promise.then(
                    function (response) {
                    $scope.featuredDish = response;
                    },
                    function (response) {
                    $scope.message = 'Error: ' + response.status + ' ' + response.statusText;
                    }
                );
           
            
            $scope.Promotion = menuFactory.getPromotion().get({ id: 0 })
                .$promise.then(
                    function (response) {
                    $scope.Promotion = response;
                    },
                    function (response) {
                    $scope.message = 'Error: ' + response.status + ' ' + response.statusText;
                    }
                );


           corporateFactory.getLeader().get({ id: 3 })
                .$promise.then(
                    function (response) {
                    $scope.chief = response;
                    },
                    function (response) {
                    $scope.message = 'Error: ' + response.status + ' ' + response.statusText;
                    }
                );

        //    $scope.chief = corporateFactory.getLeader(3);

            $scope.showDetails = true;
        }])

        .controller('AboutController',function($scope,corporateFactory){
            corporateFactory.getLeader().query()
            .$promise.then(
                    function (response) {
                    $scope.AllChiefs = response;
                    },
                    function (response) {
                    $scope.message = 'Error: ' + response.status + ' ' + response.statusText;
                    }
                );
            $scope.showDetails = true;
        })
;
