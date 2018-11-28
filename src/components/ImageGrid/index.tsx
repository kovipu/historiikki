import * as React from 'react';

import { getItems } from '../../api';
import { Item } from '../../globals';
import HistoryItem from './HistoryItem';

interface IState {
  isLoading: boolean,
  items: Item[]
}

class ImageGrid extends React.Component<{}, IState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      isLoading: false,
      items: []
    };
  }

  public componentDidMount() {
    getItems()
      .then(items => this.setState({ items }))
      .catch(err => console.error(err));
  }

  public render() {
    return (
      this.state.isLoading
        ? 'Ladataan...'
        : this.state.items.map((item: Item) => (
          <HistoryItem
            key={item.id}
            id={item.id}
            media={item.media}
          />
        ))
    );
  }
}
export default ImageGrid;