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

*Goal: Find a bug using integration tests and fix using conditional code.*

1. In index.html, replace angular 1.3 source imports with 1.4.
2. Run the integration test suite and observe test failure.
3. Visit #/add in the browser and examine the JS console failures.
4. Add the following to the editCtrl in app.js:

        this.ng14 = angular.version.minor > 3;

5. Replace

        <div class="errors" ng-messages="form.name.$error" ng-messages-include="error.html">
        	<div ng-message="required">Name is required</div>
        </div>

with

        <div class="errors" ng-messages="form.name.$error" ng-if="form.$dirty && !ctrl.ng14" ng-messages-include="error.html">
        	<div ng-message="required">Name is required</div>
        </div>
        
        <div class="errors" ng-messages="form.name.$error" ng-if="form.$dirty && ctrl.ng14">
        	<div ng-message="required">Name is required</div>
        	<div ng-messages-include="error.html"></div>
        </div>

6. Re-run the integration tests and observe that they pass.


## Exercise 2: Angular Material upgrade

*Goal: use screenshot tests to identify visual differences caused by a CSS refactor.*

1. Before starting, run the screenshot tests once to generate a clean reference image.
2. Replace angular material 0.10 imports with 0.11 (both CSS and jS).
3. Run screenshot tests and observe the padding difference.
4. Add the following to app.css:

        .layout-padding, 
        .layout-padding>.flex, 
        .layout-padding>.flex-gt-sm, 
        .layout-padding>.flex-lt-lg, 
        .layout-padding>.flex-md {
        	padding: 12px;
        }

5. Re-run the screenshot tests and observe they are passing again.


## Exercise 3: Component Router adoption

*Goal: iterative adoption of a new library.*

1. In index.html replace the angular.min.js import with

        <script src="lib/angular_1_router.js"></script>
        <script src="lib/ng_route_shim.js"></script>

2. Also in index.html, replace `<div ng-view>` with `<div ng-outlet>`.
3. In app.js, replace the `'ngRoute'` dependency with `'ngShim', 'ngComponentRouter'`.


## Exercise 4: TypeScript adoption

*Goal: iterative adoption of a new library.*

1. Run `grunt` to start the TypeScript file watcher and compiler.
2 .Rename `exercise-service.js` to `exercise-service.ts`.  
3. In index.html, replace the `exercise-service.js` import with `app-ts.js`.
4. Observe that our app still works!
5. Replace the Exercise function with

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

6. Next, replace the first line of ExerciseService with

        private exercises: Array<Exercise>;


