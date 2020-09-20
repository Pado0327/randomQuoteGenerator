const quote = document.querySelector('#quoteContainer__quote');
const quoteAuthor = document.querySelector('#author');
const loader = document.querySelector('.loader');
const quoteContainer = document.querySelector('.quoteContainer');

function showLoadingSpinner() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function removeLoadingSpinner() {
  if (!loader.hidden) {
    quoteContainer.hidden = false;
    loader.hidden = true;
  }
}

// Get Quote From API
async function getQuote() {
  showLoadingSpinner();
  const proxyUrl = 'https://gentle-headland-49299.herokuapp.com/';
  const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
  try {
    const response = await fetch(proxyUrl + apiUrl);
    const data = await response.json();
    insertQuote(data);
    removeLoadingSpinner();
  } catch (error) {
    getQuote();
    console.log('whoops, no quote', error);
  }
}

const quoteGeneratorbtn = document.querySelector('#quoteGenerator');
quoteGeneratorbtn.addEventListener('click', getQuote);
const twitterbtn = document.querySelector('#twitter');
twitterbtn.addEventListener('click', tweetQuote);

function insertQuote(data) {
  if (data.quoteText.length > 120) {
    quote.classList.add('long-quote');
  } else {
    quote.classList.remove('long-quote');
  }
  quote.innerText = data.quoteText;

  if (data.quoteAuthor === '') {
    quoteAuthor.innerText = 'Unknown';
  } else {
    quoteAuthor.innerText = data.quoteAuthor;
  }
}

function tweetQuote() {
  const quotet = quote.innerText;
  const author = quoteAuthor.innerText;
  const twiiterUrl = `https://twitter.com/intent/tweet?text=${quotet} - ${author}`;
  window.open(twiiterUrl, '_blank');
}

getQuote();
