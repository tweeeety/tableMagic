/**
 * @license tweeeety v0.8.1
 * (c) 2011-2014 tweeeety, Ryuichi Murata http://tweeeety.com
 * License: MIT
 */
//;(function(global, $) {
var TableMagic = ( function(TableMagic, undefined ) {
  var TableMagic = function(data, opt){
    this.data = data;
    
    if( !(opt != null && opt instanceof Object && !(opt instanceof Array)) ) opt = {};
    this.orderArr = opt.titleOrderArr || undefined;
    this.titleHash = opt.titleHash || undefined;
    this.opt = opt;
    this.initialize();
  };
  /*----------------
   * initialize
   ----------------*/
  TableMagic.prototype.initialize = function(){
    var ddm = DbDataManipulator.create(this.data, this.orderArr, this.titleHash, {label:{sum:"合計", ave:"平均"}, noTitleRow: this.opt.noTitleRow||false});
    this.r = Renderers.create(ddm, this.opt);
    return this;
  };
  /*----------------
   * accessor
   ----------------*/
  TableMagic.prototype.get = function(){
    return this.getTableTag();
  };
  TableMagic.prototype.getTableTag = function(){
    if( !this.r ) return false;
    return this.r.render().get();
  };
  TableMagic.prototype.getInner = function(){
    if( !this.r ) return false;
    return this.r.render().getInner();
  };
  return TableMagic;
})({});
