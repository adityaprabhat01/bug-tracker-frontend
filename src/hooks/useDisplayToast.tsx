import { useToast } from "@chakra-ui/react"
import { RootStateOrAny, useSelector } from "react-redux";

const useDisplayToast = (data: { title: string }) => {
  const toast = useToast();
  const received = useSelector((state: RootStateOrAny) => state.notification.received);

  
  toast({
    title: data.title,
    status: 'success',
    duration: 9000,
    isClosable: true,
  })
}

export default useDisplayToast;