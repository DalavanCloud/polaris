/**
 * @license
 * Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

(function(scope) {

  'use strict';

  // defaultPrevented is broken in IE.
  // https://connect.microsoft.com/IE/feedback/details/790389/event-defaultprevented-returns-false-after-preventdefault-was-called
  var workingDefaultPrevented = (function() {
    var e = document.createEvent('Event');
    e.initEvent('foo', true, true);
    e.preventDefault();
    return e.defaultPrevented;
  })();

  if (!workingDefaultPrevented) {
    var origPreventDefault = Event.prototype.preventDefault;
    Event.prototype.preventDefault = function() {
      if (!this.cancelable) {
        return;
      }

      origPreventDefault.call(this);

      Object.defineProperty(this, 'defaultPrevented', {
        get: function() {
          return true;
        },
        configurable: true
      });
    };
  }

  var isIE = /Trident/.test(navigator.userAgent);

  // CustomEvent constructor shim
  if (!window.CustomEvent || isIE && (typeof window.CustomEvent !== 'function')) {
    window.CustomEvent = function(inType, params) {
      params = params || {};
      var e = document.createEvent('CustomEvent');
      e.initCustomEvent(inType, Boolean(params.bubbles), Boolean(params.cancelable), params.detail);
      return e;
    };
    window.CustomEvent.prototype = window.Event.prototype;
  }

  // Event constructor shim
  if (!window.Event || isIE && (typeof window.Event !== 'function')) {
    var origEvent = window.Event;
    window.Event = function(inType, params) {
      params = params || {};
      var e = document.createEvent('Event');
      e.initEvent(inType, Boolean(params.bubbles), Boolean(params.cancelable));
      return e;
    };
    if (origEvent) {
      for (var i in origEvent) {
        window.Event[i] = origEvent[i];
      }
    }
    window.Event.prototype = origEvent.prototype;
  }

  if (!window.MouseEvent || isIE && (typeof window.MouseEvent !== 'function')) {
    var origMouseEvent = window.MouseEvent;
    window.MouseEvent = function(inType, params) {
      params = params || {};
      var e = document.createEvent('MouseEvent');
      e.initMouseEvent(inType,
        Boolean(params.bubbles), Boolean(params.cancelable),
        params.view || window, params.detail,
        params.screenX, params.screenY, params.clientX, params.clientY,
        params.ctrlKey, params.altKey, params.shiftKey, params.metaKey,
        params.button, params.relatedTarget);
      return e;
    };
    if (origMouseEvent) {
      for (var i in origMouseEvent) {
        window.MouseEvent[i] = origMouseEvent[i];
      }
    }
    window.MouseEvent.prototype = origMouseEvent.prototype;
  }

  // ES6 stuff
  if (!Array.from) {
    Array.from = function (object) {
      return [].slice.call(object);
    };
  }

  if (!Object.assign) {
    var assign = function(target, source) {
      var n$ = Object.getOwnPropertyNames(source);
      for (var i=0, p; i < n$.length; i++) {
        p = n$[i];
        target[p] = source[p];
      }
    }

    Object.assign = function(target, sources) {
      var args = [].slice.call(arguments, 1);
      for (var i=0, s; i < args.length; i++) {
        s = args[i];
        if (s) {
          assign(target, s);
        }
      }
      return target;
    }
  }

})(window.WebComponents);

(function(){
'use strict';var g=new function(){};var aa=new Set("annotation-xml color-profile font-face font-face-src font-face-uri font-face-format font-face-name missing-glyph".split(" "));function k(b){var a=aa.has(b);b=/^[a-z][.0-9_a-z]*-[\-.0-9_a-z]*$/.test(b);return!a&&b}function l(b){var a=b.isConnected;if(void 0!==a)return a;for(;b&&!(b.__CE_isImportDocument||b instanceof Document);)b=b.parentNode||(window.ShadowRoot&&b instanceof ShadowRoot?b.host:void 0);return!(!b||!(b.__CE_isImportDocument||b instanceof Document))}
function m(b,a){for(;a&&a!==b&&!a.nextSibling;)a=a.parentNode;return a&&a!==b?a.nextSibling:null}
function n(b,a,e){e=e?e:new Set;for(var c=b;c;){if(c.nodeType===Node.ELEMENT_NODE){var d=c;a(d);var h=d.localName;if("link"===h&&"import"===d.getAttribute("rel")){c=d.import;if(c instanceof Node&&!e.has(c))for(e.add(c),c=c.firstChild;c;c=c.nextSibling)n(c,a,e);c=m(b,d);continue}else if("template"===h){c=m(b,d);continue}if(d=d.__CE_shadowRoot)for(d=d.firstChild;d;d=d.nextSibling)n(d,a,e)}c=c.firstChild?c.firstChild:m(b,c)}}function q(b,a,e){b[a]=e};function r(){this.a=new Map;this.m=new Map;this.f=[];this.b=!1}function ba(b,a,e){b.a.set(a,e);b.m.set(e.constructor,e)}function t(b,a){b.b=!0;b.f.push(a)}function v(b,a){b.b&&n(a,function(a){return w(b,a)})}function w(b,a){if(b.b&&!a.__CE_patched){a.__CE_patched=!0;for(var e=0;e<b.f.length;e++)b.f[e](a)}}function x(b,a){var e=[];n(a,function(b){return e.push(b)});for(a=0;a<e.length;a++){var c=e[a];1===c.__CE_state?b.connectedCallback(c):y(b,c)}}
function z(b,a){var e=[];n(a,function(b){return e.push(b)});for(a=0;a<e.length;a++){var c=e[a];1===c.__CE_state&&b.disconnectedCallback(c)}}
function A(b,a,e){e=e?e:new Set;var c=[];n(a,function(d){if("link"===d.localName&&"import"===d.getAttribute("rel")){var a=d.import;a instanceof Node&&"complete"===a.readyState?(a.__CE_isImportDocument=!0,a.__CE_hasRegistry=!0):d.addEventListener("load",function(){var a=d.import;a.__CE_documentLoadHandled||(a.__CE_documentLoadHandled=!0,a.__CE_isImportDocument=!0,a.__CE_hasRegistry=!0,e.delete(a),A(b,a,e))})}else c.push(d)},e);if(b.b)for(a=0;a<c.length;a++)w(b,c[a]);for(a=0;a<c.length;a++)y(b,c[a])}
function y(b,a){if(void 0===a.__CE_state){var e=b.a.get(a.localName);if(e){e.constructionStack.push(a);var c=e.constructor;try{try{if(new c!==a)throw Error("The custom element constructor did not produce the element being upgraded.");}finally{e.constructionStack.pop()}}catch(f){throw a.__CE_state=2,f;}a.__CE_state=1;a.__CE_definition=e;if(e.attributeChangedCallback)for(e=e.observedAttributes,c=0;c<e.length;c++){var d=e[c],h=a.getAttribute(d);null!==h&&b.attributeChangedCallback(a,d,null,h,null)}l(a)&&
b.connectedCallback(a)}}}r.prototype.connectedCallback=function(b){var a=b.__CE_definition;a.connectedCallback&&a.connectedCallback.call(b)};r.prototype.disconnectedCallback=function(b){var a=b.__CE_definition;a.disconnectedCallback&&a.disconnectedCallback.call(b)};r.prototype.attributeChangedCallback=function(b,a,e,c,d){var h=b.__CE_definition;h.attributeChangedCallback&&-1<h.observedAttributes.indexOf(a)&&h.attributeChangedCallback.call(b,a,e,c,d)};function B(b,a){this.c=b;this.a=a;this.b=void 0;A(this.c,this.a);"loading"===this.a.readyState&&(this.b=new MutationObserver(this.f.bind(this)),this.b.observe(this.a,{childList:!0,subtree:!0}))}function C(b){b.b&&b.b.disconnect()}B.prototype.f=function(b){var a=this.a.readyState;"interactive"!==a&&"complete"!==a||C(this);for(a=0;a<b.length;a++)for(var e=b[a].addedNodes,c=0;c<e.length;c++)A(this.c,e[c])};function ca(){var b=this;this.b=this.a=void 0;this.f=new Promise(function(a){b.b=a;b.a&&a(b.a)})}function D(b){if(b.a)throw Error("Already resolved.");b.a=void 0;b.b&&b.b(void 0)};function E(b){this.i=!1;this.c=b;this.l=new Map;this.j=function(b){return b()};this.g=!1;this.h=[];this.s=new B(b,document)}
E.prototype.define=function(b,a){var e=this;if(!(a instanceof Function))throw new TypeError("Custom element constructors must be functions.");if(!k(b))throw new SyntaxError("The element name '"+b+"' is not valid.");if(this.c.a.get(b))throw Error("A custom element with name '"+b+"' has already been defined.");if(this.i)throw Error("A custom element is already being defined.");this.i=!0;var c,d,h,f,u;try{var p=function(b){var a=P[b];if(void 0!==a&&!(a instanceof Function))throw Error("The '"+b+"' callback must be a function.");
return a},P=a.prototype;if(!(P instanceof Object))throw new TypeError("The custom element constructor's prototype is not an object.");c=p("connectedCallback");d=p("disconnectedCallback");h=p("adoptedCallback");f=p("attributeChangedCallback");u=a.observedAttributes||[]}catch(ua){return}finally{this.i=!1}ba(this.c,b,{localName:b,constructor:a,connectedCallback:c,disconnectedCallback:d,adoptedCallback:h,attributeChangedCallback:f,observedAttributes:u,constructionStack:[]});this.h.push(b);this.g||(this.g=
!0,this.j(function(){if(!1!==e.g)for(e.g=!1,A(e.c,document);0<e.h.length;){var b=e.h.shift();(b=e.l.get(b))&&D(b)}}))};E.prototype.get=function(b){if(b=this.c.a.get(b))return b.constructor};E.prototype.whenDefined=function(b){if(!k(b))return Promise.reject(new SyntaxError("'"+b+"' is not a valid custom element name."));var a=this.l.get(b);if(a)return a.f;a=new ca;this.l.set(b,a);this.c.a.get(b)&&-1===this.h.indexOf(b)&&D(a);return a.f};E.prototype.u=function(b){C(this.s);var a=this.j;this.j=function(e){return b(function(){return a(e)})}};
window.CustomElementRegistry=E;E.prototype.define=E.prototype.define;E.prototype.get=E.prototype.get;E.prototype.whenDefined=E.prototype.whenDefined;E.prototype.polyfillWrapFlushCallback=E.prototype.u;var F=window.Document.prototype.createElement,da=window.Document.prototype.createElementNS,ea=window.Document.prototype.importNode,fa=window.Document.prototype.prepend,ga=window.Document.prototype.append,G=window.Node.prototype.cloneNode,H=window.Node.prototype.appendChild,I=window.Node.prototype.insertBefore,J=window.Node.prototype.removeChild,K=window.Node.prototype.replaceChild,L=Object.getOwnPropertyDescriptor(window.Node.prototype,"textContent"),M=window.Element.prototype.attachShadow,N=Object.getOwnPropertyDescriptor(window.Element.prototype,
"innerHTML"),O=window.Element.prototype.getAttribute,Q=window.Element.prototype.setAttribute,R=window.Element.prototype.removeAttribute,S=window.Element.prototype.getAttributeNS,T=window.Element.prototype.setAttributeNS,U=window.Element.prototype.removeAttributeNS,V=window.Element.prototype.insertAdjacentElement,ha=window.Element.prototype.prepend,ia=window.Element.prototype.append,ja=window.Element.prototype.before,ka=window.Element.prototype.after,la=window.Element.prototype.replaceWith,ma=window.Element.prototype.remove,
na=window.HTMLElement,W=Object.getOwnPropertyDescriptor(window.HTMLElement.prototype,"innerHTML"),X=window.HTMLElement.prototype.insertAdjacentElement;function oa(){var b=Y;window.HTMLElement=function(){function a(){var a=this.constructor,c=b.m.get(a);if(!c)throw Error("The custom element being constructed was not registered with `customElements`.");var d=c.constructionStack;if(!d.length)return d=F.call(document,c.localName),Object.setPrototypeOf(d,a.prototype),d.__CE_state=1,d.__CE_definition=c,w(b,d),d;var c=d.length-1,h=d[c];if(h===g)throw Error("The HTMLElement constructor was either called reentrantly for this constructor or called multiple times.");
d[c]=g;Object.setPrototypeOf(h,a.prototype);w(b,h);return h}a.prototype=na.prototype;return a}()};function pa(b,a,e){a.prepend=function(a){for(var d=[],c=0;c<arguments.length;++c)d[c-0]=arguments[c];c=d.filter(function(b){return b instanceof Node&&l(b)});e.o.apply(this,d);for(var f=0;f<c.length;f++)z(b,c[f]);if(l(this))for(c=0;c<d.length;c++)f=d[c],f instanceof Element&&x(b,f)};a.append=function(a){for(var d=[],c=0;c<arguments.length;++c)d[c-0]=arguments[c];c=d.filter(function(b){return b instanceof Node&&l(b)});e.append.apply(this,d);for(var f=0;f<c.length;f++)z(b,c[f]);if(l(this))for(c=0;c<
d.length;c++)f=d[c],f instanceof Element&&x(b,f)}};function qa(){var b=Y;q(Document.prototype,"createElement",function(a){if(this.__CE_hasRegistry){var e=b.a.get(a);if(e)return new e.constructor}a=F.call(this,a);w(b,a);return a});q(Document.prototype,"importNode",function(a,e){a=ea.call(this,a,e);this.__CE_hasRegistry?A(b,a):v(b,a);return a});q(Document.prototype,"createElementNS",function(a,e){if(this.__CE_hasRegistry&&(null===a||"http://www.w3.org/1999/xhtml"===a)){var c=b.a.get(e);if(c)return new c.constructor}a=da.call(this,a,e);w(b,a);return a});
pa(b,Document.prototype,{o:fa,append:ga})};function ra(){var b=Y;function a(a,c){Object.defineProperty(a,"textContent",{enumerable:c.enumerable,configurable:!0,get:c.get,set:function(a){if(this.nodeType===Node.TEXT_NODE)c.set.call(this,a);else{var d=void 0;if(this.firstChild){var e=this.childNodes,u=e.length;if(0<u&&l(this))for(var d=Array(u),p=0;p<u;p++)d[p]=e[p]}c.set.call(this,a);if(d)for(a=0;a<d.length;a++)z(b,d[a])}}})}q(Node.prototype,"insertBefore",function(a,c){if(a instanceof DocumentFragment){var d=Array.prototype.slice.apply(a.childNodes);
a=I.call(this,a,c);if(l(this))for(c=0;c<d.length;c++)x(b,d[c]);return a}d=l(a);c=I.call(this,a,c);d&&z(b,a);l(this)&&x(b,a);return c});q(Node.prototype,"appendChild",function(a){if(a instanceof DocumentFragment){var c=Array.prototype.slice.apply(a.childNodes);a=H.call(this,a);if(l(this))for(var d=0;d<c.length;d++)x(b,c[d]);return a}c=l(a);d=H.call(this,a);c&&z(b,a);l(this)&&x(b,a);return d});q(Node.prototype,"cloneNode",function(a){a=G.call(this,a);this.ownerDocument.__CE_hasRegistry?A(b,a):v(b,a);
return a});q(Node.prototype,"removeChild",function(a){var c=l(a),d=J.call(this,a);c&&z(b,a);return d});q(Node.prototype,"replaceChild",function(a,c){if(a instanceof DocumentFragment){var d=Array.prototype.slice.apply(a.childNodes);a=K.call(this,a,c);if(l(this))for(z(b,c),c=0;c<d.length;c++)x(b,d[c]);return a}var d=l(a),e=K.call(this,a,c),f=l(this);f&&z(b,c);d&&z(b,a);f&&x(b,a);return e});L&&L.get?a(Node.prototype,L):t(b,function(b){a(b,{enumerable:!0,configurable:!0,get:function(){for(var a=[],b=
0;b<this.childNodes.length;b++)a.push(this.childNodes[b].textContent);return a.join("")},set:function(a){for(;this.firstChild;)J.call(this,this.firstChild);H.call(this,document.createTextNode(a))}})})};function sa(b){var a=Element.prototype;a.before=function(a){for(var c=[],d=0;d<arguments.length;++d)c[d-0]=arguments[d];d=c.filter(function(a){return a instanceof Node&&l(a)});ja.apply(this,c);for(var e=0;e<d.length;e++)z(b,d[e]);if(l(this))for(d=0;d<c.length;d++)e=c[d],e instanceof Element&&x(b,e)};a.after=function(a){for(var c=[],d=0;d<arguments.length;++d)c[d-0]=arguments[d];d=c.filter(function(a){return a instanceof Node&&l(a)});ka.apply(this,c);for(var e=0;e<d.length;e++)z(b,d[e]);if(l(this))for(d=
0;d<c.length;d++)e=c[d],e instanceof Element&&x(b,e)};a.replaceWith=function(a){for(var c=[],d=0;d<arguments.length;++d)c[d-0]=arguments[d];var d=c.filter(function(a){return a instanceof Node&&l(a)}),e=l(this);la.apply(this,c);for(var f=0;f<d.length;f++)z(b,d[f]);if(e)for(z(b,this),d=0;d<c.length;d++)e=c[d],e instanceof Element&&x(b,e)};a.remove=function(){var a=l(this);ma.call(this);a&&z(b,this)}};function ta(){var b=Y;function a(a,c){Object.defineProperty(a,"innerHTML",{enumerable:c.enumerable,configurable:!0,get:c.get,set:function(a){var d=this,e=void 0;l(this)&&(e=[],n(this,function(a){a!==d&&e.push(a)}));c.set.call(this,a);if(e)for(var f=0;f<e.length;f++){var h=e[f];1===h.__CE_state&&b.disconnectedCallback(h)}this.ownerDocument.__CE_hasRegistry?A(b,this):v(b,this);return a}})}function e(a,c){q(a,"insertAdjacentElement",function(a,d){var e=l(d);a=c.call(this,a,d);e&&z(b,d);l(a)&&x(b,d);
return a})}M?q(Element.prototype,"attachShadow",function(a){return this.__CE_shadowRoot=a=M.call(this,a)}):console.warn("Custom Elements: `Element#attachShadow` was not patched.");if(N&&N.get)a(Element.prototype,N);else if(W&&W.get)a(HTMLElement.prototype,W);else{var c=F.call(document,"div");t(b,function(b){a(b,{enumerable:!0,configurable:!0,get:function(){return G.call(this,!0).innerHTML},set:function(a){var b="template"===this.localName?this.content:this;for(c.innerHTML=a;0<b.childNodes.length;)J.call(b,
b.childNodes[0]);for(;0<c.childNodes.length;)H.call(b,c.childNodes[0])}})})}q(Element.prototype,"setAttribute",function(a,c){if(1!==this.__CE_state)return Q.call(this,a,c);var d=O.call(this,a);Q.call(this,a,c);c=O.call(this,a);b.attributeChangedCallback(this,a,d,c,null)});q(Element.prototype,"setAttributeNS",function(a,c,e){if(1!==this.__CE_state)return T.call(this,a,c,e);var d=S.call(this,a,c);T.call(this,a,c,e);e=S.call(this,a,c);b.attributeChangedCallback(this,c,d,e,a)});q(Element.prototype,"removeAttribute",
function(a){if(1!==this.__CE_state)return R.call(this,a);var c=O.call(this,a);R.call(this,a);null!==c&&b.attributeChangedCallback(this,a,c,null,null)});q(Element.prototype,"removeAttributeNS",function(a,c){if(1!==this.__CE_state)return U.call(this,a,c);var d=S.call(this,a,c);U.call(this,a,c);var e=S.call(this,a,c);d!==e&&b.attributeChangedCallback(this,c,d,e,a)});X?e(HTMLElement.prototype,X):V?e(Element.prototype,V):console.warn("Custom Elements: `Element#insertAdjacentElement` was not patched.");
pa(b,Element.prototype,{o:ha,append:ia});sa(b)};/*

 Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
 This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 Code distributed by Google as part of the polymer project is also
 subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
var Z=window.customElements;if(!Z||Z.forcePolyfill||"function"!=typeof Z.define||"function"!=typeof Z.get){var Y=new r;oa();qa();ra();ta();document.__CE_hasRegistry=!0;var customElements=new E(Y);Object.defineProperty(window,"customElements",{configurable:!0,enumerable:!0,value:customElements})};
}).call(self);

//# sourceMappingURL=custom-elements.min.js.map

'use strict';var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();function _defaults(obj, defaults) {var keys = Object.getOwnPropertyNames(defaults);for (var i = 0; i < keys.length; i++) {var key = keys[i];var value = Object.getOwnPropertyDescriptor(defaults, key);if (value && value.configurable && obj[key] === undefined) {Object.defineProperty(obj, key, value);}}return obj;}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self, call) {if (!self) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call && (typeof call === "object" || typeof call === "function") ? call : self;}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass);}(function () {
  'use strict';

  function XCBaseMixin(base) {
    return function (_base) {_inherits(XCBase, _base);
      function XCBase() {_classCallCheck(this, XCBase);var _this = _possibleConstructorReturn(this,
        _base.call(this));
        _this._properties = {};
        _this._connected = false;
        _this._createSetters();
        _this._injectStyles();return _this;
      }XCBase.prototype.

      connectedCallback = function connectedCallback() {
        this.innerHTML = this.constructor.htmlMarkup;
        this._connected = true;
        // Need to delay so animations occur
        setTimeout(this._loadProperties.bind(this), 10);
      };XCBase.prototype.

      _injectStyles = function _injectStyles() {
        var styleId = this.constructor.is + '-styles';
        if (!document.head.querySelector('#' + styleId)) {
          var style = document.createElement('style');
          var markup = this._updateFocusMarkup(this.constructor.cssMarkup);
          style.innerHTML = markup;
          style.setAttribute('id', styleId);
          document.head.appendChild(style);
        }
      };XCBase.prototype.

      attributeChangedCallback = function attributeChangedCallback(name, oldValue, newValue) {
        var handler = this[this._attrToCamel(name) + 'Changed'];
        this._properties[name] = newValue === '' || newValue === 'true' || newValue;
        if (handler && this._connected) {
          handler.call(this, oldValue, this._properties[name]);
        }
      };XCBase.prototype.

      _createSetter = function _createSetter(name) {
        Object.defineProperty(this, this._attrToCamel(name), {
          get: function get() {
            return this._properties[name];
          },
          set: function set(value) {
            var oldValue = this._properties[name];
            this._properties[name] = value;

            if (typeof value === 'string') {
              this.setAttribute(name, value);
            } else if (typeof value === 'boolean') {
              value ? this.setAttribute(name, value) : this.removeAttribute(name);
            } else if (this._connected) {
              this.attributeChangedCallback(name, oldValue, value);
            }
          } });

      };XCBase.prototype.

      $ = function $(selector) {
        return this.querySelector('.' + this.constructor.is + '--' + selector);
      };XCBase.prototype.

      nodesForEach = function nodesForEach(selector, callback) {
        var items = this.querySelectorAll(selector);
        Array.prototype.forEach.call(items, callback, this);
      };XCBase.prototype.

      _loadProperties = function _loadProperties() {
        this.constructor.observedAttributes.forEach(function (name) {
          var value = this._properties[name];
          if (value) {
            this.attributeChangedCallback(name, undefined, value);
          }
        }, this);
      };XCBase.prototype.

      _createSetters = function _createSetters() {
        this.constructor.observedAttributes.forEach(this._createSetter, this);
      };XCBase.prototype.

      _attrToCamel = function _attrToCamel(name) {
        return name.replace(/-(\w)/g, function (_, ltr) {
          return ltr.toUpperCase();
        });
      };XCBase.prototype.

      _isMobile = function _isMobile() {
        return !!navigator.userAgent.match(/iphone|android|blackberry/ig) || false;
      };XCBase.prototype.

      _updateFocusMarkup = function _updateFocusMarkup(markup) {
        var focusRegex = /(\.[a-z,-]+:focus(:before)?,?)+\{.*?\}/g;

        if (this._isMobile()) {
          return markup.replace(focusRegex, function (match) {
            return match.replace(/\{.*?\}/g, '{outline: 0;}');
          });
        }

        return markup;
      };XCBase.prototype.

      _showSiblings = function _showSiblings(siblings) {
        siblings.forEach(function (sibling) {
          sibling.removeAttribute('aria-hidden');
        });
      };XCBase.prototype.

      _hideSiblings = function _hideSiblings() {
        var hidden = [];
        var elementChildren = document.body.children;

        Array.prototype.forEach.call(elementChildren, function (child) {
          if (child !== this && (
          !child.hasAttribute('aria-hidden') ||
          child.getAttribute('aria-hidden') !== 'true')) {
            child.setAttribute('aria-hidden', 'true');
            hidden.push(child);
          }
        }.bind(this));
        return hidden;
      };XCBase.prototype.

      _captureFocus = function _captureFocus(container, firstLink, event) {
        if (this.opened && !container.contains(event.target)) {
          event.stopPropagation();
          firstLink.focus();
        }
      };XCBase.prototype.

      _toggleClass = function _toggleClass(node, name, add) {
        // Thanks IE11 for not implementing this correctly
        if (add) {
          node.classList.add(name);
        } else {
          node.classList.remove(name);
        }
      };XCBase.prototype.

      fire = function fire(eventName, detail, target) {
        var customEventInit = { detail: detail };
        target = target || this;
        target.dispatchEvent(new CustomEvent(eventName, customEventInit), { bubbles: true });
      };XCBase.prototype.

      _onEscape = function _onEscape(callback, event) {
        var ESCAPE = 27;

        if (event.keyCode === ESCAPE) {
          callback(event);
          event.preventDefault();
        }
      };XCBase.prototype.

      _setupEmailTS = function _setupEmailTS(attrSltr) {
        this.nodesForEach(attrSltr, function (link) {
          var emailHref = link.href;
          var ts = this._getTs();
          link.href = this._getEmailTsHref(emailHref, ts);
        });
      };XCBase.prototype.

      _getTs = function _getTs() {
        var converter = [6, 0, 2, 1, 4, 3, 7, 5],
        input = this._getTsInput(),
        output = [],
        i,len;
        for (i = 0, len = input.length; i < len; i += 1) {
          output[i] = input.substr(converter[i] % len, 1);
        }
        return output.join('');
      };XCBase.prototype.

      _getTsInput = function _getTsInput() {
        return Math.floor(this._getDate().getTime() / 1000).toString(16);
      };XCBase.prototype.

      _getDate = function _getDate() {
        return new Date();
      };XCBase.prototype.

      _getEmailTsHref = function _getEmailTsHref(emailHref, ts) {
        return emailHref.replace(/(ts=[0-9A-Fa-f]*)+/, 'ts=' + ts);
      };return XCBase;}(base);

  }

  var markup = "<a class=xc-header--skip href=#xc-header--skip>Skip to main content</a><div class=xc-header--slim-container hidden><ul class=xc-header--slim-navigation-ul role=navigation aria-label=\"My Xfinity\"><li class=xc-header--slim-navigation-li><a class=xc-header--slim-navigation-link name=XFINITY href=https://www.xfinity.com>XFINITY</a></li><li class=xc-header--slim-navigation-li><a class=xc-header--slim-navigation-link name=comcastbusiness href=\"http://business.comcast.com/triple-play-bundle?CMP=ILC:MA:GNV:SUB:COM:GEN:INT55c0dd2b31b24&amp;utm_source=dotnet&amp;utm_medium=dotnet&amp;utm_campaign=headerlink\">Comcast Business</a></li></ul></div><div class=xc-header--container><a class=xc-header--xfinity-logo href=https://www.xfinity.com/ aria-label=xfinity.com><svg focusable=false viewBox=\"0 0 69.184 22.592\"><path d=\"M15.712 22.592h-3.104l-6.336-9.024-3.040 4.448h-3.232l4.736-6.72-4.416-6.304h3.232l2.72 4.032 2.752-4.032h3.232l-4.416 6.304zM15.04 3.776q0-1.792 0.912-2.784t2.544-0.992q1.312 0 2.272 0.352v2.272l-0.72-0.144t-0.816-0.080q-0.736 0-1.056 0.304t-0.32 1.040v1.248h2.912v2.24h-2.912v10.784h-2.816v-10.784h-2.88l1.536-2.24h1.344v-1.216zM25.44 18.016h-2.816v-13.024h2.816v13.024zM34.56 4.736q2.304 0 3.504 1.472t1.2 4.352v7.456h-2.816v-7.36q0-1.856-0.608-2.688t-1.984-0.832q-1.248 0-1.904 0.848t-0.656 2.448v7.584h-2.816v-13.024h2.816v1.184q0.512-0.64 1.376-1.040t1.888-0.4zM44.992 18.016h-2.848v-13.024h2.848v13.024zM47.04 7.232v-2.24h2.048v-3.232l2.816-1.44v4.672h2.432l0.832 2.24h-3.264v7.072q0 0.864 0.4 1.248t1.264 0.384q0.416 0 0.784-0.064t0.496-0.128l-0.32 2.272q-0.864 0.256-1.984 0.256-1.632 0-2.544-0.992t-0.912-2.784v-7.264h-2.048zM59.52 22.592h-2.976l3.36-6.24-4.352-11.36h2.944l3.104 8.288 4.512-8.288h3.072zM65.152 17.248q0-0.64 0.448-1.088t1.12-0.448q0.64 0 1.088 0.448t0.448 1.088-0.464 1.104-1.104 0.464-1.088-0.464-0.448-1.104zM68.096 17.248q0-0.576-0.4-0.992t-0.976-0.416q-0.608 0-1.008 0.416t-0.4 0.992 0.4 0.992 0.976 0.416q0.608 0 1.008-0.416t0.4-0.992zM66.08 16.384h0.736q0.288 0 0.48 0.192 0.128 0.096 0.128 0.32 0 0.416-0.384 0.512l0.448 0.608h-0.384l-0.384-0.544h-0.32v0.544h-0.32v-1.632zM66.784 17.184q0.32 0 0.32-0.256t-0.32-0.256h-0.384v0.512h0.384z\"/></svg></a><div class=xc-header--container-nav role=navigation aria-label=\"My Xfinity\"><ul class=xc-header--navigation-ul><li class=xc-header--navigation-li><a class=xc-header--navigation-link name=myxfinity href=http://my.xfinity.com/ >My XFINITY</a></li><li class=xc-header--navigation-li><a class=xc-header--navigation-link name=shop href=https://www.xfinity.com/ data-unrecognized=https://www.xfinity.com/ data-recognized=https://www.xfinity.com/Corporate/shop/productoverview.html data-authenticated=https://www.xfinity.com/upgrade-center/OffersLink>Shop<span>/Upgrade</span></a></li><li class=xc-header--navigation-li><a class=xc-header--navigation-link name=support href=https://www.xfinity.com/support/ >Support</a></li><li class=xc-header--navigation-li><a class=xc-header--navigation-link name=myaccount href=https://customer.xfinity.com/Overview/ >My Account</a></li></ul><ul class=xc-header--personal-ul><li class=xc-header--personal-li><a class=xc-header--personal-link name=email href=\"https://login.comcast.net/login?s=wnamp&amp;ts=\"><span class=xc-header--personal-info>Email</span><div class=xc-header--email-count hidden></div><svg focusable=false viewBox=\"0 0 100 100\"><path d=\"M9,18c-3.8,0-7,3.2-7,7l0,49c0,3.8,3.2,6,7,6h82\n\t\t\tc3.7,0,7-2.3,7-6V25c0-3.9-3.2-7-7-7H9z\"/><path d=M2.3,23l48,33.2L98,23 /></svg></a></li><li class=xc-header--personal-li><a class=xc-header--personal-link name=tv href=https://tv.xfinity.com><span class=xc-header--personal-info>TV</span> <svg focusable=false viewBox=\"0 0 100 100\"><rect x=4 y=16 width=94 height=54 rx=12 ry=12 /><line x1=26 y1=86 x2=74 y2=86 /><line x1=50 y1=72 x2=50 y2=86 /></svg></a></li><li class=xc-header--personal-li><a class=xc-header--personal-link name=home href=https://home.xfinity.com><span class=xc-header--personal-info>Home</span> <svg focusable=false viewBox=\"0 0 100 100\"><polyline points=\"86,36 86,85 14,85 14,18 26,18 26,28\"/><polyline points=\"3,41 50,15 97,41\"/><line x1=50 y1=38 x2=50 y2=56 /><path d=M42,43.4c-3.9,2.6-6.5,7-6.5,12.1C35.5,63.5,42,70,50,70s14.5-6.5,14.5-14.5c0-5-2.6-9.5-6.5-12.1 /></svg></a></li><li class=\"xc-header--personal-li smart-internet\"><a class=xc-header--personal-link name=internet href=https://internet.xfinity.com/ rel=nofollow><span class=xc-header--personal-info>Internet</span> <svg focusable=false viewBox=\"0 0 100 100\"><circle class=wifi-bottom-circle cx=50 cy=81 r=7 /><path d=\"M4,37 c12.1-12.6,27.2-20,46-20c18.7,0,33.9,7.7,46,20\"/><path d=\"M18,52 c8.5-8.8,18.8-14,32-14c13.1,0,23.5,5.4,32,14\"/><path d=\"M34,65c4.2-4.4,9.4-7,16-7 c6.5,0,11.8,2.7,16,7\"/></svg></a></li><li class=xc-header--personal-li><a class=xc-header--personal-link name=voice href=https://connect.xfinity.com/voice><span class=xc-header--personal-info>Voice</span> <svg focusable=false viewBox=\"0 0 100 100\"><path d=\"M43,58c10.7,10.7,19,14,19,14s4.5-4.5,6-6c0.8-0.8,1.3-1.4,2-2c1.1-0.9,2.5-1.5,4-1c3.4,1.2,10.3,3.7,13,6c2.5,2.1,4.7,6.7-2,13\n\tc-6.7,6.7-13.2,7-15,7c-6.5,0-16.2-3.2-36-23S12,35.5,12,31c0-1.6,0.3-8.3,7-15s10.1-4.4,12-2c2.3,2.9,5.1,9.8,7,13\n\tc0.7,1.2,1.3,2.7,0,4c-0.6,0.6-1.2,1.2-2,2c-1.7,1.6-7,6-7,6S32.7,47.3,43,58z\"/></svg></a></li><li class=\"xc-header--personal-li personal-more\"><button class=\"xc-header--personal-link xc-header--personal-button\" name=more><span class=xc-screen-reader-text>More</span> <svg focusable=false viewBox=\"0 0 100 100\"><circle cx=14 cy=50 r=12 /><circle cx=50 cy=50 r=12 /><circle cx=86 cy=50 r=12 /></svg></button><ul class=xc-header--more-ul data-hide hidden><li class=xc-header--more-li><a class=xc-header--more-link href=https://customer.xfinity.com/Secure/OneTimePayment><svg focusable=false viewBox=\"0 0 30 30\"><path d=\"M8.15 7.55A1.54 1.54 0 0 1 9.68 6h8.46l3.71 3.82v12.62A1.54 1.54 0 0 1 20.33 24H9.67a1.53 1.53 0 0 1-1.52-1.55z\"/><path d=\"M16.86 12.57a5.38 5.38 0 0 0-1.69-.33v-1.37h-.59v1.37A1.65 1.65 0 0 0 12.94 14c0 1.28 1 1.59 1.72 1.81 1 .24 1.88.49 1.88 1.28s-.89 1.16-1.93 1.16a3 3 0 0 1-1.6-.45l-.17.66a3.61 3.61 0 0 0 1.71.4v1.35h.59V18.8c1.39-.16 2-.86 2-1.86 0-1.17-.88-1.52-2.21-1.84-.78-.23-1.39-.44-1.39-1.22s.6-1.08 1.35-1.08a4.67 4.67 0 0 1 1.83.39l.13-.63z\"/><path style=stroke-linejoin:round d=\"M17.82 6v4.15h4\"/></svg> Pay Bill</a></li><li class=xc-header--more-li><a class=xc-header--more-link href=https://tv.xfinity.com/listings><svg focusable=false viewBox=\"0 0 30 30\"><circle cx=6.25 cy=8 r=1.5 /><circle cx=6.25 cy=15 r=1.5 /><circle cx=6.25 cy=22 r=1.5 /><path d=\"M10.25 8h15\"/><path d=\"M10.25 15h15\"/><path d=\"M10.25 22h15\"/></svg> Live TV</a></li><li class=xc-header--more-li><a class=xc-header--more-link href=https://customer.xfinity.com/#/settings/account><svg focusable=false viewBox=\"0 0 30 30\"><path d=\"M16.83 22l.86 1.48a1 1 0 0 0 1.33.35l1.68-1a1 1 0 0 0 .3-1.25l-.86-1.49A7.26 7.26 0 0 0 22 16.94h1.72a1 1 0 0 0 1-1V14a1 1 0 0 0-1-1H22a7.26 7.26 0 0 0-1.83-3.15L21 8.42a1 1 0 0 0-.36-1.32L19 6.13a1 1 0 0 0-1.33.35L16.83 8a7.32 7.32 0 0 0-3.65 0l-.86-1.49A1 1 0 0 0 11 6.13l-1.68 1A1 1 0 0 0 9 8.42l.86 1.49A7.26 7.26 0 0 0 8 13.06H6.27a1 1 0 0 0-1 1V16a1 1 0 0 0 1 1H8a7.26 7.26 0 0 0 1.83 3.15L9 21.58a1 1 0 0 0 .36 1.32l1.68 1a1 1 0 0 0 1.33-.35l.8-1.55a7.32 7.32 0 0 0 3.65 0z\"/><ellipse cx=15 cy=15 rx=3.73 ry=3.75 /></svg> Settings</a></li><li class=xc-header--more-li><a class=xc-header--more-link href=https://tv.xfinity.com/ondemand/tvseries><svg focusable=false viewBox=\"0 0 30 30\"><ellipse cx=15 cy=15 rx=8.92 ry=9 /><path style=stroke-linejoin:round d=\"M12.32 19.5v-8.1l7.14 4z\"/></svg> On Demand</a></li><li class=xc-header--more-li><a class=xc-header--more-link href=\"https://constantguard.xfinity.com?cid=33_6401\"><svg focusable=false viewBox=\"0 0 30 30\"><path style=stroke-miterlimit:10 d=\"M20.06 14.58v-3.67A5.12 5.12 0 0 0 15 6a5 5 0 0 0-5.06 4.78v3.8H8.17V24h13.66v-9.42zm-1.79 0h-6.54V10.9a3.26 3.26 0 0 1 6.51 0z\"/></svg> Norton Security</a></li><li class=xc-header--more-li><a class=xc-header--more-link href=https://www.xfinity.com/support/service-center-locations><svg focusable=false viewBox=\"0 0 30 30\"><defs><style>.cls-1{fill:#fff}.cls-2{mask:url(#mask)}.cls-3{fill:none;}</style><mask id=mask x=1.03 y=7.74 width=23.98 height=18.75 maskUnits=userSpaceOnUse><path id=path-1 class=cls-1 d=\"M22.14 11.29l2.67 1.09.19 14.11-7.92-.4-11.1-.81-4.95-8.26.99-8.68 7.92-.6 7.21 2.9v.35l2.44 3.77 1.44-1.11 1.11-2.36z\"/></mask></defs><g class=cls-2 id=Clipped><path id=Shape class=cls-3 d=\"M17.61 10.7l-5.82 2.02-5.81-2.02v11.28L11.79 24l5.82-2.02L23.42 24V12.72l-3.45-1.17-2.36-.85z\"/></g><path class=cls-3 d=\"M19.84 14.59c-.86 0-2.95-4-2.95-5.63a2.95 2.95 0 1 1 5.9 0c0 1.64-2.09 5.63-2.95 5.63z\"/><path class=cls-3 d=\"M20.76 8.92a.84.84 0 1 1-.84-.86.85.85 0 0 1 .84.86z\"/><path class=cls-3 d=\"M12.08 12.7v11\"/><path class=cls-3 d=\"M18.07 12.7H18v9.54\"/></svg> Store Locator</a></li><li class=xc-header--more-li><a class=\"xc-header--more-link more-from-xfinity\" href=\"http://my.xfinity.com/siteindex/?cid=nav_more_siteindex\">More from XFINITY</a></li></ul></li><li class=\"xc-header--personal-li comcastbusiness\"><a class=xc-header--personal-link name=\"comcast business\" href=\"https://business.comcast.com/triple-play-bundle?utm_source=dotnet&amp;utm_medium=dotnet&amp;utm_campaign=headerlink\" target=&#34;_blank&#34;><span class=xc-header--personal-info>Comcast Business</span> <svg focusable=false viewBox=\"0 0 28 22\"><polyline points=\"20.7,15.6 20.7,19.6 5.6,19.6 5.6,4.6 9.6,4.6\"/><polyline points=\"14.9,2.6 22.6,2.6 22.6,10.4\"/><line x1=21.8 y1=3.2 x2=11.1 y2=13.8 /></svg></a></li></ul><ul class=xc-header--notifications-ul><li id=xc-header--notifications-summary class=xc-header--notifications-summary><h3></h3></li><li class=xc-header--notifications-li data-type=notification><a class=xc-header--notifications-link aria-describedby=xc-header--notifications-summary href=\"\"><p class=xc-header--notifications-p><span class=xc-header--notifications-main></span> <span class=xc-header--notifications-sub></span></p></a><button class=xc-header--notifications-close><span class=xc-screen-reader-text>Dismiss</span> <svg focusable=false viewBox=\"0 0 100 100\"><line x1=20 y1=20 x2=80 y2=80 /><line x1=20 y1=80 x2=80 y2=20 /></svg></button></li></ul></div><div class=\"xc-header--signin-container xc-unrecognized\"><a class=xc-header--signin-link href=\"http://my.xfinity.com/oauth/login?continue=\">Sign In</a><div class=xc-header--signin-container--authenticated><div class=xc-header--notification-count--container hidden><svg viewBox=\"0 0 14 16\"><path fill-rule=evenodd d=\"M14 12v1H0v-1l.73-.58c.77-.77.81-2.55 1.19-4.42C2.69 3.23 6 2 6 2c0-.55.45-1 1-1s1 .45 1 1c0 0 3.39 1.23 4.16 5 .38 1.88.42 3.66 1.19 4.42l.66.58H14zm-7 4c1.11 0 2-.89 2-2H5c0 1.11.89 2 2 2z\"></path></svg><div class=xc-header--notification-count></div></div><a class=xc-header--signin-profile-link href=https://customer.xfinity.com/#/users/me aria-label=\"View your Account\"></a> <a class=xc-header--signin-signout-link href=\"https://login.comcast.net/oauth/sp-logout?client_id=Xfinity-Portal\">Sign Out</a></div></div><button class=xc-header--hamburger type=button aria-haspopup=true aria-expanded=false><span class=xc-screen-reader-text>Open </span>Menu <svg focusable=false viewBox=\"0 0 100 100\"><line x1=10 y1=25 x2=90 y2=25 /><line x1=10 y1=50 x2=90 y2=50 /><line x1=10 y1=75 x2=90 y2=75 /></svg> <svg focusable=false viewBox=\"0 0 100 100\"><line x1=20 y1=20 x2=80 y2=80 /><line x1=20 y1=80 x2=80 y2=20 /></svg></button></div><a class=xc-header--skip name=xc-header--skip tabindex=-1 id=xc-header--skip></a>";

  var styles = ".xc-screen-reader-text{position:absolute !important;display:block;visibility:visible;overflow:hidden;width:1px;height:1px;margin:-1px;border:0;padding:0;clip:rect(0px, 0px, 0px, 0px);clip-path:polygon(0px 0px, 0px 0px, 0px 0px, 0px 0px)}.xc-header--skip{display:block;font-size:12px;line-height:18px;font-weight:normal;text-decoration:none;color:#9ba4aa;border:1px solid transparent;position:absolute;top:-25px;left:0}.xc-header--skip:hover,.xc-header--skip.xc-header--active{color:#fff}.xc-header--skip:focus{outline:0;border:1px dotted #a3a3a3;border-radius:4px}.xc-header--skip:focus{top:0px}xc-header{display:block;font-family:\"XfinityStandard\", helvetica, arial, sans-serif;font-weight:400;background-color:#000;text-align:center}xc-header[width] .xc-header--container{margin:0 auto}.xc-header--xfinity-logo,.xc-header--hamburger,.xc-header--personal-li:last-child{display:none}.xc-header--container{height:44px;position:relative;display:flex;padding:0 7px}.xc-header--slim-container{padding:0 7px;text-align:center;height:24px;border-bottom:1px solid #EEF1F3}.xc-header--container-nav{flex:2 1 auto;display:flex;justify-content:space-between}.xc-header--slim-navigation-ul{margin:0 auto;padding:0;width:100%;height:24px;overflow-y:auto;box-sizing:border-box;text-align:left;list-style:none}.xc-header--slim-navigation-li{display:inline-block;vertical-align:top}.xc-header--slim-navigation-link{display:block;font-size:12px;line-height:18px;font-weight:normal;text-decoration:none;color:#9ba4aa;border:1px solid transparent;font-size:11px}.xc-header--slim-navigation-link:hover,.xc-header--slim-navigation-link.xc-header--active{color:#fff}.xc-header--slim-navigation-link:focus{outline:0;border:1px dotted #a3a3a3;border-radius:4px}.xc-header--slim-navigation-link{text-transform:uppercase;margin:0px 12px;padding:2px 4px;letter-spacing:0.5px}.xc-header--navigation-ul,.xc-header--personal-ul{margin:0;padding:0;list-style:none}.xc-header--personal-ul{text-align:right;flex-grow:2}.xc-header--navigation-li,.xc-header--personal-li{display:inline-block;vertical-align:top}.xc-header--signin-container{text-align:right;position:relative;min-width:60px;padding-right:28px;margin-right:3px}.xc-header--signin-container.xc-unrecognized .xc-header--signin-link{display:block}.xc-header--signin-container.xc-unrecognized>.xc-header--signin-container--authenticated{display:none}.xc-header--signin-container--authenticated svg{width:15px;height:17px;position:absolute;right:10px;bottom:9px;cursor:pointer}.xc-header--signin-container--authenticated svg path{fill:#9ba4aa}.xc-header--notification-count--container{float:right;cursor:pointer}.xc-header--notification-count--container[aria-expanded=\"true\"] svg path{fill:#fff}.xc-header--signin-signout-link,.xc-header--signin-profile-link,.xc-header--personal-link,.xc-header--navigation-link,.xc-header--signin-link,.xc-header--more-link{display:block;font-size:12px;line-height:18px;font-weight:normal;text-decoration:none;color:#9ba4aa;border:1px solid transparent}.xc-header--signin-signout-link:hover,.xc-header--signin-signout-link.xc-header--active,.xc-header--signin-profile-link:hover,.xc-header--signin-profile-link.xc-header--active,.xc-header--personal-link:hover,.xc-header--personal-link.xc-header--active,.xc-header--navigation-link:hover,.xc-header--navigation-link.xc-header--active,.xc-header--signin-link:hover,.xc-header--signin-link.xc-header--active,.xc-header--more-link:hover,.xc-header--more-link.xc-header--active{color:#fff}.xc-header--signin-signout-link:focus,.xc-header--signin-profile-link:focus,.xc-header--personal-link:focus,.xc-header--navigation-link:focus,.xc-header--signin-link:focus,.xc-header--more-link:focus{outline:0;border:1px dotted #a3a3a3;border-radius:4px}.xc-header--xfinity-logo:focus,.xc-header--hamburger:focus{outline:0;border:1px dotted #a3a3a3;border-radius:4px}.xc-header--signin-profile-link{display:block;padding:7px 0 0px 10px;max-width:80px;min-height:16px;line-height:16px;text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.xc-header--signin-signout-link{font-size:11px;line-height:7px;text-transform:uppercase;letter-spacing:0.5px;max-width:85px}.xc-header--navigation-link.xc-unrecognized>span{display:none;padding:13px 15px}.xc-header--navigation-link,.xc-header--signin-link{text-transform:uppercase;margin:8px 12px;padding:4px;letter-spacing:0.5px}.xc-header--signin-link{margin-right:0;display:none}.xc-header--personal-info{display:block;position:absolute;font-size:0;height:0}.xc-header--personal-button{background:transparent;border:1px solid transparent;cursor:pointer;position:relative}.xc-header--personal-button:focus{outline:0;border:1px dotted #a3a3a3;border-radius:4px}.xc-header--personal-link{padding:7px 0 4px 0;text-align:center;width:38px;margin:3px 6px 0;line-height:15px;display:block}.xc-header--personal-link>svg{box-sizing:content-box;display:inline-block;stroke:#9ba4aa;fill:none;width:22px;height:22px;stroke-linecap:round;stroke-linejoin:round;stroke-width:6}.xc-header--personal-link>svg .wifi-bottom-circle{fill:#9ba4aa;stroke:none}.xc-header--personal-link[name='more']>svg{fill:#9ba4aa;stroke:none !important}.xc-header--personal-link[name='more']:hover>svg{fill:#fff}.xc-header--personal-link.xc-header--active>svg,.xc-header--personal-link:hover>svg{stroke:#fff}.xc-header--personal-link.xc-header--active>svg .wifi-bottom-circle,.xc-header--personal-link:hover>svg .wifi-bottom-circle{fill:#fff}.xc-header--email-count,.xc-header--notification-count{background:#ad1704;border-radius:12px;color:#fff;font-size:11px;min-width:13px;padding:3px;position:absolute;right:0px;text-align:center;text-indent:0;top:2px}.xc-header--notification-count{cursor:pointer;border:2px solid black;padding:2px}.xc-header--personal-li{position:relative}.xc-header--more-ul,.xc-header--notifications-ul{position:absolute;top:-600px;padding:0;margin:6px 0 0 -255px;background-color:#000;list-style:none;width:300px;box-sizing:border-box;opacity:0;transition:opacity .3s ease-in-out}.xc-header--more-ul.xc-expanded,.xc-header--notifications-ul.xc-expanded{opacity:1;top:44px;z-index:9999}.xc-header--more-ul{box-shadow:3px 3px 8px rgba(0,0,0,0.4);padding-top:12px}.xc-header--notifications-ul{right:-4px;margin:4px 0 0 0;background:transparent}.xc-header--notifications-summary{background:#000;color:#9ba4aa;font-size:12px;height:0px;overflow:hidden}.xc-header--notifications-li{position:relative;margin-top:2px;background:#000;opacity:1;max-height:100px;box-shadow:3px 3px 4px rgba(0,0,0,0.4);transition:all .35s ease}.xc-header--notifications-li.xc-dismissed{opacity:0;max-height:0}.xc-header--notifications-close{background:transparent;border:1px solid transparent;position:absolute;top:0px;right:0px;padding:12px}.xc-header--notifications-close:focus{outline:0;border:1px dotted #a3a3a3;border-radius:4px}.xc-header--notifications-close>svg{stroke:#9ba4aa;stroke-width:5;width:15px;height:15px}.xc-header--notifications-close:hover>svg{stroke:#fff}.xc-header--notifications-p{margin:0}.xc-header--notifications-sub{display:block;color:#9ba4aa;font-size:13px}.xc-header--notifications-link{font-size:14px;color:#9ba4aa;text-decoration:none;text-align:left;padding:20px;display:block}.xc-header--notifications-link:focus{outline:0;border:1px dotted #a3a3a3;border-radius:4px}.xc-header--notifications-link:hover{color:#fff}.xc-header--more-li{display:inline-block}.xc-header--more-li:last-child{margin:18px 0 24px;width:100%;text-align:center}.xc-header--more-link{font-size:11px;text-align:center;padding:11px 8px;box-sizing:border-box;width:100px}.xc-header--more-link:hover>svg{stroke:#fff}.xc-header--more-link>svg{display:block;stroke:#9ba4aa;width:32px;height:32px;margin:0 auto 8px auto}.more-from-xfinity{height:48px;display:inline-block;box-sizing:border-box;width:auto;border-radius:40px;outline:none;padding:12px 30px;font-size:16px;line-height:24px;color:#2b9cd8;border:1px solid #2b9cd8;text-decoration:none;white-space:nowrap;position:relative;z-index:2;margin:0 auto;position:relative}.more-from-xfinity:before{content:'';position:absolute;width:100%;height:100%;padding:4px;top:-5px;left:-5px;border:1px dotted #a3a3a3;display:none;pointer-events:none;z-index:1;outline:0;border-radius:40px;box-sizing:content-box}.more-from-xfinity:hover:before,.more-from-xfinity:active:before{display:block}.more-from-xfinity:hover,.more-from-xfinity:active{background-color:#00619a;color:#fff;border:1px solid transparent;border-radius:40px !important}.more-from-xfinity:focus:before{display:block}.more-from-xfinity:focus{background-color:#00619a;color:#fff;border:1px solid transparent;border-radius:40px !important}@media only screen and (max-width: 920px){.xc-header--slim-container{display:none}body.hamburger-opened{overflow:hidden;height:100vh;background:#000;position:fixed}.xc-header--container{margin:0}.xc-header--xfinity-logo{padding-top:10px;margin-left:12px;border:1px solid transparent;display:inline-block}.xc-header--xfinity-logo>svg{height:21px;width:64px;fill:#9ba4aa}.xc-header--xfinity-logo:hover>svg{fill:#fff}.xc-header--notifications-ul{display:block;position:relative;top:0 !important;right:0;padding:0 0 150px;margin:0;background-color:transparent;list-style:none;width:auto;box-sizing:border-box;opacity:1}.xc-header--notifications-summary{margin-top:15px;font-size:12px;text-align:left;height:auto;overflow:visible}.xc-header--notification-count{display:none}.xc-header--notifications-link{padding:20px 12px;color:#9ba4aa}.xc-header--notifications-li{border-top:1px solid #44484c}.xc-header--notifications-li:last-child{border-bottom:1px solid #44484c}.xc-header--notifications-close{padding:8px;height:22px;width:22px;stroke-width:1;top:12px}.xc-header--more-ul{display:none !important}.xc-header--signin-container{position:fixed;bottom:0;left:0;right:0;height:60px;padding:0 12px;z-index:9999;background:#000;background:linear-gradient(to top, #000 0%, #000 70%, transparent 100%);display:none}.xc-header--signin-container.xc-visible{display:block}.xc-header--signin-profile-link{display:inline-block;max-width:70%;position:absolute;left:7px;bottom:7px;font-size:15px;padding:4px}.xc-header--signin-signout-link,.xc-header--signin-link{font-size:15px;position:absolute;right:7px;bottom:7px;padding:4px;text-align:center;text-transform:none}.xc-header--hamburger{display:inline-block;text-align:left;text-transform:uppercase;letter-spacing:0.5px;background:transparent;font-size:12px;color:#9ba4aa;border:0;cursor:pointer;height:44px;width:86px;box-sizing:border-box;position:absolute;right:5px;margin:0;border:1px solid transparent;z-index:9999}.xc-header--hamburger>svg{display:inline-block;height:25px;stroke:#9ba4aa;stroke-width:5;fill:#9ba4aa;width:25px;position:absolute;top:8px;right:8px}.xc-header--hamburger>svg:last-of-type{width:25px}.xc-header--hamburger:hover,.xc-header--hamburger:active{color:#fff}.xc-header--hamburger:hover>svg,.xc-header--hamburger:active>svg{stroke:#fff;fill:#fff}.xc-header--hamburger[aria-expanded='false']>svg:last-of-type{display:none}.xc-header--hamburger[aria-expanded='true']{text-indent:-1000em}.xc-header--hamburger[aria-expanded='true']>svg:first-of-type{display:none}.xc-header--container-nav{background:#000;margin:0;position:absolute;top:0;padding:40px 12px 24px;left:0;width:100%;z-index:9998;height:100vh;display:none;overflow-y:auto;box-sizing:border-box}.xc-header--container-nav.xc-expanded{display:block}.xc-header--navigation-li,.xc-header--personal-li{display:block;text-align:left}.xc-header--personal-link>svg{float:left;padding:3px 15px 0 0}.xc-header--personal-li.personal-more{display:none}.xc-header--personal-li:last-child{display:block}.xc-header--personal-li:last-child .xc-header--personal-link>svg{display:inline-block;stroke-width:2;float:none}.xc-header--navigation-link,.xc-header--personal-link{font-size:15px;text-transform:none;padding:7px 0 7px 4px;margin:4px 0 4px -5px;display:inline-block;text-align:left;width:95%}.xc-header--navigation-link{line-height:30px}.xc-header--personal-info{position:static;display:inline;font-size:15px;line-height:30px;padding-left:0px;vertical-align:top}.xc-header--email-count{right:auto;top:5px;left:10px}}\n";var

  XCHeader = function (_XCBaseMixin) {_inherits(XCHeader, _XCBaseMixin);function XCHeader() {_classCallCheck(this, XCHeader);return _possibleConstructorReturn(this, _XCBaseMixin.apply(this, arguments));}XCHeader.prototype.












    connectedCallback = function connectedCallback() {
      _XCBaseMixin.prototype.connectedCallback.call(this);
      this._toggleHamburger = this._toggleHamburger.bind(this);
      this._captureFocus = _XCBaseMixin.prototype._captureFocus.bind(this, this.$('container'), this.$('container-nav a'));
      this._escapeToggleHamburger = this._onEscape.bind(this, this._toggleHamburger);
      this._getNotificationTemplate();
      this._setupEmailTS('a[name="email"]');
      this._setupListeners();
      this.fire('XCHeaderLoaded', {}, document);
    };XCHeader.prototype.







    _getNotificationTemplate = function _getNotificationTemplate() {
      var notificationsContainer = this.$('notifications-ul');
      var template = this.$('notifications-li');
      this._notificationTemplate = notificationsContainer.removeChild(template);
    };XCHeader.prototype.

    stateChanged = function stateChanged(_, state) {
      var isAuthenticated = state === 'authenticated';
      var shopLink = this.$('navigation-link[name="shop"]');
      this._toggleClass(this.$('signin-container'), 'xc-unrecognized', !isAuthenticated);
      this._toggleClass(shopLink, 'xc-unrecognized', state === 'unrecognized');
      shopLink.href = shopLink.getAttribute('data-' + state);
      this._updateNavLinkTracking(state);
    };XCHeader.prototype.

    _updateNavLinkTracking = function _updateNavLinkTracking(state) {
      var stateAbbr = state.slice(0, 2);

      this.nodesForEach('.xc-header--navigation-link', function (link) {
        link.href = link.href.replace(/\?CMP=.*/, '') + '?CMP=' + [
        'nav',
        link.getAttribute('name'),
        this.clientId,
        stateAbbr].
        join('_');
      });
    };XCHeader.prototype.

    isAuthedChanged = function isAuthedChanged(_, isAuthed) {
      this.setAttribute('state', isAuthed ? 'authenticated' : 'recognized');
      this.fire('authed-changed', { value: isAuthed });
    };XCHeader.prototype.

    widthChanged = function widthChanged(_, newWidth) {
      // Add 48px, 24px for each side margin
      this.$('container').style.maxWidth = newWidth ? parseInt(newWidth, 10) + 48 + 'px' : 'auto';
      if (this.slimnav) {
        this.$('slim-navigation-ul').style.maxWidth = newWidth ? parseInt(newWidth, 10) + 48 + 'px' : 'auto';
      }
    };XCHeader.prototype.

    notificationsChanged = function notificationsChanged(oldValue, notifications) {
      var notificationsContainer = this.$('notifications-ul');
      var doOnce = !oldValue;

      notifications.forEach(function (notification, index) {
        var node = this._createNotification(notification, index);
        notificationsContainer.appendChild(node);
      }, this);
      this._updateNotificationCount();

      if (doOnce) {
        this._setupNotificationsListeners();
      }
    };XCHeader.prototype.

    _createNotification = function _createNotification(notification, index) {
      var node = this._notificationTemplate.cloneNode(true);
      var close = node.querySelector('.xc-header--notifications-close');
      var link = node.querySelector('.xc-header--notifications-link');
      if (index > 0) {
        link.removeAttribute('aria-describedby');
      }
      link.href = notification.url;
      if (this.externalLinks) {
        link.setAttribute('target', '_blank');
      }
      if (notification.dismissable) {
        var closeItem = this._closeItem.bind(this, node, this.notifications[index]);
        close.addEventListener('click', function (event) {
          event.stopPropagation();
          closeItem(event);
        });
        link.addEventListener('click', closeItem);
      } else {
        close.setAttribute('hidden', true);
      }
      node.querySelector('.xc-header--notifications-main').textContent = notification.main;
      node.querySelector('.xc-header--notifications-sub').textContent = notification.sub || '';
      return node;
    };XCHeader.prototype.

    _updateNotificationCount = function _updateNotificationCount() {
      var container = this.$('notification-count--container');
      var count = this.$('notification-count');
      var num = this.querySelectorAll('.xc-header--notifications-li:not(.xc-dismissed)').length;
      var message = '';

      count.textContent = num;
      if (num > 0) {
        message = 'You have ' + num + ' notification' + (num > 1 ? 's' : '');
        container.removeAttribute('hidden');
      } else {
        container.setAttribute('hidden', '');
      }
      this.$('notifications-summary').textContent = message;
    };XCHeader.prototype.

    firstNameChanged = function firstNameChanged(_, name) {
      var link = this.$('signin-profile-link');
      link.textContent = name;
      link.title = name;
    };

    // deprecated
    XCHeader.prototype.loginUrlChanged = function loginUrlChanged(_, url) {
      this.$('signin-link').href = url;
    };XCHeader.prototype.

    signInUrlChanged = function signInUrlChanged(_, url) {
      this.$('signin-link').href = url;
    };XCHeader.prototype.

    signOutUrlChanged = function signOutUrlChanged(_, url) {
      this.$('signin-signout-link').href = url;
    };XCHeader.prototype.

    disableSkipChanged = function disableSkipChanged() {
      this.nodesForEach('.xc-header--skip', function (link) {
        link.remove();
      });
    };XCHeader.prototype.

    externalLinksChanged = function externalLinksChanged() {
      this.nodesForEach('.xc-header--container-nav a, .xc-header--xfinity-logo',
      function (link) {
        link.setAttribute('target', '_blank');
      });
    };XCHeader.prototype.

    emailCountChanged = function emailCountChanged(_, count) {
      var emailCount = this.$('email-count');
      count = parseInt(count, 10);
      if (count) {
        var countText = document.createElement('b');
        countText.classList.add('xc-screen-reader-text');
        count = count > 99 ? '99+' : count;
        emailCount.textContent = count;
        countText.textContent = ' unread emails';
        emailCount.appendChild(countText);
        emailCount.removeAttribute('hidden');
      }
    };XCHeader.prototype.

    slimnavChanged = function slimnavChanged() {
      var slimnav = this.$('slim-container');
      slimnav.removeAttribute('hidden');
    };XCHeader.prototype.

    tabChanged = function tabChanged(_, tab) {
      this.nodesForEach('a[name="' + tab + '"]', function (link) {
        link.classList.add('xc-header--active');
      });
    };XCHeader.prototype.

    _toggleHamburger = function _toggleHamburger(event) {
      var menu = this.$('container-nav');
      var opened = menu.classList.toggle('xc-expanded');
      var hamburger = this.$('hamburger');
      this.opened = opened;
      this._toggleClass(this.$('signin-container'), 'xc-visible', opened);
      hamburger.setAttribute('aria-expanded', opened);
      hamburger.querySelector('.xc-screen-reader-text').textContent = opened ? 'Close ' : 'Open ';
      this._toggleClass(document.body, 'hamburger-opened', opened);

      if (opened) {
        var menuHeight = menu.getBoundingClientRect().height + 'px';
        document.body.style.height = menuHeight;
        this._hiddenSiblings = this._hideSiblings();
      } else {
        document.querySelector('html').style.overflow = '';
        document.body.style.height = 'auto';
        this._showSiblings(this._hiddenSiblings);
      }

      event.stopPropagation();
      // close hamburger on body click
      var addOrRemove = opened ? 'addEventListener' : 'removeEventListener';
      document[addOrRemove].call(document, 'click', this._toggleHamburger);
      document[addOrRemove].call(document, 'focus', this._captureFocus, true);
      document[addOrRemove].call(document, 'keydown', this._escapeToggleHamburger, true);
    };XCHeader.prototype.

    _showMenu = function _showMenu(toggle, menu, event) {
      if (this._menuIsClosed(menu) && this._closeOpenMenu) {
        this._closeOpenMenu();
      }
      clearTimeout(this._closeMenuTimer);
      this._toggleMenu(toggle, menu, 'opened', event);
    };XCHeader.prototype.

    _hideMenu = function _hideMenu(toggle, menu, event) {
      if (this._menuIsClosed(menu) || !this._closeOpenMenu) {
        return;
      }
      this._closeMenuTimer = setTimeout(this._closeOpenMenu, 500);
    };XCHeader.prototype.

    _menuIsClosed = function _menuIsClosed(menu) {
      return !menu.classList.contains('xc-expanded');
    };XCHeader.prototype.

    _createCloseOpenMenu = function _createCloseOpenMenu(toggle, menu) {
      this._closeOpenMenu = function () {
        this._toggleMenu(toggle, menu, 'closed');
        this._closeOpenMenu = false;
      }.bind(this);
    };XCHeader.prototype.

    _toggleMenu = function _toggleMenu(toggle, menu, forceState, event) {
      var openMenu;
      var menuIsClosed = this._menuIsClosed(menu);

      if (typeof forceState === 'string') {
        openMenu = forceState === 'opened';
      } else {
        openMenu = menuIsClosed;
      }

      if (openMenu && menuIsClosed || !openMenu && !menuIsClosed) {
        this._setMenu(toggle, menu, openMenu, event);
      }
    };XCHeader.prototype.

    _setMenu = function _setMenu(toggle, menu, open, event) {
      if (open) {
        this._focusCloseListener = this._toggleMenu.bind(this, toggle, menu, 'closed');
        if (menu.hasAttribute('data-hide')) {
          menu.removeAttribute('hidden');
        }
        toggle.addEventListener('focus', this._focusCloseListener);
        this._createCloseOpenMenu(toggle, menu);
      } else {
        if (menu.hasAttribute('data-hide')) {
          var transitionend = function transitionend() {
            if (menu.classList.contains('xc-expanded')) {
              return;
            }
            menu.setAttribute('hidden', '');
            menu.removeEventListener('transitionend', transitionend);
          };
          menu.addEventListener('transitionend', transitionend);
        }
        toggle.removeEventListener('focus', this._focusCloseListener);
      }
      this._toggleClass(menu, 'xc-expanded', open);
      toggle.setAttribute('aria-expanded', open);
    };XCHeader.prototype.

    _closeItem = function _closeItem(listItem, item, event) {
      var type = listItem.getAttribute('data-type');
      listItem.classList.add('xc-dismissed');
      listItem.addEventListener('transitionend', function () {
        this.style.display = 'none';
      });
      this.fire('dismissed-clicked', { type: type, item: item });
      this._updateNotificationCount();
    };XCHeader.prototype.

    signOut = function signOut() {
      this.fire('signout-clicked', {});
    };XCHeader.prototype.

    _setupNotificationsListeners = function _setupNotificationsListeners() {
      var menu = this.$('notifications-ul');
      var toggle = this.$('notification-count--container');
      var showNotifications = this._showMenu.bind(this, toggle, menu);
      var hideNotifications = this._hideMenu.bind(this, toggle, menu);

      this.nodesForEach('.xc-header--notifications-ul a', function (link) {
        link.addEventListener('focus', showNotifications);
        link.addEventListener('blur', hideNotifications);
      });
      toggle.addEventListener('mouseover', showNotifications);
      menu.addEventListener('mouseover', showNotifications);
      toggle.addEventListener('mouseout', hideNotifications);
      menu.addEventListener('mouseout', hideNotifications);
    };XCHeader.prototype.

    _setupMenuListeners = function _setupMenuListeners(container, menu) {
      var toggle = container.querySelector('button');
      menu.querySelector('li:last-child a').addEventListener('blur', this._toggleMenu.bind(this, toggle, menu, 'closed'));
      toggle.setAttribute('aria-haspopup', 'true');
      toggle.setAttribute('aria-expanded', 'false');

      container.addEventListener('mouseover', this._showMenu.bind(this, toggle, menu));
      container.addEventListener('mouseout', this._hideMenu.bind(this, toggle, menu));
      toggle.addEventListener('click', this._toggleMenu.bind(this, toggle, menu, null));
    };XCHeader.prototype.

    _setupListeners = function _setupListeners() {
      this.$('hamburger').addEventListener('click', this._toggleHamburger);
      this.$('signin-signout-link').addEventListener('click', this.signOut.bind(this));
      this.$('skip').addEventListener('click', this._linkToLocation.bind(this));
      this._setupMenuListeners(
      this.$('personal-li.personal-more'),
      this.$('more-ul'));

    };XCHeader.prototype.

    _linkToLocation = function _linkToLocation(event) {
      var location = event.currentTarget.hash;
      var target = this.querySelector(location);

      event.preventDefault();
      target.scrollIntoView();
      target.focus();
    };_createClass(XCHeader, null, [{ key: 'cssMarkup', get: function get() {return styles;} }, { key: 'htmlMarkup', get: function get() {return markup;} }, { key: 'is', get: function get() {return 'xc-header';} }, { key: 'observedAttributes', get: function get() {return ['client-id', 'disable-controller', 'disable-email-count', 'disable-notifications', 'disable-skip', 'email-count', 'external-links', 'first-name', 'is-authed', 'login-url', 'notifications', 'sign-in-url', 'sign-out-url', 'slimnav', 'state', 'tab', 'width'];} }]);return XCHeader;}(XCBaseMixin(HTMLElement));


  customElements.define(XCHeader.is, XCHeader);

  var markup$1 = "<div class=xc-footer--panels><div class=xc-footer--panel><button class=xc-footer--toggle>Show <span class=xc-footer--toggle-show>More </span><span class=xc-footer--toggle-hide>Less</span></button><h3 class=xc-footer--heading>I Want To</h3><ul class=xc-footer--list><li class=xc-footer--li><a rel=nofollow class=xc-footer--link href=https://customer.xfinity.com/Secure/OneTimePayment>View &amp; Pay Bill</a></li><li class=xc-footer--li><a rel=nofollow class=xc-footer--link href=\"https://login.comcast.net/login?s=wnamp&amp;cid=footer&amp;ts=\">Check Email &amp; Voicemail</a></li><li class=xc-footer--li><a rel=nofollow class=xc-footer--link href=https://customer.xfinity.com/Overview/ >Manage My Account</a></li><li class=xc-footer--li><a rel=nofollow class=xc-footer--link href=https://tv.xfinity.com/listings>Check TV Listings</a></li><li class=xc-footer--li><a rel=nofollow class=xc-footer--link href=https://tv.xfinity.com/ >Watch TV Online</a></li><li class=xc-footer--li><a class=xc-footer--link href=https://www.xfinity.com/support/contact-us>Contact Customer Support</a></li><li class=xc-footer--li><a class=xc-footer--link href=https://www.xfinity.com/apps>Get Apps</a></li><li class=xc-footer--li><a class=xc-footer--link href=http://my.xfinity.com/local/ >Check Local News &amp; Weather</a></li><li class=xc-footer--li><a rel=nofollow class=xc-footer--link href=https://customer.xfinity.com/Secure/OnlineParentalControls.aspx>Manage Parental Controls</a></li><li class=xc-footer--li><a rel=nofollow class=xc-footer--link href=https://constantguard.xfinity.com/ >Download Norton Security</a></li><li class=xc-footer--li><a rel=nofollow class=xc-footer--link href=https://customer.xfinity.com/#/users/me>Manage Users &amp; Alerts</a></li><li class=xc-footer--li><a class=xc-footer--link href=https://www.xfinity.com/password>Reset My Password</a></li><li class=xc-footer--li><a rel=nofollow class=xc-footer--link href=https://customer.xfinity.com/Secure/MyAccount/ >Find My Account Number</a></li><li class=xc-footer--li><a rel=nofollow class=xc-footer--link href=https://home.xfinity.com>Monitor Home Security</a></li><li class=xc-footer--li><a rel=nofollow class=xc-footer--link href=http://store.comcast.com>Purchase Accessories</a></li><li class=xc-footer--li><a class=xc-footer--link href=https://www.xfinity.com/upgrade-center/OffersLink>Upgrade My Service</a></li><li class=xc-footer--li><a rel=nofollow class=xc-footer--link href=https://login.comcast.net/myaccount/lookup>Find My XFINITY Username</a></li><li class=xc-footer--li><a class=xc-footer--link href=https://www.xfinity.com/support/ >Get Help &amp; Support</a></li><li class=xc-footer--li><a class=xc-footer--link href=https://www.xfinity.com/support/remotes>Program My Remote</a></li><li class=xc-footer--li><a rel=nofollow class=xc-footer--link href=\"https://collect.iperceptions.com/?lID=1&amp;rn=123531&amp;pID=1&amp;hs1=102214&amp;hs2=91787&amp;siteID=1&amp;referrer=Link&amp;sdfc=03b756c0-123531-0dcbb1db-cd59-44d5-8c25-4e78d3da0dac&amp;source=91787&amp;destination=commentcard&amp;width=680&amp;height=750\">Submit Feedback</a></li><li class=xc-footer--li><a class=xc-footer--link href=https://www.xfinity.com/support/service-center-locations>Find an XFINITY Store</a></li><li class=xc-footer--li><a class=xc-footer--link href=https://www.xfinity.com/moving>Move My Services</a></li></ul></div><div class=xc-footer--panel><button class=xc-footer--toggle>Show <span class=xc-footer--toggle-show>More </span><span class=xc-footer--toggle-hide>Less</span></button><h3 class=xc-footer--heading>Shop</h3><ul class=xc-footer--list><li class=xc-footer--li><a class=xc-footer--link href=https://www.xfinity.com/Corporate/shop/productoverview.html>Deals &amp; Offers</a></li><li class=xc-footer--li><a class=xc-footer--link href=https://www.xfinity.com/Corporate/Learn/DigitalCable/digitalcable.html>TV</a></li><li class=xc-footer--li><a class=xc-footer--link href=https://www.xfinity.com/internet-service.html>Internet</a></li><li class=xc-footer--li><a class=xc-footer--link href=https://www.xfinity.com/home-phone-service.html>Voice</a></li><li class=xc-footer--li><a class=xc-footer--link href=https://www.xfinity.com/home-security.html>Home Security &amp; Automation</a></li><li class=xc-footer--li><a class=xc-footer--link href=https://www.xfinity.com/compare/comcast-xfinity-vs-verizon-fios.html>Compare the Competition</a></li><li class=xc-footer--li><a rel=nofollow class=xc-footer--link href=https://business.comcast.com/ >Comcast Business</a></li><li class=xc-footer--li><a class=xc-footer--link href=https://www.xfinity.com/locations/in-my-area.html>Deals in My Area</a></li><li class=xc-footer--li><a class=xc-footer--link href=https://www.xfinity.com/Corporate/Learn/Bundles/bundles.html>Bundles</a></li></ul></div><div class=xc-footer--panel><button class=xc-footer--toggle>Show <span class=xc-footer--toggle-show>More </span><span class=xc-footer--toggle-hide>Less</span></button><h3 class=xc-footer--heading>About Comcast</h3><ul class=xc-footer--list><li class=xc-footer--li><a rel=nofollow class=xc-footer--link href=http://corporate.comcast.com/news-information/company-overview>About Comcast</a></li><li class=xc-footer--li><a rel=nofollow class=xc-footer--link href=\"http://www.comcastspotlight.com/onlinemediakit/xfinity.html?cid=112233\">Advertise with Us</a></li><li class=xc-footer--li><a rel=nofollow class=xc-footer--link href=http://jobs.comcast.com/ >Careers</a></li><li class=xc-footer--li><a rel=nofollow class=xc-footer--link href=http://corporate.comcast.com/news-information/news-feed>Press Room</a></li><li class=xc-footer--li><a rel=nofollow class=xc-footer--link href=http://corporate.comcast.com/comcast-voices>Corporate Blog</a></li><li class=xc-footer--li><a rel=nofollow class=xc-footer--link href=http://corporate.comcast.com/ >Corporate Site</a></li><li class=xc-footer--li><a class=xc-footer--link href=https://www.xfinity.com/policies/ >Customer Agreements &amp; Policies</a></li><li class=xc-footer--li><a class=xc-footer--link href=https://www.xfinity.com/Corporate/Customers/Policies/CAVoiceDisclosure.html>XFINITY Voice: Use of Personal Info</a></li><li class=xc-footer--li><a class=xc-footer--link href=\"http://my.xfinity.com/sitemap?cid=footer\">Site Index</a></li></ul></div></div><div class=xc-footer--bottom><div class=xc-footer--bottom-container><a class=xc-footer--comcast-logo href=http://www.xfinity.com>Comcast</a><ul class=xc-footer--terms <!--# echo var=\"UPDATED\" --> ><li class=xc-footer--terms-li><a class=xc-footer--terms-link href=http://my.xfinity.com/adinformation/ >Ad Choices</a></li><li class=xc-footer--terms-li><a class=xc-footer--terms-link href=http://my.xfinity.com/privacy/ id=xc-footer--privacy>Privacy Policy</a></li><li class=xc-footer--terms-li><a class=xc-footer--terms-link href=http://my.xfinity.com/terms/ id=xc-footer--terms>Terms of Service</a></li></ul><ul class=xc-footer--social><li class=xc-footer--social-li><a rel=nofollow class=\"xc-footer--social-link xc-footer--twitter\" href=https://twitter.com/XFINITY>Twitter - Follow us for exclusive deals</a></li><li class=xc-footer--social-li><a rel=nofollow class=\"xc-footer--social-link xc-footer--youtube\" href=\"http://www.youtube.com/user/xfinity?feature=results_main\">YouTube – Find tutorials and demos</a></li><li class=xc-footer--social-li><a rel=nofollow class=\"xc-footer--social-link xc-footer--facebook\" href=http://www.facebook.com/xfinity>Facebook – Reach out on Facebook</a></li></ul></div></div><h4 class=xc-footer--copyright><a class=xc-footer--copyright-link href=http://www.xfinity.com>&#169; &nbsp;<!--# config timefmt=\"%Y\" --><!--# echo var=\"date_gmt\" -->&nbsp;Comcast</a></h4>";

  var styles$1 = "xc-footer{display:block;background:#000;text-align:left;font-family:\"XfinityStandard\", helvetica, arial, sans-serif;font-weight:400}.xc-footer--panels,.xc-footer--bottom-container{margin:0 auto}.xc-footer--panel:first-child{width:100%;padding-top:16px;max-height:999999px}.xc-footer--panel:first-child .xc-footer--list{-moz-column-count:4;-webkit-column-count:4;column-count:4}.xc-footer--panel{display:inline-block;width:50%}.xc-footer--heading{font-size:12px;font-weight:400;line-height:18px;letter-spacing:.5px;margin:0px;padding:20px 0 11px 24px;color:#fff;font-family:\"XfinityStandard\", helvetica, arial, sans-serif;text-transform:uppercase}.xc-footer--list{margin:0px;padding-left:24px;list-style-type:none;-moz-column-count:2;-webkit-column-count:2;column-count:2;overflow:hidden}.xc-footer--link,.xc-footer--terms-link,.xc-footer--copyright-link{font-size:14px;color:#9ba4aa;text-decoration:none;border:1px solid transparent;padding:0 3px;margin-left:-4px}.xc-footer--link:focus,.xc-footer--terms-link:focus,.xc-footer--copyright-link:focus{outline:0;border:1px dotted #a3a3a3;border-radius:4px}.xc-footer--link:hover,.xc-footer--terms-link:hover,.xc-footer--copyright-link:hover{color:#fff}.xc-footer--link{line-height:36px}.xc-footer--button{display:none}.xc-footer--terms-link,.xc-footer--copyright-link{font-size:11px}.xc-footer--bottom{background-color:#191919}.xc-footer--bottom-container{margin-top:23px;align-items:center;display:flex;justify-content:space-between;height:60px}.xc-footer--terms,.xc-footer--social{color:#9ba4aa;list-style-type:none;font-size:11px;line-height:12px;text-align:center;margin:0;padding:0}.xc-footer--terms-li{display:inline-block;padding-right:22px}.xc-footer--terms-li:last-child{padding-right:0}.xc-footer--social-li{display:inline-block;padding-right:10px}.xc-footer--social-li:last-child{padding-right:24px}.xc-footer--social-link,.xc-footer--comcast-logo{background-image:url(\"http://10.0.0.116:3000/sprite.png\");background-size:88px;background-repeat:no-repeat;display:inline-block;border:1px solid transparent;font-size:0;color:#fff}.xc-footer--social-link{height:29px;width:29px;background-position-y:-3px;position:relative;z-index:2}.xc-footer--social-link:before{content:'';position:absolute;width:100%;height:100%;padding:4px;top:-5px;left:-5px;border:1px dotted #a3a3a3;display:none;pointer-events:none;z-index:1;outline:0;border-radius:4px;z-index:1;top:-6px;left:-4px}.xc-footer--social-link:focus{outline:0}.xc-footer--social-link:focus:before{display:block}.xc-footer--twitter{background-position-y:-34px}.xc-footer--youtube{background-position-y:-65px}.xc-footer--terms[terms] #xc-footer--terms:after,.xc-footer--terms[privacy] #xc-footer--privacy:after{content:' (Updated)';color:#fff}.xc-footer--comcast-logo{background-position-y:-94px;background-position-x:2px;box-sizing:content-box;height:29px;margin:0 49px 0 19px;width:85px;padding:4px}.xc-footer--comcast-logo:focus{outline:0;border:1px dotted #a3a3a3;border-radius:4px}.xc-footer--copyright{display:block;background-color:#191919;border-top:1px solid #2A2C2D;margin:0;font-size:11px;line-height:39px;text-align:center}.xc-footer--copyright-link{color:#DDE2E6;font-weight:400}.xc-footer--toggle{display:none}@media only screen and (max-width: 800px){.xc-footer--panel{border-bottom:1px solid #2a2c2d;position:relative;width:100%;z-index:1;padding:0 7px;box-sizing:border-box}.xc-footer--panel:first-child{padding-top:0}.xc-footer--heading,.xc-footer--toggle{font-size:12px;padding:30px 4px 10px 5px}.xc-footer--toggle{display:block;font-size:14px;background:transparent;cursor:pointer;position:absolute;right:7px;color:#2b9cd8;border:1px solid transparent}.xc-footer--toggle:focus{outline:0;border:1px dotted #a3a3a3;border-radius:4px}.xc-footer--list{padding:0 0 18px 0;display:inline-block;-moz-column-count:1 !important;-webkit-column-count:1 !important;column-count:1 !important}.xc-footer--li:nth-child(n+4){display:none}.xc-footer--link{display:block;line-height:34px;margin:1px}.xc-footer--bottom-container{margin:0;flex-direction:column;justify-content:space-around;height:250px}.xc-footer--comcast-logo{height:38px;margin:0;width:100px;background-size:110px;background-position-y:-117px}.xc-footer--social-li:last-child{padding:0}.xc-footer--terms{display:flex;justify-content:space-between;flex-direction:column;height:80px}.xc-footer--terms-li{padding-right:0}.xc-footer--terms-link,.xc-footer--copyright-link{font-size:14px;line-height:18px}.xc-footer--terms-link{padding:0}.xc-footer--toggle-hide{display:none}.xc-footer--panel.xc-opened .xc-footer--toggle-hide{display:inline}.xc-footer--panel.xc-opened .xc-footer--toggle-show{display:none}.xc-footer--panel.xc-opened .xc-footer--li:nth-child(n+4){display:block}}\n";var

  XCFooter = function (_XCBaseMixin2) {_inherits(XCFooter, _XCBaseMixin2);function XCFooter() {_classCallCheck(this, XCFooter);return _possibleConstructorReturn(this, _XCBaseMixin2.apply(this, arguments));}XCFooter.prototype.












    connectedCallback = function connectedCallback() {
      _XCBaseMixin2.prototype.connectedCallback.call(this);
      this._setupEmailTS('a[href*="wnamp"]');
      this.nodesForEach('.xc-footer--toggle', function (toggle) {
        toggle.addEventListener('click', this._toggleOpened);
      });
    };XCFooter.prototype.





    widthChanged = function widthChanged(_, width) {
      if (width) {
        width = parseInt(width, 10) + 48 + 'px';
      } else {
        width = 'none';
      }
      this.$('panels').style.maxWidth = width;
      this.$('bottom-container').style.maxWidth = width;
    };XCFooter.prototype.

    externalLinksChanged = function externalLinksChanged() {
      this.nodesForEach('a', function (link) {
        link.setAttribute('target', '_blank');
      });
    };XCFooter.prototype.

    _toggleOpened = function _toggleOpened(event) {
      event.currentTarget.parentNode.classList.toggle('xc-opened');
    };_createClass(XCFooter, null, [{ key: 'cssMarkup', get: function get() {return styles$1;} }, { key: 'htmlMarkup', get: function get() {return markup$1;} }, { key: 'is', get: function get() {return 'xc-footer';} }, { key: 'observedAttributes', get: function get() {return ['client-id', 'external-links', 'width'];} }]);return XCFooter;}(XCBaseMixin(HTMLElement));

  customElements.define(XCFooter.is, XCFooter);

  var markup$2 = "<span tabindex=0></span><div class=xc-toast--container role=document aria-labelledby=xcToastMessage aria-describedby=xcToastMessageSub><p class=xc-toast--message><span id=xcToastMessage class=xc-toast--message-main></span> <span id=xcToastMessageSub class=xc-toast--message-sub></span></p><a href=# class=xc-toast--action></a> <button class=xc-toast--close><span class=xc-screen-reader-text>Close</span> <svg focusable=false viewBox=\"0 0 100 100\"><line x1=20 y1=20 x2=80 y2=80 /><line x1=20 y1=80 x2=80 y2=20 /></svg></button></div><span tabindex=0></span>";

  var styles$2 = "xc-toast{display:block;text-align:left;font-family:\"XfinityStandard\", helvetica, arial, sans-serif;font-weight:400;position:fixed;bottom:-500px;color:#fff;box-sizing:border-box;width:100%;padding:0 20%;transition:transform 0.3s, opacity 0.3s;opacity:0;transform:translateY(100px)}xc-toast.opened{opacity:1;bottom:12px;z-index:10;transform:translateY(0px)}.xc-screen-reader-text{position:absolute !important;display:block;visibility:visible;overflow:hidden;width:1px;height:1px;margin:-1px;border:0;padding:0;clip:rect(0px, 0px, 0px, 0px);clip-path:polygon(0px 0px, 0px 0px, 0px 0px, 0px 0px)}.xc-toast--container{box-shadow:3px 3px 8px rgba(0,0,0,0.4);background-color:#015383;padding:18px 24px;box-sizing:border-box;display:flex;align-items:center;position:relative;max-width:900px;margin:0 auto}.xc-toast--message{flex:2 1 auto;margin:0 24px 0 0;padding:0}.xc-toast--message-main{display:block;font-size:18px;line-height:28px}.xc-toast--message-sub{font-size:14px;line-height:21px}.xc-toast--action{height:48px;display:inline-block;box-sizing:border-box;width:auto;border-radius:40px;outline:none;padding:12px 30px;font-size:16px;line-height:24px;color:#2b9cd8;border:1px solid #2b9cd8;text-decoration:none;white-space:nowrap;position:relative;z-index:2;margin-right:20px;border-color:#fff;color:#fff}.xc-toast--action:before{content:'';position:absolute;width:100%;height:100%;padding:4px;top:-5px;left:-5px;border:1px dotted #a3a3a3;display:none;pointer-events:none;z-index:1;outline:0;border-radius:40px;box-sizing:content-box}.xc-toast--action:hover:before,.xc-toast--action:active:before{display:block}.xc-toast--action:hover,.xc-toast--action:active{background-color:#00619a;color:#fff;border:1px solid transparent;border-radius:40px !important}.xc-toast--action:focus:before{display:block}.xc-toast--action:focus{background-color:#00619a;color:#fff;border:1px solid transparent;border-radius:40px !important}.xc-toast--action:hover{background:#fff;color:#00619a;border:1px solid transparent}.xc-toast--action:focus{background:#fff;color:#00619a;border:1px solid transparent}.xc-toast--close{border:1px solid transparent;background:transparent;padding:4px 4px 0 4px}.xc-toast--close:focus{outline:0;border:1px dotted #a3a3a3;border-radius:4px}.xc-toast--close svg{width:18px;height:18px;stroke:#fff;stroke-width:5px}.xc-toast--close:hover svg{stroke:#9ba4aa}@media only screen and (max-width: 800px){xc-toast{padding:0 12px}.xc-toast--container{flex-direction:column;justify-content:center;text-align:center;padding:28px 12px 18px}.xc-toast--message{margin:0}.xc-toast--close{position:absolute;top:12px;right:12px}.xc-toast--action{margin:12px 0 0}}\n";var

  XCToast = function (_XCBaseMixin3) {_inherits(XCToast, _XCBaseMixin3);function XCToast() {_classCallCheck(this, XCToast);return _possibleConstructorReturn(this, _XCBaseMixin3.apply(this, arguments));}XCToast.prototype.












    connectedCallback = function connectedCallback() {
      _XCBaseMixin3.prototype.connectedCallback.call(this);

      this._container = this.$('container');
      this._toggle = this._toggle.bind(this);
      this._open = this._open.bind(this);
      this._close = this._close.bind(this);
      this._handleEscape = _XCBaseMixin3.prototype._onEscape.bind(this, this._close);
      this._getButtonTemplate();
      this.$('close').addEventListener('click', this._close);
    };XCToast.prototype.





    openedChanged = function openedChanged(oldValue, newValue) {
      this._toggle(newValue);
    };XCToast.prototype.

    _open = function _open() {
      this._lastFocus = document.activeElement;
      this._firstLink = this.querySelector('a');
      this._firstLink.focus();
      this._captureFocus = _XCBaseMixin3.prototype._captureFocus.bind(this, this._container, this._firstLink);
      document.addEventListener('keydown', this._handleEscape, true);
      document.addEventListener('focus', this._captureFocus, true);
      this.removeEventListener('transitionend', this._open);
    };XCToast.prototype.

    _close = function _close() {
      this.opened = false;
    };XCToast.prototype.

    _toggle = function _toggle(opened) {
      if (opened) {
        this.addEventListener('transitionend', this._open);
        this._hiddenSiblings = this._hideSiblings();
      } else {
        document.removeEventListener('keydown', this._handleEscape);
        document.removeEventListener('focus', this._captureFocus);
        if (this._lastFocus) {
          this._lastFocus.focus();
        }
        this.setAttribute('aria-hidden', 'true');
        this._showSiblings(this._hiddenSiblings);
      }
      this._toggleClass(this, 'opened', opened);
    };XCToast.prototype.

    _getButtonTemplate = function _getButtonTemplate() {
      var buttonContainer = this.$('container');
      var buttonTemplate = this.$('action');
      this._buttonTemplate = buttonContainer.removeChild(buttonTemplate);
    };XCToast.prototype.

    _createButton = function _createButton(link) {
      var buttonNode = this._buttonTemplate.cloneNode(true);
      buttonNode.textContent = link.text;
      buttonNode.href = link.url;
      if (link.target) {
        buttonNode.setAttribute('target', link.target);
      }
      this.$('container').insertBefore(buttonNode, this.$('close'));
    };XCToast.prototype.

    _clearButtons = function _clearButtons() {
      while (this.$('action')) {
        var button = this.$('action');
        button.parentNode.removeChild(button);
      }
    };XCToast.prototype.

    dataChanged = function dataChanged(old, message) {
      if (message) {
        this.$('message-main').textContent = message.main;
        this.$('message-sub').textContent = message.sub;
        this._clearButtons();
        if (message.link) {
          this._createButton(message.link);
        } else if (message.links) {
          message.links.forEach(this._createButton.bind(this));
        }
      }
    };_createClass(XCToast, null, [{ key: 'cssMarkup', get: function get() {return styles$2;} }, { key: 'htmlMarkup', get: function get() {return markup$2;} }, { key: 'is', get: function get() {return 'xc-toast';} }, { key: 'observedAttributes', get: function get() {return ['opened', 'data'];} }]);return XCToast;}(XCBaseMixin(HTMLElement));

  customElements.define(XCToast.is, XCToast);

  /* eslint no-unused-vars: 0 */

})();