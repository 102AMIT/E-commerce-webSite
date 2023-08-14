import React, { useState, useEffect } from "react";

const TypewriterFooter = () => {
  const text = "Created by Amit with ❤️ India !!!";
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentIndex < text.length) {
        setDisplayText(text.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      } else {
        setCurrentIndex(0); // Reset currentIndex to restart the loop
      }
    }, 100); // Adjust the duration between each character reveal here

    return () => clearTimeout(timer);
  }, [currentIndex]);

  return (
      <h3 style={{height:"50px"}}>{displayText}</h3>
  );
};

export default TypewriterFooter;
