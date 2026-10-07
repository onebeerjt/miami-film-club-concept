// MIAMI FILM CLUB — batch 7 concept themes.

THEMES.museum = {
  label: "Museum",
  meta: "#f2efe6",
  render: function(c){
    var wings = c.events.map(function(e, i){
      return '<div class="mu-wing rv"><div class="mu-num">'+['I','II','III'][i]+'</div><b>'+e.title+'</b>'
        + '<span>'+[e.dow, e.mon, e.day, e.time, e.venue].filter(Boolean).join(' · ')+'</span>'
        + '<a href="'+e.ticketUrl+'" target="_blank" rel="noopener">Plan your visit →</a></div>';
    }).join('');
    var coll = c.diary.map(function(d){
      return '<div class="mu-item rv"><img src="'+d.poster+'" alt="'+d.film+'" loading="lazy"><div><b>'+d.film+'</b> ('+d.year+')<span>'+MFC.stars(d.stars)+' · '+d.date+'</span><i>'+d.note+'</i></div></div>';
    }).join('');
    return '<section class="mu-hall"><header class="rv"><p>THE 305 COLLECTION</p><h1>'+c.club.name+'</h1><p class="mu-sub">An exhibition of nights at the movies</p></header>'
      + '<div class="mu-wings">'+wings+'</div>'
      + '<h2 class="rv">Permanent collection</h2><div class="mu-coll">'+coll+'</div>'
      + '<footer class="rv">Membership — <b>'+c.join.price+'</b> <a href="'+c.join.patreon+'" target="_blank" rel="noopener">Become a patron</a></footer></section>';
  }
};

THEMES.airbnb = {
  label: "Stay & Screen",
  meta: "#ffffff",
  render: function(c){
    var stays = c.events.map(function(e, i){
      return '<button type="button" class="ab-card rv" data-i="'+i+'"><div class="ab-ph"><span>'+e.mon+' '+e.day+'</span></div>'
        + '<b>'+e.title+'</b><span class="ab-m">'+[e.venue, e.time].filter(Boolean).join(' · ')+' ★ '+(4.9 - i * 0.1).toFixed(1)+'</span></button>';
    }).join('');
    var detail = c.events.map(function(e, i){
      return '<div class="ab-detail" data-i="'+i+'"><h3>'+e.title+'</h3>'
        + '<p>'+[e.dow, e.mon, e.day, e.time, e.venue, e.note].filter(Boolean).join(' · ')+'</p>'
        + '<div class="ab-book"><span><b>Free</b> / night</span><a href="'+e.ticketUrl+'" target="_blank" rel="noopener">'+e.ticketLabel+'</a></div></div>';
    }).join('');
    var rev = c.reviews.slice(0, 3).map(function(r){
      return '<div class="ab-rev rv"><b>'+c.member.handle+'</b><span>★ '+(r.stars || '—')+' · '+r.date+'</span><p>'+(r.text || r.film+' — a night to remember.')+'</p></div>';
    }).join('');
    return '<section class="ab-list"><header class="rv"><h1>Screenings in Miami</h1><p>'+c.club.tagline+' · '+c.stats.upcoming+' upcoming</p></header>'
      + '<div class="ab-cards">'+stays+'</div><div class="ab-details">'+detail+'</div>'
      + '<h2 class="rv">Guest reviews</h2>'+rev
      + '<div class="ab-join rv">Become a Superhost — <b>'+c.join.price+'</b> <a href="'+c.join.patreon+'" target="_blank" rel="noopener">Join</a></div></section>';
  },
  mount: function(root){
    var cs = root.querySelectorAll('.ab-card'), ds = root.querySelectorAll('.ab-detail');
    function s(i){
      cs.forEach(function(x, j){ x.classList.toggle('on', j === i); });
      ds.forEach(function(x, j){ x.classList.toggle('on', j === i); });
    }
    cs.forEach(function(x){ x.addEventListener('click', function(){ s(parseInt(x.dataset.i, 10)); }); });
    s(0);
  }
};

THEMES.deck = {
  label: "Keynote",
  meta: "#000000",
  render: function(c){
    var slides = c.events.map(function(e, i){
      return '<div class="dk-slide" data-i="'+i+'"><div class="dk-k">'+e.tag+'</div><h3>'+e.title+'</h3>'
        + '<p>'+[e.dow, e.mon, e.day, e.time, e.venue].filter(Boolean).join(' · ')+'</p>'
        + '<a href="'+e.ticketUrl+'" target="_blank" rel="noopener">'+e.ticketLabel+' →</a></div>';
    }).join('');
    var app = c.reviews.slice(0, 3).map(function(r, i){
      return '<div class="dk-slide" data-s="a'+i+'"><div class="dk-k">APPENDIX</div><h3>'+r.film+'</h3>'
        + '<p>'+(r.stars ? MFC.stars(r.stars) : '')+' '+(r.text || 'Logged '+r.date)+'</p></div>';
    }).join('');
    return '<section class="dk-deck"><div class="dk-stage">'+slides+app+'</div>'
      + '<div class="dk-ctrl rv"><button type="button" class="dk-prev">←</button><span class="dk-count">1 / '+(c.events.length + 3)+'</span><button type="button" class="dk-next">→</button></div>'
      + '<div class="dk-join rv"><b>'+c.join.network+'</b> · '+c.join.price+' — <a href="'+c.join.patreon+'" target="_blank" rel="noopener">Q&A after</a></div></section>';
  },
  mount: function(root){
    var slides = root.querySelectorAll('.dk-slide'), count = root.querySelector('.dk-count'), k = 0;
    function go(i){
      k = (i + slides.length) % slides.length;
      slides.forEach(function(s, j){ s.classList.toggle('on', j === k); });
      if (count) count.textContent = (k + 1) + ' / ' + slides.length;
    }
    root.querySelector('.dk-prev').addEventListener('click', function(){ go(k - 1); });
    root.querySelector('.dk-next').addEventListener('click', function(){ go(k + 1); });
    root.addEventListener('keydown', function(e){ if (e.key === 'ArrowRight') go(k + 1); if (e.key === 'ArrowLeft') go(k - 1); });
    go(0);
  }
};

THEMES.wanted = {
  label: "Wanted",
  meta: "#e5d3a8",
  render: function(c){
    var posters = c.events.map(function(e){
      return '<div class="wt-poster rv"><div class="wt-head">WANTED</div><h3>'+e.title+'</h3>'
        + '<p>Last seen: '+[e.dow, e.mon, e.day, e.time, e.venue].filter(Boolean).join(' · ')+'</p>'
        + '<div class="wt-reward">REWARD: '+e.ticketLabel+'</div>'
        + '<a href="'+e.ticketUrl+'" target="_blank" rel="noopener">Claim reward →</a></div>';
    }).join('');
    var alley = c.diary.map(function(d){
      return '<div class="wt-alley rv"><b>'+d.film+'</b> ('+d.year+')<span>identified '+d.date+' · '+MFC.stars(d.stars)+'</span></div>';
    }).join('');
    return '<section class="wt-board"><h1 class="rv">'+c.club.name+' <span>SHERIFF&rsquo;S OFFICE</span></h1>'
      + '<div class="wt-posters">'+posters+'</div>'
      + '<h2 class="rv">Previously apprehended</h2><div class="wt-alleys">'+alley+'</div>'
      + '<footer class="rv">Join the posse — <b>'+c.join.price+'</b> <a href="'+c.join.patreon+'" target="_blank" rel="noopener">Enlist</a></footer></section>';
  }
};

THEMES.playbill = {
  label: "Playbill",
  meta: "#f8f5ec",
  render: function(c){
    var acts = c.events.map(function(e, i){
      return '<div class="pb-act rv"><div class="pb-an">ACT '+['I','II','III'][i]+'</div><h3>'+e.title+'</h3>'
        + '<p class="pb-cast">'+[e.dow, e.mon, e.day, e.time, e.venue].filter(Boolean).join(' · ')+'</p>'
        + '<a href="'+e.ticketUrl+'" target="_blank" rel="noopener">'+e.ticketLabel+'</a></div>';
    }).join('');
    var notes = c.reviews.slice(0, 3).map(function(r){
      return '<div class="pb-note rv"><b>'+r.film+'</b> '+(r.stars ? MFC.stars(r.stars) : '')+'<p>'+(r.text || 'Logged '+r.date)+'</p></div>';
    }).join('');
    return '<section class="pb-prog"><header class="rv"><p class="pb-pres">'+c.club.handle+' presents</p><h1>'+c.club.name+'</h1><p class="pb-sub">'+c.club.slogan+'</p></header>'
      + acts + '<h2 class="rv">Director&rsquo;s notes</h2>' + notes
      + '<footer class="rv">Season subscriptions <b>'+c.join.price+'</b> — <a href="'+c.join.patreon+'" target="_blank" rel="noopener">Subscribe</a></footer></section>';
  }
};

THEMES.departures = {
  label: "Departures",
  meta: "#0a0a0a",
  render: function(c){
    var rows = c.events.map(function(e, i){
      return '<button type="button" class="dp-row rv" data-i="'+i+'"><span class="dp-time">'+(e.time || e.mon+' '+e.day)+'</span>'
        + '<span class="dp-dest">'+e.title.toUpperCase()+'</span><span class="dp-gate">'+e.tag+'</span>'
        + '<span class="dp-stat">'+(i === 0 ? 'BOARDING' : 'ON TIME')+'</span></button>';
    }).join('');
    var detail = c.events.map(function(e, i){
      return '<div class="dp-detail" data-i="'+i+'"><h3>'+e.title+'</h3>'
        + '<p>Flight 305 · Gate '+e.tag+' · '+[e.dow, e.mon, e.day, e.time, e.venue].filter(Boolean).join(' · ')+'</p>'
        + '<a href="'+e.ticketUrl+'" target="_blank" rel="noopener">'+e.ticketLabel+'</a></div>';
    }).join('');
    return '<section class="dp-board"><h1 class="rv">DEPARTURES <span>305 INTL</span></h1>'
      + '<div class="dp-rows">'+rows+'</div><div class="dp-details">'+detail+'</div>'
      + '<div class="dp-join rv">Frequent flyer — <b>'+c.join.price+'</b> <a href="'+c.join.patreon+'" target="_blank" rel="noopener">Join the club</a></div></section>';
  },
  mount: function(root){
    var rs = root.querySelectorAll('.dp-row'), ds = root.querySelectorAll('.dp-detail');
    function f(i){
      rs.forEach(function(r, j){ r.classList.toggle('on', j === i); });
      ds.forEach(function(d, j){ d.classList.toggle('on', j === i); });
    }
    rs.forEach(function(r){ r.addEventListener('click', function(){ f(parseInt(r.dataset.i, 10)); }); });
    f(0);
  }
};

THEMES.recipe = {
  label: "Recipe Box",
  meta: "#fff8ee",
  render: function(c){
    var cards = c.events.map(function(e, i){
      return '<article class="rc-card rv"><div class="rc-time">'+(e.time || e.mon+' '+e.day)+' · serves a crowd</div><h3>'+e.title+'</h3>'
        + '<div class="rc-ing"><b>Ingredients:</b> '+[e.venue, e.note || 'good company', 'popcorn'].filter(Boolean).join(', ')+'</div>'
        + '<div class="rc-steps"><b>Method:</b> 1. Show up. 2. Watch together. 3. Talk about it after.</div>'
        + '<a href="'+e.ticketUrl+'" target="_blank" rel="noopener">'+e.ticketLabel+'</a></article>';
    }).join('');
    var box = c.diary.map(function(d){
      return '<div class="rc-idx rv"><b>'+d.film+'</b><span>'+MFC.stars(d.stars)+'</span></div>';
    }).join('');
    return '<section class="rc-box"><header class="rv"><h1>The Screening Cookbook</h1><p>'+c.club.name+' · tested recipes for a good night</p></header>'
      + cards + '<h2 class="rv">Recipe index</h2><div class="rc-idxs">'+box+'</div>'
      + '<footer class="rv">Get the whole box — <b>'+c.join.price+'</b> <a href="'+c.join.patreon+'" target="_blank" rel="noopener">Subscribe</a></footer></section>';
  }
};

THEMES.comic = {
  label: "Comic Book",
  meta: "#fff200",
  render: function(c){
    var panels = c.events.map(function(e, i){
      return '<div class="cm-panel rv"><div class="cm-cap">'+e.tag+'!</div><h3>'+e.title+'</h3>'
        + '<p>'+[e.dow, e.mon, e.day, e.time, e.venue].filter(Boolean).join(' · ')+'</p>'
        + '<a href="'+e.ticketUrl+'" target="_blank" rel="noopener">POW! '+e.ticketLabel+'</a></div>';
    }).join('');
    var strips = c.reviews.slice(0, 3).map(function(r){
      return '<div class="cm-strip rv"><b>'+r.film+'</b> '+(r.stars ? MFC.stars(r.stars) : '')+'<p>'+(r.text || 'Logged '+r.date)+'</p></div>';
    }).join('');
    return '<section class="cm-issue"><header class="rv"><div class="cm-burst">ISSUE #305!</div><h1>'+c.club.name+'</h1></header>'
      + '<div class="cm-panels">'+panels+'</div>'
      + '<h2 class="rv">Letters page</h2>'+strips
      + '<footer class="rv">Subscribe — <b>'+c.join.price+'</b>/mo <a href="'+c.join.patreon+'" target="_blank" rel="noopener">Excelsior!</a></footer></section>';
  }
};

THEMES.answering = {
  label: "Answering Machine",
  meta: "#1a1a1a",
  render: function(c){
    var msgs = c.events.map(function(e, i){
      return '<button type="button" class="am-msg rv" data-i="'+i+'"><span class="am-n">MSG '+(i+1)+'</span>'
        + '<span class="am-t">'+e.title+'</span><span class="am-d">'+e.mon+' '+e.day+'</span></button>';
    }).join('');
    var play = c.events.map(function(e, i){
      return '<div class="am-play" data-i="'+i+'"><div class="am-lcd">▶ PLAYING MSG '+(i+1)+'</div><h3>'+e.title+'</h3>'
        + '<p><i>"Hey, it&rsquo;s the film club. '+e.title+' is happening '+[e.dow, e.mon, e.day, e.time].filter(Boolean).join(' ')+' at '+e.venue+'. Be there."</i></p>'
        + '<a href="'+e.ticketUrl+'" target="_blank" rel="noopener">'+e.ticketLabel+'</a></div>';
    }).join('');
    return '<section class="am-machine"><div class="am-face rv"><div class="am-lcd">3 NEW MESSAGES</div><div class="am-btns"><span>⏮</span><span>▶</span><span>⏭</span><span>⏺</span></div></div>'
      + '<div class="am-msgs">'+msgs+'</div><div class="am-plays">'+play+'</div>'
      + '<div class="am-join rv">Leave your own message — <b>'+c.join.price+'</b> <a href="'+c.join.patreon+'" target="_blank" rel="noopener">Join</a></div></section>';
  },
  mount: function(root){
    var ms = root.querySelectorAll('.am-msg'), ps = root.querySelectorAll('.am-play');
    function p(i){
      ms.forEach(function(m, j){ m.classList.toggle('on', j === i); });
      ps.forEach(function(x, j){ x.classList.toggle('on', j === i); });
    }
    ms.forEach(function(m){ m.addEventListener('click', function(){ p(parseInt(m.dataset.i, 10)); }); });
    p(0);
  }
};
