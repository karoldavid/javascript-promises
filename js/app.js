/* jshint unused: false */

(function(document) {
  'use strict';

  var gallery = document.getElementById('gallery');

  gallery.innerHTML = '<h2>Polish Movie Posters</h2>';

  /**
   * Helper function to show the search query.
   * @param {String} query - The search query.
   */
  function addSearchHeader(query) {
    gallery.innerHTML = '<h2>Polish Movie Posters</h2>';
  }

  /**
   * Helper function to create a poster thumbnail.
   * @param  {Object} data - The raw data describing the poster.
   */
  function createPosterThumb(data) {
    console.log(data);
    var pT = document.createElement('img');
    //pT['src'] = 'images/posters/' + data['src'] + '-large_1x.jpeg';
    pT['src'] = 'dist/images/' + data['src'] + '_thumb.jpeg';
    pT['alt'] = data.title['EN'] || data.title['PL'] || data.title['GER'] || '';
    pT['width'] = data.size[0];
    gallery.appendChild(pT);
  }

  /**
   * XHR wrapped in a promise
   * @param  {String} url - The URL to fetch.
   * @return {Promise}    - A Promise that resolves when the XHR succeeds and fails otherwise.
   */
  function get(url) {
    return fetch(url);
  }

  /**
   * Performs an XHR for a JSON and returns a parsed JSON response.
   * @param  {String} url - The JSON URL to fetch.
   * @return {Promise}    - A promise that passes the parsed JSON response.
   */
  function getJSON(url) {
    return get(url).then(function(response) {
      return response.json();
    });
  }

  window.onload = function() {
    getJSON('data/movieposter.json')
    .then(function(response) {
    	response.posters.forEach(function(poster) {
        createPosterThumb(poster);
    	});
    })
    .catch(function(error) {
    	console.log('error', error);
    });
  }
})(document);