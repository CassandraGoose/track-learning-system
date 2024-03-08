export default function Loading() {
  return (
    <div className="mx-12 my-12 flex flex-col items-center space-y-8">
      <span className="bg-loading loading-override skeleton h-56 w-full"></span>
      <span className="bg-loading loading-override skeleton h-56 w-full"></span>
    </div>
  );
}
