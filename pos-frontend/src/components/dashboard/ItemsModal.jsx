// import React, { useState } from "react";
// import { motion } from "framer-motion";
// import { IoMdClose } from "react-icons/io";
// import { useMutation } from "@tanstack/react-query";
// import { addItem } from "../../https";
// import { enqueueSnackbar } from "notistack";

// const AddItemModal = ({ setIsItemModalOpen, categories = [], onItemAdded }) => {

//   const defaultCategories = [
//     { id: "1", name: "Starters" },
//     { id: "2", name: "Main Course" },
//     { id: "3", name: "Beverages" },
//     { id: "4", name: "Soups" },
//     { id: "5", name: "Desserts" },
//     { id: "6", name: "Pizzas" },
//     { id: "7", name: "Alcoholic Drinks" },
//     { id: "8", name: "Salads" },
//   ];

//   const allCategories = categories.length > 0 ? categories : defaultCategories;

//   const [itemData, setItemData] = useState({
//     categoryId: "",
//     name: "",
//     description: "",
//     price: "",
//     image: "",
//     preparationTime: "",
//     isVegetarian: false,
//     calories: "",
//     tags: "",
//     displayOrder: "",
//   });

//   const handleInputChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setItemData((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   };

//   // Handle image file upload
//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setItemData((prev) => ({
//           ...prev,
//           image: reader.result, // Base64 string or URL
//         }));
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Validation
//     if (!itemData.categoryId) {
//       enqueueSnackbar("Please select a category", { variant: "warning" });
//       return;
//     }
//     if (!itemData.name.trim()) {
//       enqueueSnackbar("Item name is required", { variant: "warning" });
//       return;
//     }
//     if (!itemData.price) {
//       enqueueSnackbar("Price is required", { variant: "warning" });
//       return;
//     }

//     const payload = {
//       ...itemData,
//       price: Number(itemData.price),
//       preparationTime: Number(itemData.preparationTime) || 15,
//       calories: Number(itemData.calories) || 0,
//       displayOrder: Number(itemData.displayOrder) || 0,
//       tags: itemData.tags
//         ? itemData.tags.split(",").map((t) => t.trim())
//         : [],
//     };
//     itemMutation.mutate(payload);
//   };

//   const handleCloseModal = () => {
//     setIsItemModalOpen(false);
//   };

//   const itemMutation = useMutation({
//     mutationFn: (reqData) => addItem(reqData),
//     onSuccess: (res) => {
//       const { data } = res;

//       if (onItemAdded && itemData.categoryId) {
//         onItemAdded(itemData.categoryId, {
//           id: data?.item?.id,
//           name: itemData.name,
//           price: Number(itemData.price),
//           isVegetarian: itemData.isVegetarian,
//           description: itemData.description,
//           image: itemData.image,
//           preparationTime: Number(itemData.preparationTime) || 15,
//           calories: Number(itemData.calories) || 0,
//           tags: itemData.tags.split(",").map((t) => t.trim()),
//           ...(data?.item || {}),
//         });
//       }

//       setIsItemModalOpen(false);
//       enqueueSnackbar(data.message || "Item added successfully!", { 
//         variant: "success" 
//       });

//       // Reset form
//       setItemData({
//         categoryId: "",
//         name: "",
//         description: "",
//         price: "",
//         image: "",
//         preparationTime: "",
//         isVegetarian: false,
//         calories: "",
//         tags: "",
//         displayOrder: "",
//       });
//     },
//     onError: (error) => {
//       const { data } = error.response || {};
//       enqueueSnackbar(data?.message || "Failed to add item", { variant: "error" });
//       console.log(error);
//     },
//   });

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <motion.div
//         initial={{ opacity: 0, scale: 0.9 }}
//         animate={{ opacity: 1, scale: 1 }}
//         exit={{ opacity: 0, scale: 0.9 }}
//         transition={{ duration: 0.3, ease: "easeInOut" }}
//         className="bg-[#262626] p-6 rounded-lg shadow-lg w-[500px] max-h-[90vh] overflow-y-auto"
//       >
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-[#f5f5f5] text-xl font-semibold">Add Menu Item</h2>
//           <button 
//             onClick={handleCloseModal} 
//             className="text-[#f5f5f5] hover:text-red-500 transition-colors"
//             type="button"
//           >
//             <IoMdClose size={24} />
//           </button>
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-4 mt-6">

//           {/* Category Select */}
//           <div>
//             <label className="block text-[#ababab] mb-2 text-sm font-medium">
//               Category *
//             </label>
//             <div className="flex items-center rounded-lg px-4 bg-[#1f1f1f]">
//               <select
//                 name="categoryId"
//                 value={itemData.categoryId}
//                 onChange={handleInputChange}
//                 className="bg-transparent flex-1 text-white focus:outline-none py-4 appearance-none"
//                 required
//               >
//                 <option value="" disabled className="bg-[#1f1f1f]">
//                   Select a category
//                 </option>
//                 {allCategories.map((cat) => (
//                   <option key={cat.id} value={cat.id} className="bg-[#1f1f1f]">
//                     {cat.name}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>

//           <div>
//             <label className="block text-[#ababab] mb-2 text-sm font-medium">
//               Item Name *
//             </label>
//             <div className="flex items-center rounded-lg p-4 bg-[#1f1f1f]">
//               <input 
//                 type="text" 
//                 name="name" 
//                 value={itemData.name} 
//                 onChange={handleInputChange}
//                 placeholder="e.g. Paneer Butter Masala"
//                 className="bg-transparent flex-1 text-white focus:outline-none placeholder-[#555]" 
//                 required 
//               />
//             </div>
//           </div>

//           <div>
//             <label className="block text-[#ababab] mb-2 text-sm font-medium">Description</label>
//             <div className="flex items-center rounded-lg p-4 bg-[#1f1f1f]">
//               <textarea 
//                 name="description" 
//                 value={itemData.description} 
//                 onChange={handleInputChange}
//                 placeholder="Short description of the item..."
//                 rows={2}
//                 className="bg-transparent flex-1 text-white focus:outline-none placeholder-[#555] resize-none" 
//               />
//             </div>
//           </div>

//           {/* Image Upload */}
//           <div>
//             <label className="block text-[#ababab] mb-2 text-sm font-medium">
//               Item Image
//             </label>
//             <div className="flex items-center rounded-lg p-4 bg-[#1f1f1f]">
//               <input 
//                 type="file" 
//                 name="image" 
//                 onChange={handleImageChange}
//                 accept="image/*"
//                 className="bg-transparent flex-1 text-white focus:outline-none placeholder-[#555] file:bg-yellow-400 file:text-gray-900 file:border-0 file:rounded file:px-3 file:py-1 file:font-semibold file:cursor-pointer" 
//               />
//             </div>
//             {itemData.image && (
//               <div className="mt-2 text-xs text-[#ababab]">
//                 ✓ Image selected
//               </div>
//             )}
//           </div>

//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label className="block text-[#ababab] mb-2 text-sm font-medium">
//                 Price (₹) *
//               </label>
//               <div className="flex items-center rounded-lg p-4 bg-[#1f1f1f]">
//                 <input 
//                   type="number" 
//                   name="price" 
//                   value={itemData.price} 
//                   onChange={handleInputChange}
//                   placeholder="0" 
//                   className="bg-transparent flex-1 text-white focus:outline-none placeholder-[#555]" 
//                   required 
//                   min="0" 
//                   step="0.01"
//                 />
//               </div>
//             </div>
//             <div>
//               <label className="block text-[#ababab] mb-2 text-sm font-medium">Prep Time (min)</label>
//               <div className="flex items-center rounded-lg p-4 bg-[#1f1f1f]">
//                 <input 
//                   type="number" 
//                   name="preparationTime" 
//                   value={itemData.preparationTime} 
//                   onChange={handleInputChange}
//                   placeholder="15" 
//                   className="bg-transparent flex-1 text-white focus:outline-none placeholder-[#555]" 
//                   min="0" 
//                 />
//               </div>
//             </div>
//           </div>

//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label className="block text-[#ababab] mb-2 text-sm font-medium">Calories</label>
//               <div className="flex items-center rounded-lg p-4 bg-[#1f1f1f]">
//                 <input 
//                   type="number" 
//                   name="calories" 
//                   value={itemData.calories} 
//                   onChange={handleInputChange}
//                   placeholder="0" 
//                   className="bg-transparent flex-1 text-white focus:outline-none placeholder-[#555]" 
//                   min="0" 
//                 />
//               </div>
//             </div>
//             <div>
//               <label className="block text-[#ababab] mb-2 text-sm font-medium">Display Order</label>
//               <div className="flex items-center rounded-lg p-4 bg-[#1f1f1f]">
//                 <input 
//                   type="number" 
//                   name="displayOrder" 
//                   value={itemData.displayOrder} 
//                   onChange={handleInputChange}
//                   placeholder="0" 
//                   className="bg-transparent flex-1 text-white focus:outline-none placeholder-[#555]" 
//                   min="0" 
//                 />
//               </div>
//             </div>
//           </div>

//           <div>
//             <label className="block text-[#ababab] mb-2 text-sm font-medium">
//               Tags <span className="text-[#555] text-xs">(comma separated)</span>
//             </label>
//             <div className="flex items-center rounded-lg p-4 bg-[#1f1f1f]">
//               <input 
//                 type="text" 
//                 name="tags" 
//                 value={itemData.tags} 
//                 onChange={handleInputChange}
//                 placeholder="spicy, bestseller, new"
//                 className="bg-transparent flex-1 text-white focus:outline-none placeholder-[#555]" 
//               />
//             </div>
//           </div>

//           {/* Vegetarian Toggle */}
//           <div className="flex items-center justify-between rounded-lg p-4 bg-[#1f1f1f]">
//             <label className="text-[#ababab] text-sm font-medium">Vegetarian</label>
//             <div
//               onClick={() => setItemData((prev) => ({ ...prev, isVegetarian: !prev.isVegetarian }))}
//               className={`relative w-12 h-6 rounded-full cursor-pointer transition-colors duration-300 ${itemData.isVegetarian ? "bg-green-500" : "bg-[#3a3a3a]"}`}
//               role="switch"
//               aria-checked={itemData.isVegetarian}
//             >
//               <div 
//                 className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform duration-300 ${itemData.isVegetarian ? "translate-x-7" : "translate-x-1"}`} 
//               />
//             </div>
//           </div>

//           <button 
//             type="submit" 
//             disabled={itemMutation.isPending}
//             className="w-full rounded-lg mt-4 mb-2 py-3 text-lg bg-yellow-400 text-gray-900 font-bold disabled:opacity-60 disabled:cursor-not-allowed hover:bg-yellow-500 transition-colors"
//           >
//             {itemMutation.isPending ? "Adding Item..." : "Add Item"}
//           </button>
//         </form>
//       </motion.div>
//     </div>
//   );
// };

// export default AddItemModal;


import React, { useState } from "react";
import { motion } from "framer-motion";
import { IoMdClose } from "react-icons/io";
import { useMutation } from "@tanstack/react-query";
import { addItem } from "../../https";
import { enqueueSnackbar } from "notistack";

const AddItemModal = ({ setIsItemModalOpen, categories = [], onItemAdded }) => {

  const defaultCategories = [
    { id: "1", name: "Starters" },
    { id: "2", name: "Main Course" },
    { id: "3", name: "Beverages" },
    { id: "4", name: "Soups" },
    { id: "5", name: "Desserts" },
    { id: "6", name: "Pizzas" },
    { id: "7", name: "Alcoholic Drinks" },
    { id: "8", name: "Salads" },
  ];

  const allCategories = categories.length > 0 ? categories : defaultCategories;

  const [itemData, setItemData] = useState({
    categoryId: "",
    name: "",
    description: "",
    price: "",
    image: null, // Changed to null for file handling
    preparationTime: "",
    isVegetarian: false,
    calories: "",
    tags: "",
    displayOrder: "",
  });

  const [imagePreview, setImagePreview] = useState("");

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setItemData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle image file upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        enqueueSnackbar("Image size must be less than 5MB", { variant: "warning" });
        return;
      }

      // Validate file type
      if (!file.type.startsWith("image/")) {
        enqueueSnackbar("Please select a valid image file", { variant: "warning" });
        return;
      }

      setItemData((prev) => ({
        ...prev,
        image: file,
      }));

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!itemData.categoryId) {
      enqueueSnackbar("Please select a category", { variant: "warning" });
      return;
    }
    if (!itemData.name.trim()) {
      enqueueSnackbar("Item name is required", { variant: "warning" });
      return;
    }
    if (!itemData.price) {
      enqueueSnackbar("Price is required", { variant: "warning" });
      return;
    }

    // Create FormData for file upload
    const formData = new FormData();
    formData.append("categoryId", itemData.categoryId);
    formData.append("name", itemData.name.trim());
    formData.append("description", itemData.description.trim());
    formData.append("price", Number(itemData.price));
    formData.append("preparationTime", Number(itemData.preparationTime) || 15);
    formData.append("isVegetarian", itemData.isVegetarian);
    formData.append("calories", Number(itemData.calories) || 0);
    formData.append("displayOrder", Number(itemData.displayOrder) || 0);

  
    const tagsArray = itemData.tags
      ? itemData.tags.split(",").map((t) => t.trim()).filter(t => t !== "")
      : [];
    formData.append("tags", JSON.stringify(tagsArray));

    
    if (itemData.image) {
      formData.append("image", itemData.image);
    }

    console.log("Submitting form data...", {
      categoryId: itemData.categoryId,
      name: itemData.name,
      price: itemData.price,
      hasImage: !!itemData.image,
      tags: tagsArray,
    });

    itemMutation.mutate(formData);
  };

  const handleCloseModal = () => {
    // Reset form on close
    setItemData({
      categoryId: "",
      name: "",
      description: "",
      price: "",
      image: null,
      preparationTime: "",
      isVegetarian: false,
      calories: "",
      tags: "",
      displayOrder: "",
    });
    setImagePreview("");
    setIsItemModalOpen(false);
  };

  const itemMutation = useMutation({
    mutationFn: (reqData) => addItem(reqData),
    onSuccess: (res) => {
      const { data } = res;

      console.log("Success response:", data);

      if (onItemAdded && itemData.categoryId) {
        const tagsArray = itemData.tags
          ? itemData.tags.split(",").map((t) => t.trim()).filter(t => t !== "")
          : [];

        onItemAdded(itemData.categoryId, {
          id: data?.item?.id,
          name: itemData.name,
          price: Number(itemData.price),
          isVegetarian: itemData.isVegetarian,
          description: itemData.description,
          image: imagePreview || data?.item?.image,
          preparationTime: Number(itemData.preparationTime) || 15,
          calories: Number(itemData.calories) || 0,
          tags: tagsArray,
          ...(data?.item || {}),
        });
      }

      // Reset form
      setItemData({
        categoryId: "",
        name: "",
        description: "",
        price: "",
        image: null,
        preparationTime: "",
        isVegetarian: false,
        calories: "",
        tags: "",
        displayOrder: "",
      });
      setImagePreview("");

      setIsItemModalOpen(false);
      enqueueSnackbar(data?.message || "Item added successfully!", { 
        variant: "success" 
      });
    },
    onError: (error) => {
      console.error("Error object:", error);
      console.error("Error response:", error?.response);

      let errorMessage = "Failed to add item";

      if (error?.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error?.response?.data?.error) {
        errorMessage = error.response.data.error;
      } else if (error?.message) {
        errorMessage = error.message;
      }

      console.error("Final error message:", errorMessage);
      enqueueSnackbar(errorMessage, { variant: "error" });
    },
  });

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="bg-[#262626] p-6 rounded-lg shadow-lg w-[500px] max-h-[90vh] overflow-y-auto"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-[#f5f5f5] text-xl font-semibold">Add Menu Item</h2>
          <button 
            onClick={handleCloseModal} 
            className="text-[#f5f5f5] hover:text-red-500 transition-colors"
            type="button"
          >
            <IoMdClose size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 mt-6">

          {/* Category Select */}
          <div>
            <label className="block text-[#ababab] mb-2 text-sm font-medium">
              Category *
            </label>
            <div className="flex items-center rounded-lg px-4 bg-[#1f1f1f]">
              <select
                name="categoryId"
                value={itemData.categoryId}
                onChange={handleInputChange}
                className="bg-transparent flex-1 text-white focus:outline-none py-4 appearance-none cursor-pointer"
                required
              >
                <option value="" disabled className="bg-[#1f1f1f]">
                  Select a category
                </option>
                {allCategories.map((cat) => (
                  <option key={cat.id} value={cat.id} className="bg-[#1f1f1f] text-white">
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[#ababab] mb-2 text-sm font-medium">
              Item Name *
            </label>
            <div className="flex items-center rounded-lg p-4 bg-[#1f1f1f]">
              <input 
                type="text" 
                name="name" 
                value={itemData.name} 
                onChange={handleInputChange}
                placeholder="e.g. Paneer Butter Masala"
                className="bg-transparent flex-1 text-white focus:outline-none placeholder-[#555]" 
                required 
              />
            </div>
          </div>

          <div>
            <label className="block text-[#ababab] mb-2 text-sm font-medium">Description</label>
            <div className="flex items-center rounded-lg p-4 bg-[#1f1f1f]">
              <textarea 
                name="description" 
                value={itemData.description} 
                onChange={handleInputChange}
                placeholder="Short description of the item..."
                rows={2}
                className="bg-transparent flex-1 text-white focus:outline-none placeholder-[#555] resize-none" 
              />
            </div>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-[#ababab] mb-2 text-sm font-medium">
              Item Image
            </label>
            <div className="flex items-center rounded-lg p-4 bg-[#1f1f1f]">
              <input 
                type="file" 
                name="image" 
                onChange={handleImageChange}
                accept="image/*"
                className="bg-transparent flex-1 text-white focus:outline-none placeholder-[#555] file:bg-yellow-400 file:text-gray-900 file:border-0 file:rounded file:px-3 file:py-1 file:font-semibold file:cursor-pointer hover:file:bg-yellow-500" 
              />
            </div>
            {imagePreview && (
              <div className="mt-3 rounded-lg overflow-hidden bg-[#1f1f1f] p-2">
                <img 
                  src={imagePreview} 
                  alt="Preview" 
                  className="w-full h-24 object-cover rounded"
                />
                <p className="text-xs text-[#ababab] mt-1">✓ {itemData.image?.name}</p>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[#ababab] mb-2 text-sm font-medium">
                Price (₹) *
              </label>
              <div className="flex items-center rounded-lg p-4 bg-[#1f1f1f]">
                <input 
                  type="number" 
                  name="price" 
                  value={itemData.price} 
                  onChange={handleInputChange}
                  placeholder="0" 
                  className="bg-transparent flex-1 text-white focus:outline-none placeholder-[#555]" 
                  required 
                  min="0" 
                  step="0.01"
                />
              </div>
            </div>
            <div>
              <label className="block text-[#ababab] mb-2 text-sm font-medium">Prep Time (min)</label>
              <div className="flex items-center rounded-lg p-4 bg-[#1f1f1f]">
                <input 
                  type="number" 
                  name="preparationTime" 
                  value={itemData.preparationTime} 
                  onChange={handleInputChange}
                  placeholder="15" 
                  className="bg-transparent flex-1 text-white focus:outline-none placeholder-[#555]" 
                  min="0" 
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[#ababab] mb-2 text-sm font-medium">Calories</label>
              <div className="flex items-center rounded-lg p-4 bg-[#1f1f1f]">
                <input 
                  type="number" 
                  name="calories" 
                  value={itemData.calories} 
                  onChange={handleInputChange}
                  placeholder="0" 
                  className="bg-transparent flex-1 text-white focus:outline-none placeholder-[#555]" 
                  min="0" 
                />
              </div>
            </div>
            <div>
              <label className="block text-[#ababab] mb-2 text-sm font-medium">Display Order</label>
              <div className="flex items-center rounded-lg p-4 bg-[#1f1f1f]">
                <input 
                  type="number" 
                  name="displayOrder" 
                  value={itemData.displayOrder} 
                  onChange={handleInputChange}
                  placeholder="0" 
                  className="bg-transparent flex-1 text-white focus:outline-none placeholder-[#555]" 
                  min="0" 
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-[#ababab] mb-2 text-sm font-medium">
              Tags <span className="text-[#555] text-xs">(comma separated)</span>
            </label>
            <div className="flex items-center rounded-lg p-4 bg-[#1f1f1f]">
              <input 
                type="text" 
                name="tags" 
                value={itemData.tags} 
                onChange={handleInputChange}
                placeholder="spicy, bestseller, new"
                className="bg-transparent flex-1 text-white focus:outline-none placeholder-[#555]" 
              />
            </div>
          </div>

          {/* Vegetarian Toggle */}
          <div className="flex items-center justify-between rounded-lg p-4 bg-[#1f1f1f]">
            <label className="text-[#ababab] text-sm font-medium">Vegetarian</label>
            <div
              onClick={() => setItemData((prev) => ({ ...prev, isVegetarian: !prev.isVegetarian }))}
              className={`relative w-12 h-6 rounded-full cursor-pointer transition-colors duration-300 ${itemData.isVegetarian ? "bg-green-500" : "bg-[#3a3a3a]"}`}
              role="switch"
              aria-checked={itemData.isVegetarian}
            >
              <div 
                className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform duration-300 ${itemData.isVegetarian ? "translate-x-7" : "translate-x-1"}`} 
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={itemMutation.isPending}
            className="w-full rounded-lg mt-4 mb-2 py-3 text-lg bg-yellow-400 text-gray-900 font-bold disabled:opacity-60 disabled:cursor-not-allowed hover:bg-yellow-500 transition-colors"
          >
            {itemMutation.isPending ? "Adding Item..." : "Add Item"}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default AddItemModal;