import { Box } from '@chakra-ui/react'
import { useState } from 'react'
import ReactMarkdown from 'react-markdown'

const markdown = `A paragraph with *emphasis* and **strong importance**.

> A block quote with ~strikethrough~ and a URL: https://reactjs.org.

* Lists
* [ ] todo
* [x] done

A table:

| a | b |
| - | - |
`

interface Props {
  text: string
}

const Editor = (props: Props) => {
  const { text } = props;
  const [value, setValue] = useState(text)
  return (
    <>
      <Box minHeight={"300px"} padding={4}>
      <ReactMarkdown children={value} />
      </Box>
      
    </>
  )
}

export default Editor;