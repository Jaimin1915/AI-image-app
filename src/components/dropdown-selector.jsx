import React from "react"
import { useState, useRef, useEffect } from "react"
import { ChevronDown } from "lucide-react"

const DropdownSelector = ({ label, options, selectedOption, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full px-4 py-2 border-2 border-gray-500 rounded-xl text-gray-400 dark:text-red-100 transition-colors duration-200"
      >
        <span>{selectedOption || label}</span>
        <ChevronDown className="h-4 w-4 ml-2" />
      </button>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 border-2 text-gray-400 rounded-xl shadow-lg overflow-hidden">
          <div className="py-1 text-gray-100 border-b px-3">{label}</div>
          {options.map((option) => (
            <div
              key={option}
              onClick={() => {
                onSelect(option)
                setIsOpen(false)
              }}
              className="px-4 py-2 bg-[#161E2D] hover:bg-gray-300 hover:text-gray-800 cursor-pointer text-gray-200 transition-colors duration-200"
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default DropdownSelector
