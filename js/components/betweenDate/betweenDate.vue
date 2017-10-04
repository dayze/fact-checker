<template>
    <div class="cell-margin-0 border-right border-silver">
        <ul class="list-unstyled list-inline inline-block list-block-xl">
            <li class="padding-top-bottom txt-b color-green-sea">
                Research filters
            </li>
            <li class="padding-top-bottom">
                <span class="margin-right-left">between</span>
                <datepicker :placeholder="'Begin date...'" v-model="beginDate._d" v-on:input="updateDate('begin')"></datepicker>
            </li>
            <li class="margin-15-bottom-xl">
                <span class="margin-right-left">and</span>
                <datepicker :placeholder="'End date...'" v-model="endDate._d" v-on:input="updateDate('end')"></datepicker>
            </li>
        </ul>
    </div>
</template>
<script>
  import Datepicker from 'vuejs-datepicker'
 // import Moment from 'moment'
  export default {
    components: {
      Datepicker
    },
    props: {
      beginDate: {},
      endDate: {}
    },
    methods: {
      updateDate (type) {
        if (this.beginDate._d !== '' && this.endDate._d !== '') {
          this.$emit('update-date', type, {beginDate: this.beginDate._d, endDate: this.endDate._d})
        }
      }
    },
    mounted () {
    }
  }
</script>
