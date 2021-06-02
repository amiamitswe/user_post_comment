import Posts from '../container/Pages/Post/Post'
import Users from '../container/Pages/Users/Users'
import MyPosts from '../container/Pages/MyPosts/MyPosts'
import PostDetails from '../container/Pages/PostDetails/PostDetails'
import PageNotFound from '../container/Pages/PageNotFound/PageNotFound'

const routes = [
  {
    path: '/allUsers',
    component: Users,
    title: 'All Users'
  },
  {
    path: '/myPosts',
    component: MyPosts,
    title: 'My Posts'
  },
  {
    path: '/post',
    component: Posts,
    title: 'All Posts'
  },
  {
    path: '/postDetails/:postId',
    component: PostDetails,
    title: 'Post Details'
  },
  {
    component: PageNotFound,
    title: 'Page Not Found 😞'
  },
]

export default routes