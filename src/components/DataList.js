import {
  Box,
  Button,
  Container,
  HStack,
  Heading,
  Stack,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const DataList = () => {
  const navigate = useNavigate();
  const accessToken = "eb33bed41ebc137:348f33df4a5e962";

  axios.interceptors.request.use(
    (config) => {
      config.headers.Authorization = `token ${accessToken}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  useEffect(() => {
    if (localStorage.getItem("access_token")) {
      navigate("/dataList");
      getData();
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const [names, setNames] = useState([]);

  const getData = async () => {
    try {
      const res = await axios.get(
        `https://assignment.8848digitalerp.com/api/method/assignment.API.all_users_api.get_user`
      );
      // console.log(res.data.message.data);
      setNames(res.data.message.data);
    } catch (error) {
      console.log(error);
      alert("Please enter correct username or password");
    }
  };

  return (
    <>
      <Box>
        <Container maxWidth="sm">
          <Stack padding={10}>
            <Heading>List of all users</Heading>
            {names.map((dat, idx) => {
              const { name1 } = dat;
              return (
                <HStack key={idx} padding={2}>
                  <Text width={20}>{name1}</Text>
                  <Button size="sm" as={Link} to={`/details/${name1}`}>
                    View details check
                  </Button>
                </HStack>
              );
            })}
          </Stack>
        </Container>
      </Box>
    </>
  );
};

export default DataList;
