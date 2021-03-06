// APP DEFINITION AND CONFIG

var app = angular.module('CircuitApp', ['ngMaterial', 'ngMessages', 'ngAnimate',
 'ngRoute']);

app.config(function($mdThemingProvider) {
    $mdThemingProvider.theme('default')
      .primaryPalette('blue').accentPalette('red');
    })

app.service('exerciseService', ExerciseService);

app.config(function($mdIconProvider) {
  $mdIconProvider
    .icon('add', 'svg/add.svg')
    .icon('home', 'svg/home.svg')
    .icon('list', 'svg/list.svg')
    .icon('pause', 'svg/pause.svg')
    .icon('play', 'svg/play.svg')
});

// CONTROLLERS

// List controller
var listCtrl = ['$location', 'exercises', function($location, exercises) {
  this.exercises = exercises;
  this.editExercise = function(id) {
    $location.url('/edit/' + id);
  }
}];

// Edit controller
var editCtrl = ['$location', 'exerciseService', 'exercise', 
  function($location, exerciseService, exercise) {
    this.exercise = exercise;

    this.getTypes = function(search) {
      return ['cardio', 'core', 'upper', 'lower'].filter(function(type) {
        return type.indexOf(search) >= 0;
      });
    };

    this.cancel = function() {
      $location.url('/list');
    };

    this.save = function() {
      exerciseService.saveExercise(this.exercise);
      $location.url('/list');
    }
  }];

// Generate workout controller
var generateCtrl = ['$location', function($location) {
  this.breakSecs = 15;
  this.workSecs = 45;
  this.exercisesPerStation = 1;
  this.stationsPerRound = 10;
  this.rounds = 2;
  this.allowEquipment = true;

  this.generate = function() {
    $location.url('workout?breakSecs=' + this.breakSecs + '&workSecs=' + 
      this.workSecs + '&exercises=' + this.exercisesPerStation + '&stations=' + 
      this.stationsPerRound + '&rounds=' + this.rounds + '&allowEquipment=' + 
      this.allowEquipment);
  }.bind(this);
}];


// Generate workout controller
var workoutCtrl = [
    '$location', '$interval', '$timeout', 'exerciseService', 
function($location, $interval, $timeout, exerciseService) {
  // Get our workout configuration from the URL params.
  var params = $location.search();
  this.breakSecs = Number(params['breakSecs']);
  this.workSecs = Number(params['workSecs']);
  this.exercisesPerStation = Number(params['exercises']);
  this.stationsPerRound = Number(params['stations']);
  this.rounds = params['rounds'];
  this.allowEquipment = params['allowEquipment'];

  this.refresh = function() {
    this.running = false;
    // Generate a workout for this config.
    this.selected = exerciseService.getWorkout(this.stationsPerRound, 
        this.allowEquipment);
  };
  this.refresh();

  var step = function() {
    this.atStation = !this.atStation;
    this.seconds = this.atStation ? this.workSecs : this.breakSecs;
    if (this.atStation) {
      this.index++;
    }

    this.timer = $interval(function() {
      if (this.seconds == 0) {
        $interval.cancel(this.timer);
        if (this.index < this.stationsPerRound || this.atStation) {
          step();
        }
      } else {
        this.seconds--;
      }
    }.bind(this), 1000);   
  }.bind(this);

  this.start = function() {
    this.atStation = false;
    this.seconds = this.workSecs;
    this.index = -1;
    this.running = true;
    step();
  };

  this.pause = function() {
    $interval.cancel(this.timer);
    this.running = false;
  };

}];



// ROUTE CONFIG

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/list', { 
      controller: listCtrl,
      controllerAs: 'ctrl',
      templateUrl: 'list.html',
      resolve: { exercises: ['exerciseService', function(exerciseService) {
       return exerciseService.getExercises();
      }]}
    })
    .when('/add', { 
      controller: editCtrl,
      controllerAs: 'ctrl',
      templateUrl: 'edit.html',
      resolve: { exercise: function() { return new Exercise(); } }
    }).when('/edit/:id', { 
      controller: editCtrl,
      controllerAs: 'ctrl',
      templateUrl: 'edit.html',
      resolve: { 
        exercise: ['$route', 'exerciseService', 
            function($route, exerciseService) {
              return angular.copy(exerciseService.getExercise(
                $route.current.params.id));
            }]},
    }).when('/', {
      controller: generateCtrl,
      controllerAs: 'ctrl',
      templateUrl: 'generate.html',
    }).when('/workout', {
      controller: workoutCtrl,
      controllerAs: 'ctrl',
      templateUrl: 'workout.html',
    });
}]);
