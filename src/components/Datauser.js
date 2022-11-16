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


function Datauser() {

  const { Addpost, posts, handleChangecontent, handleChangetitle, lodning } = usePost();
  const { logout } = useAuth();
  const { getallPosts } = usePost();


  useEffect(() => {
    getallPosts();


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
          <Input onChange={handleChangetitle} name='title' placeholder="Your Title" variant='flushed' />
          <FormHelperText>Required</FormHelperText>
        </FormControl>

        <FormControl id="first-name" isRequired>
          <FormLabel>Content</FormLabel>
          <Input onChange={handleChangecontent} name='content' placeholder="Your Content" variant='flushed' />
          <FormHelperText>Required</FormHelperText>
        </FormControl>

        <Button isLoading={lodning} bgGradient="linear(to-l, #7928CA,#FF0080)"
          className='sub' onClick={Addpost} w='100px'h='50px' ><MdAddTask size='4em' ></MdAddTask></Button>

      </HStack>


      {
        (posts.length > 0) &&
        <PostCard posts={posts} />
      }

    </div>

  );
}

export default Datauser;
