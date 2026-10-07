// MIAMI FILM CLUB — batch 6 concept themes.

THEMES.subway = {
  label: "Transit Map",
  meta: "#101418",
  render: function(c){
    var stops = c.events.map(function(e, i){
      return '<button type="button" class="sw-stop rv" data-i="'+i+'"><span class="sw-dot"></span>'
        + '<span class="sw-t">'+e.title+'</span><span class="sw-m">'+e.mon+' '+e.day+'</span></button>';
    }).join('');
    var detail = c.events.map(function(e, i){
      return '<article class="sw-detail" data-i="'+i+'"><div class="sw-line">LINE 305 · LOCAL</div>'
        + '<h3>'+e.title+'</h3><p>'+[e.dow, e.mon, e.day, e.time, e.venue, e.note].filter(Boolean).join(' · ')+'</p>'
        + '<a href="'+e.ticketUrl+'" target="_blank" rel="noopener">'+e.ticketLabel+' →</a></article>';
    }).join('');
    var svc = c.reviews.slice(0, 3).map(function(r){
      return '<div class="sw-svc rv">SERVICE ADVISORY — <b>'+r.film+'</b> rated '+(r.stars ? MFC.stars(r.stars) : '—')+' by '+c.member.handle+'</div>';
    }).join('');
    return '<section class="sw-map"><header class="rv"><h1>305 Transit</h1><p>'+c.club.name+' · all lines lead to the movies</p></header>'
      + '<div class="sw-track"><div class="sw-rail"></div><div class="sw-stops">'+stops+'</div></div>'
      + '<div class="sw-details">'+detail+'</div>'
      + '<h2 class="rv">Service advisories</h2>'+svc
      + '<div class="sw-join rv">Monthly pass <b>'+c.join.price+'</b> — <a href="'+c.join.patreon+'" target="_blank" rel="noopener">Get a Metrocard</a></div></section>';
  },
  mount: function(root){
    var ss = root.querySelectorAll('.sw-stop'), ds = root.querySelectorAll('.sw-detail');
    function go(i){
      ss.forEach(function(s, j){ s.classList.toggle('on', j === i); });
      ds.forEach(function(d, j){ d.classList.toggle('on', j === i); });
    }
    ss.forEach(function(s){ s.addEventListener('click', function(){ go(parseInt(s.dataset.i, 10)); }); });
    go(0);
  }
};

THEMES.polaroid = {
  label: "Polaroid Wall",
  meta: "#e8e2d4",
  render: function(c){
    var shots = c.events.map(function(e, i){
      return '<figure class="pl-shot rv" data-i="'+i+'"><div class="pl-photo"><span class="pl-date">'+e.mon+' '+e.day+'</span></div>'
        + '<figcaption><b>'+e.title+'</b><span>'+[e.venue, e.time].filter(Boolean).join(' · ')+'</span></figcaption></figure>';
    }).join('');
    var wall = c.diary.map(function(d){
      return '<figure class="pl-shot rv"><div class="pl-photo pl-alt"><img src="'+d.poster+'" alt="'+d.film+'" loading="lazy"></div>'
        + '<figcaption><b>'+d.film+'</b><span>'+MFC.stars(d.stars)+'</span></figcaption></figure>';
    }).join('');
    return '<section class="pl-wall"><header class="rv"><h1> developing… '+c.club.name+'</h1><p>tap a photo for the night&rsquo;s details</p></header>'
      + '<div class="pl-grid">'+shots+'</div><div class="pl-detail"></div>'
      + '<h2 class="rv">From the camera roll</h2><div class="pl-grid">'+wall+'</div>'
      + '<div class="pl-join rv"><b>'+c.join.network+'</b> · '+c.join.price+' — <a href="'+c.join.patreon+'" target="_blank" rel="noopener">Join the album</a></div></section>';
  },
  mount: function(root){
    var det = root.querySelector('.pl-detail');
    root.querySelectorAll('.pl-shot[data-i]').forEach(function(f){
      f.addEventListener('click', function(){
        var i = parseInt(f.dataset.i, 10), e = CONTENT.events[i];
        det.innerHTML = '<div class="pl-card"><b>'+e.title+'</b><span>'+[e.dow, e.mon, e.day, e.time, e.venue, e.note].filter(Boolean).join(' · ')+'</span><a href="'+e.ticketUrl+'" target="_blank" rel="noopener">'+e.ticketLabel+' →</a></div>';
        det.scrollIntoView({behavior:'smooth', block:'nearest'});
      });
    });
  }
};

THEMES.vhs = {
  label: "VHS",
  meta: "#0b0b12",
  render: function(c){
    var tapes = c.events.map(function(e, i){
      return '<button type="button" class="vh-tape rv" data-i="'+i+'"><span class="vh-sp">SP</span>'
        + '<span class="vh-t">'+e.title+'</span><span class="vh-m">'+e.mon+' '+e.day+' · '+e.tag+'</span></button>';
    }).join('');
    var detail = c.events.map(function(e, i){
      return '<div class="vh-detail" data-i="'+i+'"><div class="vh-osd">PLAY ▶</div><h3>'+e.title+'</h3>'
        + '<p>'+[e.dow, e.mon, e.day, e.time, e.venue, e.note].filter(Boolean).join(' · ')+'</p>'
        + '<a href="'+e.ticketUrl+'" target="_blank" rel="noopener">'+e.ticketLabel+'</a></div>';
    }).join('');
    var rew = c.reviews.slice(0, 3).map(function(r){
      return '<div class="vh-rew rv">REWIND ⏪ <b>'+r.film+'</b> — '+(r.text || 'logged '+r.date)+'</div>';
    }).join('');
    return '<section class="vh-player"><div class="vh-track rv">TRACKING <span>▓▓▓▓▓▓░░</span> AUTO</div>'
      + '<h1 class="rv">'+c.club.name+' <span>HOME VIDEO</span></h1>'
      + '<div class="vh-tapes">'+tapes+'</div><div class="vh-details">'+detail+'</div>'
      + '<h2 class="rv">Be kind, rewind</h2>'+rew
      + '<div class="vh-join rv">MEMBERSHIP — <b>'+c.join.price+'</b> <a href="'+c.join.patreon+'" target="_blank" rel="noopener">[ RENT ]</a></div></section>';
  },
  mount: function(root){
    var ts = root.querySelectorAll('.vh-tape'), ds = root.querySelectorAll('.vh-detail');
    function play(i){
      ts.forEach(function(t, j){ t.classList.toggle('on', j === i); });
      ds.forEach(function(d, j){ d.classList.toggle('on', j === i); });
    }
    ts.forEach(function(t){ t.addEventListener('click', function(){ play(parseInt(t.dataset.i, 10)); }); });
    play(0);
  }
};

THEMES.weather = {
  label: "Screening Forecast",
  meta: "#7ec8e3",
  render: function(c){
    var days = c.events.map(function(e, i){
      var icon = ['⛅', '🌙', '🎃'][i % 3];
      return '<button type="button" class="wx-day rv" data-i="'+i+'"><span class="wx-icon">'+icon+'</span>'
        + '<span class="wx-dow">'+(e.dow || e.mon)+'</span><span class="wx-t">'+e.title.split(' ').slice(0, 2).join(' ')+'</span></button>';
    }).join('');
    var detail = c.events.map(function(e, i){
      return '<div class="wx-detail" data-i="'+i+'"><div class="wx-big">'+['⛅','🌙','🎃'][i % 3]+'</div>'
        + '<h3>'+e.title+'</h3><p>'+[e.dow, e.mon, e.day, e.time, e.venue].filter(Boolean).join(' · ')+'</p>'
        + '<p class="wx-cond">Conditions: 100% chance of cinema</p>'
        + '<a href="'+e.ticketUrl+'" target="_blank" rel="noopener">'+e.ticketLabel+'</a></div>';
    }).join('');
    var radar = c.diary.map(function(d){
      return '<div class="wx-radar rv"><b>'+d.film+'</b><span>'+MFC.stars(d.stars)+' · '+d.date+'</span></div>';
    }).join('');
    return '<section class="wx-app"><header class="rv"><h1>Miami</h1><p class="wx-sub">Screening forecast · '+c.club.handle+'</p></header>'
      + '<div class="wx-days">'+days+'</div><div class="wx-details">'+detail+'</div>'
      + '<h2 class="rv">Doppler diary</h2>'+radar
      + '<div class="wx-join rv">Premium radar <b>'+c.join.price+'</b> — <a href="'+c.join.patreon+'" target="_blank" rel="noopener">Upgrade</a></div></section>';
  },
  mount: function(root){
    var ds = root.querySelectorAll('.wx-day'), dt = root.querySelectorAll('.wx-detail');
    function f(i){
      ds.forEach(function(d, j){ d.classList.toggle('on', j === i); });
      dt.forEach(function(d, j){ d.classList.toggle('on', j === i); });
    }
    ds.forEach(function(d){ d.addEventListener('click', function(){ f(parseInt(d.dataset.i, 10)); }); });
    f(0);
  }
};

THEMES.stocks = {
  label: "Film Exchange",
  meta: "#0a0e14",
  render: function(c){
    var tick = c.events.map(function(e){ return e.title.toUpperCase() + ' ▲'; }).join(' · ');
    var rows = c.events.map(function(e, i){
      var chg = ['+4.2%', '+2.8%', '+9.1%'][i % 3];
      return '<button type="button" class="st-row rv" data-i="'+i+'"><span class="st-sym">'+e.tag+'</span>'
        + '<span class="st-t">'+e.title+'</span><span class="st-chg">'+chg+'</span></button>';
    }).join('');
    var detail = c.events.map(function(e, i){
      return '<div class="st-detail" data-i="'+i+'"><h3>'+e.title+' <span class="st-tk">'+e.tag+'</span></h3>'
        + '<p>'+[e.dow, e.mon, e.day, e.time, e.venue].filter(Boolean).join(' · ')+'</p>'
        + '<a href="'+e.ticketUrl+'" target="_blank" rel="noopener">BUY '+e.ticketLabel+'</a></div>';
    }).join('');
    var watch = c.reviews.slice(0, 4).map(function(r){
      return '<div class="st-w rv"><b>'+r.film+'</b><span>'+(r.stars ? MFC.stars(r.stars) : '—')+'</span></div>';
    }).join('');
    return '<section class="st-mkt"><div class="st-ticker rv"><div class="st-tick">'+tick+' · '+tick+'</div></div>'
      + '<h1 class="rv">Film Exchange <span>305</span></h1>'
      + '<div class="st-rows">'+rows+'</div><div class="st-details">'+detail+'</div>'
      + '<h2 class="rv">Watchlist</h2>'+watch
      + '<div class="st-join rv">Open an account — <b>'+c.join.price+'</b> <a href="'+c.join.patreon+'" target="_blank" rel="noopener">Invest</a></div></section>';
  },
  mount: function(root){
    var rs = root.querySelectorAll('.st-row'), ds = root.querySelectorAll('.st-detail');
    function p(i){
      rs.forEach(function(r, j){ r.classList.toggle('on', j === i); });
      ds.forEach(function(d, j){ d.classList.toggle('on', j === i); });
    }
    rs.forEach(function(r){ r.addEventListener('click', function(){ p(parseInt(r.dataset.i, 10)); }); });
    p(0);
  }
};

THEMES.fieldnotes = {
  label: "Field Notes",
  meta: "#f5eeda",
  render: function(c){
    var notes = c.events.map(function(e, i){
      return '<article class="fn-note rv"><div class="fn-n">N°'+(i+1)+' — '+e.tag+'</div><h3>'+e.title+'</h3>'
        + '<p>'+[e.dow, e.mon, e.day, e.time, e.venue, e.note].filter(Boolean).join(' · ')+'</p>'
        + '<a href="'+e.ticketUrl+'" target="_blank" rel="noopener">☐ '+e.ticketLabel+'</a></article>';
    }).join('');
    var obs = c.diary.map(function(d){
      return '<div class="fn-obs rv"><b>OBS:</b> '+d.film+' — '+MFC.stars(d.stars)+'<i>'+d.note+'</i></div>';
    }).join('');
    return '<section class="fn-book"><header class="rv"><h1>FIELD NOTES</h1><p>'+c.club.name+' · screening log · 48 pages</p></header>'
      + notes + '<h2 class="rv">Observations</h2>' + obs
      + '<footer class="rv">Join the expedition — <b>'+c.join.price+'</b> <a href="'+c.join.patreon+'" target="_blank" rel="noopener">sign the log</a></footer></section>';
  }
};

THEMES.telegram = {
  label: "Telegram",
  meta: "#e8dcc0",
  render: function(c){
    var msgs = c.events.map(function(e){
      return '<div class="tg-msg rv"><div class="tg-head">WESTERN UNION · MIAMI FLA</div>'
        + '<p>STOP ' + e.title.toUpperCase() + ' STOP ' + [e.dow, e.mon, e.day, e.time, e.venue].filter(Boolean).join(' ').toUpperCase() + ' STOP</p>'
        + '<a href="'+e.ticketUrl+'" target="_blank" rel="noopener">'+e.ticketLabel+' STOP</a></div>';
    }).join('');
    var wire = c.reviews.slice(0, 3).map(function(r){
      return '<div class="tg-wire rv">WIRE — '+r.film.toUpperCase()+' '+(r.stars ? MFC.stars(r.stars) : '')+' STOP '+(r.text || 'LOGGED '+r.date.toUpperCase())+' STOP</div>';
    }).join('');
    return '<section class="tg-office"><h1 class="rv">'+c.club.name+'</h1><p class="rv tg-sub">by wire · '+c.club.tagline+'</p>'
      + msgs + '<h2 class="rv">Incoming wires</h2>' + wire
      + '<footer class="rv">REPLY BY WIRE — <b>'+c.join.price+'</b> <a href="'+c.join.patreon+'" target="_blank" rel="noopener">join</a></footer></section>';
  }
};

THEMES.locker = {
  label: "Locker",
  meta: "#3b4a5a",
  render: function(c){
    var flyers = c.events.map(function(e, i){
      var rot = (i % 2 ? 2 : -2);
      return '<div class="lk-flyer rv" style="transform:rotate('+rot+'deg)" data-i="'+i+'"><div class="lk-tape"></div>'
        + '<b>'+e.title+'</b><span>'+[e.mon, e.day, e.venue].filter(Boolean).join(' · ')+'</span></div>';
    }).join('');
    var detail = c.events.map(function(e, i){
      return '<div class="lk-detail" data-i="'+i+'"><h3>'+e.title+'</h3>'
        + '<p>'+[e.dow, e.mon, e.day, e.time, e.venue, e.note].filter(Boolean).join(' · ')+'</p>'
        + '<a href="'+e.ticketUrl+'" target="_blank" rel="noopener">'+e.ticketLabel+'</a></div>';
    }).join('');
    var notes = c.diary.map(function(d){
      return '<div class="lk-note rv"><b>'+d.film+'</b> '+MFC.stars(d.stars)+'</div>';
    }).join('');
    return '<section class="lk-door"><div class="lk-vents rv"></div><h1 class="rv">LKR 305</h1>'
      + '<div class="lk-flyers">'+flyers+'</div><div class="lk-details">'+detail+'</div>'
      + '<h2 class="rv">Passed notes</h2><div class="lk-notes">'+notes+'</div>'
      + '<div class="lk-join rv">Combination: <b>'+c.join.price+'</b> — <a href="'+c.join.patreon+'" target="_blank" rel="noopener">claim a locker</a></div></section>';
  },
  mount: function(root){
    var fs = root.querySelectorAll('.lk-flyer'), ds = root.querySelectorAll('.lk-detail');
    function o(i){
      fs.forEach(function(f, j){ f.classList.toggle('on', j === i); });
      ds.forEach(function(d, j){ d.classList.toggle('on', j === i); });
    }
    fs.forEach(function(f){ f.addEventListener('click', function(){ o(parseInt(f.dataset.i, 10)); }); });
    o(0);
  }
};

THEMES.drivein = {
  label: "Drive-In",
  meta: "#0a0a18",
  render: function(c){
    var cars = c.events.map(function(e, i){
      return '<button type="button" class="dv-car rv" data-i="'+i+'"><span class="dv-spot">SPOT '+(i+1)+'</span><span class="dv-t">'+e.title+'</span></button>';
    }).join('');
    var screen = c.events.map(function(e, i){
      return '<div class="dv-screen" data-i="'+i+'"><div class="dv-film">NOW SHOWING</div><h3>'+e.title+'</h3>'
        + '<p>'+[e.dow, e.mon, e.day, e.time, e.venue].filter(Boolean).join(' · ')+'</p>'
        + '<a href="'+e.ticketUrl+'" target="_blank" rel="noopener">'+e.ticketLabel+'</a></div>';
    }).join('');
    var radio = c.reviews.slice(0, 3).map(function(r){
      return '<div class="dv-radio rv">♪ '+(r.text || r.film)+' <span>— '+c.member.handle+'</span></div>';
    }).join('');
    return '<section class="dv-lot"><div class="dv-dash rv"><span>TUNE TO 88.5</span><span>'+c.club.name+'</span></div>'
      + '<div class="dv-screens">'+screen+'</div><div class="dv-cars">'+cars+'</div>'
      + '<h2 class="rv">On the radio</h2>'+radio
      + '<div class="dv-join rv">Per-car admission <b>'+c.join.price+'</b> — <a href="'+c.join.patreon+'" target="_blank" rel="noopener">Pull in</a></div></section>';
  },
  mount: function(root){
    var cs = root.querySelectorAll('.dv-car'), ss = root.querySelectorAll('.dv-screen');
    function t(i){
      cs.forEach(function(x, j){ x.classList.toggle('on', j === i); });
      ss.forEach(function(x, j){ x.classList.toggle('on', j === i); });
    }
    cs.forEach(function(x){ x.addEventListener('click', function(){ t(parseInt(x.dataset.i, 10)); }); });
    t(0);
  }
};
