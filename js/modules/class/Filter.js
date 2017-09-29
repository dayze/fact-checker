import moment from 'moment'

export default class Filter {
  constructor (data) {
    this.data = data
  }

  orderArrayByDateAsc () {
    this.data.sort(function (a, b) {
      return moment(a.date).format('X') - moment(b.date).format('X')
    })
  }

  orderArrayByDateDesc () {
    this.data.sort(function (a, b) {
      return moment(b.date).format('X') - moment(a.date).format('X')
    })
  }

  orderArrayByTruthinessTrue () {
    let {arrayTrue, arrayHalf, arrayFalse} = this._orderArrayByTruthiness()
    return arrayTrue.concat(arrayHalf).concat(arrayFalse)
  }

  orderArrayByTruthinessFalse () {
    let {arrayTrue, arrayHalf, arrayFalse} = this._orderArrayByTruthiness()
    return arrayFalse.concat(arrayHalf).concat(arrayTrue)
  }

  _orderArrayByTruthiness () {
    let arrayTrue = []
    let arrayFalse = []
    let arrayHalf = []
    for (let item of this.data) {
      if (item.truthiness === 'true') {
        arrayTrue.push(item)
      } else if (item.truthiness === 'false') {
        arrayFalse.push(item)
      } else {
        arrayHalf.push(item)
      }
    }
    return {arrayTrue, arrayHalf, arrayFalse}
  }
}
