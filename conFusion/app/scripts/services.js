'use strict';

angular.module('confusionApp').constant("baseURL","http://localhost:3000/")

        .service('menuFactory',['$resource','baseURL', function($resource,baseURL) {
                this.getDish = function () {
                    
                    return $resource(baseURL + 'dishes/:id');
                };
    
               this.getPromotion = function () {
                    return $resource(baseURL + 'promotions/:id');
                };
        }])

        .factory('corporateFactory', function($resource,baseURL) {
    
            var corpfac = {};

            corpfac.getLeader = function(){
                return $resource(baseURL + 'leadership/:id');
            };

            return corpfac;
        })

        .factory('feedbackFactory', ['$resource', 'baseURL', function ($resource, baseURL) {

            var feedfac = {};

            feedfac.getFeedback = function () {
                return $resource(baseURL + 'feedback/:id');
            };

            return feedfac;
        }])
;