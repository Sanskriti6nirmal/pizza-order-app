function Loader() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-yellow-100/30 backdrop-blur-sm">
      <div className="loader h-12 w-12 animate-spin rounded-full border-b-4 border-t-4 border-yellow-500"></div>
    </div>
  );
}

export default Loader;
