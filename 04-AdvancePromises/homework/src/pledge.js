'use strict';
/*----------------------------------------------------------------
Promises Workshop: construye la libreria de ES6 promises, pledge.js
----------------------------------------------------------------*/
// // TU CÓDIGO AQUÍ:

class $Promise {
	constructor(executor) {
		if (typeof executor !== 'function') throw new TypeError('executor needs to be a function');

		this._state = 'pending';
		this._value;

		executor(
			(val) => this._internalResolve(val),
			(val) => this._internalReject(val)
		);
	}

	_internalReject(err) {
		if (this._state === 'pending' && this._state !== 'fulfilled') {
			if (this._state === 'pending') {
				this._value = err;
			}
			this._state = 'rejected';
		}
	}

	_internalResolve(data) {
		if (this._state === 'pending' && this._state !== 'rejected') {
			if (this._state === 'pending') {
				this._value = data;
			}
			this._state = 'fulfilled';
		}
	}
}

module.exports = $Promise;
/*-------------------------------------------------------
El spec fue diseñado para funcionar con Test'Em, por lo tanto no necesitamos
realmente usar module.exports. Pero aquí está para referencia:

module.exports = $Promise;

Entonces en proyectos Node podemos esribir cosas como estas:

var Promise = require('pledge');
…
var promise = new Promise(function (resolve, reject) { … });
--------------------------------------------------------*/
