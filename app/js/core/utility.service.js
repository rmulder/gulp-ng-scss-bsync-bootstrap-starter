(function () {

    'use strict';
    angular.module('mgAppCore')
        .service('Utilities', utilities);


    utilities.$inject = ['$rootScope', '$window', '$q', '$filter', '$sce', '$timeout'];

    function utilities($rootScope, $window, $q, $filter,  $sce, $timeout) {

        var HOURS_IN_MILLISECOND = 1 * 60 * 60 * 1000;

        var util = {'_': $window._};

        /**
         * A promise delegator that handles resource type promises
         * @param resource
         * @param success
         * @param error
         * @returns {*|a}
         */
        util.handleResourcePromise = function (resource, success, error) {
            return this.handlePromise(resource.$promise, success, error);
        };

        /**
         * Generic method to handle the promise and register default success and error callbacks
         * and returns custom promise object.
         * @param promise to be watched, if not provided then it guarantees for success call back.
         * @param success if provided then that will get invoked once the given promise gets resolved
         * @param error if provided then that will used handle error cases
         * @returns a wrapper promise
         */
        util.handlePromise = function (promise, success, error) {
            var deferred = $q.defer();

            function successCallBack(data) {
                if (success) {
                    data = success(data);
                }
                deferred.resolve(data);
            }

            function errorCallBack(rejection) {
                console.log(['rejection in errorCallBaack', rejection]);
                if (error) {
                    error(rejection);
                } else {
                    rejection = rejection || {};
                    var message = 'Failed to process user request.&nbsp;<a class="more-info" href="/error">Click here <i class="icon-right-arrow-outline"></i> for support</a>';
                    $rootScope.$broadcast('app:message', {type: 'danger', message: message});
                }
                deferred.reject(rejection);
            }

            if (promise) {
                promise.then(successCallBack).catch(errorCallBack);
            } else {
                successCallBack({});
            }
            return deferred.promise;
        };

        util.scrollTop = function(){
            $timeout(function(){$window.scrollTo(0,0);});
        };

        util.sanitizeContent = function (input) {
            return $sce.trustAsHtml(input);
        };


        /**
         * Returns date instance in a specific timezone if tzOffSet is provided
         * Otherwise a date instance in local browser timezone.
         * @param tzOffSet timezone offset value in form (+1200 to -1200)
         * @param onlyDate if true time part is truncated to midnight otherwise retained
         */
        util.getCurrentDateInstance = function (tzOffSet, onlyDate, givenDate) {
            //var dateInstance = new Date(2015, 4, 09, 7, 0, 0);
            var dateInstance = givenDate || new Date();
            if (tzOffSet) {
                var hours = parseInt(tzOffSet.substr(0, 3));
                var offSetDirection = tzOffSet.charAt(0) === '+' ? 1 : -1;

                var hoursInMilliSeconds = Math.abs(hours) * HOURS_IN_MILLISECOND;
                var minutesInMilliSeconds = parseInt(tzOffSet.substr(tzOffSet.length - 2)) * 60000;

                dateInstance = new Date(dateInstance.getTime() + (dateInstance.getTimezoneOffset() * (60 * 1000)) + (offSetDirection * (hoursInMilliSeconds + minutesInMilliSeconds)));
            }
            if (onlyDate) {
                dateInstance = new Date(dateInstance.getFullYear(), dateInstance.getMonth(), dateInstance.getDate());
            }
            return dateInstance;
        };

        /**
         * Following method takes date string and converts it to a java script
         * date object. Given date string pattern should be yyyy-MM-dd HH:mm:ss
         * or yyyy-MM-dd HH:mm:ss:sssZ
         *
         *
         */
        util.getDateObject = function (inputDateString, stripTime) {
            var dateString = inputDateString;
            if (!dateString || dateString === null || dateString === '') {
                return null;
            } else if (!isNaN(dateString)) {
                return new Date(dateString);
            } else if (dateString.length === 10) {
                dateString += ' 00:00:00';
            }

            //var pattern = /\w/g;

            dateString = dateString.replace(/[TZ]/g, ' ').replace(/[-\s]/g, ':');
            var dateArray = dateString.split(':');
            var dateObject = null;
            var monthToNumericMapping = {
                'jan': 0,
                'feb': 1,
                'mar': 2,
                'apr': 3,
                'may': 4,
                'jun': 5,
                'jul': 6,
                'aug': 7,
                'sep': 8,
                'oct': 9,
                'nov': 10,
                'dec': 11
            };


            var month = monthToNumericMapping[dateArray[1].toLowerCase()] || (parseInt(dateArray[1]) - 1);
            var localDate;
            if (stripTime) {
                localDate = new Date(dateArray[0], month, dateArray[2]);
            } else {
                localDate = new Date(dateArray[0], month, dateArray[2], dateArray[3], dateArray[4], dateArray[5]);
            }

            dateObject = localDate;

            if (dateObject && dateObject.toString() === 'Invalid Date') {
                var message = 'Provided date string "' + dateString + '" is not in either of format "yyyy-MM-dd HH:mm:ssZ" or "yyyy-MM-ddTHH:mm:ss:sssZ"';
                console.warn(message);
                throw new Error(message);
            }

            return dateObject;
        };

        /**
         * Method adds/subtracts given offset from the given date or current date
         * @param prop Specifies which part to adjusted, Possible values : ["year", "month", "date", "hour", "minute", "second", "milli"]
         * @param offset Integer value that to be added or subtracted from the date. Negative value indicates to subtract
         * @param date The given date to be adjusted, if not supplied then current date instance is adjusted.
         * @returns Date Returns JS date object after adjustment
         */
        util.add = function (prop, offset, inputDate) {
            inputDate = inputDate || new Date();
            var date = new Date(inputDate.getTime());

            var translate = {
                'year': 'FullYear',
                'month': 'Month',
                'date': 'Date',
                'hour': 'Hours',
                'minute': 'Minutes',
                'second': 'Seconds',
                'milli': 'Milliseconds'
            };
            if (translate[prop]) {
                date['set' + translate[prop]](date['get' + translate[prop]]() + offset);
            }
            return date;
        };

        /**
         * Formats date to given pattern.
         * Uses the angular dateFilter service to format date.
         */
        util.formatDate = function (date, pattern) {
            if (!date || !pattern) {
                return '';
            }
            return $filter('date')(date, pattern);
        };

        util.sort = function (array, expression) {
            return $filter('orderBy')(array, expression);
        };

        util.filter = function (array, expression, option){
            return $filter('filter')(array, expression, option);
        };

        util.trimText = function(inputString){
            return typeof inputString === 'undefined' ? inputString : inputString.trim();
        };

        /**
         * Checks if given toDate is later than the fromDate
         * @param fromDate could be JS Date instance or date string in yyyy-MM-dd HH:mm:ss or ISO date string
         * @param toDate could be JS Date instance or date string in yyyy-MM-dd HH:mm:ss or ISO date string
         * @return returns true if toDate is later than fromDate otherwise false;
         */
        util.compareDates = function (fromDate, toDate) {
            fromDate = (angular.isDate(fromDate) ? fromDate : this.getDateObject(fromDate)).getTime();
            toDate = (angular.isDate(toDate) ? toDate : this.getDateObject(toDate)).getTime();
            return toDate > fromDate;
        };

        util.onLoadImage = function (element) {
            angular.element(element).closest('.visible-non').removeClass('visible-non');
        };

        /**
         * Function is called when a particular image could not be loaded, This sets a default image
         */
        util.onErrorImageLoad = function (element) {
            element.src = '';
            return false;
        };

        return util;
    }
})();
