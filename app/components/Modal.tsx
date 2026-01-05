'use client';

import { useState } from 'react';
import useStore from '../store/store';
import axios from 'axios';
import { ClipboardList, User, Edit, Send, X, AlertCircle, CheckCircle, Loader2 } from 'lucide-react'; // Import Lucide icons

interface ModalProps {
  darkMode: boolean;
  onClose: () => void;
}

export default function Modal({ darkMode, onClose }: ModalProps) {
  const [contact, setContact] = useState('');
  const [error, setError] = useState('');
  const [isConfirming, setIsConfirming] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { totalPrice, copies, paperType, coverType, fileNames } = useStore();

  const handleConfirm = () => {
    if (!contact.trim()) { // Trim to check for empty or just whitespace
      setError('Iltimos, aloqa maʼlumotlarini kiriting'); // Uzbek translation
      return;
    }
    setError('');
    setIsConfirming(true);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const orderDetails = {
      fileNames,
      totalPrice,
      copies,
      paperType,
      coverType,
      contact,
    };

    try {
      await axios.post('/api/send-order', orderDetails);
      alert('Buyurtmangiz muvaffaqiyatli yuborildi!'); // Uzbek success message
      onClose();
    } catch (error) {
      console.error('Error sending order:', error);
      setError('Buyurtmani yuborishda xatolik yuz berdi. Qayta urinib ko‘ring.'); // Uzbek error message
      setIsConfirming(false);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className={`rounded-xl shadow-lg p-6 w-full max-w-sm ${darkMode ? 'bg-gray-800 border-gray-700 text-gray-50' : 'bg-white border-gray-200 text-gray-900'}`}>
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2"> {/* Changed to font-bold */}
          <ClipboardList size={24} /> Buyurtmani Tasdiqlash {/* Uzbek translation */}
        </h2>
        {isConfirming ? (
          <div>
            <p className="mb-4">Aloqa maʼlumotlari toʻgʻriligiga ishonchingiz komilmi?</p> {/* Uzbek translation */}
            <p className="font-bold my-2 text-lg">{contact}</p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setIsConfirming(false)}
                className={`px-4 py-2 rounded-lg border shadow-md flex items-center gap-2 transition-all duration-200 ease-in-out transform hover:scale-105
                  ${darkMode ? 'border-gray-600 hover:bg-gray-700' : 'border-gray-300 hover:bg-gray-100'}`}
                disabled={isSubmitting}
              >
                <Edit size={18} /> Yo'q, Tahrirlash {/* Uzbek translation */}
              </button>
              <button
                onClick={handleSubmit}
                className="bg-[#FF500B] shadow-md hover:bg-[#e44907] px-4 py-2 rounded-lg font-bold text-white flex items-center gap-2 transition-all duration-200 ease-in-out transform hover:scale-105"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <Send size={18} />
                )}{' '}
                {isSubmitting ? 'Yuborilmoqda...' : 'Ha, Yuborish'}{/* Uzbek translation */}
              </button>
            </div>
          </div>
        ) : (
          <div>
            <p className="mb-4">Buyurtma berish uchun telefon raqamingizni yoki Telegram foydalanuvchi nomingizni kiriting.</p> {/* Uzbek translation */}
            <div className="mt-4">
              <label htmlFor="contact" className="font-medium flex items-center gap-2 mb-1">
                <User size={18} /> Telefon raqami yoki Telegram foydalanuvchi nomi {/* Uzbek translation */}
              </label>
              <div className="relative">
                <input
                  id="contact"
                  type="text"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  className={`w-full h-12 mt-1 border rounded-lg pl-10 pr-4 ${darkMode ? 'bg-gray-700 border-gray-600 focus:border-blue-500 focus:ring-blue-500' : 'bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-500'} focus:outline-none focus:ring-1`}
                />
                <User size={18} className={`absolute left-3 top-1/2 -translate-y-1/2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
              </div>
              {error && <p className="text-red-500 text-sm mt-2 flex items-center gap-1"><AlertCircle size={16} /> {error}</p>}
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={onClose}
                className={`px-4 py-2 rounded-lg border shadow-md flex items-center gap-2 transition-all duration-200 ease-in-out transform hover:scale-105
                  ${darkMode ? 'border-gray-600 hover:bg-gray-700' : 'border-gray-300 hover:bg-gray-100'}`}
              >
                <X size={18} /> Bekor qilish {/* Uzbek translation */}
              </button>
              <button
                onClick={handleConfirm}
                className="bg-[#FF500B] shadow-md hover:bg-[#e44907] px-4 py-2 rounded-lg font-bold text-white flex items-center gap-2 transition-all duration-200 ease-in-out transform hover:scale-105"
              >
                <CheckCircle size={18} /> Tasdiqlash {/* Uzbek translation */}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
