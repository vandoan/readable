import React, { Component } from 'react'
import { getCategories, getPosts, getPostsByCategories } from '../api'
import { Switch, Route, withRouter } from  'react-router-dom'
import CommentForm from './CommentForm'
import Header from '../components/Header'
import PostsList from './PostsList'
import Post from './Post'
import PostForm from './PostForm'



class App extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="App">
        <Header />
        <div className="container">
          <Switch>
            <Route exact path='/' component={ PostsList } />
            <Route exact path='/edit-post' component={ PostForm } />
            <Route exact path='/edit-comment/:category' component={ CommentForm } />
            <Route exact path='/new-comment/:category' component={ CommentForm } />
            <Route exact path='/new-post' component={ PostForm } />
            <Route exact path='/:category' component={ PostsList } />
            <Route exact path='/:category/:id' component={ Post } />
          </Switch>
        </div>
      </div>
    );
  }
}



export default App;
