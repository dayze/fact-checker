import Moment from 'moment'

export default class Filter {
  constructor (data) {
    this.data = data
  }

  orderArrayByDateAsc () {
    this.data.sort(function (a, b) {
      return Moment(a.date).format('X') - Moment(b.date).format('X')
    })
    return this.data
  }

  orderArrayByDateDesc () {
    this.data.sort(function (a, b) {
      return Moment(b.date).format('X') - Moment(a.date).format('X')
    })
    return this.data
  }

  orderArrayByTruthinessTrue () {
    let {arrayTrue, arrayHalf, arrayFalse} = this._orderArrayByTruthiness()
    return arrayTrue.concat(arrayHalf).concat(arrayFalse)
  }

  orderArrayByTruthinessFalse () {
    let {arrayTrue, arrayHalf, arrayFalse} = this._orderArrayByTruthiness()
    return arrayFalse.concat(arrayHalf).concat(arrayTrue)
  }

  orderArrayBetweenDate (date) {
    for (let data of this.data) {
      data.date = new Moment(data.date)
      data.isVisible = data.date.isBetween(date.beginDate, date.endDate)
    }
    return this.data
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
