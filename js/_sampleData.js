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
var sampleData = [
  {"totaled_date":"2014-01-16","entry":"2","invite":"0","sales":"65422","sales_dau":3,"sales_mau":33,"sales_uu":0,"mau":37,"dau":14},
  {"totaled_date":"2014-01-17","entry":"2","invite":"0","sales":"2039","sales_dau":2,"sales_mau":33,"sales_uu":1,"mau":37,"dau":14},
  {"totaled_date":"2014-01-24","entry":"3","invite":"0","sales":"348120","sales_dau":8,"sales_mau":37,"sales_uu":0,"mau":43,"dau":0},
  {"totaled_date":"2014-01-25","entry":"1","invite":"0","sales":"14570","sales_dau":4,"sales_mau":39,"sales_uu":1,"mau":45,"dau":0},
  {"totaled_date":"2014-01-26","entry":"4","invite":"0","sales":"14600","sales_dau":1,"sales_mau":39,"sales_uu":0,"mau":45,"dau":0}
];
var testdata = [];

/*
console.time("loop time");
for(var i=0; i<10000; i++){
  for(var idx in sampleData){
    testdata.push(sampleData[idx]);
  }
}
console.timeEnd("loop time");
*/
testdata = sampleData;

//var opt = null;
var opt = {
  titleOrderArr     : titleOrderArr,
  titleHash         : titleHash,
  
  tableClassName    : "my-table table-bordered",
  
  noTitleRow        : false,
  
  addThead          : true,
  trOddClassName    : "trOdd",
  trEvenClassName   : "trEven",
  trHeaderClassName : "trHeader",
  tdHeaderClassName : "tdHeader",
    
  firstRowTd2Th     : true,
  firstColTd2Th     : true,
  rendereCallback   : null,
    
  renderName        : "normal",
  //renderName        : "sumUpCol",
  //renderName        : "aveCol",
  //renderName        : "aveColExceptZero",
  //renderName        : "rotateNormal",
  //renderName        : "sumUpColRotate",
  //renderName        : "rotateSumUpCol",
  //renderName        : "aveColRotate",
  //renderName        : "aveColExceptZeroRotate",
  //renderName        : "rotateAveCol",
  //renderName        : "rotateAveColExceptZero",
  
  //callback : function(){console.log('sample callback');}
  callback : undefined
};
