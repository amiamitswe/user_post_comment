import { Redirect, Route, Switch } from 'react-router'
import Header from './Header/Header'
import Sidebar from './SideBar/SideBar'
import Footer from './Footer/Footer'
import routes from '../../Routes/Routes'
import classes from './Layout.module.css'

const Layout = () => {
  const RenderRoute = route => {
    document.title = route.title || 'User Post Comment App'
    return (
      <Route path={route.path} component={route.component} exact />
    )
  }

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

                    {routes.map((route, index) => (
                      <RenderRoute key={index} {...route} />
                    ))}
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
