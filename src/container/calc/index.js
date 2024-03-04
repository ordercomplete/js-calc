class Calc {
  static #value = '' //було this.#load()
  static #NAME = 'calc'
  static #isDot = false
  static #isResultShown = false // Додано нове поле для відстеження показу результату

  static add = (newValue) => {
    // Перевірка, чи відображено результат
    if (this.#isResultShown) {
      this.#value = '' // Скидання значення, якщо результат було показано
      this.#isResultShown = false // Повернення до стану до показу результату
    }

    if (isNaN(this.#value[this.#value.length - 2])) {
      if (
        Number(this.#value[this.#value.length - 1]) === 0 &&
        this.#isDot == false
      ) {
        return null
      }
    }

    this.#value = this.#value.concat(newValue)
    this.#output()
  }

  static #output = () => {
    this.#save()
    window.output.innerHTML = this.#value
  }

  static dot = () => {
    if (this.#isDot) {
      return null
    }

    if (isNaN(this.#value[this.#value.length - 1])) {
      return null
    }

    this.#value = this.#value.concat('.')
    this.#output()
    this.#isDot = true
  }

  static op = (opValue) => {
    if (isNaN(this.#value[this.#value.length - 1])) {
      return null
    }

    this.#value = this.#value.concat(opValue)
    this.#output()
    this.#isDot = false
  }

  // Example of extending with simple mathematical operations
  // static sqrt = () => {
  //   // Припустимо, корінь береться з останнього числового значення
  //   this.#value = `${this.#value}Math.sqrt(`
  //   this.#isDot = false // Думаю, це має бути обнулено
  // }

  // static pow = () => {
  //   this.#value = `${this.#value}Math.pow(`
  //   this.#isDot = false // При введенні ступеня, крапка повинна бути скинута
  // }

  // static percent = () => {
  //   this.#value += '/100*'
  //   this.#output()
  // }

  // static closeBracket = () => {
  //   this.#value += ')'
  //   this.#output()
  // }

  static reset = () => {
    this.#value = ''
    this.#isDot = false
    this.#output()
  }

  static result = () => {
    this.#value = String(eval(this.#value))
    this.#output()
    this.#isResultShown = true // Встановлення прапорця після виводу результату
  }

  static #save = () => {
    window.localStorage.setItem(this.#NAME, this.#value)
  }

  static #load = () => {
    this.#value =
      window.localStorage.getItem(this.#NAME) || ''
  }

  static init = () => {
    this.#load()
    this.#output()
    console.log('Calc is init')
  }
}

//Треба переконайтися, що скрипт виконується після того, як всі елементи DOM стали доступні. Це можна зробити, помістивши <script> тег ближче до кінця тіла документа (</body>), або використовуючи подію DOMContentLoaded. Цей код спрацював
document.addEventListener('DOMContentLoaded', (event) => {
  Calc.init()
})

// Calc.init() //тут проблема

window.calc = Calc
