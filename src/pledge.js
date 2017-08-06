'use strict';
/*----------------------------------------------------------------
Promises Workshop: build the pledge.js ES6-style promise library
----------------------------------------------------------------*/
// YOUR CODE HERE:
// var _state;
const $Promise = function(executor){
	this._handlerGroups = [];
	this._state = 'pending';
	// this._value = undefined;
	if (typeof executor !== 'function') {
		throw new TypeError('executor not a function');
	}
	executor(this._internalResolve.bind(this), this._internalReject.bind(this) );
};


$Promise.prototype._internalResolve = function(data) {
	if(this._state === 'pending'){
		this._state = 'fulfilled';
		this._value = data;
	}

};

$Promise.prototype._internalReject = function(reason) {
	if(this._state === 'pending'){
		this._state = 'rejected';
		this._value = reason;
	}
};

$Promise.prototype.then = function(resolve,reject){
	if (typeof resolve === 'function'  || typeof reject === 'function' ) {
		this._handlerGroups.push({successCb: resolve, errorCb: reject});
	} 

	else {
		this._handlerGroups.push({successCb: false, errorCb: false})
	}


	if (this._state === 'fulfilled'){
		var that = this;
				this._handlerGroups.forEach(function(group){
					group.successCb(that._value);
				})
	} 

	if (this._state === 'rejected'){
		var that = this;
				this._handlerGroups.forEach(function(group){
					group.errorCb(that._value);
				})	} 
			
}


$Promise.prototype._callHandlers = function(resolve,reject){

}


/*-------------------------------------------------------
The spec was designed to work with Test'Em, so we don't
actually use module.exports. But here it is for reference:

module.exports = $Promise;

So in a Node-based project we could write things like this:

var Promise = require('pledge');
…
var promise = new Promise(function (resolve, reject) { … });
--------------------------------------------------------*/
