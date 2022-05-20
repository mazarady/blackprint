import React, { useState } from "react";
import AccordionItem from "./AccordionItem";

const Accordion = ({ labs }) => {
  const [activeIndex, setActiveIndex] = useState(false);
  const renderedlabs = labs.map((item, index) => {
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
        key={index}
        onClick={() => {
          setActiveIndex(!activeIndex);
        }}
      />
    );
  });

  return (
    <div className="faq__list" style={{ "margin": "20px 0px" }}>
      {renderedlabs}
    </div>
  );
};

export default Accordion;
