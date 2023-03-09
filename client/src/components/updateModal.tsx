import React, { useState,useEffect } from 'react'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Axios from 'axios'
interface  UpdateModalType{

    updateId:string;
    updateModalShow:boolean
    setUpdateId:React.Dispatch<React.SetStateAction<string>>,
    setUpdateShow:React.Dispatch<React.SetStateAction<boolean>>

}

const UpdateModal:React.FC<UpdateModalType> = ({updateModalShow,updateId,setUpdateId,setUpdateShow}) => {
    const [updateName,setUpdatedName]=useState<string>('')
    const [updateDesignation,setUpdatedDesignation]=useState<string>('')

    useEffect(()=>{
        Axios.get('http://localhost:5000/person/all').then((res)=>{
            let data=res.data
            type PersonData={
                name:string;
                emp__id:string;
                exp:number;
                _id:string;
                designation:string;
                _v:number;
                type:string;
              }

            if(updateId==='')return
            const [updateObject] = data.filter((Person:PersonData)=>Person._id===updateId)
            setUpdatedName(updateObject.name)
            setUpdatedDesignation(updateObject.designation)
            
        }).catch(e=>console.log(e))
 
    },[updateModalShow,updateId])

    const handleClose=()=>{
       setUpdateShow(false)
    }

    const updatePerson = async ()=>{
        try{
            const {data} = await Axios.put('http://localhost:5000/person/update',{name:updateName,_id:updateId,designation:updateDesignation})
            if(data.success){
                handleClose();
                setUpdateId('')
                alert('Updated');
            }
        }
        catch(e){
           console.log(e);
        }


    }

    return (
    <Modal show={updateModalShow} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>Update Person</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Form>

      <Form.Group className="mb-3 w-100" controlId="exampleForm.ControlInput1">
          <Form.Label>new Name</Form.Label>
          <Form.Control
            name='name'
            type="text"
            placeholder="Jon Doe"
            autoFocus
            value={updateName}
            onChange={(e)=>setUpdatedName(e.target.value)}
          />
        </Form.Group>



        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>new Designation</Form.Label>
          <Form.Control
            name='designation'
            type="text"
            placeholder="Designation"
            autoFocus
            value={updateDesignation}
            onChange={(e)=>setUpdatedDesignation(e.target.value)}
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
      <Button variant="primary" onClick={updatePerson}>
        Save Changes
      </Button>
    </Modal.Footer>
  </Modal>
  )
}

export default UpdateModal