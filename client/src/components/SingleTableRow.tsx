import React from 'react'

interface PersonData{
  name:string;
  emp__id:string;
  exp:number;
  _id:string;
  designation:string;
  _v:number;
  type:string;
  setDeleteId:React.Dispatch<React.SetStateAction<string>>,
  setDeleteModalShow:React.Dispatch<React.SetStateAction<boolean>>
  setUpdateId:React.Dispatch<React.SetStateAction<string>>,
  setUpdateShow:React.Dispatch<React.SetStateAction<boolean>>


} 

const SingleTableRow:React.FC<PersonData> = ({_id,name,emp__id,exp,type,designation,setDeleteId,setDeleteModalShow,setUpdateId,setUpdateShow}) => {
  const handleDelete = ()=>{
     setDeleteId(_id);
     setDeleteModalShow(true)
  }

  const handleUpdate = ()=>{
    setUpdateId(_id)
    setUpdateShow(true)
 }
  return (
        
         <tr>
          <td>{name}</td>
          <td>{emp__id}</td>
          <td>{designation}</td>
          <td>{type}</td>
          <td>{exp}</td>
          <td className='d-flex'>
            <button className='text-primary btn btn-link' onClick={handleUpdate}>Edit</button>
            <button className='text-danger btn btn-link' onClick={handleDelete}>Delete</button>
          </td>
        </tr>
        

   
  )
}
export default SingleTableRow
