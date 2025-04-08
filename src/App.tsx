import './App.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { useEffect } from 'react';
import { useUserStore } from './store/userStore';
import { useNavigate } from 'react-router';
import Spinner from './components/spinner';

function App() {
  const user = useUserStore.getState()
  const navigation = useNavigate()
  const userStoreHydrated = useUserStore.persist.hasHydrated

  useEffect(() => {
    if (!userStoreHydrated) {
      return
    }

    const userExists = typeof user.username !== 'undefined' || typeof user.id !== "undefined"
    const userAuthenticated = userExists && user.username === 'testUser' && user.password === 'pass'

    if (userAuthenticated) {
      navigation("/home")
    } else {
      navigation("/login")
    }

  }, [userStoreHydrated])

  return (
    <Spinner />
  )
}

export default App
