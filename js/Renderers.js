/**
 * @license tweeeety v0.8.1
 * (c) 2011-2014 tweeeety, Ryuichi Murata http://tweeeety.com
 * License: MIT
 */
var Renderers = function() {
  var Constructor = function() {
    var _this = this;
    _this._arr = null;
    
    this.baseRenderers = {
      // normal orientation
      // ok
      normal: function(){
        var array = _this.ddm.addTitleRow().get();
        var tbl = _this.arrayToTable(array);
        return tbl;
      },
      sumUpCol: function(){
        var array = _this.ddm.addTitleRow().sumUpCol().get();
        var tbl = _this.arrayToTable(array);
        return tbl;
      },
      aveCol: function(){
        var array = _this.ddm.addTitleRow().aveCol().get();
        var tbl = _this.arrayToTable(array);
        return tbl;
      },
      aveColExceptZero: function(){
        var array = _this.ddm.addTitleRow().aveCol(true,true,true).get();
        var tbl = _this.arrayToTable(array);
        return tbl;
      },
      // rotate orientation
      // ok
      rotateNormal: function(){
        var array = _this.ddm.addTitleRow().rowColRotate().get();
        var tbl = _this.arrayToTable(array);
        return tbl;
      },
      sumUpColRotate: function(){
        var array = _this.ddm.addTitleRow().sumUpCol().rowColRotate().get();
        var tbl = _this.arrayToTable(array);
        return tbl;
      },
      rotateSumUpCol: function(){
        var array = _this.ddm.addTitleRow().rowColRotate().sumUpCol().get();
        var tbl = _this.arrayToTable(array);
        return tbl;
      },
      aveColRotate: function(){
        var array = _this.ddm.addTitleRow().aveCol().rowColRotate().get();
        var tbl = _this.arrayToTable(array);
        return tbl;
      },
      aveColExceptZeroRotate: function(){
        var array = _this.ddm.addTitleRow().aveCol(true,true,true).rowColRotate().get();
        var tbl = _this.arrayToTable(array);
        return tbl;
      },
        
      rotateAveCol: function(){
        var array = _this.ddm.addTitleRow().rowColRotate().aveCol().get();
        var tbl = _this.arrayToTable(array);
        return tbl;
      },
      rotateAveColExceptZero: function(){
        var array = _this.ddm.addTitleRow().rowColRotate().aveCol(true,true,true).get();
        var tbl = _this.arrayToTable(array);
        return tbl;
      }
    };
  };
  Constructor.create = function(ddm, opt){
    var _this = new this;
    _this.ddm = ddm;

    if( typeof opt !== 'object' ) opt = {};
    _this.tableClassName    = opt.tableClassName ? opt.tableClassName : "" ;
    
    _this.addThead          = opt.addThead ? opt.addThead : false ;
    _this.trOddClassName    = opt.trOddClassName ? opt.trOddClassName : "" ;
    _this.trEvenClassName   = opt.trEvenClassName ? opt.trEvenClassName : "" ;
    _this.trHeaderClassName = opt.trHeaderClassName ? opt.trHeaderClassName : "" ;
    _this.tdHeaderClassName = opt.tdHeaderClassName ? opt.tdHeaderClassName : "" ;

    _this.firstRowTd2Th     = opt.firstRowTd2Th ? opt.firstRowTd2Th : "" ;
    _this.firstColTd2Th     = opt.firstColTd2Th ? opt.firstColTd2Th : "" ;
    _this.rendereCallback   = opt.rendereCallback ? opt.rendereCallback : undefined ;
    
    // normal, sumUp, 
    _this.renderName        = opt.renderName ? opt.renderName : 'normal';
 
    return _this;
  };
  Constructor.prototype.render = function(){
    if( !this.renderName ){
      throw "renderName is not defined.";
    }
    if( this.baseRenderers && !this.baseRenderers[this.renderName] ){
      throw "renderName:" + this.renderName + ' is not defined;';
    }
    this.tbl = this.baseRenderers[this.renderName]();
    return this;
  };
  Constructor.prototype.get = function(){
    return this.getTableTag();
  }; 
  Constructor.prototype.getTableObj = function(){
    return this.tbl.get();;
  }; 
  Constructor.prototype.getTableTag = function(){
    return this.tbl.get().outerHTML;
  };
  Constructor.prototype.getInner = function(){
    var tbl = this.tbl.get().innerHTML;
    console.log(tbl);
    return tbl;
  };
  Constructor.prototype.addRenderer = function(name, fn){
    this.baseRenderers[name] = fn;
  };
  Constructor.prototype.addProp = function(name, prop){
    this[name] = prop;
  };
  
  // 配列からtableに変換して表示
  Constructor.prototype.arrayToTable = function(array){
    var _this = this;

    var tbodyObj = SimpleDomManipulator.create("tbody");
    var tblObj = SimpleDomManipulator.create("table");
    
    for( var i=0, iLen=array.length; i<iLen; i++ ){
      var trObj = SimpleDomManipulator.create("tr");
      
      var trClassName = '';
      trClassName = (this.trEvenClassName && this.trOddClassName && i%2==0)? this.trEvenClassName : this.trOddClassName;
      if( i==0 && typeof this.trHeaderClassName == 'string') trClassName += ' ' + this.trHeaderClassName;
      trObj.addClass(trClassName);
      
      for( var j=0, jLen=array[i].length; j<jLen; j++ ){
        var tdObj;
        if( i==0 ){
          tdObj = ( this.firstRowTd2Th ) ? SimpleDomManipulator.create("th") : SimpleDomManipulator.create("td");
        }else{
          tdObj = ( this.firstColTd2Th && j==0 ) ? SimpleDomManipulator.create("th") : SimpleDomManipulator.create("td");
          if( j==0 && typeof this.tdHeaderClassName == 'string') tdObj.addClass(_this.tdHeaderClassName);
        }
        tdObj.text( array[i][j] );
        trObj.append(tdObj);
      }
      // trObj append to thead or tbody
      if(this.addThead && i==0){
        var theadObj = SimpleDomManipulator.create("thead");
        tblObj.append(theadObj.append(trObj));
      }else{
        tbodyObj.append(trObj);
      }
    }
    // tbody append to table
    tblObj.append(tbodyObj).addClass(this.tableClassName);
    return tblObj;
  };
  return Constructor;
}();
