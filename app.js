// APP DEFINITION AND CONFIG

var app = angular.module('CircuitApp', ['ngMaterial', 'ngMessages', 'ngAnimate',
//  'ngRoute'
  'ngRouteShim', 'ngComponentRouter', 
  ]);

app.config(function($mdThemingProvider) {
    $mdThemingProvider.theme('default')
      .primaryPalette('teal').accentPalette('deep-orange');
    })

app.service('exerciseService', ExerciseService);


// CONTROLLERS

var listCtrl = ['exercises', function(exercises) {
  this.exercises = exercises;
}];

var editCtrl = ['$location', 'exerciseService', 'exercise', function($location, exerciseService, exercise) {
  this.exercise = exercise;
  this.ng14 = angular.version.minor > 3;

  this.save = function() {
    exerciseService.saveExercise(this.exercise);
    $location.path('/');
  }
}];

var generateCtrl = ['exerciseService', function(exerciseService) {
  this.breakSecs = 15;
  this.workSecs = 45;
  this.rounds = 10;
  this.allowEquipment = false;

  this.generate = function() {
    this.selected = exerciseService.getWorkout(10, true);
  };
}];


// ROUTE CONFIG

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/', { 
      controller: listCtrl,
      controllerAs: 'ctrl',
      templateUrl: 'list.html',
      resolve: { exercises: ['exerciseService', function(exerciseService) {
       return exerciseService.getExercises();
      }]}
    }).when('/add', { 
      controller: editCtrl,
      controllerAs: 'ctrl',
      templateUrl: 'edit.html',
      resolve: { exercise: function() { new Exercise(); } }
    }).when('/edit/:id', { 
      controller: editCtrl,
      controllerAs: 'ctrl',
      templateUrl: 'edit.html',
      resolve: { 
        exercise: ['$route', 'exerciseService', function($route, exerciseService) {
          console.log($route);
          return exerciseService.getExercise($route.current.params.id);
        }]},
    }).when('/generate', {
      controller: generateCtrl,
      controllerAs: 'ctrl',
      templateUrl: 'generate.html',
    });
}]);
