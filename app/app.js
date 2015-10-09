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

// List controller
var listCtrl = ['exercises', function(exercises) {
  this.exercises = exercises;
}];

// Edit controller
var editCtrl = ['$location', 'exerciseService', 'exercise', 
  function($location, exerciseService, exercise) {
    this.exercise = exercise;
    this.ng14 = angular.version.minor > 3;

    this.save = function() {
      exerciseService.saveExercise(this.exercise);
      $location.path('/');
    }
  }];

// Generate workout controller
var generateCtrl = ['exerciseService', function(exerciseService) {
  this.breakSecs = 15;
  this.workSecs = 45;
  this.exercisesPerStation = 1;
  this.stationsPerRound = 10;
  this.rounds = 2;
  this.allowEquipment = true;

  this.generate = function() {
    this.selected = exerciseService.getWorkout(this.stationsPerRound, this.allowEquipment);
  }.bind(this);
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
          return exerciseService.getExercise($route.current.params.id);
        }]},
    }).when('/generate', {
      controller: generateCtrl,
      controllerAs: 'ctrl',
      templateUrl: 'generate.html',
    });
}]);
