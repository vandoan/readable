import React, { Component } from 'react'
import { Switch, Route } from  'react-router-dom'
import CommentForm from './CommentForm'
import Header from '../components/Header'
import PostsList from './PostsList'
import Post from './Post'
import PostForm from './PostForm'



class App extends Component {

  render() {
    return (
      <div className="App mb-60">
        <Header />
        <div className="container">
          <Switch>
            <Route exact path='/' component={ PostsList } />
            <Route exact path='/edit-post/:category' component={ PostForm } />
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