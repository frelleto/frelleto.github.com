var FrelletoBlog = angular.module('FrelletoBlog', []);

FrelletoBlog.filter('highlight', function () {
    return function (text, filter) {
        if (filter === '') {
            return text;
        }
        else {
            return text.replace(new RegExp(filter, 'gi'), '<span class="match">$&</span>');
        }
    };
});

SearchController.$inject = ['$scope'];

function SearchController($scope) {
    $scope.posts = FrelletoBlog.posts;
}
