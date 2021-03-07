import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Button from '@material-ui/core/Button';
import Amplify, { API, graphqlOperation } from 'aws-amplify';
import { createPost, updatePost, deletePost } from '../graphql/mutations';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

export default function CreatePost({
  doPost=()=>{}
}) {
  const classes = useStyles();
  const [title, setTitle] = React.useState('');
  const [body,setBody] = React.useState('');
  const [err,setErr] = React.useState('');

  React.useEffect(()=>{
    if(title || body){
      setErr('')
    }
  },[title,body])

  const handleSubmit = async (event) => {
    event.preventDefault();
    if(!title){
      setErr('POST TITLE IS REQUIRED');
      return;
    }else if(!body){
      setErr('POST BODY IS REQUIRED');
    }
    const post = {
        title, 
        body
    };
    await API.graphql(graphqlOperation(createPost, {input: post}));
    setErr('POST SUBMITTED')
    window.location.reload();
    doPost();
  }

  return (
    <form onSubmit={handleSubmit} className={classes.root} noValidate autoComplete="off">
      <TextField id="outlined-basic" label="Post Title" variant="outlined" value={title} onChange={(e)=>setTitle(e.target.value)} />
      <TextareaAutosize aria-label="minimum height" rowsMin={3} placeholder="Write the body of post here" value={body} onChange={(e)=>setBody(e.target.value)} required/>
      <div>{err}</div>
      <Button variant="contained" color="primary" type="submit">
        Submit
      </Button>
    </form>
  );
}