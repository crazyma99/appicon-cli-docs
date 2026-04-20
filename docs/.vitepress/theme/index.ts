import DefaultTheme from 'vitepress/theme'
import HomeExtra from './components/HomeExtra.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('HomeExtra', HomeExtra)
  },
}
