'use strict'

const fp = require('fastify-plugin')
const path = require('path')
const pug = require('pug')

// the use of fastify-plugin is required to be able
// to export the decorators to the outer scope

async function plugin (fastify, options = {}) {
  const defaults = {
    views: './views',
    propertyName: 'view'
  }
  options = Object.assign(defaults, options)
  const { views, propertyName } = options

  const unusedPropertyName = 'pugUnextended'
  fastify.register(require('point-of-view'), {
    propertyName: unusedPropertyName,
    engine: { pug: require('pug') },
    root: views,
    options: {
      basedir: path.resolve('node_modules')
    }
  })

  function viewFunction (object, request) {
    object = object || this
    return function view (template, options = {}) {
      options.request = request
      options.include = function pugDynamicIncludes (template) {
        /* https://stackoverflow.com/a/26525724/2389922
          usage:
          != include('template')
        */
        function render (file) {
          options.basedir = path.resolve('node_modules')
          return pug.renderFile(file, options)
        }
        try {
          return render(path.join(views, template + '.pug'))
        } catch (error) {
          return render(path.join(views, template, 'index.pug'))
        }
      }
      return object[unusedPropertyName](template, options)
    }
  }

  fastify.decorateReply(propertyName, viewFunction())
  fastify.decorate(propertyName, viewFunction())

  function reDecorate (object, request) {
    object[propertyName] = viewFunction(object, request)
  }

  fastify.addHook('onRequest', async (request, reply) => {
    reDecorate(reply, request)
    reDecorate(fastify, request)
  })
}

module.exports = fp(plugin, { name: 'pug-material-design' })
