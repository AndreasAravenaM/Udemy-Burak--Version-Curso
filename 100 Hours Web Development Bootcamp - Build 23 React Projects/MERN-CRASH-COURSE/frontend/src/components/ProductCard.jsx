import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Heading,
  HStack,
  IconButton,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useColorModeValue,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useProductStore } from "../store/product";
import { useState } from "react";

const ProductCard = (props) => {
  const { product } = props;

  return (
    <Box
      shadow="lg"
      rounded="lg"
      overflow="hidden"
      transition="all 0.3s"
      _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
      bg={bg}
    >
      {console.log("Esto es dentro del card")}
      <Image
        src={product.image}
        alt={product.name}
        h={48}
        w="full"
        objectFit="cover"
      />

      <Box p={4}>
        <Heading as="h3" size="md" mb={2}>
          {product.name}
        </Heading>
      </Box>

      <Text fontWeight="bold" fontSize="xl" color={textColor} mb={4}>
        ${product.price}
      </Text>

      <HStack spacing={2}>
        <IconButton
          icon={<EditIcon />}
          colorScheme="blue" /*onClick={onOpen}*/
        />
        <IconButton
          icon={<DeleteIcon />}
          colorScheme="red"
          /*onClick={handleDeleteProduct(id)}*/
        />
      </HStack>
    </Box>
  );
};

export default ProductCard;
