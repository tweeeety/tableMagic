tableMagic
==========
json形式で受け取ったDBデータからテーブルタグ(table)を生成するライブラリと  
それをラップしたjqueryプラグインです。  

※補足  
名前の由来は作った当初、[imageMagic](http://www.imagemagick.org/script/perl-magick.php)を触ってたのでなんとなくパクりましたw

## Description
json形式のMySQLデータなどをテーブルタグ(table)に変換して指定したjqueryのcontentに埋め込みます。  

また、オプションにより以下のことができます

* テーブルタグの生成(と、jquery contentへの埋め込み)
* 1レコード内の表示順序の制御
* レコードのタイトル文字列の指定
* 簡易集計(列での合計、平均、またはその有無)
* 描画後のcallback呼び出し
* データの行と列の回転

## Demo
### サンプル
サンプルとして3パターンくらい載せます。  
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
※実際はajaxなんかでjson形式で受け取ると思いますが、ここではjsonで受け取った体で変数へ入れてます

### sample01
説明よりサンプルをってことで、以下は一番シンプルなサンプルです  

* html
```html
<body>
<div id="my-table"></div>

<script src="http://code.jquery.com/jquery-latest.js"></script>
<script src="js/tableMagicj.js"></script>
<script>
$(function(){
  $("#my-table").tableMagic(sampleData);
});
</script>
</body>
```
* 結果  

![image](https://github.com/tweeeety/tableMagic/blob/master/sample/tableMagicSample02.png)

### sample02
オプションで以下を指定したサンプルです
>
* 1レコード内の表示順序
* タイトル文字列

* html
```html
<body>
<div id="my-table"></div>

<script src="http://code.jquery.com/jquery-latest.js"></script>
<script src="js/tableMagicj.js"></script>
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
  //if( opt && opt.callback ) opt.callback = function() { lineMarker($(".my-table"), opt) };
  $("#my-table").tableMagic(sampleData, opt);
});
</script>
</body>
```

* 結果  

![image](https://github.com/tweeeety/tableMagic/blob/master/sample/tableMagicSample03.png)


### sample03
以下を指定した形のサンプルです
>
* 1レコード内の表示順序
* タイトル文字列
* 集計する(sum)＆表を回転してtable描画


## Requirement
jQueryプラグインで使う場合はもちろんjqueryが必要です。  
バージョンでの動作確認まではしてませんが、だいたい使えるんじゃなかなーってくらいです。  
```javascript
<script src="http://code.jquery.com/jquery-latest.js"></script>
```

## Usage
###基本
基本はこんな感じです
```

```

###オプション
