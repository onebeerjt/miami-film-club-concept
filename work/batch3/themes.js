/* Batch 3 themes for the Miami Film Club concept pitch.
   Keys: festival, videostore, groupchat, calendar.
   Each render(c) gets the shared CONTENT object; mount(root) is optional.
   No invented data — everything comes from c. */

var THEMES = window.THEMES || (window.THEMES = {});

/* ---------- helpers ---------- */
function _stars(n){
  return (window.MFC && MFC.stars) ? MFC.stars(n) : "";
}
function _ext(url, label){
  return '<a class="rv" href="' + url + '" target="_blank" rel="noopener">' + label + "</a>";
}
function _ticket(ev, cls){
  return '<a class="' + (cls || "ticket") + '" href="' + ev.ticketUrl + '" target="_blank" rel="noopener">' + ev.ticketLabel + "</a>";
}
function _evNum(ev, i){
  return ("0" + (i + 1)).slice(-2);
}

/* =====================================================================
   1) FESTIVAL — "Printed program guide"
   Single editorial column, numbered program entries, venue index,
   past programs archive, critical notices. Pages turn in gently.
   ===================================================================== */
THEMES.festival = {
  label: "Festival",
  meta: "#f7f3ea",
  render: function(c){
    var evs = c.events.map(function(ev, i){
      var notes = ev.note ? '<p class="pnote">' + ev.note + "</p>" : "";
      return (
        '<article class="pentry rv">' +
          '<div class="pentry-top"><span class="pnum" aria-hidden="true">' + _evNum(ev, i) + "</span>" +
          '<span class="ptag">' + ev.tag + "</span></div>" +
          '<h3 class="ptitle">' + ev.title + "</h3>" +
          '<div class="ptime">' +
            (ev.mon !== "FALL" ? '<span class="pdate"><strong>' + ev.day + '</strong><em>' + ev.mon + '</em><span class="pdow">' + ev.dow + "</span></span>" : '<span class="pdate pdate-fall"><strong>' + ev.day + '</strong><em>' + ev.mon + "</em></span>") +
            '<div class="pwhen"><span>' + (ev.time || "Time TBA") + "</span>" +
            (ev.venue ? "<span>" + ev.venue + "</span>" : "") + "</div>" +
          "</div>" +
          notes +
          '<div class="pcta">' + _ticket(ev, "ticket prent") + "</div>" +
        "</article>"
      );
    }).join("");

    var venues = c.events
      .filter(function(ev){ return ev.venue; })
      .map(function(ev, i){
        return '<li class="rv"><span class="vname">' + ev.venue + '</span><span class="vdot" aria-hidden="true"></span><span class="vref">entry ' + _evNum(ev, i) + " — " + ev.title + "</span></li>";
      }).join("");

    var past = c.diary.map(function(d){
      return (
        '<li class="rv"><span class="aname">' + d.film + ' <em>(' + d.year + ")</em></span>" +
        '<span class="adot" aria-hidden="true"></span>' +
        '<span class="adate">' + d.date + ' <span class="astars">' + _stars(d.stars) + "</span></span></li>"
      );
    }).join("");

    var notices = c.reviews.map(function(r){
      var pull = r.text ? "<blockquote>" + r.text + "</blockquote>" : "";
      var stars = (r.stars != null) ? '<div class="nstars">' + _stars(r.stars) + "</div>" : "";
      return (
        '<figure class="notice rv">' + stars + pull +
        '<figcaption><a href="' + r.url + '" target="_blank" rel="noopener">' + r.film + " (" + r.year + ")</a>" +
        '<span class="ndate">' + r.date + "</span></figcaption></figure>"
      );
    }).join("");

    var quotes = c.quotes.map(function(q){
      return '<blockquote class="rv"><p>"' + q.text + '"</p><cite>— ' + q.who + "</cite></blockquote>";
    }).join("");

    return (
      '<div class="fest">' +
        '<header class="masthead rv">' +
          '<p class="kicker">' + c.club.tagline + "</p>" +
          '<h1>' + c.club.name + "</h1>" +
          '<p class="slogan">"' + c.club.slogan + '"</p>' +
          '<p class="blurb">' + c.club.blurb + "</p>" +
          '<p class="youwillmiss rv"><strong>You will miss</strong> the ' + c.stats.upcoming + ' upcoming screenings in the program below — ' +
            _ticket(c.events[0], "ticket") + ' first, ask questions later.</p>' +
        "</header>" +
        '<section class="program" aria-label="Program entries">' + evs + "</section>" +
        '<section class="archive rv" aria-label="Past programs"><h2>Past Programs</h2><ul class="alist">' + past + "</ul></section>" +
        '<section class="notices" aria-label="Critical notices"><h2 class="rv">Critical Notices</h2><div class="ngrid">' + notices + "</div></section>" +
        '<section class="voices rv" aria-label="Member voices"><h2>From the Audience</h2>' + quotes +
          '<p class="pressnote">The <a href="' + c.press.url + '" target="_blank" rel="noopener">' + c.press.outlet + "</a> says the club \"" + c.press.quote + '"</p></section>' +
        '<section class="joinbox rv" aria-label="Join"><h2>Join the ' + c.join.network + '</h2>' +
          '<p class="price">' + c.join.price + "</p><p>" + c.join.pitch + "</p>" +
          '<p class="joinactions">' + _ext(c.join.patreon, "Become a member") + " " + _ext(c.join.volunteer, "Volunteer") + "</p></section>" +
        '<footer class="vindex rv" aria-label="Venue index"><h2>Venue Index</h2><ul>' + venues + "</ul>" +
          '<p class="statsline">' + c.stats.members + ' members · ' + c.stats.posts + ' posts · ' + c.stats.upcoming + ' upcoming</p>' +
          '<p class="netlinks">' + _ext(c.links.website, "Website") + " · " + _ext(c.links.instagram, "Instagram") + " · " + _ext(c.links.tiktok, "TikTok") + " · " + _ext(c.links.letterboxd, "Letterboxd") + " · " + _ext(c.links.meetup, "Meetup") + "</p>" +
        "</footer>" +
      "</div>"
    );
  },
  mount: function(root){ /* no interactivity needed */ }
};

/* =====================================================================
   2) VIDEOSTORE — "The shelf"
   80s rental shop: BE KIND REWIND ticker, three horizontal snap-scroll
   aisles (new releases as VHS boxes, staff picks, previously rented),
   membership card join panel. Boxes tilt on touch, strips glide.
   ===================================================================== */
THEMES.videostore = {
  label: "Video Store",
  meta: "#14100d",
  render: function(c){
    var missed = c.events[0];
    var vhs = c.events.map(function(ev){
      return (
        '<div class="vhs rv" tabindex="0">' +
          '<div class="vhsbox">' +
            '<span class="spine" aria-hidden="true"><span class="spinetext">' + ev.title + "</span></span>" +
            '<div class="vhscase">' +
              '<span class="vtag">' + ev.tag + "</span>" +
              '<h3>' + ev.title + "</h3>" +
              '<p class="vwhen">' + (ev.day !== "★" ? ev.dow + " " + ev.mon + " " + ev.day : ev.mon) + (ev.time ? " · " + ev.time : "") + "</p>" +
              (ev.venue ? '<p class="vvenue">' + ev.venue + "</p>" : "") +
              (ev.note ? '<p class="vnote">' + ev.note + "</p>" : "") +
            "</div>" +
          "</div>" +
          _ticket(ev, "ticket rent") +
        "</div>"
      );
    }).join("");

    var picks = c.diary.map(function(d){
      return (
        '<div class="staffpick rv">' +
          '<img src="' + d.poster + '" alt="' + d.film + ' poster" loading="lazy">' +
          '<div class="staffnote"><h3>' + d.film + ' <em>(' + d.year + ")</em></h3>" +
          '<div class="sstars">' + _stars(d.stars) + '</div><p class="hand">' + d.note + "</p>" +
          '<p class="sdate">' + d.date + "</p></div>" +
        "</div>"
      );
    }).join("");

    var rented = c.reviews.map(function(r){
      var stars = (r.stars != null) ? '<div class="rstars">' + _stars(r.stars) + "</div>" : "";
      var txt = r.text ? "<p>" + r.text + "</p>" : "";
      return (
        '<a class="rental rv" href="' + r.url + '" target="_blank" rel="noopener">' +
          '<div class="rposter"><img src="' + r.poster + '" alt="' + r.film + ' poster" loading="lazy"><span class="duestamp" aria-hidden="true">' + r.date + "</span></div>" +
          '<div class="rmeta"><h3>' + r.film + ' <em>(' + r.year + ")</em></h3>" + stars + txt + "</div>" +
        "</a>"
      );
    }).join("");

    return (
      '<div class="vstore">' +
        '<div class="ticker" aria-hidden="true"><div class="tickertrack">' +
          '<span>BE KIND — PLEASE REWIND</span><span>BE KIND — PLEASE REWIND</span><span>BE KIND — PLEASE REWIND</span><span>BE KIND — PLEASE REWIND</span>' +
        "</div></div>" +
        '<header class="storehead rv">' +
          '<p class="kicker">' + c.club.tagline + "</p>" +
          '<h1>' + c.club.name + "</h1>" +
          '<p class="missline"><strong>Don\'t miss:</strong> ' + missed.title + " — " + missed.dow + " " + missed.mon + " " + missed.day + " · " + _ticket(missed, "ticket rent") + "</p>" +
        "</header>" +
        '<section class="aisle" aria-label="Aisle 1, new releases">' +
          '<h2 class="aislename rv"><span class="anumber">AISLE 1</span> New Releases</h2>' +
          '<div class="strip">' + vhs + "</div></section>" +
        '<section class="aisle" aria-label="Aisle 2, staff picks">' +
          '<h2 class="aislename rv"><span class="anumber">AISLE 2</span> Staff Picks</h2>' +
          '<div class="strip">' + picks + "</div></section>" +
        '<section class="aisle" aria-label="Aisle 3, previously rented">' +
          '<h2 class="aislename rv"><span class="anumber">AISLE 3</span> Previously Rented</h2>' +
          '<div class="strip">' + rented + "</div></section>" +
        '<section class="membercard rv" aria-label="Membership card">' +
          '<div class="cardface">' +
            '<h2>' + c.club.name + " Membership Card</h2>" +
            '<p class="cardnet">' + c.join.network + "</p>" +
            '<p class="cardprice">' + c.join.price + "</p>" +
            '<p class="cardpitch">' + c.join.pitch + "</p>" +
            '<p class="cardactions">' + _ext(c.join.patreon, "Get the card") + " " + _ext(c.join.volunteer, "Volunteer shifts") + "</p>" +
          "</div></section>" +
        '<footer class="storefoot rv">' +
          '<p class="pressline">As seen in the <a href="' + c.press.url + '" target="_blank" rel="noopener">' + c.press.outlet + "</a>: \"" + c.press.quote + '"</p>' +
          '<p class="netlinks">' + _ext(c.links.website, "Website") + " · " + _ext(c.links.instagram, "Instagram") + " · " + _ext(c.links.tiktok, "TikTok") + " · " + _ext(c.links.letterboxd, "Letterboxd") + " · " + _ext(c.links.meetup, "Meetup") + "</p>" +
        "</footer>" +
      "</div>"
    );
  },
  mount: function(root){
    /* tilt VHS boxes on touch/press */
    root.addEventListener("pointerdown", function(e){
      var box = e.target.closest && e.target.closest(".vhs");
      if (box) box.classList.add("tilt");
    });
    root.addEventListener("pointerup", function(e){
      var box = e.target.closest && e.target.closest(".vhs");
      if (box) box.classList.remove("tilt");
    });
    root.addEventListener("pointercancel", function(e){
      var box = e.target.closest && e.target.closest(".vhs");
      if (box) box.classList.remove("tilt");
    });
  }
};

/* =====================================================================
   3) GROUPCHAT — "The club's iMessage thread"
   No sections, no headers, no page: a phone thread of bubbles.
   Events = message bubbles, RSVP poll bubble, diary = photo bubbles,
   reviews = forwarded links, bottom input = join CTA. Pop-in stagger.
   ===================================================================== */
THEMES.groupchat = {
  label: "Group Chat",
  meta: "#f2f2f7",
  render: function(c){
    function bubble(html, cls, who){
      return '<div class="msgrow ' + (cls || "") + '">' +
        (who ? '<div class="mavatar" aria-hidden="true">' + who.charAt(0) + "</div>" : '<div class="mavatar mavatar-spacer" aria-hidden="true"></div>') +
        '<div class="bubble rv">' + html + "</div></div>";
    }
    function stamp(t, read){
      return '<div class="stamp rv"><span>' + t + "</span>" + (read ? '<span class="read">Read</span>' : "") + "</div>";
    }
    var who = c.member.name;
    var out = "";

    out += stamp("Tue, 8:42 AM", true);
    out += bubble(
      "<p><strong>3 things this month you're NOT allowed to miss:</strong></p>",
      "them", who);

    /* Holmes contest = text + rich link bubble with RSVP button */
    out += bubble(
      '<p class="mname">' + who + "</p>" +
      '<p><strong>' + c.events[0].title + "</strong><br>" +
      c.events[0].dow + " " + c.events[0].mon + " " + c.events[0].day + " · " + c.events[0].time + " · " + c.events[0].venue + "</p>" +
      '<a class="richlink" href="' + c.events[0].ticketUrl + '" target="_blank" rel="noopener">' +
        '<span class="richdomain">instagram.com</span><span class="richtitle">' + c.events[0].title + "</span></a>" +
      '<p>' + _ticket(c.events[0], "ticket imsg") + "</p>",
      "them", who);
    out += stamp("8:43 AM", true);

    /* Rocky Horror = "who's in??" + tapbacks */
    out += bubble(
      "<p>ok " + c.events[1].title + " at " + c.events[1].venue + " on " + c.events[1].dow + " " + c.events[1].mon + " " + c.events[1].day +
      (c.events[1].note ? " (" + c.events[1].note.toLowerCase() + ")" : "") + "</p><p><strong>who's in??</strong></p>" +
      '<div class="tapbacks" aria-hidden="true"><span class="tap">loved by 24</span><span class="tap">liked by 31</span></div>' +
      '<p>' + _ticket(c.events[1], "ticket imsg") + "</p>",
      "them", who);

    /* Oktoberfest = forwarded perk */
    out += bubble(
      '<p class="fwd">Forwarded</p>' +
      '<p><strong>' + c.events[2].title + "</strong><br>" + c.events[2].note + "</p>" +
      '<p>' + _ticket(c.events[2], "ticket imsg") + "</p>",
      "them", who);
    out += stamp("8:47 AM", true);

    /* RSVP poll bubble */
    out += bubble(
      '<p class="pollq">RSVP poll — Oct 21: ' + c.events[0].title + '</p>' +
      '<div class="pollbtns" role="group" aria-label="RSVP poll">' +
        '<button type="button" class="pollbtn" data-vote="in">IN <span class="count" data-in>0</span></button>' +
        '<button type="button" class="pollbtn" data-vote="out">OUT <span class="count" data-out>0</span></button>' +
      "</div>",
      "them poll", who);

    out += stamp("9:15 AM", true);

    /* Diary nights as photo bubbles with star reactions */
    c.diary.forEach(function(d){
      out += bubble(
        '<a class="photobubble" href="' + c.links.letterboxd + '" target="_blank" rel="noopener">' +
          '<img src="' + d.poster + '" alt="' + d.film + ' poster" loading="lazy">' +
          '<span class="pcap">' + d.film + " (" + d.year + ") · " + d.date + "</span></a>" +
        '<p class="pnote2">' + d.note + '</p><p class="reactions" aria-hidden="true"><span class="stars">' + _stars(d.stars) + "</span></p>",
        "them", who);
    });
    out += stamp("Yesterday", true);

    /* Reviews as forwarded Letterboxd links */
    c.reviews.forEach(function(r){
      var stars = (r.stars != null) ? '<span class="stars">' + _stars(r.stars) + "</span><br>" : "";
      out += bubble(
        '<p class="fwd">Forwarded</p>' +
        '<a class="richlink" href="' + r.url + '" target="_blank" rel="noopener">' +
          '<img src="' + r.poster + '" alt="' + r.film + ' poster" loading="lazy">' +
          '<span class="richdomain">letterboxd.com</span>' +
          '<span class="richtitle">' + r.film + " (" + r.year + ")</span></a>" +
        '<p>' + stars + (r.text ? r.text : "") + '<span class="rdate"> ' + r.date + "</span></p>",
        "them", who);
    });
    out += stamp("Today", true);

    /* Press + quotes as late-night texts */
    out += bubble(
      '<p>' + c.press.outlet + ' on us: "' + c.press.quote + '" <a href="' + c.press.url + '" target="_blank" rel="noopener">read it</a></p>',
      "them", who);
    c.quotes.forEach(function(q){
      out += bubble('<p>"' + q.text + '"<br><span class="who">— ' + q.who + "</span></p>", "them", who);
    });

    /* join input bar */
    out +=
      '<div class="chatbar rv">' +
        '<div class="chatinput" role="button" tabindex="0" aria-label="Text JOIN to get the Patreon link">' +
          '<span>Text <strong>JOIN</strong> to get the Patreon link</span>' +
          '<a class="sendbtn" href="' + c.join.patreon + '" target="_blank" rel="noopener" aria-label="Open Patreon">↑</a>' +
        "</div>" +
        '<p class="joinsub">' + c.join.network + " · " + c.join.price + " · " + c.join.pitch + "</p>" +
      "</div>";

    return '<div class="thread" aria-label="Group chat thread">' + out + "</div>";
  },
  mount: function(root){
    /* RSVP poll: local counts */
    var votes = { in: 0, out: 0 };
    var mine = null;
    root.addEventListener("click", function(e){
      var btn = e.target.closest && e.target.closest(".pollbtn");
      if (!btn) return;
      var v = btn.getAttribute("data-vote");
      if (mine === v) {
        votes[v]--; mine = null;
      } else {
        if (mine) votes[mine]--;
        votes[v]++; mine = v;
      }
      var ci = root.querySelector("[data-in]"), co = root.querySelector("[data-out]");
      if (ci) ci.textContent = votes.in;
      if (co) co.textContent = votes.out;
      root.querySelectorAll(".pollbtn").forEach(function(b){
        b.classList.toggle("chosen", b.getAttribute("data-vote") === mine);
      });
    });
    /* tapping the input text opens Patreon */
    root.addEventListener("click", function(e){
      var inp = e.target.closest && e.target.closest(".chatinput");
      if (inp && !e.target.closest("a")) {
        window.open(inp.querySelector(".sendbtn").href, "_blank", "noopener");
      }
    });
  }
};

/* =====================================================================
   4) CALENDAR — "A real month grid"
   October 2026 as a real month grid (Oct 1 2026 = Thursday; week starts
   Sunday Sep 27). Events pinned on their dates; tap a date to open a
   detail sheet under the grid. Fixed "you are here" note (early Oct).
   Diary = last-month mini strip. Prev/next chevrons: honest empty state.
   ===================================================================== */
THEMES.calendar = {
  label: "Calendar",
  meta: "#ffffff",
  render: function(c){
    /* Oct 2026: Oct 1 is Thursday. Week starts Sunday.
       Row1: Sep27 S, Sep28 M, Sep29 T, Sep30 W, Oct1 T, Oct2 F, Oct3 S ... */
    var cells = [];
    var sep = [27, 28, 29, 30];
    sep.forEach(function(d){ cells.push({ day: d, other: true, label: "Sep" }); });
    for (var d = 1; d <= 31; d++) cells.push({ day: d, other: false });

    var byDay = {};
    c.events.forEach(function(ev){
      var n = parseInt(ev.day, 10);
      if (!isNaN(n)) byDay[n] = ev;
    });

    var grid = cells.map(function(cell){
      var ev = (!cell.other && byDay[cell.day]) ? byDay[cell.day] : null;
      var cls = "day" + (cell.other ? " other" : "") + (ev ? " hasevent" : "");
      var dot = ev ? '<span class="evdot" aria-hidden="true"></span><span class="evname">' + ev.tag + "</span>" : "";
      return '<button type="button" class="' + cls + '"' + (ev ? ' data-ev="' + ev.id + '"' : ' aria-disabled="true"') + ">" +
        '<span class="dnum">' + cell.day + "</span>" + dot + "</button>";
    }).join("");

    var sheet = c.events.filter(function(ev){ return !isNaN(parseInt(ev.day, 10)); }).map(function(ev){
      return (
        '<div class="sheet" id="sheet-' + ev.id + '" hidden>' +
          '<p class="shtag">' + ev.tag + "</p>" +
          "<h3>" + ev.title + "</h3>" +
          '<p class="shwhen">' + ev.dow + " Oct " + ev.day + (ev.time ? " · " + ev.time : "") + "</p>" +
          (ev.venue ? '<p class="shvenue">' + ev.venue + "</p>" : "") +
          (ev.note ? '<p class="shnote">' + ev.note + "</p>" : "") +
          '<p>' + _ticket(ev, "ticket") + "</p>" +
        "</div>"
      );
    }).join("");

    var chips = c.diary.map(function(d){
      return '<span class="chip rv">' + d.film + ' <em>(' + d.year + ")</em> " + _stars(d.stars) + "</span>";
    }).join("");

    var perk = c.events[2];

    return (
      '<div class="cal">' +
        '<header class="calhead rv">' +
          '<p class="kicker">' + c.club.tagline + "</p>" +
          '<h1>' + c.club.name + "</h1>" +
          '<p class="youarehere">YOU ARE HERE: early Oct — <strong>2 screenings</strong> left this month. Tap a date.</p>' +
        "</header>" +
        '<div class="perkbanner rv" role="note">' +
          '<span class="ptag">' + perk.tag + "</span> " + perk.title + " — " + perk.note + " " + _ticket(perk, "ticket mini") +
        "</div>" +
        '<nav class="monthnav rv" aria-label="Month navigation">' +
          '<button type="button" class="chev" data-nav="prev" aria-label="Previous month">‹</button>' +
          "<h2>October 2026</h2>" +
          '<button type="button" class="chev" data-nav="next" aria-label="Next month">›</button>' +
        "</nav>" +
        '<p class="navnote rv" hidden>No screenings listed for that month.</p>' +
        '<div class="dowrow rv" aria-hidden="true"><span>Sun</span><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span></div>' +
        '<div class="grid rv" role="grid" aria-label="October 2026">' + grid + "</div>" +
        '<div class="sheets" aria-live="polite">' + sheet + "</div>" +
        '<section class="lastmonth rv" aria-label="Last month"><h2>Last Month</h2><div class="chips">' + chips + "</div></section>" +
        '<section class="caljoin rv" aria-label="Join"><h2>Join the ' + c.join.network + '</h2>' +
          '<p class="price">' + c.join.price + "</p><p>" + c.join.pitch + "</p>" +
          '<p class="joinactions">' + _ext(c.join.patreon, "Become a member") + " " + _ext(c.join.volunteer, "Volunteer") + "</p></section>" +
        '<footer class="calfoot rv">' +
          '<p class="pressline">"<a href="' + c.press.url + '" target="_blank" rel="noopener">' + c.press.outlet + "</a> says: " + c.press.quote + '"</p>' +
          '<p class="netlinks">' + _ext(c.links.website, "Website") + " · " + _ext(c.links.instagram, "Instagram") + " · " + _ext(c.links.tiktok, "TikTok") + " · " + _ext(c.links.letterboxd, "Letterboxd") + " · " + _ext(c.links.meetup, "Meetup") + "</p>" +
        "</footer>" +
      "</div>"
    );
  },
  mount: function(root){
    /* tap a date -> show its sheet */
    root.addEventListener("click", function(e){
      var day = e.target.closest && e.target.closest(".day.hasevent");
      if (day) {
        var id = day.getAttribute("data-ev");
        root.querySelectorAll(".sheet").forEach(function(s){ s.hidden = true; });
        var sh = root.querySelector("#sheet-" + id);
        if (sh) { sh.hidden = false; sh.classList.remove("slide"); void sh.offsetWidth; sh.classList.add("slide"); }
        return;
      }
      var nav = e.target.closest && e.target.closest(".chev");
      if (nav) {
        var note = root.querySelector(".navnote");
        if (note) { note.hidden = false; }
      }
    });
  }
};
