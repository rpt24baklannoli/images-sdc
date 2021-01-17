// import React from 'react';
// /** @jsx jsx */ import styled from '@emotion/styled'

// const SliderContent = styled.div`
//   transform: translateX(-${props => props.translate}px);
//   transition: transform ease-out ${props => props.transition}s;
//   height: 100%;
//   width: ${props => props.width}px;
//   display: flex;
// `
// export default SliderContent
/** @jsx jsx */
import React from 'react'
import { css, jsx } from '@emotion/react'

const Slides = props => (
  <div className="Slides"
    css={css`
      transform: translateX(-${props.translate}px);
      transition: transform ease-out ${props.transition}s;
      height: 100%;
      width: ${props.width}px;
      display: flex;
    `}
  >
    {props.children}
  </div>
)

export default Slides