import React, { useState} from 'react';
import UserTable  from './components/UserTable';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form'
import './css/style.css';

const App: React.FC = () => {
  const [show, setShow] = useState<boolean>(false);
  const handleClose= () =>setShow(false);
  const handleShow = () => setShow(true);

  

  return (
    <div className="App">
      <h1>People</h1>
      <hr />
      <div className='employe-options d-flex'>

        <Form.Select className='select w-25' id="Select">
          <option value="all" >Employee Types</option>
          <option value="fullTime" >Full Time</option>
          <option value="partTime" >Part Time</option>
          <option value="contractBasis" >Contract Basis</option>
          <option value="other" >Other</option>
        </Form.Select>

        <button className='btn btn-primary btn-add ' onClick={handleShow} >Add People</button>
      </div>
      <UserTable show={show} setShow={setShow} handleClose={handleClose} handleShow={handleShow}/>
    </div>
  );
}

export default App;
