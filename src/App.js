import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import ListGroup from 'react-bootstrap/ListGroup';

import {v4} from 'uuid'

export default function App() {



  const [state,setState] = useState({
    name:'',
    Email:'',
    id:v4()
   })

   const [users,setUsers]=useState({
    users:[]
   })

const [modelHead,setModelHead] =useState('create')

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = (head,obj) => {
    setShow(true);
    if(head==='create'){
      setModelHead('create')
      setState({Email:'',name:'',id:v4()})
    }
    if(head==='update'){   
    console.log(obj)
      setModelHead('update')
      setState({Email:obj.Email,name:obj.name,id:obj.id})
    }
  }


   const onChangeHandler =(e)=>{
  
    setState((prevState)=>{
      return {...prevState,[e.target.name]:e.target.value}
    })

    
   }

const OnSubmitData=()=>{
 if(state.name!=='' && state.Email!==''){
    
  if(modelHead==='create'){
    let User = users.users
    User.push(state)
    setUsers((prevUsers)=>{
     return {...prevUsers,users:User}
    })
    setState((prevState)=>{
     return {...prevState,id:v4(),name:'',Email:''}
   })
  }

if(modelHead==='update'){
console.log(state,'dddddd')
  let index = users.users.findIndex(v=>v.id===state.id)

  let updateuser = users.users
  updateuser[index].name = state.name
  updateuser[index].Email = state.Email

  setUsers({users:updateuser})
}

 }
 setShow(false);

}


const onDeletedata=(id)=>{
let filteruser = users.users.filter(v=>v.id!==id)
setUsers((prevUsers)=>{
  return {...prevUsers,users:filteruser}
 })
}


let list = users.users.map((value,key)=>{
  return       <ListGroup.Item key={key} className='d-flex justify-content-between'>
    <h2>{value.name}</h2>
    <h2>{value.Email}</h2>
<Button variant="danger" onClick={()=>onDeletedata(value.id)}>Delete</Button>
<Button variant="warning" onClick={()=>handleShow('update',value)}>Update</Button>
  </ListGroup.Item>

})


  return (
    <div>
   
  <Navbar bg="light">
    <Container>
      <Navbar.Brand>TODO APP</Navbar.Brand>
      <Button variant="primary" onClick={()=>handleShow('create')}>
        Launch demo modal
      </Button>
    </Container>
  </Navbar>
  



      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{modelHead}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Name</Form.Label>
             {
              modelHead==='craete' ? <>
               <Form.Control
                type="text"
                placeholder="Name"
                name='name'
                autoFocus
                onChange={(e)=>onChangeHandler(e)}
              />
              </>:<>
              <Form.Control
                type="text"
                placeholder="Name"
                name='name'
                value={state.name}
                autoFocus
                onChange={(e)=>onChangeHandler(e)}
              />
              </>
             }
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email address</Form.Label>
              {
              modelHead==='craete' ? <>
               <Form.Control
                type="email"
                placeholder="name@example.com"
                name='Email'
                autoFocus
                onChange={(e)=>onChangeHandler(e)}
              />
              </>:<>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                name='Email'
                value={state.Email}
                autoFocus
                onChange={(e)=>onChangeHandler(e)}
              />
              </>
             }
             
            </Form.Group>
         
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={()=>OnSubmitData()}>
          {modelHead}
          </Button>
        </Modal.Footer>
       
      </Modal>
      <ListGroup>
      {list}
    </ListGroup>
  </div>
  )
}

