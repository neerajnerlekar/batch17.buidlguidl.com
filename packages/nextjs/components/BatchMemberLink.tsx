"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Address } from "~~/components/scaffold-eth/Address/Address";

type BatchMemberLinkProps = {
  address: string;
};

//Check that builder's page exists
const checkRouteExists = async (path: string): Promise<boolean> => {
  const res = await fetch(path, { method: "HEAD" });
  return res.status === 200;
};

export const BatchMemberLink = ({ address }: BatchMemberLinkProps) => {
  const [exists, setExists] = useState<boolean | null>(null);

  useEffect(() => {
    let isMounted = true;
    const check = async () => {
      const path = "/builders/" + address;
      const result = await checkRouteExists(path);
      if (isMounted) setExists(result);
    };
    check();
    return () => {
      isMounted = false;
    };
  }, [address]);

  if (exists === null) {
    return (
      <div className="max-w-xl mx-auto p-5 dark:bg-slate-800 bg-slate-200 rounded-xl flex items-center gap-3 shadow">
        <Address address={address} />
        <span className="animate-pulse">Loading builder page...</span>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto p-5 dark:bg-slate-800 bg-slate-200 rounded-xl flex items-center gap-3 shadow">
      <Address address={address} />
      {exists && (
        <Link
          href={"/builders/" + address}
          className="link font-semibold dark:text-gray-200 text-gray-800 hover:underline"
        >
          Builder&apos;s page
        </Link>
      )}
    </div>
  );
};
