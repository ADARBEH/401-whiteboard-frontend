import React, { useState } from 'react';
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBInput,
} from 'mdb-react-ui-kit';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import axios from 'axios';
import cookies from "react-cookies";
import '../App.css';
import { usePost } from '../context/PostContext';




export default function App(props) {
  const [varyingState, setVaryingState] = useState('');
  const [varyingModal, setVaryingModal] = useState(false);
  const [varyingRecipient, setVaryingRecipient] = useState('');
  const [varyingMessage, setVaryingMessage] = useState('');

  const onChangeRecipient = (event: any) => {
    setVaryingRecipient(event.target.value);
  };

  const onChangeMessage = (event: any) => {
    setVaryingMessage(event.target.value);
  };
  const { getallPosts } = usePost();




  const change = async () => {
    const id = props.id;
    console.log(varyingRecipient);
    console.log(varyingMessage);

    const updatepost = {
      title: varyingRecipient,
      content: varyingMessage
    }
    const update = await axios.put(`https://whiteboard-backend-ad.herokuapp.com/post/${id}`, updatepost,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

    setVaryingModal(!varyingModal);


    console.log(update);
    getallPosts();
  }





  return (
    <>
      <MDBBtn
        onClick={() => {
          setVaryingState('');
          setVaryingModal(!varyingModal);
          setVaryingRecipient('');
        }}
        className='botempost'
      >
        Update Posts
      </MDBBtn>

      <MDBModal show={varyingModal} setShow={setVaryingModal} tabIndex='-1'>
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>New message to {varyingState}</MDBModalTitle>
              <MDBBtn className='btn-close' color='none' onClick={() => setVaryingModal(!varyingModal)}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <form>
                <div className='mb-3'>
                  {varyingModal && (
                    <MDBInput
                      value={varyingRecipient}
                      onChange={onChangeRecipient}
                      labelClass='col-form-label'
                      label='Title'
                    />
                  )}
                </div>
                <div className='mb-3'>
                  {varyingModal && (
                    <MDBInput
                      value={varyingMessage}
                      onChange={onChangeMessage}
                      textarea
                      labelClass='col-form-label'
                      label='Content'
                    />
                  )}
                </div>
              </form>
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn  onClick={() => setVaryingModal(!varyingModal)}>
                Close
              </MDBBtn>
              <MDBBtn onClick={() => change()} >Save changes</MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
}