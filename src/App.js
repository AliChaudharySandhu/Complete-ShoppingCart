import { Provider } from 'react-redux';
import './App.css';
import Footer from './components/Footer';
import { Header } from './components/Header';
import Main from './components/Main';
import store from './store';

function App() {
    return (
        <Provider store={store}> 
            <div className = "App" >
                <Header />
                <Main />
                <Footer />
            </div>
        </Provider>
    );
}

export default App;