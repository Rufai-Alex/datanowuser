import Nav from "../components/nav";
import bell from "../icons/Bell.svg";
import LeftAngle from "../icons/LeftAngle.svg";

function subDetails() {
  return (
    <div className="relative h-screen flex flex-col max-w-md w-full bg-white rounded-lg shadow dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10 ">
      <div className=" h-h90 px-4 py-8">
        <div className="flex justify-between">
          <img src={LeftAngle} alt="leftAngle" />
          <h2 className="">Subscription Details</h2>
          <img src={bell} alt="bell" />
        </div>
        <div className="flex flex-col mt-8 space-y-3.5">
          <div className="flex justify-between ">
            {" "}
            <p className="font-medium text-sm text-primary-gray">Transaction</p>
            <p className="font-semibold text-sm text-primary-black ">
              fbfnxfgvdsg
            </p>
          </div>
          <div className="flex justify-between ">
            {" "}
            <p className="font-medium text-sm text-primary-gray">Category</p>
            <p className="font-semibold text-sm text-primary-black ">
              fdgxbfvbxfd
            </p>
          </div>
          <div className="flex justify-between ">
            {" "}
            <p className="font-medium text-sm text-primary-gray">Amount</p>
            <p className="font-semibold text-sm text-primary-black ">456478</p>
          </div>
          <div className="flex justify-between ">
            {" "}
            <p className="font-medium text-sm text-primary-gray">Number</p>
            <p className="font-semibold text-sm text-primary-black ">
              08106653903
            </p>
          </div>
          <div className="flex justify-between ">
            {" "}
            <p className="font-medium text-sm text-primary-gray">From</p>
            <p className="font-semibold text-sm text-primary-black ">Wallet</p>
          </div>
          <div className="flex justify-between ">
            {" "}
            <p className="font-medium text-sm text-primary-gray">Date</p>
            <p className="font-semibold text-sm text-primary-black ">cmfndg</p>
          </div>
          <div className="flex justify-between ">
            {" "}
            <p className="font-medium text-sm text-primary-gray">Time</p>
            <p className="font-semibold text-sm text-primary-black ">
              fgdjhtsgs
            </p>
          </div>
        </div>
      </div>
      <Nav />
    </div>
  );
}

export default subDetails;
