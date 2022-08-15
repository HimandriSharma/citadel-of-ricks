import { Provider } from 'react-redux';
import './App.css';
import Character from './Character';
import store from './redux/store';

function App() {
  return (
    <Provider store={store}>
    <div className="App">
      <Character/>
    </div>
    </Provider>
  );
}

export default App;
