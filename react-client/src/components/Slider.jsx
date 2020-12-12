/** @jsx jsx */
import React, { useState, useEffect, useRef } from 'react'
import { css, jsx } from '@emotion/react'
import SliderContent from './SliderContent.jsx'
import Slide from './Slide.jsx'
import Arrow from './Arrow.jsx'

/**
 * @function Slider
 */
const Slider = props => {
  const getWidth = () => window.innerWidth;
  console.log('WIDTH ', getWidth());

  const [state, setState] = useState({
    activeIndex: 0,
    translate: 0,
    transition: 0.45
  })

  const { translate, transition, activeIndex } = state

  const nextSlide = () => {
    console.log('WIDTH ', getWidth());
    if (activeIndex === props.slides.length - 1) {
      return setState({
        ...state,
        translate: 0,
        activeIndex: 0
      })
    }

    setState({
      ...state,
      activeIndex: activeIndex + 1,
      //translate: ((activeIndex + 1) * getWidth())
      translate: ((activeIndex + 1) * 794)
    })
  }

  const prevSlide = () => {
    if (activeIndex === 0) {
      return setState({
        ...state,
        //translate: (props.slides.length - 1) * getWidth(),
        translate: ((activeIndex + 1) * 794),
        activeIndex: props.slides.length - 1
      })
    }

    setState({
      ...state,
      activeIndex: activeIndex - 1,
      //translate: (activeIndex - 1) * getWidth()
      translate: ((activeIndex - 1) * 794)
    })
  }

  return (
    <div css={SliderCSS}>
       <SliderContent
        translate={translate}
        transition={transition}
        width={794 * props.slides.length}
      >
        {props.slides.map((slide, i) => (
          <Slide key={slide.image_url + i} content={slide.image_url} />
        ))}
      </SliderContent>

      <Arrow direction="left" handleClick={prevSlide} />
      <Arrow direction="right" handleClick={nextSlide} />
    </div>
  )
}


const SliderCSS = css`
  position: relative;
  height: 608.931px;
  width: 794px;
  margin: 0 auto;
  overflow: hidden;
`
export default Slider
