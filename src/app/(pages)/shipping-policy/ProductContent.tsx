import React from 'react'
import { FaTruck, FaClock, FaMapMarkerAlt, FaQuestionCircle } from "react-icons/fa";
function ProductContent() {
  return (
    <div className='pt-20 pb-4 bg-beige text-center text-dark-green '>
<h1 className='text-2xl py-3 lg:text-4xl font-medium uppercase tracking-wider  '> Shipping Policy</h1>
    <p className="text-lg tracking-wide">  We are committed to delivering our premium spices to your doorstep efficiently
       </p>
   
    <div className="min-h-screen bg-cover bg-center py-10 px-4 text-left">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-6 md:p-10">
        {/* Standard Shipping */}
        <div className="mb-6">
          <h2 className="flex items-center text-xl font-medium uppercase tracking-wide  mb-2">
            <FaTruck className="size-7 mr-2" /> Standard Shipping
          </h2>
          <div className="bg-yellow-50 p-4 rounded-md text-base font-light space-y-1">
            <p>• Free shipping for orders above ₹399</p>
            <p>• Delivery within 5-7 business days</p>
          </div>
        </div>

        {/* Order Processing */}
        <div className="mb-6">
          <h2 className="flex items-center text-xl font-medium uppercase tracking-wide  mb-2">
            <FaClock className="size-7 mr-2" /> Order Processing
          </h2>
          <div className="bg-yellow-50 p-4 rounded-md text-base font-light space-y-1">
            <p>• Orders are processed within 24-48 hours after payment confirmation</p>
            <p>• Shipping confirmation email with tracking details will be sent once dispatched</p>
          </div>
        </div>

        {/* Shipping Coverage */}
        <div className="mb-6">
          <h2 className="flex items-center text-xl font-medium uppercase tracking-wide  mb-2">
            <FaMapMarkerAlt className="size-7 mr-2" /> Shipping Coverage
          </h2>
          <div className="bg-yellow-50 p-4 rounded-md text-base font-light space-y-1">
            <p>• We currently deliver across India</p>
            <p>• Remote locations may require additional delivery time</p>
          </div>
        </div>

        <hr className="my-6" />

        {/* Need Help? */}
        <div>
          <h2 className="flex items-center text-xl font-medium uppercase tracking-wide  mb-2">
            <FaQuestionCircle className="size-7 mr-2" /> Need Help?
          </h2>
          <div className="bg-dark-green text-light p-4 rounded-md text-base font-light space-y-1">
            <p>
              For any shipping-related queries, please contact our customer service:
            </p>
            <p>
              <span className="font-medium">Email:</span>{" "}
              <a href="mailto:info@raisspices.com" className="text-primary underline">
                info@raisspices.com
              </a>
            </p>
            <p>
              <span className="font-medium">Phone:</span> +91 96056 93921
            </p>
            <p>
              <span className="font-medium">Hours:</span> Monday to Friday, 9:00 AM - 6:00 PM IST<br />
              Saturday, 10:00 AM - 4:00 PM IST
            </p>
          </div>
        </div>
      </div>
    </div>



    </div>
  )
}

export default ProductContent