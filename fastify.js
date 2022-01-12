'use strict'

const fp = require('fastify-plugin')
const path = require('path')

// the use of fastify-plugin is required to be able
// to export the decorators to the outer scope

async function plugin (fastify, options = {}) {
  const defaults = {
    views: './views'
  }
  options = Object.assign(defaults, options)

  fastify.register(require('point-of-view'), {
    engine: { pug: require('pug') },
    root: options.views,
    options: {
      basedir: path.join(__dirname, '..') // "node_modules"
    }
  })
}

module.exports = fp(plugin, { name: 'pug-material-design' })
