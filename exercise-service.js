
function Exercise(name, types, requiresEquipment) {
  this.name = name;
  this.types = types || [];
  this.requiresEquipment = !!requiresEquipment;
};

var ExerciseService = function() {
  this.exercises = [
    {
      name: "Mountain climbers",
      type: ["core"],
    },
    {
      name: "Jumping jacks",
      type: ["cardio"],
    },
    {
      name: "Biceps curl",
      requiresEquipment: true,
      type: ["upper"],
    },
    {
      name: "Shoulder raise",
      requiresEquipment: true,
      type: ["upper"],
    },
    {
      name: "Shoulder press",
      requiresEquipment: true,
      type: ["upper"],
    },
    {
      name: "Biceps curl + shoulder press",
      requiresEquipment: true,
      type: ["upper", "lower"],
    },
    {
      name: "Squats",
      type: ["lower"],
    },
    {
      name: "Squat jumps",
      type: ["lower", "cardio"],
    },
    {
      name: "Lunges (forward)",
      type: ["lower"],
    },
    {
      name: "Lunges (back)",
      type: ["lower"],
    },
    {
      name: "Lunges (side)",
      type: ["lower"],
    },
    {
      name: "Lunge with biceps curl",
      requiresEquipment: true,
      type: ["lower"],
    },
    {
      name: "Squat with shoulder raise",
      requiresEquipment: true,
      type: ["lower"],
    },
    {
      name: "Row",
      requiresEquipment: true,
      type: ["upper"],
    },
    {
      name: "Bridge",
      type: ["core"],
    },
    {
      name: "Hip raise",
      type: ["core"],
    },
    {
      name: "Plank",
      type: ["core"],
    },
    {
      name: "Side plank",
      type: ["core"],
    },
  ];

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
      if (available[i].type.some(function(type) {
        return count[type] == limit;
      })) {
        rejected.push(available[i]);
      } else {
        workout.push(available[i]);
        available[i].type.forEach(function(type) {
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

