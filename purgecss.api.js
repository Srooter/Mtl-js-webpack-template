var Purgecss = require('purgecss')

// 参考：https://www.purgecss.com/javascript-api/
// Reference：https://www.purgecss.com/javascript-api/
const purgecss = new Purgecss({
  content: ['src/views/*.html', 'src/js/common/*.js', 'src/js/pages/*.js'],
  css: ['src/css/common/common.css', 'src/css/pages/**/*.css'],
  whitelist: [],
  rejected: true,
})

const purgecssResult = purgecss.purge()

console.log('===== Start =====')

purgecssResult.map((p, index) => {
  console.log('unuse class path : ' + p.file)
  console.log('unuse class : ' + p.rejected)
  if (index != purgecssResult.length - 1) {
    console.log('===== Next ======')
  }
})

console.log('===== End ======')
