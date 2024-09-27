import React, { useState } from "react";

const Quotes = () => {
  const [quote, setQuote] = useState();

  return (
    <div>
      <Container className="QuotesContainer border shadow rounded-3">
        //{" "}
        <Container className="AlertAnimatio p-2 fw-600">
          // {q.quote}
          //{" "}
        </Container>
        //{" "}
        <p className="AlertAutor fw-bolder">
          // -{"  "}
          // {q.author}
          //{" "}
        </p>
        //{" "}
      </Container>
    </div>
  );
};

export default Quotes;
