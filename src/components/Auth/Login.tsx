import { Grid, VStack, GridItem, Heading } from "@chakra-ui/react";
import ButtonForm from "./Form/ButtonForm";
import InputForm from "./Form/InputForm";

const Login: React.FC = () => {
  return (
    <>
      <Grid templateColumns="repeat(6, 1fr)">
        <GridItem colStart={3} colEnd={5} mt={"200px"}>
          <VStack>
            <Heading mb={4} as="h2" size="xl">
              Login to Bug Tracker
            </Heading>
            <InputForm message="Email" />
            <InputForm message="Password" />
            <ButtonForm message="Login" />
          </VStack>
        </GridItem>
      </Grid>
    </>
  );
};

export default Login;
