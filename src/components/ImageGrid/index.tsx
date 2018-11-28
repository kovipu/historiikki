import * as React from 'react';

import { db } from '../../firebase';
import HistoryItem from './HistoryItem';

interface IState {
  isLoading: boolean,
  items: any[]
}

class ImageGrid extends React.Component<{}, IState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      isLoading: false,
      items: []
    };

    db.collection('items').get()
      .then(snapshot => {
        const items: object[] = [];
        snapshot.forEach(doc => {
          items.push({ id: doc.id, ...doc.data() })
        });

        this.setState({ isLoading: false, items });
      })
      .catch(err => console.error(err));
  }

  public render() {
    return (
      this.state.isLoading
        ? 'Ladataan...'
        : this.state.items.map((item: any) => (
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