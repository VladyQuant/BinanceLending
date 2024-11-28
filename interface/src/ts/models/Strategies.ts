import { DataResource } from "../services/DataResource"

export interface StrategyProps {
	username: string
    strategy: string
    coin: string
    amount: number
}

export const StrategyTable = new DataResource<StrategyProps>(
	'http://localhost:5000/user_strategies', 'amount'
)