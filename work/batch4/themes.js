/* ============================================================
   BATCH 4 — marquee, stubs, booth, boarding
   Four different products: different DOM, IA, and layout logic.
   Concatenated with other batches into the shell; THEMES, MFC,
   and CONTENT are globals provided by the shell. Helpers are
   prefixed b4 to avoid collisions with other batches.
   ============================================================ */

function b4esc(s){
  return String(s == null ? "" : s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
var B4EXT = ' target="_blank" rel="noopener"';
function b4stars(n){ return MFC.stars(n); }
function b4date(e){
  var d = "";
  if (e.day && e.mon) d = e.mon + " " + e.day;
  else d = e.mon || e.day || "";
  if (e.dow) d += " \u00B7 " + e.dow;
  return d;
}
function b4tc(t){
  var m = /(\d{1,2}):(\d{2})\s*([AP])M/i.exec(t || "");
  if (!m) return "--:--:--";
  var h = (+m[1]) % 12;
  if (m[3].toUpperCase() === "P") h += 12;
  return ("0" + h).slice(-2) + ":" + m[2] + ":00";
}
function b4links(c, cls){
  var L = c.links;
  return '<a class="' + cls + '" href="' + b4esc(L.website) + '"' + B4EXT + '>SITE</a>'
    + '<a class="' + cls + '" href="' + b4esc(L.instagram) + '"' + B4EXT + '>INSTAGRAM</a>'
    + '<a class="' + cls + '" href="' + b4esc(L.tiktok) + '"' + B4EXT + '>TIKTOK</a>'
    + '<a class="' + cls + '" href="' + b4esc(L.letterboxd) + '"' + B4EXT + '>LETTERBOXD</a>'
    + '<a class="' + cls + '" href="' + b4esc(L.meetup) + '"' + B4EXT + '>MEETUP</a>'
    + '<a class="' + cls + '" href="' + b4esc(L.linktree) + '"' + B4EXT + '>LINKTREE</a>';
}

/* ============================================================
   1) MARQUEE — the cinema sign.
   Structure: the letter board IS the navigation. Three tappable
   attraction lines; tapping expands that attraction's details
   directly beneath the board (one at a time). Below the sign:
   snipe-rail of past nights, audience-buzz reviews, reader panel.
   ============================================================ */
THEMES.marquee = {
  label: "Marquee",
  meta: "#0d0208",
  render: function(c){
    var lines = c.events.map(function(e, i){
      return '<button class="mq-line' + (i === 0 ? ' open' : '') + '" data-att="' + b4esc(e.id) + '"'
        + ' aria-expanded="' + (i === 0 ? 'true' : 'false') + '" aria-controls="mq-det-' + b4esc(e.id) + '">'
        + '<span class="mq-linedate">' + b4esc(b4date(e)) + '</span>'
        + '<span class="mq-linetitle">' + b4esc(e.title) + '</span>'
        + '<span class="mq-toggle" aria-hidden="true"></span>'
        + '</button>';
    }).join("");
    var details = c.events.map(function(e, i){
      var meta = [b4date(e)];
      if (e.time) meta.push(e.time);
      if (e.venue) meta.push(e.venue);
      return '<div class="mq-detail' + (i === 0 ? ' show' : '') + '" data-det="' + b4esc(e.id) + '"'
        + ' id="mq-det-' + b4esc(e.id) + '" role="region" aria-label="' + b4esc(e.title) + '">'
        + '<div class="mq-det-tag">' + b4esc(e.tag) + '</div>'
        + '<div class="mq-det-when">' + b4esc(meta.join(" \u00B7 ")) + '</div>'
        + (e.note ? '<div class="mq-det-note">' + b4esc(e.note) + '</div>' : '')
        + '<a class="mq-tix" href="' + b4esc(e.ticketUrl) + '"' + B4EXT + '>' + b4esc(e.ticketLabel) + '</a>'
        + '</div>';
    }).join("");
    var quotes = c.quotes.map(function(q, i){
      return '<span class="mq-quote' + (i === 0 ? ' on' : '') + '">' + b4esc(q.text)
        + ' <em>\u2014 ' + b4esc(q.who) + '</em></span>';
    }).join("");
    var snipes = c.diary.map(function(d){
      return '<div class="mq-snipe rv">'
        + '<img src="' + b4esc(d.poster) + '" alt="' + b4esc(d.film) + ' poster" loading="lazy">'
        + '<div class="mq-snipe-t">' + b4esc(d.film) + ' <span>(' + b4esc(d.year) + ')</span></div>'
        + '<div class="mq-snipe-s">' + b4stars(d.stars) + '</div>'
        + '<div class="mq-snipe-d">' + b4esc(d.date) + '</div>'
        + '</div>';
    }).join("");
    var buzz = c.reviews.map(function(r){
      return '<a class="mq-buzz rv" href="' + b4esc(r.url) + '"' + B4EXT + '>'
        + '<img src="' + b4esc(r.poster) + '" alt="' + b4esc(r.film) + ' poster" loading="lazy">'
        + '<span class="mq-buzz-b">'
        + '<span class="mq-buzz-f">' + b4esc(r.film) + ' <i>(' + b4esc(r.year) + ')</i></span>'
        + (r.text ? '<span class="mq-buzz-t">' + b4esc(r.text) + '</span>' : '')
        + '<span class="mq-buzz-m">' + (r.stars != null ? b4stars(r.stars) + ' \u00B7 ' : '') + b4esc(r.date) + '</span>'
        + '</span></a>';
    }).join("");
    return '<div class="mq">'
      + '<header class="mq-top rv">'
      + '<div class="mq-kicker">' + b4esc(c.club.tagline) + '</div>'
      + '<h1 class="mq-name">' + b4esc(c.club.name) + '</h1>'
      + '<p class="mq-slogan">' + b4esc(c.club.slogan) + '</p>'
      + '</header>'
      + '<section class="mq-sign rv" aria-label="Now showing">'
      + '<div class="mq-frame"><div class="mq-bulbs" aria-hidden="true"></div><div class="mq-board">'
      + '<div class="mq-boardhead"><span>NOW SHOWING</span><span class="mq-hint">TAP A LINE</span></div>'
      + '<div class="mq-lines">' + lines + '</div>'
      + '<div class="mq-details">' + details + '</div>'
      + '</div></div>'
      + '<div class="mq-reader">'
      + '<div class="mq-join"><span>JOIN THE CLUB \u00B7 ' + b4esc(c.join.network)
      + ' \u00B7 ' + b4esc(c.join.price) + '</span>'
      + '<a href="' + b4esc(c.join.patreon) + '"' + B4EXT + '>JOIN</a></div>'
      + '<div class="mq-quotes" aria-live="polite"><span class="mq-qlab">WORD ON THE STREET</span>' + quotes + '</div>'
      + '</div>'
      + '</section>'
      + '<section class="mq-snipesec" aria-label="Past nights">'
      + '<h2 class="mq-sec rv">COMING ATTRACTIONS \u2014 PAST NIGHTS</h2>'
      + '<div class="mq-rail">' + snipes + '</div>'
      + '</section>'
      + '<section class="mq-buzzsec" aria-label="Audience buzz">'
      + '<h2 class="mq-sec rv">AUDIENCE BUZZ</h2>' + buzz
      + '</section>'
      + '<footer class="mq-foot rv">'
      + '<p class="mq-press">' + b4esc(c.press.quote) + ' <a href="' + b4esc(c.press.url) + '"' + B4EXT
      + '>\u2014 ' + b4esc(c.press.outlet) + '</a></p>'
      + '<p class="mq-stats">' + b4esc(c.stats.members) + ' MEMBERS \u00B7 ' + b4esc(c.stats.posts)
      + ' POSTS \u00B7 ' + b4esc(c.stats.upcoming) + ' UPCOMING</p>'
      + '<nav class="mq-links" aria-label="Find the club">' + b4links(c, 'mq-link') + '</nav>'
      + '<p class="mq-blurb">' + b4esc(c.club.blurb) + '</p>'
      + '</footer>'
      + '</div>';
  },
  mount: function(root){
    var sign = root.querySelector(".mq-sign");
    if (sign) {
      root.addEventListener("click", function(ev){
        var line = ev.target.closest(".mq-line");
        if (!line || !sign.contains(line)) return;
        var id = line.getAttribute("data-att");
        var wasOpen = line.classList.contains("open");
        var lines = sign.querySelectorAll(".mq-line");
        var details = sign.querySelectorAll(".mq-detail");
        for (var i = 0; i < lines.length; i++) {
          lines[i].classList.remove("open");
          lines[i].setAttribute("aria-expanded", "false");
        }
        for (var j = 0; j < details.length; j++) {
          var show = details[j].getAttribute("data-det") === id && !wasOpen;
          details[j].classList.toggle("show", show);
        }
        if (!wasOpen) {
          line.classList.add("open");
          line.setAttribute("aria-expanded", "true");
        }
      });
    }
    /* rotating reader-board quotes (frozen when reduced motion) */
    var qs = Array.prototype.slice.call(root.querySelectorAll(".mq-quote"));
    if (qs.length > 1 && window.matchMedia && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      var qi = 0;
      setInterval(function(){
        qs[qi].classList.remove("on");
        qi = (qi + 1) % qs.length;
        qs[qi].classList.add("on");
      }, 6000);
    }
  }
};

/* ============================================================
   2) STUBS — ticket-stub scrapbook.
   Structure: everything is a physical stub in one chronological
   stack. Upcoming events are full-color stubs whose tear-off end
   IS the ticket button. Past nights are faded KEPT stubs; reviews
   are stubs you flip to read the note scribbled on the back. Join
   is a gold SEASON PASS stub. Fan-in motion, 3D flip on tap.
   ============================================================ */
THEMES.stubs = {
  label: "Ticket Stubs",
  meta: "#efe6d8",
  render: function(c){
    var tilts = ["-2deg", "1.6deg", "-1.2deg", "2deg"];
    var evstubs = c.events.map(function(e, i){
      var no = ("0" + (i + 1)).slice(-2);
      var rows = '<div class="st-row"><span>DATE</span><b>' + b4esc(b4date(e)) + '</b></div>';
      if (e.time) rows += '<div class="st-row"><span>TIME</span><b>' + b4esc(e.time) + '</b></div>';
      if (e.venue) rows += '<div class="st-row"><span>VENUE</span><b>' + b4esc(e.venue) + '</b></div>';
      if (e.note) rows += '<div class="st-row"><span>NOTE</span><b>' + b4esc(e.note) + '</b></div>';
      return '<article class="st-stub st-ev' + (i + 1) + ' rv" style="--tilt:' + tilts[i % 4] + '">'
        + '<div class="st-body">'
        + '<div class="st-topline"><span class="st-tag">' + b4esc(e.tag) + '</span>'
        + '<span class="st-no">NO. ' + no + '</span></div>'
        + '<h3 class="st-title">' + b4esc(e.title) + '</h3>'
        + rows
        + '</div>'
        + '<a class="st-tear" href="' + b4esc(e.ticketUrl) + '"' + B4EXT
        + ' aria-label="' + b4esc(e.ticketLabel) + ': ' + b4esc(e.title) + '">'
        + '<span class="st-admit">ADMIT ONE</span>'
        + '<span class="st-barcode" aria-hidden="true"></span>'
        + '<span class="st-tearlabel">' + b4esc(e.ticketLabel) + '</span>'
        + '</a></article>';
    }).join("");
    var kept = c.diary.map(function(d, i){
      return '<button class="st-flip rv" data-flip style="--tilt:' + tilts[(i + 1) % 4] + '"'
        + ' aria-expanded="false" aria-label="Flip stub: ' + b4esc(d.film) + '">'
        + '<span class="st-flipinner">'
        + '<span class="st-face st-front st-kept">'
        + '<img src="' + b4esc(d.poster) + '" alt="' + b4esc(d.film) + ' poster" loading="lazy">'
        + '<span class="st-finfo"><b>' + b4esc(d.film) + ' <i>(' + b4esc(d.year) + ')</i></b>'
        + '<span class="st-fstars">' + b4stars(d.stars) + '</span>'
        + '<span class="st-fdate">' + b4esc(d.date) + '</span>'
        + '<span class="st-hint">TAP TO FLIP</span></span>'
        + '</span>'
        + '<span class="st-face st-back"><span class="st-backnote">' + b4esc(d.note) + '</span>'
        + '<span class="st-backmeta">KEPT \u00B7 ' + b4esc(d.date) + '</span></span>'
        + '</span></button>';
    }).join("");
    var notes = c.reviews.map(function(r, i){
      var back = r.text
        ? '<span class="st-backnote">' + b4esc(r.text) + '</span>'
        : '<span class="st-backnote">Logged ' + b4esc(r.date) + ' \u2014 no note scribbled, just the rating.</span>';
      return '<button class="st-flip rv" data-flip style="--tilt:' + tilts[(i + 2) % 4] + '"'
        + ' aria-expanded="false" aria-label="Flip stub: ' + b4esc(r.film) + '">'
        + '<span class="st-flipinner">'
        + '<span class="st-face st-front">'
        + '<img src="' + b4esc(r.poster) + '" alt="' + b4esc(r.film) + ' poster" loading="lazy">'
        + '<span class="st-finfo"><b>' + b4esc(r.film) + ' <i>(' + b4esc(r.year) + ')</i></b>'
        + (r.stars != null ? '<span class="st-fstars">' + b4stars(r.stars) + '</span>' : '')
        + '<span class="st-fdate">' + b4esc(r.date) + '</span>'
        + '<span class="st-hint">TAP TO READ THE BACK</span></span>'
        + '</span>'
        + '<span class="st-face st-back">' + back
        + '<a class="st-backlink" href="' + b4esc(r.url) + '"' + B4EXT + '>LETTERBOXD \u2192</a></span>'
        + '</span></button>';
    }).join("");
    var quotes = c.quotes.map(function(q, i){
      return '<figure class="st-note rv" style="--tilt:' + tilts[i % 4] + '">'
        + '<blockquote>' + b4esc(q.text) + '</blockquote>'
        + '<figcaption>\u2014 ' + b4esc(q.who) + '</figcaption></figure>';
    }).join("");
    var pass = '<article class="st-pass rv" style="--tilt:1deg">'
      + '<div class="st-body">'
      + '<div class="st-topline"><span class="st-tag">SEASON PASS</span><span class="st-no">NO. 00</span></div>'
      + '<h3 class="st-title">' + b4esc(c.join.network) + '</h3>'
      + '<p class="st-pitch">' + b4esc(c.join.pitch) + '</p>'
      + '<div class="st-row"><span>DUES</span><b>' + b4esc(c.join.price) + '</b></div>'
      + '<a class="st-vol" href="' + b4esc(c.join.volunteer) + '"' + B4EXT + '>VOLUNTEER \u2192</a>'
      + '</div>'
      + '<a class="st-tear" href="' + b4esc(c.join.patreon) + '"' + B4EXT + ' aria-label="Join on Patreon">'
      + '<span class="st-admit">ADMIT ONE</span>'
      + '<span class="st-barcode" aria-hidden="true"></span>'
      + '<span class="st-tearlabel">JOIN</span>'
      + '</a></article>';
    return '<div class="st">'
      + '<header class="st-mast rv">'
      + '<div class="st-kicker">' + b4esc(c.club.tagline) + '</div>'
      + '<h1>' + b4esc(c.club.name) + '</h1>'
      + '<p class="st-slogan">' + b4esc(c.club.slogan) + '</p>'
      + '<p class="st-stats">' + b4esc(c.stats.members) + ' MEMBERS \u00B7 ' + b4esc(c.stats.posts)
      + ' POSTS \u00B7 ' + b4esc(c.stats.upcoming) + ' UPCOMING</p>'
      + '</header>'
      + '<h2 class="st-sec rv">UPCOMING \u2014 TEAR &amp; GO</h2>' + evstubs
      + '<h2 class="st-sec rv">KEPT \u2014 PAST NIGHTS</h2>' + kept
      + '<h2 class="st-sec rv">NOTES ON THE BACK \u2014 MEMBER REVIEWS</h2>' + notes
      + '<h2 class="st-sec rv">PINNED TO THE BOARD</h2>' + quotes
      + '<h2 class="st-sec rv">SEASON PASS</h2>' + pass
      + '<footer class="st-foot rv">'
      + '<p class="st-press">' + b4esc(c.press.quote) + ' <a href="' + b4esc(c.press.url) + '"' + B4EXT
      + '>\u2014 ' + b4esc(c.press.outlet) + '</a></p>'
      + '<nav class="st-links" aria-label="Find the club">' + b4links(c, 'st-link') + '</nav>'
      + '<p class="st-blurb">' + b4esc(c.club.blurb) + '</p>'
      + '</footer>'
      + '</div>';
  },
  mount: function(root){
    root.addEventListener("click", function(ev){
      if (ev.target.closest("a")) return;
      var f = ev.target.closest("[data-flip]");
      if (!f) return;
      var on = f.classList.toggle("flipped");
      f.setAttribute("aria-expanded", on ? "true" : "false");
    });
  }
};

/* ============================================================
   3) BOOTH — projectionist's cue sheet.
   Structure: backstage terminal. Events are timecoded CUE rows
   (auto-numbered); the glowing CUE button IS the ticket action —
   pressing flashes "CUE FIRED" then opens the link. Past nights
   are CSS-counter-numbered LOGGED REELS, reviews are marginalia,
   and a running timecode ticks in the header (frozen on reduced
   motion). No cards, no images-as-hero — pure cue sheet.
   ============================================================ */
THEMES.booth = {
  label: "Booth",
  meta: "#0b0e11",
  render: function(c){
    var cues = c.events.map(function(e){
      var sub = [b4date(e)];
      if (e.time) sub.push(e.time);
      if (e.venue) sub.push(e.venue);
      if (e.note) sub.push(e.note);
      sub.push("TAG:" + e.tag);
      return '<div class="bo-cue rv">'
        + '<div class="bo-cuehead"><span class="bo-tc">[TC ' + b4tc(e.time) + ']</span>'
        + '<span class="bo-cuelab">CUE</span>'
        + '<h3>' + b4esc(e.title) + '</h3></div>'
        + '<div class="bo-cuesub">&gt; ' + b4esc(sub.join(" \u00B7 ")) + '</div>'
        + '<button class="bo-cuebtn" data-url="' + b4esc(e.ticketUrl) + '">CUE \u2014 '
        + b4esc(e.ticketLabel) + '</button>'
        + '<div class="bo-fired" aria-live="polite">CUE FIRED \u2014 SEE YOU THERE</div>'
        + '</div>';
    }).join("");
    var reels = c.diary.map(function(d){
      return '<div class="bo-reel rv">'
        + '<img src="' + b4esc(d.poster) + '" alt="' + b4esc(d.film) + ' poster" loading="lazy">'
        + '<div class="bo-reelb"><div class="bo-reelt">' + b4esc(d.film)
        + ' <span>(' + b4esc(d.year) + ')</span></div>'
        + '<div class="bo-reelm">' + b4stars(d.stars) + ' \u00B7 ' + b4esc(d.date) + '</div>'
        + '<div class="bo-reeln">' + b4esc(d.note) + '</div></div></div>';
    }).join("");
    var notes = c.reviews.map(function(r){
      return '<div class="bo-note rv">'
        + '<div class="bo-notehead">NOTE // ' + b4esc(r.film) + ' (' + b4esc(r.year) + ')'
        + (r.stars != null ? ' \u2014 ' + b4stars(r.stars) : '') + '</div>'
        + (r.text ? '<p>' + b4esc(r.text) + '</p>'
          : '<p class="bo-nonote">[NO MARGINALIA \u2014 LOGGED ' + b4esc(r.date) + ']</p>')
        + '<a href="' + b4esc(r.url) + '"' + B4EXT + '>[ OPEN ON LETTERBOXD ]</a></div>';
    }).join("");
    var oplog = c.quotes.map(function(q){
      return '<div class="bo-op rv"><p>' + b4esc(q.text) + '</p><div>\u2014 ' + b4esc(q.who) + '</div></div>';
    }).join("");
    return '<div class="bo">'
      + '<header class="bo-head rv">'
      + '<div class="bo-sys">MFC // PROJECTION BOOTH \u2014 ' + b4esc(c.club.tagline) + '</div>'
      + '<div class="bo-clock" data-tc>TC 00:00:00:00</div>'
      + '<div class="bo-stats">SEATS ' + b4esc(c.stats.members) + ' \u00B7 LOG ' + b4esc(c.stats.posts)
      + ' \u00B7 QUEUED ' + b4esc(c.stats.upcoming) + '</div>'
      + '</header>'
      + '<h2 class="bo-sect rv">CUE SHEET \u2014 UPCOMING</h2>'
      + '<div class="bo-cues">' + cues + '</div>'
      + '<h2 class="bo-sect rv">LOGGED REELS \u2014 PAST PROJECTIONS</h2>'
      + '<div class="bo-reels">' + reels + '</div>'
      + '<h2 class="bo-sect rv">PROJECTION NOTES \u2014 MARGINALIA</h2>' + notes
      + '<section class="bo-join rv" aria-label="Join">'
      + '<h2>SUBROUTINE: JOIN_NETWORK</h2>'
      + '<p>' + b4esc(c.join.pitch) + '</p>'
      + '<div class="bo-joinm">NETWORK: ' + b4esc(c.join.network) + ' \u00B7 DUES: ' + b4esc(c.join.price) + '</div>'
      + '<a class="bo-exec" href="' + b4esc(c.join.patreon) + '"' + B4EXT + '>[ EXECUTE: PATREON ]</a> '
      + '<a class="bo-exec" href="' + b4esc(c.join.volunteer) + '"' + B4EXT + '>[ EXECUTE: VOLUNTEER ]</a>'
      + '</section>'
      + '<h2 class="bo-sect rv">OPERATOR LOG \u2014 MEMBER TRANSMISSIONS</h2>' + oplog
      + '<footer class="bo-foot rv">'
      + '<p class="bo-press">INCOMING TRANSMISSION \u2014 ' + b4esc(c.press.outlet) + ': '
      + b4esc(c.press.quote) + ' <a href="' + b4esc(c.press.url) + '"' + B4EXT + '>[ READ ]</a></p>'
      + '<nav class="bo-links" aria-label="Find the club">' + b4links(c, 'bo-link') + '</nav>'
      + '<p class="bo-blurb">' + b4esc(c.club.blurb) + ' // ' + b4esc(c.club.slogan) + '</p>'
      + '</footer>'
      + '</div>';
  },
  mount: function(root){
    var tcEl = root.querySelector("[data-tc]");
    var reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (tcEl && !reduced) {
      var t0 = Date.now();
      var pad = function(n){ return ("0" + n).slice(-2); };
      setInterval(function(){
        var el = Date.now() - t0;
        var s = Math.floor(el / 1000);
        var fr = Math.floor((el % 1000) / 1000 * 12);
        tcEl.textContent = "TC " + pad(Math.floor(s / 3600) % 24) + ":" + pad(Math.floor(s / 60) % 60)
          + ":" + pad(s % 60) + ":" + pad(fr);
      }, 83);
    }
    root.addEventListener("click", function(ev){
      var b = ev.target.closest(".bo-cuebtn");
      if (!b) return;
      var row = b.closest(".bo-cue");
      if (!row || row.classList.contains("fired")) return;
      row.classList.add("fired");
      try { window.open(b.getAttribute("data-url"), "_blank", "noopener"); } catch (e) {}
      setTimeout(function(){ row.classList.remove("fired"); }, 1600);
    });
  }
};

/* ============================================================
   4) BOARDING — airline boarding passes.
   Structure: a departure board. Every event is a boarding pass:
   FROM (the event) \u2192 TO (the venue), with real date/time as
   BOARDING, sequential SEQ NO, GROUP from the event tag, barcode,
   perforation, and a SCAN TO BOARD ticket stub. Past nights are
   hole-punched USED passes; join is a gold FIRST CLASS upgrade.
   ============================================================ */
THEMES.boarding = {
  label: "Boarding",
  meta: "#eef2f7",
  render: function(c){
    var passes = c.events.map(function(e, i){
      var seq = ("00" + (i + 1)).slice(-3);
      var boarding = b4date(e) + (e.time ? " \u00B7 " + e.time : "");
      return '<article class="bd-pass rv">'
        + '<div class="bd-main">'
        + '<div class="bd-top"><span class="bd-air">MIAMI FILM CLUB \u00B7 BOARDING PASS</span>'
        + '<span class="bd-tag">' + b4esc(e.tag) + '</span></div>'
        + '<div class="bd-route">'
        + '<div class="bd-city"><span class="bd-lab">FROM</span><strong>' + b4esc(e.title) + '</strong></div>'
        + '<div class="bd-arrow" aria-hidden="true">\u2192</div>'
        + '<div class="bd-city"><span class="bd-lab">TO</span><strong>'
        + (e.venue ? b4esc(e.venue) : "\u2014") + '</strong></div>'
        + '</div>'
        + (e.note ? '<div class="bd-note">' + b4esc(e.note) + '</div>' : '')
        + '<div class="bd-meta">'
        + '<div><span class="bd-lab">BOARDING</span><b>' + b4esc(boarding) + '</b></div>'
        + '<div><span class="bd-lab">SEQ NO</span><b>' + seq + '</b></div>'
        + '<div><span class="bd-lab">GROUP</span><b>' + b4esc(e.tag) + '</b></div>'
        + '</div>'
        + '</div>'
        + '<div class="bd-stub">'
        + '<div class="bd-barcode" aria-hidden="true"></div>'
        + '<a class="bd-scan" href="' + b4esc(e.ticketUrl) + '"' + B4EXT
        + ' aria-label="Scan to board: ' + b4esc(e.title) + '">SCAN TO BOARD<span>'
        + b4esc(e.ticketLabel) + '</span></a>'
        + '</div></article>';
    }).join("");
    var used = c.diary.map(function(d){
      return '<article class="bd-used rv">'
        + '<div class="bd-usedhead"><span>PAST FLIGHT</span><span class="bd-usedstamp">USED</span></div>'
        + '<div class="bd-usedt">' + b4esc(d.film) + ' <span>(' + b4esc(d.year) + ')</span></div>'
        + '<div class="bd-usedm">' + b4esc(d.date) + ' \u00B7 ' + b4stars(d.stars) + '</div>'
        + '<p>' + b4esc(d.note) + '</p></article>';
    }).join("");
    var revs = c.reviews.map(function(r){
      return '<article class="bd-rev rv">'
        + '<img src="' + b4esc(r.poster) + '" alt="' + b4esc(r.film) + ' poster" loading="lazy">'
        + '<div class="bd-revb"><div class="bd-revt">' + b4esc(r.film) + ' <span>(' + b4esc(r.year) + ')</span></div>'
        + '<div class="bd-revm">' + (r.stars != null ? b4stars(r.stars) + ' \u00B7 ' : '') + b4esc(r.date) + '</div>'
        + (r.text ? '<p>' + b4esc(r.text) + '</p>' : '')
        + '<a href="' + b4esc(r.url) + '"' + B4EXT + '>READ ON LETTERBOXD \u2192</a>'
        + '</div></article>';
    }).join("");
    var quotes = c.quotes.map(function(q){
      return '<figure class="bd-quote rv"><blockquote>' + b4esc(q.text) + '</blockquote>'
        + '<figcaption>\u2014 ' + b4esc(q.who) + '</figcaption></figure>';
    }).join("");
    return '<div class="bd">'
      + '<header class="bd-head rv">'
      + '<div class="bd-kicker">' + b4esc(c.club.tagline) + '</div>'
      + '<h1>' + b4esc(c.club.name) + '</h1>'
      + '<p>' + b4esc(c.club.slogan) + '</p>'
      + '</header>'
      + '<section class="bd-board" aria-label="Now boarding">'
      + '<div class="bd-boardhead rv"><span>NOW BOARDING</span><span>SORTED BY DEPARTURE</span></div>'
      + passes
      + '</section>'
      + '<h2 class="bd-sec rv">PAST FLIGHTS</h2>' + used
      + '<h2 class="bd-sec rv">IN-FLIGHT REVIEWS</h2>' + revs
      + '<h2 class="bd-sec rv">UPGRADE</h2>'
      + '<article class="bd-gold rv">'
      + '<div class="bd-goldtop"><span>FIRST CLASS \u00B7 UPGRADE</span><span>' + b4esc(c.join.price).toUpperCase() + '</span></div>'
      + '<h3>' + b4esc(c.join.network) + '</h3>'
      + '<p>' + b4esc(c.join.pitch) + '</p>'
      + '<div class="bd-goldcta"><a href="' + b4esc(c.join.patreon) + '"' + B4EXT + '>UPGRADE \u2192</a>'
      + '<a href="' + b4esc(c.join.volunteer) + '"' + B4EXT + '>VOLUNTEER</a></div>'
      + '</article>'
      + '<h2 class="bd-sec rv">PASSENGER FEEDBACK</h2>' + quotes
      + '<footer class="bd-foot rv">'
      + '<p class="bd-press">CLEARED FOR TAKEOFF \u2014 ' + b4esc(c.press.outlet) + ': '
      + b4esc(c.press.quote) + ' <a href="' + b4esc(c.press.url) + '"' + B4EXT + '>READ \u2192</a></p>'
      + '<p class="bd-stats">' + b4esc(c.stats.members) + ' MEMBERS \u00B7 ' + b4esc(c.stats.posts)
      + ' POSTS \u00B7 ' + b4esc(c.stats.upcoming) + ' UPCOMING</p>'
      + '<nav class="bd-links" aria-label="Find the club">' + b4links(c, 'bd-link') + '</nav>'
      + '<p class="bd-blurb">' + b4esc(c.club.blurb) + '</p>'
      + '</footer>'
      + '</div>';
  }
};
