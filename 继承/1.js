// 这段是旧代码
function Cat(name, color) {
	var heart = '❤️'
	var stomach = '胃'
	var heartbeat = function () {
		console.log(heart + '跳')
	}
	this.name = name
	this.color = color
	this.jump = function () {
		heartbeat() // 能跳起来表明这只猫是活的,心也就能跳
		console.log('我跳起来了~来追我啊')
	}
}
// 这段是新增的代码
Cat.descript = '我这个构造函数是用来生产出一只猫的'
Cat.actingCute = function () {
	console.log('一听到猫我就想到了它会卖萌')
}
Cat.prototype.cleanTheBody = function () {
	console.log('我会用唾液清洁身体')
}
var guaiguai = new Cat('guaiguai', 'white')
console.log(Cat.descript)
Cat.actingCute()
console.log(guaiguai.descript)
guaiguai.cleanTheBody()

function Person(name, sex) {
	this.name = name //公有属性
	this.sex = sex
	var evil = '我很邪恶'
	var pickNose = function () {
		//私有
		console.log('我会扣鼻子但不让你看见')
	}
	this.drawing = function (type) {
		console.log('我要画一幅' + type)
	}
}
// 静态方法
Person.fight = function () {
	console.log('打架')
}
// 公共函数
Person.prototype.wc = function () {
	console.log('我是个人我会wc')
}
var p1 = new Person('lindaidai', 'boy')
console.log(p1.name) // lindaidai
console.log(p1.evil) // undefined
p1.drawing('国画') // 我要画一幅国画
// p1.pickNose() // 报错
// p1.fight() // 报错
p1.wc() // 我是个人我会wc
Person.fight() // 打架
// Person.wc() // 报错
console.log(Person.sex) //undefined
// this.sex相当于给实例增加属性sex,而不是给构造函数本身增加sex
