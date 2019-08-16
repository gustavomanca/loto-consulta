let checkedNumbers = [];
let lastResults = [];
let request = new XMLHttpRequest();
let resultMsg = document.querySelector('[data-attr="resultMsg"]');

request.open('GET', 
    'http://apiloterias.com.br/app/resultado?loteria=lotofacil&token=q526EIFPMLiR62c', 
    true
);

request.onload = function() {
    // Begin accessing JSON data here
    let data = JSON.parse(this.response);
    let dezenas = data.dezenas;

    dezenas.forEach( e => {
        lastResults.push(e);
    });
    
}

request.send();

function toggleNumber(e) {

    checkedNumbers.forEach(number => {

        if ( e.value === number && e.classList.contains('checked') ) {

            let index = checkedNumbers.indexOf(number);

            if ( index > -1 ) {
                checkedNumbers.splice( index, 1 );
            }

        }
    });

    e.classList.toggle('checked');

    if ( e.classList.contains('checked') ) {
        checkedNumbers.push(e.value);
    } 
    
};

getNumberOfHits = () => {

    hits = checkedNumbers.filter( value => lastResults.includes(value));
    
    console.log(hits.length);

    resultMsg.innerHTML = `${ hits.length } acertos!`;
    
}

