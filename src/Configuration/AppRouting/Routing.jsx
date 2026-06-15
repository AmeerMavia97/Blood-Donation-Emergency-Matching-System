import Home from '@/Screens/Home/Home'
import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

const Routing = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Home />} path='/' />
            </Routes>
        </BrowserRouter>
    )
}

export default Routing
