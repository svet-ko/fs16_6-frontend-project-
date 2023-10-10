import React, { useState } from 'react'
import useAppSelector from '../hooks/useAppSelector'

const ProfilePage = () => {
  const currentUser = useAppSelector(state => state.usersReducer.currentUser);
  console.log(currentUser);

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