import React, { Component } from 'react'
import _ from 'lodash';

import QuoteText from './QuoteText';
import QuoteAuthor from './QuoteAuthor';

export default class QuoteBox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      quoteSelected: {},
      typingDone: true,
      colors: [
        'light-greenish-blue',
        'mint-leaf',
        'faded-poster',
        'robin-egg-blue',
        'green-darner-tail',
        'electron-blue',
        'shy-moment',
        'exodus-fruit',
        'bright-yarrow',
        'first-date',
        'orangeville',
        'pink-glamour',
        'chi-gong',
        'pico-ottopink',
        'prunus-avium',
        'american-river',
        'soothing-breeze',
      ],
      colorSelected: ''
    }
  }

  componentDidMount() {
    const quoteSelected = _.sample(this.props.quotes);
    const colorSelected = _.sample(this.state.colors);
    const body = document.querySelector('body');
    body.classList.add(colorSelected + '-bg');
    this.setState({ quoteSelected, colorSelected });
  }

  newQuote = () => {
    const quoteSelected = _.sample(this.props.quotes.filter(quote => quote.quote !== this.state.quoteSelected.quote));
    const colorSelected = _.sample(this.state.colors.filter(color => color !== this.state.colorSelected));
    const body = document.querySelector('body');
    body.classList.remove(this.state.colorSelected + '-bg');
    body.classList.add(colorSelected + '-bg');
    this.setState({ quoteSelected, colorSelected });
  }


  render() {
    const { quote, author } = this.state.quoteSelected;
    const { colorSelected } = this.state;
    return (
      <div id='quote-box'>

        <QuoteText quote={quote} color={colorSelected} />

        <QuoteAuthor author={author} color={colorSelected} />
        <button className={`${colorSelected} ${colorSelected}-border`} id='new-quote' onClick={this.newQuote}>New Quote</button>
      </div>
    )
  }
}
