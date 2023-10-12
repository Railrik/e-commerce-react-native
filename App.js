import { StyleSheet, Text, View } from 'react-native'
import { Provider } from 'react-redux'
import store from './redux/store'
import Landing from './screens/Landing'

const App = () => {
  return (
    <Provider store={store}>
      <Landing />
    </Provider>
  )
}

export default App

const styles = StyleSheet.create({})