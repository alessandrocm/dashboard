import React, { FormEvent } from 'react'

import './Slider.scss';

export interface SliderProps {
  className?: string;
  label?: boolean;
  min?: number;
  max?: number;
  orient?: 'horizontal' | 'vertical';
  step?: number | 'any';
  value: number;
  onChange?: (value: number) => void
}

const defaultProps: SliderProps = {
  className: 'Slider',
  label: false,
  min: 0,
  max: 100,
  orient: 'horizontal',
  step: 1,
  value: 0,
}

export function Slider(sliderProps: SliderProps) {

  const props = Object.assign({}, defaultProps, sliderProps);
  const className = `${props.className} ${props.orient}`;

  const handleChange = (event: FormEvent<HTMLInputElement>) => {
    if (props.onChange) {
      const value = Number.parseFloat(event.currentTarget.value) || props.min || 0;
      props.onChange(value);
    }
  }

  return (
    <input
      className={className}
      onChange={handleChange}
      type="range"
      value={props.value}
      min={props.min}
      max={props.max}
      step={props.step} />
  );

}
