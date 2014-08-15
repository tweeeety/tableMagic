/**
 * @license TableMagic v0.8.1
 * (c) 2011-2014 tweeeety, Ryuichi Murata http://tweeeety.com
 * License: MIT
 */
var SimpleDomManipulator = function() {
  var Constructor = function() {
    this.simpleDom = null;
  };
  Constructor.create = function(elm) {
    var _this = new this();
    var dom = document.createElement(elm);
    _this.simpleDom = dom;
    return _this;
  }
  Constructor.prototype.attr = function(attr, val) {
    this.simpleDom.setAttribute(attr,val);
    return this;
  }
  Constructor.prototype.text = function(text) {
    var textNode = document.createTextNode(text)
    this.simpleDom.appendChild(textNode);
    return this;
  }
  Constructor.prototype.addClass = function(className) {
    if( !className ) return this;
    this.simpleDom.setAttribute("class",className);
    this.simpleDom.setAttribute("className",className);
    return this;
  }
  Constructor.prototype.append = function(content) {
    var dom = ( content instanceof SimpleDomManipulator ) ? content.get() : content;
    this.simpleDom.appendChild(dom);
    return this;
  }
  Constructor.prototype.get = function() {
    return this.simpleDom;
  }
  return Constructor;
}();
