// 生成实例对象的原始模式
var Cat = {
	name: '',
	color: ''
}
var cat1 = {}
cat1.name = '大毛'
cat1.color = '黄色'
var cat2 = {}
cat2.name = '二毛'
cat2.color = '黑色'

// 优点：将两个属性封装在一个对象里，这是最简单的封装
// 问题：  1. 多生成几个实例，代码就一直在重复冗余;
// 2. 实例与原型之间，没有半点关联

//  原始模式的改进
function Cat(name, color) {
	return {
		name: name,
		color: color
	}
}
var cat1 = Cat('大毛', '黄色')
var cat2 = Cat('二毛', '黑色')

// 优点：封装了下，代码没那么冗余
// 问题: cat1与cat2没有内在联系，看不出来是同一个对象的实例

//  构造函数模式
// 构造函数实际上也就是个普通函数，只是里面采用this，this变量会绑定到实例对象上
function Cat(name, color) {
	this.name = name
	this.color = color
}
var cat1 = new Cat('大毛', '黄色')
var cat2 = new Cat('二毛', '黑色')
alert(cat1.name) // 大毛
alert(cat1.color) // 黄色

// 这时cat1和cat2会自动含有一个constructor属性，指向它们的构造函数
// 通过instanceof运算符，可以验证原型对象与实例对象的关系
alert(cat1.constructor == Cat) //true
alert(cat2.constructor == Cat) //true
alert(cat1 instanceof Cat) //true
alert(cat2 instanceof Cat) //true

//  构造函数模式的问题
// 像是一些不变的属性或方法，如果都在构造函数里定义，就会出现每次生成实例，都为重复的内容，多占用了内存
// 采用Prototype模式修订构造函数模式的问题
// 将不变的属性跟函数直接定义在prototype上
function Cat(name, color) {
	this.name = name
	this.color = color
}
Cat.prototype.type = '猫科动物'
Cat.prototype.eat = function () {
	alert('吃老鼠')
}

// 然后，生成实例
var cat1 = new Cat('大毛', '黄色')
var cat2 = new Cat('二毛', '黑色')
alert(cat1.type) // 猫科动物
cat1.eat() // 吃老鼠

// 这时所有实例的type属性和eat()方法，都是同一个内在地址，指向prototype对象
alert(cat1.eat == cat2.eat) //true

Cat.prototype.constructor == Animal
cat1.constructor == Cat.prototype.constructor
Cat.prototype = new Animal()

cat1.constructor == Animal
