const express = require('express');
const app = express();

const cheerio = require('cheerio');
const request = require('request');

app.listen(3001);

request('https://g1.globo.com/loterias/lotofacil.ghtml', function(err, resp, html) {

  if (!err){

      const $ = cheerio.load(html);

      let $lastDate = $('.content-lottery__draw-container > .draw > .content-lottery__info');

      let $lastDozens = $('.content-lottery__result.content-lottery__result--lotofacil');

      let $awardHits = $('.content-lottery__table-content > tbody .col-acertos');

      let $awardWinners = $('.content-lottery__table-content > tbody .col-ganhadores');
      
      let $awardPrizes = $('.content-lottery__table-content > tbody .col-premio');

      let lastDate = $lastDate.text().trim().slice(-10);

      let lastDozens = $lastDozens.map(function() {

        return $(this).text().trim();

      }).get();

      let awardHits = $awardHits.map(function() {

        return $(this).text().trim();

      }).get();

      let awardWinners = $awardWinners.map(function() {

        return $(this).text().trim();

      }).get();

      let awardPrizes = $awardPrizes.map(function() {

        return $(this).text().trim();

      }).get();

      let data = {
        lastDate,
        lastDozens,
        award: {}
      };
      
      for ( let i = 0; i < 5; i++ ) {

        data.award[i] = {

          hits: awardHits[i],
          winners: awardWinners[i],
          prizes: awardPrizes[i]
        }
      };

      console.log(data);

  } else {

    console.log(err);
  }

});

module.exports = app;