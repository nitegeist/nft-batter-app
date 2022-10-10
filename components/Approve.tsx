import { FC, useState } from 'react';
import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi';
import { useDebounce } from '../hooks';
import styles from '../styles/Home.module.css';
import { erc721ABI } from '../web3/erc721ABI';

export const Approve: FC<React.PropsWithChildren<unknown>> = () => {
	const [approveAddress, setApproveAddress] = useState<string>('');
	const debouncedApproveAddress = useDebounce(approveAddress, 500);
	const address = '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2';
	console.log({ address, erc721ABI });
	const {
		config,
		error: prepareError,
		isError: isPrepareError,
	} = usePrepareContractWrite({
		addressOrName: address,
		contractInterface: erc721ABI,
		functionName: 'setApprovalForAll',
		args: [parseInt(debouncedApproveAddress), true],
		enabled: Boolean(debouncedApproveAddress),
	});
	const { data, error, isError, write } = useContractWrite(config);
	const { isLoading, isSuccess } = useWaitForTransaction({
		hash: data?.hash,
	});

	return (
		<form
			className={styles.column}
			onSubmit={(e) => {
				e.preventDefault();
				try {
					write?.();
					console.log({ data });
				} catch (error) {
					console.error(error);
				}
			}}>
			<div className={styles.customField}>
				<label>Contract address for approval</label>
				<input
					name='approval-address'
					id='approval-address'
					placeholder='0x70997970c51812dc3a010c7d01b50e0d17dc79c8'
					value={approveAddress}
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
			{(isPrepareError || isError) && <div>⚠️ Error: {(prepareError || error)?.message}</div>}
		</form>
	);
};
