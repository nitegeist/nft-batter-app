import { FC, useState } from 'react';
import { useContractWrite, usePrepareContractWrite } from 'wagmi';
import styles from '../styles/Home.module.css';
import { erc721ABI } from '../web3/erc721ABI';

export const Approve: FC<React.PropsWithChildren<unknown>> = () => {
	const { ERC721_ADDRESS } = process.env;
	const [approveAddress, setApproveAddress] = useState<string>('');
	const { config } = usePrepareContractWrite({
		addressOrName: ERC721_ADDRESS as string,
		contractInterface: erc721ABI,
		functionName: 'setApprovalForAll',
		args: [approveAddress, true],
	});
	const { data, isLoading, isSuccess, write } = useContractWrite(config);
	return (
		<form
			className={styles.column}
			onSubmit={(e) => {
				e.preventDefault();
				write?.();
				console.log({ data });
			}}>
			<div className={styles.customField}>
				<label>Contract Address for Approval</label>
				<input
					name='approval-address'
					id='approval-address'
					placeholder='0x70997970c51812dc3a010c7d01b50e0d17dc79c8'
					onChange={(e) => setApproveAddress(e.target.value)}
				/>
			</div>
			<button type='submit' className={styles.button} disabled={!write}>
				Approve
			</button>
		</form>
	);
};
