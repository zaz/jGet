// Constants //
var URL = "http://www.wiredhealthresources.net/"

// 1: href, src   2: http://, https://, //, /   3: URL
URL_matcher = /(href|src)="([a-z]*:\/\/|\/\/|\/)?(.*?)"/i
URL_matcher_global = /(href|src)="([a-z]*:\/\/|\/\/|\/)?(.*?)"/g

// Derived Constants //
URL_on_site_matcher = new RegExp("^" + URL)

// Dependencies //
             require('es6-shim')
var $      = require('jQuery')
var system = require('system')
var page   = require('webpage').create()

// Global Variables //
var unvisited = new Set()
var   visited = new Set()

// Helper Functions //
function log(obj) { console.log(JSON.stringify(obj)) }
function mark_visited(url) { visited.add(url); unvisited.delete(url) }
function is_on_site(url) { return Boolean(url.match(URL_on_site_matcher)) }

function make_absolute(url) {
  match = url.match(URL_matcher)
  if (!match[2] || match[2] === "/") {
    return(URL + match[3])
  } else {
    return(match[2] + match[3])
  }
}

function GET(url, callback) {
  page.open(url, function() {
    callback(page.content)
  })
}

// Main //
GET(URL, function(content) {
  // TODO: if succeeded:
  mark_visited(URL)
  // console.log(content)
  content.match(URL_matcher_global)
         .map(make_absolute)
         .filter(is_on_site)
         .forEach(function(u) { unvisited.add(u) })
  unvisited.forEach( function(x) { console.log(x) })
  phantom.exit()
})
