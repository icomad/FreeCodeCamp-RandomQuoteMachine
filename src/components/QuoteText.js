import React from 'react';

const QuoteText = ({ quote, color }) => {
  return (
    <div id='text' className={color}>
      {quote}
    </div>
  )
}

export default QuoteText;