angular.module('leatherLaneMarketApp', ['ngAnimate'])
  .controller('MarketController', ["$scope", "$http", function($scope,$http) {
    $scope.stalls = [];

    $http.get('/stalls.json')
      .success(function(data){
        $scope.stalls = data;
      }).error(function(data){
        console.log("Error grabbing data from /stalls.json");
      });

    $scope.selectStall = function(stall) {
      $scope.editStall = null;
      $scope.selectedStall = stall;
    };
    $scope.clearSelectedStall = function() {
      $scope.selectedStall = null;
      $scope.editStall = null;
    };
    $scope.addStall = function() {
      $http.post('/stalls.json', { stall: $scope.newStall }).success(function(data) {
        $scope.stalls.push(data);
        $scope.selectedStall = $scope.newStall;
        $scope.newStall = null;
        $scope.stallForm.$setPristine();
      });
    };

    $scope.deleteStall = function(stall) {
      $http.delete('/stalls/' + stall.id + '.json').success(function(data) {
        var thisStall = $scope.stalls.indexOf(stall);
        $scope.stalls.splice(thisStall, 1);
        $scope.selectedStall = null;
      });
    };

    $scope.setEditStall = function(stall) {
      $scope.editStall = stall;
    };

    $scope.updateStall = function(stall) {
      $http.put('/stalls/' + stall.id + '.json', { stall: stall }).success(function(data) {
        $scope.editStall = null;
      });
    }
  }]);
