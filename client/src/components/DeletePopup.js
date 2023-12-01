import React from "react";
import { SlClose } from "react-icons/sl";

const Popup = ({ className, onClose, onDelete }) => {
  return (
    <div className={className}>
      <h1 className="text-2xl">Confirm Delete</h1>
      <p className="text-[#3d3d3d]">Are you sure you want to delete user?</p>
      <div className="flex gap-5">
        <button
          className="px-3 py-2 text-sm bg-red-500 text-white rounded-3xl"
          onClick={() => {
            onDelete();
            onClose();
          }}
        >
          Yes, delete It
        </button>
        <button className="px-3 py-2 text-sm " onClick={onClose}>
          No, keep it
        </button>
      </div>
      <SlClose
        className="absolute top-5 right-6 text-lg cursor-pointer"
        onClick={() => {
          onClose();
        }}
      />
    </div>
  );
};

export default Popup;
