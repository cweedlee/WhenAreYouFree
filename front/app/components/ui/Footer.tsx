const Footer = () => {
  return (
    <div className="flex justify-center items-center h-50 w-full text-center absolute bottom-0">
      <p className="text-sm">
        Copyright 2025. All rights reserved.
        <br />
        <span className="text-stone-500">
          This project is made by{" "}
          <a href="https://github.com/cweedlee" className="text-green-900">
            cweedlee
          </a>
        </span>
      </p>
    </div>
  );
};

export default Footer;
