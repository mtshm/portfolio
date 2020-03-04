// src/plugins/vuetify.js

import Vue from 'vue'
import Vuetify from 'vuetify/lib'

import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: colors.amber.base,
        secondary: colors.indigo.base,
        accent: colors.purple.base,
        error: colors.red.base,
        warning: colors.pink.base,
        info: colors.green.base,
        success: colors.orange.base
      },
    },
  },
})