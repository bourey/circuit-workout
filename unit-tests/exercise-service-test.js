describe("Exercise service", function() {

  var service;

  beforeEach(function() {
    service = new ExerciseService();
  });

  it("returns an exercise list", function() {
    expect(service.getExercises().length).toBe(18);
  });
});
