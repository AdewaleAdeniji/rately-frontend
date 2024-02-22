import {
  Box,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
} from "@chakra-ui/react";

const RateCard = ({ rate, isAppRate }) => {
  // Mock data, replace it with actual rate data
  const rateStruct = {
    fromCurrency: rate?.rateFrom,
    toCurrency: rate?.rateTo,
    exchangeRate: rate?.rate,
    percentageChange: rate?.rateChange,
    rateAppName: rate?.rateAppName,
  };

  const { fromCurrency, toCurrency, exchangeRate, percentageChange } =
    rateStruct;

  return (
    <Box
      width={{ base: "100%", sm: "45%", md: "30%", lg: "20%" }}
      bgColor="white"
      boxShadow="md"
      p={4}
      m={4}
      mt={isAppRate ? 0 : 4}
      borderRadius="md"
      mb={4}
    >
      <Stat>
        <StatLabel>{`${fromCurrency} to ${toCurrency}`}</StatLabel>
        <StatNumber>{exchangeRate}</StatNumber>
        <StatHelpText>
          {isAppRate ? (
            rateStruct.rateAppName.toUpperCase()
          ) : (
            <>
              <StatArrow type="decrease" />
              {percentageChange > 0
                ? `+${percentageChange}%`
                : `${percentageChange}%`}
            </>
          )}
        </StatHelpText>
      </Stat>
    </Box>
  );
};

export default RateCard;
