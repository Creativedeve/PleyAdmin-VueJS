import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import VueApollo from "vue-apollo";
import Sidepanel from "@/components/Sidepanel";
import { apolloClient } from "./apollo";
import { localize } from "@/helpers/localize";

import VModal from 'vue-js-modal'
Vue.use(VModal)


import moment from 'moment'
Vue.prototype.moment = moment


import InputLoader from "@/components/InputLoader";
Vue.component("InputLoader", InputLoader);

import VueFormulate from "@braid/vue-formulate";
import AutoComplete from '@/components/AutoComplete'
Vue.component('AutoComplete', AutoComplete)
Vue.use(VueFormulate, {
  library: {
    autocomplete: {
      classification: 'text',
      component: 'AutoComplete'
    }
  }
})


import VueGoodTablePlugin from "vue-good-table";
import "vue-good-table/dist/vue-good-table.css";
Vue.use(VueGoodTablePlugin);

Vue.component("sidepanel", Sidepanel);

import currentLanguage from "@/locales/en.json";

Vue.mixin({
  methods: {   
    delay(ms) {
      new Promise(res => setTimeout(res, ms))
    },
    insertImageInEditorHandler(data){
      const image = data.assets[0]
      const src = `https://res.cloudinary.com/pley-gg/image/upload/w_400/${image.public_id}.${image.format}`
      const imageJson = {
        source: 'cloudinary',
        publicId: image.public_id,
        originalWidth: image.width,
        originalHeight: image.height,
        customWidth:'100%',
        customHeight:'100%',
        cloudinaryAssetData: true,
        cloudName: "pley-gg",
        format: image.format,
        caption: image.context.custom.caption,
        alt: image.context.custom.alt
      }
      const imageJsonString = JSON.stringify(imageJson)
      const imageTag = `[image:${imageJsonString}]`
      
      const transaction = this.editor.state.tr.insertText(imageTag)
      //const transaction = this.editor.state.tr.insertText({"type":"paragraph","content":[{"type":"text","text":"Body"}]})
      this.editor.view.dispatch(transaction)
    },
    addYoutubeToEditor(command) {
      const source = prompt('Enter the Youtube clip/stream id here')
      if (source !== null) {
        const tag = `[youtube:${source}]`
        const transaction = this.editor.state.tr.insertText(tag)
        this.editor.view.dispatch(transaction)
      }
    },
    addTwitchChannelToEditor(command) {
      const source = prompt('Enter the twitch CHANNEL here')
      if (source !== null) {
        const tag = `[twitchChannel:${source}]`
        const transaction = this.editor.state.tr.insertText(tag)
        this.editor.view.dispatch(transaction)
      }
    },
    addTwitchVideoToEditor(command) {
      const source = prompt('Enter the twitch VIDEO here')
      if (source !== null) {
        const tag = `[twitchVideo:${source}]`
        const transaction = this.editor.state.tr.insertText(tag)
        this.editor.view.dispatch(transaction)
      }
    },
    addTwitchClipToEditor(command) {
      const source = prompt('Enter the twitch CLIP here')
      if (source !== null) {
        const tag = `[twitchClip:${source}]`
        const transaction = this.editor.state.tr.insertText(tag)
        this.editor.view.dispatch(transaction)
      }
    },
    addTweetToEditor(command) {
      const source = prompt('Enter the tweet id here')
      if (source !== null) {
        const tag = `[twitter:${source}]`
        const transaction = this.editor.state.tr.insertText(tag)
        this.editor.view.dispatch(transaction)
      }
    },

    addLink(command) {
      // const link = prompt('Enter the full link url here')
      const link = document.getElementById("linkURL").value
     const linkCB = document.getElementById("linkURLCB_IsOpenNewTab").checked 
// console.log("Link",link)
//  console.log("LinkCB",linkCB)
      if (link !== null) {
        let tag = ""

        const { selection } = this.editor
        const { from, to } = selection
        const text = this.editor.state.doc.textBetween(from, to, ' ')
        let linkObj = { url: link,isNewTab:linkCB }
        if (text) linkObj.text = text
        const linkJsonString = JSON.stringify(linkObj)
        tag = `[link:${linkJsonString}]`
        const transaction = this.editor.state.tr.insertText(tag)
        this.editor.view.dispatch(transaction)       
      }
      this.hideLinkURL();

    },
    addReadMoreLink(command) {
      const link = document.getElementById("slugReadMore").value
      const linkCB = document.getElementById("slugReadMoreCB_IsOpenNewTab").checked 
//  console.log("slugReadMore",link)
//   console.log("slugReadMoreCB",linkCB)
      //const link = prompt('Enter the full link url here')
      if (link !== null) {
        let tag = ""
        const baseUrlPattern = /^https?:\/\/[a-z\:0-9.]+/
        var result = ""
        var slugwrap=""
        var match = baseUrlPattern.exec(link)
        if (match != null) {
            result = match[0]
        }
        if (result.length > 0) {
          slugwrap = link.replace(result+"/news/", "").replace("/","")
        }
        let linkObj = { slug: slugwrap,isNewTab:linkCB }
        const linkJsonString = JSON.stringify(linkObj)
        // tag = `[link:${linkJsonString}]`
        tag = `[slugORMA:${linkJsonString}]`
        const transaction = this.editor.state.tr.insertText(tag)
        this.editor.view.dispatch(transaction)       
      }
      this.hideSlugReadMore()
    },
    addCountryFlag(command) {
      const countryFlag = document.getElementById("country").value
      if (countryFlag !== null) {
        const tag = `{cflag:${countryFlag}}`
        const transaction = this.editor.state.tr.insertText(tag)
        this.editor.view.dispatch(transaction)
      }
      this.hide();
    },
    addPanel: function(panelID, payload) {
      this.$store.dispatch("addPanel", {
        id: panelID,
        payload
      });
    },
    now: function() {
      return moment(new Date()).format('YYYY-MM-DDTHH:mm')
    },
    dateToTimestamp: function(date) {
      return parseInt(moment(date).format('x'))
    },
    timestampToFormDateTime: function(timestamp) {
      return moment(timestamp).format('YYYY-MM-DDTHH:mm')
    },
    timestampToFormDate: function(timestamp) {
      return moment(timestamp).format('YYYY-MM-DD')
    },
    timestampToDateTime: function(timestamp) {
      return moment(timestamp).format('YYYY-MM-DD HH:mm')
    },
    timestampToDate: function(timestamp) {
      return moment(timestamp).format('YYYY-MM-DD')
    },
    removeAllPanels: function() {
      this.$store.dispatch("removeAllPanels");
    },
    removePanel: function(panelId) {
      this.$store.dispatch("removePanel", { panelId });
    },
    localize(value) {
      return localize(value, [store.state.Auth.language]);
    },
    $t(value, placeholders) {
      // LOCALISATION HACK
      const namespace = value.split(":")[0];
      const str = value.split(":")[1];
      const ns = currentLanguage[namespace];
      var res = str.split(".").reduce(function(o, k) {
        if (!o[k]) {
          console.error("$t, translation missing", value);
          return "*" + value;
        }
        return o && o[k];
      }, ns);
      if (placeholders) {
        Object.keys(placeholders).forEach(key => {
          res = res.split(`{${key}}`).join(placeholders[key]);
        });
      }
      return res;
    }
  },
  computed: {
    currentUser() {
      return this.$store.getters.getUser;
    }
  },
});

const apolloProvider = new VueApollo({
  defaultClient: apolloClient
});

Vue.use(VueApollo);

Vue.filter("timeToLocal", value => {
  if (!value) return "";
  return new Date(value).toLocaleString();
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  apolloProvider,
  render: h => h(App)
}).$mount("#app");
