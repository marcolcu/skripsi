const EventDetailSkeleton = () => {
  return (
    <div className="max-w-screen-xl mx-auto px-10">
      {/* Banner Skeleton */}
      <div className="w-full h-[440px] bg-gray-300 rounded-[2rem] animate-pulse"></div>

      <div className="flex justify-between mt-5">
        {/* Left Side */}
        <div className="left">
          {/* Judul Skeleton */}
          <div className="w-3/4 h-8 bg-gray-300 mb-3 animate-pulse"></div>

          {/* Lokasi Skeleton */}
          <div className="flex items-center mb-1">
            <div className="w-1/2 h-4 bg-gray-300 animate-pulse"></div>
          </div>

          {/* Tanggal Event Skeleton */}
          <div className="flex items-center mb-1">
            <div className="w-1/2 h-4 bg-gray-300 animate-pulse"></div>
          </div>
        </div>
        {/* Right Side */}
        <div className="right">
          {/* Status Free/Paid Skeleton */}
          <div className="w-[100px] h-6 bg-gray-300 mb-2 animate-pulse"></div>

          {/* Harga Event Skeleton */}
          <div className="w-[100px] h-6 bg-gray-300 mb-2 animate-pulse"></div>

          {/* Button Buy Skeleton */}
          <div className="w-[150px] h-[50px] bg-gray-300 rounded-2xl animate-pulse"></div>
        </div>
      </div>

      {/* Description Skeleton */}
      <div>
        <h1 className="text-[2rem] mb-2">Description</h1>
        <hr className="mb-4" />
        <div className="w-full h-12 bg-gray-300 animate-pulse"></div>
      </div>

      {/* Maybe You Like Skeleton */}
      <div className="pt-5">
        <h1 className="text-[2rem] mb-4">Maybe You Like</h1>
        {/* Card Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="w-full h-[400px] bg-gray-300 rounded-lg animate-pulse"
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventDetailSkeleton;
