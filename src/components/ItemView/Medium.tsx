import * as React from 'react';

import { Theme, createStyles, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

import { MediaItem } from '../../@types/globals';
import { getImageURL, getAudioURL } from '../../api';

interface Props {
  itemId: string,
  mediaItem: MediaItem,
  classes: {
    medium: string,
    metadata: string,
    imageWrapper: string,
    image: string,
    video: string,
    audio: string,
    aspectratio: string
  }
}

interface State {
  isLoading: boolean,
  address: string
}

class Medium extends React.Component<Props, State> {
  public state: State = {
    isLoading: false,
    address: ''
  };

  public componentDidMount() {
    const { itemId } = this.props;
    const { type, filename } = this.props.mediaItem;
    const setAddress = (address: string) => this.setState({ address });
    switch (type) {
      case 'image':
        getImageURL(itemId, filename)
          .then(setAddress);
        break;
      case 'audio':
        getAudioURL(itemId, filename)
          .then(setAddress);
        break;
      case 'video':
        const address = `https://www.youtube.com/embed/${filename}`;
        this.setState({ address });
    }
  }

  public render() {

    const embeddedMedia = EmbeddedMedia(
      this.props.mediaItem.type,
      this.state.address,
      this.props.classes
    );

    return (
      <Paper className={this.props.classes.medium}>
        {embeddedMedia}
        <div className={this.props.classes.metadata}>
          <Typography variant="h6">
            {this.props.mediaItem.name}
          </Typography>
        </div>
      </Paper>
    )
  }
}

const EmbeddedMedia = (type: 'image' | 'audio' | 'video', address: string, classes: any) => {
  switch (type) {
    case 'image':
      return (
        address === ''
          ? 'Ladataan...'
          : (
            <div className={classes.imageWrapper}>
              <img
                alt="embedded image"
                src={address}
                className={classes.image}
              />
            </div>
          )
      );
    case 'audio':
      return (
        address === ''
          ? 'Ladataan...'
          : (
            <div className={classes.audio}>
              <audio controls={true}>
                <source src={address} type="audio/ogg" />
                Your browser does not support the audio element.
              </audio>
            </div>
          )
      );
    case 'video':
      return (
        <div className={classes.aspectratio}>
          <iframe
            className={classes.video}
            src={address}
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen={true}
          />
        </div>
      );
  }
};

const styles = (theme: Theme) => createStyles({
  medium: {
    textAlign: 'left',
  },
  metadata: {
    padding: theme.spacing.unit
  },
  imageWrapper: {
    textAlign: 'center',
    backGroundColo: 'grey'
  },
  image: {
    maxWidth: '100%'
  },
  video: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    left: 0,
    top: 0
  },
  audio: {
    textAlign: 'center'
  },
  aspectratio: {
    position: 'relative',
    width: '100%',
    height: 0,
    paddingBottom: '51%'
  }
});

export default withStyles(styles)(Medium);
