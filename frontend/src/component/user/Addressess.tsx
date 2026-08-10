'use client'
import { useEffect, useState } from 'react'
import AddressCard from './AddressCard'
import AddressForm, { type AddressFormData } from './AddressForm'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { createAddress, deleteAddress, getAddresswithUserId, updateAddress } from '@/redux/user/address.type'
import { toast } from 'sonner'

interface Address {
  id: string
  label?: string
  type?: string
  fullName: string
  line1?: string
  addressLine1?: string
  line2?: string
  addressLine2?: string | null
  city: string
  state: string
  zip?: string
  postalCode?: string
  country: string
  phone: string
  landmark?: string | null
  isDefault: boolean
}

const showError = (error: unknown) => {
  toast.error(typeof error === 'string' ? error : 'something went wrong')
}

export default function Addressess() {
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<Address|null>(null)
  const { address } = useAppSelector((state)=>state.user)
  const addresses = address as Address[] | undefined
  const dispatch = useAppDispatch()

  useEffect(()=>{
    const getprofile =async()=>{
     await dispatch(getAddresswithUserId())
    }
    getprofile()
  },[dispatch, showForm])

  const handleAdd = async(data:AddressFormData) => {
    try {
      const res = await dispatch(createAddress(data)).unwrap()
      toast.success(res.message)
      setShowForm(false)
    } catch (error:unknown) {
      showError(error)
    }
  }

  const handleUpdate = async(data:AddressFormData) => {
    if (!editing?.id) return

    try {
      const res = await dispatch(updateAddress({
        id: editing.id,
        info: {
          fullName: data.fullName,
          phone: data.phone,
          add1: data.line1,
          add2: data.line2,
          city: data.city,
          state: data.state,
          country: data.country,
          pincode: data.zip,
          landmark: data.landmark,
        }
      })).unwrap()

      toast.success(res.message)
      setEditing(null)
      setShowForm(false)
    } catch (error:unknown) {
      showError(error)
    }
  }

  const handleDelete = async(id:string) => {
    try {
      const res = await dispatch(deleteAddress(id)).unwrap();
      toast.success(res.message)
    } catch (error:unknown) {
      showError(error)
    }
  }

  const handleSetDefault = () => {
  }

  const closeForm = () => { setShowForm(false); setEditing(null) }

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <p className="text-xs tracking-[0.16em] uppercase mb-0.5 font-medium bg-gradient-to-r from-black to-pink-500 bg-clip-text text-transparent">
            Account
          </p>
          <h1
            className="text-2xl font-bold bg-gradient-to-r from-zinc-900 via-zinc-700 to-pink-500 bg-clip-text text-transparent"
            style={{ fontFamily: "'Lora', serif" }}
          >
            Saved Addresses
          </h1>
        </div>

        <button
          onClick={() => { setEditing(null); setShowForm(true) }}
          className="flex items-center gap-2 px-5 py-2.5 text-white text-sm font-semibold rounded-xl active:scale-95 transition-all duration-150 shadow-md hover:shadow-lg"
          style={{ background: 'linear-gradient(135deg, #111111 0%, #ec4899 100%)' }}
        >
          <span className="text-base leading-none">+</span>
          Add Address
        </button>
      </div>

      {/* Modal */}
      {(showForm || editing) && (
        <div className="fixed inset-0 z-40 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={closeForm} />
          <div className="relative z-50 w-full max-w-md">
            <AddressForm
              initial={editing ?? undefined}
              onSubmit={editing ? handleUpdate : handleAdd}
              onCancel={closeForm}
            />
          </div>
        </div>
      )}

      {/* Empty state */}
      {addresses?.length === 0 && (
        <div className="text-center py-16 border-2 border-dashed border-pink-100 rounded-2xl bg-pink-50/30">
          <p className="text-gray-400 font-medium">No addresses saved yet.</p>
          <p className="text-gray-300 text-sm mt-1">Click &quot;Add Address&quot; to get started.</p>
        </div>
      )}

      {/* Cards */}
      <div className="grid gap-3">
        {addresses?.map((addr) => (
          <AddressCard
            key={addr.id}
            address={addr}
            onEdit={() => { setShowForm(false); setEditing(addr) }}
            onDelete={() => handleDelete(addr.id)}
            onSetDefault={() => handleSetDefault()}
          />
        ))}
      </div>

      {addresses && addresses.length > 0 && (
        <p className="text-center text-xs text-gray-300 mt-8">
          {addresses.length} address{addresses.length !== 1 ? 'es' : ''} saved
        </p>
      )}
    </div>
  )
}
