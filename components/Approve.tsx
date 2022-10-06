import { FC, useState } from 'react';
import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi';
import { useDebounce } from '../hooks';
import styles from '../styles/Home.module.css';
import { erc721ABI } from '../web3/erc721ABI';

export const Approve: FC<React.PropsWithChildren<unknown>> = () => {
	const [approveAddress, setApproveAddress] = useState<string>('');
	const debouncedApprveAddress = useDebounce(approveAddress, 500);

	const { config } = usePrepareContractWrite({
		addressOrName: '0x1dfe7Ca09e99d10835Bf73044a23B73Fc20623DF',
		contractInterface: erc721ABI,
		functionName: 'setApprovalForAll',
		args: [parseInt(debouncedApprveAddress), true],
		enabled: Boolean(debouncedApprveAddress),
	});
	const { data, write } = useContractWrite(config);
	const { isLoading, isSuccess } = useWaitForTransaction({
		hash: data?.hash,
	});

	return (
		<form
			className={styles.column}
			onSubmit={(e) => {
				e.preventDefault();
				write?.();
				console.log({ data });
			}}>
			<div className={styles.customField}>
				<label>Contract address for approval</label>
				<input
					name='approval-address'
					id='approval-address'
					placeholder='0x70997970c51812dc3a010c7d01b50e0d17dc79c8'
					onChange={(e) => setApproveAddress(e.target.value)}
				/>
			</div>
			<button type='submit' className={styles.button} disabled={!write || isLoading}>
				{isLoading ? 'Approving...' : 'Approve'}
			</button>
			{isSuccess && (
				<div>
					Successfully approved!
					<div>
						<a href={`https://etherscan.io/tx/${data?.hash}`}>View transaction on etherscan</a>
					</div>
				</div>
			)}
		</form>
	);
};
