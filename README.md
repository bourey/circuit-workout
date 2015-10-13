# About this app

This app was designed as a demonstration resource for bourey's AngularConnect 2015 talk on iterative 
version upgrades.  It's featureset and structure is deliberately simple to keep the app small.


# Running the app

## Installation

```
npm install -g grunt-cli
npm install -g karma-cli
npm install -g protractor
npm install
```

## Unit tests

Just run `karma start`.

## Integration tests

First, start selenium by executing

```
webdriver-manager update
webdriver-manager start
```

Then in a separate command line window run 
```
protractor e2e-tests/conf.js
```

## Screenshot tests

Register with applitools for an API key, then enter this API key into ___.  Run
```
protractor e2e-tests/conf-screenshot.js
```

# Upgrade tutorial

The following instructions walk through several version upgrades.


## Exercise 1: Angular Upgrade

Goal: Find a bug using integration tests and fix using conditional code.

In index.html, replace angular 1.3 source imports with 1.4.
Run the integration test suite and observe test failure.
Visit #/add in the browser and examine the JS console failures.

Add the following to the editCtrl in app.js:
```
this.ng14 = angular.version.minor > 3;
```

Replace

```
<div class="errors" ng-messages="form.name.$error" ng-messages-include="error.html">
	<div ng-message="required">Name is required</div>
</div>
```

with

```
<div class="errors" ng-messages="form.name.$error" ng-if="form.$dirty && !ctrl.ng14" ng-messages-include="error.html">
	<div ng-message="required">Name is required</div>
</div>

<div class="errors" ng-messages="form.name.$error" ng-if="form.$dirty && ctrl.ng14">
	<div ng-message="required">Name is required</div>
	<div ng-messages-include="error.html"></div>
</div>
```

Re-run the integration tests and observe that they pass.


## Exercise 2: Angular Material upgrade

Goal: use screenshot tests to identify visual differences caused by a CSS refactor.

Replace angular material 0.10 imports with 0.11 (both CSS and jS).
Run screenshot tests and observe the padding difference.
Add the following to app.css:
```
.layout-padding, 
.layout-padding>.flex, 
.layout-padding>.flex-gt-sm, 
.layout-padding>.flex-lt-lg, 
.layout-padding>.flex-md {
	padding: 12px;
}
```
Re-run the screenshot tests and observe they are passing again.


## Exercise 3: Component Router adoption

Goal: iterative adoption of a new library.

In index.html:
* Comment out the angular-route.js inclusion and comment in the router and shim libraries.
* Replace `<div ng-view>` with `<div ng-outlet>`.
In app.js:
* Replace the `'ngRoute'` dependency and comment in `'ngShim', 'ngComponentRouter'`.


## Exercise 4: TypeScript adoption

Goal: iterative adoption of a new library.

Run `grunt` to start the TypeScript file watcher and compiler.
Rename `exercise-service.js` to `exercise-service.ts`.  
In index.html, replace the `exercise-service.js` import with `app-ts.js`.

Observe that our app still works!

Replace the Exercise function with
```
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
```

Next, replace the first line of ExerciseService with

```
private exercises: Array<Exercise>;
```

