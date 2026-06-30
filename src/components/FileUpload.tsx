"use client";

import Image from "next/image";

const FileUpload: React.FC = () => {
  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const file = e.target.files?.[0];

    if (!file) return;

    console.log("Selected file:", file.name);
    // Handle file upload logic here
  };

  return (
    <section className="w-full max-w-2xl mx-auto">
      <label
        htmlFor="pitch-upload"
        className="w-full h-[160px] flex flex-col justify-center items-center gap-3 px-4 py-3 border border-dashed border-blue-500 rounded-2xl cursor-pointer transition-all hover:bg-blue-50"
      >
        <Image
          src="/images/uploadIcon.png"
          alt="Upload file icon"
          width={40}
          height={40}
          loading="lazy"
        />

        <p className="text-gray-600 text-[16px] font-medium text-center">
          Upload a pitch deck or business plan
        </p>

        <span className="text-sm text-gray-400">
          (PDF, PPTX or DOCX files)
        </span>
      </label>

      {/* Hidden File Input */}
      <input
        type="file"
        id="pitch-upload"
        className="hidden"
        accept=".pdf,.doc,.docx,.ppt,.pptx"
        onChange={handleFileChange}
      />
    </section>
  );
};

export default FileUpload;
