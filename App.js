import 'react-native-gesture-handler';

import { Provider } from 'react-redux'
import store from './redux/store'
import AppNav from './routes/AppNav';

const App = () => {
  return (
    <Provider store={store}>
      <AppNav />
    </Provider>
  )
}

export default App

