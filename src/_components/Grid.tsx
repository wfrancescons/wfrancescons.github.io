type GridProps = {
  children: JSX.Children;
};

export default function Grid({ children }: GridProps) {
  return (
    <div className="py-5 flex justify-center">
      <div className="
          grid
          grid-cols-[repeat(2,160px)]
          auto-rows-[160px]
          gap-6
          justify-center
          md:grid-cols-[repeat(4,160px)]
        ">
        {children}
      </div>
    </div>
  );
}
