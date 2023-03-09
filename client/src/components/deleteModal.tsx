import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import React from 'react'
import Axios from 'axios'
interface  DeleteModalType{
    deleteModalShow:boolean;
    deleteId:string;
    setDeleteModalShow:React.Dispatch<React.SetStateAction<boolean>>
    setDeleteId:React.Dispatch<React.SetStateAction<string>>,
}

const DeleteModal:React.FC<DeleteModalType> = ({deleteModalShow,deleteId,setDeleteModalShow,setDeleteId}) => {
  const handleClose=()=>{
    setDeleteModalShow(false)
  }  
  const deleteEmployee= async()=>{
    try{
      const {data}= await Axios.delete('http://localhost:5000/person/delete/'+deleteId);
      if(data.success) {
        setDeleteId('')
        setDeleteModalShow(false)
        alert('Deleted')
       
      }
    }catch(e){
       console.log(e)
    }

  }
  return (
    <Modal show={deleteModalShow} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>Delete Confirmation</Modal.Title>
    </Modal.Header>
    <Modal.Body>
        <h5>Are you Sure</h5>
    </Modal.Body>
    <Modal.Footer>
      <Button  variant="secondary" onClick={handleClose}>
        Close
      </Button>
      <Button variant="primary" onClick={deleteEmployee}>
        Delete
      </Button>
    </Modal.Footer>
  </Modal>
  )
}

export default DeleteModal