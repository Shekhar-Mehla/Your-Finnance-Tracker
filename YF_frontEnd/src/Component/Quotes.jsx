import React, { useState } from "react";
import { useEffect, useContext } from "react";
import { CentralState } from "../context/ContextApi";
import { Container } from "react-bootstrap";

const Quotes = () => {
  const { expenseTrackingQuotes } = useContext(CentralState);
  const [quote, setQuote] = useState(expenseTrackingQuotes[0]);

  useEffect(() => {
    const random = Math.floor(Math.random() * expenseTrackingQuotes.length);
    setTimeout(() => {
      setQuote(expenseTrackingQuotes[random]);
    }, 5000);
  }, [quote]);
  return (
    <div>
      <Container className="QuotesContainer AlertAnimatio  shadow rounded-3">
        {" "}
        <Container className="d-flex flex-wrap p-2 fw-600">
          {quote.quote}
          <p className="AlertAutor fw-bolder">
            -{"  "}
            {quote.author}
          </p>{" "}
        </Container>{" "}
      </Container>
    </div>
  );
};

export default Quotes;
