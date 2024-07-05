import React from 'react'
import Navbar from '../../components/ui/Navbar'
import { useLocation } from 'react-router'

const Category = () => {
    let { state } = useLocation();
  return (
    <>
        <Navbar/>

        <h1>{state.category?.name}</h1>
    </>
  )
}

export default Category