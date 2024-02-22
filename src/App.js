/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import {
  ChakraProvider,
  Box,
  Flex,
  Heading,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Select,
  Stack,
  Spinner,
} from "@chakra-ui/react";
import RateCard from "./components/RateCard";
import { GetAllRates, GetAppRates } from "./services/api";
import { generateDateStrings } from "./services/dateUtils";

const App = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [appName, setAppName] = useState("");
  const [webhookUrl, setWebhookUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [rates, setRates] = useState([]);
  const [appRates, setAppRates] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [appSelectedDate, setAppSelectedDate] = useState("");

  const datesAllowed = generateDateStrings(7);
  const datesAppAllowed = generateDateStrings(7);

  const handleSubscribe = () => {
    // Add your validation logic here
    // For simplicity, you can just log the values for now
    console.log("Email:", email);
    console.log("AppName:", appName);
    console.log("Webhook URL:", webhookUrl);

    // Close the modal
    setModalOpen(false);
  };
  useEffect(() => {
    // Fetch rates from the API
    fetchRates();
  }, [selectedDate]);

  useEffect(() => {
    fetchAppRates();
  }, [appSelectedDate]);

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };
  const handleAppDateChange = (e) => {
    setAppSelectedDate(e.target.value);
  };

  const fetchRates = async () => {
    setLoading(true);
    // Replace with actual API call
    const res = await GetAllRates({ date: selectedDate });
    setLoading(false);
    if (res.success) {
      console.log(res.data);
      setRates(res.data);
    }
  };
  const fetchAppRates = async () => {
    setLoading(true);
    // Replace with actual API call
    const res = await GetAppRates({ date: appSelectedDate });
    setLoading(false);
    if (res.success) {
      //console.log(res);
      console.log(res.data);
      setAppRates(res.data);
    }
  };
  return (
    <ChakraProvider>
      {/* Header Navbar */}
      <Flex
        as="header"
        align="center"
        justify="space-between"
        bgColor="white"
        p={4}
        position="sticky"
        top={0}
        zIndex={10}
      >
        <Heading as="h1" size="md">
          Rately
        </Heading>
        <Stack direction="row" spacing={4}>
          <Button
            colorScheme="teal"
            variant="outline"
            onClick={() => window.open("https://your-api-docs-url", "_blank")}
          >
            API Docs
          </Button>
          <Button colorScheme="teal" onClick={() => setModalOpen(true)}>
            Subscribe to Rates
          </Button>
        </Stack>
      </Flex>

      {/* Subscribe Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Subscribe to Rates</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>App Name</FormLabel>
              <Input
                value={appName}
                onChange={(e) => setAppName(e.target.value)}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Webhook URL</FormLabel>
              <Input
                value={webhookUrl}
                onChange={(e) => setWebhookUrl(e.target.value)}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="teal" onClick={handleSubscribe}>
              Subscribe
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Body */}
      <Box p={4}>
        {/* Rates for today */}
        <Flex align="center" justify="space-between" mr={6}>
          <Heading as="h2" size="lg" mb={4} ml={5}>
            Rates
          </Heading>

          {/* Filter Dropdown - You can replace with your actual dropdown component */}
          <Select
            placeholder="Select day"
            w={"30%"}
            onChange={handleDateChange}
          >
            {datesAllowed.map((date) => {
              return (
                <option value={date.date} key={date.date}>
                  {date.dateString}
                </option>
              );
            })}
          </Select>
        </Flex>

        {/* Stat Cards */}
        <Flex
          mt={4}
          flexWrap="wrap"
          justifyContent={loading && rates.length === 0 ? "center" : "left"}
        >
          {loading && rates.length === 0 ? (
            <Spinner />
          ) : (
            rates.map((rate) => <RateCard key={rate.rateID} rate={rate} />)
          )}
          {/* Add more Box components for additional Stat cards */}
        </Flex>
      </Box>

      <Box p={4} mt={20}>
        {/* Rates for today */}
        <Flex align="center" justify="space-between" mr={6}>
          <Heading as="h2" size="lg" mb={4} ml={5}>
            App Rates
          </Heading>

          {/* Filter Dropdown - You can replace with your actual dropdown component */}
          <Select
            placeholder="Select day"
            w={"30%"}
            onChange={handleAppDateChange}
          >
            {datesAppAllowed.map((date) => (
              <option value={date.date} key={date.date}>
                {date.dateString}
              </option>
            ))}
          </Select>
        </Flex>

        {/* Stat Cards */}

        {loading && appRates.length === 0 ? (
          <Flex mt={4} flexWrap="wrap" justifyContent={"center"}>
            {" "}
            <Spinner />
          </Flex>
        ) : (
          <Flex mb={4} flexWrap="wrap" justifyContent={"left"}>
            {appRates.length === 0 ? (
              <Flex mt={4} flexWrap="wrap" justifyContent={"center"}>
                {" "}
                <Heading as="h6" size="xs" mb={4} ml={5}>
                  No rates available for the selected date
                </Heading>
              </Flex>
            ) : (
              appRates.map((rates) => (
                <RateCard key={rates.rateID} rate={rates} isAppRate />
              ))
            )}
          </Flex>
        )}
      </Box>
    </ChakraProvider>
  );
};
export default App;
