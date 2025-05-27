import React from 'react'
import { Link } from 'react-router-dom'
import Stage1View from './Stage1View'
// import { useState, useEffect } from 'react';
// import { Link, useLocation, useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <div>
        
        <Stage1View/>
        <div className='w-11/12 mx-auto '>
          <Link to='/add-university'>Add University</Link><br/>
          <Link to="/stage2/view">View Stage 2 Submissions </Link><br/>
          <Link to="/stage3/view">View Stage 3 Submissions </Link><br/>
          <Link to="/stage4/view">View Stage 4 Submissions </Link><br />
          <Link to="/stage5/view">View Stage 5 Submissions </Link>
        </div>
    </div>
  )
}

export default AdminDashboard