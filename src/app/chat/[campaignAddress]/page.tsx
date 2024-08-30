'use client';

import { useParams } from "next/navigation";
import { getContract } from "thirdweb";
import { useActiveAccount, useReadContract } from "thirdweb/react";
import { client } from "@/app/client";
import { openCampusCodex } from "@/app/constants/contracts";
import { useChat } from "ai/react";
import { Message } from "ai";
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/cjs/styles/prism';

export default function ChatPage() {
    const account = useActiveAccount();
    
    const { campaignAddress } = useParams();

    const contract = getContract({
        client: client,
        chain: openCampusCodex,
        address: campaignAddress as string,
    });

    // Name of the knowledge base
    const { data: name, isLoading: isLoadingName } = useReadContract({
        contract: contract,
        method: "function name() view returns (string)",
        params: [],
    });

    // Description of the knowledge base
    const { data: description, isLoading: isLoadingDescription } = useReadContract({ 
        contract, 
        method: "function description() view returns (string)", 
        params: [] 
    });

    // Get Tiers
    const { data: tiers, isLoading: isLoadingTiers } = useReadContract({
        contract: contract,
        method: "function getTiers() view returns ((string name, uint256 amount, uint256 backers)[])",
        params: [],
    });

    // See if the user has funded any tiers

    const { data: hasFundedTier1, isLoading: isLoadingHasFundedTier1 } = useReadContract({ 
          contract, 
          method: "function hasFundedTier(address _backer, uint256 _tierIndex) view returns (bool)", 
          params: [account?.address as string, BigInt(0)] 
    });

    const { data: hasFundedTier2, isLoading: isLoadingHasFundedTier2 } = useReadContract({ 
        contract, 
        method: "function hasFundedTier(address _backer, uint256 _tierIndex) view returns (bool)", 
        params: [account?.address as string, BigInt(0)] 
   });
    
   const { data: hasFundedTier3, isLoading: isLoadingHasFundedTier3 } = useReadContract({ 
        contract, 
        method: "function hasFundedTier(address _backer, uint256 _tierIndex) view returns (bool)", 
        params: [account?.address as string, BigInt(0)] 
    });
    
    const { messages, input, handleInputChange, handleSubmit } = useChat({
        api: '/api/chat',
        initialMessages: [
            {
                id: "system-1",
                role: 'system',
                content: `You are an AI assistant for the knowledge base "${name}". The description of this knowledge base is: "${description}". Please provide information and answer questions based on this context.`
            } as Message,
            {
                id: "assistant-1",
                role: 'assistant',
                content: `Welcome to the knowledge base "${name}". The description of this knowledge base is: "${description}". I am your copilot and can assist you with any questions or tasks needed to make full use of this knowledge base such as preparing Quizes, producing content and course materials, etc. How can I help?`
            } as Message,
        ],
    });

    if (isLoadingName || isLoadingDescription || isLoadingHasFundedTier1 || isLoadingHasFundedTier2 || isLoadingHasFundedTier3) {
        return <div>Loading knowledge base details...</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <div className={`p-4 mb-4 text-white text-center ${hasFundedTier1 || hasFundedTier2 || hasFundedTier3 ? 'bg-green-500' : 'bg-red-500'}`}>
                {hasFundedTier1 || hasFundedTier2 || hasFundedTier3 
                    ? "You have access to this knowledge base" 
                    : "You do not have access to this knowledge base but we will give you temporary access to try it out. Enjoy!"}
            </div>
            <h1 className="text-2xl font-bold mb-4">{name}</h1>
            <p className="mb-4">{description}</p>
            
            <div className="mt-4 w-full max-w-2xl mx-auto">
                <div className="flex flex-col space-y-4">
                    {messages.filter(m => m.role !== 'system').map(m => (
                        <div key={m.id} className={`${m.role === 'user' ? 'text-right' : 'text-left'}`}>
                            <span className={`inline-block p-2 rounded ${m.role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}>
                                {m.role === 'user' ? (
                                    m.content
                                ) : (
                                <Markdown
                                    remarkPlugins={[remarkGfm]}
                                    rehypePlugins={[rehypeRaw]}
                                    components={{
                                        code({ node, inline, className, children, ...props }: any) {
                                        const match = /language-(\w+)/.exec(className || '');

                                        return !inline && match ? (
                                            <SyntaxHighlighter style={dracula} PreTag="div" language={match[1]} {...props}>
                                            {String(children).replace(/\n$/, '')}
                                            </SyntaxHighlighter>
                                        ) : (
                                            <code className={className} {...props}>
                                            {children}
                                            </code>
                                        );
                                        },
                                    }}
                                    >
                                    {m.content}
                                </Markdown>
                                        

                                )}
                            </span>
                        </div>
                    ))}
                </div>

                <form onSubmit={handleSubmit} className="mt-4">
                    <input
                        className="w-full p-2 border border-gray-300 rounded"
                        value={input}
                        onChange={handleInputChange}
                        placeholder="Ask a question..."
                    />
                    <button type="submit" className="mt-2 p-2 bg-blue-500 text-white rounded">Send</button>
                </form>
            </div>
        </div>
    );
}
