class Exercise {
		id: number;
		name: string;
		types: Array<string>;
		requiresEquipment: boolean;

		constructor(name?, types?, requiresEquipment?) {
				this.name = name || '';
				this.types = types || [];
				this.requiresEquipment = !!requiresEquipment;
		}
}

class ExerciseService {
		private exercises: Array<Exercise>;

		constructor() {
				this.exercises = [];
				this.addExercise("Mountain climbers", ["core"]);
				this.addExercise("Jumping jacks", ["cardio"]);
				this.addExercise("Mountain climbers", ["core"]);
				this.addExercise("Jumping jacks", ["cardio"]);
				this.addExercise("Biceps curl", ["upper"], true);
				this.addExercise("Shoulder raise", ["upper"], true);
				this.addExercise("Shoulder press", ["upper"], true);
				this.addExercise("Bicpes curl + shoulder press", ["upper"], true);
				this.addExercise("Squats", ["lower"]);
				this.addExercise("Squat jumps", ["lower", "cardio"]);
				this.addExercise("Lunges (forward)", ["lower"]);
				this.addExercise("Lunges (back)", ["lower"]);
				this.addExercise("Lunges (side)", ["lower"]);
				this.addExercise("Lunge + biceps curl", ["lower", "upper"], true);
				this.addExercise("Squat + shoulder raise", ["lower", "upper"], true);
				this.addExercise("Row", ["upper"], true);
				this.addExercise("Bridge", ["core"]);
				this.addExercise("Hip raise", ["core"]);
				this.addExercise("Plank", ["core"]);
				this.addExercise("Side plank", ["core"]);
		}

		getExercises(): Array<Exercise> {
				return this.exercises;
		}

		getExercise(id: number): Exercise {
				return this.exercises[id];;
		}

		saveExercise(exercise: Exercise) {
				if (exercise.id !== undefined) {
						exercise.id = this.exercises.length;
						this.exercises.push(exercise);
				} else {
						this[exercise.id] = exercise;
				}
		}


	  getWorkout(numStations: number, allowEquipment: boolean): Array<Exercise> {
			// If the user doesn't have access to equipment, filter those exercises out.
			var available = this.randomize(allowEquipment ? this.exercises :
				this.exercises.filter(function(exercise) { return !exercise.requiresEquipment; }));

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


		private addExercise(name: string, types: Array<string>, requiresEquipment?: boolean) {
			var exercise = new Exercise(name, types, requiresEquipment);
			exercise.id = this.exercises.length;
			this.exercises.push(exercise);
		}


		// Perform an "inside-out" version of the Fischer-Yates shuffle to non-destructively
		// shuffle our available exercises.
		// See https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle#The_.22inside-out.22_algorithm
		private randomize(exercises: Array<Exercise>) {
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

}

