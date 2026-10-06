#!/usr/bin/env python3
"""Assemble index.html from src/shell.html + work/batchN/themes.{css,js}."""
import pathlib, sys

root = pathlib.Path("/home/hatch/code/miami-film-club-concept")
shell = (root / "src" / "shell.html").read_text()

css_parts, js_parts = [], []
for n in (1, 2, 3, 4):
    c = root / "work" / f"batch{n}" / "themes.css"
    j = root / "work" / f"batch{n}" / "themes.js"
    if c.exists():
        css_parts.append(f"\n/* ===== batch{n} ===== */\n" + c.read_text())
    else:
        print(f"WARN: missing {c}", file=sys.stderr)
    if j.exists():
        js_parts.append(f"\n/* ===== batch{n} ===== */\n" + j.read_text())
    else:
        print(f"WARN: missing {j}", file=sys.stderr)

out = shell.replace("/*__THEME_CSS__*/", "\n".join(css_parts))
out = out.replace("/*__THEME_JS__*/", "\n".join(js_parts))
(root / "index.html").write_text(out)
print(f"built index.html: {len(out)} bytes, css {sum(len(p) for p in css_parts)} / js {sum(len(p) for p in js_parts)}")
