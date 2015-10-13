var Eyes = require('eyes.protractor').Eyes;
var eyes = new Eyes();
eyes.setApiKey("YOURKEYHERE");

describe('View exercises', function() {

  beforeEach(function() {
    eyes.open(browser, "Circuit", "Exercise list test", {width: 800, height: 600});
    browser.get('http://127.0.0.1/~bourey/circuit/app/#/list');
  });

  afterEach(function() {
    eyes.close();
  });

  it('should display exercises', function() {
    eyes.checkWindow("Exercise list");
    expect(element.all(by.repeater('exercise in ctrl.exercises')).count()).
        toBe(18);
  });
});
