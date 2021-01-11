import { 
  Box, 
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
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Badge, Button, Modal } from "react-bootstrap";
import { CartItem, ProductData } from "../types";
import styles from "../../styles/Home.module.css";
import { useDataLayer } from "../DataLayer";
import { actionTypes } from "../reducer";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: ProductData;
}

const ProductModal: React.FC<ModalProps> = ({isOpen, onClose, product}) => {
  const [{hotproducts}, dispatch] = useDataLayer();
  const [finalprice, useFinalprice] = useState(null);
  const [quantity, setQuantity] = useState(0);
  const [subTotal, useSubTotal] = useState(0);
  const toast = useToast()
  // const [adding, useAdding] = useState(false);

  const format = (val) => val + ` ${product.unit}${(product.unity==false)? '(es)': '(s)' }`;
  const parse = (val) => val.replace(/^\$/, "");


  const handleAddtoCart = (e: React.MouseEvent<HTMLElement, MouseEvent>, product: ProductData, quantity: number, finalprice: number, subTotal: number) => {
    e.preventDefault();
    // useAdding(true);
    const item:CartItem = {product: product, quantity: parseInt(quantity.toString()), finalprice: finalprice};
    dispatch(
      {type: actionTypes.ADD_TO_CART, item: item, subtotal: subTotal}
    );
    console.log('hotproducts from add to cart: ', hotproducts);
    toast({
      title: "Producto agregado agregado a tu carrito!",
      // description: "El producto fue ",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    setQuantity(0);
    // useAdding(false);
  };

  useEffect(() => {
    if (product.ofert) {
        useFinalprice(product.price * product.discount);
    } else {
        useFinalprice(product.price);
    };
    useSubTotal(quantity * finalprice);
}, [quantity])


    return (
      <>
        <Modal
          style={{padding: "0px"}}
          size="lg"
          show={isOpen}
          onHide={onClose}
          aria-labelledby="example-modal-sizes-title-lg"
          centered
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
              {/* MODAL IMAGE */}
              <GridItem rowSpan={6} colSpan={2}>
                <Flex h="100%">
                <Image
                  src={product.photoURL} 
                />
                </Flex>
              </GridItem>

              {/* MODAL TITLE AND BADGES */}
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

              {/* MODAL INFO & DESCRIPTION */}
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

              {/* MODAL QUANTITY INPUT */}
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

              {/* MODAL PRICE AND FINAL PRICE */}
              {product.ofert? <>
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

                {/* FOOTER BUTTONS AND SUBTOTAL */}
              <GridItem rowSpan={1} colSpan={2}>
                <Flex h="100%" w="100%" justifyContent="space-around" alignItems="center">
                  <Box>
                  <Button
                    className={styles.addButton}
                    style={{marginRight: "10px"}} 
                    // variant="primary" //this is a darker blue
                    onClick={(e) => handleAddtoCart(e, product, quantity, finalprice, subTotal)}
                    disabled={parseInt(quantity.toString())==0}
                    // active={adding}
                  >
                    Agregar al Carrito
                  </Button>
                  <Button variant="danger"
                  onClick={onClose} 
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
      </>
    );
}

export default ProductModal;