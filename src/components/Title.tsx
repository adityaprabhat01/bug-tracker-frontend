import { Heading } from "@chakra-ui/react";

const Title = (props: { title: string }) => {
  const { title } = props;
  return (
    <>
      <Heading as="h3" size="lg">
        {title}
      </Heading>
    </>
  );
};

export default Title;
