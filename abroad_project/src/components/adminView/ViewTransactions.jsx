import React from 'react'

const ViewTransactions = () => {
  return (
    <div className='p-6 w-[96%] mx-auto'>
        <table className='w-full border-collapse'>
            <caption className='text-xl md:text-2xl font-semibold text-center'>Transactions</caption>
            <thead>
                <tr className='bg-green-800 text-white'>
                    <th className='px-4 py-3 text-left'>S.No</th>
                    <th className='px-4 py-3 text-left'>Student Name</th>
                    <th className='px-4 py-3 text-left'>Date</th>
                    <th className='px-4 py-3 text-left'>Amount</th>
                    <th className='px-4 py-3 text-left'>Status</th>
                </tr>
            </thead>
            <tbody>
                <tr className='border-b border-gray-300 odd:bg-gray-50 bg-white hover:bg-gray-100'>
                    <td className='px-4 py-4'>1.</td>
                    <td className='px-4 py-4'>abc</td>
                    <td className='px-4 py-4'>2023-10-01</td>
                    <td className='px-4 py-4'>5000</td>
                    <td className='px-4 py-4'>Completed</td>
                </tr>
            </tbody>
        </table>
    </div>
  )
}

export default ViewTransactions