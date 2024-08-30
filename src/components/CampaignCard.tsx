import { client } from "@/app/client";
import { openCampusCodex } from "@/app/constants/contracts";
import Link from "next/link";
import { getContract } from "thirdweb";
import { useReadContract } from "thirdweb/react";
import { Button } from "@/components/ui/button";

type CampaignCardProps = {
    campaignAddress: string;
};

export const CampaignCard: React.FC<CampaignCardProps> = ({ campaignAddress }) => {
    const contract = getContract({
        client: client,
        chain: openCampusCodex,
        address: campaignAddress,
    });

    // Get Campaign Name
    const {data: campaignName} = useReadContract({
        contract: contract,
        method: "function name() view returns (string)",
        params: []
    });

    // Get Campaign Description
    const {data: campaignDescription} = useReadContract({
        contract: contract,
        method: "function description() view returns (string)",
        params: []
    });

    // Goal amount of the campaign
    const { data: goal, isLoading: isLoadingGoal } = useReadContract({
        contract: contract,
        method: "function goal() view returns (uint256)",
        params: [],
    });

    // Total funded balance of the campaign
    const { data: balance, isLoading: isLoadingBalance } = useReadContract({
        contract: contract,
        method: "function getContractBalance() view returns (uint256)",
        params: [],
    });

    // Calulate the total funded balance percentage
    const totalBalance = balance?.toString();
    const totalGoal = goal?.toString();
    let balancePercentage = (parseInt(totalBalance as string) / parseInt(totalGoal as string)) * 100;

    // If balance is greater than or equal to goal, percentage should be 100
    if (balancePercentage >= 100) {
        balancePercentage = 100;
    }

    return (
            <div className="flex flex-col justify-between max-w-sm p-6 bg-white border border-slate-200 rounded-lg shadow">
                <div> 
                    {/* TODO: repurpose bar */}
                    {!isLoadingBalance && false && (
                        <div className="mb-4">
                            <div className="relative w-full h-6 bg-gray-200 rounded-full dark:bg-gray-700">
                                <div className="h-6 bg-blue-600 rounded-full dark:bg-blue-500 text-right" style={{ width: `${balancePercentage?.toString()}%`}}>
                                    <p className="text-white dark:text-white text-xs p-1">{balance?.toString()}</p>
                                </div>
                                <p className="absolute top-0 right-0 text-white dark:text-white text-xs p-1">
                                    {balancePercentage >= 100 ? "" : `${balancePercentage?.toString()}%`}
                                </p>
                            </div>
                        </div>                        
                    )}
                    <h5 className="mb-2 text-2xl font-bold tracking-tight">{campaignName}</h5>
                    
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{campaignDescription}</p>
                </div>
                
                <div className="flex justify-between items-center mt-4">
                    <Link
                        href={`/campaign/${campaignAddress}`}
                        passHref={true}
                    >
                        <p className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            View Info
                        </p>
                    </Link>
                    <Link href={`/chat/${campaignAddress}`} passHref>
                        <Button variant="outline" className="bg-purple-600 text-white hover:bg-purple-700 hover:text-white">Query</Button>
                    </Link>
                </div>
            </div>
    )
};