class Animal {
  name: string;
  constructor(name: string) {
    this.name = name
  }
  run () {
    return `${this.name} is running`
  }
}

const snake = new Animal('snake')
console.log(snake.run())

class Dog extends Animal {
  bark() {
    return `${this.name} is barking`
  }
}

const dog = new Dog('Dog')
console.log(dog.run())
console.log(dog.bark())

class Cat extends Animal {
  constructor(name) {
    super(name)
    console.log(this.name)
  }
  run () {
    return `Meow, ` + super.run()
  }
}

const cat = new Cat('cat')
console.log(cat.run())

interface Radio {
  switchRadio (trigger: boolean): void
}

interface Battery {
  checkBatteryStatus()
}

interface RadioWithBattery extends Radio {
  checkBatteryStatus()
}

class Car implements Radio {
  switchRadio() {}
}

class Cellphone implements RadioWithBattery {
  switchRadio() {}
  checkBatteryStatus() {}
}