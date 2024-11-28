import { StrategyProps, StrategyTable } from "./models/Strategies"

const lendForm = document.querySelector('.lend') as HTMLFormElement

lendForm.addEventListener('submit', async (e) => {
	e.preventDefault()

	const data = new FormData(lendForm)

	const newStrategy: StrategyProps = {
		username: data.get('username') as string,
        strategy: data.get('strategy') as string,
		coin: data.get('coin') as string,
		amount: parseFloat(data.get('amount') as string),
	}

	const res = await StrategyTable.create(newStrategy)

	if (!res.ok) {
		console.log('not able to save the pizza')
	}
	if (res.ok) {
		window.location.href = '/'
	}
})
