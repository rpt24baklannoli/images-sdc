import React from 'react'
/** @jsx jsx */ import { css, jsx } from '@emotion/react'

const slideStlye ={

}

// height: 100%;
// width: 100%;
// height: 100vh;
// width: 100vw;
//background-image: url('${content}');

//display: flexbox


const Slide = ({ content }) => (
  <div
    css={`
      height: 608.931px;
      width: 794px;
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center;
      text-align: center;
    `}
  >
  <img src={`${content}`}
    css={`
      max-width:100%;
      max-height:100%;
    `}
  />
  </div>
)

export default Slide