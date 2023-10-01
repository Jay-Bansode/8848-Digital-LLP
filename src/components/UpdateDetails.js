import {
  Button,
  Container,
  Input,
  Box,
  Heading,
  FormControl,
  FormLabel,
  Spacer,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const UpdateDetails = () => {
  const { name1 } = useParams();
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

  // specific user update details page

  const [data, setData] = useState({
    name1: "",
    age: "",
    gender: "",
    designation: "",
    address: "",
    company_name: "",
  });

  const getData = async () => {
    try {
      const res = await axios.get(
        `https://assignment.8848digitalerp.com/api/resource/Assignment/${name1}`
      );
      // console.log("while check", res.data.data);
      setData(res.data.data);
    } catch (error) {
      console.log(error);
      alert("Please enter correct name");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("access_token")) {
      navigate(`/updateDetails/${name1}`);
      getData();
    } else {
      navigate("/login");
    }
  }, [navigate, name1]);

  const submitHandler = async (e) => {
    e.preventDefault();
    // console.log("after update", data);
    try {
      await axios.put(
        `https://assignment.8848digitalerp.com/api/resource/Assignment/Shyam`,
        {
          data,
        }
      );
      alert("success");
      navigate("/dataList");
      // navigate("/details");
    } catch (error) {
      console.log(error);
      alert("error");
    }
  };
  return (
    <>
      <Box>
        <Container maxWidth="sm" padding={5}>
          <Heading marginBottom={5}>Update Details</Heading>
          <form>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                value={data.name1}
                onChange={(e) => setData({ ...data, name1: e.target.value })}
              />
            </FormControl>
            <Spacer h="2" />

            <FormControl>
              <FormLabel>Age</FormLabel>
              <Input
                type="number"
                value={data.age}
                onChange={(e) => setData({ ...data, age: e.target.value })}
              />
            </FormControl>
            <Spacer h="2" />

            <FormControl>
              <FormLabel>Gender</FormLabel>
              <Input
                type="text"
                value={data.gender}
                onChange={(e) => setData({ ...data, gender: e.target.value })}
              />
            </FormControl>
            <Spacer h="2" />
            <FormControl>
              <FormLabel>Designation</FormLabel>
              <Input
                type="text"
                value={data.designation}
                onChange={(e) =>
                  setData({ ...data, designation: e.target.value })
                }
              />
            </FormControl>
            <Spacer h="2" />
            <FormControl>
              <FormLabel>Address</FormLabel>
              <Input
                type="text"
                value={data.address}
                onChange={(e) => setData({ ...data, address: e.target.value })}
              />
            </FormControl>
            <Spacer h="2" />
            <FormControl>
              <FormLabel>Company Name</FormLabel>
              <Input
                type="text"
                value={data.company_name}
                onChange={(e) =>
                  setData({ ...data, company_name: e.target.value })
                }
              />
            </FormControl>
            <Spacer h="2" />

            <Spacer h="2" />
            <Button type="submit" as={Link} onClick={submitHandler}>
              Update
            </Button>
          </form>
        </Container>
      </Box>
    </>
  );
};

export default UpdateDetails;
