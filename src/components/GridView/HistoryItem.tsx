import * as React from 'react';

import Icon from '@material-ui/core/Icon';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { Theme, createStyles, withStyles } from '@material-ui/core/styles';

import { Item } from '../../@types/globals';
import { getImageURL } from '../../api';

interface Props {
  item: Item,
  classes: {
    buttonbase: string,
    paper: string,
    thumbnail: string,
    icon: string
  }
}

interface State {
  imageURL: string
}

class HistoryItem extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = { imageURL: '' };
  }

  public componentDidMount() {
    const id = this.props.item.id;
    const filename = this.props.item.media[0].filename;
    const isImage = this.props.item.media[0].type === 'image';

    if (isImage) {
      getImageURL(id, filename)
        .then(imageURL => this.setState({ imageURL }))
        .catch(err => console.error(err));
    }
  }

  public render() {
    const { classes, item } = this.props;
    const thumbItem = item.media[0];
    const thumbnail = generateThumbnail(
      thumbItem.type,
      this.state.imageURL,
      thumbItem.filename,
      classes
    );

    return (
      <Paper className={classes.paper} square={true}>
          {thumbnail}
          <Typography
            variant="h6"
            gutterBottom={true}
          >
            {item.name}
          </Typography>
      </Paper>
    );
  }
}

const generateThumbnail = (type: string, imageURL: string, filename: string, classes: any) => {
  switch (type) {
    case 'image':
      return (
        <div
          className={classes.thumbnail}
          style={{
            backgroundImage: `url(${imageURL})`
          }}
        />
      );
    case 'audio':
      return (
        <div className={classes.thumbnail}>
          <Icon className={classes.icon}>audiotrack</Icon>
        </div>
      );
    case 'video':
      return (
        <div
          className={classes.thumbnail}
          style={{
            backgroundImage: `url(https://img.youtube.com/vi/${filename}/0.jpg)`
          }}
        />
      );
    default:
      console.error('Error! Unknown media type:', type);
      return null;
  }
};

const styles = (theme: Theme) => createStyles({
  buttonbase: {
    display: 'block',
    width: '100%'
  },
  paper: {
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  thumbnail: {
    height: 0,
    width: '100%',
    paddingBottom: '100%',
    backgroundColor: theme.palette.primary.light,
    backgroundPosition: '50% 50%',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover'
  },
  icon: {
    paddingTop: '45%',
    fontSize: 42
  }
});


export default withStyles(styles)(HistoryItem);
