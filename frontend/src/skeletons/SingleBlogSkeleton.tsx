const SingleBlogSkeleton = () => {
  return (
    <div role="status" className="animate-pulse h-full w-full md:w-3/6 shadow-sm px-4 py-8 bg-main">
      <div className="my-4 h-48 w-full bg-sub rounded"></div>
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-sub"></div>
        <div>
          <div className="h-3 w-24 bg-sub rounded-full mb-2"></div>
          <div className="h-2.5 w-16 bg-sub rounded-full"></div>
        </div>
      </div>
      <div className="mt-4 h-4 w-48 bg-sub rounded-full"></div>
      <div className="mt-4 h-80 w-full bg-sub rounded"></div>
    </div>
  );
};

export default SingleBlogSkeleton;
