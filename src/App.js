import React, { Component } from 'react';
import Amplify, { API, graphqlOperation } from 'aws-amplify';
import awsconfig from './aws-exports';
import { AmplifySignOut, withAuthenticator } from '@aws-amplify/ui-react';
import CreatePost from './component/CreatePost';
import DataTable from './component/DataTable';
import './App.css';

Amplify.configure(awsconfig);

const query = `
query {
  listPosts {
    items {
      id title body createdAt 
    }
  }
}`

function App() {
  const [posts,setPosts] = React.useState([]);
  let rows = [];

  React.useEffect(async()=>{
    const data = await API.graphql(graphqlOperation(query));
    setPosts(data.data.listPosts.items);
  },[]);

  posts.map((post,index) => {
    rows.push([
      post.title,
      post.body,
      post.createdAt
    ]);
  });

  return (
    <div className="App">
      <CreatePost/>
      <div style={{width:50}}>
        <AmplifySignOut/>
      </div>
      <DataTable rows={rows}/>
    </div>
  );
  }

export default withAuthenticator(App);