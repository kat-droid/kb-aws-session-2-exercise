import './App.css';
import ContactManager from './components/contactManager/ContactManager';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';
import Home from './components/home/Home';
import About from './components/about/About';
import AddContact from './components/addContact/AddContact';
import Favorites from './components/favorites/Favorites';
import Detail from './components/detail/Detail';
import NotFound from './components/notFound/NotFound';

function App() {

  const handleClick = event => {
    let boxes = document.querySelectorAll('.js-nav-item');
    boxes.forEach(box => {
      box.classList.remove('active');
    });
    event.currentTarget.querySelector('.js-nav-item').classList.add('active');
  };

  return (
    <Router>
      <div className="App -sticky-nav">
        <header className="App-header">
          <ul className="App-header__nav-list">
            <li className="App-header__nav-item" onClick={handleClick}>
              <Link className="active js-nav-item" to="/">
                Home
              </Link>
            </li>
            {/* <li className="App-header__nav-item" onClick={handleClick}>
              <Link className="js-nav-item" to="/contact">Contacts</Link>
            </li>
            <li className="App-header__nav-item" onClick={handleClick}>
              <Link className="js-nav-item" to="/addContact">New Contact</Link>
            </li> */}
            <li className="App-header__nav-item" onClick={handleClick}>
              <Link className="js-nav-item" to="/favorites">Favorites</Link>
            </li>
            <li className="App-header__nav-item -right" onClick={handleClick}>
              <Link className="js-nav-item" to="/about">About</Link>
            </li>
          </ul>
        </header>
      </div>

      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route exact path="/addContact" element={<AddContact />}></Route>
        <Route exact path="/contact" element={<ContactManager />}></Route>
        <Route exact path="/favorites" element={<Favorites />}></Route>
        <Route exact path="/about" element={<About />}></Route>
        <Route exact path="/contact/:userId" element={<Detail />}></Route>
        <Route path="/*" element={<NotFound />}></Route>
      </Routes>

      <div className="footer">
        <p className="footer__title">© 2022 KB App</p>
      </div>
    </Router>
  );
}

export default App;
