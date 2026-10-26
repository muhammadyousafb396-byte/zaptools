/* ZapTools shared JS — footer year, copy helpers, smooth anchor */
document.addEventListener('DOMContentLoaded',function(){
  document.querySelectorAll('[data-year]').forEach(function(el){el.textContent=new Date().getFullYear();});
  /* Make every drop-zone keyboard-operable and show a drag-over state.
     (Each tool page keeps its own click/drop handlers; these only add
     accessibility and visual feedback.) */
  document.querySelectorAll('.drop-zone').forEach(function(dz){
    dz.setAttribute('tabindex','0');
    dz.setAttribute('role','button');
    dz.addEventListener('keydown',function(e){
      if(e.key==='Enter'||e.key===' '){
        e.preventDefault();
        var inp=dz.querySelector('input[type=file]');
        if(inp)inp.click();
      }
    });
    dz.addEventListener('dragover',function(){dz.classList.add('drag-over');});
    dz.addEventListener('dragleave',function(){dz.classList.remove('drag-over');});
    dz.addEventListener('drop',function(){dz.classList.remove('drag-over');});
  });
});
function copyText(id,btn){
  var el=document.getElementById(id);
  var txt=el.value!==undefined?el.value:el.textContent;
  function done(ok){
    var old=btn.textContent;
    btn.textContent=ok?'Copied!':'Copy failed — select the text manually';
    setTimeout(function(){btn.textContent=old;},ok?1600:2600);
  }
  if(navigator.clipboard&&navigator.clipboard.writeText){
    navigator.clipboard.writeText(txt).then(function(){done(true);}).catch(function(){
      fallbackCopy(el,btn,done);
    });
  }else{
    fallbackCopy(el,btn,done);
  }
}
function fallbackCopy(el,btn,done){
  try{
    if(el.value!==undefined){el.focus();el.select();}
    else{
      var r=document.createRange();r.selectNodeContents(el);
      var s=window.getSelection();s.removeAllRanges();s.addRange(r);
    }
    if(document.execCommand('copy')){done(true);return;}
  }catch(e){}
  done(false);
}
function downloadFile(url,filename){
  var a=document.createElement('a');a.href=url;a.download=filename;document.body.appendChild(a);a.click();document.body.removeChild(a);
}
