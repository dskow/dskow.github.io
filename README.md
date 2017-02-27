<!---
  {
    "comment": "amp-sidebar needs to be the first element after the body tag, this is currently not possible the way examples are structured", 
    "skipValidation": true
  }
--->
<!--
  #### Introduction
  A sidebar provides a way to display meta content intended for temporary access (navigation links, buttons, menus, etc.). The sidebar can be revealed by a button tap while the main content remains visually underneath.
-->
<!-- -->
<head>
  <meta charset="utf-8">
  <script async src="https://cdn.ampproject.org/v0.js"></script>
  <!-- #### Setup -->
  <!--
    Import the `amp-sidebar` component.
  -->
  <script async custom-element="amp-sidebar" src="https://cdn.ampproject.org/v0/amp-sidebar-0.1.js"></script>
  <script async custom-element="amp-fit-text" src="https://cdn.ampproject.org/v0/amp-fit-text-0.1.js"></script> 
  <link rel="canonical" href="<%host%>/components/amp-sidebar/">
  <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
  <style amp-custom>
  
    
amp-sidebar { width: 250px; background-color: white; }
amp-sidebar ul, amp-sidebar li { margin: 0; padding: 0; }
amp-sidebar li { list-style: none; height: 100%; }
amp-sidebar a { padding: 0.6em 0 0.6em 0.6em; display: block; text-decoration: none; color: black; }
amp-sidebar a:hover { background: #828282; color: white; }

.right { float: right; }

body { font-family: "Helvetica Neue", "Open Sans", Arial, Helvetica, sans-serif; margin: 0; padding: 0; text-rendering: optimizeLegibility; -webkit-font-smoothing: antialiased; -moz-font-feature-settings: "liga=1, dlig=1"; -webkit-font-feature-settings: "liga", "dlig"; -o-font-feature-settings: "liga", "dlig"; font-feature-settings: "liga", "dlig"; }

html { -webkit-box-sizing: border-box; -moz-box-sizing: border-box; box-sizing: border-box; }

*, *:before, *:after { -webkit-box-sizing: inherit; -moz-box-sizing: inherit; box-sizing: inherit; }

.icon > svg { display: inline-block; width: 16px; height: 16px; vertical-align: middle; }
.icon > svg path { fill: #828282; }

.big-icon > svg { display: inline-block; width: 32px; height: 32px; vertical-align: middle; }
.big-icon > svg path { fill: #828282; }

.menu-icon { cursor: pointer; }

amp-img { background-color: #828282; }

.cf:after { content: ""; display: table; clear: both; }

main { display: block; }

.site-header { position: relative; width: 100%; max-width: 700px; margin: 16px auto 0 auto; }
@media only screen and (max-width: 800px) { .site-header { padding: 0 16px; } }
.site-header .page-links { display: block; position: absolute; top: 10px; right: 16px; font-weight: 200; font-style: normal; font-size: 18px; line-height: 30px; }
.site-header .page-links a { text-decoration: none; color: #999999; }
.site-header .page-links a:hover { color: #333333; }

.blog-header { width: 100%; max-width: 700px; margin: 0 auto; position: relative; padding: 0; }
.blog-header .blog-title { margin-bottom: 8px; font-size: 50px; font-weight: 700; letter-spacing: -2px; outline: 0; line-height: 50px; word-break: break-word; color: #333333; }
.blog-header .blog-description { font-size: 28px; margin: 0 0 20px; padding: 0; line-height: 1.2; color: #666666; font-weight: 300; }

.content { width: 100%; max-width: 700px; margin: 25px auto 0 auto; }
@media only screen and (max-width: 800px) { .content { padding: 0 16px; } }
.content article { padding: 20px 0; border-bottom: 1px solid #f2f2f0; }
.content article:last-child { border-bottom: 0; }
.content article .post-title { letter-spacing: -0.02em; font-weight: 700; font-style: normal; display: block; font-size: 36px; line-height: 1.15; margin: 0 0; }
.content article .post-title a { text-decoration: none; color: #333332; }
.content article .post-title a:hover { text-decoration: none; }
.content article .post-excerpt { letter-spacing: -0.02em; font-weight: 300; font-style: normal; font-size: 20px; line-height: 1.59; color: #666665; }
.content article .post-meta { font-size: 14px; color: #b3b3b1; line-height: 30px; }
.content article .post-meta a { color: #b3b3b1; text-decoration: none; }
.content article .post-meta a:hover { text-decoration: underline; }

.post-template .content { max-width: 700px; }

.index-headline { border-top: 1px solid #dededc; margin: 0; padding: 16px 0; }
.index-headline span { color: #b3b3b1; font-size: 10px; text-transform: uppercase; letter-spacing: 1px; }

.pagination { text-align: center; padding: 16px 0 0; font-size: 12px; }
.pagination a { color: #999999; text-decoration: none; }
.pagination a:hover { color: #333333; }

.site-footer { margin: 0 auto; padding: 48px 0; width: 100%; max-width: 700px; font-size: 12px; text-align: center; color: #999999; line-height: 17.6px; }
.site-footer a { color: #666666; text-decoration: none; }
.site-footer a:hover { color: #333333; }

.share { text-align: right; padding: 20px 0 0; }
.share a { text-decoration: none; color: #bbbbbb; }
.share a:hover { color: #333333; }

.pagination .disabled { opacity: 0; }

  
  </style>
  <style amp-custom>
    amp-sidebar {
      width: 250px;
      padding-right: 10px;
    }
    .amp-sidebar-image {
      line-height: 100px;
      vertical-align:middle;
    }
    .amp-close-image {
       top: 15px;
       left: 225px;
       cursor: pointer;
    }
    li {
      margin-bottom: 20px;
      list-style: none;
    }
    button {
      margin-left: 20px;
    }
  </style>
</head>
<body>

  <!-- #### Basic Usage -->
  <!--
    There can be only one `amp-sidebar` in an AMP document. The `amp-sidebar` should be a direct child of the `<body>`. It must have a layout of nodisplay.
    The`amp-sidebar` may not contain any AMP Elements except for `amp-accordion`, `amp-img` and `amp-fit-text`.
    `amp-fit-text` expands or shrinks its font size to fit the content within the space given to in the menu.
  -->
    <amp-sidebar id="sidebar" layout="nodisplay" side="right">
      <amp-img class="amp-close-image" src="/img/ic_close_black_18dp_2x.png" width="20" height="20" alt="close sidebar" on="tap:sidebar.close" role="button" tabindex="0"></amp-img>
      <ul>
        <li><a href="/">Home</a></li>
        <li> Nav item 1</li>
        <li>
          <amp-fit-text width="220" height="20" layout="responsive" max-font-size="24">
            Nav item 2 - &lt;amp-fit-text&gt;
          </amp-fit-text>
        </li>
        <li>
          <amp-fit-text width="220" height="20" layout="responsive" max-font-size="24">
            Nav item 3 - &lt;amp-fit-text&gt; longer text
          </amp-fit-text>
        </li>
        <li> Nav item 4 - Image<amp-img class="amp-sidebar-image" src="/img/favicon.png" width="20" height="20" alt="an image"></amp-img></li>
        <li> Nav item 5</li>
        <li> Nav item 6</li>
      </ul>
    </amp-sidebar>

    <div class="menu-icon">
        <a on="tap:sidebar.open">
            <span class="big-icon icon--hamburger"><svg viewbox="0 0 32 32"><path d="M4,10h24c1.104,0,2-0.896,2-2s-0.896-2-2-2H4C2.896,6,2,6.896,2,8S2.896,10,4,10z M28,14H4c-1.104,0-2,0.896-2,2  s0.896,2,2,2h24c1.104,0,2-0.896,2-2S29.104,14,28,14z M28,22H4c-1.104,0-2,0.896-2,2s0.896,2,2,2h24c1.104,0,2-0.896,2-2  S29.104,22,28,22z"></path></svg></span>
        </a>
    </div>
    <!-- #### Sidebar Actions -->
    <!--
    Click to toggle the sidebar.
    <button on="tap:sidebar.toggle">Toggle sidebar</button>
    -->

    <!--
    Click to open the sidebar.
    <button on="tap:sidebar.open">Open sidebar</button>
    -->

    <!--
    Click to close the sidebar.
    <button on="tap:sidebar.close">Close sidebar</button>
    -->

