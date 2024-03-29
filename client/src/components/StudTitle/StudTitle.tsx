import React from 'react';

interface StudTitleProps {
  text: string;
}

function StudTitle({ text } : StudTitleProps ) {
  const parts = text.split(/stud/i);
  const styledParts = parts.map((part, index) => {
    if (index < parts.length - 1) {
      return (
        <span key={index} className="font-black text-black uppercase">
          stud
        </span>
      );
    }
    return part;
  });

  return <h1 className="text-xl">{styledParts}</h1>;
};

export default StudTitle;
