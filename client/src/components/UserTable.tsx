import Axios from 'axios';
import React ,{useState,useEffect,useCallback} from 'react'
import SingleTableRow  from './SingleTableRow'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal'
import DeleteModal from './deleteModal';
import UpdateModal from './updateModal';
import {BiSort} from 'react-icons/bi'

type ModalType={
  show:boolean,
  setShow: React.Dispatch<React.SetStateAction<boolean>>,
  category:string
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
 
  const UserTable:React.FC<ModalType> = ({show,setShow,handleClose,handleShow,category}) => {
     
    const [empId,setempId] = useState<string>('');
    const [deleteId,setDeleteId] =useState<string>('');
    const [updateId,setUpdateId] =useState<string>('');
   
    const [people,setPeople] = useState<PersonData[]>([]);
    const [person,setPerson]= useState<PersonData>({name:'',emp__id:empId,exp:1,_id:'',designation:'',_v:0,type:'Full Time'});

   
    const [change,setChange] = useState<number>(0)
    const [deleteModalShow,setDeleteModalShow]=useState<boolean>(false)
    const [updateModalShow,setUpdateShow]=useState<boolean>(false)
    const [isSort,SetisSortName]=useState<boolean>(true);
    const [isSortID,SetisSortID]=useState<boolean>(true);

    const getPeople = useCallback(async()=>{
      try{
       
          const {data} = await Axios.get('http://localhost:5000/person/all');
          generateId(data)
          setPeople(data)
          if(category!=='All'){
            const newCategory = data.filter((person:PersonData)=>person.type===category);
            setPeople(newCategory)
          }
    
      }
      catch(e){
        console.log(e);
      }
 
    },[category])
    

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
      if(person.name==='' || person.designation==='' ) {
         alert('Fill Feilds')
         return 
      }
      try{
        const {data} = await Axios.post('http://localhost:5000/person/add',person)
        if(data.success){
          setChange(Math.floor(Math.random()*10))
        }
       
        handleClose()
        alert('Added')
      }catch(e){
        console.log(e);
      }
    }

    const sortName = async()=>{
      console.log('hi')
      SetisSortName(!isSort)
      try{
        if(isSort){
          const {data} = await Axios.get('http://localhost:5000/person/sortName');
          console.log(data);
          setPeople(data)
        }
        else{
          getPeople()
        }

      
      }
      catch(e){
        console.log(e);
      }
    }
    const sortID = async()=>{
 
      SetisSortID(!isSortID)
      try{
        if(isSortID){
          const {data} = await Axios.get('http://localhost:5000/person/sortID');
          console.log(data);
          setPeople(data)
        }
        else{
          getPeople()
        }

      
      }
      catch(e){
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
            <th>Display Name <BiSort style={{cursor:'pointer'}} color={'white'} onClick={sortName}/></th>
            <th>Emp ID <BiSort style={{cursor:'pointer'}}  color={'white'} onClick={sortID}/> </th>
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
                required
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
                required
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
              <Form.Label>Emp Type</Form.Label>
              <Form.Select name='type'  onChange={(e)=>handleInput(e)} className='w-100' aria-label="Default select example">
            
                  <option value="Full Time">Full Time</option>
                  <option value="Part Time">Part Time</option>
                  <option value="Contract Basis">Contract Basis</option>
                  <option value="Other">Other</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3 w-100" controlId="exampleForm.ControlInput1">
              <Form.Label>Experience</Form.Label>
              <Form.Select name='exp'  onChange={(e)=>handleInput(e)} className='w-100' aria-label="Default select example">
                  <option value="1">1 years</option>
                  <option value="2">2 years</option>
                  <option value="3">3 years</option>
                  <option value="4">4 years</option>
                  <option value="5">5 years</option>
                  <option value="6">6 years</option>
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
                required
              />
            </Form.Group>

   
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Personal Notes</Form.Label>
              <Form.Control required as="textarea" rows={3} />
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
