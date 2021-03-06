tableMagic
==========
json形式で受け取ったDBデータからテーブルタグ(table)を生成するだけの  
シンプルなjs libraryとjquery pluginです

* /js/tablemagic.js(jsライブラリ)
* /js/jquery.tablemagic.js(jqueryプラグイン)  

とがあります。


## Description
json形式のMySQLデータなどをテーブルタグ(table)に変換して指定したjqueryのcontentに埋め込みます。  

また、オプションにより以下のことができます

* テーブルタグの生成(と、jquery contentへの埋め込み)
* 1レコード内の表示順序の制御
* レコードのタイトル文字列の指定
* 簡易集計(列での合計、平均、またはその有無)
* 描画後のcallback呼び出し
* データの行と列の回転

####補足1
名前の由来は作った当初、[imageMagic](http://www.imagemagick.org/script/perl-magick.php)を触ってたのでなんとなくパクりましたw

####補足2
tablemagic.js(jsライブラリ)のほうはjqueryに依存せずに使えます


## Demo
### サンプルデータ
描画サンプルとして3パターンくらい載せますが、  
パターンに共通したデータはこんな感じ  
```javascript
var sampleData = [
  {"totaled_date":"2014-01-16","entry":"2","invite":"0","sales":"65422","sales_dau":3,"sales_mau":33,"sales_uu":0,"mau":37,"dau":14},
  {"totaled_date":"2014-01-17","entry":"2","invite":"0","sales":"2039","sales_dau":2,"sales_mau":33,"sales_uu":1,"mau":37,"dau":14},
  {"totaled_date":"2014-01-24","entry":"3","invite":"0","sales":"348120","sales_dau":8,"sales_mau":37,"sales_uu":0,"mau":43,"dau":0},
  {"totaled_date":"2014-01-25","entry":"1","invite":"0","sales":"14570","sales_dau":4,"sales_mau":39,"sales_uu":1,"mau":45,"dau":0},
  {"totaled_date":"2014-01-26","entry":"4","invite":"0","sales":"14600","sales_dau":1,"sales_mau":39,"sales_uu":0,"mau":45,"dau":0}
];
```
※実際はajaxなんかを使ってjson形式で受け取ると思いますが、ここではjsonで受け取った体で変数へ入れてます

### sample01
説明よりサンプルをってことで、以下は一番シンプルなサンプルです  

* html
```html
<div id="my-table"></div>

<script src="http://code.jquery.com/jquery-latest.js"></script>
<script src="js/jquery.tablemagic.js"></script>
<script>
$(function(){
  $("#my-table").tableMagic(sampleData);
});
</script>
```
* 結果  

![image](https://github.com/tweeeety/tableMagic/blob/master/sample/tableMagicSample01.png)

### sample02
オプションで以下を指定したサンプルです
>
* 1レコード内の表示順序
* タイトル文字列

* html
```html
<div id="my-table"></div>

<script src="http://code.jquery.com/jquery-latest.js"></script>
<script src="js/jquery.tablemagic.js"></script>
<script>
$(function(){
  // title行の順番を指定
  var titleOrderArr = ['totaled_date', 'dau','entry','invite','mau','sales','sales_dau','sales_mau','sales_uu'];
  
  // title行の文字列を指定
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
  
  // オプション指定
  var opt = {
    titleOrderArr : titleOrderArr,
    titleHash : titleHash
  };
  $("#my-table").tableMagic(sampleData, opt);
});
</script>
```

* 結果  

![image](https://github.com/tweeeety/tableMagic/blob/master/sample/tableMagicSample02.png)


### sample03
以下を指定した形のサンプルです
>
* 1レコード内の表示順序
* タイトル文字列
* 集計する(sum)＆表を回転してtable描画

renderNameオプションでいくつかの描画(tableタグの生成)形式が指定できます

* html
```html
<div id="my-table"></div>

<script src="http://code.jquery.com/jquery-latest.js"></script>
<script src="js/jquery.tablemagic.js"></script>
<script>
$(function(){
  // title行の順番を指定
  var titleOrderArr = ['totaled_date', 'dau','entry','invite','mau','sales','sales_dau','sales_mau','sales_uu'];
  
  // title行の文字列を指定
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
  
  // オプション指定
  var opt = {
    titleOrderArr : titleOrderArr,
    titleHash : titleHash,
    renderName : "sumUpColRotate",
  };
  $("#my-table").tableMagic(sampleData, opt);
});
</script>
```

* 結果  

![image](https://github.com/tweeeety/tableMagic/blob/master/sample/tableMagicSample03.png)


## Requirement
jQueryプラグインで使う場合はもちろんjqueryが必要です。  
jqバージョンでの動作確認まではしてませんが、だいたい使えるんじゃなかなー思います。  
```javascript
<script src="http://code.jquery.com/jquery-latest.js"></script>
```

## Usage
###基本
基本の使い方
```html
<!-- jquery -->
<script src="http://code.jquery.com/jquery-latest.js"></script>

<!-- script -->
<script src="js/jquery.tablemagic.js"></script>
<script>
$(function(){
  $("#my-table").tableMagic(sampleData, opt);
});
</script>
```

tablemagic.js(talbeMagic`j`.jsではない)は、javascritライブラリです。  
こんな感じで使うことでtableタグを返却します
```html
<script src="js/tablemagic.js"></script>
<script>
var table = new TableMagic(data, opts).get();
console.log(table); // <table>...</table>
</script>
```

###Options
tableMagicに引数で渡すオプションです

* `titleOrderArr` [array] … タイトル行の順序指定配列

* `titleHash` [object] … タイトル文字列の連想配列

* `tableClassName` [string] … tableタグに挿入するclass名 

* `noTitleRow` [boolean] … タイトル行の有り無し

* `addThead` [boolean] … Theadタグの挿入の有無

* `trOddClassName` [string] … 奇数行のtrタグに挿入するclass名

* `trEvenClassName` [string] … 偶数行のtrタグに挿入するclass名

* `trHeaderClassName` [string] … タイトル行(1行目)のtrタグに挿入するclass名

* `tdHeaderClassName` [string] … タイトル列(1列目)のtdタグに挿入するclass名

* `firstRowTd2Th` [boolean] … タイトル行のtdをthに変換するか否か

* `firstColTd2Th` [boolean] … タイトル列のtdをthに変換するか否か

* `rendereCallback` [function] … 表示後に呼び出すcallback

* `renderName` [string] … 描画(tableタグの生成)のフォーマット。指定可能文字列は以下
    * `normal` … そのまま描画
    * `sumUpCol` … 列で集計
    * `aveCol` … 列で平均
    * `aveColExceptZero` … 列で平均。ただし、数値が0(もしくは無い)のｶﾗﾑは母数として数えない
    * `rotateNormal` … ノーマルのものを回転
    * `sumUpColRotate` … 列で集計してから回転
    * `rotateSumUpCol` … 回転してから列で集計
    * `aveColRotate` … 列で平均してから回転
    * `aveColExceptZeroRotate` … 列で平均してから回転。ただし、数値が0のｶﾗﾑは母数として数えない
    * `rotateAveCol` … 回転してから列で平均
    * `rotateAveColExceptZero` … 回転してから列で平均。ただし、数値が0のｶﾗﾑは母数として数えない
    
* `callback` [function] … 表示後に呼び出すcallback(jquery.tablemagic.jsのみ)

## Todo
* テスト
* オプションの確認あんましできてない
* 今のところパフォーマンスとか気にしてません

## Author
* Tweeeety, Ryuichi Murata

## License
* MIT  
    * see [LICENSE](./MIT-LICENSE.txt)