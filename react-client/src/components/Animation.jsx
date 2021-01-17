/** @jsx jsx */
import React, { useState, useEffect, useRef } from 'react'
import { css, jsx } from '@emotion/react'
import Slides from './Slides.jsx'
import Container from './Container.jsx'
import Arrow from './Arrow.jsx'

const Animation = props => {
  // const getWidth = () => window.innerWidth;
  // console.log('WIDTH ', getWidth());
  //console.log('PROPS: ', props.slides);
  const { slides } = props;

  const firstSlide = slides[0];
  const secondSlide = slides[1];
  const lastSlide = slides[slides.length-1];

  const [state, setState] = useState({
    currentSlide: 0,
    translate: 794,
    transition: 0.45,
    slidesArray: [lastSlide, firstSlide, secondSlide]
  })

  const { translate, transition, currentSlide, slidesArray } = state;

  const transitionRef = useRef();
  const sliderRef = useRef();

  useEffect(()=>{
    transitionRef.current = infiniteTransition;
  })

  useEffect(() => {
    const slider = sliderRef.current

    const smooth = (event) => {
      if (event.target.className.includes('Slides')) {
        transitionRef.current();
      }
    }

    const transitionEnd = slider.addEventListener('transitionend', smooth);

    return () => {
      slider.removeEventListener('transitionend', transitionEnd);
    }
  }, []);

  useEffect(() => {
    if (transition === 0){
      setState({ ...state, transition: 0.45 });
    }
  }, [transition]);

  let infiniteTransition = ()=> {
    let slidesArray = [];
    //if current slide is the last slide, the previous slide is last slide -1 and next slide is current slide + 1
    if(currentSlide === slides.length - 1){
      slidesArray = [ slides[slides.length - 2], lastSlide, firstSlide];
    }

    //if current slide is the first slide, previous slide is last slide and next slide is current slide + 1
    else if(currentSlide === 0){
      slidesArray = [ lastSlide, firstSlide, secondSlide];
    }

    //if current slide is in the middle, create an array of the previous last slide and the next two following it
    else slidesArray = slides.slice(currentSlide - 1, currentSlide + 2);

    setState({
      ...state,
      slidesArray,
      transition: 0,
      translate: 794
      //translate: getWidth()
    })

  }

  const nextSlide = ()=>{
    setState({
      ...state,
      translate: translate + 794,
      currentSlide: currentSlide === slides.length - 1 ? 0 : currentSlide + 1
    })
  }


  const prevSlide = () =>{
    setState({
      ...state,
      translate: 0,
      currentSlide: currentSlide === 0 ? slides.length - 1 : currentSlide - 1
    })
  }


  return (
    <div css={SliderCSS} ref={sliderRef}>
       <Slides

        translate={translate}
        transition={transition}
        width={794 * slidesArray.length}
      >
        {slidesArray.map((slide, i) => (
          <Container key={slide.image_url + i} content={slide.image_url} />
        ))}
      </Slides>

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
  white-space: nowrap;
`
export default Animation

