const $ = document.querySelector.bind(document);

const request = new XMLHttpRequest();

const newGameWrapper = $('[data-attr="newGameWrapper"]');
let checkedNumbers = [];
let lastResultNumbers = [];
let lastDateWrapper = $('[data-attr="lastDate"]');
let lastNumbersWrapper = $('[data-attr="lastNumbers"]');
let successMsg = $('[data-attr="successMsg"]');
let errorMsg = $('[data-attr="errorMsg"]');

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

    if ( checkedNumbers.length < 15 ) {
    
        errorMsg.innerHTML = 'O jogo deve ter no mínimo 15 números.'    
        successMsg.innerHTML = '';
        setTimeout(() => {
            errorMsg.innerHTML = '';
        }, 5000);
        
    } else if ( checkedNumbers.length > 18 ) {
        
        errorMsg.innerHTML = 'O jogo deve ter no máximo 18 números.'
        successMsg.innerHTML = '';

        setTimeout(() => {
            errorMsg.innerHTML = '';
        }, 5000);
    
    } else {
        errorMsg.innerHTML = '';
        successMsg.innerHTML = `${ hits.length } acertos!`;
    }
    
};

clearCheckedNumbers = () => {

    let gameNumbers = document.querySelectorAll('[data-attr="btnGameNumber"]');

    gameNumbers.forEach( item => {
        
        if ( item.classList.contains('hit') ) {
            item.classList.remove('hit');
        }

        if ( item.classList.contains('checked') ) {
            item.classList.remove('checked');
        }
        
    });
};

const numbers = Array.from(Array(25), ( x, index ) => { 
    
    if ( index < 9 ) {
        return `0${ index + 1 }`;
    } else {
        return `${index + 1}`;
    }
});

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
                        data-attr="btnGameNumber"
                        onclick="toggleNumber(this);"
                    >
                        ${ num }
                    </button>
                </li>
            `).join('')}
        </ul>
        <div class="control-buttons">
            <button 
                type="button" 
                class="clear-btn"
                onclick="clearCheckedNumbers();"
            >
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