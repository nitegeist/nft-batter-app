import type { NextPage } from 'next';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useAccount, useContractWrite, usePrepareContractWrite } from 'wagmi';
import { Account, Approve, ConnectWallet, TextField } from '../components';
import { useIsMounted } from '../hooks';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
	const [recipients, setRecipients] = useState<string[]>([]);
	const [tokenIds, setTokenIds] = useState<string[]>([]);
	const [approveAddress, setApproveAddress] = useState<string>('');
	const { config } = usePrepareContractWrite({
		addressOrName: '0x57f1887a8BF19b14fC0dF6Fd9B2acc9Af147eA85',
		contractInterface: ['function setApprovalForAll()'],
		functionName: 'setApprovalForAll',
		args: [approveAddress, true],
	});
	const { writeAsync: setApprovalForAll, error: approvalError } = useContractWrite(config);
	const isMounted = useIsMounted();
	const { isConnected } = useAccount();
	useEffect(() => {
		if (approveAddress) console.log(approveAddress);
		// setApprovalForAll?.();
	}, [approveAddress]);
	return (
		<div className={styles.container}>
			<Head>
				<title>NFT Volley</title>
				<meta name='description' content='An efficient multi-sender for ERC721 tokens' />
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<main className={styles.main}>
				<h1 className={styles.title}>NFT Volley</h1>
				<p className={styles.description}>An efficient multi-sender for ERC721 tokens.</p>
				{isMounted && isConnected && (
					<>
						<Account />
						<TextField setRecipients={setRecipients} setTokenIds={setTokenIds} />
						<Approve setApproveAddress={setApproveAddress} />
					</>
				)}
				{!isConnected && <ConnectWallet />}
				<a
					target='_blank'
					rel='noreferrer'
					className={styles.link}
					href='https://etherscan.io/address/0x139406b446bccc8aa6b328ff29385a7495d78043'>
					etherscan &#x1f517;
				</a>
			</main>
		</div>
	);
};

export default Home;
