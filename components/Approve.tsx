import { FC, useState } from 'react';
import styles from '../styles/Home.module.css';

export const Approve: FC<React.PropsWithChildren<unknown>> = () => {
	const [approve, setApprove] = useState('');
	const handleApprove = () => {
		console.log({ approve });
	};
	return (
		<form
			className={styles.column}
			onSubmit={(e) => {
				e.preventDefault();
				handleApprove();
			}}>
			<div className={styles.customField}>
				<label>Contract Address for Approval</label>
				<input
					name='approve-address'
					id='approve-address'
					placeholder='0x70997970c51812dc3a010c7d01b50e0d17dc79c8'
					onChange={(e) => setApprove(e.target.value)}
					value={approve}
				/>
			</div>
			<button className={styles.button} disabled={!approve}>
				Approve
			</button>
		</form>
	);
};
