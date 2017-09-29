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
}
