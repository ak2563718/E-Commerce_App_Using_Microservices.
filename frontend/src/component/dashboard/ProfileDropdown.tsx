"use client";
import { useAppSelector } from "@/redux/hooks";
import { ArrowDown, ArrowUp, Bell, ChevronDown, ChevronUp, Heart, Home, LogOut, Package, User, User2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function ProfileDropdown() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { user } = useAppSelector((state)=>state.auth)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm text-gray-500 transition-all duration-150 active:scale-95 hover:bg-pink-100 hover:text-pink-500"
      >
         <User2 className="w-4 h-4 mb-[2px] ml-[2px]"/>
       <span>
        Akash
       </span>
       {open ? (<ChevronUp className="w-4 h-4"/>):(<ChevronDown className="w-4 h-4"/>)}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-56 rounded-lg border bg-white shadow-xl" 
        style={{ boxShadow: '0 12px 40px rgba(233,30,140,0.14)', border: '1px solid rgba(233,30,140,0.08)' }}
        >
          <button className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-pink-50 hover:text-pink-600 transition-colors duration-100 group">
            <User className="w-4 h-4"/>
            My Profile
          </button>

          <button className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-pink-50 hover:text-pink-600 transition-colors duration-100 group">
            <Package className="w-4 h-4"/>
            My Orders
          </button>

          <button className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-pink-50 hover:text-pink-600 transition-colors duration-100 group">
            <Heart className="w-4 h-4"/>
            Wishlist
          </button>

          <button className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-pink-50 hover:text-pink-600 transition-colors duration-100 group">
            <Bell className="w-4 h-4"/>
            Notifications
          </button>

          <hr />

          <button className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-pink-50 hover:text-pink-600 transition-colors duration-100 group">
            <LogOut className="w-4 h-4"/>
            Logout
          </button>
        </div>
      )}
    </div>
  );
}