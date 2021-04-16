// 引入我们的 MyPromise.js
// const MyPromise = require('./MyPromise')
// import MyPromise from './MyPromise'
// const promise = new MyPromise((resolve, reject) => {
// 	// 目前这里只处理同步的问题
// 	debugger
// 	resolve('success')
// 	// throw new Error('执行器错误')
// })
// promise
// 	.then()
// 	.then()
// 	.then((value) => console.log(value))

const promise = new MyPromise((resolve, reject) => {
	reject('err')
})

promise
	.then()
	.then()
	.then(
		(value) => console.log(value),
		(reason) => console.log(reason, 'result')
	)

console.info(232323)
// 这个时候将promise定义一个p1，然后返回的时候返回p1这个promise
// const p1 = promise.then((value) => {
// 	console.log(1)
// 	console.log('resolve', value)
// 	return p1
// })

// 第一个then方法中的错误要在第二个then方法中捕获到
// promise
// 	.then(
// 		(value) => {
// 			console.log(1)
// 			console.log('resolve', value)
// 			throw new Error('then error')
// 		},
// 		(reason) => {
// 			console.log(2)
// 			console.log(reason.message)
// 		}
// 	)
// 	.then(
// 		(value) => {
// 			console.log(3)
// 			console.log(value)
// 		},
// 		(reason) => {
// 			console.log(4)
// 			console.log(reason.message)
// 		}
// 	)
// function other() {
// 	return new MyPromise((resolve, reject) => {
// 		resolve('other')
// 	})
// }
// promise
// 	.then((value) => {
// 		console.log(1)
// 		console.log('resolve', value)
// 		return other()
// 	})
// 	.then((value) => {
// 		console.log(2)
// 		console.log('resolve', value)
// 	})
