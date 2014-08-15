/**
 * @license tweeeety v0.8.1
 * (c) 2011-2014 tweeeety, Ryuichi Murata http://tweeeety.com
 * License: MIT
 */
//;(function(global, $) {
var TableMagic = ( function(TableMagic, undefined ) {
  // SimpleDomManipulator
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
  
  // Renderers
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
  
  // DbDataManipulator
  var DbDataManipulator = function() {
    var Constructor = function() {
      this._dbData = [];
      this._orderArr = [];
      this._titleHash = {};
      this._baseTableArray = [];
      this._newTableArray = null;
    };
    Constructor.create = function(data, orderArr, titleHash, opt){
      var _this = new this;
      if( typeof opt == 'undefined' ) opt = {};
      if( typeof opt.label == 'undefined' ) opt.label = {
        'sum' : 'sum',
        'ave' : 'ave'
      };
      _this.label = opt.label;
      
      if( typeof opt.noTitleRow == 'undefined' ) _this.noTitleRow = false;
      _this.noTitleRow = opt.noTitleRow;
      
      if( typeof opt.rotate == 'undefined' ) opt.rotate = false;
      _this.rotate = opt.rotate;
      
      _this._dbData = data;
      if(!orderArr) orderArr = _this._dbData2OrderArr(data);
      _this._orderArr = orderArr;
      _this._titleHash = titleHash;
      
      // default
      _this.addedTitle = false;
      
      _this.toArray();
      //if( opt.title )_this.addTitle();
      //if( opt.rotate ) _this.rowColRotate();
      return _this;
    };
    Constructor.prototype._dbData2OrderArr = function(data){
      if( !data || data.length == 0 ) return [];
      var row = data[0];
      var arr = [];
      for( var key in row ){
        arr.push(key);
      }
      return arr;
    };
    Constructor.prototype.toArray = function(){
      var array = [];
      //if(!this._orderArr) this._orderArr = this._dbData2OrderArr(data);
      array = this._dbData2Array(this._dbData, this._orderArr );
      
      //var titleRowArray = this.makeTitleRowArray(orderArr, titleHash);
      //array.unshift(titleRowArray);
      this.set_baseTableArray(array);
      this.set_newTableArray(array);
      return this;
    };
    Constructor.prototype._dbData2Array = function(data, orderArr){
      var arr = [];
      for ( var n in data ){
        var colArray = [];
        for ( var i=0, len=orderArr.length; i < len ; i++ )
        {
          if(data[n][orderArr[i]] == undefined) data[n][orderArr[i]] = 0 ;
          colArray.push(data[n][orderArr[i]]);
        }
        arr.push(colArray);
      }
      return arr;
    };
    Constructor.prototype.addTitleRow = function(){
      if( this.noTitleRow ) return this;
      var arr = this.get_newTableArray();
      var titleRowArray = this.makeTitleRowArray();
      arr.unshift(titleRowArray);
      this.set_newTableArray(arr);
      this.addedTitle = true;
      return this;
    };
    Constructor.prototype.makeTitleRowArray = function(){
      if( typeof this._titleHash === 'undefined' ) return this._orderArr;
      var titleRowArray = [];
      for ( var i=0, len = this._orderArr.length; i < len ; i++ ){
        titleRowArray.push(this._titleHash[this._orderArr[i]]);
      }
      return titleRowArray;
    };
    Constructor.prototype.get = function(){
      return this.getArray();
    };
    Constructor.prototype.getArray = function(){
      return this._newTableArray ? this._newTableArray : this._baseTableArray;
    };
    Constructor.prototype.get_baseTableArray = function(){
      return this._baseTableArray;
    };
    Constructor.prototype.set_baseTableArray = function(array){
      this._baseTableArray = array;
    };
    Constructor.prototype.get_newTableArray = function(){
      return this._newTableArray;
    };
    Constructor.prototype.set_newTableArray = function(array){
      this._newTableArray = array;
    };
    Constructor.prototype.rowColRotate = function(){
      var array = this.get_newTableArray();
      //tblRowArray
      var newArray = [];
      for(var i=0,iLen = array.length; i<iLen; i++){
        for(var j=0,jLen = array[i].length; j<jLen; j++){
          if(newArray[j] == undefined)newArray[j] = [];
          newArray[j].push(array[i][j]);
          //newArray[j].unshift(array[i][j]) //unshiftだとさらに行列を反転
          //newArray[j][iLen-i] = array[i][j];
        }
      }
      this.set_newTableArray(newArray);
      return this;
    };
    Constructor.prototype.sumUpCol = function(exceptRowTitle, exceptColTitle){
      if( typeof exceptRowTitle == 'undefined' ) exceptRowTitle = true;
      if( typeof exceptColTitle == 'undefined' ) exceptColTitle = true;
      var array = this.get_newTableArray();
      var sumUpArray  = [];
      for(var row=0, rowLen = array.length; row<rowLen; row++){
        for(var col=0, colLen = array[row].length; col<colLen; col++){
          if(exceptRowTitle && row == 0){
            continue;
          }
          if(exceptColTitle && col == 0){
            sumUpArray[col] = this.label.sum;
            continue
          }
          if(sumUpArray[col] == undefined) sumUpArray[col] = 0;
          sumUpArray[col] = sumUpArray[col] + parseInt(array[row][col],10);
        }
      }
      array.push(sumUpArray);
      this.set_newTableArray(array);
      return this;
    };
    Constructor.prototype.aveCol = function(exceptRowTitle, exceptColTitle, exceptZero){
      if( typeof exceptRowTitle == 'undefined' ) exceptRowTitle = true;
      if( typeof exceptColTitle == 'undefined' ) exceptColTitle = true;
      if( typeof exceptZero == 'undefined' ) exceptZero = false;
      
      var array = this.get_newTableArray();
      var aveArray  = [];
      var sumUpArray  = [];
      //var rowLen = array.length;
      var intCntArray = []; // 有効数字の個数配列
      for(var row=0, rowLen=array.length; row<rowLen; row++){
        for(var col=0, colLen = array[row].length; col<colLen; col++){
          if(exceptRowTitle && row == 0){
            continue;
          }
          if(exceptColTitle && col == 0){
            sumUpArray[col] = this.label.ave;
            continue;
          }
          if(sumUpArray[col] == undefined) sumUpArray[col] = 0;
          sumUpArray[col] = sumUpArray[col] + parseInt(array[row][col],10);
          
          if(intCntArray[col] == undefined) intCntArray[col] = 0;
          if(exceptZero && parseInt(array[row][col],10) == 0 ) continue;
          intCntArray[col]++;
        }
      }
      for (var idx=0; idx<sumUpArray.length; idx++){
        if(idx == 0) 
        {
          aveArray[idx] = sumUpArray[idx];
          continue;
        }
        aveArray[idx] = ( !intCntArray[idx] ) ? 0 : (sumUpArray[idx] / intCntArray[idx]).toFixed(1);
      }
      array.push(aveArray);
      this.set_newTableArray(array);
      return this;
    };
    return Constructor;
  }();
  
  // TableMagic
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
