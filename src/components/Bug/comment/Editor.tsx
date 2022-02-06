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
      <ReactMarkdown children={value} />
    </>
  )
}

export default Editor;