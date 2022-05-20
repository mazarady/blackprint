import React, { useState } from "react";
import AccordionItem from "./AccordionItem";

const Accordion = ({ labs }) => {
  const renderedlabs = labs.map((item, index) => {
    const [activeIndex, setActiveIndex] = useState(false);
    const showDescription = activeIndex ? "show-description" : "";
    const fontWeightBold = activeIndex ? "font-weight-bold" : "";
    const ariaExpanded = activeIndex;
    return (
      <AccordionItem
        showDescription={showDescription}
        fontWeightBold={fontWeightBold}
        ariaExpanded={ariaExpanded}
        item={item}
        index={index}
        onClick={() => {
          setActiveIndex(!activeIndex);
        }}
      />
    );
  });

  return (
    <div className="faq__list" style={{ "margin-top": "20px" }}>
      {renderedlabs}
    </div>
  );
};

export default Accordion;