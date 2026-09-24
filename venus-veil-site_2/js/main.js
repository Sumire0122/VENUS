(function(){
  // スマホのメニュー開閉
  var btn=document.querySelector('.menu-btn'), drawer=document.getElementById('drawer'), closeBtn=drawer.querySelector('.close');
  function setOpen(open){
    drawer.classList.toggle('is-open',open);
    drawer.setAttribute('aria-hidden',String(!open));
    btn.setAttribute('aria-expanded',String(open));
    document.documentElement.style.overflow=open?'hidden':'';
    (open?closeBtn:btn).focus({preventScroll:true});
  }
  btn.addEventListener('click',function(){setOpen(true)});
  closeBtn.addEventListener('click',function(){setOpen(false)});
  drawer.querySelectorAll('nav a').forEach(function(a){a.addEventListener('click',function(){setOpen(false)})});
  document.addEventListener('keydown',function(e){if(e.key==='Escape'&&drawer.classList.contains('is-open'))setOpen(false)});

  // PC：スクロールしたらナビに背景をつける
  var gnav=document.querySelector('.gnav');
  function navState(){ gnav.classList.toggle('is-scrolled', window.scrollY>40); }
  window.addEventListener('scroll',navState,{passive:true}); navState();

  // ギャラリー：下から重なるときに、下になった写真を少し拡大
  var slides=[].slice.call(document.querySelectorAll('.g-slide'));
  var reduce=matchMedia('(prefers-reduced-motion: reduce)');
  var ticking=false;
  function zoom(){
    ticking=false;
    if(reduce.matches) return;
    for(var i=0;i<slides.length-1;i++){
      var h=slides[i].offsetHeight, top=slides[i+1].getBoundingClientRect().top;
      var p=Math.min(1,Math.max(0,1-(top/h)));
      slides[i].firstElementChild.style.transform='scale('+(1+0.1*p).toFixed(4)+')';
      slides[i].firstElementChild.style.filter='brightness('+(1-0.25*p).toFixed(3)+')';
    }
  }
  window.addEventListener('scroll',function(){ if(!ticking){ticking=true;requestAnimationFrame(zoom);} },{passive:true});
  window.addEventListener('resize',zoom); zoom();

  // View Full Menu：別タブで開く前に確認
  var dlg=document.getElementById('pdf-confirm');
  document.querySelectorAll('[data-confirm]').forEach(function(a){
    a.addEventListener('click',function(e){
      if(!dlg.showModal) return; // 古いブラウザはそのまま開く
      e.preventDefault(); dlg.showModal();
    });
  });
  dlg.querySelector('.confirm__cancel').addEventListener('click',function(){dlg.close()});
  dlg.querySelector('.confirm__ok').addEventListener('click',function(){dlg.close()});
  dlg.addEventListener('click',function(e){ if(e.target===dlg) dlg.close(); });
})();
