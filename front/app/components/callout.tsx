const Callout = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={
        "bg-stone-100 px-10 w-auto max-w-150  h-max py-10 flex flex-col gap-y-5 justify-center items-center mx-auto rounded-lg " +
        className
      }
    >
      {children}
    </div>
  );
};

export default Callout;
