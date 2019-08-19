let checkedNumbers = [];
let lastResultNumbers = [];
let request = new XMLHttpRequest();
let lastDateWrapper = document.querySelector('[data-attr="lastDate"]');
let lastNumbersWrapper = document.querySelector('[data-attr="lastNumbers"]');
let resultMsg = document.querySelector('[data-attr="resultMsg"]');

request.open('GET', 
    'https://apiloterias.com.br/app/resultado?loteria=lotofacil&token=q526EIFPMLiR62c', 
    true
);

request.onload = function() {

    let data = JSON.parse(this.response);
    let dezenas = data.dezenas;
    let lastDate = new Date(data.data_concurso);
    let lastResultDate = lastDate.toLocaleDateString();

    dezenas.forEach( e => {
        lastResultNumbers.push(e);
    });

    lastDateWrapper.innerHTML = lastResultDate;
    lastNumbersWrapper.innerHTML = dezenas.join(' ');
};

request.send();

toggleNumber = e => {

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

    hits = checkedNumbers.filter( value => lastResultNumbers.includes(value) );
    resultMsg.innerHTML = `${ hits.length } acertos!`;
}

