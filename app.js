var app = angular.module('CircuitApp', ['ngMaterial', 'ngMessages', 'ngRouteShim', 'ngComponentRouter', 'ngAnimate'])
  .config(function($mdThemingProvider) {
    $mdThemingProvider.theme('default')
      .primaryPalette('teal').accentPalette('deep-orange');
    });

var listCtrl = ['exercises', function(exercises) {
  this.exercises = exercises.json.exercises;
}];

var viewCtrl = ['exercise', function(exercise) {
  console.log(exercise)
  this.exercise = exercise.json.exercises[1];
}];

var addCtrl = function() {
  this.ng14 = angular.version.minor > 3;
};

var editCtrl = ['$location', 'exercise', function($location, exercise) {
  this.exercise = exercise.json.exercise[0];
  this.ng14 = angular.version.indexOf('1.4' == 0);

  this.save = function() {
    model.set({
      json: {
        exercises: {
          0: {
            name: this.name
          }
        }
      }
    }).then(function() {
      $location.path('/view/0');
    });
  };
}];

var generateCtrl = ['exercises', function(exercises) {
  this.breakSecs = 15;
  this.workSecs = 45;
  this.rounds = 10;
  this.allowEquipment = false;
  this.exercises = exercises.json.exercises;

  this.generate = function() {
    var s =  Object.keys(this.exercises).map(
        function(key) { 
          return this.exercises[key]; 
      }.bind(this)).filter(function(exercise) {
        return exercise.requiresEquipment != true;
      });
    this.selected = s;
  };
}];

var getExercise = ['$route', function($route) {
  console.log($route.current.params.id);
  return model.get(["exercises", $route.current.params.id, ["id", "name", "type", "requiresEquipment"]]);
}];

app.config(['$routeProvider', function($routeProvider) {
  console.log($routeProvider);
  $routeProvider
    .when('/', { 
      controller: listCtrl,
      controllerAs: 'ctrl',
      templateUrl: 'list.html',
      resolve: {
        exercises: function() {
          return model.get(["exercises", {from: 1, to: 20}, ["id", "name", "type", "requiresEquipment"]]);
        }
      },
    }).when('/add', { 
      controller: addCtrl,
      controllerAs: 'ctrl',
      templateUrl: 'edit.html'
    }).when('/edit/:id', { 
      controller: editCtrl,
      controllerAs: 'ctrl',
      templateUrl: 'edit.html',
      resolve: { exercise: getExercise },
    }).when('/view/:id', { 
      controller: viewCtrl,
      controllerAs: 'ctrl',
      templateUrl: 'detail.html',
      resolve: { exercise: getExercise },
    }).when('/generate', {
      controller: generateCtrl,
      controllerAs: 'ctrl',
      templateUrl: 'generate.html',
      resolve: {
        exercises: function() {
          return model.get(["exercises", {from: 1, to: 20}, ["name", "type", "requiresEquipment"]]);
        }
      },
    });
}]);
