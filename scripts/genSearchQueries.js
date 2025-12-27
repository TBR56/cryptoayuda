const fs = require('fs');
const path = require('path');

const COINS = ["Bitcoin", "Ethereum", "USDT", "Solana", "BNB", "XRP", "Cardano", "Dogecoin", "Polygon", "TRON", "Litecoin", "Chainlink", "Polkadot", "Avalanche", "Shiba Inu", "Pepe", "Monero", "Uniswap", "Aave", "Cosmos"];
const EXCHANGES = ["Binance", "Coinbase", "Kraken", "OKX", "Bybit", "KuCoin", "Gate.io", "Bitget", "MEXC", "Crypto.com", "Bitfinex", "Gemini", "Phemex", "LBank"];
const WALLETS = ["MetaMask", "Trust Wallet", "Phantom", "Ledger", "Trezor", "SafePal", "Exodus", "Rainbow", "Atomic Wallet", "BlueWallet"];
const NETWORKS = ["Ethereum Mainnet", "Solana", "BSC (BEP20)", "Polygon", "Arbitrum", "Optimism", "Base", "Tron", "Bitcoin Network", "Avalanche C-Chain", "Cronos", "Fantom"];
const SITES = ["cryptofree-earn.com", "mining-bonus.org", "airdrop-claim.net", "yield-protocol-safe.com", "binance-support-live.com", "metamask-update.io", "trust-verify.com", "ledger-live-web.org"];
const PREFIXES = ["why is my", "how to fix", "problem with", "error", "help with", "where is", "can I", "is it possible to", "lost", "missing"];
const PLATFORMS = ["on iPhone", "on Android", "on Chrome", "on Desktop", "via App", "using Ledger"];
const YEARS = ["2024", "2025", "today", "now", "immediately"];

const slugify = (text) => text.toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-');

const titles = new Set();
const queries = [];

function generate(count, templates, category, intent) {
    let generated = 0;
    let attempts = 0;
    const maxAttempts = count * 50;

    while (generated < count && attempts < maxAttempts) {
        attempts++;
        const template = templates[Math.floor(Math.random() * templates.length)];
        let query = template
            .replace(/{coin}/g, COINS[Math.floor(Math.random() * COINS.length)])
            .replace(/{exchange}/g, EXCHANGES[Math.floor(Math.random() * EXCHANGES.length)])
            .replace(/{wallet}/g, WALLETS[Math.floor(Math.random() * WALLETS.length)])
            .replace(/{network}/g, NETWORKS[Math.floor(Math.random() * NETWORKS.length)])
            .replace(/{network2}/g, NETWORKS[Math.floor(Math.random() * NETWORKS.length)])
            .replace(/{site}/g, SITES[Math.floor(Math.random() * SITES.length)])
            .replace(/{prefix}/g, PREFIXES[Math.floor(Math.random() * PREFIXES.length)])
            .replace(/{platform}/g, PLATFORMS[Math.floor(Math.random() * PLATFORMS.length)])
            .replace(/{year}/g, YEARS[Math.floor(Math.random() * YEARS.length)])
            .replace(/{val}/g, Math.floor(Math.random() * 24) + 1);

        if (!titles.has(query)) {
            titles.add(query);
            queries.push({
                title: query,
                category,
                intent,
                slug: slugify(query)
            });
            generated++;
        }
    }
    console.log(`${category} done: ${generated}/${count} queries generated after ${attempts} attempts.`);
}

// 1. Transaction Issues (25% -> 1250)
const txTemplates = [
    "{prefix} {coin} withdrawal from {exchange} pending {year}",
    "sent {coin} to {network} address by mistake {platform}",
    "stuck {coin} transaction on {network} for {val} hours",
    "transaction failed but {coin} balance decreased on {exchange}",
    "{exchange} {coin} deposit not showing after {val} confirmations",
    "how to speed up {coin} transaction on {network} {year}",
    "{coin} transfer from {wallet} to {exchange} not arriving {year}",
    "sent {coin} via {network} instead of {network2} help",
    "can I cancel a pending {coin} withdrawal on {exchange} {year}",
    "minimum deposit for {coin} on {exchange} not met error",
    "missing {coin} swap from {wallet} {platform}",
    "{prefix} my {coin} tx stuck with low gas on {network}"
];

// 2. Wallet Problems (20% -> 1000)
const walletTemplates = [
    "{wallet} shows zero {coin} balance after update {year}",
    "how to find unknown token in {wallet} wallet {platform}",
    "{wallet} not connecting to {network} dapps {year}",
    "recover {wallet} seed phrase from private key manual",
    "why is my {wallet} balance not updating for {coin} {platform}",
    "{wallet} error fetching {coin} price {year}",
    "ledger connection issues with {wallet} extension {platform}",
    "phantom wallet not showing {coin} on {network} {year}",
    "metamask rpc error for {network} network fix",
    "trust wallet swap {coin} failed insufficient gas {year}",
    "{prefix} connect {wallet} to {network} {year}",
    "lost {coin} in {wallet} after firmware update"
];

// 3. Exchange Issues (15% -> 750)
const exchangeTemplates = [
    "{exchange} withdrawal frozen due to security review {year}",
    "can't withdraw {coin} from {exchange} kyc required help",
    "is {exchange} down today for {coin} trading {year}",
    "{exchange} login error 2FA code not working {platform}",
    "how to contact {exchange} live support for missing funds {year}",
    "{exchange} suspended {coin} network withdrawals help",
    "unauthorized login attempt on my {exchange} account {year}",
    "{exchange} app crashing when checking {coin} price {platform}",
    "{exchange} p2p order appeal for {coin} payment {year}",
    "limit order not executing on {exchange} for {coin} why",
    "{prefix} unlock {exchange} account for {coin} trading",
    "missing {coin} memo in {exchange} deposit"
];

// 4. Scam & Security (25% -> 1250)
const scamTemplates = [
    "is {site} legit or a crypto scam {year}",
    "{coin} airdrop on twitter legit or fake {year}",
    "received unknown {coin} in {wallet} is it a dust attack {year}",
    "revokable permission for {site} scam platform help",
    "how to report a crypto scam to {exchange} police {year}",
    "trusted recovery service for stolen {coin} legit or scam",
    "binance support message on telegram is it a scam {year}",
    "fake {exchange} website stole my {coin} help",
    "airdrop claim site {site} asking for seed phrase",
    "metamask wallet hacked after using {site} {year}",
    "{prefix} verify if {site} is safe for {coin}",
    "unknown token {coin} allowed access to {wallet}"
];

// 5. General Confusion (15% -> 750)
const generalTemplates = [
    "difference between {network} and {network2} for {coin} transfers",
    "what is {coin} gas price right now on {network} {year}",
    "why are {coin} network fees so high on {exchange} {year}",
    "how many confirmations needed for {coin} on {exchange}",
    "how to read {coin} explorer transaction hash {year}",
    "erc20 vs bep20 for sending {coin} from {exchange} {year}",
    "cold wallet vs hot wallet for {coin} security {year}",
    "best time to trade {coin} on {exchange} to avoid fees",
    "can I send {coin} from {network} to {network2} directly {year}",
    "how to track my {coin} whale alerts {platform}",
    "{prefix} buy {coin} with low fees {year}",
    "tax implications of {coin} staking in {year}"
];

console.log("Starting generation...");
generate(1250, txTemplates, "Transaction Issues", "informational");
generate(1000, walletTemplates, "Wallet Problems", "informational");
generate(750, exchangeTemplates, "Exchange Issues", "informational");
generate(1250, scamTemplates, "Scam & Security", "security");
generate(750, generalTemplates, "General Confusion", "informational");

const content = `export const SEARCH_QUERIES = ${JSON.stringify(queries, null, 2)};`;

const targetPath = path.join(__dirname, '../lib/searchQueries.ts');
fs.writeFileSync(targetPath, content);
console.log(`Generated ${queries.length} queries effectively in ${targetPath}`);
