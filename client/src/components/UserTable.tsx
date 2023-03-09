import Axios from 'axios';
import React ,{useState,useEffect,useCallback} from 'react'
import SingleTableRow  from './SingleTableRow'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal'
import DeleteModal from './deleteModal';
import UpdateModal from './updateModal';

type ModalType={
  show:boolean,
  setShow: React.Dispatch<React.SetStateAction<boolean>>,
  handleClose:()=>void
  handleShow: ()=>void
  
}

type PersonData={
  name:string;
  emp__id:string;
  exp:number;
  _id:string;
  designation:string;
  _v:number;
  type:string;
}
 
  const UserTable:React.FC<ModalType> = ({show,setShow,handleClose,handleShow}) => {
     
    const [empId,setempId] = useState<string>('');
    const [deleteId,setDeleteId] =useState<string>('');
    const [updateId,setUpdateId] =useState<string>('');
   
    const [people,setPeople] = useState<PersonData[]>([]);
    const [person,setPerson]= useState<PersonData>({name:'',emp__id:empId,exp:0,_id:'',designation:'',_v:0,type:''});

   
    const [change,setChange] = useState<boolean>(false)
    const [deleteModalShow,setDeleteModalShow]=useState<boolean>(false)
    const [updateModalShow,setUpdateShow]=useState<boolean>(false)

    const getPeople = useCallback(async()=>{
      try{
        const {data} = await Axios.get('http://localhost:5000/person/all');
        generateId(data)
        setPeople(data)
      
      }
      catch(e){
        console.log(e);
      }
 
    },[])

    const handleInput = (e:any)=>{

       const name:string = e.target.name;
       const value:string = e.target.value;
       setPerson({...person,[name]:value,emp__id:empId})

    }
    
    const generateId = (people:PersonData[])=>{

      if(people.length>0){
      let {emp__id} =people && people[people.length-1];
       let increment = Number(emp__id.substring(emp__id.length,emp__id.length-1))+1
       emp__id =  emp__id.substring(0,emp__id.length-1) + increment
       setempId(emp__id)
      }

    }
 

    const addPerson  = async ()=>{
      try{
        const {data} = await Axios.post('http://localhost:5000/person/add',person)
        console.log(data)
        setChange(data.success)
        handleClose()
        alert('Added')
      }catch(e){
        console.log(e);
      }
    }

    useEffect(()=>{
       getPeople()
 
    },[change,empId,deleteId,getPeople,updateId])  

  return (
    <>
      <table className='table table-bordered '>
        <thead className='bg-dark text-white'>
          <tr>
            <th>Display Name</th>
            <th>Emp ID</th>
            <th>Designation</th>
            <th>Emp Type</th>
            <th>Experience</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
        {
            people.map((person:PersonData)=>{
              return <SingleTableRow 

              {...person} 
              setUpdateShow={setUpdateShow} 
              key={person._id} 
              setDeleteId={setDeleteId} 
              setUpdateId={setUpdateId} 
              setDeleteModalShow={setDeleteModalShow}
          
              
              />
            })
        }
        </tbody>
      </table>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add People</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
          <div className='d-flex gap-3'>
          <Form.Group className="mb-3 w-100" controlId="exampleForm.ControlInput1">
              <Form.Label>Display Name</Form.Label>
              <Form.Control
                name='name'
                type="text"
                placeholder="Jon Doe"
                autoFocus
                onChange={(e)=>handleInput(e)}
              />
            </Form.Group>

            <Form.Group className="mb-3 w-100" controlId="exampleForm.ControlInput1">
              <Form.Label>Emp Id</Form.Label>
              <Form.Control 
                type="text"
                value={empId}
                name='emp__id'
                readOnly
                autoFocus
                onChange={(e)=>handleInput(e)}
              />
            </Form.Group>

          </div>

          <div className='d-flex gap-2'>

            <Form.Group className="mb-3 w-100" controlId="exampleForm.ControlInput1">
              <Form.Label>Designation</Form.Label>
              <Form.Select name='type'  onChange={(e)=>handleInput(e)} className='w-100' aria-label="Default select example">
                  <option value="all" >Employee Types</option>
                  <option value="fullTime" >Full Time</option>
                  <option value="partTime" >Part Time</option>
                  <option value="contractBasis" >Contract Basis</option>
                  <option value="other" >Other</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3 w-100" controlId="exampleForm.ControlInput1">
              <Form.Label>Experience</Form.Label>
              <Form.Select name='exp'  onChange={(e)=>handleInput(e)} className='w-100' aria-label="Default select example">
                  <option value="1">1 years</option>
                  <option value="2">2 years</option>
                  <option value="3">3 years</option>
              </Form.Select>
            </Form.Group>

          </div>
   
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Designation</Form.Label>
              <Form.Control
                name='designation'
                type="text"
                placeholder="Designation"
                autoFocus
                onChange={(e)=>handleInput(e)}
              />
            </Form.Group>

   
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Personal Notes</Form.Label>
              <Form.Control as="textarea" rows={3} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button  variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={addPerson}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      <DeleteModal deleteModalShow={deleteModalShow} setDeleteId={setDeleteId} deleteId={deleteId} setDeleteModalShow={setDeleteModalShow} />
      
      <UpdateModal 
        updateModalShow={updateModalShow} 
        setUpdateId={setUpdateId} 
        updateId={updateId} 
        setUpdateShow={setUpdateShow}
   
      
      />
    </>
  )
}
export default UserTable
