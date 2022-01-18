'use strict'

const fp = require('fastify-plugin')
const path = require('path')
const pug = require('pug')

// the use of fastify-plugin is required to be able
// to export the decorators to the outer scope

async function plugin(fastify, options = {}) {
  const defaults = {
    views: './views',
    propertyName: 'view'
  }
  options = Object.assign(defaults, options)

  const unusedPropertyName = 'pugUnextended'
  fastify.register(require('point-of-view'), {
    propertyName: unusedPropertyName,
    engine: { pug: require('pug') },
    root: options.views,
    options: {
      basedir: path.resolve('node_modules')
    }
  })

  // https://stackoverflow.com/a/26525724/2389922
  function view(template, options = {}) {
    options.include = function pugDynamicIncludes(template) {
      /* usage:
        != include('template')
      */
      function render(file) {
        options.basedir = path.resolve('node_modules')
        return pug.renderFile(file, options)
      }
      try {
        return render(path.join('views', template + '.pug'))
      } catch (error) {
        return render(path.join('views', template, 'index.pug'))
      }
    }
    return this[unusedPropertyName](template, options)
  }

  fastify.decorateReply(options.propertyName, view)
  fastify.decorate(options.propertyName, view)
}

module.exports = fp(plugin, { name: 'pug-material-design' })
