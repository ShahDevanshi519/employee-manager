import {BrowserRouter as Router,Routes,Route,Link} from 'react-router-dom';
import Add from './Add';
import Display from './Display';
import Update from './Update';
function App(){
  return(<>
  <h1>Hello From Frontend!</h1>
  <Router>
    <Link to="/add">Add</Link> |
    <Link to="/display">Display</Link> 
    <Routes>
      <Route path="/" element={<Add/>}></Route>
      <Route path="/add" element={<Add/>}></Route>
      <Route path="/display" element={<Display/>}></Route>
      <Route path="/update/:id" element={<Update/>}></Route>
    </Routes>
  </Router>
  </>)
}

export default App