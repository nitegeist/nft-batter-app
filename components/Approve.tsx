import React, { FC } from 'react';
import styles from '../styles/Home.module.css';

export const Approve: FC<React.PropsWithChildren<unknown>> = () => {
	const [approve, setApprove] = React.useState('');
	const handleApprove = () => {
		console.log(approve);
	};
	return (
		<form
			className={styles.column}
			onSubmit={(e) => {
				e.preventDefault();
				handleApprove();
			}}>
			<label className={styles.customField}>
				<input
					name='approve-address'
					id='approve-address'
					placeholder=' '
					onChange={(e) => setApprove(e.target.value)}
					value={approve}
				/>
				<span className={styles.placeholder}>Approval Contract Address</span>
			</label>
			<button className={styles.button} disabled={!approve}>
				Approve
			</button>
		</form>
	);
};
