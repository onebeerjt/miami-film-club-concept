/* Batch 2 themes: brutalist, noir, letterboxd, boxoffice.
   Each render(c) returns a full HTML string for the theme root.
   MFC.stars(n) renders star glyphs. External links: target=_blank rel=noopener. */
var THEMES = THEMES || {};

(function () {
  "use strict";

  function S(n) { return (typeof MFC !== "undefined" && MFC.stars) ? MFC.stars(n) : ""; }

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function whenLine(e) {
    return [e.dow, e.mon, e.day, e.time].filter(Boolean).join(" \u00B7 ");
  }

  function footLinks(c) {
    var L = c.links;
    var items = [
      ["Website", L.website], ["Instagram", L.instagram], ["TikTok", L.tiktok],
      ["Letterboxd", L.letterboxd], ["Meetup", L.meetup], ["Linktree", L.linktree]
    ];
    return items.map(function (p) {
      return '<a href="' + p[1] + '" target="_blank" rel="noopener">' + p[0] + "</a>";
    }).join("");
  }

  /* ============ 1. BRUTALIST ============ */
  THEMES.brutalist = {
    label: "Brutalist",
    meta: "#ffffff",
    render: function (c) {
      var events = c.events.map(function (e, i) {
        return '<article class="br-ev rv br-off' + (i % 3) + '">'
          + '<div class="br-idx" aria-hidden="true">0' + (i + 1) + "</div>"
          + '<div class="br-evbody">'
          + '<span class="br-tag">[' + esc(e.tag) + "]</span>"
          + "<h3>" + esc(e.title) + "</h3>"
          + '<p class="br-when">' + esc(whenLine(e)) + "</p>"
          + (e.venue ? '<p class="br-ven">@ ' + esc(e.venue) + "</p>" : "")
          + (e.note ? '<p class="br-note">' + esc(e.note) + "</p>" : "")
          + '<a class="br-tix" href="' + esc(e.ticketUrl) + '" target="_blank" rel="noopener">'
          + esc(e.ticketLabel) + " &rarr;</a>"
          + "</div></article>";
      }).join("");

      var diaryRows = c.diary.map(function (d) {
        return "<tr>"
          + "<td><strong>" + esc(d.film) + "</strong> (" + esc(d.year) + ")</td>"
          + '<td class="br-c">' + S(d.stars) + "</td>"
          + '<td class="br-c">' + esc(d.date) + "</td>"
          + "<td>" + esc(d.note) + "</td></tr>";
      }).join("");

      var reviews = c.reviews.map(function (r) {
        return '<blockquote class="br-rv rv">'
          + "<p><strong>" + esc(r.film) + "</strong> (" + esc(r.year) + ")"
          + (r.stars != null ? ' <span class="br-stars">' + S(r.stars) + "</span>" : "") + "</p>"
          + (r.text ? "<p>" + esc(r.text) + "</p>" : '<p class="br-mut">[no text filed]</p>')
          + '<cite>&mdash; diary entry, ' + esc(r.date) + ' &middot; <a href="' + esc(r.url)
          + '" target="_blank" rel="noopener">letterboxd</a></cite>'
          + "</blockquote>";
      }).join("");

      var quotes = c.quotes.map(function (q) {
        return '<li class="rv"><p>"' + esc(q.text) + '"</p><cite>&mdash; ' + esc(q.who) + "</cite></li>";
      }).join("");

      var marquee = "";
      for (var m = 0; m < 6; m++) marquee += "<span>" + esc(c.club.blurb) + " +++ </span>";

      return ""
        + '<header class="br-hero rv">'
        + "<p class=\"br-kicker\">" + esc(c.club.tagline) + "</p>"
        + "<h1>MIAMI<br>FILM<br>CLUB</h1>"
        + '<p class="br-handle">' + esc(c.club.handle) + "</p>"
        + '<p class="br-slogan">"' + esc(c.club.slogan) + '"</p>'
        + '<p class="br-stats">' + esc(c.stats.members) + " MEMBERS / " + esc(c.stats.posts)
        + " POSTS / " + esc(c.stats.upcoming) + " UPCOMING</p>"
        + "</header>"
        + '<div class="br-marquee" aria-hidden="true"><div class="br-marquee-in">' + marquee + "</div></div>"
        + '<section class="br-miss">'
        + "<h2>DON'T MISS &mdash; " + c.events.length + " UPCOMING</h2>"
        + events
        + "</section>"
        + '<section class="br-diary rv">'
        + "<h2>DIARY / LOG</h2>"
        + '<div class="br-tablewrap"><table>'
        + "<thead><tr><th>FILM</th><th>RATING</th><th>DATE</th><th>NOTE</th></tr></thead>"
        + "<tbody>" + diaryRows + "</tbody></table></div>"
        + "</section>"
        + '<section class="br-reviews"><h2 class="rv">FIELD REPORTS</h2>' + reviews + "</section>"
        + '<section class="br-quotes rv"><h2>MEMBERS SAY</h2><ul>' + quotes + "</ul></section>"
        + '<section class="br-press rv"><h2>PRESS</h2>'
        + '<p>"' + esc(c.press.quote) + '" &mdash; <a href="' + esc(c.press.url)
        + '" target="_blank" rel="noopener">' + esc(c.press.outlet) + "</a></p></section>"
        + '<section class="br-join rv"><h2>JOIN</h2>'
        + "<p><strong>" + esc(c.join.network) + "</strong> &mdash; " + esc(c.join.price) + "</p>"
        + "<p>" + esc(c.join.pitch) + "</p>"
        + '<p><a href="' + esc(c.join.patreon) + '" target="_blank" rel="noopener">PATREON</a> / '
        + '<a href="' + esc(c.join.volunteer) + '" target="_blank" rel="noopener">VOLUNTEER</a></p>'
        + "</section>"
        + '<footer class="br-foot"><nav>' + footLinks(c) + "</nav>"
        + "<p>" + esc(c.club.name) + " " + esc(c.club.handle) + "</p></footer>";
    },
    mount: function () { /* static */ }
  };

  /* ============ 2. NOIR ============ */
  THEMES.noir = {
    label: "Noir",
    meta: "#171310",
    render: function (c) {
      var caseList = c.events.map(function (e, i) {
        return '<li class="rv"><span class="nr-caseno">CASE ' + (i + 1) + '</span> '
          + "<strong>" + esc(e.title) + "</strong>"
          + ' <span class="nr-casedate">' + esc([e.mon, e.day].filter(Boolean).join(" ")) + "</span>"
          + ' <a href="#nr-file-' + e.id + '">view file &darr;</a></li>';
      }).join("");

      var files = c.events.map(function (e, i) {
        return '<article class="nr-file rv" id="nr-file-' + e.id + '" style="--tilt:' + (i === 1 ? "1.6deg" : (i === 2 ? "-1.2deg" : "0.8deg")) + '">'
          + '<span class="nr-pin" aria-hidden="true"></span>'
          + '<span class="nr-tape t1" aria-hidden="true"></span>'
          + '<span class="nr-tape t2" aria-hidden="true"></span>'
          + '<p class="nr-stamp">' + esc(e.tag) + "</p>"
          + "<h3>" + esc(e.title) + "</h3>"
          + '<dl class="nr-dossier">'
          + '<div><dt>DATE</dt><dd>' + esc(whenLine(e)) + "</dd></div>"
          + (e.venue ? '<div><dt>LOCATION</dt><dd>' + esc(e.venue) + "</dd></div>" : "")
          + (e.note ? '<div><dt>INTEL</dt><dd>' + esc(e.note) + "</dd></div>" : "")
          + "</dl>"
          + '<a class="nr-lead" href="' + esc(e.ticketUrl) + '" target="_blank" rel="noopener">FOLLOW LEAD: '
          + esc(e.ticketLabel) + "</a>"
          + "</article>";
      }).join("");

      var exhibits = ["A", "B", "C", "D"];
      var notes = c.diary.map(function (d, i) {
        return '<article class="nr-note rv">'
          + '<figure><img src="' + esc(d.poster) + '" alt="Surveillance photo: ' + esc(d.film) + '" loading="lazy">'
          + '<figcaption>EXHIBIT ' + exhibits[i % 4] + "</figcaption></figure>"
          + '<div class="nr-notebody">'
          + '<p class="nr-fielddate">FILED ' + esc(d.date) + "</p>"
          + "<h4>" + esc(d.film) + " <span>(" + esc(d.year) + ")</span></h4>"
          + '<p class="nr-nrstars">' + S(d.stars) + "</p>"
          + "<p>" + esc(d.note) + "</p>"
          + "</div></article>";
      }).join("");

      var statements = c.reviews.map(function (r, i) {
        return '<article class="nr-stmt rv">'
          + '<p class="nr-stmtno">WITNESS STATEMENT #' + (i + 1) + " &mdash; " + esc(r.date) + "</p>"
          + "<h4>" + esc(r.film) + " <span>(" + esc(r.year) + ")</span></h4>"
          + (r.stars != null ? '<p class="nr-nrstars">' + S(r.stars) + "</p>" : "")
          + (r.text ? "<p>&ldquo;" + esc(r.text) + "&rdquo;</p>" : '<p class="nr-mut">(no statement on record)</p>')
          + '<a href="' + esc(r.url) + '" target="_blank" rel="noopener">full statement &rarr;</a>'
          + "</article>";
      }).join("");

      var testimony = c.quotes.map(function (q) {
        return '<li class="rv"><p>"' + esc(q.text) + '"</p><cite>&mdash; ' + esc(q.who) + ", on record</cite></li>";
      }).join("");

      return ""
        + '<header class="nr-case rv">'
        + '<p class="nr-kicker">MIAMI-DADE CINEMA DIVISION</p>'
        + "<h1>CASE FILE #305<br>THE MOVIEGOERS</h1>"
        + '<p class="nr-sub">' + esc(c.club.blurb) + "</p>"
        + '<p class="nr-status">STATUS: <strong>' + c.events.length + " OPEN CASES</strong> &middot; "
        + esc(c.stats.members) + " PERSONS OF INTEREST</p>"
        + '<ol class="nr-cases">' + caseList + "</ol>"
        + "</header>"
        + '<div class="nr-board">'
        + '<svg class="nr-string" aria-hidden="true"></svg>'
        + files
        + "</div>"
        + '<section class="nr-sec"><h2 class="rv">FIELD NOTES</h2><div class="nr-notes">' + notes + "</div></section>"
        + '<section class="nr-sec"><h2 class="rv">WITNESS STATEMENTS</h2><div class="nr-stmts">' + statements + "</div></section>"
        + '<section class="nr-sec"><h2 class="rv">CHARACTER TESTIMONY</h2><ul class="nr-test">' + testimony + "</ul></section>"
        + '<aside class="nr-clip rv"><p class="nr-clipk">PRESS CLIPPING</p>'
        + '<p>"' + esc(c.press.quote) + '"</p>'
        + '<cite>&mdash; <a href="' + esc(c.press.url) + '" target="_blank" rel="noopener">' + esc(c.press.outlet) + "</a></cite></aside>"
        + '<section class="nr-sec nr-recruit rv"><h2>RECRUITMENT</h2>'
        + "<p><strong>" + esc(c.join.network) + "</strong> &mdash; " + esc(c.join.price) + "</p>"
        + "<p>" + esc(c.join.pitch) + "</p>"
        + '<p><a class="nr-lead" href="' + esc(c.join.patreon) + '" target="_blank" rel="noopener">ENLIST: PATREON</a> '
        + '<a class="nr-lead ghost" href="' + esc(c.join.volunteer) + '" target="_blank" rel="noopener">VOLUNTEER UNIT</a></p>'
        + "</section>"
        + '<footer class="nr-foot"><nav>' + footLinks(c) + "</nav>"
        + "<p>" + esc(c.club.name) + " " + esc(c.club.handle) + " &middot; case closed nightly</p></footer>";
    },
    mount: function (root) {
      var board = root.querySelector(".nr-board");
      var svg = root.querySelector(".nr-string");
      if (!board || !svg) return;
      function draw() {
        var pins = Array.prototype.slice.call(board.querySelectorAll(".nr-pin"));
        if (pins.length < 2) return;
        var br = board.getBoundingClientRect();
        var pts = pins.map(function (p) {
          var r = p.getBoundingClientRect();
          return [r.left + r.width / 2 - br.left, r.top + r.height / 2 - br.top];
        });
        var w = Math.max(1, Math.round(board.offsetWidth));
        var h = Math.max(1, Math.round(board.offsetHeight));
        svg.setAttribute("viewBox", "0 0 " + w + " " + h);
        svg.style.width = w + "px";
        svg.style.height = h + "px";
        var s = "";
        for (var i = 0; i < pts.length - 1; i++) {
          s += '<line pathLength="1" class="d' + i + '" x1="' + pts[i][0].toFixed(1)
            + '" y1="' + pts[i][1].toFixed(1) + '" x2="' + pts[i + 1][0].toFixed(1)
            + '" y2="' + pts[i + 1][1].toFixed(1) + '"/>';
        }
        svg.innerHTML = s;
      }
      var t;
      function redraw() { clearTimeout(t); t = setTimeout(draw, 120); }
      if (document.fonts && document.fonts.ready) document.fonts.ready.then(draw);
      setTimeout(draw, 60);
      setTimeout(draw, 600);
      window.addEventListener("resize", redraw);
      /* reveal any files the shell observer may have missed after layout settles */
      setTimeout(function () {
        root.querySelectorAll(".nr-file.rv:not(.in)").forEach(function (f) {
          var r = f.getBoundingClientRect();
          if (r.top < window.innerHeight && r.bottom > 0) f.classList.add("in");
        });
        draw();
      }, 700);
    }
  };

  /* ============ 3. LETTERBOXD ============ */
  THEMES.letterboxd = {
    label: "Letterboxd",
    meta: "#14181c",
    render: function (c) {
      /* pinned list: upcoming screenings as a Letterboxd list */
      var listItems = c.events.map(function (e, i) {
        return '<li class="lb-ev rv">'
          + '<span class="lb-rank">' + (i + 1) + "</span>"
          + '<div class="lb-evdate"><span>' + esc(e.mon) + "</span><strong>" + esc(e.day) + "</strong></div>"
          + '<div class="lb-evbody">'
          + "<h4>" + esc(e.title) + "</h4>"
          + '<p class="lb-evmeta">' + esc([e.dow, e.time, e.venue].filter(Boolean).join(" \u00B7 "))
          + (e.note ? " \u00B7 " + esc(e.note) : "") + "</p>"
          + '<a class="lb-tix" href="' + esc(e.ticketUrl) + '" target="_blank" rel="noopener">'
          + esc(e.ticketLabel) + "</a>"
          + "</div></li>";
      }).join("");

      var diary = c.diary.map(function (d) {
        var parts = String(d.date).split(" ");
        return '<article class="lb-drow rv">'
          + '<div class="lb-ddate"><span>' + esc(parts[0] || "") + "</span><strong>" + esc(parts[1] || "") + "</strong></div>"
          + '<img class="lb-dthumb" src="' + esc(d.poster) + '" alt="' + esc(d.film) + ' poster" loading="lazy">'
          + '<div class="lb-dbody">'
          + "<h4>" + esc(d.film) + ' <span class="lb-year">' + esc(d.year) + "</span></h4>"
          + '<p class="lb-dstars">' + S(d.stars) + "</p>"
          + "<p>" + esc(d.note) + "</p>"
          + '<p class="lb-dmeta"><span class="lb-like" aria-hidden="true">&hearts;</span> Like'
          + ' &nbsp;&middot;&nbsp; <span aria-hidden="true">&#9998;</span> Comment</p>'
          + "</div></article>";
      }).join("");

      var watched = c.reviews.map(function (r) {
        return '<a class="lb-post rv" href="' + esc(r.url) + '" target="_blank" rel="noopener">'
          + '<img src="' + esc(r.poster) + '" alt="' + esc(r.film) + ' poster" loading="lazy">'
          + '<span>' + esc(r.film) + " (" + esc(r.year) + ")</span></a>";
      }).join("");

      var activity = c.reviews.map(function (r) {
        return '<article class="lb-act rv">'
          + '<img class="lb-actthumb" src="' + esc(r.poster) + '" alt="' + esc(r.film) + ' poster" loading="lazy">'
          + '<div class="lb-actbody">'
          + '<p class="lb-acthead"><strong>' + esc(c.member.name) + "</strong> reviewed</p>"
          + "<h4>" + esc(r.film) + ' <span class="lb-year">' + esc(r.year) + "</span></h4>"
          + (r.stars != null ? '<p class="lb-dstars">' + S(r.stars) + "</p>" : "")
          + (r.text ? "<p>&ldquo;" + esc(r.text) + "&rdquo;</p>" : "")
          + '<p class="lb-actmeta">' + esc(r.date) + ' &middot; <a href="' + esc(r.url)
          + '" target="_blank" rel="noopener">Read on Letterboxd</a></p>'
          + "</div></article>";
      }).join("");

      return ""
        + '<nav class="lb-nav"><div class="lb-navin">'
        + '<a class="lb-logo" href="' + esc(c.links.website) + '" target="_blank" rel="noopener">'
        + '<span class="lb-dots" aria-hidden="true"><i></i><i></i><i></i><i></i></span>Miami Film Club</a>'
        + '<div class="lb-links">'
        + '<a href="' + esc(c.links.letterboxd) + '" target="_blank" rel="noopener">Films</a>'
        + '<a href="' + esc(c.links.linktree) + '" target="_blank" rel="noopener">Lists</a>'
        + '<a href="' + esc(c.links.meetup) + '" target="_blank" rel="noopener">Members</a>'
        + '<a href="' + esc(c.links.instagram) + '" target="_blank" rel="noopener">Journal</a>'
        + "</div></div></nav>"
        + '<header class="lb-profile rv">'
        + '<div class="lb-avatar" aria-hidden="true">MFC</div>'
        + "<div>"
        + "<h1>" + esc(c.club.name) + "</h1>"
        + '<p class="lb-handle">' + esc(c.member.handle) + " &middot; Miami, FL</p>"
        + '<p class="lb-follow"><strong>' + esc(c.stats.members) + "</strong> Followers &middot; <strong>"
        + esc(c.stats.posts) + "</strong> Posts</p>"
        + "</div>"
        + '<a class="lb-fbtn" href="' + esc(c.links.instagram) + '" target="_blank" rel="noopener">+ Follow</a>'
        + "</header>"
        + '<div class="lb-tabs" role="tablist">'
        + '<button class="on" data-tab="profile">Profile</button>'
        + '<button data-tab="diary">Diary</button>'
        + '<button data-tab="reviews">Reviews</button>'
        + '<button data-tab="lists">Lists</button>'
        + "</div>"
        + '<div class="lb-cols">'
        + '<main class="lb-main">'
        + '<section data-panel="profile">'
        + '<div class="lb-sect rv"><div class="lb-secthead"><h3>PINNED LIST</h3></div>'
        + '<h4 class="lb-listname">Upcoming screenings &mdash; don\'t miss these</h4>'
        + '<ol class="lb-evs">' + listItems + "</ol></div>"
        + '<div class="lb-sect rv"><div class="lb-secthead"><h3>RECENTLY WATCHED</h3></div>'
        + '<div class="lb-grid">' + watched + "</div></div>"
        + '<div class="lb-sect rv"><div class="lb-secthead"><h3>RECENT ACTIVITY</h3></div>'
        + '<div class="lb-acts">' + activity.slice(0, 3) + "</div></div>"
        + "</section>"
        + '<section data-panel="diary" hidden>'
        + '<div class="lb-sect"><div class="lb-secthead"><h3>DIARY</h3></div>' + diary + "</div>"
        + "</section>"
        + '<section data-panel="reviews" hidden>'
        + '<div class="lb-sect"><div class="lb-secthead"><h3>REVIEWS</h3></div>'
        + '<div class="lb-acts">' + activity + "</div></div>"
        + "</section>"
        + '<section data-panel="lists" hidden>'
        + '<div class="lb-sect"><div class="lb-secthead"><h3>LISTS</h3></div>'
        + '<h4 class="lb-listname">Upcoming screenings &mdash; don\'t miss these</h4>'
        + '<ol class="lb-evs">' + listItems + "</ol></div>"
        + "</section>"
        + "</main>"
        + '<aside class="lb-side">'
        + '<div class="lb-sect rv"><div class="lb-secthead"><h3>STATS</h3></div><ul class="lb-statlist">'
        + "<li><strong>" + esc(c.stats.members) + "</strong> followers</li>"
        + "<li><strong>" + esc(c.stats.posts) + "</strong> posts</li>"
        + "<li><strong>" + esc(c.stats.upcoming) + "</strong> upcoming events</li>"
        + "<li><strong>" + c.diary.length + "</strong> diary entries</li>"
        + "</ul></div>"
        + '<div class="lb-sect rv"><div class="lb-secthead"><h3>ABOUT</h3></div>'
        + "<p>" + esc(c.club.blurb) + "</p>"
        + '<p class="lb-pressq">&ldquo;' + esc(c.press.quote) + "&rdquo;<br>&mdash; "
        + '<a href="' + esc(c.press.url) + '" target="_blank" rel="noopener">' + esc(c.press.outlet) + "</a></p></div>"
        + '<div class="lb-sect rv"><div class="lb-secthead"><h3>MEMBERSHIP</h3></div>'
        + "<p><strong>" + esc(c.join.network) + "</strong><br>" + esc(c.join.price) + "</p>"
        + "<p>" + esc(c.join.pitch) + "</p>"
        + '<p><a class="lb-tix" href="' + esc(c.join.patreon) + '" target="_blank" rel="noopener">Patreon</a> '
        + '<a class="lb-tix ghost" href="' + esc(c.join.volunteer) + '" target="_blank" rel="noopener">Volunteer</a></p></div>'
        + "</aside></div>"
        + '<footer class="lb-foot"><nav>' + footLinks(c) + "</nav>"
        + "<p>" + esc(c.club.name) + " " + esc(c.club.handle) + "</p></footer>";
    },
    mount: function (root) {
      root.addEventListener("click", function (ev) {
        var t = ev.target.closest("[data-tab]");
        if (!t) return;
        var tabs = root.querySelectorAll("[data-tab]");
        for (var i = 0; i < tabs.length; i++) tabs[i].classList.toggle("on", tabs[i] === t);
        var k = t.getAttribute("data-tab");
        var panels = root.querySelectorAll("[data-panel]");
        for (var j = 0; j < panels.length; j++) {
          var p = panels[j];
          var show = p.getAttribute("data-panel") === k;
          p.hidden = !show;
          if (show) {
            var rvs = p.querySelectorAll(".rv:not(.in)");
            for (var m = 0; m < rvs.length; m++) rvs[m].classList.add("in");
          }
        }
      });
    }
  };

  /* ============ 4. BOX OFFICE ============ */
  THEMES.boxoffice = {
    label: "Box Office",
    meta: "#0b0b0c",
    render: function (c) {
      var tiles = c.events.map(function (e) {
        return '<button class="kx-tile rv" data-pick="' + e.id + '"'
          + ' data-title="' + esc(e.title) + '"'
          + ' data-when="' + esc(whenLine(e)) + '"'
          + ' data-venue="' + esc(e.venue || "") + '"'
          + ' data-note="' + esc(e.note || "") + '"'
          + ' data-ticketlabel="' + esc(e.ticketLabel) + '"'
          + ' data-ticketurl="' + esc(e.ticketUrl) + '">'
          + '<span class="kx-tdate"><strong>' + esc(e.day) + "</strong><span>" + esc(e.mon) + "</span></span>"
          + '<span class="kx-tbody"><span class="kx-ttag">' + esc(e.tag) + "</span>"
          + "<strong>" + esc(e.title) + "</strong>"
          + '<span class="kx-tmeta">' + esc([e.dow, e.time, e.venue].filter(Boolean).join(" \u00B7 ")) + "</span>"
          + '<span class="kx-tgo">SELECT &rarr;</span></span>'
          + "</button>";
      }).join("");

      var reactions = c.reviews.filter(function (r) { return r.text; }).map(function (r) {
        return '<article class="kx-react rv">'
          + "<p>&ldquo;" + esc(r.text) + "&rdquo;</p>"
          + '<p class="kx-rmeta">' + esc(r.film) + " (" + esc(r.year) + ")"
          + (r.stars != null ? " &middot; " + S(r.stars) : "") + "</p>"
          + "</article>";
      }).join("");

      return ""
        + '<header class="kx-head rv">'
        + '<p class="kx-brand">' + esc(c.club.name).toUpperCase() + " BOX OFFICE</p>"
        + '<ol class="kx-steps">'
        + '<li class="on" data-s="1"><span>1</span>EVENT</li>'
        + '<li data-s="2"><span>2</span>TICKETS</li>'
        + '<li data-s="3"><span>3</span>DONE</li>'
        + "</ol>"
        + '<p class="kx-q" data-q>Which night are you in for?</p>'
        + "</header>"
        + '<div class="kx-stage">'
        + '<section class="kx-step" data-step="1">'
        + '<div class="kx-tiles">' + tiles + "</div>"
        + '<p class="kx-hint">' + esc(c.stats.members) + " members &middot; " + esc(c.club.tagline) + "</p>"
        + "</section>"
        + '<section class="kx-step" data-step="2" hidden>'
        + '<button class="kx-back" data-back="1">&larr; BACK</button>'
        + '<h2 class="kx-h">HOW MANY TICKETS?</h2>'
        + '<div class="kx-sum" data-sum2></div>'
        + '<div class="kx-stepper" role="group" aria-label="Ticket quantity">'
        + '<button data-qty="-1" aria-label="Fewer tickets">&minus;</button>'
        + '<span data-qtyv>2</span>'
        + '<button data-qty="1" aria-label="More tickets">+</button>'
        + "</div>"
        + '<button class="kx-next" data-next="3">CONTINUE &rarr;</button>'
        + '<h3 class="kx-h2">AUDIENCE REACTIONS</h3>'
        + '<div class="kx-reacts">' + reactions + "</div>"
        + "</section>"
        + '<section class="kx-step" data-step="3" hidden>'
        + '<button class="kx-back" data-back="2">&larr; BACK</button>'
        + '<h2 class="kx-h">CHECKOUT</h2>'
        + '<div class="kx-sum" data-sum3></div>'
        + '<a class="kx-bigbtn" data-book href="#" target="_blank" rel="noopener">GET TICKETS</a>'
        + '<div class="kx-confirm" data-confirm hidden>'
        + '<p class="kx-done">YOU&rsquo;RE ON THE LIST</p>'
        + '<p class="kx-seeyou" data-seeyou></p>'
        + '<p class="kx-upsell">' + esc(c.join.pitch) + " <strong>" + esc(c.join.network)
        + "</strong> &mdash; " + esc(c.join.price) + ".</p>"
        + '<p><a href="' + esc(c.join.patreon) + '" target="_blank" rel="noopener">Join on Patreon</a></p>'
        + "</div>"
        + "</section>"
        + "</div>"
        + '<footer class="kx-foot"><nav>' + footLinks(c) + "</nav>"
        + "<p>" + esc(c.club.name) + " " + esc(c.club.handle) + "</p></footer>";
    },
    mount: function (root) {
      var sel = { id: null, qty: 2 };
      var stage = root.querySelector(".kx-stage");
      var steps = root.querySelectorAll(".kx-steps li");
      var q = root.querySelector("[data-q]");
      var prompts = { 1: "Which night are you in for?", 2: "How many tickets?", 3: "One tap and you're in." };

      function tileData(id) {
        var t = root.querySelector('[data-pick="' + id + '"]');
        return t ? t.dataset : null;
      }
      function summaryHTML(d) {
        return '<p class="kx-srow"><span>EVENT</span><strong>' + esc(d.title) + "</strong></p>"
          + '<p class="kx-srow"><span>DATE</span><strong>' + esc(d.when) + "</strong></p>"
          + (d.venue ? '<p class="kx-srow"><span>VENUE</span><strong>' + esc(d.venue) + "</strong></p>" : "")
          + (d.note ? '<p class="kx-srow"><span>NOTE</span><strong>' + esc(d.note) + "</strong></p>" : "")
          + '<p class="kx-srow"><span>TICKETS</span><strong data-qtyecho>' + sel.qty + "</strong></p>";
      }
      function show(n) {
        var secs = root.querySelectorAll(".kx-step");
        for (var i = 0; i < secs.length; i++) {
          var s = secs[i];
          var on = s.getAttribute("data-step") === String(n);
          s.hidden = !on;
          if (on) {
            s.classList.remove("kx-in");
            void s.offsetWidth;
            s.classList.add("kx-in");
            var rvs = s.querySelectorAll(".rv:not(.in)");
            for (var m = 0; m < rvs.length; m++) rvs[m].classList.add("in");
          }
        }
        for (var j = 0; j < steps.length; j++) {
          var li = steps[j];
          var sn = parseInt(li.getAttribute("data-s"), 10);
          li.classList.toggle("on", sn === n);
          li.classList.toggle("done", sn < n);
        }
        if (q) q.textContent = prompts[n];
        if (stage && n !== 1) stage.scrollIntoView({ block: "start", behavior: "smooth" });
      }
      function refreshQty() {
        var v = root.querySelector("[data-qtyv]");
        if (v) v.textContent = sel.qty;
        var e1 = root.querySelector('[data-sum2] [data-qtyecho]');
        var e2 = root.querySelector('[data-sum3] [data-qtyecho]');
        if (e1) e1.textContent = sel.qty;
        if (e2) e2.textContent = sel.qty;
      }
      root.addEventListener("click", function (ev) {
        var pick = ev.target.closest("[data-pick]");
        if (pick) {
          sel.id = pick.getAttribute("data-pick");
          sel.qty = 2;
          var d = tileData(sel.id);
          if (!d) return;
          var s2 = root.querySelector("[data-sum2]");
          var s3 = root.querySelector("[data-sum3]");
          if (s2) s2.innerHTML = summaryHTML(d);
          if (s3) s3.innerHTML = summaryHTML(d);
          var book = root.querySelector("[data-book]");
          if (book) {
            book.href = d.ticketurl;
            book.textContent = d.ticketlabel.toUpperCase() + " \u2192";
          }
          var sy = root.querySelector("[data-seeyou]");
          if (sy) sy.textContent = d.venue ? "See you at " + d.venue + "." : "See you there.";
          var cf = root.querySelector("[data-confirm]");
          if (cf) cf.hidden = true;
          refreshQty();
          show(2);
          return;
        }
        var qb = ev.target.closest("[data-qty]");
        if (qb) {
          sel.qty = Math.min(10, Math.max(1, sel.qty + parseInt(qb.getAttribute("data-qty"), 10)));
          refreshQty();
          return;
        }
        var nx = ev.target.closest("[data-next]");
        if (nx) { show(parseInt(nx.getAttribute("data-next"), 10)); return; }
        var bk = ev.target.closest("[data-back]");
        if (bk) { show(parseInt(bk.getAttribute("data-back"), 10)); return; }
        var book2 = ev.target.closest("[data-book]");
        if (book2) {
          var cf2 = root.querySelector("[data-confirm]");
          if (cf2) {
            cf2.hidden = false;
            var rvs = cf2.querySelectorAll(".rv:not(.in)");
            for (var k = 0; k < rvs.length; k++) rvs[k].classList.add("in");
          }
        }
      });
      show(1);
    }
  };
})();
