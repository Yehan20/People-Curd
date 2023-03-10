import React, { useState} from 'react';
import UserTable  from './components/UserTable';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form'
import './css/style.css';

const App: React.FC = () => {
  const [show, setShow] = useState<boolean>(false);

  const [category,setCategory]=useState("All")

  const handleClose= () =>setShow(false);
  const handleShow = () => setShow(true);
  

   
  

  return (
    <div className="App">
      <h1>People</h1>
      <hr />
      <div className='employe-options gap-3 d-flex justify-content-end'>

        <Form.Select onChange={(e)=>setCategory(e.target.value)} className='select w-25' id="Select">
          <option value="All" >Employee Types</option>
          <option value="Full Time" >Full Time</option>
          <option value="Part Time" >Part Time</option>
          <option value="Contract Basis" >Contract Basis</option>
          <option value="Other" >Other</option>
        </Form.Select>

        <button className='btn btn-primary btn-add ' onClick={handleShow} >Add People</button>
      </div>
      <UserTable category={category} show={show} setShow={setShow} handleClose={handleClose} handleShow={handleShow}/>
    </div>
  );
}

export default App;
