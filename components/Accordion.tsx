import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Accordion, Card } from "react-bootstrap";

const AccordionItem = ({
  title,
  content,
  index,
}: {
  title: string;
  content: string;
  index: number;
}) => {
  const collapseId = `collapse${index}`;
  return (
    <Card>
      {/* <Accordion.Toggle as={Card.Header} eventKey={collapseId}>
        {title}
      </Accordion.Toggle> */}
      <Accordion.Collapse eventKey={collapseId}>
        <Card.Body>{content}</Card.Body>
      </Accordion.Collapse>
    </Card>
  );
};

const CustomAccordion = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js";
    script.crossOrigin = "anonymous";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <Accordion>
      <AccordionItem
        title="Accordion Item #1"
        content="This is the first item's accordion body. It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the .accordion-body, though the transition does limit overflow."
        index={1}
      />
      <AccordionItem
        title="Accordion Item #2"
        content="This is the second item's accordion body. It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the .accordion-body, though the transition does limit overflow."
        index={2}
      />
      <AccordionItem
        title="Accordion Item #3"
        content="This is the third item's accordion body. It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the .accordion-body, though the transition does limit overflow."
        index={3}
      />
    </Accordion>
  );
};

export default CustomAccordion;
