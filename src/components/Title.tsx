import { Heading } from "@chakra-ui/react";

const Title = (props: { title: string }) => {
  const { title } = props;
  return (
    <>
      <Heading
        _hover={{
          color: "#62728c",
          textDecoration: "none"
        }}
        as="h6"
        size="md"
        color={"#464f5d"}
      >
        {title}
      </Heading>
    </>
  );
};

export default Title;
