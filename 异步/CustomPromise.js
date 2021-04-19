// 先定义三个常量表示状态
const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

// 新建 CustomPromise 类
class CustomPromise {
	constructor(executor) {
		// executor 是一个执行器，进入会立即执行
		// 并传入resolve和reject方法
		try {
			executor(this.resolve, this.reject)
		} catch (error) {
			// 如果有错误，就直接执行 reject
			this.reject(error)
		}
	}

	// 储存状态的变量，初始值是 pending
	status = PENDING

	// 成功之后的值
	value = null
	// 失败之后的原因
	reason = null

	// 存储成功回调函数
	// onFulfilledCallback = null
	onFulfilledCallbacks = []
	// 存储失败回调函数
	// onRejectedCallback = null
	onRejectedCallbacks = []

	// resolve和reject为什么要用箭头函数？
	// 如果直接调用的话，普通函数this指向的是window或者undefined
	// 用箭头函数就可以让this指向当前实例对象

	// 更改成功后的状态
	resolve = (value) => {
		// 状态为 PENDING 时才可以更新状态
		if (this.status === PENDING) {
			// 状态修改为成功
			this.status = FULFILLED
			// 保存成功之后的值
			this.value = value
			// resolve里面将所有成功的回调拿出来执行
			if (this.onFulfilledCallbacks.length) {
				this.onFulfilledCallbacks.forEach((fn) => fn(value))
			}
		}
	}
	// 更改失败后的状态
	reject = (reason) => {
		// 状态为 PENDING 时才可以更新状态
		if (this.status === PENDING) {
			// 状态修改为失败
			this.status = REJECTED
			// 保存失败后的原因
			this.reason = reason
			// reject里面将所有成功的回调拿出来执行
			if (this.onRejectedCallbacks.length) {
				this.onRejectedCallbacks.forEach((fn) => fn(reason))
			}
		}
	}
	// resolve 静态方法
	static resolve(parameter) {
		// 如果传入 CustomPromise 就直接返回
		if (parameter instanceof CustomPromise) {
			return parameter
		}

		// 转成常规方式
		return new CustomPromise((resolve) => {
			resolve(parameter)
		})
	}

	// reject 静态方法
	static reject(reason) {
		return new CustomPromise((resolve, reject) => {
			reject(reason)
		})
	}

	static all(values) {
		if (!Array.isArray(values)) {
			const type = typeof values
			return new TypeError(`TypeError: ${type} ${values} is not iterable`)
		}

		return new CustomPromise((resolve, reject) => {
			let resultArr = []
			let orderIndex = 0
			const processResultByKey = (value, index) => {
				resultArr[index] = value
				if (++orderIndex === values.length) {
					resolve(resultArr)
				}
			}
			for (let i = 0; i < values.length; i++) {
				let value = values[i]
				if (value && typeof value.then === 'function') {
					value.then((value) => {
						processResultByKey(value, i)
					}, reject)
				} else {
					processResultByKey(value, i)
				}
			}
		})
	}

	static race(promises) {
		return new CustomPromise((resolve, reject) => {
			// 一起执行就是for循环
			for (let i = 0; i < promises.length; i++) {
				let val = promises[i]
				if (val && typeof val.then === 'function') {
					val.then(resolve, reject)
				} else {
					// 普通值
					resolve(val)
				}
			}
		})
	}
}

CustomPromise.prototype.then = function (onFulfilled, onRejected) {
	// 如果不传，就使用默认函数
	onFulfilled =
		typeof onFulfilled === 'function' ? onFulfilled : (value) => value
	onRejected =
		typeof onRejected === 'function'
			? onRejected
			: (reason) => {
					throw reason
			  }
	// 为了实现链式调用，创建个新的 CustomPromise 对象，并返回
	const promise2 = new CustomPromise((resolve, reject) => {
		// 这里的内容在执行器中，会立即执行
		const fulfilledMicrotask = () => {
			// 创建一个微任务等待 promise2 完成初始化
			queueMicrotask(() => {
				try {
					// 调用成功回调，并且把值返回
					const x = onFulfilled(this.value)
					// 传入 resolvePromise 集中处理
					resolvePromise(promise2, x, resolve, reject)
				} catch (err) {
					reject(err)
				}
			})
		}

		const rejectedMicrotask = () => {
			// 创建一个微任务等待 promise2 完成初始化
			queueMicrotask(() => {
				try {
					// 调用失败回调，并且把原因返回
					const x = onRejected(this.reason)
					// 传入 resolvePromise 集中处理
					resolvePromise(promise2, x, resolve, reject)
				} catch (err) {
					reject(err)
				}
			})
		}
		// 判断状态
		if (this.status === FULFILLED) {
			fulfilledMicrotask()
		} else if (this.status === REJECTED) {
			rejectedMicrotask()
		} else if (this.status === PENDING) {
			// 因为不知道后面状态的变化情况，所以将成功回调和失败回调存储起来
			// 等到promise状态切为成功或失败时再执行
			// this.onFulfilledCallback = onFulfilled
			// this.onRejectedCallback = onRejected
			this.onFulfilledCallbacks.push(fulfilledMicrotask)
			this.onRejectedCallbacks.push(rejectedMicrotask)
		}
	})
	return promise2
}

CustomPromise.prototype.catch = function (errCallback) {
	return this.then(null, errCallback)
}
CustomPromise.prototype.finally = function (callback) {
	return this.then(
		(value) => {
			return CustomPromise.resolve(callback()).then(() => value)
		},
		(reason) => {
			return CustomPromise.resolve(callback()).then(() => {
				throw reason
			})
		}
	)
}
function resolvePromise(promise2, x, resolve, reject) {
	// 如果相等了，说明return的是自己，抛出类型错误并返回
	if (promise2 === x) {
		return reject(
			new TypeError('Chaining cycle detected for promise #<Promise>')
		)
	}
	// 判断x是不是 CustomPromise 实例对象
	if (x instanceof CustomPromise) {
		// 执行 x，调用 then 方法，目的是将其状态变为 fulfilled 或者 rejected
		// x.then(value => resolve(value), reason => reject(reason))
		// 简化之后
		x.then(resolve, reject)
	} else {
		// 普通值
		resolve(x)
	}
}

module.exports = CustomPromise
