var appModule = angular.module('angularIncidencies', []);
appModule.config(['$locationProvider', function ($locationProvider) {
  $locationProvider.html5Mode(true);
}]);

function formatDate (strDate) {
  var dateArr = strDate.split(' ');
  var date = dateArr[0].split('-');
  var dateObj = date[2] + '-' + date[1] + '-' + date[0];
  if (dateArr.length === 2) {
    dateObj += ' ' + dateArr[1] + ':00';
  }
  return dateObj;
}

function parseDate(date, isTime) {
  var newDate = new Date(date);
  var str_date = newDate.getDate() + '-' + (newDate.getMonth() + 1) + '-' + newDate.getFullYear();
  str_date = str_date.replace(/\b(\d{1})\b/g, '0$1');
  if (isTime) {
    str_date += ' ' + newDate.getHours() + ':' + newDate.getMinutes();
  }
  return str_date;
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

  // When the page is loadead, get from the API the incidences
  $http.get('/incidences/' + $scope.parameters.incidence_id)
  .success(function (data) {
    $scope.formData = data[0];
    //$('#dataihora').val(parseDate($scope.formData.data, true));
    $('#datetimepicker1').datetimepicker({
      date: new Date($scope.formData.data),
      language: 'ca-ES'
    });
    //$('#dia_com_pares').val(parseDate($scope.formData.dia_com_pares, false));
    $('#datetimepicker2').datetimepicker({
      date: new Date($scope.formData.dia_com_pares),
      language: 'ca-ES'
    });
  })
  .error(function (data) {
    console.log('Error: ' + data);
  });

  $scope.modifyIncidence = function () {
    $scope.formData.data = formatDate($('#dataihora').val());
    if ($('#dia_com_pares').val() === '') {
      $scope.formData.dia_com_pares = undefined;
    } else {
      $scope.formData.dia_com_pares = formatDate($('#dia_com_pares').val());
    }
    $http.put('/incidences/' + $scope.formData.incidence_id, $scope.formData)
    .success(function (data) {
      //$scope.formData = {};
      $scope.incidences = data;
      console.log(data);
    })
    .error(function (data) {
      console.log('Error:' + data);
    });
  };

  // Delete an incidence
  $scope.deleteIncidence = function () {
    var id = $scope.formData.incidence_id;
    $http.delete('/incidences/' + id)
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

  // Delete an incidence
  $scope.deleteIncidence = function (id) {
    $http.delete('/incidences/' + id)
    .success(function (data) {
      location.reload();
    })
    .error(function (data) {
      console.log('Error:' + data);
    });
  };
}
