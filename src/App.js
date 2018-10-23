import React, { Component } from 'react';
import axios from 'axios';

import QuoteBox from './components/QuoteBox';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      quotes: [],
      themeText: 'Lights off',
    }
  }

  componentDidMount() {
    axios.get('https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json')
      .then(response => this.setState({ quotes: response.data.quotes }))
      .catch(e => console.log(e))
  }

  handleTheme = () => {
    const body = document.querySelector('body');

    if (body.classList.contains('t--light')) {
      body.classList.remove('t--light');
      body.classList.add('t--dark');
      this.setState({ themeText: 'Lights on' });
    } else {
      body.classList.remove('t--dark');
      body.classList.add('t--light');
      this.setState({ themeText: 'Lights off' });
    }
  }

  render() {
    const { quotes, themeText } = this.state
    let QuoteComponent = quotes.length ? (
      <QuoteBox quotes={quotes} />
    ) :
      (
        <div className='loading'>
          Loading quotes...
        </div>
      )
    return (
      <div className='container'>
        <button className='theme-button' onClick={this.handleTheme}>{themeText}</button>
        {QuoteComponent}
      </div>
    );
  }
}

export default App;
