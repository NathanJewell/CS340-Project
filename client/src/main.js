import Vue from 'vue'
import App from './App.vue'
import View from './View.vue'
import Modify from './Modify.vue'
import Search from './Search.vue'

Vue.config.productionTip = false

new Vue({
    render: h => h(App),
}).$mount('#app')