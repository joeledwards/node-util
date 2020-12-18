const tap = require('tap')

const {
  padString,
  trim,
  trimLeft,
  trimRight
} = require('../lib')

tap.test('util.padString()', async assert => {
  assert.equal(padString(5, 'foo'), '  foo')
  assert.equal(padString(4, 'foo'), ' foo')
  assert.equal(padString(3, 'foo'), 'foo')
  assert.equal(padString(2, 'foo'), 'foo')

  assert.equal(padString(5, 'foo', false), 'foo  ')
  assert.equal(padString(4, 'foo', false), 'foo ')
  assert.equal(padString(3, 'foo', false), 'foo')
  assert.equal(padString(2, 'foo', false), 'foo')
})

tap.test('util.trim()', async assert => {
  assert.equal(trim()(), '')

  assert.equal(trim()('  foo'), 'foo')
  assert.equal(trim()(' foo'), 'foo')
  assert.equal(trim()('foo'), 'foo')
  assert.equal(trim()('foo '), 'foo')
  assert.equal(trim()('foo  '), 'foo')
  assert.equal(trim()(' foo '), 'foo')
  assert.equal(trim()('  foo  '), 'foo')

  assert.equal(trim('/')('/path'), 'path')
  assert.equal(trim('/')('path/'), 'path')
  assert.equal(trim('/')(' /path'), ' /path')
  assert.equal(trim('/')('//path'), 'path')
  assert.equal(trim('/')('/ path'), ' path')
  assert.equal(trim('/')('path /'), 'path ')
  assert.equal(trim('/')('path//'), 'path')
  assert.equal(trim('/')('path/ '), 'path/ ')

  assert.equal(trim(' ')('   '), '')
  assert.equal(trim('/')('///'), '')

  assert.equal(trim(':', { keep: 1 })('foo'), 'foo')
  assert.equal(trim(':', { keep: 1 })(':foo'), ':foo')
  assert.equal(trim(':', { keep: 1 })('foo:'), 'foo:')
  assert.equal(trim(':', { keep: 1 })(':foo:'), ':foo:')
  assert.equal(trim(':', { keep: 1 })('::foo:'), ':foo:')
  assert.equal(trim(':', { keep: 1 })(':foo::'), ':foo:')
  assert.equal(trim(':', { keep: 1 })('::foo::'), ':foo:')
})

tap.test('util.trimLeft()', async assert => {
  assert.equal(trimLeft()('  foo'), 'foo')
  assert.equal(trimLeft()('foo  '), 'foo  ')
  assert.equal(trimLeft()('  foo  '), 'foo  ')

  assert.equal(trimLeft()('   '), '')

  assert.equal(trimLeft('/', { keep: 2 })('//foo'), '//foo')
})

tap.test('util.trimRight()', async assert => {
  assert.equal(trimRight()('  foo'), '  foo')
  assert.equal(trimRight()('foo  '), 'foo')
  assert.equal(trimRight()('  foo  '), '  foo')

  assert.equal(trimRight()('   '), '')

  assert.equal(trimRight('/', { keep: 2 })('foo///'), 'foo//')
})
