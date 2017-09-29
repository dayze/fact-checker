<template>
  <div id="app">

    <div id="footerPusher">

      <!-- @@@ HEADER @@@ -->
      <header class="row flex-x-center padding-50-top-bottom padding-15-s padding-50-bottom-s">
        <div class="cell-8 c-10-xl c-12-l align-center">
          <h1 class="color-yang">
            <a class="txt-size-jumbo APP_font_bebase" href="" title="home">Facts Checker</a>
            <span class="block txt-unstyled APP_font_vincentia">
                        <span class="color-emerald">truth</span> & <span class="color-alizarin">hoax</span>
                    </span>
          </h1>
          <input v-model="query"
                 class="width-60 width-100-xs padding border-none shaded-box margin-15-top-xs"
                 id="inputSearch"
                 name="inputSearch"
                 type="search" title="Type something ..." placeholder="Trump Sharks Miami ..." autofocus/>
          <button v-on:keyup.enter="key" @click="search"
                  id="searchBtn" title="Launch the research"
                  class="margin-30-top-xs border-none color-yang transition-3 bg-turquoise hover-bg-concrete padding-5 padding-15-right-left">
            <span class="hide-m show-xs">Search</span>
            <span class="hide show-m hide-xs">GO</span>
          </button>
        </div>
      </header>

      <!-- @@@ FILTER BAR @@@ -->
      <section class="row border-bottom border-silver flex-x-center">
        <div class="cell-12-margin-0 align-center">
          <ul class="list-unstyled list-inline inline block list-separator">
            <li class="padding-top-bottom">
              <span>Filter</span>
            </li>
            <li class="padding-top-bottom">
              <input id="inputDate" name="inputDate" type="checkbox">
              <label for="inputDate" class="color-turquoise">date</label>
            </li>
            <li class="padding-top-bottom">
              <span class="color-turquoise">Authenticity </span>
              <input name="authenticityFilter" id="falseAuthenticity" type="radio"/>
              <label for="falseAuthenticity">False</label>
              <input name="authenticityFilter" id="trueAuthenticity" type="radio"/>
              <label for="trueAuthenticity">True</label>
            </li>
          </ul>
        </div>


        <!--<div class="cell-6 margin-0 align-center">
          <div class="inline-block border-right border-silver padding">



            <img class="APP_vertical_bottom" src="../media/icon/settings-24.png" alt="Settings icon"/>
            <span class="txt-size-medium">Filter</span>
          </div>
          <ul class="list-unstyled list-separator list-inline inline block padding">
            <li>
              <span>&#8593</span>
              <span class="color-turquoise">date</span>
            </li>
            <li>
              <span class="color-turquoise">Authenticity : </span>
              <input name="authenticityFilter" id="falseAuthenticity" type="radio"/>
              <label for="falseAuthenticity">False</label>
              <input name="authenticityFilter" id="trueAuthenticity" type="radio"/>
              <label for="trueAuthenticity">True</label>
            </li>
          </ul>
        </div>-->
        <!--
        <label class="switch">
          <input type="checkbox">
          <span class="slider round"></span>
        </label>-->

      </section>

      <!-- @@@ FACTS CONTAINER @@@ -->
      <section id="factsBlock" class="container-small margin-auto margin-50-top-bottom">

        <div v-if="loading">
          <loader class="loader"></loader>
        </div>
        <div>
          <div v-if="Object.keys(facts).length === 0 && !loading" class="row-column flex-y-center">
            <div class="cell-6">
              <figure>
                <img class="responsive-img" src="../media/icon/emoticon-blazed.png"
                     alt="emoticon blazed"/>
              </figure>
            </div>
            <div class="cell- align-center">
              <span class="txt-upper txt-size-big">oups !</span><br>
              <span class="txt-upper txt-size-jumbo APP_font_bebase">no fact <span
                class="color-turquoise">#</span>atm</span>
              <p class="align-center">Get more luck with differents keywords !</p>
              <hr class="ellipse">
            </div>
          </div>
          <div v-else="" v-for="fact in facts"
               class="row-column-reverse-s flex-y-center flex-y-stretch-s flex-x-around margin-50-bottom">
            <div class="cell-8">
              <a class="margin-0-top-s block align-center-s txt-size-medium margin-0-bottom"
                 :href="fact.source">
                <span class="color-turquoise">#</span>
                {{ fact.title }}
              </a>
              <span class="txt-i color-asbestos">{{ fact.date }}</span>
              <p>
                {{ fact.content }}
              </p>
            </div>
            <div :class="thruthiness(fact.truthiness)"
                 class="cell-3 align-center shaded-box border-3 round-50 padding-50-top-bottom padding-15-s">
              <span>It's fucking</span>
              <span :class="thruthiness(fact.truthiness, true)"
                    class="block txt-upper txt-size-medium">{{fact.truthiness}}</span>
            </div>
            <hr class="ellipse width-100">
          </div>
        </div>
      </section>
    </div>

    <!-- @@@ FOOTER @@@ -->
    <footer class="row padding-15 bg-clouds color-wet-asphalt">
      <div class="cell-12 align-center color-asbestos">
        <ul class="list-unstyled list-inline list-separator list-no-separator-s list-block-s">
          <li>Realized by <span class="color-turquoise">Habit Jérémy</span> & <span
            class="color-turquoise">Maxime Lainé</span>
          </li>
          <li>M2 - DNR2i</li>
          <li>2017/2018</li>
        </ul>
      </div>

    </footer>
  </div>
</template>

<script>
  import Loader from './modules/loader/loader.vue'

  export default {
    components: {
      Loader
    },
    data () {
      return {
        query: '',
        facts: {},
        loading: false
      }
    },
    methods: {
      key (event) {
        console.log(event)
      },
      search () {
        this.loading = true
        this.$http.get(`http://localhost:4000/search/${this.query}`).then(response => {
          this.facts = response.body
          this.loading = false
        }, response => {
          // error callback
        })
      },
      thruthiness (fact, str) {
        let result = []
        if (fact === 'true') {
          result.push('emerald')
        } else if (fact === 'false') {
          result.push('alizarin')
        } else {
          result.push('carrot')
        }
        result[0] = str ? `color-${result[0]}` : `border-${result[0]}`
        return result
      }
    },
    mounted () {
      console.log(Object.keys(this.facts).length)
    }
  }
</script>

<style lang="scss">
  .loader {
    position: absolute;
    margin: auto;
    top: 50%;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 10;
  }
</style>
