const CustomPromise = require('./CustomPromise')
let p1 = new CustomPromise((resolve, reject) => {
	setTimeout(() => {
		resolve('ok1')
	}, 1000)
})

let p2 = new CustomPromise((resolve, reject) => {
	setTimeout(() => {
		resolve('ok2')
	}, 1000)
})

CustomPromise.all([1, 2, 3, p1, p2]).then(
	(data) => {
		console.log('resolve', data)
	},
	(err) => {
		console.log('reject', err)
	}
)

// CustomPromise.resolve(
// 	new CustomPromise((resolve, reject) => {
// 		setTimeout(() => {
// 			reject('fail')
// 		}, 1000)
// 	})
// )
// 	.then((value) => {
// 		console.info(value, 'value')
// 	})
// 	.catch((err) => {
// 		console.info(err, 'err')
// 	})
// CustomPromise.resolve(456)
// 	.finally(() => {
// 		return new CustomPromise((resolve, reject) => {
// 			setTimeout(() => {
// 				resolve(123)
// 			}, 3000)
// 		})
// 	})
// 	.then((data) => {
// 		console.log(data, 'success')
// 	})
// 	.catch((err) => {
// 		console.log(err, 'error')
// 	})

// CustomPromise.resolve()
// 	.then(() => {
// 		console.log(0)
// 		return CustomPromise.resolve(4)
// 	})
// 	.then((res) => {
// 		console.log(res)
// 	})
// CustomPromise.resolve()
//               ^

// TypeError: CustomPromise.resolve is not a function
// const p = new CustomPromise((resolve, reject) => {
// 	reject('err')
// })

// p.then()
// 	.then()
// 	.then(
// 		(value) => console.log(value),
// 		(err) => console.info(err)
// 	)
// p.then(
// 	(value) => {
// 		console.info(1)
// 		console.info('resolve', value)
// 		throw new Error('callback error')
// 	},
// 	(reason) => {
// 		console.info(2)
// 		console.info(reason.message)
// 	}
// )
// 	.then(
// 		(value) => {
// 			console.info(3)
// 			console.info(value)
// 		},
// 		(err) => {
// 			console.info(4)
// 			console.info(err.message)
// 			return err.message
// 		}
// 	)
// 	.then((value) => {
// 		console.info(5)
// 		console.info(value)
// 		throw new Error('err') // 进入下一个then里的onRejected
// 		// return new Error('err') // 进入下一个then里的onFulfilled
// 	})
// 	.then(
// 		(value) => {
// 			console.info(6)
// 			console.info(value)
// 		},
// 		(err) => {
// 			console.info(7)
// 			console.info(err.message)
// 		}
// 	)
