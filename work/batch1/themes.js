// MIAMI FILM CLUB — batch 1 concept themes.
// THEMES is provided by the shell. Each theme: {label, meta, render(c), mount(root)}.
// render(c) returns an HTML string; mount(root) attaches listeners inside root only.

THEMES.neon = {
  label: "Neon 305",
  meta: "#06061f",
  render: function(c){
    var ev = c.events;
    var dateCards = ev.map(function(e, i){
      return '<button type="button" class="n305-date rv" data-night="'+i+'" data-tag="'+e.tag+'">'
        + '<span class="n305-n">'+(i+1)+'</span>'
        + '<span class="n305-dow">'+(e.dow || '&nbsp;')+'</span>'
        + '<span class="n305-day">'+e.day+'</span>'
        + '<span class="n305-mon">'+e.mon+'</span>'
        + '<span class="n305-vibe">'+e.tag+'</span>'
        + '</button>';
    }).join('');
    var plans = ev.map(function(e, i){
      var when = [e.dow, e.mon, e.day].filter(function(x){ return x; }).join(' ');
      var sub = [e.venue, e.time, e.note].filter(function(x){ return x; }).join(' · ');
      return '<article class="n305-plan" data-night="'+i+'">'
        + '<div class="n305-ptag">'+e.tag+'</div>'
        + '<h3 class="n305-ptitle">'+e.title+'</h3>'
        + '<p class="n305-pwhen">'+when+'</p>'
        + (sub ? '<p class="n305-psub">'+sub+'</p>' : '')
        + '<a class="n305-ticket" href="'+e.ticketUrl+'" target="_blank" rel="noopener">'+e.ticketLabel+'</a>'
        + '</article>';
    }).join('');
    var oneLiners = c.reviews.filter(function(r){ return r.text; }).map(function(r){
      return '<div class="n305-titem">&ldquo;'+r.text+'&rdquo; <span class="n305-tfilm">&mdash; '+r.film+'</span></div>';
    }).join('');
    var recent = c.diary.map(function(d){
      return '<span class="n305-rd">'+d.film+' <em>'+MFC.stars(d.stars)+'</em></span>';
    }).join('');
    return ''
      + '<section class="n305-hero rv">'
      +   '<div class="n305-kicker">'+c.club.handle+' · '+c.club.tagline+'</div>'
      +   '<h1 class="n305-h1">Don&rsquo;t miss<br>the <span class="n305-hl">305</span>.</h1>'
      +   '<p class="n305-sub">'+c.stats.upcoming+' nights on the calendar. Pick yours in 3 steps.</p>'
      + '</section>'
      + '<section class="n305-step">'
      +   '<h2 class="n305-steph rv"><span class="n305-snum">1</span> Pick your night</h2>'
      +   '<div class="n305-dates">'+dateCards+'</div>'
      + '</section>'
      + '<section class="n305-step">'
      +   '<h2 class="n305-steph rv"><span class="n305-snum">2</span> Pick your vibe</h2>'
      +   '<div class="n305-chips">'
      +     '<button type="button" class="n305-chip on rv" data-filter="all">All</button>'
      +     '<button type="button" class="n305-chip rv" data-filter="NEW">New</button>'
      +     '<button type="button" class="n305-chip rv" data-filter="REPERTORY">Repertory</button>'
      +     '<button type="button" class="n305-chip rv" data-filter="PERK">Perk</button>'
      +   '</div>'
      + '</section>'
      + '<section class="n305-step">'
      +   '<h2 class="n305-steph rv"><span class="n305-snum">3</span> Your plan</h2>'
      +   '<div class="n305-plans">'+plans+'</div>'
      + '</section>'
      + '<section class="n305-street rv">'
      +   '<h2 class="n305-steph"><span class="n305-snum">#</span> Word on the street</h2>'
      +   '<div class="n305-tbox"><p class="n305-tlive"></p></div>'
      +   '<div class="n305-tstash" hidden>'+oneLiners+'</div>'
      + '</section>'
      + '<section class="n305-recent rv">'
      +   '<h2 class="n305-steph"><span class="n305-snum">+</span> Last time on the big screen</h2>'
      +   '<div class="n305-recentrow">'+recent+'</div>'
      + '</section>'
      + '<div class="n305-joinbar">'
      +   '<span class="n305-jt">'+c.join.network+' · '+c.join.price+'</span>'
      +   '<a class="n305-join" href="'+c.join.patreon+'" target="_blank" rel="noopener">Join the crew</a>'
      + '</div>';
  },
  mount: function(root){
    function show(i){
      root.querySelectorAll('.n305-date').forEach(function(el, j){ el.classList.toggle('on', j === i); });
      root.querySelectorAll('.n305-plan').forEach(function(el, j){ el.classList.toggle('on', j === i); });
    }
    root.addEventListener('click', function(ev){
      var d = ev.target.closest('.n305-date');
      if (d){ show(parseInt(d.getAttribute('data-night'), 10)); return; }
      var ch = ev.target.closest('.n305-chip');
      if (ch){
        var f = ch.getAttribute('data-filter');
        root.querySelectorAll('.n305-chip').forEach(function(el){ el.classList.toggle('on', el === ch); });
        root.querySelectorAll('.n305-date').forEach(function(el){
          el.classList.toggle('dim', !(f === 'all' || el.getAttribute('data-tag') === f));
        });
      }
    });
    show(0);
    var items = Array.prototype.slice.call(root.querySelectorAll('.n305-titem'));
    var live = root.querySelector('.n305-tlive');
    if (items.length && live){
      var k = 0;
      live.innerHTML = items[0].innerHTML;
      if (items.length > 1){
        setInterval(function(){
          k = (k + 1) % items.length;
          live.style.opacity = '0';
          setTimeout(function(){ live.innerHTML = items[k].innerHTML; live.style.opacity = '1'; }, 250);
        }, 4500);
      }
    }
  }
};

THEMES.zine = {
  label: "Zine",
  meta: "#171310",
  render: function(c){
    function ransom(text){
      var cls = ['zr1','zr2','zr3','zr4','zr5','zr6'];
      var out = '', k = 0;
      text.split('').forEach(function(ch){
        if (ch === ' '){ out += '<span class="zr-sp">&nbsp;</span>'; return; }
        out += '<span class="'+cls[k % cls.length]+'">'+ch+'</span>';
        k++;
      });
      return out;
    }
    var rots = ['-2.4deg','1.8deg','-1.2deg','2.2deg','-2deg','1.4deg'];
    var flyers = c.events.map(function(e, i){
      var when = [e.dow, e.mon, e.day].filter(function(x){ return x; }).join(' ');
      var sub = [e.venue, e.time, e.note].filter(function(x){ return x; }).join(' · ');
      return '<article class="zine-flyer rv" style="--r:'+rots[i % rots.length]+';--zd:'+(i * 0.14)+'s">'
        + '<div class="zine-stamp">'+e.mon+'<b>'+e.day+'</b><i>'+(e.dow || '')+'</i></div>'
        + '<div class="zine-fvibe">'+e.tag+'</div>'
        + '<h3 class="zine-ftitle">'+e.title+'</h3>'
        + (sub ? '<p class="zine-fsub">'+sub+'</p>' : '')
        + '<p class="zine-fwhen">'+when+'</p>'
        + '<a class="zine-tear" href="'+e.ticketUrl+'" target="_blank" rel="noopener">'
        +   '<span class="zine-tearlabel">✂ - - - tear here - - -</span><b>'+e.ticketLabel+'</b>'
        + '</a>'
        + '</article>';
    }).join('');
    var clips = c.reviews.filter(function(r){ return r.text; }).map(function(r, i){
      return '<div class="zine-clip rv" style="--r:'+rots[(i + 2) % rots.length]+';--zd:'+((i + 3) * 0.14)+'s">'
        + '<p class="zine-q">&ldquo;'+r.text+'&rdquo;</p>'
        + '<p class="zine-qsrc">'+r.film+' ('+r.year+')'+(r.stars != null ? ' · '+MFC.stars(r.stars) : '')+'</p>'
        + '</div>';
    }).join('');
    var mouth = c.quotes.map(function(q){
      return '<p class="zine-mq">&ldquo;'+q.text+'&rdquo;<span>&mdash; '+q.who+'</span></p>';
    }).join('');
    var napkin = c.diary.map(function(d){
      return '<li><span class="zine-nfilm">'+d.film+' <i>('+d.year+')</i></span><span class="zine-nstars">'+MFC.stars(d.stars)+'</span></li>';
    }).join('');
    var links = [
      ['website', c.links.website], ['instagram', c.links.instagram], ['tiktok', c.links.tiktok],
      ['letterboxd', c.links.letterboxd], ['meetup', c.links.meetup], ['linktree', c.links.linktree]
    ].map(function(l){
      return '<a href="'+l[1]+'" target="_blank" rel="noopener">'+l[0]+'</a>';
    }).join(' · ');
    return ''
      + '<section class="zine-hero">'
      +   '<div class="zine-kicker">'+c.club.handle+' · '+c.club.tagline+'</div>'
      +   '<h1 class="zine-ransom" aria-label="'+c.club.name+'">'+ransom('MIAMI FILM CLUB')+'</h1>'
      +   '<p class="zine-slogan">'+c.club.slogan+'</p>'
      +   '<p class="zine-blurb">'+c.club.blurb+'</p>'
      + '</section>'
      + '<div class="zine-wall">'
      +   '<div class="zine-sec rv"><span>UPCOMING NIGHTS — tap a flyer, rip the tab</span></div>'
      +   flyers
      +   '<div class="zine-stat rv" style="--r:-1.8deg;--zd:0.5s"><b>'+c.stats.members+'</b> members · <b>'+c.stats.posts+'</b> posts · <b>'+c.stats.upcoming+'</b> nights coming up</div>'
      +   '<div class="zine-sec rv"><span>CLIPPED FROM THE INBOX</span></div>'
      +   clips
      +   '<div class="zine-clip zine-press rv" style="--r:2deg;--zd:1.1s">'
      +     '<p class="zine-q">&ldquo;'+c.press.quote+'&rdquo;</p>'
      +     '<p class="zine-qsrc">&mdash; <a href="'+c.press.url+'" target="_blank" rel="noopener">'+c.press.outlet+'</a></p>'
      +   '</div>'
      +   '<div class="zine-mouth rv" style="--r:-1.4deg;--zd:1.2s">'
      +     '<div class="zine-sec"><span>WORD OF MOUTH</span></div>'
      +     mouth
      +   '</div>'
      +   '<div class="zine-napkin rv" style="--r:1.2deg;--zd:1.3s">'
      +     '<div class="zine-naphead">screening diary (napkin found at the bar)</div>'
      +     '<ul>'+napkin+'</ul>'
      +   '</div>'
      +   '<article class="zine-flyer zine-join rv" style="--r:-1.6deg;--zd:1.4s">'
      +     '<div class="zine-fvibe">JOIN THE CREW</div>'
      +     '<h3 class="zine-ftitle">'+c.join.network+'</h3>'
      +     '<p class="zine-fsub">'+c.join.pitch+'</p>'
      +     '<p class="zine-fwhen">'+c.join.price+'</p>'
      +     '<a class="zine-tear" href="'+c.join.patreon+'" target="_blank" rel="noopener">'
      +       '<span class="zine-tearlabel">✂ - - - tear here - - -</span><b>BECOME A MEMBER</b>'
      +     '</a>'
      +     '<a class="zine-vol" href="'+c.join.volunteer+'" target="_blank" rel="noopener">or volunteer &rarr;</a>'
      +   '</article>'
      + '</div>'
      + '<footer class="zine-foot rv">'+links+'</footer>';
  },
  mount: function(root){
    var z = 10;
    root.addEventListener('click', function(ev){
      var f = ev.target.closest('.zine-flyer, .zine-clip, .zine-napkin, .zine-mouth');
      if (f){ f.style.zIndex = String(++z); }
    });
  }
};

THEMES.editorial = {
  label: "Editorial",
  meta: "#faf7f0",
  render: function(c){
    var ev = c.events;
    function ticketLink(e){
      return '<a class="ed-tlink" href="'+e.ticketUrl+'" target="_blank" rel="noopener">'+e.ticketLabel+' &rarr;</a>';
    }
    var coverlines = ev.map(function(e){
      return '<li><span class="ed-cl">'+e.title+'</span><span class="ed-cd"></span><span class="ed-cp">'+e.venue+'</span></li>';
    }).join('');
    var listings = ev.map(function(e){
      var when = [e.dow, e.mon, e.day].filter(function(x){ return x; }).join(' ');
      var sub = [e.venue, e.time, e.note].filter(function(x){ return x; }).join(' · ');
      return '<div class="ed-listing">'
        + '<div class="ed-ldate">'+when+' <span class="ed-ltag">'+e.tag+'</span></div>'
        + '<h3 class="ed-ltitle">'+e.title+'</h3>'
        + (sub ? '<p class="ed-lsub">'+sub+'</p>' : '')
        + ticketLink(e)
        + '</div>';
    }).join('');
    var letters = c.reviews.filter(function(r){ return r.text; }).map(function(r){
      return '<div class="ed-letter">'
        + '<p class="ed-sal">Dear Editor,</p>'
        + '<p class="ed-ltext">&ldquo;'+r.text+'&rdquo;</p>'
        + '<p class="ed-sig">&mdash; A moviegoer, on <i>'+r.film+'</i> ('+r.year+')'+(r.stars != null ? ', '+MFC.stars(r.stars) : '')+'</p>'
        + '</div>';
    }).join('');
    var links = [
      ['Website', c.links.website], ['Instagram', c.links.instagram], ['TikTok', c.links.tiktok],
      ['Letterboxd', c.links.letterboxd], ['Meetup', c.links.meetup], ['Linktree', c.links.linktree]
    ].map(function(l){
      return '<a href="'+l[1]+'" target="_blank" rel="noopener">'+l[0]+'</a>';
    }).join(' · ');
    return ''
      + '<header class="ed-cover rv">'
      +   '<div class="ed-issueline">Issue No. '+c.stats.posts+' · October 2026 · Miami, Florida</div>'
      +   '<h1 class="ed-masthead">Miami Film Club</h1>'
      +   '<p class="ed-dek">'+c.club.slogan+'. '+c.club.blurb+'</p>'
      +   '<ul class="ed-coverlines">'+coverlines+'</ul>'
      +   '<div class="ed-coverstats"><b>'+c.stats.members+'</b> members <span>·</span> <b>'+c.stats.upcoming+'</b> nights this issue <span>·</span> '+c.club.handle+'</div>'
      + '</header>'
      + '<nav class="ed-toc rv">'
      +   '<h2 class="ed-sech">Contents</h2>'
      +   '<ol class="ed-toclist">'
      +   '<li><span class="ed-t">Feature: The Rocky Horror Picture Show</span><span class="ed-dots"></span><span class="ed-pg">42</span></li>'
      +   '<li><span class="ed-t">Listings: three nights you should not miss</span><span class="ed-dots"></span><span class="ed-pg">36</span></li>'
      +   '<li><span class="ed-t">Letters to the Editor</span><span class="ed-dots"></span><span class="ed-pg">48</span></li>'
      +   '<li><span class="ed-t">The Back Page: join the club</span><span class="ed-dots"></span><span class="ed-pg">50</span></li>'
      +   '</ol>'
      + '</nav>'
      + '<article class="ed-feature rv">'
      +   '<div class="ed-kicker">Feature · p. 42</div>'
      +   '<h2 class="ed-fhead">The Rocky Horror<br>Picture Show</h2>'
      +   '<div class="ed-byline">Saturday, October 31 · Pinecrest Gardens · Interactive screening · Repertory</div>'
      +   '<p class="ed-lead"><span class="ed-dropcap">T</span>hirty-one days hath October, and on the thirty-first, Pinecrest Gardens goes full Transylvanian. Miami Film Club brings <i>The Rocky Horror Picture Show</i> back to the big screen for an interactive screening &mdash; repertory programming at its most participatory, timed for Halloween night itself.</p>'
      +   '<p>This is the rare repertory night that plays like a party: a full house, a familiar picture, and a crowd that knows every beat. If you have only ever watched it on a couch, you have not really watched it.</p>'
      +   '<aside class="ed-pull">&ldquo;'+c.quotes[1].text+'&rdquo;<span>&mdash; '+c.quotes[1].who+'</span></aside>'
      +   '<p class="ed-tickets">Tickets: '+ticketLink(ev[1])+'</p>'
      + '</article>'
      + '<section class="ed-listings rv">'
      +   '<h2 class="ed-sech">Listings <span class="ed-secp">p. 36</span></h2>'
      +   '<p class="ed-listintro">Three nights on the calendar. All times and venues confirmed.</p>'
      +   '<div class="ed-listgrid">'+listings+'</div>'
      + '</section>'
      + '<section class="ed-letters rv">'
      +   '<h2 class="ed-sech">Letters to the Editor <span class="ed-secp">p. 48</span></h2>'
      +   '<p class="ed-listintro">From the inbox this month.</p>'
      +   letters
      + '</section>'
      + '<section class="ed-back rv">'
      +   '<h2 class="ed-sech">The Back Page <span class="ed-secp">p. 50</span></h2>'
      +   '<h3 class="ed-backh">Don&rsquo;t watch alone.</h3>'
      +   '<p class="ed-backp">'+c.join.pitch+'</p>'
      +   '<p class="ed-backp">'+c.join.network+' · '+c.join.price+'.</p>'
      +   '<div class="ed-backbtns">'
      +     '<a class="ed-btn" href="'+c.join.patreon+'" target="_blank" rel="noopener">Become a member</a>'
      +     '<a class="ed-btn ed-btn2" href="'+c.join.volunteer+'" target="_blank" rel="noopener">Volunteer</a>'
      +   '</div>'
      +   '<blockquote class="ed-press">&ldquo;'+c.press.quote+'&rdquo;<cite>&mdash; <a href="'+c.press.url+'" target="_blank" rel="noopener">'+c.press.outlet+'</a></cite></blockquote>'
      + '</section>'
      + '<footer class="ed-colophon rv">'
      +   '<div class="ed-colname">'+c.club.name+' · '+c.club.handle+'</div>'
      +   '<div class="ed-collinks">'+links+'</div>'
      + '</footer>';
  }
};

THEMES.screenplay = {
  label: "Screenplay",
  meta: "#f4f1e6",
  render: function(c){
    var ev = c.events;
    var e0 = ev[0], e1 = ev[1], e2 = ev[2];
    function parenth(e){
      return '<div class="sp-parenth">(taps <a href="'+e.ticketUrl+'" target="_blank" rel="noopener">'+e.ticketLabel+'</a>)</div>';
    }
    var flashbacks = c.diary.map(function(d){
      return '<div class="sp-flash">'
        + '<div class="sp-action sp-upper">&ldquo;'+d.film.toUpperCase()+'&rdquo; ('+d.year+') &mdash; '+MFC.stars(d.stars)+'</div>'
        + '<div class="sp-action">'+d.date+'. '+d.note+'</div>'
        + '</div>';
    }).join('');
    var memberNos = ['#1','#2','#3','#4','#5','#6'];
    var dialogue = c.reviews.filter(function(r){ return r.text; }).map(function(r, i){
      return '<div class="sp-action">ON SCREEN: <i>'+r.film+'</i> ('+r.year+')'+(r.stars != null ? ' &mdash; '+MFC.stars(r.stars) : '')+'.</div>'
        + '<div class="sp-cue">MEMBER '+memberNos[i]+'</div>'
        + '<div class="sp-paren2">(re: '+r.film+')</div>'
        + '<div class="sp-dialogue">'+r.text+'</div>';
    }).join('');
    return ''
      + '<div class="sp-page">'
      + '<section class="sp-title rv">'
      +   '<h1 class="sp-ttitle">MIAMI FILM CLUB</h1>'
      +   '<p class="sp-tby">written by</p>'
      +   '<p class="sp-thandle">'+c.club.handle+'</p>'
      +   '<p class="sp-ttag">'+c.club.tagline+'</p>'
      +   '<p class="sp-tslogan">&ldquo;'+c.club.slogan+'&rdquo;</p>'
      +   '<p class="sp-tblurb">'+c.club.blurb+'</p>'
      + '</section>'
      + '<div class="sp-fade rv">FADE IN:</div>'
      + '<div class="sp-slug rv">EXT. MIAMI - NIGHT</div>'
      + '<div class="sp-action rv">Neon. Heat. A marquee flickers on somewhere in the 305.</div>'
      + '<div class="sp-cue rv">MIAMI FILM CLUB (V.O.)</div>'
      + '<div class="sp-dialogue rv">Three nights. One crew. '+c.stats.members+' members strong. Don&rsquo;t be the one who hears about it on Monday.</div>'
      + '<div class="sp-action rv">SUPER: &ldquo;'+e0.mon+' '+e0.day+' &mdash; '+e1.mon+' '+e1.day+' &mdash; ALL '+e2.mon+' LONG&rdquo;</div>'
      + '<section class="sp-scene rv">'
      +   '<div class="sp-sceneno">1</div>'
      +   '<div class="sp-slug">INT. '+e0.venue.toUpperCase()+' - NIGHT</div>'
      +   '<div class="sp-action">A legendary room. The crowd is out in force for the '+e0.title.toUpperCase()+'. '+e0.dow+', '+e0.mon+' '+e0.day+' &mdash; doors at '+e0.time+'.</div>'
      +   '<div class="sp-cue">MIAMI FILM CLUB (V.O.)</div>'
      +   '<div class="sp-dialogue">First up: the contest. Free to enter, free to watch. Bring your best turtleneck.</div>'
      +   parenth(e0)
      + '</section>'
      + '<section class="sp-scene rv">'
      +   '<div class="sp-sceneno">2</div>'
      +   '<div class="sp-slug">EXT. '+e1.venue.toUpperCase()+' - NIGHT</div>'
      +   '<div class="sp-action">Halloween night. '+e1.venue+' hosts an interactive screening of THE ROCKY HORROR PICTURE SHOW &mdash; repertory programming at its most participatory. '+e1.dow+', '+e1.mon+' '+e1.day+'.</div>'
      +   '<div class="sp-cue">MIAMI FILM CLUB (V.O.)</div>'
      +   '<div class="sp-dialogue">You&rsquo;ve seen it on a couch. You haven&rsquo;t <i>seen</i> it.</div>'
      +   parenth(e1)
      + '</section>'
      + '<section class="sp-scene rv">'
      +   '<div class="sp-sceneno">3</div>'
      +   '<div class="sp-slug">INT. OKTOBERFEST MIAMI 2026 - DAY</div>'
      +   '<div class="sp-action">All fall long. A member perk: '+e2.note+'. The club gets you in cheaper.</div>'
      +   '<div class="sp-cue">MIAMI FILM CLUB (V.O.)</div>'
      +   '<div class="sp-dialogue">Prost. Discounts taste better with friends.</div>'
      +   parenth(e2)
      + '</section>'
      + '<div class="sp-slug rv">MONTAGE &mdash; FLASHBACKS</div>'
      + '<div class="sp-action rv">What the club has been watching:</div>'
      + '<div class="rv">'+flashbacks+'</div>'
      + '<div class="sp-slug rv">INT. THE INBOX - CONTINUOUS</div>'
      + '<div class="sp-action rv">Members, on the record:</div>'
      + '<div class="rv">'+dialogue+'</div>'
      + '<div class="sp-slug rv">END CARD</div>'
      + '<div class="sp-action rv">'+c.join.pitch+'</div>'
      + '<div class="sp-action rv">'+c.join.network+' &mdash; '+c.join.price+'.</div>'
      + '<div class="sp-endbtns rv">'
      +   '<a class="sp-btn" href="'+c.join.patreon+'" target="_blank" rel="noopener">Become a member</a>'
      +   '<a class="sp-btn" href="'+c.join.volunteer+'" target="_blank" rel="noopener">Volunteer</a>'
      + '</div>'
      + '<div class="sp-fade rv">FADE OUT.</div>'
      + '<div class="sp-credits rv">'
      +   '<a href="'+c.links.website+'" target="_blank" rel="noopener">website</a> · '
      +   '<a href="'+c.links.instagram+'" target="_blank" rel="noopener">instagram</a> · '
      +   '<a href="'+c.links.tiktok+'" target="_blank" rel="noopener">tiktok</a> · '
      +   '<a href="'+c.links.letterboxd+'" target="_blank" rel="noopener">letterboxd</a> · '
      +   '<a href="'+c.links.meetup+'" target="_blank" rel="noopener">meetup</a> · '
      +   '<a href="'+c.links.linktree+'" target="_blank" rel="noopener">linktree</a>'
      + '</div>'
      + '</div>';
  }
};
