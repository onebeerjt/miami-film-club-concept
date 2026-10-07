// MIAMI FILM CLUB — batch 5 concept themes (terminal, passport, radio, menu,
// blueprint, mixtape, newspaper, arcade). Same contract as batches 1-4.

THEMES.terminal = {
  label: "Terminal",
  meta: "#0a0f0a",
  render: function(c){
    var ev = c.events.map(function(e, i){
      return '<div class="tm-ev rv"><span class="tm-p">$ screen --night-'+(i+1)+'</span>'
        + '<span class="tm-t">'+e.title+'</span>'
        + '<span class="tm-m">'+[e.dow, e.mon, e.day, e.time, e.venue].filter(Boolean).join(' · ')+'</span>'
        + '<a class="tm-a" href="'+e.ticketUrl+'" target="_blank" rel="noopener">[ '+e.ticketLabel+' ]</a></div>';
    }).join('');
    var feed = c.reviews.map(function(r){
      return '<div class="tm-line"><span class="tm-u">'+c.member.handle+'</span> logged <b>'+r.film+'</b> '
        + (r.stars ? MFC.stars(r.stars) : '(no rating)') + (r.text ? ' — '+r.text : '') + '</div>';
    }).join('');
    return '<section class="tm-wrap">'
      + '<div class="tm-bar rv"><span class="tm-dot"></span><span class="tm-dot"></span><span class="tm-dot"></span><span class="tm-title">filmclub — zsh</span></div>'
      + '<div class="tm-body">'
      + '<p class="rv"><span class="tm-p">$</span> whoami<br><span class="tm-o">'+c.club.name+' · '+c.club.tagline+'</span></p>'
      + '<p class="rv"><span class="tm-p">$</span> ls upcoming/<br><span class="tm-o">'+ev+'</span></p>'
      + '<p class="rv"><span class="tm-p">$</span> tail -f letterboxd.log</p>'
      + '<div class="tm-feed rv">'+feed+'<div class="tm-cursor">▊</div></div>'
      + '<p class="rv"><span class="tm-p">$</span> cat join.txt<br><span class="tm-o">'+c.join.network+' · '+c.join.price+' — <a class="tm-a" href="'+c.join.patreon+'" target="_blank" rel="noopener">join</a> · <a class="tm-a" href="'+c.join.volunteer+'" target="_blank" rel="noopener">volunteer</a></span></p>'
      + '</div></section>';
  }
};

THEMES.passport = {
  label: "Passport",
  meta: "#1a2f5a",
  render: function(c){
    var stamps = c.events.map(function(e, i){
      return '<div class="pp-stamp rv" data-i="'+i+'">'
        + '<div class="pp-ring"><span class="pp-day">'+e.day+'</span><span class="pp-mon">'+e.mon+'</span></div>'
        + '<div class="pp-info"><b>'+e.title+'</b><span>'+[e.venue, e.time].filter(Boolean).join(' · ')+'</span>'
        + '<a href="'+e.ticketUrl+'" target="_blank" rel="noopener">'+e.ticketLabel+' →</a></div></div>';
    }).join('');
    var visas = c.diary.map(function(d){
      return '<div class="pp-visa rv"><b>'+d.film+'</b> ('+d.year+')<span>'+MFC.stars(d.stars)+' · '+d.date+'</span><i>'+d.note+'</i></div>';
    }).join('');
    return '<section class="pp-book">'
      + '<div class="pp-cover rv"><div class="pp-emblem">✦</div><h1>'+c.club.name+'</h1><p>CINEMA PASSPORT · 305</p></div>'
      + '<div class="pp-pages">'
      + '<h2 class="rv">Entry stamps</h2><div class="pp-stamps">'+stamps+'</div>'
      + '<h2 class="rv">Travel history <span class="pp-sub">via Letterboxd</span></h2><div class="pp-visas">'+visas+'</div>'
      + '<div class="pp-join rv"><b>'+c.join.network+'</b> · '+c.join.price+'<br><a href="'+c.join.patreon+'" target="_blank" rel="noopener">Get stamped in</a> · <a href="'+c.join.volunteer+'" target="_blank" rel="noopener">Volunteer</a></div>'
      + '</div></section>';
  }
};

THEMES.radio = {
  label: "Radio 305",
  meta: "#201408",
  render: function(c){
    var dial = c.events.map(function(e, i){
      var freq = (88.1 + i * 4.7).toFixed(1);
      return '<button type="button" class="rd-station rv" data-i="'+i+'"><span class="rd-freq">'+freq+'</span><span class="rd-name">'+e.tag+'</span></button>';
    }).join('');
    var shows = c.events.map(function(e, i){
      return '<article class="rd-show" data-i="'+i+'"><div class="rd-onair">● ON AIR</div>'
        + '<h3>'+e.title+'</h3><p>'+[e.dow, e.mon, e.day, e.time, e.venue, e.note].filter(Boolean).join(' · ')+'</p>'
        + '<a href="'+e.ticketUrl+'" target="_blank" rel="noopener">'+e.ticketLabel+'</a></article>';
    }).join('');
    var req = c.reviews.slice(0, 4).map(function(r){
      return '<div class="rd-req rv">“'+(r.text || r.film)+'”<span>— '+c.member.handle+' · '+r.film+'</span></div>';
    }).join('');
    return '<section class="rd-radio">'
      + '<div class="rd-top rv"><div class="rd-brand">RADIO 305 FM</div><div class="rd-needle"><div class="rd-line"></div></div>'
      + '<div class="rd-dial">'+dial+'</div></div>'
      + '<div class="rd-stage">'+shows+'</div>'
      + '<h2 class="rv">Listener requests</h2><div class="rd-reqs">'+req+'</div>'
      + '<div class="rd-join rv"><b>'+c.join.network+'</b> · '+c.join.price+' — <a href="'+c.join.patreon+'" target="_blank" rel="noopener">Become a member</a></div>'
      + '</section>';
  },
  mount: function(root){
    var btns = root.querySelectorAll('.rd-station'), shows = root.querySelectorAll('.rd-show');
    function tune(i){
      btns.forEach(function(b, j){ b.classList.toggle('on', j === i); });
      shows.forEach(function(s, j){ s.classList.toggle('on', j === i); });
      var line = root.querySelector('.rd-line');
      if (line) line.style.left = (8 + i * 42) + '%';
    }
    btns.forEach(function(b){ b.addEventListener('click', function(){ tune(parseInt(b.dataset.i, 10)); }); });
    tune(0);
  }
};

THEMES.menu = {
  label: "Tasting Menu",
  meta: "#2b1a12",
  render: function(c){
    var courses = c.events.map(function(e, i){
      var label = ['Amuse-bouche', 'Primo', 'Dolce'][i] || 'Course ' + (i + 1);
      return '<div class="mn-course rv"><div class="mn-clabel">'+label+' · '+e.tag+'</div>'
        + '<h3>'+e.title+'</h3><p>'+[e.dow, e.mon, e.day, e.time, e.venue, e.note].filter(Boolean).join(' · ')+'</p>'
        + '<a href="'+e.ticketUrl+'" target="_blank" rel="noopener">'+e.ticketLabel+'</a></div>';
    }).join('');
    var pairings = c.diary.map(function(d){
      return '<div class="mn-pair rv"><b>'+d.film+'</b><span>'+MFC.stars(d.stars)+' · pairs with '+d.note.split('.')[0]+'</span></div>';
    }).join('');
    return '<section class="mn-menu">'
      + '<header class="rv"><p class="mn-est">EST. MIAMI · 305</p><h1>'+c.club.name+'</h1><p class="mn-sub">A tasting menu of upcoming nights</p></header>'
      + '<div class="mn-courses">'+courses+'</div>'
      + '<h2 class="rv">Sommelier&rsquo;s pairings <span>from the diary</span></h2><div class="mn-pairs">'+pairings+'</div>'
      + '<footer class="rv"><b>'+c.join.network+'</b> · '+c.join.price+'<br><a href="'+c.join.patreon+'" target="_blank" rel="noopener">Reserve your seat</a></footer>'
      + '</section>';
  }
};

THEMES.blueprint = {
  label: "Blueprint",
  meta: "#123a5c",
  render: function(c){
    var rooms = c.events.map(function(e, i){
      return '<div class="bp-room rv" data-i="'+i+'"><span class="bp-num">R-0'+(i+1)+'</span><b>'+e.title+'</b>'
        + '<span>'+[e.dow, e.mon, e.day, e.time, e.venue].filter(Boolean).join(' · ')+'</span>'
        + '<a href="'+e.ticketUrl+'" target="_blank" rel="noopener">'+e.ticketLabel+'</a></div>';
    }).join('');
    var specs = c.reviews.slice(0, 3).map(function(r){
      return '<div class="bp-spec rv"><b>SPEC '+r.film.toUpperCase()+'</b><span>'+(r.stars ? MFC.stars(r.stars) : '—')+' · logged '+r.date+'</span></div>';
    }).join('');
    return '<section class="bp-sheet">'
      + '<header class="rv"><h1>'+c.club.name+' — SITE PLAN</h1><p>SCALE 1:305 · SHEET A-101 · '+c.club.tagline+'</p></header>'
      + '<div class="bp-grid">'+rooms+'</div>'
      + '<h2 class="rv">Material specs <span>community log</span></h2><div class="bp-specs">'+specs+'</div>'
      + '<footer class="rv">TITLE BLOCK — '+c.join.network+' · '+c.join.price+' · <a href="'+c.join.patreon+'" target="_blank" rel="noopener">join</a> · <a href="'+c.join.volunteer+'" target="_blank" rel="noopener">volunteer</a></footer>'
      + '</section>';
  }
};

THEMES.mixtape = {
  label: "Mixtape",
  meta: "#1c1c22",
  render: function(c){
    var tracks = c.events.map(function(e, i){
      var side = i < 2 ? 'A' : 'B';
      return '<button type="button" class="mx-track rv" data-i="'+i+'"><span class="mx-num">'+side+(i % 2 + 1)+'</span>'
        + '<span class="mx-t">'+e.title+'</span><span class="mx-m">'+[e.mon, e.day, e.venue].filter(Boolean).join(' · ')+'</span></button>';
    }).join('');
    var detail = c.events.map(function(e, i){
      return '<article class="mx-detail" data-i="'+i+'"><h3>'+e.title+'</h3>'
        + '<p>'+[e.dow, e.mon, e.day, e.time, e.venue, e.note].filter(Boolean).join(' · ')+'</p>'
        + '<a href="'+e.ticketUrl+'" target="_blank" rel="noopener">'+e.ticketLabel+'</a></article>';
    }).join('');
    var liner = c.diary.map(function(d){
      return '<div class="mx-liner rv"><b>'+d.film+'</b> '+MFC.stars(d.stars)+'<span>'+d.note+'</span></div>';
    }).join('');
    return '<section class="mx-tape">'
      + '<div class="mx-shell rv"><div class="mx-window"><div class="mx-reel"></div><div class="mx-reel"></div></div>'
      + '<div class="mx-label">'+c.club.name+' · VOL. 305</div></div>'
      + '<div class="mx-tracks">'+tracks+'</div><div class="mx-details">'+detail+'</div>'
      + '<h2 class="rv">Liner notes</h2><div class="mx-liners">'+liner+'</div>'
      + '<div class="mx-join rv"><b>'+c.join.network+'</b> · '+c.join.price+' — <a href="'+c.join.patreon+'" target="_blank" rel="noopener">Dub yourself in</a></div>'
      + '</section>';
  },
  mount: function(root){
    var ts = root.querySelectorAll('.mx-track'), ds = root.querySelectorAll('.mx-detail');
    function play(i){
      ts.forEach(function(t, j){ t.classList.toggle('on', j === i); });
      ds.forEach(function(d, j){ d.classList.toggle('on', j === i); });
    }
    ts.forEach(function(t){ t.addEventListener('click', function(){ play(parseInt(t.dataset.i, 10)); }); });
    play(0);
  }
};

THEMES.newspaper = {
  label: "The 305 Times",
  meta: "#f4f1e8",
  render: function(c){
    var lead = c.events[0];
    var rest = c.events.slice(1).map(function(e){
      return '<article class="nw-story rv"><h3>'+e.title+'</h3><p>'+[e.dow, e.mon, e.day, e.time, e.venue].filter(Boolean).join(' · ')+'</p>'
        + '<a href="'+e.ticketUrl+'" target="_blank" rel="noopener">'+e.ticketLabel+'</a></article>';
    }).join('');
    var col = c.reviews.slice(0, 3).map(function(r){
      return '<div class="nw-col rv"><b>'+r.film+'</b> '+(r.stars ? MFC.stars(r.stars) : '')+'<p>'+(r.text || 'Logged '+r.date+' by '+c.member.handle)+'</p></div>';
    }).join('');
    return '<section class="nw-paper">'
      + '<header class="rv"><p class="nw-dateline">MIAMI, FLA. · '+c.club.handle+'</p><h1>The 305 Times</h1><p class="nw-tag">'+c.club.slogan+'</p></header>'
      + '<article class="nw-lead rv"><div class="nw-kicker">FRONT PAGE · '+lead.tag+'</div><h2>'+lead.title+'</h2>'
      + '<p>'+[lead.dow, lead.mon, lead.day, lead.time, lead.venue, lead.note].filter(Boolean).join(' · ')+'</p>'
      + '<a class="nw-btn" href="'+lead.ticketUrl+'" target="_blank" rel="noopener">'+lead.ticketLabel+'</a></article>'
      + '<div class="nw-rest">'+rest+'</div>'
      + '<h2 class="rv nw-sec">The Critic&rsquo;s Desk</h2><div class="nw-cols">'+col+'</div>'
      + '<footer class="rv">Subscriptions — <b>'+c.join.network+'</b> · '+c.join.price+' · <a href="'+c.join.patreon+'" target="_blank" rel="noopener">Subscribe</a></footer>'
      + '</section>';
  }
};

THEMES.arcade = {
  label: "Arcade",
  meta: "#0d0221",
  render: function(c){
    var games = c.events.map(function(e, i){
      return '<button type="button" class="ac-game rv" data-i="'+i+'"><span class="ac-marq">'+e.tag+'</span>'
        + '<span class="ac-t">'+e.title+'</span><span class="ac-hi">HI-SCORE '+[25, 18, 12][i % 3]+'K</span></button>';
    }).join('');
    var detail = c.events.map(function(e, i){
      return '<div class="ac-detail" data-i="'+i+'"><h3>'+e.title+'</h3>'
        + '<p>'+[e.dow, e.mon, e.day, e.time, e.venue, e.note].filter(Boolean).join(' · ')+'</p>'
        + '<a href="'+e.ticketUrl+'" target="_blank" rel="noopener">▸ '+e.ticketLabel+'</a></div>';
    }).join('');
    var lb = c.diary.map(function(d, i){
      return '<div class="ac-lb rv"><span>'+(i+1)+'.</span><b>'+d.film+'</b><span>'+MFC.stars(d.stars)+'</span></div>';
    }).join('');
    return '<section class="ac-cab">'
      + '<div class="ac-top rv">INSERT COIN · '+c.club.name+'</div>'
      + '<div class="ac-screen"><div class="ac-games">'+games+'</div><div class="ac-details">'+detail+'</div></div>'
      + '<h2 class="rv">Leaderboard <span>diary high scores</span></h2><div class="ac-lbs">'+lb+'</div>'
      + '<div class="ac-join rv">CONTINUE? <b>'+c.join.price+'</b> — <a href="'+c.join.patreon+'" target="_blank" rel="noopener">9…8… JOIN</a></div>'
      + '</section>';
  },
  mount: function(root){
    var gs = root.querySelectorAll('.ac-game'), ds = root.querySelectorAll('.ac-detail');
    function sel(i){
      gs.forEach(function(g, j){ g.classList.toggle('on', j === i); });
      ds.forEach(function(d, j){ d.classList.toggle('on', j === i); });
    }
    gs.forEach(function(g){ g.addEventListener('click', function(){ sel(parseInt(g.dataset.i, 10)); }); });
    sel(0);
  }
};
