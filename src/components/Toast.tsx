import { useToast } from "@chakra-ui/react"

const Toast = (data: { title: string }) => {
  const toast = useToast()
  
  return (
    <>
      {
        toast({
          title: data.title,
          status: 'success',
          duration: 9000,
          isClosable: true,
        })
      }
    </>
  )
}

export default Toast;