module.exports = {
  plugins: [
    require('postcss-import'),
    require('tailwindcss'),
    require('autoprefixer'),
    require('cssnano'),
    require('@fullhuman/postcss-purgecss')({
      safelist: [/-module_/]
    })
  ],
}
