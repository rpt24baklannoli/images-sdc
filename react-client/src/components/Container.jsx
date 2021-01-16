import React, {memo} from 'react'
/** @jsx jsx */ import { css, jsx } from '@emotion/core'
// import SliderContent from './SliderContent'



const Container = ({ content }) => (
  <div css={css`
      height: 608.931px;
      width: 794px;
      background-image: url('${content}');
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center;
      text-align: center;
    `}
  >
  {/* <img src={`${content}`}
    css={`
      max-width:100%;
      max-height:100%;
    `}
  /> */}
  </div>
)

export default memo(Container)