## Installation

'''
npm install -g karma-cli
npm install
'''

## Unit tests
```
karma start
```

## Integration tests
```
npm install -g protractor
webdriver-manager update
webdriver-manager start
```

Then in a separate command line window
```
protractor e2e-tests/conf.js
```

## 1. Angular Upgrade

Replace angular 1.3 source imports with 1.4.


## 2. Angular Material upgrade

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

## 3. Component Router adoption

In index.html:
* Comment out the angular-route.js inclusion and comment in the router and shim libraries.
* Replace `<div ng-view>` with `<div ng-outlet>`.
In app.js:
* Comment out the `ngRoute` dependency and comment in `ngShim, ngComponentRouter`.


## 4. TypeScript adoption

Run `grunt` to start the TypeScript file watcher and compiler.
Rename `exercise-service.js` to `exercise-service.ts`.  
In index.html, replace the `exercise-service.js` import with `app-ts.js`.

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

and replace the first line of ExerciseService with
```
private exercises: Array<Exercise>;
```

