# Refreshing the Member Reviews feed

The `#reviews` section on the site is **baked in at build time** from Letterboxd RSS
feeds (the site is fully static — no server, no API keys).

## The feed source

Every Letterboxd user has a public RSS feed:

```
https://letterboxd.com/USERNAME/rss/
```

The club's feed: https://letterboxd.com/miamimoviegoers/rss/

## Add a member

1. Get their Letterboxd username (from their profile URL).
2. Add it to the `LB_MEMBERS` array at the bottom of `index.html`
   (search for `LB_MEMBERS` — the config block is clearly marked).
3. Fetch their feed and pick their latest 2–3 entries with review text.

## Fetch + parse (one-liner recipe)

```bash
for u in miamimoviegoers member2 member3; do
  curl -s "https://letterboxd.com/$u/rss/" -A "Mozilla/5.0" -o "/tmp/lb_$u.xml"
done

python3 - <<'EOF'
import re, html
from datetime import datetime

def parse(path, user):
    x = open(path, encoding='utf-8').read()
    out = []
    for it in re.findall(r'<item>(.*?)</item>', x, re.S)[:6]:
        title = html.unescape(re.search(r'<title>(.*?)</title>', it, re.S).group(1)).strip()
        link = re.search(r'<link>(.*?)</link>', it).group(1).strip()
        desc = re.search(r'<description>(.*?)</description>', it, re.S)
        text = re.sub(r'\s+', ' ', html.unescape(re.sub(r'<[^>]+>', ' ', desc.group(1))).strip()) if desc else ''
        text = re.sub(r'^Watched on [A-Z][a-z]+ \d{1,2}, \d{4}\.\s*', '', text)  # drop "Watched on…" boilerplate
        img = re.search(r'<img[^>]+src="([^"]+)"', it)
        # title looks like "Film Name, 2026 - ★★★★½" or "Film Name, 2026"
        m = re.match(r'^(.*?), (\d{4})(?: - (★+[½]?))?$', title)
        film, year, stars = (m.group(1), m.group(2), m.group(3) or '') if m else (title, '', '')
        pub = re.search(r'<pubDate>(.*?)</pubDate>', it)
        date = datetime.strptime(pub.group(1).strip(), '%a, %d %b %Y %H:%M:%S %z').strftime('%b %-d') if pub else ''
        out.append(dict(user=user, film=film, year=year, stars=stars, text=text[:200], link=link,
                        img=img.group(1) if img else '', date=date))
    return out

for u in ["miamimoviegoers"]:
    for r in parse(f"/tmp/lb_{u}.xml", u):
        print(r['date'], '|', r['film'], '|', r['stars'], '|', r['text'][:80])
EOF
```

## Bake into the page

Each review becomes one `<a class="rev rv">` card inside `<section id="reviews">`.
Copy the existing card markup and swap in: poster URL, film title/year, stars
(or omit `.rev-stars` when unrated), review text (omit `.rev-text` when empty),
member name/handle, date, and the Letterboxd link.

Interleave members by date (newest first), keep it to ~6 cards.

## Deploy

```bash
cd ~/code/miami-film-club-concept
git add -A && git commit -m "Refresh member reviews" && git push
~/.local/bin/vc --prod --token=$(cat ~/.config/vercel/token)
```

Note: `vercel` on PATH is a wrapper — always use `~/.local/bin/vc`.
