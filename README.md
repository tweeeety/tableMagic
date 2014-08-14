tableMagic
==========
json形式で受け取ったDBデータからテーブルタグ(table)を生成するライブラリです。  
また、それをラップしたjqueryプラグインです。  
名前は由来は作った当事、[imageMagic](http://www.imagemagick.org/script/perl-magick.php)を触ってたのでなんとなくパクりましたw

## Description
json形式のMySQLデータなどをテーブルタグに変換します。  
説明よりサンプルをってことで、以下サンプルです

* DBデータ
```javascript
var sampleData = [
  {"totaled_date":"2014-01-16","entry":"2","invite":"0","sales":"65422","sales_dau":3,"sales_mau":33,"sales_uu":0,"mau":37,"dau":14},
  {"totaled_date":"2014-01-17","entry":"2","invite":"0","sales":"2039","sales_dau":2,"sales_mau":33,"sales_uu":1,"mau":37,"dau":14},
  {"totaled_date":"2014-01-24","entry":"3","invite":"0","sales":"348120","sales_dau":8,"sales_mau":37,"sales_uu":0,"mau":43,"dau":0},
  {"totaled_date":"2014-01-25","entry":"1","invite":"0","sales":"14570","sales_dau":4,"sales_mau":39,"sales_uu":1,"mau":45,"dau":0},
  {"totaled_date":"2014-01-26","entry":"4","invite":"0","sales":"14600","sales_dau":1,"sales_mau":39,"sales_uu":0,"mau":45,"dau":0}
];
```

* html
```html
<body>
<div id="my-table"></div>

<script src="http://code.jquery.com/jquery-latest.js"></script>
<script src="js/tableMagicj.js"></script>
<script>
$("#my-table").tableMagic(testdata);
</script>
</body>
```

<iframe width="100%" height="300" src="http://jsfiddle.net/tweeeety/658n084g/embedded/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

* 結果  

![image](https://github.com/tweeeety/tableMagic/blob/master/sample/tableMagicSample.png)


## aaaa
