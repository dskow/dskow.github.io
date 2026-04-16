---
layout: post
title: "Beep Boop: Patterns from an AI-Assisted Blog Refresh"
---

Beep Boop Beep Boop... We have entered the age of AI-assisted coding.

It started last year with copy-and-paste between Microsoft Copilot or one of the other 100 or so LLM flavors.  I would pull code out of a chat session, drop it into my codebase, tweaked it, tested it, and (9 times out of 10) watched it fail.  Then, I'd paste the failure back into the chat and iterate until it works.  Each loop, the AI would always come back and say something like: "Of course that won't work.  Here is how to actually do it."

This year is different. Agentic workflows let the assistant act on the system directly — reading files, running commands, editing in place.  It can even operate applications with MCP tools.  Agents see code and various tool output through shell tools like `grep`, `sed`, and `awk`. Fine for structured text, but it leaves the AI with a kind of data blindness — to visual layout, a broken image, the feel of a paragraph, things a human catches at a glance. Humans have the opposite blindness. We can't hold the volume an AI scans without effort, or the cross-file patterns it keeps in working memory.

Put both in the loop, and the whole picture shows up.

This blog is the test case. It hadn't seen a new post since December 2018 — dead images, a stale theme config, a `Gemfile.lock` carrying six years of unpatched CVEs.

Thanks, Claude, for pointing that out — jeez. Not making any promises about frequency, either.  No need to write the same thing millions of other people wrote.

I brought it back in one session with Claude Code. From here, let me just show you how the conversation actually went — lightly edited, same rhythm. Ironically, it chose to change "cherry-picked" with "lightly edited" since it was slightly negative.

<amp-img width="1440" height="816" layout="responsive" src="/assets/images/hero.jpg" alt="Abstract distributed systems network"></amp-img>

**Note:** Actually, an email from Dependabot was what got me to look into this blog editing session.

**Note:** the following dialog was curated by Claude from one of our last sessions.

## Evaluate before editing

**David:** evaluate dskow.github.io folder git project

**Claude:** *[reads the repo, git state, config, posts, dependencies]*

> - Theme declared as `jekyll-theme-midnight` in `_config.yml`, but the repo contains the Amplify AMP theme's own layouts — silent conflict.
> - Broken image references in `README.md` from prior file deletions.
> - `_config.yml` placeholder values (`twitter_username: jekyllrb`, lorem-ipsum bio).
> - `about.md` hero image pointing at defunct `lorempixel.com`.
> - A single `helm-charts/index.yaml` colocated in a personal blog repo.
> - `Gemfile` listed `gem 'Midnight'` — a gem that does not exist on rubygems.org.

Six issues ordered by blast radius. Each became its own small ticket — "why it matters, options, action" — rather than one open-ended "fix the blog" prompt. That framing fits LLM tools better than anything else I've tried.

## Mix AI image generation with deterministic code generation

**David:** Help me create a cool hero image for the page.

**Claude:** *[proposed SVG, 3D render via Blender, stock photo, and Leonardo.ai — recommended Leonardo for polish]*

I used [Leonardo.ai](https://leonardo.ai) with FLUX.2 Pro, Ray Traced style, and the prompt we settled on:

> Dark abstract tech hero banner, distributed computing concept, glowing network nodes connected by flowing data streams, deep navy and teal palette, cinematic lighting, wide landscape composition.

One 1440×816 image — the one above. Then the 48×48 favicon and logo:

**David:** Let's create a cool logo for Dskow Publishing LLC 48x48 image for this page.

**Claude:** *[proposed bold D monogram in the hero-image palette, generated with PIL]*

```python
from PIL import Image, ImageDraw, ImageFont

SCALE = 4
size = 48 * SCALE
img = Image.new('RGBA', (size, size), (0, 0, 0, 0))
draw = ImageDraw.Draw(img)

draw.ellipse([(0, 0), (size-1, size-1)], fill=(10, 22, 40, 255))  # navy
font = ImageFont.truetype('C:/Windows/Fonts/arialbd.ttf', int(34 * SCALE))
draw.text(..., "D", fill=(94, 234, 212, 255), font=font)  # teal

img = img.resize((48, 48), Image.LANCZOS)
```

Same script produced a multi-resolution `.ico` (16/32/48) bundled into one file, with the accent ring automatically dropped at 16px where it would just read as noise.

The split is deliberate. **AI image generation for creative pieces; code generation for anything with numeric constraints or repeatability.** Asking FLUX to produce a 48×48 favicon with a specific font at an exact color would be the wrong tool.

## Confirm before visible-to-others actions

**David:** split helmcharts into it own repo

**Claude:** Pumping the brakes before I do anything destructive. A few things to sort out first...

*[laid out the blast radius — existing release URLs, potential downstream `helm repo add` users, the fact that `dskow/helm-charts` already existed — and proposed a phased cutover]*

**David:** The helm charts were only used in a demo I did. So, preserving the old command is not needed.

**Claude:** Cleared to proceed. The cutover still ran as six discrete steps with explicit confirmation at each cross-repo transition:

1. Stage `index.yaml` in a tmp path (protect from loss)
2. Clone the destination repo
3. Copy, commit, push
4. Enable Pages via `gh api -X POST repos/dskow/helm-charts/pages ...`
5. Poll the Pages build until `status: built`
6. **Only then** remove the source copy from this repo and push the deletion

No "do the migration" bulk operation — cutovers that can strand live consumers should not be one-shot, even when the consumer is you.

## Security hygiene as a side effect

Earlier in the session we had deleted a six-year-old `Gemfile.lock` while troubleshooting an unrelated error, then ran `bundle install` fresh. Every gem pulled forward to current versions. When the push banner flagged an old Dependabot alert, I asked about it:

**David:** Dependabot alert (new, from this push)

**Claude:** Good news — no action needed. The alert is already fixed by the commit that pushed it.

> | Gem | Vulnerable range | Current | Status |
> |---|---|---|---|
> | addressable | < 2.9.0 | 2.9.0 | patched |
> | kramdown | < 2.3.1 | 2.5.2 | patched |
> | jekyll | < 3.6.3 | 4.4.1 | patched |
> | ffi | < 1.9.24 | 1.17.4 | patched |

Six historical alerts went from "open" to "fixed" in a single push — not because we did a security audit, but because regenerating from `Gemfile` picked up patched versions by default. For sites that bit-rot between updates, `rm Gemfile.lock && bundle install` is a legitimate one-liner.

We then added a `.github/dependabot.yml` so future CVEs show up as PRs on their own.

## Two-commit discipline

The site refresh produced two distinct concerns — general cleanup (config, branding, bio) and the helm-charts split. Claude proposed splitting them into two commits rather than one. I agreed. Clean git log:

```
4f4ae4d  Add Dependabot config for automated dependency updates
dd6f73d  Remove helm-charts/ (moved to dskow/helm-charts)
3394530  Refresh About page, site config, and branding
```

Three commits, three concerns. The history stays navigable, and each change is revertable on its own.

---

## What actually changes

AI-assisted development is not "write me an app" — that is a demo. In a real refactor, the assistant is most valuable as a **fast, structured collaborator**:

- Evaluates code with context, produces a prioritized list
- Mixes tool modalities (image gen, code gen, shell, git) inside one conversation
- Respects commit hygiene and permission boundaries
- Drafts tedious boilerplate (commit messages, YAML config, README rewrites)
- Flags what it cannot do — cross-repo operations that need human credentials, design choices that need opinion

The dialog above is edited. A live session has pauses, false starts, and the occasional "no, I meant the other file." But the shape of the collaboration is real — plain English on one side, structured execution on the other, verification both ways.

The gap between "I should update my blog" and "I updated my blog" just got a lot smaller.
