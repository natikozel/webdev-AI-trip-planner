import './App.css';
import {Provider} from "react-redux";
import store from './store/store'
import TripForm from './components/TripForm'
import TripDisplay from './components/TripDisplay'

function App() {
    return (
        <Provider store={store}>
            <TripForm/>
            <TripDisplay/>
        </Provider>
    );
}

export default App;
