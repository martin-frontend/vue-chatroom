import router from './router'
import store from './store'

router.beforeEach(async(to, from, next) => {
  const name = store.state.name
  if (!name) {
    if (to.path === '/chatroom') {
      next({ path: '/' })
    } else {
      next()
    }
  } else {
    next()
  }
})
