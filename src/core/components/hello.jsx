import React from "react"
import styled, { css } from 'styled-components'
import Button from 'material-ui-next/Button'

const StyledH1 = styled.h1`
  background: #eee;

  ${props => props.primary && css`
    background: orange;
  `}
`

const Hello = () => <div><StyledH1 primary>Hello world</StyledH1><Button raised color="primary">Hello</Button></div>

export default Hello
