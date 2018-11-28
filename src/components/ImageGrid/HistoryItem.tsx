import { Card } from '@blueprintjs/core';
import * as React from 'react';

import { storage } from '../../firebase';

interface IProps {
  id: string,
  media: any[]
}

interface IState {
  imageURL: string
}

export default class HistoryItem extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = { imageURL: '' };

    const id = this.props.id;
    const filename = this.props.media[0].filename;

    storage.ref(`images/${id}/${filename}`)
      .getDownloadURL()
      .then(imageURL => this.setState({ imageURL }))
      .catch(err => console.error(err));
  }

  public render() {
    return (
      <Card>
        <img src={this.state.imageURL}/>
      </Card>
    );
  }
}