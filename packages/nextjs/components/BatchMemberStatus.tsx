"use client";

import { FaSpinner, FaUserCheck, FaUserClock, FaUserTimes } from "react-icons/fa";
import { useAccount } from "wagmi";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";

const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";

export const BatchMemberStatus = () => {
  const { address } = useAccount();

  // Always call hooks, use ZERO_ADDRESS if not connected
  const { data: isMember, isLoading: isMemberLoading } = useScaffoldReadContract({
    contractName: "BatchRegistry",
    functionName: "allowList",
    args: [address ?? ZERO_ADDRESS],
  });

  const { data: checkedInContract, isLoading: isCheckedInLoading } = useScaffoldReadContract({
    contractName: "BatchRegistry",
    functionName: "yourContractAddress",
    args: [address ?? ZERO_ADDRESS],
  });

  // Don't show status if not logged in
  if (!address) return null;

  if (isMemberLoading || isCheckedInLoading) {
    return (
      <span className="flex items-center gap-1 text-gray-400 ml-2" title="Loading">
        <FaSpinner className="animate-spin" /> Loading...
      </span>
    );
  }

  if (!isMember) {
    return (
      <span className="flex items-center gap-1 text-red-500 ml-2" title="Not a batch member">
        <FaUserTimes /> Not a member
      </span>
    );
  }

  if (!checkedInContract || checkedInContract === ZERO_ADDRESS) {
    return (
      <span className="flex items-center gap-1 text-yellow-500 ml-2" title="Not checked in">
        <FaUserClock /> Not checked in
      </span>
    );
  }

  return (
    <span className="flex items-center gap-1 text-green-500 ml-2" title="Checked in">
      <FaUserCheck /> Checked in
    </span>
  );
};
