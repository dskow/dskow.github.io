# dskow.github.io

Source for [dskow.com](https://dskow.com) — the personal blog of David Skowronski.
Notes on backend engineering, distributed systems, and cloud-native development.

Published by **Dskow Publishing LLC**.

## Tech

- [Jekyll](https://jekyllrb.com/) static site generator
- [Google AMP](https://amp.dev/) for fast mobile rendering
- Built on the [Amplify for Jekyll](https://github.com/ageitgey/amplify) theme (see [LICENSE](LICENSE) for attribution)
- Hosted on GitHub Pages

## Local development

Requires Ruby 3.x with the MSYS2/MINGW DevKit on Windows (use [RubyInstaller](https://rubyinstaller.org/)).

```bash
gem install bundler
bundle install
bundle exec jekyll serve
```

Then open <http://localhost:4000/>.

## Writing posts

Posts live in `_posts/` as Markdown files named `YYYY-MM-DD-slug.md`. Each needs Jekyll front matter:

```yaml
---
layout: post
title: Your post title
---
```

AMP enforces a few rules — see the theme notes:

- Images: use `<amp-img width="..." height="..." layout="responsive" src="...">` with explicit dimensions.
- YouTube: use `<amp-youtube data-videoid="..." width="..." height="..." layout="responsive">`.
- No external CSS or custom JS; styles are inlined from `_includes/styles.scss`.

Validate a page by appending `#development=1` to any URL and checking the browser console.

## License

Site content © David Skowronski / Dskow Publishing LLC. All rights reserved.

Theme source (Amplify for Jekyll) is MIT-licensed — see [LICENSE](LICENSE).
