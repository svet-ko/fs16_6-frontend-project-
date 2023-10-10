import React, { useState } from 'react'
import useAppSelector from '../hooks/useAppSelector'
import useAppDispatch from '../hooks/useDispatch';
import { loginUserAsync } from '../redux/slices/userSlice';

const ProfilePage = () => {
  const currentUser = useAppSelector(state => state.usersReducer.currentUser);

  return (
    <div>
      {currentUser && (
        <div>
          <h2>Current user</h2>
          <p>{currentUser.email}</p>
          <p>{currentUser.name}</p>
          <img src={currentUser.avatar} alt="user avatar" />
        </div>
      )}
    </div>
  )
}

export default ProfilePage