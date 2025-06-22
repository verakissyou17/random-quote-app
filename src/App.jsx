import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuoteLeft } from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";

function App() {
  const [quote, setQuote] = useState(
    "The only way to do great work is to love what you do."
  );
  const [author, setAuthor] = useState("Steve Jobs");

  const getNewQuote = async () => {
    const response = await fetch(
      "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json",
      {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      }
    );
    const jsonQuoteData = await response.json();
    const ri = Math.floor(Math.random() * jsonQuoteData.quotes.length);

    setQuote(jsonQuoteData.quotes[ri].quote);
    setAuthor(jsonQuoteData.quotes[ri].author);
  };

  const pageUrl = encodeURIComponent(window.location.href);
  const shareText = encodeURIComponent(`"${quote}" - ${author}`);
  const whatsappShareUrl = `https://wa.me/?text=${shareText}%20${pageUrl}`;

  return (
    <>
      <div className="wrapper">
        <div className="quote-box">
          <div className="quote-text">
            <FontAwesomeIcon icon={faQuoteLeft} />
            <span className="text">{quote}</span>
          </div>
          <div className="quote-author">
            - <span className="author">{author}</span>
          </div>
          <div className="buttons">
            <a
              className="button"
              href={whatsappShareUrl}
              target="_blank"
              rel="noreferrer"
              aria-label="Share on WhatsApp"
            >
              <FontAwesomeIcon icon={faWhatsapp} />
            </a>
            <button
              className="new-quote button"
              onClick={getNewQuote}
              aria-label="Get new quote"
            >
              New Quote
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
