
import './App.css';
import { Provider } from 'react-redux';
import store from './componanuts/store';
import Todo from './componanuts/Todo';

function App() {
  return (
     <div>
       <Provider store={store}>
         <Todo />
       </Provider> 
    </div>
  ); 
}

export default App;

