
function Exercise(name, types, requiresEquipment) {
  this.name = name;
  this.types = types || [];
  this.requiresEquipment = !!requiresEquipment;
};

// class Exercise {
//     id: number;
//     name: string;
//     types: Array<string>;
//     requiresEquipment: boolean;

//     constructor(name?, types?, requiresEquipment?) {
//         this.name = name || '';
//         this.types = types || [];
//         this.requiresEquipment = !!requiresEquipment;
//     }
// }


var ExerciseService = function() {
  this.exercises = [];
  // private exercises: Array<Exercise>;

  var addExercise = function(name, types, requiresEquipment) {
    var exercise = new Exercise(name, types, requiresEquipment);
    exercise.id = this.exercises.length;
    this.exercises.push(exercise);
  }.bind(this);

  addExercise("Mountain climbers", ["core"]);
  addExercise("Jumping jacks", ["cardio"]);
  addExercise("Biceps curl", ["upper"], true);
  addExercise("Shoulder raise", ["upper"], true);
  addExercise("Shoulder press", ["upper"], true);
  addExercise("Bicpes curl + shoulder press", ["upper"], true);
  addExercise("Squats", ["lower"]);
  addExercise("Squat jumps", ["lower", "cardio"]);
  addExercise("Lunges (forward)", ["lower"]);
  addExercise("Lunges (back)", ["lower"]);
  addExercise("Lunges (side)", ["lower"]);
  addExercise("Lunge + biceps curl", ["lower", "upper"], true);
  addExercise("Squat + shoulder raise", ["lower", "upper"], true);
  addExercise("Row", ["upper"], true);
  addExercise("Bridge", ["core"]);
  addExercise("Hip raise", ["core"]);
  addExercise("Plank", ["core"]);
  addExercise("Side plank", ["core"]);

  // Automatically initialize unique IDs for each exercise that match their position in the array.
  this.exercises.forEach(function(exercise, i) {
    exercise.id = i;
  });

  this.getExercises = function() {
    return this.exercises;
  };

  this.getExercise = function(id) {
    return this.exercises[id];
  };

  this.saveExercise = function(exercise) {
    if (exercise.id !== undefined) {
      exercise.id = this.exercises.length;
      this.exercises.push(exercise);
    } else {
      this[exercise.id] = exercise;
    }
  };

  this.getWorkout = function(numStations, allowEquipment) {
    // If the user doesn't have access to equipment, filter those exercises out.
    var available;
    if (!allowEquipment) {
      available = randomize(this.exercises.filter(function(exercise) {
        return !exercise.requiresEquipment;
      }));
    } else {
      available = randomize(this.exercises);
    }

    var workout = [];
    var rejected = [];

    var limit = Math.floor(numStations / 4);
    var count = {
      lower: 0,
      upper: 0,
      core: 0,
      cardio: 0
    }

    // Build a workout from the random order, attempting to balance among exercise
    // types.
    for (var i = 0; i < available.length && workout.length < numStations; i++) {
      if (available[i].types.some(function(type) {
        return count[type] == limit;
      })) {
        rejected.push(available[i]);
      } else {
        workout.push(available[i]);
        available[i].types.forEach(function(type) {
          count[type]++;
        });
      }
    }

    // If after balancing the workout we're short of stations, just start adding
    // random exercises.  Sorry!
    for (var i = 0; i < rejected.length && workout.length < numStations; i++) {
      workout.push(rejected[i]);
    }

    return workout;
  };
};

// Perform an "inside-out" version of the Fischer-Yates shuffle to non-destructively
// shuffle our available exercises.
// See https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle#The_.22inside-out.22_algorithm
var randomize = function(exercises) {
  var random = [];
  random.length = exercises.length;
  for (var i = 0; i < exercises.length; i++) {
    var j = Math.floor(Math.random() * i);
    if (i != j) {
      random[i] = random[j];
    }
    random[j] = exercises[i];
  }
  return random;
};

