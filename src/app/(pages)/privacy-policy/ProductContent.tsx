import React from 'react'

function ProductContent() {
  return (
    <div className="bg-beige">

  
    <div className='pt-20 px-4 pb-4 text-dark-green text-center'>
    <h1 className='text-2xl py-3 lg:text-4xl font-medium uppercase tracking-wider'>Privacy Policy</h1>
    <p className='text-lg tracking-wide'>Last Updated: 04th March 2025</p>
    <div className="bg-white border border-dark-green rounded-md p-6 md:p-10 my-4 text-left max-w-5xl mx-auto">
      <p className="text-lg mb-6">
        At RaisSpice, we prioritize the protection of your personal information. This policy outlines how we handle your data
        when you use our website or make purchases from our online store.
      </p>

      <h3 className="text-xl font-light text-dark-green mb-4">Information We Collect</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
        <div>  
          <h4 className="text-2xl font-medium mb-2">Account Information</h4>
          <ul className="list-disc list-inside space-y-1">
            <li>Name and contact details</li>
            <li>Email address</li>
            <li>Delivery address</li>
            <li>Phone number</li>
          </ul>
        </div>
        <div>
          <h4 className="text-2xl font-medium  mb-2">Technical Data</h4>
          <ul className="list-disc list-inside space-y-1">
            <li>Device information</li>
            <li>Browser type</li>
            <li>IP address</li>
            <li>Cookies data</li>
          </ul>
        </div>
      </div>

      {/* How We Use Your Information */}
      <h3 className="text-2xl font-medium  mb-2">How We Use Your Information</h3>
      <ul className="list-disc list-inside  space-y-1 mb-6">
        <li>Processing and delivering your orders</li>
        <li>Sending order confirmations and updates</li>
        <li>Improving our products and services</li>
        <li>Providing customer support</li>
        <li>Sending promotional offers (with your consent)</li>
      </ul>

      {/* Data Protection */}
      <h3 className="text-2xl  font-medium mb-2">Data Protection</h3>
      <p className="text-gray-700 mb-4">
        We implement appropriate security measures to protect your personal information and ensure its handled in accordance with applicable data protection laws.
      </p>

      <div className="bg-dark-green text-light px-4 py-3 rounded-md text-lg">
        For any privacy-related queries, please contact us at: <a href="mailto:info@raisspices.com" className="underline">info@raisspices.com</a>
      </div>
    </div>
  </div>
</div>
  )
}

export default ProductContent