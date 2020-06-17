import HomePage from './pages/HomePage'
import UsersListPage, { loadData } from './pages/UsersList'

export default [
  {
    path: '/',
    component: HomePage,
    exact: true,
  },
  {
    loadData,
    path: '/users',
    component: UsersListPage,
  },
]
