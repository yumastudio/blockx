const plugin = require('tailwindcss/plugin')
const config = require('@yumastudio/blockx-scss/tailwind.config.js')

config.plugins = [
  plugin(function({ addComponents, theme }) {
    const alert = {
      '.alert': {
        '&StateSuccess': {
          background: theme('colors.green.default')
        },
        '&StateCaution': {
          background: theme('colors.red.default')
        },
        '&StateWarning': {
          background: theme('colors.yellow.300'),
          color: theme('colors.yellow.500')
        },
        '&StateInfo': {
          background: theme('colors.blue.default')
        }
      }
    }
    addComponents(alert)
  })
]

module.exports = config
