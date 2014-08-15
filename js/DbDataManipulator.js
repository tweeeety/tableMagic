/**
 * @license TableMagic v0.8.1
 * (c) 2011-2014 tweeeety, Ryuichi Murata http://tweeeety.com
 * License: MIT
 */
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
