/**
 * @license TableMagic v0.8.1
 * (c) 2011-2014 tweeeety, Ryuichi Murata http://tweeeety.com
 * License: MIT
 */
//;(function(global, $) {
var TableMagic = ( function(TableMagic, undefined ) {
  var TableMagic = function(data, orderArr, titleHash, opt){
    this.data = data;
    this.orderArr = orderArr;
    this.titleHash = titleHash;
    if( !(opt instanceof Object && !(opt instanceof Array)) ) opt = {};
    this.opt = opt;
     this.initialize();
  };
  /*----------------
   * accessor
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
  TableMagic.prototype.lineMarker = function(elm){
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
  };
  return TableMagic;
})({});




// これでtableタグを返却する
// tm.get()やtm.getTd()でも動作する
// ってことはinitializeは初期化まで
// タグの生成はどこでやる？→arrayまでやってタグの生成やrendarはgetとかでやったほうがいいかも

//この人がやりたい機能
/*
・データを渡すとtableタグを生成してくれる
　→返却する順番を考える
　　作るmethod、返却メソッド別
・opt.renderによって返すテーブルタグの形を変える

・データを後から渡すことができるかどうか
　→できる
*/

//できたらいいな機能
/*
・データの中身(tdタグだけ)を返却する
・後からrendererの指定で違う形のテーブルタグも返却してくれる
*/


//var table = tm.initialize(testdata, orderArr, titleHash).get();


//tm.getTableTag();
//tm.getTdTag();
//tm.getTbodyTag();



//##########################################################ここまで







/*
$.fn.tableMagic = function(data, orderArr, titleHash, options){
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
  
  var table = tm.initialize(data, orderArr, titleHash).get();
  
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
//}(window || {}, jQuery));

*/


















/*
$(function(){
  $('.table-kpi').tableMagic(testdata, orderArr, titleHash);
});

*/
