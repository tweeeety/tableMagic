alert(1);
/*
VARIATION OF options.render
  normal
  sumUpCol
  aveCol
  aveColExceptZero
  rotateNormal
  sumUpColRotate
  rotateSumUpCol
  aveColRotate
  aveColExceptZeroRotate
  rotateAveCol
  rotateAveColExceptZero
*/
;(function(global, $) {
/***************************************
 * Constractor
 */
var TableMagic = function(obj){
  
  if( !obj ) obj = {};
  this.tableClassName    = obj.tableClassName ? obj.tableClassName : "" ;
  
  this.addThead          = obj.addThead ? obj.addThead : false ;
  this.trOddClassName    = obj.trOddClassName ? obj.trOddClassName : "" ;
  this.trEvenClassName   = obj.trEvenClassName ? obj.trEvenClassName : "" ;
  this.trHeaderClassName = obj.trHeaderClassName ? obj.trHeaderClassName : "" ;
  this.tdHeaderClassName = obj.tdHeaderClassName ? obj.tdHeaderClassName : "" ;

  this.firstRowTd2Th     = obj.firstRowTd2Th ? obj.firstRowTd2Th : "" ;
  this.firstColTd2Th     = obj.firstColTd2Th ? obj.firstColTd2Th : "" ;
  this.rendereCallback   = obj.rendereCallback ? obj.rendereCallback : undefined ;
  
  // normal, sumUp, 
  this.render            = obj.render ? obj.render : 'normal';

};

/***************************************
 * Member
 */
TableMagic.prototype = {
  _table : undefined,
  _baseTableArray : undefined,
  _newTableArray  : undefined
}
  
/***************************************
 * Method
 */

TableMagic.prototype = {
  /*----------------
   * initialize
   ----------------*/
  initialize: function(data, titleOrderArr, titleHash){
    _this = this;
    
    var array = _this.makeArray(data, titleOrderArr, titleHash);
    //console.log(typeof _this.renderers(_this.render));
    if(typeof _this.renderers(_this.render) == 'undefined'){
      alert("Option that does not exist is specified : " + _this.render );
      return;
    }
    
    _this.set_baseTableArray(array);
    
    var tbl = _this.renderers(_this.render)();
    
    _this.set_table(tbl);
    
    var callbackFunc = _this.lineMarker.bind(this);
    if(_this.rendereCallback && typeof _this.rendereCallback == 'function'){
      callbackFunc = _this.rendereCallback.bind(this);
    }
    callbackFunc();
    
    return _this;
  },
  /*----------------
   * renderers
   ----------------*/
  renderers : function(render){
    var _this = this;
    return {
      // normal orientation
      // ok
      normal: function(){
        var array = _this.get_baseTableArray();
        var tbl   = _this.arrayToTable(array);
        return  tbl;
      },
      sumUpCol: function(){
        var array = _this.get_baseTableArray();
            array = _this.sumUpCol(array);
        var tbl   = _this.arrayToTable(array);
        return tbl;
      },
      aveCol: function(){
        var array = _this.get_baseTableArray();
            array = _this.aveCol(array);
        var tbl   = _this.arrayToTable(array);
        return tbl;
      },
      aveColExceptZero: function(){
        var array = _this.get_baseTableArray();
            array = _this.aveCol(array, true);
        var tbl   = _this.arrayToTable(array);
        return tbl;
      },
      // rotate orientation
      // ok
      rotateNormal: function(){
        var array = _this.get_baseTableArray();
            array = _this.arrayRowColRotate(array);
        var tbl   = _this.arrayToTable(array);
        return  tbl;
      },
      sumUpColRotate: function(){
        var array = _this.get_baseTableArray();
            array = _this.sumUpCol(array);
            array = _this.arrayRowColRotate(array);
        var tbl   = _this.arrayToTable(array);
        return tbl;
      },
      rotateSumUpCol: function(){
        var array = _this.get_baseTableArray();
            array = _this.arrayRowColRotate(array);
            array = _this.sumUpCol(array);
        var tbl   = _this.arrayToTable(array);
        return tbl;
      },
        
      aveColRotate: function(){
        var array = _this.get_baseTableArray();
            array = _this.aveCol(array);
            array = _this.arrayRowColRotate(array);
        var tbl   = _this.arrayToTable(array);
        return tbl;
      },
      aveColExceptZeroRotate: function(){
        var array = _this.get_baseTableArray();
            array = _this.aveCol(array, true);
            array = _this.arrayRowColRotate(array);
        var tbl   = _this.arrayToTable(array);
        return tbl;
      },
        
      rotateAveCol: function(){
        var array = _this.get_baseTableArray();
            array = _this.arrayRowColRotate(array);
            array = _this.aveCol(array);
        var tbl   = _this.arrayToTable(array);
        return tbl;
      },
      rotateAveColExceptZero: function(){
        var array = _this.get_baseTableArray();
            array = _this.arrayRowColRotate(array);
            array = _this.aveCol(array, true);
        var tbl   = _this.arrayToTable(array);
        return tbl;
      }
    }[render];
  },

  /*----------------
   * convert db data
   ----------------*/
  // タイトル用配列生成
  makeTitleArray: function(titleOrderArr, titleHash){
    var titleRowArray = [];
    for ( var i=0, len = titleOrderArr.length; i < len ; i++ ){
      titleRowArray.push(titleHash[titleOrderArr[i]]);
    }
    return titleRowArray;
  },
  makeTitleOrderArrFromDbData: function(data){
    if( !data || data.length == 0 ) return [];
    var row = data[0];
    var arr = [];
    for( var key in row ){
      arr.push(key);
    }
    return arr;
  },
  dbData2Array: function(data, titleOrderArr){
    var array = [];
    for ( var n in data ){
      var colArray = [];
      for ( var i=0, len = titleOrderArr.length; i < len ; i++ )
      {
        if(data[n][titleOrderArr[i]] == undefined) data[n][titleOrderArr[i]] = 0 ;
        colArray.push(data[n][titleOrderArr[i]]) 
      }
      array.push(colArray);
    }
    return array;
  },
  data2Array: function(data, titleOrderArr, titleHash){
    var titleRowArray = this.makeTitleArray(titleOrderArr, titleHash);
    var array         = this.dbData2Array(data, titleOrderArr);
    array.unshift(titleRowArray);
    return array;
  },
  makeArray: function(data, titleOrderArr, titleHash){
    _this = this;
    var array = [];
    if(!titleOrderArr && !titleHash){
      titleOrderArr = _this.makeTitleOrderArrFromDbData(data);
      array = _this.dbData2Array(data, titleOrderArr);
    }else if(!titleHash){
      array = _this.dbData2Array(data, titleOrderArr);
    }else{
      array = _this.data2Array(data, titleOrderArr, titleHash);
    }
    return array;
  },
  /*----------------
   * accessor
   ----------------*/
  get: function(){
    return _this.get_table();
  },
  get_table : function(){
    return this._table;
  },
  set_table : function(table){
    this._table = table;
  },
  get_baseTableArray : function(){
    return this._baseTableArray;
  },
  set_baseTableArray : function(array){
    this._baseTableArray = array;
  },
  get_newTableArray : function(){
    return this._newTableArray;
  },
  set_newTableArray : function(array){
    this._newTableArray = array;
  },
    
  /*----------------
   * array manipulations
   ----------------*/
  // 配列からtableに変換して表示
  arrayToTable  : function(array){
    
    var _this = this;
    if(array == undefined) array = this.get_baseTableArray();
    
    var tblObj = $("<table>");
    var tbodyObj = $("<tbody>");
    for( var i=0, iLen=array.length; i<iLen; i++ ){
      
      var trClassName = '';
      trClassName = (this.trEvenClassName && this.trOddClassName && i%2==0)? this.trEvenClassName : this.trOddClassName;
      if( i==0 && typeof this.trHeaderClassName == 'string') trClassName += ' ' + this.trHeaderClassName;
      var trObj = $("<tr>").addClass(trClassName);
      
      for( var j=0, jLen=array[i].length; j<jLen; j++ ){
        var tdObj;
        if( i==0 ){
          tdObj = ( this.firstRowTd2Th ) ? $("<th>") : $("<td>");
        }else{
          tdObj = ( this.firstColTd2Th && j==0 ) ? $("<th>") : $("<td>");
          if( j==0 && typeof this.tdHeaderClassName == 'string') tdObj.addClass(this.tdHeaderClassName);
        }
        tdObj.html(array[i][j]);
        
        trObj.append(tdObj);
      }
      
      // trObj append to thead or tbody
      if(this.addThead && i==0){
        tblObj.append($("<thead>").append(trObj));
      }else{
        tbodyObj.append(trObj);
      }
    }
    // tbody append to table
    tblObj.append(tbodyObj).addClass(this.tableClassName);
    return tblObj;
  },
    
  // 配列の行列反転
  arrayRowColRotate : function(array){
    if(array == undefined) array = this.get_baseTableArray();
    
    //tblRowArray
    var newArray = [];
    for(var i=0,iLen = array.length; i<iLen; i++){
      for(var j=0,jLen = array[i].length; j<jLen; j++){
        if(newArray[j] == undefined)newArray[j] = [];
        newArray[j].push(array[i][j]);
        //newArray[j].unshift(array[i][j]) //unshiftだとさらに行列を反転したような感じになる
        //newArray[j][iLen-i] = array[i][j];
      }
    }
    this.set_newTableArray(newArray);
    return newArray;
  },
    
  // sumup
  sumUpCol : function(array){
    var sumUpArray  = [];
    for(var row=0, rowLen = array.length; row<rowLen; row++){
      for(var col=0, colLen = array[row].length; col<colLen; col++){
        if(row == 0){
          continue;
        }
        if(col == 0){
          sumUpArray[col] = "合計";
          continue
        }
        if(sumUpArray[col] == undefined) sumUpArray[col] = 0;
        sumUpArray[col] = sumUpArray[col] + parseInt(array[row][col],10);
      }
    }
    array.push(sumUpArray);
    return array;
  },
    
  aveCol : function(array, exceptZero){
    if(typeof exceptZero != 'boolean') exceptZero = false;
    var aveArray  = [];
    var sumUpArray  = [];
    //var rowLen = array.length;
    var intCntArray = []; // 有効数字の個数配列
    for(var row=0, rowLen=array.length; row<rowLen; row++){
      for(var col=0, colLen = array[row].length; col<colLen; col++){
        if(row == 0){
          continue;
        }
        if(col == 0){
          sumUpArray[col] = "平均";
          continue
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
    return array;
  },
  /*----------------
   * table manipulations
   ----------------*/
/*
  // tableデータを回転main
  tableRowColReverse : function(){
    if(this.get_newTableArray()){
      this.arrayToTable(this.get_newTableArray());
    }
    else
    {
      this.tableToArray();
      var newArray = this.arrayRowColRotate();
      this.arrayToTable(newArray);
    }
  },
  // 指定されたtableデータを配列に格納
  tableToArray  : function(){
    var tblRowArray = [];
    var tblObj      = $("." + this.divClassName).find("table");
    
    var trHeaderFlg = this.trHeaderFlg;
    var tdHeaderFlg = this.tdHeaderFlg;
    
    tblObj.find('tr').each(function(row){
      var tblColArray = [];
      $(this).find('th').each(function(col){
        if( (trHeaderFlg && row==0) || (tdHeaderFlg && col==0) ){
          tblColArray.push($(this).html());
        }else{
          tblColArray.push($(this).text());
        }
      });
      $(this).find('td').each(function(col){
        if( (trHeaderFlg && row==0) || (tdHeaderFlg && col==0) ){
          tblColArray.push($(this).html());
        }else{
          tblColArray.push($(this).text());
        }
      });
      tblRowArray.push(tblColArray);
    });
    
    // trueの場合は列に対して集計を行い集計した行を追加する
    if(this.colSumUpFlg){
      tblRowArray = this.sumUpCol(tblRowArray);
    }
    
    // trueの場合は列に対して集計を行い集計した行を追加する
    if(this.colAveFlg){
      tblRowArray = this.sumUpCol(tblRowArray);
    }
    
    //return tblRowArray;
    this.set_baseTableArray(tblRowArray);
  },
  
  tableRowColRotate : function(){
    this.arrayToTable(this.get_baseTableArray());
  },
  
  sumUpAndArrayToTable : function(array){
    if(this.colSumUpFlg){
      array = this.sumUpCol(array)
    }else if(this.colAveFlg){
      array = this.aveCol(array)
    }
    this.arrayToTable(array);
  }
*/

  /*----------------
   * callback
   ----------------*/
  lineMarker: function(elm){
    var _this = this;
    var table = _this.get_table();
    
    var rowMarkerClass = 'cell07';
    var colMarkerClass = 'cell08';
    
    var addMarkerCss = function(elm){
      elm.css({'background': '#ff0000'});
    };
    var removeMarkerCss = function(){
      elm.css({'background': ''});
    }
    
    
    // mark row
    table.find("."+_this.tdHeaderClassName).each(function(){
      //if($(this).parent("tr").hasClass(_this.trHeaderClassName)) return true;
      $(this).on("click", function(){
        $(this).toggleClass(rowMarkerClass);
        $(this).parent("tr").find("td").toggleClass(rowMarkerClass);
      });
    });
    
    // mark col
    var tdOrTh = _this.firstRowTd2Th ? 'th' : 'td';
    table.find("."+_this.trHeaderClassName).find(tdOrTh).each(function(){
    //table.find("."+_this.trHeaderClassName).find("td").each(function(){
      $(this).on("click", function(){
        var index = $(this).parent("tr").find(tdOrTh).index(this);
        //console.log(index);
        
        var trElements;
        if(_this.addThead){
          trElements = $(this).parent("tr").parent("thead").parent('table').find('tr');
        }else{
          trElements = $(this).parent("tr").parent('table').find('tr');
        }
        //console.log(trElement.size());
        trElements.each(function(){
          $(this).children().eq(index).toggleClass(colMarkerClass);
        });
      });
    });
  }

};
$.fn.tableMagic = function(data, titleOrderArr, titleHash, options){
  // check arguments
  if(!data) {
    alert("error table magic data");
    return false;
  };
  
  // backup this
  var elm = this;
  
  // default options
  var opts = $.extend({}, $.fn.tableMagic.defaults, options);
  
  // tableMagic instance
  var tm = new TableMagic(opts);
  
  var table = tm.initialize(data, titleOrderArr, titleHash).get();
  
  elm.html(table);
  return this;
}

$.fn.tableMagic.defaults = {
  tableClassName    : "table table-bordered",
    
  addThead          : true,
  trOddClassName    : "trOdd",
  trEvenClassName   : "trEven",
  trHeaderClassName : "trHeader",
  tdHeaderClassName : "tdHeader",
    
  firstRowTd2Th     : true,
  firstColTd2Th     : true,
  rendereCallback   : null,
    
  render            : "normal"
};
  
global.TableMagic = TableMagic;
}(window || {}, jQuery));


/*

var titleOrderArr = ['totaled_date', 'dau','entry','invite','mau','sales','sales_dau','sales_mau','sales_uu'];
var titleHash = {
  dau: 'dau',
  entry: '登録者',
  invite: '招待者',
  mau: 'mau',
  sales: '売上',
  sales_dau: '売上day',
  sales_mau: '売上mau',
  sales_uu: '売上uu',
  totaled_date: "日付"
};
var testdata = [
  {"totaled_date":"2014-01-16","entry":"2","invite":"0","sales":"65422","sales_dau":3,"sales_mau":33,"sales_uu":0,"mau":37,"dau":14},
  {"totaled_date":"2014-01-17","entry":"2","invite":"0","sales":"2039","sales_dau":2,"sales_mau":33,"sales_uu":1,"mau":37,"dau":14},
  {"totaled_date":"2014-01-24","entry":"3","invite":"0","sales":"348120","sales_dau":8,"sales_mau":37,"sales_uu":0,"mau":43,"dau":0},
  {"totaled_date":"2014-01-25","entry":"1","invite":"0","sales":"14570","sales_dau":4,"sales_mau":39,"sales_uu":1,"mau":45,"dau":0},
  {"totaled_date":"2014-01-26","entry":"4","invite":"0","sales":"14600","sales_dau":1,"sales_mau":39,"sales_uu":0,"mau":45,"dau":0}
];

$(function(){
  $('.table-kpi').tableMagic(testdata, titleOrderArr, titleHash);
});
*/