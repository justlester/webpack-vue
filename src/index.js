import Vue from 'vue'
import App from '@/App.vue'
import store from '@/plugins/store'
import router from '@/plugins/router'
import vuetify from '@/plugins/vuetify'
import linkify from 'vue-linkify'
import moment from 'moment-timezone'
import storage from 'local-storage-fallback'

Vue.directive('linkified', linkify)

Vue.filter('dateText',(v)=>{
  if(v == null || v == undefined || v == '') return ''
  return moment(v).format('MMM D, YYYY');
})

Vue.filter('timeText',function(v){
  if(v == null || v == undefined || v == '') return ''
  return moment.tz(v,'UTC').format('h:mm A');
})

Vue.filter('dateTimeText',(v)=>{
  if(v == null || v == undefined || v == '') return ''
  return moment(v).format('MMM D, YYYY h:mm A');
})

const darkThemeKey = 'chassis\_dark\_theme';

new Vue({
  el: '#app',
  store,
  router,
  vuetify,
  render: h => h(App),
  computed: {
    darkTheme: {
      get(){
        return this.$vuetify.theme.dark;
      },
      set(v){
        this.$vuetify.theme.dark = !!v;
      }
    },
  },
  created() {
    var self = this;
    window.onstorage = ({key,newValue}) => {
      if (key == darkThemeKey) {
        self.darkTheme = (newValue == "true");
      }
    }
    this.darkTheme = (storage.getItem(darkThemeKey) == "true");
  },
  watch: {
      darkTheme(v){
        storage.setItem(darkThemeKey,String(!!v));
      }
  }
})