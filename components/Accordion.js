import React, { useState } from "react";
import AccordionItem from "./AccordionItem";

const Accordion = ({ labs }) => {
  const labsToggle = {};
  for (let i = 0; i < labs.length; i++) {
    labsToggle[i] = false;
  }
  const [activeIndex, setActiveIndex] = useState(labsToggle);

  const renderedlabs = labs.map((item, index) => {
    const showDescription = activeIndex[index] ? "show-description" : "";
    const fontWeightBold = activeIndex[index] ? "font-weight-bold" : "";
    const ariaExpanded = activeIndex[index];
    return (
      <AccordionItem
        showDescription={showDescription}
        fontWeightBold={fontWeightBold}
        ariaExpanded={ariaExpanded}
        item={item}
        index={index}
        key={index}
        onClick={(index) => {
          setActiveIndex({ ...activeIndex, [index]: !activeIndex[index] });
        }}
      />
    );
  });

  return (
    <div className="faq__list" style={{ margin: "20px 0px" }}>
      {renderedlabs}
    </div>
  );
};

export default Accordion;
