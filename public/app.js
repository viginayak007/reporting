var app = angular.module('app', []);
app.controller('jc', function($scope, $http) {

    $scope.fields = ['car', 'price', 'color'];
    $scope.data =[
        {
          "car": "Audi",
          "price": 40000,
          "color": "blue"
        }, {
          "car": "BMW",
          "price": 35000,
          "color": "black"
        }, {
          "car": "Porsche",
          "price": 60000,
          "color": "green"
        }
      ];


      $scope.convertJ2C =function(){
        var req = {
            method: 'POST',
            url: '/jsontocsv',
            data: { 
                fields: JSON.stringify($scope.fields),
                data : JSON.stringify($scope.data),
                
            }
           }
           $http(req).then(function(response){
            var anchor = angular.element('<a/>');
            anchor.attr({
                href: 'data:attachment/csv;charset=utf-8,' + encodeURI(response.data),
                target: '_blank',
                download: 'filename.csv'
            })[0].click();
           }, function(response){
                alert(`Error $(response)`);
           });
    } 
    
});