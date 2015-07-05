/**
 * @author Joel Hernandez
 *
 * Container.js
 *
 * A dead-simple container extension for any npm module.
 *
 * @module container.js
 */

var _ = require('underscore');

/**
 * Container
 * An instance container.
 *
 * @class
 */
var Container = function(Constructor){
    this.storage = {};
    this.Constructor = Constructor;
};

/**
 * Constructs an item with the given arguments.
 *
 * @param constructor
 * @param args
 * @returns {F}
 */
Container.prototype._construct = function(constructor, args) {
    function F() {
        return constructor.apply(this, args);
    }
    F.prototype = constructor.prototype;
    return new F();
};

/**
 * Retrieves a instance by identifier.
 *
 * @param identifier
 * @returns {*}
 */
Container.prototype.get = function(identifier){
    return this.storage[identifier];
};

/**
 * Extends an array in the way underscore library extends an object.
 *
 * @private
 */
Container.prototype._extendArray = function(){
    var args = _.toArray(arguments);
    var destination = args.shift();
    for(var i = 0 ; i < args.length ; i++){
        var source = args[i];
        for(var j = 0; j < source.length ; j++){
            var item = source[j];
            if(typeof item !== 'undefined'){
                destination[j] = item;
            }
        }
    }
};

/**
 * Merges the given arguments with the default ones.
 *
 * @param args
 * @returns {Array}
 * @private
 */
Container.prototype._mergeArgumentsWithDefaults = function(args){
    var mergedArguments = [];

    if(_.isArray(this.defaults)){
        // Set the default and then the individual attributes.
        this._extendArray(mergedArguments,this.defaults,args);
    }else if(_.isObject(this.defaults)){
        // Verify that we have not been given more than 1 arguments.
        if(args.length > 1){
            throw new Error('If the defaults attribute was set to an object, the given object instantiation argument must be a single object.');
        }
        // Get the single instantiation argument.
        args = args[0] || {};
        // Verify that it is indeed an object.
        if(!_.isObject(args)){
            throw new Error('If the defaults attribute was set to an object, the given single object instantiation argument must be an object.');
        }
        var mergedArgument = {};
        // Set the default and then the individual attributes.
        _.extend(mergedArgument,this.defaults,args);

        mergedArguments.push(mergedArgument);
    }

    return mergedArguments;

};

/**
 * Adds an instance with the given identifier instantiated with the default and given arguments merged.
 *
 *
 * @param identifier
 * @param {...} arguments - The arguments with which call the previously defined constructor.
 */
Container.prototype.add = function(){
    // Convert from object to array.
    var args = _.toArray(arguments);

    // Remove the identifier from the arguments.
    var identifier = args.shift();

    if(!_.isUndefined(this.defaults)){
        // Merge with the default arguments.
        args = this._mergeArgumentsWithDefaults(args);
    }

    var instance = this._construct(this.Constructor,args);
    this.storage[identifier] = instance;

    return instance;
};

/**
 * Removes a instance by identifier.
 *
 * @param identifier
 */
Container.prototype.remove = function(identifier){
    delete this.storage[identifier];
};

/**
 * Checks whether the container contains a instance with the given identifier.
 *
 * @param identifier
 * @returns {boolean}
 */
Container.prototype.has = function(identifier){
    return !! this.storage[identifier];
};

Container.prototype.constructor = Container;

module.exports = Container;