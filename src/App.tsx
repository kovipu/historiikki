import * as React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import GridView from './components/GridView';
import ItemView from './components/ItemView';
import { getItems } from './api';
import { Item } from './@types/globals';

interface State {
  isLoading: boolean,
  items: Item[],
}

class App extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      isLoading: false,
      items: [],
    }
  }
  public componentDidMount() {
    this.updateItems();
  }

  public render() {
    const { isLoading, items } = this.state;

    return (
      <Router>
        {isLoading
          ? 'Ladataan...'
          : (
            <>
              <Route exact={true} path="/" render={() => (
                <GridView items={items}/>
              )}/>
              <Route path="/h/:itemId" render={({ match }) => (
                <ItemView
                  item={items.find((i: Item) => i.id === match.params.itemId)}
                  updateItems={this.updateItems}
                />
              )}/>
            </>
          )
        }
      </Router>
    );
  }

  private updateItems = () =>
    getItems()
      .then(items => this.setState({ items }))
      .catch(err => console.error(err));
}

export default App;
