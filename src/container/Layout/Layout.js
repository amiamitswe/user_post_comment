import React from 'react'
import { Redirect, Route, Switch } from 'react-router'
import Header from './Header/Header'
import Sidebar from './SideBar/SideBar'
import Footer from './Footer/Footer'
import PageNotFound from '../Pages/PageNotFound/PageNotFound'
import Post from '../Pages/Post/Post'
import MyPosts from '../Pages/MyPosts/MyPosts'
import PostDetails from '../Pages/PostDetails/PostDetails'
import Users from '../Pages/Users/Users'
import classes from './Layout.module.css'

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
                    <Redirect exact from="/" to="/post" />
                    <Route path="/postDetails/:postId" exact>
                      <PostDetails />
                    </Route>
                    <Route path="/post">
                      <Post />
                    </Route>
                    <Route path="/myPosts">
                      <MyPosts />
                    </Route>
                    <Route path="/allUsers">
                      <Users />
                    </Route>
                    <Route>
                      <PageNotFound />
                    </Route>
                  </Switch>


                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer title="User Post Comment By Amit" version="1.0.0" />
      </div>
    </>
  )
}

export default Layout
