import * as React from 'react';

import TextField from '@material-ui/core/TextField';
import { Theme, createStyles, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';

import { MediaItem } from '../../@types/globals';

import { newMediaItem, uploadFile } from '../../api';

interface Props {
  itemId: string,
  updateItems: () => void,
  classes: {
    mediumForm: string,
    textField: string,
    newMediumActions: string,
    rightIcon: string
  }
}

interface State {
  type: 'image' | 'audio' | 'video',
  name: string,
  date: any,
  videoId: string,
  file: File | null
}

class AddNewMedium extends React.Component<Props, State> {
  public state: State = {
    type: 'image',
    name: '',
    date: null,
    videoId: '',
    file: null
  };

  public render () {
    return (
      <FormControl className={this.props.classes.mediumForm}>
        <RadioGroup
          value={this.state.type}
          onChange={this.handleTypeChange}
        >
          <FormLabel component="legend">Mediatyyppi</FormLabel>
          <FormControlLabel
            control={<Radio/>}
            label={'Kuva'}
            value={'image'}/>
          <FormControlLabel
            control={<Radio/>}
            label={'Audio'}
            value={'audio'}/>
          <FormControlLabel
            control={<Radio/>}
            label={'Video'}
            value={'video'}/>
        </RadioGroup>

        <TextField
          label="Nimi"
          onChange={this.handleNameChange}
          required={true}
          className={this.props.classes.textField}
        />

        <TextField
          label="Aikaleima"
          type="date"
          onChange={this.handleDateChange}
          className={this.props.classes.textField}
          InputLabelProps={{
            shrink: true
          }}/>

        <div className={this.props.classes.newMediumActions}>
          {
            this.state.type === 'video'
              ? (
                <TextField
                  label="Video ID"
                  required={true}
                  onChange={this.handleVideoIdChange}
                />
              ) : (
                <>
                  <input
                    accept={this.state.type === 'image' ? "image/*" : "audio/*"}
                    style={{display: 'none'}}
                    id="raised-button-file"
                    type="file"
                    onChange={this.handleFileChange}
                  />
                  <label htmlFor="raised-button-file">
                    <Button component="span" variant="contained">
                      Tiedosto <Icon className={this.props.classes.rightIcon}>attach_file</Icon>
                    </Button>
                  </label>
                  {
                    this.state.file && (
                      <Typography variant="subtitle1">
                        <Icon>insert_drive_file</Icon>{this.state.file.name}
                      </Typography>
                    )
                  }
                </>
              )
          }

          <Button
            variant="contained"
            color="primary"
            disabled={this.validateSubmit()}
            onClick={this.handleSubmit}
          >
            Tallenna <Icon className={this.props.classes.rightIcon}>cloud_upload</Icon>
          </Button>
        </div>
      </FormControl>
    );
  }

  private handleTypeChange = (event: any) =>
    this.setState({ type: event.target.value });

  private handleNameChange = (event: any) =>
    this.setState({ name: event.target.value });

  private handleDateChange = (event: any) =>
    this.setState({ date: event.target.value });

  private handleVideoIdChange = (event: any) =>
    this.setState({ videoId: event.target.value });

  private handleFileChange = (event: any) =>
    this.setState({ file: event.target.files[0] });

  private validateSubmit = () => {
    const { name, date, type, videoId, file } = this.state;

    return name === ''
      || !date
      || (type === 'video' && videoId === '')
      || ((type === 'image' || type === 'audio') && file === null)
  };

  private handleSubmit = (event: any) => {
    event.preventDefault();

    const mediaItem: MediaItem = {
      name: this.state.name,
      filename: this.state.file!!.name,
      date: this.state.date,
      type: this.state.type
    };

    if (this.state.type === 'image' || this.state.type === 'audio') {
      uploadFile(this.props.itemId, this.state.type, this.state.file!!)
        .then(res => console.log("File uploaded successfully!", res))
        .catch(err => console.error(err));
    }

    newMediaItem(this.props.itemId, mediaItem)
      .then(res => this.props.updateItems())
      .catch(err => console.error(err));
  }
}

const styles = (theme: Theme) => createStyles({
  mediumForm: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing.unit
  },
  textField: {
    marginTop: theme.spacing.unit
  },
  newMediumActions: {
    marginTop: theme.spacing.unit,
    height: 48,
    display: 'inline-flex',
    justifyContent: 'space-between'
  },
  rightIcon: {
    marginLeft: theme.spacing.unit
  }
});

export default withStyles(styles)(AddNewMedium);
