import React from 'react'
import { CardMedia } from '@mui/material'

export default function MainPhoto({mainPhotoLink}) {
  return (
    <CardMedia
    component="img"
    alt={`${mainPhotoLink}-pic`}
    width="600"
    height="100%"
    image={
        'http://localhost:4000/' + `${mainPhotoLink}`
    }
/>
  )
}
