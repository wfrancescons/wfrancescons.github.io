import lume from "lume/mod.ts";
import favicon from "lume/plugins/favicon.ts";
import googleFonts from "lume/plugins/google_fonts.ts";
import inline from "lume/plugins/inline.ts";
import jsx from "lume/plugins/jsx.ts";
import lightningCss from "lume/plugins/lightningcss.ts";
import metas from "lume/plugins/metas.ts";
import minifyHTML from "lume/plugins/minify_html.ts";
import picture from "lume/plugins/picture.ts";
import robots from "lume/plugins/robots.ts";
import seo from "lume/plugins/seo.ts";
import sri from "lume/plugins/sri.ts";
import tailwindcss from "lume/plugins/tailwindcss.ts";
import terser from "lume/plugins/terser.ts";
import transformImages from "lume/plugins/transform_images.ts";

const site = lume({
  src: "./src",
});

site.use(jsx());
site.use(terser());
site.use(googleFonts({
  fonts:
    "https://fonts.google.com/share?selection.family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900",
}));
site.use(tailwindcss());
site.use(lightningCss());
site.use(picture());
site.use(transformImages());
site.use(metas());
site.use(inline());
site.use(favicon({
  input: "/img/avatar.jpg",
}));
site.use(robots());
site.use(seo({
  options: { body: false },
}));
site.use(sri());
site.use(minifyHTML({
  options: {
    minify_js: true,
    keep_html_and_head_opening_tags: true,
  },
}));

site.add("img");
site.add("style.css");
site.add("assets", ".");

export default site;
