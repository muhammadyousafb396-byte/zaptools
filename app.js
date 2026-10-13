/* ZapTools shared JS — footer year, copy helpers, smooth anchor */
document.addEventListener('DOMContentLoaded',function(){
  document.querySelectorAll('[data-year]').forEach(function(el){el.textContent=new Date().getFullYear();});
});
function copyText(id,btn){
  var el=document.getElementById(id);
  var txt=el.value!==undefined?el.value:el.textContent;
  navigator.clipboard.writeText(txt).then(function(){
    var old=btn.textContent;btn.textContent='Copied!';setTimeout(function(){btn.textContent=old;},1600);
  });
}
function downloadFile(url,filename){
  var a=document.createElement('a');a.href=url;a.download=filename;document.body.appendChild(a);a.click();document.body.removeChild(a);
}
