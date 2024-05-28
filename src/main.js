import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";

// Vuetify
import "vuetify/styles/generic/_index.scss";
import "vuetify/styles/settings/_index.sass";
import "vuetify/styles/utilities/_index.sass";
import "vuetify/styles/elements/_blockquote.sass";
import "./custom.scss";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { aliases, mdi } from "vuetify/iconsets/mdi-svg";

// highlight.js
import "highlight.js/styles/stackoverflow-light.css";
import hljs from "highlight.js/lib/core";
import javascript from "highlight.js/lib/languages/javascript";
import hljsVuePlugin from "@highlightjs/vue-plugin";
hljs.registerLanguage("javascript", javascript);

const vuetify = createVuetify({
  components: {
    ...components,
  },
  directives,
  icons: {
    defaultSet: "mdi",
    aliases,
    sets: {
      mdi,
    },
  },
  styles: { configFile: "src/custom.scss" },
});

createApp(App).use(vuetify).use(hljsVuePlugin).mount("#app");
