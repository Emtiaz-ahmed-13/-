const Hero = () => {
  return (
    <div className="h-[75vh] flex flex-col md:flex-row items-center justify-center bg-gradient-to-r from-purple-600 to-purple-800 text-white relative px-4">
      {/* Left Side - Text Section */}
      <div className="w-full md:w-1/2 text-center md:text-left px-6 mb-6 md:mb-0">
        <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-4">
          "বইয়ের রাজ্যে স্বাগতম!"
        </h1>
        <p className="text-lg md:text-xl mb-6">
          আমাদের সাথে বইয়ের জগৎ আবিষ্কার করুন! অন্বেষণ করুন, শিখুন, এবং গল্প
          উপভোগ করুন।
        </p>
        <button className="bg-purple-700 hover:bg-purple-800 text-white px-6 py-3 rounded-lg shadow-lg transition-all duration-300">
          এখনই অন্বেষণ করুন
        </button>
      </div>

      {/* Right Side - Image Section */}
      <div className="w-full md:w-1/2 relative">
        <img
          src="https://i.ibb.co/RGcm11hk/cover-Image.jpg"
          alt="coverImage"
          className="object-cover w-full h-full rounded-lg shadow-xl"
        />
      </div>
    </div>
  );
};

export default Hero;
