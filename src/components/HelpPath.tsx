import React from 'react'
import { coachCards } from '../constants'
import { line } from '../assets/icons'
import Button from './Button'

const MeetCoach = () => {
  return coachCards.map(({ id, title, text, img }) => (
    <div
      key={id}
      className='min-w-[58%] max-w-[58%] h-[620px] flex-shrink-0 px-4 flex flex-col justify-between'
      data-aos='fade-up'
      data-aos-duration='1000'
      data-aos-delay={id * 100}
    >
      {/* Top: Number + Line + Title */}
      <div className='flex items-center justify-between mt-10'>
        <div className='flex gap-8'>
          <h1 className='font-lato font-semibold text-[1.7rem] text-[#0E0E1D]'>{id}.</h1>
          <img src={line} alt="line" className='h-[4px] w-55 mt-6' />
        </div>
        <div>
          <h1 className='font-lato font-semibold text-[1.5rem] text-[#0E0E1D]'>{title}</h1>
        </div>
      </div>

      {/* Description */}
      <p className='text-[14px] text-[#333]'>{text}</p>

      {/* Image */}
      <div className="w-full h-[300px] overflow-hidden rounded-md">
        <img
          src={img}
          alt={title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      {/* Button */}
      <Button
        label="Meet Coach"
        bgcolor="bg-[#293C97]"
        color="text-white"
        className='py-4 mt-[-40px] w-full'
      />
    </div>
  ))
}

export default MeetCoach
