import { Button } from "@chakra-ui/react"
import { useSelector } from "react-redux";

interface Props {
  message: string
}

const ButtonForm = (props: Props) => {

  function handleSelectors (state: { auth: { loading: boolean; }; }) {
    const loading = state.auth.loading;
    return { loading }
  }

  const store = useSelector(handleSelectors);

  const { message } = props
  return (
    <>
      <Button isLoading={store.loading} loadingText='Submitting' size={"lg"} type="submit">
        {message}
      </Button>
    </>
  )
}

export default ButtonForm;