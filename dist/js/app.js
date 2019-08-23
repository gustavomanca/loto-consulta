const $ = document.querySelector.bind(document);

const request = new XMLHttpRequest();

let checkedNumbers = [];
let lastResultNumbers = [];
let lastDateWrapper = $('[data-attr="lastDate"]');
let lastNumbersWrapper = $('[data-attr="lastNumbers"]');
let resultMsg = $('[data-attr="resultMsg"]');

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

    lastResultNumbers.forEach( number => {
        
        if ( number == e.value ) {
            e.classList.add('hit');
        }
    });    

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

const newGameWrapper = $('[data-attr="newGameWrapper"]');

const numbers = Array.from(Array(25), ( x, index ) => index + 1);

(function(){

    newGameWrapper.innerHTML = 
    `
        <ul class="list">
            ${ numbers.map( num => `
                <li class="item">
                    <button 
                        class="btn-number"
                        type="button"
                        value="${ num }"
                        onclick="toggleNumber(this);"
                    >
                        ${ num }
                    </button>
                </li>
            `).join('')}
        </ul>
        <div class="control-buttons">
            <button type="button" class="clear-btn">
                <img src="src/assets/images/icon-trash.svg" class="icon" />
            </button>
            <button 
                type="button" 
                class="check-btn"
                onclick="getNumberOfHits();"
            >
                <img src="src/assets/images/icon-check.svg" class="icon" />
            </button>
        </div>
    `;

})();