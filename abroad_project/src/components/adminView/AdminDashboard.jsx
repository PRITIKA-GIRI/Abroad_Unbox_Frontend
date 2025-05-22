import React from 'react'
import { Link } from 'react-router-dom'
import Stage1View from './Stage1View'
// import { useState, useEffect } from 'react';
// import { Link, useLocation, useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <div>
        
        <Stage1View/>
        <Link to="/stage2/view">View Stage 2 Submissions </Link>
        <Link to="/stage3/view">View Stage 3 Submissions </Link>
    </div>
  )
}

export default AdminDashboard