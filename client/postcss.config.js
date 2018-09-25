module.exports = {
  plugins: [
    require('autoprefixer')({ grid: true, browsers: ['last 2 versions', '> 0.2%', 'not dead']}),
    // require('css-mqpacker')
    // require('cssnano')
  ]
}