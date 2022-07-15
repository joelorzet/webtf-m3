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
		this._handlerGroups = [];

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
			this._callHandlers();
		}
	}

	_internalResolve(data) {
		if (this._state === 'pending' && this._state !== 'rejected') {
			if (this._state === 'pending') {
				this._value = data;
			}
			this._state = 'fulfilled';
			this._callHandlers();
		}
	}

	then(successCb, errorCb) {
		if (typeof successCb !== 'function') successCb = false;

		if (typeof errorCb !== 'function') errorCb = false;

		const downstreamPromise = new $Promise(() => {});

		const handler = {
			successCb,
			errorCb,
			downstreamPromise,
		};

		this._handlerGroups.push(handler);

		if (this._state !== 'pending') {
			this._callHandlers();
		}

		return downstreamPromise;
	}

	catch(errorCb) {
		if (typeof errorCb !== 'function') {
			errorCb = false;
		}

		return this.then(null, errorCb);
	}

	_callHandlers() {
		while (this._handlerGroups.length) {
			const currentHandler = this._handlerGroups.shift();

			if (this._state === 'fulfilled') {
				if (!currentHandler.successCb) {
					currentHandler.downstreamPromise._internalResolve(this._value);
				} else {
					try {
						const result = currentHandler.successCb(this._value);

						if (result instanceof $Promise) {
							result.then(
								(val) => currentHandler.downstreamPromise._internalResolve(val),
								(err) => currentHandler.downstreamPromise._internalReject(err)
							);
						} else {
							currentHandler.downstreamPromise._internalResolve(result);
						}
					} catch (e) {
						currentHandler.downstreamPromise._internalReject(e);
					}
				}
				currentHandler.successCb && currentHandler.successCb(this._value);
			} else if (this._state === 'rejected') {
				if (!currentHandler.errorCb) {
					currentHandler.downstreamPromise._internalReject(this._value);
				} else {
					try {
						const result = currentHandler.errorCb(this._value);
						if (result instanceof $Promise) {
							result.then(
								(val) => currentHandler.downstreamPromise._internalResolve(val),
								(err) => currentHandler.downstreamPromise._internalReject(err)
							);
						} else {
							currentHandler.downstreamPromise._internalResolve(result);
						}
					} catch (e) {
						currentHandler.downstreamPromise._internalReject(e);
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
