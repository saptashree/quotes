import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import classes from "./quotes.module.css";

function Quotation() {
  const [data, setData] = React.useState(null);

  async function updateQuote() {
    try {
      const response = await fetch("https://api.quotable.io/random");
      const { statusCode, statusMessage, ...data } = await response.json();
      if (!response.ok) throw new Error(`${statusCode} ${statusMessage}`);
      setData(data);
    } catch (error) {
      console.error(error);
      setData({ content: "Opps... Something went wrong" });
    }
  }

  React.useEffect(() => {
    updateQuote();
  }, []);

  if (!data) return null;

  return (
    <div className={classes.content}>
      <Card style={{ width: "90%", maxWidth: "40rem" }}>
        <Card.Body>
          <blockquote className="blockquote mb-0">
            <p>{data.content}</p>
            {data.author && (
              <footer className="blockquote-footer">
                <cite title="Source Title">{data.author}</cite>
              </footer>
            )}
          </blockquote>
        </Card.Body>
        <Card.Footer>
          <Button style={{ color: "white" }} onClick={updateQuote}>
            New Quote
          </Button>
        </Card.Footer>
      </Card>
    </div>
  );
}

export default Quotation;
