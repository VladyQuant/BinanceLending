import { DepositTable, DepositProps } from "./models/Deposit"

const depositForm = document.querySelector('.deposit') as HTMLFormElement
console.log(depositForm)

depositForm.addEventListener('submit', async (e) => {
	e.preventDefault()

	const data = new FormData(depositForm)

	const newDeposit: DepositProps = {
		username: data.get('username') as string,
		coin: data.get('coin') as string,
		amount: parseFloat(data.get('amount') as string),
	}

	const res = await DepositTable.create(newDeposit)

	if (!res.ok) {
		console.log('not able to save the deposit')
	}
	if (res.ok) {
		window.location.href = '/'
	}
})
