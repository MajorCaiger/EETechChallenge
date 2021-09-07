import Header from './component/Header/';
import ConnectedList from './component/List/ConnectedList';
import ConnectedNewItem from './component/NewItem/ConnectedNewItem';

const App = () => {
    return (
        <div>
            <Header />
            <div className="container">
                <ConnectedNewItem />
                <ConnectedList />
            </div>
        </div>
    );
};

export default App;
