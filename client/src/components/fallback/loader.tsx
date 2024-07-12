function Loader() {
  return (
    <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-background">
      <div className="flex flex-col items-center">
        {/* <div className="mb-4 h-32 w-32 animate-spin rounded-full border-b-4 border-t-4 border-yellow-400"></div> */}
        <img src="/nezukoRun.gif" alt="Loading" className="mt-4 h-60 w-60" />
        <h2 className="text-4xl font-bold text-text ">Loading...</h2>
        <p className="mt-2 text-text">This might take a moment, hang tight!</p>
      </div>
    </div>
  );
}
export default Loader;
