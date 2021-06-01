import React from 'react'
import { Redirect, Route, Switch } from 'react-router'
import Header from './Header/Header'
import Sidebar from './SideBar/SideBar'
import Home from '../Home/Home'
import Post from '../Post/Post'
import Comment from '../Comment/Comment'
import Footer from '../../Component/Footer/Footer'
import classes from './Layout.module.css'
// import User from '../User/User'
import MyPosts from '../MyPosts/MyPosts'

const Layout = () => {
  return (
    <>
      <Header />
      <Sidebar />
      <div className={classes.LayoutContainer}>
        <div className={classes.LayoutMain}>
          <div className="container-fluid p-3">
            <div className="row">
              <div className="col-12">
                <div className="form__wrapper p-3">


                  <Switch>
                    <Redirect exact from="/" to="/home" />
                    <Route path="/locale/:localeId" exact>
                      <h1>Hello</h1>
                    </Route>
                    <Route path="/comments">
                      <Comment />
                    </Route>
                    <Route path="/home">
                      <Home />
                    </Route>
                    <Route path="/post">
                      <Post />
                    </Route>
                    <Route path="/myPosts">
                      <MyPosts />
                    </Route>
                  </Switch>


                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer title="User Post Comment" version="1.0.0" />
      </div>
    </>
  )
}

export default Layout
