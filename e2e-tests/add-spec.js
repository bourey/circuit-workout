describe('Add an exercise', function() {

  beforeEach(function() {
    browser.get('http://127.0.0.1/~bourey/circuit/app/#/add');
  });

  it('should display an error when the name is too long', function() {
    element(by.model('ctrl.exercise.name')).
        sendKeys('Very long exercise name that should be rejected');
    browser.sleep(1000);
    expect($('.errors').getText()).toContain('30 characters');
  });
});
