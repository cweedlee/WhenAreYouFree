import Footer from "./ui/Footer";

const Page = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={
        "pt-[5rem] mx-[4rem]  lg:mx-[6rem] sm:mx-[1rem] w-auto h-full flex flex-col gap-y-8 min-h-screen pb-50 relative" +
        " " +
        className
      }
    >
      {children}
      <Footer />
    </div>
  );
};

export default Page;
