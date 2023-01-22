import React from 'react'
import s from './Preloader.module.css'
import preloader from '../../../assets/Без названия.png'

const Preloader = (props) => {
  return <img className={s.load_image} src={preloader} alt="preloader" />
}

export default Preloader
