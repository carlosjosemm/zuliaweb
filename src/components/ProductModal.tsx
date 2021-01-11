import { 
  Box, 
  // Button, 
  Center, 
  Flex, 
  Grid, 
  GridItem, 
  Heading, 
  Image, 
  Text,
  LightMode,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Slider,
  SliderTrack,
  SliderThumb,
  SliderFilledTrack, 
  // Modal, 
  // ModalBody, 
  // ModalCloseButton, 
  // ModalContent, 
  // ModalFooter, 
  // ModalHeader, 
  // ModalOverlay 
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Badge, Button, Modal } from "react-bootstrap";
import { ProductData } from "../types";
import styles from "../../styles/home.module.css";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: ProductData;
}

const ProductModal: React.FC<ModalProps> = ({isOpen, onClose, product}) => {
  const format = (val) => val + ` ${product.unit}${(product.unity==false)? '(es)': '(s)' }`;
  const parse = (val) => val.replace(/^\$/, "");
  const [finalprice, useFinalprice] = useState(null);
  const [quantity, setQuantity] = useState(0);
  // const handleChange = (quantity) => setQuantity(quantity);
  const [subTotal, useSubTotal] = useState(0);

  useEffect(() => {
    if (product.ofert) {
        useFinalprice(product.price * product.discount);
    } else {
        useFinalprice(product.price);
    };

    useSubTotal(quantity * finalprice);
    console.log('new: ', product.new);
}, [quantity])


    return (
      <>
        <Modal
          style={{padding: "0px"}}
          size="lg"
          show={isOpen}
          onHide={onClose}
          aria-labelledby="example-modal-sizes-title-lg"
          // closeButton
          centered
          // backdrop="static"
        >
          <Modal.Body 
            style={{padding: "0px"}}
          >
            <Grid
              h="100%"
              w="100%"
              templateRows="repeat(6, 1fr)"
              templateColumns="repeat(4, 1fr)"
            >
              <GridItem rowSpan={6} colSpan={2}>
                <Flex h="100%">
                <Image
                  src={product.photoURL} 
                  // justifySelf="center"
                  // fit="contain"
                />
                </Flex>
              </GridItem>

              <GridItem rowSpan={1} colSpan={2}  mx="2ch">
                <Flex
                  alignItems="flex-start"
                  justifyContent="flex-end"
                  h="100%"
                  w="100%"
                  flexDir="column"
                >
                  <Flex mb="0.7ch">
                    {product.hot && <Badge style={{marginRight: '5px'}} variant="danger">DESTACADO</Badge>}
                    {product.new ? <Badge variant="primary">NUEVO</Badge> : null}
                  </Flex>
                  <Heading
                    as="h2" size="lg" isTruncated mb="0px" pb="0.3ch" maxWidth="100%"
                  >
                    {product.name}
                  </Heading>
                </Flex>
              </GridItem>

              <GridItem rowSpan={2} colSpan={2}  mx="2ch">
                <Flex
                  alignItems="left"
                  justifyContent="center"
                  flexDir="column"
                  h="100%"
                  w="100%"
                >
                  <Heading
                    as="h2" size="sm"
                    borderBottom="1px solid lightgrey"
                    pb="1ch"
                  >
                    INFORMACION DEL PRODUCTO
                  </Heading>
                  <p style={{color: 'gray'}}>La descripcion del producto, con algunos datos que lo hagan mas llamativos al cliente al momento de agregar al carrito.</p>
                </Flex>
              </GridItem>

              <GridItem rowSpan={1} colSpan={2} borderY='1px solid lightgrey' mx="2ch">
                <Flex h="100%" w="100%" alignItems="center" justifyContent="center" pl="20px">
                  <Text fontSize="lg" color="black" verticalAlign="center" mb="0px" mr="5px">
                    Cantidad:
                  </Text>
                  <LightMode>
                  <NumberInput maxW="150px" mr="2rem" min={0} max={100} value={format(quantity)} onChange={(valueString) => setQuantity(parse(valueString))}>
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                  </LightMode>
                </Flex>
              </GridItem>

              {product.ofert? <>
              {/* <GridItem rowSpan={1} colSpan={1} >
                <Flex flexDir="row" w="100%" h="100%" alignItems="center" pr="5px" justifyContent="flex-end">
                  <Text as="s" fontSize="2xl" color="red.500">
                    ${product.price}
                  </Text>
                </Flex>
              </GridItem>
              <GridItem rowSpan={1} colSpan={1} pl="5px">
                <Flex flexDir="row" w="100%" h="100%" alignItems="center" pl="5px" justifyContent="flex-start">
                  <Text as="b" fontSize="5xl" color="yellow.800">
                    ${finalprice}
                  </Text>
                </Flex>
              </GridItem>  */}
{/* ////////////////////////////////////////////////////////////////////// */}
              <GridItem rowSpan={1} colSpan={2} >
                <Flex flexDir="row" w="100%" h="100%" alignItems="center" pr="5px" justifyContent="center">
                  <Text as="s" fontSize="2xl" color="red.500" mr="1ch">
                    ${product.price}
                  </Text>
                  <Text as="b" fontSize="5xl" color="black" mb="0.5ch">
                    ${finalprice}
                  </Text>
                  <Text fontSize="2xl" color="black" ml="1ch" mb="0px">
                    x {product.unit}
                  </Text>
                </Flex>
              </GridItem>
              </>:
              <>
              <GridItem rowSpan={1} colSpan={2} >
                <Flex flexDir="row" w="100%" h="100%" alignItems="center" pr="5px" justifyContent="center">
                  <Text as="b" fontSize="5xl" color="black" >
                    ${finalprice}
                  </Text>
                  <Text fontSize="2xl" color="black" ml="0.5ch" mb="0px">
                    x {product.unit}
                  </Text>
                </Flex>
              </GridItem>
              </>}

                {/* BUTTONS */}
              <GridItem rowSpan={1} colSpan={2}>
                <Flex h="100%" w="100%" justifyContent="space-around" alignItems="center">
                  <Box>
                  <Button
                    className={styles.addButton}
                    style={{marginRight: "10px"}} 
                    // variant="primary" //this is a darker blue
                  >
                    Agregar al Carrito
                  </Button>
                  <Button variant="danger" 
                  >
                    Cancelar
                  </Button>
                  </Box>
                  <Center mr="10px" mb="5px">
                    <Flex flexDir="column" position="relative" bottom="1.5ch" alignItems="center">
                      <Text fontSize="lg" position="relative" top="1ch" mb="0px" borderBottom="1px solid grey">
                        Subtotal:
                      </Text>
                      <Text fontSize="4xl" color="gray.600" mb="0px">
                        ${subTotal}
                      </Text>
                  </Flex>
                </Center>
                </Flex>
              </GridItem>
            </Grid>
          </Modal.Body>
      </Modal>



        {/* <LightMode>
        <Modal isOpen={isOpen} onClose={onClose} isCentered size="xl" >
          <ModalOverlay />
          <ModalContent>
            {/* <ModalHeader textAlign="center">{product.name}</ModalHeader> */}
            {/* <ModalCloseButton />
            <ModalBody p="0px">
              <Grid
                h="100%"
                w="100%"
                templateRows="repeat(6, 1fr)"
                templateColumns="repeat(4, 1fr)"
              >
                <GridItem rowSpan={6} colSpan={2}>
                  <Image 
                    src={product.photoURL} 
                    // justifySelf="center"
                  />
                </GridItem>

                <GridItem rowSpan={1} colSpan={2}>
                  <Box></Box>
                </GridItem>

                <GridItem rowSpan={1} colSpan={2} textAlign="left" pl="20px">
                <Heading
                    as="h3" size="md"
                  >
                    {product.name}
                  </Heading>
                </GridItem>

                <GridItem rowSpan={1} colSpan={2} textAlign="left" pl="20px">
                Product description here...
                </GridItem>

                <GridItem rowSpan={1} colSpan={2} textAlign="left" pl="20px">
                Product quantity input here...
                </GridItem>

                <GridItem rowSpan={1} colSpan={1} textAlign="right" pr="5px">
                {product.price}
                </GridItem>
                <GridItem rowSpan={1} colSpan={1} textAlign="left" pl="5px">
                {finalprice}
                </GridItem>

                <GridItem rowSpan={1} colSpan={2} textAlign="left" pl="5px">
                Add to cart button here
                </GridItem>
              </Grid>
            </ModalBody> */}

            {/* <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
              <Button variant="ghost">Secondary Action</Button>
            </ModalFooter> */}

          {/* </ModalContent>
        </Modal>
        </LightMode> */}
      </>
    );
}

export default ProductModal;