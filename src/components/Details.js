import { Button, Container, Heading, Stack, Text } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const Details = () => {
  const navigate = useNavigate();
  const { name1 } = useParams();

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

  // specific user page

  const [name, setName] = useState([]);

  const getData = async () => {
    try {
      const res = await axios.get(
        `https://assignment.8848digitalerp.com/api/method/assignment.API.specific_user.get_specific?name1=${name1}`
      );
      // console.log(res.data.message.data.specific_user);
      setName(res.data.message.data.specific_user);
      // console.log(setName);
    } catch (error) {
      console.log(error);
      alert("Please enter correct username or password");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("access_token")) {
      navigate(`/details/${name1}`);
      getData();
    } else {
      navigate("/login");
    }
  }, [navigate, name1]);

  return (
    <>
      {name.map((dat, idx) => {
        // console.log("details check", dat);
        const { name1, age, gender, company_name, designation, address } = dat;
        return (
          <Container key={idx} maxWidth="sm" padding={5}>
            <Heading>Specific User Details</Heading>

            <Stack padding={10}>
              <Text>Name: {name1}</Text>
              <Text>Age: {age}</Text>
              <Text>Gender: {gender}</Text>
              <Text>Designation: {designation}</Text>
              <Text>Address: {address}</Text>
              <Text>Company Name:{company_name}</Text>
              <Button as={Link} to={`/updateDetails/${name1}`}>
                Click here to update details
              </Button>
            </Stack>
          </Container>
        );
      })}
    </>
  );
};

export default Details;
