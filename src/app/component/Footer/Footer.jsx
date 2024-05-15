const Footer = () => {
  return (
    <div className="bg-cyan-50 w-full">
      <div className="max-w-screen-xl mx-auto px-10 mt-5">
        <footer className="">
          <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
            <div className="md:flex md:justify-between">
              <div className="mb-6 md:mb-0">
                <a href="/" className="flex items-center">
                  <span className="self-center text-2xl font-semibold whitespace-nowrap">
                    Venn.io
                  </span>
                </a>
              </div>
              <div className="text-righ">
                <h1 className="text-2xl">PT. VENN.IO</h1>
                <p>(021) 14045</p>
                <p>cs@venn.io</p>
              </div>
            </div>
            <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
            <div className="sm:flex sm:items-center sm:justify-between">
              <span className="text-sm sm:text-center">
                © 2024. All Rights Reserved.
              </span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Footer;
