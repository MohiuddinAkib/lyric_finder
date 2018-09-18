import React, { Component } from 'react';
import './App.css';
import Navbar from './components/layout/Navbar';
import Index from './components/layout/Index';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from './context';
import Lyrics from './components/tracks/Lyrics';

class App extends Component {
  state = {
    isFixed: false
  };

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = () => {
    if (window.scrollY > 200) {
      this.setState({
        isFixed: true
      });
    } else if (window.scrollY < 100) {
      this.setState({
        isFixed: false
      });
    }
  };

  render() {
    return (
      <Provider>
        <Router basename={process.env.PUBLIC_URL}>
          <React.Fragment>
            <Navbar isFixed={this.state.isFixed} />
            <div className="container">
              <Switch>
                <Route exact path="/" component={Index} />
                <Route path="/lyrics/track/:id" component={Lyrics} />
              </Switch>
            </div>
          </React.Fragment>
        </Router>
      </Provider>
    );
  }
}

export default App;
