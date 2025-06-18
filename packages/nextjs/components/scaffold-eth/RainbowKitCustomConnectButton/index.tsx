"use client";

// @refresh reset
import { Balance } from "../Balance";
import { AddressInfoDropdown } from "./AddressInfoDropdown";
import { AddressQRCodeModal } from "./AddressQRCodeModal";
import { WrongNetworkDropdown } from "./WrongNetworkDropdown";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Address } from "viem";
import { useAccount, useReadContract } from "wagmi";
import externalContracts from "~~/contracts/externalContracts";
import { useNetworkColor } from "~~/hooks/scaffold-eth";
import { useTargetNetwork } from "~~/hooks/scaffold-eth/useTargetNetwork";
import { getBlockExplorerAddressLink } from "~~/utils/scaffold-eth";

// For Arbitrum (chainId 42161)
const BatchRegistryABI = externalContracts[42161].BatchRegistry.abi;
const BatchRegistryAddress = externalContracts[42161].BatchRegistry.address;

/**
 * Custom Wagmi Connect Button (watch balance + custom design)
 */
export const RainbowKitCustomConnectButton = () => {
  const networkColor = useNetworkColor();
  const { targetNetwork } = useTargetNetwork();
  const { address } = useAccount();

  const { data: isMember } = useReadContract({
    address: BatchRegistryAddress,
    abi: BatchRegistryABI,
    functionName: "allowList",
    args: [address ?? "0x0000000000000000000000000000000000000000"], // fallback to zero address
    query: { enabled: !!address },
  });

  const { data: checkedInContract } = useReadContract({
    address: BatchRegistryAddress,
    abi: BatchRegistryABI,
    functionName: "yourContractAddress",
    args: [address ?? "0x0000000000000000000000000000000000000000"], // fallback to zero address
    query: { enabled: !!address },
  });

  const isLoading = false;

  return (
    <ConnectButton.Custom>
      {({ account, chain, openConnectModal, mounted }) => {
        const connected = mounted && account && chain;
        const blockExplorerAddressLink = account
          ? getBlockExplorerAddressLink(targetNetwork, account.address)
          : undefined;

        return (
          <>
            {(() => {
              if (!connected) {
                return (
                  <button className="btn btn-primary btn-sm" onClick={openConnectModal} type="button">
                    Connect Wallet
                  </button>
                );
              }

              if (chain.unsupported || chain.id !== targetNetwork.id) {
                return <WrongNetworkDropdown />;
              }

              return (
                <>
                  <div className="flex items-center gap-2">
                    {isLoading ? (
                      <span>Checking membership...</span>
                    ) : isMember ? (
                      <span title="Batch member" className="text-green-500">
                        ✅ Member
                      </span>
                    ) : (
                      <span title="Not a batch member" className="text-red-500">
                        ❌ Not a member
                      </span>
                    )}

                    {isLoading ? (
                      <span>Checking check-in...</span>
                    ) : checkedInContract && checkedInContract !== "0x0000000000000000000000000000000000000000" ? (
                      <span title="Already checked in" className="text-blue-500">
                        🟢 Checked in
                      </span>
                    ) : (
                      <span title="Not checked in" className="text-gray-400">
                        ⚪ Not checked in
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col items-center mr-1">
                    <Balance address={account.address as Address} className="min-h-0 h-auto" />
                    <span className="text-xs" style={{ color: networkColor }}>
                      {chain.name}
                    </span>
                  </div>
                  <AddressInfoDropdown
                    address={account.address as Address}
                    displayName={account.displayName}
                    ensAvatar={account.ensAvatar}
                    blockExplorerAddressLink={blockExplorerAddressLink}
                  />
                  <AddressQRCodeModal address={account.address as Address} modalId="qrcode-modal" />
                </>
              );
            })()}
          </>
        );
      }}
    </ConnectButton.Custom>
  );
};
