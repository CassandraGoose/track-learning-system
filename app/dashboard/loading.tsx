export default function Loading() {
  return (
    <div>
      <section className="mx-12 flex flex-col space-y-12">
        <div className="bg-loading loading-override skeleton h-10 w-1/4 self-center"></div>
        <span className="bg-loading loading-override skeleton h-56 w-full"></span>
        <span className="bg-loading loading-override skeleton h-56 w-full"></span>
      </section>
    </div>
  );
}
