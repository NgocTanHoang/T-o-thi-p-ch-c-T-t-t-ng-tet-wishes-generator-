
import React from 'react';
import { UserInput, Relationship, Style, Gender } from '../types';

interface InputFormProps {
  onSubmit: (data: UserInput) => void;
}

export const InputForm: React.FC<InputFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = React.useState<UserInput>({
    fullName: '',
    age: '',
    gender: 'Nam',
    relationship: Relationship.Friends,
    personality: '',
    style: Style.Traditional,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-xl border border-red-100">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-traditional font-bold text-red-800">Thông Tin Người Nhận</h2>
        <p className="text-gray-600 mt-2">Hãy cung cấp vài nét về người bạn muốn gửi lời chúc</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Họ và tên</label>
          <input
            required
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all"
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            placeholder="VD: Nguyễn Văn A"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Tuổi / Năm sinh</label>
          <input
            required
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all"
            value={formData.age}
            onChange={(e) => setFormData({ ...formData, age: e.target.value })}
            placeholder="VD: 30 hoặc 1994"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Giới tính</label>
          <select
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none"
            value={formData.gender}
            onChange={(e) => setFormData({ ...formData, gender: e.target.value as Gender })}
          >
            <option value="Nam">Nam</option>
            <option value="Nữ">Nữ</option>
            <option value="Khác">Khác</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Mối quan hệ</label>
          <select
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none"
            value={formData.relationship}
            onChange={(e) => setFormData({ ...formData, relationship: e.target.value as Relationship })}
          >
            {Object.values(Relationship).map((rel) => (
              <option key={rel} value={rel}>{rel}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Phong cách thiệp</label>
          <select
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none"
            value={formData.style}
            onChange={(e) => setFormData({ ...formData, style: e.target.value as Style })}
          >
            {Object.values(Style).map((st) => (
              <option key={st} value={st}>{st}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Tính cách (Tùy chọn)</label>
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all"
            value={formData.personality}
            onChange={(e) => setFormData({ ...formData, personality: e.target.value })}
            placeholder="VD: Vui vẻ, hiền hậu..."
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-red-700 hover:bg-red-800 text-white font-bold py-4 rounded-xl shadow-lg transform active:scale-95 transition-all text-lg font-traditional flex items-center justify-center space-x-2"
      >
        <span>Sáng Tạo Thiệp Xuân</span>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      </button>
    </form>
  );
};
