import React from 'react'

import logo from '../assets/logo.png'
import { Link, NavLink } from 'react-router-dom'
import { RiHomeFill} from 'react-icons/ri'
import { IoIosArrowForward} from 'react-icons/io'
const isNotActiveStyle = 'flex items-center px-5 gap-3 text-gray-500 hover:text-black transition-all duration-200 ease-in-out capitalize';
const isActiveStyle = 'flex items-center px-5 gap-3 font-extrabold border-r-2 border-black  transition-all duration-200 ease-in-out capitalize';

import { categories } from '../utils/data'

const Sidebar = ({user, closeToggle}) => {
  const handleCloseSidebar = () => {
    if(closeToggle) closeToggle(false);
  }

  return (
    <div className='flex flex-col justify-between bg-white overflow-y-scroll h-full min-w-210 hide-scrollbar'>
      <div className="flex flex-col ">
        <Link to="/" onClick={handleCloseSidebar} className='flex px-5 gap-2 my-6 pt-1 w-190 items-center'>
          <img src={logo} alt="logo" className="w-full" />
        </Link>
        <div className="flex flex-col gap-5">
          <NavLink 
          onClick={handleCloseSidebar}
          className={({isActive}) => isActive ? isActiveStyle : isNotActiveStyle }
          to="/"  
          >
            <RiHomeFill />
            Home
          </NavLink>
          <h3 className="mt-2 px-5 text-base 2xl:text-xl">Discover cateogries</h3>
          {categories.slice(0, categories.length - 1).map(cat => (
              <NavLink 
              onClick={handleCloseSidebar}
              className={({isActive}) => isActive ? isActiveStyle : isNotActiveStyle }
              to={`/category/${cat.name}`} key={cat.name}>
                <img src={cat.image} alt='category-image' className='w-8 h-8 rounded-full shadow-md'/>
                  {cat.name}
              </NavLink>
          ))}
        </div>
      </div>
      {user && (
        <Link
          to={`user-profile/${user._id}`}
          className="flex my-5 mb-3 gap-2 p-2 items-center bg-white rounded-lg shadow-lg mx-3"
          onClick={handleCloseSidebar}
        >
          <img src={user.image} className="w-10 h-10 rounded-full" alt="user-profile" />
          <p>{user.userName}</p>
          {/* <IoIosArrowForward /> */}
        </Link>
      )}
    </div>
  )
}

export default Sidebar