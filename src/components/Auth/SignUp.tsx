import { Grid, GridItem, Heading, VStack } from "@chakra-ui/react";
import ButtonForm from "./Form/ButtonForm";
import InputForm from "./Form/InputForm";

const SignUp: React.FC = () => {
  return (
    <>
      <Grid templateColumns="repeat(6, 1fr)">
        <GridItem colStart={3} colEnd={5} mt={"200px"}>
          <VStack>
            <Heading mb={4} as="h2" size="xl">
              Create a free account
            </Heading>
            <InputForm message="Name" />
            <InputForm message="Username" />
            <InputForm message="Email" />
            <InputForm message="Password" />
            <ButtonForm message="Sign Up" />
          </VStack>
        </GridItem>
      </Grid>
    </>
  );
};

export default SignUp;