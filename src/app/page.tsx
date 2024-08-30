'use client';
import Image from 'next/image';
import { useReadContract } from "thirdweb/react";
import { client } from "./client";
import { getContract } from "thirdweb";
import { CampaignCard } from "@/components/CampaignCard";
import { CROWDFUNDING_FACTORY, openCampusCodex } from "./constants/contracts";

export default function Home() {
  // Get CrowdfundingFactory contract
  const contract = getContract({
    client: client,
    chain: openCampusCodex,
    address: CROWDFUNDING_FACTORY,
  });

  // Get all campaigns deployed with CrowdfundingFactory
  const {data: campaigns, isLoading: isLoadingCampaigns, refetch: refetchCampaigns } = useReadContract({
    contract: contract,
    method: "function getAllCampaigns() view returns ((address campaignAddress, address owner, string name)[])",
    params: []
  });

  return (
    <main>
      <div className="relative w-full h-[50vh]">
        <Image
          src="/banner.jpg"
          alt="KaasAI Banner"
          layout="fill"
          objectFit="cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-5xl font-bold mb-4">Welcome to KaasAI</h1>
            <p className="text-xl max-w-2xl mx-auto">
              Knowledge as a Service using AI. Create, share, and explore AI-powered knowledge bases in minutes.
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 mt-8 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold mb-4">Knowledge Bases:</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {!isLoadingCampaigns && campaigns && (
            campaigns.length > 0 ? (
              campaigns.map((campaign) => (
                <CampaignCard
                  key={campaign.campaignAddress}
                  campaignAddress={campaign.campaignAddress}
                />
              ))
            ) : (
              <p>No Knowledge Base Available</p>
            )
          )}
        </div>
      </div>
    </main>
  );
}