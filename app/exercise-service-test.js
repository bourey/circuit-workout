describe("Exercise service", function() {

	var service;

	beforeEach(function() {
		service = new ExerciseService();
	});

	it("returns an exercise list", function() {
		expect(service.getExercises().length).toBe(18);
	});

	it("returns an exercise", function() {
		expect(service.getExercise(1).title).toBe('Jumping jacks');
	});
});
