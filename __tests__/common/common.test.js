import printMe from '../../src/js/common/common'

test('printMe function', () => {
  expect(printMe()).toBe(console.log('================ This is a js webpack template.================='))
})
