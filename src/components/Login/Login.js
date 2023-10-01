import {
  Button,
  Container,
  Heading,
  Input,
  Stack,
  InputGroup,
  InputRightElement,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// "https://assignment.8848digitalerp.com/api/method/assignment.API.access_token.get_access_token?usr=Administrator&pwd=12345",{usr: name, pwd: password,}

const Login = () => {
  const navigate = useNavigate();
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (localStorage.getItem("access_token")) {
      navigate("/dataList");
    } else {
      navigate("/login");
    }
  }, [navigate]);

  // useEffect(() => {
  //   console.log("jay", name, password);
  // }, [name, password]);

  const getData = async () => {
    // console.log(name, password);

    try {
      const res = await axios.get(
        `https://assignment.8848digitalerp.com/api/method/assignment.API.access_token.get_access_token?usr=${name}&pwd=${password}`
      );
      // console.log(res.data.message.data);
      localStorage.setItem("access_token", res.data.message.data.access_token);
      navigate("/dataList");
    } catch (error) {
      // console.log(error);
      alert("Please enter correct username or password");
    }
  };

  return (
    <>
      {/* <Box> */}
      <Container maxWidth="sm" padding={10}>
        <form>
          <Stack>
            <Heading>Login page</Heading>

            <FormControl>
              <FormLabel>UserName</FormLabel>
              <Input
                type="text"
                placeholder="Enter Username"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  pr="4.5rem"
                  type={show ? "text" : "password"}
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={handleClick}>
                    {show ? "Hide" : "Show"}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>

            <Button onClick={getData}>Submit</Button>
          </Stack>
        </form>
      </Container>
      {/* </Box> */}
    </>
  );
};

export default Login;
