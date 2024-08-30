import { defineChain } from "thirdweb";

export const CROWDFUNDING_FACTORY = "0x197a75ab3F79D4A2b9465Fd0Dba9f083606672e2";
export const openCampusCodex = /* @__PURE__ */ defineChain({
    id: 656476,
    name: "Open Campus Codex",
    nativeCurrency: { name: "EDU", symbol: "EDU", decimals: 18 },
    blockExplorers: [
      {
        name: "Codex Block Explorer",
        url: "https://opencampus-codex.blockscout.com",
      },
    ],
    testnet: true,
});