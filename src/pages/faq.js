import bell from "../icons/Bell.svg";
import LeftAngle from "../icons/LeftAngle.svg";
import Nav from "../components/nav";
function Faq() {
  return (
    <div className="flex flex-col items-center   max-w-md ">
      <div class="flex  flex-col h-h90 w-full bg-white rounded-lg shadow dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10 relative">
        <div className="px-4 py-8">
          <div className="flex justify-between items-center">
            <div className="flex justify-between item-center">
              <img src={LeftAngle} alt="leftAngle" />
              <h2 className="ml-8 font-medium text-sm">FAQs</h2>
            </div>
            <img src={bell} alt="bell" />
          </div>
          <p className="font-medium text-sm mt-9">
            DHQ is the best available way for managing your data bundles
          </p>
        </div>
      </div>
      <Nav />
    </div>
  );
}

export default Faq;
