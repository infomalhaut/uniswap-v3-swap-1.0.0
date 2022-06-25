import React from 'react'
import {GearFill} from 'react-bootstrap-icons';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
  } from '@chakra-ui/react'
  import { Button, ButtonGroup } from '@chakra-ui/react'
  import { useDisclosure } from '@chakra-ui/react'
  import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
  } from '@chakra-ui/react'
  import { Input } from '@chakra-ui/react'

export const ConfigModal = ({slippageAmount,setSlippageAmount, deadlineMinutes, setDeadlineMinutes}) => {
  const { isOpen, onOpen, onClose } = useDisclosure()


  const initialRef = React.useRef(2)
  const finalRef = React.useRef(null)

  return (
    <>
      <Button onClick={onOpen}>  <GearFill/></Button> 
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Transaction Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Slippage Tolerance</FormLabel>
              <div className='flex'>
              <Input 
                ref={initialRef} 
                placeholder='1 (%)' 
                value={slippageAmount} 
                onChange={e=>setSlippageAmount(e.target.value)}
               />
               <p className='text-xl p-2 mr-[50px]'>%</p>
               </div>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Transaction Deadline</FormLabel>
              <div className='flex'>
              <Input 
                className=''
                ref={initialRef} 
                placeholder='10 (minutes)' 
                value={deadlineMinutes} 
                onChange={e=>setDeadlineMinutes(e.target.value)}
               />
               <p className='text-xl p-2'>minutes</p>
               </div>
            </FormControl>
          </ModalBody>

          {/* <ModalFooter>
            <Button colorScheme='blue' mr={3}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter> */}
        </ModalContent>
      </Modal>
    </>
  )
}
