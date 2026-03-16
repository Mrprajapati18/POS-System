import React from "react";
import { FaCheckDouble, FaLongArrowAltRight } from "react-icons/fa";
import { FaCircle } from "react-icons/fa";
import { formatDateAndTime, getAvatarName } from "../../utils/index";

const OrderCard = ({ key, order }) => {
  console.log(order);
  return (
    <div key={key} className="w-[500px] bg-[#262626] p-4 rounded-lg mb-4">
      <div className="flex items-center gap-5">
        <button className="bg-[#f6b100] p-3 text-xl font-bold rounded-lg">
          {/* {getAvatarName(order.customerDetails.name)} */}
          {/* Durgesh 10 March */}
          {getAvatarName(order?.customerDetails?.name)}  

        </button>
        <div className="flex items-center justify-between w-[100%]">
          <div className="flex flex-col items-start gap-1">
            <h1 className="text-[#f5f5f5] text-lg font-semibold tracking-wide">
             {order?.customerDetails?.name}
            </h1>
            <p className="text-[#ababab] text-sm">#{Math.floor(new Date(order.orderDate).getTime())} / Dine in</p>
            <p className="text-[#ababab] text-sm">Table <FaLongArrowAltRight className="text-[#ababab] ml-2 inline" /> {order?.table?.tableNo}</p>
          </div>
          <div className="flex flex-col items-end gap-2">
            {order.orderStatus === "Ready" ? (
              <>
                <p className="text-green-600 bg-[#2e4a40] px-2 py-1 rounded-lg">
                  <FaCheckDouble className="inline mr-2" /> {order.orderStatus}
                </p>
                <p className="text-[#ababab] text-sm">
                  <FaCircle className="inline mr-2 text-green-600" /> Ready to
                  serve
                </p>
              </>
            ) : (
              <>
                <p className="text-yellow-600 bg-[#4a452e] px-2 py-1 rounded-lg">
                  <FaCircle className="inline mr-2" /> {order.orderStatus}
                </p>
                <p className="text-[#ababab] text-sm">
                  <FaCircle className="inline mr-2 text-yellow-600" /> Preparing your order
                </p>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center mt-4 text-[#ababab]">
        <p>{formatDateAndTime(order.orderDate)}</p>
        <p>{order.items.length} Items</p>
      </div>
      <hr className="w-full mt-4 border-t-1 border-gray-500" />
      <div className="flex items-center justify-between mt-4">
        <h1 className="text-[#f5f5f5] text-lg font-semibold">Total</h1>
        <p className="text-[#f5f5f5] text-lg font-semibold">₹{order.bills.totalWithTax.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default OrderCard;





// import React from "react";
// import { FaCheckDouble, FaLongArrowAltRight } from "react-icons/fa";
// import { FaCircle } from "react-icons/fa";
// import { formatDateAndTime, getAvatarName } from "../../utils/index";

// const OrderCard = ({ key, order }) => {
//   // Safe access to all nested properties with fallback values
//   const customerName = order?.customerDetails?.name || "Customer";
//   const orderDate = order?.orderDate || new Date().toISOString();
//   const tableNo = order?.table?.tableNo || "N/A";
//   const orderStatus = order?.orderStatus || "Pending";
//   const itemsCount = order?.items?.length || 0;
//   const totalAmount = order?.bills?.totalWithTax || 0;

//   // Generate order ID from date
//   const orderId = Math.floor(new Date(orderDate).getTime());

//   console.log(order);

//   return (
//     <div key={key} className="w-[500px] bg-[#262626] p-4 rounded-lg mb-4">
//       {/* Header Section */}
//       <div className="flex items-center gap-5">
//         {/* Avatar Button */}
//         <button className="bg-[#f6b100] p-3 text-xl font-bold rounded-lg flex-shrink-0">
//           {getAvatarName(customerName)}
//         </button>

//         {/* Customer Info and Status */}
//         <div className="flex items-center justify-between w-[100%]">
//           {/* Left: Customer Details */}
//           <div className="flex flex-col items-start gap-1">
//             <h1 className="text-[#f5f5f5] text-lg font-semibold tracking-wide">
//               {customerName}
//             </h1>
//             <p className="text-[#ababab] text-sm">#{orderId} / Dine in</p>
//             <p className="text-[#ababab] text-sm">
//               Table{" "}
//               <FaLongArrowAltRight className="text-[#ababab] ml-2 inline" />{" "}
//               {tableNo}
//             </p>
//           </div>

//           {/* Right: Order Status */}
//           <div className="flex flex-col items-end gap-2">
//             {orderStatus === "Ready" ? (
//               <>
//                 <p className="text-green-600 bg-[#2e4a40] px-2 py-1 rounded-lg">
//                   <FaCheckDouble className="inline mr-2" /> {orderStatus}
//                 </p>
//                 <p className="text-[#ababab] text-sm">
//                   <FaCircle className="inline mr-2 text-green-600" /> Ready to
//                   serve
//                 </p>
//               </>
//             ) : (
//               <>
//                 <p className="text-yellow-600 bg-[#4a452e] px-2 py-1 rounded-lg">
//                   <FaCircle className="inline mr-2" /> {orderStatus}
//                 </p>
//                 <p className="text-[#ababab] text-sm">
//                   <FaCircle className="inline mr-2 text-yellow-600" /> Preparing
//                   your order
//                 </p>
//               </>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Date and Items Count */}
//       <div className="flex justify-between items-center mt-4 text-[#ababab]">
//         <p>{formatDateAndTime(orderDate)}</p>
//         <p>{itemsCount} Items</p>
//       </div>

//       {/* Divider */}
//       <hr className="w-full mt-4 border-t-1 border-gray-500" />

//       {/* Total Amount */}
//       <div className="flex items-center justify-between mt-4">
//         <h1 className="text-[#f5f5f5] text-lg font-semibold">Total</h1>
//         <p className="text-[#f5f5f5] text-lg font-semibold">
//           ₹{totalAmount.toFixed(2)}
//         </p>
//       </div>
//     </div>
//   );
// };

// export default OrderCard;