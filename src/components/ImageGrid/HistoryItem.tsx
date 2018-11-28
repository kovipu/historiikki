import { Card } from '@blueprintjs/core';
import * as React from 'react';

import { getImageURL } from '../../api';
import { MediaItem } from '../../globals';

interface IProps {
  id: string,
  media: MediaItem[]
}

interface IState {
  imageURL: string
}

export default class HistoryItem extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = { imageURL: '' };
  }

  public componentDidMount() {
    const id = this.props.id;
    const filename = this.props.media[0].filename;

    getImageURL(id, filename)
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