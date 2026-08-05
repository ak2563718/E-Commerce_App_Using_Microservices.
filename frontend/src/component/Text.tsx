'use client'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { getProfile } from '@/redux/user/user.Action';
import React, { useEffect } from 'react'

function Text() {
    const dispatch =useAppDispatch();
    const { user } = useAppSelector((state)=>state.user)

    useEffect(()=>{
        const getUser =async()=>{
            const response = await dispatch(getProfile()).unwrap()
            console.log(response.data)
        }
        getUser()
    },[])
  return (
    <div>Text</div>
  )
}

export default Text