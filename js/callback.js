var lineMarker = function(tableContent, opt){
  var rowMarkerClass = 'cellRow';
  var colMarkerClass = 'cellCol';
  
  // mark row
  tableContent.find("."+opt.tdHeaderClassName).each(function(){
    $(this).on("click", function(){
      $(this).toggleClass(rowMarkerClass);
      $(this).parent("tr").find("td").toggleClass(rowMarkerClass);
    });
  });
  
  // mark col
  var tdOrTh = opt.firstRowTd2Th ? 'th' : 'td';
  tableContent.find("."+opt.trHeaderClassName).find(tdOrTh).each(function(){
    $(this).on("click", function(){
      var index = $(this).parent("tr").find(tdOrTh).index(this);
      
      var trElements;
      if(opt.addThead){
        trElements = $(this).parent("tr").parent("thead").parent('table').find('tr');
      }else{
        trElements = $(this).parent("tr").parent('table').find('tr');
      }
      trElements.each(function(){
        $(this).children().eq(index).toggleClass(colMarkerClass);
      });
    });
  });
};