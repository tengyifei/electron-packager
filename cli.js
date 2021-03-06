#!/usr/bin/env node
var fs = require('fs')
var args = require('minimist')(process.argv.slice(2), {boolean: ['prune', 'asar', 'overwrite']})
var packager = require('./')
var usage = fs.readFileSync(__dirname + '/usage.txt').toString()

args.dir = args._[0]
args.name = args._[1]

var protocolSchemes = [].concat(args.protocol || [])
var protocolNames = [].concat(args['protocol-name'] || [])

if (protocolSchemes && protocolNames && protocolNames.length === protocolSchemes.length) {
  args.protocols = protocolSchemes.map(function (scheme, i) {
    return {schemes: [scheme], name: protocolNames[i]}
  })
}

if (!args.dir || !args.name || !args.platform || !args.arch || !args.version) {
  console.error(usage)
  process.exit(1)
}

packager(args, function done (err, appPath) {
  if (err) {
    if (err.message) console.error(err.message)
    else console.error(err, err.stack)
    process.exit(1)
  }

  console.error('Wrote new app to', appPath)
})
