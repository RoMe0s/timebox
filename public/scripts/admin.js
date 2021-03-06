(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/get-iterator"), __esModule: true };
},{"core-js/library/fn/get-iterator":7}],2:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/json/stringify"), __esModule: true };
},{"core-js/library/fn/json/stringify":8}],3:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/values"), __esModule: true };
},{"core-js/library/fn/object/values":9}],4:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/symbol"), __esModule: true };
},{"core-js/library/fn/symbol":10}],5:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/symbol/iterator"), __esModule: true };
},{"core-js/library/fn/symbol/iterator":11}],6:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _iterator = require("../core-js/symbol/iterator");

var _iterator2 = _interopRequireDefault(_iterator);

var _symbol = require("../core-js/symbol");

var _symbol2 = _interopRequireDefault(_symbol);

var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
} : function (obj) {
  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
};
},{"../core-js/symbol":4,"../core-js/symbol/iterator":5}],7:[function(require,module,exports){
require('../modules/web.dom.iterable');
require('../modules/es6.string.iterator');
module.exports = require('../modules/core.get-iterator');
},{"../modules/core.get-iterator":71,"../modules/es6.string.iterator":74,"../modules/web.dom.iterable":79}],8:[function(require,module,exports){
var core  = require('../../modules/_core')
  , $JSON = core.JSON || (core.JSON = {stringify: JSON.stringify});
module.exports = function stringify(it){ // eslint-disable-line no-unused-vars
  return $JSON.stringify.apply($JSON, arguments);
};
},{"../../modules/_core":18}],9:[function(require,module,exports){
require('../../modules/es7.object.values');
module.exports = require('../../modules/_core').Object.values;
},{"../../modules/_core":18,"../../modules/es7.object.values":76}],10:[function(require,module,exports){
require('../../modules/es6.symbol');
require('../../modules/es6.object.to-string');
require('../../modules/es7.symbol.async-iterator');
require('../../modules/es7.symbol.observable');
module.exports = require('../../modules/_core').Symbol;
},{"../../modules/_core":18,"../../modules/es6.object.to-string":73,"../../modules/es6.symbol":75,"../../modules/es7.symbol.async-iterator":77,"../../modules/es7.symbol.observable":78}],11:[function(require,module,exports){
require('../../modules/es6.string.iterator');
require('../../modules/web.dom.iterable');
module.exports = require('../../modules/_wks-ext').f('iterator');
},{"../../modules/_wks-ext":68,"../../modules/es6.string.iterator":74,"../../modules/web.dom.iterable":79}],12:[function(require,module,exports){
module.exports = function(it){
  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
  return it;
};
},{}],13:[function(require,module,exports){
module.exports = function(){ /* empty */ };
},{}],14:[function(require,module,exports){
var isObject = require('./_is-object');
module.exports = function(it){
  if(!isObject(it))throw TypeError(it + ' is not an object!');
  return it;
};
},{"./_is-object":34}],15:[function(require,module,exports){
// false -> Array#indexOf
// true  -> Array#includes
var toIObject = require('./_to-iobject')
  , toLength  = require('./_to-length')
  , toIndex   = require('./_to-index');
module.exports = function(IS_INCLUDES){
  return function($this, el, fromIndex){
    var O      = toIObject($this)
      , length = toLength(O.length)
      , index  = toIndex(fromIndex, length)
      , value;
    // Array#includes uses SameValueZero equality algorithm
    if(IS_INCLUDES && el != el)while(length > index){
      value = O[index++];
      if(value != value)return true;
    // Array#toIndex ignores holes, Array#includes - not
    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
      if(O[index] === el)return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};
},{"./_to-index":60,"./_to-iobject":62,"./_to-length":63}],16:[function(require,module,exports){
// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = require('./_cof')
  , TAG = require('./_wks')('toStringTag')
  // ES3 wrong here
  , ARG = cof(function(){ return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function(it, key){
  try {
    return it[key];
  } catch(e){ /* empty */ }
};

module.exports = function(it){
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};
},{"./_cof":17,"./_wks":69}],17:[function(require,module,exports){
var toString = {}.toString;

module.exports = function(it){
  return toString.call(it).slice(8, -1);
};
},{}],18:[function(require,module,exports){
var core = module.exports = {version: '2.4.0'};
if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef
},{}],19:[function(require,module,exports){
// optional / simple context binding
var aFunction = require('./_a-function');
module.exports = function(fn, that, length){
  aFunction(fn);
  if(that === undefined)return fn;
  switch(length){
    case 1: return function(a){
      return fn.call(that, a);
    };
    case 2: return function(a, b){
      return fn.call(that, a, b);
    };
    case 3: return function(a, b, c){
      return fn.call(that, a, b, c);
    };
  }
  return function(/* ...args */){
    return fn.apply(that, arguments);
  };
};
},{"./_a-function":12}],20:[function(require,module,exports){
// 7.2.1 RequireObjectCoercible(argument)
module.exports = function(it){
  if(it == undefined)throw TypeError("Can't call method on  " + it);
  return it;
};
},{}],21:[function(require,module,exports){
// Thank's IE8 for his funny defineProperty
module.exports = !require('./_fails')(function(){
  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
});
},{"./_fails":26}],22:[function(require,module,exports){
var isObject = require('./_is-object')
  , document = require('./_global').document
  // in old IE typeof document.createElement is 'object'
  , is = isObject(document) && isObject(document.createElement);
module.exports = function(it){
  return is ? document.createElement(it) : {};
};
},{"./_global":27,"./_is-object":34}],23:[function(require,module,exports){
// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');
},{}],24:[function(require,module,exports){
// all enumerable object keys, includes symbols
var getKeys = require('./_object-keys')
  , gOPS    = require('./_object-gops')
  , pIE     = require('./_object-pie');
module.exports = function(it){
  var result     = getKeys(it)
    , getSymbols = gOPS.f;
  if(getSymbols){
    var symbols = getSymbols(it)
      , isEnum  = pIE.f
      , i       = 0
      , key;
    while(symbols.length > i)if(isEnum.call(it, key = symbols[i++]))result.push(key);
  } return result;
};
},{"./_object-gops":48,"./_object-keys":51,"./_object-pie":52}],25:[function(require,module,exports){
var global    = require('./_global')
  , core      = require('./_core')
  , ctx       = require('./_ctx')
  , hide      = require('./_hide')
  , PROTOTYPE = 'prototype';

var $export = function(type, name, source){
  var IS_FORCED = type & $export.F
    , IS_GLOBAL = type & $export.G
    , IS_STATIC = type & $export.S
    , IS_PROTO  = type & $export.P
    , IS_BIND   = type & $export.B
    , IS_WRAP   = type & $export.W
    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
    , expProto  = exports[PROTOTYPE]
    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
    , key, own, out;
  if(IS_GLOBAL)source = name;
  for(key in source){
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if(own && key in exports)continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function(C){
      var F = function(a, b, c){
        if(this instanceof C){
          switch(arguments.length){
            case 0: return new C;
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if(IS_PROTO){
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if(type & $export.R && expProto && !expProto[key])hide(expProto, key, out);
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
module.exports = $export;
},{"./_core":18,"./_ctx":19,"./_global":27,"./_hide":29}],26:[function(require,module,exports){
module.exports = function(exec){
  try {
    return !!exec();
  } catch(e){
    return true;
  }
};
},{}],27:[function(require,module,exports){
// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef
},{}],28:[function(require,module,exports){
var hasOwnProperty = {}.hasOwnProperty;
module.exports = function(it, key){
  return hasOwnProperty.call(it, key);
};
},{}],29:[function(require,module,exports){
var dP         = require('./_object-dp')
  , createDesc = require('./_property-desc');
module.exports = require('./_descriptors') ? function(object, key, value){
  return dP.f(object, key, createDesc(1, value));
} : function(object, key, value){
  object[key] = value;
  return object;
};
},{"./_descriptors":21,"./_object-dp":43,"./_property-desc":54}],30:[function(require,module,exports){
module.exports = require('./_global').document && document.documentElement;
},{"./_global":27}],31:[function(require,module,exports){
module.exports = !require('./_descriptors') && !require('./_fails')(function(){
  return Object.defineProperty(require('./_dom-create')('div'), 'a', {get: function(){ return 7; }}).a != 7;
});
},{"./_descriptors":21,"./_dom-create":22,"./_fails":26}],32:[function(require,module,exports){
// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = require('./_cof');
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
  return cof(it) == 'String' ? it.split('') : Object(it);
};
},{"./_cof":17}],33:[function(require,module,exports){
// 7.2.2 IsArray(argument)
var cof = require('./_cof');
module.exports = Array.isArray || function isArray(arg){
  return cof(arg) == 'Array';
};
},{"./_cof":17}],34:[function(require,module,exports){
module.exports = function(it){
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};
},{}],35:[function(require,module,exports){
'use strict';
var create         = require('./_object-create')
  , descriptor     = require('./_property-desc')
  , setToStringTag = require('./_set-to-string-tag')
  , IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
require('./_hide')(IteratorPrototype, require('./_wks')('iterator'), function(){ return this; });

module.exports = function(Constructor, NAME, next){
  Constructor.prototype = create(IteratorPrototype, {next: descriptor(1, next)});
  setToStringTag(Constructor, NAME + ' Iterator');
};
},{"./_hide":29,"./_object-create":42,"./_property-desc":54,"./_set-to-string-tag":56,"./_wks":69}],36:[function(require,module,exports){
'use strict';
var LIBRARY        = require('./_library')
  , $export        = require('./_export')
  , redefine       = require('./_redefine')
  , hide           = require('./_hide')
  , has            = require('./_has')
  , Iterators      = require('./_iterators')
  , $iterCreate    = require('./_iter-create')
  , setToStringTag = require('./_set-to-string-tag')
  , getPrototypeOf = require('./_object-gpo')
  , ITERATOR       = require('./_wks')('iterator')
  , BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
  , FF_ITERATOR    = '@@iterator'
  , KEYS           = 'keys'
  , VALUES         = 'values';

var returnThis = function(){ return this; };

module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
  $iterCreate(Constructor, NAME, next);
  var getMethod = function(kind){
    if(!BUGGY && kind in proto)return proto[kind];
    switch(kind){
      case KEYS: return function keys(){ return new Constructor(this, kind); };
      case VALUES: return function values(){ return new Constructor(this, kind); };
    } return function entries(){ return new Constructor(this, kind); };
  };
  var TAG        = NAME + ' Iterator'
    , DEF_VALUES = DEFAULT == VALUES
    , VALUES_BUG = false
    , proto      = Base.prototype
    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
    , $default   = $native || getMethod(DEFAULT)
    , $entries   = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined
    , $anyNative = NAME == 'Array' ? proto.entries || $native : $native
    , methods, key, IteratorPrototype;
  // Fix native
  if($anyNative){
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base));
    if(IteratorPrototype !== Object.prototype){
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if(!LIBRARY && !has(IteratorPrototype, ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if(DEF_VALUES && $native && $native.name !== VALUES){
    VALUES_BUG = true;
    $default = function values(){ return $native.call(this); };
  }
  // Define iterator
  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG]  = returnThis;
  if(DEFAULT){
    methods = {
      values:  DEF_VALUES ? $default : getMethod(VALUES),
      keys:    IS_SET     ? $default : getMethod(KEYS),
      entries: $entries
    };
    if(FORCED)for(key in methods){
      if(!(key in proto))redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};
},{"./_export":25,"./_has":28,"./_hide":29,"./_iter-create":35,"./_iterators":38,"./_library":40,"./_object-gpo":49,"./_redefine":55,"./_set-to-string-tag":56,"./_wks":69}],37:[function(require,module,exports){
module.exports = function(done, value){
  return {value: value, done: !!done};
};
},{}],38:[function(require,module,exports){
module.exports = {};
},{}],39:[function(require,module,exports){
var getKeys   = require('./_object-keys')
  , toIObject = require('./_to-iobject');
module.exports = function(object, el){
  var O      = toIObject(object)
    , keys   = getKeys(O)
    , length = keys.length
    , index  = 0
    , key;
  while(length > index)if(O[key = keys[index++]] === el)return key;
};
},{"./_object-keys":51,"./_to-iobject":62}],40:[function(require,module,exports){
module.exports = true;
},{}],41:[function(require,module,exports){
var META     = require('./_uid')('meta')
  , isObject = require('./_is-object')
  , has      = require('./_has')
  , setDesc  = require('./_object-dp').f
  , id       = 0;
var isExtensible = Object.isExtensible || function(){
  return true;
};
var FREEZE = !require('./_fails')(function(){
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function(it){
  setDesc(it, META, {value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  }});
};
var fastKey = function(it, create){
  // return primitive with prefix
  if(!isObject(it))return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if(!has(it, META)){
    // can't set metadata to uncaught frozen object
    if(!isExtensible(it))return 'F';
    // not necessary to add metadata
    if(!create)return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function(it, create){
  if(!has(it, META)){
    // can't set metadata to uncaught frozen object
    if(!isExtensible(it))return true;
    // not necessary to add metadata
    if(!create)return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function(it){
  if(FREEZE && meta.NEED && isExtensible(it) && !has(it, META))setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY:      META,
  NEED:     false,
  fastKey:  fastKey,
  getWeak:  getWeak,
  onFreeze: onFreeze
};
},{"./_fails":26,"./_has":28,"./_is-object":34,"./_object-dp":43,"./_uid":66}],42:[function(require,module,exports){
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject    = require('./_an-object')
  , dPs         = require('./_object-dps')
  , enumBugKeys = require('./_enum-bug-keys')
  , IE_PROTO    = require('./_shared-key')('IE_PROTO')
  , Empty       = function(){ /* empty */ }
  , PROTOTYPE   = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function(){
  // Thrash, waste and sodomy: IE GC bug
  var iframe = require('./_dom-create')('iframe')
    , i      = enumBugKeys.length
    , lt     = '<'
    , gt     = '>'
    , iframeDocument;
  iframe.style.display = 'none';
  require('./_html').appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while(i--)delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties){
  var result;
  if(O !== null){
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty;
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};

},{"./_an-object":14,"./_dom-create":22,"./_enum-bug-keys":23,"./_html":30,"./_object-dps":44,"./_shared-key":57}],43:[function(require,module,exports){
var anObject       = require('./_an-object')
  , IE8_DOM_DEFINE = require('./_ie8-dom-define')
  , toPrimitive    = require('./_to-primitive')
  , dP             = Object.defineProperty;

exports.f = require('./_descriptors') ? Object.defineProperty : function defineProperty(O, P, Attributes){
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if(IE8_DOM_DEFINE)try {
    return dP(O, P, Attributes);
  } catch(e){ /* empty */ }
  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
  if('value' in Attributes)O[P] = Attributes.value;
  return O;
};
},{"./_an-object":14,"./_descriptors":21,"./_ie8-dom-define":31,"./_to-primitive":65}],44:[function(require,module,exports){
var dP       = require('./_object-dp')
  , anObject = require('./_an-object')
  , getKeys  = require('./_object-keys');

module.exports = require('./_descriptors') ? Object.defineProperties : function defineProperties(O, Properties){
  anObject(O);
  var keys   = getKeys(Properties)
    , length = keys.length
    , i = 0
    , P;
  while(length > i)dP.f(O, P = keys[i++], Properties[P]);
  return O;
};
},{"./_an-object":14,"./_descriptors":21,"./_object-dp":43,"./_object-keys":51}],45:[function(require,module,exports){
var pIE            = require('./_object-pie')
  , createDesc     = require('./_property-desc')
  , toIObject      = require('./_to-iobject')
  , toPrimitive    = require('./_to-primitive')
  , has            = require('./_has')
  , IE8_DOM_DEFINE = require('./_ie8-dom-define')
  , gOPD           = Object.getOwnPropertyDescriptor;

exports.f = require('./_descriptors') ? gOPD : function getOwnPropertyDescriptor(O, P){
  O = toIObject(O);
  P = toPrimitive(P, true);
  if(IE8_DOM_DEFINE)try {
    return gOPD(O, P);
  } catch(e){ /* empty */ }
  if(has(O, P))return createDesc(!pIE.f.call(O, P), O[P]);
};
},{"./_descriptors":21,"./_has":28,"./_ie8-dom-define":31,"./_object-pie":52,"./_property-desc":54,"./_to-iobject":62,"./_to-primitive":65}],46:[function(require,module,exports){
// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = require('./_to-iobject')
  , gOPN      = require('./_object-gopn').f
  , toString  = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function(it){
  try {
    return gOPN(it);
  } catch(e){
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it){
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};

},{"./_object-gopn":47,"./_to-iobject":62}],47:[function(require,module,exports){
// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys      = require('./_object-keys-internal')
  , hiddenKeys = require('./_enum-bug-keys').concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O){
  return $keys(O, hiddenKeys);
};
},{"./_enum-bug-keys":23,"./_object-keys-internal":50}],48:[function(require,module,exports){
exports.f = Object.getOwnPropertySymbols;
},{}],49:[function(require,module,exports){
// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has         = require('./_has')
  , toObject    = require('./_to-object')
  , IE_PROTO    = require('./_shared-key')('IE_PROTO')
  , ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function(O){
  O = toObject(O);
  if(has(O, IE_PROTO))return O[IE_PROTO];
  if(typeof O.constructor == 'function' && O instanceof O.constructor){
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};
},{"./_has":28,"./_shared-key":57,"./_to-object":64}],50:[function(require,module,exports){
var has          = require('./_has')
  , toIObject    = require('./_to-iobject')
  , arrayIndexOf = require('./_array-includes')(false)
  , IE_PROTO     = require('./_shared-key')('IE_PROTO');

module.exports = function(object, names){
  var O      = toIObject(object)
    , i      = 0
    , result = []
    , key;
  for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while(names.length > i)if(has(O, key = names[i++])){
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};
},{"./_array-includes":15,"./_has":28,"./_shared-key":57,"./_to-iobject":62}],51:[function(require,module,exports){
// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys       = require('./_object-keys-internal')
  , enumBugKeys = require('./_enum-bug-keys');

module.exports = Object.keys || function keys(O){
  return $keys(O, enumBugKeys);
};
},{"./_enum-bug-keys":23,"./_object-keys-internal":50}],52:[function(require,module,exports){
exports.f = {}.propertyIsEnumerable;
},{}],53:[function(require,module,exports){
var getKeys   = require('./_object-keys')
  , toIObject = require('./_to-iobject')
  , isEnum    = require('./_object-pie').f;
module.exports = function(isEntries){
  return function(it){
    var O      = toIObject(it)
      , keys   = getKeys(O)
      , length = keys.length
      , i      = 0
      , result = []
      , key;
    while(length > i)if(isEnum.call(O, key = keys[i++])){
      result.push(isEntries ? [key, O[key]] : O[key]);
    } return result;
  };
};
},{"./_object-keys":51,"./_object-pie":52,"./_to-iobject":62}],54:[function(require,module,exports){
module.exports = function(bitmap, value){
  return {
    enumerable  : !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable    : !(bitmap & 4),
    value       : value
  };
};
},{}],55:[function(require,module,exports){
module.exports = require('./_hide');
},{"./_hide":29}],56:[function(require,module,exports){
var def = require('./_object-dp').f
  , has = require('./_has')
  , TAG = require('./_wks')('toStringTag');

module.exports = function(it, tag, stat){
  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
};
},{"./_has":28,"./_object-dp":43,"./_wks":69}],57:[function(require,module,exports){
var shared = require('./_shared')('keys')
  , uid    = require('./_uid');
module.exports = function(key){
  return shared[key] || (shared[key] = uid(key));
};
},{"./_shared":58,"./_uid":66}],58:[function(require,module,exports){
var global = require('./_global')
  , SHARED = '__core-js_shared__'
  , store  = global[SHARED] || (global[SHARED] = {});
module.exports = function(key){
  return store[key] || (store[key] = {});
};
},{"./_global":27}],59:[function(require,module,exports){
var toInteger = require('./_to-integer')
  , defined   = require('./_defined');
// true  -> String#at
// false -> String#codePointAt
module.exports = function(TO_STRING){
  return function(that, pos){
    var s = String(defined(that))
      , i = toInteger(pos)
      , l = s.length
      , a, b;
    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};
},{"./_defined":20,"./_to-integer":61}],60:[function(require,module,exports){
var toInteger = require('./_to-integer')
  , max       = Math.max
  , min       = Math.min;
module.exports = function(index, length){
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};
},{"./_to-integer":61}],61:[function(require,module,exports){
// 7.1.4 ToInteger
var ceil  = Math.ceil
  , floor = Math.floor;
module.exports = function(it){
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};
},{}],62:[function(require,module,exports){
// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = require('./_iobject')
  , defined = require('./_defined');
module.exports = function(it){
  return IObject(defined(it));
};
},{"./_defined":20,"./_iobject":32}],63:[function(require,module,exports){
// 7.1.15 ToLength
var toInteger = require('./_to-integer')
  , min       = Math.min;
module.exports = function(it){
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};
},{"./_to-integer":61}],64:[function(require,module,exports){
// 7.1.13 ToObject(argument)
var defined = require('./_defined');
module.exports = function(it){
  return Object(defined(it));
};
},{"./_defined":20}],65:[function(require,module,exports){
// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = require('./_is-object');
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function(it, S){
  if(!isObject(it))return it;
  var fn, val;
  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
  throw TypeError("Can't convert object to primitive value");
};
},{"./_is-object":34}],66:[function(require,module,exports){
var id = 0
  , px = Math.random();
module.exports = function(key){
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};
},{}],67:[function(require,module,exports){
var global         = require('./_global')
  , core           = require('./_core')
  , LIBRARY        = require('./_library')
  , wksExt         = require('./_wks-ext')
  , defineProperty = require('./_object-dp').f;
module.exports = function(name){
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if(name.charAt(0) != '_' && !(name in $Symbol))defineProperty($Symbol, name, {value: wksExt.f(name)});
};
},{"./_core":18,"./_global":27,"./_library":40,"./_object-dp":43,"./_wks-ext":68}],68:[function(require,module,exports){
exports.f = require('./_wks');
},{"./_wks":69}],69:[function(require,module,exports){
var store      = require('./_shared')('wks')
  , uid        = require('./_uid')
  , Symbol     = require('./_global').Symbol
  , USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function(name){
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;
},{"./_global":27,"./_shared":58,"./_uid":66}],70:[function(require,module,exports){
var classof   = require('./_classof')
  , ITERATOR  = require('./_wks')('iterator')
  , Iterators = require('./_iterators');
module.exports = require('./_core').getIteratorMethod = function(it){
  if(it != undefined)return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};
},{"./_classof":16,"./_core":18,"./_iterators":38,"./_wks":69}],71:[function(require,module,exports){
var anObject = require('./_an-object')
  , get      = require('./core.get-iterator-method');
module.exports = require('./_core').getIterator = function(it){
  var iterFn = get(it);
  if(typeof iterFn != 'function')throw TypeError(it + ' is not iterable!');
  return anObject(iterFn.call(it));
};
},{"./_an-object":14,"./_core":18,"./core.get-iterator-method":70}],72:[function(require,module,exports){
'use strict';
var addToUnscopables = require('./_add-to-unscopables')
  , step             = require('./_iter-step')
  , Iterators        = require('./_iterators')
  , toIObject        = require('./_to-iobject');

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = require('./_iter-define')(Array, 'Array', function(iterated, kind){
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function(){
  var O     = this._t
    , kind  = this._k
    , index = this._i++;
  if(!O || index >= O.length){
    this._t = undefined;
    return step(1);
  }
  if(kind == 'keys'  )return step(0, index);
  if(kind == 'values')return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');
},{"./_add-to-unscopables":13,"./_iter-define":36,"./_iter-step":37,"./_iterators":38,"./_to-iobject":62}],73:[function(require,module,exports){

},{}],74:[function(require,module,exports){
'use strict';
var $at  = require('./_string-at')(true);

// 21.1.3.27 String.prototype[@@iterator]()
require('./_iter-define')(String, 'String', function(iterated){
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function(){
  var O     = this._t
    , index = this._i
    , point;
  if(index >= O.length)return {value: undefined, done: true};
  point = $at(O, index);
  this._i += point.length;
  return {value: point, done: false};
});
},{"./_iter-define":36,"./_string-at":59}],75:[function(require,module,exports){
'use strict';
// ECMAScript 6 symbols shim
var global         = require('./_global')
  , has            = require('./_has')
  , DESCRIPTORS    = require('./_descriptors')
  , $export        = require('./_export')
  , redefine       = require('./_redefine')
  , META           = require('./_meta').KEY
  , $fails         = require('./_fails')
  , shared         = require('./_shared')
  , setToStringTag = require('./_set-to-string-tag')
  , uid            = require('./_uid')
  , wks            = require('./_wks')
  , wksExt         = require('./_wks-ext')
  , wksDefine      = require('./_wks-define')
  , keyOf          = require('./_keyof')
  , enumKeys       = require('./_enum-keys')
  , isArray        = require('./_is-array')
  , anObject       = require('./_an-object')
  , toIObject      = require('./_to-iobject')
  , toPrimitive    = require('./_to-primitive')
  , createDesc     = require('./_property-desc')
  , _create        = require('./_object-create')
  , gOPNExt        = require('./_object-gopn-ext')
  , $GOPD          = require('./_object-gopd')
  , $DP            = require('./_object-dp')
  , $keys          = require('./_object-keys')
  , gOPD           = $GOPD.f
  , dP             = $DP.f
  , gOPN           = gOPNExt.f
  , $Symbol        = global.Symbol
  , $JSON          = global.JSON
  , _stringify     = $JSON && $JSON.stringify
  , PROTOTYPE      = 'prototype'
  , HIDDEN         = wks('_hidden')
  , TO_PRIMITIVE   = wks('toPrimitive')
  , isEnum         = {}.propertyIsEnumerable
  , SymbolRegistry = shared('symbol-registry')
  , AllSymbols     = shared('symbols')
  , OPSymbols      = shared('op-symbols')
  , ObjectProto    = Object[PROTOTYPE]
  , USE_NATIVE     = typeof $Symbol == 'function'
  , QObject        = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function(){
  return _create(dP({}, 'a', {
    get: function(){ return dP(this, 'a', {value: 7}).a; }
  })).a != 7;
}) ? function(it, key, D){
  var protoDesc = gOPD(ObjectProto, key);
  if(protoDesc)delete ObjectProto[key];
  dP(it, key, D);
  if(protoDesc && it !== ObjectProto)dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function(tag){
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function(it){
  return typeof it == 'symbol';
} : function(it){
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D){
  if(it === ObjectProto)$defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if(has(AllSymbols, key)){
    if(!D.enumerable){
      if(!has(it, HIDDEN))dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if(has(it, HIDDEN) && it[HIDDEN][key])it[HIDDEN][key] = false;
      D = _create(D, {enumerable: createDesc(0, false)});
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P){
  anObject(it);
  var keys = enumKeys(P = toIObject(P))
    , i    = 0
    , l = keys.length
    , key;
  while(l > i)$defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P){
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key){
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if(this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key){
  it  = toIObject(it);
  key = toPrimitive(key, true);
  if(it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return;
  var D = gOPD(it, key);
  if(D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key]))D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it){
  var names  = gOPN(toIObject(it))
    , result = []
    , i      = 0
    , key;
  while(names.length > i){
    if(!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META)result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it){
  var IS_OP  = it === ObjectProto
    , names  = gOPN(IS_OP ? OPSymbols : toIObject(it))
    , result = []
    , i      = 0
    , key;
  while(names.length > i){
    if(has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true))result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if(!USE_NATIVE){
  $Symbol = function Symbol(){
    if(this instanceof $Symbol)throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function(value){
      if(this === ObjectProto)$set.call(OPSymbols, value);
      if(has(this, HIDDEN) && has(this[HIDDEN], tag))this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if(DESCRIPTORS && setter)setSymbolDesc(ObjectProto, tag, {configurable: true, set: $set});
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString(){
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f   = $defineProperty;
  require('./_object-gopn').f = gOPNExt.f = $getOwnPropertyNames;
  require('./_object-pie').f  = $propertyIsEnumerable;
  require('./_object-gops').f = $getOwnPropertySymbols;

  if(DESCRIPTORS && !require('./_library')){
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function(name){
    return wrap(wks(name));
  }
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, {Symbol: $Symbol});

for(var symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), i = 0; symbols.length > i; )wks(symbols[i++]);

for(var symbols = $keys(wks.store), i = 0; symbols.length > i; )wksDefine(symbols[i++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function(key){
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(key){
    if(isSymbol(key))return keyOf(SymbolRegistry, key);
    throw TypeError(key + ' is not a symbol!');
  },
  useSetter: function(){ setter = true; },
  useSimple: function(){ setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function(){
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({a: S}) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it){
    if(it === undefined || isSymbol(it))return; // IE8 returns string on undefined
    var args = [it]
      , i    = 1
      , replacer, $replacer;
    while(arguments.length > i)args.push(arguments[i++]);
    replacer = args[1];
    if(typeof replacer == 'function')$replacer = replacer;
    if($replacer || !isArray(replacer))replacer = function(key, value){
      if($replacer)value = $replacer.call(this, key, value);
      if(!isSymbol(value))return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || require('./_hide')($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);
},{"./_an-object":14,"./_descriptors":21,"./_enum-keys":24,"./_export":25,"./_fails":26,"./_global":27,"./_has":28,"./_hide":29,"./_is-array":33,"./_keyof":39,"./_library":40,"./_meta":41,"./_object-create":42,"./_object-dp":43,"./_object-gopd":45,"./_object-gopn":47,"./_object-gopn-ext":46,"./_object-gops":48,"./_object-keys":51,"./_object-pie":52,"./_property-desc":54,"./_redefine":55,"./_set-to-string-tag":56,"./_shared":58,"./_to-iobject":62,"./_to-primitive":65,"./_uid":66,"./_wks":69,"./_wks-define":67,"./_wks-ext":68}],76:[function(require,module,exports){
// https://github.com/tc39/proposal-object-values-entries
var $export = require('./_export')
  , $values = require('./_object-to-array')(false);

$export($export.S, 'Object', {
  values: function values(it){
    return $values(it);
  }
});
},{"./_export":25,"./_object-to-array":53}],77:[function(require,module,exports){
require('./_wks-define')('asyncIterator');
},{"./_wks-define":67}],78:[function(require,module,exports){
require('./_wks-define')('observable');
},{"./_wks-define":67}],79:[function(require,module,exports){
require('./es6.array.iterator');
var global        = require('./_global')
  , hide          = require('./_hide')
  , Iterators     = require('./_iterators')
  , TO_STRING_TAG = require('./_wks')('toStringTag');

for(var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++){
  var NAME       = collections[i]
    , Collection = global[NAME]
    , proto      = Collection && Collection.prototype;
  if(proto && !proto[TO_STRING_TAG])hide(proto, TO_STRING_TAG, NAME);
  Iterators[NAME] = Iterators.Array;
}
},{"./_global":27,"./_hide":29,"./_iterators":38,"./_wks":69,"./es6.array.iterator":72}],80:[function(require,module,exports){
/*************************
 * Croppie
 * Copyright 2016
 * Foliotek
 * Version: 2.4.1
 *************************/
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['exports'], factory);
    } else if (typeof exports === 'object' && typeof exports.nodeName !== 'string') {
        // CommonJS
        factory(exports);
    } else {
        // Browser globals
        factory((root.commonJsStrict = {}));
    }
}(this, function (exports) {

    /* Polyfills */
    if (typeof Promise !== 'function') {
        /*! promise-polyfill 3.1.0 */
        !function(a){function b(a,b){return function(){a.apply(b,arguments)}}function c(a){if("object"!=typeof this)throw new TypeError("Promises must be constructed via new");if("function"!=typeof a)throw new TypeError("not a function");this._state=null,this._value=null,this._deferreds=[],i(a,b(e,this),b(f,this))}function d(a){var b=this;return null===this._state?void this._deferreds.push(a):void k(function(){var c=b._state?a.onFulfilled:a.onRejected;if(null===c)return void(b._state?a.resolve:a.reject)(b._value);var d;try{d=c(b._value)}catch(e){return void a.reject(e)}a.resolve(d)})}function e(a){try{if(a===this)throw new TypeError("A promise cannot be resolved with itself.");if(a&&("object"==typeof a||"function"==typeof a)){var c=a.then;if("function"==typeof c)return void i(b(c,a),b(e,this),b(f,this))}this._state=!0,this._value=a,g.call(this)}catch(d){f.call(this,d)}}function f(a){this._state=!1,this._value=a,g.call(this)}function g(){for(var a=0,b=this._deferreds.length;b>a;a++)d.call(this,this._deferreds[a]);this._deferreds=null}function h(a,b,c,d){this.onFulfilled="function"==typeof a?a:null,this.onRejected="function"==typeof b?b:null,this.resolve=c,this.reject=d}function i(a,b,c){var d=!1;try{a(function(a){d||(d=!0,b(a))},function(a){d||(d=!0,c(a))})}catch(e){if(d)return;d=!0,c(e)}}var j=setTimeout,k="function"==typeof setImmediate&&setImmediate||function(a){j(a,1)},l=Array.isArray||function(a){return"[object Array]"===Object.prototype.toString.call(a)};c.prototype["catch"]=function(a){return this.then(null,a)},c.prototype.then=function(a,b){var e=this;return new c(function(c,f){d.call(e,new h(a,b,c,f))})},c.all=function(){var a=Array.prototype.slice.call(1===arguments.length&&l(arguments[0])?arguments[0]:arguments);return new c(function(b,c){function d(f,g){try{if(g&&("object"==typeof g||"function"==typeof g)){var h=g.then;if("function"==typeof h)return void h.call(g,function(a){d(f,a)},c)}a[f]=g,0===--e&&b(a)}catch(i){c(i)}}if(0===a.length)return b([]);for(var e=a.length,f=0;f<a.length;f++)d(f,a[f])})},c.resolve=function(a){return a&&"object"==typeof a&&a.constructor===c?a:new c(function(b){b(a)})},c.reject=function(a){return new c(function(b,c){c(a)})},c.race=function(a){return new c(function(b,c){for(var d=0,e=a.length;e>d;d++)a[d].then(b,c)})},c._setImmediateFn=function(a){k=a},"undefined"!=typeof module&&module.exports?module.exports=c:a.Promise||(a.Promise=c)}(this);
    }

    if ( typeof window.CustomEvent !== "function" ) {
        (function(){
            function CustomEvent ( event, params ) {
                params = params || { bubbles: false, cancelable: false, detail: undefined };
                var evt = document.createEvent( 'CustomEvent' );
                evt.initCustomEvent( event, params.bubbles, params.cancelable, params.detail );
                return evt;
            }
            CustomEvent.prototype = window.Event.prototype;
            window.CustomEvent = CustomEvent;
        }());
    }

    if (!HTMLCanvasElement.prototype.toBlob) {
        Object.defineProperty(HTMLCanvasElement.prototype, 'toBlob', {
            value: function (callback, type, quality) {
                var binStr = atob( this.toDataURL(type, quality).split(',')[1] ),
                len = binStr.length,
                arr = new Uint8Array(len);

                for (var i=0; i<len; i++ ) {
                    arr[i] = binStr.charCodeAt(i);
                }

                callback( new Blob( [arr], {type: type || 'image/png'} ) );
            }
        });
    }
    /* End Polyfills */

    var cssPrefixes = ['Webkit', 'Moz', 'ms'],
        emptyStyles = document.createElement('div').style,
        CSS_TRANS_ORG,
        CSS_TRANSFORM,
        CSS_USERSELECT;

    function vendorPrefix(prop) {
        if (prop in emptyStyles) {
            return prop;
        }

        var capProp = prop[0].toUpperCase() + prop.slice(1),
            i = cssPrefixes.length;

        while (i--) {
            prop = cssPrefixes[i] + capProp;
            if (prop in emptyStyles) {
                return prop;
            }
        }
    }

    CSS_TRANSFORM = vendorPrefix('transform');
    CSS_TRANS_ORG = vendorPrefix('transformOrigin');
    CSS_USERSELECT = vendorPrefix('userSelect');

    // Credits to : Andrew Dupont - http://andrewdupont.net/2009/08/28/deep-extending-objects-in-javascript/
    function deepExtend(destination, source) {
        destination = destination || {};
        for (var property in source) {
            if (source[property] && source[property].constructor && source[property].constructor === Object) {
                destination[property] = destination[property] || {};
                deepExtend(destination[property], source[property]);
            } else {
                destination[property] = source[property];
            }
        }
        return destination;
    }

    function debounce(func, wait, immediate) {
        var timeout;
        return function () {
            var context = this, args = arguments;
            var later = function () {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }

    function dispatchChange(element) {
        if ("createEvent" in document) {
            var evt = document.createEvent("HTMLEvents");
            evt.initEvent("change", false, true);
            element.dispatchEvent(evt);
        }
        else {
            element.fireEvent("onchange");
        }
    }

    //http://jsperf.com/vanilla-css
    function css(el, styles, val) {
        if (typeof (styles) === 'string') {
            var tmp = styles;
            styles = {};
            styles[tmp] = val;
        }

        for (var prop in styles) {
            el.style[prop] = styles[prop];
        }
    }

    function addClass(el, c) {
        if (el.classList) {
            el.classList.add(c);
        }
        else {
            el.className += ' ' + c;
        }
    }

    function removeClass(el, c) {
        if (el.classList) {
            el.classList.remove(c);
        }
        else {
            el.className = el.className.replace(c, '');
        }
    }

    function num(v) {
        return parseInt(v, 10);
    }

    /* Utilities */
    function loadImage(src, imageEl) {
        var img = imageEl || new Image();
        img.style.opacity = 0;

        return new Promise(function (resolve) {
            if (img.src === src) {
                // If image source hasn't changed resolve immediately
                resolve(img);
            } 
            else {
                img.removeAttribute('crossOrigin');
                if (src.match(/^https?:\/\/|^\/\//)) {
                    img.setAttribute('crossOrigin', 'anonymous');
                }
                img.onload = function () {
                    setTimeout(function () {
                        resolve(img);
                    }, 1);
                }
                img.src = src;
            }
        });
    }


    /* CSS Transform Prototype */
    var TRANSLATE_OPTS = {
        'translate3d': {
            suffix: ', 0px'
        },
        'translate': {
            suffix: ''
        }
    };
    var Transform = function (x, y, scale) {
        this.x = parseFloat(x);
        this.y = parseFloat(y);
        this.scale = parseFloat(scale);
    };

    Transform.parse = function (v) {
        if (v.style) {
            return Transform.parse(v.style[CSS_TRANSFORM]);
        }
        else if (v.indexOf('matrix') > -1 || v.indexOf('none') > -1) {
            return Transform.fromMatrix(v);
        }
        else {
            return Transform.fromString(v);
        }
    };

    Transform.fromMatrix = function (v) {
        var vals = v.substring(7).split(',');
        if (!vals.length || v === 'none') {
            vals = [1, 0, 0, 1, 0, 0];
        }

        return new Transform(num(vals[4]), num(vals[5]), parseFloat(vals[0]));
    };

    Transform.fromString = function (v) {
        var values = v.split(') '),
            translate = values[0].substring(Croppie.globals.translate.length + 1).split(','),
            scale = values.length > 1 ? values[1].substring(6) : 1,
            x = translate.length > 1 ? translate[0] : 0,
            y = translate.length > 1 ? translate[1] : 0;

        return new Transform(x, y, scale);
    };

    Transform.prototype.toString = function () {
        var suffix = TRANSLATE_OPTS[Croppie.globals.translate].suffix || '';
        return Croppie.globals.translate + '(' + this.x + 'px, ' + this.y + 'px' + suffix + ') scale(' + this.scale + ')';
    };

    var TransformOrigin = function (el) {
        if (!el || !el.style[CSS_TRANS_ORG]) {
            this.x = 0;
            this.y = 0;
            return;
        }
        var css = el.style[CSS_TRANS_ORG].split(' ');
        this.x = parseFloat(css[0]);
        this.y = parseFloat(css[1]);
    };

    TransformOrigin.prototype.toString = function () {
        return this.x + 'px ' + this.y + 'px';
    };

    function getExifOrientation (img, cb) {
        if (!window.EXIF) {
            cb(0);
        }

        EXIF.getData(img, function () {
            var orientation = EXIF.getTag(this, 'Orientation');
            cb(orientation);
        });
    }

    function drawCanvas(canvas, img, orientation) {
        var width = img.width,
            height = img.height,
            ctx = canvas.getContext('2d');

        canvas.width = img.width;
        canvas.height = img.height;

        ctx.save();
        switch (orientation) {
          case 2:
             ctx.translate(width, 0);
             ctx.scale(-1, 1);
             break;

          case 3:
              ctx.translate(width, height);
              ctx.rotate(180*Math.PI/180);
              break;

          case 4:
              ctx.translate(0, height);
              ctx.scale(1, -1);
              break;

          case 5:
              canvas.width = height;
              canvas.height = width;
              ctx.rotate(90*Math.PI/180);
              ctx.scale(1, -1);
              break;

          case 6:
              canvas.width = height;
              canvas.height = width;
              ctx.rotate(90*Math.PI/180);
              ctx.translate(0, -height);
              break;

          case 7:
              canvas.width = height;
              canvas.height = width;
              ctx.rotate(-90*Math.PI/180);
              ctx.translate(-width, height);
              ctx.scale(1, -1);
              break;

          case 8:
              canvas.width = height;
              canvas.height = width;
              ctx.translate(0, width);
              ctx.rotate(-90*Math.PI/180);
              break;
        }
        ctx.drawImage(img, 0,0, width, height);
        ctx.restore();
    }

    /* Private Methods */
    function _create() {
        var self = this,
            contClass = 'croppie-container',
            customViewportClass = self.options.viewport.type ? 'cr-vp-' + self.options.viewport.type : null,
            boundary, img, viewport, overlay, canvas, bw, bh;

        self.options.useCanvas = self.options.enableOrientation || _hasExif.call(self);
        // Properties on class
        self.data = {};
        self.elements = {};

        // Generating Markup
        boundary = self.elements.boundary = document.createElement('div');
        viewport = self.elements.viewport = document.createElement('div');
        img = self.elements.img = document.createElement('img');
        overlay = self.elements.overlay = document.createElement('div');

        if (self.options.useCanvas) {
            self.elements.canvas = document.createElement('canvas');
            self.elements.preview = self.elements.canvas;
        }
        else {
            self.elements.preview = self.elements.img;
        }

        addClass(boundary, 'cr-boundary');
        bw = self.options.boundary.width;
        bh = self.options.boundary.height;
        css(boundary, {
            width: (bw + (isNaN(bw) ? '' : 'px')),
            height: (bh + (isNaN(bh) ? '' : 'px'))
        });

        addClass(viewport, 'cr-viewport');
        if (customViewportClass) {
            addClass(viewport, customViewportClass);
        }
        css(viewport, {
            width: self.options.viewport.width + 'px',
            height: self.options.viewport.height + 'px'
        });
        viewport.setAttribute('tabindex', 0);

        addClass(self.elements.preview, 'cr-image');
        addClass(overlay, 'cr-overlay');

        self.element.appendChild(boundary);
        boundary.appendChild(self.elements.preview);
        boundary.appendChild(viewport);
        boundary.appendChild(overlay);

        addClass(self.element, contClass);
        if (self.options.customClass) {
            addClass(self.element, self.options.customClass);
        }

        _initDraggable.call(this);

        if (self.options.enableZoom) {
            _initializeZoom.call(self);
        }

        // if (self.options.enableOrientation) {
        //     _initRotationControls.call(self);
        // }
    }

    // function _initRotationControls () {
    //     var self = this,
    //         wrap, btnLeft, btnRight, iLeft, iRight;

    //     wrap = document.createElement('div');
    //     self.elements.orientationBtnLeft = btnLeft = document.createElement('button');
    //     self.elements.orientationBtnRight = btnRight = document.createElement('button');

    //     wrap.appendChild(btnLeft);
    //     wrap.appendChild(btnRight);

    //     iLeft = document.createElement('i');
    //     iRight = document.createElement('i');
    //     btnLeft.appendChild(iLeft);
    //     btnRight.appendChild(iRight);

    //     addClass(wrap, 'cr-rotate-controls');
    //     addClass(btnLeft, 'cr-rotate-l');
    //     addClass(btnRight, 'cr-rotate-r');

    //     self.elements.boundary.appendChild(wrap);

    //     btnLeft.addEventListener('click', function () {
    //         self.rotate(-90);
    //     });
    //     btnRight.addEventListener('click', function () {
    //         self.rotate(90);
    //     });
    // }

    function _hasExif() {
        return this.options.enableExif && window.EXIF;
    }

    function _setZoomerVal(v) {
        if (this.options.enableZoom) {
            var z = this.elements.zoomer,
                val = fix(v, 4);

            z.value = Math.max(z.min, Math.min(z.max, val));
        }
    }

    function _initializeZoom() {
        var self = this,
            wrap = self.elements.zoomerWrap = document.createElement('div'),
            zoomer = self.elements.zoomer = document.createElement('input');

        addClass(wrap, 'cr-slider-wrap');
        addClass(zoomer, 'cr-slider');
        zoomer.type = 'range';
        zoomer.step = '0.0001';
        zoomer.value = 1;
        zoomer.style.display = self.options.showZoomer ? '' : 'none';

        self.element.appendChild(wrap);
        wrap.appendChild(zoomer);

        self._currentZoom = 1;

        function change() {
            _onZoom.call(self, {
                value: parseFloat(zoomer.value),
                origin: new TransformOrigin(self.elements.preview),
                viewportRect: self.elements.viewport.getBoundingClientRect(),
                transform: Transform.parse(self.elements.preview)
            });
        }

        function scroll(ev) {
            var delta, targetZoom;

            if (ev.wheelDelta) {
                delta = ev.wheelDelta / 1200; //wheelDelta min: -120 max: 120 // max x 10 x 2
            } else if (ev.deltaY) {
                delta = ev.deltaY / 1060; //deltaY min: -53 max: 53 // max x 10 x 2
            } else if (ev.detail) {
                delta = ev.detail / -60; //delta min: -3 max: 3 // max x 10 x 2
            } else {
                delta = 0;
            }

            targetZoom = self._currentZoom + (delta * self._currentZoom);

            ev.preventDefault();
            _setZoomerVal.call(self, targetZoom);
            change.call(self);
        }

        self.elements.zoomer.addEventListener('input', change);// this is being fired twice on keypress
        self.elements.zoomer.addEventListener('change', change);

        if (self.options.mouseWheelZoom) {
            self.elements.boundary.addEventListener('mousewheel', scroll);
            self.elements.boundary.addEventListener('DOMMouseScroll', scroll);
        }
    }

    function _onZoom(ui) {
        var self = this,
            transform = ui ? ui.transform : Transform.parse(self.elements.preview),
            vpRect = ui ? ui.viewportRect : self.elements.viewport.getBoundingClientRect(),
            origin = ui ? ui.origin : new TransformOrigin(self.elements.preview),
            transCss = {};

        function applyCss() {
            var transCss = {};
            transCss[CSS_TRANSFORM] = transform.toString();
            transCss[CSS_TRANS_ORG] = origin.toString();
            css(self.elements.preview, transCss);
        }

        self._currentZoom = ui ? ui.value : self._currentZoom;
        transform.scale = self._currentZoom;
        applyCss();


        if (self.options.enforceBoundary) {
            var boundaries = _getVirtualBoundaries.call(self, vpRect),
                transBoundaries = boundaries.translate,
                oBoundaries = boundaries.origin;

            if (transform.x >= transBoundaries.maxX) {
                origin.x = oBoundaries.minX;
                transform.x = transBoundaries.maxX;
            }

            if (transform.x <= transBoundaries.minX) {
                origin.x = oBoundaries.maxX;
                transform.x = transBoundaries.minX;
            }

            if (transform.y >= transBoundaries.maxY) {
                origin.y = oBoundaries.minY;
                transform.y = transBoundaries.maxY;
            }

            if (transform.y <= transBoundaries.minY) {
                origin.y = oBoundaries.maxY;
                transform.y = transBoundaries.minY;
            }
        }
        applyCss();
        _debouncedOverlay.call(self);
        _triggerUpdate.call(self);
    }

    function _getVirtualBoundaries(viewport) {
        var self = this,
            scale = self._currentZoom,
            vpWidth = viewport.width,
            vpHeight = viewport.height,
            centerFromBoundaryX = self.elements.boundary.clientWidth / 2,
            centerFromBoundaryY = self.elements.boundary.clientHeight / 2,
            imgRect = self.elements.preview.getBoundingClientRect(),
            curImgWidth = imgRect.width,
            curImgHeight = imgRect.height,
            halfWidth = vpWidth / 2,
            halfHeight = vpHeight / 2;

        var maxX = ((halfWidth / scale) - centerFromBoundaryX) * -1;
        var minX = maxX - ((curImgWidth * (1 / scale)) - (vpWidth * (1 / scale)));

        var maxY = ((halfHeight / scale) - centerFromBoundaryY) * -1;
        var minY = maxY - ((curImgHeight * (1 / scale)) - (vpHeight * (1 / scale)));

        var originMinX = (1 / scale) * halfWidth;
        var originMaxX = (curImgWidth * (1 / scale)) - originMinX;

        var originMinY = (1 / scale) * halfHeight;
        var originMaxY = (curImgHeight * (1 / scale)) - originMinY;

        return {
            translate: {
                maxX: maxX,
                minX: minX,
                maxY: maxY,
                minY: minY
            },
            origin: {
                maxX: originMaxX,
                minX: originMinX,
                maxY: originMaxY,
                minY: originMinY
            }
        };
    }

    function _updateCenterPoint() {
        var self = this,
            scale = self._currentZoom,
            data = self.elements.preview.getBoundingClientRect(),
            vpData = self.elements.viewport.getBoundingClientRect(),
            transform = Transform.parse(self.elements.preview.style[CSS_TRANSFORM]),
            pc = new TransformOrigin(self.elements.preview),
            top = (vpData.top - data.top) + (vpData.height / 2),
            left = (vpData.left - data.left) + (vpData.width / 2),
            center = {},
            adj = {};

        center.y = top / scale;
        center.x = left / scale;

        adj.y = (center.y - pc.y) * (1 - scale);
        adj.x = (center.x - pc.x) * (1 - scale);

        transform.x -= adj.x;
        transform.y -= adj.y;

        var newCss = {};
        newCss[CSS_TRANS_ORG] = center.x + 'px ' + center.y + 'px';
        newCss[CSS_TRANSFORM] = transform.toString();
        css(self.elements.preview, newCss);
    }

    function _initDraggable() {
        var self = this,
            isDragging = false,
            originalX,
            originalY,
            originalDistance,
            vpRect,
            transform;

        function assignTransformCoordinates(deltaX, deltaY) {
            var imgRect = self.elements.preview.getBoundingClientRect(),
                top = transform.y + deltaY,
                left = transform.x + deltaX;

            if (self.options.enforceBoundary) {
                if (vpRect.top > imgRect.top + deltaY && vpRect.bottom < imgRect.bottom + deltaY) {
                    transform.y = top;
                }

                if (vpRect.left > imgRect.left + deltaX && vpRect.right < imgRect.right + deltaX) {
                    transform.x = left;
                }
            }
            else {
                transform.y = top;
                transform.x = left;
            }
        }

        function keyDown(ev) {
            var LEFT_ARROW  = 37,
                UP_ARROW    = 38,
                RIGHT_ARROW = 39,
                DOWN_ARROW  = 40;

            if (ev.shiftKey && (ev.keyCode == UP_ARROW || ev.keyCode == DOWN_ARROW)) {
                var zoom = 0.0;
                if (ev.keyCode == UP_ARROW) {
                    zoom = parseFloat(self.elements.zoomer.value, 10) + parseFloat(self.elements.zoomer.step, 10)
                }
                else {
                    zoom = parseFloat(self.elements.zoomer.value, 10) - parseFloat(self.elements.zoomer.step, 10)
                }
                self.setZoom(zoom);
            }
            else if (ev.keyCode >= 37 && ev.keyCode <= 40) {
                ev.preventDefault();
                var movement = parseKeyDown(ev.keyCode);

                transform = Transform.parse(self.elements.preview);
                document.body.style[CSS_USERSELECT] = 'none';
                vpRect = self.elements.viewport.getBoundingClientRect();
                keyMove(movement);
            };

            function parseKeyDown(key) {
                switch (key) {
                    case LEFT_ARROW:
                        return [1, 0];
                    case UP_ARROW:
                        return [0, 1];
                    case RIGHT_ARROW:
                        return [-1, 0];
                    case DOWN_ARROW:
                        return [0, -1];
                };
            };
        }

        function keyMove(movement) {
            var deltaX = movement[0],
                deltaY = movement[1],
                newCss = {};

            assignTransformCoordinates(deltaX, deltaY);

            newCss[CSS_TRANSFORM] = transform.toString();
            css(self.elements.preview, newCss);
            _updateOverlay.call(self);
            document.body.style[CSS_USERSELECT] = '';
            _updateCenterPoint.call(self);
            _triggerUpdate.call(self);
            originalDistance = 0;
        }

        function mouseDown(ev) {
            ev.preventDefault();
            if (isDragging) return;
            isDragging = true;
            originalX = ev.pageX;
            originalY = ev.pageY;

            if (ev.touches) {
                var touches = ev.touches[0];
                originalX = touches.pageX;
                originalY = touches.pageY;
            }

            transform = Transform.parse(self.elements.preview);
            window.addEventListener('mousemove', mouseMove);
            window.addEventListener('touchmove', mouseMove);
            window.addEventListener('mouseup', mouseUp);
            window.addEventListener('touchend', mouseUp);
            document.body.style[CSS_USERSELECT] = 'none';
            vpRect = self.elements.viewport.getBoundingClientRect();
        }

        function mouseMove(ev) {
            ev.preventDefault();
            var pageX = ev.pageX,
                pageY = ev.pageY;

            if (ev.touches) {
                var touches = ev.touches[0];
                pageX = touches.pageX;
                pageY = touches.pageY;
            }

            var deltaX = pageX - originalX,
                deltaY = pageY - originalY,
                newCss = {};

            if (ev.type == 'touchmove') {
                if (ev.touches.length > 1) {
                    var touch1 = ev.touches[0];
                    var touch2 = ev.touches[1];
                    var dist = Math.sqrt((touch1.pageX - touch2.pageX) * (touch1.pageX - touch2.pageX) + (touch1.pageY - touch2.pageY) * (touch1.pageY - touch2.pageY));

                    if (!originalDistance) {
                        originalDistance = dist / self._currentZoom;
                    }

                    var scale = dist / originalDistance;

                    _setZoomerVal.call(self, scale);
                    dispatchChange(self.elements.zoomer);
                    return;
                }
            }

            assignTransformCoordinates(deltaX, deltaY);

            newCss[CSS_TRANSFORM] = transform.toString();
            css(self.elements.preview, newCss);
            _updateOverlay.call(self);
            originalY = pageY;
            originalX = pageX;
        }

        function mouseUp() {
            isDragging = false;
            window.removeEventListener('mousemove', mouseMove);
            window.removeEventListener('touchmove', mouseMove);
            window.removeEventListener('mouseup', mouseUp);
            window.removeEventListener('touchend', mouseUp);
            document.body.style[CSS_USERSELECT] = '';
            _updateCenterPoint.call(self);
            _triggerUpdate.call(self);
            originalDistance = 0;
        }

        self.elements.overlay.addEventListener('mousedown', mouseDown);
        self.elements.viewport.addEventListener('keydown', keyDown);
        self.elements.overlay.addEventListener('touchstart', mouseDown);
    }

    function _updateOverlay() {
        var self = this,
            boundRect = self.elements.boundary.getBoundingClientRect(),
            imgData = self.elements.preview.getBoundingClientRect();

        css(self.elements.overlay, {
            width: imgData.width + 'px',
            height: imgData.height + 'px',
            top: (imgData.top - boundRect.top) + 'px',
            left: (imgData.left - boundRect.left) + 'px'
        });
    }
    var _debouncedOverlay = debounce(_updateOverlay, 500);

    function _triggerUpdate() {
        var self = this,
            data = self.get(),
            ev;

        if (!_isVisible.call(self)) {
            return;
        }

        self.options.update.call(self, data);
        if (self.$ && typeof Prototype == 'undefined') {
            self.$(self.element).trigger('update', data); 
        }
        else {
            var ev;
            if (window.CustomEvent) {
                ev = new CustomEvent('update', { detail: data });
            } else {
                ev = document.createEvent('CustomEvent');
                ev.initCustomEvent('update', true, true, data);
            }

            self.element.dispatchEvent(ev);
        }
    }

    function _isVisible() {
        return this.elements.preview.offsetHeight > 0 && this.elements.preview.offsetWidth > 0;
    }

    function _updatePropertiesFromImage() {
        var self = this,
            minZoom = 0,
            maxZoom = 1.5,
            initialZoom = 1,
            cssReset = {},
            img = self.elements.preview,
            zoomer = self.elements.zoomer,
            transformReset = new Transform(0, 0, initialZoom),
            originReset = new TransformOrigin(),
            isVisible = _isVisible.call(self),
            imgData,
            vpData,
            boundaryData,
            minW,
            minH;

        if (!isVisible || self.data.bound) {
            // if the croppie isn't visible or it doesn't need binding
            return;
        }

        self.data.bound = true;
        cssReset[CSS_TRANSFORM] = transformReset.toString();
        cssReset[CSS_TRANS_ORG] = originReset.toString();
        cssReset['opacity'] = 1;
        css(img, cssReset);

        imgData = img.getBoundingClientRect();
        vpData = self.elements.viewport.getBoundingClientRect();
        boundaryData = self.elements.boundary.getBoundingClientRect();
        self._originalImageWidth = imgData.width;
        self._originalImageHeight = imgData.height;

        if (self.options.enableZoom) {
            if (self.options.enforceBoundary) {
                minW = vpData.width / imgData.width;
                minH = vpData.height / imgData.height;
                minZoom = Math.max(minW, minH);
            }

            if (minZoom >= maxZoom) {
                maxZoom = minZoom + 1;
            }

            zoomer.min = fix(minZoom, 4);
            zoomer.max = fix(maxZoom, 4);
            var defaultInitialZoom = Math.max((boundaryData.width / imgData.width), (boundaryData.height / imgData.height));
            initialZoom = self.data.boundZoom !== null ? self.data.boundZoom : defaultInitialZoom;
            _setZoomerVal.call(self, initialZoom);
            dispatchChange(zoomer);
        }
        else {
            self._currentZoom = initialZoom;
        }

        transformReset.scale = self._currentZoom;
        cssReset[CSS_TRANSFORM] = transformReset.toString();
        css(img, cssReset);

        if (self.data.points.length) {
            _bindPoints.call(self, self.data.points);
        }
        else {
            _centerImage.call(self);
        }

        _updateCenterPoint.call(self);
        _updateOverlay.call(self);
    }

    function _bindPoints(points) {
        if (points.length != 4) {
            throw "Croppie - Invalid number of points supplied: " + points;
        }
        var self = this,
            pointsWidth = points[2] - points[0],
            // pointsHeight = points[3] - points[1],
            vpData = self.elements.viewport.getBoundingClientRect(),
            boundRect = self.elements.boundary.getBoundingClientRect(),
            vpOffset = {
                left: vpData.left - boundRect.left,
                top: vpData.top - boundRect.top
            },
            scale = vpData.width / pointsWidth,
            originTop = points[1],
            originLeft = points[0],
            transformTop = (-1 * points[1]) + vpOffset.top,
            transformLeft = (-1 * points[0]) + vpOffset.left,
            newCss = {};

        newCss[CSS_TRANS_ORG] = originLeft + 'px ' + originTop + 'px';
        newCss[CSS_TRANSFORM] = new Transform(transformLeft, transformTop, scale).toString();
        css(self.elements.preview, newCss);

        _setZoomerVal.call(self, scale);
        self._currentZoom = scale;
    }

    function _centerImage() {
        var self = this,
            imgDim = self.elements.preview.getBoundingClientRect(),
            vpDim = self.elements.viewport.getBoundingClientRect(),
            boundDim = self.elements.boundary.getBoundingClientRect(),
            vpLeft = vpDim.left - boundDim.left,
            vpTop = vpDim.top - boundDim.top,
            w = vpLeft - ((imgDim.width - vpDim.width) / 2),
            h = vpTop - ((imgDim.height - vpDim.height) / 2),
            transform = new Transform(w, h, self._currentZoom);

        css(self.elements.preview, CSS_TRANSFORM, transform.toString());
    }

    function _transferImageToCanvas(customOrientation) {
        var self = this,
            canvas = self.elements.canvas,
            img = self.elements.img,
            ctx = canvas.getContext('2d'),
            exif = _hasExif.call(self),
            customOrientation = self.options.enableOrientation && customOrientation;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        canvas.width = img.width;
        canvas.height = img.height;

        if (exif) {
            getExifOrientation(img, function (orientation) {
                drawCanvas(canvas, img, num(orientation, 10));
                if (customOrientation) {
                    drawCanvas(canvas, img, customOrientation);
                }
            });
        } else if (customOrientation) {
            drawCanvas(canvas, img, customOrientation);
        }
    }

    function _getCanvas(data) {
        var self = this,
            points = data.points,
            left = num(points[0]),
            top = num(points[1]),
            right = num(points[2]),
            bottom = num(points[3]),
            width = right-left,
            height = bottom-top,
            circle = data.circle,
            canvas = document.createElement('canvas'),
            ctx = canvas.getContext('2d'),
            outWidth = width,
            outHeight = height,
            startX = 0,
            startY = 0,
            canvasWidth = outWidth,
            canvasHeight = outHeight,
            customDimensions = (data.outputWidth && data.outputHeight),
            outputRatio = 1;

        if (customDimensions) {
            canvasWidth = data.outputWidth;
            canvasHeight = data.outputHeight;
            outputRatio = canvasWidth / outWidth;
        }

        canvas.width = canvasWidth;
        canvas.height = canvasHeight;

        if (data.backgroundColor) {
            ctx.fillStyle = data.backgroundColor;
            ctx.fillRect(0, 0, outWidth, outHeight);
        }
        // start fixing data to send to draw image for enforceBoundary: false
        if (left < 0) {
            startX = Math.abs(left);
            left = 0;
        }
        if (top < 0) {
            startY = Math.abs(top);
            top = 0;
        }
        if (right > self._originalImageWidth) {
            width = self._originalImageWidth - left;
            outWidth = width;
        }
        if (bottom > self._originalImageHeight) {
            height = self._originalImageHeight - top;
            outHeight = height;
        }

        if (outputRatio !== 1) {
            startX *= outputRatio;
            startY *= outputRatio;
            outWidth *= outputRatio;
            outHeight *= outputRatio;
        }

        ctx.drawImage(this.elements.preview, left, top, width, height, startX, startY, outWidth, outHeight);
        if (circle) {
            ctx.fillStyle = '#fff';
            ctx.globalCompositeOperation = 'destination-in';
            ctx.beginPath();
            ctx.arc(outWidth / 2, outHeight / 2, outWidth / 2, 0, Math.PI * 2, true);
            ctx.closePath();
            ctx.fill();
        }
        return canvas;
    }

    function _getHtmlResult(data) {
        var points = data.points,
            div = document.createElement('div'),
            img = document.createElement('img'),
            width = points[2] - points[0],
            height = points[3] - points[1];

        addClass(div, 'croppie-result');
        div.appendChild(img);
        css(img, {
            left: (-1 * points[0]) + 'px',
            top: (-1 * points[1]) + 'px'
        });
        img.src = data.url;
        css(div, {
            width: width + 'px',
            height: height + 'px'
        });

        return div;
    }

    function _getBase64Result(data) {
        return _getCanvas.call(this, data).toDataURL(data.format, data.quality);
    }

    function _getBlobResult(data) {
        var self = this;
        return new Promise(function (resolve, reject) {
            _getCanvas.call(self, data).toBlob(function (blob) {
                resolve(blob);
            }, data.format, data.quality);
        });
    }

    function _bind(options, cb) {
        var self = this,
            url,
            points = [],
            zoom = null;

        if (typeof (options) === 'string') {
            url = options;
            options = {};
        }
        else if (Array.isArray(options)) {
            points = options.slice();
        }
        else if (typeof (options) == 'undefined' && self.data.url) { //refreshing
            _updatePropertiesFromImage.call(self);
            _triggerUpdate.call(self);
            return null;
        }
        else {
            url = options.url;
            points = options.points || [];
            zoom = typeof(options.zoom) === 'undefined' ? null : options.zoom;
        }

        self.data.bound = false;
        self.data.url = url || self.data.url;
        self.data.boundZoom = zoom;

        return loadImage(url, self.elements.img).then(function (img) {
            if(!points.length){
                var iWidth = img.naturalWidth;
                var iHeight = img.naturalHeight;

                var rect = self.elements.viewport.getBoundingClientRect();
                var aspectRatio = rect.width / rect.height;
                var width, height;

                if( iWidth / iHeight > aspectRatio){
                    height = iHeight;
                    width = height * aspectRatio;
                }else{
                    width = iWidth;
                    height = width / aspectRatio;
                }

                var x0 = (iWidth - width) / 2;
                var y0 = (iHeight - height) / 2;
                var x1 = x0 + width;
                var y1 = y0 + height;

                self.data.points = [x0, y0, x1, y1];
            } else {
                if(self.options.relative){
                    // de-relative points
                    points = [
                        points[0] * img.naturalWidth / 100,
                        points[1] * img.naturalHeight / 100,
                        points[2] * img.naturalWidth / 100,
                        points[3] * img.naturalHeight / 100
                    ];
                }

                self.data.points = points.map(function (p) {
                    return parseFloat(p);
                });
            }

            if (self.options.useCanvas) {
                self.elements.img.exifdata = null;
                _transferImageToCanvas.call(self, options.orientation || 1);
            }
            _updatePropertiesFromImage.call(self);
            _triggerUpdate.call(self);
            cb && cb();
        });
    }

    function fix(v, decimalPoints) {
        return parseFloat(v).toFixed(decimalPoints || 0);
    }

    function _get() {
        var self = this,
            imgData = self.elements.preview.getBoundingClientRect(),
            vpData = self.elements.viewport.getBoundingClientRect(),
            x1 = vpData.left - imgData.left,
            y1 = vpData.top - imgData.top,
            widthDiff = (vpData.width - self.elements.viewport.offsetWidth) / 2,
            heightDiff = (vpData.height - self.elements.viewport.offsetHeight) / 2,
            x2 = x1 + self.elements.viewport.offsetWidth + widthDiff,
            y2 = y1 + self.elements.viewport.offsetHeight + heightDiff,
            scale = self._currentZoom;

        if (scale === Infinity || isNaN(scale)) {
            scale = 1;
        }

        var max = self.options.enforceBoundary ? 0 : Number.NEGATIVE_INFINITY;
        x1 = Math.max(max, x1 / scale);
        y1 = Math.max(max, y1 / scale);
        x2 = Math.max(max, x2 / scale);
        y2 = Math.max(max, y2 / scale);

        return {
            points: [fix(x1), fix(y1), fix(x2), fix(y2)],
            zoom: scale
        };
    }

    var RESULT_DEFAULTS = {
            type: 'canvas',
            format: 'png',
            quality: 1
        },
        RESULT_FORMATS = ['jpeg', 'webp', 'png'];

    function _result(options) {
        var self = this,
            data = _get.call(self),
            opts = deepExtend(RESULT_DEFAULTS, deepExtend({}, options)),
            resultType = (typeof (options) === 'string' ? options : (opts.type || 'base64')),
            size = opts.size,
            format = opts.format,
            quality = opts.quality,
            backgroundColor = opts.backgroundColor,
            circle = typeof opts.circle === 'boolean' ? opts.circle : (self.options.viewport.type === 'circle'),
            vpRect = self.elements.viewport.getBoundingClientRect(),
            ratio = vpRect.width / vpRect.height,
            prom;

        if (size === 'viewport') {
            data.outputWidth = vpRect.width;
            data.outputHeight = vpRect.height;
        } else if (typeof size === 'object') {
            if (size.width && size.height) {
                data.outputWidth = size.width;
                data.outputHeight = size.height;
            } else if (size.width) {
                data.outputWidth = size.width;
                data.outputHeight = size.width / ratio;
            } else if (size.height) {
                data.outputWidth = size.height * ratio;
                data.outputHeight = size.height;
            }
        }

        if (RESULT_FORMATS.indexOf(format) > -1) {
            data.format = 'image/' + format;
            data.quality = quality;
        }

        data.circle = circle;
        data.url = self.data.url;
        data.backgroundColor = backgroundColor;

        prom = new Promise(function (resolve, reject) {
            switch(resultType.toLowerCase())
            {
                case 'rawcanvas':
                    resolve(_getCanvas.call(self, data));
                    break;
                case 'canvas':
                case 'base64':
                    resolve(_getBase64Result.call(self, data));
                    break;
                case 'blob':
                    _getBlobResult.call(self, data).then(resolve);
                    break;
                default:
                    resolve(_getHtmlResult.call(self, data));
                    break;
            }
        });
        return prom;
    }

    function _refresh() {
        _updatePropertiesFromImage.call(this);
    }

    function _rotate(deg) {
        if (!this.options.useCanvas) {
            throw 'Croppie: Cannot rotate without enableOrientation';
        }

        var self = this,
            canvas = self.elements.canvas,
            img = self.elements.img,
            copy = document.createElement('canvas'),
            ornt = 1;

        copy.width = canvas.width;
        copy.height = canvas.height;
        var ctx = copy.getContext('2d');
        ctx.drawImage(canvas, 0, 0);

        if (deg === 90 || deg === -270) ornt = 6;
        if (deg === -90 || deg === 270) ornt = 8;
        if (deg === 180 || deg === -180) ornt = 3;

        drawCanvas(canvas, copy, ornt);
        _onZoom.call(self);
    }

    function _destroy() {
        var self = this;
        self.element.removeChild(self.elements.boundary);
        removeClass(self.element, 'croppie-container');
        if (self.options.enableZoom) {
            self.element.removeChild(self.elements.zoomerWrap);
        }
        delete self.elements;
    }

    if (window.jQuery) {
        var $ = window.jQuery;
        $.fn.croppie = function (opts) {
            var ot = typeof opts;

            if (ot === 'string') {
                var args = Array.prototype.slice.call(arguments, 1);
                var singleInst = $(this).data('croppie');

                if (opts === 'get') {
                    return singleInst.get();
                }
                else if (opts === 'result') {
                    return singleInst.result.apply(singleInst, args);
                }
                else if (opts === 'bind') {
                    return singleInst.bind.apply(singleInst, args);
                }

                return this.each(function () {
                    var i = $(this).data('croppie');
                    if (!i) return;

                    var method = i[opts];
                    if ($.isFunction(method)) {
                        method.apply(i, args);
                        if (opts === 'destroy') {
                            $(this).removeData('croppie');
                        }
                    }
                    else {
                        throw 'Croppie ' + opts + ' method not found';
                    }
                });
            }
            else {
                return this.each(function () {
                    var i = new Croppie(this, opts);
                    i.$ = $;
                    $(this).data('croppie', i);
                });
            }
        };
    }

    function Croppie(element, opts) {
        this.element = element;
        this.options = deepExtend(deepExtend({}, Croppie.defaults), opts);

        if (this.element.tagName.toLowerCase() === 'img') {
            var origImage = this.element;
            addClass(origImage, 'cr-original-image');
            var replacementDiv = document.createElement('div');
            this.element.parentNode.appendChild(replacementDiv);
            replacementDiv.appendChild(origImage);
            this.element = replacementDiv;
            this.options.url = this.options.url || origImage.src;
        }

        _create.call(this);
        if (this.options.url) {
            var bindOpts = {
                url: this.options.url,
                points: this.options.points
            };
            delete this.options['url'];
            delete this.options['points'];
            _bind.call(this, bindOpts);
        }
    }

    Croppie.defaults = {
        viewport: {
            width: 100,
            height: 100,
            type: 'square'
        },
        boundary: { },
        orientationControls: {
            enabled: true,
            leftClass: '',
            rightClass: ''
        },
        customClass: '',
        showZoomer: true,
        enableZoom: true,
        mouseWheelZoom: true,
        enableExif: false,
        enforceBoundary: true,
        enableOrientation: false,
        update: function () { }
    };

    Croppie.globals = {
        translate: 'translate3d'
    };

    deepExtend(Croppie.prototype, {
        bind: function (options, cb) {
            return _bind.call(this, options, cb);
        },
        get: function () {
            var data = _get.call(this);
            var points = data.points;
            if (this.options.relative) {
                //
                // Relativize points
                //
                points[0] /= this.elements.img.naturalWidth / 100;
                points[1] /= this.elements.img.naturalHeight / 100;
                points[2] /= this.elements.img.naturalWidth / 100;
                points[3] /= this.elements.img.naturalHeight / 100;
            }
            return data;
        },
        result: function (type) {
            return _result.call(this, type);
        },
        refresh: function () {
            return _refresh.call(this);
        },
        setZoom: function (v) {
            _setZoomerVal.call(this, v);
            dispatchChange(this.elements.zoomer);
        },
        rotate: function (deg) {
            _rotate.call(this, deg);
        },
        destroy: function () {
            return _destroy.call(this);
        }
    });

    exports.Croppie = window.Croppie = Croppie;

    if (typeof module === 'object' && !!module.exports) {
        module.exports = Croppie;
    }
}));

},{}],81:[function(require,module,exports){
//! moment.js locale configuration
//! locale : German [de]
//! author : lluchs : https://github.com/lluchs
//! author: Menelion Elensúle: https://github.com/Oire
//! author : Mikolaj Dadela : https://github.com/mik01aj

;(function (global, factory) {
   typeof exports === 'object' && typeof module !== 'undefined'
       && typeof require === 'function' ? factory(require('../moment')) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


function processRelativeTime(number, withoutSuffix, key, isFuture) {
    var format = {
        'm': ['eine Minute', 'einer Minute'],
        'h': ['eine Stunde', 'einer Stunde'],
        'd': ['ein Tag', 'einem Tag'],
        'dd': [number + ' Tage', number + ' Tagen'],
        'M': ['ein Monat', 'einem Monat'],
        'MM': [number + ' Monate', number + ' Monaten'],
        'y': ['ein Jahr', 'einem Jahr'],
        'yy': [number + ' Jahre', number + ' Jahren']
    };
    return withoutSuffix ? format[key][0] : format[key][1];
}

var de = moment.defineLocale('de', {
    months : 'Januar_Februar_März_April_Mai_Juni_Juli_August_September_Oktober_November_Dezember'.split('_'),
    monthsShort : 'Jan._Febr._Mrz._Apr._Mai_Jun._Jul._Aug._Sept._Okt._Nov._Dez.'.split('_'),
    monthsParseExact : true,
    weekdays : 'Sonntag_Montag_Dienstag_Mittwoch_Donnerstag_Freitag_Samstag'.split('_'),
    weekdaysShort : 'So._Mo._Di._Mi._Do._Fr._Sa.'.split('_'),
    weekdaysMin : 'So_Mo_Di_Mi_Do_Fr_Sa'.split('_'),
    weekdaysParseExact : true,
    longDateFormat : {
        LT: 'HH:mm',
        LTS: 'HH:mm:ss',
        L : 'DD.MM.YYYY',
        LL : 'D. MMMM YYYY',
        LLL : 'D. MMMM YYYY HH:mm',
        LLLL : 'dddd, D. MMMM YYYY HH:mm'
    },
    calendar : {
        sameDay: '[heute um] LT [Uhr]',
        sameElse: 'L',
        nextDay: '[morgen um] LT [Uhr]',
        nextWeek: 'dddd [um] LT [Uhr]',
        lastDay: '[gestern um] LT [Uhr]',
        lastWeek: '[letzten] dddd [um] LT [Uhr]'
    },
    relativeTime : {
        future : 'in %s',
        past : 'vor %s',
        s : 'ein paar Sekunden',
        m : processRelativeTime,
        mm : '%d Minuten',
        h : processRelativeTime,
        hh : '%d Stunden',
        d : processRelativeTime,
        dd : processRelativeTime,
        M : processRelativeTime,
        MM : processRelativeTime,
        y : processRelativeTime,
        yy : processRelativeTime
    },
    dayOfMonthOrdinalParse: /\d{1,2}\./,
    ordinal : '%d.',
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 4  // The week that contains Jan 4th is the first week of the year.
    }
});

return de;

})));

},{"../moment":84}],82:[function(require,module,exports){
//! moment.js locale configuration
//! locale : English (Australia) [en-au]
//! author : Jared Morse : https://github.com/jarcoal

;(function (global, factory) {
   typeof exports === 'object' && typeof module !== 'undefined'
       && typeof require === 'function' ? factory(require('../moment')) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


var enAu = moment.defineLocale('en-au', {
    months : 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_'),
    monthsShort : 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_'),
    weekdays : 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_'),
    weekdaysShort : 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_'),
    weekdaysMin : 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_'),
    longDateFormat : {
        LT : 'h:mm A',
        LTS : 'h:mm:ss A',
        L : 'DD/MM/YYYY',
        LL : 'D MMMM YYYY',
        LLL : 'D MMMM YYYY h:mm A',
        LLLL : 'dddd, D MMMM YYYY h:mm A'
    },
    calendar : {
        sameDay : '[Today at] LT',
        nextDay : '[Tomorrow at] LT',
        nextWeek : 'dddd [at] LT',
        lastDay : '[Yesterday at] LT',
        lastWeek : '[Last] dddd [at] LT',
        sameElse : 'L'
    },
    relativeTime : {
        future : 'in %s',
        past : '%s ago',
        s : 'a few seconds',
        m : 'a minute',
        mm : '%d minutes',
        h : 'an hour',
        hh : '%d hours',
        d : 'a day',
        dd : '%d days',
        M : 'a month',
        MM : '%d months',
        y : 'a year',
        yy : '%d years'
    },
    dayOfMonthOrdinalParse: /\d{1,2}(st|nd|rd|th)/,
    ordinal : function (number) {
        var b = number % 10,
            output = (~~(number % 100 / 10) === 1) ? 'th' :
            (b === 1) ? 'st' :
            (b === 2) ? 'nd' :
            (b === 3) ? 'rd' : 'th';
        return number + output;
    },
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 4  // The week that contains Jan 4th is the first week of the year.
    }
});

return enAu;

})));

},{"../moment":84}],83:[function(require,module,exports){
//! moment.js locale configuration
//! locale : Russian [ru]
//! author : Viktorminator : https://github.com/Viktorminator
//! Author : Menelion Elensúle : https://github.com/Oire
//! author : Коренберг Марк : https://github.com/socketpair

;(function (global, factory) {
   typeof exports === 'object' && typeof module !== 'undefined'
       && typeof require === 'function' ? factory(require('../moment')) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


function plural(word, num) {
    var forms = word.split('_');
    return num % 10 === 1 && num % 100 !== 11 ? forms[0] : (num % 10 >= 2 && num % 10 <= 4 && (num % 100 < 10 || num % 100 >= 20) ? forms[1] : forms[2]);
}
function relativeTimeWithPlural(number, withoutSuffix, key) {
    var format = {
        'mm': withoutSuffix ? 'минута_минуты_минут' : 'минуту_минуты_минут',
        'hh': 'час_часа_часов',
        'dd': 'день_дня_дней',
        'MM': 'месяц_месяца_месяцев',
        'yy': 'год_года_лет'
    };
    if (key === 'm') {
        return withoutSuffix ? 'минута' : 'минуту';
    }
    else {
        return number + ' ' + plural(format[key], +number);
    }
}
var monthsParse = [/^янв/i, /^фев/i, /^мар/i, /^апр/i, /^ма[йя]/i, /^июн/i, /^июл/i, /^авг/i, /^сен/i, /^окт/i, /^ноя/i, /^дек/i];

// http://new.gramota.ru/spravka/rules/139-prop : § 103
// Сокращения месяцев: http://new.gramota.ru/spravka/buro/search-answer?s=242637
// CLDR data:          http://www.unicode.org/cldr/charts/28/summary/ru.html#1753
var ru = moment.defineLocale('ru', {
    months : {
        format: 'января_февраля_марта_апреля_мая_июня_июля_августа_сентября_октября_ноября_декабря'.split('_'),
        standalone: 'январь_февраль_март_апрель_май_июнь_июль_август_сентябрь_октябрь_ноябрь_декабрь'.split('_')
    },
    monthsShort : {
        // по CLDR именно "июл." и "июн.", но какой смысл менять букву на точку ?
        format: 'янв._февр._мар._апр._мая_июня_июля_авг._сент._окт._нояб._дек.'.split('_'),
        standalone: 'янв._февр._март_апр._май_июнь_июль_авг._сент._окт._нояб._дек.'.split('_')
    },
    weekdays : {
        standalone: 'воскресенье_понедельник_вторник_среда_четверг_пятница_суббота'.split('_'),
        format: 'воскресенье_понедельник_вторник_среду_четверг_пятницу_субботу'.split('_'),
        isFormat: /\[ ?[Вв] ?(?:прошлую|следующую|эту)? ?\] ?dddd/
    },
    weekdaysShort : 'вс_пн_вт_ср_чт_пт_сб'.split('_'),
    weekdaysMin : 'вс_пн_вт_ср_чт_пт_сб'.split('_'),
    monthsParse : monthsParse,
    longMonthsParse : monthsParse,
    shortMonthsParse : monthsParse,

    // полные названия с падежами, по три буквы, для некоторых, по 4 буквы, сокращения с точкой и без точки
    monthsRegex: /^(январ[ья]|янв\.?|феврал[ья]|февр?\.?|марта?|мар\.?|апрел[ья]|апр\.?|ма[йя]|июн[ья]|июн\.?|июл[ья]|июл\.?|августа?|авг\.?|сентябр[ья]|сент?\.?|октябр[ья]|окт\.?|ноябр[ья]|нояб?\.?|декабр[ья]|дек\.?)/i,

    // копия предыдущего
    monthsShortRegex: /^(январ[ья]|янв\.?|феврал[ья]|февр?\.?|марта?|мар\.?|апрел[ья]|апр\.?|ма[йя]|июн[ья]|июн\.?|июл[ья]|июл\.?|августа?|авг\.?|сентябр[ья]|сент?\.?|октябр[ья]|окт\.?|ноябр[ья]|нояб?\.?|декабр[ья]|дек\.?)/i,

    // полные названия с падежами
    monthsStrictRegex: /^(январ[яь]|феврал[яь]|марта?|апрел[яь]|ма[яй]|июн[яь]|июл[яь]|августа?|сентябр[яь]|октябр[яь]|ноябр[яь]|декабр[яь])/i,

    // Выражение, которое соотвествует только сокращённым формам
    monthsShortStrictRegex: /^(янв\.|февр?\.|мар[т.]|апр\.|ма[яй]|июн[ья.]|июл[ья.]|авг\.|сент?\.|окт\.|нояб?\.|дек\.)/i,
    longDateFormat : {
        LT : 'HH:mm',
        LTS : 'HH:mm:ss',
        L : 'DD.MM.YYYY',
        LL : 'D MMMM YYYY г.',
        LLL : 'D MMMM YYYY г., HH:mm',
        LLLL : 'dddd, D MMMM YYYY г., HH:mm'
    },
    calendar : {
        sameDay: '[Сегодня в] LT',
        nextDay: '[Завтра в] LT',
        lastDay: '[Вчера в] LT',
        nextWeek: function (now) {
            if (now.week() !== this.week()) {
                switch (this.day()) {
                    case 0:
                        return '[В следующее] dddd [в] LT';
                    case 1:
                    case 2:
                    case 4:
                        return '[В следующий] dddd [в] LT';
                    case 3:
                    case 5:
                    case 6:
                        return '[В следующую] dddd [в] LT';
                }
            } else {
                if (this.day() === 2) {
                    return '[Во] dddd [в] LT';
                } else {
                    return '[В] dddd [в] LT';
                }
            }
        },
        lastWeek: function (now) {
            if (now.week() !== this.week()) {
                switch (this.day()) {
                    case 0:
                        return '[В прошлое] dddd [в] LT';
                    case 1:
                    case 2:
                    case 4:
                        return '[В прошлый] dddd [в] LT';
                    case 3:
                    case 5:
                    case 6:
                        return '[В прошлую] dddd [в] LT';
                }
            } else {
                if (this.day() === 2) {
                    return '[Во] dddd [в] LT';
                } else {
                    return '[В] dddd [в] LT';
                }
            }
        },
        sameElse: 'L'
    },
    relativeTime : {
        future : 'через %s',
        past : '%s назад',
        s : 'несколько секунд',
        m : relativeTimeWithPlural,
        mm : relativeTimeWithPlural,
        h : 'час',
        hh : relativeTimeWithPlural,
        d : 'день',
        dd : relativeTimeWithPlural,
        M : 'месяц',
        MM : relativeTimeWithPlural,
        y : 'год',
        yy : relativeTimeWithPlural
    },
    meridiemParse: /ночи|утра|дня|вечера/i,
    isPM : function (input) {
        return /^(дня|вечера)$/.test(input);
    },
    meridiem : function (hour, minute, isLower) {
        if (hour < 4) {
            return 'ночи';
        } else if (hour < 12) {
            return 'утра';
        } else if (hour < 17) {
            return 'дня';
        } else {
            return 'вечера';
        }
    },
    dayOfMonthOrdinalParse: /\d{1,2}-(й|го|я)/,
    ordinal: function (number, period) {
        switch (period) {
            case 'M':
            case 'd':
            case 'DDD':
                return number + '-й';
            case 'D':
                return number + '-го';
            case 'w':
            case 'W':
                return number + '-я';
            default:
                return number;
        }
    },
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 7  // The week that contains Jan 1st is the first week of the year.
    }
});

return ru;

})));

},{"../moment":84}],84:[function(require,module,exports){
//! moment.js
//! version : 2.18.1
//! authors : Tim Wood, Iskren Chernev, Moment.js contributors
//! license : MIT
//! momentjs.com

;(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    global.moment = factory()
}(this, (function () { 'use strict';

var hookCallback;

function hooks () {
    return hookCallback.apply(null, arguments);
}

// This is done to register the method called with moment()
// without creating circular dependencies.
function setHookCallback (callback) {
    hookCallback = callback;
}

function isArray(input) {
    return input instanceof Array || Object.prototype.toString.call(input) === '[object Array]';
}

function isObject(input) {
    // IE8 will treat undefined and null as object if it wasn't for
    // input != null
    return input != null && Object.prototype.toString.call(input) === '[object Object]';
}

function isObjectEmpty(obj) {
    var k;
    for (k in obj) {
        // even if its not own property I'd still call it non-empty
        return false;
    }
    return true;
}

function isUndefined(input) {
    return input === void 0;
}

function isNumber(input) {
    return typeof input === 'number' || Object.prototype.toString.call(input) === '[object Number]';
}

function isDate(input) {
    return input instanceof Date || Object.prototype.toString.call(input) === '[object Date]';
}

function map(arr, fn) {
    var res = [], i;
    for (i = 0; i < arr.length; ++i) {
        res.push(fn(arr[i], i));
    }
    return res;
}

function hasOwnProp(a, b) {
    return Object.prototype.hasOwnProperty.call(a, b);
}

function extend(a, b) {
    for (var i in b) {
        if (hasOwnProp(b, i)) {
            a[i] = b[i];
        }
    }

    if (hasOwnProp(b, 'toString')) {
        a.toString = b.toString;
    }

    if (hasOwnProp(b, 'valueOf')) {
        a.valueOf = b.valueOf;
    }

    return a;
}

function createUTC (input, format, locale, strict) {
    return createLocalOrUTC(input, format, locale, strict, true).utc();
}

function defaultParsingFlags() {
    // We need to deep clone this object.
    return {
        empty           : false,
        unusedTokens    : [],
        unusedInput     : [],
        overflow        : -2,
        charsLeftOver   : 0,
        nullInput       : false,
        invalidMonth    : null,
        invalidFormat   : false,
        userInvalidated : false,
        iso             : false,
        parsedDateParts : [],
        meridiem        : null,
        rfc2822         : false,
        weekdayMismatch : false
    };
}

function getParsingFlags(m) {
    if (m._pf == null) {
        m._pf = defaultParsingFlags();
    }
    return m._pf;
}

var some;
if (Array.prototype.some) {
    some = Array.prototype.some;
} else {
    some = function (fun) {
        var t = Object(this);
        var len = t.length >>> 0;

        for (var i = 0; i < len; i++) {
            if (i in t && fun.call(this, t[i], i, t)) {
                return true;
            }
        }

        return false;
    };
}

var some$1 = some;

function isValid(m) {
    if (m._isValid == null) {
        var flags = getParsingFlags(m);
        var parsedParts = some$1.call(flags.parsedDateParts, function (i) {
            return i != null;
        });
        var isNowValid = !isNaN(m._d.getTime()) &&
            flags.overflow < 0 &&
            !flags.empty &&
            !flags.invalidMonth &&
            !flags.invalidWeekday &&
            !flags.nullInput &&
            !flags.invalidFormat &&
            !flags.userInvalidated &&
            (!flags.meridiem || (flags.meridiem && parsedParts));

        if (m._strict) {
            isNowValid = isNowValid &&
                flags.charsLeftOver === 0 &&
                flags.unusedTokens.length === 0 &&
                flags.bigHour === undefined;
        }

        if (Object.isFrozen == null || !Object.isFrozen(m)) {
            m._isValid = isNowValid;
        }
        else {
            return isNowValid;
        }
    }
    return m._isValid;
}

function createInvalid (flags) {
    var m = createUTC(NaN);
    if (flags != null) {
        extend(getParsingFlags(m), flags);
    }
    else {
        getParsingFlags(m).userInvalidated = true;
    }

    return m;
}

// Plugins that add properties should also add the key here (null value),
// so we can properly clone ourselves.
var momentProperties = hooks.momentProperties = [];

function copyConfig(to, from) {
    var i, prop, val;

    if (!isUndefined(from._isAMomentObject)) {
        to._isAMomentObject = from._isAMomentObject;
    }
    if (!isUndefined(from._i)) {
        to._i = from._i;
    }
    if (!isUndefined(from._f)) {
        to._f = from._f;
    }
    if (!isUndefined(from._l)) {
        to._l = from._l;
    }
    if (!isUndefined(from._strict)) {
        to._strict = from._strict;
    }
    if (!isUndefined(from._tzm)) {
        to._tzm = from._tzm;
    }
    if (!isUndefined(from._isUTC)) {
        to._isUTC = from._isUTC;
    }
    if (!isUndefined(from._offset)) {
        to._offset = from._offset;
    }
    if (!isUndefined(from._pf)) {
        to._pf = getParsingFlags(from);
    }
    if (!isUndefined(from._locale)) {
        to._locale = from._locale;
    }

    if (momentProperties.length > 0) {
        for (i = 0; i < momentProperties.length; i++) {
            prop = momentProperties[i];
            val = from[prop];
            if (!isUndefined(val)) {
                to[prop] = val;
            }
        }
    }

    return to;
}

var updateInProgress = false;

// Moment prototype object
function Moment(config) {
    copyConfig(this, config);
    this._d = new Date(config._d != null ? config._d.getTime() : NaN);
    if (!this.isValid()) {
        this._d = new Date(NaN);
    }
    // Prevent infinite loop in case updateOffset creates new moment
    // objects.
    if (updateInProgress === false) {
        updateInProgress = true;
        hooks.updateOffset(this);
        updateInProgress = false;
    }
}

function isMoment (obj) {
    return obj instanceof Moment || (obj != null && obj._isAMomentObject != null);
}

function absFloor (number) {
    if (number < 0) {
        // -0 -> 0
        return Math.ceil(number) || 0;
    } else {
        return Math.floor(number);
    }
}

function toInt(argumentForCoercion) {
    var coercedNumber = +argumentForCoercion,
        value = 0;

    if (coercedNumber !== 0 && isFinite(coercedNumber)) {
        value = absFloor(coercedNumber);
    }

    return value;
}

// compare two arrays, return the number of differences
function compareArrays(array1, array2, dontConvert) {
    var len = Math.min(array1.length, array2.length),
        lengthDiff = Math.abs(array1.length - array2.length),
        diffs = 0,
        i;
    for (i = 0; i < len; i++) {
        if ((dontConvert && array1[i] !== array2[i]) ||
            (!dontConvert && toInt(array1[i]) !== toInt(array2[i]))) {
            diffs++;
        }
    }
    return diffs + lengthDiff;
}

function warn(msg) {
    if (hooks.suppressDeprecationWarnings === false &&
            (typeof console !==  'undefined') && console.warn) {
        console.warn('Deprecation warning: ' + msg);
    }
}

function deprecate(msg, fn) {
    var firstTime = true;

    return extend(function () {
        if (hooks.deprecationHandler != null) {
            hooks.deprecationHandler(null, msg);
        }
        if (firstTime) {
            var args = [];
            var arg;
            for (var i = 0; i < arguments.length; i++) {
                arg = '';
                if (typeof arguments[i] === 'object') {
                    arg += '\n[' + i + '] ';
                    for (var key in arguments[0]) {
                        arg += key + ': ' + arguments[0][key] + ', ';
                    }
                    arg = arg.slice(0, -2); // Remove trailing comma and space
                } else {
                    arg = arguments[i];
                }
                args.push(arg);
            }
            warn(msg + '\nArguments: ' + Array.prototype.slice.call(args).join('') + '\n' + (new Error()).stack);
            firstTime = false;
        }
        return fn.apply(this, arguments);
    }, fn);
}

var deprecations = {};

function deprecateSimple(name, msg) {
    if (hooks.deprecationHandler != null) {
        hooks.deprecationHandler(name, msg);
    }
    if (!deprecations[name]) {
        warn(msg);
        deprecations[name] = true;
    }
}

hooks.suppressDeprecationWarnings = false;
hooks.deprecationHandler = null;

function isFunction(input) {
    return input instanceof Function || Object.prototype.toString.call(input) === '[object Function]';
}

function set (config) {
    var prop, i;
    for (i in config) {
        prop = config[i];
        if (isFunction(prop)) {
            this[i] = prop;
        } else {
            this['_' + i] = prop;
        }
    }
    this._config = config;
    // Lenient ordinal parsing accepts just a number in addition to
    // number + (possibly) stuff coming from _dayOfMonthOrdinalParse.
    // TODO: Remove "ordinalParse" fallback in next major release.
    this._dayOfMonthOrdinalParseLenient = new RegExp(
        (this._dayOfMonthOrdinalParse.source || this._ordinalParse.source) +
            '|' + (/\d{1,2}/).source);
}

function mergeConfigs(parentConfig, childConfig) {
    var res = extend({}, parentConfig), prop;
    for (prop in childConfig) {
        if (hasOwnProp(childConfig, prop)) {
            if (isObject(parentConfig[prop]) && isObject(childConfig[prop])) {
                res[prop] = {};
                extend(res[prop], parentConfig[prop]);
                extend(res[prop], childConfig[prop]);
            } else if (childConfig[prop] != null) {
                res[prop] = childConfig[prop];
            } else {
                delete res[prop];
            }
        }
    }
    for (prop in parentConfig) {
        if (hasOwnProp(parentConfig, prop) &&
                !hasOwnProp(childConfig, prop) &&
                isObject(parentConfig[prop])) {
            // make sure changes to properties don't modify parent config
            res[prop] = extend({}, res[prop]);
        }
    }
    return res;
}

function Locale(config) {
    if (config != null) {
        this.set(config);
    }
}

var keys;

if (Object.keys) {
    keys = Object.keys;
} else {
    keys = function (obj) {
        var i, res = [];
        for (i in obj) {
            if (hasOwnProp(obj, i)) {
                res.push(i);
            }
        }
        return res;
    };
}

var keys$1 = keys;

var defaultCalendar = {
    sameDay : '[Today at] LT',
    nextDay : '[Tomorrow at] LT',
    nextWeek : 'dddd [at] LT',
    lastDay : '[Yesterday at] LT',
    lastWeek : '[Last] dddd [at] LT',
    sameElse : 'L'
};

function calendar (key, mom, now) {
    var output = this._calendar[key] || this._calendar['sameElse'];
    return isFunction(output) ? output.call(mom, now) : output;
}

var defaultLongDateFormat = {
    LTS  : 'h:mm:ss A',
    LT   : 'h:mm A',
    L    : 'MM/DD/YYYY',
    LL   : 'MMMM D, YYYY',
    LLL  : 'MMMM D, YYYY h:mm A',
    LLLL : 'dddd, MMMM D, YYYY h:mm A'
};

function longDateFormat (key) {
    var format = this._longDateFormat[key],
        formatUpper = this._longDateFormat[key.toUpperCase()];

    if (format || !formatUpper) {
        return format;
    }

    this._longDateFormat[key] = formatUpper.replace(/MMMM|MM|DD|dddd/g, function (val) {
        return val.slice(1);
    });

    return this._longDateFormat[key];
}

var defaultInvalidDate = 'Invalid date';

function invalidDate () {
    return this._invalidDate;
}

var defaultOrdinal = '%d';
var defaultDayOfMonthOrdinalParse = /\d{1,2}/;

function ordinal (number) {
    return this._ordinal.replace('%d', number);
}

var defaultRelativeTime = {
    future : 'in %s',
    past   : '%s ago',
    s  : 'a few seconds',
    ss : '%d seconds',
    m  : 'a minute',
    mm : '%d minutes',
    h  : 'an hour',
    hh : '%d hours',
    d  : 'a day',
    dd : '%d days',
    M  : 'a month',
    MM : '%d months',
    y  : 'a year',
    yy : '%d years'
};

function relativeTime (number, withoutSuffix, string, isFuture) {
    var output = this._relativeTime[string];
    return (isFunction(output)) ?
        output(number, withoutSuffix, string, isFuture) :
        output.replace(/%d/i, number);
}

function pastFuture (diff, output) {
    var format = this._relativeTime[diff > 0 ? 'future' : 'past'];
    return isFunction(format) ? format(output) : format.replace(/%s/i, output);
}

var aliases = {};

function addUnitAlias (unit, shorthand) {
    var lowerCase = unit.toLowerCase();
    aliases[lowerCase] = aliases[lowerCase + 's'] = aliases[shorthand] = unit;
}

function normalizeUnits(units) {
    return typeof units === 'string' ? aliases[units] || aliases[units.toLowerCase()] : undefined;
}

function normalizeObjectUnits(inputObject) {
    var normalizedInput = {},
        normalizedProp,
        prop;

    for (prop in inputObject) {
        if (hasOwnProp(inputObject, prop)) {
            normalizedProp = normalizeUnits(prop);
            if (normalizedProp) {
                normalizedInput[normalizedProp] = inputObject[prop];
            }
        }
    }

    return normalizedInput;
}

var priorities = {};

function addUnitPriority(unit, priority) {
    priorities[unit] = priority;
}

function getPrioritizedUnits(unitsObj) {
    var units = [];
    for (var u in unitsObj) {
        units.push({unit: u, priority: priorities[u]});
    }
    units.sort(function (a, b) {
        return a.priority - b.priority;
    });
    return units;
}

function makeGetSet (unit, keepTime) {
    return function (value) {
        if (value != null) {
            set$1(this, unit, value);
            hooks.updateOffset(this, keepTime);
            return this;
        } else {
            return get(this, unit);
        }
    };
}

function get (mom, unit) {
    return mom.isValid() ?
        mom._d['get' + (mom._isUTC ? 'UTC' : '') + unit]() : NaN;
}

function set$1 (mom, unit, value) {
    if (mom.isValid()) {
        mom._d['set' + (mom._isUTC ? 'UTC' : '') + unit](value);
    }
}

// MOMENTS

function stringGet (units) {
    units = normalizeUnits(units);
    if (isFunction(this[units])) {
        return this[units]();
    }
    return this;
}


function stringSet (units, value) {
    if (typeof units === 'object') {
        units = normalizeObjectUnits(units);
        var prioritized = getPrioritizedUnits(units);
        for (var i = 0; i < prioritized.length; i++) {
            this[prioritized[i].unit](units[prioritized[i].unit]);
        }
    } else {
        units = normalizeUnits(units);
        if (isFunction(this[units])) {
            return this[units](value);
        }
    }
    return this;
}

function zeroFill(number, targetLength, forceSign) {
    var absNumber = '' + Math.abs(number),
        zerosToFill = targetLength - absNumber.length,
        sign = number >= 0;
    return (sign ? (forceSign ? '+' : '') : '-') +
        Math.pow(10, Math.max(0, zerosToFill)).toString().substr(1) + absNumber;
}

var formattingTokens = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g;

var localFormattingTokens = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g;

var formatFunctions = {};

var formatTokenFunctions = {};

// token:    'M'
// padded:   ['MM', 2]
// ordinal:  'Mo'
// callback: function () { this.month() + 1 }
function addFormatToken (token, padded, ordinal, callback) {
    var func = callback;
    if (typeof callback === 'string') {
        func = function () {
            return this[callback]();
        };
    }
    if (token) {
        formatTokenFunctions[token] = func;
    }
    if (padded) {
        formatTokenFunctions[padded[0]] = function () {
            return zeroFill(func.apply(this, arguments), padded[1], padded[2]);
        };
    }
    if (ordinal) {
        formatTokenFunctions[ordinal] = function () {
            return this.localeData().ordinal(func.apply(this, arguments), token);
        };
    }
}

function removeFormattingTokens(input) {
    if (input.match(/\[[\s\S]/)) {
        return input.replace(/^\[|\]$/g, '');
    }
    return input.replace(/\\/g, '');
}

function makeFormatFunction(format) {
    var array = format.match(formattingTokens), i, length;

    for (i = 0, length = array.length; i < length; i++) {
        if (formatTokenFunctions[array[i]]) {
            array[i] = formatTokenFunctions[array[i]];
        } else {
            array[i] = removeFormattingTokens(array[i]);
        }
    }

    return function (mom) {
        var output = '', i;
        for (i = 0; i < length; i++) {
            output += isFunction(array[i]) ? array[i].call(mom, format) : array[i];
        }
        return output;
    };
}

// format date using native date object
function formatMoment(m, format) {
    if (!m.isValid()) {
        return m.localeData().invalidDate();
    }

    format = expandFormat(format, m.localeData());
    formatFunctions[format] = formatFunctions[format] || makeFormatFunction(format);

    return formatFunctions[format](m);
}

function expandFormat(format, locale) {
    var i = 5;

    function replaceLongDateFormatTokens(input) {
        return locale.longDateFormat(input) || input;
    }

    localFormattingTokens.lastIndex = 0;
    while (i >= 0 && localFormattingTokens.test(format)) {
        format = format.replace(localFormattingTokens, replaceLongDateFormatTokens);
        localFormattingTokens.lastIndex = 0;
        i -= 1;
    }

    return format;
}

var match1         = /\d/;            //       0 - 9
var match2         = /\d\d/;          //      00 - 99
var match3         = /\d{3}/;         //     000 - 999
var match4         = /\d{4}/;         //    0000 - 9999
var match6         = /[+-]?\d{6}/;    // -999999 - 999999
var match1to2      = /\d\d?/;         //       0 - 99
var match3to4      = /\d\d\d\d?/;     //     999 - 9999
var match5to6      = /\d\d\d\d\d\d?/; //   99999 - 999999
var match1to3      = /\d{1,3}/;       //       0 - 999
var match1to4      = /\d{1,4}/;       //       0 - 9999
var match1to6      = /[+-]?\d{1,6}/;  // -999999 - 999999

var matchUnsigned  = /\d+/;           //       0 - inf
var matchSigned    = /[+-]?\d+/;      //    -inf - inf

var matchOffset    = /Z|[+-]\d\d:?\d\d/gi; // +00:00 -00:00 +0000 -0000 or Z
var matchShortOffset = /Z|[+-]\d\d(?::?\d\d)?/gi; // +00 -00 +00:00 -00:00 +0000 -0000 or Z

var matchTimestamp = /[+-]?\d+(\.\d{1,3})?/; // 123456789 123456789.123

// any word (or two) characters or numbers including two/three word month in arabic.
// includes scottish gaelic two word and hyphenated months
var matchWord = /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i;


var regexes = {};

function addRegexToken (token, regex, strictRegex) {
    regexes[token] = isFunction(regex) ? regex : function (isStrict, localeData) {
        return (isStrict && strictRegex) ? strictRegex : regex;
    };
}

function getParseRegexForToken (token, config) {
    if (!hasOwnProp(regexes, token)) {
        return new RegExp(unescapeFormat(token));
    }

    return regexes[token](config._strict, config._locale);
}

// Code from http://stackoverflow.com/questions/3561493/is-there-a-regexp-escape-function-in-javascript
function unescapeFormat(s) {
    return regexEscape(s.replace('\\', '').replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function (matched, p1, p2, p3, p4) {
        return p1 || p2 || p3 || p4;
    }));
}

function regexEscape(s) {
    return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
}

var tokens = {};

function addParseToken (token, callback) {
    var i, func = callback;
    if (typeof token === 'string') {
        token = [token];
    }
    if (isNumber(callback)) {
        func = function (input, array) {
            array[callback] = toInt(input);
        };
    }
    for (i = 0; i < token.length; i++) {
        tokens[token[i]] = func;
    }
}

function addWeekParseToken (token, callback) {
    addParseToken(token, function (input, array, config, token) {
        config._w = config._w || {};
        callback(input, config._w, config, token);
    });
}

function addTimeToArrayFromToken(token, input, config) {
    if (input != null && hasOwnProp(tokens, token)) {
        tokens[token](input, config._a, config, token);
    }
}

var YEAR = 0;
var MONTH = 1;
var DATE = 2;
var HOUR = 3;
var MINUTE = 4;
var SECOND = 5;
var MILLISECOND = 6;
var WEEK = 7;
var WEEKDAY = 8;

var indexOf;

if (Array.prototype.indexOf) {
    indexOf = Array.prototype.indexOf;
} else {
    indexOf = function (o) {
        // I know
        var i;
        for (i = 0; i < this.length; ++i) {
            if (this[i] === o) {
                return i;
            }
        }
        return -1;
    };
}

var indexOf$1 = indexOf;

function daysInMonth(year, month) {
    return new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
}

// FORMATTING

addFormatToken('M', ['MM', 2], 'Mo', function () {
    return this.month() + 1;
});

addFormatToken('MMM', 0, 0, function (format) {
    return this.localeData().monthsShort(this, format);
});

addFormatToken('MMMM', 0, 0, function (format) {
    return this.localeData().months(this, format);
});

// ALIASES

addUnitAlias('month', 'M');

// PRIORITY

addUnitPriority('month', 8);

// PARSING

addRegexToken('M',    match1to2);
addRegexToken('MM',   match1to2, match2);
addRegexToken('MMM',  function (isStrict, locale) {
    return locale.monthsShortRegex(isStrict);
});
addRegexToken('MMMM', function (isStrict, locale) {
    return locale.monthsRegex(isStrict);
});

addParseToken(['M', 'MM'], function (input, array) {
    array[MONTH] = toInt(input) - 1;
});

addParseToken(['MMM', 'MMMM'], function (input, array, config, token) {
    var month = config._locale.monthsParse(input, token, config._strict);
    // if we didn't find a month name, mark the date as invalid.
    if (month != null) {
        array[MONTH] = month;
    } else {
        getParsingFlags(config).invalidMonth = input;
    }
});

// LOCALES

var MONTHS_IN_FORMAT = /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/;
var defaultLocaleMonths = 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_');
function localeMonths (m, format) {
    if (!m) {
        return isArray(this._months) ? this._months :
            this._months['standalone'];
    }
    return isArray(this._months) ? this._months[m.month()] :
        this._months[(this._months.isFormat || MONTHS_IN_FORMAT).test(format) ? 'format' : 'standalone'][m.month()];
}

var defaultLocaleMonthsShort = 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_');
function localeMonthsShort (m, format) {
    if (!m) {
        return isArray(this._monthsShort) ? this._monthsShort :
            this._monthsShort['standalone'];
    }
    return isArray(this._monthsShort) ? this._monthsShort[m.month()] :
        this._monthsShort[MONTHS_IN_FORMAT.test(format) ? 'format' : 'standalone'][m.month()];
}

function handleStrictParse(monthName, format, strict) {
    var i, ii, mom, llc = monthName.toLocaleLowerCase();
    if (!this._monthsParse) {
        // this is not used
        this._monthsParse = [];
        this._longMonthsParse = [];
        this._shortMonthsParse = [];
        for (i = 0; i < 12; ++i) {
            mom = createUTC([2000, i]);
            this._shortMonthsParse[i] = this.monthsShort(mom, '').toLocaleLowerCase();
            this._longMonthsParse[i] = this.months(mom, '').toLocaleLowerCase();
        }
    }

    if (strict) {
        if (format === 'MMM') {
            ii = indexOf$1.call(this._shortMonthsParse, llc);
            return ii !== -1 ? ii : null;
        } else {
            ii = indexOf$1.call(this._longMonthsParse, llc);
            return ii !== -1 ? ii : null;
        }
    } else {
        if (format === 'MMM') {
            ii = indexOf$1.call(this._shortMonthsParse, llc);
            if (ii !== -1) {
                return ii;
            }
            ii = indexOf$1.call(this._longMonthsParse, llc);
            return ii !== -1 ? ii : null;
        } else {
            ii = indexOf$1.call(this._longMonthsParse, llc);
            if (ii !== -1) {
                return ii;
            }
            ii = indexOf$1.call(this._shortMonthsParse, llc);
            return ii !== -1 ? ii : null;
        }
    }
}

function localeMonthsParse (monthName, format, strict) {
    var i, mom, regex;

    if (this._monthsParseExact) {
        return handleStrictParse.call(this, monthName, format, strict);
    }

    if (!this._monthsParse) {
        this._monthsParse = [];
        this._longMonthsParse = [];
        this._shortMonthsParse = [];
    }

    // TODO: add sorting
    // Sorting makes sure if one month (or abbr) is a prefix of another
    // see sorting in computeMonthsParse
    for (i = 0; i < 12; i++) {
        // make the regex if we don't have it already
        mom = createUTC([2000, i]);
        if (strict && !this._longMonthsParse[i]) {
            this._longMonthsParse[i] = new RegExp('^' + this.months(mom, '').replace('.', '') + '$', 'i');
            this._shortMonthsParse[i] = new RegExp('^' + this.monthsShort(mom, '').replace('.', '') + '$', 'i');
        }
        if (!strict && !this._monthsParse[i]) {
            regex = '^' + this.months(mom, '') + '|^' + this.monthsShort(mom, '');
            this._monthsParse[i] = new RegExp(regex.replace('.', ''), 'i');
        }
        // test the regex
        if (strict && format === 'MMMM' && this._longMonthsParse[i].test(monthName)) {
            return i;
        } else if (strict && format === 'MMM' && this._shortMonthsParse[i].test(monthName)) {
            return i;
        } else if (!strict && this._monthsParse[i].test(monthName)) {
            return i;
        }
    }
}

// MOMENTS

function setMonth (mom, value) {
    var dayOfMonth;

    if (!mom.isValid()) {
        // No op
        return mom;
    }

    if (typeof value === 'string') {
        if (/^\d+$/.test(value)) {
            value = toInt(value);
        } else {
            value = mom.localeData().monthsParse(value);
            // TODO: Another silent failure?
            if (!isNumber(value)) {
                return mom;
            }
        }
    }

    dayOfMonth = Math.min(mom.date(), daysInMonth(mom.year(), value));
    mom._d['set' + (mom._isUTC ? 'UTC' : '') + 'Month'](value, dayOfMonth);
    return mom;
}

function getSetMonth (value) {
    if (value != null) {
        setMonth(this, value);
        hooks.updateOffset(this, true);
        return this;
    } else {
        return get(this, 'Month');
    }
}

function getDaysInMonth () {
    return daysInMonth(this.year(), this.month());
}

var defaultMonthsShortRegex = matchWord;
function monthsShortRegex (isStrict) {
    if (this._monthsParseExact) {
        if (!hasOwnProp(this, '_monthsRegex')) {
            computeMonthsParse.call(this);
        }
        if (isStrict) {
            return this._monthsShortStrictRegex;
        } else {
            return this._monthsShortRegex;
        }
    } else {
        if (!hasOwnProp(this, '_monthsShortRegex')) {
            this._monthsShortRegex = defaultMonthsShortRegex;
        }
        return this._monthsShortStrictRegex && isStrict ?
            this._monthsShortStrictRegex : this._monthsShortRegex;
    }
}

var defaultMonthsRegex = matchWord;
function monthsRegex (isStrict) {
    if (this._monthsParseExact) {
        if (!hasOwnProp(this, '_monthsRegex')) {
            computeMonthsParse.call(this);
        }
        if (isStrict) {
            return this._monthsStrictRegex;
        } else {
            return this._monthsRegex;
        }
    } else {
        if (!hasOwnProp(this, '_monthsRegex')) {
            this._monthsRegex = defaultMonthsRegex;
        }
        return this._monthsStrictRegex && isStrict ?
            this._monthsStrictRegex : this._monthsRegex;
    }
}

function computeMonthsParse () {
    function cmpLenRev(a, b) {
        return b.length - a.length;
    }

    var shortPieces = [], longPieces = [], mixedPieces = [],
        i, mom;
    for (i = 0; i < 12; i++) {
        // make the regex if we don't have it already
        mom = createUTC([2000, i]);
        shortPieces.push(this.monthsShort(mom, ''));
        longPieces.push(this.months(mom, ''));
        mixedPieces.push(this.months(mom, ''));
        mixedPieces.push(this.monthsShort(mom, ''));
    }
    // Sorting makes sure if one month (or abbr) is a prefix of another it
    // will match the longer piece.
    shortPieces.sort(cmpLenRev);
    longPieces.sort(cmpLenRev);
    mixedPieces.sort(cmpLenRev);
    for (i = 0; i < 12; i++) {
        shortPieces[i] = regexEscape(shortPieces[i]);
        longPieces[i] = regexEscape(longPieces[i]);
    }
    for (i = 0; i < 24; i++) {
        mixedPieces[i] = regexEscape(mixedPieces[i]);
    }

    this._monthsRegex = new RegExp('^(' + mixedPieces.join('|') + ')', 'i');
    this._monthsShortRegex = this._monthsRegex;
    this._monthsStrictRegex = new RegExp('^(' + longPieces.join('|') + ')', 'i');
    this._monthsShortStrictRegex = new RegExp('^(' + shortPieces.join('|') + ')', 'i');
}

// FORMATTING

addFormatToken('Y', 0, 0, function () {
    var y = this.year();
    return y <= 9999 ? '' + y : '+' + y;
});

addFormatToken(0, ['YY', 2], 0, function () {
    return this.year() % 100;
});

addFormatToken(0, ['YYYY',   4],       0, 'year');
addFormatToken(0, ['YYYYY',  5],       0, 'year');
addFormatToken(0, ['YYYYYY', 6, true], 0, 'year');

// ALIASES

addUnitAlias('year', 'y');

// PRIORITIES

addUnitPriority('year', 1);

// PARSING

addRegexToken('Y',      matchSigned);
addRegexToken('YY',     match1to2, match2);
addRegexToken('YYYY',   match1to4, match4);
addRegexToken('YYYYY',  match1to6, match6);
addRegexToken('YYYYYY', match1to6, match6);

addParseToken(['YYYYY', 'YYYYYY'], YEAR);
addParseToken('YYYY', function (input, array) {
    array[YEAR] = input.length === 2 ? hooks.parseTwoDigitYear(input) : toInt(input);
});
addParseToken('YY', function (input, array) {
    array[YEAR] = hooks.parseTwoDigitYear(input);
});
addParseToken('Y', function (input, array) {
    array[YEAR] = parseInt(input, 10);
});

// HELPERS

function daysInYear(year) {
    return isLeapYear(year) ? 366 : 365;
}

function isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

// HOOKS

hooks.parseTwoDigitYear = function (input) {
    return toInt(input) + (toInt(input) > 68 ? 1900 : 2000);
};

// MOMENTS

var getSetYear = makeGetSet('FullYear', true);

function getIsLeapYear () {
    return isLeapYear(this.year());
}

function createDate (y, m, d, h, M, s, ms) {
    // can't just apply() to create a date:
    // https://stackoverflow.com/q/181348
    var date = new Date(y, m, d, h, M, s, ms);

    // the date constructor remaps years 0-99 to 1900-1999
    if (y < 100 && y >= 0 && isFinite(date.getFullYear())) {
        date.setFullYear(y);
    }
    return date;
}

function createUTCDate (y) {
    var date = new Date(Date.UTC.apply(null, arguments));

    // the Date.UTC function remaps years 0-99 to 1900-1999
    if (y < 100 && y >= 0 && isFinite(date.getUTCFullYear())) {
        date.setUTCFullYear(y);
    }
    return date;
}

// start-of-first-week - start-of-year
function firstWeekOffset(year, dow, doy) {
    var // first-week day -- which january is always in the first week (4 for iso, 1 for other)
        fwd = 7 + dow - doy,
        // first-week day local weekday -- which local weekday is fwd
        fwdlw = (7 + createUTCDate(year, 0, fwd).getUTCDay() - dow) % 7;

    return -fwdlw + fwd - 1;
}

// https://en.wikipedia.org/wiki/ISO_week_date#Calculating_a_date_given_the_year.2C_week_number_and_weekday
function dayOfYearFromWeeks(year, week, weekday, dow, doy) {
    var localWeekday = (7 + weekday - dow) % 7,
        weekOffset = firstWeekOffset(year, dow, doy),
        dayOfYear = 1 + 7 * (week - 1) + localWeekday + weekOffset,
        resYear, resDayOfYear;

    if (dayOfYear <= 0) {
        resYear = year - 1;
        resDayOfYear = daysInYear(resYear) + dayOfYear;
    } else if (dayOfYear > daysInYear(year)) {
        resYear = year + 1;
        resDayOfYear = dayOfYear - daysInYear(year);
    } else {
        resYear = year;
        resDayOfYear = dayOfYear;
    }

    return {
        year: resYear,
        dayOfYear: resDayOfYear
    };
}

function weekOfYear(mom, dow, doy) {
    var weekOffset = firstWeekOffset(mom.year(), dow, doy),
        week = Math.floor((mom.dayOfYear() - weekOffset - 1) / 7) + 1,
        resWeek, resYear;

    if (week < 1) {
        resYear = mom.year() - 1;
        resWeek = week + weeksInYear(resYear, dow, doy);
    } else if (week > weeksInYear(mom.year(), dow, doy)) {
        resWeek = week - weeksInYear(mom.year(), dow, doy);
        resYear = mom.year() + 1;
    } else {
        resYear = mom.year();
        resWeek = week;
    }

    return {
        week: resWeek,
        year: resYear
    };
}

function weeksInYear(year, dow, doy) {
    var weekOffset = firstWeekOffset(year, dow, doy),
        weekOffsetNext = firstWeekOffset(year + 1, dow, doy);
    return (daysInYear(year) - weekOffset + weekOffsetNext) / 7;
}

// FORMATTING

addFormatToken('w', ['ww', 2], 'wo', 'week');
addFormatToken('W', ['WW', 2], 'Wo', 'isoWeek');

// ALIASES

addUnitAlias('week', 'w');
addUnitAlias('isoWeek', 'W');

// PRIORITIES

addUnitPriority('week', 5);
addUnitPriority('isoWeek', 5);

// PARSING

addRegexToken('w',  match1to2);
addRegexToken('ww', match1to2, match2);
addRegexToken('W',  match1to2);
addRegexToken('WW', match1to2, match2);

addWeekParseToken(['w', 'ww', 'W', 'WW'], function (input, week, config, token) {
    week[token.substr(0, 1)] = toInt(input);
});

// HELPERS

// LOCALES

function localeWeek (mom) {
    return weekOfYear(mom, this._week.dow, this._week.doy).week;
}

var defaultLocaleWeek = {
    dow : 0, // Sunday is the first day of the week.
    doy : 6  // The week that contains Jan 1st is the first week of the year.
};

function localeFirstDayOfWeek () {
    return this._week.dow;
}

function localeFirstDayOfYear () {
    return this._week.doy;
}

// MOMENTS

function getSetWeek (input) {
    var week = this.localeData().week(this);
    return input == null ? week : this.add((input - week) * 7, 'd');
}

function getSetISOWeek (input) {
    var week = weekOfYear(this, 1, 4).week;
    return input == null ? week : this.add((input - week) * 7, 'd');
}

// FORMATTING

addFormatToken('d', 0, 'do', 'day');

addFormatToken('dd', 0, 0, function (format) {
    return this.localeData().weekdaysMin(this, format);
});

addFormatToken('ddd', 0, 0, function (format) {
    return this.localeData().weekdaysShort(this, format);
});

addFormatToken('dddd', 0, 0, function (format) {
    return this.localeData().weekdays(this, format);
});

addFormatToken('e', 0, 0, 'weekday');
addFormatToken('E', 0, 0, 'isoWeekday');

// ALIASES

addUnitAlias('day', 'd');
addUnitAlias('weekday', 'e');
addUnitAlias('isoWeekday', 'E');

// PRIORITY
addUnitPriority('day', 11);
addUnitPriority('weekday', 11);
addUnitPriority('isoWeekday', 11);

// PARSING

addRegexToken('d',    match1to2);
addRegexToken('e',    match1to2);
addRegexToken('E',    match1to2);
addRegexToken('dd',   function (isStrict, locale) {
    return locale.weekdaysMinRegex(isStrict);
});
addRegexToken('ddd',   function (isStrict, locale) {
    return locale.weekdaysShortRegex(isStrict);
});
addRegexToken('dddd',   function (isStrict, locale) {
    return locale.weekdaysRegex(isStrict);
});

addWeekParseToken(['dd', 'ddd', 'dddd'], function (input, week, config, token) {
    var weekday = config._locale.weekdaysParse(input, token, config._strict);
    // if we didn't get a weekday name, mark the date as invalid
    if (weekday != null) {
        week.d = weekday;
    } else {
        getParsingFlags(config).invalidWeekday = input;
    }
});

addWeekParseToken(['d', 'e', 'E'], function (input, week, config, token) {
    week[token] = toInt(input);
});

// HELPERS

function parseWeekday(input, locale) {
    if (typeof input !== 'string') {
        return input;
    }

    if (!isNaN(input)) {
        return parseInt(input, 10);
    }

    input = locale.weekdaysParse(input);
    if (typeof input === 'number') {
        return input;
    }

    return null;
}

function parseIsoWeekday(input, locale) {
    if (typeof input === 'string') {
        return locale.weekdaysParse(input) % 7 || 7;
    }
    return isNaN(input) ? null : input;
}

// LOCALES

var defaultLocaleWeekdays = 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_');
function localeWeekdays (m, format) {
    if (!m) {
        return isArray(this._weekdays) ? this._weekdays :
            this._weekdays['standalone'];
    }
    return isArray(this._weekdays) ? this._weekdays[m.day()] :
        this._weekdays[this._weekdays.isFormat.test(format) ? 'format' : 'standalone'][m.day()];
}

var defaultLocaleWeekdaysShort = 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_');
function localeWeekdaysShort (m) {
    return (m) ? this._weekdaysShort[m.day()] : this._weekdaysShort;
}

var defaultLocaleWeekdaysMin = 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_');
function localeWeekdaysMin (m) {
    return (m) ? this._weekdaysMin[m.day()] : this._weekdaysMin;
}

function handleStrictParse$1(weekdayName, format, strict) {
    var i, ii, mom, llc = weekdayName.toLocaleLowerCase();
    if (!this._weekdaysParse) {
        this._weekdaysParse = [];
        this._shortWeekdaysParse = [];
        this._minWeekdaysParse = [];

        for (i = 0; i < 7; ++i) {
            mom = createUTC([2000, 1]).day(i);
            this._minWeekdaysParse[i] = this.weekdaysMin(mom, '').toLocaleLowerCase();
            this._shortWeekdaysParse[i] = this.weekdaysShort(mom, '').toLocaleLowerCase();
            this._weekdaysParse[i] = this.weekdays(mom, '').toLocaleLowerCase();
        }
    }

    if (strict) {
        if (format === 'dddd') {
            ii = indexOf$1.call(this._weekdaysParse, llc);
            return ii !== -1 ? ii : null;
        } else if (format === 'ddd') {
            ii = indexOf$1.call(this._shortWeekdaysParse, llc);
            return ii !== -1 ? ii : null;
        } else {
            ii = indexOf$1.call(this._minWeekdaysParse, llc);
            return ii !== -1 ? ii : null;
        }
    } else {
        if (format === 'dddd') {
            ii = indexOf$1.call(this._weekdaysParse, llc);
            if (ii !== -1) {
                return ii;
            }
            ii = indexOf$1.call(this._shortWeekdaysParse, llc);
            if (ii !== -1) {
                return ii;
            }
            ii = indexOf$1.call(this._minWeekdaysParse, llc);
            return ii !== -1 ? ii : null;
        } else if (format === 'ddd') {
            ii = indexOf$1.call(this._shortWeekdaysParse, llc);
            if (ii !== -1) {
                return ii;
            }
            ii = indexOf$1.call(this._weekdaysParse, llc);
            if (ii !== -1) {
                return ii;
            }
            ii = indexOf$1.call(this._minWeekdaysParse, llc);
            return ii !== -1 ? ii : null;
        } else {
            ii = indexOf$1.call(this._minWeekdaysParse, llc);
            if (ii !== -1) {
                return ii;
            }
            ii = indexOf$1.call(this._weekdaysParse, llc);
            if (ii !== -1) {
                return ii;
            }
            ii = indexOf$1.call(this._shortWeekdaysParse, llc);
            return ii !== -1 ? ii : null;
        }
    }
}

function localeWeekdaysParse (weekdayName, format, strict) {
    var i, mom, regex;

    if (this._weekdaysParseExact) {
        return handleStrictParse$1.call(this, weekdayName, format, strict);
    }

    if (!this._weekdaysParse) {
        this._weekdaysParse = [];
        this._minWeekdaysParse = [];
        this._shortWeekdaysParse = [];
        this._fullWeekdaysParse = [];
    }

    for (i = 0; i < 7; i++) {
        // make the regex if we don't have it already

        mom = createUTC([2000, 1]).day(i);
        if (strict && !this._fullWeekdaysParse[i]) {
            this._fullWeekdaysParse[i] = new RegExp('^' + this.weekdays(mom, '').replace('.', '\.?') + '$', 'i');
            this._shortWeekdaysParse[i] = new RegExp('^' + this.weekdaysShort(mom, '').replace('.', '\.?') + '$', 'i');
            this._minWeekdaysParse[i] = new RegExp('^' + this.weekdaysMin(mom, '').replace('.', '\.?') + '$', 'i');
        }
        if (!this._weekdaysParse[i]) {
            regex = '^' + this.weekdays(mom, '') + '|^' + this.weekdaysShort(mom, '') + '|^' + this.weekdaysMin(mom, '');
            this._weekdaysParse[i] = new RegExp(regex.replace('.', ''), 'i');
        }
        // test the regex
        if (strict && format === 'dddd' && this._fullWeekdaysParse[i].test(weekdayName)) {
            return i;
        } else if (strict && format === 'ddd' && this._shortWeekdaysParse[i].test(weekdayName)) {
            return i;
        } else if (strict && format === 'dd' && this._minWeekdaysParse[i].test(weekdayName)) {
            return i;
        } else if (!strict && this._weekdaysParse[i].test(weekdayName)) {
            return i;
        }
    }
}

// MOMENTS

function getSetDayOfWeek (input) {
    if (!this.isValid()) {
        return input != null ? this : NaN;
    }
    var day = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
    if (input != null) {
        input = parseWeekday(input, this.localeData());
        return this.add(input - day, 'd');
    } else {
        return day;
    }
}

function getSetLocaleDayOfWeek (input) {
    if (!this.isValid()) {
        return input != null ? this : NaN;
    }
    var weekday = (this.day() + 7 - this.localeData()._week.dow) % 7;
    return input == null ? weekday : this.add(input - weekday, 'd');
}

function getSetISODayOfWeek (input) {
    if (!this.isValid()) {
        return input != null ? this : NaN;
    }

    // behaves the same as moment#day except
    // as a getter, returns 7 instead of 0 (1-7 range instead of 0-6)
    // as a setter, sunday should belong to the previous week.

    if (input != null) {
        var weekday = parseIsoWeekday(input, this.localeData());
        return this.day(this.day() % 7 ? weekday : weekday - 7);
    } else {
        return this.day() || 7;
    }
}

var defaultWeekdaysRegex = matchWord;
function weekdaysRegex (isStrict) {
    if (this._weekdaysParseExact) {
        if (!hasOwnProp(this, '_weekdaysRegex')) {
            computeWeekdaysParse.call(this);
        }
        if (isStrict) {
            return this._weekdaysStrictRegex;
        } else {
            return this._weekdaysRegex;
        }
    } else {
        if (!hasOwnProp(this, '_weekdaysRegex')) {
            this._weekdaysRegex = defaultWeekdaysRegex;
        }
        return this._weekdaysStrictRegex && isStrict ?
            this._weekdaysStrictRegex : this._weekdaysRegex;
    }
}

var defaultWeekdaysShortRegex = matchWord;
function weekdaysShortRegex (isStrict) {
    if (this._weekdaysParseExact) {
        if (!hasOwnProp(this, '_weekdaysRegex')) {
            computeWeekdaysParse.call(this);
        }
        if (isStrict) {
            return this._weekdaysShortStrictRegex;
        } else {
            return this._weekdaysShortRegex;
        }
    } else {
        if (!hasOwnProp(this, '_weekdaysShortRegex')) {
            this._weekdaysShortRegex = defaultWeekdaysShortRegex;
        }
        return this._weekdaysShortStrictRegex && isStrict ?
            this._weekdaysShortStrictRegex : this._weekdaysShortRegex;
    }
}

var defaultWeekdaysMinRegex = matchWord;
function weekdaysMinRegex (isStrict) {
    if (this._weekdaysParseExact) {
        if (!hasOwnProp(this, '_weekdaysRegex')) {
            computeWeekdaysParse.call(this);
        }
        if (isStrict) {
            return this._weekdaysMinStrictRegex;
        } else {
            return this._weekdaysMinRegex;
        }
    } else {
        if (!hasOwnProp(this, '_weekdaysMinRegex')) {
            this._weekdaysMinRegex = defaultWeekdaysMinRegex;
        }
        return this._weekdaysMinStrictRegex && isStrict ?
            this._weekdaysMinStrictRegex : this._weekdaysMinRegex;
    }
}


function computeWeekdaysParse () {
    function cmpLenRev(a, b) {
        return b.length - a.length;
    }

    var minPieces = [], shortPieces = [], longPieces = [], mixedPieces = [],
        i, mom, minp, shortp, longp;
    for (i = 0; i < 7; i++) {
        // make the regex if we don't have it already
        mom = createUTC([2000, 1]).day(i);
        minp = this.weekdaysMin(mom, '');
        shortp = this.weekdaysShort(mom, '');
        longp = this.weekdays(mom, '');
        minPieces.push(minp);
        shortPieces.push(shortp);
        longPieces.push(longp);
        mixedPieces.push(minp);
        mixedPieces.push(shortp);
        mixedPieces.push(longp);
    }
    // Sorting makes sure if one weekday (or abbr) is a prefix of another it
    // will match the longer piece.
    minPieces.sort(cmpLenRev);
    shortPieces.sort(cmpLenRev);
    longPieces.sort(cmpLenRev);
    mixedPieces.sort(cmpLenRev);
    for (i = 0; i < 7; i++) {
        shortPieces[i] = regexEscape(shortPieces[i]);
        longPieces[i] = regexEscape(longPieces[i]);
        mixedPieces[i] = regexEscape(mixedPieces[i]);
    }

    this._weekdaysRegex = new RegExp('^(' + mixedPieces.join('|') + ')', 'i');
    this._weekdaysShortRegex = this._weekdaysRegex;
    this._weekdaysMinRegex = this._weekdaysRegex;

    this._weekdaysStrictRegex = new RegExp('^(' + longPieces.join('|') + ')', 'i');
    this._weekdaysShortStrictRegex = new RegExp('^(' + shortPieces.join('|') + ')', 'i');
    this._weekdaysMinStrictRegex = new RegExp('^(' + minPieces.join('|') + ')', 'i');
}

// FORMATTING

function hFormat() {
    return this.hours() % 12 || 12;
}

function kFormat() {
    return this.hours() || 24;
}

addFormatToken('H', ['HH', 2], 0, 'hour');
addFormatToken('h', ['hh', 2], 0, hFormat);
addFormatToken('k', ['kk', 2], 0, kFormat);

addFormatToken('hmm', 0, 0, function () {
    return '' + hFormat.apply(this) + zeroFill(this.minutes(), 2);
});

addFormatToken('hmmss', 0, 0, function () {
    return '' + hFormat.apply(this) + zeroFill(this.minutes(), 2) +
        zeroFill(this.seconds(), 2);
});

addFormatToken('Hmm', 0, 0, function () {
    return '' + this.hours() + zeroFill(this.minutes(), 2);
});

addFormatToken('Hmmss', 0, 0, function () {
    return '' + this.hours() + zeroFill(this.minutes(), 2) +
        zeroFill(this.seconds(), 2);
});

function meridiem (token, lowercase) {
    addFormatToken(token, 0, 0, function () {
        return this.localeData().meridiem(this.hours(), this.minutes(), lowercase);
    });
}

meridiem('a', true);
meridiem('A', false);

// ALIASES

addUnitAlias('hour', 'h');

// PRIORITY
addUnitPriority('hour', 13);

// PARSING

function matchMeridiem (isStrict, locale) {
    return locale._meridiemParse;
}

addRegexToken('a',  matchMeridiem);
addRegexToken('A',  matchMeridiem);
addRegexToken('H',  match1to2);
addRegexToken('h',  match1to2);
addRegexToken('k',  match1to2);
addRegexToken('HH', match1to2, match2);
addRegexToken('hh', match1to2, match2);
addRegexToken('kk', match1to2, match2);

addRegexToken('hmm', match3to4);
addRegexToken('hmmss', match5to6);
addRegexToken('Hmm', match3to4);
addRegexToken('Hmmss', match5to6);

addParseToken(['H', 'HH'], HOUR);
addParseToken(['k', 'kk'], function (input, array, config) {
    var kInput = toInt(input);
    array[HOUR] = kInput === 24 ? 0 : kInput;
});
addParseToken(['a', 'A'], function (input, array, config) {
    config._isPm = config._locale.isPM(input);
    config._meridiem = input;
});
addParseToken(['h', 'hh'], function (input, array, config) {
    array[HOUR] = toInt(input);
    getParsingFlags(config).bigHour = true;
});
addParseToken('hmm', function (input, array, config) {
    var pos = input.length - 2;
    array[HOUR] = toInt(input.substr(0, pos));
    array[MINUTE] = toInt(input.substr(pos));
    getParsingFlags(config).bigHour = true;
});
addParseToken('hmmss', function (input, array, config) {
    var pos1 = input.length - 4;
    var pos2 = input.length - 2;
    array[HOUR] = toInt(input.substr(0, pos1));
    array[MINUTE] = toInt(input.substr(pos1, 2));
    array[SECOND] = toInt(input.substr(pos2));
    getParsingFlags(config).bigHour = true;
});
addParseToken('Hmm', function (input, array, config) {
    var pos = input.length - 2;
    array[HOUR] = toInt(input.substr(0, pos));
    array[MINUTE] = toInt(input.substr(pos));
});
addParseToken('Hmmss', function (input, array, config) {
    var pos1 = input.length - 4;
    var pos2 = input.length - 2;
    array[HOUR] = toInt(input.substr(0, pos1));
    array[MINUTE] = toInt(input.substr(pos1, 2));
    array[SECOND] = toInt(input.substr(pos2));
});

// LOCALES

function localeIsPM (input) {
    // IE8 Quirks Mode & IE7 Standards Mode do not allow accessing strings like arrays
    // Using charAt should be more compatible.
    return ((input + '').toLowerCase().charAt(0) === 'p');
}

var defaultLocaleMeridiemParse = /[ap]\.?m?\.?/i;
function localeMeridiem (hours, minutes, isLower) {
    if (hours > 11) {
        return isLower ? 'pm' : 'PM';
    } else {
        return isLower ? 'am' : 'AM';
    }
}


// MOMENTS

// Setting the hour should keep the time, because the user explicitly
// specified which hour he wants. So trying to maintain the same hour (in
// a new timezone) makes sense. Adding/subtracting hours does not follow
// this rule.
var getSetHour = makeGetSet('Hours', true);

// months
// week
// weekdays
// meridiem
var baseConfig = {
    calendar: defaultCalendar,
    longDateFormat: defaultLongDateFormat,
    invalidDate: defaultInvalidDate,
    ordinal: defaultOrdinal,
    dayOfMonthOrdinalParse: defaultDayOfMonthOrdinalParse,
    relativeTime: defaultRelativeTime,

    months: defaultLocaleMonths,
    monthsShort: defaultLocaleMonthsShort,

    week: defaultLocaleWeek,

    weekdays: defaultLocaleWeekdays,
    weekdaysMin: defaultLocaleWeekdaysMin,
    weekdaysShort: defaultLocaleWeekdaysShort,

    meridiemParse: defaultLocaleMeridiemParse
};

// internal storage for locale config files
var locales = {};
var localeFamilies = {};
var globalLocale;

function normalizeLocale(key) {
    return key ? key.toLowerCase().replace('_', '-') : key;
}

// pick the locale from the array
// try ['en-au', 'en-gb'] as 'en-au', 'en-gb', 'en', as in move through the list trying each
// substring from most specific to least, but move to the next array item if it's a more specific variant than the current root
function chooseLocale(names) {
    var i = 0, j, next, locale, split;

    while (i < names.length) {
        split = normalizeLocale(names[i]).split('-');
        j = split.length;
        next = normalizeLocale(names[i + 1]);
        next = next ? next.split('-') : null;
        while (j > 0) {
            locale = loadLocale(split.slice(0, j).join('-'));
            if (locale) {
                return locale;
            }
            if (next && next.length >= j && compareArrays(split, next, true) >= j - 1) {
                //the next array item is better than a shallower substring of this one
                break;
            }
            j--;
        }
        i++;
    }
    return null;
}

function loadLocale(name) {
    var oldLocale = null;
    // TODO: Find a better way to register and load all the locales in Node
    if (!locales[name] && (typeof module !== 'undefined') &&
            module && module.exports) {
        try {
            oldLocale = globalLocale._abbr;
            require('./locale/' + name);
            // because defineLocale currently also sets the global locale, we
            // want to undo that for lazy loaded locales
            getSetGlobalLocale(oldLocale);
        } catch (e) { }
    }
    return locales[name];
}

// This function will load locale and then set the global locale.  If
// no arguments are passed in, it will simply return the current global
// locale key.
function getSetGlobalLocale (key, values) {
    var data;
    if (key) {
        if (isUndefined(values)) {
            data = getLocale(key);
        }
        else {
            data = defineLocale(key, values);
        }

        if (data) {
            // moment.duration._locale = moment._locale = data;
            globalLocale = data;
        }
    }

    return globalLocale._abbr;
}

function defineLocale (name, config) {
    if (config !== null) {
        var parentConfig = baseConfig;
        config.abbr = name;
        if (locales[name] != null) {
            deprecateSimple('defineLocaleOverride',
                    'use moment.updateLocale(localeName, config) to change ' +
                    'an existing locale. moment.defineLocale(localeName, ' +
                    'config) should only be used for creating a new locale ' +
                    'See http://momentjs.com/guides/#/warnings/define-locale/ for more info.');
            parentConfig = locales[name]._config;
        } else if (config.parentLocale != null) {
            if (locales[config.parentLocale] != null) {
                parentConfig = locales[config.parentLocale]._config;
            } else {
                if (!localeFamilies[config.parentLocale]) {
                    localeFamilies[config.parentLocale] = [];
                }
                localeFamilies[config.parentLocale].push({
                    name: name,
                    config: config
                });
                return null;
            }
        }
        locales[name] = new Locale(mergeConfigs(parentConfig, config));

        if (localeFamilies[name]) {
            localeFamilies[name].forEach(function (x) {
                defineLocale(x.name, x.config);
            });
        }

        // backwards compat for now: also set the locale
        // make sure we set the locale AFTER all child locales have been
        // created, so we won't end up with the child locale set.
        getSetGlobalLocale(name);


        return locales[name];
    } else {
        // useful for testing
        delete locales[name];
        return null;
    }
}

function updateLocale(name, config) {
    if (config != null) {
        var locale, parentConfig = baseConfig;
        // MERGE
        if (locales[name] != null) {
            parentConfig = locales[name]._config;
        }
        config = mergeConfigs(parentConfig, config);
        locale = new Locale(config);
        locale.parentLocale = locales[name];
        locales[name] = locale;

        // backwards compat for now: also set the locale
        getSetGlobalLocale(name);
    } else {
        // pass null for config to unupdate, useful for tests
        if (locales[name] != null) {
            if (locales[name].parentLocale != null) {
                locales[name] = locales[name].parentLocale;
            } else if (locales[name] != null) {
                delete locales[name];
            }
        }
    }
    return locales[name];
}

// returns locale data
function getLocale (key) {
    var locale;

    if (key && key._locale && key._locale._abbr) {
        key = key._locale._abbr;
    }

    if (!key) {
        return globalLocale;
    }

    if (!isArray(key)) {
        //short-circuit everything else
        locale = loadLocale(key);
        if (locale) {
            return locale;
        }
        key = [key];
    }

    return chooseLocale(key);
}

function listLocales() {
    return keys$1(locales);
}

function checkOverflow (m) {
    var overflow;
    var a = m._a;

    if (a && getParsingFlags(m).overflow === -2) {
        overflow =
            a[MONTH]       < 0 || a[MONTH]       > 11  ? MONTH :
            a[DATE]        < 1 || a[DATE]        > daysInMonth(a[YEAR], a[MONTH]) ? DATE :
            a[HOUR]        < 0 || a[HOUR]        > 24 || (a[HOUR] === 24 && (a[MINUTE] !== 0 || a[SECOND] !== 0 || a[MILLISECOND] !== 0)) ? HOUR :
            a[MINUTE]      < 0 || a[MINUTE]      > 59  ? MINUTE :
            a[SECOND]      < 0 || a[SECOND]      > 59  ? SECOND :
            a[MILLISECOND] < 0 || a[MILLISECOND] > 999 ? MILLISECOND :
            -1;

        if (getParsingFlags(m)._overflowDayOfYear && (overflow < YEAR || overflow > DATE)) {
            overflow = DATE;
        }
        if (getParsingFlags(m)._overflowWeeks && overflow === -1) {
            overflow = WEEK;
        }
        if (getParsingFlags(m)._overflowWeekday && overflow === -1) {
            overflow = WEEKDAY;
        }

        getParsingFlags(m).overflow = overflow;
    }

    return m;
}

// iso 8601 regex
// 0000-00-00 0000-W00 or 0000-W00-0 + T + 00 or 00:00 or 00:00:00 or 00:00:00.000 + +00:00 or +0000 or +00)
var extendedIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/;
var basicIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/;

var tzRegex = /Z|[+-]\d\d(?::?\d\d)?/;

var isoDates = [
    ['YYYYYY-MM-DD', /[+-]\d{6}-\d\d-\d\d/],
    ['YYYY-MM-DD', /\d{4}-\d\d-\d\d/],
    ['GGGG-[W]WW-E', /\d{4}-W\d\d-\d/],
    ['GGGG-[W]WW', /\d{4}-W\d\d/, false],
    ['YYYY-DDD', /\d{4}-\d{3}/],
    ['YYYY-MM', /\d{4}-\d\d/, false],
    ['YYYYYYMMDD', /[+-]\d{10}/],
    ['YYYYMMDD', /\d{8}/],
    // YYYYMM is NOT allowed by the standard
    ['GGGG[W]WWE', /\d{4}W\d{3}/],
    ['GGGG[W]WW', /\d{4}W\d{2}/, false],
    ['YYYYDDD', /\d{7}/]
];

// iso time formats and regexes
var isoTimes = [
    ['HH:mm:ss.SSSS', /\d\d:\d\d:\d\d\.\d+/],
    ['HH:mm:ss,SSSS', /\d\d:\d\d:\d\d,\d+/],
    ['HH:mm:ss', /\d\d:\d\d:\d\d/],
    ['HH:mm', /\d\d:\d\d/],
    ['HHmmss.SSSS', /\d\d\d\d\d\d\.\d+/],
    ['HHmmss,SSSS', /\d\d\d\d\d\d,\d+/],
    ['HHmmss', /\d\d\d\d\d\d/],
    ['HHmm', /\d\d\d\d/],
    ['HH', /\d\d/]
];

var aspNetJsonRegex = /^\/?Date\((\-?\d+)/i;

// date from iso format
function configFromISO(config) {
    var i, l,
        string = config._i,
        match = extendedIsoRegex.exec(string) || basicIsoRegex.exec(string),
        allowTime, dateFormat, timeFormat, tzFormat;

    if (match) {
        getParsingFlags(config).iso = true;

        for (i = 0, l = isoDates.length; i < l; i++) {
            if (isoDates[i][1].exec(match[1])) {
                dateFormat = isoDates[i][0];
                allowTime = isoDates[i][2] !== false;
                break;
            }
        }
        if (dateFormat == null) {
            config._isValid = false;
            return;
        }
        if (match[3]) {
            for (i = 0, l = isoTimes.length; i < l; i++) {
                if (isoTimes[i][1].exec(match[3])) {
                    // match[2] should be 'T' or space
                    timeFormat = (match[2] || ' ') + isoTimes[i][0];
                    break;
                }
            }
            if (timeFormat == null) {
                config._isValid = false;
                return;
            }
        }
        if (!allowTime && timeFormat != null) {
            config._isValid = false;
            return;
        }
        if (match[4]) {
            if (tzRegex.exec(match[4])) {
                tzFormat = 'Z';
            } else {
                config._isValid = false;
                return;
            }
        }
        config._f = dateFormat + (timeFormat || '') + (tzFormat || '');
        configFromStringAndFormat(config);
    } else {
        config._isValid = false;
    }
}

// RFC 2822 regex: For details see https://tools.ietf.org/html/rfc2822#section-3.3
var basicRfcRegex = /^((?:Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s)?(\d?\d\s(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(?:\d\d)?\d\d\s)(\d\d:\d\d)(\:\d\d)?(\s(?:UT|GMT|[ECMP][SD]T|[A-IK-Za-ik-z]|[+-]\d{4}))$/;

// date and time from ref 2822 format
function configFromRFC2822(config) {
    var string, match, dayFormat,
        dateFormat, timeFormat, tzFormat;
    var timezones = {
        ' GMT': ' +0000',
        ' EDT': ' -0400',
        ' EST': ' -0500',
        ' CDT': ' -0500',
        ' CST': ' -0600',
        ' MDT': ' -0600',
        ' MST': ' -0700',
        ' PDT': ' -0700',
        ' PST': ' -0800'
    };
    var military = 'YXWVUTSRQPONZABCDEFGHIKLM';
    var timezone, timezoneIndex;

    string = config._i
        .replace(/\([^\)]*\)|[\n\t]/g, ' ') // Remove comments and folding whitespace
        .replace(/(\s\s+)/g, ' ') // Replace multiple-spaces with a single space
        .replace(/^\s|\s$/g, ''); // Remove leading and trailing spaces
    match = basicRfcRegex.exec(string);

    if (match) {
        dayFormat = match[1] ? 'ddd' + ((match[1].length === 5) ? ', ' : ' ') : '';
        dateFormat = 'D MMM ' + ((match[2].length > 10) ? 'YYYY ' : 'YY ');
        timeFormat = 'HH:mm' + (match[4] ? ':ss' : '');

        // TODO: Replace the vanilla JS Date object with an indepentent day-of-week check.
        if (match[1]) { // day of week given
            var momentDate = new Date(match[2]);
            var momentDay = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'][momentDate.getDay()];

            if (match[1].substr(0,3) !== momentDay) {
                getParsingFlags(config).weekdayMismatch = true;
                config._isValid = false;
                return;
            }
        }

        switch (match[5].length) {
            case 2: // military
                if (timezoneIndex === 0) {
                    timezone = ' +0000';
                } else {
                    timezoneIndex = military.indexOf(match[5][1].toUpperCase()) - 12;
                    timezone = ((timezoneIndex < 0) ? ' -' : ' +') +
                        (('' + timezoneIndex).replace(/^-?/, '0')).match(/..$/)[0] + '00';
                }
                break;
            case 4: // Zone
                timezone = timezones[match[5]];
                break;
            default: // UT or +/-9999
                timezone = timezones[' GMT'];
        }
        match[5] = timezone;
        config._i = match.splice(1).join('');
        tzFormat = ' ZZ';
        config._f = dayFormat + dateFormat + timeFormat + tzFormat;
        configFromStringAndFormat(config);
        getParsingFlags(config).rfc2822 = true;
    } else {
        config._isValid = false;
    }
}

// date from iso format or fallback
function configFromString(config) {
    var matched = aspNetJsonRegex.exec(config._i);

    if (matched !== null) {
        config._d = new Date(+matched[1]);
        return;
    }

    configFromISO(config);
    if (config._isValid === false) {
        delete config._isValid;
    } else {
        return;
    }

    configFromRFC2822(config);
    if (config._isValid === false) {
        delete config._isValid;
    } else {
        return;
    }

    // Final attempt, use Input Fallback
    hooks.createFromInputFallback(config);
}

hooks.createFromInputFallback = deprecate(
    'value provided is not in a recognized RFC2822 or ISO format. moment construction falls back to js Date(), ' +
    'which is not reliable across all browsers and versions. Non RFC2822/ISO date formats are ' +
    'discouraged and will be removed in an upcoming major release. Please refer to ' +
    'http://momentjs.com/guides/#/warnings/js-date/ for more info.',
    function (config) {
        config._d = new Date(config._i + (config._useUTC ? ' UTC' : ''));
    }
);

// Pick the first defined of two or three arguments.
function defaults(a, b, c) {
    if (a != null) {
        return a;
    }
    if (b != null) {
        return b;
    }
    return c;
}

function currentDateArray(config) {
    // hooks is actually the exported moment object
    var nowValue = new Date(hooks.now());
    if (config._useUTC) {
        return [nowValue.getUTCFullYear(), nowValue.getUTCMonth(), nowValue.getUTCDate()];
    }
    return [nowValue.getFullYear(), nowValue.getMonth(), nowValue.getDate()];
}

// convert an array to a date.
// the array should mirror the parameters below
// note: all values past the year are optional and will default to the lowest possible value.
// [year, month, day , hour, minute, second, millisecond]
function configFromArray (config) {
    var i, date, input = [], currentDate, yearToUse;

    if (config._d) {
        return;
    }

    currentDate = currentDateArray(config);

    //compute day of the year from weeks and weekdays
    if (config._w && config._a[DATE] == null && config._a[MONTH] == null) {
        dayOfYearFromWeekInfo(config);
    }

    //if the day of the year is set, figure out what it is
    if (config._dayOfYear != null) {
        yearToUse = defaults(config._a[YEAR], currentDate[YEAR]);

        if (config._dayOfYear > daysInYear(yearToUse) || config._dayOfYear === 0) {
            getParsingFlags(config)._overflowDayOfYear = true;
        }

        date = createUTCDate(yearToUse, 0, config._dayOfYear);
        config._a[MONTH] = date.getUTCMonth();
        config._a[DATE] = date.getUTCDate();
    }

    // Default to current date.
    // * if no year, month, day of month are given, default to today
    // * if day of month is given, default month and year
    // * if month is given, default only year
    // * if year is given, don't default anything
    for (i = 0; i < 3 && config._a[i] == null; ++i) {
        config._a[i] = input[i] = currentDate[i];
    }

    // Zero out whatever was not defaulted, including time
    for (; i < 7; i++) {
        config._a[i] = input[i] = (config._a[i] == null) ? (i === 2 ? 1 : 0) : config._a[i];
    }

    // Check for 24:00:00.000
    if (config._a[HOUR] === 24 &&
            config._a[MINUTE] === 0 &&
            config._a[SECOND] === 0 &&
            config._a[MILLISECOND] === 0) {
        config._nextDay = true;
        config._a[HOUR] = 0;
    }

    config._d = (config._useUTC ? createUTCDate : createDate).apply(null, input);
    // Apply timezone offset from input. The actual utcOffset can be changed
    // with parseZone.
    if (config._tzm != null) {
        config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);
    }

    if (config._nextDay) {
        config._a[HOUR] = 24;
    }
}

function dayOfYearFromWeekInfo(config) {
    var w, weekYear, week, weekday, dow, doy, temp, weekdayOverflow;

    w = config._w;
    if (w.GG != null || w.W != null || w.E != null) {
        dow = 1;
        doy = 4;

        // TODO: We need to take the current isoWeekYear, but that depends on
        // how we interpret now (local, utc, fixed offset). So create
        // a now version of current config (take local/utc/offset flags, and
        // create now).
        weekYear = defaults(w.GG, config._a[YEAR], weekOfYear(createLocal(), 1, 4).year);
        week = defaults(w.W, 1);
        weekday = defaults(w.E, 1);
        if (weekday < 1 || weekday > 7) {
            weekdayOverflow = true;
        }
    } else {
        dow = config._locale._week.dow;
        doy = config._locale._week.doy;

        var curWeek = weekOfYear(createLocal(), dow, doy);

        weekYear = defaults(w.gg, config._a[YEAR], curWeek.year);

        // Default to current week.
        week = defaults(w.w, curWeek.week);

        if (w.d != null) {
            // weekday -- low day numbers are considered next week
            weekday = w.d;
            if (weekday < 0 || weekday > 6) {
                weekdayOverflow = true;
            }
        } else if (w.e != null) {
            // local weekday -- counting starts from begining of week
            weekday = w.e + dow;
            if (w.e < 0 || w.e > 6) {
                weekdayOverflow = true;
            }
        } else {
            // default to begining of week
            weekday = dow;
        }
    }
    if (week < 1 || week > weeksInYear(weekYear, dow, doy)) {
        getParsingFlags(config)._overflowWeeks = true;
    } else if (weekdayOverflow != null) {
        getParsingFlags(config)._overflowWeekday = true;
    } else {
        temp = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy);
        config._a[YEAR] = temp.year;
        config._dayOfYear = temp.dayOfYear;
    }
}

// constant that refers to the ISO standard
hooks.ISO_8601 = function () {};

// constant that refers to the RFC 2822 form
hooks.RFC_2822 = function () {};

// date from string and format string
function configFromStringAndFormat(config) {
    // TODO: Move this to another part of the creation flow to prevent circular deps
    if (config._f === hooks.ISO_8601) {
        configFromISO(config);
        return;
    }
    if (config._f === hooks.RFC_2822) {
        configFromRFC2822(config);
        return;
    }
    config._a = [];
    getParsingFlags(config).empty = true;

    // This array is used to make a Date, either with `new Date` or `Date.UTC`
    var string = '' + config._i,
        i, parsedInput, tokens, token, skipped,
        stringLength = string.length,
        totalParsedInputLength = 0;

    tokens = expandFormat(config._f, config._locale).match(formattingTokens) || [];

    for (i = 0; i < tokens.length; i++) {
        token = tokens[i];
        parsedInput = (string.match(getParseRegexForToken(token, config)) || [])[0];
        // console.log('token', token, 'parsedInput', parsedInput,
        //         'regex', getParseRegexForToken(token, config));
        if (parsedInput) {
            skipped = string.substr(0, string.indexOf(parsedInput));
            if (skipped.length > 0) {
                getParsingFlags(config).unusedInput.push(skipped);
            }
            string = string.slice(string.indexOf(parsedInput) + parsedInput.length);
            totalParsedInputLength += parsedInput.length;
        }
        // don't parse if it's not a known token
        if (formatTokenFunctions[token]) {
            if (parsedInput) {
                getParsingFlags(config).empty = false;
            }
            else {
                getParsingFlags(config).unusedTokens.push(token);
            }
            addTimeToArrayFromToken(token, parsedInput, config);
        }
        else if (config._strict && !parsedInput) {
            getParsingFlags(config).unusedTokens.push(token);
        }
    }

    // add remaining unparsed input length to the string
    getParsingFlags(config).charsLeftOver = stringLength - totalParsedInputLength;
    if (string.length > 0) {
        getParsingFlags(config).unusedInput.push(string);
    }

    // clear _12h flag if hour is <= 12
    if (config._a[HOUR] <= 12 &&
        getParsingFlags(config).bigHour === true &&
        config._a[HOUR] > 0) {
        getParsingFlags(config).bigHour = undefined;
    }

    getParsingFlags(config).parsedDateParts = config._a.slice(0);
    getParsingFlags(config).meridiem = config._meridiem;
    // handle meridiem
    config._a[HOUR] = meridiemFixWrap(config._locale, config._a[HOUR], config._meridiem);

    configFromArray(config);
    checkOverflow(config);
}


function meridiemFixWrap (locale, hour, meridiem) {
    var isPm;

    if (meridiem == null) {
        // nothing to do
        return hour;
    }
    if (locale.meridiemHour != null) {
        return locale.meridiemHour(hour, meridiem);
    } else if (locale.isPM != null) {
        // Fallback
        isPm = locale.isPM(meridiem);
        if (isPm && hour < 12) {
            hour += 12;
        }
        if (!isPm && hour === 12) {
            hour = 0;
        }
        return hour;
    } else {
        // this is not supposed to happen
        return hour;
    }
}

// date from string and array of format strings
function configFromStringAndArray(config) {
    var tempConfig,
        bestMoment,

        scoreToBeat,
        i,
        currentScore;

    if (config._f.length === 0) {
        getParsingFlags(config).invalidFormat = true;
        config._d = new Date(NaN);
        return;
    }

    for (i = 0; i < config._f.length; i++) {
        currentScore = 0;
        tempConfig = copyConfig({}, config);
        if (config._useUTC != null) {
            tempConfig._useUTC = config._useUTC;
        }
        tempConfig._f = config._f[i];
        configFromStringAndFormat(tempConfig);

        if (!isValid(tempConfig)) {
            continue;
        }

        // if there is any input that was not parsed add a penalty for that format
        currentScore += getParsingFlags(tempConfig).charsLeftOver;

        //or tokens
        currentScore += getParsingFlags(tempConfig).unusedTokens.length * 10;

        getParsingFlags(tempConfig).score = currentScore;

        if (scoreToBeat == null || currentScore < scoreToBeat) {
            scoreToBeat = currentScore;
            bestMoment = tempConfig;
        }
    }

    extend(config, bestMoment || tempConfig);
}

function configFromObject(config) {
    if (config._d) {
        return;
    }

    var i = normalizeObjectUnits(config._i);
    config._a = map([i.year, i.month, i.day || i.date, i.hour, i.minute, i.second, i.millisecond], function (obj) {
        return obj && parseInt(obj, 10);
    });

    configFromArray(config);
}

function createFromConfig (config) {
    var res = new Moment(checkOverflow(prepareConfig(config)));
    if (res._nextDay) {
        // Adding is smart enough around DST
        res.add(1, 'd');
        res._nextDay = undefined;
    }

    return res;
}

function prepareConfig (config) {
    var input = config._i,
        format = config._f;

    config._locale = config._locale || getLocale(config._l);

    if (input === null || (format === undefined && input === '')) {
        return createInvalid({nullInput: true});
    }

    if (typeof input === 'string') {
        config._i = input = config._locale.preparse(input);
    }

    if (isMoment(input)) {
        return new Moment(checkOverflow(input));
    } else if (isDate(input)) {
        config._d = input;
    } else if (isArray(format)) {
        configFromStringAndArray(config);
    } else if (format) {
        configFromStringAndFormat(config);
    }  else {
        configFromInput(config);
    }

    if (!isValid(config)) {
        config._d = null;
    }

    return config;
}

function configFromInput(config) {
    var input = config._i;
    if (isUndefined(input)) {
        config._d = new Date(hooks.now());
    } else if (isDate(input)) {
        config._d = new Date(input.valueOf());
    } else if (typeof input === 'string') {
        configFromString(config);
    } else if (isArray(input)) {
        config._a = map(input.slice(0), function (obj) {
            return parseInt(obj, 10);
        });
        configFromArray(config);
    } else if (isObject(input)) {
        configFromObject(config);
    } else if (isNumber(input)) {
        // from milliseconds
        config._d = new Date(input);
    } else {
        hooks.createFromInputFallback(config);
    }
}

function createLocalOrUTC (input, format, locale, strict, isUTC) {
    var c = {};

    if (locale === true || locale === false) {
        strict = locale;
        locale = undefined;
    }

    if ((isObject(input) && isObjectEmpty(input)) ||
            (isArray(input) && input.length === 0)) {
        input = undefined;
    }
    // object construction must be done this way.
    // https://github.com/moment/moment/issues/1423
    c._isAMomentObject = true;
    c._useUTC = c._isUTC = isUTC;
    c._l = locale;
    c._i = input;
    c._f = format;
    c._strict = strict;

    return createFromConfig(c);
}

function createLocal (input, format, locale, strict) {
    return createLocalOrUTC(input, format, locale, strict, false);
}

var prototypeMin = deprecate(
    'moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/',
    function () {
        var other = createLocal.apply(null, arguments);
        if (this.isValid() && other.isValid()) {
            return other < this ? this : other;
        } else {
            return createInvalid();
        }
    }
);

var prototypeMax = deprecate(
    'moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/',
    function () {
        var other = createLocal.apply(null, arguments);
        if (this.isValid() && other.isValid()) {
            return other > this ? this : other;
        } else {
            return createInvalid();
        }
    }
);

// Pick a moment m from moments so that m[fn](other) is true for all
// other. This relies on the function fn to be transitive.
//
// moments should either be an array of moment objects or an array, whose
// first element is an array of moment objects.
function pickBy(fn, moments) {
    var res, i;
    if (moments.length === 1 && isArray(moments[0])) {
        moments = moments[0];
    }
    if (!moments.length) {
        return createLocal();
    }
    res = moments[0];
    for (i = 1; i < moments.length; ++i) {
        if (!moments[i].isValid() || moments[i][fn](res)) {
            res = moments[i];
        }
    }
    return res;
}

// TODO: Use [].sort instead?
function min () {
    var args = [].slice.call(arguments, 0);

    return pickBy('isBefore', args);
}

function max () {
    var args = [].slice.call(arguments, 0);

    return pickBy('isAfter', args);
}

var now = function () {
    return Date.now ? Date.now() : +(new Date());
};

var ordering = ['year', 'quarter', 'month', 'week', 'day', 'hour', 'minute', 'second', 'millisecond'];

function isDurationValid(m) {
    for (var key in m) {
        if (!(ordering.indexOf(key) !== -1 && (m[key] == null || !isNaN(m[key])))) {
            return false;
        }
    }

    var unitHasDecimal = false;
    for (var i = 0; i < ordering.length; ++i) {
        if (m[ordering[i]]) {
            if (unitHasDecimal) {
                return false; // only allow non-integers for smallest unit
            }
            if (parseFloat(m[ordering[i]]) !== toInt(m[ordering[i]])) {
                unitHasDecimal = true;
            }
        }
    }

    return true;
}

function isValid$1() {
    return this._isValid;
}

function createInvalid$1() {
    return createDuration(NaN);
}

function Duration (duration) {
    var normalizedInput = normalizeObjectUnits(duration),
        years = normalizedInput.year || 0,
        quarters = normalizedInput.quarter || 0,
        months = normalizedInput.month || 0,
        weeks = normalizedInput.week || 0,
        days = normalizedInput.day || 0,
        hours = normalizedInput.hour || 0,
        minutes = normalizedInput.minute || 0,
        seconds = normalizedInput.second || 0,
        milliseconds = normalizedInput.millisecond || 0;

    this._isValid = isDurationValid(normalizedInput);

    // representation for dateAddRemove
    this._milliseconds = +milliseconds +
        seconds * 1e3 + // 1000
        minutes * 6e4 + // 1000 * 60
        hours * 1000 * 60 * 60; //using 1000 * 60 * 60 instead of 36e5 to avoid floating point rounding errors https://github.com/moment/moment/issues/2978
    // Because of dateAddRemove treats 24 hours as different from a
    // day when working around DST, we need to store them separately
    this._days = +days +
        weeks * 7;
    // It is impossible translate months into days without knowing
    // which months you are are talking about, so we have to store
    // it separately.
    this._months = +months +
        quarters * 3 +
        years * 12;

    this._data = {};

    this._locale = getLocale();

    this._bubble();
}

function isDuration (obj) {
    return obj instanceof Duration;
}

function absRound (number) {
    if (number < 0) {
        return Math.round(-1 * number) * -1;
    } else {
        return Math.round(number);
    }
}

// FORMATTING

function offset (token, separator) {
    addFormatToken(token, 0, 0, function () {
        var offset = this.utcOffset();
        var sign = '+';
        if (offset < 0) {
            offset = -offset;
            sign = '-';
        }
        return sign + zeroFill(~~(offset / 60), 2) + separator + zeroFill(~~(offset) % 60, 2);
    });
}

offset('Z', ':');
offset('ZZ', '');

// PARSING

addRegexToken('Z',  matchShortOffset);
addRegexToken('ZZ', matchShortOffset);
addParseToken(['Z', 'ZZ'], function (input, array, config) {
    config._useUTC = true;
    config._tzm = offsetFromString(matchShortOffset, input);
});

// HELPERS

// timezone chunker
// '+10:00' > ['10',  '00']
// '-1530'  > ['-15', '30']
var chunkOffset = /([\+\-]|\d\d)/gi;

function offsetFromString(matcher, string) {
    var matches = (string || '').match(matcher);

    if (matches === null) {
        return null;
    }

    var chunk   = matches[matches.length - 1] || [];
    var parts   = (chunk + '').match(chunkOffset) || ['-', 0, 0];
    var minutes = +(parts[1] * 60) + toInt(parts[2]);

    return minutes === 0 ?
      0 :
      parts[0] === '+' ? minutes : -minutes;
}

// Return a moment from input, that is local/utc/zone equivalent to model.
function cloneWithOffset(input, model) {
    var res, diff;
    if (model._isUTC) {
        res = model.clone();
        diff = (isMoment(input) || isDate(input) ? input.valueOf() : createLocal(input).valueOf()) - res.valueOf();
        // Use low-level api, because this fn is low-level api.
        res._d.setTime(res._d.valueOf() + diff);
        hooks.updateOffset(res, false);
        return res;
    } else {
        return createLocal(input).local();
    }
}

function getDateOffset (m) {
    // On Firefox.24 Date#getTimezoneOffset returns a floating point.
    // https://github.com/moment/moment/pull/1871
    return -Math.round(m._d.getTimezoneOffset() / 15) * 15;
}

// HOOKS

// This function will be called whenever a moment is mutated.
// It is intended to keep the offset in sync with the timezone.
hooks.updateOffset = function () {};

// MOMENTS

// keepLocalTime = true means only change the timezone, without
// affecting the local hour. So 5:31:26 +0300 --[utcOffset(2, true)]-->
// 5:31:26 +0200 It is possible that 5:31:26 doesn't exist with offset
// +0200, so we adjust the time as needed, to be valid.
//
// Keeping the time actually adds/subtracts (one hour)
// from the actual represented time. That is why we call updateOffset
// a second time. In case it wants us to change the offset again
// _changeInProgress == true case, then we have to adjust, because
// there is no such time in the given timezone.
function getSetOffset (input, keepLocalTime, keepMinutes) {
    var offset = this._offset || 0,
        localAdjust;
    if (!this.isValid()) {
        return input != null ? this : NaN;
    }
    if (input != null) {
        if (typeof input === 'string') {
            input = offsetFromString(matchShortOffset, input);
            if (input === null) {
                return this;
            }
        } else if (Math.abs(input) < 16 && !keepMinutes) {
            input = input * 60;
        }
        if (!this._isUTC && keepLocalTime) {
            localAdjust = getDateOffset(this);
        }
        this._offset = input;
        this._isUTC = true;
        if (localAdjust != null) {
            this.add(localAdjust, 'm');
        }
        if (offset !== input) {
            if (!keepLocalTime || this._changeInProgress) {
                addSubtract(this, createDuration(input - offset, 'm'), 1, false);
            } else if (!this._changeInProgress) {
                this._changeInProgress = true;
                hooks.updateOffset(this, true);
                this._changeInProgress = null;
            }
        }
        return this;
    } else {
        return this._isUTC ? offset : getDateOffset(this);
    }
}

function getSetZone (input, keepLocalTime) {
    if (input != null) {
        if (typeof input !== 'string') {
            input = -input;
        }

        this.utcOffset(input, keepLocalTime);

        return this;
    } else {
        return -this.utcOffset();
    }
}

function setOffsetToUTC (keepLocalTime) {
    return this.utcOffset(0, keepLocalTime);
}

function setOffsetToLocal (keepLocalTime) {
    if (this._isUTC) {
        this.utcOffset(0, keepLocalTime);
        this._isUTC = false;

        if (keepLocalTime) {
            this.subtract(getDateOffset(this), 'm');
        }
    }
    return this;
}

function setOffsetToParsedOffset () {
    if (this._tzm != null) {
        this.utcOffset(this._tzm, false, true);
    } else if (typeof this._i === 'string') {
        var tZone = offsetFromString(matchOffset, this._i);
        if (tZone != null) {
            this.utcOffset(tZone);
        }
        else {
            this.utcOffset(0, true);
        }
    }
    return this;
}

function hasAlignedHourOffset (input) {
    if (!this.isValid()) {
        return false;
    }
    input = input ? createLocal(input).utcOffset() : 0;

    return (this.utcOffset() - input) % 60 === 0;
}

function isDaylightSavingTime () {
    return (
        this.utcOffset() > this.clone().month(0).utcOffset() ||
        this.utcOffset() > this.clone().month(5).utcOffset()
    );
}

function isDaylightSavingTimeShifted () {
    if (!isUndefined(this._isDSTShifted)) {
        return this._isDSTShifted;
    }

    var c = {};

    copyConfig(c, this);
    c = prepareConfig(c);

    if (c._a) {
        var other = c._isUTC ? createUTC(c._a) : createLocal(c._a);
        this._isDSTShifted = this.isValid() &&
            compareArrays(c._a, other.toArray()) > 0;
    } else {
        this._isDSTShifted = false;
    }

    return this._isDSTShifted;
}

function isLocal () {
    return this.isValid() ? !this._isUTC : false;
}

function isUtcOffset () {
    return this.isValid() ? this._isUTC : false;
}

function isUtc () {
    return this.isValid() ? this._isUTC && this._offset === 0 : false;
}

// ASP.NET json date format regex
var aspNetRegex = /^(\-)?(?:(\d*)[. ])?(\d+)\:(\d+)(?:\:(\d+)(\.\d*)?)?$/;

// from http://docs.closure-library.googlecode.com/git/closure_goog_date_date.js.source.html
// somewhat more in line with 4.4.3.2 2004 spec, but allows decimal anywhere
// and further modified to allow for strings containing both week and day
var isoRegex = /^(-)?P(?:(-?[0-9,.]*)Y)?(?:(-?[0-9,.]*)M)?(?:(-?[0-9,.]*)W)?(?:(-?[0-9,.]*)D)?(?:T(?:(-?[0-9,.]*)H)?(?:(-?[0-9,.]*)M)?(?:(-?[0-9,.]*)S)?)?$/;

function createDuration (input, key) {
    var duration = input,
        // matching against regexp is expensive, do it on demand
        match = null,
        sign,
        ret,
        diffRes;

    if (isDuration(input)) {
        duration = {
            ms : input._milliseconds,
            d  : input._days,
            M  : input._months
        };
    } else if (isNumber(input)) {
        duration = {};
        if (key) {
            duration[key] = input;
        } else {
            duration.milliseconds = input;
        }
    } else if (!!(match = aspNetRegex.exec(input))) {
        sign = (match[1] === '-') ? -1 : 1;
        duration = {
            y  : 0,
            d  : toInt(match[DATE])                         * sign,
            h  : toInt(match[HOUR])                         * sign,
            m  : toInt(match[MINUTE])                       * sign,
            s  : toInt(match[SECOND])                       * sign,
            ms : toInt(absRound(match[MILLISECOND] * 1000)) * sign // the millisecond decimal point is included in the match
        };
    } else if (!!(match = isoRegex.exec(input))) {
        sign = (match[1] === '-') ? -1 : 1;
        duration = {
            y : parseIso(match[2], sign),
            M : parseIso(match[3], sign),
            w : parseIso(match[4], sign),
            d : parseIso(match[5], sign),
            h : parseIso(match[6], sign),
            m : parseIso(match[7], sign),
            s : parseIso(match[8], sign)
        };
    } else if (duration == null) {// checks for null or undefined
        duration = {};
    } else if (typeof duration === 'object' && ('from' in duration || 'to' in duration)) {
        diffRes = momentsDifference(createLocal(duration.from), createLocal(duration.to));

        duration = {};
        duration.ms = diffRes.milliseconds;
        duration.M = diffRes.months;
    }

    ret = new Duration(duration);

    if (isDuration(input) && hasOwnProp(input, '_locale')) {
        ret._locale = input._locale;
    }

    return ret;
}

createDuration.fn = Duration.prototype;
createDuration.invalid = createInvalid$1;

function parseIso (inp, sign) {
    // We'd normally use ~~inp for this, but unfortunately it also
    // converts floats to ints.
    // inp may be undefined, so careful calling replace on it.
    var res = inp && parseFloat(inp.replace(',', '.'));
    // apply sign while we're at it
    return (isNaN(res) ? 0 : res) * sign;
}

function positiveMomentsDifference(base, other) {
    var res = {milliseconds: 0, months: 0};

    res.months = other.month() - base.month() +
        (other.year() - base.year()) * 12;
    if (base.clone().add(res.months, 'M').isAfter(other)) {
        --res.months;
    }

    res.milliseconds = +other - +(base.clone().add(res.months, 'M'));

    return res;
}

function momentsDifference(base, other) {
    var res;
    if (!(base.isValid() && other.isValid())) {
        return {milliseconds: 0, months: 0};
    }

    other = cloneWithOffset(other, base);
    if (base.isBefore(other)) {
        res = positiveMomentsDifference(base, other);
    } else {
        res = positiveMomentsDifference(other, base);
        res.milliseconds = -res.milliseconds;
        res.months = -res.months;
    }

    return res;
}

// TODO: remove 'name' arg after deprecation is removed
function createAdder(direction, name) {
    return function (val, period) {
        var dur, tmp;
        //invert the arguments, but complain about it
        if (period !== null && !isNaN(+period)) {
            deprecateSimple(name, 'moment().' + name  + '(period, number) is deprecated. Please use moment().' + name + '(number, period). ' +
            'See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info.');
            tmp = val; val = period; period = tmp;
        }

        val = typeof val === 'string' ? +val : val;
        dur = createDuration(val, period);
        addSubtract(this, dur, direction);
        return this;
    };
}

function addSubtract (mom, duration, isAdding, updateOffset) {
    var milliseconds = duration._milliseconds,
        days = absRound(duration._days),
        months = absRound(duration._months);

    if (!mom.isValid()) {
        // No op
        return;
    }

    updateOffset = updateOffset == null ? true : updateOffset;

    if (milliseconds) {
        mom._d.setTime(mom._d.valueOf() + milliseconds * isAdding);
    }
    if (days) {
        set$1(mom, 'Date', get(mom, 'Date') + days * isAdding);
    }
    if (months) {
        setMonth(mom, get(mom, 'Month') + months * isAdding);
    }
    if (updateOffset) {
        hooks.updateOffset(mom, days || months);
    }
}

var add      = createAdder(1, 'add');
var subtract = createAdder(-1, 'subtract');

function getCalendarFormat(myMoment, now) {
    var diff = myMoment.diff(now, 'days', true);
    return diff < -6 ? 'sameElse' :
            diff < -1 ? 'lastWeek' :
            diff < 0 ? 'lastDay' :
            diff < 1 ? 'sameDay' :
            diff < 2 ? 'nextDay' :
            diff < 7 ? 'nextWeek' : 'sameElse';
}

function calendar$1 (time, formats) {
    // We want to compare the start of today, vs this.
    // Getting start-of-today depends on whether we're local/utc/offset or not.
    var now = time || createLocal(),
        sod = cloneWithOffset(now, this).startOf('day'),
        format = hooks.calendarFormat(this, sod) || 'sameElse';

    var output = formats && (isFunction(formats[format]) ? formats[format].call(this, now) : formats[format]);

    return this.format(output || this.localeData().calendar(format, this, createLocal(now)));
}

function clone () {
    return new Moment(this);
}

function isAfter (input, units) {
    var localInput = isMoment(input) ? input : createLocal(input);
    if (!(this.isValid() && localInput.isValid())) {
        return false;
    }
    units = normalizeUnits(!isUndefined(units) ? units : 'millisecond');
    if (units === 'millisecond') {
        return this.valueOf() > localInput.valueOf();
    } else {
        return localInput.valueOf() < this.clone().startOf(units).valueOf();
    }
}

function isBefore (input, units) {
    var localInput = isMoment(input) ? input : createLocal(input);
    if (!(this.isValid() && localInput.isValid())) {
        return false;
    }
    units = normalizeUnits(!isUndefined(units) ? units : 'millisecond');
    if (units === 'millisecond') {
        return this.valueOf() < localInput.valueOf();
    } else {
        return this.clone().endOf(units).valueOf() < localInput.valueOf();
    }
}

function isBetween (from, to, units, inclusivity) {
    inclusivity = inclusivity || '()';
    return (inclusivity[0] === '(' ? this.isAfter(from, units) : !this.isBefore(from, units)) &&
        (inclusivity[1] === ')' ? this.isBefore(to, units) : !this.isAfter(to, units));
}

function isSame (input, units) {
    var localInput = isMoment(input) ? input : createLocal(input),
        inputMs;
    if (!(this.isValid() && localInput.isValid())) {
        return false;
    }
    units = normalizeUnits(units || 'millisecond');
    if (units === 'millisecond') {
        return this.valueOf() === localInput.valueOf();
    } else {
        inputMs = localInput.valueOf();
        return this.clone().startOf(units).valueOf() <= inputMs && inputMs <= this.clone().endOf(units).valueOf();
    }
}

function isSameOrAfter (input, units) {
    return this.isSame(input, units) || this.isAfter(input,units);
}

function isSameOrBefore (input, units) {
    return this.isSame(input, units) || this.isBefore(input,units);
}

function diff (input, units, asFloat) {
    var that,
        zoneDelta,
        delta, output;

    if (!this.isValid()) {
        return NaN;
    }

    that = cloneWithOffset(input, this);

    if (!that.isValid()) {
        return NaN;
    }

    zoneDelta = (that.utcOffset() - this.utcOffset()) * 6e4;

    units = normalizeUnits(units);

    if (units === 'year' || units === 'month' || units === 'quarter') {
        output = monthDiff(this, that);
        if (units === 'quarter') {
            output = output / 3;
        } else if (units === 'year') {
            output = output / 12;
        }
    } else {
        delta = this - that;
        output = units === 'second' ? delta / 1e3 : // 1000
            units === 'minute' ? delta / 6e4 : // 1000 * 60
            units === 'hour' ? delta / 36e5 : // 1000 * 60 * 60
            units === 'day' ? (delta - zoneDelta) / 864e5 : // 1000 * 60 * 60 * 24, negate dst
            units === 'week' ? (delta - zoneDelta) / 6048e5 : // 1000 * 60 * 60 * 24 * 7, negate dst
            delta;
    }
    return asFloat ? output : absFloor(output);
}

function monthDiff (a, b) {
    // difference in months
    var wholeMonthDiff = ((b.year() - a.year()) * 12) + (b.month() - a.month()),
        // b is in (anchor - 1 month, anchor + 1 month)
        anchor = a.clone().add(wholeMonthDiff, 'months'),
        anchor2, adjust;

    if (b - anchor < 0) {
        anchor2 = a.clone().add(wholeMonthDiff - 1, 'months');
        // linear across the month
        adjust = (b - anchor) / (anchor - anchor2);
    } else {
        anchor2 = a.clone().add(wholeMonthDiff + 1, 'months');
        // linear across the month
        adjust = (b - anchor) / (anchor2 - anchor);
    }

    //check for negative zero, return zero if negative zero
    return -(wholeMonthDiff + adjust) || 0;
}

hooks.defaultFormat = 'YYYY-MM-DDTHH:mm:ssZ';
hooks.defaultFormatUtc = 'YYYY-MM-DDTHH:mm:ss[Z]';

function toString () {
    return this.clone().locale('en').format('ddd MMM DD YYYY HH:mm:ss [GMT]ZZ');
}

function toISOString() {
    if (!this.isValid()) {
        return null;
    }
    var m = this.clone().utc();
    if (m.year() < 0 || m.year() > 9999) {
        return formatMoment(m, 'YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]');
    }
    if (isFunction(Date.prototype.toISOString)) {
        // native implementation is ~50x faster, use it when we can
        return this.toDate().toISOString();
    }
    return formatMoment(m, 'YYYY-MM-DD[T]HH:mm:ss.SSS[Z]');
}

/**
 * Return a human readable representation of a moment that can
 * also be evaluated to get a new moment which is the same
 *
 * @link https://nodejs.org/dist/latest/docs/api/util.html#util_custom_inspect_function_on_objects
 */
function inspect () {
    if (!this.isValid()) {
        return 'moment.invalid(/* ' + this._i + ' */)';
    }
    var func = 'moment';
    var zone = '';
    if (!this.isLocal()) {
        func = this.utcOffset() === 0 ? 'moment.utc' : 'moment.parseZone';
        zone = 'Z';
    }
    var prefix = '[' + func + '("]';
    var year = (0 <= this.year() && this.year() <= 9999) ? 'YYYY' : 'YYYYYY';
    var datetime = '-MM-DD[T]HH:mm:ss.SSS';
    var suffix = zone + '[")]';

    return this.format(prefix + year + datetime + suffix);
}

function format (inputString) {
    if (!inputString) {
        inputString = this.isUtc() ? hooks.defaultFormatUtc : hooks.defaultFormat;
    }
    var output = formatMoment(this, inputString);
    return this.localeData().postformat(output);
}

function from (time, withoutSuffix) {
    if (this.isValid() &&
            ((isMoment(time) && time.isValid()) ||
             createLocal(time).isValid())) {
        return createDuration({to: this, from: time}).locale(this.locale()).humanize(!withoutSuffix);
    } else {
        return this.localeData().invalidDate();
    }
}

function fromNow (withoutSuffix) {
    return this.from(createLocal(), withoutSuffix);
}

function to (time, withoutSuffix) {
    if (this.isValid() &&
            ((isMoment(time) && time.isValid()) ||
             createLocal(time).isValid())) {
        return createDuration({from: this, to: time}).locale(this.locale()).humanize(!withoutSuffix);
    } else {
        return this.localeData().invalidDate();
    }
}

function toNow (withoutSuffix) {
    return this.to(createLocal(), withoutSuffix);
}

// If passed a locale key, it will set the locale for this
// instance.  Otherwise, it will return the locale configuration
// variables for this instance.
function locale (key) {
    var newLocaleData;

    if (key === undefined) {
        return this._locale._abbr;
    } else {
        newLocaleData = getLocale(key);
        if (newLocaleData != null) {
            this._locale = newLocaleData;
        }
        return this;
    }
}

var lang = deprecate(
    'moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.',
    function (key) {
        if (key === undefined) {
            return this.localeData();
        } else {
            return this.locale(key);
        }
    }
);

function localeData () {
    return this._locale;
}

function startOf (units) {
    units = normalizeUnits(units);
    // the following switch intentionally omits break keywords
    // to utilize falling through the cases.
    switch (units) {
        case 'year':
            this.month(0);
            /* falls through */
        case 'quarter':
        case 'month':
            this.date(1);
            /* falls through */
        case 'week':
        case 'isoWeek':
        case 'day':
        case 'date':
            this.hours(0);
            /* falls through */
        case 'hour':
            this.minutes(0);
            /* falls through */
        case 'minute':
            this.seconds(0);
            /* falls through */
        case 'second':
            this.milliseconds(0);
    }

    // weeks are a special case
    if (units === 'week') {
        this.weekday(0);
    }
    if (units === 'isoWeek') {
        this.isoWeekday(1);
    }

    // quarters are also special
    if (units === 'quarter') {
        this.month(Math.floor(this.month() / 3) * 3);
    }

    return this;
}

function endOf (units) {
    units = normalizeUnits(units);
    if (units === undefined || units === 'millisecond') {
        return this;
    }

    // 'date' is an alias for 'day', so it should be considered as such.
    if (units === 'date') {
        units = 'day';
    }

    return this.startOf(units).add(1, (units === 'isoWeek' ? 'week' : units)).subtract(1, 'ms');
}

function valueOf () {
    return this._d.valueOf() - ((this._offset || 0) * 60000);
}

function unix () {
    return Math.floor(this.valueOf() / 1000);
}

function toDate () {
    return new Date(this.valueOf());
}

function toArray () {
    var m = this;
    return [m.year(), m.month(), m.date(), m.hour(), m.minute(), m.second(), m.millisecond()];
}

function toObject () {
    var m = this;
    return {
        years: m.year(),
        months: m.month(),
        date: m.date(),
        hours: m.hours(),
        minutes: m.minutes(),
        seconds: m.seconds(),
        milliseconds: m.milliseconds()
    };
}

function toJSON () {
    // new Date(NaN).toJSON() === null
    return this.isValid() ? this.toISOString() : null;
}

function isValid$2 () {
    return isValid(this);
}

function parsingFlags () {
    return extend({}, getParsingFlags(this));
}

function invalidAt () {
    return getParsingFlags(this).overflow;
}

function creationData() {
    return {
        input: this._i,
        format: this._f,
        locale: this._locale,
        isUTC: this._isUTC,
        strict: this._strict
    };
}

// FORMATTING

addFormatToken(0, ['gg', 2], 0, function () {
    return this.weekYear() % 100;
});

addFormatToken(0, ['GG', 2], 0, function () {
    return this.isoWeekYear() % 100;
});

function addWeekYearFormatToken (token, getter) {
    addFormatToken(0, [token, token.length], 0, getter);
}

addWeekYearFormatToken('gggg',     'weekYear');
addWeekYearFormatToken('ggggg',    'weekYear');
addWeekYearFormatToken('GGGG',  'isoWeekYear');
addWeekYearFormatToken('GGGGG', 'isoWeekYear');

// ALIASES

addUnitAlias('weekYear', 'gg');
addUnitAlias('isoWeekYear', 'GG');

// PRIORITY

addUnitPriority('weekYear', 1);
addUnitPriority('isoWeekYear', 1);


// PARSING

addRegexToken('G',      matchSigned);
addRegexToken('g',      matchSigned);
addRegexToken('GG',     match1to2, match2);
addRegexToken('gg',     match1to2, match2);
addRegexToken('GGGG',   match1to4, match4);
addRegexToken('gggg',   match1to4, match4);
addRegexToken('GGGGG',  match1to6, match6);
addRegexToken('ggggg',  match1to6, match6);

addWeekParseToken(['gggg', 'ggggg', 'GGGG', 'GGGGG'], function (input, week, config, token) {
    week[token.substr(0, 2)] = toInt(input);
});

addWeekParseToken(['gg', 'GG'], function (input, week, config, token) {
    week[token] = hooks.parseTwoDigitYear(input);
});

// MOMENTS

function getSetWeekYear (input) {
    return getSetWeekYearHelper.call(this,
            input,
            this.week(),
            this.weekday(),
            this.localeData()._week.dow,
            this.localeData()._week.doy);
}

function getSetISOWeekYear (input) {
    return getSetWeekYearHelper.call(this,
            input, this.isoWeek(), this.isoWeekday(), 1, 4);
}

function getISOWeeksInYear () {
    return weeksInYear(this.year(), 1, 4);
}

function getWeeksInYear () {
    var weekInfo = this.localeData()._week;
    return weeksInYear(this.year(), weekInfo.dow, weekInfo.doy);
}

function getSetWeekYearHelper(input, week, weekday, dow, doy) {
    var weeksTarget;
    if (input == null) {
        return weekOfYear(this, dow, doy).year;
    } else {
        weeksTarget = weeksInYear(input, dow, doy);
        if (week > weeksTarget) {
            week = weeksTarget;
        }
        return setWeekAll.call(this, input, week, weekday, dow, doy);
    }
}

function setWeekAll(weekYear, week, weekday, dow, doy) {
    var dayOfYearData = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy),
        date = createUTCDate(dayOfYearData.year, 0, dayOfYearData.dayOfYear);

    this.year(date.getUTCFullYear());
    this.month(date.getUTCMonth());
    this.date(date.getUTCDate());
    return this;
}

// FORMATTING

addFormatToken('Q', 0, 'Qo', 'quarter');

// ALIASES

addUnitAlias('quarter', 'Q');

// PRIORITY

addUnitPriority('quarter', 7);

// PARSING

addRegexToken('Q', match1);
addParseToken('Q', function (input, array) {
    array[MONTH] = (toInt(input) - 1) * 3;
});

// MOMENTS

function getSetQuarter (input) {
    return input == null ? Math.ceil((this.month() + 1) / 3) : this.month((input - 1) * 3 + this.month() % 3);
}

// FORMATTING

addFormatToken('D', ['DD', 2], 'Do', 'date');

// ALIASES

addUnitAlias('date', 'D');

// PRIOROITY
addUnitPriority('date', 9);

// PARSING

addRegexToken('D',  match1to2);
addRegexToken('DD', match1to2, match2);
addRegexToken('Do', function (isStrict, locale) {
    // TODO: Remove "ordinalParse" fallback in next major release.
    return isStrict ?
      (locale._dayOfMonthOrdinalParse || locale._ordinalParse) :
      locale._dayOfMonthOrdinalParseLenient;
});

addParseToken(['D', 'DD'], DATE);
addParseToken('Do', function (input, array) {
    array[DATE] = toInt(input.match(match1to2)[0], 10);
});

// MOMENTS

var getSetDayOfMonth = makeGetSet('Date', true);

// FORMATTING

addFormatToken('DDD', ['DDDD', 3], 'DDDo', 'dayOfYear');

// ALIASES

addUnitAlias('dayOfYear', 'DDD');

// PRIORITY
addUnitPriority('dayOfYear', 4);

// PARSING

addRegexToken('DDD',  match1to3);
addRegexToken('DDDD', match3);
addParseToken(['DDD', 'DDDD'], function (input, array, config) {
    config._dayOfYear = toInt(input);
});

// HELPERS

// MOMENTS

function getSetDayOfYear (input) {
    var dayOfYear = Math.round((this.clone().startOf('day') - this.clone().startOf('year')) / 864e5) + 1;
    return input == null ? dayOfYear : this.add((input - dayOfYear), 'd');
}

// FORMATTING

addFormatToken('m', ['mm', 2], 0, 'minute');

// ALIASES

addUnitAlias('minute', 'm');

// PRIORITY

addUnitPriority('minute', 14);

// PARSING

addRegexToken('m',  match1to2);
addRegexToken('mm', match1to2, match2);
addParseToken(['m', 'mm'], MINUTE);

// MOMENTS

var getSetMinute = makeGetSet('Minutes', false);

// FORMATTING

addFormatToken('s', ['ss', 2], 0, 'second');

// ALIASES

addUnitAlias('second', 's');

// PRIORITY

addUnitPriority('second', 15);

// PARSING

addRegexToken('s',  match1to2);
addRegexToken('ss', match1to2, match2);
addParseToken(['s', 'ss'], SECOND);

// MOMENTS

var getSetSecond = makeGetSet('Seconds', false);

// FORMATTING

addFormatToken('S', 0, 0, function () {
    return ~~(this.millisecond() / 100);
});

addFormatToken(0, ['SS', 2], 0, function () {
    return ~~(this.millisecond() / 10);
});

addFormatToken(0, ['SSS', 3], 0, 'millisecond');
addFormatToken(0, ['SSSS', 4], 0, function () {
    return this.millisecond() * 10;
});
addFormatToken(0, ['SSSSS', 5], 0, function () {
    return this.millisecond() * 100;
});
addFormatToken(0, ['SSSSSS', 6], 0, function () {
    return this.millisecond() * 1000;
});
addFormatToken(0, ['SSSSSSS', 7], 0, function () {
    return this.millisecond() * 10000;
});
addFormatToken(0, ['SSSSSSSS', 8], 0, function () {
    return this.millisecond() * 100000;
});
addFormatToken(0, ['SSSSSSSSS', 9], 0, function () {
    return this.millisecond() * 1000000;
});


// ALIASES

addUnitAlias('millisecond', 'ms');

// PRIORITY

addUnitPriority('millisecond', 16);

// PARSING

addRegexToken('S',    match1to3, match1);
addRegexToken('SS',   match1to3, match2);
addRegexToken('SSS',  match1to3, match3);

var token;
for (token = 'SSSS'; token.length <= 9; token += 'S') {
    addRegexToken(token, matchUnsigned);
}

function parseMs(input, array) {
    array[MILLISECOND] = toInt(('0.' + input) * 1000);
}

for (token = 'S'; token.length <= 9; token += 'S') {
    addParseToken(token, parseMs);
}
// MOMENTS

var getSetMillisecond = makeGetSet('Milliseconds', false);

// FORMATTING

addFormatToken('z',  0, 0, 'zoneAbbr');
addFormatToken('zz', 0, 0, 'zoneName');

// MOMENTS

function getZoneAbbr () {
    return this._isUTC ? 'UTC' : '';
}

function getZoneName () {
    return this._isUTC ? 'Coordinated Universal Time' : '';
}

var proto = Moment.prototype;

proto.add               = add;
proto.calendar          = calendar$1;
proto.clone             = clone;
proto.diff              = diff;
proto.endOf             = endOf;
proto.format            = format;
proto.from              = from;
proto.fromNow           = fromNow;
proto.to                = to;
proto.toNow             = toNow;
proto.get               = stringGet;
proto.invalidAt         = invalidAt;
proto.isAfter           = isAfter;
proto.isBefore          = isBefore;
proto.isBetween         = isBetween;
proto.isSame            = isSame;
proto.isSameOrAfter     = isSameOrAfter;
proto.isSameOrBefore    = isSameOrBefore;
proto.isValid           = isValid$2;
proto.lang              = lang;
proto.locale            = locale;
proto.localeData        = localeData;
proto.max               = prototypeMax;
proto.min               = prototypeMin;
proto.parsingFlags      = parsingFlags;
proto.set               = stringSet;
proto.startOf           = startOf;
proto.subtract          = subtract;
proto.toArray           = toArray;
proto.toObject          = toObject;
proto.toDate            = toDate;
proto.toISOString       = toISOString;
proto.inspect           = inspect;
proto.toJSON            = toJSON;
proto.toString          = toString;
proto.unix              = unix;
proto.valueOf           = valueOf;
proto.creationData      = creationData;

// Year
proto.year       = getSetYear;
proto.isLeapYear = getIsLeapYear;

// Week Year
proto.weekYear    = getSetWeekYear;
proto.isoWeekYear = getSetISOWeekYear;

// Quarter
proto.quarter = proto.quarters = getSetQuarter;

// Month
proto.month       = getSetMonth;
proto.daysInMonth = getDaysInMonth;

// Week
proto.week           = proto.weeks        = getSetWeek;
proto.isoWeek        = proto.isoWeeks     = getSetISOWeek;
proto.weeksInYear    = getWeeksInYear;
proto.isoWeeksInYear = getISOWeeksInYear;

// Day
proto.date       = getSetDayOfMonth;
proto.day        = proto.days             = getSetDayOfWeek;
proto.weekday    = getSetLocaleDayOfWeek;
proto.isoWeekday = getSetISODayOfWeek;
proto.dayOfYear  = getSetDayOfYear;

// Hour
proto.hour = proto.hours = getSetHour;

// Minute
proto.minute = proto.minutes = getSetMinute;

// Second
proto.second = proto.seconds = getSetSecond;

// Millisecond
proto.millisecond = proto.milliseconds = getSetMillisecond;

// Offset
proto.utcOffset            = getSetOffset;
proto.utc                  = setOffsetToUTC;
proto.local                = setOffsetToLocal;
proto.parseZone            = setOffsetToParsedOffset;
proto.hasAlignedHourOffset = hasAlignedHourOffset;
proto.isDST                = isDaylightSavingTime;
proto.isLocal              = isLocal;
proto.isUtcOffset          = isUtcOffset;
proto.isUtc                = isUtc;
proto.isUTC                = isUtc;

// Timezone
proto.zoneAbbr = getZoneAbbr;
proto.zoneName = getZoneName;

// Deprecations
proto.dates  = deprecate('dates accessor is deprecated. Use date instead.', getSetDayOfMonth);
proto.months = deprecate('months accessor is deprecated. Use month instead', getSetMonth);
proto.years  = deprecate('years accessor is deprecated. Use year instead', getSetYear);
proto.zone   = deprecate('moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/', getSetZone);
proto.isDSTShifted = deprecate('isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information', isDaylightSavingTimeShifted);

function createUnix (input) {
    return createLocal(input * 1000);
}

function createInZone () {
    return createLocal.apply(null, arguments).parseZone();
}

function preParsePostFormat (string) {
    return string;
}

var proto$1 = Locale.prototype;

proto$1.calendar        = calendar;
proto$1.longDateFormat  = longDateFormat;
proto$1.invalidDate     = invalidDate;
proto$1.ordinal         = ordinal;
proto$1.preparse        = preParsePostFormat;
proto$1.postformat      = preParsePostFormat;
proto$1.relativeTime    = relativeTime;
proto$1.pastFuture      = pastFuture;
proto$1.set             = set;

// Month
proto$1.months            =        localeMonths;
proto$1.monthsShort       =        localeMonthsShort;
proto$1.monthsParse       =        localeMonthsParse;
proto$1.monthsRegex       = monthsRegex;
proto$1.monthsShortRegex  = monthsShortRegex;

// Week
proto$1.week = localeWeek;
proto$1.firstDayOfYear = localeFirstDayOfYear;
proto$1.firstDayOfWeek = localeFirstDayOfWeek;

// Day of Week
proto$1.weekdays       =        localeWeekdays;
proto$1.weekdaysMin    =        localeWeekdaysMin;
proto$1.weekdaysShort  =        localeWeekdaysShort;
proto$1.weekdaysParse  =        localeWeekdaysParse;

proto$1.weekdaysRegex       =        weekdaysRegex;
proto$1.weekdaysShortRegex  =        weekdaysShortRegex;
proto$1.weekdaysMinRegex    =        weekdaysMinRegex;

// Hours
proto$1.isPM = localeIsPM;
proto$1.meridiem = localeMeridiem;

function get$1 (format, index, field, setter) {
    var locale = getLocale();
    var utc = createUTC().set(setter, index);
    return locale[field](utc, format);
}

function listMonthsImpl (format, index, field) {
    if (isNumber(format)) {
        index = format;
        format = undefined;
    }

    format = format || '';

    if (index != null) {
        return get$1(format, index, field, 'month');
    }

    var i;
    var out = [];
    for (i = 0; i < 12; i++) {
        out[i] = get$1(format, i, field, 'month');
    }
    return out;
}

// ()
// (5)
// (fmt, 5)
// (fmt)
// (true)
// (true, 5)
// (true, fmt, 5)
// (true, fmt)
function listWeekdaysImpl (localeSorted, format, index, field) {
    if (typeof localeSorted === 'boolean') {
        if (isNumber(format)) {
            index = format;
            format = undefined;
        }

        format = format || '';
    } else {
        format = localeSorted;
        index = format;
        localeSorted = false;

        if (isNumber(format)) {
            index = format;
            format = undefined;
        }

        format = format || '';
    }

    var locale = getLocale(),
        shift = localeSorted ? locale._week.dow : 0;

    if (index != null) {
        return get$1(format, (index + shift) % 7, field, 'day');
    }

    var i;
    var out = [];
    for (i = 0; i < 7; i++) {
        out[i] = get$1(format, (i + shift) % 7, field, 'day');
    }
    return out;
}

function listMonths (format, index) {
    return listMonthsImpl(format, index, 'months');
}

function listMonthsShort (format, index) {
    return listMonthsImpl(format, index, 'monthsShort');
}

function listWeekdays (localeSorted, format, index) {
    return listWeekdaysImpl(localeSorted, format, index, 'weekdays');
}

function listWeekdaysShort (localeSorted, format, index) {
    return listWeekdaysImpl(localeSorted, format, index, 'weekdaysShort');
}

function listWeekdaysMin (localeSorted, format, index) {
    return listWeekdaysImpl(localeSorted, format, index, 'weekdaysMin');
}

getSetGlobalLocale('en', {
    dayOfMonthOrdinalParse: /\d{1,2}(th|st|nd|rd)/,
    ordinal : function (number) {
        var b = number % 10,
            output = (toInt(number % 100 / 10) === 1) ? 'th' :
            (b === 1) ? 'st' :
            (b === 2) ? 'nd' :
            (b === 3) ? 'rd' : 'th';
        return number + output;
    }
});

// Side effect imports
hooks.lang = deprecate('moment.lang is deprecated. Use moment.locale instead.', getSetGlobalLocale);
hooks.langData = deprecate('moment.langData is deprecated. Use moment.localeData instead.', getLocale);

var mathAbs = Math.abs;

function abs () {
    var data           = this._data;

    this._milliseconds = mathAbs(this._milliseconds);
    this._days         = mathAbs(this._days);
    this._months       = mathAbs(this._months);

    data.milliseconds  = mathAbs(data.milliseconds);
    data.seconds       = mathAbs(data.seconds);
    data.minutes       = mathAbs(data.minutes);
    data.hours         = mathAbs(data.hours);
    data.months        = mathAbs(data.months);
    data.years         = mathAbs(data.years);

    return this;
}

function addSubtract$1 (duration, input, value, direction) {
    var other = createDuration(input, value);

    duration._milliseconds += direction * other._milliseconds;
    duration._days         += direction * other._days;
    duration._months       += direction * other._months;

    return duration._bubble();
}

// supports only 2.0-style add(1, 's') or add(duration)
function add$1 (input, value) {
    return addSubtract$1(this, input, value, 1);
}

// supports only 2.0-style subtract(1, 's') or subtract(duration)
function subtract$1 (input, value) {
    return addSubtract$1(this, input, value, -1);
}

function absCeil (number) {
    if (number < 0) {
        return Math.floor(number);
    } else {
        return Math.ceil(number);
    }
}

function bubble () {
    var milliseconds = this._milliseconds;
    var days         = this._days;
    var months       = this._months;
    var data         = this._data;
    var seconds, minutes, hours, years, monthsFromDays;

    // if we have a mix of positive and negative values, bubble down first
    // check: https://github.com/moment/moment/issues/2166
    if (!((milliseconds >= 0 && days >= 0 && months >= 0) ||
            (milliseconds <= 0 && days <= 0 && months <= 0))) {
        milliseconds += absCeil(monthsToDays(months) + days) * 864e5;
        days = 0;
        months = 0;
    }

    // The following code bubbles up values, see the tests for
    // examples of what that means.
    data.milliseconds = milliseconds % 1000;

    seconds           = absFloor(milliseconds / 1000);
    data.seconds      = seconds % 60;

    minutes           = absFloor(seconds / 60);
    data.minutes      = minutes % 60;

    hours             = absFloor(minutes / 60);
    data.hours        = hours % 24;

    days += absFloor(hours / 24);

    // convert days to months
    monthsFromDays = absFloor(daysToMonths(days));
    months += monthsFromDays;
    days -= absCeil(monthsToDays(monthsFromDays));

    // 12 months -> 1 year
    years = absFloor(months / 12);
    months %= 12;

    data.days   = days;
    data.months = months;
    data.years  = years;

    return this;
}

function daysToMonths (days) {
    // 400 years have 146097 days (taking into account leap year rules)
    // 400 years have 12 months === 4800
    return days * 4800 / 146097;
}

function monthsToDays (months) {
    // the reverse of daysToMonths
    return months * 146097 / 4800;
}

function as (units) {
    if (!this.isValid()) {
        return NaN;
    }
    var days;
    var months;
    var milliseconds = this._milliseconds;

    units = normalizeUnits(units);

    if (units === 'month' || units === 'year') {
        days   = this._days   + milliseconds / 864e5;
        months = this._months + daysToMonths(days);
        return units === 'month' ? months : months / 12;
    } else {
        // handle milliseconds separately because of floating point math errors (issue #1867)
        days = this._days + Math.round(monthsToDays(this._months));
        switch (units) {
            case 'week'   : return days / 7     + milliseconds / 6048e5;
            case 'day'    : return days         + milliseconds / 864e5;
            case 'hour'   : return days * 24    + milliseconds / 36e5;
            case 'minute' : return days * 1440  + milliseconds / 6e4;
            case 'second' : return days * 86400 + milliseconds / 1000;
            // Math.floor prevents floating point math errors here
            case 'millisecond': return Math.floor(days * 864e5) + milliseconds;
            default: throw new Error('Unknown unit ' + units);
        }
    }
}

// TODO: Use this.as('ms')?
function valueOf$1 () {
    if (!this.isValid()) {
        return NaN;
    }
    return (
        this._milliseconds +
        this._days * 864e5 +
        (this._months % 12) * 2592e6 +
        toInt(this._months / 12) * 31536e6
    );
}

function makeAs (alias) {
    return function () {
        return this.as(alias);
    };
}

var asMilliseconds = makeAs('ms');
var asSeconds      = makeAs('s');
var asMinutes      = makeAs('m');
var asHours        = makeAs('h');
var asDays         = makeAs('d');
var asWeeks        = makeAs('w');
var asMonths       = makeAs('M');
var asYears        = makeAs('y');

function get$2 (units) {
    units = normalizeUnits(units);
    return this.isValid() ? this[units + 's']() : NaN;
}

function makeGetter(name) {
    return function () {
        return this.isValid() ? this._data[name] : NaN;
    };
}

var milliseconds = makeGetter('milliseconds');
var seconds      = makeGetter('seconds');
var minutes      = makeGetter('minutes');
var hours        = makeGetter('hours');
var days         = makeGetter('days');
var months       = makeGetter('months');
var years        = makeGetter('years');

function weeks () {
    return absFloor(this.days() / 7);
}

var round = Math.round;
var thresholds = {
    ss: 44,         // a few seconds to seconds
    s : 45,         // seconds to minute
    m : 45,         // minutes to hour
    h : 22,         // hours to day
    d : 26,         // days to month
    M : 11          // months to year
};

// helper function for moment.fn.from, moment.fn.fromNow, and moment.duration.fn.humanize
function substituteTimeAgo(string, number, withoutSuffix, isFuture, locale) {
    return locale.relativeTime(number || 1, !!withoutSuffix, string, isFuture);
}

function relativeTime$1 (posNegDuration, withoutSuffix, locale) {
    var duration = createDuration(posNegDuration).abs();
    var seconds  = round(duration.as('s'));
    var minutes  = round(duration.as('m'));
    var hours    = round(duration.as('h'));
    var days     = round(duration.as('d'));
    var months   = round(duration.as('M'));
    var years    = round(duration.as('y'));

    var a = seconds <= thresholds.ss && ['s', seconds]  ||
            seconds < thresholds.s   && ['ss', seconds] ||
            minutes <= 1             && ['m']           ||
            minutes < thresholds.m   && ['mm', minutes] ||
            hours   <= 1             && ['h']           ||
            hours   < thresholds.h   && ['hh', hours]   ||
            days    <= 1             && ['d']           ||
            days    < thresholds.d   && ['dd', days]    ||
            months  <= 1             && ['M']           ||
            months  < thresholds.M   && ['MM', months]  ||
            years   <= 1             && ['y']           || ['yy', years];

    a[2] = withoutSuffix;
    a[3] = +posNegDuration > 0;
    a[4] = locale;
    return substituteTimeAgo.apply(null, a);
}

// This function allows you to set the rounding function for relative time strings
function getSetRelativeTimeRounding (roundingFunction) {
    if (roundingFunction === undefined) {
        return round;
    }
    if (typeof(roundingFunction) === 'function') {
        round = roundingFunction;
        return true;
    }
    return false;
}

// This function allows you to set a threshold for relative time strings
function getSetRelativeTimeThreshold (threshold, limit) {
    if (thresholds[threshold] === undefined) {
        return false;
    }
    if (limit === undefined) {
        return thresholds[threshold];
    }
    thresholds[threshold] = limit;
    if (threshold === 's') {
        thresholds.ss = limit - 1;
    }
    return true;
}

function humanize (withSuffix) {
    if (!this.isValid()) {
        return this.localeData().invalidDate();
    }

    var locale = this.localeData();
    var output = relativeTime$1(this, !withSuffix, locale);

    if (withSuffix) {
        output = locale.pastFuture(+this, output);
    }

    return locale.postformat(output);
}

var abs$1 = Math.abs;

function toISOString$1() {
    // for ISO strings we do not use the normal bubbling rules:
    //  * milliseconds bubble up until they become hours
    //  * days do not bubble at all
    //  * months bubble up until they become years
    // This is because there is no context-free conversion between hours and days
    // (think of clock changes)
    // and also not between days and months (28-31 days per month)
    if (!this.isValid()) {
        return this.localeData().invalidDate();
    }

    var seconds = abs$1(this._milliseconds) / 1000;
    var days         = abs$1(this._days);
    var months       = abs$1(this._months);
    var minutes, hours, years;

    // 3600 seconds -> 60 minutes -> 1 hour
    minutes           = absFloor(seconds / 60);
    hours             = absFloor(minutes / 60);
    seconds %= 60;
    minutes %= 60;

    // 12 months -> 1 year
    years  = absFloor(months / 12);
    months %= 12;


    // inspired by https://github.com/dordille/moment-isoduration/blob/master/moment.isoduration.js
    var Y = years;
    var M = months;
    var D = days;
    var h = hours;
    var m = minutes;
    var s = seconds;
    var total = this.asSeconds();

    if (!total) {
        // this is the same as C#'s (Noda) and python (isodate)...
        // but not other JS (goog.date)
        return 'P0D';
    }

    return (total < 0 ? '-' : '') +
        'P' +
        (Y ? Y + 'Y' : '') +
        (M ? M + 'M' : '') +
        (D ? D + 'D' : '') +
        ((h || m || s) ? 'T' : '') +
        (h ? h + 'H' : '') +
        (m ? m + 'M' : '') +
        (s ? s + 'S' : '');
}

var proto$2 = Duration.prototype;

proto$2.isValid        = isValid$1;
proto$2.abs            = abs;
proto$2.add            = add$1;
proto$2.subtract       = subtract$1;
proto$2.as             = as;
proto$2.asMilliseconds = asMilliseconds;
proto$2.asSeconds      = asSeconds;
proto$2.asMinutes      = asMinutes;
proto$2.asHours        = asHours;
proto$2.asDays         = asDays;
proto$2.asWeeks        = asWeeks;
proto$2.asMonths       = asMonths;
proto$2.asYears        = asYears;
proto$2.valueOf        = valueOf$1;
proto$2._bubble        = bubble;
proto$2.get            = get$2;
proto$2.milliseconds   = milliseconds;
proto$2.seconds        = seconds;
proto$2.minutes        = minutes;
proto$2.hours          = hours;
proto$2.days           = days;
proto$2.weeks          = weeks;
proto$2.months         = months;
proto$2.years          = years;
proto$2.humanize       = humanize;
proto$2.toISOString    = toISOString$1;
proto$2.toString       = toISOString$1;
proto$2.toJSON         = toISOString$1;
proto$2.locale         = locale;
proto$2.localeData     = localeData;

// Deprecations
proto$2.toIsoString = deprecate('toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)', toISOString$1);
proto$2.lang = lang;

// Side effect imports

// FORMATTING

addFormatToken('X', 0, 0, 'unix');
addFormatToken('x', 0, 0, 'valueOf');

// PARSING

addRegexToken('x', matchSigned);
addRegexToken('X', matchTimestamp);
addParseToken('X', function (input, array, config) {
    config._d = new Date(parseFloat(input, 10) * 1000);
});
addParseToken('x', function (input, array, config) {
    config._d = new Date(toInt(input));
});

// Side effect imports


hooks.version = '2.18.1';

setHookCallback(createLocal);

hooks.fn                    = proto;
hooks.min                   = min;
hooks.max                   = max;
hooks.now                   = now;
hooks.utc                   = createUTC;
hooks.unix                  = createUnix;
hooks.months                = listMonths;
hooks.isDate                = isDate;
hooks.locale                = getSetGlobalLocale;
hooks.invalid               = createInvalid;
hooks.duration              = createDuration;
hooks.isMoment              = isMoment;
hooks.weekdays              = listWeekdays;
hooks.parseZone             = createInZone;
hooks.localeData            = getLocale;
hooks.isDuration            = isDuration;
hooks.monthsShort           = listMonthsShort;
hooks.weekdaysMin           = listWeekdaysMin;
hooks.defineLocale          = defineLocale;
hooks.updateLocale          = updateLocale;
hooks.locales               = listLocales;
hooks.weekdaysShort         = listWeekdaysShort;
hooks.normalizeUnits        = normalizeUnits;
hooks.relativeTimeRounding = getSetRelativeTimeRounding;
hooks.relativeTimeThreshold = getSetRelativeTimeThreshold;
hooks.calendarFormat        = getCalendarFormat;
hooks.prototype             = proto;

return hooks;

})));

},{}],85:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],86:[function(require,module,exports){
var Vue // late bind
var map = Object.create(null)
var shimmed = false
var isBrowserify = false

/**
 * Determine compatibility and apply patch.
 *
 * @param {Function} vue
 * @param {Boolean} browserify
 */

exports.install = function (vue, browserify) {
  if (shimmed) return
  shimmed = true

  Vue = vue
  isBrowserify = browserify

  exports.compatible = !!Vue.internalDirectives
  if (!exports.compatible) {
    console.warn(
      '[HMR] vue-loader hot reload is only compatible with ' +
      'Vue.js 1.0.0+.'
    )
    return
  }

  // patch view directive
  patchView(Vue.internalDirectives.component)
  console.log('[HMR] Vue component hot reload shim applied.')
  // shim router-view if present
  var routerView = Vue.elementDirective('router-view')
  if (routerView) {
    patchView(routerView)
    console.log('[HMR] vue-router <router-view> hot reload shim applied.')
  }
}

/**
 * Shim the view directive (component or router-view).
 *
 * @param {Object} View
 */

function patchView (View) {
  var unbuild = View.unbuild
  View.unbuild = function (defer) {
    if (!this.hotUpdating) {
      var prevComponent = this.childVM && this.childVM.constructor
      removeView(prevComponent, this)
      // defer = true means we are transitioning to a new
      // Component. Register this new component to the list.
      if (defer) {
        addView(this.Component, this)
      }
    }
    // call original
    return unbuild.call(this, defer)
  }
}

/**
 * Add a component view to a Component's hot list
 *
 * @param {Function} Component
 * @param {Directive} view - view directive instance
 */

function addView (Component, view) {
  var id = Component && Component.options.hotID
  if (id) {
    if (!map[id]) {
      map[id] = {
        Component: Component,
        views: [],
        instances: []
      }
    }
    map[id].views.push(view)
  }
}

/**
 * Remove a component view from a Component's hot list
 *
 * @param {Function} Component
 * @param {Directive} view - view directive instance
 */

function removeView (Component, view) {
  var id = Component && Component.options.hotID
  if (id) {
    map[id].views.$remove(view)
  }
}

/**
 * Create a record for a hot module, which keeps track of its construcotr,
 * instnaces and views (component directives or router-views).
 *
 * @param {String} id
 * @param {Object} options
 */

exports.createRecord = function (id, options) {
  if (typeof options === 'function') {
    options = options.options
  }
  if (typeof options.el !== 'string' && typeof options.data !== 'object') {
    makeOptionsHot(id, options)
    map[id] = {
      Component: null,
      views: [],
      instances: []
    }
  }
}

/**
 * Make a Component options object hot.
 *
 * @param {String} id
 * @param {Object} options
 */

function makeOptionsHot (id, options) {
  options.hotID = id
  injectHook(options, 'created', function () {
    var record = map[id]
    if (!record.Component) {
      record.Component = this.constructor
    }
    record.instances.push(this)
  })
  injectHook(options, 'beforeDestroy', function () {
    map[id].instances.$remove(this)
  })
}

/**
 * Inject a hook to a hot reloadable component so that
 * we can keep track of it.
 *
 * @param {Object} options
 * @param {String} name
 * @param {Function} hook
 */

function injectHook (options, name, hook) {
  var existing = options[name]
  options[name] = existing
    ? Array.isArray(existing)
      ? existing.concat(hook)
      : [existing, hook]
    : [hook]
}

/**
 * Update a hot component.
 *
 * @param {String} id
 * @param {Object|null} newOptions
 * @param {String|null} newTemplate
 */

exports.update = function (id, newOptions, newTemplate) {
  var record = map[id]
  // force full-reload if an instance of the component is active but is not
  // managed by a view
  if (!record || (record.instances.length && !record.views.length)) {
    console.log('[HMR] Root or manually-mounted instance modified. Full reload may be required.')
    if (!isBrowserify) {
      window.location.reload()
    } else {
      // browserify-hmr somehow sends incomplete bundle if we reload here
      return
    }
  }
  if (!isBrowserify) {
    // browserify-hmr already logs this
    console.log('[HMR] Updating component: ' + format(id))
  }
  var Component = record.Component
  // update constructor
  if (newOptions) {
    // in case the user exports a constructor
    Component = record.Component = typeof newOptions === 'function'
      ? newOptions
      : Vue.extend(newOptions)
    makeOptionsHot(id, Component.options)
  }
  if (newTemplate) {
    Component.options.template = newTemplate
  }
  // handle recursive lookup
  if (Component.options.name) {
    Component.options.components[Component.options.name] = Component
  }
  // reset constructor cached linker
  Component.linker = null
  // reload all views
  record.views.forEach(function (view) {
    updateView(view, Component)
  })
  // flush devtools
  if (window.__VUE_DEVTOOLS_GLOBAL_HOOK__) {
    window.__VUE_DEVTOOLS_GLOBAL_HOOK__.emit('flush')
  }
}

/**
 * Update a component view instance
 *
 * @param {Directive} view
 * @param {Function} Component
 */

function updateView (view, Component) {
  if (!view._bound) {
    return
  }
  view.Component = Component
  view.hotUpdating = true
  // disable transitions
  view.vm._isCompiled = false
  // save state
  var state = extractState(view.childVM)
  // remount, make sure to disable keep-alive
  var keepAlive = view.keepAlive
  view.keepAlive = false
  view.mountComponent()
  view.keepAlive = keepAlive
  // restore state
  restoreState(view.childVM, state, true)
  // re-eanble transitions
  view.vm._isCompiled = true
  view.hotUpdating = false
}

/**
 * Extract state from a Vue instance.
 *
 * @param {Vue} vm
 * @return {Object}
 */

function extractState (vm) {
  return {
    cid: vm.constructor.cid,
    data: vm.$data,
    children: vm.$children.map(extractState)
  }
}

/**
 * Restore state to a reloaded Vue instance.
 *
 * @param {Vue} vm
 * @param {Object} state
 */

function restoreState (vm, state, isRoot) {
  var oldAsyncConfig
  if (isRoot) {
    // set Vue into sync mode during state rehydration
    oldAsyncConfig = Vue.config.async
    Vue.config.async = false
  }
  // actual restore
  if (isRoot || !vm._props) {
    vm.$data = state.data
  } else {
    Object.keys(state.data).forEach(function (key) {
      if (!vm._props[key]) {
        // for non-root, only restore non-props fields
        vm.$data[key] = state.data[key]
      }
    })
  }
  // verify child consistency
  var hasSameChildren = vm.$children.every(function (c, i) {
    return state.children[i] && state.children[i].cid === c.constructor.cid
  })
  if (hasSameChildren) {
    // rehydrate children
    vm.$children.forEach(function (c, i) {
      restoreState(c, state.children[i])
    })
  }
  if (isRoot) {
    Vue.config.async = oldAsyncConfig
  }
}

function format (id) {
  var match = id.match(/[^\/]+\.vue$/)
  return match ? match[0] : id
}

},{}],87:[function(require,module,exports){
(function (process){
/*!
 * vue-i18n v4.10.0
 * (c) 2017 kazuya kawaguchi
 * Released under the MIT License.
 */
'use strict';

var babelHelpers = {};
babelHelpers.typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};
babelHelpers;

/**
 * warn
 *
 * @param {String} msg
 * @param {Error} [err]
 *
 */

function warn(msg, err) {
  if (window.console) {
    console.warn('[vue-i18n] ' + msg);
    if (err) {
      console.warn(err.stack);
    }
  }
}

function Asset (Vue, langVM) {
  /**
   * Register or retrieve a global locale definition.
   *
   * @param {String} id
   * @param {Object | Function | Promise} definition
   * @param {Function} cb
   */

  Vue.locale = function (id, definition, cb) {
    if (definition === undefined) {
      // gettter
      return langVM.locales[id];
    } else {
      // setter
      if (definition === null) {
        langVM.locales[id] = undefined;
        delete langVM.locales[id];
      } else {
        setLocale(id, definition, function (locale) {
          if (locale) {
            langVM.locales[id] = locale;
          } else {
            warn('failed set `' + id + '` locale');
          }
          cb && cb();
        });
      }
    }
  };
}

function setLocale(id, definition, cb) {
  var _this = this;

  if ((typeof definition === 'undefined' ? 'undefined' : babelHelpers.typeof(definition)) === 'object') {
    // sync
    cb(definition);
  } else {
    (function () {
      var future = definition.call(_this);
      if (typeof future === 'function') {
        if (future.resolved) {
          // cached
          cb(future.resolved);
        } else if (future.requested) {
          // pool callbacks
          future.pendingCallbacks.push(cb);
        } else {
          (function () {
            future.requested = true;
            var cbs = future.pendingCallbacks = [cb];
            future(function (locale) {
              // resolve
              future.resolved = locale;
              for (var i = 0, l = cbs.length; i < l; i++) {
                cbs[i](locale);
              }
            }, function () {
              // reject
              cb();
            });
          })();
        }
      } else if (isPromise(future)) {
        // promise
        future.then(function (locale) {
          // resolve
          cb(locale);
        }, function () {
          // reject
          cb();
        }).catch(function (err) {
          console.error(err);
          cb();
        });
      }
    })();
  }
}

/**
 * Forgiving check for a promise
 *
 * @param {Object} p
 * @return {Boolean}
 */

function isPromise(p) {
  return p && typeof p.then === 'function';
}

function Override (Vue, langVM, version) {
  function update(vm) {
    if (version > 1) {
      vm.$forceUpdate();
    } else {
      var i = vm._watchers.length;
      while (i--) {
        vm._watchers[i].update(true); // shallow updates
      }
    }
  }

  // override _init
  var init = Vue.prototype._init;
  Vue.prototype._init = function (options) {
    var _this = this;

    init.call(this, options);

    if (!this.$parent) {
      // root
      this._$lang = langVM;
      this._langUnwatch = this._$lang.$watch('$data', function (val, old) {
        update(_this);
      }, { deep: true });
    }
  };

  // override _destroy
  var destroy = Vue.prototype._destroy;
  Vue.prototype._destroy = function () {
    if (!this.$parent && this._langUnwatch) {
      this._langUnwatch();
      this._langUnwatch = null;
      this._$lang = null;
    }

    destroy.apply(this, arguments);
  };
}

/**
 * Observer
 */

var Watcher = void 0;
/**
 * getWatcher
 *
 * @param {Vue} vm
 * @return {Watcher}
 */

function getWatcher(vm) {
  if (!Watcher) {
    var unwatch = vm.$watch('__watcher__', function (a) {});
    Watcher = vm._watchers[0].constructor;
    unwatch();
  }
  return Watcher;
}

var Dep = void 0;
/**
 * getDep
 *
 * @param {Vue} vm
 * @return {Dep}
 */

function getDep(vm) {
  if (!Dep && vm && vm._data && vm._data.__ob__ && vm._data.__ob__.dep) {
    Dep = vm._data.__ob__.dep.constructor;
  }
  return Dep;
}

var fallback = void 0; // fallback lang
var missingHandler = null; // missing handler
var i18nFormatter = null; // custom formatter

function Config (Vue, langVM, lang) {
  var bind = Vue.util.bind;

  var Watcher = getWatcher(langVM);
  var Dep = getDep(langVM);

  function makeComputedGetter(getter, owner) {
    var watcher = new Watcher(owner, getter, null, {
      lazy: true
    });

    return function computedGetter() {
      watcher.dirty && watcher.evaluate();
      Dep && Dep.target && watcher.depend();
      return watcher.value;
    };
  }

  // define Vue.config.lang configration
  Object.defineProperty(Vue.config, 'lang', {
    enumerable: true,
    configurable: true,
    get: makeComputedGetter(function () {
      return langVM.lang;
    }, langVM),
    set: bind(function (val) {
      langVM.lang = val;
    }, langVM)
  });

  // define Vue.config.fallbackLang configration
  fallback = lang;
  Object.defineProperty(Vue.config, 'fallbackLang', {
    enumerable: true,
    configurable: true,
    get: function get() {
      return fallback;
    },
    set: function set(val) {
      fallback = val;
    }
  });

  // define Vue.config.missingHandler configration
  Object.defineProperty(Vue.config, 'missingHandler', {
    enumerable: true,
    configurable: true,
    get: function get() {
      return missingHandler;
    },
    set: function set(val) {
      missingHandler = val;
    }
  });

  // define Vue.config.i18Formatter configration
  Object.defineProperty(Vue.config, 'i18nFormatter', {
    enumerable: true,
    configurable: true,
    get: function get() {
      return i18nFormatter;
    },
    set: function set(val) {
      i18nFormatter = val;
    }
  });
}

/**
 * utilites
 */

/**
 * isNil
 *
 * @param {*} val
 * @return Boolean
 */
function isNil(val) {
  return val === null || val === undefined;
}

/**
 *  String format template
 *  - Inspired:
 *    https://github.com/Matt-Esch/string-template/index.js
 */

var RE_NARGS = /(%|)\{([0-9a-zA-Z_]+)\}/g;

function Format (Vue) {
  var hasOwn = Vue.util.hasOwn;

  /**
   * template
   *
   * @param {String} string
   * @param {Array} ...args
   * @return {String}
   */

  function template(string) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    if (args.length === 1 && babelHelpers.typeof(args[0]) === 'object') {
      args = args[0];
    } else {
      args = {};
    }

    if (!args || !args.hasOwnProperty) {
      args = {};
    }

    return string.replace(RE_NARGS, function (match, prefix, i, index) {
      var result = void 0;

      if (string[index - 1] === '{' && string[index + match.length] === '}') {
        return i;
      } else {
        result = hasOwn(args, i) ? args[i] : match;
        if (isNil(result)) {
          return '';
        }

        return result;
      }
    });
  }

  return template;
}

/**
 *  Path paerser
 *  - Inspired:  
 *    Vue.js Path parser
 */

// cache
var pathCache = Object.create(null);

// actions
var APPEND = 0;
var PUSH = 1;
var INC_SUB_PATH_DEPTH = 2;
var PUSH_SUB_PATH = 3;

// states
var BEFORE_PATH = 0;
var IN_PATH = 1;
var BEFORE_IDENT = 2;
var IN_IDENT = 3;
var IN_SUB_PATH = 4;
var IN_SINGLE_QUOTE = 5;
var IN_DOUBLE_QUOTE = 6;
var AFTER_PATH = 7;
var ERROR = 8;

var pathStateMachine = [];

pathStateMachine[BEFORE_PATH] = {
  'ws': [BEFORE_PATH],
  'ident': [IN_IDENT, APPEND],
  '[': [IN_SUB_PATH],
  'eof': [AFTER_PATH]
};

pathStateMachine[IN_PATH] = {
  'ws': [IN_PATH],
  '.': [BEFORE_IDENT],
  '[': [IN_SUB_PATH],
  'eof': [AFTER_PATH]
};

pathStateMachine[BEFORE_IDENT] = {
  'ws': [BEFORE_IDENT],
  'ident': [IN_IDENT, APPEND],
  '0': [IN_IDENT, APPEND],
  'number': [IN_IDENT, APPEND]
};

pathStateMachine[IN_IDENT] = {
  'ident': [IN_IDENT, APPEND],
  '0': [IN_IDENT, APPEND],
  'number': [IN_IDENT, APPEND],
  'ws': [IN_PATH, PUSH],
  '.': [BEFORE_IDENT, PUSH],
  '[': [IN_SUB_PATH, PUSH],
  'eof': [AFTER_PATH, PUSH]
};

pathStateMachine[IN_SUB_PATH] = {
  "'": [IN_SINGLE_QUOTE, APPEND],
  '"': [IN_DOUBLE_QUOTE, APPEND],
  '[': [IN_SUB_PATH, INC_SUB_PATH_DEPTH],
  ']': [IN_PATH, PUSH_SUB_PATH],
  'eof': ERROR,
  'else': [IN_SUB_PATH, APPEND]
};

pathStateMachine[IN_SINGLE_QUOTE] = {
  "'": [IN_SUB_PATH, APPEND],
  'eof': ERROR,
  'else': [IN_SINGLE_QUOTE, APPEND]
};

pathStateMachine[IN_DOUBLE_QUOTE] = {
  '"': [IN_SUB_PATH, APPEND],
  'eof': ERROR,
  'else': [IN_DOUBLE_QUOTE, APPEND]
};

/**
 * Check if an expression is a literal value.
 *
 * @param {String} exp
 * @return {Boolean}
 */

var literalValueRE = /^\s?(true|false|-?[\d.]+|'[^']*'|"[^"]*")\s?$/;
function isLiteral(exp) {
  return literalValueRE.test(exp);
}

/**
 * Strip quotes from a string
 *
 * @param {String} str
 * @return {String | false}
 */

function stripQuotes(str) {
  var a = str.charCodeAt(0);
  var b = str.charCodeAt(str.length - 1);
  return a === b && (a === 0x22 || a === 0x27) ? str.slice(1, -1) : str;
}

/**
 * Determine the type of a character in a keypath.
 *
 * @param {Char} ch
 * @return {String} type
 */

function getPathCharType(ch) {
  if (ch === undefined) {
    return 'eof';
  }

  var code = ch.charCodeAt(0);

  switch (code) {
    case 0x5B: // [
    case 0x5D: // ]
    case 0x2E: // .
    case 0x22: // "
    case 0x27: // '
    case 0x30:
      // 0
      return ch;

    case 0x5F: // _
    case 0x24: // $
    case 0x2D:
      // -
      return 'ident';

    case 0x20: // Space
    case 0x09: // Tab
    case 0x0A: // Newline
    case 0x0D: // Return
    case 0xA0: // No-break space
    case 0xFEFF: // Byte Order Mark
    case 0x2028: // Line Separator
    case 0x2029:
      // Paragraph Separator
      return 'ws';
  }

  // a-z, A-Z
  if (code >= 0x61 && code <= 0x7A || code >= 0x41 && code <= 0x5A) {
    return 'ident';
  }

  // 1-9
  if (code >= 0x31 && code <= 0x39) {
    return 'number';
  }

  return 'else';
}

/**
 * Format a subPath, return its plain form if it is
 * a literal string or number. Otherwise prepend the
 * dynamic indicator (*).
 *
 * @param {String} path
 * @return {String}
 */

function formatSubPath(path) {
  var trimmed = path.trim();
  // invalid leading 0
  if (path.charAt(0) === '0' && isNaN(path)) {
    return false;
  }

  return isLiteral(trimmed) ? stripQuotes(trimmed) : '*' + trimmed;
}

/**
 * Parse a string path into an array of segments
 *
 * @param {String} path
 * @return {Array|undefined}
 */

function parse(path) {
  var keys = [];
  var index = -1;
  var mode = BEFORE_PATH;
  var subPathDepth = 0;
  var c = void 0,
      newChar = void 0,
      key = void 0,
      type = void 0,
      transition = void 0,
      action = void 0,
      typeMap = void 0;

  var actions = [];

  actions[PUSH] = function () {
    if (key !== undefined) {
      keys.push(key);
      key = undefined;
    }
  };

  actions[APPEND] = function () {
    if (key === undefined) {
      key = newChar;
    } else {
      key += newChar;
    }
  };

  actions[INC_SUB_PATH_DEPTH] = function () {
    actions[APPEND]();
    subPathDepth++;
  };

  actions[PUSH_SUB_PATH] = function () {
    if (subPathDepth > 0) {
      subPathDepth--;
      mode = IN_SUB_PATH;
      actions[APPEND]();
    } else {
      subPathDepth = 0;
      key = formatSubPath(key);
      if (key === false) {
        return false;
      } else {
        actions[PUSH]();
      }
    }
  };

  function maybeUnescapeQuote() {
    var nextChar = path[index + 1];
    if (mode === IN_SINGLE_QUOTE && nextChar === "'" || mode === IN_DOUBLE_QUOTE && nextChar === '"') {
      index++;
      newChar = '\\' + nextChar;
      actions[APPEND]();
      return true;
    }
  }

  while (mode != null) {
    index++;
    c = path[index];

    if (c === '\\' && maybeUnescapeQuote()) {
      continue;
    }

    type = getPathCharType(c);
    typeMap = pathStateMachine[mode];
    transition = typeMap[type] || typeMap['else'] || ERROR;

    if (transition === ERROR) {
      return; // parse error
    }

    mode = transition[0];
    action = actions[transition[1]];
    if (action) {
      newChar = transition[2];
      newChar = newChar === undefined ? c : newChar;
      if (action() === false) {
        return;
      }
    }

    if (mode === AFTER_PATH) {
      keys.raw = path;
      return keys;
    }
  }
}

/**
 * External parse that check for a cache hit first
 *
 * @param {String} path
 * @return {Array|undefined}
 */

function parsePath(path) {
  var hit = pathCache[path];
  if (!hit) {
    hit = parse(path);
    if (hit) {
      pathCache[path] = hit;
    }
  }
  return hit;
}

function Path (Vue) {
  var _Vue$util = Vue.util,
      isObject = _Vue$util.isObject,
      isPlainObject = _Vue$util.isPlainObject,
      hasOwn = _Vue$util.hasOwn;


  function empty(target) {
    if (target === null || target === undefined) {
      return true;
    }

    if (Array.isArray(target)) {
      if (target.length > 0) {
        return false;
      }
      if (target.length === 0) {
        return true;
      }
    } else if (isPlainObject(target)) {
      /* eslint-disable prefer-const */
      for (var key in target) {
        if (hasOwn(target, key)) {
          return false;
        }
      }
      /* eslint-enable prefer-const */
    }

    return true;
  }

  /**
   * Get value from path string
   *
   * @param {Object} obj
   * @param {String} path
   * @return value
   */

  function getValue(obj, path) {
    if (!isObject(obj)) {
      return null;
    }

    var paths = parsePath(path);
    if (empty(paths)) {
      return null;
    }

    var length = paths.length;
    var ret = null;
    var last = obj;
    var i = 0;
    while (i < length) {
      var value = last[paths[i]];
      if (value === undefined) {
        last = null;
        break;
      }
      last = value;
      i++;
    }

    ret = last;
    return ret;
  }

  return getValue;
}

/**
 * extend
 *
 * @param {Vue} Vue
 * @return {Vue}
 */

function Extend (Vue) {
  var _Vue$util = Vue.util,
      isObject = _Vue$util.isObject,
      bind = _Vue$util.bind;

  var format = Format(Vue);
  var getValue = Path(Vue);

  function parseArgs() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var lang = Vue.config.lang;
    var fallback = Vue.config.fallbackLang;

    if (args.length === 1) {
      if (isObject(args[0]) || Array.isArray(args[0])) {
        args = args[0];
      } else if (typeof args[0] === 'string') {
        lang = args[0];
      }
    } else if (args.length === 2) {
      if (typeof args[0] === 'string') {
        lang = args[0];
      }
      if (isObject(args[1]) || Array.isArray(args[1])) {
        args = args[1];
      }
    }

    return { lang: lang, fallback: fallback, params: args };
  }

  function exist(locale, key) {
    if (!locale || !key) {
      return false;
    }
    return !isNil(getValue(locale, key));
  }

  function interpolate(locale, key, args) {
    if (!locale) {
      return null;
    }

    var val = getValue(locale, key);
    if (Array.isArray(val)) {
      return val;
    }
    if (isNil(val)) {
      val = locale[key];
    }
    if (isNil(val)) {
      return null;
    }
    if (typeof val !== 'string') {
      warn("Value of key '" + key + "' is not a string!");return null;
    }

    // Check for the existance of links within the translated string
    if (val.indexOf('@:') >= 0) {
      // Match all the links within the local
      // We are going to replace each of
      // them with its translation
      var matches = val.match(/(@:[\w|.]+)/g);
      for (var idx in matches) {
        var link = matches[idx];
        // Remove the leading @:
        var linkPlaceholder = link.substr(2);
        // Translate the link
        var translatedstring = interpolate(locale, linkPlaceholder, args);
        // Replace the link with the translated string
        val = val.replace(link, translatedstring);
      }
    }

    return !args ? val : Vue.config.i18nFormatter ? Vue.config.i18nFormatter.apply(null, [val].concat(args)) : format(val, args);
  }

  function translate(getter, lang, fallback, key, params) {
    var res = null;
    res = interpolate(getter(lang), key, params);
    if (!isNil(res)) {
      return res;
    }

    res = interpolate(getter(fallback), key, params);
    if (!isNil(res)) {
      if (process.env.NODE_ENV !== 'production') {
        warn('Fall back to translate the keypath "' + key + '" with "' + fallback + '" language.');
      }
      return res;
    } else {
      return null;
    }
  }

  function warnDefault(lang, key, vm, result) {
    if (!isNil(result)) {
      return result;
    }
    if (Vue.config.missingHandler) {
      Vue.config.missingHandler.apply(null, [lang, key, vm]);
    } else {
      if (process.env.NODE_ENV !== 'production') {
        warn('Cannot translate the value of keypath "' + key + '". ' + 'Use the value of keypath as default');
      }
    }
    return key;
  }

  function getAssetLocale(lang) {
    return Vue.locale(lang);
  }

  function getComponentLocale(lang) {
    return this.$options.locales[lang];
  }

  function getOldChoiceIndexFixed(choice) {
    return choice ? choice > 1 ? 1 : 0 : 1;
  }

  function getChoiceIndex(choice, choicesLength) {
    choice = Math.abs(choice);

    if (choicesLength === 2) {
      return getOldChoiceIndexFixed(choice);
    }

    return choice ? Math.min(choice, 2) : 0;
  }

  function fetchChoice(locale, choice) {
    if (!locale && typeof locale !== 'string') {
      return null;
    }
    var choices = locale.split('|');

    choice = getChoiceIndex(choice, choices.length);
    if (!choices[choice]) {
      return locale;
    }
    return choices[choice].trim();
  }

  /**
   * Vue.t
   *
   * @param {String} key
   * @param {Array} ...args
   * @return {String}
   */

  Vue.t = function (key) {
    for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      args[_key2 - 1] = arguments[_key2];
    }

    if (!key) {
      return '';
    }

    var _parseArgs = parseArgs.apply(undefined, args),
        lang = _parseArgs.lang,
        fallback = _parseArgs.fallback,
        params = _parseArgs.params;

    return warnDefault(lang, key, null, translate(getAssetLocale, lang, fallback, key, params));
  };

  /**
   * Vue.tc
   *
   * @param {String} key
   * @param {number|undefined} choice
   * @param {Array} ...args
   * @return {String}
   */

  Vue.tc = function (key, choice) {
    for (var _len3 = arguments.length, args = Array(_len3 > 2 ? _len3 - 2 : 0), _key3 = 2; _key3 < _len3; _key3++) {
      args[_key3 - 2] = arguments[_key3];
    }

    return fetchChoice(Vue.t.apply(Vue, [key].concat(args)), choice);
  };

  /**
   * Vue.te
   *
   * @param {String} key
   * @param {Array} ...args
   * @return {Boolean}
   */

  Vue.te = function (key) {
    for (var _len4 = arguments.length, args = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
      args[_key4 - 1] = arguments[_key4];
    }

    var _parseArgs2 = parseArgs.apply(undefined, args),
        lang = _parseArgs2.lang;

    return exist(getAssetLocale(lang), key);
  };

  /**
   * $t
   *
   * @param {String} key
   * @param {Array} ...args
   * @return {String}
   */

  Vue.prototype.$t = function (key) {
    if (!key) {
      return '';
    }

    for (var _len5 = arguments.length, args = Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
      args[_key5 - 1] = arguments[_key5];
    }

    var _parseArgs3 = parseArgs.apply(undefined, args),
        lang = _parseArgs3.lang,
        fallback = _parseArgs3.fallback,
        params = _parseArgs3.params;

    var res = null;
    if (this.$options.locales) {
      res = translate(bind(getComponentLocale, this), lang, fallback, key, params);
      if (res) {
        return res;
      }
    }
    return warnDefault(lang, key, this, translate(getAssetLocale, lang, fallback, key, params));
  };

  /**
   * $tc
   *
   * @param {String} key
   * @param {number|undefined} choice
   * @param {Array} ...args
   * @return {String}
   */

  Vue.prototype.$tc = function (key, choice) {
    if (typeof choice !== 'number' && typeof choice !== 'undefined') {
      return key;
    }

    for (var _len6 = arguments.length, args = Array(_len6 > 2 ? _len6 - 2 : 0), _key6 = 2; _key6 < _len6; _key6++) {
      args[_key6 - 2] = arguments[_key6];
    }

    return fetchChoice(this.$t.apply(this, [key].concat(args)), choice);
  };

  /**
   * $te
   *
   * @param {String} key
   * @param {Array} ...args
   * @return {Boolean}
   *
   */

  Vue.prototype.$te = function (key) {
    for (var _len7 = arguments.length, args = Array(_len7 > 1 ? _len7 - 1 : 0), _key7 = 1; _key7 < _len7; _key7++) {
      args[_key7 - 1] = arguments[_key7];
    }

    var _parseArgs4 = parseArgs.apply(undefined, args),
        lang = _parseArgs4.lang;

    var found = false;
    if (this.$options.locales) {
      // exist component locale
      found = exist(bind(getComponentLocale)(lang), key);
    }
    if (!found) {
      found = exist(getAssetLocale(lang), key);
    }
    return found;
  };

  Vue.mixin({
    computed: {
      $lang: function $lang() {
        return Vue.config.lang;
      }
    }
  });

  return Vue;
}

var langVM = void 0; // singleton


/**
 * plugin
 *
 * @param {Object} Vue
 * @param {Object} opts
 */

function plugin(Vue) {
  var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var version = Vue.version && Number(Vue.version.split('.')[0]) || -1;

  if (process.env.NODE_ENV !== 'production' && plugin.installed) {
    warn('already installed.');
    return;
  }

  if (process.env.NODE_ENV !== 'production' && version < 1) {
    warn('vue-i18n (' + plugin.version + ') need to use vue version 1.0 or later (vue version: ' + Vue.version + ').');
    return;
  }

  var lang = 'en';
  setupLangVM(Vue, lang);

  Asset(Vue, langVM);
  Override(Vue, langVM, version);
  Config(Vue, langVM, lang);
  Extend(Vue);
}

function setupLangVM(Vue, lang) {
  var silent = Vue.config.silent;
  Vue.config.silent = true;
  if (!langVM) {
    langVM = new Vue({ data: { lang: lang, locales: {} } });
  }
  Vue.config.silent = silent;
}

plugin.version = '__VERSION__';

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(plugin);
}

module.exports = plugin;
}).call(this,require('_process'))
},{"_process":85}],88:[function(require,module,exports){
/*!
 * vue-resource v0.7.4
 * https://github.com/vuejs/vue-resource
 * Released under the MIT License.
 */

'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
};

/**
 * Utility functions.
 */

var util = {};
var config = {};
var array = [];
var console = window.console;
function Util (Vue) {
    util = Vue.util;
    config = Vue.config;
}

var isArray = Array.isArray;

function warn(msg) {
    if (console && util.warn && (!config.silent || config.debug)) {
        console.warn('[VueResource warn]: ' + msg);
    }
}

function error(msg) {
    if (console) {
        console.error(msg);
    }
}

function nextTick(cb, ctx) {
    return util.nextTick(cb, ctx);
}

function trim(str) {
    return str.replace(/^\s*|\s*$/g, '');
}

function toLower(str) {
    return str ? str.toLowerCase() : '';
}

function isString(val) {
    return typeof val === 'string';
}

function isFunction(val) {
    return typeof val === 'function';
}

function isObject(obj) {
    return obj !== null && (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object';
}

function isPlainObject(obj) {
    return isObject(obj) && Object.getPrototypeOf(obj) == Object.prototype;
}

function options(fn, obj, opts) {

    opts = opts || {};

    if (isFunction(opts)) {
        opts = opts.call(obj);
    }

    return merge(fn.bind({ $vm: obj, $options: opts }), fn, { $options: opts });
}

function each(obj, iterator) {

    var i, key;

    if (typeof obj.length == 'number') {
        for (i = 0; i < obj.length; i++) {
            iterator.call(obj[i], obj[i], i);
        }
    } else if (isObject(obj)) {
        for (key in obj) {
            if (obj.hasOwnProperty(key)) {
                iterator.call(obj[key], obj[key], key);
            }
        }
    }

    return obj;
}

function extend(target) {

    var args = array.slice.call(arguments, 1);

    args.forEach(function (arg) {
        _merge(target, arg);
    });

    return target;
}

function merge(target) {

    var args = array.slice.call(arguments, 1);

    args.forEach(function (arg) {
        _merge(target, arg, true);
    });

    return target;
}

function _merge(target, source, deep) {
    for (var key in source) {
        if (deep && (isPlainObject(source[key]) || isArray(source[key]))) {
            if (isPlainObject(source[key]) && !isPlainObject(target[key])) {
                target[key] = {};
            }
            if (isArray(source[key]) && !isArray(target[key])) {
                target[key] = [];
            }
            _merge(target[key], source[key], deep);
        } else if (source[key] !== undefined) {
            target[key] = source[key];
        }
    }
}

function root (options, next) {

    var url = next(options);

    if (isString(options.root) && !url.match(/^(https?:)?\//)) {
        url = options.root + '/' + url;
    }

    return url;
}

function query (options, next) {

    var urlParams = Object.keys(Url.options.params),
        query = {},
        url = next(options);

    each(options.params, function (value, key) {
        if (urlParams.indexOf(key) === -1) {
            query[key] = value;
        }
    });

    query = Url.params(query);

    if (query) {
        url += (url.indexOf('?') == -1 ? '?' : '&') + query;
    }

    return url;
}

function legacy (options, next) {

    var variables = [],
        url = next(options);

    url = url.replace(/(\/?):([a-z]\w*)/gi, function (match, slash, name) {

        warn('The `:' + name + '` parameter syntax has been deprecated. Use the `{' + name + '}` syntax instead.');

        if (options.params[name]) {
            variables.push(name);
            return slash + encodeUriSegment(options.params[name]);
        }

        return '';
    });

    variables.forEach(function (key) {
        delete options.params[key];
    });

    return url;
}

function encodeUriSegment(value) {

    return encodeUriQuery(value, true).replace(/%26/gi, '&').replace(/%3D/gi, '=').replace(/%2B/gi, '+');
}

function encodeUriQuery(value, spaces) {

    return encodeURIComponent(value).replace(/%40/gi, '@').replace(/%3A/gi, ':').replace(/%24/g, '$').replace(/%2C/gi, ',').replace(/%20/g, spaces ? '%20' : '+');
}

/**
 * URL Template v2.0.6 (https://github.com/bramstein/url-template)
 */

function expand(url, params, variables) {

    var tmpl = parse(url),
        expanded = tmpl.expand(params);

    if (variables) {
        variables.push.apply(variables, tmpl.vars);
    }

    return expanded;
}

function parse(template) {

    var operators = ['+', '#', '.', '/', ';', '?', '&'],
        variables = [];

    return {
        vars: variables,
        expand: function expand(context) {
            return template.replace(/\{([^\{\}]+)\}|([^\{\}]+)/g, function (_, expression, literal) {
                if (expression) {

                    var operator = null,
                        values = [];

                    if (operators.indexOf(expression.charAt(0)) !== -1) {
                        operator = expression.charAt(0);
                        expression = expression.substr(1);
                    }

                    expression.split(/,/g).forEach(function (variable) {
                        var tmp = /([^:\*]*)(?::(\d+)|(\*))?/.exec(variable);
                        values.push.apply(values, getValues(context, operator, tmp[1], tmp[2] || tmp[3]));
                        variables.push(tmp[1]);
                    });

                    if (operator && operator !== '+') {

                        var separator = ',';

                        if (operator === '?') {
                            separator = '&';
                        } else if (operator !== '#') {
                            separator = operator;
                        }

                        return (values.length !== 0 ? operator : '') + values.join(separator);
                    } else {
                        return values.join(',');
                    }
                } else {
                    return encodeReserved(literal);
                }
            });
        }
    };
}

function getValues(context, operator, key, modifier) {

    var value = context[key],
        result = [];

    if (isDefined(value) && value !== '') {
        if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
            value = value.toString();

            if (modifier && modifier !== '*') {
                value = value.substring(0, parseInt(modifier, 10));
            }

            result.push(encodeValue(operator, value, isKeyOperator(operator) ? key : null));
        } else {
            if (modifier === '*') {
                if (Array.isArray(value)) {
                    value.filter(isDefined).forEach(function (value) {
                        result.push(encodeValue(operator, value, isKeyOperator(operator) ? key : null));
                    });
                } else {
                    Object.keys(value).forEach(function (k) {
                        if (isDefined(value[k])) {
                            result.push(encodeValue(operator, value[k], k));
                        }
                    });
                }
            } else {
                var tmp = [];

                if (Array.isArray(value)) {
                    value.filter(isDefined).forEach(function (value) {
                        tmp.push(encodeValue(operator, value));
                    });
                } else {
                    Object.keys(value).forEach(function (k) {
                        if (isDefined(value[k])) {
                            tmp.push(encodeURIComponent(k));
                            tmp.push(encodeValue(operator, value[k].toString()));
                        }
                    });
                }

                if (isKeyOperator(operator)) {
                    result.push(encodeURIComponent(key) + '=' + tmp.join(','));
                } else if (tmp.length !== 0) {
                    result.push(tmp.join(','));
                }
            }
        }
    } else {
        if (operator === ';') {
            result.push(encodeURIComponent(key));
        } else if (value === '' && (operator === '&' || operator === '?')) {
            result.push(encodeURIComponent(key) + '=');
        } else if (value === '') {
            result.push('');
        }
    }

    return result;
}

function isDefined(value) {
    return value !== undefined && value !== null;
}

function isKeyOperator(operator) {
    return operator === ';' || operator === '&' || operator === '?';
}

function encodeValue(operator, value, key) {

    value = operator === '+' || operator === '#' ? encodeReserved(value) : encodeURIComponent(value);

    if (key) {
        return encodeURIComponent(key) + '=' + value;
    } else {
        return value;
    }
}

function encodeReserved(str) {
    return str.split(/(%[0-9A-Fa-f]{2})/g).map(function (part) {
        if (!/%[0-9A-Fa-f]/.test(part)) {
            part = encodeURI(part);
        }
        return part;
    }).join('');
}

function template (options) {

    var variables = [],
        url = expand(options.url, options.params, variables);

    variables.forEach(function (key) {
        delete options.params[key];
    });

    return url;
}

/**
 * Service for URL templating.
 */

var ie = document.documentMode;
var el = document.createElement('a');

function Url(url, params) {

    var self = this || {},
        options = url,
        transform;

    if (isString(url)) {
        options = { url: url, params: params };
    }

    options = merge({}, Url.options, self.$options, options);

    Url.transforms.forEach(function (handler) {
        transform = factory(handler, transform, self.$vm);
    });

    return transform(options);
}

/**
 * Url options.
 */

Url.options = {
    url: '',
    root: null,
    params: {}
};

/**
 * Url transforms.
 */

Url.transforms = [template, legacy, query, root];

/**
 * Encodes a Url parameter string.
 *
 * @param {Object} obj
 */

Url.params = function (obj) {

    var params = [],
        escape = encodeURIComponent;

    params.add = function (key, value) {

        if (isFunction(value)) {
            value = value();
        }

        if (value === null) {
            value = '';
        }

        this.push(escape(key) + '=' + escape(value));
    };

    serialize(params, obj);

    return params.join('&').replace(/%20/g, '+');
};

/**
 * Parse a URL and return its components.
 *
 * @param {String} url
 */

Url.parse = function (url) {

    if (ie) {
        el.href = url;
        url = el.href;
    }

    el.href = url;

    return {
        href: el.href,
        protocol: el.protocol ? el.protocol.replace(/:$/, '') : '',
        port: el.port,
        host: el.host,
        hostname: el.hostname,
        pathname: el.pathname.charAt(0) === '/' ? el.pathname : '/' + el.pathname,
        search: el.search ? el.search.replace(/^\?/, '') : '',
        hash: el.hash ? el.hash.replace(/^#/, '') : ''
    };
};

function factory(handler, next, vm) {
    return function (options) {
        return handler.call(vm, options, next);
    };
}

function serialize(params, obj, scope) {

    var array = isArray(obj),
        plain = isPlainObject(obj),
        hash;

    each(obj, function (value, key) {

        hash = isObject(value) || isArray(value);

        if (scope) {
            key = scope + '[' + (plain || hash ? key : '') + ']';
        }

        if (!scope && array) {
            params.add(value.name, value.value);
        } else if (hash) {
            serialize(params, value, key);
        } else {
            params.add(key, value);
        }
    });
}

/**
 * Promises/A+ polyfill v1.1.4 (https://github.com/bramstein/promis)
 */

var RESOLVED = 0;
var REJECTED = 1;
var PENDING = 2;

function Promise$2(executor) {

    this.state = PENDING;
    this.value = undefined;
    this.deferred = [];

    var promise = this;

    try {
        executor(function (x) {
            promise.resolve(x);
        }, function (r) {
            promise.reject(r);
        });
    } catch (e) {
        promise.reject(e);
    }
}

Promise$2.reject = function (r) {
    return new Promise$2(function (resolve, reject) {
        reject(r);
    });
};

Promise$2.resolve = function (x) {
    return new Promise$2(function (resolve, reject) {
        resolve(x);
    });
};

Promise$2.all = function all(iterable) {
    return new Promise$2(function (resolve, reject) {
        var count = 0,
            result = [];

        if (iterable.length === 0) {
            resolve(result);
        }

        function resolver(i) {
            return function (x) {
                result[i] = x;
                count += 1;

                if (count === iterable.length) {
                    resolve(result);
                }
            };
        }

        for (var i = 0; i < iterable.length; i += 1) {
            Promise$2.resolve(iterable[i]).then(resolver(i), reject);
        }
    });
};

Promise$2.race = function race(iterable) {
    return new Promise$2(function (resolve, reject) {
        for (var i = 0; i < iterable.length; i += 1) {
            Promise$2.resolve(iterable[i]).then(resolve, reject);
        }
    });
};

var p$1 = Promise$2.prototype;

p$1.resolve = function resolve(x) {
    var promise = this;

    if (promise.state === PENDING) {
        if (x === promise) {
            throw new TypeError('Promise settled with itself.');
        }

        var called = false;

        try {
            var then = x && x['then'];

            if (x !== null && (typeof x === 'undefined' ? 'undefined' : _typeof(x)) === 'object' && typeof then === 'function') {
                then.call(x, function (x) {
                    if (!called) {
                        promise.resolve(x);
                    }
                    called = true;
                }, function (r) {
                    if (!called) {
                        promise.reject(r);
                    }
                    called = true;
                });
                return;
            }
        } catch (e) {
            if (!called) {
                promise.reject(e);
            }
            return;
        }

        promise.state = RESOLVED;
        promise.value = x;
        promise.notify();
    }
};

p$1.reject = function reject(reason) {
    var promise = this;

    if (promise.state === PENDING) {
        if (reason === promise) {
            throw new TypeError('Promise settled with itself.');
        }

        promise.state = REJECTED;
        promise.value = reason;
        promise.notify();
    }
};

p$1.notify = function notify() {
    var promise = this;

    nextTick(function () {
        if (promise.state !== PENDING) {
            while (promise.deferred.length) {
                var deferred = promise.deferred.shift(),
                    onResolved = deferred[0],
                    onRejected = deferred[1],
                    resolve = deferred[2],
                    reject = deferred[3];

                try {
                    if (promise.state === RESOLVED) {
                        if (typeof onResolved === 'function') {
                            resolve(onResolved.call(undefined, promise.value));
                        } else {
                            resolve(promise.value);
                        }
                    } else if (promise.state === REJECTED) {
                        if (typeof onRejected === 'function') {
                            resolve(onRejected.call(undefined, promise.value));
                        } else {
                            reject(promise.value);
                        }
                    }
                } catch (e) {
                    reject(e);
                }
            }
        }
    });
};

p$1.then = function then(onResolved, onRejected) {
    var promise = this;

    return new Promise$2(function (resolve, reject) {
        promise.deferred.push([onResolved, onRejected, resolve, reject]);
        promise.notify();
    });
};

p$1.catch = function (onRejected) {
    return this.then(undefined, onRejected);
};

var PromiseObj = window.Promise || Promise$2;

function Promise$1(executor, context) {

    if (executor instanceof PromiseObj) {
        this.promise = executor;
    } else {
        this.promise = new PromiseObj(executor.bind(context));
    }

    this.context = context;
}

Promise$1.all = function (iterable, context) {
    return new Promise$1(PromiseObj.all(iterable), context);
};

Promise$1.resolve = function (value, context) {
    return new Promise$1(PromiseObj.resolve(value), context);
};

Promise$1.reject = function (reason, context) {
    return new Promise$1(PromiseObj.reject(reason), context);
};

Promise$1.race = function (iterable, context) {
    return new Promise$1(PromiseObj.race(iterable), context);
};

var p = Promise$1.prototype;

p.bind = function (context) {
    this.context = context;
    return this;
};

p.then = function (fulfilled, rejected) {

    if (fulfilled && fulfilled.bind && this.context) {
        fulfilled = fulfilled.bind(this.context);
    }

    if (rejected && rejected.bind && this.context) {
        rejected = rejected.bind(this.context);
    }

    this.promise = this.promise.then(fulfilled, rejected);

    return this;
};

p.catch = function (rejected) {

    if (rejected && rejected.bind && this.context) {
        rejected = rejected.bind(this.context);
    }

    this.promise = this.promise.catch(rejected);

    return this;
};

p.finally = function (callback) {

    return this.then(function (value) {
        callback.call(this);
        return value;
    }, function (reason) {
        callback.call(this);
        return PromiseObj.reject(reason);
    });
};

p.success = function (callback) {

    warn('The `success` method has been deprecated. Use the `then` method instead.');

    return this.then(function (response) {
        return callback.call(this, response.data, response.status, response) || response;
    });
};

p.error = function (callback) {

    warn('The `error` method has been deprecated. Use the `catch` method instead.');

    return this.catch(function (response) {
        return callback.call(this, response.data, response.status, response) || response;
    });
};

p.always = function (callback) {

    warn('The `always` method has been deprecated. Use the `finally` method instead.');

    var cb = function cb(response) {
        return callback.call(this, response.data, response.status, response) || response;
    };

    return this.then(cb, cb);
};

function xdrClient (request) {
    return new Promise$1(function (resolve) {

        var xdr = new XDomainRequest(),
            response = { request: request },
            handler;

        request.cancel = function () {
            xdr.abort();
        };

        xdr.open(request.method, Url(request), true);

        handler = function handler(event) {

            response.data = xdr.responseText;
            response.status = xdr.status;
            response.statusText = xdr.statusText || '';

            resolve(response);
        };

        xdr.timeout = 0;
        xdr.onload = handler;
        xdr.onabort = handler;
        xdr.onerror = handler;
        xdr.ontimeout = function () {};
        xdr.onprogress = function () {};

        xdr.send(request.data);
    });
}

var originUrl = Url.parse(location.href);
var supportCors = 'withCredentials' in new XMLHttpRequest();

var exports$1 = {
    request: function request(_request) {

        if (_request.crossOrigin === null) {
            _request.crossOrigin = crossOrigin(_request);
        }

        if (_request.crossOrigin) {

            if (!supportCors) {
                _request.client = xdrClient;
            }

            _request.emulateHTTP = false;
        }

        return _request;
    }
};

function crossOrigin(request) {

    var requestUrl = Url.parse(Url(request));

    return requestUrl.protocol !== originUrl.protocol || requestUrl.host !== originUrl.host;
}

var exports$2 = {
    request: function request(_request) {

        if (_request.emulateJSON && isPlainObject(_request.data)) {
            _request.headers['Content-Type'] = 'application/x-www-form-urlencoded';
            _request.data = Url.params(_request.data);
        }

        if (isObject(_request.data) && /FormData/i.test(_request.data.toString())) {
            delete _request.headers['Content-Type'];
        }

        if (isPlainObject(_request.data)) {
            _request.data = JSON.stringify(_request.data);
        }

        return _request;
    },
    response: function response(_response) {

        try {
            _response.data = JSON.parse(_response.data);
        } catch (e) {}

        return _response;
    }
};

function jsonpClient (request) {
    return new Promise$1(function (resolve) {

        var callback = '_jsonp' + Math.random().toString(36).substr(2),
            response = { request: request, data: null },
            handler,
            script;

        request.params[request.jsonp] = callback;
        request.cancel = function () {
            handler({ type: 'cancel' });
        };

        script = document.createElement('script');
        script.src = Url(request);
        script.type = 'text/javascript';
        script.async = true;

        window[callback] = function (data) {
            response.data = data;
        };

        handler = function handler(event) {

            if (event.type === 'load' && response.data !== null) {
                response.status = 200;
            } else if (event.type === 'error') {
                response.status = 404;
            } else {
                response.status = 0;
            }

            resolve(response);

            delete window[callback];
            document.body.removeChild(script);
        };

        script.onload = handler;
        script.onerror = handler;

        document.body.appendChild(script);
    });
}

var exports$3 = {
    request: function request(_request) {

        if (_request.method == 'JSONP') {
            _request.client = jsonpClient;
        }

        return _request;
    }
};

var exports$4 = {
    request: function request(_request) {

        if (isFunction(_request.beforeSend)) {
            _request.beforeSend.call(this, _request);
        }

        return _request;
    }
};

/**
 * HTTP method override Interceptor.
 */

var exports$5 = {
    request: function request(_request) {

        if (_request.emulateHTTP && /^(PUT|PATCH|DELETE)$/i.test(_request.method)) {
            _request.headers['X-HTTP-Method-Override'] = _request.method;
            _request.method = 'POST';
        }

        return _request;
    }
};

var exports$6 = {
    request: function request(_request) {

        _request.method = _request.method.toUpperCase();
        _request.headers = extend({}, Http.headers.common, !_request.crossOrigin ? Http.headers.custom : {}, Http.headers[_request.method.toLowerCase()], _request.headers);

        if (isPlainObject(_request.data) && /^(GET|JSONP)$/i.test(_request.method)) {
            extend(_request.params, _request.data);
            delete _request.data;
        }

        return _request;
    }
};

/**
 * Timeout Interceptor.
 */

var exports$7 = function exports() {

    var timeout;

    return {
        request: function request(_request) {

            if (_request.timeout) {
                timeout = setTimeout(function () {
                    _request.cancel();
                }, _request.timeout);
            }

            return _request;
        },
        response: function response(_response) {

            clearTimeout(timeout);

            return _response;
        }
    };
};

function interceptor (handler, vm) {

    return function (client) {

        if (isFunction(handler)) {
            handler = handler.call(vm, Promise$1);
        }

        return function (request) {

            if (isFunction(handler.request)) {
                request = handler.request.call(vm, request);
            }

            return when(request, function (request) {
                return when(client(request), function (response) {

                    if (isFunction(handler.response)) {
                        response = handler.response.call(vm, response);
                    }

                    return response;
                });
            });
        };
    };
}

function when(value, fulfilled, rejected) {

    var promise = Promise$1.resolve(value);

    if (arguments.length < 2) {
        return promise;
    }

    return promise.then(fulfilled, rejected);
}

function xhrClient (request) {
    return new Promise$1(function (resolve) {

        var xhr = new XMLHttpRequest(),
            response = { request: request },
            handler;

        request.cancel = function () {
            xhr.abort();
        };

        xhr.open(request.method, Url(request), true);

        handler = function handler(event) {

            response.data = 'response' in xhr ? xhr.response : xhr.responseText;
            response.status = xhr.status === 1223 ? 204 : xhr.status; // IE9 status bug
            response.statusText = trim(xhr.statusText || '');
            response.headers = xhr.getAllResponseHeaders();

            resolve(response);
        };

        xhr.timeout = 0;
        xhr.onload = handler;
        xhr.onabort = handler;
        xhr.onerror = handler;
        xhr.ontimeout = function () {};
        xhr.onprogress = function () {};

        if (isPlainObject(request.xhr)) {
            extend(xhr, request.xhr);
        }

        if (isPlainObject(request.upload)) {
            extend(xhr.upload, request.upload);
        }

        each(request.headers || {}, function (value, header) {
            xhr.setRequestHeader(header, value);
        });

        xhr.send(request.data);
    });
}

function Client (request) {

    var response = (request.client || xhrClient)(request);

    return Promise$1.resolve(response).then(function (response) {

        if (response.headers) {

            var headers = parseHeaders(response.headers);

            response.headers = function (name) {

                if (name) {
                    return headers[toLower(name)];
                }

                return headers;
            };
        }

        response.ok = response.status >= 200 && response.status < 300;

        return response;
    });
}

function parseHeaders(str) {

    var headers = {},
        value,
        name,
        i;

    if (isString(str)) {
        each(str.split('\n'), function (row) {

            i = row.indexOf(':');
            name = trim(toLower(row.slice(0, i)));
            value = trim(row.slice(i + 1));

            if (headers[name]) {

                if (isArray(headers[name])) {
                    headers[name].push(value);
                } else {
                    headers[name] = [headers[name], value];
                }
            } else {

                headers[name] = value;
            }
        });
    }

    return headers;
}

/**
 * Service for sending network requests.
 */

var jsonType = { 'Content-Type': 'application/json' };

function Http(url, options) {

    var self = this || {},
        client = Client,
        request,
        promise;

    Http.interceptors.forEach(function (handler) {
        client = interceptor(handler, self.$vm)(client);
    });

    options = isObject(url) ? url : extend({ url: url }, options);
    request = merge({}, Http.options, self.$options, options);
    promise = client(request).bind(self.$vm).then(function (response) {

        return response.ok ? response : Promise$1.reject(response);
    }, function (response) {

        if (response instanceof Error) {
            error(response);
        }

        return Promise$1.reject(response);
    });

    if (request.success) {
        promise.success(request.success);
    }

    if (request.error) {
        promise.error(request.error);
    }

    return promise;
}

Http.options = {
    method: 'get',
    data: '',
    params: {},
    headers: {},
    xhr: null,
    upload: null,
    jsonp: 'callback',
    beforeSend: null,
    crossOrigin: null,
    emulateHTTP: false,
    emulateJSON: false,
    timeout: 0
};

Http.headers = {
    put: jsonType,
    post: jsonType,
    patch: jsonType,
    delete: jsonType,
    common: { 'Accept': 'application/json, text/plain, */*' },
    custom: { 'X-Requested-With': 'XMLHttpRequest' }
};

Http.interceptors = [exports$4, exports$7, exports$3, exports$5, exports$2, exports$6, exports$1];

['get', 'put', 'post', 'patch', 'delete', 'jsonp'].forEach(function (method) {

    Http[method] = function (url, data, success, options) {

        if (isFunction(data)) {
            options = success;
            success = data;
            data = undefined;
        }

        if (isObject(success)) {
            options = success;
            success = undefined;
        }

        return this(url, extend({ method: method, data: data, success: success }, options));
    };
});

function Resource(url, params, actions, options) {

    var self = this || {},
        resource = {};

    actions = extend({}, Resource.actions, actions);

    each(actions, function (action, name) {

        action = merge({ url: url, params: params || {} }, options, action);

        resource[name] = function () {
            return (self.$http || Http)(opts(action, arguments));
        };
    });

    return resource;
}

function opts(action, args) {

    var options = extend({}, action),
        params = {},
        data,
        success,
        error;

    switch (args.length) {

        case 4:

            error = args[3];
            success = args[2];

        case 3:
        case 2:

            if (isFunction(args[1])) {

                if (isFunction(args[0])) {

                    success = args[0];
                    error = args[1];

                    break;
                }

                success = args[1];
                error = args[2];
            } else {

                params = args[0];
                data = args[1];
                success = args[2];

                break;
            }

        case 1:

            if (isFunction(args[0])) {
                success = args[0];
            } else if (/^(POST|PUT|PATCH)$/i.test(options.method)) {
                data = args[0];
            } else {
                params = args[0];
            }

            break;

        case 0:

            break;

        default:

            throw 'Expected up to 4 arguments [params, data, success, error], got ' + args.length + ' arguments';
    }

    options.data = data;
    options.params = extend({}, options.params, params);

    if (success) {
        options.success = success;
    }

    if (error) {
        options.error = error;
    }

    return options;
}

Resource.actions = {

    get: { method: 'GET' },
    save: { method: 'POST' },
    query: { method: 'GET' },
    update: { method: 'PUT' },
    remove: { method: 'DELETE' },
    delete: { method: 'DELETE' }

};

function plugin(Vue) {

    if (plugin.installed) {
        return;
    }

    Util(Vue);

    Vue.url = Url;
    Vue.http = Http;
    Vue.resource = Resource;
    Vue.Promise = Promise$1;

    Object.defineProperties(Vue.prototype, {

        $url: {
            get: function get() {
                return options(Vue.url, this, this.$options.url);
            }
        },

        $http: {
            get: function get() {
                return options(Vue.http, this, this.$options.http);
            }
        },

        $resource: {
            get: function get() {
                return Vue.resource.bind(this);
            }
        },

        $promise: {
            get: function get() {
                var _this = this;

                return function (executor) {
                    return new Vue.Promise(executor, _this);
                };
            }
        }

    });
}

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(plugin);
}

module.exports = plugin;
},{}],89:[function(require,module,exports){
(function (process){
/*!
 * Vue.js v1.0.28
 * (c) 2016 Evan You
 * Released under the MIT License.
 */
'use strict';

function set(obj, key, val) {
  if (hasOwn(obj, key)) {
    obj[key] = val;
    return;
  }
  if (obj._isVue) {
    set(obj._data, key, val);
    return;
  }
  var ob = obj.__ob__;
  if (!ob) {
    obj[key] = val;
    return;
  }
  ob.convert(key, val);
  ob.dep.notify();
  if (ob.vms) {
    var i = ob.vms.length;
    while (i--) {
      var vm = ob.vms[i];
      vm._proxy(key);
      vm._digest();
    }
  }
  return val;
}

/**
 * Delete a property and trigger change if necessary.
 *
 * @param {Object} obj
 * @param {String} key
 */

function del(obj, key) {
  if (!hasOwn(obj, key)) {
    return;
  }
  delete obj[key];
  var ob = obj.__ob__;
  if (!ob) {
    if (obj._isVue) {
      delete obj._data[key];
      obj._digest();
    }
    return;
  }
  ob.dep.notify();
  if (ob.vms) {
    var i = ob.vms.length;
    while (i--) {
      var vm = ob.vms[i];
      vm._unproxy(key);
      vm._digest();
    }
  }
}

var hasOwnProperty = Object.prototype.hasOwnProperty;
/**
 * Check whether the object has the property.
 *
 * @param {Object} obj
 * @param {String} key
 * @return {Boolean}
 */

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

/**
 * Check if an expression is a literal value.
 *
 * @param {String} exp
 * @return {Boolean}
 */

var literalValueRE = /^\s?(true|false|-?[\d\.]+|'[^']*'|"[^"]*")\s?$/;

function isLiteral(exp) {
  return literalValueRE.test(exp);
}

/**
 * Check if a string starts with $ or _
 *
 * @param {String} str
 * @return {Boolean}
 */

function isReserved(str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F;
}

/**
 * Guard text output, make sure undefined outputs
 * empty string
 *
 * @param {*} value
 * @return {String}
 */

function _toString(value) {
  return value == null ? '' : value.toString();
}

/**
 * Check and convert possible numeric strings to numbers
 * before setting back to data
 *
 * @param {*} value
 * @return {*|Number}
 */

function toNumber(value) {
  if (typeof value !== 'string') {
    return value;
  } else {
    var parsed = Number(value);
    return isNaN(parsed) ? value : parsed;
  }
}

/**
 * Convert string boolean literals into real booleans.
 *
 * @param {*} value
 * @return {*|Boolean}
 */

function toBoolean(value) {
  return value === 'true' ? true : value === 'false' ? false : value;
}

/**
 * Strip quotes from a string
 *
 * @param {String} str
 * @return {String | false}
 */

function stripQuotes(str) {
  var a = str.charCodeAt(0);
  var b = str.charCodeAt(str.length - 1);
  return a === b && (a === 0x22 || a === 0x27) ? str.slice(1, -1) : str;
}

/**
 * Camelize a hyphen-delimited string.
 *
 * @param {String} str
 * @return {String}
 */

var camelizeRE = /-(\w)/g;

function camelize(str) {
  return str.replace(camelizeRE, toUpper);
}

function toUpper(_, c) {
  return c ? c.toUpperCase() : '';
}

/**
 * Hyphenate a camelCase string.
 *
 * @param {String} str
 * @return {String}
 */

var hyphenateRE = /([^-])([A-Z])/g;

function hyphenate(str) {
  return str.replace(hyphenateRE, '$1-$2').replace(hyphenateRE, '$1-$2').toLowerCase();
}

/**
 * Converts hyphen/underscore/slash delimitered names into
 * camelized classNames.
 *
 * e.g. my-component => MyComponent
 *      some_else    => SomeElse
 *      some/comp    => SomeComp
 *
 * @param {String} str
 * @return {String}
 */

var classifyRE = /(?:^|[-_\/])(\w)/g;

function classify(str) {
  return str.replace(classifyRE, toUpper);
}

/**
 * Simple bind, faster than native
 *
 * @param {Function} fn
 * @param {Object} ctx
 * @return {Function}
 */

function bind(fn, ctx) {
  return function (a) {
    var l = arguments.length;
    return l ? l > 1 ? fn.apply(ctx, arguments) : fn.call(ctx, a) : fn.call(ctx);
  };
}

/**
 * Convert an Array-like object to a real Array.
 *
 * @param {Array-like} list
 * @param {Number} [start] - start index
 * @return {Array}
 */

function toArray(list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret;
}

/**
 * Mix properties into target object.
 *
 * @param {Object} to
 * @param {Object} from
 */

function extend(to, from) {
  var keys = Object.keys(from);
  var i = keys.length;
  while (i--) {
    to[keys[i]] = from[keys[i]];
  }
  return to;
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 *
 * @param {*} obj
 * @return {Boolean}
 */

function isObject(obj) {
  return obj !== null && typeof obj === 'object';
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 *
 * @param {*} obj
 * @return {Boolean}
 */

var toString = Object.prototype.toString;
var OBJECT_STRING = '[object Object]';

function isPlainObject(obj) {
  return toString.call(obj) === OBJECT_STRING;
}

/**
 * Array type check.
 *
 * @param {*} obj
 * @return {Boolean}
 */

var isArray = Array.isArray;

/**
 * Define a property.
 *
 * @param {Object} obj
 * @param {String} key
 * @param {*} val
 * @param {Boolean} [enumerable]
 */

function def(obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Debounce a function so it only gets called after the
 * input stops arriving after the given wait period.
 *
 * @param {Function} func
 * @param {Number} wait
 * @return {Function} - the debounced function
 */

function _debounce(func, wait) {
  var timeout, args, context, timestamp, result;
  var later = function later() {
    var last = Date.now() - timestamp;
    if (last < wait && last >= 0) {
      timeout = setTimeout(later, wait - last);
    } else {
      timeout = null;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    }
  };
  return function () {
    context = this;
    args = arguments;
    timestamp = Date.now();
    if (!timeout) {
      timeout = setTimeout(later, wait);
    }
    return result;
  };
}

/**
 * Manual indexOf because it's slightly faster than
 * native.
 *
 * @param {Array} arr
 * @param {*} obj
 */

function indexOf(arr, obj) {
  var i = arr.length;
  while (i--) {
    if (arr[i] === obj) return i;
  }
  return -1;
}

/**
 * Make a cancellable version of an async callback.
 *
 * @param {Function} fn
 * @return {Function}
 */

function cancellable(fn) {
  var cb = function cb() {
    if (!cb.cancelled) {
      return fn.apply(this, arguments);
    }
  };
  cb.cancel = function () {
    cb.cancelled = true;
  };
  return cb;
}

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 *
 * @param {*} a
 * @param {*} b
 * @return {Boolean}
 */

function looseEqual(a, b) {
  /* eslint-disable eqeqeq */
  return a == b || (isObject(a) && isObject(b) ? JSON.stringify(a) === JSON.stringify(b) : false);
  /* eslint-enable eqeqeq */
}

var hasProto = ('__proto__' in {});

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined' && Object.prototype.toString.call(window) !== '[object Object]';

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

// UA sniffing for working around browser-specific quirks
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && UA.indexOf('trident') > 0;
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isAndroid = UA && UA.indexOf('android') > 0;
var isIOS = UA && /iphone|ipad|ipod|ios/.test(UA);

var transitionProp = undefined;
var transitionEndEvent = undefined;
var animationProp = undefined;
var animationEndEvent = undefined;

// Transition property/event sniffing
if (inBrowser && !isIE9) {
  var isWebkitTrans = window.ontransitionend === undefined && window.onwebkittransitionend !== undefined;
  var isWebkitAnim = window.onanimationend === undefined && window.onwebkitanimationend !== undefined;
  transitionProp = isWebkitTrans ? 'WebkitTransition' : 'transition';
  transitionEndEvent = isWebkitTrans ? 'webkitTransitionEnd' : 'transitionend';
  animationProp = isWebkitAnim ? 'WebkitAnimation' : 'animation';
  animationEndEvent = isWebkitAnim ? 'webkitAnimationEnd' : 'animationend';
}

/* istanbul ignore next */
function isNative(Ctor) {
  return (/native code/.test(Ctor.toString())
  );
}

/**
 * Defer a task to execute it asynchronously. Ideally this
 * should be executed as a microtask, so we leverage
 * MutationObserver if it's available, and fallback to
 * setTimeout(0).
 *
 * @param {Function} cb
 * @param {Object} ctx
 */

var nextTick = (function () {
  var callbacks = [];
  var pending = false;
  var timerFunc = undefined;

  function nextTickHandler() {
    pending = false;
    var copies = callbacks.slice(0);
    callbacks.length = 0;
    for (var i = 0; i < copies.length; i++) {
      copies[i]();
    }
  }

  // the nextTick behavior leverages the microtask queue, which can be accessed
  // via either native Promise.then or MutationObserver.
  // MutationObserver has wider support, however it is seriously bugged in
  // UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
  // completely stops working after triggering a few times... so, if native
  // Promise is available, we will use it:
  /* istanbul ignore if */
  if (typeof Promise !== 'undefined' && isNative(Promise)) {
    var p = Promise.resolve();
    var noop = function noop() {};
    timerFunc = function () {
      p.then(nextTickHandler);
      // in problematic UIWebViews, Promise.then doesn't completely break, but
      // it can get stuck in a weird state where callbacks are pushed into the
      // microtask queue but the queue isn't being flushed, until the browser
      // needs to do some other work, e.g. handle a timer. Therefore we can
      // "force" the microtask queue to be flushed by adding an empty timer.
      if (isIOS) setTimeout(noop);
    };
  } else if (typeof MutationObserver !== 'undefined') {
    // use MutationObserver where native Promise is not available,
    // e.g. IE11, iOS7, Android 4.4
    var counter = 1;
    var observer = new MutationObserver(nextTickHandler);
    var textNode = document.createTextNode(String(counter));
    observer.observe(textNode, {
      characterData: true
    });
    timerFunc = function () {
      counter = (counter + 1) % 2;
      textNode.data = String(counter);
    };
  } else {
    // fallback to setTimeout
    /* istanbul ignore next */
    timerFunc = setTimeout;
  }

  return function (cb, ctx) {
    var func = ctx ? function () {
      cb.call(ctx);
    } : cb;
    callbacks.push(func);
    if (pending) return;
    pending = true;
    timerFunc(nextTickHandler, 0);
  };
})();

var _Set = undefined;
/* istanbul ignore if */
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = function () {
    this.set = Object.create(null);
  };
  _Set.prototype.has = function (key) {
    return this.set[key] !== undefined;
  };
  _Set.prototype.add = function (key) {
    this.set[key] = 1;
  };
  _Set.prototype.clear = function () {
    this.set = Object.create(null);
  };
}

function Cache(limit) {
  this.size = 0;
  this.limit = limit;
  this.head = this.tail = undefined;
  this._keymap = Object.create(null);
}

var p = Cache.prototype;

/**
 * Put <value> into the cache associated with <key>.
 * Returns the entry which was removed to make room for
 * the new entry. Otherwise undefined is returned.
 * (i.e. if there was enough room already).
 *
 * @param {String} key
 * @param {*} value
 * @return {Entry|undefined}
 */

p.put = function (key, value) {
  var removed;

  var entry = this.get(key, true);
  if (!entry) {
    if (this.size === this.limit) {
      removed = this.shift();
    }
    entry = {
      key: key
    };
    this._keymap[key] = entry;
    if (this.tail) {
      this.tail.newer = entry;
      entry.older = this.tail;
    } else {
      this.head = entry;
    }
    this.tail = entry;
    this.size++;
  }
  entry.value = value;

  return removed;
};

/**
 * Purge the least recently used (oldest) entry from the
 * cache. Returns the removed entry or undefined if the
 * cache was empty.
 */

p.shift = function () {
  var entry = this.head;
  if (entry) {
    this.head = this.head.newer;
    this.head.older = undefined;
    entry.newer = entry.older = undefined;
    this._keymap[entry.key] = undefined;
    this.size--;
  }
  return entry;
};

/**
 * Get and register recent use of <key>. Returns the value
 * associated with <key> or undefined if not in cache.
 *
 * @param {String} key
 * @param {Boolean} returnEntry
 * @return {Entry|*}
 */

p.get = function (key, returnEntry) {
  var entry = this._keymap[key];
  if (entry === undefined) return;
  if (entry === this.tail) {
    return returnEntry ? entry : entry.value;
  }
  // HEAD--------------TAIL
  //   <.older   .newer>
  //  <--- add direction --
  //   A  B  C  <D>  E
  if (entry.newer) {
    if (entry === this.head) {
      this.head = entry.newer;
    }
    entry.newer.older = entry.older; // C <-- E.
  }
  if (entry.older) {
    entry.older.newer = entry.newer; // C. --> E
  }
  entry.newer = undefined; // D --x
  entry.older = this.tail; // D. --> E
  if (this.tail) {
    this.tail.newer = entry; // E. <-- D
  }
  this.tail = entry;
  return returnEntry ? entry : entry.value;
};

var cache$1 = new Cache(1000);
var reservedArgRE = /^in$|^-?\d+/;

/**
 * Parser state
 */

var str;
var dir;
var len;
var index;
var chr;
var state;
var startState = 0;
var filterState = 1;
var filterNameState = 2;
var filterArgState = 3;

var doubleChr = 0x22;
var singleChr = 0x27;
var pipeChr = 0x7C;
var escapeChr = 0x5C;
var spaceChr = 0x20;

var expStartChr = { 0x5B: 1, 0x7B: 1, 0x28: 1 };
var expChrPair = { 0x5B: 0x5D, 0x7B: 0x7D, 0x28: 0x29 };

function peek() {
  return str.charCodeAt(index + 1);
}

function next() {
  return str.charCodeAt(++index);
}

function eof() {
  return index >= len;
}

function eatSpace() {
  while (peek() === spaceChr) {
    next();
  }
}

function isStringStart(chr) {
  return chr === doubleChr || chr === singleChr;
}

function isExpStart(chr) {
  return expStartChr[chr];
}

function isExpEnd(start, chr) {
  return expChrPair[start] === chr;
}

function parseString() {
  var stringQuote = next();
  var chr;
  while (!eof()) {
    chr = next();
    // escape char
    if (chr === escapeChr) {
      next();
    } else if (chr === stringQuote) {
      break;
    }
  }
}

function parseSpecialExp(chr) {
  var inExp = 0;
  var startChr = chr;

  while (!eof()) {
    chr = peek();
    if (isStringStart(chr)) {
      parseString();
      continue;
    }

    if (startChr === chr) {
      inExp++;
    }
    if (isExpEnd(startChr, chr)) {
      inExp--;
    }

    next();

    if (inExp === 0) {
      break;
    }
  }
}

/**
 * syntax:
 * expression | filterName  [arg  arg [| filterName arg arg]]
 */

function parseExpression() {
  var start = index;
  while (!eof()) {
    chr = peek();
    if (isStringStart(chr)) {
      parseString();
    } else if (isExpStart(chr)) {
      parseSpecialExp(chr);
    } else if (chr === pipeChr) {
      next();
      chr = peek();
      if (chr === pipeChr) {
        next();
      } else {
        if (state === startState || state === filterArgState) {
          state = filterState;
        }
        break;
      }
    } else if (chr === spaceChr && (state === filterNameState || state === filterArgState)) {
      eatSpace();
      break;
    } else {
      if (state === filterState) {
        state = filterNameState;
      }
      next();
    }
  }

  return str.slice(start + 1, index) || null;
}

function parseFilterList() {
  var filters = [];
  while (!eof()) {
    filters.push(parseFilter());
  }
  return filters;
}

function parseFilter() {
  var filter = {};
  var args;

  state = filterState;
  filter.name = parseExpression().trim();

  state = filterArgState;
  args = parseFilterArguments();

  if (args.length) {
    filter.args = args;
  }
  return filter;
}

function parseFilterArguments() {
  var args = [];
  while (!eof() && state !== filterState) {
    var arg = parseExpression();
    if (!arg) {
      break;
    }
    args.push(processFilterArg(arg));
  }

  return args;
}

/**
 * Check if an argument is dynamic and strip quotes.
 *
 * @param {String} arg
 * @return {Object}
 */

function processFilterArg(arg) {
  if (reservedArgRE.test(arg)) {
    return {
      value: toNumber(arg),
      dynamic: false
    };
  } else {
    var stripped = stripQuotes(arg);
    var dynamic = stripped === arg;
    return {
      value: dynamic ? arg : stripped,
      dynamic: dynamic
    };
  }
}

/**
 * Parse a directive value and extract the expression
 * and its filters into a descriptor.
 *
 * Example:
 *
 * "a + 1 | uppercase" will yield:
 * {
 *   expression: 'a + 1',
 *   filters: [
 *     { name: 'uppercase', args: null }
 *   ]
 * }
 *
 * @param {String} s
 * @return {Object}
 */

function parseDirective(s) {
  var hit = cache$1.get(s);
  if (hit) {
    return hit;
  }

  // reset parser state
  str = s;
  dir = {};
  len = str.length;
  index = -1;
  chr = '';
  state = startState;

  var filters;

  if (str.indexOf('|') < 0) {
    dir.expression = str.trim();
  } else {
    dir.expression = parseExpression().trim();
    filters = parseFilterList();
    if (filters.length) {
      dir.filters = filters;
    }
  }

  cache$1.put(s, dir);
  return dir;
}

var directive = Object.freeze({
  parseDirective: parseDirective
});

var regexEscapeRE = /[-.*+?^${}()|[\]\/\\]/g;
var cache = undefined;
var tagRE = undefined;
var htmlRE = undefined;
/**
 * Escape a string so it can be used in a RegExp
 * constructor.
 *
 * @param {String} str
 */

function escapeRegex(str) {
  return str.replace(regexEscapeRE, '\\$&');
}

function compileRegex() {
  var open = escapeRegex(config.delimiters[0]);
  var close = escapeRegex(config.delimiters[1]);
  var unsafeOpen = escapeRegex(config.unsafeDelimiters[0]);
  var unsafeClose = escapeRegex(config.unsafeDelimiters[1]);
  tagRE = new RegExp(unsafeOpen + '((?:.|\\n)+?)' + unsafeClose + '|' + open + '((?:.|\\n)+?)' + close, 'g');
  htmlRE = new RegExp('^' + unsafeOpen + '((?:.|\\n)+?)' + unsafeClose + '$');
  // reset cache
  cache = new Cache(1000);
}

/**
 * Parse a template text string into an array of tokens.
 *
 * @param {String} text
 * @return {Array<Object> | null}
 *               - {String} type
 *               - {String} value
 *               - {Boolean} [html]
 *               - {Boolean} [oneTime]
 */

function parseText(text) {
  if (!cache) {
    compileRegex();
  }
  var hit = cache.get(text);
  if (hit) {
    return hit;
  }
  if (!tagRE.test(text)) {
    return null;
  }
  var tokens = [];
  var lastIndex = tagRE.lastIndex = 0;
  var match, index, html, value, first, oneTime;
  /* eslint-disable no-cond-assign */
  while (match = tagRE.exec(text)) {
    /* eslint-enable no-cond-assign */
    index = match.index;
    // push text token
    if (index > lastIndex) {
      tokens.push({
        value: text.slice(lastIndex, index)
      });
    }
    // tag token
    html = htmlRE.test(match[0]);
    value = html ? match[1] : match[2];
    first = value.charCodeAt(0);
    oneTime = first === 42; // *
    value = oneTime ? value.slice(1) : value;
    tokens.push({
      tag: true,
      value: value.trim(),
      html: html,
      oneTime: oneTime
    });
    lastIndex = index + match[0].length;
  }
  if (lastIndex < text.length) {
    tokens.push({
      value: text.slice(lastIndex)
    });
  }
  cache.put(text, tokens);
  return tokens;
}

/**
 * Format a list of tokens into an expression.
 * e.g. tokens parsed from 'a {{b}} c' can be serialized
 * into one single expression as '"a " + b + " c"'.
 *
 * @param {Array} tokens
 * @param {Vue} [vm]
 * @return {String}
 */

function tokensToExp(tokens, vm) {
  if (tokens.length > 1) {
    return tokens.map(function (token) {
      return formatToken(token, vm);
    }).join('+');
  } else {
    return formatToken(tokens[0], vm, true);
  }
}

/**
 * Format a single token.
 *
 * @param {Object} token
 * @param {Vue} [vm]
 * @param {Boolean} [single]
 * @return {String}
 */

function formatToken(token, vm, single) {
  return token.tag ? token.oneTime && vm ? '"' + vm.$eval(token.value) + '"' : inlineFilters(token.value, single) : '"' + token.value + '"';
}

/**
 * For an attribute with multiple interpolation tags,
 * e.g. attr="some-{{thing | filter}}", in order to combine
 * the whole thing into a single watchable expression, we
 * have to inline those filters. This function does exactly
 * that. This is a bit hacky but it avoids heavy changes
 * to directive parser and watcher mechanism.
 *
 * @param {String} exp
 * @param {Boolean} single
 * @return {String}
 */

var filterRE = /[^|]\|[^|]/;
function inlineFilters(exp, single) {
  if (!filterRE.test(exp)) {
    return single ? exp : '(' + exp + ')';
  } else {
    var dir = parseDirective(exp);
    if (!dir.filters) {
      return '(' + exp + ')';
    } else {
      return 'this._applyFilters(' + dir.expression + // value
      ',null,' + // oldValue (null for read)
      JSON.stringify(dir.filters) + // filter descriptors
      ',false)'; // write?
    }
  }
}

var text = Object.freeze({
  compileRegex: compileRegex,
  parseText: parseText,
  tokensToExp: tokensToExp
});

var delimiters = ['{{', '}}'];
var unsafeDelimiters = ['{{{', '}}}'];

var config = Object.defineProperties({

  /**
   * Whether to print debug messages.
   * Also enables stack trace for warnings.
   *
   * @type {Boolean}
   */

  debug: false,

  /**
   * Whether to suppress warnings.
   *
   * @type {Boolean}
   */

  silent: false,

  /**
   * Whether to use async rendering.
   */

  async: true,

  /**
   * Whether to warn against errors caught when evaluating
   * expressions.
   */

  warnExpressionErrors: true,

  /**
   * Whether to allow devtools inspection.
   * Disabled by default in production builds.
   */

  devtools: process.env.NODE_ENV !== 'production',

  /**
   * Internal flag to indicate the delimiters have been
   * changed.
   *
   * @type {Boolean}
   */

  _delimitersChanged: true,

  /**
   * List of asset types that a component can own.
   *
   * @type {Array}
   */

  _assetTypes: ['component', 'directive', 'elementDirective', 'filter', 'transition', 'partial'],

  /**
   * prop binding modes
   */

  _propBindingModes: {
    ONE_WAY: 0,
    TWO_WAY: 1,
    ONE_TIME: 2
  },

  /**
   * Max circular updates allowed in a batcher flush cycle.
   */

  _maxUpdateCount: 100

}, {
  delimiters: { /**
                 * Interpolation delimiters. Changing these would trigger
                 * the text parser to re-compile the regular expressions.
                 *
                 * @type {Array<String>}
                 */

    get: function get() {
      return delimiters;
    },
    set: function set(val) {
      delimiters = val;
      compileRegex();
    },
    configurable: true,
    enumerable: true
  },
  unsafeDelimiters: {
    get: function get() {
      return unsafeDelimiters;
    },
    set: function set(val) {
      unsafeDelimiters = val;
      compileRegex();
    },
    configurable: true,
    enumerable: true
  }
});

var warn = undefined;
var formatComponentName = undefined;

if (process.env.NODE_ENV !== 'production') {
  (function () {
    var hasConsole = typeof console !== 'undefined';

    warn = function (msg, vm) {
      if (hasConsole && !config.silent) {
        console.error('[Vue warn]: ' + msg + (vm ? formatComponentName(vm) : ''));
      }
    };

    formatComponentName = function (vm) {
      var name = vm._isVue ? vm.$options.name : vm.name;
      return name ? ' (found in component: <' + hyphenate(name) + '>)' : '';
    };
  })();
}

/**
 * Append with transition.
 *
 * @param {Element} el
 * @param {Element} target
 * @param {Vue} vm
 * @param {Function} [cb]
 */

function appendWithTransition(el, target, vm, cb) {
  applyTransition(el, 1, function () {
    target.appendChild(el);
  }, vm, cb);
}

/**
 * InsertBefore with transition.
 *
 * @param {Element} el
 * @param {Element} target
 * @param {Vue} vm
 * @param {Function} [cb]
 */

function beforeWithTransition(el, target, vm, cb) {
  applyTransition(el, 1, function () {
    before(el, target);
  }, vm, cb);
}

/**
 * Remove with transition.
 *
 * @param {Element} el
 * @param {Vue} vm
 * @param {Function} [cb]
 */

function removeWithTransition(el, vm, cb) {
  applyTransition(el, -1, function () {
    remove(el);
  }, vm, cb);
}

/**
 * Apply transitions with an operation callback.
 *
 * @param {Element} el
 * @param {Number} direction
 *                  1: enter
 *                 -1: leave
 * @param {Function} op - the actual DOM operation
 * @param {Vue} vm
 * @param {Function} [cb]
 */

function applyTransition(el, direction, op, vm, cb) {
  var transition = el.__v_trans;
  if (!transition ||
  // skip if there are no js hooks and CSS transition is
  // not supported
  !transition.hooks && !transitionEndEvent ||
  // skip transitions for initial compile
  !vm._isCompiled ||
  // if the vm is being manipulated by a parent directive
  // during the parent's compilation phase, skip the
  // animation.
  vm.$parent && !vm.$parent._isCompiled) {
    op();
    if (cb) cb();
    return;
  }
  var action = direction > 0 ? 'enter' : 'leave';
  transition[action](op, cb);
}

var transition = Object.freeze({
  appendWithTransition: appendWithTransition,
  beforeWithTransition: beforeWithTransition,
  removeWithTransition: removeWithTransition,
  applyTransition: applyTransition
});

/**
 * Query an element selector if it's not an element already.
 *
 * @param {String|Element} el
 * @return {Element}
 */

function query(el) {
  if (typeof el === 'string') {
    var selector = el;
    el = document.querySelector(el);
    if (!el) {
      process.env.NODE_ENV !== 'production' && warn('Cannot find element: ' + selector);
    }
  }
  return el;
}

/**
 * Check if a node is in the document.
 * Note: document.documentElement.contains should work here
 * but always returns false for comment nodes in phantomjs,
 * making unit tests difficult. This is fixed by doing the
 * contains() check on the node's parentNode instead of
 * the node itself.
 *
 * @param {Node} node
 * @return {Boolean}
 */

function inDoc(node) {
  if (!node) return false;
  var doc = node.ownerDocument.documentElement;
  var parent = node.parentNode;
  return doc === node || doc === parent || !!(parent && parent.nodeType === 1 && doc.contains(parent));
}

/**
 * Get and remove an attribute from a node.
 *
 * @param {Node} node
 * @param {String} _attr
 */

function getAttr(node, _attr) {
  var val = node.getAttribute(_attr);
  if (val !== null) {
    node.removeAttribute(_attr);
  }
  return val;
}

/**
 * Get an attribute with colon or v-bind: prefix.
 *
 * @param {Node} node
 * @param {String} name
 * @return {String|null}
 */

function getBindAttr(node, name) {
  var val = getAttr(node, ':' + name);
  if (val === null) {
    val = getAttr(node, 'v-bind:' + name);
  }
  return val;
}

/**
 * Check the presence of a bind attribute.
 *
 * @param {Node} node
 * @param {String} name
 * @return {Boolean}
 */

function hasBindAttr(node, name) {
  return node.hasAttribute(name) || node.hasAttribute(':' + name) || node.hasAttribute('v-bind:' + name);
}

/**
 * Insert el before target
 *
 * @param {Element} el
 * @param {Element} target
 */

function before(el, target) {
  target.parentNode.insertBefore(el, target);
}

/**
 * Insert el after target
 *
 * @param {Element} el
 * @param {Element} target
 */

function after(el, target) {
  if (target.nextSibling) {
    before(el, target.nextSibling);
  } else {
    target.parentNode.appendChild(el);
  }
}

/**
 * Remove el from DOM
 *
 * @param {Element} el
 */

function remove(el) {
  el.parentNode.removeChild(el);
}

/**
 * Prepend el to target
 *
 * @param {Element} el
 * @param {Element} target
 */

function prepend(el, target) {
  if (target.firstChild) {
    before(el, target.firstChild);
  } else {
    target.appendChild(el);
  }
}

/**
 * Replace target with el
 *
 * @param {Element} target
 * @param {Element} el
 */

function replace(target, el) {
  var parent = target.parentNode;
  if (parent) {
    parent.replaceChild(el, target);
  }
}

/**
 * Add event listener shorthand.
 *
 * @param {Element} el
 * @param {String} event
 * @param {Function} cb
 * @param {Boolean} [useCapture]
 */

function on(el, event, cb, useCapture) {
  el.addEventListener(event, cb, useCapture);
}

/**
 * Remove event listener shorthand.
 *
 * @param {Element} el
 * @param {String} event
 * @param {Function} cb
 */

function off(el, event, cb) {
  el.removeEventListener(event, cb);
}

/**
 * For IE9 compat: when both class and :class are present
 * getAttribute('class') returns wrong value...
 *
 * @param {Element} el
 * @return {String}
 */

function getClass(el) {
  var classname = el.className;
  if (typeof classname === 'object') {
    classname = classname.baseVal || '';
  }
  return classname;
}

/**
 * In IE9, setAttribute('class') will result in empty class
 * if the element also has the :class attribute; However in
 * PhantomJS, setting `className` does not work on SVG elements...
 * So we have to do a conditional check here.
 *
 * @param {Element} el
 * @param {String} cls
 */

function setClass(el, cls) {
  /* istanbul ignore if */
  if (isIE9 && !/svg$/.test(el.namespaceURI)) {
    el.className = cls;
  } else {
    el.setAttribute('class', cls);
  }
}

/**
 * Add class with compatibility for IE & SVG
 *
 * @param {Element} el
 * @param {String} cls
 */

function addClass(el, cls) {
  if (el.classList) {
    el.classList.add(cls);
  } else {
    var cur = ' ' + getClass(el) + ' ';
    if (cur.indexOf(' ' + cls + ' ') < 0) {
      setClass(el, (cur + cls).trim());
    }
  }
}

/**
 * Remove class with compatibility for IE & SVG
 *
 * @param {Element} el
 * @param {String} cls
 */

function removeClass(el, cls) {
  if (el.classList) {
    el.classList.remove(cls);
  } else {
    var cur = ' ' + getClass(el) + ' ';
    var tar = ' ' + cls + ' ';
    while (cur.indexOf(tar) >= 0) {
      cur = cur.replace(tar, ' ');
    }
    setClass(el, cur.trim());
  }
  if (!el.className) {
    el.removeAttribute('class');
  }
}

/**
 * Extract raw content inside an element into a temporary
 * container div
 *
 * @param {Element} el
 * @param {Boolean} asFragment
 * @return {Element|DocumentFragment}
 */

function extractContent(el, asFragment) {
  var child;
  var rawContent;
  /* istanbul ignore if */
  if (isTemplate(el) && isFragment(el.content)) {
    el = el.content;
  }
  if (el.hasChildNodes()) {
    trimNode(el);
    rawContent = asFragment ? document.createDocumentFragment() : document.createElement('div');
    /* eslint-disable no-cond-assign */
    while (child = el.firstChild) {
      /* eslint-enable no-cond-assign */
      rawContent.appendChild(child);
    }
  }
  return rawContent;
}

/**
 * Trim possible empty head/tail text and comment
 * nodes inside a parent.
 *
 * @param {Node} node
 */

function trimNode(node) {
  var child;
  /* eslint-disable no-sequences */
  while ((child = node.firstChild, isTrimmable(child))) {
    node.removeChild(child);
  }
  while ((child = node.lastChild, isTrimmable(child))) {
    node.removeChild(child);
  }
  /* eslint-enable no-sequences */
}

function isTrimmable(node) {
  return node && (node.nodeType === 3 && !node.data.trim() || node.nodeType === 8);
}

/**
 * Check if an element is a template tag.
 * Note if the template appears inside an SVG its tagName
 * will be in lowercase.
 *
 * @param {Element} el
 */

function isTemplate(el) {
  return el.tagName && el.tagName.toLowerCase() === 'template';
}

/**
 * Create an "anchor" for performing dom insertion/removals.
 * This is used in a number of scenarios:
 * - fragment instance
 * - v-html
 * - v-if
 * - v-for
 * - component
 *
 * @param {String} content
 * @param {Boolean} persist - IE trashes empty textNodes on
 *                            cloneNode(true), so in certain
 *                            cases the anchor needs to be
 *                            non-empty to be persisted in
 *                            templates.
 * @return {Comment|Text}
 */

function createAnchor(content, persist) {
  var anchor = config.debug ? document.createComment(content) : document.createTextNode(persist ? ' ' : '');
  anchor.__v_anchor = true;
  return anchor;
}

/**
 * Find a component ref attribute that starts with $.
 *
 * @param {Element} node
 * @return {String|undefined}
 */

var refRE = /^v-ref:/;

function findRef(node) {
  if (node.hasAttributes()) {
    var attrs = node.attributes;
    for (var i = 0, l = attrs.length; i < l; i++) {
      var name = attrs[i].name;
      if (refRE.test(name)) {
        return camelize(name.replace(refRE, ''));
      }
    }
  }
}

/**
 * Map a function to a range of nodes .
 *
 * @param {Node} node
 * @param {Node} end
 * @param {Function} op
 */

function mapNodeRange(node, end, op) {
  var next;
  while (node !== end) {
    next = node.nextSibling;
    op(node);
    node = next;
  }
  op(end);
}

/**
 * Remove a range of nodes with transition, store
 * the nodes in a fragment with correct ordering,
 * and call callback when done.
 *
 * @param {Node} start
 * @param {Node} end
 * @param {Vue} vm
 * @param {DocumentFragment} frag
 * @param {Function} cb
 */

function removeNodeRange(start, end, vm, frag, cb) {
  var done = false;
  var removed = 0;
  var nodes = [];
  mapNodeRange(start, end, function (node) {
    if (node === end) done = true;
    nodes.push(node);
    removeWithTransition(node, vm, onRemoved);
  });
  function onRemoved() {
    removed++;
    if (done && removed >= nodes.length) {
      for (var i = 0; i < nodes.length; i++) {
        frag.appendChild(nodes[i]);
      }
      cb && cb();
    }
  }
}

/**
 * Check if a node is a DocumentFragment.
 *
 * @param {Node} node
 * @return {Boolean}
 */

function isFragment(node) {
  return node && node.nodeType === 11;
}

/**
 * Get outerHTML of elements, taking care
 * of SVG elements in IE as well.
 *
 * @param {Element} el
 * @return {String}
 */

function getOuterHTML(el) {
  if (el.outerHTML) {
    return el.outerHTML;
  } else {
    var container = document.createElement('div');
    container.appendChild(el.cloneNode(true));
    return container.innerHTML;
  }
}

var commonTagRE = /^(div|p|span|img|a|b|i|br|ul|ol|li|h1|h2|h3|h4|h5|h6|code|pre|table|th|td|tr|form|label|input|select|option|nav|article|section|header|footer)$/i;
var reservedTagRE = /^(slot|partial|component)$/i;

var isUnknownElement = undefined;
if (process.env.NODE_ENV !== 'production') {
  isUnknownElement = function (el, tag) {
    if (tag.indexOf('-') > -1) {
      // http://stackoverflow.com/a/28210364/1070244
      return el.constructor === window.HTMLUnknownElement || el.constructor === window.HTMLElement;
    } else {
      return (/HTMLUnknownElement/.test(el.toString()) &&
        // Chrome returns unknown for several HTML5 elements.
        // https://code.google.com/p/chromium/issues/detail?id=540526
        // Firefox returns unknown for some "Interactive elements."
        !/^(data|time|rtc|rb|details|dialog|summary)$/.test(tag)
      );
    }
  };
}

/**
 * Check if an element is a component, if yes return its
 * component id.
 *
 * @param {Element} el
 * @param {Object} options
 * @return {Object|undefined}
 */

function checkComponentAttr(el, options) {
  var tag = el.tagName.toLowerCase();
  var hasAttrs = el.hasAttributes();
  if (!commonTagRE.test(tag) && !reservedTagRE.test(tag)) {
    if (resolveAsset(options, 'components', tag)) {
      return { id: tag };
    } else {
      var is = hasAttrs && getIsBinding(el, options);
      if (is) {
        return is;
      } else if (process.env.NODE_ENV !== 'production') {
        var expectedTag = options._componentNameMap && options._componentNameMap[tag];
        if (expectedTag) {
          warn('Unknown custom element: <' + tag + '> - ' + 'did you mean <' + expectedTag + '>? ' + 'HTML is case-insensitive, remember to use kebab-case in templates.');
        } else if (isUnknownElement(el, tag)) {
          warn('Unknown custom element: <' + tag + '> - did you ' + 'register the component correctly? For recursive components, ' + 'make sure to provide the "name" option.');
        }
      }
    }
  } else if (hasAttrs) {
    return getIsBinding(el, options);
  }
}

/**
 * Get "is" binding from an element.
 *
 * @param {Element} el
 * @param {Object} options
 * @return {Object|undefined}
 */

function getIsBinding(el, options) {
  // dynamic syntax
  var exp = el.getAttribute('is');
  if (exp != null) {
    if (resolveAsset(options, 'components', exp)) {
      el.removeAttribute('is');
      return { id: exp };
    }
  } else {
    exp = getBindAttr(el, 'is');
    if (exp != null) {
      return { id: exp, dynamic: true };
    }
  }
}

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 *
 * All strategy functions follow the same signature:
 *
 * @param {*} parentVal
 * @param {*} childVal
 * @param {Vue} [vm]
 */

var strats = config.optionMergeStrategies = Object.create(null);

/**
 * Helper that recursively merges two data objects together.
 */

function mergeData(to, from) {
  var key, toVal, fromVal;
  for (key in from) {
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (isObject(toVal) && isObject(fromVal)) {
      mergeData(toVal, fromVal);
    }
  }
  return to;
}

/**
 * Data
 */

strats.data = function (parentVal, childVal, vm) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal;
    }
    if (typeof childVal !== 'function') {
      process.env.NODE_ENV !== 'production' && warn('The "data" option should be a function ' + 'that returns a per-instance value in component ' + 'definitions.', vm);
      return parentVal;
    }
    if (!parentVal) {
      return childVal;
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn() {
      return mergeData(childVal.call(this), parentVal.call(this));
    };
  } else if (parentVal || childVal) {
    return function mergedInstanceDataFn() {
      // instance merge
      var instanceData = typeof childVal === 'function' ? childVal.call(vm) : childVal;
      var defaultData = typeof parentVal === 'function' ? parentVal.call(vm) : undefined;
      if (instanceData) {
        return mergeData(instanceData, defaultData);
      } else {
        return defaultData;
      }
    };
  }
};

/**
 * El
 */

strats.el = function (parentVal, childVal, vm) {
  if (!vm && childVal && typeof childVal !== 'function') {
    process.env.NODE_ENV !== 'production' && warn('The "el" option should be a function ' + 'that returns a per-instance value in component ' + 'definitions.', vm);
    return;
  }
  var ret = childVal || parentVal;
  // invoke the element factory if this is instance merge
  return vm && typeof ret === 'function' ? ret.call(vm) : ret;
};

/**
 * Hooks and param attributes are merged as arrays.
 */

strats.init = strats.created = strats.ready = strats.attached = strats.detached = strats.beforeCompile = strats.compiled = strats.beforeDestroy = strats.destroyed = strats.activate = function (parentVal, childVal) {
  return childVal ? parentVal ? parentVal.concat(childVal) : isArray(childVal) ? childVal : [childVal] : parentVal;
};

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */

function mergeAssets(parentVal, childVal) {
  var res = Object.create(parentVal || null);
  return childVal ? extend(res, guardArrayAssets(childVal)) : res;
}

config._assetTypes.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Events & Watchers.
 *
 * Events & watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */

strats.watch = strats.events = function (parentVal, childVal) {
  if (!childVal) return parentVal;
  if (!parentVal) return childVal;
  var ret = {};
  extend(ret, parentVal);
  for (var key in childVal) {
    var parent = ret[key];
    var child = childVal[key];
    if (parent && !isArray(parent)) {
      parent = [parent];
    }
    ret[key] = parent ? parent.concat(child) : [child];
  }
  return ret;
};

/**
 * Other object hashes.
 */

strats.props = strats.methods = strats.computed = function (parentVal, childVal) {
  if (!childVal) return parentVal;
  if (!parentVal) return childVal;
  var ret = Object.create(null);
  extend(ret, parentVal);
  extend(ret, childVal);
  return ret;
};

/**
 * Default strategy.
 */

var defaultStrat = function defaultStrat(parentVal, childVal) {
  return childVal === undefined ? parentVal : childVal;
};

/**
 * Make sure component options get converted to actual
 * constructors.
 *
 * @param {Object} options
 */

function guardComponents(options) {
  if (options.components) {
    var components = options.components = guardArrayAssets(options.components);
    var ids = Object.keys(components);
    var def;
    if (process.env.NODE_ENV !== 'production') {
      var map = options._componentNameMap = {};
    }
    for (var i = 0, l = ids.length; i < l; i++) {
      var key = ids[i];
      if (commonTagRE.test(key) || reservedTagRE.test(key)) {
        process.env.NODE_ENV !== 'production' && warn('Do not use built-in or reserved HTML elements as component ' + 'id: ' + key);
        continue;
      }
      // record a all lowercase <-> kebab-case mapping for
      // possible custom element case error warning
      if (process.env.NODE_ENV !== 'production') {
        map[key.replace(/-/g, '').toLowerCase()] = hyphenate(key);
      }
      def = components[key];
      if (isPlainObject(def)) {
        components[key] = Vue.extend(def);
      }
    }
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 *
 * @param {Object} options
 */

function guardProps(options) {
  var props = options.props;
  var i, val;
  if (isArray(props)) {
    options.props = {};
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        options.props[val] = null;
      } else if (val.name) {
        options.props[val.name] = val;
      }
    }
  } else if (isPlainObject(props)) {
    var keys = Object.keys(props);
    i = keys.length;
    while (i--) {
      val = props[keys[i]];
      if (typeof val === 'function') {
        props[keys[i]] = { type: val };
      }
    }
  }
}

/**
 * Guard an Array-format assets option and converted it
 * into the key-value Object format.
 *
 * @param {Object|Array} assets
 * @return {Object}
 */

function guardArrayAssets(assets) {
  if (isArray(assets)) {
    var res = {};
    var i = assets.length;
    var asset;
    while (i--) {
      asset = assets[i];
      var id = typeof asset === 'function' ? asset.options && asset.options.name || asset.id : asset.name || asset.id;
      if (!id) {
        process.env.NODE_ENV !== 'production' && warn('Array-syntax assets must provide a "name" or "id" field.');
      } else {
        res[id] = asset;
      }
    }
    return res;
  }
  return assets;
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 *
 * @param {Object} parent
 * @param {Object} child
 * @param {Vue} [vm] - if vm is present, indicates this is
 *                     an instantiation merge.
 */

function mergeOptions(parent, child, vm) {
  guardComponents(child);
  guardProps(child);
  if (process.env.NODE_ENV !== 'production') {
    if (child.propsData && !vm) {
      warn('propsData can only be used as an instantiation option.');
    }
  }
  var options = {};
  var key;
  if (child['extends']) {
    parent = typeof child['extends'] === 'function' ? mergeOptions(parent, child['extends'].options, vm) : mergeOptions(parent, child['extends'], vm);
  }
  if (child.mixins) {
    for (var i = 0, l = child.mixins.length; i < l; i++) {
      var mixin = child.mixins[i];
      var mixinOptions = mixin.prototype instanceof Vue ? mixin.options : mixin;
      parent = mergeOptions(parent, mixinOptions, vm);
    }
  }
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField(key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options;
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 *
 * @param {Object} options
 * @param {String} type
 * @param {String} id
 * @param {Boolean} warnMissing
 * @return {Object|Function}
 */

function resolveAsset(options, type, id, warnMissing) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return;
  }
  var assets = options[type];
  var camelizedId;
  var res = assets[id] ||
  // camelCase ID
  assets[camelizedId = camelize(id)] ||
  // Pascal Case ID
  assets[camelizedId.charAt(0).toUpperCase() + camelizedId.slice(1)];
  if (process.env.NODE_ENV !== 'production' && warnMissing && !res) {
    warn('Failed to resolve ' + type.slice(0, -1) + ': ' + id, options);
  }
  return res;
}

var uid$1 = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 *
 * @constructor
 */
function Dep() {
  this.id = uid$1++;
  this.subs = [];
}

// the current target watcher being evaluated.
// this is globally unique because there could be only one
// watcher being evaluated at any time.
Dep.target = null;

/**
 * Add a directive subscriber.
 *
 * @param {Directive} sub
 */

Dep.prototype.addSub = function (sub) {
  this.subs.push(sub);
};

/**
 * Remove a directive subscriber.
 *
 * @param {Directive} sub
 */

Dep.prototype.removeSub = function (sub) {
  this.subs.$remove(sub);
};

/**
 * Add self as a dependency to the target watcher.
 */

Dep.prototype.depend = function () {
  Dep.target.addDep(this);
};

/**
 * Notify all subscribers of a new value.
 */

Dep.prototype.notify = function () {
  // stablize the subscriber list first
  var subs = toArray(this.subs);
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto)

/**
 * Intercept mutating methods and emit events
 */

;['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'].forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator() {
    // avoid leaking arguments:
    // http://jsperf.com/closure-with-arguments
    var i = arguments.length;
    var args = new Array(i);
    while (i--) {
      args[i] = arguments[i];
    }
    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
        inserted = args;
        break;
      case 'unshift':
        inserted = args;
        break;
      case 'splice':
        inserted = args.slice(2);
        break;
    }
    if (inserted) ob.observeArray(inserted);
    // notify change
    ob.dep.notify();
    return result;
  });
});

/**
 * Swap the element at the given index with a new value
 * and emits corresponding event.
 *
 * @param {Number} index
 * @param {*} val
 * @return {*} - replaced element
 */

def(arrayProto, '$set', function $set(index, val) {
  if (index >= this.length) {
    this.length = Number(index) + 1;
  }
  return this.splice(index, 1, val)[0];
});

/**
 * Convenience method to remove the element at given index or target element reference.
 *
 * @param {*} item
 */

def(arrayProto, '$remove', function $remove(item) {
  /* istanbul ignore if */
  if (!this.length) return;
  var index = indexOf(this, item);
  if (index > -1) {
    return this.splice(index, 1);
  }
});

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * By default, when a reactive property is set, the new value is
 * also converted to become reactive. However in certain cases, e.g.
 * v-for scope alias and props, we don't want to force conversion
 * because the value may be a nested value under a frozen data structure.
 *
 * So whenever we want to set a reactive property without forcing
 * conversion on the new value, we wrap that call inside this function.
 */

var shouldConvert = true;

function withoutConversion(fn) {
  shouldConvert = false;
  fn();
  shouldConvert = true;
}

/**
 * Observer class that are attached to each observed
 * object. Once attached, the observer converts target
 * object's property keys into getter/setters that
 * collect dependencies and dispatches updates.
 *
 * @param {Array|Object} value
 * @constructor
 */

function Observer(value) {
  this.value = value;
  this.dep = new Dep();
  def(value, '__ob__', this);
  if (isArray(value)) {
    var augment = hasProto ? protoAugment : copyAugment;
    augment(value, arrayMethods, arrayKeys);
    this.observeArray(value);
  } else {
    this.walk(value);
  }
}

// Instance methods

/**
 * Walk through each property and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 *
 * @param {Object} obj
 */

Observer.prototype.walk = function (obj) {
  var keys = Object.keys(obj);
  for (var i = 0, l = keys.length; i < l; i++) {
    this.convert(keys[i], obj[keys[i]]);
  }
};

/**
 * Observe a list of Array items.
 *
 * @param {Array} items
 */

Observer.prototype.observeArray = function (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

/**
 * Convert a property into getter/setter so we can emit
 * the events when the property is accessed/changed.
 *
 * @param {String} key
 * @param {*} val
 */

Observer.prototype.convert = function (key, val) {
  defineReactive(this.value, key, val);
};

/**
 * Add an owner vm, so that when $set/$delete mutations
 * happen we can notify owner vms to proxy the keys and
 * digest the watchers. This is only called when the object
 * is observed as an instance's root $data.
 *
 * @param {Vue} vm
 */

Observer.prototype.addVm = function (vm) {
  (this.vms || (this.vms = [])).push(vm);
};

/**
 * Remove an owner vm. This is called when the object is
 * swapped out as an instance's $data object.
 *
 * @param {Vue} vm
 */

Observer.prototype.removeVm = function (vm) {
  this.vms.$remove(vm);
};

// helpers

/**
 * Augment an target Object or Array by intercepting
 * the prototype chain using __proto__
 *
 * @param {Object|Array} target
 * @param {Object} src
 */

function protoAugment(target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment an target Object or Array by defining
 * hidden properties.
 *
 * @param {Object|Array} target
 * @param {Object} proto
 */

function copyAugment(target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 *
 * @param {*} value
 * @param {Vue} [vm]
 * @return {Observer|undefined}
 * @static
 */

function observe(value, vm) {
  if (!value || typeof value !== 'object') {
    return;
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (shouldConvert && (isArray(value) || isPlainObject(value)) && Object.isExtensible(value) && !value._isVue) {
    ob = new Observer(value);
  }
  if (ob && vm) {
    ob.addVm(vm);
  }
  return ob;
}

/**
 * Define a reactive property on an Object.
 *
 * @param {Object} obj
 * @param {String} key
 * @param {*} val
 */

function defineReactive(obj, key, val) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return;
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;

  var childOb = observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter() {
      var value = getter ? getter.call(obj) : val;
      if (Dep.target) {
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
        }
        if (isArray(value)) {
          for (var e, i = 0, l = value.length; i < l; i++) {
            e = value[i];
            e && e.__ob__ && e.__ob__.dep.depend();
          }
        }
      }
      return value;
    },
    set: function reactiveSetter(newVal) {
      var value = getter ? getter.call(obj) : val;
      if (newVal === value) {
        return;
      }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = observe(newVal);
      dep.notify();
    }
  });
}



var util = Object.freeze({
	defineReactive: defineReactive,
	set: set,
	del: del,
	hasOwn: hasOwn,
	isLiteral: isLiteral,
	isReserved: isReserved,
	_toString: _toString,
	toNumber: toNumber,
	toBoolean: toBoolean,
	stripQuotes: stripQuotes,
	camelize: camelize,
	hyphenate: hyphenate,
	classify: classify,
	bind: bind,
	toArray: toArray,
	extend: extend,
	isObject: isObject,
	isPlainObject: isPlainObject,
	def: def,
	debounce: _debounce,
	indexOf: indexOf,
	cancellable: cancellable,
	looseEqual: looseEqual,
	isArray: isArray,
	hasProto: hasProto,
	inBrowser: inBrowser,
	devtools: devtools,
	isIE: isIE,
	isIE9: isIE9,
	isAndroid: isAndroid,
	isIOS: isIOS,
	get transitionProp () { return transitionProp; },
	get transitionEndEvent () { return transitionEndEvent; },
	get animationProp () { return animationProp; },
	get animationEndEvent () { return animationEndEvent; },
	nextTick: nextTick,
	get _Set () { return _Set; },
	query: query,
	inDoc: inDoc,
	getAttr: getAttr,
	getBindAttr: getBindAttr,
	hasBindAttr: hasBindAttr,
	before: before,
	after: after,
	remove: remove,
	prepend: prepend,
	replace: replace,
	on: on,
	off: off,
	setClass: setClass,
	addClass: addClass,
	removeClass: removeClass,
	extractContent: extractContent,
	trimNode: trimNode,
	isTemplate: isTemplate,
	createAnchor: createAnchor,
	findRef: findRef,
	mapNodeRange: mapNodeRange,
	removeNodeRange: removeNodeRange,
	isFragment: isFragment,
	getOuterHTML: getOuterHTML,
	mergeOptions: mergeOptions,
	resolveAsset: resolveAsset,
	checkComponentAttr: checkComponentAttr,
	commonTagRE: commonTagRE,
	reservedTagRE: reservedTagRE,
	get warn () { return warn; }
});

var uid = 0;

function initMixin (Vue) {
  /**
   * The main init sequence. This is called for every
   * instance, including ones that are created from extended
   * constructors.
   *
   * @param {Object} options - this options object should be
   *                           the result of merging class
   *                           options and the options passed
   *                           in to the constructor.
   */

  Vue.prototype._init = function (options) {
    options = options || {};

    this.$el = null;
    this.$parent = options.parent;
    this.$root = this.$parent ? this.$parent.$root : this;
    this.$children = [];
    this.$refs = {}; // child vm references
    this.$els = {}; // element references
    this._watchers = []; // all watchers as an array
    this._directives = []; // all directives

    // a uid
    this._uid = uid++;

    // a flag to avoid this being observed
    this._isVue = true;

    // events bookkeeping
    this._events = {}; // registered callbacks
    this._eventsCount = {}; // for $broadcast optimization

    // fragment instance properties
    this._isFragment = false;
    this._fragment = // @type {DocumentFragment}
    this._fragmentStart = // @type {Text|Comment}
    this._fragmentEnd = null; // @type {Text|Comment}

    // lifecycle state
    this._isCompiled = this._isDestroyed = this._isReady = this._isAttached = this._isBeingDestroyed = this._vForRemoving = false;
    this._unlinkFn = null;

    // context:
    // if this is a transcluded component, context
    // will be the common parent vm of this instance
    // and its host.
    this._context = options._context || this.$parent;

    // scope:
    // if this is inside an inline v-for, the scope
    // will be the intermediate scope created for this
    // repeat fragment. this is used for linking props
    // and container directives.
    this._scope = options._scope;

    // fragment:
    // if this instance is compiled inside a Fragment, it
    // needs to register itself as a child of that fragment
    // for attach/detach to work properly.
    this._frag = options._frag;
    if (this._frag) {
      this._frag.children.push(this);
    }

    // push self into parent / transclusion host
    if (this.$parent) {
      this.$parent.$children.push(this);
    }

    // merge options.
    options = this.$options = mergeOptions(this.constructor.options, options, this);

    // set ref
    this._updateRef();

    // initialize data as empty object.
    // it will be filled up in _initData().
    this._data = {};

    // call init hook
    this._callHook('init');

    // initialize data observation and scope inheritance.
    this._initState();

    // setup event system and option events.
    this._initEvents();

    // call created hook
    this._callHook('created');

    // if `el` option is passed, start compilation.
    if (options.el) {
      this.$mount(options.el);
    }
  };
}

var pathCache = new Cache(1000);

// actions
var APPEND = 0;
var PUSH = 1;
var INC_SUB_PATH_DEPTH = 2;
var PUSH_SUB_PATH = 3;

// states
var BEFORE_PATH = 0;
var IN_PATH = 1;
var BEFORE_IDENT = 2;
var IN_IDENT = 3;
var IN_SUB_PATH = 4;
var IN_SINGLE_QUOTE = 5;
var IN_DOUBLE_QUOTE = 6;
var AFTER_PATH = 7;
var ERROR = 8;

var pathStateMachine = [];

pathStateMachine[BEFORE_PATH] = {
  'ws': [BEFORE_PATH],
  'ident': [IN_IDENT, APPEND],
  '[': [IN_SUB_PATH],
  'eof': [AFTER_PATH]
};

pathStateMachine[IN_PATH] = {
  'ws': [IN_PATH],
  '.': [BEFORE_IDENT],
  '[': [IN_SUB_PATH],
  'eof': [AFTER_PATH]
};

pathStateMachine[BEFORE_IDENT] = {
  'ws': [BEFORE_IDENT],
  'ident': [IN_IDENT, APPEND]
};

pathStateMachine[IN_IDENT] = {
  'ident': [IN_IDENT, APPEND],
  '0': [IN_IDENT, APPEND],
  'number': [IN_IDENT, APPEND],
  'ws': [IN_PATH, PUSH],
  '.': [BEFORE_IDENT, PUSH],
  '[': [IN_SUB_PATH, PUSH],
  'eof': [AFTER_PATH, PUSH]
};

pathStateMachine[IN_SUB_PATH] = {
  "'": [IN_SINGLE_QUOTE, APPEND],
  '"': [IN_DOUBLE_QUOTE, APPEND],
  '[': [IN_SUB_PATH, INC_SUB_PATH_DEPTH],
  ']': [IN_PATH, PUSH_SUB_PATH],
  'eof': ERROR,
  'else': [IN_SUB_PATH, APPEND]
};

pathStateMachine[IN_SINGLE_QUOTE] = {
  "'": [IN_SUB_PATH, APPEND],
  'eof': ERROR,
  'else': [IN_SINGLE_QUOTE, APPEND]
};

pathStateMachine[IN_DOUBLE_QUOTE] = {
  '"': [IN_SUB_PATH, APPEND],
  'eof': ERROR,
  'else': [IN_DOUBLE_QUOTE, APPEND]
};

/**
 * Determine the type of a character in a keypath.
 *
 * @param {Char} ch
 * @return {String} type
 */

function getPathCharType(ch) {
  if (ch === undefined) {
    return 'eof';
  }

  var code = ch.charCodeAt(0);

  switch (code) {
    case 0x5B: // [
    case 0x5D: // ]
    case 0x2E: // .
    case 0x22: // "
    case 0x27: // '
    case 0x30:
      // 0
      return ch;

    case 0x5F: // _
    case 0x24:
      // $
      return 'ident';

    case 0x20: // Space
    case 0x09: // Tab
    case 0x0A: // Newline
    case 0x0D: // Return
    case 0xA0: // No-break space
    case 0xFEFF: // Byte Order Mark
    case 0x2028: // Line Separator
    case 0x2029:
      // Paragraph Separator
      return 'ws';
  }

  // a-z, A-Z
  if (code >= 0x61 && code <= 0x7A || code >= 0x41 && code <= 0x5A) {
    return 'ident';
  }

  // 1-9
  if (code >= 0x31 && code <= 0x39) {
    return 'number';
  }

  return 'else';
}

/**
 * Format a subPath, return its plain form if it is
 * a literal string or number. Otherwise prepend the
 * dynamic indicator (*).
 *
 * @param {String} path
 * @return {String}
 */

function formatSubPath(path) {
  var trimmed = path.trim();
  // invalid leading 0
  if (path.charAt(0) === '0' && isNaN(path)) {
    return false;
  }
  return isLiteral(trimmed) ? stripQuotes(trimmed) : '*' + trimmed;
}

/**
 * Parse a string path into an array of segments
 *
 * @param {String} path
 * @return {Array|undefined}
 */

function parse(path) {
  var keys = [];
  var index = -1;
  var mode = BEFORE_PATH;
  var subPathDepth = 0;
  var c, newChar, key, type, transition, action, typeMap;

  var actions = [];

  actions[PUSH] = function () {
    if (key !== undefined) {
      keys.push(key);
      key = undefined;
    }
  };

  actions[APPEND] = function () {
    if (key === undefined) {
      key = newChar;
    } else {
      key += newChar;
    }
  };

  actions[INC_SUB_PATH_DEPTH] = function () {
    actions[APPEND]();
    subPathDepth++;
  };

  actions[PUSH_SUB_PATH] = function () {
    if (subPathDepth > 0) {
      subPathDepth--;
      mode = IN_SUB_PATH;
      actions[APPEND]();
    } else {
      subPathDepth = 0;
      key = formatSubPath(key);
      if (key === false) {
        return false;
      } else {
        actions[PUSH]();
      }
    }
  };

  function maybeUnescapeQuote() {
    var nextChar = path[index + 1];
    if (mode === IN_SINGLE_QUOTE && nextChar === "'" || mode === IN_DOUBLE_QUOTE && nextChar === '"') {
      index++;
      newChar = '\\' + nextChar;
      actions[APPEND]();
      return true;
    }
  }

  while (mode != null) {
    index++;
    c = path[index];

    if (c === '\\' && maybeUnescapeQuote()) {
      continue;
    }

    type = getPathCharType(c);
    typeMap = pathStateMachine[mode];
    transition = typeMap[type] || typeMap['else'] || ERROR;

    if (transition === ERROR) {
      return; // parse error
    }

    mode = transition[0];
    action = actions[transition[1]];
    if (action) {
      newChar = transition[2];
      newChar = newChar === undefined ? c : newChar;
      if (action() === false) {
        return;
      }
    }

    if (mode === AFTER_PATH) {
      keys.raw = path;
      return keys;
    }
  }
}

/**
 * External parse that check for a cache hit first
 *
 * @param {String} path
 * @return {Array|undefined}
 */

function parsePath(path) {
  var hit = pathCache.get(path);
  if (!hit) {
    hit = parse(path);
    if (hit) {
      pathCache.put(path, hit);
    }
  }
  return hit;
}

/**
 * Get from an object from a path string
 *
 * @param {Object} obj
 * @param {String} path
 */

function getPath(obj, path) {
  return parseExpression$1(path).get(obj);
}

/**
 * Warn against setting non-existent root path on a vm.
 */

var warnNonExistent;
if (process.env.NODE_ENV !== 'production') {
  warnNonExistent = function (path, vm) {
    warn('You are setting a non-existent path "' + path.raw + '" ' + 'on a vm instance. Consider pre-initializing the property ' + 'with the "data" option for more reliable reactivity ' + 'and better performance.', vm);
  };
}

/**
 * Set on an object from a path
 *
 * @param {Object} obj
 * @param {String | Array} path
 * @param {*} val
 */

function setPath(obj, path, val) {
  var original = obj;
  if (typeof path === 'string') {
    path = parse(path);
  }
  if (!path || !isObject(obj)) {
    return false;
  }
  var last, key;
  for (var i = 0, l = path.length; i < l; i++) {
    last = obj;
    key = path[i];
    if (key.charAt(0) === '*') {
      key = parseExpression$1(key.slice(1)).get.call(original, original);
    }
    if (i < l - 1) {
      obj = obj[key];
      if (!isObject(obj)) {
        obj = {};
        if (process.env.NODE_ENV !== 'production' && last._isVue) {
          warnNonExistent(path, last);
        }
        set(last, key, obj);
      }
    } else {
      if (isArray(obj)) {
        obj.$set(key, val);
      } else if (key in obj) {
        obj[key] = val;
      } else {
        if (process.env.NODE_ENV !== 'production' && obj._isVue) {
          warnNonExistent(path, obj);
        }
        set(obj, key, val);
      }
    }
  }
  return true;
}

var path = Object.freeze({
  parsePath: parsePath,
  getPath: getPath,
  setPath: setPath
});

var expressionCache = new Cache(1000);

var allowedKeywords = 'Math,Date,this,true,false,null,undefined,Infinity,NaN,' + 'isNaN,isFinite,decodeURI,decodeURIComponent,encodeURI,' + 'encodeURIComponent,parseInt,parseFloat';
var allowedKeywordsRE = new RegExp('^(' + allowedKeywords.replace(/,/g, '\\b|') + '\\b)');

// keywords that don't make sense inside expressions
var improperKeywords = 'break,case,class,catch,const,continue,debugger,default,' + 'delete,do,else,export,extends,finally,for,function,if,' + 'import,in,instanceof,let,return,super,switch,throw,try,' + 'var,while,with,yield,enum,await,implements,package,' + 'protected,static,interface,private,public';
var improperKeywordsRE = new RegExp('^(' + improperKeywords.replace(/,/g, '\\b|') + '\\b)');

var wsRE = /\s/g;
var newlineRE = /\n/g;
var saveRE = /[\{,]\s*[\w\$_]+\s*:|('(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"|`(?:[^`\\]|\\.)*\$\{|\}(?:[^`\\"']|\\.)*`|`(?:[^`\\]|\\.)*`)|new |typeof |void /g;
var restoreRE = /"(\d+)"/g;
var pathTestRE = /^[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*|\['.*?'\]|\[".*?"\]|\[\d+\]|\[[A-Za-z_$][\w$]*\])*$/;
var identRE = /[^\w$\.](?:[A-Za-z_$][\w$]*)/g;
var literalValueRE$1 = /^(?:true|false|null|undefined|Infinity|NaN)$/;

function noop() {}

/**
 * Save / Rewrite / Restore
 *
 * When rewriting paths found in an expression, it is
 * possible for the same letter sequences to be found in
 * strings and Object literal property keys. Therefore we
 * remove and store these parts in a temporary array, and
 * restore them after the path rewrite.
 */

var saved = [];

/**
 * Save replacer
 *
 * The save regex can match two possible cases:
 * 1. An opening object literal
 * 2. A string
 * If matched as a plain string, we need to escape its
 * newlines, since the string needs to be preserved when
 * generating the function body.
 *
 * @param {String} str
 * @param {String} isString - str if matched as a string
 * @return {String} - placeholder with index
 */

function save(str, isString) {
  var i = saved.length;
  saved[i] = isString ? str.replace(newlineRE, '\\n') : str;
  return '"' + i + '"';
}

/**
 * Path rewrite replacer
 *
 * @param {String} raw
 * @return {String}
 */

function rewrite(raw) {
  var c = raw.charAt(0);
  var path = raw.slice(1);
  if (allowedKeywordsRE.test(path)) {
    return raw;
  } else {
    path = path.indexOf('"') > -1 ? path.replace(restoreRE, restore) : path;
    return c + 'scope.' + path;
  }
}

/**
 * Restore replacer
 *
 * @param {String} str
 * @param {String} i - matched save index
 * @return {String}
 */

function restore(str, i) {
  return saved[i];
}

/**
 * Rewrite an expression, prefixing all path accessors with
 * `scope.` and generate getter/setter functions.
 *
 * @param {String} exp
 * @return {Function}
 */

function compileGetter(exp) {
  if (improperKeywordsRE.test(exp)) {
    process.env.NODE_ENV !== 'production' && warn('Avoid using reserved keywords in expression: ' + exp);
  }
  // reset state
  saved.length = 0;
  // save strings and object literal keys
  var body = exp.replace(saveRE, save).replace(wsRE, '');
  // rewrite all paths
  // pad 1 space here because the regex matches 1 extra char
  body = (' ' + body).replace(identRE, rewrite).replace(restoreRE, restore);
  return makeGetterFn(body);
}

/**
 * Build a getter function. Requires eval.
 *
 * We isolate the try/catch so it doesn't affect the
 * optimization of the parse function when it is not called.
 *
 * @param {String} body
 * @return {Function|undefined}
 */

function makeGetterFn(body) {
  try {
    /* eslint-disable no-new-func */
    return new Function('scope', 'return ' + body + ';');
    /* eslint-enable no-new-func */
  } catch (e) {
    if (process.env.NODE_ENV !== 'production') {
      /* istanbul ignore if */
      if (e.toString().match(/unsafe-eval|CSP/)) {
        warn('It seems you are using the default build of Vue.js in an environment ' + 'with Content Security Policy that prohibits unsafe-eval. ' + 'Use the CSP-compliant build instead: ' + 'http://vuejs.org/guide/installation.html#CSP-compliant-build');
      } else {
        warn('Invalid expression. ' + 'Generated function body: ' + body);
      }
    }
    return noop;
  }
}

/**
 * Compile a setter function for the expression.
 *
 * @param {String} exp
 * @return {Function|undefined}
 */

function compileSetter(exp) {
  var path = parsePath(exp);
  if (path) {
    return function (scope, val) {
      setPath(scope, path, val);
    };
  } else {
    process.env.NODE_ENV !== 'production' && warn('Invalid setter expression: ' + exp);
  }
}

/**
 * Parse an expression into re-written getter/setters.
 *
 * @param {String} exp
 * @param {Boolean} needSet
 * @return {Function}
 */

function parseExpression$1(exp, needSet) {
  exp = exp.trim();
  // try cache
  var hit = expressionCache.get(exp);
  if (hit) {
    if (needSet && !hit.set) {
      hit.set = compileSetter(hit.exp);
    }
    return hit;
  }
  var res = { exp: exp };
  res.get = isSimplePath(exp) && exp.indexOf('[') < 0
  // optimized super simple getter
  ? makeGetterFn('scope.' + exp)
  // dynamic getter
  : compileGetter(exp);
  if (needSet) {
    res.set = compileSetter(exp);
  }
  expressionCache.put(exp, res);
  return res;
}

/**
 * Check if an expression is a simple path.
 *
 * @param {String} exp
 * @return {Boolean}
 */

function isSimplePath(exp) {
  return pathTestRE.test(exp) &&
  // don't treat literal values as paths
  !literalValueRE$1.test(exp) &&
  // Math constants e.g. Math.PI, Math.E etc.
  exp.slice(0, 5) !== 'Math.';
}

var expression = Object.freeze({
  parseExpression: parseExpression$1,
  isSimplePath: isSimplePath
});

// we have two separate queues: one for directive updates
// and one for user watcher registered via $watch().
// we want to guarantee directive updates to be called
// before user watchers so that when user watchers are
// triggered, the DOM would have already been in updated
// state.

var queue = [];
var userQueue = [];
var has = {};
var circular = {};
var waiting = false;

/**
 * Reset the batcher's state.
 */

function resetBatcherState() {
  queue.length = 0;
  userQueue.length = 0;
  has = {};
  circular = {};
  waiting = false;
}

/**
 * Flush both queues and run the watchers.
 */

function flushBatcherQueue() {
  var _again = true;

  _function: while (_again) {
    _again = false;

    runBatcherQueue(queue);
    runBatcherQueue(userQueue);
    // user watchers triggered more watchers,
    // keep flushing until it depletes
    if (queue.length) {
      _again = true;
      continue _function;
    }
    // dev tool hook
    /* istanbul ignore if */
    if (devtools && config.devtools) {
      devtools.emit('flush');
    }
    resetBatcherState();
  }
}

/**
 * Run the watchers in a single queue.
 *
 * @param {Array} queue
 */

function runBatcherQueue(queue) {
  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (var i = 0; i < queue.length; i++) {
    var watcher = queue[i];
    var id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if (process.env.NODE_ENV !== 'production' && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > config._maxUpdateCount) {
        warn('You may have an infinite update loop for watcher ' + 'with expression "' + watcher.expression + '"', watcher.vm);
        break;
      }
    }
  }
  queue.length = 0;
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 *
 * @param {Watcher} watcher
 *   properties:
 *   - {Number} id
 *   - {Function} run
 */

function pushWatcher(watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    // push watcher into appropriate queue
    var q = watcher.user ? userQueue : queue;
    has[id] = q.length;
    q.push(watcher);
    // queue the flush
    if (!waiting) {
      waiting = true;
      nextTick(flushBatcherQueue);
    }
  }
}

var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 *
 * @param {Vue} vm
 * @param {String|Function} expOrFn
 * @param {Function} cb
 * @param {Object} options
 *                 - {Array} filters
 *                 - {Boolean} twoWay
 *                 - {Boolean} deep
 *                 - {Boolean} user
 *                 - {Boolean} sync
 *                 - {Boolean} lazy
 *                 - {Function} [preProcess]
 *                 - {Function} [postProcess]
 * @constructor
 */
function Watcher(vm, expOrFn, cb, options) {
  // mix in options
  if (options) {
    extend(this, options);
  }
  var isFn = typeof expOrFn === 'function';
  this.vm = vm;
  vm._watchers.push(this);
  this.expression = expOrFn;
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.prevError = null; // for async error stacks
  // parse expression for getter/setter
  if (isFn) {
    this.getter = expOrFn;
    this.setter = undefined;
  } else {
    var res = parseExpression$1(expOrFn, this.twoWay);
    this.getter = res.get;
    this.setter = res.set;
  }
  this.value = this.lazy ? undefined : this.get();
  // state for avoiding false triggers for deep and Array
  // watchers during vm._digest()
  this.queued = this.shallow = false;
}

/**
 * Evaluate the getter, and re-collect dependencies.
 */

Watcher.prototype.get = function () {
  this.beforeGet();
  var scope = this.scope || this.vm;
  var value;
  try {
    value = this.getter.call(scope, scope);
  } catch (e) {
    if (process.env.NODE_ENV !== 'production' && config.warnExpressionErrors) {
      warn('Error when evaluating expression ' + '"' + this.expression + '": ' + e.toString(), this.vm);
    }
  }
  // "touch" every property so they are all tracked as
  // dependencies for deep watching
  if (this.deep) {
    traverse(value);
  }
  if (this.preProcess) {
    value = this.preProcess(value);
  }
  if (this.filters) {
    value = scope._applyFilters(value, null, this.filters, false);
  }
  if (this.postProcess) {
    value = this.postProcess(value);
  }
  this.afterGet();
  return value;
};

/**
 * Set the corresponding value with the setter.
 *
 * @param {*} value
 */

Watcher.prototype.set = function (value) {
  var scope = this.scope || this.vm;
  if (this.filters) {
    value = scope._applyFilters(value, this.value, this.filters, true);
  }
  try {
    this.setter.call(scope, scope, value);
  } catch (e) {
    if (process.env.NODE_ENV !== 'production' && config.warnExpressionErrors) {
      warn('Error when evaluating setter ' + '"' + this.expression + '": ' + e.toString(), this.vm);
    }
  }
  // two-way sync for v-for alias
  var forContext = scope.$forContext;
  if (forContext && forContext.alias === this.expression) {
    if (forContext.filters) {
      process.env.NODE_ENV !== 'production' && warn('It seems you are using two-way binding on ' + 'a v-for alias (' + this.expression + '), and the ' + 'v-for has filters. This will not work properly. ' + 'Either remove the filters or use an array of ' + 'objects and bind to object properties instead.', this.vm);
      return;
    }
    forContext._withLock(function () {
      if (scope.$key) {
        // original is an object
        forContext.rawValue[scope.$key] = value;
      } else {
        forContext.rawValue.$set(scope.$index, value);
      }
    });
  }
};

/**
 * Prepare for dependency collection.
 */

Watcher.prototype.beforeGet = function () {
  Dep.target = this;
};

/**
 * Add a dependency to this directive.
 *
 * @param {Dep} dep
 */

Watcher.prototype.addDep = function (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */

Watcher.prototype.afterGet = function () {
  Dep.target = null;
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 *
 * @param {Boolean} shallow
 */

Watcher.prototype.update = function (shallow) {
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync || !config.async) {
    this.run();
  } else {
    // if queued, only overwrite shallow with non-shallow,
    // but not the other way around.
    this.shallow = this.queued ? shallow ? this.shallow : false : !!shallow;
    this.queued = true;
    // record before-push error stack in debug mode
    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'production' && config.debug) {
      this.prevError = new Error('[vue] async stack trace');
    }
    pushWatcher(this);
  }
};

/**
 * Batcher job interface.
 * Will be called by the batcher.
 */

Watcher.prototype.run = function () {
  if (this.active) {
    var value = this.get();
    if (value !== this.value ||
    // Deep watchers and watchers on Object/Arrays should fire even
    // when the value is the same, because the value may
    // have mutated; but only do so if this is a
    // non-shallow update (caused by a vm digest).
    (isObject(value) || this.deep) && !this.shallow) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      // in debug + async mode, when a watcher callbacks
      // throws, we also throw the saved before-push error
      // so the full cross-tick stack trace is available.
      var prevError = this.prevError;
      /* istanbul ignore if */
      if (process.env.NODE_ENV !== 'production' && config.debug && prevError) {
        this.prevError = null;
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          nextTick(function () {
            throw prevError;
          }, 0);
          throw e;
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
    this.queued = this.shallow = false;
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */

Watcher.prototype.evaluate = function () {
  // avoid overwriting another watcher that is being
  // collected.
  var current = Dep.target;
  this.value = this.get();
  this.dirty = false;
  Dep.target = current;
};

/**
 * Depend on all deps collected by this watcher.
 */

Watcher.prototype.depend = function () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subcriber list.
 */

Watcher.prototype.teardown = function () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed or is performing a v-for
    // re-render (the watcher list is then filtered by v-for).
    if (!this.vm._isBeingDestroyed && !this.vm._vForRemoving) {
      this.vm._watchers.$remove(this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
    this.vm = this.cb = this.value = null;
  }
};

/**
 * Recrusively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 *
 * @param {*} val
 */

var seenObjects = new _Set();
function traverse(val, seen) {
  var i = undefined,
      keys = undefined;
  if (!seen) {
    seen = seenObjects;
    seen.clear();
  }
  var isA = isArray(val);
  var isO = isObject(val);
  if ((isA || isO) && Object.isExtensible(val)) {
    if (val.__ob__) {
      var depId = val.__ob__.dep.id;
      if (seen.has(depId)) {
        return;
      } else {
        seen.add(depId);
      }
    }
    if (isA) {
      i = val.length;
      while (i--) traverse(val[i], seen);
    } else if (isO) {
      keys = Object.keys(val);
      i = keys.length;
      while (i--) traverse(val[keys[i]], seen);
    }
  }
}

var text$1 = {

  bind: function bind() {
    this.attr = this.el.nodeType === 3 ? 'data' : 'textContent';
  },

  update: function update(value) {
    this.el[this.attr] = _toString(value);
  }
};

var templateCache = new Cache(1000);
var idSelectorCache = new Cache(1000);

var map = {
  efault: [0, '', ''],
  legend: [1, '<fieldset>', '</fieldset>'],
  tr: [2, '<table><tbody>', '</tbody></table>'],
  col: [2, '<table><tbody></tbody><colgroup>', '</colgroup></table>']
};

map.td = map.th = [3, '<table><tbody><tr>', '</tr></tbody></table>'];

map.option = map.optgroup = [1, '<select multiple="multiple">', '</select>'];

map.thead = map.tbody = map.colgroup = map.caption = map.tfoot = [1, '<table>', '</table>'];

map.g = map.defs = map.symbol = map.use = map.image = map.text = map.circle = map.ellipse = map.line = map.path = map.polygon = map.polyline = map.rect = [1, '<svg ' + 'xmlns="http://www.w3.org/2000/svg" ' + 'xmlns:xlink="http://www.w3.org/1999/xlink" ' + 'xmlns:ev="http://www.w3.org/2001/xml-events"' + 'version="1.1">', '</svg>'];

/**
 * Check if a node is a supported template node with a
 * DocumentFragment content.
 *
 * @param {Node} node
 * @return {Boolean}
 */

function isRealTemplate(node) {
  return isTemplate(node) && isFragment(node.content);
}

var tagRE$1 = /<([\w:-]+)/;
var entityRE = /&#?\w+?;/;
var commentRE = /<!--/;

/**
 * Convert a string template to a DocumentFragment.
 * Determines correct wrapping by tag types. Wrapping
 * strategy found in jQuery & component/domify.
 *
 * @param {String} templateString
 * @param {Boolean} raw
 * @return {DocumentFragment}
 */

function stringToFragment(templateString, raw) {
  // try a cache hit first
  var cacheKey = raw ? templateString : templateString.trim();
  var hit = templateCache.get(cacheKey);
  if (hit) {
    return hit;
  }

  var frag = document.createDocumentFragment();
  var tagMatch = templateString.match(tagRE$1);
  var entityMatch = entityRE.test(templateString);
  var commentMatch = commentRE.test(templateString);

  if (!tagMatch && !entityMatch && !commentMatch) {
    // text only, return a single text node.
    frag.appendChild(document.createTextNode(templateString));
  } else {
    var tag = tagMatch && tagMatch[1];
    var wrap = map[tag] || map.efault;
    var depth = wrap[0];
    var prefix = wrap[1];
    var suffix = wrap[2];
    var node = document.createElement('div');

    node.innerHTML = prefix + templateString + suffix;
    while (depth--) {
      node = node.lastChild;
    }

    var child;
    /* eslint-disable no-cond-assign */
    while (child = node.firstChild) {
      /* eslint-enable no-cond-assign */
      frag.appendChild(child);
    }
  }
  if (!raw) {
    trimNode(frag);
  }
  templateCache.put(cacheKey, frag);
  return frag;
}

/**
 * Convert a template node to a DocumentFragment.
 *
 * @param {Node} node
 * @return {DocumentFragment}
 */

function nodeToFragment(node) {
  // if its a template tag and the browser supports it,
  // its content is already a document fragment. However, iOS Safari has
  // bug when using directly cloned template content with touch
  // events and can cause crashes when the nodes are removed from DOM, so we
  // have to treat template elements as string templates. (#2805)
  /* istanbul ignore if */
  if (isRealTemplate(node)) {
    return stringToFragment(node.innerHTML);
  }
  // script template
  if (node.tagName === 'SCRIPT') {
    return stringToFragment(node.textContent);
  }
  // normal node, clone it to avoid mutating the original
  var clonedNode = cloneNode(node);
  var frag = document.createDocumentFragment();
  var child;
  /* eslint-disable no-cond-assign */
  while (child = clonedNode.firstChild) {
    /* eslint-enable no-cond-assign */
    frag.appendChild(child);
  }
  trimNode(frag);
  return frag;
}

// Test for the presence of the Safari template cloning bug
// https://bugs.webkit.org/showug.cgi?id=137755
var hasBrokenTemplate = (function () {
  /* istanbul ignore else */
  if (inBrowser) {
    var a = document.createElement('div');
    a.innerHTML = '<template>1</template>';
    return !a.cloneNode(true).firstChild.innerHTML;
  } else {
    return false;
  }
})();

// Test for IE10/11 textarea placeholder clone bug
var hasTextareaCloneBug = (function () {
  /* istanbul ignore else */
  if (inBrowser) {
    var t = document.createElement('textarea');
    t.placeholder = 't';
    return t.cloneNode(true).value === 't';
  } else {
    return false;
  }
})();

/**
 * 1. Deal with Safari cloning nested <template> bug by
 *    manually cloning all template instances.
 * 2. Deal with IE10/11 textarea placeholder bug by setting
 *    the correct value after cloning.
 *
 * @param {Element|DocumentFragment} node
 * @return {Element|DocumentFragment}
 */

function cloneNode(node) {
  /* istanbul ignore if */
  if (!node.querySelectorAll) {
    return node.cloneNode();
  }
  var res = node.cloneNode(true);
  var i, original, cloned;
  /* istanbul ignore if */
  if (hasBrokenTemplate) {
    var tempClone = res;
    if (isRealTemplate(node)) {
      node = node.content;
      tempClone = res.content;
    }
    original = node.querySelectorAll('template');
    if (original.length) {
      cloned = tempClone.querySelectorAll('template');
      i = cloned.length;
      while (i--) {
        cloned[i].parentNode.replaceChild(cloneNode(original[i]), cloned[i]);
      }
    }
  }
  /* istanbul ignore if */
  if (hasTextareaCloneBug) {
    if (node.tagName === 'TEXTAREA') {
      res.value = node.value;
    } else {
      original = node.querySelectorAll('textarea');
      if (original.length) {
        cloned = res.querySelectorAll('textarea');
        i = cloned.length;
        while (i--) {
          cloned[i].value = original[i].value;
        }
      }
    }
  }
  return res;
}

/**
 * Process the template option and normalizes it into a
 * a DocumentFragment that can be used as a partial or a
 * instance template.
 *
 * @param {*} template
 *        Possible values include:
 *        - DocumentFragment object
 *        - Node object of type Template
 *        - id selector: '#some-template-id'
 *        - template string: '<div><span>{{msg}}</span></div>'
 * @param {Boolean} shouldClone
 * @param {Boolean} raw
 *        inline HTML interpolation. Do not check for id
 *        selector and keep whitespace in the string.
 * @return {DocumentFragment|undefined}
 */

function parseTemplate(template, shouldClone, raw) {
  var node, frag;

  // if the template is already a document fragment,
  // do nothing
  if (isFragment(template)) {
    trimNode(template);
    return shouldClone ? cloneNode(template) : template;
  }

  if (typeof template === 'string') {
    // id selector
    if (!raw && template.charAt(0) === '#') {
      // id selector can be cached too
      frag = idSelectorCache.get(template);
      if (!frag) {
        node = document.getElementById(template.slice(1));
        if (node) {
          frag = nodeToFragment(node);
          // save selector to cache
          idSelectorCache.put(template, frag);
        }
      }
    } else {
      // normal string template
      frag = stringToFragment(template, raw);
    }
  } else if (template.nodeType) {
    // a direct node
    frag = nodeToFragment(template);
  }

  return frag && shouldClone ? cloneNode(frag) : frag;
}

var template = Object.freeze({
  cloneNode: cloneNode,
  parseTemplate: parseTemplate
});

var html = {

  bind: function bind() {
    // a comment node means this is a binding for
    // {{{ inline unescaped html }}}
    if (this.el.nodeType === 8) {
      // hold nodes
      this.nodes = [];
      // replace the placeholder with proper anchor
      this.anchor = createAnchor('v-html');
      replace(this.el, this.anchor);
    }
  },

  update: function update(value) {
    value = _toString(value);
    if (this.nodes) {
      this.swap(value);
    } else {
      this.el.innerHTML = value;
    }
  },

  swap: function swap(value) {
    // remove old nodes
    var i = this.nodes.length;
    while (i--) {
      remove(this.nodes[i]);
    }
    // convert new value to a fragment
    // do not attempt to retrieve from id selector
    var frag = parseTemplate(value, true, true);
    // save a reference to these nodes so we can remove later
    this.nodes = toArray(frag.childNodes);
    before(frag, this.anchor);
  }
};

/**
 * Abstraction for a partially-compiled fragment.
 * Can optionally compile content with a child scope.
 *
 * @param {Function} linker
 * @param {Vue} vm
 * @param {DocumentFragment} frag
 * @param {Vue} [host]
 * @param {Object} [scope]
 * @param {Fragment} [parentFrag]
 */
function Fragment(linker, vm, frag, host, scope, parentFrag) {
  this.children = [];
  this.childFrags = [];
  this.vm = vm;
  this.scope = scope;
  this.inserted = false;
  this.parentFrag = parentFrag;
  if (parentFrag) {
    parentFrag.childFrags.push(this);
  }
  this.unlink = linker(vm, frag, host, scope, this);
  var single = this.single = frag.childNodes.length === 1 &&
  // do not go single mode if the only node is an anchor
  !frag.childNodes[0].__v_anchor;
  if (single) {
    this.node = frag.childNodes[0];
    this.before = singleBefore;
    this.remove = singleRemove;
  } else {
    this.node = createAnchor('fragment-start');
    this.end = createAnchor('fragment-end');
    this.frag = frag;
    prepend(this.node, frag);
    frag.appendChild(this.end);
    this.before = multiBefore;
    this.remove = multiRemove;
  }
  this.node.__v_frag = this;
}

/**
 * Call attach/detach for all components contained within
 * this fragment. Also do so recursively for all child
 * fragments.
 *
 * @param {Function} hook
 */

Fragment.prototype.callHook = function (hook) {
  var i, l;
  for (i = 0, l = this.childFrags.length; i < l; i++) {
    this.childFrags[i].callHook(hook);
  }
  for (i = 0, l = this.children.length; i < l; i++) {
    hook(this.children[i]);
  }
};

/**
 * Insert fragment before target, single node version
 *
 * @param {Node} target
 * @param {Boolean} withTransition
 */

function singleBefore(target, withTransition) {
  this.inserted = true;
  var method = withTransition !== false ? beforeWithTransition : before;
  method(this.node, target, this.vm);
  if (inDoc(this.node)) {
    this.callHook(attach);
  }
}

/**
 * Remove fragment, single node version
 */

function singleRemove() {
  this.inserted = false;
  var shouldCallRemove = inDoc(this.node);
  var self = this;
  this.beforeRemove();
  removeWithTransition(this.node, this.vm, function () {
    if (shouldCallRemove) {
      self.callHook(detach);
    }
    self.destroy();
  });
}

/**
 * Insert fragment before target, multi-nodes version
 *
 * @param {Node} target
 * @param {Boolean} withTransition
 */

function multiBefore(target, withTransition) {
  this.inserted = true;
  var vm = this.vm;
  var method = withTransition !== false ? beforeWithTransition : before;
  mapNodeRange(this.node, this.end, function (node) {
    method(node, target, vm);
  });
  if (inDoc(this.node)) {
    this.callHook(attach);
  }
}

/**
 * Remove fragment, multi-nodes version
 */

function multiRemove() {
  this.inserted = false;
  var self = this;
  var shouldCallRemove = inDoc(this.node);
  this.beforeRemove();
  removeNodeRange(this.node, this.end, this.vm, this.frag, function () {
    if (shouldCallRemove) {
      self.callHook(detach);
    }
    self.destroy();
  });
}

/**
 * Prepare the fragment for removal.
 */

Fragment.prototype.beforeRemove = function () {
  var i, l;
  for (i = 0, l = this.childFrags.length; i < l; i++) {
    // call the same method recursively on child
    // fragments, depth-first
    this.childFrags[i].beforeRemove(false);
  }
  for (i = 0, l = this.children.length; i < l; i++) {
    // Call destroy for all contained instances,
    // with remove:false and defer:true.
    // Defer is necessary because we need to
    // keep the children to call detach hooks
    // on them.
    this.children[i].$destroy(false, true);
  }
  var dirs = this.unlink.dirs;
  for (i = 0, l = dirs.length; i < l; i++) {
    // disable the watchers on all the directives
    // so that the rendered content stays the same
    // during removal.
    dirs[i]._watcher && dirs[i]._watcher.teardown();
  }
};

/**
 * Destroy the fragment.
 */

Fragment.prototype.destroy = function () {
  if (this.parentFrag) {
    this.parentFrag.childFrags.$remove(this);
  }
  this.node.__v_frag = null;
  this.unlink();
};

/**
 * Call attach hook for a Vue instance.
 *
 * @param {Vue} child
 */

function attach(child) {
  if (!child._isAttached && inDoc(child.$el)) {
    child._callHook('attached');
  }
}

/**
 * Call detach hook for a Vue instance.
 *
 * @param {Vue} child
 */

function detach(child) {
  if (child._isAttached && !inDoc(child.$el)) {
    child._callHook('detached');
  }
}

var linkerCache = new Cache(5000);

/**
 * A factory that can be used to create instances of a
 * fragment. Caches the compiled linker if possible.
 *
 * @param {Vue} vm
 * @param {Element|String} el
 */
function FragmentFactory(vm, el) {
  this.vm = vm;
  var template;
  var isString = typeof el === 'string';
  if (isString || isTemplate(el) && !el.hasAttribute('v-if')) {
    template = parseTemplate(el, true);
  } else {
    template = document.createDocumentFragment();
    template.appendChild(el);
  }
  this.template = template;
  // linker can be cached, but only for components
  var linker;
  var cid = vm.constructor.cid;
  if (cid > 0) {
    var cacheId = cid + (isString ? el : getOuterHTML(el));
    linker = linkerCache.get(cacheId);
    if (!linker) {
      linker = compile(template, vm.$options, true);
      linkerCache.put(cacheId, linker);
    }
  } else {
    linker = compile(template, vm.$options, true);
  }
  this.linker = linker;
}

/**
 * Create a fragment instance with given host and scope.
 *
 * @param {Vue} host
 * @param {Object} scope
 * @param {Fragment} parentFrag
 */

FragmentFactory.prototype.create = function (host, scope, parentFrag) {
  var frag = cloneNode(this.template);
  return new Fragment(this.linker, this.vm, frag, host, scope, parentFrag);
};

var ON = 700;
var MODEL = 800;
var BIND = 850;
var TRANSITION = 1100;
var EL = 1500;
var COMPONENT = 1500;
var PARTIAL = 1750;
var IF = 2100;
var FOR = 2200;
var SLOT = 2300;

var uid$3 = 0;

var vFor = {

  priority: FOR,
  terminal: true,

  params: ['track-by', 'stagger', 'enter-stagger', 'leave-stagger'],

  bind: function bind() {
    if (process.env.NODE_ENV !== 'production' && this.el.hasAttribute('v-if')) {
      warn('<' + this.el.tagName.toLowerCase() + ' v-for="' + this.expression + '" v-if="' + this.el.getAttribute('v-if') + '">: ' + 'Using v-if and v-for on the same element is not recommended - ' + 'consider filtering the source Array instead.', this.vm);
    }

    // support "item in/of items" syntax
    var inMatch = this.expression.match(/(.*) (?:in|of) (.*)/);
    if (inMatch) {
      var itMatch = inMatch[1].match(/\((.*),(.*)\)/);
      if (itMatch) {
        this.iterator = itMatch[1].trim();
        this.alias = itMatch[2].trim();
      } else {
        this.alias = inMatch[1].trim();
      }
      this.expression = inMatch[2];
    }

    if (!this.alias) {
      process.env.NODE_ENV !== 'production' && warn('Invalid v-for expression "' + this.descriptor.raw + '": ' + 'alias is required.', this.vm);
      return;
    }

    // uid as a cache identifier
    this.id = '__v-for__' + ++uid$3;

    // check if this is an option list,
    // so that we know if we need to update the <select>'s
    // v-model when the option list has changed.
    // because v-model has a lower priority than v-for,
    // the v-model is not bound here yet, so we have to
    // retrive it in the actual updateModel() function.
    var tag = this.el.tagName;
    this.isOption = (tag === 'OPTION' || tag === 'OPTGROUP') && this.el.parentNode.tagName === 'SELECT';

    // setup anchor nodes
    this.start = createAnchor('v-for-start');
    this.end = createAnchor('v-for-end');
    replace(this.el, this.end);
    before(this.start, this.end);

    // cache
    this.cache = Object.create(null);

    // fragment factory
    this.factory = new FragmentFactory(this.vm, this.el);
  },

  update: function update(data) {
    this.diff(data);
    this.updateRef();
    this.updateModel();
  },

  /**
   * Diff, based on new data and old data, determine the
   * minimum amount of DOM manipulations needed to make the
   * DOM reflect the new data Array.
   *
   * The algorithm diffs the new data Array by storing a
   * hidden reference to an owner vm instance on previously
   * seen data. This allows us to achieve O(n) which is
   * better than a levenshtein distance based algorithm,
   * which is O(m * n).
   *
   * @param {Array} data
   */

  diff: function diff(data) {
    // check if the Array was converted from an Object
    var item = data[0];
    var convertedFromObject = this.fromObject = isObject(item) && hasOwn(item, '$key') && hasOwn(item, '$value');

    var trackByKey = this.params.trackBy;
    var oldFrags = this.frags;
    var frags = this.frags = new Array(data.length);
    var alias = this.alias;
    var iterator = this.iterator;
    var start = this.start;
    var end = this.end;
    var inDocument = inDoc(start);
    var init = !oldFrags;
    var i, l, frag, key, value, primitive;

    // First pass, go through the new Array and fill up
    // the new frags array. If a piece of data has a cached
    // instance for it, we reuse it. Otherwise build a new
    // instance.
    for (i = 0, l = data.length; i < l; i++) {
      item = data[i];
      key = convertedFromObject ? item.$key : null;
      value = convertedFromObject ? item.$value : item;
      primitive = !isObject(value);
      frag = !init && this.getCachedFrag(value, i, key);
      if (frag) {
        // reusable fragment
        frag.reused = true;
        // update $index
        frag.scope.$index = i;
        // update $key
        if (key) {
          frag.scope.$key = key;
        }
        // update iterator
        if (iterator) {
          frag.scope[iterator] = key !== null ? key : i;
        }
        // update data for track-by, object repeat &
        // primitive values.
        if (trackByKey || convertedFromObject || primitive) {
          withoutConversion(function () {
            frag.scope[alias] = value;
          });
        }
      } else {
        // new instance
        frag = this.create(value, alias, i, key);
        frag.fresh = !init;
      }
      frags[i] = frag;
      if (init) {
        frag.before(end);
      }
    }

    // we're done for the initial render.
    if (init) {
      return;
    }

    // Second pass, go through the old fragments and
    // destroy those who are not reused (and remove them
    // from cache)
    var removalIndex = 0;
    var totalRemoved = oldFrags.length - frags.length;
    // when removing a large number of fragments, watcher removal
    // turns out to be a perf bottleneck, so we batch the watcher
    // removals into a single filter call!
    this.vm._vForRemoving = true;
    for (i = 0, l = oldFrags.length; i < l; i++) {
      frag = oldFrags[i];
      if (!frag.reused) {
        this.deleteCachedFrag(frag);
        this.remove(frag, removalIndex++, totalRemoved, inDocument);
      }
    }
    this.vm._vForRemoving = false;
    if (removalIndex) {
      this.vm._watchers = this.vm._watchers.filter(function (w) {
        return w.active;
      });
    }

    // Final pass, move/insert new fragments into the
    // right place.
    var targetPrev, prevEl, currentPrev;
    var insertionIndex = 0;
    for (i = 0, l = frags.length; i < l; i++) {
      frag = frags[i];
      // this is the frag that we should be after
      targetPrev = frags[i - 1];
      prevEl = targetPrev ? targetPrev.staggerCb ? targetPrev.staggerAnchor : targetPrev.end || targetPrev.node : start;
      if (frag.reused && !frag.staggerCb) {
        currentPrev = findPrevFrag(frag, start, this.id);
        if (currentPrev !== targetPrev && (!currentPrev ||
        // optimization for moving a single item.
        // thanks to suggestions by @livoras in #1807
        findPrevFrag(currentPrev, start, this.id) !== targetPrev)) {
          this.move(frag, prevEl);
        }
      } else {
        // new instance, or still in stagger.
        // insert with updated stagger index.
        this.insert(frag, insertionIndex++, prevEl, inDocument);
      }
      frag.reused = frag.fresh = false;
    }
  },

  /**
   * Create a new fragment instance.
   *
   * @param {*} value
   * @param {String} alias
   * @param {Number} index
   * @param {String} [key]
   * @return {Fragment}
   */

  create: function create(value, alias, index, key) {
    var host = this._host;
    // create iteration scope
    var parentScope = this._scope || this.vm;
    var scope = Object.create(parentScope);
    // ref holder for the scope
    scope.$refs = Object.create(parentScope.$refs);
    scope.$els = Object.create(parentScope.$els);
    // make sure point $parent to parent scope
    scope.$parent = parentScope;
    // for two-way binding on alias
    scope.$forContext = this;
    // define scope properties
    // important: define the scope alias without forced conversion
    // so that frozen data structures remain non-reactive.
    withoutConversion(function () {
      defineReactive(scope, alias, value);
    });
    defineReactive(scope, '$index', index);
    if (key) {
      defineReactive(scope, '$key', key);
    } else if (scope.$key) {
      // avoid accidental fallback
      def(scope, '$key', null);
    }
    if (this.iterator) {
      defineReactive(scope, this.iterator, key !== null ? key : index);
    }
    var frag = this.factory.create(host, scope, this._frag);
    frag.forId = this.id;
    this.cacheFrag(value, frag, index, key);
    return frag;
  },

  /**
   * Update the v-ref on owner vm.
   */

  updateRef: function updateRef() {
    var ref = this.descriptor.ref;
    if (!ref) return;
    var hash = (this._scope || this.vm).$refs;
    var refs;
    if (!this.fromObject) {
      refs = this.frags.map(findVmFromFrag);
    } else {
      refs = {};
      this.frags.forEach(function (frag) {
        refs[frag.scope.$key] = findVmFromFrag(frag);
      });
    }
    hash[ref] = refs;
  },

  /**
   * For option lists, update the containing v-model on
   * parent <select>.
   */

  updateModel: function updateModel() {
    if (this.isOption) {
      var parent = this.start.parentNode;
      var model = parent && parent.__v_model;
      if (model) {
        model.forceUpdate();
      }
    }
  },

  /**
   * Insert a fragment. Handles staggering.
   *
   * @param {Fragment} frag
   * @param {Number} index
   * @param {Node} prevEl
   * @param {Boolean} inDocument
   */

  insert: function insert(frag, index, prevEl, inDocument) {
    if (frag.staggerCb) {
      frag.staggerCb.cancel();
      frag.staggerCb = null;
    }
    var staggerAmount = this.getStagger(frag, index, null, 'enter');
    if (inDocument && staggerAmount) {
      // create an anchor and insert it synchronously,
      // so that we can resolve the correct order without
      // worrying about some elements not inserted yet
      var anchor = frag.staggerAnchor;
      if (!anchor) {
        anchor = frag.staggerAnchor = createAnchor('stagger-anchor');
        anchor.__v_frag = frag;
      }
      after(anchor, prevEl);
      var op = frag.staggerCb = cancellable(function () {
        frag.staggerCb = null;
        frag.before(anchor);
        remove(anchor);
      });
      setTimeout(op, staggerAmount);
    } else {
      var target = prevEl.nextSibling;
      /* istanbul ignore if */
      if (!target) {
        // reset end anchor position in case the position was messed up
        // by an external drag-n-drop library.
        after(this.end, prevEl);
        target = this.end;
      }
      frag.before(target);
    }
  },

  /**
   * Remove a fragment. Handles staggering.
   *
   * @param {Fragment} frag
   * @param {Number} index
   * @param {Number} total
   * @param {Boolean} inDocument
   */

  remove: function remove(frag, index, total, inDocument) {
    if (frag.staggerCb) {
      frag.staggerCb.cancel();
      frag.staggerCb = null;
      // it's not possible for the same frag to be removed
      // twice, so if we have a pending stagger callback,
      // it means this frag is queued for enter but removed
      // before its transition started. Since it is already
      // destroyed, we can just leave it in detached state.
      return;
    }
    var staggerAmount = this.getStagger(frag, index, total, 'leave');
    if (inDocument && staggerAmount) {
      var op = frag.staggerCb = cancellable(function () {
        frag.staggerCb = null;
        frag.remove();
      });
      setTimeout(op, staggerAmount);
    } else {
      frag.remove();
    }
  },

  /**
   * Move a fragment to a new position.
   * Force no transition.
   *
   * @param {Fragment} frag
   * @param {Node} prevEl
   */

  move: function move(frag, prevEl) {
    // fix a common issue with Sortable:
    // if prevEl doesn't have nextSibling, this means it's
    // been dragged after the end anchor. Just re-position
    // the end anchor to the end of the container.
    /* istanbul ignore if */
    if (!prevEl.nextSibling) {
      this.end.parentNode.appendChild(this.end);
    }
    frag.before(prevEl.nextSibling, false);
  },

  /**
   * Cache a fragment using track-by or the object key.
   *
   * @param {*} value
   * @param {Fragment} frag
   * @param {Number} index
   * @param {String} [key]
   */

  cacheFrag: function cacheFrag(value, frag, index, key) {
    var trackByKey = this.params.trackBy;
    var cache = this.cache;
    var primitive = !isObject(value);
    var id;
    if (key || trackByKey || primitive) {
      id = getTrackByKey(index, key, value, trackByKey);
      if (!cache[id]) {
        cache[id] = frag;
      } else if (trackByKey !== '$index') {
        process.env.NODE_ENV !== 'production' && this.warnDuplicate(value);
      }
    } else {
      id = this.id;
      if (hasOwn(value, id)) {
        if (value[id] === null) {
          value[id] = frag;
        } else {
          process.env.NODE_ENV !== 'production' && this.warnDuplicate(value);
        }
      } else if (Object.isExtensible(value)) {
        def(value, id, frag);
      } else if (process.env.NODE_ENV !== 'production') {
        warn('Frozen v-for objects cannot be automatically tracked, make sure to ' + 'provide a track-by key.');
      }
    }
    frag.raw = value;
  },

  /**
   * Get a cached fragment from the value/index/key
   *
   * @param {*} value
   * @param {Number} index
   * @param {String} key
   * @return {Fragment}
   */

  getCachedFrag: function getCachedFrag(value, index, key) {
    var trackByKey = this.params.trackBy;
    var primitive = !isObject(value);
    var frag;
    if (key || trackByKey || primitive) {
      var id = getTrackByKey(index, key, value, trackByKey);
      frag = this.cache[id];
    } else {
      frag = value[this.id];
    }
    if (frag && (frag.reused || frag.fresh)) {
      process.env.NODE_ENV !== 'production' && this.warnDuplicate(value);
    }
    return frag;
  },

  /**
   * Delete a fragment from cache.
   *
   * @param {Fragment} frag
   */

  deleteCachedFrag: function deleteCachedFrag(frag) {
    var value = frag.raw;
    var trackByKey = this.params.trackBy;
    var scope = frag.scope;
    var index = scope.$index;
    // fix #948: avoid accidentally fall through to
    // a parent repeater which happens to have $key.
    var key = hasOwn(scope, '$key') && scope.$key;
    var primitive = !isObject(value);
    if (trackByKey || key || primitive) {
      var id = getTrackByKey(index, key, value, trackByKey);
      this.cache[id] = null;
    } else {
      value[this.id] = null;
      frag.raw = null;
    }
  },

  /**
   * Get the stagger amount for an insertion/removal.
   *
   * @param {Fragment} frag
   * @param {Number} index
   * @param {Number} total
   * @param {String} type
   */

  getStagger: function getStagger(frag, index, total, type) {
    type = type + 'Stagger';
    var trans = frag.node.__v_trans;
    var hooks = trans && trans.hooks;
    var hook = hooks && (hooks[type] || hooks.stagger);
    return hook ? hook.call(frag, index, total) : index * parseInt(this.params[type] || this.params.stagger, 10);
  },

  /**
   * Pre-process the value before piping it through the
   * filters. This is passed to and called by the watcher.
   */

  _preProcess: function _preProcess(value) {
    // regardless of type, store the un-filtered raw value.
    this.rawValue = value;
    return value;
  },

  /**
   * Post-process the value after it has been piped through
   * the filters. This is passed to and called by the watcher.
   *
   * It is necessary for this to be called during the
   * watcher's dependency collection phase because we want
   * the v-for to update when the source Object is mutated.
   */

  _postProcess: function _postProcess(value) {
    if (isArray(value)) {
      return value;
    } else if (isPlainObject(value)) {
      // convert plain object to array.
      var keys = Object.keys(value);
      var i = keys.length;
      var res = new Array(i);
      var key;
      while (i--) {
        key = keys[i];
        res[i] = {
          $key: key,
          $value: value[key]
        };
      }
      return res;
    } else {
      if (typeof value === 'number' && !isNaN(value)) {
        value = range(value);
      }
      return value || [];
    }
  },

  unbind: function unbind() {
    if (this.descriptor.ref) {
      (this._scope || this.vm).$refs[this.descriptor.ref] = null;
    }
    if (this.frags) {
      var i = this.frags.length;
      var frag;
      while (i--) {
        frag = this.frags[i];
        this.deleteCachedFrag(frag);
        frag.destroy();
      }
    }
  }
};

/**
 * Helper to find the previous element that is a fragment
 * anchor. This is necessary because a destroyed frag's
 * element could still be lingering in the DOM before its
 * leaving transition finishes, but its inserted flag
 * should have been set to false so we can skip them.
 *
 * If this is a block repeat, we want to make sure we only
 * return frag that is bound to this v-for. (see #929)
 *
 * @param {Fragment} frag
 * @param {Comment|Text} anchor
 * @param {String} id
 * @return {Fragment}
 */

function findPrevFrag(frag, anchor, id) {
  var el = frag.node.previousSibling;
  /* istanbul ignore if */
  if (!el) return;
  frag = el.__v_frag;
  while ((!frag || frag.forId !== id || !frag.inserted) && el !== anchor) {
    el = el.previousSibling;
    /* istanbul ignore if */
    if (!el) return;
    frag = el.__v_frag;
  }
  return frag;
}

/**
 * Create a range array from given number.
 *
 * @param {Number} n
 * @return {Array}
 */

function range(n) {
  var i = -1;
  var ret = new Array(Math.floor(n));
  while (++i < n) {
    ret[i] = i;
  }
  return ret;
}

/**
 * Get the track by key for an item.
 *
 * @param {Number} index
 * @param {String} key
 * @param {*} value
 * @param {String} [trackByKey]
 */

function getTrackByKey(index, key, value, trackByKey) {
  return trackByKey ? trackByKey === '$index' ? index : trackByKey.charAt(0).match(/\w/) ? getPath(value, trackByKey) : value[trackByKey] : key || value;
}

if (process.env.NODE_ENV !== 'production') {
  vFor.warnDuplicate = function (value) {
    warn('Duplicate value found in v-for="' + this.descriptor.raw + '": ' + JSON.stringify(value) + '. Use track-by="$index" if ' + 'you are expecting duplicate values.', this.vm);
  };
}

/**
 * Find a vm from a fragment.
 *
 * @param {Fragment} frag
 * @return {Vue|undefined}
 */

function findVmFromFrag(frag) {
  var node = frag.node;
  // handle multi-node frag
  if (frag.end) {
    while (!node.__vue__ && node !== frag.end && node.nextSibling) {
      node = node.nextSibling;
    }
  }
  return node.__vue__;
}

var vIf = {

  priority: IF,
  terminal: true,

  bind: function bind() {
    var el = this.el;
    if (!el.__vue__) {
      // check else block
      var next = el.nextElementSibling;
      if (next && getAttr(next, 'v-else') !== null) {
        remove(next);
        this.elseEl = next;
      }
      // check main block
      this.anchor = createAnchor('v-if');
      replace(el, this.anchor);
    } else {
      process.env.NODE_ENV !== 'production' && warn('v-if="' + this.expression + '" cannot be ' + 'used on an instance root element.', this.vm);
      this.invalid = true;
    }
  },

  update: function update(value) {
    if (this.invalid) return;
    if (value) {
      if (!this.frag) {
        this.insert();
      }
    } else {
      this.remove();
    }
  },

  insert: function insert() {
    if (this.elseFrag) {
      this.elseFrag.remove();
      this.elseFrag = null;
    }
    // lazy init factory
    if (!this.factory) {
      this.factory = new FragmentFactory(this.vm, this.el);
    }
    this.frag = this.factory.create(this._host, this._scope, this._frag);
    this.frag.before(this.anchor);
  },

  remove: function remove() {
    if (this.frag) {
      this.frag.remove();
      this.frag = null;
    }
    if (this.elseEl && !this.elseFrag) {
      if (!this.elseFactory) {
        this.elseFactory = new FragmentFactory(this.elseEl._context || this.vm, this.elseEl);
      }
      this.elseFrag = this.elseFactory.create(this._host, this._scope, this._frag);
      this.elseFrag.before(this.anchor);
    }
  },

  unbind: function unbind() {
    if (this.frag) {
      this.frag.destroy();
    }
    if (this.elseFrag) {
      this.elseFrag.destroy();
    }
  }
};

var show = {

  bind: function bind() {
    // check else block
    var next = this.el.nextElementSibling;
    if (next && getAttr(next, 'v-else') !== null) {
      this.elseEl = next;
    }
  },

  update: function update(value) {
    this.apply(this.el, value);
    if (this.elseEl) {
      this.apply(this.elseEl, !value);
    }
  },

  apply: function apply(el, value) {
    if (inDoc(el)) {
      applyTransition(el, value ? 1 : -1, toggle, this.vm);
    } else {
      toggle();
    }
    function toggle() {
      el.style.display = value ? '' : 'none';
    }
  }
};

var text$2 = {

  bind: function bind() {
    var self = this;
    var el = this.el;
    var isRange = el.type === 'range';
    var lazy = this.params.lazy;
    var number = this.params.number;
    var debounce = this.params.debounce;

    // handle composition events.
    //   http://blog.evanyou.me/2014/01/03/composition-event/
    // skip this for Android because it handles composition
    // events quite differently. Android doesn't trigger
    // composition events for language input methods e.g.
    // Chinese, but instead triggers them for spelling
    // suggestions... (see Discussion/#162)
    var composing = false;
    if (!isAndroid && !isRange) {
      this.on('compositionstart', function () {
        composing = true;
      });
      this.on('compositionend', function () {
        composing = false;
        // in IE11 the "compositionend" event fires AFTER
        // the "input" event, so the input handler is blocked
        // at the end... have to call it here.
        //
        // #1327: in lazy mode this is unecessary.
        if (!lazy) {
          self.listener();
        }
      });
    }

    // prevent messing with the input when user is typing,
    // and force update on blur.
    this.focused = false;
    if (!isRange && !lazy) {
      this.on('focus', function () {
        self.focused = true;
      });
      this.on('blur', function () {
        self.focused = false;
        // do not sync value after fragment removal (#2017)
        if (!self._frag || self._frag.inserted) {
          self.rawListener();
        }
      });
    }

    // Now attach the main listener
    this.listener = this.rawListener = function () {
      if (composing || !self._bound) {
        return;
      }
      var val = number || isRange ? toNumber(el.value) : el.value;
      self.set(val);
      // force update on next tick to avoid lock & same value
      // also only update when user is not typing
      nextTick(function () {
        if (self._bound && !self.focused) {
          self.update(self._watcher.value);
        }
      });
    };

    // apply debounce
    if (debounce) {
      this.listener = _debounce(this.listener, debounce);
    }

    // Support jQuery events, since jQuery.trigger() doesn't
    // trigger native events in some cases and some plugins
    // rely on $.trigger()
    //
    // We want to make sure if a listener is attached using
    // jQuery, it is also removed with jQuery, that's why
    // we do the check for each directive instance and
    // store that check result on itself. This also allows
    // easier test coverage control by unsetting the global
    // jQuery variable in tests.
    this.hasjQuery = typeof jQuery === 'function';
    if (this.hasjQuery) {
      var method = jQuery.fn.on ? 'on' : 'bind';
      jQuery(el)[method]('change', this.rawListener);
      if (!lazy) {
        jQuery(el)[method]('input', this.listener);
      }
    } else {
      this.on('change', this.rawListener);
      if (!lazy) {
        this.on('input', this.listener);
      }
    }

    // IE9 doesn't fire input event on backspace/del/cut
    if (!lazy && isIE9) {
      this.on('cut', function () {
        nextTick(self.listener);
      });
      this.on('keyup', function (e) {
        if (e.keyCode === 46 || e.keyCode === 8) {
          self.listener();
        }
      });
    }

    // set initial value if present
    if (el.hasAttribute('value') || el.tagName === 'TEXTAREA' && el.value.trim()) {
      this.afterBind = this.listener;
    }
  },

  update: function update(value) {
    // #3029 only update when the value changes. This prevent
    // browsers from overwriting values like selectionStart
    value = _toString(value);
    if (value !== this.el.value) this.el.value = value;
  },

  unbind: function unbind() {
    var el = this.el;
    if (this.hasjQuery) {
      var method = jQuery.fn.off ? 'off' : 'unbind';
      jQuery(el)[method]('change', this.listener);
      jQuery(el)[method]('input', this.listener);
    }
  }
};

var radio = {

  bind: function bind() {
    var self = this;
    var el = this.el;

    this.getValue = function () {
      // value overwrite via v-bind:value
      if (el.hasOwnProperty('_value')) {
        return el._value;
      }
      var val = el.value;
      if (self.params.number) {
        val = toNumber(val);
      }
      return val;
    };

    this.listener = function () {
      self.set(self.getValue());
    };
    this.on('change', this.listener);

    if (el.hasAttribute('checked')) {
      this.afterBind = this.listener;
    }
  },

  update: function update(value) {
    this.el.checked = looseEqual(value, this.getValue());
  }
};

var select = {

  bind: function bind() {
    var _this = this;

    var self = this;
    var el = this.el;

    // method to force update DOM using latest value.
    this.forceUpdate = function () {
      if (self._watcher) {
        self.update(self._watcher.get());
      }
    };

    // check if this is a multiple select
    var multiple = this.multiple = el.hasAttribute('multiple');

    // attach listener
    this.listener = function () {
      var value = getValue(el, multiple);
      value = self.params.number ? isArray(value) ? value.map(toNumber) : toNumber(value) : value;
      self.set(value);
    };
    this.on('change', this.listener);

    // if has initial value, set afterBind
    var initValue = getValue(el, multiple, true);
    if (multiple && initValue.length || !multiple && initValue !== null) {
      this.afterBind = this.listener;
    }

    // All major browsers except Firefox resets
    // selectedIndex with value -1 to 0 when the element
    // is appended to a new parent, therefore we have to
    // force a DOM update whenever that happens...
    this.vm.$on('hook:attached', function () {
      nextTick(_this.forceUpdate);
    });
    if (!inDoc(el)) {
      nextTick(this.forceUpdate);
    }
  },

  update: function update(value) {
    var el = this.el;
    el.selectedIndex = -1;
    var multi = this.multiple && isArray(value);
    var options = el.options;
    var i = options.length;
    var op, val;
    while (i--) {
      op = options[i];
      val = op.hasOwnProperty('_value') ? op._value : op.value;
      /* eslint-disable eqeqeq */
      op.selected = multi ? indexOf$1(value, val) > -1 : looseEqual(value, val);
      /* eslint-enable eqeqeq */
    }
  },

  unbind: function unbind() {
    /* istanbul ignore next */
    this.vm.$off('hook:attached', this.forceUpdate);
  }
};

/**
 * Get select value
 *
 * @param {SelectElement} el
 * @param {Boolean} multi
 * @param {Boolean} init
 * @return {Array|*}
 */

function getValue(el, multi, init) {
  var res = multi ? [] : null;
  var op, val, selected;
  for (var i = 0, l = el.options.length; i < l; i++) {
    op = el.options[i];
    selected = init ? op.hasAttribute('selected') : op.selected;
    if (selected) {
      val = op.hasOwnProperty('_value') ? op._value : op.value;
      if (multi) {
        res.push(val);
      } else {
        return val;
      }
    }
  }
  return res;
}

/**
 * Native Array.indexOf uses strict equal, but in this
 * case we need to match string/numbers with custom equal.
 *
 * @param {Array} arr
 * @param {*} val
 */

function indexOf$1(arr, val) {
  var i = arr.length;
  while (i--) {
    if (looseEqual(arr[i], val)) {
      return i;
    }
  }
  return -1;
}

var checkbox = {

  bind: function bind() {
    var self = this;
    var el = this.el;

    this.getValue = function () {
      return el.hasOwnProperty('_value') ? el._value : self.params.number ? toNumber(el.value) : el.value;
    };

    function getBooleanValue() {
      var val = el.checked;
      if (val && el.hasOwnProperty('_trueValue')) {
        return el._trueValue;
      }
      if (!val && el.hasOwnProperty('_falseValue')) {
        return el._falseValue;
      }
      return val;
    }

    this.listener = function () {
      var model = self._watcher.get();
      if (isArray(model)) {
        var val = self.getValue();
        var i = indexOf(model, val);
        if (el.checked) {
          if (i < 0) {
            self.set(model.concat(val));
          }
        } else if (i > -1) {
          self.set(model.slice(0, i).concat(model.slice(i + 1)));
        }
      } else {
        self.set(getBooleanValue());
      }
    };

    this.on('change', this.listener);
    if (el.hasAttribute('checked')) {
      this.afterBind = this.listener;
    }
  },

  update: function update(value) {
    var el = this.el;
    if (isArray(value)) {
      el.checked = indexOf(value, this.getValue()) > -1;
    } else {
      if (el.hasOwnProperty('_trueValue')) {
        el.checked = looseEqual(value, el._trueValue);
      } else {
        el.checked = !!value;
      }
    }
  }
};

var handlers = {
  text: text$2,
  radio: radio,
  select: select,
  checkbox: checkbox
};

var model = {

  priority: MODEL,
  twoWay: true,
  handlers: handlers,
  params: ['lazy', 'number', 'debounce'],

  /**
   * Possible elements:
   *   <select>
   *   <textarea>
   *   <input type="*">
   *     - text
   *     - checkbox
   *     - radio
   *     - number
   */

  bind: function bind() {
    // friendly warning...
    this.checkFilters();
    if (this.hasRead && !this.hasWrite) {
      process.env.NODE_ENV !== 'production' && warn('It seems you are using a read-only filter with ' + 'v-model="' + this.descriptor.raw + '". ' + 'You might want to use a two-way filter to ensure correct behavior.', this.vm);
    }
    var el = this.el;
    var tag = el.tagName;
    var handler;
    if (tag === 'INPUT') {
      handler = handlers[el.type] || handlers.text;
    } else if (tag === 'SELECT') {
      handler = handlers.select;
    } else if (tag === 'TEXTAREA') {
      handler = handlers.text;
    } else {
      process.env.NODE_ENV !== 'production' && warn('v-model does not support element type: ' + tag, this.vm);
      return;
    }
    el.__v_model = this;
    handler.bind.call(this);
    this.update = handler.update;
    this._unbind = handler.unbind;
  },

  /**
   * Check read/write filter stats.
   */

  checkFilters: function checkFilters() {
    var filters = this.filters;
    if (!filters) return;
    var i = filters.length;
    while (i--) {
      var filter = resolveAsset(this.vm.$options, 'filters', filters[i].name);
      if (typeof filter === 'function' || filter.read) {
        this.hasRead = true;
      }
      if (filter.write) {
        this.hasWrite = true;
      }
    }
  },

  unbind: function unbind() {
    this.el.__v_model = null;
    this._unbind && this._unbind();
  }
};

// keyCode aliases
var keyCodes = {
  esc: 27,
  tab: 9,
  enter: 13,
  space: 32,
  'delete': [8, 46],
  up: 38,
  left: 37,
  right: 39,
  down: 40
};

function keyFilter(handler, keys) {
  var codes = keys.map(function (key) {
    var charCode = key.charCodeAt(0);
    if (charCode > 47 && charCode < 58) {
      return parseInt(key, 10);
    }
    if (key.length === 1) {
      charCode = key.toUpperCase().charCodeAt(0);
      if (charCode > 64 && charCode < 91) {
        return charCode;
      }
    }
    return keyCodes[key];
  });
  codes = [].concat.apply([], codes);
  return function keyHandler(e) {
    if (codes.indexOf(e.keyCode) > -1) {
      return handler.call(this, e);
    }
  };
}

function stopFilter(handler) {
  return function stopHandler(e) {
    e.stopPropagation();
    return handler.call(this, e);
  };
}

function preventFilter(handler) {
  return function preventHandler(e) {
    e.preventDefault();
    return handler.call(this, e);
  };
}

function selfFilter(handler) {
  return function selfHandler(e) {
    if (e.target === e.currentTarget) {
      return handler.call(this, e);
    }
  };
}

var on$1 = {

  priority: ON,
  acceptStatement: true,
  keyCodes: keyCodes,

  bind: function bind() {
    // deal with iframes
    if (this.el.tagName === 'IFRAME' && this.arg !== 'load') {
      var self = this;
      this.iframeBind = function () {
        on(self.el.contentWindow, self.arg, self.handler, self.modifiers.capture);
      };
      this.on('load', this.iframeBind);
    }
  },

  update: function update(handler) {
    // stub a noop for v-on with no value,
    // e.g. @mousedown.prevent
    if (!this.descriptor.raw) {
      handler = function () {};
    }

    if (typeof handler !== 'function') {
      process.env.NODE_ENV !== 'production' && warn('v-on:' + this.arg + '="' + this.expression + '" expects a function value, ' + 'got ' + handler, this.vm);
      return;
    }

    // apply modifiers
    if (this.modifiers.stop) {
      handler = stopFilter(handler);
    }
    if (this.modifiers.prevent) {
      handler = preventFilter(handler);
    }
    if (this.modifiers.self) {
      handler = selfFilter(handler);
    }
    // key filter
    var keys = Object.keys(this.modifiers).filter(function (key) {
      return key !== 'stop' && key !== 'prevent' && key !== 'self' && key !== 'capture';
    });
    if (keys.length) {
      handler = keyFilter(handler, keys);
    }

    this.reset();
    this.handler = handler;

    if (this.iframeBind) {
      this.iframeBind();
    } else {
      on(this.el, this.arg, this.handler, this.modifiers.capture);
    }
  },

  reset: function reset() {
    var el = this.iframeBind ? this.el.contentWindow : this.el;
    if (this.handler) {
      off(el, this.arg, this.handler);
    }
  },

  unbind: function unbind() {
    this.reset();
  }
};

var prefixes = ['-webkit-', '-moz-', '-ms-'];
var camelPrefixes = ['Webkit', 'Moz', 'ms'];
var importantRE = /!important;?$/;
var propCache = Object.create(null);

var testEl = null;

var style = {

  deep: true,

  update: function update(value) {
    if (typeof value === 'string') {
      this.el.style.cssText = value;
    } else if (isArray(value)) {
      this.handleObject(value.reduce(extend, {}));
    } else {
      this.handleObject(value || {});
    }
  },

  handleObject: function handleObject(value) {
    // cache object styles so that only changed props
    // are actually updated.
    var cache = this.cache || (this.cache = {});
    var name, val;
    for (name in cache) {
      if (!(name in value)) {
        this.handleSingle(name, null);
        delete cache[name];
      }
    }
    for (name in value) {
      val = value[name];
      if (val !== cache[name]) {
        cache[name] = val;
        this.handleSingle(name, val);
      }
    }
  },

  handleSingle: function handleSingle(prop, value) {
    prop = normalize(prop);
    if (!prop) return; // unsupported prop
    // cast possible numbers/booleans into strings
    if (value != null) value += '';
    if (value) {
      var isImportant = importantRE.test(value) ? 'important' : '';
      if (isImportant) {
        /* istanbul ignore if */
        if (process.env.NODE_ENV !== 'production') {
          warn('It\'s probably a bad idea to use !important with inline rules. ' + 'This feature will be deprecated in a future version of Vue.');
        }
        value = value.replace(importantRE, '').trim();
        this.el.style.setProperty(prop.kebab, value, isImportant);
      } else {
        this.el.style[prop.camel] = value;
      }
    } else {
      this.el.style[prop.camel] = '';
    }
  }

};

/**
 * Normalize a CSS property name.
 * - cache result
 * - auto prefix
 * - camelCase -> dash-case
 *
 * @param {String} prop
 * @return {String}
 */

function normalize(prop) {
  if (propCache[prop]) {
    return propCache[prop];
  }
  var res = prefix(prop);
  propCache[prop] = propCache[res] = res;
  return res;
}

/**
 * Auto detect the appropriate prefix for a CSS property.
 * https://gist.github.com/paulirish/523692
 *
 * @param {String} prop
 * @return {String}
 */

function prefix(prop) {
  prop = hyphenate(prop);
  var camel = camelize(prop);
  var upper = camel.charAt(0).toUpperCase() + camel.slice(1);
  if (!testEl) {
    testEl = document.createElement('div');
  }
  var i = prefixes.length;
  var prefixed;
  if (camel !== 'filter' && camel in testEl.style) {
    return {
      kebab: prop,
      camel: camel
    };
  }
  while (i--) {
    prefixed = camelPrefixes[i] + upper;
    if (prefixed in testEl.style) {
      return {
        kebab: prefixes[i] + prop,
        camel: prefixed
      };
    }
  }
}

// xlink
var xlinkNS = 'http://www.w3.org/1999/xlink';
var xlinkRE = /^xlink:/;

// check for attributes that prohibit interpolations
var disallowedInterpAttrRE = /^v-|^:|^@|^(?:is|transition|transition-mode|debounce|track-by|stagger|enter-stagger|leave-stagger)$/;
// these attributes should also set their corresponding properties
// because they only affect the initial state of the element
var attrWithPropsRE = /^(?:value|checked|selected|muted)$/;
// these attributes expect enumrated values of "true" or "false"
// but are not boolean attributes
var enumeratedAttrRE = /^(?:draggable|contenteditable|spellcheck)$/;

// these attributes should set a hidden property for
// binding v-model to object values
var modelProps = {
  value: '_value',
  'true-value': '_trueValue',
  'false-value': '_falseValue'
};

var bind$1 = {

  priority: BIND,

  bind: function bind() {
    var attr = this.arg;
    var tag = this.el.tagName;
    // should be deep watch on object mode
    if (!attr) {
      this.deep = true;
    }
    // handle interpolation bindings
    var descriptor = this.descriptor;
    var tokens = descriptor.interp;
    if (tokens) {
      // handle interpolations with one-time tokens
      if (descriptor.hasOneTime) {
        this.expression = tokensToExp(tokens, this._scope || this.vm);
      }

      // only allow binding on native attributes
      if (disallowedInterpAttrRE.test(attr) || attr === 'name' && (tag === 'PARTIAL' || tag === 'SLOT')) {
        process.env.NODE_ENV !== 'production' && warn(attr + '="' + descriptor.raw + '": ' + 'attribute interpolation is not allowed in Vue.js ' + 'directives and special attributes.', this.vm);
        this.el.removeAttribute(attr);
        this.invalid = true;
      }

      /* istanbul ignore if */
      if (process.env.NODE_ENV !== 'production') {
        var raw = attr + '="' + descriptor.raw + '": ';
        // warn src
        if (attr === 'src') {
          warn(raw + 'interpolation in "src" attribute will cause ' + 'a 404 request. Use v-bind:src instead.', this.vm);
        }

        // warn style
        if (attr === 'style') {
          warn(raw + 'interpolation in "style" attribute will cause ' + 'the attribute to be discarded in Internet Explorer. ' + 'Use v-bind:style instead.', this.vm);
        }
      }
    }
  },

  update: function update(value) {
    if (this.invalid) {
      return;
    }
    var attr = this.arg;
    if (this.arg) {
      this.handleSingle(attr, value);
    } else {
      this.handleObject(value || {});
    }
  },

  // share object handler with v-bind:class
  handleObject: style.handleObject,

  handleSingle: function handleSingle(attr, value) {
    var el = this.el;
    var interp = this.descriptor.interp;
    if (this.modifiers.camel) {
      attr = camelize(attr);
    }
    if (!interp && attrWithPropsRE.test(attr) && attr in el) {
      var attrValue = attr === 'value' ? value == null // IE9 will set input.value to "null" for null...
      ? '' : value : value;

      if (el[attr] !== attrValue) {
        el[attr] = attrValue;
      }
    }
    // set model props
    var modelProp = modelProps[attr];
    if (!interp && modelProp) {
      el[modelProp] = value;
      // update v-model if present
      var model = el.__v_model;
      if (model) {
        model.listener();
      }
    }
    // do not set value attribute for textarea
    if (attr === 'value' && el.tagName === 'TEXTAREA') {
      el.removeAttribute(attr);
      return;
    }
    // update attribute
    if (enumeratedAttrRE.test(attr)) {
      el.setAttribute(attr, value ? 'true' : 'false');
    } else if (value != null && value !== false) {
      if (attr === 'class') {
        // handle edge case #1960:
        // class interpolation should not overwrite Vue transition class
        if (el.__v_trans) {
          value += ' ' + el.__v_trans.id + '-transition';
        }
        setClass(el, value);
      } else if (xlinkRE.test(attr)) {
        el.setAttributeNS(xlinkNS, attr, value === true ? '' : value);
      } else {
        el.setAttribute(attr, value === true ? '' : value);
      }
    } else {
      el.removeAttribute(attr);
    }
  }
};

var el = {

  priority: EL,

  bind: function bind() {
    /* istanbul ignore if */
    if (!this.arg) {
      return;
    }
    var id = this.id = camelize(this.arg);
    var refs = (this._scope || this.vm).$els;
    if (hasOwn(refs, id)) {
      refs[id] = this.el;
    } else {
      defineReactive(refs, id, this.el);
    }
  },

  unbind: function unbind() {
    var refs = (this._scope || this.vm).$els;
    if (refs[this.id] === this.el) {
      refs[this.id] = null;
    }
  }
};

var ref = {
  bind: function bind() {
    process.env.NODE_ENV !== 'production' && warn('v-ref:' + this.arg + ' must be used on a child ' + 'component. Found on <' + this.el.tagName.toLowerCase() + '>.', this.vm);
  }
};

var cloak = {
  bind: function bind() {
    var el = this.el;
    this.vm.$once('pre-hook:compiled', function () {
      el.removeAttribute('v-cloak');
    });
  }
};

// logic control
// two-way binding
// event handling
// attributes
// ref & el
// cloak
// must export plain object
var directives = {
  text: text$1,
  html: html,
  'for': vFor,
  'if': vIf,
  show: show,
  model: model,
  on: on$1,
  bind: bind$1,
  el: el,
  ref: ref,
  cloak: cloak
};

var vClass = {

  deep: true,

  update: function update(value) {
    if (!value) {
      this.cleanup();
    } else if (typeof value === 'string') {
      this.setClass(value.trim().split(/\s+/));
    } else {
      this.setClass(normalize$1(value));
    }
  },

  setClass: function setClass(value) {
    this.cleanup(value);
    for (var i = 0, l = value.length; i < l; i++) {
      var val = value[i];
      if (val) {
        apply(this.el, val, addClass);
      }
    }
    this.prevKeys = value;
  },

  cleanup: function cleanup(value) {
    var prevKeys = this.prevKeys;
    if (!prevKeys) return;
    var i = prevKeys.length;
    while (i--) {
      var key = prevKeys[i];
      if (!value || value.indexOf(key) < 0) {
        apply(this.el, key, removeClass);
      }
    }
  }
};

/**
 * Normalize objects and arrays (potentially containing objects)
 * into array of strings.
 *
 * @param {Object|Array<String|Object>} value
 * @return {Array<String>}
 */

function normalize$1(value) {
  var res = [];
  if (isArray(value)) {
    for (var i = 0, l = value.length; i < l; i++) {
      var _key = value[i];
      if (_key) {
        if (typeof _key === 'string') {
          res.push(_key);
        } else {
          for (var k in _key) {
            if (_key[k]) res.push(k);
          }
        }
      }
    }
  } else if (isObject(value)) {
    for (var key in value) {
      if (value[key]) res.push(key);
    }
  }
  return res;
}

/**
 * Add or remove a class/classes on an element
 *
 * @param {Element} el
 * @param {String} key The class name. This may or may not
 *                     contain a space character, in such a
 *                     case we'll deal with multiple class
 *                     names at once.
 * @param {Function} fn
 */

function apply(el, key, fn) {
  key = key.trim();
  if (key.indexOf(' ') === -1) {
    fn(el, key);
    return;
  }
  // The key contains one or more space characters.
  // Since a class name doesn't accept such characters, we
  // treat it as multiple classes.
  var keys = key.split(/\s+/);
  for (var i = 0, l = keys.length; i < l; i++) {
    fn(el, keys[i]);
  }
}

var component = {

  priority: COMPONENT,

  params: ['keep-alive', 'transition-mode', 'inline-template'],

  /**
   * Setup. Two possible usages:
   *
   * - static:
   *   <comp> or <div v-component="comp">
   *
   * - dynamic:
   *   <component :is="view">
   */

  bind: function bind() {
    if (!this.el.__vue__) {
      // keep-alive cache
      this.keepAlive = this.params.keepAlive;
      if (this.keepAlive) {
        this.cache = {};
      }
      // check inline-template
      if (this.params.inlineTemplate) {
        // extract inline template as a DocumentFragment
        this.inlineTemplate = extractContent(this.el, true);
      }
      // component resolution related state
      this.pendingComponentCb = this.Component = null;
      // transition related state
      this.pendingRemovals = 0;
      this.pendingRemovalCb = null;
      // create a ref anchor
      this.anchor = createAnchor('v-component');
      replace(this.el, this.anchor);
      // remove is attribute.
      // this is removed during compilation, but because compilation is
      // cached, when the component is used elsewhere this attribute
      // will remain at link time.
      this.el.removeAttribute('is');
      this.el.removeAttribute(':is');
      // remove ref, same as above
      if (this.descriptor.ref) {
        this.el.removeAttribute('v-ref:' + hyphenate(this.descriptor.ref));
      }
      // if static, build right now.
      if (this.literal) {
        this.setComponent(this.expression);
      }
    } else {
      process.env.NODE_ENV !== 'production' && warn('cannot mount component "' + this.expression + '" ' + 'on already mounted element: ' + this.el);
    }
  },

  /**
   * Public update, called by the watcher in the dynamic
   * literal scenario, e.g. <component :is="view">
   */

  update: function update(value) {
    if (!this.literal) {
      this.setComponent(value);
    }
  },

  /**
   * Switch dynamic components. May resolve the component
   * asynchronously, and perform transition based on
   * specified transition mode. Accepts a few additional
   * arguments specifically for vue-router.
   *
   * The callback is called when the full transition is
   * finished.
   *
   * @param {String} value
   * @param {Function} [cb]
   */

  setComponent: function setComponent(value, cb) {
    this.invalidatePending();
    if (!value) {
      // just remove current
      this.unbuild(true);
      this.remove(this.childVM, cb);
      this.childVM = null;
    } else {
      var self = this;
      this.resolveComponent(value, function () {
        self.mountComponent(cb);
      });
    }
  },

  /**
   * Resolve the component constructor to use when creating
   * the child vm.
   *
   * @param {String|Function} value
   * @param {Function} cb
   */

  resolveComponent: function resolveComponent(value, cb) {
    var self = this;
    this.pendingComponentCb = cancellable(function (Component) {
      self.ComponentName = Component.options.name || (typeof value === 'string' ? value : null);
      self.Component = Component;
      cb();
    });
    this.vm._resolveComponent(value, this.pendingComponentCb);
  },

  /**
   * Create a new instance using the current constructor and
   * replace the existing instance. This method doesn't care
   * whether the new component and the old one are actually
   * the same.
   *
   * @param {Function} [cb]
   */

  mountComponent: function mountComponent(cb) {
    // actual mount
    this.unbuild(true);
    var self = this;
    var activateHooks = this.Component.options.activate;
    var cached = this.getCached();
    var newComponent = this.build();
    if (activateHooks && !cached) {
      this.waitingFor = newComponent;
      callActivateHooks(activateHooks, newComponent, function () {
        if (self.waitingFor !== newComponent) {
          return;
        }
        self.waitingFor = null;
        self.transition(newComponent, cb);
      });
    } else {
      // update ref for kept-alive component
      if (cached) {
        newComponent._updateRef();
      }
      this.transition(newComponent, cb);
    }
  },

  /**
   * When the component changes or unbinds before an async
   * constructor is resolved, we need to invalidate its
   * pending callback.
   */

  invalidatePending: function invalidatePending() {
    if (this.pendingComponentCb) {
      this.pendingComponentCb.cancel();
      this.pendingComponentCb = null;
    }
  },

  /**
   * Instantiate/insert a new child vm.
   * If keep alive and has cached instance, insert that
   * instance; otherwise build a new one and cache it.
   *
   * @param {Object} [extraOptions]
   * @return {Vue} - the created instance
   */

  build: function build(extraOptions) {
    var cached = this.getCached();
    if (cached) {
      return cached;
    }
    if (this.Component) {
      // default options
      var options = {
        name: this.ComponentName,
        el: cloneNode(this.el),
        template: this.inlineTemplate,
        // make sure to add the child with correct parent
        // if this is a transcluded component, its parent
        // should be the transclusion host.
        parent: this._host || this.vm,
        // if no inline-template, then the compiled
        // linker can be cached for better performance.
        _linkerCachable: !this.inlineTemplate,
        _ref: this.descriptor.ref,
        _asComponent: true,
        _isRouterView: this._isRouterView,
        // if this is a transcluded component, context
        // will be the common parent vm of this instance
        // and its host.
        _context: this.vm,
        // if this is inside an inline v-for, the scope
        // will be the intermediate scope created for this
        // repeat fragment. this is used for linking props
        // and container directives.
        _scope: this._scope,
        // pass in the owner fragment of this component.
        // this is necessary so that the fragment can keep
        // track of its contained components in order to
        // call attach/detach hooks for them.
        _frag: this._frag
      };
      // extra options
      // in 1.0.0 this is used by vue-router only
      /* istanbul ignore if */
      if (extraOptions) {
        extend(options, extraOptions);
      }
      var child = new this.Component(options);
      if (this.keepAlive) {
        this.cache[this.Component.cid] = child;
      }
      /* istanbul ignore if */
      if (process.env.NODE_ENV !== 'production' && this.el.hasAttribute('transition') && child._isFragment) {
        warn('Transitions will not work on a fragment instance. ' + 'Template: ' + child.$options.template, child);
      }
      return child;
    }
  },

  /**
   * Try to get a cached instance of the current component.
   *
   * @return {Vue|undefined}
   */

  getCached: function getCached() {
    return this.keepAlive && this.cache[this.Component.cid];
  },

  /**
   * Teardown the current child, but defers cleanup so
   * that we can separate the destroy and removal steps.
   *
   * @param {Boolean} defer
   */

  unbuild: function unbuild(defer) {
    if (this.waitingFor) {
      if (!this.keepAlive) {
        this.waitingFor.$destroy();
      }
      this.waitingFor = null;
    }
    var child = this.childVM;
    if (!child || this.keepAlive) {
      if (child) {
        // remove ref
        child._inactive = true;
        child._updateRef(true);
      }
      return;
    }
    // the sole purpose of `deferCleanup` is so that we can
    // "deactivate" the vm right now and perform DOM removal
    // later.
    child.$destroy(false, defer);
  },

  /**
   * Remove current destroyed child and manually do
   * the cleanup after removal.
   *
   * @param {Function} cb
   */

  remove: function remove(child, cb) {
    var keepAlive = this.keepAlive;
    if (child) {
      // we may have a component switch when a previous
      // component is still being transitioned out.
      // we want to trigger only one lastest insertion cb
      // when the existing transition finishes. (#1119)
      this.pendingRemovals++;
      this.pendingRemovalCb = cb;
      var self = this;
      child.$remove(function () {
        self.pendingRemovals--;
        if (!keepAlive) child._cleanup();
        if (!self.pendingRemovals && self.pendingRemovalCb) {
          self.pendingRemovalCb();
          self.pendingRemovalCb = null;
        }
      });
    } else if (cb) {
      cb();
    }
  },

  /**
   * Actually swap the components, depending on the
   * transition mode. Defaults to simultaneous.
   *
   * @param {Vue} target
   * @param {Function} [cb]
   */

  transition: function transition(target, cb) {
    var self = this;
    var current = this.childVM;
    // for devtool inspection
    if (current) current._inactive = true;
    target._inactive = false;
    this.childVM = target;
    switch (self.params.transitionMode) {
      case 'in-out':
        target.$before(self.anchor, function () {
          self.remove(current, cb);
        });
        break;
      case 'out-in':
        self.remove(current, function () {
          target.$before(self.anchor, cb);
        });
        break;
      default:
        self.remove(current);
        target.$before(self.anchor, cb);
    }
  },

  /**
   * Unbind.
   */

  unbind: function unbind() {
    this.invalidatePending();
    // Do not defer cleanup when unbinding
    this.unbuild();
    // destroy all keep-alive cached instances
    if (this.cache) {
      for (var key in this.cache) {
        this.cache[key].$destroy();
      }
      this.cache = null;
    }
  }
};

/**
 * Call activate hooks in order (asynchronous)
 *
 * @param {Array} hooks
 * @param {Vue} vm
 * @param {Function} cb
 */

function callActivateHooks(hooks, vm, cb) {
  var total = hooks.length;
  var called = 0;
  hooks[0].call(vm, next);
  function next() {
    if (++called >= total) {
      cb();
    } else {
      hooks[called].call(vm, next);
    }
  }
}

var propBindingModes = config._propBindingModes;
var empty = {};

// regexes
var identRE$1 = /^[$_a-zA-Z]+[\w$]*$/;
var settablePathRE = /^[A-Za-z_$][\w$]*(\.[A-Za-z_$][\w$]*|\[[^\[\]]+\])*$/;

/**
 * Compile props on a root element and return
 * a props link function.
 *
 * @param {Element|DocumentFragment} el
 * @param {Array} propOptions
 * @param {Vue} vm
 * @return {Function} propsLinkFn
 */

function compileProps(el, propOptions, vm) {
  var props = [];
  var propsData = vm.$options.propsData;
  var names = Object.keys(propOptions);
  var i = names.length;
  var options, name, attr, value, path, parsed, prop;
  while (i--) {
    name = names[i];
    options = propOptions[name] || empty;

    if (process.env.NODE_ENV !== 'production' && name === '$data') {
      warn('Do not use $data as prop.', vm);
      continue;
    }

    // props could contain dashes, which will be
    // interpreted as minus calculations by the parser
    // so we need to camelize the path here
    path = camelize(name);
    if (!identRE$1.test(path)) {
      process.env.NODE_ENV !== 'production' && warn('Invalid prop key: "' + name + '". Prop keys ' + 'must be valid identifiers.', vm);
      continue;
    }

    prop = {
      name: name,
      path: path,
      options: options,
      mode: propBindingModes.ONE_WAY,
      raw: null
    };

    attr = hyphenate(name);
    // first check dynamic version
    if ((value = getBindAttr(el, attr)) === null) {
      if ((value = getBindAttr(el, attr + '.sync')) !== null) {
        prop.mode = propBindingModes.TWO_WAY;
      } else if ((value = getBindAttr(el, attr + '.once')) !== null) {
        prop.mode = propBindingModes.ONE_TIME;
      }
    }
    if (value !== null) {
      // has dynamic binding!
      prop.raw = value;
      parsed = parseDirective(value);
      value = parsed.expression;
      prop.filters = parsed.filters;
      // check binding type
      if (isLiteral(value) && !parsed.filters) {
        // for expressions containing literal numbers and
        // booleans, there's no need to setup a prop binding,
        // so we can optimize them as a one-time set.
        prop.optimizedLiteral = true;
      } else {
        prop.dynamic = true;
        // check non-settable path for two-way bindings
        if (process.env.NODE_ENV !== 'production' && prop.mode === propBindingModes.TWO_WAY && !settablePathRE.test(value)) {
          prop.mode = propBindingModes.ONE_WAY;
          warn('Cannot bind two-way prop with non-settable ' + 'parent path: ' + value, vm);
        }
      }
      prop.parentPath = value;

      // warn required two-way
      if (process.env.NODE_ENV !== 'production' && options.twoWay && prop.mode !== propBindingModes.TWO_WAY) {
        warn('Prop "' + name + '" expects a two-way binding type.', vm);
      }
    } else if ((value = getAttr(el, attr)) !== null) {
      // has literal binding!
      prop.raw = value;
    } else if (propsData && (value = propsData[name] || propsData[path]) !== null) {
      // has propsData
      prop.raw = value;
    } else if (process.env.NODE_ENV !== 'production') {
      // check possible camelCase prop usage
      var lowerCaseName = path.toLowerCase();
      value = /[A-Z\-]/.test(name) && (el.getAttribute(lowerCaseName) || el.getAttribute(':' + lowerCaseName) || el.getAttribute('v-bind:' + lowerCaseName) || el.getAttribute(':' + lowerCaseName + '.once') || el.getAttribute('v-bind:' + lowerCaseName + '.once') || el.getAttribute(':' + lowerCaseName + '.sync') || el.getAttribute('v-bind:' + lowerCaseName + '.sync'));
      if (value) {
        warn('Possible usage error for prop `' + lowerCaseName + '` - ' + 'did you mean `' + attr + '`? HTML is case-insensitive, remember to use ' + 'kebab-case for props in templates.', vm);
      } else if (options.required && (!propsData || !(name in propsData) && !(path in propsData))) {
        // warn missing required
        warn('Missing required prop: ' + name, vm);
      }
    }
    // push prop
    props.push(prop);
  }
  return makePropsLinkFn(props);
}

/**
 * Build a function that applies props to a vm.
 *
 * @param {Array} props
 * @return {Function} propsLinkFn
 */

function makePropsLinkFn(props) {
  return function propsLinkFn(vm, scope) {
    // store resolved props info
    vm._props = {};
    var inlineProps = vm.$options.propsData;
    var i = props.length;
    var prop, path, options, value, raw;
    while (i--) {
      prop = props[i];
      raw = prop.raw;
      path = prop.path;
      options = prop.options;
      vm._props[path] = prop;
      if (inlineProps && hasOwn(inlineProps, path)) {
        initProp(vm, prop, inlineProps[path]);
      }if (raw === null) {
        // initialize absent prop
        initProp(vm, prop, undefined);
      } else if (prop.dynamic) {
        // dynamic prop
        if (prop.mode === propBindingModes.ONE_TIME) {
          // one time binding
          value = (scope || vm._context || vm).$get(prop.parentPath);
          initProp(vm, prop, value);
        } else {
          if (vm._context) {
            // dynamic binding
            vm._bindDir({
              name: 'prop',
              def: propDef,
              prop: prop
            }, null, null, scope); // el, host, scope
          } else {
              // root instance
              initProp(vm, prop, vm.$get(prop.parentPath));
            }
        }
      } else if (prop.optimizedLiteral) {
        // optimized literal, cast it and just set once
        var stripped = stripQuotes(raw);
        value = stripped === raw ? toBoolean(toNumber(raw)) : stripped;
        initProp(vm, prop, value);
      } else {
        // string literal, but we need to cater for
        // Boolean props with no value, or with same
        // literal value (e.g. disabled="disabled")
        // see https://github.com/vuejs/vue-loader/issues/182
        value = options.type === Boolean && (raw === '' || raw === hyphenate(prop.name)) ? true : raw;
        initProp(vm, prop, value);
      }
    }
  };
}

/**
 * Process a prop with a rawValue, applying necessary coersions,
 * default values & assertions and call the given callback with
 * processed value.
 *
 * @param {Vue} vm
 * @param {Object} prop
 * @param {*} rawValue
 * @param {Function} fn
 */

function processPropValue(vm, prop, rawValue, fn) {
  var isSimple = prop.dynamic && isSimplePath(prop.parentPath);
  var value = rawValue;
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop);
  }
  value = coerceProp(prop, value, vm);
  var coerced = value !== rawValue;
  if (!assertProp(prop, value, vm)) {
    value = undefined;
  }
  if (isSimple && !coerced) {
    withoutConversion(function () {
      fn(value);
    });
  } else {
    fn(value);
  }
}

/**
 * Set a prop's initial value on a vm and its data object.
 *
 * @param {Vue} vm
 * @param {Object} prop
 * @param {*} value
 */

function initProp(vm, prop, value) {
  processPropValue(vm, prop, value, function (value) {
    defineReactive(vm, prop.path, value);
  });
}

/**
 * Update a prop's value on a vm.
 *
 * @param {Vue} vm
 * @param {Object} prop
 * @param {*} value
 */

function updateProp(vm, prop, value) {
  processPropValue(vm, prop, value, function (value) {
    vm[prop.path] = value;
  });
}

/**
 * Get the default value of a prop.
 *
 * @param {Vue} vm
 * @param {Object} prop
 * @return {*}
 */

function getPropDefaultValue(vm, prop) {
  // no default, return undefined
  var options = prop.options;
  if (!hasOwn(options, 'default')) {
    // absent boolean value defaults to false
    return options.type === Boolean ? false : undefined;
  }
  var def = options['default'];
  // warn against non-factory defaults for Object & Array
  if (isObject(def)) {
    process.env.NODE_ENV !== 'production' && warn('Invalid default value for prop "' + prop.name + '": ' + 'Props with type Object/Array must use a factory function ' + 'to return the default value.', vm);
  }
  // call factory function for non-Function types
  return typeof def === 'function' && options.type !== Function ? def.call(vm) : def;
}

/**
 * Assert whether a prop is valid.
 *
 * @param {Object} prop
 * @param {*} value
 * @param {Vue} vm
 */

function assertProp(prop, value, vm) {
  if (!prop.options.required && ( // non-required
  prop.raw === null || // abscent
  value == null) // null or undefined
  ) {
      return true;
    }
  var options = prop.options;
  var type = options.type;
  var valid = !type;
  var expectedTypes = [];
  if (type) {
    if (!isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType);
      valid = assertedType.valid;
    }
  }
  if (!valid) {
    if (process.env.NODE_ENV !== 'production') {
      warn('Invalid prop: type check failed for prop "' + prop.name + '".' + ' Expected ' + expectedTypes.map(formatType).join(', ') + ', got ' + formatValue(value) + '.', vm);
    }
    return false;
  }
  var validator = options.validator;
  if (validator) {
    if (!validator(value)) {
      process.env.NODE_ENV !== 'production' && warn('Invalid prop: custom validator check failed for prop "' + prop.name + '".', vm);
      return false;
    }
  }
  return true;
}

/**
 * Force parsing value with coerce option.
 *
 * @param {*} value
 * @param {Object} options
 * @return {*}
 */

function coerceProp(prop, value, vm) {
  var coerce = prop.options.coerce;
  if (!coerce) {
    return value;
  }
  if (typeof coerce === 'function') {
    return coerce(value);
  } else {
    process.env.NODE_ENV !== 'production' && warn('Invalid coerce for prop "' + prop.name + '": expected function, got ' + typeof coerce + '.', vm);
    return value;
  }
}

/**
 * Assert the type of a value
 *
 * @param {*} value
 * @param {Function} type
 * @return {Object}
 */

function assertType(value, type) {
  var valid;
  var expectedType;
  if (type === String) {
    expectedType = 'string';
    valid = typeof value === expectedType;
  } else if (type === Number) {
    expectedType = 'number';
    valid = typeof value === expectedType;
  } else if (type === Boolean) {
    expectedType = 'boolean';
    valid = typeof value === expectedType;
  } else if (type === Function) {
    expectedType = 'function';
    valid = typeof value === expectedType;
  } else if (type === Object) {
    expectedType = 'object';
    valid = isPlainObject(value);
  } else if (type === Array) {
    expectedType = 'array';
    valid = isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  };
}

/**
 * Format type for output
 *
 * @param {String} type
 * @return {String}
 */

function formatType(type) {
  return type ? type.charAt(0).toUpperCase() + type.slice(1) : 'custom type';
}

/**
 * Format value
 *
 * @param {*} value
 * @return {String}
 */

function formatValue(val) {
  return Object.prototype.toString.call(val).slice(8, -1);
}

var bindingModes = config._propBindingModes;

var propDef = {

  bind: function bind() {
    var child = this.vm;
    var parent = child._context;
    // passed in from compiler directly
    var prop = this.descriptor.prop;
    var childKey = prop.path;
    var parentKey = prop.parentPath;
    var twoWay = prop.mode === bindingModes.TWO_WAY;

    var parentWatcher = this.parentWatcher = new Watcher(parent, parentKey, function (val) {
      updateProp(child, prop, val);
    }, {
      twoWay: twoWay,
      filters: prop.filters,
      // important: props need to be observed on the
      // v-for scope if present
      scope: this._scope
    });

    // set the child initial value.
    initProp(child, prop, parentWatcher.value);

    // setup two-way binding
    if (twoWay) {
      // important: defer the child watcher creation until
      // the created hook (after data observation)
      var self = this;
      child.$once('pre-hook:created', function () {
        self.childWatcher = new Watcher(child, childKey, function (val) {
          parentWatcher.set(val);
        }, {
          // ensure sync upward before parent sync down.
          // this is necessary in cases e.g. the child
          // mutates a prop array, then replaces it. (#1683)
          sync: true
        });
      });
    }
  },

  unbind: function unbind() {
    this.parentWatcher.teardown();
    if (this.childWatcher) {
      this.childWatcher.teardown();
    }
  }
};

var queue$1 = [];
var queued = false;

/**
 * Push a job into the queue.
 *
 * @param {Function} job
 */

function pushJob(job) {
  queue$1.push(job);
  if (!queued) {
    queued = true;
    nextTick(flush);
  }
}

/**
 * Flush the queue, and do one forced reflow before
 * triggering transitions.
 */

function flush() {
  // Force layout
  var f = document.documentElement.offsetHeight;
  for (var i = 0; i < queue$1.length; i++) {
    queue$1[i]();
  }
  queue$1 = [];
  queued = false;
  // dummy return, so js linters don't complain about
  // unused variable f
  return f;
}

var TYPE_TRANSITION = 'transition';
var TYPE_ANIMATION = 'animation';
var transDurationProp = transitionProp + 'Duration';
var animDurationProp = animationProp + 'Duration';

/**
 * If a just-entered element is applied the
 * leave class while its enter transition hasn't started yet,
 * and the transitioned property has the same value for both
 * enter/leave, then the leave transition will be skipped and
 * the transitionend event never fires. This function ensures
 * its callback to be called after a transition has started
 * by waiting for double raf.
 *
 * It falls back to setTimeout on devices that support CSS
 * transitions but not raf (e.g. Android 4.2 browser) - since
 * these environments are usually slow, we are giving it a
 * relatively large timeout.
 */

var raf = inBrowser && window.requestAnimationFrame;
var waitForTransitionStart = raf
/* istanbul ignore next */
? function (fn) {
  raf(function () {
    raf(fn);
  });
} : function (fn) {
  setTimeout(fn, 50);
};

/**
 * A Transition object that encapsulates the state and logic
 * of the transition.
 *
 * @param {Element} el
 * @param {String} id
 * @param {Object} hooks
 * @param {Vue} vm
 */
function Transition(el, id, hooks, vm) {
  this.id = id;
  this.el = el;
  this.enterClass = hooks && hooks.enterClass || id + '-enter';
  this.leaveClass = hooks && hooks.leaveClass || id + '-leave';
  this.hooks = hooks;
  this.vm = vm;
  // async state
  this.pendingCssEvent = this.pendingCssCb = this.cancel = this.pendingJsCb = this.op = this.cb = null;
  this.justEntered = false;
  this.entered = this.left = false;
  this.typeCache = {};
  // check css transition type
  this.type = hooks && hooks.type;
  /* istanbul ignore if */
  if (process.env.NODE_ENV !== 'production') {
    if (this.type && this.type !== TYPE_TRANSITION && this.type !== TYPE_ANIMATION) {
      warn('invalid CSS transition type for transition="' + this.id + '": ' + this.type, vm);
    }
  }
  // bind
  var self = this;['enterNextTick', 'enterDone', 'leaveNextTick', 'leaveDone'].forEach(function (m) {
    self[m] = bind(self[m], self);
  });
}

var p$1 = Transition.prototype;

/**
 * Start an entering transition.
 *
 * 1. enter transition triggered
 * 2. call beforeEnter hook
 * 3. add enter class
 * 4. insert/show element
 * 5. call enter hook (with possible explicit js callback)
 * 6. reflow
 * 7. based on transition type:
 *    - transition:
 *        remove class now, wait for transitionend,
 *        then done if there's no explicit js callback.
 *    - animation:
 *        wait for animationend, remove class,
 *        then done if there's no explicit js callback.
 *    - no css transition:
 *        done now if there's no explicit js callback.
 * 8. wait for either done or js callback, then call
 *    afterEnter hook.
 *
 * @param {Function} op - insert/show the element
 * @param {Function} [cb]
 */

p$1.enter = function (op, cb) {
  this.cancelPending();
  this.callHook('beforeEnter');
  this.cb = cb;
  addClass(this.el, this.enterClass);
  op();
  this.entered = false;
  this.callHookWithCb('enter');
  if (this.entered) {
    return; // user called done synchronously.
  }
  this.cancel = this.hooks && this.hooks.enterCancelled;
  pushJob(this.enterNextTick);
};

/**
 * The "nextTick" phase of an entering transition, which is
 * to be pushed into a queue and executed after a reflow so
 * that removing the class can trigger a CSS transition.
 */

p$1.enterNextTick = function () {
  var _this = this;

  // prevent transition skipping
  this.justEntered = true;
  waitForTransitionStart(function () {
    _this.justEntered = false;
  });
  var enterDone = this.enterDone;
  var type = this.getCssTransitionType(this.enterClass);
  if (!this.pendingJsCb) {
    if (type === TYPE_TRANSITION) {
      // trigger transition by removing enter class now
      removeClass(this.el, this.enterClass);
      this.setupCssCb(transitionEndEvent, enterDone);
    } else if (type === TYPE_ANIMATION) {
      this.setupCssCb(animationEndEvent, enterDone);
    } else {
      enterDone();
    }
  } else if (type === TYPE_TRANSITION) {
    removeClass(this.el, this.enterClass);
  }
};

/**
 * The "cleanup" phase of an entering transition.
 */

p$1.enterDone = function () {
  this.entered = true;
  this.cancel = this.pendingJsCb = null;
  removeClass(this.el, this.enterClass);
  this.callHook('afterEnter');
  if (this.cb) this.cb();
};

/**
 * Start a leaving transition.
 *
 * 1. leave transition triggered.
 * 2. call beforeLeave hook
 * 3. add leave class (trigger css transition)
 * 4. call leave hook (with possible explicit js callback)
 * 5. reflow if no explicit js callback is provided
 * 6. based on transition type:
 *    - transition or animation:
 *        wait for end event, remove class, then done if
 *        there's no explicit js callback.
 *    - no css transition:
 *        done if there's no explicit js callback.
 * 7. wait for either done or js callback, then call
 *    afterLeave hook.
 *
 * @param {Function} op - remove/hide the element
 * @param {Function} [cb]
 */

p$1.leave = function (op, cb) {
  this.cancelPending();
  this.callHook('beforeLeave');
  this.op = op;
  this.cb = cb;
  addClass(this.el, this.leaveClass);
  this.left = false;
  this.callHookWithCb('leave');
  if (this.left) {
    return; // user called done synchronously.
  }
  this.cancel = this.hooks && this.hooks.leaveCancelled;
  // only need to handle leaveDone if
  // 1. the transition is already done (synchronously called
  //    by the user, which causes this.op set to null)
  // 2. there's no explicit js callback
  if (this.op && !this.pendingJsCb) {
    // if a CSS transition leaves immediately after enter,
    // the transitionend event never fires. therefore we
    // detect such cases and end the leave immediately.
    if (this.justEntered) {
      this.leaveDone();
    } else {
      pushJob(this.leaveNextTick);
    }
  }
};

/**
 * The "nextTick" phase of a leaving transition.
 */

p$1.leaveNextTick = function () {
  var type = this.getCssTransitionType(this.leaveClass);
  if (type) {
    var event = type === TYPE_TRANSITION ? transitionEndEvent : animationEndEvent;
    this.setupCssCb(event, this.leaveDone);
  } else {
    this.leaveDone();
  }
};

/**
 * The "cleanup" phase of a leaving transition.
 */

p$1.leaveDone = function () {
  this.left = true;
  this.cancel = this.pendingJsCb = null;
  this.op();
  removeClass(this.el, this.leaveClass);
  this.callHook('afterLeave');
  if (this.cb) this.cb();
  this.op = null;
};

/**
 * Cancel any pending callbacks from a previously running
 * but not finished transition.
 */

p$1.cancelPending = function () {
  this.op = this.cb = null;
  var hasPending = false;
  if (this.pendingCssCb) {
    hasPending = true;
    off(this.el, this.pendingCssEvent, this.pendingCssCb);
    this.pendingCssEvent = this.pendingCssCb = null;
  }
  if (this.pendingJsCb) {
    hasPending = true;
    this.pendingJsCb.cancel();
    this.pendingJsCb = null;
  }
  if (hasPending) {
    removeClass(this.el, this.enterClass);
    removeClass(this.el, this.leaveClass);
  }
  if (this.cancel) {
    this.cancel.call(this.vm, this.el);
    this.cancel = null;
  }
};

/**
 * Call a user-provided synchronous hook function.
 *
 * @param {String} type
 */

p$1.callHook = function (type) {
  if (this.hooks && this.hooks[type]) {
    this.hooks[type].call(this.vm, this.el);
  }
};

/**
 * Call a user-provided, potentially-async hook function.
 * We check for the length of arguments to see if the hook
 * expects a `done` callback. If true, the transition's end
 * will be determined by when the user calls that callback;
 * otherwise, the end is determined by the CSS transition or
 * animation.
 *
 * @param {String} type
 */

p$1.callHookWithCb = function (type) {
  var hook = this.hooks && this.hooks[type];
  if (hook) {
    if (hook.length > 1) {
      this.pendingJsCb = cancellable(this[type + 'Done']);
    }
    hook.call(this.vm, this.el, this.pendingJsCb);
  }
};

/**
 * Get an element's transition type based on the
 * calculated styles.
 *
 * @param {String} className
 * @return {Number}
 */

p$1.getCssTransitionType = function (className) {
  /* istanbul ignore if */
  if (!transitionEndEvent ||
  // skip CSS transitions if page is not visible -
  // this solves the issue of transitionend events not
  // firing until the page is visible again.
  // pageVisibility API is supported in IE10+, same as
  // CSS transitions.
  document.hidden ||
  // explicit js-only transition
  this.hooks && this.hooks.css === false ||
  // element is hidden
  isHidden(this.el)) {
    return;
  }
  var type = this.type || this.typeCache[className];
  if (type) return type;
  var inlineStyles = this.el.style;
  var computedStyles = window.getComputedStyle(this.el);
  var transDuration = inlineStyles[transDurationProp] || computedStyles[transDurationProp];
  if (transDuration && transDuration !== '0s') {
    type = TYPE_TRANSITION;
  } else {
    var animDuration = inlineStyles[animDurationProp] || computedStyles[animDurationProp];
    if (animDuration && animDuration !== '0s') {
      type = TYPE_ANIMATION;
    }
  }
  if (type) {
    this.typeCache[className] = type;
  }
  return type;
};

/**
 * Setup a CSS transitionend/animationend callback.
 *
 * @param {String} event
 * @param {Function} cb
 */

p$1.setupCssCb = function (event, cb) {
  this.pendingCssEvent = event;
  var self = this;
  var el = this.el;
  var onEnd = this.pendingCssCb = function (e) {
    if (e.target === el) {
      off(el, event, onEnd);
      self.pendingCssEvent = self.pendingCssCb = null;
      if (!self.pendingJsCb && cb) {
        cb();
      }
    }
  };
  on(el, event, onEnd);
};

/**
 * Check if an element is hidden - in that case we can just
 * skip the transition alltogether.
 *
 * @param {Element} el
 * @return {Boolean}
 */

function isHidden(el) {
  if (/svg$/.test(el.namespaceURI)) {
    // SVG elements do not have offset(Width|Height)
    // so we need to check the client rect
    var rect = el.getBoundingClientRect();
    return !(rect.width || rect.height);
  } else {
    return !(el.offsetWidth || el.offsetHeight || el.getClientRects().length);
  }
}

var transition$1 = {

  priority: TRANSITION,

  update: function update(id, oldId) {
    var el = this.el;
    // resolve on owner vm
    var hooks = resolveAsset(this.vm.$options, 'transitions', id);
    id = id || 'v';
    oldId = oldId || 'v';
    el.__v_trans = new Transition(el, id, hooks, this.vm);
    removeClass(el, oldId + '-transition');
    addClass(el, id + '-transition');
  }
};

var internalDirectives = {
  style: style,
  'class': vClass,
  component: component,
  prop: propDef,
  transition: transition$1
};

// special binding prefixes
var bindRE = /^v-bind:|^:/;
var onRE = /^v-on:|^@/;
var dirAttrRE = /^v-([^:]+)(?:$|:(.*)$)/;
var modifierRE = /\.[^\.]+/g;
var transitionRE = /^(v-bind:|:)?transition$/;

// default directive priority
var DEFAULT_PRIORITY = 1000;
var DEFAULT_TERMINAL_PRIORITY = 2000;

/**
 * Compile a template and return a reusable composite link
 * function, which recursively contains more link functions
 * inside. This top level compile function would normally
 * be called on instance root nodes, but can also be used
 * for partial compilation if the partial argument is true.
 *
 * The returned composite link function, when called, will
 * return an unlink function that tearsdown all directives
 * created during the linking phase.
 *
 * @param {Element|DocumentFragment} el
 * @param {Object} options
 * @param {Boolean} partial
 * @return {Function}
 */

function compile(el, options, partial) {
  // link function for the node itself.
  var nodeLinkFn = partial || !options._asComponent ? compileNode(el, options) : null;
  // link function for the childNodes
  var childLinkFn = !(nodeLinkFn && nodeLinkFn.terminal) && !isScript(el) && el.hasChildNodes() ? compileNodeList(el.childNodes, options) : null;

  /**
   * A composite linker function to be called on a already
   * compiled piece of DOM, which instantiates all directive
   * instances.
   *
   * @param {Vue} vm
   * @param {Element|DocumentFragment} el
   * @param {Vue} [host] - host vm of transcluded content
   * @param {Object} [scope] - v-for scope
   * @param {Fragment} [frag] - link context fragment
   * @return {Function|undefined}
   */

  return function compositeLinkFn(vm, el, host, scope, frag) {
    // cache childNodes before linking parent, fix #657
    var childNodes = toArray(el.childNodes);
    // link
    var dirs = linkAndCapture(function compositeLinkCapturer() {
      if (nodeLinkFn) nodeLinkFn(vm, el, host, scope, frag);
      if (childLinkFn) childLinkFn(vm, childNodes, host, scope, frag);
    }, vm);
    return makeUnlinkFn(vm, dirs);
  };
}

/**
 * Apply a linker to a vm/element pair and capture the
 * directives created during the process.
 *
 * @param {Function} linker
 * @param {Vue} vm
 */

function linkAndCapture(linker, vm) {
  /* istanbul ignore if */
  if (process.env.NODE_ENV === 'production') {
    // reset directives before every capture in production
    // mode, so that when unlinking we don't need to splice
    // them out (which turns out to be a perf hit).
    // they are kept in development mode because they are
    // useful for Vue's own tests.
    vm._directives = [];
  }
  var originalDirCount = vm._directives.length;
  linker();
  var dirs = vm._directives.slice(originalDirCount);
  sortDirectives(dirs);
  for (var i = 0, l = dirs.length; i < l; i++) {
    dirs[i]._bind();
  }
  return dirs;
}

/**
 * sort directives by priority (stable sort)
 *
 * @param {Array} dirs
 */
function sortDirectives(dirs) {
  if (dirs.length === 0) return;

  var groupedMap = {};
  var i, j, k, l;
  var index = 0;
  var priorities = [];
  for (i = 0, j = dirs.length; i < j; i++) {
    var dir = dirs[i];
    var priority = dir.descriptor.def.priority || DEFAULT_PRIORITY;
    var array = groupedMap[priority];
    if (!array) {
      array = groupedMap[priority] = [];
      priorities.push(priority);
    }
    array.push(dir);
  }

  priorities.sort(function (a, b) {
    return a > b ? -1 : a === b ? 0 : 1;
  });
  for (i = 0, j = priorities.length; i < j; i++) {
    var group = groupedMap[priorities[i]];
    for (k = 0, l = group.length; k < l; k++) {
      dirs[index++] = group[k];
    }
  }
}

/**
 * Linker functions return an unlink function that
 * tearsdown all directives instances generated during
 * the process.
 *
 * We create unlink functions with only the necessary
 * information to avoid retaining additional closures.
 *
 * @param {Vue} vm
 * @param {Array} dirs
 * @param {Vue} [context]
 * @param {Array} [contextDirs]
 * @return {Function}
 */

function makeUnlinkFn(vm, dirs, context, contextDirs) {
  function unlink(destroying) {
    teardownDirs(vm, dirs, destroying);
    if (context && contextDirs) {
      teardownDirs(context, contextDirs);
    }
  }
  // expose linked directives
  unlink.dirs = dirs;
  return unlink;
}

/**
 * Teardown partial linked directives.
 *
 * @param {Vue} vm
 * @param {Array} dirs
 * @param {Boolean} destroying
 */

function teardownDirs(vm, dirs, destroying) {
  var i = dirs.length;
  while (i--) {
    dirs[i]._teardown();
    if (process.env.NODE_ENV !== 'production' && !destroying) {
      vm._directives.$remove(dirs[i]);
    }
  }
}

/**
 * Compile link props on an instance.
 *
 * @param {Vue} vm
 * @param {Element} el
 * @param {Object} props
 * @param {Object} [scope]
 * @return {Function}
 */

function compileAndLinkProps(vm, el, props, scope) {
  var propsLinkFn = compileProps(el, props, vm);
  var propDirs = linkAndCapture(function () {
    propsLinkFn(vm, scope);
  }, vm);
  return makeUnlinkFn(vm, propDirs);
}

/**
 * Compile the root element of an instance.
 *
 * 1. attrs on context container (context scope)
 * 2. attrs on the component template root node, if
 *    replace:true (child scope)
 *
 * If this is a fragment instance, we only need to compile 1.
 *
 * @param {Element} el
 * @param {Object} options
 * @param {Object} contextOptions
 * @return {Function}
 */

function compileRoot(el, options, contextOptions) {
  var containerAttrs = options._containerAttrs;
  var replacerAttrs = options._replacerAttrs;
  var contextLinkFn, replacerLinkFn;

  // only need to compile other attributes for
  // non-fragment instances
  if (el.nodeType !== 11) {
    // for components, container and replacer need to be
    // compiled separately and linked in different scopes.
    if (options._asComponent) {
      // 2. container attributes
      if (containerAttrs && contextOptions) {
        contextLinkFn = compileDirectives(containerAttrs, contextOptions);
      }
      if (replacerAttrs) {
        // 3. replacer attributes
        replacerLinkFn = compileDirectives(replacerAttrs, options);
      }
    } else {
      // non-component, just compile as a normal element.
      replacerLinkFn = compileDirectives(el.attributes, options);
    }
  } else if (process.env.NODE_ENV !== 'production' && containerAttrs) {
    // warn container directives for fragment instances
    var names = containerAttrs.filter(function (attr) {
      // allow vue-loader/vueify scoped css attributes
      return attr.name.indexOf('_v-') < 0 &&
      // allow event listeners
      !onRE.test(attr.name) &&
      // allow slots
      attr.name !== 'slot';
    }).map(function (attr) {
      return '"' + attr.name + '"';
    });
    if (names.length) {
      var plural = names.length > 1;

      var componentName = options.el.tagName.toLowerCase();
      if (componentName === 'component' && options.name) {
        componentName += ':' + options.name;
      }

      warn('Attribute' + (plural ? 's ' : ' ') + names.join(', ') + (plural ? ' are' : ' is') + ' ignored on component ' + '<' + componentName + '> because ' + 'the component is a fragment instance: ' + 'http://vuejs.org/guide/components.html#Fragment-Instance');
    }
  }

  options._containerAttrs = options._replacerAttrs = null;
  return function rootLinkFn(vm, el, scope) {
    // link context scope dirs
    var context = vm._context;
    var contextDirs;
    if (context && contextLinkFn) {
      contextDirs = linkAndCapture(function () {
        contextLinkFn(context, el, null, scope);
      }, context);
    }

    // link self
    var selfDirs = linkAndCapture(function () {
      if (replacerLinkFn) replacerLinkFn(vm, el);
    }, vm);

    // return the unlink function that tearsdown context
    // container directives.
    return makeUnlinkFn(vm, selfDirs, context, contextDirs);
  };
}

/**
 * Compile a node and return a nodeLinkFn based on the
 * node type.
 *
 * @param {Node} node
 * @param {Object} options
 * @return {Function|null}
 */

function compileNode(node, options) {
  var type = node.nodeType;
  if (type === 1 && !isScript(node)) {
    return compileElement(node, options);
  } else if (type === 3 && node.data.trim()) {
    return compileTextNode(node, options);
  } else {
    return null;
  }
}

/**
 * Compile an element and return a nodeLinkFn.
 *
 * @param {Element} el
 * @param {Object} options
 * @return {Function|null}
 */

function compileElement(el, options) {
  // preprocess textareas.
  // textarea treats its text content as the initial value.
  // just bind it as an attr directive for value.
  if (el.tagName === 'TEXTAREA') {
    // a textarea which has v-pre attr should skip complie.
    if (getAttr(el, 'v-pre') !== null) {
      return skip;
    }
    var tokens = parseText(el.value);
    if (tokens) {
      el.setAttribute(':value', tokensToExp(tokens));
      el.value = '';
    }
  }
  var linkFn;
  var hasAttrs = el.hasAttributes();
  var attrs = hasAttrs && toArray(el.attributes);
  // check terminal directives (for & if)
  if (hasAttrs) {
    linkFn = checkTerminalDirectives(el, attrs, options);
  }
  // check element directives
  if (!linkFn) {
    linkFn = checkElementDirectives(el, options);
  }
  // check component
  if (!linkFn) {
    linkFn = checkComponent(el, options);
  }
  // normal directives
  if (!linkFn && hasAttrs) {
    linkFn = compileDirectives(attrs, options);
  }
  return linkFn;
}

/**
 * Compile a textNode and return a nodeLinkFn.
 *
 * @param {TextNode} node
 * @param {Object} options
 * @return {Function|null} textNodeLinkFn
 */

function compileTextNode(node, options) {
  // skip marked text nodes
  if (node._skip) {
    return removeText;
  }

  var tokens = parseText(node.wholeText);
  if (!tokens) {
    return null;
  }

  // mark adjacent text nodes as skipped,
  // because we are using node.wholeText to compile
  // all adjacent text nodes together. This fixes
  // issues in IE where sometimes it splits up a single
  // text node into multiple ones.
  var next = node.nextSibling;
  while (next && next.nodeType === 3) {
    next._skip = true;
    next = next.nextSibling;
  }

  var frag = document.createDocumentFragment();
  var el, token;
  for (var i = 0, l = tokens.length; i < l; i++) {
    token = tokens[i];
    el = token.tag ? processTextToken(token, options) : document.createTextNode(token.value);
    frag.appendChild(el);
  }
  return makeTextNodeLinkFn(tokens, frag, options);
}

/**
 * Linker for an skipped text node.
 *
 * @param {Vue} vm
 * @param {Text} node
 */

function removeText(vm, node) {
  remove(node);
}

/**
 * Process a single text token.
 *
 * @param {Object} token
 * @param {Object} options
 * @return {Node}
 */

function processTextToken(token, options) {
  var el;
  if (token.oneTime) {
    el = document.createTextNode(token.value);
  } else {
    if (token.html) {
      el = document.createComment('v-html');
      setTokenType('html');
    } else {
      // IE will clean up empty textNodes during
      // frag.cloneNode(true), so we have to give it
      // something here...
      el = document.createTextNode(' ');
      setTokenType('text');
    }
  }
  function setTokenType(type) {
    if (token.descriptor) return;
    var parsed = parseDirective(token.value);
    token.descriptor = {
      name: type,
      def: directives[type],
      expression: parsed.expression,
      filters: parsed.filters
    };
  }
  return el;
}

/**
 * Build a function that processes a textNode.
 *
 * @param {Array<Object>} tokens
 * @param {DocumentFragment} frag
 */

function makeTextNodeLinkFn(tokens, frag) {
  return function textNodeLinkFn(vm, el, host, scope) {
    var fragClone = frag.cloneNode(true);
    var childNodes = toArray(fragClone.childNodes);
    var token, value, node;
    for (var i = 0, l = tokens.length; i < l; i++) {
      token = tokens[i];
      value = token.value;
      if (token.tag) {
        node = childNodes[i];
        if (token.oneTime) {
          value = (scope || vm).$eval(value);
          if (token.html) {
            replace(node, parseTemplate(value, true));
          } else {
            node.data = _toString(value);
          }
        } else {
          vm._bindDir(token.descriptor, node, host, scope);
        }
      }
    }
    replace(el, fragClone);
  };
}

/**
 * Compile a node list and return a childLinkFn.
 *
 * @param {NodeList} nodeList
 * @param {Object} options
 * @return {Function|undefined}
 */

function compileNodeList(nodeList, options) {
  var linkFns = [];
  var nodeLinkFn, childLinkFn, node;
  for (var i = 0, l = nodeList.length; i < l; i++) {
    node = nodeList[i];
    nodeLinkFn = compileNode(node, options);
    childLinkFn = !(nodeLinkFn && nodeLinkFn.terminal) && node.tagName !== 'SCRIPT' && node.hasChildNodes() ? compileNodeList(node.childNodes, options) : null;
    linkFns.push(nodeLinkFn, childLinkFn);
  }
  return linkFns.length ? makeChildLinkFn(linkFns) : null;
}

/**
 * Make a child link function for a node's childNodes.
 *
 * @param {Array<Function>} linkFns
 * @return {Function} childLinkFn
 */

function makeChildLinkFn(linkFns) {
  return function childLinkFn(vm, nodes, host, scope, frag) {
    var node, nodeLinkFn, childrenLinkFn;
    for (var i = 0, n = 0, l = linkFns.length; i < l; n++) {
      node = nodes[n];
      nodeLinkFn = linkFns[i++];
      childrenLinkFn = linkFns[i++];
      // cache childNodes before linking parent, fix #657
      var childNodes = toArray(node.childNodes);
      if (nodeLinkFn) {
        nodeLinkFn(vm, node, host, scope, frag);
      }
      if (childrenLinkFn) {
        childrenLinkFn(vm, childNodes, host, scope, frag);
      }
    }
  };
}

/**
 * Check for element directives (custom elements that should
 * be resovled as terminal directives).
 *
 * @param {Element} el
 * @param {Object} options
 */

function checkElementDirectives(el, options) {
  var tag = el.tagName.toLowerCase();
  if (commonTagRE.test(tag)) {
    return;
  }
  var def = resolveAsset(options, 'elementDirectives', tag);
  if (def) {
    return makeTerminalNodeLinkFn(el, tag, '', options, def);
  }
}

/**
 * Check if an element is a component. If yes, return
 * a component link function.
 *
 * @param {Element} el
 * @param {Object} options
 * @return {Function|undefined}
 */

function checkComponent(el, options) {
  var component = checkComponentAttr(el, options);
  if (component) {
    var ref = findRef(el);
    var descriptor = {
      name: 'component',
      ref: ref,
      expression: component.id,
      def: internalDirectives.component,
      modifiers: {
        literal: !component.dynamic
      }
    };
    var componentLinkFn = function componentLinkFn(vm, el, host, scope, frag) {
      if (ref) {
        defineReactive((scope || vm).$refs, ref, null);
      }
      vm._bindDir(descriptor, el, host, scope, frag);
    };
    componentLinkFn.terminal = true;
    return componentLinkFn;
  }
}

/**
 * Check an element for terminal directives in fixed order.
 * If it finds one, return a terminal link function.
 *
 * @param {Element} el
 * @param {Array} attrs
 * @param {Object} options
 * @return {Function} terminalLinkFn
 */

function checkTerminalDirectives(el, attrs, options) {
  // skip v-pre
  if (getAttr(el, 'v-pre') !== null) {
    return skip;
  }
  // skip v-else block, but only if following v-if
  if (el.hasAttribute('v-else')) {
    var prev = el.previousElementSibling;
    if (prev && prev.hasAttribute('v-if')) {
      return skip;
    }
  }

  var attr, name, value, modifiers, matched, dirName, rawName, arg, def, termDef;
  for (var i = 0, j = attrs.length; i < j; i++) {
    attr = attrs[i];
    name = attr.name.replace(modifierRE, '');
    if (matched = name.match(dirAttrRE)) {
      def = resolveAsset(options, 'directives', matched[1]);
      if (def && def.terminal) {
        if (!termDef || (def.priority || DEFAULT_TERMINAL_PRIORITY) > termDef.priority) {
          termDef = def;
          rawName = attr.name;
          modifiers = parseModifiers(attr.name);
          value = attr.value;
          dirName = matched[1];
          arg = matched[2];
        }
      }
    }
  }

  if (termDef) {
    return makeTerminalNodeLinkFn(el, dirName, value, options, termDef, rawName, arg, modifiers);
  }
}

function skip() {}
skip.terminal = true;

/**
 * Build a node link function for a terminal directive.
 * A terminal link function terminates the current
 * compilation recursion and handles compilation of the
 * subtree in the directive.
 *
 * @param {Element} el
 * @param {String} dirName
 * @param {String} value
 * @param {Object} options
 * @param {Object} def
 * @param {String} [rawName]
 * @param {String} [arg]
 * @param {Object} [modifiers]
 * @return {Function} terminalLinkFn
 */

function makeTerminalNodeLinkFn(el, dirName, value, options, def, rawName, arg, modifiers) {
  var parsed = parseDirective(value);
  var descriptor = {
    name: dirName,
    arg: arg,
    expression: parsed.expression,
    filters: parsed.filters,
    raw: value,
    attr: rawName,
    modifiers: modifiers,
    def: def
  };
  // check ref for v-for, v-if and router-view
  if (dirName === 'for' || dirName === 'router-view') {
    descriptor.ref = findRef(el);
  }
  var fn = function terminalNodeLinkFn(vm, el, host, scope, frag) {
    if (descriptor.ref) {
      defineReactive((scope || vm).$refs, descriptor.ref, null);
    }
    vm._bindDir(descriptor, el, host, scope, frag);
  };
  fn.terminal = true;
  return fn;
}

/**
 * Compile the directives on an element and return a linker.
 *
 * @param {Array|NamedNodeMap} attrs
 * @param {Object} options
 * @return {Function}
 */

function compileDirectives(attrs, options) {
  var i = attrs.length;
  var dirs = [];
  var attr, name, value, rawName, rawValue, dirName, arg, modifiers, dirDef, tokens, matched;
  while (i--) {
    attr = attrs[i];
    name = rawName = attr.name;
    value = rawValue = attr.value;
    tokens = parseText(value);
    // reset arg
    arg = null;
    // check modifiers
    modifiers = parseModifiers(name);
    name = name.replace(modifierRE, '');

    // attribute interpolations
    if (tokens) {
      value = tokensToExp(tokens);
      arg = name;
      pushDir('bind', directives.bind, tokens);
      // warn against mixing mustaches with v-bind
      if (process.env.NODE_ENV !== 'production') {
        if (name === 'class' && Array.prototype.some.call(attrs, function (attr) {
          return attr.name === ':class' || attr.name === 'v-bind:class';
        })) {
          warn('class="' + rawValue + '": Do not mix mustache interpolation ' + 'and v-bind for "class" on the same element. Use one or the other.', options);
        }
      }
    } else

      // special attribute: transition
      if (transitionRE.test(name)) {
        modifiers.literal = !bindRE.test(name);
        pushDir('transition', internalDirectives.transition);
      } else

        // event handlers
        if (onRE.test(name)) {
          arg = name.replace(onRE, '');
          pushDir('on', directives.on);
        } else

          // attribute bindings
          if (bindRE.test(name)) {
            dirName = name.replace(bindRE, '');
            if (dirName === 'style' || dirName === 'class') {
              pushDir(dirName, internalDirectives[dirName]);
            } else {
              arg = dirName;
              pushDir('bind', directives.bind);
            }
          } else

            // normal directives
            if (matched = name.match(dirAttrRE)) {
              dirName = matched[1];
              arg = matched[2];

              // skip v-else (when used with v-show)
              if (dirName === 'else') {
                continue;
              }

              dirDef = resolveAsset(options, 'directives', dirName, true);
              if (dirDef) {
                pushDir(dirName, dirDef);
              }
            }
  }

  /**
   * Push a directive.
   *
   * @param {String} dirName
   * @param {Object|Function} def
   * @param {Array} [interpTokens]
   */

  function pushDir(dirName, def, interpTokens) {
    var hasOneTimeToken = interpTokens && hasOneTime(interpTokens);
    var parsed = !hasOneTimeToken && parseDirective(value);
    dirs.push({
      name: dirName,
      attr: rawName,
      raw: rawValue,
      def: def,
      arg: arg,
      modifiers: modifiers,
      // conversion from interpolation strings with one-time token
      // to expression is differed until directive bind time so that we
      // have access to the actual vm context for one-time bindings.
      expression: parsed && parsed.expression,
      filters: parsed && parsed.filters,
      interp: interpTokens,
      hasOneTime: hasOneTimeToken
    });
  }

  if (dirs.length) {
    return makeNodeLinkFn(dirs);
  }
}

/**
 * Parse modifiers from directive attribute name.
 *
 * @param {String} name
 * @return {Object}
 */

function parseModifiers(name) {
  var res = Object.create(null);
  var match = name.match(modifierRE);
  if (match) {
    var i = match.length;
    while (i--) {
      res[match[i].slice(1)] = true;
    }
  }
  return res;
}

/**
 * Build a link function for all directives on a single node.
 *
 * @param {Array} directives
 * @return {Function} directivesLinkFn
 */

function makeNodeLinkFn(directives) {
  return function nodeLinkFn(vm, el, host, scope, frag) {
    // reverse apply because it's sorted low to high
    var i = directives.length;
    while (i--) {
      vm._bindDir(directives[i], el, host, scope, frag);
    }
  };
}

/**
 * Check if an interpolation string contains one-time tokens.
 *
 * @param {Array} tokens
 * @return {Boolean}
 */

function hasOneTime(tokens) {
  var i = tokens.length;
  while (i--) {
    if (tokens[i].oneTime) return true;
  }
}

function isScript(el) {
  return el.tagName === 'SCRIPT' && (!el.hasAttribute('type') || el.getAttribute('type') === 'text/javascript');
}

var specialCharRE = /[^\w\-:\.]/;

/**
 * Process an element or a DocumentFragment based on a
 * instance option object. This allows us to transclude
 * a template node/fragment before the instance is created,
 * so the processed fragment can then be cloned and reused
 * in v-for.
 *
 * @param {Element} el
 * @param {Object} options
 * @return {Element|DocumentFragment}
 */

function transclude(el, options) {
  // extract container attributes to pass them down
  // to compiler, because they need to be compiled in
  // parent scope. we are mutating the options object here
  // assuming the same object will be used for compile
  // right after this.
  if (options) {
    options._containerAttrs = extractAttrs(el);
  }
  // for template tags, what we want is its content as
  // a documentFragment (for fragment instances)
  if (isTemplate(el)) {
    el = parseTemplate(el);
  }
  if (options) {
    if (options._asComponent && !options.template) {
      options.template = '<slot></slot>';
    }
    if (options.template) {
      options._content = extractContent(el);
      el = transcludeTemplate(el, options);
    }
  }
  if (isFragment(el)) {
    // anchors for fragment instance
    // passing in `persist: true` to avoid them being
    // discarded by IE during template cloning
    prepend(createAnchor('v-start', true), el);
    el.appendChild(createAnchor('v-end', true));
  }
  return el;
}

/**
 * Process the template option.
 * If the replace option is true this will swap the $el.
 *
 * @param {Element} el
 * @param {Object} options
 * @return {Element|DocumentFragment}
 */

function transcludeTemplate(el, options) {
  var template = options.template;
  var frag = parseTemplate(template, true);
  if (frag) {
    var replacer = frag.firstChild;
    if (!replacer) {
      return frag;
    }
    var tag = replacer.tagName && replacer.tagName.toLowerCase();
    if (options.replace) {
      /* istanbul ignore if */
      if (el === document.body) {
        process.env.NODE_ENV !== 'production' && warn('You are mounting an instance with a template to ' + '<body>. This will replace <body> entirely. You ' + 'should probably use `replace: false` here.');
      }
      // there are many cases where the instance must
      // become a fragment instance: basically anything that
      // can create more than 1 root nodes.
      if (
      // multi-children template
      frag.childNodes.length > 1 ||
      // non-element template
      replacer.nodeType !== 1 ||
      // single nested component
      tag === 'component' || resolveAsset(options, 'components', tag) || hasBindAttr(replacer, 'is') ||
      // element directive
      resolveAsset(options, 'elementDirectives', tag) ||
      // for block
      replacer.hasAttribute('v-for') ||
      // if block
      replacer.hasAttribute('v-if')) {
        return frag;
      } else {
        options._replacerAttrs = extractAttrs(replacer);
        mergeAttrs(el, replacer);
        return replacer;
      }
    } else {
      el.appendChild(frag);
      return el;
    }
  } else {
    process.env.NODE_ENV !== 'production' && warn('Invalid template option: ' + template);
  }
}

/**
 * Helper to extract a component container's attributes
 * into a plain object array.
 *
 * @param {Element} el
 * @return {Array}
 */

function extractAttrs(el) {
  if (el.nodeType === 1 && el.hasAttributes()) {
    return toArray(el.attributes);
  }
}

/**
 * Merge the attributes of two elements, and make sure
 * the class names are merged properly.
 *
 * @param {Element} from
 * @param {Element} to
 */

function mergeAttrs(from, to) {
  var attrs = from.attributes;
  var i = attrs.length;
  var name, value;
  while (i--) {
    name = attrs[i].name;
    value = attrs[i].value;
    if (!to.hasAttribute(name) && !specialCharRE.test(name)) {
      to.setAttribute(name, value);
    } else if (name === 'class' && !parseText(value) && (value = value.trim())) {
      value.split(/\s+/).forEach(function (cls) {
        addClass(to, cls);
      });
    }
  }
}

/**
 * Scan and determine slot content distribution.
 * We do this during transclusion instead at compile time so that
 * the distribution is decoupled from the compilation order of
 * the slots.
 *
 * @param {Element|DocumentFragment} template
 * @param {Element} content
 * @param {Vue} vm
 */

function resolveSlots(vm, content) {
  if (!content) {
    return;
  }
  var contents = vm._slotContents = Object.create(null);
  var el, name;
  for (var i = 0, l = content.children.length; i < l; i++) {
    el = content.children[i];
    /* eslint-disable no-cond-assign */
    if (name = el.getAttribute('slot')) {
      (contents[name] || (contents[name] = [])).push(el);
    }
    /* eslint-enable no-cond-assign */
    if (process.env.NODE_ENV !== 'production' && getBindAttr(el, 'slot')) {
      warn('The "slot" attribute must be static.', vm.$parent);
    }
  }
  for (name in contents) {
    contents[name] = extractFragment(contents[name], content);
  }
  if (content.hasChildNodes()) {
    var nodes = content.childNodes;
    if (nodes.length === 1 && nodes[0].nodeType === 3 && !nodes[0].data.trim()) {
      return;
    }
    contents['default'] = extractFragment(content.childNodes, content);
  }
}

/**
 * Extract qualified content nodes from a node list.
 *
 * @param {NodeList} nodes
 * @return {DocumentFragment}
 */

function extractFragment(nodes, parent) {
  var frag = document.createDocumentFragment();
  nodes = toArray(nodes);
  for (var i = 0, l = nodes.length; i < l; i++) {
    var node = nodes[i];
    if (isTemplate(node) && !node.hasAttribute('v-if') && !node.hasAttribute('v-for')) {
      parent.removeChild(node);
      node = parseTemplate(node, true);
    }
    frag.appendChild(node);
  }
  return frag;
}



var compiler = Object.freeze({
	compile: compile,
	compileAndLinkProps: compileAndLinkProps,
	compileRoot: compileRoot,
	transclude: transclude,
	resolveSlots: resolveSlots
});

function stateMixin (Vue) {
  /**
   * Accessor for `$data` property, since setting $data
   * requires observing the new object and updating
   * proxied properties.
   */

  Object.defineProperty(Vue.prototype, '$data', {
    get: function get() {
      return this._data;
    },
    set: function set(newData) {
      if (newData !== this._data) {
        this._setData(newData);
      }
    }
  });

  /**
   * Setup the scope of an instance, which contains:
   * - observed data
   * - computed properties
   * - user methods
   * - meta properties
   */

  Vue.prototype._initState = function () {
    this._initProps();
    this._initMeta();
    this._initMethods();
    this._initData();
    this._initComputed();
  };

  /**
   * Initialize props.
   */

  Vue.prototype._initProps = function () {
    var options = this.$options;
    var el = options.el;
    var props = options.props;
    if (props && !el) {
      process.env.NODE_ENV !== 'production' && warn('Props will not be compiled if no `el` option is ' + 'provided at instantiation.', this);
    }
    // make sure to convert string selectors into element now
    el = options.el = query(el);
    this._propsUnlinkFn = el && el.nodeType === 1 && props
    // props must be linked in proper scope if inside v-for
    ? compileAndLinkProps(this, el, props, this._scope) : null;
  };

  /**
   * Initialize the data.
   */

  Vue.prototype._initData = function () {
    var dataFn = this.$options.data;
    var data = this._data = dataFn ? dataFn() : {};
    if (!isPlainObject(data)) {
      data = {};
      process.env.NODE_ENV !== 'production' && warn('data functions should return an object.', this);
    }
    var props = this._props;
    // proxy data on instance
    var keys = Object.keys(data);
    var i, key;
    i = keys.length;
    while (i--) {
      key = keys[i];
      // there are two scenarios where we can proxy a data key:
      // 1. it's not already defined as a prop
      // 2. it's provided via a instantiation option AND there are no
      //    template prop present
      if (!props || !hasOwn(props, key)) {
        this._proxy(key);
      } else if (process.env.NODE_ENV !== 'production') {
        warn('Data field "' + key + '" is already defined ' + 'as a prop. To provide default value for a prop, use the "default" ' + 'prop option; if you want to pass prop values to an instantiation ' + 'call, use the "propsData" option.', this);
      }
    }
    // observe data
    observe(data, this);
  };

  /**
   * Swap the instance's $data. Called in $data's setter.
   *
   * @param {Object} newData
   */

  Vue.prototype._setData = function (newData) {
    newData = newData || {};
    var oldData = this._data;
    this._data = newData;
    var keys, key, i;
    // unproxy keys not present in new data
    keys = Object.keys(oldData);
    i = keys.length;
    while (i--) {
      key = keys[i];
      if (!(key in newData)) {
        this._unproxy(key);
      }
    }
    // proxy keys not already proxied,
    // and trigger change for changed values
    keys = Object.keys(newData);
    i = keys.length;
    while (i--) {
      key = keys[i];
      if (!hasOwn(this, key)) {
        // new property
        this._proxy(key);
      }
    }
    oldData.__ob__.removeVm(this);
    observe(newData, this);
    this._digest();
  };

  /**
   * Proxy a property, so that
   * vm.prop === vm._data.prop
   *
   * @param {String} key
   */

  Vue.prototype._proxy = function (key) {
    if (!isReserved(key)) {
      // need to store ref to self here
      // because these getter/setters might
      // be called by child scopes via
      // prototype inheritance.
      var self = this;
      Object.defineProperty(self, key, {
        configurable: true,
        enumerable: true,
        get: function proxyGetter() {
          return self._data[key];
        },
        set: function proxySetter(val) {
          self._data[key] = val;
        }
      });
    }
  };

  /**
   * Unproxy a property.
   *
   * @param {String} key
   */

  Vue.prototype._unproxy = function (key) {
    if (!isReserved(key)) {
      delete this[key];
    }
  };

  /**
   * Force update on every watcher in scope.
   */

  Vue.prototype._digest = function () {
    for (var i = 0, l = this._watchers.length; i < l; i++) {
      this._watchers[i].update(true); // shallow updates
    }
  };

  /**
   * Setup computed properties. They are essentially
   * special getter/setters
   */

  function noop() {}
  Vue.prototype._initComputed = function () {
    var computed = this.$options.computed;
    if (computed) {
      for (var key in computed) {
        var userDef = computed[key];
        var def = {
          enumerable: true,
          configurable: true
        };
        if (typeof userDef === 'function') {
          def.get = makeComputedGetter(userDef, this);
          def.set = noop;
        } else {
          def.get = userDef.get ? userDef.cache !== false ? makeComputedGetter(userDef.get, this) : bind(userDef.get, this) : noop;
          def.set = userDef.set ? bind(userDef.set, this) : noop;
        }
        Object.defineProperty(this, key, def);
      }
    }
  };

  function makeComputedGetter(getter, owner) {
    var watcher = new Watcher(owner, getter, null, {
      lazy: true
    });
    return function computedGetter() {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.target) {
        watcher.depend();
      }
      return watcher.value;
    };
  }

  /**
   * Setup instance methods. Methods must be bound to the
   * instance since they might be passed down as a prop to
   * child components.
   */

  Vue.prototype._initMethods = function () {
    var methods = this.$options.methods;
    if (methods) {
      for (var key in methods) {
        this[key] = bind(methods[key], this);
      }
    }
  };

  /**
   * Initialize meta information like $index, $key & $value.
   */

  Vue.prototype._initMeta = function () {
    var metas = this.$options._meta;
    if (metas) {
      for (var key in metas) {
        defineReactive(this, key, metas[key]);
      }
    }
  };
}

var eventRE = /^v-on:|^@/;

function eventsMixin (Vue) {
  /**
   * Setup the instance's option events & watchers.
   * If the value is a string, we pull it from the
   * instance's methods by name.
   */

  Vue.prototype._initEvents = function () {
    var options = this.$options;
    if (options._asComponent) {
      registerComponentEvents(this, options.el);
    }
    registerCallbacks(this, '$on', options.events);
    registerCallbacks(this, '$watch', options.watch);
  };

  /**
   * Register v-on events on a child component
   *
   * @param {Vue} vm
   * @param {Element} el
   */

  function registerComponentEvents(vm, el) {
    var attrs = el.attributes;
    var name, value, handler;
    for (var i = 0, l = attrs.length; i < l; i++) {
      name = attrs[i].name;
      if (eventRE.test(name)) {
        name = name.replace(eventRE, '');
        // force the expression into a statement so that
        // it always dynamically resolves the method to call (#2670)
        // kinda ugly hack, but does the job.
        value = attrs[i].value;
        if (isSimplePath(value)) {
          value += '.apply(this, $arguments)';
        }
        handler = (vm._scope || vm._context).$eval(value, true);
        handler._fromParent = true;
        vm.$on(name.replace(eventRE), handler);
      }
    }
  }

  /**
   * Register callbacks for option events and watchers.
   *
   * @param {Vue} vm
   * @param {String} action
   * @param {Object} hash
   */

  function registerCallbacks(vm, action, hash) {
    if (!hash) return;
    var handlers, key, i, j;
    for (key in hash) {
      handlers = hash[key];
      if (isArray(handlers)) {
        for (i = 0, j = handlers.length; i < j; i++) {
          register(vm, action, key, handlers[i]);
        }
      } else {
        register(vm, action, key, handlers);
      }
    }
  }

  /**
   * Helper to register an event/watch callback.
   *
   * @param {Vue} vm
   * @param {String} action
   * @param {String} key
   * @param {Function|String|Object} handler
   * @param {Object} [options]
   */

  function register(vm, action, key, handler, options) {
    var type = typeof handler;
    if (type === 'function') {
      vm[action](key, handler, options);
    } else if (type === 'string') {
      var methods = vm.$options.methods;
      var method = methods && methods[handler];
      if (method) {
        vm[action](key, method, options);
      } else {
        process.env.NODE_ENV !== 'production' && warn('Unknown method: "' + handler + '" when ' + 'registering callback for ' + action + ': "' + key + '".', vm);
      }
    } else if (handler && type === 'object') {
      register(vm, action, key, handler.handler, handler);
    }
  }

  /**
   * Setup recursive attached/detached calls
   */

  Vue.prototype._initDOMHooks = function () {
    this.$on('hook:attached', onAttached);
    this.$on('hook:detached', onDetached);
  };

  /**
   * Callback to recursively call attached hook on children
   */

  function onAttached() {
    if (!this._isAttached) {
      this._isAttached = true;
      this.$children.forEach(callAttach);
    }
  }

  /**
   * Iterator to call attached hook
   *
   * @param {Vue} child
   */

  function callAttach(child) {
    if (!child._isAttached && inDoc(child.$el)) {
      child._callHook('attached');
    }
  }

  /**
   * Callback to recursively call detached hook on children
   */

  function onDetached() {
    if (this._isAttached) {
      this._isAttached = false;
      this.$children.forEach(callDetach);
    }
  }

  /**
   * Iterator to call detached hook
   *
   * @param {Vue} child
   */

  function callDetach(child) {
    if (child._isAttached && !inDoc(child.$el)) {
      child._callHook('detached');
    }
  }

  /**
   * Trigger all handlers for a hook
   *
   * @param {String} hook
   */

  Vue.prototype._callHook = function (hook) {
    this.$emit('pre-hook:' + hook);
    var handlers = this.$options[hook];
    if (handlers) {
      for (var i = 0, j = handlers.length; i < j; i++) {
        handlers[i].call(this);
      }
    }
    this.$emit('hook:' + hook);
  };
}

function noop$1() {}

/**
 * A directive links a DOM element with a piece of data,
 * which is the result of evaluating an expression.
 * It registers a watcher with the expression and calls
 * the DOM update function when a change is triggered.
 *
 * @param {Object} descriptor
 *                 - {String} name
 *                 - {Object} def
 *                 - {String} expression
 *                 - {Array<Object>} [filters]
 *                 - {Object} [modifiers]
 *                 - {Boolean} literal
 *                 - {String} attr
 *                 - {String} arg
 *                 - {String} raw
 *                 - {String} [ref]
 *                 - {Array<Object>} [interp]
 *                 - {Boolean} [hasOneTime]
 * @param {Vue} vm
 * @param {Node} el
 * @param {Vue} [host] - transclusion host component
 * @param {Object} [scope] - v-for scope
 * @param {Fragment} [frag] - owner fragment
 * @constructor
 */
function Directive(descriptor, vm, el, host, scope, frag) {
  this.vm = vm;
  this.el = el;
  // copy descriptor properties
  this.descriptor = descriptor;
  this.name = descriptor.name;
  this.expression = descriptor.expression;
  this.arg = descriptor.arg;
  this.modifiers = descriptor.modifiers;
  this.filters = descriptor.filters;
  this.literal = this.modifiers && this.modifiers.literal;
  // private
  this._locked = false;
  this._bound = false;
  this._listeners = null;
  // link context
  this._host = host;
  this._scope = scope;
  this._frag = frag;
  // store directives on node in dev mode
  if (process.env.NODE_ENV !== 'production' && this.el) {
    this.el._vue_directives = this.el._vue_directives || [];
    this.el._vue_directives.push(this);
  }
}

/**
 * Initialize the directive, mixin definition properties,
 * setup the watcher, call definition bind() and update()
 * if present.
 */

Directive.prototype._bind = function () {
  var name = this.name;
  var descriptor = this.descriptor;

  // remove attribute
  if ((name !== 'cloak' || this.vm._isCompiled) && this.el && this.el.removeAttribute) {
    var attr = descriptor.attr || 'v-' + name;
    this.el.removeAttribute(attr);
  }

  // copy def properties
  var def = descriptor.def;
  if (typeof def === 'function') {
    this.update = def;
  } else {
    extend(this, def);
  }

  // setup directive params
  this._setupParams();

  // initial bind
  if (this.bind) {
    this.bind();
  }
  this._bound = true;

  if (this.literal) {
    this.update && this.update(descriptor.raw);
  } else if ((this.expression || this.modifiers) && (this.update || this.twoWay) && !this._checkStatement()) {
    // wrapped updater for context
    var dir = this;
    if (this.update) {
      this._update = function (val, oldVal) {
        if (!dir._locked) {
          dir.update(val, oldVal);
        }
      };
    } else {
      this._update = noop$1;
    }
    var preProcess = this._preProcess ? bind(this._preProcess, this) : null;
    var postProcess = this._postProcess ? bind(this._postProcess, this) : null;
    var watcher = this._watcher = new Watcher(this.vm, this.expression, this._update, // callback
    {
      filters: this.filters,
      twoWay: this.twoWay,
      deep: this.deep,
      preProcess: preProcess,
      postProcess: postProcess,
      scope: this._scope
    });
    // v-model with inital inline value need to sync back to
    // model instead of update to DOM on init. They would
    // set the afterBind hook to indicate that.
    if (this.afterBind) {
      this.afterBind();
    } else if (this.update) {
      this.update(watcher.value);
    }
  }
};

/**
 * Setup all param attributes, e.g. track-by,
 * transition-mode, etc...
 */

Directive.prototype._setupParams = function () {
  if (!this.params) {
    return;
  }
  var params = this.params;
  // swap the params array with a fresh object.
  this.params = Object.create(null);
  var i = params.length;
  var key, val, mappedKey;
  while (i--) {
    key = hyphenate(params[i]);
    mappedKey = camelize(key);
    val = getBindAttr(this.el, key);
    if (val != null) {
      // dynamic
      this._setupParamWatcher(mappedKey, val);
    } else {
      // static
      val = getAttr(this.el, key);
      if (val != null) {
        this.params[mappedKey] = val === '' ? true : val;
      }
    }
  }
};

/**
 * Setup a watcher for a dynamic param.
 *
 * @param {String} key
 * @param {String} expression
 */

Directive.prototype._setupParamWatcher = function (key, expression) {
  var self = this;
  var called = false;
  var unwatch = (this._scope || this.vm).$watch(expression, function (val, oldVal) {
    self.params[key] = val;
    // since we are in immediate mode,
    // only call the param change callbacks if this is not the first update.
    if (called) {
      var cb = self.paramWatchers && self.paramWatchers[key];
      if (cb) {
        cb.call(self, val, oldVal);
      }
    } else {
      called = true;
    }
  }, {
    immediate: true,
    user: false
  });(this._paramUnwatchFns || (this._paramUnwatchFns = [])).push(unwatch);
};

/**
 * Check if the directive is a function caller
 * and if the expression is a callable one. If both true,
 * we wrap up the expression and use it as the event
 * handler.
 *
 * e.g. on-click="a++"
 *
 * @return {Boolean}
 */

Directive.prototype._checkStatement = function () {
  var expression = this.expression;
  if (expression && this.acceptStatement && !isSimplePath(expression)) {
    var fn = parseExpression$1(expression).get;
    var scope = this._scope || this.vm;
    var handler = function handler(e) {
      scope.$event = e;
      fn.call(scope, scope);
      scope.$event = null;
    };
    if (this.filters) {
      handler = scope._applyFilters(handler, null, this.filters);
    }
    this.update(handler);
    return true;
  }
};

/**
 * Set the corresponding value with the setter.
 * This should only be used in two-way directives
 * e.g. v-model.
 *
 * @param {*} value
 * @public
 */

Directive.prototype.set = function (value) {
  /* istanbul ignore else */
  if (this.twoWay) {
    this._withLock(function () {
      this._watcher.set(value);
    });
  } else if (process.env.NODE_ENV !== 'production') {
    warn('Directive.set() can only be used inside twoWay' + 'directives.');
  }
};

/**
 * Execute a function while preventing that function from
 * triggering updates on this directive instance.
 *
 * @param {Function} fn
 */

Directive.prototype._withLock = function (fn) {
  var self = this;
  self._locked = true;
  fn.call(self);
  nextTick(function () {
    self._locked = false;
  });
};

/**
 * Convenience method that attaches a DOM event listener
 * to the directive element and autometically tears it down
 * during unbind.
 *
 * @param {String} event
 * @param {Function} handler
 * @param {Boolean} [useCapture]
 */

Directive.prototype.on = function (event, handler, useCapture) {
  on(this.el, event, handler, useCapture);(this._listeners || (this._listeners = [])).push([event, handler]);
};

/**
 * Teardown the watcher and call unbind.
 */

Directive.prototype._teardown = function () {
  if (this._bound) {
    this._bound = false;
    if (this.unbind) {
      this.unbind();
    }
    if (this._watcher) {
      this._watcher.teardown();
    }
    var listeners = this._listeners;
    var i;
    if (listeners) {
      i = listeners.length;
      while (i--) {
        off(this.el, listeners[i][0], listeners[i][1]);
      }
    }
    var unwatchFns = this._paramUnwatchFns;
    if (unwatchFns) {
      i = unwatchFns.length;
      while (i--) {
        unwatchFns[i]();
      }
    }
    if (process.env.NODE_ENV !== 'production' && this.el) {
      this.el._vue_directives.$remove(this);
    }
    this.vm = this.el = this._watcher = this._listeners = null;
  }
};

function lifecycleMixin (Vue) {
  /**
   * Update v-ref for component.
   *
   * @param {Boolean} remove
   */

  Vue.prototype._updateRef = function (remove) {
    var ref = this.$options._ref;
    if (ref) {
      var refs = (this._scope || this._context).$refs;
      if (remove) {
        if (refs[ref] === this) {
          refs[ref] = null;
        }
      } else {
        refs[ref] = this;
      }
    }
  };

  /**
   * Transclude, compile and link element.
   *
   * If a pre-compiled linker is available, that means the
   * passed in element will be pre-transcluded and compiled
   * as well - all we need to do is to call the linker.
   *
   * Otherwise we need to call transclude/compile/link here.
   *
   * @param {Element} el
   */

  Vue.prototype._compile = function (el) {
    var options = this.$options;

    // transclude and init element
    // transclude can potentially replace original
    // so we need to keep reference; this step also injects
    // the template and caches the original attributes
    // on the container node and replacer node.
    var original = el;
    el = transclude(el, options);
    this._initElement(el);

    // handle v-pre on root node (#2026)
    if (el.nodeType === 1 && getAttr(el, 'v-pre') !== null) {
      return;
    }

    // root is always compiled per-instance, because
    // container attrs and props can be different every time.
    var contextOptions = this._context && this._context.$options;
    var rootLinker = compileRoot(el, options, contextOptions);

    // resolve slot distribution
    resolveSlots(this, options._content);

    // compile and link the rest
    var contentLinkFn;
    var ctor = this.constructor;
    // component compilation can be cached
    // as long as it's not using inline-template
    if (options._linkerCachable) {
      contentLinkFn = ctor.linker;
      if (!contentLinkFn) {
        contentLinkFn = ctor.linker = compile(el, options);
      }
    }

    // link phase
    // make sure to link root with prop scope!
    var rootUnlinkFn = rootLinker(this, el, this._scope);
    var contentUnlinkFn = contentLinkFn ? contentLinkFn(this, el) : compile(el, options)(this, el);

    // register composite unlink function
    // to be called during instance destruction
    this._unlinkFn = function () {
      rootUnlinkFn();
      // passing destroying: true to avoid searching and
      // splicing the directives
      contentUnlinkFn(true);
    };

    // finally replace original
    if (options.replace) {
      replace(original, el);
    }

    this._isCompiled = true;
    this._callHook('compiled');
  };

  /**
   * Initialize instance element. Called in the public
   * $mount() method.
   *
   * @param {Element} el
   */

  Vue.prototype._initElement = function (el) {
    if (isFragment(el)) {
      this._isFragment = true;
      this.$el = this._fragmentStart = el.firstChild;
      this._fragmentEnd = el.lastChild;
      // set persisted text anchors to empty
      if (this._fragmentStart.nodeType === 3) {
        this._fragmentStart.data = this._fragmentEnd.data = '';
      }
      this._fragment = el;
    } else {
      this.$el = el;
    }
    this.$el.__vue__ = this;
    this._callHook('beforeCompile');
  };

  /**
   * Create and bind a directive to an element.
   *
   * @param {Object} descriptor - parsed directive descriptor
   * @param {Node} node   - target node
   * @param {Vue} [host] - transclusion host component
   * @param {Object} [scope] - v-for scope
   * @param {Fragment} [frag] - owner fragment
   */

  Vue.prototype._bindDir = function (descriptor, node, host, scope, frag) {
    this._directives.push(new Directive(descriptor, this, node, host, scope, frag));
  };

  /**
   * Teardown an instance, unobserves the data, unbind all the
   * directives, turn off all the event listeners, etc.
   *
   * @param {Boolean} remove - whether to remove the DOM node.
   * @param {Boolean} deferCleanup - if true, defer cleanup to
   *                                 be called later
   */

  Vue.prototype._destroy = function (remove, deferCleanup) {
    if (this._isBeingDestroyed) {
      if (!deferCleanup) {
        this._cleanup();
      }
      return;
    }

    var destroyReady;
    var pendingRemoval;

    var self = this;
    // Cleanup should be called either synchronously or asynchronoysly as
    // callback of this.$remove(), or if remove and deferCleanup are false.
    // In any case it should be called after all other removing, unbinding and
    // turning of is done
    var cleanupIfPossible = function cleanupIfPossible() {
      if (destroyReady && !pendingRemoval && !deferCleanup) {
        self._cleanup();
      }
    };

    // remove DOM element
    if (remove && this.$el) {
      pendingRemoval = true;
      this.$remove(function () {
        pendingRemoval = false;
        cleanupIfPossible();
      });
    }

    this._callHook('beforeDestroy');
    this._isBeingDestroyed = true;
    var i;
    // remove self from parent. only necessary
    // if parent is not being destroyed as well.
    var parent = this.$parent;
    if (parent && !parent._isBeingDestroyed) {
      parent.$children.$remove(this);
      // unregister ref (remove: true)
      this._updateRef(true);
    }
    // destroy all children.
    i = this.$children.length;
    while (i--) {
      this.$children[i].$destroy();
    }
    // teardown props
    if (this._propsUnlinkFn) {
      this._propsUnlinkFn();
    }
    // teardown all directives. this also tearsdown all
    // directive-owned watchers.
    if (this._unlinkFn) {
      this._unlinkFn();
    }
    i = this._watchers.length;
    while (i--) {
      this._watchers[i].teardown();
    }
    // remove reference to self on $el
    if (this.$el) {
      this.$el.__vue__ = null;
    }

    destroyReady = true;
    cleanupIfPossible();
  };

  /**
   * Clean up to ensure garbage collection.
   * This is called after the leave transition if there
   * is any.
   */

  Vue.prototype._cleanup = function () {
    if (this._isDestroyed) {
      return;
    }
    // remove self from owner fragment
    // do it in cleanup so that we can call $destroy with
    // defer right when a fragment is about to be removed.
    if (this._frag) {
      this._frag.children.$remove(this);
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (this._data && this._data.__ob__) {
      this._data.__ob__.removeVm(this);
    }
    // Clean up references to private properties and other
    // instances. preserve reference to _data so that proxy
    // accessors still work. The only potential side effect
    // here is that mutating the instance after it's destroyed
    // may affect the state of other components that are still
    // observing the same object, but that seems to be a
    // reasonable responsibility for the user rather than
    // always throwing an error on them.
    this.$el = this.$parent = this.$root = this.$children = this._watchers = this._context = this._scope = this._directives = null;
    // call the last hook...
    this._isDestroyed = true;
    this._callHook('destroyed');
    // turn off all instance listeners.
    this.$off();
  };
}

function miscMixin (Vue) {
  /**
   * Apply a list of filter (descriptors) to a value.
   * Using plain for loops here because this will be called in
   * the getter of any watcher with filters so it is very
   * performance sensitive.
   *
   * @param {*} value
   * @param {*} [oldValue]
   * @param {Array} filters
   * @param {Boolean} write
   * @return {*}
   */

  Vue.prototype._applyFilters = function (value, oldValue, filters, write) {
    var filter, fn, args, arg, offset, i, l, j, k;
    for (i = 0, l = filters.length; i < l; i++) {
      filter = filters[write ? l - i - 1 : i];
      fn = resolveAsset(this.$options, 'filters', filter.name, true);
      if (!fn) continue;
      fn = write ? fn.write : fn.read || fn;
      if (typeof fn !== 'function') continue;
      args = write ? [value, oldValue] : [value];
      offset = write ? 2 : 1;
      if (filter.args) {
        for (j = 0, k = filter.args.length; j < k; j++) {
          arg = filter.args[j];
          args[j + offset] = arg.dynamic ? this.$get(arg.value) : arg.value;
        }
      }
      value = fn.apply(this, args);
    }
    return value;
  };

  /**
   * Resolve a component, depending on whether the component
   * is defined normally or using an async factory function.
   * Resolves synchronously if already resolved, otherwise
   * resolves asynchronously and caches the resolved
   * constructor on the factory.
   *
   * @param {String|Function} value
   * @param {Function} cb
   */

  Vue.prototype._resolveComponent = function (value, cb) {
    var factory;
    if (typeof value === 'function') {
      factory = value;
    } else {
      factory = resolveAsset(this.$options, 'components', value, true);
    }
    /* istanbul ignore if */
    if (!factory) {
      return;
    }
    // async component factory
    if (!factory.options) {
      if (factory.resolved) {
        // cached
        cb(factory.resolved);
      } else if (factory.requested) {
        // pool callbacks
        factory.pendingCallbacks.push(cb);
      } else {
        factory.requested = true;
        var cbs = factory.pendingCallbacks = [cb];
        factory.call(this, function resolve(res) {
          if (isPlainObject(res)) {
            res = Vue.extend(res);
          }
          // cache resolved
          factory.resolved = res;
          // invoke callbacks
          for (var i = 0, l = cbs.length; i < l; i++) {
            cbs[i](res);
          }
        }, function reject(reason) {
          process.env.NODE_ENV !== 'production' && warn('Failed to resolve async component' + (typeof value === 'string' ? ': ' + value : '') + '. ' + (reason ? '\nReason: ' + reason : ''));
        });
      }
    } else {
      // normal component
      cb(factory);
    }
  };
}

var filterRE$1 = /[^|]\|[^|]/;

function dataAPI (Vue) {
  /**
   * Get the value from an expression on this vm.
   *
   * @param {String} exp
   * @param {Boolean} [asStatement]
   * @return {*}
   */

  Vue.prototype.$get = function (exp, asStatement) {
    var res = parseExpression$1(exp);
    if (res) {
      if (asStatement) {
        var self = this;
        return function statementHandler() {
          self.$arguments = toArray(arguments);
          var result = res.get.call(self, self);
          self.$arguments = null;
          return result;
        };
      } else {
        try {
          return res.get.call(this, this);
        } catch (e) {}
      }
    }
  };

  /**
   * Set the value from an expression on this vm.
   * The expression must be a valid left-hand
   * expression in an assignment.
   *
   * @param {String} exp
   * @param {*} val
   */

  Vue.prototype.$set = function (exp, val) {
    var res = parseExpression$1(exp, true);
    if (res && res.set) {
      res.set.call(this, this, val);
    }
  };

  /**
   * Delete a property on the VM
   *
   * @param {String} key
   */

  Vue.prototype.$delete = function (key) {
    del(this._data, key);
  };

  /**
   * Watch an expression, trigger callback when its
   * value changes.
   *
   * @param {String|Function} expOrFn
   * @param {Function} cb
   * @param {Object} [options]
   *                 - {Boolean} deep
   *                 - {Boolean} immediate
   * @return {Function} - unwatchFn
   */

  Vue.prototype.$watch = function (expOrFn, cb, options) {
    var vm = this;
    var parsed;
    if (typeof expOrFn === 'string') {
      parsed = parseDirective(expOrFn);
      expOrFn = parsed.expression;
    }
    var watcher = new Watcher(vm, expOrFn, cb, {
      deep: options && options.deep,
      sync: options && options.sync,
      filters: parsed && parsed.filters,
      user: !options || options.user !== false
    });
    if (options && options.immediate) {
      cb.call(vm, watcher.value);
    }
    return function unwatchFn() {
      watcher.teardown();
    };
  };

  /**
   * Evaluate a text directive, including filters.
   *
   * @param {String} text
   * @param {Boolean} [asStatement]
   * @return {String}
   */

  Vue.prototype.$eval = function (text, asStatement) {
    // check for filters.
    if (filterRE$1.test(text)) {
      var dir = parseDirective(text);
      // the filter regex check might give false positive
      // for pipes inside strings, so it's possible that
      // we don't get any filters here
      var val = this.$get(dir.expression, asStatement);
      return dir.filters ? this._applyFilters(val, null, dir.filters) : val;
    } else {
      // no filter
      return this.$get(text, asStatement);
    }
  };

  /**
   * Interpolate a piece of template text.
   *
   * @param {String} text
   * @return {String}
   */

  Vue.prototype.$interpolate = function (text) {
    var tokens = parseText(text);
    var vm = this;
    if (tokens) {
      if (tokens.length === 1) {
        return vm.$eval(tokens[0].value) + '';
      } else {
        return tokens.map(function (token) {
          return token.tag ? vm.$eval(token.value) : token.value;
        }).join('');
      }
    } else {
      return text;
    }
  };

  /**
   * Log instance data as a plain JS object
   * so that it is easier to inspect in console.
   * This method assumes console is available.
   *
   * @param {String} [path]
   */

  Vue.prototype.$log = function (path) {
    var data = path ? getPath(this._data, path) : this._data;
    if (data) {
      data = clean(data);
    }
    // include computed fields
    if (!path) {
      var key;
      for (key in this.$options.computed) {
        data[key] = clean(this[key]);
      }
      if (this._props) {
        for (key in this._props) {
          data[key] = clean(this[key]);
        }
      }
    }
    console.log(data);
  };

  /**
   * "clean" a getter/setter converted object into a plain
   * object copy.
   *
   * @param {Object} - obj
   * @return {Object}
   */

  function clean(obj) {
    return JSON.parse(JSON.stringify(obj));
  }
}

function domAPI (Vue) {
  /**
   * Convenience on-instance nextTick. The callback is
   * auto-bound to the instance, and this avoids component
   * modules having to rely on the global Vue.
   *
   * @param {Function} fn
   */

  Vue.prototype.$nextTick = function (fn) {
    nextTick(fn, this);
  };

  /**
   * Append instance to target
   *
   * @param {Node} target
   * @param {Function} [cb]
   * @param {Boolean} [withTransition] - defaults to true
   */

  Vue.prototype.$appendTo = function (target, cb, withTransition) {
    return insert(this, target, cb, withTransition, append, appendWithTransition);
  };

  /**
   * Prepend instance to target
   *
   * @param {Node} target
   * @param {Function} [cb]
   * @param {Boolean} [withTransition] - defaults to true
   */

  Vue.prototype.$prependTo = function (target, cb, withTransition) {
    target = query(target);
    if (target.hasChildNodes()) {
      this.$before(target.firstChild, cb, withTransition);
    } else {
      this.$appendTo(target, cb, withTransition);
    }
    return this;
  };

  /**
   * Insert instance before target
   *
   * @param {Node} target
   * @param {Function} [cb]
   * @param {Boolean} [withTransition] - defaults to true
   */

  Vue.prototype.$before = function (target, cb, withTransition) {
    return insert(this, target, cb, withTransition, beforeWithCb, beforeWithTransition);
  };

  /**
   * Insert instance after target
   *
   * @param {Node} target
   * @param {Function} [cb]
   * @param {Boolean} [withTransition] - defaults to true
   */

  Vue.prototype.$after = function (target, cb, withTransition) {
    target = query(target);
    if (target.nextSibling) {
      this.$before(target.nextSibling, cb, withTransition);
    } else {
      this.$appendTo(target.parentNode, cb, withTransition);
    }
    return this;
  };

  /**
   * Remove instance from DOM
   *
   * @param {Function} [cb]
   * @param {Boolean} [withTransition] - defaults to true
   */

  Vue.prototype.$remove = function (cb, withTransition) {
    if (!this.$el.parentNode) {
      return cb && cb();
    }
    var inDocument = this._isAttached && inDoc(this.$el);
    // if we are not in document, no need to check
    // for transitions
    if (!inDocument) withTransition = false;
    var self = this;
    var realCb = function realCb() {
      if (inDocument) self._callHook('detached');
      if (cb) cb();
    };
    if (this._isFragment) {
      removeNodeRange(this._fragmentStart, this._fragmentEnd, this, this._fragment, realCb);
    } else {
      var op = withTransition === false ? removeWithCb : removeWithTransition;
      op(this.$el, this, realCb);
    }
    return this;
  };

  /**
   * Shared DOM insertion function.
   *
   * @param {Vue} vm
   * @param {Element} target
   * @param {Function} [cb]
   * @param {Boolean} [withTransition]
   * @param {Function} op1 - op for non-transition insert
   * @param {Function} op2 - op for transition insert
   * @return vm
   */

  function insert(vm, target, cb, withTransition, op1, op2) {
    target = query(target);
    var targetIsDetached = !inDoc(target);
    var op = withTransition === false || targetIsDetached ? op1 : op2;
    var shouldCallHook = !targetIsDetached && !vm._isAttached && !inDoc(vm.$el);
    if (vm._isFragment) {
      mapNodeRange(vm._fragmentStart, vm._fragmentEnd, function (node) {
        op(node, target, vm);
      });
      cb && cb();
    } else {
      op(vm.$el, target, vm, cb);
    }
    if (shouldCallHook) {
      vm._callHook('attached');
    }
    return vm;
  }

  /**
   * Check for selectors
   *
   * @param {String|Element} el
   */

  function query(el) {
    return typeof el === 'string' ? document.querySelector(el) : el;
  }

  /**
   * Append operation that takes a callback.
   *
   * @param {Node} el
   * @param {Node} target
   * @param {Vue} vm - unused
   * @param {Function} [cb]
   */

  function append(el, target, vm, cb) {
    target.appendChild(el);
    if (cb) cb();
  }

  /**
   * InsertBefore operation that takes a callback.
   *
   * @param {Node} el
   * @param {Node} target
   * @param {Vue} vm - unused
   * @param {Function} [cb]
   */

  function beforeWithCb(el, target, vm, cb) {
    before(el, target);
    if (cb) cb();
  }

  /**
   * Remove operation that takes a callback.
   *
   * @param {Node} el
   * @param {Vue} vm - unused
   * @param {Function} [cb]
   */

  function removeWithCb(el, vm, cb) {
    remove(el);
    if (cb) cb();
  }
}

function eventsAPI (Vue) {
  /**
   * Listen on the given `event` with `fn`.
   *
   * @param {String} event
   * @param {Function} fn
   */

  Vue.prototype.$on = function (event, fn) {
    (this._events[event] || (this._events[event] = [])).push(fn);
    modifyListenerCount(this, event, 1);
    return this;
  };

  /**
   * Adds an `event` listener that will be invoked a single
   * time then automatically removed.
   *
   * @param {String} event
   * @param {Function} fn
   */

  Vue.prototype.$once = function (event, fn) {
    var self = this;
    function on() {
      self.$off(event, on);
      fn.apply(this, arguments);
    }
    on.fn = fn;
    this.$on(event, on);
    return this;
  };

  /**
   * Remove the given callback for `event` or all
   * registered callbacks.
   *
   * @param {String} event
   * @param {Function} fn
   */

  Vue.prototype.$off = function (event, fn) {
    var cbs;
    // all
    if (!arguments.length) {
      if (this.$parent) {
        for (event in this._events) {
          cbs = this._events[event];
          if (cbs) {
            modifyListenerCount(this, event, -cbs.length);
          }
        }
      }
      this._events = {};
      return this;
    }
    // specific event
    cbs = this._events[event];
    if (!cbs) {
      return this;
    }
    if (arguments.length === 1) {
      modifyListenerCount(this, event, -cbs.length);
      this._events[event] = null;
      return this;
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        modifyListenerCount(this, event, -1);
        cbs.splice(i, 1);
        break;
      }
    }
    return this;
  };

  /**
   * Trigger an event on self.
   *
   * @param {String|Object} event
   * @return {Boolean} shouldPropagate
   */

  Vue.prototype.$emit = function (event) {
    var isSource = typeof event === 'string';
    event = isSource ? event : event.name;
    var cbs = this._events[event];
    var shouldPropagate = isSource || !cbs;
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      // this is a somewhat hacky solution to the question raised
      // in #2102: for an inline component listener like <comp @test="doThis">,
      // the propagation handling is somewhat broken. Therefore we
      // need to treat these inline callbacks differently.
      var hasParentCbs = isSource && cbs.some(function (cb) {
        return cb._fromParent;
      });
      if (hasParentCbs) {
        shouldPropagate = false;
      }
      var args = toArray(arguments, 1);
      for (var i = 0, l = cbs.length; i < l; i++) {
        var cb = cbs[i];
        var res = cb.apply(this, args);
        if (res === true && (!hasParentCbs || cb._fromParent)) {
          shouldPropagate = true;
        }
      }
    }
    return shouldPropagate;
  };

  /**
   * Recursively broadcast an event to all children instances.
   *
   * @param {String|Object} event
   * @param {...*} additional arguments
   */

  Vue.prototype.$broadcast = function (event) {
    var isSource = typeof event === 'string';
    event = isSource ? event : event.name;
    // if no child has registered for this event,
    // then there's no need to broadcast.
    if (!this._eventsCount[event]) return;
    var children = this.$children;
    var args = toArray(arguments);
    if (isSource) {
      // use object event to indicate non-source emit
      // on children
      args[0] = { name: event, source: this };
    }
    for (var i = 0, l = children.length; i < l; i++) {
      var child = children[i];
      var shouldPropagate = child.$emit.apply(child, args);
      if (shouldPropagate) {
        child.$broadcast.apply(child, args);
      }
    }
    return this;
  };

  /**
   * Recursively propagate an event up the parent chain.
   *
   * @param {String} event
   * @param {...*} additional arguments
   */

  Vue.prototype.$dispatch = function (event) {
    var shouldPropagate = this.$emit.apply(this, arguments);
    if (!shouldPropagate) return;
    var parent = this.$parent;
    var args = toArray(arguments);
    // use object event to indicate non-source emit
    // on parents
    args[0] = { name: event, source: this };
    while (parent) {
      shouldPropagate = parent.$emit.apply(parent, args);
      parent = shouldPropagate ? parent.$parent : null;
    }
    return this;
  };

  /**
   * Modify the listener counts on all parents.
   * This bookkeeping allows $broadcast to return early when
   * no child has listened to a certain event.
   *
   * @param {Vue} vm
   * @param {String} event
   * @param {Number} count
   */

  var hookRE = /^hook:/;
  function modifyListenerCount(vm, event, count) {
    var parent = vm.$parent;
    // hooks do not get broadcasted so no need
    // to do bookkeeping for them
    if (!parent || !count || hookRE.test(event)) return;
    while (parent) {
      parent._eventsCount[event] = (parent._eventsCount[event] || 0) + count;
      parent = parent.$parent;
    }
  }
}

function lifecycleAPI (Vue) {
  /**
   * Set instance target element and kick off the compilation
   * process. The passed in `el` can be a selector string, an
   * existing Element, or a DocumentFragment (for block
   * instances).
   *
   * @param {Element|DocumentFragment|string} el
   * @public
   */

  Vue.prototype.$mount = function (el) {
    if (this._isCompiled) {
      process.env.NODE_ENV !== 'production' && warn('$mount() should be called only once.', this);
      return;
    }
    el = query(el);
    if (!el) {
      el = document.createElement('div');
    }
    this._compile(el);
    this._initDOMHooks();
    if (inDoc(this.$el)) {
      this._callHook('attached');
      ready.call(this);
    } else {
      this.$once('hook:attached', ready);
    }
    return this;
  };

  /**
   * Mark an instance as ready.
   */

  function ready() {
    this._isAttached = true;
    this._isReady = true;
    this._callHook('ready');
  }

  /**
   * Teardown the instance, simply delegate to the internal
   * _destroy.
   *
   * @param {Boolean} remove
   * @param {Boolean} deferCleanup
   */

  Vue.prototype.$destroy = function (remove, deferCleanup) {
    this._destroy(remove, deferCleanup);
  };

  /**
   * Partially compile a piece of DOM and return a
   * decompile function.
   *
   * @param {Element|DocumentFragment} el
   * @param {Vue} [host]
   * @param {Object} [scope]
   * @param {Fragment} [frag]
   * @return {Function}
   */

  Vue.prototype.$compile = function (el, host, scope, frag) {
    return compile(el, this.$options, true)(this, el, host, scope, frag);
  };
}

/**
 * The exposed Vue constructor.
 *
 * API conventions:
 * - public API methods/properties are prefixed with `$`
 * - internal methods/properties are prefixed with `_`
 * - non-prefixed properties are assumed to be proxied user
 *   data.
 *
 * @constructor
 * @param {Object} [options]
 * @public
 */

function Vue(options) {
  this._init(options);
}

// install internals
initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
miscMixin(Vue);

// install instance APIs
dataAPI(Vue);
domAPI(Vue);
eventsAPI(Vue);
lifecycleAPI(Vue);

var slot = {

  priority: SLOT,
  params: ['name'],

  bind: function bind() {
    // this was resolved during component transclusion
    var name = this.params.name || 'default';
    var content = this.vm._slotContents && this.vm._slotContents[name];
    if (!content || !content.hasChildNodes()) {
      this.fallback();
    } else {
      this.compile(content.cloneNode(true), this.vm._context, this.vm);
    }
  },

  compile: function compile(content, context, host) {
    if (content && context) {
      if (this.el.hasChildNodes() && content.childNodes.length === 1 && content.childNodes[0].nodeType === 1 && content.childNodes[0].hasAttribute('v-if')) {
        // if the inserted slot has v-if
        // inject fallback content as the v-else
        var elseBlock = document.createElement('template');
        elseBlock.setAttribute('v-else', '');
        elseBlock.innerHTML = this.el.innerHTML;
        // the else block should be compiled in child scope
        elseBlock._context = this.vm;
        content.appendChild(elseBlock);
      }
      var scope = host ? host._scope : this._scope;
      this.unlink = context.$compile(content, host, scope, this._frag);
    }
    if (content) {
      replace(this.el, content);
    } else {
      remove(this.el);
    }
  },

  fallback: function fallback() {
    this.compile(extractContent(this.el, true), this.vm);
  },

  unbind: function unbind() {
    if (this.unlink) {
      this.unlink();
    }
  }
};

var partial = {

  priority: PARTIAL,

  params: ['name'],

  // watch changes to name for dynamic partials
  paramWatchers: {
    name: function name(value) {
      vIf.remove.call(this);
      if (value) {
        this.insert(value);
      }
    }
  },

  bind: function bind() {
    this.anchor = createAnchor('v-partial');
    replace(this.el, this.anchor);
    this.insert(this.params.name);
  },

  insert: function insert(id) {
    var partial = resolveAsset(this.vm.$options, 'partials', id, true);
    if (partial) {
      this.factory = new FragmentFactory(this.vm, partial);
      vIf.insert.call(this);
    }
  },

  unbind: function unbind() {
    if (this.frag) {
      this.frag.destroy();
    }
  }
};

var elementDirectives = {
  slot: slot,
  partial: partial
};

var convertArray = vFor._postProcess;

/**
 * Limit filter for arrays
 *
 * @param {Number} n
 * @param {Number} offset (Decimal expected)
 */

function limitBy(arr, n, offset) {
  offset = offset ? parseInt(offset, 10) : 0;
  n = toNumber(n);
  return typeof n === 'number' ? arr.slice(offset, offset + n) : arr;
}

/**
 * Filter filter for arrays
 *
 * @param {String} search
 * @param {String} [delimiter]
 * @param {String} ...dataKeys
 */

function filterBy(arr, search, delimiter) {
  arr = convertArray(arr);
  if (search == null) {
    return arr;
  }
  if (typeof search === 'function') {
    return arr.filter(search);
  }
  // cast to lowercase string
  search = ('' + search).toLowerCase();
  // allow optional `in` delimiter
  // because why not
  var n = delimiter === 'in' ? 3 : 2;
  // extract and flatten keys
  var keys = Array.prototype.concat.apply([], toArray(arguments, n));
  var res = [];
  var item, key, val, j;
  for (var i = 0, l = arr.length; i < l; i++) {
    item = arr[i];
    val = item && item.$value || item;
    j = keys.length;
    if (j) {
      while (j--) {
        key = keys[j];
        if (key === '$key' && contains(item.$key, search) || contains(getPath(val, key), search)) {
          res.push(item);
          break;
        }
      }
    } else if (contains(item, search)) {
      res.push(item);
    }
  }
  return res;
}

/**
 * Order filter for arrays
 *
 * @param {String|Array<String>|Function} ...sortKeys
 * @param {Number} [order]
 */

function orderBy(arr) {
  var comparator = null;
  var sortKeys = undefined;
  arr = convertArray(arr);

  // determine order (last argument)
  var args = toArray(arguments, 1);
  var order = args[args.length - 1];
  if (typeof order === 'number') {
    order = order < 0 ? -1 : 1;
    args = args.length > 1 ? args.slice(0, -1) : args;
  } else {
    order = 1;
  }

  // determine sortKeys & comparator
  var firstArg = args[0];
  if (!firstArg) {
    return arr;
  } else if (typeof firstArg === 'function') {
    // custom comparator
    comparator = function (a, b) {
      return firstArg(a, b) * order;
    };
  } else {
    // string keys. flatten first
    sortKeys = Array.prototype.concat.apply([], args);
    comparator = function (a, b, i) {
      i = i || 0;
      return i >= sortKeys.length - 1 ? baseCompare(a, b, i) : baseCompare(a, b, i) || comparator(a, b, i + 1);
    };
  }

  function baseCompare(a, b, sortKeyIndex) {
    var sortKey = sortKeys[sortKeyIndex];
    if (sortKey) {
      if (sortKey !== '$key') {
        if (isObject(a) && '$value' in a) a = a.$value;
        if (isObject(b) && '$value' in b) b = b.$value;
      }
      a = isObject(a) ? getPath(a, sortKey) : a;
      b = isObject(b) ? getPath(b, sortKey) : b;
    }
    return a === b ? 0 : a > b ? order : -order;
  }

  // sort on a copy to avoid mutating original array
  return arr.slice().sort(comparator);
}

/**
 * String contain helper
 *
 * @param {*} val
 * @param {String} search
 */

function contains(val, search) {
  var i;
  if (isPlainObject(val)) {
    var keys = Object.keys(val);
    i = keys.length;
    while (i--) {
      if (contains(val[keys[i]], search)) {
        return true;
      }
    }
  } else if (isArray(val)) {
    i = val.length;
    while (i--) {
      if (contains(val[i], search)) {
        return true;
      }
    }
  } else if (val != null) {
    return val.toString().toLowerCase().indexOf(search) > -1;
  }
}

var digitsRE = /(\d{3})(?=\d)/g;

// asset collections must be a plain object.
var filters = {

  orderBy: orderBy,
  filterBy: filterBy,
  limitBy: limitBy,

  /**
   * Stringify value.
   *
   * @param {Number} indent
   */

  json: {
    read: function read(value, indent) {
      return typeof value === 'string' ? value : JSON.stringify(value, null, arguments.length > 1 ? indent : 2);
    },
    write: function write(value) {
      try {
        return JSON.parse(value);
      } catch (e) {
        return value;
      }
    }
  },

  /**
   * 'abc' => 'Abc'
   */

  capitalize: function capitalize(value) {
    if (!value && value !== 0) return '';
    value = value.toString();
    return value.charAt(0).toUpperCase() + value.slice(1);
  },

  /**
   * 'abc' => 'ABC'
   */

  uppercase: function uppercase(value) {
    return value || value === 0 ? value.toString().toUpperCase() : '';
  },

  /**
   * 'AbC' => 'abc'
   */

  lowercase: function lowercase(value) {
    return value || value === 0 ? value.toString().toLowerCase() : '';
  },

  /**
   * 12345 => $12,345.00
   *
   * @param {String} sign
   * @param {Number} decimals Decimal places
   */

  currency: function currency(value, _currency, decimals) {
    value = parseFloat(value);
    if (!isFinite(value) || !value && value !== 0) return '';
    _currency = _currency != null ? _currency : '$';
    decimals = decimals != null ? decimals : 2;
    var stringified = Math.abs(value).toFixed(decimals);
    var _int = decimals ? stringified.slice(0, -1 - decimals) : stringified;
    var i = _int.length % 3;
    var head = i > 0 ? _int.slice(0, i) + (_int.length > 3 ? ',' : '') : '';
    var _float = decimals ? stringified.slice(-1 - decimals) : '';
    var sign = value < 0 ? '-' : '';
    return sign + _currency + head + _int.slice(i).replace(digitsRE, '$1,') + _float;
  },

  /**
   * 'item' => 'items'
   *
   * @params
   *  an array of strings corresponding to
   *  the single, double, triple ... forms of the word to
   *  be pluralized. When the number to be pluralized
   *  exceeds the length of the args, it will use the last
   *  entry in the array.
   *
   *  e.g. ['single', 'double', 'triple', 'multiple']
   */

  pluralize: function pluralize(value) {
    var args = toArray(arguments, 1);
    var length = args.length;
    if (length > 1) {
      var index = value % 10 - 1;
      return index in args ? args[index] : args[length - 1];
    } else {
      return args[0] + (value === 1 ? '' : 's');
    }
  },

  /**
   * Debounce a handler function.
   *
   * @param {Function} handler
   * @param {Number} delay = 300
   * @return {Function}
   */

  debounce: function debounce(handler, delay) {
    if (!handler) return;
    if (!delay) {
      delay = 300;
    }
    return _debounce(handler, delay);
  }
};

function installGlobalAPI (Vue) {
  /**
   * Vue and every constructor that extends Vue has an
   * associated options object, which can be accessed during
   * compilation steps as `this.constructor.options`.
   *
   * These can be seen as the default options of every
   * Vue instance.
   */

  Vue.options = {
    directives: directives,
    elementDirectives: elementDirectives,
    filters: filters,
    transitions: {},
    components: {},
    partials: {},
    replace: true
  };

  /**
   * Expose useful internals
   */

  Vue.util = util;
  Vue.config = config;
  Vue.set = set;
  Vue['delete'] = del;
  Vue.nextTick = nextTick;

  /**
   * The following are exposed for advanced usage / plugins
   */

  Vue.compiler = compiler;
  Vue.FragmentFactory = FragmentFactory;
  Vue.internalDirectives = internalDirectives;
  Vue.parsers = {
    path: path,
    text: text,
    template: template,
    directive: directive,
    expression: expression
  };

  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */

  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   *
   * @param {Object} extendOptions
   */

  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var isFirstExtend = Super.cid === 0;
    if (isFirstExtend && extendOptions._Ctor) {
      return extendOptions._Ctor;
    }
    var name = extendOptions.name || Super.options.name;
    if (process.env.NODE_ENV !== 'production') {
      if (!/^[a-zA-Z][\w-]*$/.test(name)) {
        warn('Invalid component name: "' + name + '". Component names ' + 'can only contain alphanumeric characaters and the hyphen.');
        name = null;
      }
    }
    var Sub = createClass(name || 'VueComponent');
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(Super.options, extendOptions);
    Sub['super'] = Super;
    // allow further extension
    Sub.extend = Super.extend;
    // create asset registers, so extended classes
    // can have their private assets too.
    config._assetTypes.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }
    // cache constructor
    if (isFirstExtend) {
      extendOptions._Ctor = Sub;
    }
    return Sub;
  };

  /**
   * A function that returns a sub-class constructor with the
   * given name. This gives us much nicer output when
   * logging instances in the console.
   *
   * @param {String} name
   * @return {Function}
   */

  function createClass(name) {
    /* eslint-disable no-new-func */
    return new Function('return function ' + classify(name) + ' (options) { this._init(options) }')();
    /* eslint-enable no-new-func */
  }

  /**
   * Plugin system
   *
   * @param {Object} plugin
   */

  Vue.use = function (plugin) {
    /* istanbul ignore if */
    if (plugin.installed) {
      return;
    }
    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else {
      plugin.apply(null, args);
    }
    plugin.installed = true;
    return this;
  };

  /**
   * Apply a global mixin by merging it into the default
   * options.
   */

  Vue.mixin = function (mixin) {
    Vue.options = mergeOptions(Vue.options, mixin);
  };

  /**
   * Create asset registration methods with the following
   * signature:
   *
   * @param {String} id
   * @param {*} definition
   */

  config._assetTypes.forEach(function (type) {
    Vue[type] = function (id, definition) {
      if (!definition) {
        return this.options[type + 's'][id];
      } else {
        /* istanbul ignore if */
        if (process.env.NODE_ENV !== 'production') {
          if (type === 'component' && (commonTagRE.test(id) || reservedTagRE.test(id))) {
            warn('Do not use built-in or reserved HTML elements as component ' + 'id: ' + id);
          }
        }
        if (type === 'component' && isPlainObject(definition)) {
          if (!definition.name) {
            definition.name = id;
          }
          definition = Vue.extend(definition);
        }
        this.options[type + 's'][id] = definition;
        return definition;
      }
    };
  });

  // expose internal transition API
  extend(Vue.transition, transition);
}

installGlobalAPI(Vue);

Vue.version = '1.0.28';

// devtools global hook
/* istanbul ignore next */
setTimeout(function () {
  if (config.devtools) {
    if (devtools) {
      devtools.emit('init', Vue);
    } else if (process.env.NODE_ENV !== 'production' && inBrowser && /Chrome\/\d+/.test(window.navigator.userAgent)) {
      console.log('Download the Vue Devtools for a better development experience:\n' + 'https://github.com/vuejs/vue-devtools');
    }
  }
}, 0);

module.exports = Vue;
}).call(this,require('_process'))
},{"_process":85}],90:[function(require,module,exports){
var inserted = exports.cache = {}

exports.insert = function (css) {
  if (inserted[css]) return
  inserted[css] = true

  var elem = document.createElement('style')
  elem.setAttribute('type', 'text/css')

  if ('textContent' in elem) {
    elem.textContent = css
  } else {
    elem.styleSheet.cssText = css
  }

  document.getElementsByTagName('head')[0].appendChild(elem)
  return elem
}

},{}],91:[function(require,module,exports){
'use strict';

var _App = require('./modules/App.js');

var _App2 = _interopRequireDefault(_App);

var _vue = require('vue');

var _vue2 = _interopRequireDefault(_vue);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _calendarBlock = require('./vuecomponents/calendar-block.vue');

var _calendarBlock2 = _interopRequireDefault(_calendarBlock);

var _ChatVue = require('./vuecomponents/ChatVue.js');

var _ChatVue2 = _interopRequireDefault(_ChatVue);

var _EditingModalVue = require('./vuecomponents/EditingModalVue.js');

var _EditingModalVue2 = _interopRequireDefault(_EditingModalVue);

var _UserInfoVue = require('./vuecomponents/UserInfoVue.js');

var _UserInfoVue2 = _interopRequireDefault(_UserInfoVue);

var _ServicesVue = require('./vuecomponents/ServicesVue.js');

var _ServicesVue2 = _interopRequireDefault(_ServicesVue);

var _HeaderVue = require('./vuecomponents/HeaderVue.js');

var _HeaderVue2 = _interopRequireDefault(_HeaderVue);

var _TariffsVue = require('./vuecomponents/TariffsVue.js');

var _TariffsVue2 = _interopRequireDefault(_TariffsVue);

var _DashboardVue = require('./vuecomponents/DashboardVue.js');

var _DashboardVue2 = _interopRequireDefault(_DashboardVue);

var _LogoVue = require('./vuecomponents/LogoVue.js');

var _LogoVue2 = _interopRequireDefault(_LogoVue);

var _OrdersVue = require('./vuecomponents/OrdersVue.js');

var _OrdersVue2 = _interopRequireDefault(_OrdersVue);

var _SidebarVue = require('./vuecomponents/SidebarVue.js');

var _SidebarVue2 = _interopRequireDefault(_SidebarVue);

var _FirmDetailsVue = require('./vuecomponents/FirmDetailsVue.js');

var _FirmDetailsVue2 = _interopRequireDefault(_FirmDetailsVue);

var _TariffVue = require('./vuecomponents/TariffVue.js');

var _TariffVue2 = _interopRequireDefault(_TariffVue);

var _BillingVue = require('./vuecomponents/BillingVue.js');

var _BillingVue2 = _interopRequireDefault(_BillingVue);

var _NewsletterVue = require('./vuecomponents/NewsletterVue.js');

var _NewsletterVue2 = _interopRequireDefault(_NewsletterVue);

var _EmployeesListVue = require('./vuecomponents/EmployeesListVue.js');

var _EmployeesListVue2 = _interopRequireDefault(_EmployeesListVue);

var _AssistantVue = require('./vuecomponents/AssistantVue.vue');

var _AssistantVue2 = _interopRequireDefault(_AssistantVue);

var _SmsinfoVue = require('./vuecomponents/SmsinfoVue.js');

var _SmsinfoVue2 = _interopRequireDefault(_SmsinfoVue);

var _CreateEmployeeVue = require('./vuecomponents/CreateEmployeeVue.js');

var _CreateEmployeeVue2 = _interopRequireDefault(_CreateEmployeeVue);

var _DirectorstatsVue = require('./vuecomponents/DirectorstatsVue.js');

var _DirectorstatsVue2 = _interopRequireDefault(_DirectorstatsVue);

var _HeaderTimeVue = require('./vuecomponents/HeaderTimeVue.vue');

var _HeaderTimeVue2 = _interopRequireDefault(_HeaderTimeVue);

var _SettingsKalendarVue = require('./vuecomponents/SettingsKalendarVue.js');

var _SettingsKalendarVue2 = _interopRequireDefault(_SettingsKalendarVue);

var _Alert = require('./vuecomponents/vue-strap/src/Alert.vue');

var _Alert2 = _interopRequireDefault(_Alert);

var _index = require('./components/employees/index.js');

var _index2 = _interopRequireDefault(_index);

var _create = require('./components/employees/create.js');

var _create2 = _interopRequireDefault(_create);

var _index3 = require('./components/code/index.js');

var _index4 = _interopRequireDefault(_index3);

var _edit = require('./components/code/edit.js');

var _edit2 = _interopRequireDefault(_edit);

var _vueI18n = require('vue-i18n');

var _vueI18n2 = _interopRequireDefault(_vueI18n);

var _vueResource = require('vue-resource');

var _vueResource2 = _interopRequireDefault(_vueResource);

var _ajax = require('./ajax.js');

var ajax = _interopRequireWildcard(_ajax);

var _lang = require('./lang.js');

require('./i18n/datepicker-ru');

require('./i18n/datepicker-de');

require('./i18n/datepicker-en-AU');

require('moment/locale/de');

require('moment/locale/en-au');

require('moment/locale/ru');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_vue2.default.use(_vueResource2.default);
_vue2.default.use(_vueI18n2.default);

var locale = 'de';

_vue2.default.config.lang = locale;

// set locales
Object.keys(_lang.LOCALES).forEach(function (lang) {
  _vue2.default.locale(lang, _lang.LOCALES[lang]);
});

$(document).ready(function () {

  $.ajaxSetup({
    headers: {
      'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
  });
  _vue2.default.http.headers.common['X-CSRF-TOKEN'] = $('meta[name="csrf-token"]').attr('content');
  _vue2.default.http.options.emulateJSON = true;
  new _vue2.default({
    el: 'body',

    data: function data() {
      return {
        locale: $('meta[name="locale"]').attr('content'),
        showCreateEmplAlert: false
      };
    },


    components: {
      CalendarBlock: _calendarBlock2.default,
      ChatVue: _ChatVue2.default,
      EditingModalVue: _EditingModalVue2.default,
      UserInfoVue: _UserInfoVue2.default,
      ServicesVue: _ServicesVue2.default,
      HeaderVue: _HeaderVue2.default,
      TariffsVue: _TariffsVue2.default,
      DashboardVue: _DashboardVue2.default,
      LogoVue: _LogoVue2.default,
      OrdersVue: _OrdersVue2.default,
      SidebarVue: _SidebarVue2.default,
      FirmDetailsVue: _FirmDetailsVue2.default,
      TariffVue: _TariffVue2.default,
      BillingVue: _BillingVue2.default,
      NewsletterVue: _NewsletterVue2.default,
      AssistantVue: _AssistantVue2.default,
      HeaderTimeVue: _HeaderTimeVue2.default,
      SettingsKalendarVue: _SettingsKalendarVue2.default,
      Alert: _Alert2.default,
      SmsinfoVue: _SmsinfoVue2.default,
      DirectorstatsVue: _DirectorstatsVue2.default,
      EmployeesListVue: _EmployeesListVue2.default,
      CreateEmployeeVue: _CreateEmployeeVue2.default,
      EmployeeIndex: _index2.default,
      EmployeeCreateNewVue: _create2.default,
      CodeIndexVue: _index4.default,
      CodeEditVue: _edit2.default
    },

    ready: function ready() {
      console.log('vue init');
      $('#sitePreloader').fadeOut('slow', function () {
        $(this).remove();
      });
      this.changeLang();
      $.datepicker.setDefaults($.datepicker.regional[this.locale]);
      this.timePickerInit();
      _moment2.default.locale(this.locale);
    },


    methods: {
      goTo: function goTo(link) {
        window.location.href = link;
      },
      timePickerInit: function timePickerInit() {

        $.timepicker.regional['ru'] = {
          timeOnlyTitle: 'Выберите время',
          timeText: 'Время',
          hourText: 'Часы',
          minuteText: 'Минуты',
          secondText: 'Секунды',
          millisecText: 'Миллисекунды',
          timezoneText: 'Часовой пояс',
          currentText: 'Сейчас',
          closeText: 'Закрыть',
          timeFormat: 'HH:mm',
          amNames: ['AM', 'A'],
          pmNames: ['PM', 'P'],
          isRTL: false
        };

        $.timepicker.regional['de'] = {
          timeOnlyTitle: 'Wählen Sie Zeit',
          timeText: 'Zeit',
          hourText: 'Uhr',
          minuteText: 'Minuten',
          secondText: 'Sekunden',
          millisecText: 'Millisekunde',
          timezoneText: 'Zeitzone',
          currentText: 'im Moment',
          closeText: 'schließen',
          timeFormat: 'HH:mm',
          amNames: ['AM', 'A'],
          pmNames: ['PM', 'P'],
          isRTL: false
        };

        $.timepicker.regional['en'] = {
          timeOnlyTitle: 'Select time',
          timeText: 'Time',
          hourText: 'Hours',
          minuteText: 'Minutes',
          secondText: 'Seconds',
          millisecText: 'Millisecond',
          timezoneText: 'Timezone',
          currentText: 'Now',
          closeText: 'Close',
          timeFormat: 'HH:mm',
          amNames: ['AM', 'A'],
          pmNames: ['PM', 'P'],
          isRTL: false
        };

        $.timepicker.setDefaults($.timepicker.regional[this.locale]);

        $('.worktime-timepicker, .kalendar-form__timepicker').timepicker({
          stepMinute: 15,
          defaultValue: '8:00',
          timeFormat: 'H:mm'
        });
      },
      changeLang: function changeLang() {
        var locale = this.locale ? this.locale : 'de';

        _vue2.default.config.lang = locale;

        // set locales
        Object.keys(_lang.LOCALES).forEach(function (lang) {
          _vue2.default.locale(lang, _lang.LOCALES[lang]);
        });
      },
      openModal: function openModal() {
        var modalStr = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '.remodal';

        var modal = $(modalStr).remodal();
        modal.open();
      },
      changeLocale: function changeLocale() {
        window.location = '/' + ajax.pathWho + '/set_locale/' + this.locale;
      },
      closeModal: function closeModal() {
        var modalStr = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '.remodal';

        var modal = $(modalStr).remodal();
        modal.close();
      },
      checkEmail: function checkEmail(e) {
        var path = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '/office/employees/check_email';

        var $target = $(e.target);
        var value = $target.val();
        var $btn = $target.closest('form').find('.btn[type="submit"]');
        var errorMess = '\n          <br><div class="vue-error email-error">\n            E -Mail nicht verf\xFCgbar ist, w\xE4hlen Sie einen anderen.\n          </div>\n        ';
        var data = {
          email: value
        };

        ajax.sendAjax(data, path).done(function (res) {
          $('.email-error').remove();
          $btn.prop('disabled', false).removeClass('is-disabled');

          if (!res) {
            $target.after(errorMess);
            $btn.prop('disabled', true).addClass('is-disabled');
          }
        });
      }
    },

    events: {
      newMess: function newMess() {
        this.$broadcast('newMess');
      },
      openModal: function openModal() {
        var modal = $('.remodal').remodal();
        modal.open();
      },
      closeModal: function closeModal() {
        var modal = $('.remodal').remodal();
        modal.close();
      }
    }
  });

  _App2.default.init();

  //select init
  $('.select, .checkbox, .input').styler();

  //Datepicker init
  $('.input-date').datepicker({
    firstDay: 1,
    dateFormat: 'dd/mm/yy',
    changeMonth: true,
    changeYear: true,
    yearRange: "-100:+0"
  });

  //SETTINGS ------------------------------------------------------------------

  $(document).on({
    'mouseenter': function mouseenter() {
      var $this = $(this);
      var $settingsIco = $this.find('.settings__ico');
      $settingsIco.addClass('is-hover').closest('.settings').find('.settings__list').show();
    },

    'mouseleave': function mouseleave() {
      var $this = $(this);
      var $settingsIco = $this.find('.settings__ico');
      $settingsIco.removeClass('is-hover').closest('.settings').find('.settings__list').hide();
    }
  }, '.settings');

  //SLICK ----------------------------------------------------------------------------

  if ($('.kalendar-carousel').length) {
    $('.kalendar-carousel').slick({
      slidesToShow: 11,
      prevArrow: '<div class="kalendar-carousel__prev"><i></i></div>',
      nextArrow: '<div class="kalendar-carousel__next"><i></i></div>'
    });
  }

  //-------------------------------------------------------------------------------------------

  var flag = true;

  var token = $(".draft-email");

  var tokObj = [];
  token.each(function () {
    tokObj.push({ id: $(this).data('draft-id'), name: $(this).data('draft-email') });
  });

  $("#inputClient").tokenInput("/office/get_client_email", {
    theme: "facebook",
    tokenLimit: null,
    prePopulate: tokObj
  });

  $("#inputAdmin").tokenInput('/' + ajax.pathWho + '/get_admin_email', {
    theme: "facebook",
    tokenLimit: null,
    prePopulate: tokObj
  });

  $('.radio').on('change', function (event) {
    switch (event.currentTarget.defaultValue) {
      case 'all':
        $(".clients").hide();
        break;
      case 'some':
        $(".clients").show();
        break;
    }
  });

  //preview modal for newsletter
  var modal = $('#mailModal').remodal();
  var vorschau = $('#vorschau');
  vorschau.on('click', function () {
    $('.kalendar-form__input--betref').val($('#betreff').val());
    $('.kalendar-form__input--von').val($('#von').val());
    $('.kalendar-form__input--signatur').val($('.clients p').html());
    $('.kalendar-form__input--text').html(CKEDITOR.instances.text.getData());
    modal.open();
  });

  $('input[name="img"]').on('change', function (input) {

    if (this.files && this.files[0]) {
      var reader = new FileReader();

      reader.onload = function (e) {
        $('#blah').attr('src', e.target.result).style('width: 100%');
      };

      reader.readAsDataURL(this.files[0]);
    }
  });

  $('#speichern').click(function () {
    $('.form-article').attr('action', 'newsletter_save');
    $('.form-article').submit();
  });

  $('.delete-slide').on('click', function (e) {
    return confirm('Are you shure?');
  });

  //TABLE SORTER FOR ADMIN

  $.tablesorter.addParser({
    id: 'checkbox',
    is: function is(s, table, cell) {
      return $(cell).find('input[type="checkbox"]').length > 0;
    },
    format: function format(s, table, cell) {
      return $(cell).find('input:checked').length > 0 ? 0 : 1;
    },
    type: "numeric"
  });

  if ($("#clients-table").find("tr").size() > 1) {
    $("#clients-table").tablesorter();
  }

  if ($("#client-orders-list").find("tr").size() > 1) {
    $("#client-orders-list").tablesorter();
  }

  if ($("#newsletter-table").find("tr").size() > 1) {
    $("#newsletter-table").tablesorter();
  }

  if ($("#profil-services-table").find("tr").size() > 1) {
    $("#profil-services-table").tablesorter({ "headers": { "2": { "sorter": "checkbox" } } });
  }

  if ($("#calendar-table").find("tr").size() > 1) {
    $("#calendar-table").tablesorter({ dateFormat: "uk" });
  }

  $('#admin-to-empl').on('click', function (e) {
    e.preventDefault();
    $('#admin-to-empl-section').show();
  });

  $('#empl-to-admin').on('click', function (e) {
    e.preventDefault();
    if (confirm('Are you shure?')) {
      $('#empl-to-admin-section').hide();
    }

    $.ajax({
      url: '/office/profil_admin/to_admin',
      type: 'POST',
      dataType: 'Json',
      success: function success(response) {
        location.reload();
      }
    });
  });

  // menu tabs smsinfo
  $('.nav_sms_menu li').click(function () {
    var attrSms = $(this).attr('data-tab');
    console.log($('.all_sms_info_block').children('tab_content').removeClass('is-active'));
    $('.nav_sms_menu li').removeClass('is-active');
    $(this).addClass('is-active');
    $('.all_sms_info_block').find('[data-tab-id]').removeClass('is-active');
    $('.all_sms_info_block').find('[data-tab-id=' + attrSms + ']').addClass('is-active');
  });

  // $('.single_tarif').click(function() {
  //   $('.all_tarifs').removeClass('active');
  //   $('.detail_info').addClass('active');
  // });
});

},{"./ajax.js":92,"./components/code/edit.js":93,"./components/code/index.js":94,"./components/employees/create.js":96,"./components/employees/index.js":97,"./i18n/datepicker-de":100,"./i18n/datepicker-en-AU":101,"./i18n/datepicker-ru":102,"./lang.js":103,"./modules/App.js":106,"./vuecomponents/AssistantVue.vue":114,"./vuecomponents/BillingVue.js":115,"./vuecomponents/ChatVue.js":116,"./vuecomponents/CreateEmployeeVue.js":118,"./vuecomponents/DashboardVue.js":119,"./vuecomponents/DirectorstatsVue.js":120,"./vuecomponents/EditingModalVue.js":121,"./vuecomponents/EmployeesListVue.js":122,"./vuecomponents/FirmDetailsVue.js":123,"./vuecomponents/HeaderTimeVue.vue":124,"./vuecomponents/HeaderVue.js":125,"./vuecomponents/LogoVue.js":126,"./vuecomponents/NewsletterVue.js":127,"./vuecomponents/OrdersVue.js":128,"./vuecomponents/ServicesVue.js":130,"./vuecomponents/SettingsKalendarVue.js":131,"./vuecomponents/SidebarVue.js":132,"./vuecomponents/SmsinfoVue.js":133,"./vuecomponents/TariffVue.js":134,"./vuecomponents/TariffsVue.js":135,"./vuecomponents/UserInfoVue.js":136,"./vuecomponents/calendar-block.vue":138,"./vuecomponents/vue-strap/src/Alert.vue":140,"moment":84,"moment/locale/de":81,"moment/locale/en-au":82,"moment/locale/ru":83,"vue":89,"vue-i18n":87,"vue-resource":88}],92:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getEmployees = getEmployees;
exports.checkEmail = checkEmail;
exports.carts = carts;
exports.sendAjax = sendAjax;
exports.checkEmployee = checkEmployee;
exports.getServices = getServices;
exports.sendForm = sendForm;
exports.sendHoliday = sendHoliday;
exports.getFormData = getFormData;
exports.getToken = getToken;
var LOCPATH = exports.LOCPATH = window.location.pathname;

var pathWho = exports.pathWho = void 0;

if (LOCPATH.indexOf('/backend') > -1) {
  exports.pathWho = pathWho = 'backend';
} else {
  exports.pathWho = pathWho = 'office';
}

function getEmployees(data) {
  var req = $.ajax({
    type: 'POST',
    url: '/office/get_employees',
    dataType: 'JSON',
    data: data
  });
  return req;
}

function checkEmail(data) {
  var req = $.ajax({
    type: 'POST',
    url: '/office/check_email',
    dataType: 'JSON',
    data: data
  });
  return req;
}

function carts(data) {
  var req = $.ajax({
    type: 'POST',
    url: '/office/get_calendar',
    dataType: 'JSON',
    data: data
  });
  return req;
}

function sendAjax(data, path) {
  var req = $.ajax({
    type: 'POST',
    url: path,
    dataType: 'JSON',
    data: data
  });
  return req;
}

function checkEmployee(data) {
  var req = $.ajax({
    type: 'POST',
    url: '/office/check_employee',
    dataType: 'JSON',
    data: data
  });
  return req;
}

function getServices(data) {
  var req = $.ajax({
    type: 'POST',
    url: '/office/get_services',
    dataType: 'JSON',
    data: data
  });
  return req;
}

function sendForm(data) {
  var req = $.ajax({
    type: 'POST',
    url: '/office/add_calendar',
    dataType: 'JSON',
    data: data
  });
  return req;
}

function sendHoliday(data) {
  var req = $.ajax({
    type: 'POST',
    url: '/office/add_holiday',
    dataType: 'JSON',
    data: data
  });
  return req;
}

function getFormData($form) {
  var unindexed_array = $form.serializeArray();
  var indexed_array = {};

  $.map(unindexed_array, function (n, i) {
    indexed_array[n['name']] = n['value'];
  });

  return indexed_array;
}

function getToken() {
  return $('meta[name="csrf-token"]').attr('content');
}

},{}],93:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _vue = require('vue');

var _vue2 = _interopRequireDefault(_vue);

var _info = require('./info.js');

var _info2 = _interopRequireDefault(_info);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CodeEditVue = _vue2.default.component('code-edit-vue', {

    template: '#code-edit-template',

    components: {
        CodeInfoVue: _info2.default
    },

    props: {
        id: String,
        module: String
    },

    created: function created() {},
    ready: function ready() {},
    data: function data() {

        return {};
    },


    methods: {
        trySendForm: function trySendForm(event) {
            var is_button = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;


            var $form = is_button ? $(event.target).closest('form') : $(event.target);

            $form.validate({
                rules: {
                    code: {
                        required: true
                    },
                    category: {
                        required: true
                    },
                    type: {
                        required: true
                    },
                    count: {
                        required: true
                    },
                    value: {
                        required: true
                    },
                    expired_at: {
                        required: true
                    },
                    from: {
                        required: true
                    },
                    to: {
                        required: true
                    }
                }
            });

            if ($form.valid()) {

                this.submitForm($form);
            }
        },
        submitForm: function submitForm($form) {

            $.ajax({
                url: $form.attr('action'),
                type: $form.attr('method'),
                data: $form.serialize()
            }).done(function (response) {

                if (response.status) {

                    window.location.href = response.redirect;
                }
            }).error(function () {
                console.log('error');
            });
        }
    },

    events: {},

    watch: {}

});

exports.default = CodeEditVue;

},{"./info.js":95,"vue":89}],94:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _vue = require('vue');

var _vue2 = _interopRequireDefault(_vue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CodeIndexVue = _vue2.default.component('code-index-vue', {

    template: '#code-index-template',

    components: {},

    props: {
        module: String
    },

    data: function data() {

        return {

            loaded: false,
            list: []

        };
    },
    created: function created() {

        this.init();
    },
    ready: function ready() {},


    methods: {
        init: function init() {
            var _this = this;

            this.$http.get('/backend/' + this.module + '/getList').then(function (response) {

                _this.list = response.data;
            }).catch(function () {

                console.log('error');
            });
        },
        deleteRow: function deleteRow(id, event) {

            this.$http.delete('/backend/' + this.module + '/' + id).then(function (response) {

                $(event.target).closest('tr').remove();
            }).catch(function () {
                console.log('error');
            });
        }
    },

    events: {},

    watch: {}

});

exports.default = CodeIndexVue;

},{"vue":89}],95:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _vue = require('vue');

var _vue2 = _interopRequireDefault(_vue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CodeInfoVue = _vue2.default.component('code-info-vue', {

    template: '#code-info-template',

    components: {},

    props: {
        id: String,
        module: String
    },

    created: function created() {

        this.getData();
    },
    ready: function ready() {},
    data: function data() {

        return {

            info: {},
            categories: {},
            types: {},
            count: {},
            showing_count: {},

            code: "",
            category: "",
            type: "",
            selected_count: "",
            period: "",

            show_count: false,
            show_period: false,
            show_value: false,

            value_label: false,
            default_value_label: "value",

            translations: {
                value: ""
            },

            settings: {
                sms: {
                    present: {
                        count: false,
                        period: false,
                        value: true
                    },
                    discount: {
                        count: {
                            percent: false,
                            currency: false
                        },
                        period: true,
                        value: true
                    }
                },
                tariff: {
                    present: {
                        count: false,
                        period: true,
                        value: false
                    },
                    discount: {
                        count: {
                            percent: false,
                            currency: false
                        },
                        period: true,
                        value: true
                    }
                },
                employee: {
                    present: {
                        count: {
                            considered: "considered"
                        },
                        period: true,
                        value: true
                    },
                    discount: {
                        count: {
                            percent: false,
                            currency: false
                        },
                        period: true,
                        value: true
                    }
                }
            },

            // options
            show_individual_calendar: false

        };
    },


    methods: {
        generateCode: function generateCode(event) {
            var length = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 10;


            var result = '',
                chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

            for (var i = length; i > 0; --i) {

                result += chars[Math.floor(Math.random() * chars.length)];
            }

            this.code = result;
        },
        getData: function getData() {
            var _this = this;

            this.$http.get('/backend/' + this.module + '/getData', { id: this.id }).then(function (response) {

                _this.categories = response.data.categories;

                _this.types = response.data.types;

                _this.count = response.data.count;

                _this.info = response.data.info;

                _this.translations = response.data.translations;

                _this.code = _this.info.code;

                _this.category = _this.info.category;

                _this.type = _this.info.type;

                _this.period = _this.info.period;

                _this.selected_count = _this.info.count;

                if (_this.code.length) {

                    _this.sortCount();
                }

                _this.getValueLabel();
            }).catch(function () {

                console.log('error');
            });
        },
        sortCount: function sortCount() {

            this.showing_count = {};

            this.show_count = false;

            var counter = false,
                keys = false;

            try {

                keys = Object.keys(this.settings[this.info.category][this.info.type]['count']);
            } catch (err) {

                keys = [];
            }

            for (var index in this.count) {

                if (keys.indexOf(index) >= 0) {

                    this.showing_count[index] = this.count[index];

                    counter = true;
                }
            }

            if (counter) {

                this.show_count = true;
            } else {

                this.selected_count = null;
            }

            this.getValueLabel();

            this.showPeriod();

            this.showValue();
        },
        showPeriod: function showPeriod() {

            var show_period = void 0;

            try {

                show_period = this.settings[this.info.category][this.info.type]['period'];
            } catch (err) {

                show_period = false;
            }

            this.show_period = show_period;
        },
        showValue: function showValue() {

            var show_value = void 0;

            try {

                show_value = this.settings[this.info.category][this.info.type]['value'];
            } catch (err) {

                show_value = false;
            }

            this.show_value = show_value;
        },
        getValueLabel: function getValueLabel() {

            var label = void 0;

            try {

                label = this.settings[this.info.category][this.info.type]['count'][this.info.count];

                label = this.translations[label];
            } catch (err) {

                label = this.default_value_label;
            }

            if (label === undefined || typeof label !== 'string') {

                label = this.translations[this.default_value_label];
            }

            this.value_label = label;
        }
    },

    events: {},

    watch: {

        "code": function code(value) {

            this.info.code = value;
        },

        "category": function category(value) {

            this.info.category = value;

            this.sortCount();
        },

        "type": function type(value) {

            this.info.type = value;

            this.sortCount();
        },

        "selected_count": function selected_count(value) {

            this.info.count = value;

            this.getValueLabel();
        },

        "period": function period(value) {

            this.info.period = value;

            if (value == 0) {

                this.show_individual_calendar = true;
            } else {

                this.show_individual_calendar = false;
            }
        }

    },

    computed: {}

});

exports.default = CodeInfoVue;

},{"vue":89}],96:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _vue = require('vue');

var _vue2 = _interopRequireDefault(_vue);

var _info = require('./info.js');

var _info2 = _interopRequireDefault(_info);

var _ConfirmVue = require('./../../vuecomponents/ConfirmVue.vue');

var _ConfirmVue2 = _interopRequireDefault(_ConfirmVue);

var _Alert = require('./../../vuecomponents/vue-strap/src/Alert.vue');

var _Alert2 = _interopRequireDefault(_Alert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by rome0s on 6/19/17.
 */
var EmployeeCreateNewVue = _vue2.default.component('employee-create-new-vue', {

    template: "#employee-create-new-template",

    components: {
        EmployeeInfoNewVue: _info2.default,
        ConfirmVue: _ConfirmVue2.default,
        Alert: _Alert2.default
    },

    props: ['edit'],

    data: function data() {
        return {
            showConfirm: false,
            isConfirm: false,
            showCreateEmplAlert: false,
            form: null
        };
    },
    ready: function ready() {

        if (this.edit !== undefined) {

            this.$broadcast('getUserinfo');
        }
    },


    methods: {
        trySendForm: function trySendForm(e) {
            var isButton = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;


            var form = !isButton ? $(e.target) : $(e.target).closest('form');
            form.validate({
                rules: {
                    name: {
                        required: true
                    },
                    firstname: {
                        required: true
                    },
                    last_name: {
                        required: true
                    },
                    lastname: {
                        required: true
                    },
                    telnumber: {
                        required: true,
                        maxlength: 15,
                        minlength: 5,
                        number: true
                    },
                    phone: {
                        required: true,
                        maxlength: 15,
                        minlength: 5,
                        number: true
                    },
                    email: {
                        required: true,
                        email: true
                    },
                    gender: {
                        required: true
                    },
                    birthday: {
                        required: true
                    },
                    group: {
                        required: true
                    }
                }
            });
            var isValid = form.valid();
            if (isValid) {

                this.form = form;

                if (!this.edit) {

                    this.showConfirm = true;
                } else {

                    this.isConfirm = true;
                }
            } else {

                this.showConfirm = false;
            }
        },
        sendForm: function sendForm() {
            var _this = this;

            var $form = this.form,
                formData = new FormData($form[0]);

            $.ajax({
                url: $form.attr("action"),
                type: $form.attr("method"),
                data: formData,
                contentType: false,
                processData: false
            }).done(function (res) {

                if (res.status) {

                    _this.isConfirm = false;
                    _this.state = false;

                    if (res.redirect !== undefined && res.redirect !== null && res.redirect.length) {

                        window.location.href = res.redirect;
                    }
                } else {

                    _this.isConfirm = false;
                    _this.showCreateEmplAlert = true;
                }
            }).fail(function (err) {
                _this.isConfirm = false;
                throw new Error(err);
            });
        }
    },

    events: {},

    watch: {
        'isConfirm': function isConfirm() {
            console.log(this.form);
            if (this.isConfirm == true && this.form != null) {
                this.sendForm();
            }
        }
    }

});

exports.default = EmployeeCreateNewVue;

},{"./../../vuecomponents/ConfirmVue.vue":117,"./../../vuecomponents/vue-strap/src/Alert.vue":140,"./info.js":98,"vue":89}],97:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _vue = require('vue');

var _vue2 = _interopRequireDefault(_vue);

var _ajax = require('./../../ajax.js');

var ajax = _interopRequireWildcard(_ajax);

var _ConfirmVue = require('./../../vuecomponents/ConfirmVue.vue');

var _ConfirmVue2 = _interopRequireDefault(_ConfirmVue);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var EmployeeIndex = _vue2.default.component('employees-index', {

    template: '#employees-index',

    components: {
        ConfirmVue: _ConfirmVue2.default
    },

    data: function data() {
        return {
            list: []
        };
    },

    created: function created() {
        // this.refreshTable();
    },

    methods: {
        refreshTable: function refreshTable() {
            $.get('/office/start_assistant/get_employees_list').done(function (response) {

                this.list = response.data;
            }.bind(this));
        },
        deleteEmployee: function deleteEmployee(link) {
            var text = '';
            var isConfirm = void 0;
            var locale = this.$root.locale;

            switch (locale) {
                case 'ru':
                    text = 'Вы действительно желаете удалить сотрудника? В связи с этим будут удалены все заказы. вы согласны с этим?';
                    break;
                case 'de':
                    text = 'Sind Sie sicher, dass Sie einen Mitarbeiter zu löschen? In diesem Zusammenhang werden alle Aufträge gelöscht. gehen Sie mit dem zustimmen?';
                    break;
                case 'en':
                    text = 'Are you sure you want to delete an employee? In this regard, all orders will be deleted. do you agree with that?';
                    break;
            }

            isConfirm = confirm(text);

            if (isConfirm) {

                $.get(link).done(function () {

                    window.location.reload();

                    // this.refreshTable();
                });
            }
        },
        addEmployee: function addEmployee(event) {
            var can_add = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;


            if (can_add === 1) {

                window.location.href = $(event.target).attr("href");
            } else {

                window.location.href = '/office/tariff';
            }
        },
        changeStatus: function changeStatus(event) {

            var $element = $(event.target);

            var status = 'admin';

            if ($element.is(":checked")) {

                status = 'employee';
            }

            $.ajax({
                url: '/office/employees/change_status',
                type: 'POST',
                data: {
                    status: status,
                    _token: ajax.getToken()
                }
            }).done(function (response) {

                if (response.redirect !== undefined && response.redirect !== null && !response.redirect.length) {

                    window.location.href = response.redirect;
                } else {

                    window.location.reload();
                }
            }.bind(this));
        }
    },

    events: {},

    watch: {}

});

exports.default = EmployeeIndex;

},{"./../../ajax.js":92,"./../../vuecomponents/ConfirmVue.vue":117,"vue":89}],98:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _vue = require('vue');

var _vue2 = _interopRequireDefault(_vue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var EmployeeInfoNewVue = _vue2.default.component('employee-info-new-vue', {

    template: "#employee-info-new-template",

    data: function data() {
        return {

            categories: [],
            userInfo: {
                avatar: {},
                employee: {}

            },
            edit: false

        };
    },
    ready: function ready() {

        this.getServicesCategories();
    },


    props: ["edit"],

    methods: {
        previewAvatar: function previewAvatar(e) {

            var $this = e.target;

            if (e.target.files !== undefined && e.target.files[0]) {
                var reader = new FileReader();
                reader.onload = function (e) {
                    $($this).closest(".avatar_zone").find("img").attr('src', e.target.result);
                };
                reader.readAsDataURL(e.target.files[0]);
            }
        },
        clickAvatar: function clickAvatar(e) {

            $(e.target).closest('div').find('[type="file"]').first().click();
        },
        showCategory: function showCategory(id) {

            for (var iterator in this.categories) {

                if (this.categories[iterator].id !== id) {

                    this.categories[iterator].show = false;
                } else {

                    if (this.categories[iterator].show === false) {

                        this.categories[iterator].show = true;
                    } else {

                        this.categories[iterator].show = false;
                    }
                }
            }
        },
        loadUserData: function loadUserData() {

            $.get(window.location.href).done(function (response) {
                this.userInfo = response.data;
                this.categories = response.data.categories;
                this.edit = true;
            }.bind(this));
        },
        openUserInfoModal: function openUserInfoModal() {
            this.$broadcast('openUserInfoModal');
        },
        getServicesCategories: function getServicesCategories() {

            $.get('/office/start_assistant/getServicesCategories').done(function (response) {

                this.categories = response.data;
            }.bind(this));
        }
    },
    events: {

        'getUserinfo': function getUserinfo() {

            this.loadUserData();
        }

    }

}); /**
     * Created by rome0s on 6/19/17.
     */
exports.default = EmployeeInfoNewVue;

},{"vue":89}],99:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
	hourMinutes: function hourMinutes(minutes) {
		var min = +minutes % 60;
		var hours = Math.floor(+minutes / 60);
		var hoursText = void 0;
		var minutesText = void 0;
		var locale = $('meta[name="locale"]').attr('content');

		switch (locale) {
			case 'de':
				hoursText = 'uhr';
				minutesText = 'min';
				break;
			case 'en':
				hoursText = 'h';
				minutesText = 'min';
				break;
			case 'ru':
				hoursText = 'ч';
				minutesText = 'мин';
				break;
		}

		if (hours) {
			return '' + hours + hoursText + ' ' + min + minutesText;
		} else {
			return '' + min + minutesText;
		}
	},
	formatDate: function formatDate(date, format) {
		if (date === '') return '';
		date = (0, _moment2.default)(new Date(date)).format(format);
		return date;
	},
	noticeHeaderName: function noticeHeaderName(name) {
		switch (name) {
			case 'admin_blocked':
				name = 'Blocked';break;
			case 'admin_freeze':
				name = 'Freeze';break;
			case 'change_tariff':
				name = 'Change tariff';break;
			case 'new_registration':
				name = 'New registration';break;
			case 'unpaid_order':
				name = 'Unpaid order';break;
			case 'unpaid_bill':
				name = 'Unpaid Bill';break;
			case 'delete_order':
				name = 'Delete order';break;
			case 'new_bill':
				name = 'New bill';break;
			case 'new_order':
				name = 'New Order';break;
		}
		return name;
	},
	timeHM: function timeHM(time) {
		return (0, _moment2.default)(time).format('H:mm');
	},
	getRelativeTime: function getRelativeTime(time) {
		return (0, _moment2.default)(time, "YYYY-MM-DD hh:mm:ss").startOf('minute').fromNow();
	},
	reverseArr: function reverseArr(arr) {
		return arr.slice().reverse();
	}
};

},{"moment":84}],100:[function(require,module,exports){
"use strict";

/* German initialisation for the jQuery UI date picker plugin. */
/* Written by Milian Wolff (mail@milianw.de). */
(function (factory) {
	if (typeof define === "function" && define.amd) {

		// AMD. Register as an anonymous module.
		define(["../widgets/datepicker"], factory);
	} else {

		// Browser globals
		factory(jQuery.datepicker);
	}
})(function (datepicker) {

	datepicker.regional.de = {
		closeText: "Schließen",
		prevText: "&#x3C;Zurück",
		nextText: "Vor&#x3E;",
		currentText: "Heute",
		monthNames: ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"],
		monthNamesShort: ["Jan", "Feb", "Mär", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"],
		dayNames: ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"],
		dayNamesShort: ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"],
		dayNamesMin: ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"],
		weekHeader: "KW",
		dateFormat: "dd.mm.yy",
		firstDay: 1,
		isRTL: false,
		showMonthAfterYear: false,
		yearSuffix: "" };
	datepicker.setDefaults(datepicker.regional.de);

	return datepicker.regional.de;
});

},{}],101:[function(require,module,exports){
"use strict";

/* English/Australia initialisation for the jQuery UI date picker plugin. */
/* Based on the en-GB initialisation. */
(function (factory) {
	if (typeof define === "function" && define.amd) {

		// AMD. Register as an anonymous module.
		define(["../widgets/datepicker"], factory);
	} else {

		// Browser globals
		factory(jQuery.datepicker);
	}
})(function (datepicker) {

	datepicker.regional["en-AU"] = {
		closeText: "Done",
		prevText: "Prev",
		nextText: "Next",
		currentText: "Today",
		monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
		monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
		dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
		dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
		dayNamesMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
		weekHeader: "Wk",
		dateFormat: "dd/mm/yy",
		firstDay: 1,
		isRTL: false,
		showMonthAfterYear: false,
		yearSuffix: "" };
	datepicker.setDefaults(datepicker.regional["en-AU"]);

	return datepicker.regional["en-AU"];
});

},{}],102:[function(require,module,exports){
"use strict";

/* Russian (UTF-8) initialisation for the jQuery UI date picker plugin. */
/* Written by Andrew Stromnov (stromnov@gmail.com). */
(function (factory) {
	if (typeof define === "function" && define.amd) {

		// AMD. Register as an anonymous module.
		define(["../widgets/datepicker"], factory);
	} else {

		// Browser globals
		factory(jQuery.datepicker);
	}
})(function (datepicker) {

	datepicker.regional.ru = {
		closeText: "Закрыть",
		prevText: "&#x3C;Пред",
		nextText: "След&#x3E;",
		currentText: "Сегодня",
		monthNames: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
		monthNamesShort: ["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"],
		dayNames: ["воскресенье", "понедельник", "вторник", "среда", "четверг", "пятница", "суббота"],
		dayNamesShort: ["вск", "пнд", "втр", "срд", "чтв", "птн", "сбт"],
		dayNamesMin: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
		weekHeader: "Нед",
		dateFormat: "dd.mm.yy",
		firstDay: 1,
		isRTL: false,
		showMonthAfterYear: false,
		yearSuffix: "" };
	datepicker.setDefaults(datepicker.regional.ru);

	return datepicker.regional.ru;
});

},{}],103:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _all;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var LOCALES = exports.LOCALES = {
    en: {
        all: {
            heading: 'Please fill in this form',
            back: 'Back',
            next: 'Continue',
            country: 'Country',
            region: 'Region',
            city: 'City',
            postIndex: 'Post index',
            address: 'Street and house number',
            business: 'Business',
            billingAddress: 'Billing address',
            bankDetails: 'Bank details',
            bankName: 'Bank name',
            owner: 'Owner',
            service: 'Service',
            recipient: 'letters',
            unlimited: 'unlimited',
            statistic: 'statistics',
            reports: 'reports',
            days: 'days',
            dashboard: 'dashboard',
            dashboardDays: 'dashboard days',
            employee: 'employees',
            desc: 'Description',
            bis: 'for',
            services: 'services',
            newsletterModule: 'Newsletter Modul',
            step: 'Step'
        },
        step0: {
            heading: 'Welcome',
            desc: 'I am your Start Assist and help you in setting up.',
            btn: 'Start now'
        },
        step1: {
            label1: 'Personal data',
            label2: 'Profile picture',
            greeting: 'Salutation',
            male: 'Male',
            female: 'Female',
            herr: 'Mr.',
            frau: 'Mrs.',
            name: 'Name',
            lastName: 'Last name',
            tel: 'Phone',
            mobile: 'Mobile',
            gender: 'Gender',
            uploadAvatar: 'Upload avatar',
            birthday: 'Birthday'
        },
        step2: {
            heading: 'Please fill in this form',
            label1: 'Company',
            label2: 'Logo',
            companyName: 'Company name',
            business: 'Choose your industry ...',
            uploadLogo: 'Upload logo'
        },
        step3: {
            heading: 'Please fill in this form',
            desc: 'Great for small business',
            monthly: 'monthly / INKL. MWST',
            reports: 'Online reports',
            management: 'Сustomer management',
            customerDb: 'Customer database',
            onlineCal: 'Online Calendar',
            onlineBook: 'Online booking facility',
            customerFeedback: 'Customer feedback',
            newsletterMarketing: 'Newsletter marketing',
            eventReminder: 'Event reminder',
            freeDays: 'days free',
            order: 'Order'
        },
        step4: {
            companyName: 'Company name',
            radioNo: 'I will pay by bank transfer',
            radioYes: 'I will pay by SEPA Direct Debit',
            agreeMess: 'I hereby authorize the GrafikonDesign UG, payments from my account via direct feed. At the same time I instruct my bank to redeem the conclusions drawn by GrafikonDesign UG to my account debits. Note: I may request, within eight weeks from the debit date, refund the amount debited. Applicable in this regard by the contract with my bank conditions'
        },
        step5: {
            heading: 'Congratulations!',
            desc: 'Now it can start'
        },
        step6: {
            heading: "Please fill in this form",
            label1: "dienstleistungen hinzufügen"
        },
        step7: {
            heading: "Please fill in this form",
            label1: "mitarbeiter",
            label2: "mitarbeiter hinzufügen",
            label3: "Editing",
            upload: "Upload",
            save: "Save"
        },
        step8: {
            heading: "Working hours",
            label1: "Working hours"
        }
    },
    de: {
        all: (_all = {
            heading: 'Bitte füllen Sie das Formular aus',
            back: 'Zurück',
            next: 'Weiter',
            country: 'Land',
            region: 'Bundesland',
            city: 'Stadt',
            postIndex: 'PLZ',
            address: 'Straße & Nummer',
            business: 'Branche',
            billingAddress: 'Rechnungsadresse',
            bankDetails: 'bankverbindung',
            bankName: 'Bankinstitut',
            owner: 'Inhaber',
            service: 'Bedienung',
            recipient: 'Empfänger',
            unlimited: 'unbegrenzt',
            statistic: 'statistik',
            reports: 'reports',
            days: 'Wochen',
            employee: 'Mitarbeiter',
            bis: 'bis',
            services: 'Leistungen',
            dashboard: 'dashboard',
            dashboardDays: 'instrumententafel tage',
            newsletterModule: 'Newsletter Modul',
            desc: 'Beschreibung',
            step: 'Schritt',
            categories: 'Kategorien',
            nr: 'Nr.',
            name: 'Leistung',
            status: 'Status',
            add_category: 'Kategorie hinzufügen',
            add_service: 'Leistungen hinzufügen',
            ph_category_name: 'Kategoriename',
            save: 'Speichern',
            price: 'Preise',
            duration: 'Dauer',
            ph_service_name: 'Leistungsname'
        }, _defineProperty(_all, 'duration', 'Dauer'), _defineProperty(_all, 'category_name', 'Kategoriename'), _defineProperty(_all, 'first_name', 'Vorname'), _defineProperty(_all, 'last_name', 'Nachname'), _defineProperty(_all, 'phone', 'Telefon'), _defineProperty(_all, 'email', 'E-Mail'), _defineProperty(_all, 'gender', 'Geschlecht'), _defineProperty(_all, 'male', 'Männlich'), _defineProperty(_all, 'female', 'Weiblich'), _defineProperty(_all, 'birthday', 'Geburtstag'), _defineProperty(_all, 'group', 'Rolle'), _defineProperty(_all, 'show_in_calender', 'Für buchungen freischalten'), _defineProperty(_all, 'category_name', 'Mitarbeiter hinzufügen'), _defineProperty(_all, 'cancel', 'Abbrechen'), _defineProperty(_all, 'mobile', 'Handy'), _defineProperty(_all, 'admin', 'Administrator'), _all),
        step0: {
            heading: 'Herzlich Willkommen',
            desc: 'ich bin dein Start-Assisten und helfe dir bei der Einrichtung.',
            btn: 'Jetzt Starten'
        },
        step1: {
            label1: 'Persönliche Daten',
            label2: 'profilbild',
            greeting: 'Anrede',
            male: 'Männlich',
            female: 'Weiblich',
            herr: 'Herr',
            frau: 'Frau',
            name: 'Name',
            lastName: 'Vorname',
            tel: 'Telefon',
            mobile: 'Mobile',
            gender: 'Geschlecht',
            uploadAvatar: 'hochladen',
            birthday: 'Geburtstag'
        },
        step2: {
            heading: "Bitte füllen Sie das Formular aus",
            label1: 'Standort/e',
            label2: 'Logo',
            companyName: 'Filianname',
            business: 'Wähle Deine Branche aus…',
            uploadLogo: 'hochladen'
        },
        step3: {
            heading: 'Bitte den Tarif auswählen',
            desc: 'Ideal für kleine Unternehmen',
            monthly: 'monatlich / INKL. MWST',
            reports: 'Online-Berichte',
            management: 'Kundenverwaltung',
            customerDb: 'Kundendatenbank',
            onlineCal: 'Online-Kalender',
            onlineBook: 'Online-Buchbarkeit',
            customerFeedback: 'Kundenfeedback',
            eventReminder: 'Terminerinnerung',
            newsletterMarketing: 'Newsletter Marketing',
            freeDays: 'Tagen kostenlos',
            order: 'buchen'
        },
        step4: {
            companyName: 'Unternehmensname',
            radioNo: 'Ich zahle per Überweisung',
            radioYes: 'Ich zahle per SEPA Lastschrift',
            agreeMess: 'Ich ermächtige hiermit die GrafikonDesign UG, Zahlungen von meinem Konto mittels Lastschrift einzuziehen. Zugleich weise ich mein Kreditinstitut an, die von GrafikonDesign UG auf mein Konto gezogenen Lastschriften einzulösen. Hinweis: Ich kann innerhalb von acht Wochen, beginnend mit dem Belastungsdatum, die Erstattung des belasteten Betrages verlangen. Es gelten dabei die mit meinem  Kreditinstitut vereinbarten Bedingungen'
        },
        step5: {
            heading: 'Herzlichen Glückwunsch!',
            desc: 'Jetzt kann es los gehen'
        },
        step6: {
            heading: "Bitte füllen Sie das Formular aus",
            label1: "Dienstleistungen",
            categories: "Kategorien",
            services: 'Leistungen'
        },
        step7: {
            heading: "Bitte füllen Sie das Formular aus",
            label1: "mitarbeiter",
            label2: "mitarbeiter hinzufügen",
            label3: "Bearbeiten",
            upload: "Bild hochladen",
            save: "Speichern"
        },
        step8: {
            heading: "Innen Stunden",
            label1: "Innen Stunden"
        }
    },
    ru: {
        all: {
            stats: "текст",
            heading: 'Пожалуйста, заполните форму',
            back: 'Назад',
            next: 'Продолжить',
            country: 'Страна',
            region: 'Область',
            city: 'Город',
            postIndex: 'Почтовый индекс',
            address: 'Улица и номер дома',
            business: 'Сфера деятельности',
            billingAddress: 'Платежный адрес',
            bankDetails: 'Банковский счет',
            bankName: 'Название банка',
            owner: 'Владелец',
            service: 'Сервис',
            recipient: 'писем',
            unlimited: 'безлимитно',
            statistic: 'статистика',
            reports: 'отчеты',
            days: 'дней',
            employee: 'сотрудников',
            bis: 'до',
            dashboard: 'статистики',
            dashboardDays: 'дней статистики',
            services: 'услуг',
            newsletterModule: 'Модуль рассылки',
            desc: 'Описание',
            step: 'Шаг'
        },
        step0: {
            heading: 'Добро пожаловать',
            desc: 'Я ваш Start-Assiste и помогу вам в настройке.',
            btn: 'Начать сейчас'
        },
        step1: {
            label1: 'Личные данные',
            label2: 'Ваш аватар',
            greeting: 'Приветствие',
            male: 'Мужчина',
            female: 'Женщина',
            herr: 'Господин',
            frau: 'Госпожа',
            name: 'Имя',
            lastName: 'Фамилия',
            tel: 'Телефон',
            mobile: 'Мобильный телефон',
            gender: 'Пол',
            uploadAvatar: 'Загрузить аватар',
            birthday: 'День рождения'
        },
        step2: {
            label1: 'Филиалы',
            label2: 'Логотип',
            companyName: 'Название компании',
            business: 'Выберите отрасль ...',
            uploadLogo: 'Зарузить Лого'
        },
        step3: {
            heading: 'Пожалуйста, выберите тариф',
            desc: 'Отлично подходит для малого бизнеса',
            monthly: 'Ежемесячно / INKL. MWST',
            reports: 'Online отчеты',
            management: 'Управление клиентами',
            customerDb: 'База данных клиентов',
            onlineCal: 'Онлайн календарь',
            onlineBook: 'Онлайн бронирование',
            customerFeedback: 'Обратная связь с клиентами',
            eventReminder: 'Напоминание о мероприятии',
            newsletterMarketing: 'Информационный бюллетень по маркетингу',
            freeDays: 'дней бесплатно',
            order: 'Заказать'
        },
        step4: {
            companyName: 'Название компании',
            radioNo: 'Я буду платить банковским переводом',
            radioYes: 'Я хочу заполнить банковские данные',
            agreeMess: 'Настоящим я разрешаю GrafikonDesign UG, платежи со своего счета через прямой подачи. В то же время я поручаю свой банк, чтобы искупить выводы, сделанные GrafikonDesign UG на мой счет дебета. Примечание: Я может в течение восьми недель с даты дебетовой, возврат суммы списана. Применяется в связи с этим договором с моим банком условий'
        },
        step5: {
            heading: 'Поздравляю!',
            desc: 'Теперь мы можем начать'
        },
        step6: {
            heading: "Добавление услуг",
            label1: "dienstleistungen hinzufügen"
        },
        step7: {
            heading: "Добавление сотрудников",
            label1: "mitarbeiter",
            label2: "mitarbeiter hinzufügen",
            upload: "Загрузить",
            save: "Сохранить",
            label3: "Редактирование"
        },
        step8: {
            heading: "Время работы салона",
            label1: "Время работы салона"
        }
    }
};

},{}],104:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.MYID = exports.SOCKET = undefined;
exports.validateEmail = validateEmail;
exports.validateTime = validateTime;
exports.getMonthDateRange = getMonthDateRange;

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var domen = 'https://' + /:\/\/([^\/]+)/.exec(window.location.href)[1];
var SOCKET = exports.SOCKET = io.connect(domen + ':8303', { secure: true });
var MYID = exports.MYID = +$('[type="hidden"][name="my_id"]').val();

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function validateTime(start, end) {
    start = start.split(/:/);
    end = end.split(/:/);
    return +start[0] < +end[0] || +start[0] == +end[0] && +start[1] < +end[1];
}

function getMonthDateRange(year, month) {

    // month in moment is 0 based, so 9 is actually october, subtract 1 to compensate
    // array is 'year', 'month', 'day', etc
    var startDate = (0, _moment2.default)([year, month - 1]);

    // Clone the value before .endOf()
    var endDate = (0, _moment2.default)(startDate).endOf('month');

    // make sure to call toDate() for plain JavaScript date type
    return { start: startDate, end: endDate };
}

},{"moment":84}],105:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GET_CITIES = exports.GET_STATES = exports.GET_COUNTRIES = exports.countries = undefined;

var _ajax = require('./ajax.js');

var ajax = _interopRequireWildcard(_ajax);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var countries = exports.countries = {
  methods: {
    getCountries: function getCountries() {
      var _this = this;

      var path = '/' + ajax.pathWho + '/get_location';

      ajax.sendAjax({}, path).done(function (countries) {
        _this.countries = countries;
        _this.getStates();
      });
    },
    getStates: function getStates() {
      var _this2 = this;

      var path = '/' + ajax.pathWho + '/get_location';
      var data = {
        country_id: this.editingInfo.country_id
      };

      $('#tablePreloader').show();

      ajax.sendAjax(data, path).done(function (states) {
        _this2.states = states;
        _this2.getCities();
        $('#tablePreloader').hide();
      }).error(function () {
        $('#tablePreloader').hide();
      });
    },
    getCities: function getCities() {
      var _this3 = this;

      var path = '/' + ajax.pathWho + '/get_location';
      var data = {
        state_id: this.editingInfo.state_id
      };

      $('#tablePreloader').show();

      ajax.sendAjax(data, path).done(function (cities) {
        _this3.cities = cities;
        $('#tablePreloader').hide();
      }).error(function () {
        $('#tablePreloader').hide();
      });
    }
  }
};

var GET_COUNTRIES = exports.GET_COUNTRIES = {
  methods: {
    getCountries: function getCountries() {
      var _this4 = this;

      var path = '/' + ajax.pathWho + '/get_location';

      ajax.sendAjax({}, path).done(function (countries) {
        _this4.countries = countries;
      });
    }
  }
};

var GET_STATES = exports.GET_STATES = {
  methods: {
    getStates: function getStates(id) {
      var _this5 = this;

      var path = '/' + ajax.pathWho + '/get_location';
      var data = {
        country_id: id
      };

      $('#tablePreloader').show();

      ajax.sendAjax(data, path).done(function (states) {
        _this5.states = states;
        $('#tablePreloader').hide();
      }).error(function () {
        $('#tablePreloader').hide();
      });
    }
  }
};

var GET_CITIES = exports.GET_CITIES = {
  methods: {
    getCities: function getCities(id) {
      var _this6 = this;

      var path = '/' + ajax.pathWho + '/get_location';
      var data = {
        state_id: id
      };

      $('#tablePreloader').show();

      ajax.sendAjax(data, path).done(function (cities) {
        _this6.cities = cities;
        $('#tablePreloader').hide();
      }).error(function () {
        $('#tablePreloader').hide();
      });
    }
  }
};

},{"./ajax.js":92}],106:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Sidebar = require('./Sidebar.js');

var _Sidebar2 = _interopRequireDefault(_Sidebar);

var _Validate = require('./Validate.js');

var _Validate2 = _interopRequireDefault(_Validate);

var _Tabs = require('./Tabs.js');

var _Tabs2 = _interopRequireDefault(_Tabs);

var _Services = require('./Services.js');

var _Services2 = _interopRequireDefault(_Services);

var _Ckeditor = require('./Ckeditor.js');

var _Ckeditor2 = _interopRequireDefault(_Ckeditor);

var _Newsletter = require('./Newsletter.js');

var _Newsletter2 = _interopRequireDefault(_Newsletter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var App = function () {

  return {
    init: function init() {

      _Sidebar2.default.init();
      _Validate2.default.init();
      _Validate2.default.validateForm('#terminForm');
      _Validate2.default.validateForm('#emailForm');
      _Validate2.default.validateForm('#passwordForm');
      _Validate2.default.validateForm('.productEditForm');
      _Validate2.default.validateForm('#userInfoForm');
      _Validate2.default.validateForm('#infoForm');
      _Validate2.default.validateForm('.kategorieForm');
      _Validate2.default.validateForm('#kategorieForm');
      _Validate2.default.validateForm('#create_new_service');
      _Validate2.default.validateForm('#ereignisForm');
      _Validate2.default.validateForm('#sendServiceForm');
      _Validate2.default.validateForm('#tarifForm');
      _Validate2.default.validateForm('#logoForm');
      _Validate2.default.validateForm('#orderForm1');
      _Validate2.default.validateForm('#orderForm2');
      _Validate2.default.validateForm('#firmDetailsForm');
      _Validate2.default.validateForm('#billingBankForm');
      _Validate2.default.validateForm('#billingAdressForm');
      _Validate2.default.validateForm('#formArticle');
      _Validate2.default.validateForm('#assistantForm1');
      _Validate2.default.validateForm('#assistantForm2');
      _Validate2.default.validateForm('#assistantForm4');
      _Validate2.default.validateForm('#assistantForm4-2');
      _Services2.default.init();
      _Ckeditor2.default.init();
      _Tabs2.default.init();
      _Newsletter2.default.init();
    }
  };
}();

exports.default = App;

},{"./Ckeditor.js":107,"./Newsletter.js":108,"./Services.js":109,"./Sidebar.js":110,"./Tabs.js":111,"./Validate.js":112}],107:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _ajax = require('../ajax.js');

var ajax = _interopRequireWildcard(_ajax);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var Ckeditor = function () {

    var token = $(".draft-email");

    var tokObj = [];
    token.each(function () {
        tokObj.push({ id: $(this).data('draft-id'), name: $(this).data('draft-email') });
    });

    var $ckeditor = $('.ckeditor');

    function init() {
        if ($ckeditor.length) {

            $("#inputAdmin").tokenInput('/' + ajax.pathWho + '/get_admins_email', {
                theme: "facebook",
                tokenLimit: null,
                prePopulate: tokObj
            });
            $('.radio').on('change', function (event) {
                switch (event.currentTarget.defaultValue) {
                    case 'all':
                        $(".admins").hide();
                        break;
                    case 'some':
                        $(".admins").show();
                        break;
                }
            });

            if ($ckeditor) {
                CKEDITOR.replace('text');
            }
        }
    }

    return {
        init: init
    };
}();

exports.default = Ckeditor;

},{"../ajax.js":92}],108:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
// Trash. You can delete it!

var Newsletter = function () {

  function init() {}

  return {
    init: init
  };
}();

exports.default = Newsletter;

},{}],109:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var Services = function () {

  var $table = $('.table--sortable');
  var $sortBlock = $table.find('.sortable');

  function init() {
    $sortBlock.sortable({
      axis: 'y',
      update: function update(event, ui) {
        // let sorted = $(this).sortable('serialize');
        var sorted = $sortBlock.sortable("serialize", { key: "sort" });

        console.log(sorted);

        // POST to server using $.post or $.ajax
        // $.ajax({
        //     data: data,
        //     type: 'POST',
        //     url: '/your/url/here'
        // });
      }
    });
  }

  return {
    init: init
  };
}();

exports.default = Services;

},{}],110:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var Sidebar = function () {

  /**
   * @return {[String]}
   */
  function showSubmenu() {
    var $sidebar = $('.sidebar');
    var $sidebarItem = $sidebar.find('.sidebar__item');
    $('.sidebar__submenu').hide();

    $sidebarItem.on({
      'mouseenter': function mouseenter() {
        $(this).addClass('is-hover');
        $(this).find('.sidebar__submenu').show();
      }, 'mouseleave': function mouseleave() {
        $(this).removeClass('is-hover');
        $(this).find('.sidebar__submenu').hide();
      }
    });

    return 'showMenu';
  }

  return {
    init: function init() {
      showSubmenu();
    }
  };
}();

exports.default = Sidebar;

},{}],111:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var Tabs = function () {

  function init() {
    var $blockItem = $('.block__item');
    $blockItem.click(function () {
      var $this = $(this);
      var $block = $this.closest('.block');
      var tab_id = $this.attr('data-tab');

      $block.find('.block__item').removeClass('is-active');
      $this.addClass('is-active');

      $block.children('.tab-content').removeClass('is-active');
      // $("#"+tab_id).addClass('is-active');
      $block.find('[data-tab-id=' + tab_id + ']').addClass('is-active');

      $this.closest('.block').find('.block').find('.block__item:first').addClass('is-active');
    });
  }
  return {
    init: init
  };
}();

exports.default = Tabs;

},{}],112:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ajax = require("../ajax.js");

var ajax = _interopRequireWildcard(_ajax);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Validate = function () {

  /**
   * set global config for validationassistantForm4-2
   */
  function configValidate() {
    $.validator.setDefaults({
      errorClass: "errorFormValid",
      errorElement: "div"
    });
  }

  jQuery.validator.addMethod("checkurl", function (value, element) {
    // now check if valid url
    if (value.trim() === '') {
      return true;
    } else {
      return (/^http:\/\/|(www\.)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/.test(value)
      );
    }
  }, "Please enter a valid URL.");

  jQuery.validator.addMethod("greaterThan", function (value, element, params) {

    if (!/Invalid|NaN/.test(new Date(value))) {
      return new Date(value) > new Date($(params).val());
    }

    return isNaN(value) && isNaN($(params).val()) || Number(value) > Number($(params).val());
  }, 'Must be greater than {0}.');

  // simple date mm/dd/yyyy format
  $.validator.addMethod('validDate', function (value, element) {
    return this.optional(element) || /^\d{2}\/\d{2}\/\d{4}$/.test(value);
  }, 'Please provide a date in the dd/mm/yyyy format');

  /**
   * @param  {[String]} jQuery selector
   * @return {[Object]}
   */
  function validateForm(formId) {
    var _rules;

    switch (formId) {

      case '#terminForm':
        $(formId).validate({
          // errorPlacement: function(error, element) {},

          rules: {

            vorname: {
              required: true
            },

            nachname: {
              required: true
            },

            email: {
              required: true,
              email: true
            },

            phone: {
              number: true,
              minlength: 5,
              maxlength: 15
            },

            mobil: {
              number: true,
              minlength: 5,
              maxlength: 15
            }

          }
        });
        break;

      case '#emailForm':
        $(formId).validate({

          rules: {

            email: {
              required: true,
              email: true
            }

          },

          submitHandler: function submitHandler(form) {
            var _this = this;

            var $form = $(form);
            var data = ajax.getFormData($form);
            var path = ajax.LOCPATH + "/set_email";

            ajax.sendAjax(data, path).done(function (res) {

              if (res) {
                location.reload();
              } else {
                _this.errors.email = true;
              }
            });
            return false;
          }

        });
        break;

      case '#firmDetailsForm':
        $(formId).validate({

          rules: {

            firm_name: {
              required: true
            },

            firm_telnumber: {
              required: true
            },

            street: {
              required: true
            },

            post_index: {
              required: true
            }

          }
        });
        break;

      case '#billingBankForm':
        $(formId).validate({

          rules: {}
        });
        break;

      case '#assistantForm1':
        $(formId).validate({

          rules: {

            greeting: {
              required: true
            },

            firstname: {
              required: true
            },

            lastname: {
              required: true
            },

            email: {
              required: true,
              email: true
            },

            firmname: {
              required: false,
              checkurl: true
            },

            telnumber: {
              required: true,
              number: true
            },

            mobile: {
              required: false,
              number: true
            },

            gender: {
              required: true
            },

            birthday: {
              required: true
            }

          }
        });
        break;

      case '#assistantForm2':
        $(formId).validate({

          rules: {

            firm_name: {
              required: true
            },

            country: {
              required: true
            },

            state: {
              required: true
            },

            city: {
              required: true
            },

            post_index: {
              required: true
            },

            street: {
              required: true
            },

            firmtype: {
              required: true
            }

          }
        });
        break;

      case '#assistantForm4':
        $(formId).validate({

          rules: {

            country: {
              required: true
            },

            city: {
              required: true
            },

            state: {
              required: true
            },

            post_index: {
              required: true
            },

            street: {
              required: true
            },

            legal_firm_name: {
              required: true
            }

          }
        });
        break;

      case '#assistantForm4-2':
        $(formId).validate({

          rules: {

            iban: {
              required: true
            },

            bic: {
              required: true
            },

            bank_name: {
              required: true
            },

            account_owner: {
              required: true
            }

          }
        });
        break;

      case '#formArticle':
        $(formId).validate({

          rules: {

            subject: {
              required: true
            },

            form: {
              required: true
            },

            client_id_test: {
              required: true,
              email: true
            },

            text: {
              required: true
            }

          }
        });
        break;

      case '#billingAdressForm':
        $(formId).validate({

          rules: {

            firm_name: {
              required: true
            },

            first_last_name: {
              required: true
            },

            street: {
              required: true
            },

            addition_address: {
              required: true
            },

            post_index: {
              required: true,
              number: true
            }

          }
        });
        break;

      case '#logoForm':
        $(formId).validate({

          rules: {

            slide_name: {
              required: true
            }

          }
        });
        break;

      case '#orderForm1':
        $(formId).validate({

          rules: {

            account_owner: {
              required: true
            },
            account_number: {
              required: true
            },
            bank_code: {
              required: true
            },
            bank_name: {
              required: true
            },
            iban: {
              required: true
            },
            bic: {
              required: true
            }

          }
        });
        break;

      case '#orderForm2':
        $(formId).validate({

          rules: (_rules = {

            firm_name: {
              required: true
            }
          }, _defineProperty(_rules, "firm_name", {
            required: true
          }), _defineProperty(_rules, "first_last_name", {
            required: true
          }), _defineProperty(_rules, "post_index", {
            required: true
          }), _defineProperty(_rules, "street", {
            required: true
          }), _rules)
        });
        break;

      case '#userInfoForm':
        $(formId).validate({

          rules: {

            name: {
              required: true
            },

            phone: {
              required: true,
              number: true,
              minlength: 5,
              maxlength: 15
            },

            last_name: {
              required: true
            },

            email: {
              required: true,
              email: true
            },

            firstname: {
              required: true
            },

            lastname: {
              required: true
            }

          }
        });
        break;

      case '#sendServiceForm':
        $(formId).validate({

          rules: {

            service_name: {
              required: true
            },

            price: {
              required: true,
              number: true,
              minlength: 1
            },

            duration: {
              required: true
            }

          }
        });
        break;

      case '#tarifForm':
        $(formId).validate({

          rules: {

            name: {
              required: true
            },

            price: {
              required: true,
              number: true
            },
            duration: {
              required: true,
              number: true
            },
            letters_count: {
              required: true,
              number: true
            },
            employee_count: {
              required: true,
              number: true
            },
            services_count: {
              required: true,
              number: true
            },
            dashboard_count: {
              required: true,
              number: true
            }

          }
        });
        break;

      case '#infoForm':
        $(formId).validate({

          rules: {

            name: {
              required: true
            },

            last_name: {
              required: true
            },

            phone: {
              required: true,
              number: true,
              minlength: 5,
              maxlength: 15
            },

            telnumber: {
              required: true,
              number: true,
              minlength: 5,
              maxlength: 15
            },

            mobile: {
              required: true,
              number: true,
              minlength: 5,
              maxlength: 15
            },

            firstname: {
              required: true
            },

            lastname: {
              required: true
            },

            birthday: {
              required: true,
              validDate: true
            },

            street: {
              required: true
            },

            city: {
              required: true
            },

            state: {
              required: true
            },

            country: {
              required: true
            }

          },

          submitHandler: function submitHandler(form) {
            var $form = $(form);
            var data = ajax.getFormData($form);
            var path = ajax.LOCPATH + "/set_personal_info";

            ajax.sendAjax(data, path).done(function (res) {
              if (res) {
                location.reload();
              }
            });
            return false;
          }
        });
        break;

      case '#ereignisForm':
        $(formId).validate({
          errorPlacement: function errorPlacement(error, element) {},

          rules: {

            description: {
              required: true
            },

            date_from: {
              required: true
            },

            date_to: {
              required: true
              // greaterThan: "#ereignisDateFrom"
            }

          }
        });
        break;

      case '#passwordForm':
        $(formId).validate({

          rules: {

            'old_password': {
              required: true
            },

            'new_password-1': {
              required: true,
              minlength: 8,
              maxlength: 16
            },
            'new_password-2': {
              required: true,
              minlength: 8,
              maxlength: 16,
              equalTo: ".newPass1"
            }

          },

          submitHandler: function submitHandler(form) {
            var $form = $(form);
            var data = ajax.getFormData($form);
            var path = ajax.LOCPATH + "/set_password";
            var isEq = !!(data['new_password-1'] === data['new_password-2']);

            ajax.sendAjax(data, path).done(function (res) {

              if (!res) {
                alert('Falsches Passwort');
                return;
              } else {
                location.reload();
              }
            });
            return false;
          }

        });
        break;

      case '#create_new_service':
        $(formId).validate({

          rules: {

            'create_service_name': {
              required: true
            },

            'create_service_price': {
              required: true,
              number: true,
              min: 0
            },
            'create_service_duration': {
              required: true,
              number: true,
              min: 0
            }

          }
        });
        break;

      case '.productEditForm':
        $(formId).validate({

          rules: {

            'edit_service_name': {
              required: true
            },

            'edit_service_price': {
              required: true,
              number: true,
              min: 0
            },
            'edit_service_duration': {
              required: true,
              number: true,
              min: 0
            }

          }
        });
        break;

      case '#kategorieForm':
        $(formId).validate({

          rules: {

            'create_category_name': {
              required: true
            }

          }
        });
        break;

      case '.kategorieForm':
        $(formId).validate({

          rules: {

            'create_category_name': {
              required: true
            }

          }
        });
        break;

    }
  }

  return {
    init: function init() {
      configValidate();
    },
    validateForm: validateForm
  };
}();

exports.default = Validate;

},{"../ajax.js":92}],113:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _vue = require('vue');

var _vue2 = _interopRequireDefault(_vue);

var _ajax = require('../ajax.js');

var ajax = _interopRequireWildcard(_ajax);

var _ConfirmVue = require('./ConfirmVue.vue');

var _ConfirmVue2 = _interopRequireDefault(_ConfirmVue);

var _Alert = require('./vue-strap/src/Alert.vue');

var _Alert2 = _interopRequireDefault(_Alert);

var _EmployeesListVue = require('./EmployeesListVue.js');

var _EmployeesListVue2 = _interopRequireDefault(_EmployeesListVue);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AssistantCreateEmployee = _vue2.default.component('assistant-create-employee', {
    template: '#create-employee-template',

    components: { ConfirmVue: _ConfirmVue2.default, Alert: _Alert2.default, EmployeesListVue: _EmployeesListVue2.default },

    data: function data() {
        return {
            showConfirm: false,
            isConfirm: false,
            showCreateEmplAlert: false,
            state: false,
            categories: [],
            employee: null
        };
    },
    create: function create() {},


    methods: {
        trySendForm: function trySendForm() {
            var form = $('#userInfoForm');
            form.validate();
            var isValid = form.valid();
            if (isValid) {
                this.showConfirm = true;
            } else {
                this.showConfirm = false;
            }
        },
        submitCreateEmpl: function submitCreateEmpl() {
            var _this = this;

            var $form = $("form#userInfoForm"),
                formData = new FormData($form[0]);
            $.ajax({
                url: $form.attr("action"),
                type: $form.attr("method"),
                data: formData,
                contentType: false,
                processData: false
            }).done(function (res) {
                if (res.redirect === undefined || res.redirect === null || !res.redirect.length) {

                    if (res) {
                        _this.isConfirm = false;
                        _this.state = false;
                    } else {
                        _this.isConfirm = false;
                        _this.showCreateEmplAlert = true;
                    }

                    $("#assistantAvatarCreatePreview").attr("src", "");

                    $("#userInfoForm").find("[name]").each(function () {

                        if (!$(this)[0].hasAttribute('type') || $(this).attr('type') !== 'hidden') {

                            $(this).val('');
                        }
                    });

                    _this.$broadcast('userChanged');
                } else {

                    window.open(res.redirect, '_blank');

                    _this.state = false;
                }
            }).fail(function () {
                _this.isConfirm = false;
            });
        },
        changeState: function changeState() {

            if (this.state === false) {

                this.state = true;

                var $table = $("#employee-table");

                $("html, body").animate({
                    scrollTop: $table.offset().top + $table.height()
                }, 400);
            } else {

                this.state = false;
            }
        },
        showCategory: function showCategory(id) {

            for (var iterator in this.categories) {

                if (this.categories[iterator].id !== id) {

                    this.categories[iterator].show = false;
                } else {

                    if (this.categories[iterator].show === false) {

                        this.categories[iterator].show = true;
                    } else {

                        this.categories[iterator].show = false;
                    }
                }
            }
        },
        changeStatus: function changeStatus(event) {

            var $element = $(event.target);

            var status = 'admin';

            if ($element.is(":checked")) {

                status = 'employee';
            }

            $.ajax({
                url: '/office/employees/change_status',
                type: 'POST',
                data: {
                    status: status,
                    _token: ajax.getToken()
                }
            }).done(function (response) {

                if (response.redirect !== undefined && response.redirect !== null && !response.redirect.length) {

                    window.open(response.redirect, '_blank');
                }

                this.$broadcast('userChanged');
            }.bind(this));
        }
    },

    watch: {
        'isConfirm': function isConfirm() {
            if (this.isConfirm == true) {
                this.submitCreateEmpl();
            }
        }
    },

    events: {
        getServicesCategories: function getServicesCategories() {

            $.get('/office/start_assistant/getServicesCategories').done(function (response) {

                this.categories = response.data;
            }.bind(this));
        }
    }
});

exports.default = AssistantCreateEmployee;

},{"../ajax.js":92,"./ConfirmVue.vue":117,"./EmployeesListVue.js":122,"./vue-strap/src/Alert.vue":140,"vue":89}],114:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _vue = require('vue');

var _vue2 = _interopRequireDefault(_vue);

var _ajax = require('../ajax.js');

var ajax = _interopRequireWildcard(_ajax);

var _mixins = require('../mixins.js');

var _WorkTimesVue = require('./WorkTimesVue.vue');

var _WorkTimesVue2 = _interopRequireDefault(_WorkTimesVue);

var _AssistantCreateNewEmployee = require('./AssistantCreateNewEmployee.js');

var _AssistantCreateNewEmployee2 = _interopRequireDefault(_AssistantCreateNewEmployee);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {

    components: { WorkTimesVue: _WorkTimesVue2.default, AssistantCreateNewEmployee: _AssistantCreateNewEmployee2.default },

    data: function data() {
        return {
            step: 0,
            bankInfo: 'no',
            imgs: {
                avatar: '',
                logo: ''
            },
            assistantData: {
                agreement: 0
            },
            countries: [],
            states: [],
            cities: [],
            startData: {
                admin_data: {}
            }
        };
    },


    mixins: [_mixins.GET_COUNTRIES, _mixins.GET_STATES, _mixins.GET_CITIES],

    ready: function ready() {
        this.getCountries();
        this.getStartData();
        this.$broadcast('getWorktimes');
    },


    methods: {
        dataURItoBlob: function dataURItoBlob(dataURI) {
            var binary = atob(dataURI.split(',')[1]);
            var array = [];
            for (var i = 0; i < binary.length; i++) {
                array.push(binary.charCodeAt(i));
            }
            return new Blob([new Uint8Array(array)], { type: 'image/jpeg' });
        },
        changeAvatar: function changeAvatar() {
            $('#assistantAvatar').click();
        },
        changeLogo: function changeLogo() {
            $('#assistantLogo').click();
        },
        onFileChange: function onFileChange(e, who) {
            var files = e.target.files || e.dataTransfer.files;
            if (!files.length) return;
            this.createImage(files[0], who);
        },
        createImage: function createImage(file, who) {
            var _this = this;

            var image = new Image();
            var reader = new FileReader();
            var vm = this;

            reader.onload = function (e) {
                vm.imgs[who] = e.target.result;

                if (who === 'avatar') {
                    _this.sendAvatar('#assistantUploadAvatar');
                } else if (who === 'logo') {
                    _this.sendLogo('#assistantUploadLogo');
                }
            };
            reader.readAsDataURL(file);
        },
        getCountries: function getCountries() {
            var _this2 = this;

            var path = '/' + ajax.pathWho + '/get_location';

            ajax.sendAjax({}, path).done(function (countries) {
                _this2.countries = countries;
            });
        },
        getStartData: function getStartData() {
            var _this3 = this;

            var data = {};
            var path = '/' + ajax.pathWho + '/start_assistant/get_start_data';

            ajax.sendAjax(data, path).done(function (startData) {
                _this3.startData = startData;
            });
        },
        sendAvatar: function sendAvatar() {
            var vm = this;
            var $form = $('#assistantUploadAvatar');
            var $input = $form.find('input[type="file"]');
            var fd = new FormData();

            fd.append('avatar', $input.prop('files')[0]);

            vm.showImgPreloader = true;

            $.ajax({
                url: window.location['pathname'] + '/store_avatar',
                data: fd,
                processData: false,
                contentType: false,
                type: 'POST',
                success: function success(src) {
                    vm.showImgPreloader = false;
                },
                error: function error() {
                    vm.showImgPreloader = false;
                }
            });
        },
        sendLogo: function sendLogo(form) {
            var vm = this;
            var $form = $('#assistantUploadLogo');
            var $input = $form.find('input[type="file"]');
            var fd = new FormData();

            fd.append('firm_logo', $input.prop('files')[0]);

            vm.showImgPreloader = true;

            $.ajax({
                url: window.location['pathname'] + '/store_logo',
                data: fd,
                processData: false,
                contentType: false,
                type: 'POST',
                success: function success(src) {
                    vm.showImgPreloader = false;
                },
                error: function error() {
                    vm.showImgPreloader = false;
                }
            });
        },
        nextStep: function nextStep() {
            var _this4 = this;

            var vm = this;
            var isValidStep = this.isValidStep(this.step);

            if (isValidStep) {

                if (this.step === 5) {
                    var data = this.assistantData;
                    var path = '/' + ajax.pathWho + '/start_assistant/confirm';

                    $.ajax({
                        type: 'POST',
                        url: path,
                        dataType: 'JSON',
                        data: data
                    }).done(function (res) {
                        if (res) {
                            _this4.step = _this4.step + 1;
                        }
                    }).fail(function () {
                        return;
                    });
                }

                if (this.step < 5) {
                    this.step = this.step + 1;
                }
            }
        },
        prevStep: function prevStep() {
            this.step = this.step - 1;
        },
        getTariffName: function getTariffName(e) {
            var $btn = $(e.target);
            this.assistantData.tariff_id = $btn.attr('data-tariff-name');

            this.nextStep();
        },
        isValidStep: function isValidStep(step) {
            switch (step) {
                case 0:
                    return true;
                    break;

                case 1:
                    var form = $('#assistantForm1');
                    var isValid = form.valid();

                    //            if (this.imgs.avatar === '') {
                    //              $('#assistantUploadAvatar').addClass('animated bounce');
                    //              setTimeout(() => $('#assistantUploadAvatar').removeClass('animated bounce'), 1000);
                    //            }

                    if (isValid) {
                        return true;
                    } else {
                        return false;
                    }

                    break;

                case 2:
                    form = $('#assistantForm2');
                    isValid = form.valid();

                    //            if (this.imgs.logo === '') {
                    //              $('#assistantUploadLogo').addClass('animated bounce');
                    //              setTimeout(() => $('#assistantUploadLogo').removeClass('animated bounce'), 1000);
                    //            }

                    if (isValid) {
                        return true;
                    } else {
                        return false;
                    }

                    break;

                //          case 3:
                //            isValid = !!(this.assistantData.tariff_id);
                //            return isValid;
                //            break;
                case 3:
                    this.$broadcast('getServicesCategories');
                    this.$broadcast('userChanged');
                    return true;
                    break;
                case 4:
                    this.$broadcast('getWorktimes');
                    return true;
                    break;
                case 5:
                    return true;
                    break;
                case 6:
                    return false;
                    break;
            }
        }
    }
};
if (module.exports.__esModule) module.exports = module.exports.default
;(typeof module.exports === "function"? module.exports.options: module.exports).template = "\n    <div class=\"assistant\">\n\n        <section v-show=\"step === 0\" class=\"assistant-hero\" style=\"margin-top: calc(25% - 140px)\">\n            <div class=\"assistant-hero_2_in\" style=\"width: 100%\">\n                <h1 class=\"assistant-hero__heading\" style=\"width: 100%; text-align: center; display: table;\">{{ $t(\"step0.heading\") }}, {{ startData.admin_data.firstname }}!</h1>\n                <div class=\"assistant-hero__desc\" style=\"width: 100%; text-align: center; display: table;\">{{ $t(\"step0.desc\") }}</div>\n                <button @click=\"nextStep\" class=\"assistant-btn assistant-btn--red\">{{ $t(\"step0.btn\") }}\n                </button>\n            </div>\n        </section>\n\n        <section v-show=\"step === 1\" class=\"assistant-step\">\n            <h2 class=\"assistant-heading--h2\">\n                {{ $t(\"all.heading\") }}<br>\n                {{ $t(\"all.step\") }} {{ step }} / 5\n            </h2>\n\n            <div class=\"assistant-step__in\">\n                <div class=\"assistant-step__left\">\n\n                    <div class=\"assistant-block\">\n                        <div class=\"assistant-block__label\">{{ $t(\"step1.label1\") }}</div>\n                        <form id=\"assistantForm1\" class=\"assistant-form\">\n\n                            <div class=\"assistant-form__row\">\n                                <div class=\"assistant-form__col assistant-form__col--3\">\n                                    <label for=\"greeting\" class=\"assistant-form__label\">{{ $t(\"step1.greeting\")\n                                        }}</label>\n                                    <select v-model=\"assistantData.greeting\" @change=\"assistantData.gender = assistantData.greeting\" :value=\"startData.admin_data.gender\" name=\"greeting\" id=\"greeting\" class=\"assistant-input assistant-input--select\">\n                                        <option value=\"male\">{{ $t(\"step1.herr\") }}</option>\n                                        <option value=\"female\">{{ $t(\"step1.frau\") }}</option>\n                                    </select>\n                                </div>\n                            </div>\n\n                            <div class=\"assistant-form__row\">\n\n                                <div class=\"assistant-form__col assistant-form__col--6\">\n                                    <label for=\"first-name\" class=\"assistant-form__label\">{{ $t(\"step1.name\") }}</label>\n                                    <input v-model=\"assistantData.firstname\" :value=\"startData.admin_data.firstname\" type=\"text\" name=\"firstname\" class=\"assistant-input\" id=\"first-name\" required=\"\">\n                                </div>\n\n                                <div class=\"assistant-form__col assistant-form__col--6\">\n                                    <label for=\"last-name\" class=\"assistant-form__label\">{{ $t(\"step1.lastName\")\n                                        }}</label>\n                                    <input v-model=\"assistantData.lastname\" :value=\"startData.admin_data.lastname\" type=\"text\" name=\"lastname\" class=\"assistant-input\" id=\"last-name\" required=\"\">\n                                </div>\n\n                            </div>\n\n                            <div class=\"assistant-form__row\">\n\n                                <div class=\"assistant-form__col assistant-form__col--6\">\n                                    <label for=\"email\" class=\"assistant-form__label\">E-Mail</label>\n                                    <input v-model=\"assistantData.email\" :value=\"startData.admin_data.email\" type=\"email\" class=\"assistant-input\" id=\"email\" required=\"\" name=\"email\">\n                                </div>\n\n                                <div class=\"assistant-form__col assistant-form__col--6\">\n                                    <label for=\"website\" class=\"assistant-form__label\">Website</label>\n                                    <input v-model=\"assistantData.firmname\" type=\"text\" class=\"assistant-input\" id=\"website\" required=\"\" name=\"firmname\">\n                                </div>\n\n                            </div>\n\n                            <div class=\"assistant-form__row\">\n\n                                <div class=\"assistant-form__col assistant-form__col--6\">\n                                    <label for=\"phone\" class=\"assistant-form__label\">{{ $t(\"step1.tel\") }}</label>\n                                    <input v-model=\"assistantData.telnumber\" :value=\"startData.admin_data.telnumber\" type=\"tel\" class=\"assistant-input\" id=\"phone\" required=\"\" name=\"telnumber\">\n                                </div>\n\n                                <div class=\"assistant-form__col assistant-form__col--6\">\n                                    <label for=\"mobile\" class=\"assistant-form__label\">{{ $t(\"step1.mobile\") }}</label>\n                                    <input v-model=\"assistantData.mobile\" :value=\"startData.admin_data.mobile\" type=\"tel\" class=\"assistant-input\" id=\"mobile\" name=\"mobile\">\n                                </div>\n\n                            </div>\n\n                            <div class=\"assistant-form__row\">\n\n                                <div class=\"assistant-form__col assistant-form__col--6\">\n                                    <label for=\"gender\" class=\"assistant-form__label\">{{ $t(\"step1.gender\") }}</label>\n                                    <select v-model=\"assistantData.gender\" @change=\"assistantData.greeting = assistantData.gender\" :value=\"startData.admin_data.gender\" name=\"gender\" id=\"gender\" class=\"assistant-input assistant-input--select\">\n                                        <option value=\"male\">{{ $t(\"step1.male\") }}</option>\n                                        <option value=\"female\">{{ $t(\"step1.female\") }}</option>\n                                    </select>\n                                </div>\n\n                                <div class=\"assistant-form__col assistant-form__col--6\">\n                                    <label for=\"birthday\" class=\"assistant-form__label\">{{ $t(\"step1.birthday\")\n                                        }}</label>\n                                    <input v-model=\"assistantData.birthday\" name=\"birthday\" id=\"birthday\" class=\"assistant-input input-date\" type=\"text\">\n                                </div>\n\n                            </div>\n\n                        </form>\n                    </div>\n\n                    <div class=\"assistant-step__btns\">\n                        <button @click=\"prevStep\" class=\"assistant-btn assistant-btn--gray\">{{ $t(\"all.back\") }}\n                        </button>\n                        <button @click=\"nextStep\" class=\"assistant-btn assistant-btn--red\">{{ $t(\"all.next\") }}\n                        </button>\n                    </div>\n                </div>\n\n                <form class=\"assistant-block assistant-upload\" id=\"assistantUploadAvatar\">\n                    <div class=\"assistant-block__label\">{{ $t(\"step1.label2\") }}</div>\n                    <div @dragover.prevent=\"\" @drop=\"onFileChange($event, 'avatar')\" class=\"assistant-upload__drop\">\n                        <input class=\"assistant-block__file\" id=\"assistantAvatar\" type=\"file\" @change=\"onFileChange($event, 'avatar')\">\n                        <img class=\"assistant-upload__image\" :src=\"imgs.avatar || startData.avatar.path\">\n                    </div>\n\n                    <button @click.stop.prevent=\"changeAvatar\" class=\"assistant-upload__btn assistant-btn assistant-btn--red\">{{ $t(\"step1.uploadAvatar\")\n                        }}\n                    </button>\n                </form>\n\n            </div>\n        </section>\n\n        <section v-show=\"step === 2\" class=\"assistant-step\">\n            <h2 class=\"assistant-heading--h2\">\n                {{ $t(\"step2.heading\") }}<br>\n                {{ $t(\"all.step\") }} {{ step }} / 5\n            </h2>\n\n            <div class=\"assistant-step__in\">\n                <div class=\"assistant-step__left\">\n\n                    <div class=\"assistant-block\">\n                        <div class=\"assistant-block__label\">{{ $t(\"step2.label1\") }}</div>\n                        <form id=\"assistantForm2\" class=\"assistant-form\">\n\n                            <div class=\"assistant-form__row\">\n                                <div class=\"assistant-form__col assistant-form__col--12\">\n                                    <label for=\"name-company\" class=\"assistant-form__label\">{{ $t(\"step2.companyName\")\n                                        }}</label>\n                                    <input v-model=\"assistantData.firm_name\" type=\"text\" name=\"firm_name\" class=\"assistant-input\" id=\"name-company\">\n                                </div>\n                            </div>\n\n                            <div class=\"assistant-form__row\">\n\n                                <div class=\"assistant-form__col assistant-form__col--4\">\n                                    <label for=\"country\" class=\"assistant-form__label\">{{ $t(\"all.country\") }}</label>\n                                    <select v-model=\"assistantData.country\" @change.stop=\"getStates(assistantData.country)\" name=\"country\" id=\"country\" class=\"assistant-input assistant-input--select\" placeholder=\"Select country...\">\n                                        <option v-for=\"country in countries\" :value=\"country.country_id\">{{ country.name\n                                            }}\n                                        </option>\n                                    </select>\n                                </div>\n\n                                <div class=\"assistant-form__col assistant-form__col--4\">\n                                    <label for=\"state\" class=\"assistant-form__label\">{{ $t(\"all.region\") }}</label>\n                                    <select @change.stop=\"getCities(assistantData.state)\" v-model=\"assistantData.state\" name=\"state\" id=\"state\" class=\"assistant-input assistant-input--select\" placeholder=\"Select state...\">\n                                        <option v-for=\"state in states\" :value=\"state.state_id\">{{ state.name }}\n                                        </option>\n                                    </select>\n                                </div>\n\n                                <div class=\"assistant-form__col assistant-form__col--4\">\n                                    <label for=\"city\" class=\"assistant-form__label\">Stadt</label>\n                                    <select v-model=\"assistantData.city\" class=\"assistant-input assistant-input--select\" name=\"city\" id=\"city\" placeholder=\"Select city...\">\n                                        <option v-for=\"city in cities\" :value=\"city.city_id\">{{ city.name }}</option>\n                                    </select>\n                                </div>\n\n                            </div>\n\n                            <div class=\"assistant-form__row\">\n\n                                <div class=\"assistant-form__col assistant-form__col--6\">\n                                    <label for=\"index\" class=\"assistant-form__label\">{{ $t(\"all.postIndex\") }}</label>\n                                    <input v-model=\"assistantData.post_index\" type=\"text\" class=\"assistant-input\" id=\"index\" name=\"post_index\" required=\"\">\n                                </div>\n\n                                <div class=\"assistant-form__col assistant-form__col--6\">\n                                    <label for=\"street\" class=\"assistant-form__label\">{{ $t(\"all.address\") }}</label>\n                                    <input v-model=\"assistantData.street\" type=\"text\" class=\"assistant-input\" id=\"street\" name=\"street\" required=\"\">\n                                </div>\n\n                            </div>\n\n                            <div class=\"assistant-form__row\">\n\n                                <div class=\"assistant-form__col assistant-form__col--6\">\n                                    <label for=\"business\" class=\"assistant-form__label\">{{ $t(\"all.business\") }}</label>\n                                    <select v-model=\"assistantData.firmtype\" name=\"firmtype\" id=\"business\" class=\"assistant-input assistant-input--select\" placeholder=\"Wähle Deine Branche aus…\">\n                                        <option value=\"\">{{ $t(\"step2.business\") }}</option>\n                                        <option v-for=\"firmtype in startData.firmtype\" :selected=\"firmtype.id === startData.admin_data.firmtype\" :value=\"firmtype.id\">{{ firmtype.firmtype }}\n                                        </option>\n                                    </select>\n                                </div>\n\n                            </div>\n\n                        </form>\n                    </div>\n\n                    <div class=\"assistant-step__btns\">\n                        <button @click=\"prevStep\" class=\"assistant-btn assistant-btn--gray\">{{ $t(\"all.back\") }}\n                        </button>\n                        <button @click=\"nextStep\" class=\"assistant-btn assistant-btn--red\">{{ $t(\"all.next\") }}\n                        </button>\n                    </div>\n                </div>\n\n                <div class=\"assistant-block assistant-upload\" id=\"assistantUploadLogo\">\n                    <div class=\"assistant-block__label\">{{ $t(\"step2.label2\") }}</div>\n                    <div @dragover.prevent=\"\" @drop=\"onFileChange($event, 'logo')\" class=\"assistant-upload__drop\">\n                        <input class=\"assistant-block__file\" id=\"assistantLogo\" type=\"file\" @change=\"onFileChange($event, 'logo')\">\n                        <img class=\"assistant-upload__image\" :src=\"imgs.logo\">\n                    </div>\n\n                    <button @click.stop.prevent=\"changeLogo\" class=\"assistant-upload__btn assistant-btn assistant-btn--red\">{{ $t(\"step2.uploadLogo\") }}\n                    </button>\n                </div>\n\n            </div>\n        </section>\n\n        <!--<section v-show=\"step === 3\" class=\"assistant-step\">-->\n            <!--<h2 class=\"assistant-heading&#45;&#45;h2\">-->\n                <!--{{ $t(\"all.heading\") }}<br />-->\n                <!--{{ $t(\"all.step\") }} {{ step }} / 6-->\n            <!--</h2>-->\n\n            <!--<div class=\"assistant-step__in\">-->\n                <!--<div class=\"assistant-step__left\">-->\n\n                    <!--<div class=\"assistant-block\">-->\n                        <!--<div class=\"assistant-block__label\">{{ $t(\"all.billingAddress\") }}</div>-->\n                        <!--<form id=\"assistantForm4\" class=\"assistant-form\">-->\n\n                            <!--<div class=\"assistant-form__row\">-->\n\n                                <!--<div class=\"assistant-form__col assistant-form__col&#45;&#45;12\">-->\n                                    <!--<label for=\"companyName2\" class=\"assistant-form__label\">{{ $t(\"step4.companyName\")-->\n                                        <!--}}</label>-->\n                                    <!--<input v-model=\"assistantData.legal_firm_name\" type=\"text\" class=\"assistant-input\"-->\n                                           <!--id=\"companyName2\" name=\"legal_firm_name\">-->\n                                <!--</div>-->\n\n                            <!--</div>-->\n\n                            <!--<div class=\"assistant-form__row\">-->\n\n                                <!--<div class=\"assistant-form__col assistant-form__col&#45;&#45;4\">-->\n                                    <!--<label for=\"country2\" class=\"assistant-form__label\">{{ $t(\"all.country\") }}</label>-->\n                                    <!--<select-->\n                                            <!--v-model=\"assistantData.legal_country\"-->\n                                            <!--@change.stop=\"getStates(assistantData.legal_country)\"-->\n                                            <!--name=\"country\" id=\"country2\" class=\"assistant-input assistant-input&#45;&#45;select\"-->\n                                            <!--placeholder=\"Select country...\">-->\n                                        <!--<option v-for=\"country in countries\" :value=\"country.country_id\">{{ country.name-->\n                                            <!--}}-->\n                                        <!--</option>-->\n                                    <!--</select>-->\n                                <!--</div>-->\n\n                                <!--<div class=\"assistant-form__col assistant-form__col&#45;&#45;4\">-->\n                                    <!--<label for=\"state2\" class=\"assistant-form__label\">{{ $t(\"all.region\") }}</label>-->\n                                    <!--<select-->\n                                            <!--@change.stop=\"getCities(assistantData.legal_state)\"-->\n                                            <!--v-model=\"assistantData.legal_state\" name=\"state\" id=\"state2\"-->\n                                            <!--class=\"assistant-input assistant-input&#45;&#45;select\"-->\n                                            <!--placeholder=\"Select state...\">-->\n                                        <!--<option v-for=\"state in states\" :value=\"state.state_id\">{{ state.name }}-->\n                                        <!--</option>-->\n                                    <!--</select>-->\n                                <!--</div>-->\n\n                                <!--<div class=\"assistant-form__col assistant-form__col&#45;&#45;4\">-->\n                                    <!--<label for=\"city2\" class=\"assistant-form__label\">{{ $t(\"all.city\") }}</label>-->\n                                    <!--<select v-model=\"assistantData.legal_city\"-->\n                                            <!--class=\"assistant-input assistant-input&#45;&#45;select\" name=\"city\" id=\"city2\"-->\n                                            <!--placeholder=\"Select city...\">-->\n                                        <!--<option v-for=\"city in cities\" :value=\"city.city_id\">{{ city.name }}</option>-->\n                                    <!--</select>-->\n                                <!--</div>-->\n\n                            <!--</div>-->\n\n                            <!--<div class=\"assistant-form__row\">-->\n\n                                <!--<div class=\"assistant-form__col assistant-form__col&#45;&#45;3\">-->\n                                    <!--<label for=\"index2\" class=\"assistant-form__label\">{{ $t(\"all.postIndex\") }}</label>-->\n                                    <!--<input v-model=\"assistantData.legal_post_index\" type=\"text\" class=\"assistant-input\"-->\n                                           <!--id=\"index2\" name=\"post_index\">-->\n                                <!--</div>-->\n\n                                <!--<div class=\"assistant-form__col assistant-form__col&#45;&#45;9\">-->\n                                    <!--<label for=\"street2\" class=\"assistant-form__label\">{{ $t(\"all.address\") }}</label>-->\n                                    <!--<input v-model=\"assistantData.legal_street\" type=\"text\" class=\"assistant-input\"-->\n                                           <!--id=\"street2\" name=\"street\">-->\n                                <!--</div>-->\n\n                            <!--</div>-->\n\n                        <!--</form>-->\n                    <!--</div>-->\n\n                    <!--<div class=\"assistant-block\">-->\n                        <!--<div class=\"assistant-block__label\">{{ $t(\"all.bankDetails\") }}</div>-->\n                        <!--<form id=\"assistantForm4-2\" class=\"assistant-form\">-->\n\n                            <!--<div class=\"assistant-form__row\">-->\n                                <!--<div class=\"assistant-form__col&#45;&#45;12\">-->\n                                    <!--<label>-->\n                                        <!--<input-->\n                                                <!--@change.stop=\"assistantData.agreement = 0\"-->\n                                                <!--v-model=\"bankInfo\" value=\"no\" type=\"radio\"> {{ $t(\"step4.radioNo\") }}-->\n                                    <!--</label>-->\n                                    <!--<label>-->\n                                        <!--<input-->\n                                                <!--@change.stop=\"assistantData.agreement = 1\"-->\n                                                <!--v-model=\"bankInfo\" value=\"yes\" type=\"radio\"> {{ $t(\"step4.radioYes\") }}-->\n                                    <!--</label>-->\n                                <!--</div>-->\n                            <!--</div>-->\n\n                            <!--<div v-show=\"assistantData.agreement === 1\" class=\"assistant-form__row\">-->\n\n                                <!--<div class=\"assistant-form__col assistant-form__col&#45;&#45;6\">-->\n                                    <!--<label for=\"iban\" class=\"assistant-form__label\">IBAN</label>-->\n                                    <!--<input-->\n                                            <!--v-model=\"assistantData.iban\"-->\n                                            <!--:disabled=\"bankInfo === 'no'\"-->\n                                            <!--type=\"text\" class=\"assistant-input\" id=\"iban\" name=\"iban\">-->\n                                <!--</div>-->\n\n                                <!--<div class=\"assistant-form__col assistant-form__col&#45;&#45;6\">-->\n                                    <!--<label for=\"bic\" class=\"assistant-form__label\">BIC</label>-->\n                                    <!--<input-->\n                                            <!--v-model=\"assistantData.bic\"-->\n                                            <!--:disabled=\"bankInfo === 'no'\"-->\n                                            <!--type=\"text\" class=\"assistant-input\" id=\"bic\" name=\"bic\">-->\n                                <!--</div>-->\n\n                            <!--</div>-->\n\n                            <!--<div v-show=\"assistantData.agreement === 1\" class=\"assistant-form__row\">-->\n\n                                <!--<div class=\"assistant-form__col assistant-form__col&#45;&#45;6\">-->\n                                    <!--<label for=\"bank\" class=\"assistant-form__label\">{{ $t(\"all.bankName\") }}</label>-->\n                                    <!--<input-->\n                                            <!--v-model=\"assistantData.bank_name\"-->\n                                            <!--:disabled=\"bankInfo === 'no'\"-->\n                                            <!--type=\"text\" class=\"assistant-input\" id=\"bank\" name=\"bank_name\">-->\n                                <!--</div>-->\n\n                                <!--<div class=\"assistant-form__col assistant-form__col&#45;&#45;6\">-->\n                                    <!--<label for=\"owner\" class=\"assistant-form__label\">{{ $t(\"all.owner\") }}</label>-->\n                                    <!--<input-->\n                                            <!--v-model=\"assistantData.account_owner\"-->\n                                            <!--:disabled=\"bankInfo === 'no'\"-->\n                                            <!--type=\"text\" class=\"assistant-input\" id=\"owner\" name=\"account_owner\">-->\n                                <!--</div>-->\n\n                            <!--</div>-->\n\n<!--                            <div\n                                    v-show=\"bankInfo === 'yes'\"\n                                    class=\"assistant-form__row\">\n                                <div>\n                                    <input\n                                            @change.stop=\"assistantData.agreement ? assistantData.agreement = 1 : assistantData.agreement = 0\"\n                                            v-model=\"assistantData.agreement\"\n                                            :disabled=\"bankInfo === 'no'\"\n                                            id=\"assistantAgreeCheckbox\"\n                                            class=\"assistant-form__checkbox assistant-input&#45;&#45;checkbox\"\n                                            name=\"agreement\" type=\"checkbox\">\n                                    <label class=\"\" for=\"assistantAgreeCheckbox\"></label>\n                                </div>\n                                <div>{{ $t(\"step4.agreeMess\") }}</div>\n                            </div>-->\n\n                        <!--</form>-->\n                    <!--</div>-->\n\n                    <!--<div class=\"assistant-step__btns\">-->\n                        <!--<button-->\n                                <!--@click=\"prevStep\"-->\n                                <!--class=\"assistant-btn assistant-btn&#45;&#45;gray\">{{ $t(\"all.back\") }}-->\n                        <!--</button>-->\n                        <!--<button-->\n                                <!--@click=\"nextStep\"-->\n                                <!--class=\"assistant-btn assistant-btn&#45;&#45;red\">{{ $t(\"all.next\") }}-->\n                        <!--</button>-->\n                    <!--</div>-->\n                <!--</div>-->\n\n            <!--</div>-->\n        <!--</section>-->\n\n        <section v-show=\"step === 3\" class=\"assistant-hero\">\n            <div class=\"assistant-step__in\">\n                <h2 class=\"assistant-heading--h2\">\n                    {{ $t(\"step6.heading\") }}<br>\n                    {{ $t(\"all.step\") }} {{ step }} / 5\n                </h2>\n                <div class=\"assistant-block no-width-padding\" style=\"width: 1004px;\">\n                    <div class=\"assistant-block__label\">{{ $t(\"step6.label1\") }}</div>\n                    <services-vue></services-vue>\n                </div>\n                <div class=\"assistant-step__btns left-buttons\" style=\"width: 100%; margin-left: calc((100% - 1004px) / 2)\">\n                    <button @click=\"prevStep\" class=\"assistant-btn assistant-btn--gray\">{{ $t(\"all.back\") }}\n                    </button>\n                    <button @click=\"nextStep\" class=\"assistant-btn assistant-btn--red\">{{ $t(\"all.next\") }}\n                    </button>\n                </div>\n            </div>\n        </section>\n\n        <section v-show=\"step === 4\" class=\"assistant-hero\">\n            <div class=\"assistant-step__in\">\n                <h2 class=\"assistant-heading--h2\">\n                    {{ $t(\"step7.heading\") }}<br>\n                    {{ $t(\"all.step\") }} {{ step }} / 5\n                </h2>\n                <div class=\"assistant-block no-width-padding no-height-padding\" style=\"width: 1004px;\">\n                        <div class=\"assistant-block__label\">{{ $t(\"step7.label1\") }}</div>\n                        <assistant-create-employee></assistant-create-employee>\n                </div>\n                <div class=\"assistant-step__btns left-buttons\" style=\"width: 100%; margin-left: calc((100% - 1004px) / 2)\">\n                    <button @click=\"prevStep\" class=\"assistant-btn assistant-btn--gray\">{{ $t(\"all.back\") }}\n                    </button>\n                    <button @click=\"nextStep\" class=\"assistant-btn assistant-btn--red\">{{ $t(\"all.next\") }}\n                    </button>\n                </div>\n            </div>\n        </section>\n\n        <section v-show=\"step === 5\" class=\"assistant-hero\">\n            <div class=\"assistant-step__in\">\n                <h2 class=\"assistant-heading--h2\">\n                    {{ $t(\"step8.heading\") }}<br>\n                    {{ $t(\"all.step\") }} {{ step }} / 5\n                </h2>\n                <div class=\"assistant-block\" style=\"width: 1004px; padding-bottom: 150px;\">\n                    <div class=\"assistant-block__label\">{{ $t(\"step8.label1\") }}</div>\n                    <work-times-vue></work-times-vue>\n                </div>\n                <div class=\"assistant-step__btns left-buttons\" style=\"width: 100%; margin: 40px calc((100% - 1004px) / 2); text-align: left\">\n                    <button @click=\"prevStep\" class=\"assistant-btn assistant-btn--gray\">{{ $t(\"all.back\") }}\n                    </button>\n                    <button @click=\"nextStep\" class=\"assistant-btn assistant-btn--red\">{{ $t(\"all.next\") }}\n                    </button>\n                </div>\n            </div>\n        </section>\n\n        <section v-show=\"step === 6\" class=\"assistant-hero\">\n            <div class=\"assistant-hero__in\">\n                <div style=\"position: absolute; top: 95px; left: calc(50% - 480px / 2);\">\n                    <div class=\"assistant-hero__ok\"></div>\n                    <h1 class=\"assistant-heading--h2\">{{ $t(\"step5.heading\") }}</h1>\n                    <p class=\"assistant-hero__desc\">{{ $t(\"step5.desc\") }}</p>\n                    <a href=\"/office\" class=\"assistant-btn assistant-btn--red\">{{ $t(\"all.next\") }}</a>\n                </div>\n            </div>\n        </section>\n\n    </div>\n"
if (module.hot) {(function () {  module.hot.accept()
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  if (!module.hot.data) {
    hotAPI.createRecord("_v-e0c929b0", module.exports)
  } else {
    hotAPI.update("_v-e0c929b0", module.exports, (typeof module.exports === "function" ? module.exports.options : module.exports).template)
  }
})()}
},{"../ajax.js":92,"../mixins.js":105,"./AssistantCreateNewEmployee.js":113,"./WorkTimesVue.vue":137,"vue":89,"vue-hot-reload-api":86}],115:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _vue = require('vue');

var _vue2 = _interopRequireDefault(_vue);

var _ajax = require('../ajax.js');

var ajax = _interopRequireWildcard(_ajax);

var _mixins = require('../mixins.js');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BillingVue = _vue2.default.component('billing-vue', {
    template: '#billing-template',

    mixins: [_mixins.GET_COUNTRIES, _mixins.GET_STATES, _mixins.GET_CITIES],

    data: function data() {
        return {
            bankDetails: {},
            countries: [],
            states: [],
            cities: [],
            checkboxAgreement: false
        };
    },
    ready: function ready() {
        var _this = this;

        this.getBankDetails().done(function () {
            _this.getCountries();
            _this.getStates(_this.bankDetails.legal_country);
            _this.getCities(_this.bankDetails.legal_state);
        });
    },


    methods: {
        openBankModal: function openBankModal() {
            this.$root.openModal('#billingBankModal');
            if (this.bankDetails.agreement == 0) {
                this.bankDetails = {};
            }
            if (this.bankDetails.agreement == 1) {
                this.checkboxAgreement = true;
            }
        },
        refusal: function refusal() {
            var _this2 = this;

            var path = '/' + ajax.pathWho + '/billing/refusal';
            var data = {};

            ajax.sendAjax(data, path).done(function (res) {
                if (res) {
                    _this2.bankDetails.account_owner = '';
                    _this2.bankDetails.account_number = '';
                    _this2.bankDetails.bank_code = '';
                    _this2.bankDetails.bank_name = '';
                    _this2.bankDetails.iban = '';
                    _this2.bankDetails.bic = '';
                    _this2.bankDetails.agreement = 0;
                }
            });
        },
        openAdressModal: function openAdressModal() {
            this.$root.openModal('#billingAdressModal');
        },
        getBankDetails: function getBankDetails() {
            var vm = this;
            var path = '/' + ajax.pathWho + '/billing/get_bank_details';
            var data = {};

            return ajax.sendAjax(data, path).done(function (bankDetails) {
                if (bankDetails) {
                    vm.bankDetails = bankDetails;
                }
            });
        },
        setBankDetails: function setBankDetails(formStr) {
            var _this3 = this;

            var path = '/' + ajax.pathWho + '/billing/set_bank_details';
            var data = ajax.getFormData($('' + formStr));
            var $form = $('' + formStr);
            var isValidForm = $form.valid();

            if (isValidForm) {
                ajax.sendAjax(data, path).done(function (res) {
                    if (res) {
                        _this3.$root.closeModal('#billingAdressModal');
                        _this3.$root.closeModal('#billingBankModal');
                        _this3.getBankDetails();
                    }
                });
            }
        }
    }
});

exports.default = BillingVue;

},{"../ajax.js":92,"../mixins.js":105,"vue":89}],116:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vue = require('vue');

var _vue2 = _interopRequireDefault(_vue);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _ajax = require('../ajax.js');

var ajax = _interopRequireWildcard(_ajax);

var _lib = require('../lib.js');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ChatVue = _vue2.default.component('chat-vue', {
  template: '#chat-template',

  data: function data() {
    return {
      userId: null,
      showContact: false,
      text: '',
      userMessages: [],
      myId: _lib.MYID,
      showPrevBtn: false,
      countMess: null,
      searchPosition: -1,
      searchName: '',
      headingsLen: null
    };
  },
  ready: function ready() {
    var vm = this;

    vm.socketInit();
    vm.accordionInit();
    vm.highlightNewMess();

    var comerId = ajax.LOCPATH.substr(ajax.LOCPATH.lastIndexOf('/') + 1);

    if ($.isNumeric(comerId)) {
      var $fromItem = $('#' + comerId);
      var $heading = $fromItem.closest('.ui-accordion-content').prev().first();
      var $countMess = $('.search__send .search__count');

      if (+$countMess.text() !== 0) {
        var allCount = +$countMess.text();
        var newCount = allCount - 1;

        $countMess.text(newCount);
      }

      if (!$heading.hasClass('ui-accordion-header-active')) {
        $heading.click();
      }

      $fromItem.click();
    }
  },


  methods: {
    highlightNewMess: function highlightNewMess() {
      var $lists = $('.ui-accordion-content');

      $lists.each(function (i, el) {
        var countNum = 0;
        var $list = $(el);
        var $counts = $list.find('.contacts__count');

        $counts.each(function (i, el) {
          var $count = $(el);
          countNum += +$count.text();
        });

        if (countNum > 0) {
          $list.prev('.ui-accordion-header').addClass('not-read');
        } else {
          $list.prev('.ui-accordion-header').removeClass('not-read');
        }
      });
    },
    accordionInit: function accordionInit() {
      $("#chatAccordion").accordion({
        active: false,
        collapsible: true,
        heightStyle: 'content'
      });
    },
    socketInit: function socketInit() {
      var vm = this;
      var dataUserId = {
        data: {
          userId: _lib.MYID
        }
      };

      _lib.SOCKET.emit('regUser', dataUserId);

      _lib.SOCKET.on('new_message', function (data) {
        console.log('newMessage data', data);
        data.created_at = (0, _moment2.default)().format('YYYY-MM-DD HH:mm:ss');

        var $fromItem = $('#' + data.from);

        var $time = $fromItem.find('.contacts__time');
        var $text = $fromItem.find('.contacts__text');

        $time.text(data.created_at);
        $text.text(data.text);

        vm.sendAjaxUser();

        if (vm.userId == data.from) {
          vm.userMessages.messages.push(data);
        } else {
          var $fromCount = $fromItem.find('.contacts__count');
          var fromCountNumber = +$fromCount.text();
          $fromCount.text(fromCountNumber + 1);
        }

        vm.highlightNewMess();
        vm.scrollToBottom();
      });
    },
    prevBtnHandler: function prevBtnHandler() {
      this.showPrevBtn = this.userMessages.length > 10;
      this.countMess += 1;
      this.sendAjaxUser();
    },
    searchUsers: function searchUsers(e) {
      var vm = this;
      var $input = $(e.target);
      var searchName = $input.val();
      var $accordion = $('#chatAccordion');
      var $headings = $accordion.find('.avatar__heading');

      vm.headingsLen = $headings.length;
      vm.searchName = searchName.toUpperCase();

      if (vm.searchName.length < 3) return;

      $headings.each(function (i, el) {
        var $el = $(el);
        var userName = $el.text().toUpperCase();

        vm.headingsLen -= 1;

        if (vm.headingsLen === 0 && vm.searchPosition !== -1) {
          vm.searchPosition = -1;
          vm.headingsLen = null;
          vm.searchUsers(e);
        }

        // continue iteration
        if (vm.searchPosition >= i) {
          return true;
        }

        if (userName.indexOf(vm.searchName) > -1) {
          var $heading = $el.closest('.ui-accordion-content').prev().first();

          if (!$heading.hasClass('ui-accordion-header-active')) {
            $heading.click();
          }

          $el.closest('.eingang__item').click();

          vm.searchPosition = i;

          return false;
        }
      });
    },
    onEnterMess: function onEnterMess() {
      $('#sendMessBtn').trigger('click');
    },
    scrollToBottom: function scrollToBottom() {
      $('.contact__block-wrap').animate({
        scrollTop: $('.contact__block-wrap').prop("scrollHeight")
      }, 1000);
    },
    showMessage: function showMessage(e) {
      var _this = this;

      var userId = this.userId;
      var text = this.text.trim();
      var path = '/' + ajax.pathWho + '/messages/send_message';
      var $btn = $(e.target);

      if (!text) {
        return;
      }

      var data = {
        userId: userId,
        text: text,
        from: _lib.MYID,
        created_at: (0, _moment2.default)().format('YYYY-MM-DD HH:mm:ss')
      };

      console.log('send data', data);

      ajax.sendAjax(data, path).done(function (res) {
        $btn.closest('.contact').find('textarea').val('');
        _this.userMessages.messages.push(data);
        _this.userMessages.length = _this.userMessages.length + 1;
        _this.scrollToBottom();
      });
    },
    sendAjaxUser: function sendAjaxUser() {
      var _this2 = this;

      var path = '/' + ajax.pathWho + '/messages/get_user';

      var dataUserId = {
        userId: this.userId,
        count: this.countMess
      };

      ajax.sendAjax(dataUserId, path).done(function (messages) {
        console.log('messages', messages);

        _this2.userMessages = messages;
        _this2.highlightNewMess();

        _this2.$dispatch('newMess');

        if (_this2.userMessages.messages.length >= _this2.userMessages.length) {
          _this2.showPrevBtn = false;
          return;
        } else {
          _this2.showPrevBtn = _this2.userMessages.length > 10;
        }
      });
    },
    getUser: function getUser(e) {
      var $el = $(e.target);
      if (!$el.hasClass('eingang__item')) {
        $el = $el.closest('.eingang__item');
      };

      var id = +$el.attr('id');
      var $items = $('.eingang__item');

      var name = $el.find('.avatar__heading').text();
      var email = $el.find('.avatar__email').text();
      var imgSrc = $el.find('.avatar__img').attr('src');
      var $contact = $('#contact');
      var $avatar = $contact.find('.avatar img');
      var $avatarHeading = $contact.find('.avatar__heading');
      var $avatarEmail = $contact.find('.avatar__email');

      // Clear count messages
      var $count = $el.find('.contacts__count');
      $count.text('0');

      console.log($avatar);

      $avatar.attr('src', imgSrc);
      $avatarHeading.text(name);
      $avatarEmail.text(email);

      $items.removeClass('is-active');
      $el.addClass('is-active');

      this.userId = id;
      this.showContact = true;
      this.countMess = 1;
      this.sendAjaxUser();
    }
  }
});

exports.default = ChatVue;

},{"../ajax.js":92,"../lib.js":104,"moment":84,"vue":89}],117:[function(require,module,exports){
var __vueify_insert__ = require("vueify/lib/insert-css")
var __vueify_style__ = __vueify_insert__.insert("/* line 2, stdin */\n.confirm-vue[_v-380771f4] {\n  width: 100%;\n  height: 100%;\n  position: fixed;\n  top: 0;\n  bottom: 0;\n  right: 0;\n  left: 0;\n  margin: auto;\n  background-color: rgba(0, 0, 0, 0.4);\n  z-index: 1000; }\n  /* line 14, stdin */\n  .confirm-vue__in[_v-380771f4] {\n    width: 480px;\n    height: 140px;\n    background-color: #fff;\n    position: absolute;\n    top: 0;\n    bottom: 0;\n    right: 0;\n    left: 0;\n    text-align: center;\n    margin: auto;\n    border-radius: 10px; }\n  /* line 28, stdin */\n  .confirm-vue__text[_v-380771f4] {\n    font-size: 16px; }\n  /* line 32, stdin */\n  .confirm-vue__btn[_v-380771f4] {\n    border: 0;\n    display: inline-block;\n    padding: 12px 20px;\n    border-radius: 20px;\n    color: #ffffff;\n    text-align: center; }\n    /* line 40, stdin */\n    .confirm-vue__btn--ok[_v-380771f4] {\n      background-color: #5dca73; }\n      /* line 42, stdin */\n      .confirm-vue__btn--ok[_v-380771f4]:hover {\n        background-color: #309143; }\n    /* line 47, stdin */\n    .confirm-vue__btn--cancel[_v-380771f4] {\n      background-color: #adb7be; }\n      /* line 49, stdin */\n      .confirm-vue__btn--cancel[_v-380771f4]:hover {\n        background-color: #748591; }\n")
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    data: function data() {
        return {};
    },
    ready: function ready() {},


    props: {
        show: {
            type: Boolean,
            default: false,
            twoWay: true
        },

        isConfirm: {
            type: Boolean,
            default: false,
            twoWay: true
        }
    },

    methods: {
        cancel: function cancel() {
            this.isConfirm = false;
            this.show = false;
            this.$dispatch('changeTariff');
        },
        ok: function ok() {
            this.isConfirm = true;
            this.show = false;
            this.$dispatch('changeTariff');
        }
    }

};
if (module.exports.__esModule) module.exports = module.exports.default
;(typeof module.exports === "function"? module.exports.options: module.exports).template = "\n<div v-show=\"show\" class=\"confirm-vue\" _v-380771f4=\"\">\n    <div :class=\"['confirm-vue__in', {'animated bounce': show}]\" _v-380771f4=\"\">\n        <div class=\"confirm-vue__text\" _v-380771f4=\"\">\n            <slot _v-380771f4=\"\"></slot>\n        </div>\n        <div _v-380771f4=\"\">\n            <button class=\"confirm-vue__btn confirm-vue__btn--cancel\" @click=\"cancel\" _v-380771f4=\"\">Cancel</button>\n            <button class=\"confirm-vue__btn confirm-vue__btn--ok\" @click=\"ok\" _v-380771f4=\"\">OK</button>\n        </div>\n    </div>\n</div>\n"
if (module.hot) {(function () {  module.hot.accept()
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.dispose(function () {
    __vueify_insert__.cache["/* line 2, stdin */\n.confirm-vue[_v-380771f4] {\n  width: 100%;\n  height: 100%;\n  position: fixed;\n  top: 0;\n  bottom: 0;\n  right: 0;\n  left: 0;\n  margin: auto;\n  background-color: rgba(0, 0, 0, 0.4);\n  z-index: 1000; }\n  /* line 14, stdin */\n  .confirm-vue__in[_v-380771f4] {\n    width: 480px;\n    height: 140px;\n    background-color: #fff;\n    position: absolute;\n    top: 0;\n    bottom: 0;\n    right: 0;\n    left: 0;\n    text-align: center;\n    margin: auto;\n    border-radius: 10px; }\n  /* line 28, stdin */\n  .confirm-vue__text[_v-380771f4] {\n    font-size: 16px; }\n  /* line 32, stdin */\n  .confirm-vue__btn[_v-380771f4] {\n    border: 0;\n    display: inline-block;\n    padding: 12px 20px;\n    border-radius: 20px;\n    color: #ffffff;\n    text-align: center; }\n    /* line 40, stdin */\n    .confirm-vue__btn--ok[_v-380771f4] {\n      background-color: #5dca73; }\n      /* line 42, stdin */\n      .confirm-vue__btn--ok[_v-380771f4]:hover {\n        background-color: #309143; }\n    /* line 47, stdin */\n    .confirm-vue__btn--cancel[_v-380771f4] {\n      background-color: #adb7be; }\n      /* line 49, stdin */\n      .confirm-vue__btn--cancel[_v-380771f4]:hover {\n        background-color: #748591; }\n"] = false
    document.head.removeChild(__vueify_style__)
  })
  if (!module.hot.data) {
    hotAPI.createRecord("_v-380771f4", module.exports)
  } else {
    hotAPI.update("_v-380771f4", module.exports, (typeof module.exports === "function" ? module.exports.options : module.exports).template)
  }
})()}
},{"vue":89,"vue-hot-reload-api":86,"vueify/lib/insert-css":90}],118:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vue = require('vue');

var _vue2 = _interopRequireDefault(_vue);

var _ajax = require('../ajax.js');

var ajax = _interopRequireWildcard(_ajax);

var _ConfirmVue = require('./ConfirmVue.vue');

var _ConfirmVue2 = _interopRequireDefault(_ConfirmVue);

var _Alert = require('./vue-strap/src/Alert.vue');

var _Alert2 = _interopRequireDefault(_Alert);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CreateEmployeeVue = _vue2.default.component('create-employee-vue', {
  template: '#create-employee-template',

  components: { ConfirmVue: _ConfirmVue2.default, Alert: _Alert2.default },

  data: function data() {
    return {
      showConfirm: false,
      isConfirm: false,
      showCreateEmplAlert: false
    };
  },
  ready: function ready() {},


  methods: {
    trySendForm: function trySendForm() {
      var form = $('#userInfoForm');
      form.validate();
      var isValid = form.valid();
      if (isValid) {
        this.showConfirm = true;
      } else {
        this.showConfirm = false;
      }
    },
    submitCreateEmpl: function submitCreateEmpl() {
      var _this = this;

      var data = ajax.getFormData($('#userInfoForm'));
      var path = '/' + ajax.pathWho + '/employees/store';
      ajax.sendAjax(data, path).done(function (res) {
        if (res) {
          _this.isConfirm = false;
          location.href = '/office/employees';
        } else {
          _this.isConfirm = false;
          _this.showCreateEmplAlert = true;
        }
      }).fail(function (err) {
        _this.isConfirm = false;
        throw new Error(err);
      });
    }
  },

  watch: {
    'isConfirm': function isConfirm() {
      if (this.isConfirm == true) {
        this.submitCreateEmpl();
      }
    }
  }
});

exports.default = CreateEmployeeVue;

},{"../ajax.js":92,"./ConfirmVue.vue":117,"./vue-strap/src/Alert.vue":140,"vue":89}],119:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _vue = require('vue');

var _vue2 = _interopRequireDefault(_vue);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _ajax = require('../ajax.js');

var ajax = _interopRequireWildcard(_ajax);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DashboardVue = _vue2.default.component('dashboard-vue', {
    template: '#dashboard-template',

    data: function data() {
        return {
            dateFrom: '',
            dateTo: '',
            dashboardInfo: {},
            subdomainSum: 0,
            calendarSum: 0,
            deletedSum: 0,
            clientsSum: 0,
            adminsSum: 0,
            ordersSum: 0,
            emailsSum: 0,

            daysLimitModal: null,
            isFirstShowModal: false,
            days: 0
        };
    },
    ready: function ready() {
        this.setDom();
        this.datepickerInit();
        this.getDashboard('currentMonth');
    },


    methods: {
        setDom: function setDom() {
            this.daysLimitModal = $('[data-remodal-id="modal-days-limit"]').remodal();
        },
        chartInit: function chartInit() {
            var columns = void 0,
                types = void 0,
                colors = void 0,
                groups = void 0;
            var subdomainOrdersTxt = void 0,
                calendarOrdersTxt = void 0,
                deletedOrdersTxt = void 0,
                clientsCountTxt = void 0,
                adminsCountTxt = void 0,
                ordersSumTxt = void 0,
                emailsSumTxt = void 0;

            switch (this.$root.locale) {
                case 'de':
                    subdomainOrdersTxt = 'Aufträge durch Microsite';
                    calendarOrdersTxt = 'Aufträge';
                    deletedOrdersTxt = 'Stornierte Aufträge';
                    ordersSumTxt = 'GESAMTEINNAHME';
                    emailsSumTxt = 'Anzahl der gesendete E-Mails';
                    clientsCountTxt = 'Anzahl der Kunden';
                    adminsCountTxt = 'Anzahl der Administratoren';
                    break;
                case 'en':
                    subdomainOrdersTxt = 'Orders by microsite';
                    calendarOrdersTxt = 'Assignments';
                    deletedOrdersTxt = 'Cancelled orders';
                    ordersSumTxt = 'TOTAL REVENUE';
                    emailsSumTxt = 'Number of Emails Sent';
                    clientsCountTxt = 'Number of customers';
                    adminsCountTxt = 'Number of administrators';
                    break;
                case 'ru':
                    subdomainOrdersTxt = 'Заказы на сайте';
                    calendarOrdersTxt = 'Контракты';
                    deletedOrdersTxt = 'Отмененные заказы';
                    ordersSumTxt = 'ИТОГО ДОХОДОВ';
                    emailsSumTxt = 'Количество отправленных сообщений';
                    clientsCountTxt = 'Количество клиентов';
                    adminsCountTxt = 'Количество админов';
                    break;
            }

            if (ajax.pathWho === 'backend') {

                var subdomainOrders = (subdomainOrdersTxt + ', ' + this.dashboardInfo.subdomain_orders.join(', ')).split(', ');
                var calendarOrders = (calendarOrdersTxt + ', ' + this.dashboardInfo.calendar_orders.join(', ')).split(', ');
                var deletedOrders = (deletedOrdersTxt + ', ' + this.dashboardInfo.deleted_orders.join(', ')).split(', ');
                var clientsCount = (clientsCountTxt + ', ' + this.dashboardInfo.clients_count.join(', ')).split(', ');
                var adminsCount = (adminsCountTxt + ', ' + this.dashboardInfo.admins_count.join(', ')).split(', ');
                columns = [subdomainOrders, calendarOrders, deletedOrders, clientsCount, adminsCount];

                types = {
                    subdomain_orders: 'area-spline',
                    calendar_orders: 'area-spline',
                    deleted_orders: 'area-spline',
                    clients_count: 'area-spline',
                    admins_count: 'area-spline'
                    // 'line', 'spline', 'step', 'area', 'area-step' are also available to stack
                };

                colors = {
                    subdomain_orders: '#FF0000',
                    calendar_orders: '#FFFF00',
                    deleted_orders: '#00FF00',
                    clients_count: '#0000FF',
                    admins_count: '#D4A190'
                };

                groups = [['subdomain_orders', 'calendar_orders', 'deleted_orders', 'clients_count', 'admins_count']];
            } else if (ajax.pathWho === 'office') {

                var _subdomainOrders = (subdomainOrdersTxt + ', ' + this.dashboardInfo.subdomain_orders.join(', ')).split(', ');
                var _calendarOrders = (calendarOrdersTxt + ', ' + this.dashboardInfo.calendar_orders.join(', ')).split(', ');
                var _deletedOrders = (deletedOrdersTxt + ', ' + this.dashboardInfo.deleted_orders.join(', ')).split(', ');
                var ordersSum = (ordersSumTxt + ', ' + this.dashboardInfo.orders_sum.join(', ')).split(', ');
                var emailsSum = (emailsSumTxt + ', ' + this.dashboardInfo.send_emails.join(', ')).split(', ');
                columns = [_subdomainOrders, _calendarOrders, _deletedOrders, ordersSum, emailsSum];

                types = {
                    subdomain_orders: 'area-spline',
                    calendar_orders: 'area-spline',
                    deleted_orders: 'area-spline',
                    send_emails: 'area-spline',
                    orders_sum: 'area-spline'
                    // 'line', 'spline', 'step', 'area', 'area-step' are also available to stack
                };

                colors = {
                    subdomain_orders: '#FF0000',
                    calendar_orders: '#FFFF00',
                    deleted_orders: '#00FF00',
                    send_emails: '#0000FF',
                    orders_sum: '#D4A190'
                };

                groups = [['subdomain_orders', 'calendar_orders', 'deleted_orders', 'send_emails', 'orders_sum']];
            }

            var grafic = c3.generate({
                bindto: '#grafic',
                data: {
                    columns: columns,
                    types: types,
                    colors: colors
                },
                tooltip: {
                    show: true,
                    grouped: false,
                    format: {
                        title: function title(d) {
                            return null;
                        }
                    },
                    position: function position(data, width, height, element) {
                        var chartOffsetX = document.querySelector("#grafic").getBoundingClientRect().left,
                            graphOffsetX = document.querySelector("#grafic g.c3-axis-y").getBoundingClientRect().right,
                            tooltipWidth = document.getElementById('tooltip').parentNode.clientWidth,
                            x = parseInt(element.getAttribute('cx')) + graphOffsetX - chartOffsetX + 10,
                            y = element.getAttribute('cy');

                        y = y - height + 21;

                        return { top: y, left: x };
                    },
                    contents: function contents(data, defaultTitleFormat, defaultValueFormat, color) {
                        var $$ = this,
                            config = $$.config,
                            titleFormat = config.tooltip_format_title || defaultTitleFormat,
                            nameFormat = config.tooltip_format_name || function (name) {
                            return name;
                        },
                            valueFormat = config.tooltip_format_value || defaultValueFormat,
                            text,
                            i,
                            title,
                            value;

                        for (i = 0; i < data.length; i++) {
                            if (!(data[i] && (data[i].value || data[i].value === 0))) {
                                continue;
                            }

                            if (!text) {
                                text = "<div id='tooltip' class='d3-tip'>";
                            }
                            value = valueFormat(data[i].value, data[i].ratio, data[i].id, data[i].index);

                            text += "<span class='value'> " + value + " Neue Terminen</span>";
                        }

                        return text;
                    }
                }
            });
        },
        sumArrGraf: function sumArrGraf(arr) {
            var sum = 0;

            arr.forEach(function (num) {
                sum += num;
            });

            return sum;
        },
        getDateRange: function getDateRange() {
            this.dateTo = (0, _moment2.default)().format('YYYY-MM-DD');
            this.dateFrom = (0, _moment2.default)().subtract(30, 'days').format('YYYY-MM-DD');
        },
        getDashboard: function getDashboard(all) {
            var _this = this;

            var path = '/' + ajax.pathWho + '/get_dashboard';

            var data = {
                from: '',
                to: ''
            };

            var isAllPeriod = false;

            switch (all) {
                case 'all':
                    this.setAllDateRange();
                    isAllPeriod = true;
                    break;
                case 'currentWeek':
                    this.setCurrentWeekDateRange();
                    break;
                case 'currentMonth':
                    this.setCurrentMonthDateRange();
                    break;
            }

            data = isAllPeriod ? {} : { from: this.dateFrom, to: this.dateTo };

            ajax.sendAjax(data, path).done(function (res) {
                _this.dashboardInfo = res;

                if (ajax.pathWho === 'backend') {

                    if (res.first_data) {
                        _this.dateFrom = (0, _moment2.default)(res.first_data).format('YYYY-MM-DD');
                    }
                    _this.subdomainSum = _this.sumArrGraf(_this.dashboardInfo.subdomain_orders);
                    _this.calendarSum = _this.sumArrGraf(_this.dashboardInfo.calendar_orders);
                    _this.deletedSum = _this.sumArrGraf(_this.dashboardInfo.deleted_orders);
                    _this.clientsSum = _this.sumArrGraf(_this.dashboardInfo.clients_count);
                    _this.adminsSum = _this.sumArrGraf(_this.dashboardInfo.admins_count);
                } else if (ajax.pathWho === 'office') {
                    if (res.days && _this.isFirstShowModal) {
                        _this.daysLimitModal.open();
                        _this.days = res.days;
                    } else {
                        _this.isFirstShowModal = true;
                    }
                    if (res.first_data) {
                        _this.dateFrom = (0, _moment2.default)(res.first_data).format('YYYY-MM-DD');
                    }
                    _this.subdomainSum = _this.sumArrGraf(_this.dashboardInfo.subdomain_orders);
                    _this.calendarSum = _this.sumArrGraf(_this.dashboardInfo.calendar_orders);
                    _this.deletedSum = _this.sumArrGraf(_this.dashboardInfo.deleted_orders);
                    _this.ordersSum = _this.sumArrGraf(_this.dashboardInfo.orders_sum);
                    _this.emailsSum = _this.sumArrGraf(_this.dashboardInfo.send_emails);
                }

                _this.chartInit();
            });
        },
        setCurrentMonthDateRange: function setCurrentMonthDateRange() {
            this.dateTo = (0, _moment2.default)().format('YYYY-MM-DD');
            this.dateFrom = (0, _moment2.default)().startOf('month').format('YYYY-MM-DD');
        },
        setCurrentWeekDateRange: function setCurrentWeekDateRange() {
            this.dateTo = (0, _moment2.default)().format('YYYY-MM-DD');
            this.dateFrom = (0, _moment2.default)().startOf('isoWeek').format('YYYY-MM-DD');
        },
        setAllDateRange: function setAllDateRange() {
            this.dateTo = (0, _moment2.default)().format('YYYY-MM-DD');
            this.dateFrom = '';
        },
        datepickerInit: function datepickerInit() {

            $("#dashboardFrom").datepicker({
                firstDay: 1,
                dateFormat: "yy-mm-dd",
                defaultDate: "+1w",
                changeMonth: true,
                numberOfMonths: 1,
                maxDate: new Date(),
                onClose: function onClose(selectedDate) {
                    $("#dashboardTo").datepicker("option", "minDate", selectedDate);
                }
            });

            $("#dashboardTo").datepicker({
                firstDay: 1,
                dateFormat: "yy-mm-dd",
                defaultDate: "+1w",
                changeMonth: true,
                numberOfMonths: 1,
                maxDate: new Date(),
                onClose: function onClose(selectedDate) {
                    $("#dashboardFrom").datepicker("option", "maxDate", selectedDate);
                }
            });
        }
    }
});

exports.default = DashboardVue;

},{"../ajax.js":92,"moment":84,"vue":89}],120:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _vue = require('vue');

var _vue2 = _interopRequireDefault(_vue);

var _ajax = require('../ajax.js');

var ajax = _interopRequireWildcard(_ajax);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DirectorstatsVue = _vue2.default.component('directorstats-vue', {
    template: '#directorstats-templ',

    props: ['data'],

    data: function data() {
        return {
            smsStatistic: [],
            editPackage: {}
        };
    },
    ready: function ready() {
        this.showSMSStatistic('week');
    },


    methods: {
        showSMSStatistic: function showSMSStatistic(period) {
            var _this = this;

            var path = '/' + ajax.pathWho + '/sms/show_sms_statistic';
            var data = {
                period: period
            };

            ajax.sendAjax(data, path).done(function (response) {
                _this.smsStatistic = response;
                c3.generate({
                    bindto: '#graphics_sms_director',
                    data: {
                        columns: [_this.smsStatistic],
                        types: {
                            sms: 'area-spline'
                        }
                    }
                });
            });
        },
        smsPackageEdit: function smsPackageEdit(smsPackage) {
            this.$root.openModal('#smsPackageModal');
            this.editPackage = smsPackage;
        }
    }

});

exports.default = DirectorstatsVue;

},{"../ajax.js":92,"vue":89}],121:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vue = require('vue');

var _vue2 = _interopRequireDefault(_vue);

var _ajax = require('../ajax.js');

var ajax = _interopRequireWildcard(_ajax);

var _mixins = require('../mixins.js');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var EditingModalVue = _vue2.default.component('editing-modal-vue', {
  template: '#editing-modal-template',

  data: function data() {
    return {
      editingInfo: [],
      countries: [],
      states: [],
      cities: [],
      errors: {
        password: false,
        email: false
      },
      genders: [{ value: 'male', text: 'Male' }, { value: 'female', text: 'Female' }],
      groups: [{ value: 'employee', text: 'Employee' }, { value: 'admin', text: 'Admin' }],
      emailSends: [{ value: 0, text: 'Not Send' }, { value: 1, text: 'Send' }],
      statuses: [{ value: 'active', text: 'Active' }, { value: 'notactive', text: 'Not active' }, { value: 'blocked', text: 'Blocked' }, { value: 'freeze', text: 'Freeze' }]
    };
  },
  ready: function ready() {},


  mixins: [_mixins.countries],

  methods: {
    closeModal: function closeModal() {
      this.$dispatch('closeModal');
    },
    getEditingInfo: function getEditingInfo() {
      var _this = this;

      var path = ajax.LOCPATH + '/get_personal_info';

      ajax.sendAjax({}, path).done(function (editingInfo) {
        console.log('editingInfo', editingInfo);
        _this.editingInfo = editingInfo;
        _this.getCountries();
      });
    }
  },

  events: {
    openUserInfoModal: function openUserInfoModal() {
      var modal = $('#userInfoModal').remodal();
      modal.open();
      this.getEditingInfo();
    }
  }

});

exports.default = EditingModalVue;

},{"../ajax.js":92,"../mixins.js":105,"vue":89}],122:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _vue = require('vue');

var _vue2 = _interopRequireDefault(_vue);

var _ConfirmVue = require('./ConfirmVue.vue');

var _ConfirmVue2 = _interopRequireDefault(_ConfirmVue);

var _ajax = require('../ajax.js');

var ajax = _interopRequireWildcard(_ajax);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var EmployeesListVue = _vue2.default.component('employees-list-vue', {
    template: '#employees-list-template',

    components: { ConfirmVue: _ConfirmVue2.default },

    data: function data() {
        return {
            showAlertSuccess: true,
            showConfirm: false,
            isConfirm: false,
            employees: null,
            employee: null,
            isConfirmSubmit: false,
            formId: 0
        };
    },
    created: function created() {
        var _this = this;

        setTimeout(function () {
            _this.showAlertSuccess = false;
        }, 3000);

        if (window.location.pathname == "/office/start_assistant") {

            this.refreshTable();
        }
    },


    methods: {
        deleteEmployee: function deleteEmployee(link) {
            var is_ajax = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
            var row = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

            var text = '';
            var isConfirm = void 0;
            var locale = this.$root.locale;

            switch (locale) {
                case 'ru':
                    text = 'Вы действительно желаете удалить сотрудника? В связи с этим будут удалены все  заказы. вы согласны с этим?';
                    break;
                case 'de':
                    text = 'Sind Sie sicher, dass Sie einen Mitarbeiter zu löschen? In diesem Zusammenhang werden alle Aufträge gelöscht. gehen Sie mit dem zustimmen?';
                    break;
                case 'en':
                    text = 'Are you sure you want to delete an employee? In this regard, all orders will be deleted. do you agree with that?';
                    break;
            }

            isConfirm = confirm(text);

            if (isConfirm) {

                this.employee = null;

                if (is_ajax === true) {

                    $.get(link).done(function () {
                        $('tr[data-row="' + row + '"]').fadeOut("fast");

                        this.refreshTable();
                    }.bind(this));
                } else {

                    location.href = link;
                }
            }
        },
        addEmployee: function addEmployee() {
            var yes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
            var blank = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

            if (+yes) {
                if (blank) {

                    window.open('/office/employees/create', '_blank');
                } else {

                    location.href = '/office/employees/create';
                }
            } else {
                this.showConfirm = true;
            }
        },
        trySendForm: function trySendForm(id) {
            var form = $('#userInfoFormEdit_' + id);
            form.validate();
            var isValid = form.valid();
            if (isValid) {
                this.isConfirmSubmit = true;
                this.formId = id;
            } else {
                this.isConfirmSubmit = false;
            }
        },
        submitCreateEmpl: function submitCreateEmpl() {
            var $form = $("form#userInfoFormEdit_" + this.formId),
                formData = new FormData($form[0]);

            if ($form.html() !== undefined && $form.html().length) {

                $.ajax({
                    url: $form.attr("action"),
                    type: $form.attr("method"),
                    data: formData,
                    contentType: false,
                    processData: false
                }).done(function (response) {

                    if (response.status === 'success') {

                        this.employee = null;
                    }
                }.bind(this));

                this.refreshTable();
            }

            this.isConfirmSubmit = false;
        },
        editEmployee: function editEmployee(id) {

            this.employee = null;

            $.get('/office/employees/info/' + id).done(function (response) {

                this.employee = response.data;

                $('[data-upload]').attr('src', '');
            }.bind(this));
        },
        previewAvatar: function previewAvatar(e, id) {
            if (e.target.files !== undefined && e.target.files[0]) {
                var reader = new FileReader();
                reader.onload = function (e) {
                    $(document).find("#assistantAvatarPreviewEdit_" + id).attr('src', e.target.result);
                };
                reader.readAsDataURL(e.target.files[0]);
            }
        },
        showCategory: function showCategory(id) {

            for (var iterator in this.employee.categories) {

                if (this.employee.categories[iterator].id !== id) {

                    this.employee.categories[iterator].show = false;
                } else {

                    if (this.employee.categories[iterator].show === false) {

                        this.employee.categories[iterator].show = true;
                    } else {

                        this.employee.categories[iterator].show = false;
                    }
                }
            }
        },
        clearEmployee: function clearEmployee() {

            this.employee = null;
        },
        refreshTable: function refreshTable() {

            $.ajax({
                type: "GET",
                url: "/office/start_assistant/get_employees_list",
                dataType: 'JSON'
            }).done(function (response) {

                this.employees = response.data;
            }.bind(this));
        }
    },
    watch: {
        'isConfirm': function isConfirm() {
            if (this.isConfirm) {
                window.open('/office/tariff', '_blank');
            }
        },
        'isConfirmSubmit': function isConfirmSubmit() {
            if (this.isConfirmSubmit) {
                this.submitCreateEmpl();
            }
        }
    },
    events: {
        'userChanged': function userChanged() {
            $.ajax({
                type: "GET",
                url: "/office/start_assistant/get_employees_list",
                dataType: 'JSON'
            }).done(function (response) {

                this.employees = response.data;
            }.bind(this));
        }
    }

});

exports.default = EmployeesListVue;

},{"../ajax.js":92,"./ConfirmVue.vue":117,"vue":89}],123:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vue = require('vue');

var _vue2 = _interopRequireDefault(_vue);

var _ajax = require('../ajax.js');

var ajax = _interopRequireWildcard(_ajax);

var _mixins = require('../mixins.js');

var _WorkTimesVue = require('./WorkTimesVue.vue');

var _WorkTimesVue2 = _interopRequireDefault(_WorkTimesVue);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FirmDetailsVue = _vue2.default.component('firmdetails-vue', {
  template: '#firmdetails-template',

  components: { WorkTimesVue: _WorkTimesVue2.default },

  mixins: [_mixins.GET_COUNTRIES, _mixins.GET_STATES, _mixins.GET_CITIES],

  data: function data() {
    return {
      editingInfo: {},
      countries: [],
      states: [],
      cities: []
    };
  },
  ready: function ready() {
    var _this = this;

    this.getFirmDetailsInfo().done(function () {
      _this.getCountries();
      _this.getStates(_this.editingInfo.country_id);
      _this.getCities(_this.editingInfo.state_id);
    });
  },


  methods: {
    getWorktimes: function getWorktimes() {
      this.$broadcast('getWorktimes');
    },
    openModal: function openModal() {
      this.$root.openModal('#firmDetailsModal');
    },
    getFirmDetailsInfo: function getFirmDetailsInfo() {
      var _this2 = this;

      var path = '/' + ajax.pathWho + '/get_firm_details';
      return ajax.sendAjax({}, path).done(function (firmDetails) {
        _this2.editingInfo = firmDetails;
      });
    }
  }
});

exports.default = FirmDetailsVue;

},{"../ajax.js":92,"../mixins.js":105,"./WorkTimesVue.vue":137,"vue":89}],124:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    data: function data() {
        return {
            clock: {
                hours: '',
                mins: ''
            }
        };
    },
    ready: function ready() {
        this.clockInit();
    },

    methods: {
        clockInit: function clockInit() {
            var _this = this;

            setInterval(function () {
                var hours = new Date().getHours();
                var mins = new Date().getMinutes();

                hours = ("0" + hours).slice(-2);

                if (mins < 10) {
                    mins = '0' + mins;
                }

                _this.clock.hours = hours;
                _this.clock.mins = mins;
            }, 1000);
        }
    }
};
if (module.exports.__esModule) module.exports = module.exports.default
;(typeof module.exports === "function"? module.exports.options: module.exports).template = "\n<span class=\"admin-header__time\">{{ clock.hours }}:{{ clock.mins }}</span>\n"
if (module.hot) {(function () {  module.hot.accept()
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  if (!module.hot.data) {
    hotAPI.createRecord("_v-52744208", module.exports)
  } else {
    hotAPI.update("_v-52744208", module.exports, (typeof module.exports === "function" ? module.exports.options : module.exports).template)
  }
})()}
},{"vue":89,"vue-hot-reload-api":86}],125:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vue = require('vue');

var _vue2 = _interopRequireDefault(_vue);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _ajax = require('../ajax.js');

var ajax = _interopRequireWildcard(_ajax);

var _filters = require('../filters.js');

var _filters2 = _interopRequireDefault(_filters);

var _lib = require('../lib.js');

var _HeaderTimeVue = require('./HeaderTimeVue.vue');

var _HeaderTimeVue2 = _interopRequireDefault(_HeaderTimeVue);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var HeaderVue = _vue2.default.component('header-vue', {
  template: '#header-template',

  filters: _filters2.default,
  components: { HeaderTimeVue: _HeaderTimeVue2.default },

  data: function data() {
    var _ref;

    return _ref = {
      showUsersPopap: false,
      showNewAdminsPopap: false,
      showSearchList: false,
      users: [],
      pathWho: ajax.pathWho,
      query: '',
      searchData: {
        admins: [],
        admins_new: [],
        bills: [],
        clients: [],
        employees: [],
        letters: []
      }
    }, _defineProperty(_ref, 'pathWho', ajax.pathWho), _defineProperty(_ref, 'notifications', []), _defineProperty(_ref, 'messCount', 2), _defineProperty(_ref, 'showMoreNotices', 3), _defineProperty(_ref, 'showMoreMess', 3), _ref;
  },
  ready: function ready() {
    var _this = this;

    this.getNewMess();
    this.socketInit();
    this.getNotifications();

    $(document).click(function (event) {
      if ($(event.target).closest(".notice__popup").length || $(event.target).closest(".search-list").length || $(event.target).closest(".mess-popup").length || $(event.target).closest(".search__popup").length) return;
      _this.showNewAdminsPopap = false;
      _this.showSearchList = false;
      _this.showUsersPopap = false;
      event.stopPropagation();
    });
  },


  methods: {
    transitionLink: function transitionLink(notice, e) {
      var href = e.target.href;
      var noticeId = notice.id;

      var path = '/' + ajax.pathWho + '/delete_notice';
      var data = {
        id: noticeId
      };

      ajax.sendAjax(data, path).done(function (res) {
        if (res) {
          window.location.href = href;
        }
      });
    },
    getNotifications: function getNotifications() {
      var _this2 = this;

      var path = '/' + ajax.pathWho + '/get_notice';
      var data = {};

      ajax.sendAjax(data, path).done(function (notifications) {
        _this2.notifications = notifications;
      });
    },
    showUserPopupHandler: function showUserPopupHandler() {
      this.showUsersPopap = !this.showUsersPopap;
      this.showNewAdminsPopap = false;
    },
    showNewAdminsPopupHandler: function showNewAdminsPopupHandler() {
      this.showNewAdminsPopap = !this.showNewAdminsPopap;
      this.showUsersPopap = false;
    },
    deleteNotice: function deleteNotice(notice) {
      var _this3 = this;

      var noticeId = notice.id;
      var path = '/' + ajax.pathWho + '/delete_notice';
      var data = {
        id: noticeId
      };
      ajax.sendAjax(data, path).done(function (res) {
        if (res) {
          _this3.notifications.$remove(notice);
        }
      });
    },
    search: function search() {
      var _this4 = this;

      var resource = this.$resource('/' + ajax.pathWho + '/search?q=' + this.query);

      if (this.query.length < 3) {
        this.showSearchList = false;
        return;
      }

      resource.get().then(function (response) {
        _this4.$set('searchData', response.data);
        _this4.showSearchList = true;
      });
    },
    reset: function reset() {
      this.query = '';
      this.searchData = {};
    },
    getNewMess: function getNewMess() {
      var _this5 = this;

      var path = '/' + this.pathWho + '/get_new_messages';

      ajax.sendAjax({}, path).done(function (newMessages) {

        if (newMessages === false) {
          _this5.users = [];
        } else {
          _this5.users = newMessages;
        }
      });
    },
    socketInit: function socketInit() {
      var vm = this;
      var dataUserId = {
        data: {
          userId: _lib.MYID
        }
      };

      _lib.SOCKET.emit('regUser', dataUserId);

      _lib.SOCKET.on('new_message', function (data) {
        data.created_at = (0, _moment2.default)().locale(vm.$root.locale).format('YYYY-MM-DD h:mm:ss');

        vm.getNewMess();

        var isUser = vm.users.some(function (user) {
          return user.from == data.from;
        });

        if (!isUser) {
          vm.users.push(data);
        }
      });
    }
  },

  events: {
    newMess: function newMess() {
      this.getNewMess();
    }
  }
});

exports.default = HeaderVue;

},{"../ajax.js":92,"../filters.js":99,"../lib.js":104,"./HeaderTimeVue.vue":124,"moment":84,"vue":89}],126:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vue = require('vue');

var _vue2 = _interopRequireDefault(_vue);

var _Alert = require('./vue-strap/src/Alert.vue');

var _Alert2 = _interopRequireDefault(_Alert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LogoVue = _vue2.default.component('logo-vue', {
  template: '#logo-template',

  components: { Alert: _Alert2.default },

  data: function data() {
    return {
      showLogoSuccess: false,
      showImgPreloader: false
    };
  },
  ready: function ready() {},


  methods: {
    readURL: function readURL(e) {
      var input = e.target;
      if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
          $('#blah').attr('src', e.target.result);
        };

        reader.readAsDataURL(input.files[0]);
      }
    },
    sendForm: function sendForm() {
      var vm = this;
      var action = $('form.logo-block__form').attr('action');
      var typeImg = $('input.logo-block__file').attr('name');
      var $input = $('input[type="file"]');
      var fd = new FormData();

      fd.append(typeImg, $input.prop('files')[0]);

      vm.showImgPreloader = true;

      $.ajax({
        url: action,
        data: fd,
        processData: false,
        contentType: false,
        type: 'POST',
        success: function success(data) {
          vm.showLogoSuccess = true;
          vm.showImgPreloader = false;

          $('div.logo-block__img img').attr('src', data);
          $('.jq-file__name').html('');
          if (data.indexOf('avatars') + 1) {
            $('.admin-header__avatar').find('img').attr('src', data);
          }
        },
        error: function error() {
          vm.showImgPreloader = false;
        }
      });
    },
    sendFormSlider: function sendFormSlider() {
      $('.logo-block__form').submit();
    },
    selectFile: function selectFile() {
      $('.logo-block__file').click();
    }
  }
});

exports.default = LogoVue;

},{"./vue-strap/src/Alert.vue":140,"vue":89}],127:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vue = require('vue');

var _vue2 = _interopRequireDefault(_vue);

var _ajax = require('../ajax.js');

var ajax = _interopRequireWildcard(_ajax);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NewsletterVue = _vue2.default.component('newsletter-vue', {
  template: '#newsletter-template',

  data: function data() {
    return {};
  },
  ready: function ready() {},


  methods: {
    preview: function preview() {
      $('#cke_19').click();
    }
  }

});

exports.default = NewsletterVue;

},{"../ajax.js":92,"vue":89}],128:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vue = require('vue');

var _vue2 = _interopRequireDefault(_vue);

var _Alert = require('./vue-strap/src/Alert.vue');

var _Alert2 = _interopRequireDefault(_Alert);

var _PaginationVue = require('./PaginationVue.vue');

var _PaginationVue2 = _interopRequireDefault(_PaginationVue);

var _filters = require('../filters.js');

var _filters2 = _interopRequireDefault(_filters);

var _ajax = require('../ajax.js');

var ajax = _interopRequireWildcard(_ajax);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var OrdersVue = _vue2.default.component('orders-vue', {
  template: '#orders-template',

  components: { Alert: _Alert2.default, PaginationVue: _PaginationVue2.default },

  data: function data() {
    return {
      bankInfo: {},
      legalAddress: {},
      orders: [],
      query: '',
      ordersFrom: '',
      ordersTo: '',
      searchShow: true,
      showSuccess: false,
      showSuccessCancel: false,
      showDanger: false,
      paids: [],
      pageNumber: 1,
      countPages: 0
    };
  },


  filters: _filters2.default,

  ready: function ready() {
    this.datepickerInit();
    this.getOrders();
  },


  methods: {
    tableSorterInit: function tableSorterInit() {
      $('.orders-table').tablesorter();
    },
    openModal: function openModal() {
      var modalStr = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '.remodal';

      var modal = $(modalStr).remodal();
      modal.open();
    },
    getOrders: function getOrders() {
      var _this = this;

      var data = {
        page: this.pageNumber
      };
      var path = '/' + ajax.pathWho + '/orders/get_orders';
      ajax.sendAjax(data, path).done(function (res) {
        _this.orders = res.orders;
        _this.countPages = res.count;
        _this.tableSorterInit();
      });
    },
    cancel: function cancel(e, i) {
      var _this2 = this;

      var path = e.target.href;
      var data = {};

      ajax.sendAjax(data, path).done(function (res) {
        if (res) {
          _this2.orders[i].status = 'cancel';
          _this2.showSuccessCancel = true;
        }
      });
    },
    sendEmail: function sendEmail(e) {
      var _this3 = this;

      var href = e.target.href;
      var path = href;

      ajax.sendAjax({}, path).done(function (res) {
        if (res) {
          _this3.showSuccess = true;
        } else {
          _this3.showDanger = true;
        }
      });
    },
    getBankInfo: function getBankInfo() {
      var _this4 = this;

      var path = '/' + ajax.pathWho + '/orders/get_bank_info';

      ajax.sendAjax({}, path).done(function (res) {
        if (res) {
          _this4.bankInfo = res;
          _this4.openModal('#orderModal1');
        }
      });
    },
    getLegalAddress: function getLegalAddress() {
      var _this5 = this;

      var path = '/' + ajax.pathWho + '/orders/get_legal_address';

      ajax.sendAjax({}, path).done(function (res) {
        if (res) {
          _this5.legalAddress = res;
          _this5.openModal('#orderModal2');
        }
      });
    },
    searchOrders: function searchOrders() {
      var _this6 = this;

      var path = '/' + ajax.pathWho + '/orders/search';

      setTimeout(function () {
        var data = {
          q: _this6.query,
          from: _this6.ordersFrom,
          to: _this6.ordersTo
        };

        ajax.sendAjax(data, path).done(function (orders) {
          _this6.orders = orders;
          _this6.countPages = 0;
          _this6.tableSorterInit();
        });
      }, 100);
    },
    datepickerInit: function datepickerInit() {

      $("#ordersFrom").datepicker({
        firstDay: 1,
        dateFormat: "yy-mm-dd",
        defaultDate: "+1w",
        changeMonth: true,
        numberOfMonths: 1,
        onClose: function onClose(selectedDate) {
          $("#ordersTo").datepicker("option", "minDate", selectedDate);
        }
      });

      $("#ordersTo").datepicker({
        firstDay: 1,
        dateFormat: "yy-mm-dd",
        defaultDate: "+1w",
        changeMonth: true,
        numberOfMonths: 1,
        onClose: function onClose(selectedDate) {
          $("#ordersFrom").datepicker("option", "maxDate", selectedDate);
        }
      });
    },
    paidHandler: function paidHandler(e) {
      var $checkbox = $(e.target);
      var orderId = +$checkbox.closest('tr').attr('data-order-id');
      var issetId = void 0;

      if ($checkbox.is(":checked")) {
        issetId = this.paids.some(function (paid) {
          return paid === orderId;
        });

        if (issetId) return;
      } else {
        this.paids = this.paids.filter(function (paid) {
          return paid !== orderId;
        });

        return;
      }

      this.paids.push(orderId);
    },
    submitPaid: function submitPaid() {
      var _this7 = this;

      var path = '/' + ajax.pathWho + '/orders/confirm_order';
      var data = {
        paid_id: this.paids
      };
      var isOk = confirm('Are you sure?');

      if (!isOk) {
        return;
      };

      ajax.sendAjax(data, path).done(function (res) {
        if (res) {

          _this7.orders.forEach(function (order, orderIndex) {
            _this7.paids.forEach(function (paid) {
              if (order.id === paid) {
                _this7.orders[orderIndex].status = 'paid';
                _this7.orders[orderIndex].paid_at = new Date();
              }
            });
          });

          _this7.paids = [];

          //this.searchOrders();
        }
      });
    }
  },

  events: {
    getOrders: function getOrders(index) {
      this.pageNumber = index;
      this.getOrders();
    }
  }
});

exports.default = OrdersVue;

},{"../ajax.js":92,"../filters.js":99,"./PaginationVue.vue":129,"./vue-strap/src/Alert.vue":140,"vue":89}],129:[function(require,module,exports){
var __vueify_insert__ = require("vueify/lib/insert-css")
var __vueify_style__ = __vueify_insert__.insert("\n\n")
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    data: function data() {
        return {};
    },


    props: {
        count: Number
    },

    computed: {
        countPages: function countPages() {
            return Math.ceil(this.count / 15);
        }
    },

    methods: {
        getNumberPage: function getNumberPage(index, e) {
            var $el = $(e.target);

            this.$dispatch('getOrders', index);

            $el.closest('.pagination').find('li').removeClass('active');
            $el.addClass('active');
        }
    }
};
if (module.exports.__esModule) module.exports = module.exports.default
;(typeof module.exports === "function"? module.exports.options: module.exports).template = "\n<ul v-show=\"countPages > 1\" class=\"pagination\">\n    <!--<li @click=\"getNumberPage(count&#45;&#45;)\" class=\"disabled\"><span>«</span></li>-->\n    <li v-for=\"item in countPages\" @click.stop=\"getNumberPage($index+1, $event)\" :class=\"{ 'active': $index == 0 }\">\n        {{ $index+1 }}\n    </li>\n    <!--<li @click=\"getNumberPage(count++)\"><span>»</span></li>-->\n</ul>\n"
if (module.hot) {(function () {  module.hot.accept()
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.dispose(function () {
    __vueify_insert__.cache["\n\n"] = false
    document.head.removeChild(__vueify_style__)
  })
  if (!module.hot.data) {
    hotAPI.createRecord("_v-b3c06348", module.exports)
  } else {
    hotAPI.update("_v-b3c06348", module.exports, (typeof module.exports === "function" ? module.exports.options : module.exports).template)
  }
})()}
},{"vue":89,"vue-hot-reload-api":86,"vueify/lib/insert-css":90}],130:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vue = require('vue');

var _vue2 = _interopRequireDefault(_vue);

var _ajax = require('../ajax.js');

var ajax = _interopRequireWildcard(_ajax);

var _filters = require('../filters.js');

var _filters2 = _interopRequireDefault(_filters);

var _WorkTimesVue = require('./WorkTimesVue.vue');

var _WorkTimesVue2 = _interopRequireDefault(_WorkTimesVue);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//PAGINATED
function refreshCategoryEvents() {
  $('#category-table').siblings('.pager').remove();
  $('#category-table').each(function () {
    var currentPage = 0;
    var numPerPage = 15;
    var $table = $(this);
    $table.bind('repaginate', function () {
      $table.find('tbody tr').hide().slice(currentPage * numPerPage, (currentPage + 1) * numPerPage).show();
    });
    $table.trigger('repaginate');
    var numRows = $table.find('tbody tr').length;
    var numPages = Math.ceil(numRows / numPerPage);
    var $pager = $('<div class="pager"></div>');
    for (var page = 0; page < numPages; page++) {
      $('<span class="page-number"></span>').text(page + 1).bind('click', {
        newPage: page
      }, function (event) {
        currentPage = event.data['newPage'];
        $table.trigger('repaginate');
        $(this).addClass('active').siblings().removeClass('active');
      }).appendTo($pager).addClass('clickable');
    }
    $pager.insertAfter($table).find('span.page-number:first').addClass('active');
  });

  // $("#category-table").tablesorter();
}
;
function refreshServicesEvents() {
  $('#services-table').siblings('.pager').remove();
  $('#services-table').each(function () {
    var currentPage = 0;
    var numPerPage = 15;
    var $table = $(this);
    $table.bind('repaginate', function () {
      $table.find('tbody tr').hide().slice(currentPage * numPerPage, (currentPage + 1) * numPerPage).show();
    });
    $table.trigger('repaginate');
    var numRows = $table.find('tbody tr').length;
    var numPages = Math.ceil(numRows / numPerPage);
    var $pager = $('<div class="pager"></div>');
    for (var page = 0; page < numPages; page++) {
      $('<span class="page-number"></span>').text(page + 1).bind('click', {
        newPage: page
      }, function (event) {
        currentPage = event.data['newPage'];
        $table.trigger('repaginate');
        $(this).addClass('active').siblings().removeClass('active');
      }).appendTo($pager).addClass('clickable');
    }
    $pager.insertAfter($table).find('span.page-number:first').addClass('active');
  });

  // $("#services-table").tablesorter();
}
;

var ServicesVue = _vue2.default.component('services-vue', {
  template: '#services-template',

  components: { WorkTimesVue: _WorkTimesVue2.default },

  data: function data() {
    return {
      categories: [],
      services: [],
      serviceBtn: false,
      categoryBtn: true,
      editCategory: '',
      editService: {
        duration: 5
      },
      canCreate: true,
      showServiceDanger: false
    };
  },
  ready: function ready() {
    this.getLists();
    this.tableSortedInit();
    this.timePickerInit();
  },


  methods: {
    timePickerInit: function timePickerInit() {

      $.timepicker.regional['ru'] = {
        timeOnlyTitle: 'Выберите время',
        timeText: 'Время',
        hourText: 'Часы',
        minuteText: 'Минуты',
        secondText: 'Секунды',
        millisecText: 'Миллисекунды',
        timezoneText: 'Часовой пояс',
        currentText: 'Сейчас',
        closeText: 'Закрыть',
        timeFormat: 'HH:mm',
        amNames: ['AM', 'A'],
        pmNames: ['PM', 'P'],
        isRTL: false
      };

      $.timepicker.regional['de'] = {
        timeOnlyTitle: 'Wählen Sie Zeit',
        timeText: 'Zeit',
        hourText: 'Uhr',
        minuteText: 'Minuten',
        secondText: 'Sekunden',
        millisecText: 'Millisekunde',
        timezoneText: 'Zeitzone',
        currentText: 'im Moment',
        closeText: 'schließen',
        timeFormat: 'HH:mm',
        amNames: ['AM', 'A'],
        pmNames: ['PM', 'P'],
        isRTL: false
      };

      $.timepicker.regional['en'] = {
        timeOnlyTitle: 'Select time',
        timeText: 'Time',
        hourText: 'Hours',
        minuteText: 'Minutes',
        secondText: 'Seconds',
        millisecText: 'Millisecond',
        timezoneText: 'Timezone',
        currentText: 'Now',
        closeText: 'Close',
        timeFormat: 'HH:mm',
        amNames: ['AM', 'A'],
        pmNames: ['PM', 'P'],
        isRTL: false
      };

      $.timepicker.setDefaults($.timepicker.regional[this.$root.locale]);

      $('.worktime-timepicker').timepicker({
        stepMinute: 5,
        defaultValue: '00:00',
        hourMax: 23
      });
    },
    getWorktimes: function getWorktimes() {
      this.$broadcast('getWorktimes');
    },
    getLists: function getLists() {
      var _this = this;

      var path = '/' + ajax.pathWho + '/services/get_category_services';

      ajax.sendAjax({}, path).done(function (data) {
        console.log('Lists', data);
        _this.categories = data.categoryList;
        _this.services = data.servicesList;
        _this.canCreate = data.can_create;
      });
    },
    tableSortedInit: function tableSortedInit() {
      setTimeout(function () {
        $("#category-table").trigger("destroy").tablesorter();
        $("#services-table").trigger("destroy").tablesorter();
        refreshCategoryEvents();
        refreshServicesEvents();
      }, 1000);
    },
    deleteCategory: function deleteCategory(category) {
      var _this2 = this;

      var data = { id: category.id };
      var path = '/' + ajax.pathWho + '/services/removecategory';

      ajax.sendAjax(data, path).done(function (res) {
        if (res) {
          _this2.categories.$remove(category);
          _this2.tableSortedInit();
        }
      });
    },
    deleteService: function deleteService(service) {
      var _this3 = this;

      var data = { id: service.service_id };
      var path = '/' + ajax.pathWho + '/services/removeservice';

      console.log(data);

      ajax.sendAjax(data, path).done(function (res) {
        if (res) {
          _this3.services.$remove(service);
          _this3.canCreate = true;
          _this3.tableSortedInit();
        }
      });
    },
    openCategoryModal: function openCategoryModal(elemId, category) {
      var modal = $('#' + elemId).remodal();
      modal.open();
      this.getLists();
      this.tableSortedInit();
      this.editCategory = '';

      if (category) {
        this.editCategory = category;
      }
    },
    openServiceModal: function openServiceModal(elemId, service) {
      var modal = $('#' + elemId).remodal();
      modal.open();
      this.getLists();
      this.tableSortedInit();
      this.editService = '';

      if (service) {
        this.editService = service;

        this.editService.duration = this.convertToHM(+this.editService.duration);
      }
    },
    convertToHM: function convertToHM(minutes) {
      var min = +minutes % 60;
      var hours = Math.floor(+minutes / 60);
      var result = void 0;

      if (min < 10) {
        min = '0' + min;
      }

      if (hours < 10) {
        hours = '0' + hours;
      }

      return result = hours + ':' + min;
    },
    convertToMinutes: function convertToMinutes(duration) {
      duration = duration.split(':');
      duration = +duration[0] * 60 + +duration[1];

      return duration;
    },
    sendCategoryForm: function sendCategoryForm(e) {
      var _this4 = this;

      var $form = $(e.target);

      if (this.editCategory.id) {
        var path = '/' + ajax.pathWho + '/services/editcategory';
        var data = ajax.getFormData($form);
        data.id = this.editCategory.id;

        ajax.sendAjax(data, path).done(function (res) {
          if (res) {
            $('.remodal-close').trigger('click');
            _this4.getLists();
            _this4.tableSortedInit();
          }
        });
      } else {
        var _path = '/' + ajax.pathWho + '/services/createcategory';
        var _data = ajax.getFormData($form);

        ajax.sendAjax(_data, _path).done(function (res) {
          if (res) {
            $('.remodal-close').trigger('click');
            _this4.getLists();
            _this4.tableSortedInit();
          }
        });
      }
    },
    sendServiceForm: function sendServiceForm(e) {
      var _this5 = this;

      var $form = $(e.target);

      if (this.editService.service_id) {
        var path = '/' + ajax.pathWho + '/services/editservice';
        var data = ajax.getFormData($form);
        data.id = this.editService.service_id;
        var duration = data.duration;

        data.duration = this.convertToMinutes(duration);

        ajax.sendAjax(data, path).done(function (res) {
          if (res) {
            $('.remodal-close').trigger('click');
            _this5.getLists();
            _this5.tableSortedInit();
            _this5.showServiceDanger = false;
          } else {
            _this5.showServiceDanger = true;
            setTimeout(function () {
              _this5.showServiceDanger = false;
            }, 5000);
          }
        });
      } else {
        var _path2 = '/' + ajax.pathWho + '/services/createservice';
        var _data2 = ajax.getFormData($form);
        var _duration = _data2.duration;

        _data2.duration = this.convertToMinutes(_duration);

        ajax.sendAjax(_data2, _path2).done(function (res) {
          if (res) {
            $('.remodal-close').trigger('click');
            _this5.getLists();
            _this5.tableSortedInit();
          } else {
            _this5.showServiceDanger = true;
            setTimeout(function () {
              _this5.showServiceDanger = false;
            }, 5000);
          }
        });
      }
    },
    showCategoryBtn: function showCategoryBtn() {
      this.categoryBtn = true;
      this.serviceBtn = false;
    },
    showServiceBtn: function showServiceBtn() {
      this.categoryBtn = false;
      this.serviceBtn = true;
    }
  },

  filters: _filters2.default

});

exports.default = ServicesVue;

},{"../ajax.js":92,"../filters.js":99,"./WorkTimesVue.vue":137,"vue":89}],131:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vue = require('vue');

var _vue2 = _interopRequireDefault(_vue);

var _filters = require('../filters.js');

var _filters2 = _interopRequireDefault(_filters);

var _ajax = require('../ajax.js');

var ajax = _interopRequireWildcard(_ajax);

var _Alert = require('./vue-strap/src/Alert.vue');

var _Alert2 = _interopRequireDefault(_Alert);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import 'ion-rangeslider'

var SettingsKalendarVue = _vue2.default.component('settings-kalendar-vue', {
  template: '#settings-kalendar-template',

  filters: _filters2.default,

  components: { Alert: _Alert2.default },

  data: function data() {
    return {
      settings: {},
      showSettingsComplete: false
    };
  },
  ready: function ready() {
    this.getSettings();
    //$("#reminderSlider2").ionRangeSlider({
    //  type: "double",
    //  min: 30,
    //  max: 2880,
    //  from_min: 30,
    //  grid: true,
    //  step: 15
    //});
  },


  methods: {
    setSettings: function setSettings() {
      var _this = this;

      var data = this.settings;
      var path = '/office/kalendar_config/edit';

      ajax.sendAjax(data, path).done(function () {
        _this.showSettingsComplete = true;
      });
    },
    getSettings: function getSettings() {
      var _this2 = this;

      var data = {};
      var path = '/office/kalendar_config/get_config';
      return ajax.sendAjax(data, path).done(function (settings) {
        _this2.settings = settings;
        _this2.sliderInit();
        _this2.smsSliderInit();
      });
    },
    sliderInit: function sliderInit() {
      var vm = this;
      var slider = $("#reminderSlider");
      var min = 30;
      var max = 2880;

      var appendHandle = function appendHandle() {
        slider.find('.ui-slider-handle').append('\n            <span class="tb-slider__show" id="reminderHandle">' + _filters2.default.hourMinutes(vm.settings.h_reminder) + '</span>\n          ');
      };

      slider.slider({
        max: max,
        min: min,
        step: 15,
        range: "min",
        value: vm.settings.h_reminder,
        slide: function slide(event, ui) {
          vm.settings.h_reminder = ui.value;

          $('#reminderHandle').remove();
          appendHandle();
        }
      });

      appendHandle();
      slider.append('\n        <span class="tb-slider__show tb-slider__show--min">' + _filters2.default.hourMinutes(min) + '</span>\n      ');

      slider.append('\n        <span class="tb-slider__show tb-slider__show--max">' + _filters2.default.hourMinutes(max) + '</span>\n      ');
    },
    smsSliderInit: function smsSliderInit() {
      var vm = this;
      var slider = $("#smsReminderSlider");
      var min = 30;
      var max = 2880;

      var appendHandle = function appendHandle() {
        slider.find('.ui-slider-handle').append('\n            <span class="tb-slider__show" id="reminderHandle">' + _filters2.default.hourMinutes(vm.settings.sms_reminder) + '</span>\n          ');
      };

      slider.slider({
        max: max,
        min: min,
        step: 15,
        range: "min",
        value: vm.settings.sms_reminder,
        slide: function slide(event, ui) {
          vm.settings.sms_reminder = ui.value;

          $('#reminderHandle').remove();
          appendHandle();
        }
      });

      appendHandle();
      slider.append('\n        <span class="tb-slider__show tb-slider__show--min">' + _filters2.default.hourMinutes(min) + '</span>\n      ');

      slider.append('\n        <span class="tb-slider__show tb-slider__show--max">' + _filters2.default.hourMinutes(max) + '</span>\n      ');
    }
  }
});

exports.default = SettingsKalendarVue;

},{"../ajax.js":92,"../filters.js":99,"./vue-strap/src/Alert.vue":140,"vue":89}],132:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vue = require('vue');

var _vue2 = _interopRequireDefault(_vue);

var _ajax = require('../ajax.js');

var ajax = _interopRequireWildcard(_ajax);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SidebarVue = _vue2.default.component('sidebar-vue', {
  template: '#sidebar-template',

  data: function data() {
    return {};
  },
  ready: function ready() {
    var $links = $('.sidebar__item a');
    $links.each(function (i, el) {
      var $link = $(el);
      var href = el.href;

      if (href === '' + location.href) {
        $link.closest('.sidebar__item').addClass('is-active');
      }
    });
  },


  methods: {}
});

exports.default = SidebarVue;

},{"../ajax.js":92,"vue":89}],133:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _vue = require('vue');

var _vue2 = _interopRequireDefault(_vue);

var _ajax = require('../ajax.js');

var ajax = _interopRequireWildcard(_ajax);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SmsinfoVue = _vue2.default.component('smsinfo-vue', {
    template: '#smsinfo-template',

    props: ['data'],

    data: function data() {
        return {
            dateFrom: '',
            dateTo: '',
            showDetailInfo: false,
            chosenPackage: null,
            withoutTax: 0,
            tax: 0,
            typeOfBuy: 'package',
            countSMS: 0,
            confirmBuy: false,
            totalSMS: 0,
            smsStatistic: [],
            toggleMenuSms: '#1',
            rulesOk: false,
            sepaRules: false,
            generalRules: false
        };
    },


    computed: {
        tax: function tax() {
            if (this.chosenPackage) {
                return this.chosenPackage.price * 0.19;
            }
        },
        finalSum: function finalSum() {
            if (this.chosenPackage) {
                return parseFloat(this.chosenPackage.price) + parseFloat(this.tax);
            }
        },
        totalSMS: function totalSMS() {
            return parseInt(this.data.sms_data.sent) + parseInt(this.data.sms_data.count);
        },
        rulesOk: function rulesOk() {
            if (this.data.bank_details.agreement == '1' && this.sepaRules && this.generalRules) {
                return true;
            } else if (this.data.bank_details.agreement == '0' && this.generalRules) {
                return true;
            }
            return false;
        },
        smsBodyCount: function smsBodyCount() {
            return Math.ceil(this.data.sms_data.body.length / 140);
        }
    },

    ready: function ready() {
        this.showSMSStatistic('week');
        this.datepickerInit();
    },


    methods: {
        chooseSMSPackage: function chooseSMSPackage(sms_package) {
            this.chosenPackage = sms_package;
        },
        calculateSMS: function calculateSMS() {
            var price = +this.countSMS * 0.09;
            console.log(price);
            this.chosenPackage = {
                package_title: 'Calculate',
                count: this.countSMS,
                price: price
            };
        },
        checkCalculateSMS: function checkCalculateSMS() {
            if (this.countSMS < 150) {
                this.countSMS = 150;
            }
            this.calculateSMS();
        },
        confirmChosen: function confirmChosen() {
            if (this.showDetailInfo == true) {
                this.buyPackage();
            }
            if (this.chosenPackage) {
                this.showDetailInfo = true;
            }
        },
        buyPackage: function buyPackage() {
            var _this = this;

            if (!this.rulesOk) {
                return;
            }
            var path = '/' + ajax.pathWho + '/sms/buy';
            var data = {
                sms_package: this.chosenPackage,
                bank_details: this.data.bank_details
            };

            ajax.sendAjax(data, path).done(function (response) {
                if (response == true) {
                    _this.confirmBuy = true;
                }
            });
        },
        getDateRange: function getDateRange() {
            this.dateTo = moment().format('YYYY-MM-DD');
            this.dateFrom = moment().subtract(30, 'days').format('YYYY-MM-DD');
        },
        setCurrentMonthDateRange: function setCurrentMonthDateRange() {
            this.dateTo = moment().format('YYYY-MM-DD');
            this.dateFrom = moment().startOf('month').format('YYYY-MM-DD');
        },
        setCurrentWeekDateRange: function setCurrentWeekDateRange() {
            this.dateTo = moment().format('YYYY-MM-DD');
            this.dateFrom = moment().startOf('isoWeek').format('YYYY-MM-DD');
        },
        setAllDateRange: function setAllDateRange() {
            this.dateTo = moment().format('YYYY-MM-DD');
            this.dateFrom = '';
        },
        filterOrdersByDate: function filterOrdersByDate() {
            var _this2 = this;

            var path = '/' + ajax.pathWho + '/sms/filter_orders';
            var data = {
                from: this.dateFrom,
                to: this.dateTo
            };

            ajax.sendAjax(data, path).done(function (response) {
                _this2.data.orders = response;
            });
        },
        datepickerInit: function datepickerInit() {

            $("#smsStatFrom").datepicker({
                firstDay: 1,
                dateFormat: "yy-mm-dd",
                defaultDate: "+1w",
                changeMonth: true,
                numberOfMonths: 1,
                maxDate: new Date(),
                onClose: function onClose(selectedDate) {
                    $("#smsStatTo").datepicker("option", "minDate", selectedDate);
                }
            });

            $("#smsStatTo").datepicker({
                firstDay: 1,
                dateFormat: "yy-mm-dd",
                defaultDate: "+1w",
                changeMonth: true,
                numberOfMonths: 1,
                maxDate: new Date(),
                onClose: function onClose(selectedDate) {
                    $("#smsStatFrom").datepicker("option", "maxDate", selectedDate);
                }
            });
        },
        changeSMSNotify: function changeSMSNotify() {
            var path = '/' + ajax.pathWho + '/sms/change_notify';
            var data = this.data.sms_data;

            ajax.sendAjax(data, path).done(function (response) {
                if (response == true) {
                    return location.href = '/office/sms';
                }
            });
        },
        saveSMSContent: function saveSMSContent() {
            var noSpaceText = '';

            switch (this.$root.locale) {
                case 'ru':
                    noSpaceText = 'Пожалуйста введите без пробелов';
                    break;
                case 'de':
                    noSpaceText = 'Kein Platz bitte und lassen Sie es nicht leer';
                    break;
                case 'en':
                    noSpaceText = "No space please and don't leave it empty";
                    break;
            }

            $.validator.addMethod("noSpace", function (value, element) {
                return value.indexOf(" ") < 0 && value != "";
            }, noSpaceText);

            var form = $("#smsMessageForm");

            form.validate({
                rules: {
                    title: {
                        required: true,
                        maxlength: 11,
                        noSpace: true
                    },
                    body: {
                        required: true
                    }
                }
            });

            var isValid = form.valid();

            console.log(isValid);

            if (!isValid) {
                return;
            };

            var path = '/' + ajax.pathWho + '/sms/save_sms_content';
            var data = this.data.sms_data;

            ajax.sendAjax(data, path).done(function (response) {
                if (response == true) {
                    return location.href = '/office/sms';
                }
            });
        },
        setBodyField: function setBodyField(e) {
            var body = $('#smsBody');
            var cursorPos = body.prop('selectionStart');
            var v = body.val();
            var textBefore = v.substring(0, cursorPos);
            var textAfter = v.substring(cursorPos, v.length);

            this.data.sms_data.body = textBefore + e.target.value + textAfter;
        },
        showSMSStatistic: function showSMSStatistic(period) {
            var _this3 = this;

            var path = '/' + ajax.pathWho + '/sms/show_sms_statistic';
            var data = {
                period: period
            };

            ajax.sendAjax(data, path).done(function (response) {
                _this3.smsStatistic = response;
                c3.generate({
                    bindto: '#graphics_sms',
                    data: {
                        columns: [_this3.smsStatistic],
                        types: {
                            sms: 'area-spline'
                        }
                    }
                });
            });
        },
        toggleMenu: function toggleMenu(hash) {
            this.toggleMenuSms = hash;
        }
    }

});

exports.default = SmsinfoVue;

},{"../ajax.js":92,"vue":89}],134:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vue = require('vue');

var _vue2 = _interopRequireDefault(_vue);

var _ajax = require('../ajax.js');

var ajax = _interopRequireWildcard(_ajax);

var _Alert = require('./vue-strap/src/Alert.vue');

var _Alert2 = _interopRequireDefault(_Alert);

var _ConfirmVue = require('./ConfirmVue.vue');

var _ConfirmVue2 = _interopRequireDefault(_ConfirmVue);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TariffVue = _vue2.default.component('tariff-vue', {
  template: '#tariff-temlate',

  components: { Alert: _Alert2.default, ConfirmVue: _ConfirmVue2.default },

  data: function data() {
    return {
      tariffs: [],
      selectedTariff: {},
      showDangerTarif: false,
      selectedTariffId: null,
      dangerReason: '',
      showConfirmChangeTariff: false,
      isConfirmChangeTariff: false,
      isAgreeChangeTariff: false,
      showAgree: false,
      isDisabled: false
    };
  },


  // ready() {
  //   this.getTariffs();
  // },

  methods: {
    freeze: function freeze() {
      var _this = this;

      var path = '/' + ajax.pathWho + '/tariff/freeze';
      var data = {};

      ajax.sendAjax(data, path).done(function (isFreeze) {
        if (isFreeze) {
          _this.$root.openModal('#freezeAlertModal');
          $('#freezeAlertModal').addClass('animated bounce');
        }
      });
    },


    // getTariffs() {
    //   let path = `/${ajax.pathWho}/tariff/get_tariffs`;
    //   let data = {};
    //
    //   ajax.sendAjax(data, path)
    //     .done((tariffs) => {
    //       this.tariffs = tariffs;
    //       this.selectedTariff = tariffs[0];
    //       this.selectedTariffId = tariffs[0].id;
    //     });
    // },

    getSelectedTariff: function getSelectedTariff() {
      var _this2 = this;

      var selectedTariff = this.tariffs.filter(function (tariff) {
        return _this2.selectedTariffId === tariff.id;
      });

      this.selectedTariff = selectedTariff[0];
    },
    setNewTariff: function setNewTariff() {

      if (!this.isAgreeChangeTariff) {
        this.showAgree = true;
        this.isConfirmChangeTariff = true;
        this.isDisabled = true;
        return;
      }

      this.showConfirmChangeTariff = true;
      this.showAgree = false;
      this.isDisabled = false;

      if (!this.isConfirmChangeTariff) {
        this.isConfirmChangeTariff = false;
        this.isAgreeChangeTariff = false;
        return;
      }
    },
    step2: function step2() {
      $('.block__nav').find('[data-tab="tab-2"]').click();
    }
  },

  watch: {

    //isAgreeChangeTariff() {
    //  if (this.isAgreeChangeTariff) {
    //    this.isDisabled = false;
    //  } else {
    //    this.isDisabled = true;
    //  }
    //}
  },

  events: {
    changeTariff: function changeTariff() {
      var _this3 = this;

      if (this.isConfirmChangeTariff) {
        var path = '/' + ajax.pathWho + '/tariff/change';
        var data = {
          id: this.selectedTariffId
        };

        this.isConfirmChangeTariff = false;

        ajax.sendAjax(data, path).done(function (res) {
          _this3.showConfirmChangeTariff = false;
          _this3.showAgree = false;
          _this3.isAgreeChangeTariff = false;

          if (res.status) {
            location.reload();
          } else {
            _this3.dangerReason = res.reason;
            _this3.showDangerTarif = true;
            _this3.showAgree = false;
            _this3.isAgreeChangeTariff = false;
            _this3.isConfirmChangeTariff = false;
            _this3.isDisabled = false;
          }
        });
      } else {
        this.showAgree = false;
        this.isAgreeChangeTariff = false;
        this.isDisabled = false;
      }
    }
  }

});

exports.default = TariffVue;

},{"../ajax.js":92,"./ConfirmVue.vue":117,"./vue-strap/src/Alert.vue":140,"vue":89}],135:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vue = require('vue');

var _vue2 = _interopRequireDefault(_vue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TariffsVue = _vue2.default.component('tariffs-vue', {
  template: '#tariffs-tamlate',

  data: function data() {
    return {
      lettersCount: '',
      employeeCount: '',
      servicesCount: '',
      dashboardCount: '',
      lettersUnlimited: false,
      employeeUnlimited: false,
      servicesUnlimited: false,
      dashboardUnlimited: false,
      selectedTarif: ''
    };
  },
  ready: function ready() {},


  methods: {
    checkTable: function checkTable(e) {
      var $el = $(e.target);

      if (this.lettersUnlimited) {
        this.lettersCount = '';
      }
      if (this.employeeUnlimited) {
        this.employeeCount = '';
      }
      if (this.servicesUnlimited) {
        this.servicesCount = '';
      }
      if (this.dashboardUnlimited) {
        this.dashboardCount = '';
      }
    }
  }
});

exports.default = TariffsVue;

},{"vue":89}],136:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _vue = require('vue');

var _vue2 = _interopRequireDefault(_vue);

var _ajax = require('../ajax.js');

var ajax = _interopRequireWildcard(_ajax);

var _croppie = require('croppie');

var _croppie2 = _interopRequireDefault(_croppie);

var _Alert = require('./vue-strap/src/Alert.vue');

var _Alert2 = _interopRequireDefault(_Alert);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var $uploadCrop;

var UserInfoVue = _vue2.default.component('user-info-vue', {
    template: '#user-info-template',

    components: { Alert: _Alert2.default },

    data: function data() {
        return {
            logoShow: false,
            isSetAvatar: false,
            showAvatarSuccess: false,
            showLogoSuccess: false,
            showImgPreloader: false
        };
    },

    ready: function ready() {},
    methods: {
        selectFile: function selectFile(e) {
            this.isSetAvatar = true;
            this.readFile(e.target.files);
        },
        readFile: function readFile(files) {
            if (files && files[0]) {
                var reader = new FileReader();

                reader.onload = function (e) {
                    $uploadCrop.croppie('bind', {
                        url: e.target.result
                    });
                    $('.crops').addClass('ready');
                };
                reader.readAsDataURL(files[0]);
            } else {
                alert("Sorry - you're browser doesn't support the FileReader API");
            }

            $uploadCrop = $('.crops').croppie({
                viewport: {
                    width: 290,
                    height: 290,
                    type: 'square'
                },
                boundary: {
                    width: 290,
                    height: 290
                }
            });
        },
        setAvatar: function setAvatar(employeeId) {
            var vm = this;
            var url = '';

            $uploadCrop.croppie('result', {
                type: 'canvas',
                size: 'viewport'
            }).then(function (dataURL) {
                var blob = vm.dataURItoBlob(dataURL);
                var fd = new FormData();
                fd.append("avatar", blob, 'avatar.png');

                if (employeeId) {
                    url = ajax.LOCPATH + '/store_avatar';
                } else {
                    url = '/backend/storeavatar';
                }

                vm.showImgPreloader = true;

                $.ajax({
                    url: url,
                    data: fd,
                    processData: false,
                    contentType: false,
                    type: 'POST',
                    success: function success(src) {
                        $('.jq-file__name').html('');
                        $('.user-info__avatar').attr('src', src);
                        $('.user-info__avatar-small').attr('src', src);
                        $uploadCrop.croppie('destroy');
                        vm.isSetAvatar = false;
                        vm.logoShow = false;
                        vm.showImgPreloader = false;
                        vm.showAvatarSuccess = true;
                    },
                    error: function error() {
                        vm.showImgPreloader = false;
                    }
                });
            });
        },
        dataURItoBlob: function dataURItoBlob(dataURI) {
            var byteString;
            if (dataURI.split(',')[0].indexOf('base64') >= 0) byteString = atob(dataURI.split(',')[1]);else byteString = unescape(dataURI.split(',')[1]);

            var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

            var ia = new Uint8Array(byteString.length);
            for (var i = 0; i < byteString.length; i++) {
                ia[i] = byteString.charCodeAt(i);
            }

            return new Blob([ia], { type: mimeString });
        },
        cancelSetAvatar: function cancelSetAvatar() {
            if ($uploadCrop) {
                $uploadCrop.croppie('destroy');
            }
            $('.jq-file__name').html('');
            this.isSetAvatar = false;
            this.logoShow = false;
        },
        openUserInfoModal: function openUserInfoModal() {
            this.$broadcast('openUserInfoModal');
        },
        changeLogo: function changeLogo() {
            $('#changeLogo').click();
        },
        changeAvatar: function changeAvatar() {
            $('#changeAvatar').click();
        },
        changeStatus: function changeStatus(event) {

            var $element = $(event.target);

            var status = 'admin';

            if ($element.is(":checked")) {

                status = 'employee';
            }

            $.ajax({
                url: '/office/employees/change_status',
                type: 'POST',
                data: {
                    status: status,
                    _token: ajax.getToken()
                }
            }).done(function (response) {

                if (response.redirect !== undefined && response.redirect !== null && !response.redirect.length) {

                    window.location.href = response.redirect;
                } else {

                    window.location.reload();
                }
            }.bind(this));
        },
        sendLogo: function sendLogo(e) {
            var vm = this;
            var $form = $(e.target);
            var typeImg = $form.find('input.logo-block__file').attr('name');
            var $input = $form.find('input[type="file"]');
            var fd = new FormData();

            fd.append(typeImg, $input.prop('files')[0]);

            vm.showImgPreloader = true;

            $.ajax({
                url: window.location['pathname'] + '/store_logo',
                data: fd,
                processData: false,
                contentType: false,
                type: 'POST',
                success: function success(src) {
                    vm.showLogoSuccess = true;
                    vm.showImgPreloader = false;
                    $('.jq-file__name').html('');
                    $('.user-info__logo').attr('src', src);
                },
                error: function error() {
                    vm.showImgPreloader = false;
                }
            });
        },
        previewAvatarr: function previewAvatarr(e) {
            if (e.target.files !== undefined && e.target.files[0]) {
                var reader = new FileReader();
                reader.onload = function (e) {
                    $(document).find("#assistantAvatarPreview").attr('src', e.target.result);
                };
                reader.readAsDataURL(e.target.files[0]);
            }
        },
        sendAvatar: function sendAvatar(e) {
            var vm = this;
            var $form = $(e.target);
            var typeImg = $form.find('input.logo-block__file').attr('name');
            var $input = $form.find('input[type="file"]');
            var fd = new FormData();

            if (e.target.files !== undefined && e.target.files[0]) {
                var reader = new FileReader();
                reader.onload = function (e) {
                    $("#assistantAvatarPreview").attr('src', e.target.result);
                };
                reader.readAsDataURL(e.target.files[0]);
            }

            fd.append(typeImg, $input.prop('files')[0]);

            vm.showImgPreloader = true;

            $.ajax({
                url: window.location['pathname'] + '/store_avatar',
                data: fd,
                processData: false,
                contentType: false,
                type: 'POST',
                success: function success(src) {
                    vm.showAvatarSuccess = true;
                    vm.showImgPreloader = false;
                    $('.jq-file__name').html('');
                    $('.user-info__avatar').attr('src', src);
                },
                error: function error() {
                    vm.showImgPreloader = false;
                }
            });
        }
    }

});

exports.default = UserInfoVue;

},{"../ajax.js":92,"./vue-strap/src/Alert.vue":140,"croppie":80,"vue":89}],137:[function(require,module,exports){
var __vueify_insert__ = require("vueify/lib/insert-css")
var __vueify_style__ = __vueify_insert__.insert("\n\n")
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vue = require('vue');

var _vue2 = _interopRequireDefault(_vue);

var _ajax = require('../ajax.js');

var ajax = _interopRequireWildcard(_ajax);

var _filters = require('../filters.js');

var _filters2 = _interopRequireDefault(_filters);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  data: function data() {
    return {
      worktimes: ['first'],
      isEdit: false,
      days: ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag', 'Sonntag']
    };
  },


  filters: _filters2.default,

  ready: function ready() {},


  methods: {
    editWorktimes: function editWorktimes() {
      var _this = this;

      if (this.isEdit) {
        var data = {
          worktimes: this.worktimes
        };
        var path = '/' + ajax.pathWho + '/firmdetails/edit_worktimes';

        ajax.sendAjax(data, path).done(function (res) {
          if (res) {
            _this.worktimes = ['first'];
            _this.$emit('getWorktimes');
          }
        });
      }
      this.isEdit = !this.isEdit;
    },
    closeShop: function closeShop(e, i) {
      var $checkbox = $(e.target);

      if ($checkbox.is(':checked')) {
        this.worktimes[i].close = true;
        this.worktimes[i].from = '00:00:00';
        this.worktimes[i].to = '00:00:00';
      } else {
        this.worktimes[i].close = false;
      }
    },
    timepickerInit: function timepickerInit() {
      setTimeout(function () {
        $('.worktime-timepicker').timepicker({
          stepMinute: 15,
          defaultValue: '8:00',
          timeFormat: 'H:mm'
        });
      }, 2000);
    }
  },

  events: {
    getWorktimes: function getWorktimes() {
      var _this2 = this;

      var data = {};
      var path = '/' + ajax.pathWho + '/firmdetails/get_worktimes';

      if (this.worktimes[0] === 'first') {
        ajax.sendAjax(data, path).done(function (worktimes) {

          if (worktimes.length === 0) {
            _this2.worktimes = [{ close: true, from: '00:00:00', to: '00:00:00' }, { close: true, from: '00:00:00', to: '00:00:00' }, { close: true, from: '00:00:00', to: '00:00:00' }, { close: true, from: '00:00:00', to: '00:00:00' }, { close: true, from: '00:00:00', to: '00:00:00' }, { close: true, from: '00:00:00', to: '00:00:00' }, { close: true, from: '00:00:00', to: '00:00:00' }];
            _this2.timepickerInit();
            return;
          }

          _this2.worktimes = worktimes;
          _this2.timepickerInit();
        });
      };
    }
  }

};
if (module.exports.__esModule) module.exports = module.exports.default
;(typeof module.exports === "function"? module.exports.options: module.exports).template = "\n<table class=\"table table--striped\">\n\n  <thead>\n    <tr>\n      <th>Tage</th>\n      <th>Startzeit</th>\n      <th>Endzeit</th>\n      <th>Geschlossen</th>\n    </tr>\n  </thead>\n\n  <tbody>\n    <tr v-for=\"worktime in worktimes\" class=\"worktime-tr\">\n      <td><span>{{ days[$index] }}</span></td>\n      <td>\n        <span v-show=\"!isEdit\">{{ worktime.close ? 'Close' : worktime.from }}</span>\n        <input v-model=\"worktime.from\" v-show=\"isEdit\" type=\"text\" class=\"worktime-timepicker\">\n      </td>\n      <td>\n        <span v-show=\"!isEdit\">{{ worktime.close ? '' : worktime.to }}</span>\n        <input v-model=\"worktime.to\" v-show=\"isEdit\" type=\"text\" class=\"worktime-timepicker\">\n      </td>\n      <td>\n        <input v-show=\"!isEdit &amp;&amp; worktime.close\" type=\"checkbox\" checked=\"\" disabled=\"\">\n        <input v-show=\"isEdit\" :checked=\"worktime.close\" @change.stop=\"closeShop($event, $index)\" type=\"checkbox\">\n      </td>\n    </tr>\n  </tbody>\n\n</table>\n\n<div class=\"admin-edit-button\">\n  <a @click.stop=\"editWorktimes\" href=\"javascript:void(0);\" class=\"btn btn--red\">Jetzt ändern</a>\n</div>\n"
if (module.hot) {(function () {  module.hot.accept()
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.dispose(function () {
    __vueify_insert__.cache["\n\n"] = false
    document.head.removeChild(__vueify_style__)
  })
  if (!module.hot.data) {
    hotAPI.createRecord("_v-06b09b71", module.exports)
  } else {
    hotAPI.update("_v-06b09b71", module.exports, (typeof module.exports === "function" ? module.exports.options : module.exports).template)
  }
})()}
},{"../ajax.js":92,"../filters.js":99,"vue":89,"vue-hot-reload-api":86,"vueify/lib/insert-css":90}],138:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _values = require('babel-runtime/core-js/object/values');

var _values2 = _interopRequireDefault(_values);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _ajax = require('../ajax.js');

var ajax = _interopRequireWildcard(_ajax);

var _vueDatepicker = require('./vue-datepicker.vue');

var _vueDatepicker2 = _interopRequireDefault(_vueDatepicker);

var _lib = require('../lib.js');

var lib = _interopRequireWildcard(_lib);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    components: {
        'date-picker': _vueDatepicker2.default
    },
    data: function data() {
        return {
            employeeActive: this.employeeslist[0].id,
            services: null,
            eventsAll: null,
            eventUsers: [],
            showCalendarForm: false,
            clients: null,
            showAllColor: null,
            getBackgroundColor1: '#fff',
            getBackgroundColor2: '#4f71b0',
            startDate: '',
            getClientStr: '',
            hideClientList: false,
            newUser: false,
            firstName: '',
            lastName: '',
            emailClient: '',
            phoneClient: '',
            mobileClient: '',
            startTime: '',
            endTime: '',
            checkEmployee: this.employeeslist[0].id,
            checkTarif: null,
            checkServices: null,
            emailSend: false,
            smsSend: false,
            commentOrder: '',
            checkService: '',
            checkTariff: '',
            hideTarifBlock: true,
            hideServiceBlock: true,
            validate: {
                email: true,
                orderEmploye: true,
                emailClient: true,
                orderService: true,
                date: true,
                time: true,
                first_name: true,
                last_name: true,
                orderOffice: true
            },
            serviceCheck: null,
            eventId: 0,
            editForm: false,
            cartId: 0,
            userServiceGet: null,
            setNewUser: false,
            editView: '',
            clearForm: false,
            employees: null,
            hideEmployeList: true,
            employId: this.employeeslist[0].name + ' ' + this.employeeslist[0].last_name,
            translatedText: {
                clear_form: 'Clea',
                cancel_btn: 'Kantsel',
                add_btn: 'Hinzufügen',
                edit_btn: 'Bearbeiten',
                add_new_client: 'Neuen Client hinzufügen',
                check_client: 'Client überprüfen',
                first_name: 'Vorname',
                last_name: 'Nachname',
                phone: 'Telefon',
                mobile_phone: 'Mobiltelefon',
                email: 'Email',
                comment: 'Kommentar',
                check_category: 'Überprüfen Kategorie',
                check_service: 'Überprüfen Service',
                check_employee: 'Überprüfen employe',
                date: 'Datum',
                sms_check: 'SMS',
                email_check: 'Email',
                notif_employee: 'Mitarbeiter benachrichtigen',
                notif_client: 'Client benachrichtigen',
                create_order: 'Auftrag anlegen',
                dragg_quest: 'Sind Sie sicher, dass Sie eine Bestellung verschieben möchten?',
                order_employee: 'Mitarbeiter beschäftigt zu diesem Zeitpunkt',
                delete_order: 'Löschen bestellen',
                add_order: 'Neue Termin',
                dragg_success: 'Herzliche Glückwünsche . Anwendung ändern',
                order_office: 'Salon funktioniert zu diesem Zeitpunkt nicht',
                yes_answer: 'Ja',
                no_answer: 'Nein',
                timeOnlyTitle: 'Wählen Sie Zeit',
                timeText: 'Zeit',
                hourText: 'Uhr',
                minuteText: 'Minuten',
                secondText: 'Sekunden',
                currentText: 'im Moment',
                closeText: 'schließen',
                dayMo: 'Mo',
                dayTu: 'Di',
                dayWe: 'Mi',
                dayTh: 'Do',
                dayFr: 'Fr',
                daySa: 'Sa',
                daySu: 'So',
                monthJa: 'Januar',
                monthFe: 'Februar',
                monthMa: 'März',
                monthAp: 'April',
                monthMay: 'Mai',
                monthJu: 'Juni',
                monthJul: 'Juli',
                monthAu: 'August',
                monthSep: 'September',
                monthOct: 'Oktober',
                monthNow: 'November',
                monthDec: 'Dezember',
                whenTr: 'wann'
            },
            deleteOrder: false,
            showConfirmPopup: false,
            draggEvent: null,
            draggView: null,
            showSuccessPopup: false,
            showErrorPopup: false,
            sendClientMail: true,
            emailEmpl: this.employeeslist[0].email,
            isEmplMail: false,
            viewState: '',
            hideColorPicker: true,
            options: null,
            blockSendBtn: false
        };
    },

    watch: {
        startTime: function startTime() {
            var _this = this;

            setTimeout(function () {
                _this.checkEndDate();
            }, 1000);
        },
        startDate: function startDate() {
            this.checkEndDate();
        },
        checkService: function checkService() {
            var _this2 = this;

            setTimeout(function () {
                _this2.checkEndDate();
            }, 2000);
        }
    },
    created: function created() {
        this.getTrans();
    },
    ready: function ready() {
        this.options = {
            'week': [this.translatedText.dayMo, this.translatedText.dayTu, this.translatedText.dayWe, this.translatedText.dayTh, this.translatedText.dayFr, this.translatedText.daySa, this.translatedText.daySu],
            'month': [this.translatedText.monthJa, this.translatedText.monthFe, this.translatedText.monthMa, this.translatedText.monthAp, this.translatedText.monthMay, this.translatedText.monthJu, this.translatedText.monthJul, this.translatedText.monthAu, this.translatedText.monthSep, this.translatedText.monthOct, this.translatedText.monthNow, this.translatedText.monthDec],
            'placeholder': this.translatedText.whenTr
        };
        this.getEvents(this.employeeslist[0]);
        this.showServices(this.employeeslist[0].id);
        this.getClients();
        // this.getTimePicker();
        this.getUserClick();
        this.fullCalendarInit();
        this.colorPickerStart();
    },


    props: ['work-days', 'employeeslist'],

    methods: {
        fullCalendarInit: function fullCalendarInit() {
            var view = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'agendaWeek';

            var vm = this;
            $('#calendar').fullCalendar({
                customButtons: {
                    addOrder: {
                        text: '+ ' + vm.translatedText.add_order,
                        click: function click() {
                            vm.openClearPopup();
                        }
                    }
                },
                header: {
                    left: 'addOrder today prev,next',
                    center: 'title',
                    right: 'month,agendaWeek,agendaDay'
                },
                timeFormat: '(HH:mm)',
                slotLabelFormat: '(HH:mm)',
                locale: this.$root.locale,
                editable: true,
                eventLimit: true, // allow "more" link when too many events
                navLinks: true,
                minTime: '08:00:00',
                maxTime: '22:00:00',
                slotDuration: '00:15:00',
                defaultView: view,
                allDaySlot: false,
                height: 'auto',
                // defaultView: 'agendaWeek',
                events: this.eventUsers,
                dayClick: function dayClick(date, allDay, jsEvent) {
                    vm.viewState = $('#calendar').fullCalendar('getView');
                    vm.showCalendarFormFunc(date, vm.viewState.type);
                },
                eventDrop: function eventDrop(event, delta) {
                    vm.viewState = $('#calendar').fullCalendar('getView');
                    vm.confirmPopup(vm.translatedText.dragg_quest, vm.viewState, event);
                },
                eventClick: function eventClick(event) {
                    vm.viewState = $('#calendar').fullCalendar('getView');
                    vm.editFormFunc(event, vm.viewState.type);
                }
            });
        },
        fullCalendarDestroy: function fullCalendarDestroy(view) {
            $('#calendar').fullCalendar('destroy');
            if (view) {
                this.fullCalendarInit(view);
            } else {
                this.fullCalendarInit();
            }
        },
        setColor: function setColor(color) {
            this.getBackgroundColor2 = color;
            this.hideColorPicker = true;
        },
        showServices: function showServices(id) {
            var _this3 = this;

            this.checkTariff = '';
            this.checkService = '';
            this.checkServices = null;
            if (id) {
                var data = {
                    employee_id: id
                };
            } else {
                data = {};
            }

            ajax.getServices(data).done(function (services) {
                _this3.services = services;
            });
        },
        checkEmplFunc: function checkEmplFunc(empl) {
            this.checkEmployee = empl.id;
            this.hideEmployeList = true;
            this.employId = empl.name + ' ' + empl.last_name;
            this.emailEmpl = empl.email;
            if (!this.clearForm) {
                this.showServices(empl.id);
            }
        },
        getEmployes: function getEmployes(id) {
            var _this4 = this;

            if (id) {
                var data = {
                    service_id: id
                };
            } else {
                data = {};
            }
            this.$http.post('/office/get_employees', data).then(function (response) {
                _this4.employees = null;
                _this4.employees = response.data;
            }, function (response) {
                // err
            });
        },
        getEvents: function getEvents(empl) {
            var _this5 = this;

            var view = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
            var email = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

            console.log(email);
            if ((typeof empl === 'undefined' ? 'undefined' : (0, _typeof3.default)(empl)) !== 'object') empl = { id: empl, email: email };
            this.emailEmpl = empl.email ? empl.email : this.emailEmpl;
            this.showServices(empl.id);
            var host = window.location.host;
            var subDomain = host.slice(0, host.indexOf('.'));
            var data = {
                data: subDomain,
                from: '01/01/2010',
                to: '31/12/2050',
                id: empl.id
            };
            this.$http.post('/office/get_calendar', data).then(function (response) {
                _this5.eventsAll = response.data;
                _this5.eventUsers = [];
                _this5.eventsAll.forEach(function (event) {
                    var dateEvent = event.date.split('/').reverse().join("-");
                    console.log(dateEvent);
                    _this5.eventUsers.push({
                        id: event.id,
                        title: event.first_name + ' ' + event.last_name + '\n' + event.service_name + '\n' + event.description,
                        start: dateEvent + 'T' + event.time_from,
                        end: dateEvent + 'T' + event.time_to,
                        backgroundColor: event.color
                    });
                });
                _this5.showServices(empl.id);
                _this5.employeeActive = empl.id;
                _this5.fullCalendarDestroy(_this5.viewState.type);
                _this5.checkEmployee = empl.id;
            }, function (response) {
                // err
            });
        },
        getClients: function getClients() {
            var _this6 = this;

            this.$http.post('/office/kalendar/get_clients').then(function (response) {
                _this6.clients = response.data;
            }, function (response) {
                // err
            });
        },
        showCalendarFormFunc: function showCalendarFormFunc(date) {
            var _this7 = this;

            this.showServices(this.checkEmployee);
            this.getEmployes(false);
            this.startDate = date.format().split('T') ? date.format().split('T')[0] : date.format();
            var momentLocale = (0, _moment2.default)(date);
            momentLocale.locale('ru');
            this.startTime = momentLocale.format('LT') === '00:00' ? '08:00' : momentLocale.format('LT');
            this.employeeslist.forEach(function (employ) {
                if (employ.id == _this7.checkEmployee) {
                    _this7.employId = employ.name + ' ' + employ.last_name;
                    _this7.emailEmpl = employ.email;
                }
            });
            this.showCalendarForm = true;
        },
        getTimePicker: function getTimePicker() {
            var startTime = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

            console.log($('input.timepicker1'));
            var vm = this;
            $('input.itimepicker1,input.itimepicker2').timepicker({
                timeOnlyTitle: vm.translatedText.timeOnlyTitle,
                timeText: vm.translatedText.timeText,
                hourText: vm.translatedText.hourText,
                minuteText: vm.translatedText.minuteText,
                secondText: vm.translatedText.secondText,
                currentText: vm.translatedText.currentText,
                closeText: vm.translatedText.closeText,
                hour: 8,
                minute: 0,
                hourMin: 8,
                hourMax: 21,
                stepMinute: 15
            });
        },
        getUserClick: function getUserClick() {
            var vm = this;
            $(document).click(function (e) {
                if ($(e.target).closest(".select_client,.client_check,#checkServiceInp,#checkTarifInp,.single_service,#checkEmpl,.select_employe,.check_color,.all_color").length) return;
                vm.hideClientList = true;
                vm.hideServiceBlock = true;
                vm.hideTarifBlock = true;
                vm.hideEmployeList = true;
                vm.hideColorPicker = true;
                e.stopPropagation();
            });
        },
        setHigLight: function setHigLight(word, e, classElem) {
            console.log(e);
            if (e.key !== 'Backspace' && e.key !== 'Control' && e.key !== 'F5' && e.key !== 'Shift' && e.key !== 'Alt' && e.key !== 'Delete' && e.key !== 'Esc' && e.key !== 'F1' && e.key !== 'CapsLock' && e.key !== 'Meta' && e.key !== 'Enter' && word !== '') {
                $('.' + classElem).off().removeHighlight();
                $('.' + classElem).off().highlight(word);
            }
        },
        getUserCheckService: function getUserCheckService(key, value) {
            this.checkServices = key;
            this.checkTariff = value;
            this.hideServiceBlock = true;
        },
        newClientClick: function newClientClick() {
            this.newUser = true;
            this.hideClientList = true;
        },
        checkClient: function checkClient(client) {
            this.getClientStr = client.first_name + ' ' + client.last_name;
            this.hideClientList = true;
            this.firstName = client.first_name;
            this.lastName = client.last_name;
            this.emailClient = client.email;
            this.mobileClient = client.mobile;
            this.phoneClient = client.telephone === '' ? client.mobile : client.telephone;
        },
        sendForm: function sendForm() {
            var _this8 = this;

            var view = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

            if (!this.validateData()) return;
            var data = {
                vorname: this.firstName,
                nachname: this.lastName,
                phone: this.phoneClient,
                mobil: this.mobileClient,
                email: this.emailClient,
                color: this.getBackgroundColor2,
                description: this.commentOrder,
                time_from: this.startTime,
                time_to: this.endTime,
                date: this.startDate.split('-').reverse().join("/"),
                employee: this.checkEmployee,
                send_sms: this.smsSend ? 1 : 0,
                send_email: this.emailSend ? 1 : 0,
                notify_empl: this.notifyEmpl ? 1 : 0,
                notify_client: this.notifyClient ? 1 : 0,
                action: this.deleteOrder ? 'delete' : this.editForm ? 'edit' : 'create',
                isClientMail: this.sendClientMail ? 1 : 0,
                emailEmpl: this.emailEmpl,
                isEmplMail: this.isEmplMail ? 1 : 0
            };
            if (this.editForm) {
                data.cartId = this.cartId;
                data.service = this.userServiceGet !== null ? this.userServiceGet.service_id : false;
            } else if (this.clearForm) {
                data.service = this.userServiceGet !== null ? this.userServiceGet.id : false;
            } else {
                data.service = this.userServiceGet !== null ? this.userServiceGet.service_id : false;
            }
            if (this.setNewUser) {
                data.new = this.setNewUser;
            }
            this.$http.post('/office/add_calendar', data).then(function (response) {
                _this8.clearFormFunc();
                _this8.getEvents(_this8.checkEmployee, _this8.viewState.type, _this8.emailEmpl);
            }, function (response) {
                _this8.clearFormFunc();
                _this8.getEvents(_this8.checkEmployee, _this8.viewState.type);
            });
        },
        checkEndDate: function checkEndDate() {
            var _this9 = this;

            var service = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
            var startTime = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

            this.userServiceGet = service !== null ? service : this.userServiceGet;
            if (this.clearForm) {
                this.getEmployes(this.userServiceGet.id);
            }
            if (this.editForm) {
                this.getEmployes(this.userServiceGet.service_id);
            }
            this.checkService = service !== null ? service.service_name + ' - ' + service.price + ' €; ' + service.duration + 'min' : this.userServiceGet !== null ? this.userServiceGet.service_name + ' - ' + this.userServiceGet.price + ' €; ' + this.userServiceGet.duration + 'min' : '';
            this.hideTarifBlock = true;
            var data = {
                duration: this.userServiceGet !== null ? this.userServiceGet.duration : 0,
                start_time: this.startTime,
                date: this.startDate.split('-').reverse().join("/"),
                id: this.checkEmployee,
                cartId: this.eventId
            };
            this.blockSendBtn = true;
            this.$http.post('/office/check_employee', data).then(function (response) {
                if (response.data.check) {
                    _this9.endTime = response.data.end_time;
                    _this9.validate.orderEmploye = true;
                    _this9.validate.orderOffice = true;
                    _this9.blockSendBtn = false;
                } else {
                    if (response.data.reason == 'worktime') {
                        _this9.validate.orderOffice = false;
                    } else {
                        _this9.validate.orderEmploye = false;
                    }
                }
            }, function (response) {
                // err
            });
        },
        tarifClick: function tarifClick(str) {
            var close = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

            if (str === 't') {
                if (close) {
                    this.checkService = '';
                    this.userServiceGet = null;
                    this.hideTarifBlock = true;
                    this.hideServiceBlock = true;
                    return;
                }
                this.hideTarifBlock = false;
                this.hideServiceBlock = true;
            } else {
                if (close) {
                    this.checkTariff = '';
                    this.checkService = '';
                    this.checkServices = null;
                    this.hideTarifBlock = true;
                    this.hideServiceBlock = true;
                    this.userServiceGet = null;
                    return;
                }
                this.hideTarifBlock = true;
                this.hideServiceBlock = false;
            }
        },
        checkEmail: function checkEmail(email) {
            var _this10 = this;

            var data = {
                email: email
            };
            var isValid = lib.validateEmail(email);
            if (!isValid) {
                this.validate.email = false;
                return;
            }
            this.$http.post('/office/check_email', data).then(function (response) {
                _this10.validate.email = true;
                if (response.data[0] == 0) {
                    _this10.setNewUser = true;
                } else if (response.data[0] === 1) {
                    _this10.validate.email = false;
                }
            }, function (response) {
                // err
            });
        },
        editEvent: function editEvent() {
            var _this11 = this;

            var event = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
            var view = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

            var data = void 0;
            if (event) {
                var stopDropable = false;
                var timeTo;
                var date = event.start.format().split('T');
                var momentLocale = (0, _moment2.default)(event.start, "HH:mm");
                momentLocale.locale('ru');
                var dateStarte = momentLocale.format('LT');
                var oneEvent;
                this.eventsAll.forEach(function (eventA) {
                    if (event.id === eventA.id) {
                        oneEvent = eventA;
                    }
                });
                var dataCheck = {
                    duration: oneEvent.duration,
                    start_time: dateStarte,
                    date: date[0].split('-').reverse().join("/"),
                    id: this.checkEmployee,
                    cartId: oneEvent.id
                };
                this.$http.post('/office/check_employee', dataCheck).then(function (response) {
                    if (response.data.check) {
                        _this11.validate.orderOffice = true;
                        _this11.validate.orderEmploye = true;
                        var data = {
                            cartId: event.id,
                            date: date[0].split('-').reverse().join("/"),
                            time_from: dateStarte ? dateStarte : oneEvent.time_from,
                            time_to: response.data.end_time,
                            action: 'edit',
                            vorname: oneEvent.first_name,
                            nachname: oneEvent.last_name,
                            phone: oneEvent.telephone,
                            email: oneEvent.email,
                            color: oneEvent.color,
                            description: oneEvent.description,
                            employee: _this11.checkEmployee,
                            service: oneEvent.service_id,
                            send_email: oneEvent.send_email ? 1 : 0,
                            send_sms: oneEvent.send_sms ? 1 : 0,
                            isClientMail: 1,
                            emailEmpl: _this11.emailEmpl,
                            isEmplMail: 1
                        };
                        _this11.$http.post('/office/add_calendar', data).then(function (response) {
                            _this11.showCalendarForm = false;
                            _this11.showSuccessPopup = true;
                            _this11.getEvents(_this11.checkEmployee, _this11.viewState.type);
                        }, function (response) {
                            _this11.showCalendarForm = false;
                            _this11.getEvents(_this11.checkEmployee, _this11.viewState.type);
                        });
                    } else {
                        if (response.data.reason == 'worktime') {
                            _this11.validate.orderOffice = false;
                        } else {
                            _this11.validate.orderEmploye = false;
                        }
                        _this11.showErrorPopup = true;
                        _this11.getEvents(_this11.checkEmployee, _this11.viewState.type);
                    }
                }, function (response) {
                    // err
                });
            }
        },
        editFormFunc: function editFormFunc(event, view) {
            var _this12 = this;

            var editEvent = void 0;
            this.showCalendarForm = true;
            this.eventsAll.forEach(function (eventA) {
                if (eventA.id === event.id) {
                    editEvent = eventA;
                }
            });
            this.startDate = editEvent.date;
            this.getClientStr = editEvent.first_name + ' ' + editEvent.last_name;
            this.hideClientList = false;
            this.newUser = false;
            this.firstName = editEvent.first_name;
            this.lastName = editEvent.last_name;
            this.emailClient = editEvent.email;
            this.phoneClient = editEvent.telephone;
            this.mobileClient = editEvent.mobile;
            this.checkTariff = editEvent.category_name;
            this.checkService = editEvent.service_name + ' - ' + editEvent.price + ' €;' + editEvent.duration + 'min';
            this.checkServices = [];
            this.checkServices.push({
                category_id: editEvent.category_id,
                category_name: editEvent.category_name,
                duration: editEvent.duration,
                price: editEvent.price,
                service_id: editEvent.service_id,
                service_name: editEvent.service_name
            });
            this.userServiceGet = editEvent;
            // time format start
            var momentLocale = (0, _moment2.default)(editEvent.time_from, "HH:mm");
            momentLocale.locale('ru');
            this.startTime = momentLocale.format('LT');

            var momentLocaleEnd = (0, _moment2.default)(editEvent.time_to, "HH:mm");
            momentLocale.locale('ru');
            this.endTime = momentLocaleEnd.format('LT');
            // time format end

            this.employeeslist.forEach(function (employ) {
                if (employ.id == _this12.checkEmployee) {
                    _this12.employId = employ.name + ' ' + employ.last_name;
                }
            });
            this.getBackgroundColor2 = editEvent.color;
            this.emailSend = editEvent.send_email === '1' ? true : false;
            this.smsSend = editEvent.send_sms === '1' ? true : false;
            this.commentOrder = editEvent.description;
            this.hideTarifBlock = false;
            this.hideServiceBlock = false;
            // this.showServices(this.checkEmployee);
            this.eventId = editEvent.id;
            this.editForm = true;
            this.cartId = editEvent.id;
            this.isEmplMail = editEvent.is_empl_email === '1' ? true : false;
            this.sendClientMail = editEvent.is_client_email === '1' ? true : false;
        },
        clearFormFunc: function clearFormFunc() {
            var typeClick = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

            if (typeClick == 'clear') {
                this.showCalendarForm = true;
            } else {
                this.showCalendarForm = false;
                this.employId = '';
            }
            this.startDate = '';
            this.getClientStr = '';
            this.hideClientList = true;
            this.newUser = false;
            this.firstName = '';
            this.lastName = '';
            this.emailClient = '';
            this.phoneClient = '';
            this.mobileClient = '';
            this.startTime = '';
            this.endTime = '';
            this.checkTarif = null;
            this.checkServices = null;
            this.emailSend = false;
            this.smsSend = false;
            this.commentOrder = '';
            this.checkService = '';
            this.checkTariff = '';
            this.hideTarifBlock = true;
            this.hideServiceBlock = true;
            this.hideEmployeList = true;
            this.serviceCheck = null;
            this.eventId = 0;
            this.editForm = false;
            this.userServiceGet = null;
            this.editView = '';
            this.cartId = 0;
            this.clearForm = false;
            this.validate = {
                email: true,
                orderEmploye: true,
                emailClient: true,
                orderService: true,
                date: true,
                time: true,
                first_name: true,
                last_name: true,
                orderOffice: true
            };
            this.setNewUser = false;
            this.getBackgroundColor2 = '#4f71b0';
            this.deleteOrder = false;
            this.sendClientMail = true;
            this.isEmplMail = false;
        },
        openClearPopup: function openClearPopup() {
            var _this13 = this;

            this.clearFormFunc();
            this.employees = null;
            this.services = null;
            this.clearForm = true;
            this.$http.post('/office/get_services').then(function (response) {
                console.log('response seervice', response);
                _this13.services = response.data;
                _this13.showCalendarForm = true;
            }, function (response) {
                _this13.showCalendarForm = true;
            });
        },
        clearClientInfo: function clearClientInfo() {
            this.hideClientList = true;
            this.firstName = '';
            this.lastName = '';
            this.emailClient = '';
            this.phoneClient = '';
            this.mobileClient = '';
            this.getClientStr = '';
        },
        colorPickerStart: function colorPickerStart() {
            var vm = this;

            // $('#colorPicker').ColorPicker({
            //     color: vm.getBackgroundColor2,
            //     onShow: function (colpkr) {
            //         $(colpkr).fadeIn(500);
            //         return false;
            //     },
            //     onHide: function (colpkr) {
            //         $(colpkr).fadeOut(500);
            //         return false;
            //     },
            //     onChange: function (hsb, hex, rgb) {
            //         $('#colorPicker div').css('backgroundColor', '#' + hex);
            //         vm.getBackgroundColor2 = '#' + hex;
            //     }
            // });
        },
        validateData: function validateData() {
            var checkValid = true;
            if (!this.firstName) {
                this.validate.first_name = false;
            } else {
                this.validate.first_name = true;
            }
            if (!this.lastName) {
                this.validate.last_name = false;
            } else {
                this.validate.last_name = true;
            }
            if (!this.startTime) {
                this.validate.time = false;
            } else {
                this.validate.time = true;
            }
            if (!this.checkEmployee) {
                this.validate.orderEmploye = false;
            } else {
                this.validate.orderEmploye = true;
            }
            if (!this.startDate) {
                this.validate.date = false;
            } else {
                this.validate.date = true;
            }
            if (!this.emailClient) {
                this.validate.emailClient = false;
            } else {
                this.validate.emailClient = true;
            }
            if (this.userServiceGet === null) {
                this.validate.orderService = false;
            } else {
                this.validate.orderService = true;
            }
            this.checkEmail(this.emailClient);
            (0, _values2.default)(this.validate).forEach(function (data) {
                if (!data) {
                    checkValid = false;
                }
            });
            if (checkValid) {
                return true;
            } else {
                return false;
            }
        },
        getTrans: function getTrans(key) {
            var _this14 = this;

            var data = {
                lang: this.$root.locale
            };
            this.$http.post('/translate', data).then(function (response) {
                _this14.translatedText = response.data;
                _this14.getTimePicker();
            }, function (response) {});
        },
        confirmPopup: function confirmPopup(str, view, event) {
            var y = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
            var n = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

            if (str) {
                this.showConfirmPopup = true;
                this.draggEvent = event;
                this.draggView = view;
            }
            if (y) {
                this.showConfirmPopup = false;
                this.editEvent(this.draggEvent, this.draggView.type);
                this.draggEvent = null;
                this.draggView = null;
            }
            if (n) {
                this.showConfirmPopup = false;
                this.fullCalendarDestroy(this.draggView.type);
                this.draggEvent = null;
                this.draggView = null;
            }
        },
        closePopupErr: function closePopupErr() {
            this.showErrorPopup = false;
            this.validate.orderEmploye = true;
            this.validate.orderOffice = true;
        }
    }

};
if (module.exports.__esModule) module.exports = module.exports.default
;(typeof module.exports === "function"? module.exports.options: module.exports).template = "\n<div class=\"calendar_view\">\n\n    <!-- quest popup -->\n    <div class=\"confirm_window\" v-if=\"showConfirmPopup\">\n        <div class=\"overlay\"></div>\n        <div class=\"confirm_question\">\n            <div class=\"img_att\">\n                <span class=\"circle_attention\"></span>\n            </div>\n            <p>{{translatedText.dragg_quest}}</p>\n            <div class=\"buttons\">\n                <button @click=\"confirmPopup(false,null,null,true)\" class=\"success\">{{translatedText.yes_answer}}</button>\n                <button @click=\"confirmPopup(false,null,null,false,true)\">{{translatedText.no_answer}}</button>\n            </div>\n        </div>\n    </div>\n\n    <!-- success popup -->\n    <div class=\"confirm_window\" v-if=\"showSuccessPopup\">\n        <div class=\"overlay\" @click=\"showSuccessPopup = false\"></div>\n        <div class=\"confirm_question\">\n            <div class=\"img_att\">\n                <span class=\"circle_success\"></span>\n            </div>\n            <p>{{translatedText.dragg_success}}</p>\n            <div class=\"buttons\">\n                <button @click=\"showSuccessPopup = false\" class=\"success\">Ok</button>\n            </div>\n        </div>\n    </div>\n\n    <!-- error popup -->\n    <div class=\"confirm_window\" v-if=\"showErrorPopup\">\n        <div class=\"overlay\" @click=\"closePopupErr()\"></div>\n        <div class=\"confirm_question\">\n            <div class=\"img_att\">\n                <span class=\"circle_error\"></span>\n            </div>\n            <p v-if=\"!validate.orderEmploye\">{{translatedText.order_employee}}</p>\n            <p v-if=\"!validate.orderOffice\">{{translatedText.order_office}}</p>\n            <div class=\"buttons\">\n                <button @click=\"closePopupErr()\" class=\"error\">Ok</button>\n            </div>\n        </div>\n    </div>\n\n    <!-- add in calendar -->\n    <div class=\"calendar_add\" v-show=\"showCalendarForm\">\n        <div class=\"overlay\" @click=\"clearFormFunc\"></div>\n        <div class=\"calendar_add_form\">\n            <div class=\"head\">\n                <h1>{{translatedText.create_order}}</h1>\n                <button class=\"remodal-close\" @click=\"clearFormFunc\"><i></i></button>\n            </div>\n            <div class=\"main\">\n                <div class=\"left\">\n                <label for=\"clientList\">\n                    <input id=\"clientList\" type=\"text\" :placeholder=\"translatedText.check_client\" class=\"client_check\" v-model=\"getClientStr\" @click=\"hideClientList = false;\" @keyup=\"setHigLight(getClientStr,$event,'select_client')\">\n                    <span @click=\"clearClientInfo()\" :class=\"{'close' : getClientStr.length}\"></span>\n                </label>\n                    <div class=\"select_client\" v-if=\"!hideClientList\">\n                        <div class=\"single_client\" v-for=\"client in clients | orderBy 'last_name' | filterBy getClientStr\" @click=\"checkClient(client)\">\n                            <div class=\"avatar\">\n                                <img src=\"/images/default_avatar.png\" alt=\"\" v-if=\"client.avatar_client == null\">\n                                <img :src=\"client.avatar_client.path\" alt=\"\" v-if=\"client.avatar_client != null\">\n                            </div>\n                            <div class=\"description\">\n                                <p class=\"name\">{{client.first_name + ' ' + client.last_name}}</p>\n                                <p class=\"small_info\">\n                                    <span v-if=\"client.mobile\">{{client.mobile}}</span><span v-if=\"client.telephone\"> | {{client.telephone}}</span><span v-if=\"client.email\"> | {{client.email}}</span>\n                                </p>\n                            </div>\n                        </div>\n                        <div class=\"add_client\">\n                            <button @click=\"newClientClick\">{{translatedText.add_new_client}}</button>\n                        </div>\n                    </div>\n                    <div class=\"client_info_block\">\n                        <input type=\"text\" :placeholder=\"translatedText.first_name\" :disabled=\"!newUser &amp;&amp; !emailClient.length &amp;&amp; !editForm\" :class=\"{'error' : !validate.first_name}\" v-model=\"firstName\">\n                        <input type=\"text\" :placeholder=\"translatedText.last_name\" :disabled=\"!newUser &amp;&amp; !emailClient.length &amp;&amp; !editForm\" :class=\"{'error' : !validate.last_name}\" v-model=\"lastName\">\n                        <input type=\"text\" :placeholder=\"translatedText.phone\" :disabled=\"!newUser &amp;&amp; !emailClient.length &amp;&amp; !editForm\" v-model=\"phoneClient\">\n                        <input type=\"text\" :placeholder=\"translatedText.mobile_phone\" :disabled=\"!newUser &amp;&amp; !emailClient.length &amp;&amp; !editForm\" v-model=\"mobileClient\">\n                        <input type=\"email\" :placeholder=\"translatedText.email\" class=\"email\" :disabled=\"!newUser &amp;&amp; !emailClient.length &amp;&amp; !editForm\" v-model=\"emailClient\" @change=\"checkEmail(emailClient)\" :class=\"{'error' : !validate.email}\">\n                        <textarea name=\"\" id=\"\" cols=\"30\" rows=\"10\" :placeholder=\"translatedText.comment\" v-model=\"commentOrder\"></textarea>\n                    </div>\n                </div>\n                <div class=\"right\">\n                    <div class=\"check_service_all\"> \n                        <label for=\"checkServiceInp\">\n                                <input type=\"text\" id=\"checkServiceInp\" @click=\"tarifClick('s')\" :placeholder=\"translatedText.check_category\" v-model=\"checkTariff\" @keyup=\"setHigLight(checkTariff,$event,'service_hide_block')\">\n                                <span @click=\"tarifClick('s')\" v-if=\"!checkTariff.length\"></span>\n                                <span @click=\"tarifClick('s','close')\" v-if=\"checkTariff.length\" :class=\"{'close' : checkTariff.length}\"></span>\n                        </label>\n                        <div class=\"service_hide_block\" v-if=\"!hideServiceBlock\">\n                            <div class=\"single_service\" v-for=\"(value,key) in services | filterBy checkTariff\" @click=\"getUserCheckService(key,value)\">\n                                <p>{{value}}</p>\n                            </div>\n                        </div>\n                    </div>\n                    <div class=\"check_service_all\"> \n                        <label for=\"checkTarifInp\">\n                                <input type=\"text\" :class=\"{'error' : !validate.orderService}\" id=\"checkTarifInp\" :disabled=\"checkServices === null\" v-model=\"checkService\" :placeholder=\"translatedText.check_service\" @click=\"tarifClick('t')\" @keyup=\"setHigLight(checkService,$event,'service_hide_block')\">\n                                <span @click=\"tarifClick('t')\" v-if=\"!checkService.length\"></span>\n                                <span @click=\"tarifClick('t','close')\" v-if=\"checkService.length\" :class=\"{'close' : checkService.length}\"></span>\n                        </label>\n                        <div class=\"service_hide_block bottom\" v-if=\"!hideTarifBlock &amp;&amp; checkServices !== null\">\n                            <div class=\"single_tarif\" v-for=\"checkServiced in checkServices | filterBy checkService\" @click=\"checkEndDate(checkServiced)\">\n                                <p>\n                                    <span>{{checkServiced.service_name}}</span>\n                                    <span>{{checkServiced.duration}} min</span>\n                                    <span>{{checkServiced.price}} €</span>\n                                </p>\n                            </div>\n                        </div>\n                    </div>\n                    <span class=\"line\"></span>\n                    <div class=\"empl_with_color\">   \n                        <div class=\"employer\">\n                            <label for=\"checkEmpl\">\n                                <input type=\"text\" id=\"checkEmpl\" :class=\"{'error' : !validate.orderEmploye}\" v-model=\"employId\" :placeholder=\"translatedText.check_employee\" @click=\"hideEmployeList = false;\" @keyup=\"setHigLight(employId,$event,'select_employe')\">\n                                <span @click=\"hideEmployeList = false;\" v-if=\"!employId.length\"></span>\n                                <span @click=\"employId = ''\" v-if=\"employId.length\" :class=\"{'close' : employId.length}\"></span>\n                            </label>\n                            <div class=\"select_employe\" v-if=\"!hideEmployeList\">\n                                <div class=\"single_client\" v-for=\"employ in employees | filterBy employId in 'name'\" @click=\"checkEmplFunc(employ)\">\n                                    <div class=\"avatar\">\n                                            <img src=\"/images/default_avatar.png\" alt=\"\" v-if=\"!employ.path\">\n                                            <img :src=\"employ.path\" :alt=\"employ.name\" v-if=\"employ.path\">\n                                    </div>\n                                    <div class=\"description\">\n                                        <p class=\"name\">{{employ.name + ' ' + employ.last_name}}</p>\n                                    </div>\n                                </div>\n                            </div>\n                        </div>\n                        <div class=\"collor_check\">\n                        <div class=\"right\">\n                           \n                            <!-- <div id=\"colorPicker\">\n                                <div :style=\"{'backgroundColor': getBackgroundColor2}\"></div>\n                            </div> -->\n                            <div class=\"check_color\" @click=\"hideColorPicker = false\" :style=\"{'backgroundColor': getBackgroundColor2}\"></div>\n                            <div class=\"all_color\" :class=\"{'active' : !hideColorPicker}\">\n                                <span class=\"c4f71b0\" @click=\"setColor('#4f71b0')\"></span>\n                                <span class=\"f5d16e\" @click=\"setColor('#f5d16e')\"></span>\n                                <span class=\"c1bbcb6\" @click=\"setColor('#1bbcb6')\"></span>\n                                <span class=\"f66a55\" @click=\"setColor('#f66a55')\"></span>\n                                <span class=\"c995253\" @click=\"setColor('#995253')\"></span>\n                                <span class=\"ab86b7\" @click=\"setColor('#ab86b7')\"></span>\n                                <span class=\"c1aa890\" @click=\"setColor('#1aa890')\"></span>\n                                <span class=\"b91d43\" @click=\"setColor('#b91d43')\"></span>\n                                <span class=\"c99c0dd\" @click=\"setColor('#99c0dd')\"></span>\n                                <span class=\"d83d84\" @click=\"setColor('#d83d84')\"></span>\n                            </div>\n                        </div>\n                    </div>\n                    </div>\n                    <span class=\"line\"> </span>\n                    <div class=\"date_check\">\n                        <date-picker :time.sync=\"startDate\"></date-picker>\n                        <label for=\"\">\n                            <input type=\"text\" :class=\"{'error' : !validate.time}\" class=\"itimepicker1\" :value=\"startTime\" v-model=\"startTime\" @change=\"checkEndDate()\">\n                        </label>\n                        <label for=\"\">\n                            <input type=\"text\" class=\"itimepicker2\" :value=\"endTime\" v-model=\"endTime\" disabled=\"\">\n                        </label>\n                        <p class=\"order_empl\" v-if=\"!validate.orderEmploye &amp;&amp; validate.orderOffice\">{{translatedText.order_employee}}</p>\n                        <p class=\"order_empl\" v-if=\"!validate.orderOffice\">{{translatedText.order_office}}</p>\n                    </div>\n                    <span class=\"line\"></span>\n                    <div class=\"checkboxes\">\n                        <label for=\"smsTrue\"><input id=\"smsTrue\" type=\"checkbox\" v-model=\"smsSend\">{{translatedText.sms_check}}</label>\n                        <label for=\"emailTrue\"><input id=\"emailTrue\" type=\"checkbox\" v-model=\"emailSend\">{{translatedText.email_check}}</label>\n                        <label for=\"notifyEmpl\"><input type=\"checkbox\" id=\"notifyEmpl\" v-model=\"isEmplMail\">{{translatedText.notif_employee}}</label>\n                        <label for=\"notifyClient\"><input type=\"checkbox\" id=\"notifyClient\" v-model=\"sendClientMail\">{{translatedText.notif_client}}</label>\n                        \n                    </div>\n                </div>\n                \n            </div>\n            <div class=\"footer\">\n                <div class=\"start_btn\">\n                    <button class=\"clear_all\" @click=\"clearFormFunc('clear')\">{{translatedText.clear_form}}</button>\n                    <label for=\"deleteOrder\" v-if=\"editForm\"><input type=\"checkbox\" id=\"deleteOrder\" v-model=\"deleteOrder\"> {{translatedText.delete_order}}</label>\n                </div>\n                <div class=\"right_btn\">\n                    <button class=\"cancel_btn\" @click.prevent=\"clearFormFunc\">{{translatedText.cancel_btn}}</button>\n                    <button class=\"add_btn\" :disabled=\"blockSendBtn\" @click=\"sendForm\">{{deleteOrder ? translatedText.delete_order : editForm ? translatedText.edit_btn : translatedText.add_btn}}</button>\n                </div>\n            </div>\n        </div>\n    </div>\n    <div class=\"kalendar-carousel kalendar__carousel\">\n\n    <div v-for=\"employee in employeeslist\" class=\"kalendar-carousel__block\" :class=\"{'is-active' : employee.id === employeeActive}\" data-employee-id=\"employee.id\">\n        <a href=\"javascript:void(0);\" @click=\"getEvents(employee)\">\n            <div class=\"kalendar-carousel__name\">{{employee.name}}</div>\n            <img class=\"kalendar-carousel__img\" :src=\"employee.path ? employee.path : '/images/default_avatar.png'\" alt=\"\">\n        </a>\n    </div>\n</div>\n    <!-- <a\n        @click.stop=\"openClearPopup\"\n        class=\"btn btn--green\" id=\"kalendarTermin\" href=\"javascript:void(0);\">{{translatedText.add_order}}</a> -->\n    <div id=\"calendar\">\n    </div>\n</div>\n"
if (module.hot) {(function () {  module.hot.accept()
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  if (!module.hot.data) {
    hotAPI.createRecord("_v-27c25504", module.exports)
  } else {
    hotAPI.update("_v-27c25504", module.exports, (typeof module.exports === "function" ? module.exports.options : module.exports).template)
  }
})()}
},{"../ajax.js":92,"../lib.js":104,"./vue-datepicker.vue":139,"babel-runtime/core-js/object/values":3,"babel-runtime/helpers/typeof":6,"moment":84,"vue":89,"vue-hot-reload-api":86}],139:[function(require,module,exports){
var __vueify_insert__ = require("vueify/lib/insert-css")
var __vueify_style__ = __vueify_insert__.insert("\n.datepicker-overlay[_v-300943ba] {\n  position: fixed;\n  width: 100%;\n  height: 100%;\n  z-index: 998;\n  top: 0;\n  left: 0;\n  overflow: hidden;\n  -webkit-animation: fadein 0.5s;\n  /* Safari, Chrome and Opera > 12.1 */\n  -moz-animation: fadein 0.5s;\n  /* Firefox < 16 */\n  -ms-animation: fadein 0.5s;\n  /* Internet Explorer */\n  -o-animation: fadein 0.5s;\n  /* Opera < 12.1 */\n  animation: fadein 0.5s;\n}\n\n@keyframes fadein {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n\n\n/* Firefox < 16 */\n\n@-moz-keyframes fadein {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n\n\n/* Safari, Chrome and Opera > 12.1 */\n\n@-webkit-keyframes fadein {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n\n\n/* Internet Explorer */\n\n@-ms-keyframes fadein {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n\n\n/* Opera < 12.1 */\n\n@-o-keyframes fadein {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n\n.cov-date-body[_v-300943ba] {\n  display: inline-block;\n  background: #3F51B5;\n  overflow: hidden;\n  position: relative;\n  font-size: 16px;\n  font-family: 'Roboto';\n  font-weight: 400;\n  position: fixed;\n  display: block;\n  width: 400px;\n  max-width: 100%;\n  z-index: 999;\n  top: 50%;\n  left: 50%;\n  -webkit-transform: translate(-50%, -50%);\n  -ms-transform: translate(-50%, -50%);\n  transform: translate(-50%, -50%);\n  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2);\n}\n\n.cov-picker-box[_v-300943ba] {\n  background: #fff;\n  width: 100%;\n  display: inline-block;\n  padding: 25px;\n  box-sizing: border-box !important;\n  -moz-box-sizing: border-box !important;\n  -webkit-box-sizing: border-box !important;\n  -ms-box-sizing: border-box !important;\n  width: 400px;\n  max-width: 100%;\n  height: 280px;\n  text-align: start!important;\n}\n\n.cov-picker-box td[_v-300943ba] {\n  height: 34px;\n  width: 34px;\n  padding: 0;\n  line-height: 34px;\n  color: #000;\n  background: #fff;\n  text-align: center;\n  cursor: pointer;\n}\n\n.cov-picker-box td[_v-300943ba]:hover {\n  background: #E6E6E6;\n}\n\ntable[_v-300943ba] {\n  border-collapse: collapse;\n  border-spacing: 0;\n  width: 100%;\n}\n\n.day[_v-300943ba] {\n  width: 14.2857143%;\n  display: inline-block;\n  text-align: center;\n  cursor: pointer;\n  height: 34px;\n  padding: 0;\n  line-height: 34px;\n  color: #000;\n  background: #fff;\n  vertical-align: middle;\n}\n\n.week ul[_v-300943ba] {\n  margin: 0 0 8px;\n  padding: 0;\n  list-style: none;\n}\n\n.week ul li[_v-300943ba] {\n  width: 14.2%;\n  display: inline-block;\n  text-align: center;\n  background: transparent;\n  color: #000;\n  font-weight: bold;\n}\n\n.passive-day[_v-300943ba] {\n  color: #bbb;\n}\n\n.checked[_v-300943ba] {\n  background: #F50057;\n  color: #FFF !important;\n  border-radius: 3px;\n}\n\n.unavailable[_v-300943ba] {\n  color: #ccc;\n  cursor: not-allowed;\n}\n\n.cov-date-monthly[_v-300943ba] {\n  height: 150px;\n}\n\n.cov-date-monthly > div[_v-300943ba] {\n  display: inline-block;\n  padding: 0;\n  margin: 0;\n  vertical-align: middle;\n  color: #fff;\n  height: 150px;\n  float: left;\n  text-align: center;\n  cursor: pointer;\n}\n\n.cov-date-previous[_v-300943ba],\n.cov-date-next[_v-300943ba] {\n  position: relative;\n  width: 20% !important;\n  text-indent: -300px;\n  overflow: hidden;\n  color: #fff;\n}\n\n.cov-date-caption[_v-300943ba] {\n  width: 60%;\n  padding: 50px 0!important;\n  box-sizing: border-box;\n  font-size: 24px;\n}\n\n.cov-date-caption span[_v-300943ba]:hover {\n  color: rgba(255, 255, 255, 0.7);\n}\n\n.cov-date-previous[_v-300943ba]:hover,\n.cov-date-next[_v-300943ba]:hover {\n  background: rgba(255, 255, 255, 0.1);\n}\n\n.day[_v-300943ba]:hover {\n  background: #EAEAEA;\n}\n\n.unavailable[_v-300943ba]:hover {\n  background: none;\n}\n\n.checked[_v-300943ba]:hover {\n  background: #FF4F8E;\n}\n\n.cov-date-next[_v-300943ba]::before,\n.cov-date-previous[_v-300943ba]::before {\n  width: 20px;\n  height: 2px;\n  text-align: center;\n  position: absolute;\n  background: #fff;\n  top: 50%;\n  margin-top: -7px;\n  margin-left: -7px;\n  left: 50%;\n  line-height: 0;\n  content: '';\n  -webkit-transform: rotate(45deg);\n  -moz-transform: rotate(45deg);\n  transform: rotate(45deg);\n}\n\n.cov-date-next[_v-300943ba]::after,\n.cov-date-previous[_v-300943ba]::after {\n  width: 20px;\n  height: 2px;\n  text-align: center;\n  position: absolute;\n  background: #fff;\n  margin-top: 6px;\n  margin-left: -7px;\n  top: 50%;\n  left: 50%;\n  line-height: 0;\n  content: '';\n  -webkit-transform: rotate(-45deg);\n  -moz-transform: rotate(-45deg);\n  transform: rotate(-45deg);\n}\n\n.cov-date-previous[_v-300943ba]::after {\n  -webkit-transform: rotate(45deg);\n  -moz-transform: rotate(45deg);\n  transform: rotate(45deg);\n}\n\n.cov-date-previous[_v-300943ba]::before {\n  -webkit-transform: rotate(-45deg);\n  -moz-transform: rotate(-45deg);\n  transform: rotate(-45deg);\n}\n\n.date-item[_v-300943ba] {\n  text-align: center;\n  font-size: 20px;\n  padding: 10px 0;\n  cursor: pointer;\n}\n\n.date-item[_v-300943ba]:hover {\n  background: #e0e0e0;\n}\n\n.date-list[_v-300943ba] {\n  overflow: auto;\n  vertical-align: top;\n  padding: 0;\n}\n\n.cov-vue-date[_v-300943ba] {\n  display: inline-block;\n  color: #5D5D5D;\n}\n\n.button-box[_v-300943ba] {\n  background: #fff;\n  vertical-align: top;\n  height: 50px;\n  line-height: 50px;\n  text-align: right;\n  padding-right: 20px;\n}\n\n.button-box span[_v-300943ba] {\n  cursor: pointer;\n  padding: 10px 20px;\n}\n\n.watch-box[_v-300943ba] {\n  height: 100%;\n  overflow: hidden;\n}\n\n.hour-box[_v-300943ba],\n.min-box[_v-300943ba] {\n  display: inline-block;\n  width: 50%;\n  text-align: center;\n  height: 100%;\n  overflow: auto;\n  float: left;\n}\n\n.hour-box ul[_v-300943ba],\n.min-box ul[_v-300943ba] {\n  list-style: none;\n  margin: 0;\n  padding: 0;\n}\n\n.hour-item[_v-300943ba],\n.min-item[_v-300943ba] {\n  padding: 10px;\n  font-size: 36px;\n  cursor: pointer;\n}\n\n.hour-item[_v-300943ba]:hover,\n.min-item[_v-300943ba]:hover {\n  background: #E3E3E3;\n}\n\n.hour-box .active[_v-300943ba],\n.min-box .active[_v-300943ba] {\n  background: #F50057;\n  color: #FFF !important;\n}\n\n[_v-300943ba]::-webkit-scrollbar {\n  width: 2px;\n}\n\n[_v-300943ba]::-webkit-scrollbar-track {\n  background: #E3E3E3;\n}\n\n[_v-300943ba]::-webkit-scrollbar-thumb {\n  background: #C1C1C1;\n  border-radius: 2px;\n}\n")


'use strict';

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault2(_stringify);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault2(_getIterator2);

function _interopRequireDefault2(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

exports.default = {

  props: {
    required: false,
    time: {
      type: String,
      required: true
    },
    option: {
      type: Object,
      default: function _default() {
        return {
          type: 'day',
          SundayFirst: false,
          week: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
          month: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
          format: 'YYYY-MM-DD',
          color: {
            checked: '#F50057',
            header: '#3f51b5',
            headerText: '#fff'
          },
          inputStyle: {
            'display': 'inline-block',
            'padding': '6px',
            'line-height': '22px',
            'font-size': '16px',
            'border': '2px solid #fff',
            'box-shadow': '0 1px 3px 0 rgba(0, 0, 0, 0.2)',
            'border-radius': '2px',
            'color': '#5F5F5F'
          },
          inputClass: 'cov-datepicker',
          placeholder: 'when?',
          buttons: {
            ok: 'OK',
            cancel: 'Cancel'
          },
          overlayOpacity: 0.5,
          dismissible: true
        };
      }
    },
    limit: {
      type: Array,
      default: function _default() {
        return [];
      }
    }
  },
  data: function data() {
    function hours() {
      var list = [];
      var hour = 24;
      while (hour > 0) {
        hour--;
        list.push({
          checked: false,
          value: hour < 10 ? '0' + hour : hour
        });
      }
      return list;
    }

    function mins() {
      var list = [];
      var min = 60;
      while (min > 0) {
        min--;
        list.push({
          checked: false,
          value: min < 10 ? '0' + min : min
        });
      }
      return list;
    }
    return {
      hours: hours(),
      mins: mins(),
      translatedText: null,
      showInfo: {
        hour: false,
        day: false,
        month: false,
        year: false,
        check: false
      },
      displayInfo: {
        month: ''
      },
      library: {
        week: this.option.week,
        month: this.option.month,
        year: []
      },
      checked: {
        oldtime: '',
        currentMoment: null,
        year: '',
        month: '',
        day: '',
        hour: '00',
        min: '00'
      },
      dayList: [],
      selectedDays: []
    };
  },
  ready: function ready() {
    var _this5 = this;

    var data = {
      lang: this.$root.locale
    };
    this.$http.post('/translate', data).then(function (response) {
      _this5.translatedText = response.data;

      _this5.library.week = [_this5.translatedText.dayMo, _this5.translatedText.dayTu, _this5.translatedText.dayWe, _this5.translatedText.dayTh, _this5.translatedText.dayFr, _this5.translatedText.daySa, _this5.translatedText.daySu];

      _this5.library.month = [_this5.translatedText.monthJa, _this5.translatedText.monthFe, _this5.translatedText.monthMa, _this5.translatedText.monthAp, _this5.translatedText.monthMay, _this5.translatedText.monthJu, _this5.translatedText.monthJul, _this5.translatedText.monthAu, _this5.translatedText.monthSep, _this5.translatedText.monthOct, _this5.translatedText.monthNow, _this5.translatedText.monthDec];

      _this5.option.placeholder = _this5.translatedText.whenTr;
      _this5.option.buttons = {
        ok: _this5.translatedText.ok_btn,
        cancel: _this5.translatedText.cnl_btn
      }, console.log(_this5.library.week);
    }, function (response) {});
  },

  methods: {
    pad: function pad(n) {
      n = Math.floor(n);
      return n < 10 ? '0' + n : n;
    },
    nextMonth: function nextMonth(type) {
      var next = null;
      type === 'next' ? next = (0, _moment2.default)(this.checked.currentMoment).add(1, 'M') : next = (0, _moment2.default)(this.checked.currentMoment).add(-1, 'M');
      this.showDay(next);
    },
    showDay: function showDay(time) {
      if (time === undefined || !Date.parse(time)) {
        this.checked.currentMoment = (0, _moment2.default)();
      } else {
        this.checked.currentMoment = (0, _moment2.default)(time, this.option.format);
      }
      this.showOne('day');
      this.checked.year = (0, _moment2.default)(this.checked.currentMoment).format('YYYY');
      this.checked.month = (0, _moment2.default)(this.checked.currentMoment).format('MM');
      this.checked.day = (0, _moment2.default)(this.checked.currentMoment).format('DD');
      this.displayInfo.month = this.library.month[(0, _moment2.default)(this.checked.currentMoment).month()];
      var days = [];
      var currentMoment = this.checked.currentMoment;
      var firstDay = (0, _moment2.default)(currentMoment).date(1).day();
      // gettting previous and next month
      // let currentMonth = moment(currentMoment)
      var previousMonth = (0, _moment2.default)(currentMoment);
      var nextMonth = (0, _moment2.default)(currentMoment);
      nextMonth.add(1, 'months');
      previousMonth.subtract(1, 'months');
      var monthDays = (0, _moment2.default)(currentMoment).daysInMonth();
      var oldtime = this.checked.oldtime;
      for (var i = 1; i <= monthDays; ++i) {
        days.push({
          value: i,
          inMonth: true,
          unavailable: false,
          checked: false,
          moment: (0, _moment2.default)(currentMoment).date(i)
        });
        if (i === Math.ceil((0, _moment2.default)(currentMoment).format('D')) && (0, _moment2.default)(oldtime, this.option.format).year() === (0, _moment2.default)(currentMoment).year() && (0, _moment2.default)(oldtime, this.option.format).month() === (0, _moment2.default)(currentMoment).month()) {
          days[i - 1].checked = true;
        }
        this.checkBySelectDays(i, days);
      }
      if (firstDay === 0) firstDay = 7;
      for (var _i = 0; _i < firstDay - (this.option.SundayFirst ? 0 : 1); _i++) {
        var passiveDay = {
          value: previousMonth.daysInMonth() - _i,
          inMonth: false,
          action: 'previous',
          unavailable: false,
          checked: false,
          moment: (0, _moment2.default)(currentMoment).date(1).subtract(_i + 1, 'days')
        };
        days.unshift(passiveDay);
      }
      if (this.limit.length > 0) {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = (0, _getIterator3.default)(this.limit), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var li = _step.value;

            switch (li.type) {
              case 'fromto':
                days = this.limitFromTo(li, days);
                break;
              case 'weekday':
                days = this.limitWeekDay(li, days);
                break;
            }
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
      }
      var passiveDaysAtFinal = 42 - days.length;
      for (var _i2 = 1; _i2 <= passiveDaysAtFinal; _i2++) {
        var _passiveDay = {
          value: _i2,
          inMonth: false,
          action: 'next',
          unavailable: false,
          checked: false,
          moment: (0, _moment2.default)(currentMoment).add(1, 'months').date(_i2)
        };
        days.push(_passiveDay);
      }
      this.dayList = days;
    },
    checkBySelectDays: function checkBySelectDays(d, days) {
      var _this = this;

      this.selectedDays.forEach(function (day) {
        if (_this.checked.year === (0, _moment2.default)(day).format('YYYY') && _this.checked.month === (0, _moment2.default)(day).format('MM') && d === Math.ceil((0, _moment2.default)(day).format('D'))) {
          days[d - 1].checked = true;
        }
      });
    },
    limitWeekDay: function limitWeekDay(limit, days) {
      days.map(function (day) {
        if (limit.available.indexOf(Math.floor(day.moment.format('d'))) === -1) {
          day.unavailable = true;
        }
      });
      return days;
    },
    limitFromTo: function limitFromTo(limit, days) {
      var _this2 = this;

      if (limit.from || limit.to) {
        days.map(function (day) {
          if (_this2.getLimitCondition(limit, day)) {
            day.unavailable = true;
          }
        });
      }
      return days;
    },
    getLimitCondition: function getLimitCondition(limit, day) {
      var tmpMoment = (0, _moment2.default)(this.checked.year + '-' + this.pad(this.checked.month) + '-' + this.pad(day.value));
      if (limit.from && !limit.to) {
        return !tmpMoment.isAfter(limit.from);
      } else if (!limit.from && limit.to) {
        return !tmpMoment.isBefore(limit.to);
      } else {
        return !tmpMoment.isBetween(limit.from, limit.to);
      }
    },
    checkDay: function checkDay(obj) {
      if (obj.unavailable || obj.value === '') {
        return false;
      }
      if (!obj.inMonth) {
        this.nextMonth(obj.action);
      }
      if (this.option.type === 'day' || this.option.type === 'min') {
        this.dayList.forEach(function (x) {
          x.checked = false;
        });
        this.checked.day = this.pad(obj.value);
        obj.checked = true;
      } else {
        var day = this.pad(obj.value);
        var ctime = this.checked.year + '-' + this.checked.month + '-' + day;
        if (obj.checked === true) {
          obj.checked = false;
          this.selectedDays.$remove(ctime);
        } else {
          this.selectedDays.push(ctime);
          obj.checked = true;
        }
      }
      switch (this.option.type) {
        case 'day':
          this.picked();
          break;
        case 'min':
          this.showOne('hour');
          // shift activated time items to visible position.
          this.shiftActTime();
          break;
      }
    },
    showYear: function showYear() {
      var _this3 = this;

      var year = (0, _moment2.default)(this.checked.currentMoment).year();
      this.library.year = [];
      var yearTmp = [];
      for (var i = year - 100; i < year + 5; ++i) {
        yearTmp.push(i);
      }
      this.library.year = yearTmp;
      this.showOne('year');
      this.$nextTick(function () {
        var listDom = document.getElementById('yearList');
        listDom.scrollTop = listDom.scrollHeight - 100;
        _this3.addYear();
      });
    },
    showOne: function showOne(type) {
      switch (type) {
        case 'year':
          this.showInfo.hour = false;
          this.showInfo.day = false;
          this.showInfo.year = true;
          this.showInfo.month = false;
          break;
        case 'month':
          this.showInfo.hour = false;
          this.showInfo.day = false;
          this.showInfo.year = false;
          this.showInfo.month = true;
          break;
        case 'day':
          this.showInfo.hour = false;
          this.showInfo.day = true;
          this.showInfo.year = false;
          this.showInfo.month = false;
          break;
        case 'hour':
          this.showInfo.hour = true;
          this.showInfo.day = false;
          this.showInfo.year = false;
          this.showInfo.month = false;
          break;
        default:
          this.showInfo.day = true;
          this.showInfo.year = false;
          this.showInfo.month = false;
          this.showInfo.hour = false;
      }
    },
    showMonth: function showMonth() {
      this.showOne('month');
    },
    addYear: function addYear() {
      var _this4 = this;

      var listDom = document.getElementById('yearList');
      listDom.addEventListener('scroll', function (e) {
        if (listDom.scrollTop < listDom.scrollHeight - 100) {
          var len = _this4.library.year.length;
          var lastYear = _this4.library.year[len - 1];
          _this4.library.year.push(lastYear + 1);
        }
      }, false);
    },
    setYear: function setYear(year) {
      this.checked.currentMoment = (0, _moment2.default)(year + '-' + this.checked.month + '-' + this.checked.day);
      this.showDay(this.checked.currentMoment);
    },
    setMonth: function setMonth(month) {
      var mo = this.library.month.indexOf(month) + 1;
      if (mo < 10) {
        mo = '0' + '' + mo;
      }
      this.checked.currentMoment = (0, _moment2.default)(this.checked.year + '-' + mo + '-' + this.checked.day);
      this.showDay(this.checked.currentMoment);
    },
    showCheck: function showCheck() {
      if (this.time === '') {
        this.showDay();
      } else {
        if (this.option.type === 'day' || this.option.type === 'min') {
          this.checked.oldtime = this.time;
          this.showDay(this.time);
        } else {
          this.selectedDays = JSON.parse(this.time);
          if (this.selectedDays.length) {
            this.checked.oldtime = this.selectedDays[0];
            this.showDay(this.selectedDays[0]);
          } else {
            this.showDay();
          }
        }
      }
      this.showInfo.check = true;
    },
    setTime: function setTime(type, obj, list) {
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = (0, _getIterator3.default)(list), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var item = _step2.value;

          item.checked = false;
          if (item.value === obj.value) {
            item.checked = true;
            this.checked[type] = item.value;
          }
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }
    },
    picked: function picked() {
      if (this.option.type === 'day' || this.option.type === 'min') {
        var ctime = this.checked.year + '-' + this.checked.month + '-' + this.checked.day + ' ' + this.checked.hour + ':' + this.checked.min;
        this.checked.currentMoment = (0, _moment2.default)(ctime, 'YYYY-MM-DD HH:mm');
        this.time = (0, _moment2.default)(this.checked.currentMoment).format(this.option.format);
      } else {
        this.time = (0, _stringify2.default)(this.selectedDays);
      }
      this.showInfo.check = false;
      this.$emit('change', this.time);
    },
    dismiss: function dismiss(evt) {
      if (evt.target.className === 'datepicker-overlay') {
        if (this.option.dismissible === undefined || this.option.dismissible) {
          this.showInfo.check = false;
          this.$emit('cancel');
        }
      }
    },
    shiftActTime: function shiftActTime() {
      // shift activated time items to visible position.
      this.$nextTick(function () {
        if (!document.querySelector('.hour-item.active')) {
          return false;
        }
        document.querySelector('.hour-box').scrollTop = (document.querySelector('.hour-item.active').offsetTop || 0) - 250;
        document.querySelector('.min-box').scrollTop = (document.querySelector('.min-item.active').offsetTop || 0) - 250;
      });
    }
  }
};
if (module.exports.__esModule) module.exports = module.exports.default
;(typeof module.exports === "function"? module.exports.options: module.exports).template = "\n<div class=\"cov-vue-date\" _v-300943ba=\"\">\n  <div class=\"datepickbox\" _v-300943ba=\"\">\n    <input type=\"text\" title=\"input date\" :class=\"option.inputClass\" readonly=\"readonly\" :placeholder=\"option.placeholder\" v-model=\"time\" :required=\"required\" @click=\"showCheck\" @foucus=\"showCheck\" :style=\"option.inputStyle\" _v-300943ba=\"\">\n  </div>\n  <div class=\"datepicker-overlay\" v-if=\"showInfo.check\" @click=\"dismiss($event)\" v-bind:style=\"{'background' : option.overlayOpacity? 'rgba(0,0,0,'+option.overlayOpacity+')' : 'rgba(0,0,0,0.5)'}\" _v-300943ba=\"\">\n    <div class=\"cov-date-body\" :style=\"{'background-color': option.color ? option.color.header : '#3f51b5'}\" _v-300943ba=\"\">\n      <div class=\"cov-date-monthly\" _v-300943ba=\"\">\n        <div class=\"cov-date-previous\" @click=\"nextMonth('pre')\" _v-300943ba=\"\">«</div>\n        <div class=\"cov-date-caption\" :style=\"{'color': option.color ? option.color.headerText : '#fff'}\" _v-300943ba=\"\">\n          <span @click=\"showYear\" _v-300943ba=\"\"><small _v-300943ba=\"\">{{checked.year}}</small></span>\n          <br _v-300943ba=\"\">\n          <span @click=\"showMonth\" _v-300943ba=\"\">{{displayInfo.month}}</span>\n        </div>\n        <div class=\"cov-date-next\" @click=\"nextMonth('next')\" _v-300943ba=\"\">»</div>\n      </div>\n      <div class=\"cov-date-box\" v-if=\"showInfo.day\" _v-300943ba=\"\">\n        <div class=\"cov-picker-box\" _v-300943ba=\"\">\n          <div class=\"week\" _v-300943ba=\"\">\n            <ul _v-300943ba=\"\">\n              <li v-for=\"weekie in library.week\" _v-300943ba=\"\">{{weekie}}</li>\n            </ul>\n          </div>\n          <div class=\"day\" v-for=\"day in dayList\" track-by=\"$index\" @click=\"checkDay(day)\" :class=\"{'checked':day.checked,'unavailable':day.unavailable,'passive-day': !(day.inMonth)}\" :style=\"day.checked ? (option.color &amp;&amp; option.color.checkedDay ? { background: option.color.checkedDay } : { background: '#F50057' }) : {}\" _v-300943ba=\"\">{{day.value}}</div>\n        </div>\n      </div>\n      <div class=\"cov-date-box list-box\" v-if=\"showInfo.year\" _v-300943ba=\"\">\n        <div class=\"cov-picker-box date-list\" id=\"yearList\" _v-300943ba=\"\">\n          <div class=\"date-item\" v-for=\"yearItem in library.year\" track-by=\"$index\" @click=\"setYear(yearItem)\" _v-300943ba=\"\">{{yearItem}}</div>\n        </div>\n      </div>\n      <div class=\"cov-date-box list-box\" v-if=\"showInfo.month\" _v-300943ba=\"\">\n        <div class=\"cov-picker-box date-list\" _v-300943ba=\"\">\n          <div class=\"date-item\" v-for=\"monthItem in library.month\" track-by=\"$index\" @click=\"setMonth(monthItem)\" _v-300943ba=\"\">{{monthItem}}</div>\n        </div>\n      </div>\n      <div class=\"cov-date-box list-box\" v-if=\"showInfo.hour\" _v-300943ba=\"\">\n        <div class=\"cov-picker-box date-list\" _v-300943ba=\"\">\n          <div class=\"watch-box\" _v-300943ba=\"\">\n            <div class=\"hour-box\" _v-300943ba=\"\">\n              <div class=\"mui-pciker-rule mui-pciker-rule-ft\" _v-300943ba=\"\"></div>\n              <ul _v-300943ba=\"\">\n                <li class=\"hour-item\" v-for=\"hitem in hours\" @click=\"setTime('hour', hitem, hours)\" :class=\"{'active':hitem.checked}\" _v-300943ba=\"\">{{hitem.value}}</li>\n              </ul>\n            </div>\n            <div class=\"min-box\" _v-300943ba=\"\">\n              <div class=\"mui-pciker-rule mui-pciker-rule-ft\" _v-300943ba=\"\"></div>\n              <div class=\"min-item\" v-for=\"mitem in mins\" @click=\"setTime('min',mitem, mins)\" :class=\"{'active':mitem.checked}\" _v-300943ba=\"\">{{mitem.value}}</div>\n            </div>\n          </div>\n        </div>\n      </div>\n      <div class=\"button-box\" _v-300943ba=\"\">\n        <span @click=\"showInfo.check=false\" _v-300943ba=\"\">{{option.buttons? option.buttons.cancel : 'Cancel' }}</span>\n        <span @click=\"picked\" _v-300943ba=\"\">{{option.buttons? option.buttons.ok : 'Ok'}}</span>\n      </div>\n    </div>\n  </div>\n</div>\n"
if (module.hot) {(function () {  module.hot.accept()
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.dispose(function () {
    __vueify_insert__.cache["\n.datepicker-overlay[_v-300943ba] {\n  position: fixed;\n  width: 100%;\n  height: 100%;\n  z-index: 998;\n  top: 0;\n  left: 0;\n  overflow: hidden;\n  -webkit-animation: fadein 0.5s;\n  /* Safari, Chrome and Opera > 12.1 */\n  -moz-animation: fadein 0.5s;\n  /* Firefox < 16 */\n  -ms-animation: fadein 0.5s;\n  /* Internet Explorer */\n  -o-animation: fadein 0.5s;\n  /* Opera < 12.1 */\n  animation: fadein 0.5s;\n}\n\n@keyframes fadein {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n\n\n/* Firefox < 16 */\n\n@-moz-keyframes fadein {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n\n\n/* Safari, Chrome and Opera > 12.1 */\n\n@-webkit-keyframes fadein {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n\n\n/* Internet Explorer */\n\n@-ms-keyframes fadein {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n\n\n/* Opera < 12.1 */\n\n@-o-keyframes fadein {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n\n.cov-date-body[_v-300943ba] {\n  display: inline-block;\n  background: #3F51B5;\n  overflow: hidden;\n  position: relative;\n  font-size: 16px;\n  font-family: 'Roboto';\n  font-weight: 400;\n  position: fixed;\n  display: block;\n  width: 400px;\n  max-width: 100%;\n  z-index: 999;\n  top: 50%;\n  left: 50%;\n  -webkit-transform: translate(-50%, -50%);\n  -ms-transform: translate(-50%, -50%);\n  transform: translate(-50%, -50%);\n  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2);\n}\n\n.cov-picker-box[_v-300943ba] {\n  background: #fff;\n  width: 100%;\n  display: inline-block;\n  padding: 25px;\n  box-sizing: border-box !important;\n  -moz-box-sizing: border-box !important;\n  -webkit-box-sizing: border-box !important;\n  -ms-box-sizing: border-box !important;\n  width: 400px;\n  max-width: 100%;\n  height: 280px;\n  text-align: start!important;\n}\n\n.cov-picker-box td[_v-300943ba] {\n  height: 34px;\n  width: 34px;\n  padding: 0;\n  line-height: 34px;\n  color: #000;\n  background: #fff;\n  text-align: center;\n  cursor: pointer;\n}\n\n.cov-picker-box td[_v-300943ba]:hover {\n  background: #E6E6E6;\n}\n\ntable[_v-300943ba] {\n  border-collapse: collapse;\n  border-spacing: 0;\n  width: 100%;\n}\n\n.day[_v-300943ba] {\n  width: 14.2857143%;\n  display: inline-block;\n  text-align: center;\n  cursor: pointer;\n  height: 34px;\n  padding: 0;\n  line-height: 34px;\n  color: #000;\n  background: #fff;\n  vertical-align: middle;\n}\n\n.week ul[_v-300943ba] {\n  margin: 0 0 8px;\n  padding: 0;\n  list-style: none;\n}\n\n.week ul li[_v-300943ba] {\n  width: 14.2%;\n  display: inline-block;\n  text-align: center;\n  background: transparent;\n  color: #000;\n  font-weight: bold;\n}\n\n.passive-day[_v-300943ba] {\n  color: #bbb;\n}\n\n.checked[_v-300943ba] {\n  background: #F50057;\n  color: #FFF !important;\n  border-radius: 3px;\n}\n\n.unavailable[_v-300943ba] {\n  color: #ccc;\n  cursor: not-allowed;\n}\n\n.cov-date-monthly[_v-300943ba] {\n  height: 150px;\n}\n\n.cov-date-monthly > div[_v-300943ba] {\n  display: inline-block;\n  padding: 0;\n  margin: 0;\n  vertical-align: middle;\n  color: #fff;\n  height: 150px;\n  float: left;\n  text-align: center;\n  cursor: pointer;\n}\n\n.cov-date-previous[_v-300943ba],\n.cov-date-next[_v-300943ba] {\n  position: relative;\n  width: 20% !important;\n  text-indent: -300px;\n  overflow: hidden;\n  color: #fff;\n}\n\n.cov-date-caption[_v-300943ba] {\n  width: 60%;\n  padding: 50px 0!important;\n  box-sizing: border-box;\n  font-size: 24px;\n}\n\n.cov-date-caption span[_v-300943ba]:hover {\n  color: rgba(255, 255, 255, 0.7);\n}\n\n.cov-date-previous[_v-300943ba]:hover,\n.cov-date-next[_v-300943ba]:hover {\n  background: rgba(255, 255, 255, 0.1);\n}\n\n.day[_v-300943ba]:hover {\n  background: #EAEAEA;\n}\n\n.unavailable[_v-300943ba]:hover {\n  background: none;\n}\n\n.checked[_v-300943ba]:hover {\n  background: #FF4F8E;\n}\n\n.cov-date-next[_v-300943ba]::before,\n.cov-date-previous[_v-300943ba]::before {\n  width: 20px;\n  height: 2px;\n  text-align: center;\n  position: absolute;\n  background: #fff;\n  top: 50%;\n  margin-top: -7px;\n  margin-left: -7px;\n  left: 50%;\n  line-height: 0;\n  content: '';\n  -webkit-transform: rotate(45deg);\n  -moz-transform: rotate(45deg);\n  transform: rotate(45deg);\n}\n\n.cov-date-next[_v-300943ba]::after,\n.cov-date-previous[_v-300943ba]::after {\n  width: 20px;\n  height: 2px;\n  text-align: center;\n  position: absolute;\n  background: #fff;\n  margin-top: 6px;\n  margin-left: -7px;\n  top: 50%;\n  left: 50%;\n  line-height: 0;\n  content: '';\n  -webkit-transform: rotate(-45deg);\n  -moz-transform: rotate(-45deg);\n  transform: rotate(-45deg);\n}\n\n.cov-date-previous[_v-300943ba]::after {\n  -webkit-transform: rotate(45deg);\n  -moz-transform: rotate(45deg);\n  transform: rotate(45deg);\n}\n\n.cov-date-previous[_v-300943ba]::before {\n  -webkit-transform: rotate(-45deg);\n  -moz-transform: rotate(-45deg);\n  transform: rotate(-45deg);\n}\n\n.date-item[_v-300943ba] {\n  text-align: center;\n  font-size: 20px;\n  padding: 10px 0;\n  cursor: pointer;\n}\n\n.date-item[_v-300943ba]:hover {\n  background: #e0e0e0;\n}\n\n.date-list[_v-300943ba] {\n  overflow: auto;\n  vertical-align: top;\n  padding: 0;\n}\n\n.cov-vue-date[_v-300943ba] {\n  display: inline-block;\n  color: #5D5D5D;\n}\n\n.button-box[_v-300943ba] {\n  background: #fff;\n  vertical-align: top;\n  height: 50px;\n  line-height: 50px;\n  text-align: right;\n  padding-right: 20px;\n}\n\n.button-box span[_v-300943ba] {\n  cursor: pointer;\n  padding: 10px 20px;\n}\n\n.watch-box[_v-300943ba] {\n  height: 100%;\n  overflow: hidden;\n}\n\n.hour-box[_v-300943ba],\n.min-box[_v-300943ba] {\n  display: inline-block;\n  width: 50%;\n  text-align: center;\n  height: 100%;\n  overflow: auto;\n  float: left;\n}\n\n.hour-box ul[_v-300943ba],\n.min-box ul[_v-300943ba] {\n  list-style: none;\n  margin: 0;\n  padding: 0;\n}\n\n.hour-item[_v-300943ba],\n.min-item[_v-300943ba] {\n  padding: 10px;\n  font-size: 36px;\n  cursor: pointer;\n}\n\n.hour-item[_v-300943ba]:hover,\n.min-item[_v-300943ba]:hover {\n  background: #E3E3E3;\n}\n\n.hour-box .active[_v-300943ba],\n.min-box .active[_v-300943ba] {\n  background: #F50057;\n  color: #FFF !important;\n}\n\n[_v-300943ba]::-webkit-scrollbar {\n  width: 2px;\n}\n\n[_v-300943ba]::-webkit-scrollbar-track {\n  background: #E3E3E3;\n}\n\n[_v-300943ba]::-webkit-scrollbar-thumb {\n  background: #C1C1C1;\n  border-radius: 2px;\n}\n"] = false
    document.head.removeChild(__vueify_style__)
  })
  if (!module.hot.data) {
    hotAPI.createRecord("_v-300943ba", module.exports)
  } else {
    hotAPI.update("_v-300943ba", module.exports, (typeof module.exports === "function" ? module.exports.options : module.exports).template)
  }
})()}
},{"babel-runtime/core-js/get-iterator":1,"babel-runtime/core-js/json/stringify":2,"moment":84,"vue":89,"vue-hot-reload-api":86,"vueify/lib/insert-css":90}],140:[function(require,module,exports){
var __vueify_insert__ = require("vueify/lib/insert-css")
var __vueify_style__ = __vueify_insert__.insert("/* line 2, stdin */\n.fade-transition[_v-d496a16a] {\n  transition: opacity .3s ease; }\n\n/* line 5, stdin */\n.fade-enter[_v-d496a16a],\n.fade-leave[_v-d496a16a] {\n  height: 0;\n  opacity: 0; }\n\n/* line 10, stdin */\n.alert[_v-d496a16a] {\n  padding: 15px;\n  margin-bottom: 20px;\n  border: 1px solid transparent;\n  border-radius: 4px; }\n\n/* line 16, stdin */\n.alert.top[_v-d496a16a] {\n  position: fixed;\n  top: 30px;\n  margin: 0 auto;\n  left: 0;\n  right: 0;\n  z-index: 2; }\n\n/* line 24, stdin */\n.alert.top-right[_v-d496a16a] {\n  position: fixed;\n  top: 30px;\n  right: 50px;\n  z-index: 2; }\n\n/* line 30, stdin */\n.alert-success[_v-d496a16a] {\n  color: #3c763d;\n  background-color: #dff0d8;\n  border-color: #d6e9c6; }\n  /* line 35, stdin */\n  .alert-success .close svg[_v-d496a16a] {\n    fill: #3c763d; }\n\n/* line 40, stdin */\n.alert-danger[_v-d496a16a] {\n  color: #a94442;\n  background-color: #f2dede;\n  border-color: #ebccd1; }\n  /* line 45, stdin */\n  .alert-danger .close svg[_v-d496a16a] {\n    fill: #a94442; }\n\n/* line 49, stdin */\n.close[_v-d496a16a] {\n  border: 0;\n  background-color: transparent;\n  position: absolute;\n  top: 10px;\n  right: 10px; }\n  /* line 56, stdin */\n  .close svg[_v-d496a16a] {\n    width: 16px;\n    height: 16px; }\n")
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _coerceBoolean = require('./utils/coerceBoolean.js');

var _coerceBoolean2 = _interopRequireDefault(_coerceBoolean);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  props: {
    type: {
      type: String
    },
    dismissable: {
      type: Boolean,
      coerce: _coerceBoolean2.default,
      default: false
    },
    show: {
      type: Boolean,
      coerce: _coerceBoolean2.default,
      default: true,
      twoWay: true
    },
    duration: {
      type: Number,
      default: 0
    },
    width: {
      type: String
    },
    placement: {
      type: String
    }
  },
  watch: {
    show: function show(val) {
      var _this = this;

      if (this._timeout) clearTimeout(this._timeout);
      if (val && Boolean(this.duration)) {
        this._timeout = setTimeout(function () {
          return _this.show = false;
        }, this.duration);
      }
    }
  }
};
if (module.exports.__esModule) module.exports = module.exports.default
;(typeof module.exports === "function"? module.exports.options: module.exports).template = "\n<div v-show=\"show\" v-bind:class=\"{\n    'alert':\t\ttrue,\n    'alert-success':(type == 'success'),\n    'alert-warning':(type == 'warning'),\n    'alert-info':\t(type == 'info'),\n    'alert-danger':\t(type == 'danger'),\n    'top': \t\t\t(placement === 'top'),\n    'top-right': \t(placement === 'top-right')\n  }\" transition=\"fade\" v-bind:style=\"{width:width}\" role=\"alert\" _v-d496a16a=\"\">\n  <button v-show=\"dismissable\" type=\"button\" class=\"close\" @click=\"show = false\" _v-d496a16a=\"\">\n    <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 44 44\" enable-background=\"new 0 0 44 44\" _v-d496a16a=\"\"><path d=\"M22 0c-12.2 0-22 9.8-22 22s9.8 22 22 22 22-9.8 22-22-9.8-22-22-22zm3.2 22.4l7.5 7.5c.2.2.3.5.3.7s-.1.5-.3.7l-1.4 1.4c-.2.2-.5.3-.7.3-.3 0-.5-.1-.7-.3l-7.5-7.5c-.2-.2-.5-.2-.7 0l-7.5 7.5c-.2.2-.5.3-.7.3-.3 0-.5-.1-.7-.3l-1.4-1.4c-.2-.2-.3-.5-.3-.7s.1-.5.3-.7l7.5-7.5c.2-.2.2-.5 0-.7l-7.5-7.5c-.2-.2-.3-.5-.3-.7s.1-.5.3-.7l1.4-1.4c.2-.2.5-.3.7-.3s.5.1.7.3l7.5 7.5c.2.2.5.2.7 0l7.5-7.5c.2-.2.5-.3.7-.3.3 0 .5.1.7.3l1.4 1.4c.2.2.3.5.3.7s-.1.5-.3.7l-7.5 7.5c-.2.1-.2.5 0 .7z\" _v-d496a16a=\"\"></path></svg>\n  </button>\n  <slot _v-d496a16a=\"\"></slot>\n</div>\n"
if (module.hot) {(function () {  module.hot.accept()
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.dispose(function () {
    __vueify_insert__.cache["/* line 2, stdin */\n.fade-transition[_v-d496a16a] {\n  transition: opacity .3s ease; }\n\n/* line 5, stdin */\n.fade-enter[_v-d496a16a],\n.fade-leave[_v-d496a16a] {\n  height: 0;\n  opacity: 0; }\n\n/* line 10, stdin */\n.alert[_v-d496a16a] {\n  padding: 15px;\n  margin-bottom: 20px;\n  border: 1px solid transparent;\n  border-radius: 4px; }\n\n/* line 16, stdin */\n.alert.top[_v-d496a16a] {\n  position: fixed;\n  top: 30px;\n  margin: 0 auto;\n  left: 0;\n  right: 0;\n  z-index: 2; }\n\n/* line 24, stdin */\n.alert.top-right[_v-d496a16a] {\n  position: fixed;\n  top: 30px;\n  right: 50px;\n  z-index: 2; }\n\n/* line 30, stdin */\n.alert-success[_v-d496a16a] {\n  color: #3c763d;\n  background-color: #dff0d8;\n  border-color: #d6e9c6; }\n  /* line 35, stdin */\n  .alert-success .close svg[_v-d496a16a] {\n    fill: #3c763d; }\n\n/* line 40, stdin */\n.alert-danger[_v-d496a16a] {\n  color: #a94442;\n  background-color: #f2dede;\n  border-color: #ebccd1; }\n  /* line 45, stdin */\n  .alert-danger .close svg[_v-d496a16a] {\n    fill: #a94442; }\n\n/* line 49, stdin */\n.close[_v-d496a16a] {\n  border: 0;\n  background-color: transparent;\n  position: absolute;\n  top: 10px;\n  right: 10px; }\n  /* line 56, stdin */\n  .close svg[_v-d496a16a] {\n    width: 16px;\n    height: 16px; }\n"] = false
    document.head.removeChild(__vueify_style__)
  })
  if (!module.hot.data) {
    hotAPI.createRecord("_v-d496a16a", module.exports)
  } else {
    hotAPI.update("_v-d496a16a", module.exports, (typeof module.exports === "function" ? module.exports.options : module.exports).template)
  }
})()}
},{"./utils/coerceBoolean.js":141,"vue":89,"vue-hot-reload-api":86,"vueify/lib/insert-css":90}],141:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

// Attempt to convert a string value to a Boolean. Otherwise, return the value
// without modification so Vue can throw a warning.
exports.default = function (val) {
  return typeof val !== "string" ? val : val === "true" ? true : val === "false" ? false : val === "null" ? false : val === "undefined" ? false : val;
};

},{}]},{},[91]);

//# sourceMappingURL=admin.js.map
