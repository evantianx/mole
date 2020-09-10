import React from "react";
import { Box, Link, Flex, Heading } from "@chakra-ui/core";
import NextLink from "next/link";

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  return (
    <Flex
      bg="white"
      p={4}
      ml="auto"
      top={0}
      zIndex={1}
      position="sticky"
      align="center"
      boxShadow="sm"
    >
      <NextLink href="/">
        <Link>
          <Heading color="black">Mole</Heading>
        </Link>
      </NextLink>
      <Box ml="auto">
        <NextLink href="/login">
          <Link mr={2} color="black">
            login
          </Link>
        </NextLink>
        <NextLink href="/register">
          <Link color="black">register</Link>
        </NextLink>
      </Box>
    </Flex>
  );
};
