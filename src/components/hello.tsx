import * as React from "react"
import styled, { css } from 'styled-components'

interface Props {
  primary?: any
}

const StyledH1 = styled.h1`
  background: #eee;

  ${(props: Props) => props.primary && css`
    background: orange;
  `}
`

const Hello = () => <StyledH1 primary>Hello world</StyledH1>

export default Hello
