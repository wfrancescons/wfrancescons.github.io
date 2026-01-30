type GridProps = {
  children: JSX.Children;
};

export default function Grid({ children }: GridProps) {
  return (
    <div className="flex justify-center">
      <div className="card-grid">
        {children}
      </div>
    </div>
  );
}
