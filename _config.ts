import lume from "lume/mod.ts";
import theme from "theme/mod.ts";

const siteUrl = "https://wfrancescons.github.io/";

const site = lume({
  src: "./src",
  location: new URL(siteUrl),
});

site.use(theme());

export default site;
