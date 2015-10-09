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
				this.addExercise(new Exercise("Mountain climbers", ["core"]));
				this.addExercise(new Exercise("Jumping jacks", ["cardio"]));
		}

		private addExercise(exercise: Exercise) {
				exercise.id = this.exercises.length;
				this.exercises.push(exercise);
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

		getWorkout(): Array<Exercise> {
				return this.exercises;
		}
}

