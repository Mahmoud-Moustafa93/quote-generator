const apiUrl: string =
  "https://jacintodesign.github.io/quotes-api/data/quotes.json";
const quoteContainer = document.getElementById(
  "quote-container"
)! as HTMLDivElement;
const quoteElement = document.getElementById("quote")! as HTMLSpanElement;
const authorElement = document.getElementById("author")! as HTMLSpanElement;
const twitterBtn = document.getElementById("twitter")! as HTMLButtonElement;
const quoteBtn = document.getElementById("new-quote")! as HTMLButtonElement;
const loader = document.getElementById("loader")! as HTMLDivElement;

const showLoader = function () {
  loader.hidden = false;
  quoteContainer.hidden = true;
};

const hideLoader = function () {
  loader.hidden = true;
  quoteContainer.hidden = false;
};

// Defining a Quote interface
interface Quote {
  text: string;
  tag?: string;
  author: string;
}

// Function to get a random quote from the API
const getQuote = async (): Promise<Quote> => {
  try {
    showLoader();

    // Fetch the data from the API and get the response as a JSON output
    const resp: Response = await fetch(apiUrl);

    // Taking the resulted JSON and parsing it to produce a JavaScript object.
    const data = await resp.json();

    // Get a random quote from the data
    const { text, author } = data[Math.floor(Math.random() * data.length)];

    // Check Quote length to determine styling
    text.length > 120
      ? quoteElement.classList.add("quote-text--long")
      : quoteElement.classList.remove("long-quote--long");

    quoteElement.textContent = text;
    authorElement.textContent = author;

    return { text, author };
  } catch (err: any) {
    quoteElement.textContent =
      "Oops! An error occurred while generating the Quote. Please try again!";
    throw err;
  } finally {
    hideLoader();
  }
};
getQuote();

// Function to tweet the quote on Twitter
const tweetQuote = function () {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteElement.textContent} - ${authorElement.textContent}`;
  window.open(twitterUrl, "_blank");
};

// Add an event listener to the buttons to call the getQuote or tweetQuote functions when clicked
quoteBtn.addEventListener("click", getQuote);
twitterBtn.addEventListener("click", tweetQuote);
