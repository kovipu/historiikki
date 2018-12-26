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
import {Icon} from "@material-ui/core";
import {MediaItem} from "../../@types/globals";

import { newMediaItem, uploadFile } from '../../api';

interface Props {
  itemId: string,
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
  videoId: string
}

class AddNewMedium extends React.Component<Props, State> {
  public state: State = {
    type: 'image',
    name: '',
    date: null,
    videoId: ''
  };

  private fileInput = React.createRef<HTMLInputElement>();

  public render () {
    console.log(this.fileInput.current && this.fileInput.current.files)
    return (
      <FormControl className={this.props.classes.mediumForm}>
        <Typography variant="h5">Uusi liite</Typography>
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
                    ref={this.fileInput}
                  />
                  <label htmlFor="raised-button-file">
                    <Button component="span">
                      Tiedosto <Icon className={this.props.classes.rightIcon}>attach_file</Icon>
                    </Button>
                  </label>
                </>
              )
          }

          <Button
            variant="raised"
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

  private validateSubmit = () =>
    this.state.name === ''
    || !this.state.date
    || (this.state.type === 'video' && this.state.videoId === '');
 //   || !!(this.fileInput.current && this.fileInput.current.files && this.fileInput.current.files.length === 0)

  private handleSubmit = (event: any) => {
    event.preventDefault();

    const mediaItem: MediaItem = {
      name: this.state.name,
      filename: this.fileInput.current!!.files!![0].name,
      date: this.state.date,
      type: this.state.type
    };

    if (this.state.type === 'image' || this.state.type === 'audio') {
      uploadFile(this.props.itemId, this.state.type, this.fileInput.current!!.files!![0])
        .then(res => console.log("File uploaded successfully!", res))
        .catch(err => console.error(err));
    }

    newMediaItem(this.props.itemId, mediaItem)
      .then(res => console.log('Media added successfully!', res))
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
