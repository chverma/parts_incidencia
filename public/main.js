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

function successMessage(msg) {
    $('.alert-success').css("display", "block")
    $('#success-message').text(msg)
    setTimeout(function(){ $('.alert-success').css("display", "none"); }, 10000);
}

function errorMessage(msg) {
    $('.alert-danger').css("display", "block")
    $('#error-message').text(msg)
    setTimeout(function(){ $('.alert-danger').css("display", "none"); }, 10000);
}
function createIncidenceController ($scope, $http) {
  // Set navbar active
  $scope.isCreate = true;
  $scope.isList = false;

  // Get the faults
  $http.get('/faults/')
  .success(function (data) {
    $scope.faults = data;
  })
  .error(function (data) {
    console.log('Error: ', data);
  });

  // Get the proposals
  $http.get('/proposals')
  .success(function (data) {
    $scope.proposals = data;
  })
  .error(function (data) {
    console.log('Error: ', data);
  });

  $scope.formData = {}
  $http.get('/user')
  .success(function (data) {
    $scope.formData.prof_nom = data.name;
    $scope.formData.prof_cog1 = data.firstFamilyName;
    $scope.formData.prof_cog2 = data.secondFamilyName;
  })
  .error(function (data) {
    console.log('Error: ', data);
  });

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
      console.log("*********DATA")
      console.log(data)
      if (data.code) {
        errorMessage('Ha ocorregut un error al crear l\'incidència.' + data.sqlMessage)
      } else {
        successMessage('Incidència creada!');
        setTimeout(function (){ window.location.assign('/detall.html?incidence_id=' + data.incidence_id)}, 2000);
      }
    })
    .error(function (data) {
      console.log(data)
      if (data.error) {
        data = ": " + data.message.sqlMessage;
      } else {
        data = "";
      }
      errorMessage('Ha ocorregut un error al crear l\'incidència' + data)
    });
  };
}
// Returns one incidence by id
function getDetailController ($scope, $http, $location) {
  $scope.isCreate = false;
  $scope.isList = false;

  $scope.formData = {};
  $scope.parameters = $location.search();
  // Get the faults
  $http.get('/faults/')
  .success(function (data) {
    $scope.faults = data;
  })
  .error(function (data) {
    console.log('Error: ' + data);
  });

  // Get the proposals
  $http.get('/proposals')
  .success(function (data) {
    $scope.proposals = data;
  })
  .error(function (data) {
    console.log('Error: ', data);
  });

  // When the page is loadead, get from the API the incidences
  $http.get('/incidences/' + $scope.parameters.incidence_id)
  .success(function (data) {
    $scope.formData = data[0];
    //$('#dataihora').val(parseDate($scope.formData.data, true));
    // http://eonasdan.github.io/bootstrap-datetimepicker/#view-mode
    var dateTime1 = $('#datetimepicker1').datetimepicker({
      locale: 'ca',
      format: 'DD-MM-YYYY HH:mm',
      defaultDate: new Date($scope.formData.data),
    });

    // Date Picker for dia_com_pares
    var dateTime = $('#datetimepicker2').datetimepicker({
      locale: 'ca',
	  format: 'DD-MM-YYYY',
      defaultDate: new Date($scope.formData.dia_com_pares),
    });

	//$('#dia_com_pares').val(parseDate($scope.formData.dia_com_pares, false));
  })
  .error(function (data) {
    console.log('Error: ' + data);
    errorMessage('Ha ocorregut un error. ' + data)
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
      successMessage('Modificat correctament')
    })
    .error(function (data) {
      console.log('Error:' + data);
      errorMessage('Error al modificar ' + data)
    });
  };

  // Delete an incidence
  $scope.deleteIncidence = function () {
    var id = $scope.formData.incidence_id;
    $http.delete('/incidences/' + id)
    .success(function (data) {
      $scope.incidences = data;
      successMessage('Incidència borrada correctament.')
      setTimeout(function (){ window.location.assign('/consultar.html')}, 2000)
    })
    .error(function (data) {
      console.log('Error:' + data);
      errorMessage('Incidència no borrada. Ha ocorregut un error.')
    });
  };

  $scope.previousPage = function () {
    window.history.back();
  }
}

// Returns all the incidences
function getAllController ($scope, $http) {
  // Set navbar active
  $scope.isCreate = false;
  $scope.isList = true;
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
      errorMessage('Incidència no borrada. Ha ocorregut un error.')
    });
  };
}

function indexController ($scope, $http) {
  $scope.isCreate = false;
  $scope.isList = false;
}

// Returns all the incidences
function navBarController ($scope, $http) {
    $http.get('/user')
    .success(function (data) {
        console.log(data)
        $scope.avatarImg = data.avatar;
        $scope.email = data.email;
    })
    .error(function (data) {
        console.log('Error: ' + data);
    });
}
