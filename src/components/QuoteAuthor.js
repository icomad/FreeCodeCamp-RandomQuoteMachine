import React from 'react';

const QuoteAuthor = ({ author, color }) => {
  return (
    <div id='author' className={color}>
      {'~ ' + author}
    </div>
  )
}

export default QuoteAuthor
