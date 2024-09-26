function Background() {
  return (
    <>
      <div className="fixed w-full h-screen z-[2]">
        <div className="absolute top-[5%] w-full py-10 flex justify-center text-zinc-700 font-bold text-xl">
          !Documents
        </div>
        <h1 className=" absolute  top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] text-[13vw] leading-none tracking-tight text-zinc-700 font-semibold">
          DOCS.
        </h1>
      </div>
    </>
  );
}

export default Background;
