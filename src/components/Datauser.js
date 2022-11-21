import { useEffect } from 'react';

import { usePost } from '../context/PostContext';
import { useAuth } from '../context/AuthContext';
import PostCard from './PostCard';

// import from chakra ui components
import { Text, Button, HStack, Input, FormControl, FormLabel, FormHelperText } from '@chakra-ui/react';

// import from react icons
import { MdAddTask } from 'react-icons/md';
import { RiLogoutBoxRLine } from 'react-icons/ri'
import { IconContext } from 'react-icons'


import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getpostAsync, addpostAsync, showpost } from "../features/postSlicer";



function Datauser() {




  const { Addpost, posts, handleChangecontent, handleChangetitle, lodning } = usePost();
  const { logout } = useAuth();
  const { getallPosts } = usePost();


  //   some redux code
  const post = useSelector(showpost);
  const dispatch = useDispatch();
  const [newpost, setNewpost] = useState({
    title: "",
    content: "",
    postid: JSON.parse(localStorage.getItem('User')).id

  });



  const addNewpost = () => {
    console.log(newpost);
    dispatch(addpostAsync(newpost));
  };


  useEffect(() => {
    dispatch(getpostAsync());

  });


  return (

    <div>

      <HStack spacing="24px" p={2}
        bgGradient="linear(to-l, #7928CA,#FF0080)"
        color="white"
        alignItems="center"
        justifyContent="space-between">

        <Text fontSize='4xl'
          fontWeight='bold'
          fontFamily='monospace'
          letterSpacing='wide'
          color='white'
          ml={10}

        >Give Me Post </Text>

        <IconContext.Provider value={{ style: { verticalAlign: 'middle', color: 'white', size: '3em', marginRight: '1em' } }}>
          <RiLogoutBoxRLine size='2em' onClick={logout} />
        </IconContext.Provider>

      </HStack>

      <HStack spacing="24px" p="10">

        <FormControl id="first-name" isRequired>
          <FormLabel>Title</FormLabel>
          <Input
            onChange={(e) => setNewpost({ ...newpost, title: e.target.value })}

            name='title' placeholder="Your Title" variant='flushed' />
          <FormHelperText>Required</FormHelperText>
        </FormControl>

        <FormControl id="first-name" isRequired>
          <FormLabel>Content</FormLabel>
          <Input
            onChange={(e) => setNewpost({ ...newpost, content: e.target.value })}

            name='content' placeholder="Your Content" variant='flushed' />
          <FormHelperText>Required</FormHelperText>
        </FormControl>

        <Button isLoading={lodning} bgGradient="linear(to-l, #7928CA,#FF0080)"
          className='sub' onClick={addNewpost} w='100px' h='50px' ><MdAddTask size='4em' ></MdAddTask></Button>

      </HStack>


      {
        (post.length > 0) &&
        <PostCard posts={post[0]} />
      }

    </div>

  );
}

export default Datauser;
