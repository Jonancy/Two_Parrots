function ImageView() {
  return (
    <div className="grid grid-cols-5 space-x-3">
      <div className="hidden flex-col items-start gap-3 md:flex">
        <button className="overflow-hidden rounded-lg border transition-colors hover:border-primary">
          <img
            src="/placeholder.svg"
            alt="Preview thumbnail"
            width={100}
            height={120}
            className="aspect-[5/6] object-cover"
          />
          <span className="sr-only">View Image 1</span>
        </button>
        <button className="overflow-hidden rounded-lg border transition-colors hover:border-primary">
          <img
            src="/placeholder.svg"
            alt="Preview thumbnail"
            width={100}
            height={120}
            className="aspect-[5/6] object-cover"
          />
          <span className="sr-only">View Image 2</span>
        </button>
        <button className="overflow-hidden rounded-lg border transition-colors hover:border-primary">
          <img
            src="/placeholder.svg"
            alt="Preview thumbnail"
            width={100}
            height={120}
            className="aspect-[5/6] object-cover"
          />
          <span className="sr-only">View Image 3</span>
        </button>
        <button className="overflow-hidden rounded-lg border transition-colors hover:border-primary">
          <img
            src="/placeholder.svg"
            alt="Preview thumbnail"
            width={100}
            height={120}
            className="aspect-[5/6] object-cover"
          />
          <span className="sr-only">View Image 4</span>
        </button>
      </div>
      <div className="md:col-span-4">
        <img
          src="/placeholder.svg"
          alt="Product Image"
          width={600}
          height={900}
          className="aspect-[2/3] w-full overflow-hidden rounded-lg border object-cover"
        />
      </div>
    </div>
  );
}
export default ImageView;
