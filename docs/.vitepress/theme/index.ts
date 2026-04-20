import DefaultTheme from 'vitepress/theme'
import HomeExtra from './components/HomeExtra.vue'
import CustomLayout from './CustomLayout.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  Layout: CustomLayout,
  enhanceApp({ app }) {
    app.component('HomeExtra', HomeExtra)
  },
}
