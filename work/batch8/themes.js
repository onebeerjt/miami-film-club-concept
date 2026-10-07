// MIAMI FILM CLUB — batch 8 concept themes.

THEMES.scorecard = {
  label: "Scorecard",
  meta: "#f4f1e6",
  render: function(c){
    var rows = c.events.map(function(e, i){
      return '<div class="sc-row rv"><span class="sc-inn">'+(i+1)+'</span><b>'+e.title+'</b>'
        + '<span class="sc-r">'+[e.mon, e.day].filter(Boolean).join(' ')+'</span>'
        + '<a href="'+e.ticketUrl+'" target="_blank" rel="noopener">'+e.ticketLabel+'</a></div>';
    }).join('');
    var box = c.diary.map(function(d, i){
      return '<div class="sc-box rv"><span>'+(i+1)+'</span><b>'+d.film+'</b><span>'+MFC.stars(d.stars)+'</span></div>';
    }).join('');
    return '<section class="sc-card"><header class="rv"><h1>'+c.club.name+'</h1><p>OFFICIAL SCORECARD · 305 LEAGUE · '+c.club.tagline+'</p></header>'
      + '<div class="sc-head"><span>INN</span><b>MATCHUP</b><span>DATE</span><span>TIX</span></div>' + rows
      + '<h2 class="rv">Box scores <span>recent finals</span></h2><div class="sc-boxes">'+box+'</div>'
      + '<footer class="rv">Season tickets <b>'+c.join.price+'</b> — <a href="'+c.join.patreon+'" target="_blank" rel="noopener">Buy the season</a></footer></section>';
  }
};

THEMES.yearbook = {
  label: "Yearbook",
  meta: "#1f2a44",
  render: function(c){
    var grads = c.events.map(function(e){
      return '<div class="yb-grad rv"><div class="yb-ph"></div><b>'+e.title+'</b>'
        + '<span>Class of '+e.mon+' '+e.day+'</span><a href="'+e.ticketUrl+'" target="_blank" rel="noopener">'+e.ticketLabel+'</a></div>';
    }).join('');
    var sigs = c.reviews.slice(0, 3).map(function(r){
      return '<div class="yb-sig rv">“'+(r.text || r.film)+'”<span>— '+c.member.handle+', '+r.date+'</span></div>';
    }).join('');
    return '<section class="yb-book"><header class="rv"><h1>THE 305</h1><p>'+c.club.name+' · CLASS OF 2026</p></header>'
      + '<div class="yb-grads">'+grads+'</div>'
      + '<h2 class="rv">Sign my yearbook</h2>'+sigs
      + '<footer class="rv">Alumni dues <b>'+c.join.price+'</b> — <a href="'+c.join.patreon+'" target="_blank" rel="noopener">Stay in touch</a></footer></section>';
  }
};

THEMES.classifieds = {
  label: "Classifieds",
  meta: "#f0ede2",
  render: function(c){
    var ads = c.events.map(function(e){
      return '<div class="cf-ad rv"><b>'+e.title.toUpperCase()+'</b> — '+[e.dow, e.mon, e.day, e.time, e.venue].filter(Boolean).join(', ')+'. '
        + '<a href="'+e.ticketUrl+'" target="_blank" rel="noopener">'+e.ticketLabel+'</a></div>';
    }).join('');
    var pers = c.diary.map(function(d){
      return '<div class="cf-ad rv"><b>SEEN:</b> '+d.film+' ('+d.year+'), rated '+MFC.stars(d.stars)+'. '+d.note+'</div>';
    }).join('');
    return '<section class="cf-page"><header class="rv"><h1>CLASSIFIEDS</h1><p>'+c.club.name+' · '+c.club.handle+' · all ads verified</p></header>'
      + '<h2 class="rv">Announcements</h2>'+ads
      + '<h2 class="rv">Missed connections</h2>'+pers
      + '<footer class="rv">Place your ad — <b>'+c.join.price+'</b> <a href="'+c.join.patreon+'" target="_blank" rel="noopener">join</a></footer></section>';
  }
};

THEMES.jukebox = {
  label: "Jukebox",
  meta: "#160a1e",
  render: function(c){
    var keys = c.events.map(function(e, i){
      return '<button type="button" class="jk-key rv" data-i="'+i+'"><span class="jk-l">'+'ABC'[i]+(i+1)+'</span><span class="jk-t">'+e.title+'</span></button>';
    }).join('');
    var now = c.events.map(function(e, i){
      return '<div class="jk-now" data-i="'+i+'"><div class="jk-sel">SELECTION '+'ABC'[i]+(i+1)+'</div><h3>'+e.title+'</h3>'
        + '<p>'+[e.dow, e.mon, e.day, e.time, e.venue].filter(Boolean).join(' · ')+'</p>'
        + '<a href="'+e.ticketUrl+'" target="_blank" rel="noopener">▶ '+e.ticketLabel+'</a></div>';
    }).join('');
    var sides = c.reviews.slice(0, 3).map(function(r){
      return '<div class="jk-side rv"><b>'+r.film+'</b><span>'+(r.stars ? MFC.stars(r.stars) : '')+'</span></div>';
    }).join('');
    return '<section class="jk-box"><div class="jk-arch rv">'+c.club.name+'</div>'
      + '<div class="jk-keys">'+keys+'</div><div class="jk-nows">'+now+'</div>'
      + '<h2 class="rv">B-sides</h2>'+sides
      + '<div class="jk-join rv">25¢ a play — or <b>'+c.join.price+'</b>/mo <a href="'+c.join.patreon+'" target="_blank" rel="noopener">unlimited</a></div></section>';
  },
  mount: function(root){
    var ks = root.querySelectorAll('.jk-key'), ns = root.querySelectorAll('.jk-now');
    function s(i){
      ks.forEach(function(k, j){ k.classList.toggle('on', j === i); });
      ns.forEach(function(n, j){ n.classList.toggle('on', j === i); });
    }
    ks.forEach(function(k){ k.addEventListener('click', function(){ s(parseInt(k.dataset.i, 10)); }); });
    s(0);
  }
};

THEMES.treasuremap = {
  label: "Treasure Map",
  meta: "#e8d5a8",
  render: function(c){
    var marks = c.events.map(function(e, i){
      var pos = [[18, 30], [55, 55], [78, 22]][i] || [50, 50];
      return '<button type="button" class="tr-x rv" style="left:'+pos[0]+'%;top:'+pos[1]+'%" data-i="'+i+'">✕</button>';
    }).join('');
    var legend = c.events.map(function(e, i){
      return '<div class="tr-leg" data-i="'+i+'"><b>✕ Site '+(i+1)+': '+e.title+'</b>'
        + '<span>'+[e.dow, e.mon, e.day, e.time, e.venue].filter(Boolean).join(' · ')+'</span>'
        + '<a href="'+e.ticketUrl+'" target="_blank" rel="noopener">'+e.ticketLabel+' →</a></div>';
    }).join('');
    var log = c.diary.map(function(d){
      return '<div class="tr-log rv">⚓ '+d.film+' — '+MFC.stars(d.stars)+'<span>'+d.note+'</span></div>';
    }).join('');
    return '<section class="tr-chart"><h1 class="rv">Ye Olde 305 Chart</h1>'
      + '<div class="tr-map">'+marks+'<div class="tr-sea">THE ATLANTIC</div><div class="tr-compass">N ↑</div></div>'
      + '<div class="tr-legends">'+legend+'</div>'
      + '<h2 class="rv">Captain&rsquo;s log</h2>'+log
      + '<footer class="rv">Join the crew — <b>'+c.join.price+'</b> <a href="'+c.join.patreon+'" target="_blank" rel="noopener">All aboard</a></footer></section>';
  },
  mount: function(root){
    var xs = root.querySelectorAll('.tr-x'), ls = root.querySelectorAll('.tr-leg');
    function s(i){
      xs.forEach(function(x, j){ x.classList.toggle('on', j === i); });
      ls.forEach(function(l, j){ l.classList.toggle('on', j === i); });
    }
    xs.forEach(function(x){ x.addEventListener('click', function(){ s(parseInt(x.dataset.i, 10)); }); });
    s(0);
  }
};

THEMES.phonebook = {
  label: "Yellow Pages",
  meta: "#fffbe0",
  render: function(c){
    var list = c.events.map(function(e){
      return '<div class="yp-listing rv"><b>'+e.title.toUpperCase()+'</b><span>'+[e.dow, e.mon, e.day, e.time, e.venue].filter(Boolean).join(' · ')+'</span>'
        + '<a href="'+e.ticketUrl+'" target="_blank" rel="noopener">☎ '+e.ticketLabel+'</a></div>';
    }).join('');
    var also = c.reviews.slice(0, 3).map(function(r){
      return '<div class="yp-listing rv"><b>'+r.film.toUpperCase()+'</b><span>'+(r.stars ? MFC.stars(r.stars)+' · ' : '')+'see '+c.member.handle+' on Letterboxd</span></div>';
    }).join('');
    return '<section class="yp-book"><header class="rv"><h1>YELLOW PAGES</h1><p>'+c.club.name+' · let your fingers do the walking</p></header>'
      + '<div class="yp-alpha">CINEMAS — M</div>' + list
      + '<div class="yp-alpha">REVIEWS — R</div>' + also
      + '<footer class="rv">Get listed — <b>'+c.join.price+'</b> <a href="'+c.join.patreon+'" target="_blank" rel="noopener">join</a></footer></section>';
  }
};

THEMES.tradingcards = {
  label: "Trading Cards",
  meta: "#10241a",
  render: function(c){
    var cards = c.events.map(function(e, i){
      return '<button type="button" class="tc-card rv" data-i="'+i+'"><div class="tc-holo"></div>'
        + '<span class="tc-set">SERIES 305</span><b>'+e.title+'</b><span class="tc-m">'+e.mon+' '+e.day+' · '+e.tag+'</span></button>';
    }).join('');
    var back = c.events.map(function(e, i){
      return '<div class="tc-back" data-i="'+i+'"><h3>'+e.title+'</h3><div class="tc-stats">'
        + '<div><span>DATE</span><b>'+e.mon+' '+e.day+'</b></div><div><span>VENUE</span><b>'+(e.venue || '—')+'</b></div><div><span>HYPE</span><b>'+['98','91','87'][i]+'</b></div></div>'
        + '<p>'+(e.note || e.time || 'Pop-up screening')+'</p>'
        + '<a href="'+e.ticketUrl+'" target="_blank" rel="noopener">'+e.ticketLabel+'</a></div>';
    }).join('');
    return '<section class="tc-album"><h1 class="rv">'+c.club.name+' <span>TRADING CARDS</span></h1>'
      + '<div class="tc-cards">'+cards+'</div><div class="tc-backs">'+back+'</div>'
      + '<div class="tc-join rv">Complete your set — <b>'+c.join.price+'</b> <a href="'+c.join.patreon+'" target="_blank" rel="noopener">Open packs</a></div></section>';
  },
  mount: function(root){
    var cs = root.querySelectorAll('.tc-card'), bs = root.querySelectorAll('.tc-back');
    function f(i){
      cs.forEach(function(x, j){ x.classList.toggle('on', j === i); });
      bs.forEach(function(x, j){ x.classList.toggle('on', j === i); });
    }
    cs.forEach(function(x){ x.addEventListener('click', function(){ f(parseInt(x.dataset.i, 10)); }); });
    f(0);
  }
};

THEMES.billboard = {
  label: "Billboards",
  meta: "#0e1a2e",
  render: function(c){
    var boards = c.events.map(function(e, i){
      return '<div class="bb-board rv"><div class="bb-ad"><span class="bb-k">'+e.tag+'</span><h3>'+e.title+'</h3>'
        + '<p>'+[e.dow, e.mon, e.day, e.time, e.venue].filter(Boolean).join(' · ')+'</p></div>'
        + '<div class="bb-pole"></div><a class="bb-exit" href="'+e.ticketUrl+'" target="_blank" rel="noopener">EXIT '+(i+1)+' · '+e.ticketLabel+'</a></div>';
    }).join('');
    var radio = c.reviews.slice(0, 2).map(function(r){
      return '<div class="bb-radio rv">📻 '+(r.text || r.film)+'<span> — '+c.member.handle+'</span></div>';
    }).join('');
    return '<section class="bb-hwy"><div class="bb-sky rv">MIAMI · NEXT 3 EXITS</div>'
      + boards + '<h2 class="rv">Traffic report</h2>' + radio
      + '<div class="bb-join rv">E-ZPass — <b>'+c.join.price+'</b> <a href="'+c.join.patreon+'" target="_blank" rel="noopener">Keep driving</a></div></section>';
  }
};
