import React from "react";
import logo from "../assets/logo.svg";
import { Flex } from "antd";

const Header = () => {
  return (
    <Flex>
      <img src={logo} alt="pokedex" height={30} />
    </Flex>
  );
};

export default Header;
