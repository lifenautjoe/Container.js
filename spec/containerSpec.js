describe('container',function(){
    var Container = require('../lib/container');
    var _ = require('underscore');

    // Test constructor
    var Car = function(){
        var args = _.toArray(arguments);
        if(_.isObject(args[0])){
            // Single configuration instantiation.
            var config = args[0];
            this.numberOfWheels = config.numberOfWheels;
            this.numberOfDoors  = config.numberOfDoors;
        }else {
            // Arguments instantiation
            this.numberOfWheels = args[0];
            this.numberOfDoors  = args[1];
        }

    };


    var itemIdentifier = 'tesla';

    beforeEach(function(){
        Car.container = new Container(Car);
        console.log()
    });

    it('should remove an item with a given identifier',function(){
        // Set it ourselves to avoid double testing add here.
        Car.container.storage[itemIdentifier] = {};
        Car.container.remove(itemIdentifier);
        expect(Car.container.storage[itemIdentifier]).not.toBeDefined();
    });

    it('should retrieve an item with a given identifier',function(){
        // Set it ourselves to avoid double testing add here.
        Car.container.storage[itemIdentifier] = {
            numberOfWheels : 4
        };
        expect(Car.container.get(itemIdentifier).numberOfWheels).toEqual(4);
    });

    it('should know if it has an item with a given identifier',function(){
        // Set it ourselves to avoid double testing add here.
        Car.container.storage[itemIdentifier] = {};
        expect(Car.container.has(itemIdentifier)).toBe(true);
    });


    describe('add',function(){

        describe('instantiation',function(){

            describe('multiple arguments',function(){

                beforeEach(function(){
                    Car.container.defaults = [3,2];
                });

                it('should use defaults',function(){
                    Car.container.add(itemIdentifier);
                    // Retrieve it manually to avoid double testing.
                    var storedItem = Car.container.storage[itemIdentifier];
                    expect(storedItem.numberOfWheels == Car.container.defaults[0] && storedItem.numberOfDoors == Car.container.defaults[1]).toBe(true);
                });

                it('should return the added instance',function(){
                    var instance = Car.container.add(itemIdentifier);
                    expect(instance instanceof Car).toBe(true);
                });

                it('should be able to override defaults',function(){
                    Car.container.add(itemIdentifier,20,10);
                    // Retrieve it manually to avoid double testing.
                    var storedItem = Car.container.storage[itemIdentifier];
                    expect(storedItem.numberOfWheels == 20 && storedItem.numberOfDoors == 10).toBe(true);
                });

                it('should be able to use both defaults and individual arguments',function(){
                    Car.container.add(itemIdentifier,undefined,99);
                    // Retrieve it manually to avoid double testing.
                    var storedItem = Car.container.storage[itemIdentifier];
                    expect(storedItem.numberOfWheels == Car.container.defaults[0] && storedItem.numberOfDoors == 99).toBe(true);
                });

            });

            describe('single configuration object',function(){

                beforeEach(function(){
                    Car.container.defaults = {
                        numberOfWheels : 6,
                        numberOfDoors : 8
                    };
                });

                it('should use defaults',function(){
                    Car.container.add(itemIdentifier);
                    // Retrieve it manually to avoid double testing.
                    var storedItem = Car.container.storage[itemIdentifier];
                    expect(storedItem.numberOfWheels == Car.container.defaults.numberOfWheels && storedItem.numberOfDoors == Car.container.defaults.numberOfDoors).toBe(true);
                });

                it('should return the added instance',function(){
                    var instance = Car.container.add(itemIdentifier);
                    expect(instance instanceof Car).toBe(true);
                });

                it('should be able to override defaults',function(){

                    var overrideConfig = {
                        numberOfWheels : 22,
                        numberOfDoors : 82
                    };

                    Car.container.add(itemIdentifier,overrideConfig);

                    // Retrieve it manually to avoid double testing.
                    var storedItem = Car.container.storage[itemIdentifier];
                    expect(storedItem.numberOfWheels == overrideConfig.numberOfWheels && storedItem.numberOfDoors == overrideConfig.numberOfDoors).toBe(true);

                });

                it('should be able to use both defaults and individual configuration attributes',function(){

                    var overrideConfig = {
                        numberOfWheels : 46
                    };

                    Car.container.add(itemIdentifier,overrideConfig);

                    // Retrieve it manually to avoid double testing.
                    var storedItem = Car.container.storage[itemIdentifier];
                    expect(storedItem.numberOfWheels == overrideConfig.numberOfWheels && storedItem.numberOfDoors == Car.container.defaults.numberOfDoors).toBe(true);
                });
            });
        });

    });


});