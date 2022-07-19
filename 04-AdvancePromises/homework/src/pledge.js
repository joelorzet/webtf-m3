'use strict';
/*----------------------------------------------------------------
Promises Workshop: construye la libreria de ES6 promises, pledge.js
----------------------------------------------------------------*/
// // TU CÓDIGO AQUÍ:

const FULFILLED = 'fulfilled';
const PENDING = 'pending';
const REJECTED = 'rejected';

class $Promise {
	constructor(executor) {
		if (typeof executor !== 'function') throw new TypeError('executor needs to be a function');

		this._state = PENDING;
		this._value;
		this._handlerGroups = [];

		executor(
			(val) => this._internalResolve(val),
			(val) => this._internalReject(val)
		);
	}

	_internalReject(err) {
		if (this._state === PENDING) {
			this._value = err;
			this._state = REJECTED;
			this._callHandlers();
		}
	}

	_internalResolve(data) {
		if (this._state === PENDING) {
			this._value = data;
			this._state = FULFILLED;
			this._callHandlers();
		}
	}

	then(successCb, errorCb) {
		if (typeof successCb !== 'function') {
			successCb = false;
		}
		if (typeof errorCb !== 'function') {
			errorCb = false;
		}

		const downstreamPromise = new $Promise(() => {});

		const handler = {
			successCb,
			errorCb,
			downstreamPromise,
		};

		this._handlerGroups.push(handler);

		if (this._state !== PENDING) {
			this._callHandlers();
		}

		return downstreamPromise;
	}

	catch(errorCb) {
		return this.then(null, errorCb);
	}

	_callHandlers() {
		while (this._handlerGroups.length) {
			const cb = this._handlerGroups.shift();

			// FULFILLED
			if (this._state === 'fulfilled') {
				if (!cb.successCb) {
					cb.downstreamPromise._internalResolve(this._value);
				} else {
					try {
						const result = cb.successCb(this._value);

						if (result instanceof $Promise) {
							result.then(
								(value) => cb.downstreamPromise._internalResolve(value),
								(err) => cb.downstreamPromise._internalReject(err)
							);
						} else {
							cb.downstreamPromise._internalResolve(this._value);
						}
					} catch (e) {
						cb.downstreamPromise._internalReject(e);
					}
				}
			} else if (this._state === 'rejected') {
				if (!cb.errorCb) {
					cb.downstreamPromise._internalReject(this._value);
				} else {
					try {
						const result = cb.errorCb(this._value);
						if (result instanceof $Promise) {
							result.then(
								(value) => cb.downstreamPromise._internalResolve(value),
								(err) => cb.downstreamPromise._internalReject(err)
							);
						} else {
							cb.downstreamPromise._internalResolve(this._value);
						}
					} catch (e) {
						cb.downstreamPromise._internalReject(e);
					}
				}
			}
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
