"use client";

import React, { useState } from 'react';

import FileUpload from './FileUpload';
import { toast } from 'react-hot-toast';
import { usePathname
 } from 'next/navigation';
 import { } from "next/location "

const PathUpClose = () => {
  const pathname = usePathname();
  const location = useLocation();
  const { title } = location.state || { title: 'Your Selected Journey' };

  const [formData, setFormData] = useState({
    businessDescription: '',
    businessStage: '',
    monthlyRevenue: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.businessDescription.trim()) newErrors.businessDescription = 'This field is required.';
    if (!formData.businessStage.trim()) newErrors.businessStage = 'This field is required.';
    if (!formData.monthlyRevenue.trim()) newErrors.monthlyRevenue = 'This field is required.';
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) toast.error('Please fill in all required fields.');
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      toast.success('Your journey has been customized successfully!');
      // TODO: Save formData to store or API if needed
      navigate('/confirmation', { state: { title, ...formData } });
    }
  };

  return (
    <section className="w-full max-w-2xl mx-auto px-4 sm:px-6 pt-28 pb-12">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-blue-600" />
          <p className="text-blue-600 font-semibold text-sm uppercase">
            Your Path, Up Close - {title}
          </p>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#0E0E1D] mt-2 leading-tight">
          Customize your journey with a few final details
        </h1>
      </div>

      {/* Form Fields */}
      <div className="flex flex-col gap-6">
        <textarea
          rows="6"
          name="businessDescription"
          placeholder="Tell us about your business"
          value={formData.businessDescription}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-2xl text-[1rem] focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-[16px] transition-all resize-none"
        />
        {errors.businessDescription && <p className="text-red-600 text-sm">{errors.businessDescription}</p>}

        <textarea
          rows="3"
          name="businessStage"
          placeholder="What stage is your business in?"
          value={formData.businessStage}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-2xl text-[1rem] focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-[16px] transition-all resize-none"
        />
        {errors.businessStage && <p className="text-red-600 text-sm">{errors.businessStage}</p>}

        <textarea
          rows="3"
          name="monthlyRevenue"
          placeholder="Monthly Revenue"
          value={formData.monthlyRevenue}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-2xl text-[1rem] focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-[16px] transition-all resize-none"
        />
        {errors.monthlyRevenue && <p className="text-red-600 text-sm">{errors.monthlyRevenue}</p>}

        {/* File Upload */}
        <FileUpload />
      </div>

      {/* Submit Button */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between mt-10">
        <Button
          label="Submit"
          bgcolor="bg-[#293C97]"
          color="text-white"
          className="py-3 w-full"
          onClick={handleSubmit}
        />
      </div>
    </section>
  );
};

export default PathUpClose;
