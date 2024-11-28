import { DataResource } from "../services/DataResource"

export interface DepositProps {
	username: string
    coin: string
    amount: number
}

export const DepositTable = new DataResource<DepositProps>(
	'http://localhost:5000/user_balances', 'amount'
)