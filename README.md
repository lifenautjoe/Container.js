![Container.js](http://i.imgur.com/PD9tfYl.png)

**A dead-simple instance container for [node.js.](https://nodejs.org/)**

![dependencies](https://david-dm.org/thefabulousdev/Container.js.svg)
Motivation
--------
**Container.js** aims to be as simple and unobtrusive as possible while providing a reliable way to store and access instances of a predefined constructor.
**While it can be used in many ways , the main motivation behind the module was to provide a way to share constructor instances between a [node.js](https://nodejs.org/) application by attaching a container instance to the class/constructor.**

Installation
--------

    npm install container.js

Usage
--------
* [Instantiation](#instantiation)
* [Default arguments](#default-arguments)
  * [Traditional](#traditional)
  * [Single configuration object](#single-configuration-object)
* [Adding an instance](#adding-an-instance)
* [Retrieving an instance](#retrieving-an-instance)
* [Checking for existence](#checking-for-existence)

## Instantiation

On it's simplest form

``` js
var Container = require("container.js");

var constructorContainer = new Container(Constructor);
```

However a most likely desired usage  will be the following

``` js
var Container = require("container.js");

var Constructor = function(){

};

Constructor.container = new Container(Constructor);

module.exports = Constructor;

```
for if the `Human` constructor module is exported and then required elsewhere,  the container and it's items will be available as 
``` js
var Constructor = require('constructor');

Constructor.container...
```

## Default arguments

If you would like to define default arguments for all constructed instances which can be overridden/extended, it is **possible to do so in two ways**.

### Traditional
**Let**
``` js
var Human = function(gender,country,favouriteColor){
	this.gender = gender;
	this.country = country;
	this.favouriteColor = favouriteColor;
};

module.exports = Human;
```

If your constructor accept one or multiple arguments as the previously defined `Human` constructor and not a [single configuration object](#single-configuration-object) you can define your container default arguments as 
``` js
// Instantiate the container with the Human constructor.
var container = new Container(Human);
// Set the default arguments
container.defaults = ['male','USA','yellow'];
```
And then whenever you add a new instance to your container as
``` js
container.add('paul');
```
The `Human` constructor will now be called with the `'male','USA','yellow'` arguments .

#### Want to override your defaults ?
Call the `add` method with the individual instance arguments as 

``` js
container.add('sarah','female','canada','pink');
```

#### Want to override just some of your defaults?
Call the `add` method with the individual instance arguments and `undefined` to use the default value for a parameter 
``` js
container.add('carl',undefined,undefined,'green');
```
The `Human` constructor will now be called with the `'male','USA','green'` arguments ([we previously defined `'male','USA'` as defaults](#traditional))

### Single configuration object
**Let**
``` js
var Alien = function(configuration){
	this.specie = configuration.specie;
	this.planet = configuration.planet;
	this.language = configuration.language;
};

module.exports = Alien;
```
If your constructor accepts single configuration object, you can define your container default arguments as 
``` js
// Instantiate the container with the Alien constructor.
var container = new Container(Alien);
// Set the default arguments
container.defaults = {
	specie : 'wookie',
	planet : 'kashyyyk',
	language : 'shyriiwook'
};
```
And then whenever you add a new instance to your container as
``` js
container.add('chewbacca');
```
The `Alien` constructor will now be called with the configuration object
``` js
{
	specie : 'wookie',
	planet : 'kashyyyk',
	language : 'shyriiwook'
}
```


#### Want to override your defaults ?
Call the `add` method with the individual instance configuration object attributes as

``` js
container.add('han solo',{
	specie : 'human',
	planet : 'corellia',
	language : 'english'
});
```

#### Want to override just some of your defaults?
Call the `add` method with the individual instance configuration argument attributes omitting the attributes where the default value should be used
``` js
container.add('wicket',{
	specie : 'ewok'
});
```
The `Alien` constructor will now be called with the configuration object
([we previously defined  the `planet` and `language`  defaults](#single-configuration-object))

``` js
{
	specie : 'ewok',
	planet : 'kashyyyk',
	language : 'shyriiwook'
}
```

## Adding an instance
``` js
// Returns the added instance
container.add(identifier,args...);
```
## Retrieving an instance
``` js
// Returns the retrieved instance.
container.get(identifier);
```
## Removing an instance
``` js
container.remove(identifier);
```
## Checking for existence
``` js
// Returns a boolean.
container.has(identifier); // Returns a boolean
```

## Installation

### Installing npm (node package manager)
```
  curl http://npmjs.org/install.sh | sh
```

### Installing Container.js
```
  [sudo] npm install container.js
```

## Run Tests
All of the Container.js tests are written in [jasmine](http://jasmine.github.io/), and designed to be run with npm.

``` bash
  $ npm install --dev
  $ npm test
```

#### Author: [Joel Hernández](https://github.com/thefabulousdev)
