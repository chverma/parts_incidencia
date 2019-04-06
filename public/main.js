angular.module('angularIncidencies', []);

function formatDate (strDate) {
  var dateArr = strDate.split(' ');
  var date = dateArr[0].split('-');
  var dateObj = date[2] + '-' + date[1] + '-' + date[0];
  if (dateArr.length === 2) {
    dateObj += ' ' + dateArr[1] + ':00';
  }
  return dateObj;
}
function createIncidenceController ($scope, $http) {
  // When new incidence is created, send it to the backend API
  $scope.createIncidence = function () {
    $scope.formData.data = formatDate($('#dataihora').val());
    if ($('#dia_com_pares').val() === '') {
      $scope.formData.dia_com_pares = undefined;
    } else {
      $scope.formData.dia_com_pares = formatDate($('#dia_com_pares').val());
    }
    $http.post('/incidences', $scope.formData)
    .success(function (data) {
      //$scope.formData = {};
      $scope.incidences = data;
      console.log(data);
    })
    .error(function (data) {
      console.log('Error:' + data);
    });
  };
}
// Returns one incidence by id
function getDetailController ($scope, $http, $location) {
  $scope.formData = {};
  $scope.parameters = $location.search();
  console.log($scope.parameters)
  // When the page is loadead, get from the API the incidences
  $http.get('/incidences')
  .success(function (data) {
    $scope.incidences = data;
    console.log(data);
  })
  .error(function (data) {
    console.log('Error: ' + data);
  });

  // Delete an incidence
  $scope.deleteIncidence = function (id) {
    $http.delete('/incidence/' + id)
    .success(function (data) {
      $scope.incidences = data;
      console.log(data);
    })
    .error(function (data) {
      console.log('Error:' + data);
    });
  };
}

// Returns all the incidences
function getAllController ($scope, $http) {
  // When the page is loadead, get from the API the incidences
  $http.get('/incidences')
  .success(function (data) {
    $scope.incidences = data;
    console.log(data);
  })
  .error(function (data) {
    console.log('Error: ' + data);
  });
}
