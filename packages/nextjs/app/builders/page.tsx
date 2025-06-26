"use client";

import type { NextPage } from "next";
import { BatchMemberLink } from "~~/components/BatchMemberLink";
import { useScaffoldEventHistory } from "~~/hooks/scaffold-eth";

const BATCH_REGISTRY_START_BLOCK: bigint = 346262647n;

const BuildersPage: NextPage = () => {
  //get checkedIn event data with hook
  const { data: checkInEvents, isLoading } = useScaffoldEventHistory({
    contractName: "BatchRegistry",
    eventName: "CheckedIn",
    fromBlock: BATCH_REGISTRY_START_BLOCK,
  });

  if (isLoading) {
    return (
      <span className="flex items-center gap-1 text-gray-400 ml-2" title="Loading">
        Loading...
      </span>
    );
  }

  if (!checkInEvents) {
    return (
      <span className="flex items-center gap-1 text-gray-400 ml-2" title="Loading no data">
        Loading...
      </span>
    );
  }

  return (
    <div>
      <ul>
        {checkInEvents.map(event => (
          <BatchMemberLink address={event.args.builder ?? ""} key={event.args.builder ?? ""} />
        ))}
      </ul>
    </div>
  );
};

export default BuildersPage;

//todo
//change styling for page options based on builderPage
