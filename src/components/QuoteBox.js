import React, { Component } from 'react'
import _ from 'lodash';
import { CSSTransition } from 'react-transition-group';

import QuoteText from './QuoteText';
import QuoteAuthor from './QuoteAuthor';

export default class QuoteBox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      quoteSelected: {},
      anim: false,
      colors: [
        'red-mat',
        'blue-mat',
        'pink-mat',
        'amber-mat',
        'green-mat',
      ],
      colorSelected: null,
    }
  }

  componentDidMount() {
    const quoteSelected = _.sample(this.props.quotes);
    const colorSelected = _.sample(this.state.colors);
    this.setState({ quoteSelected, anim: true, colorSelected });
  }

  newQuote = (e) => {
    e.preventDefault();
    this.setState({ anim: false });
    setTimeout(() => {
      const quoteSelected = _.sample(this.props.quotes.filter(quote => quote.quote !== this.state.quoteSelected.quote));
      const colorSelected = _.sample(this.state.colors.filter(color => color !== this.state.colorSelected));
      this.setState({ quoteSelected, anim: true, colorSelected });
    }, 500);

  }

  tweetQuote = (e) => {
    e.preventDefault();
    const { quote, author } = this.state.quoteSelected;
    const base_url = `${e.target.href}?text=${encodeURIComponent(`"${quote}" ~${author}`)}`
    window.open(base_url, 'Share', 'width=550, height=400, toolbar=0, scrollbars=1 ,location=0 ,statusbar=0,menubar=0, resizable=0');
  }


  render() {
    const { quote, author } = this.state.quoteSelected;
    const { anim, colorSelected } = this.state;
    return (
      <div id='quote-box'>
        <CSSTransition
          in={anim}
          classNames='fade'
          timeout={500}
          unmountOnExit
          mountOnEnter
        >
          <div className='quote-container'>
            <QuoteText quote={quote} color={colorSelected} />
            <QuoteAuthor author={author} color={colorSelected} />
          </div>
        </CSSTransition>
        <a className={colorSelected} href='#' id='new-quote' onClick={this.newQuote}>New Quote</a>
        <div className={'line-separator ' + colorSelected + '-grad'}></div>
        <a className={colorSelected} href='https://twitter.com/intent/tweet' id='tweet-quote' onClick={this.tweetQuote}>Tweet Me</a>
      </div>
    )
  }
}
