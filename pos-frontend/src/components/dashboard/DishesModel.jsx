import React, { useState } from "react";
import { motion } from "framer-motion";
import { IoMdClose } from "react-icons/io";
import { useMutation } from "@tanstack/react-query";
import { addItem } from "../../https";
import { enqueueSnackbar } from "notistack";

const DishesModel = ({ setIsItemModalOpen, categories = [] }) => {
  const [itemData, setItemData] = useState({
    categoryId: "",
    name: "",
    description: "",
    price: "",
    preparationTime: "",
    isVegetarian: false,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setItemData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...itemData,
      price: Number(itemData.price),
      preparationTime: Number(itemData.preparationTime) || 15,
    };
    itemMutation.mutate(payload);
  };

  const handleCloseModal = () => {
    setIsItemModalOpen(false);
  };

  const itemMutation = useMutation({
    mutationFn: (reqData) => addItem(reqData),
    onSuccess: (res) => {
      setIsItemModalOpen(false);
      enqueueSnackbar(res.data.message, { variant: "success" });
    },
    onError: (error) => {
      enqueueSnackbar(error.response?.data?.message || "Error adding item", {
        variant: "error",
      });
    },
  });

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={handleCloseModal}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3 }}
        className="bg-[#262626] p-6 rounded-lg shadow-lg w-[500px] max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-[#f5f5f5] text-xl font-semibold">Add Dish Menu</h2>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleCloseModal();
            }}
            className="text-[#f5f5f5] hover:text-red-500 transition-colors focus:outline-none"
          >
            <IoMdClose size={24} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Category */}
          <div>
            <label className="block text-[#ababab] mb-2 text-sm font-medium">
              Category
            </label>
            <select
              name="categoryId"
              value={itemData.categoryId}
              onChange={handleInputChange}
              className="w-full bg-[#1f1f1f] text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              required
            >
              <option value="" disabled>
                Select a category
              </option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Item Name */}
          <div>
            <label className="block text-[#ababab] mb-2 text-sm font-medium">
              Item Name *
            </label>
            <input
              type="text"
              name="name"
              value={itemData.name}
              onChange={handleInputChange}
              placeholder="e.g. Paneer Butter Masala"
              className="w-full bg-[#1f1f1f] text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400 placeholder-[#555]"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-[#ababab] mb-2 text-sm font-medium">
              Description
            </label>
            <textarea
              name="description"
              value={itemData.description}
              onChange={handleInputChange}
              placeholder="Short description of the item..."
              rows={3}
              className="w-full bg-[#1f1f1f] text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400 placeholder-[#555] resize-none"
            />
          </div>

          {/* Price & Prep Time */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[#ababab] mb-2 text-sm font-medium">
                Price (₹) *
              </label>
              <input
                type="number"
                name="price"
                value={itemData.price}
                onChange={handleInputChange}
                placeholder="0"
                className="w-full bg-[#1f1f1f] text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400 placeholder-[#555]"
                required
                min="0"
              />
            </div>
            <div>
              <label className="block text-[#ababab] mb-2 text-sm font-medium">
                Prep Time (min)
              </label>
              <input
                type="number"
                name="preparationTime"
                value={itemData.preparationTime}
                onChange={handleInputChange}
                placeholder="15"
                className="w-full bg-[#1f1f1f] text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400 placeholder-[#555]"
                min="0"
              />
            </div>
          </div>

          {/* Vegetarian Toggle */}
          <div className="flex items-center justify-between bg-[#1f1f1f] rounded-lg p-4">
            <label className="text-[#ababab] text-sm font-medium">
              Vegetarian
            </label>
            <button
              type="button"
              onClick={() =>
                setItemData((prev) => ({
                  ...prev,
                  isVegetarian: !prev.isVegetarian,
                }))
              }
              className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${
                itemData.isVegetarian ? "bg-green-500" : "bg-[#3a3a3a]"
              }`}
            >
              <div
                className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform duration-300 ${
                  itemData.isVegetarian ? "translate-x-7" : "translate-x-1"
                }`}
              />
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={itemMutation.isPending}
            className="w-full bg-yellow-400 text-gray-900 font-bold py-3 rounded-lg mt-6 hover:bg-yellow-500 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
          >

            {itemMutation.isPending ? "Adding..." : "Add Item"}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default DishesModel;