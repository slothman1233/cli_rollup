(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(global = global || self, factory(global.videojs = {}));
}(this, function (exports) { 'use strict';

	var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function unwrapExports (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x.default : x;
	}

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var _global = createCommonjsModule(function (module) {
	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self
	  // eslint-disable-next-line no-new-func
	  : Function('return this')();
	if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef
	});

	var _core = createCommonjsModule(function (module) {
	var core = module.exports = { version: '2.6.1' };
	if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef
	});
	var _core_1 = _core.version;

	var _aFunction = function (it) {
	  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
	  return it;
	};

	// optional / simple context binding

	var _ctx = function (fn, that, length) {
	  _aFunction(fn);
	  if (that === undefined) return fn;
	  switch (length) {
	    case 1: return function (a) {
	      return fn.call(that, a);
	    };
	    case 2: return function (a, b) {
	      return fn.call(that, a, b);
	    };
	    case 3: return function (a, b, c) {
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function (/* ...args */) {
	    return fn.apply(that, arguments);
	  };
	};

	var _isObject = function (it) {
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

	var _anObject = function (it) {
	  if (!_isObject(it)) throw TypeError(it + ' is not an object!');
	  return it;
	};

	var _fails = function (exec) {
	  try {
	    return !!exec();
	  } catch (e) {
	    return true;
	  }
	};

	// Thank's IE8 for his funny defineProperty
	var _descriptors = !_fails(function () {
	  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
	});

	var document$1 = _global.document;
	// typeof document.createElement is 'object' in old IE
	var is = _isObject(document$1) && _isObject(document$1.createElement);
	var _domCreate = function (it) {
	  return is ? document$1.createElement(it) : {};
	};

	var _ie8DomDefine = !_descriptors && !_fails(function () {
	  return Object.defineProperty(_domCreate('div'), 'a', { get: function () { return 7; } }).a != 7;
	});

	// 7.1.1 ToPrimitive(input [, PreferredType])

	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	var _toPrimitive = function (it, S) {
	  if (!_isObject(it)) return it;
	  var fn, val;
	  if (S && typeof (fn = it.toString) == 'function' && !_isObject(val = fn.call(it))) return val;
	  if (typeof (fn = it.valueOf) == 'function' && !_isObject(val = fn.call(it))) return val;
	  if (!S && typeof (fn = it.toString) == 'function' && !_isObject(val = fn.call(it))) return val;
	  throw TypeError("Can't convert object to primitive value");
	};

	var dP = Object.defineProperty;

	var f = _descriptors ? Object.defineProperty : function defineProperty(O, P, Attributes) {
	  _anObject(O);
	  P = _toPrimitive(P, true);
	  _anObject(Attributes);
	  if (_ie8DomDefine) try {
	    return dP(O, P, Attributes);
	  } catch (e) { /* empty */ }
	  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
	  if ('value' in Attributes) O[P] = Attributes.value;
	  return O;
	};

	var _objectDp = {
		f: f
	};

	var _propertyDesc = function (bitmap, value) {
	  return {
	    enumerable: !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable: !(bitmap & 4),
	    value: value
	  };
	};

	var _hide = _descriptors ? function (object, key, value) {
	  return _objectDp.f(object, key, _propertyDesc(1, value));
	} : function (object, key, value) {
	  object[key] = value;
	  return object;
	};

	var hasOwnProperty = {}.hasOwnProperty;
	var _has = function (it, key) {
	  return hasOwnProperty.call(it, key);
	};

	var PROTOTYPE = 'prototype';

	var $export = function (type, name, source) {
	  var IS_FORCED = type & $export.F;
	  var IS_GLOBAL = type & $export.G;
	  var IS_STATIC = type & $export.S;
	  var IS_PROTO = type & $export.P;
	  var IS_BIND = type & $export.B;
	  var IS_WRAP = type & $export.W;
	  var exports = IS_GLOBAL ? _core : _core[name] || (_core[name] = {});
	  var expProto = exports[PROTOTYPE];
	  var target = IS_GLOBAL ? _global : IS_STATIC ? _global[name] : (_global[name] || {})[PROTOTYPE];
	  var key, own, out;
	  if (IS_GLOBAL) source = name;
	  for (key in source) {
	    // contains in native
	    own = !IS_FORCED && target && target[key] !== undefined;
	    if (own && _has(exports, key)) continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
	    // bind timers to global for call from export context
	    : IS_BIND && own ? _ctx(out, _global)
	    // wrap global constructors for prevent change them in library
	    : IS_WRAP && target[key] == out ? (function (C) {
	      var F = function (a, b, c) {
	        if (this instanceof C) {
	          switch (arguments.length) {
	            case 0: return new C();
	            case 1: return new C(a);
	            case 2: return new C(a, b);
	          } return new C(a, b, c);
	        } return C.apply(this, arguments);
	      };
	      F[PROTOTYPE] = C[PROTOTYPE];
	      return F;
	    // make static versions for prototype methods
	    })(out) : IS_PROTO && typeof out == 'function' ? _ctx(Function.call, out) : out;
	    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
	    if (IS_PROTO) {
	      (exports.virtual || (exports.virtual = {}))[key] = out;
	      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
	      if (type & $export.R && expProto && !expProto[key]) _hide(expProto, key, out);
	    }
	  }
	};
	// type bitmap
	$export.F = 1;   // forced
	$export.G = 2;   // global
	$export.S = 4;   // static
	$export.P = 8;   // proto
	$export.B = 16;  // bind
	$export.W = 32;  // wrap
	$export.U = 64;  // safe
	$export.R = 128; // real proto method for `library`
	var _export = $export;

	var toString = {}.toString;

	var _cof = function (it) {
	  return toString.call(it).slice(8, -1);
	};

	// fallback for non-array-like ES3 and non-enumerable old V8 strings

	// eslint-disable-next-line no-prototype-builtins
	var _iobject = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
	  return _cof(it) == 'String' ? it.split('') : Object(it);
	};

	// 7.2.1 RequireObjectCoercible(argument)
	var _defined = function (it) {
	  if (it == undefined) throw TypeError("Can't call method on  " + it);
	  return it;
	};

	// to indexed object, toObject with fallback for non-array-like ES3 strings


	var _toIobject = function (it) {
	  return _iobject(_defined(it));
	};

	// 7.1.4 ToInteger
	var ceil = Math.ceil;
	var floor = Math.floor;
	var _toInteger = function (it) {
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

	// 7.1.15 ToLength

	var min = Math.min;
	var _toLength = function (it) {
	  return it > 0 ? min(_toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

	var max = Math.max;
	var min$1 = Math.min;
	var _toAbsoluteIndex = function (index, length) {
	  index = _toInteger(index);
	  return index < 0 ? max(index + length, 0) : min$1(index, length);
	};

	// false -> Array#indexOf
	// true  -> Array#includes



	var _arrayIncludes = function (IS_INCLUDES) {
	  return function ($this, el, fromIndex) {
	    var O = _toIobject($this);
	    var length = _toLength(O.length);
	    var index = _toAbsoluteIndex(fromIndex, length);
	    var value;
	    // Array#includes uses SameValueZero equality algorithm
	    // eslint-disable-next-line no-self-compare
	    if (IS_INCLUDES && el != el) while (length > index) {
	      value = O[index++];
	      // eslint-disable-next-line no-self-compare
	      if (value != value) return true;
	    // Array#indexOf ignores holes, Array#includes - not
	    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
	      if (O[index] === el) return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};

	var _library = true;

	var _shared = createCommonjsModule(function (module) {
	var SHARED = '__core-js_shared__';
	var store = _global[SHARED] || (_global[SHARED] = {});

	(module.exports = function (key, value) {
	  return store[key] || (store[key] = value !== undefined ? value : {});
	})('versions', []).push({
	  version: _core.version,
	  mode: _library ? 'pure' : 'global',
	  copyright: '© 2018 Denis Pushkarev (zloirock.ru)'
	});
	});

	var id = 0;
	var px = Math.random();
	var _uid = function (key) {
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

	var shared = _shared('keys');

	var _sharedKey = function (key) {
	  return shared[key] || (shared[key] = _uid(key));
	};

	var arrayIndexOf = _arrayIncludes(false);
	var IE_PROTO = _sharedKey('IE_PROTO');

	var _objectKeysInternal = function (object, names) {
	  var O = _toIobject(object);
	  var i = 0;
	  var result = [];
	  var key;
	  for (key in O) if (key != IE_PROTO) _has(O, key) && result.push(key);
	  // Don't enum bug & hidden keys
	  while (names.length > i) if (_has(O, key = names[i++])) {
	    ~arrayIndexOf(result, key) || result.push(key);
	  }
	  return result;
	};

	// IE 8- don't enum bug keys
	var _enumBugKeys = (
	  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
	).split(',');

	// 19.1.2.14 / 15.2.3.14 Object.keys(O)



	var _objectKeys = Object.keys || function keys(O) {
	  return _objectKeysInternal(O, _enumBugKeys);
	};

	var f$1 = Object.getOwnPropertySymbols;

	var _objectGops = {
		f: f$1
	};

	var f$2 = {}.propertyIsEnumerable;

	var _objectPie = {
		f: f$2
	};

	// 7.1.13 ToObject(argument)

	var _toObject = function (it) {
	  return Object(_defined(it));
	};

	// 19.1.2.1 Object.assign(target, source, ...)





	var $assign = Object.assign;

	// should work with symbols and should have deterministic property order (V8 bug)
	var _objectAssign = !$assign || _fails(function () {
	  var A = {};
	  var B = {};
	  // eslint-disable-next-line no-undef
	  var S = Symbol();
	  var K = 'abcdefghijklmnopqrst';
	  A[S] = 7;
	  K.split('').forEach(function (k) { B[k] = k; });
	  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
	}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
	  var T = _toObject(target);
	  var aLen = arguments.length;
	  var index = 1;
	  var getSymbols = _objectGops.f;
	  var isEnum = _objectPie.f;
	  while (aLen > index) {
	    var S = _iobject(arguments[index++]);
	    var keys = getSymbols ? _objectKeys(S).concat(getSymbols(S)) : _objectKeys(S);
	    var length = keys.length;
	    var j = 0;
	    var key;
	    while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
	  } return T;
	} : $assign;

	// 19.1.3.1 Object.assign(target, source)


	_export(_export.S + _export.F, 'Object', { assign: _objectAssign });

	var assign = _core.Object.assign;

	var assign$1 = createCommonjsModule(function (module) {
	module.exports = { "default": assign, __esModule: true };
	});

	var _Object$assign = unwrapExports(assign$1);

	var classCallCheck = createCommonjsModule(function (module, exports) {

	exports.__esModule = true;

	exports.default = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};
	});

	var _classCallCheck = unwrapExports(classCallCheck);

	var getSingle = function getSingle(fn) {
	    return function (name) {
	        fn.call(this, name);
	    };
	};
	var getName = function getName(name) {
	    console.log(name);
	};
	//# sourceMappingURL=index.js.map

	var E__work_gitlab_cli_cli_rollup_node_modules_fetchPolyfill2_dist = createCommonjsModule(function (module, exports) {
	(function webpackUniversalModuleDefinition(root, factory) {
		module.exports = factory();
	})(commonjsGlobal, function() {
	return /******/ (function(modules) { // webpackBootstrap
	/******/ 	// The module cache
	/******/ 	var installedModules = {};

	/******/ 	// The require function
	/******/ 	function __webpack_require__(moduleId) {

	/******/ 		// Check if module is in cache
	/******/ 		if(installedModules[moduleId])
	/******/ 			return installedModules[moduleId].exports;

	/******/ 		// Create a new module (and put it into the cache)
	/******/ 		var module = installedModules[moduleId] = {
	/******/ 			exports: {},
	/******/ 			id: moduleId,
	/******/ 			loaded: false
	/******/ 		};

	/******/ 		// Execute the module function
	/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

	/******/ 		// Flag the module as loaded
	/******/ 		module.loaded = true;

	/******/ 		// Return the exports of the module
	/******/ 		return module.exports;
	/******/ 	}


	/******/ 	// expose the modules object (__webpack_modules__)
	/******/ 	__webpack_require__.m = modules;

	/******/ 	// expose the module cache
	/******/ 	__webpack_require__.c = installedModules;

	/******/ 	// __webpack_public_path__
	/******/ 	__webpack_require__.p = "";

	/******/ 	// Load entry module and return exports
	/******/ 	return __webpack_require__(0);
	/******/ })
	/************************************************************************/
	/******/ ([
	/* 0 */
	/***/ function(module, exports, __webpack_require__) {

		var Request = __webpack_require__(1);
		var Response = __webpack_require__(5);
		var Headers = __webpack_require__(2);
		var Transport = __webpack_require__(6);

		if (![].forEach) {
		    Array.prototype.forEach = function (fn, scope) {
		        var i, len;
		        for (i = 0, len = this.length; i < len; ++i) {
		            if (i in this) {
		                fn.call(scope, this[i], i, this);
		            }
		        }
		    };
		}
		if (!'司徒正美'.trim) {
		    var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
		    String.prototype.trim = function () {
		        return this.replace(rtrim, '')
		    };
		}
		function headers(xhr) {
		    var head = new Headers();
		    if (xhr.getAllResponseHeaders) {
		        var headerStr = xhr.getAllResponseHeaders() || '';
		        if (/\S/.test(headerStr)) {
		            //http://www.w3.org/TR/XMLHttpRequest/#the-getallresponseheaders-method
		            var headerPairs = headerStr.split('\u000d\u000a');
		            for (var i = 0; i < headerPairs.length; i++) {
		                var headerPair = headerPairs[i];
		                // Can't use split() here because it does the wrong thing
		                // if the header value has the string ": " in it.
		                var index = headerPair.indexOf('\u003a\u0020');
		                if (index > 0) {
		                    var key = headerPair.substring(0, index).trim();
		                    var value = headerPair.substring(index + 2).trim();
		                    head.append(key, value);
		                }
		            }
		        }
		    }
		    return head
		}
		function fetch(input, init) {
		    return new Promise(function (resolve, reject) {
		        var request;
		        if (!init && (init instanceof Request)) {
		            request = input;
		        } else {
		            request = new Request(input, init);
		        }
		     

		        var xhr = new Transport(request);
		        function responseURL() {
		            if ('responseURL' in xhr) {
		                return xhr.responseURL
		            }
		            // Avoid security warnings on getResponseHeader when not allowed by CORS
		            if (xhr.getResponseHeader && /^X-Request-URL:/m.test(xhr.getAllResponseHeaders())) {
		                return xhr.getResponseHeader('X-Request-URL')
		            }

		            return
		        }

		        xhr.on('load', function (event) {
		            var options = {
		                status: event.status,
		                statusText: event.statusText,
		                headers: headers(event),
		                url: responseURL()
		            };
		            var body = 'response' in event ? event.response : event.responseText;
		            resolve(new Response(body, options));
		        });
		        xhr.on('error', function () {
		            reject(new TypeError('Network request failed'));
		        });
		        xhr.on('timeout', function () {
		            reject(new TypeError('Network request timeout'));
		        });

		        xhr.open(request.method, request.url, true);

		        request.headers.forEach(function (value, name) {
		            xhr.setRequestHeader(name, value);
		        });

		        xhr.send(typeof request._body === 'undefined' ? null : request._body);
		    })
		}
		function notFunc(a){
		  return  !/\scode\]\s+\}$/.test(a)
		}
		if (notFunc(window.fetch)) {
		    window.fetch = fetch;
		}
		if (typeof avalon === 'function') {
		    avalon.fetch = fetch;
		}
		module.exports = fetch;

	/***/ },
	/* 1 */
	/***/ function(module, exports, __webpack_require__) {

		var Headers = __webpack_require__(2);
		var Body = __webpack_require__(4);

		function Request(input, options) {
		    options = options || {};
		    var body = options.body;
		    if (input instanceof Request) {
		        if (input.bodyUsed) {
		            throw new TypeError('Already read')
		        }
		        this.url = input.url;
		        this.credentials = input.credentials;
		        if (!options.headers) {
		            var h = this.headers = new Headers(input.headers);
		            if(!h.map['x-requested-with']){
		                h.set('X-Requested-With', 'XMLHttpRequest');
		            }
		        }
		        this.method = input.method;
		        this.mode = input.mode;
		        if (!body) {
		            body = input._body;
		            input.bodyUsed = true;
		        }
		    } else {
		        this.url = input;
		    }

		    this.credentials = options.credentials || this.credentials || 'omit';
		    if (options.headers || !this.headers) {
		        this.headers = new Headers(options.headers);
		    }
		    this.method = (options.method || this.method || 'GET').toUpperCase();
		    this.mode = options.mode || this.mode || null;
		    this.referrer = null;

		    if ((this.method === 'GET' || this.method === 'HEAD') && body) {
		        throw new TypeError('Body not allowed for GET or HEAD requests')
		    }
		    this._initBody(body);
		}

		Request.prototype.clone = function () {
		    return new Request(this)
		};

		var F = function(){}; 
		F.prototype = Body.prototype; 
		Request.prototype = new F(); 

		module.exports = Request;

	/***/ },
	/* 2 */
	/***/ function(module, exports, __webpack_require__) {

		var support = __webpack_require__(3);

		function Headers(headers) {
		    this.map = {};
		    if (headers instanceof Headers) {
		        headers.forEach(function (value, name) {
		            this.append(name, value);
		        }, this);

		    } else if (headers) {
		        for (var name in headers) {
		            if (headers.hasOwnProperty(name)) {
		                this.append(name, headers[name]);
		            }
		        }

		    }
		}

		Headers.prototype.append = function (name, value) {
		    name = normalizeName(name);
		    value = normalizeValue(value);
		    var list = this.map[name];
		    if (!list) {
		        list = [];
		        this.map[name] = list;
		    }
		    list.push(value);
		};

		Headers.prototype['delete'] = function (name) {
		    delete this.map[normalizeName(name)];
		};

		Headers.prototype.get = function (name) {
		    var values = this.map[normalizeName(name)];
		    return values ? values[0] : null
		};

		Headers.prototype.getAll = function (name) {
		    return this.map[normalizeName(name)] || []
		};

		Headers.prototype.has = function (name) {
		    return this.map.hasOwnProperty(normalizeName(name))
		};

		Headers.prototype.set = function (name, value) {
		    this.map[normalizeName(name)] = [normalizeValue(value)];
		};

		Headers.prototype.forEach = function (callback, thisArg) {
		    for (var name in this.map) {
		        if (this.map.hasOwnProperty(name)) {
		            this.map[name].forEach(function (value) {
		                callback.call(thisArg, value, name, this);
		            }, this);
		        }
		    }
		};

		Headers.prototype.keys = function () {
		    var items = [];
		    this.forEach(function (value, name) {
		        items.push(name);
		    });
		    return iteratorFor(items)
		};

		Headers.prototype.values = function () {
		    var items = [];
		    this.forEach(function (value) {
		        items.push(value);
		    });
		    return iteratorFor(items)
		};

		Headers.prototype.entries = function () {
		    var items = [];
		    this.forEach(function (value, name) {
		        items.push([name, value]);
		    });
		    return iteratorFor(items)
		};

		  if (support.iterable) {
		    Headers.prototype[Symbol.iterator] = Headers.prototype.entries;
		  }

		function normalizeName(name) {
		    if (typeof name !== 'string') {
		        name = String(name);
		    }
		    if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
		        throw new TypeError('Invalid character in header field name')
		    }
		    return name.toLowerCase()
		}

		function normalizeValue(value) {
		    if (typeof value !== 'string') {
		        value = String(value);
		    }
		    return value
		}

		module.exports = Headers;

	/***/ },
	/* 3 */
	/***/ function(module, exports) {

		module.exports = {
		    searchParams: 'URLSearchParams' in window,
		    iterable: 'Symbol' in window && 'iterator' in window,
		    blob: 'FileReader' in window && 'Blob' in window && (function () {
		        try {
		            new Blob();
		            return true
		        } catch (e) {
		            return false
		        }
		    })(),
		    formData: 'FormData' in window,
		    arrayBuffer: 'ArrayBuffer' in window
		};


	/***/ },
	/* 4 */
	/***/ function(module, exports, __webpack_require__) {

		var support = __webpack_require__(3);

		function Body() {
		    this.bodyUsed = false;
		}
		var p = Body.prototype;

		'text,blob,formData,json,arrayBuffer'.replace(/\w+/g, function (method) {
		    p[method] = function () {
		        return consumeBody(this).then(function (body) {
		            return convertBody(body, method)
		        })
		    };
		});

		p._initBody = function (body) {
		    this._body = body;
		    if (!this.headers.get('content-type')) {
		        var a = bodyType(body);
		        switch (a) {
		            case 'text':
		                this.headers.set('content-type', 'text/plain;charset=UTF-8');
		                break
		            case 'blob':
		                if (body && body.type) {
		                    this.headers.set('content-type', body.type);
		                }
		                break
		            case 'searchParams':
		                this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
		                break
		        }
		    }
		};

		function consumeBody(body) {
		    if (body.bodyUsed) {
		        return Promise.reject(new TypeError('Already read'))
		    } else {
		        body.bodyUsed = true;
		        return Promise.resolve(body._body)
		    }
		}

		function convertBody(body, to) {
		    var from = bodyType(body);
		    if (body === null || body === void 0 || !from || from === to) {
		        return Promise.resolve(body)
		    } else if (map[to] && map[to][from]) {
		        return map[to][from](body)
		    } else {
		        return Promise.reject(new Error('Convertion from ' + from + ' to ' + to + ' not supported'))
		    }
		}


		var map = {
		    text: {
		        json: function (body) {//json --> text
		            return Promise.resolve(JSON.stringify(body))
		        },
		        blob: function (body) {//blob --> text
		            return blob2text(body)
		        },
		        searchParams: function (body) {//searchParams --> text
		            return Promise.resolve(body.toString())
		        }
		    },
		    json: {
		        text: function (body) {//text --> json
		            return Promise.resolve(parseJSON(body))
		        },
		        blob: function (body) {//blob --> json
		            return blob2text(body).then(parseJSON)
		        }
		    },
		    formData: {
		        text: function (body) {//text --> formData
		            return text2formData(body)
		        }
		    },
		    blob: {
		        text: function (body) {//json --> blob
		            return Promise.resolve(new Blob([body]))
		        },
		        json: function (body) {//json --> blob
		            return Promise.resolve(new Blob([JSON.stringify(body)]))
		        }
		    },
		    arrayBuffer: {
		        blob: function (body) {
		            return blob2ArrayBuffer(body)
		        }
		    }
		};

		function bodyType(body) {
		    if (typeof body === 'string') {
		        return 'text'
		    } else if (support.blob && (body instanceof Blob)) {
		        return 'blob'
		    } else if (support.formData && (body instanceof FormData)) {
		        return 'formData'
		    } else if (support.searchParams && (body instanceof URLSearchParams)) {
		        return 'searchParams'
		    } else if (body && typeof body === 'object') {
		        return 'json'
		    } else {
		        return null
		    }
		}


		function reader2Promise(reader) {
		    return new Promise(function (resolve, reject) {
		        reader.onload = function () {
		            resolve(reader.result);
		        };
		        reader.onerror = function () {
		            reject(reader.error);
		        };
		    })
		}
		/*
		 readAsBinaryString(File|Blob)
		 readAsText(File|Blob [, encoding])
		 readAsDataURL(File|Blob)
		 readAsArrayBuffer(File|Blob)
		 */
		function text2formData(body) {
		    var form = new FormData();
		    body.trim().split('&').forEach(function (bytes) {
		        if (bytes) {
		            var split = bytes.split('=');
		            var name = split.shift().replace(/\+/g, ' ');
		            var value = split.join('=').replace(/\+/g, ' ');
		            form.append(decodeURIComponent(name), decodeURIComponent(value));
		        }
		    });
		    return Promise.resolve(form)
		}

		function blob2ArrayBuffer(blob) {
		    var reader = new FileReader();
		    reader.readAsArrayBuffer(blob);
		    return reader2Promise(reader)
		}

		function blob2text(blob) {
		    var reader = new FileReader();
		    reader.readAsText(blob);
		    return reader2Promise(reader)
		}


		function parseJSON(body) {
		    try {
		        return JSON.parse(body)
		    } catch (ex) {
		        throw 'Invalid JSON'
		    }
		}

		module.exports = Body;

	/***/ },
	/* 5 */
	/***/ function(module, exports, __webpack_require__) {

		var Headers = __webpack_require__(2);
		var Body = __webpack_require__(4);

		function Response(bodyInit, options) {
		    if (!options) {
		        options = {};
		    }

		    this.type = 'default';

		    this.status = options.status;
		    if (1223 === this.status) {
		        this.status = 204;
		    }
		    this.ok = this.status >= 200 && this.status < 300;
		    this.statusText = options.statusText;
		    this.headers = options.headers instanceof Headers ? options.headers : new Headers(options.headers);
		    this.url = options.url || '';
		    this._initBody(bodyInit);
		}

		var F = function(){}; 
		F.prototype = Body.prototype; 
		Response.prototype = new F(); 

		Response.prototype.clone = function () {
		    return new Response(this._bodyInit, {
		        status: this.status,
		        statusText: this.statusText,
		        headers: new Headers(this.headers),
		        url: this.url
		    })
		};

		Response.error = function () {
		    var response = new Response(null, {status: 0, statusText: ''});
		    response.type = 'error';
		    return response
		};

		var redirectStatuses = [301, 302, 303, 307, 308];

		Response.redirect = function (url, status) {
		    if (redirectStatuses.indexOf(status) === -1) {
		        throw new RangeError('Invalid status code')
		    }

		    return new Response(null, {status: status, headers: {location: url}})
		};

		module.exports = Response;

	/***/ },
	/* 6 */
	/***/ function(module, exports, __webpack_require__) {

		var AXO = __webpack_require__(7);
		var JSONP = __webpack_require__(8);
		var XDR = __webpack_require__(9);
		var XHR = __webpack_require__(10);
		var msie = 0;
		if (window.VBArray) {
		    msie = document.documentMode || (window.XMLHttpRequest ? 7 : 6);
		}

		function Transport(request) {
		    if (msie === 8 || msie === 9) {
		        this.core = new XDR(request);
		    } else if (!msie) {
		        this.core = new XHR(request);
		    } else if (msie <= 7) {
		        if (request.credentials === 'include') {
		            this.core = new JSONP(request);
		        } else {
		            this.core = new AXO(request);
		        }
		    }
		}

		var p = Transport.prototype;
		p.on = function (type, fn) {
		    this.core.on(type, fn);
		};

		p.setRequestHeader = function (a, b) {
		    if (this.core.setRequestHeader) {
		        this.core.setRequestHeader(a, b);
		    }
		};

		p.open = function (a, b, c, d, e) {
		    if (this.core.open) {
		        this.core.open(a, b, c, d, e);
		    }
		};

		p.send = function (a) {
		    if (this.core.send) {
		        this.core.send(a);
		    }
		};

		p.abort = function () {
		    if (this.core.abort) {
		        this.core.abort();
		    }
		};

		module.exports = Transport;

	/***/ },
	/* 7 */
	/***/ function(module, exports) {

		

		module.exports = function AXO(opts) {
		    var xhr = new ActiveXObject('Microsoft.XMLHTTP');
		    
		    xhr.onreadystatechange = function () {
		        if (xhr.readyState === 4) {
		            if (/^2\d\d|1224/.test(xhr.status)) {
		                events['load'] && events['load'](xhr);
		            } else {
		                events['error'] && events['error']();
		            }
		        }
		    };
		    var events = {};
		    xhr.on = function (type, fn) {
		        events[type] = fn;
		    };

		    xhr.abort = function () {
		        events = {};
		    };
		    if (opts.timeout === 'number') {
		        setTimeout(function () {
		            events['timeout'] && events['timeout']();
		            xhr.abort();
		        }, opts.timeout);
		    }
		    return xhr
		};

	/***/ },
	/* 8 */
	/***/ function(module, exports) {

		
		function JSONP(opts) {
		    var callbackFunction = opts.jsonpCallbackFunction || generateCallbackFunction();
		    var jsonpCallback = opts.jsonpCallback || 'callback';
		    var xhr = document.createElement('script');
		    if (xhr.charset) {
		        xhr.charset = opts.charset;
		    }
		    xhr.onerror = xhr[useOnload ? 'onload' : 'onreadystatechange'] = function (e) {
		        var execute = /loaded|complete|undefined/i.test(xhr.readyState);
		        if (e && e.type === 'error') {
		            events['error'] && events['error']();
		        } else if (execute) {
		            setTimeout(function () {
		                xhr.abort();
		            }, 0);
		        }
		    };

		    var events = {};
		    xhr.on = function (type, fn) {
		        events[type] = fn;
		    };
		    xhr.abort = function () {
		        events = {};
		        removeNode(xhr);
		        clearFunction(callbackFunction);
		    };
		    xhr.open = function (a, url) {
		        window[callbackFunction] = function (response) {
		            events['load'] && events['load']({
		                status: 200,
		                statusText: 'ok',
		                response: response
		            });
		            clearFunction(callbackFunction);
		        };
		        var head = document.getElementsTagName('head')[0];

		        url += (url.indexOf('?') === -1) ? '?' : '&';
		        xhr.setAttribute('src', url + jsonpCallback + '=' + callbackFunction);
		        head.insertBefore(xhr, head.firstChild);
		        if (typeof opts.timeout === 'number') {
		            setTimeout(function () {
		                events['timeout'] && events['timeout']();
		                xhr.abort();
		            }, opts.timeout);
		        }
		    };
		}


		function generateCallbackFunction() {
		    return ('jsonp' + Math.random()).replace(/0\./, '')
		}

		// Known issue: Will throw 'Uncaught ReferenceError: callback_*** is not defined' error if request timeout
		function clearFunction(functionName) {
		    // IE8 throws an exception when you try to delete a property on window
		    // http://stackoverflow.com/a/1824228/751089
		    try {
		        delete window[functionName];
		    } catch (e) {
		        window[functionName] = undefined;
		    }
		}

		var f = document.createDocumentFragment();
		var useOnload = 'textContent' in document;

		function removeNode(node) {
		    f.appendChild(node);
		    f.removeChild(node);
		    node.onload = onerror = onreadystatechange = function () {
		    };
		    return node
		}

		module.exports = JSONP;

	/***/ },
	/* 9 */
	/***/ function(module, exports) {

		//https://msdn.microsoft.com/en-us/library/cc288060(v=VS.85).aspx
		module.exports = function XDR(opts) {
		    var xhr = new XDomainRequest();
		    'load,error,timeout'.replace(/\w+/g, function (method) {
		        xhr['on' + method] = function () {
		            if (events[method]) {
		                events[method](xhr);
		            }
		        };
		    });
		    var events = {};
		    xhr.on = function (type, fn) {
		        events[type] = fn;
		    };
		    xhr.onabort = function () {
		        events = {};
		    };
		    if (typeof opts.timeout === 'number') {
		        xhr.timeout = opts.timeout;
		    }
		    return xhr
		};

	/***/ },
	/* 10 */
	/***/ function(module, exports) {

		
		module.exports = function XHR(opts) {
		    var xhr = new XMLHttpRequest;
		    'load,error,timeout'.replace(/\w+/g, function (method) {
		        xhr['on' + method] = function () {
		            if (events[method]) {
		                events[method](xhr);
		            }
		        };
		    });
		    var events = {};
		    xhr.on = function (type, fn) {
		        events[type] = fn;
		    };
		    xhr.onabort = function () {
		        events = {};
		    };
		    if (opts.credentials === 'include') {
		        xhr.withCredentials = true;
		    }

		    if ('responseType' in xhr && ('Blob' in window)) {
		        xhr.responseType = 'blob';
		    }
		    return xhr
		};

	/***/ }
	/******/ ])
	});
	});

	//现代浏览器的支持

	var get = function get(url) {
	    var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	    var result = fetch(url, params);
	    return result;
	};

	// import style from './style.css'
	var i = getSingle(getName);
	i("s");
	console.log(1);
	var mu = function mu() {
	    var result = get("http://pullhls60ff766a.live.126.net/live/63666a6da1db4ba1b2e9e05c838f5cdc/playlist.m3u8");
	    result.then(function (response) {
	        return response.text();
	    }).then(function (data) {
	        console.log(data);
	    });
	};

	var Person = function Person(name) {
	    _classCallCheck(this, Person);

	    this.name = name;
	};

	_Object$assign(Person.prototype, {
	    getName: function getName$$1() {
	        console.log(this.name);
	    },
	    setName: function setName(name) {
	        this.name = name;
	    }
	});
	console.log(Person.prototype);
	var pe = Person.prototype;
	//# sourceMappingURL=main.js.map

	exports.pe = pe;
	exports.mu = mu;

	Object.defineProperty(exports, '__esModule', { value: true });

}));
