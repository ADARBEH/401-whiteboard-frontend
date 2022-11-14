
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { usePost } from '../context/PostContext';

// import from chakra ui components
import {
    VStack, Box, Text, Button, HStack, AccordionPanel, AccordionIcon, AccordionButton,
    AccordionItem, Input, FormControl, FormLabel, Accordion, Image, Modal,
    ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure
} from '@chakra-ui/react';

// import from react icons
import { CgComment } from 'react-icons/cg'
import { FiEdit } from 'react-icons/fi'
import { IconContext } from 'react-icons'
import { BiSend } from 'react-icons/bi'
import { MdDelete } from 'react-icons/md';


export default function PostCard(props) {

    const { getallPosts, handleChangecontent, title, content, handleChangetitle, } = usePost();

    const { isOpen, onOpen, onClose } = useDisclosure()

    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)

    const [postid, setpostid] = useState(null);



    // some functon for system

    const saveid = (id) => {
        setpostid(id);
        onOpen();
        console.log(postid);
    }

    const handleDelete = async (id) => {
        await axios.delete(`https://whiteboard-backend-ad.herokuapp.com/post/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }
        );
        getallPosts()
    }

    const handleedit = async (id) => {
        const updatepost = {
            title: title,
            content: content
        }
        await axios.put(`https://whiteboard-backend-ad.herokuapp.com/post/${id}`, updatepost,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }
        );
        getallPosts()
    }

    const handleaddcomment = async (e, id) => {
        if (e && e.preventDefault) {
            e.preventDefault();
            const newcomment = {
                petName: title,
                ownerID: id
            }
            const addcomment = await axios.post(`https://whiteboard-backend-ad.herokuapp.com/comment/`, newcomment);
            console.log(addcomment);
            getallPosts()
        }
    }


    useEffect(() => {
        handleaddcomment();
    },)



    return (

        <>

            {
                props.posts.map((post, idx) => {
                    return (

                        <VStack p="10" key={idx}
                            bgColor="blackAlpha.100"
                            border={1}
                            borderColor="gray.200"
                            borderRadius="1.5em"
                            boxShadow="lg"
                            marginBottom={10}
                            marginLeft={10}
                            marginRight={10}
                        >
                            <HStack spacing="24px" p={2}
                                color="white"
                                alignItems="center"
                                justifyContent="space-between"
                                w='100%'
                            >
                                <Box>
                                    <HStack spacing="20px">
                                        <Image src="https://picsum.photos/500/501" boxSize="100px" borderRadius="50%" />
                                        <Text fontSize='3xl'
                                            fontWeight='bold'
                                            fontFamily='Exo 2'
                                            letterSpacing='wide'
                                            color='black'
                                            marginLeft={104}
                                        >{post.title}</Text>
                                    </HStack>
                                </Box>

                                <Text color='blackAlpha.500'
                                >{post.createdAt}</Text>
                            </HStack>

                            <HStack w='100%' >
                                <Text fontSize='2xl'
                                    fontWeight='bold'
                                    fontFamily='monospace'
                                    letterSpacing='wide'
                                    color='black'
                                    w='100%'
                                    display='flex'
                                    alignItems='left'
                                    text-align='left'
                                    marginLeft={10}
                                >Content : {post.content}
                                </Text>
                            </HStack>


                            <IconContext.Provider value={{ style: { verticalAlign: 'middle', color: 'black', size: '3em' } }}>
                                <HStack w='100%'
                                    display='flex'
                                    alignItems='center'
                                    justifyContent='space-between'
                                >

                                    <Accordion allowToggle >
                                        <AccordionItem>
                                            <h2>
                                                <AccordionButton>
                                                    <CgComment size='2em' />
                                                    <AccordionIcon />
                                                </AccordionButton>
                                            </h2>
                                            <AccordionPanel pb={4}>
                                                {post.Comments[0] &&
                                                    <div>
                                                        <p>Comments</p>
                                                        {post.Comments.map((comment, idx) => {
                                                            return (
                                                                <div key={idx} className='comment'>
                                                                    <p>{comment.petName}</p>
                                                                </div>
                                                            )
                                                        }
                                                        )}
                                                    </div>
                                                }

                                                <FormControl id="first-name" isRequired>

                                                    <HStack w='100%'>

                                                        <Input onChange={handleChangetitle} name='title' w='100%' />
                                                        <Button bg="gray"
                                                            className='sub' onClick={(e) => { handleaddcomment(e, post.id) }}><BiSend size='1em' ></BiSend></Button>

                                                    </HStack>

                                                </FormControl>

                                            </AccordionPanel>
                                        </AccordionItem>
                                    </Accordion>

                                    {(JSON.parse(localStorage.getItem('User')).id === post.postid || JSON.parse(localStorage.getItem('User')).capabilities.length === 4) &&
                                        <>
                                            <Box>
                                                <HStack>

                                                    <Button onClick={() => { saveid(post.id) }}
                                                        _hover={{ bg: 'gray' }}
                                                    ><FiEdit size='2em' /></Button>

                                                    <Button onClick={() => { handleDelete(post.id) }}
                                                        _hover={{ bg: 'gray' }}
                                                    ><MdDelete size='2em' /></Button>

                                                </HStack>
                                            </Box>
                                        </>
                                    }


                                </HStack>
                            </IconContext.Provider>



                        </VStack>

                    )
                })
            }

            <Modal
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Edit Your Post</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel>Title</FormLabel>
                            <Input onChange={handleChangetitle} name='title' placeholder="Your Title" variant='flushed' />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Content</FormLabel>
                            <Input onChange={handleChangecontent} name='content' placeholder="Your Content" variant='flushed' />
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button bg="gray" colorScheme='gray' mr={3} onClick={() => { handleedit(postid) }}>
                            Save
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

         

                <Text fontSize='4xl'
                    fontWeight='bold'
                    fontFamily='monospace'
                    letterSpacing='wide'
                    color='white'
                    alignItems='center'
                    justifyContent='center'
                    display='flex'
                    bgGradient="linear(to-l, #7928CA,#FF0080)"
                    bgClip="text"

                ><p>&copy; 2022 Ibraheem AD</p></Text>
                
            </>
            )
}

