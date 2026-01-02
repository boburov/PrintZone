'use client';

import { useState } from 'react';
import useStore from '../store/store';
import axios from 'axios';

interface ModalProps {
  darkMode: boolean;
  onClose: () => void;
}

export default function Modal({ darkMode, onClose }: ModalProps) {
  const [contact, setContact] = useState('');
  const [error, setError] = useState('');
  const [isConfirming, setIsConfirming] = useState(false);
  const { totalPrice, copies, paperType, coverType, fileName } = useStore();

  const handleConfirm = () => {
    if (!contact) {
      setError('Please enter your contact information');
      return;
    }
    setError('');
    setIsConfirming(true);
  };

  const handleSubmit = async () => {
    const orderDetails = {
      fileName,
      totalPrice,
      copies,
      paperType,
      coverType,
      contact,
    };

    try {
      await axios.post('/api/send-order', orderDetails);
      onClose();
    } catch (error) {
      console.error('Error sending order:', error);
      setError('Failed to send order. Please try again.');
      setIsConfirming(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className={`rounded-xl shadow p-6 border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
        <h2 className="text-lg font-semibold mb-4">Confirm Order</h2>
        {isConfirming ? (
          <div>
            <p>Are you sure this is the correct contact information?</p>
            <p className="font-bold my-2">{contact}</p>
            <div className="mt-6 flex justify-end gap-4">
              <button onClick={() => setIsConfirming(false)} className={`px-6 py-3 rounded-xl border ${darkMode ? 'border-gray-600' : 'border-gray-300'}`}>
                No, Edit
              </button>
              <button onClick={handleSubmit} className="bg-[#FF500B] hover:bg-[#e44907] px-6 py-3 rounded-xl font-bold text-white">
                Yes, Send
              </button>
            </div>
          </div>
        ) : (
          <div>
            <p>Please enter your phone number or Telegram username to place the order.</p>
            <div className="mt-4">
              <label htmlFor="contact" className="font-medium">
                Phone Number or Telegram Username
              </label>
              <input
                id="contact"
                type="text"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                className={`w-full h-12 mt-2 border rounded-lg px-4 ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
              />
              {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            </div>
            <div className="mt-6 flex justify-end gap-4">
              <button onClick={onClose} className={`px-6 py-3 rounded-xl border ${darkMode ? 'border-gray-600' : 'border-gray-300'}`}>
                Cancel
              </button>
              <button onClick={handleConfirm} className="bg-[#FF500B] hover:bg-[#e44907] px-6 py-3 rounded-xl font-bold text-white">
                Confirm
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
