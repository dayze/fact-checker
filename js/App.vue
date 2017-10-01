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
                 class="width-60 width-50-m width-100-s padding border-none shaded-box margin-15-top-xs"
                 id="inputSearch" name="inputSearch" type="search" title="Type something ..."
                 placeholder="Trump Sharks Miami ..." autofocus/>
          <button v-on:keyup.enter="key" @click="search"
                  id="searchBtn" title="Launch the research"
                  class="margin-30-top-s border-none color-yang transition-3 bg-turquoise hover-bg-concrete padding-5 padding-15-right-left">
            <span class="hide-m show-xs">Search</span>
            <span class="hide show-m hide-xs">Go</span>
          </button>


          <!--   <input v-model="query"
                    class="width-60 width-100-xs padding border-none shaded-box margin-15-top-xs"
                    id="inputSearch"
                    name="inputSearch"
                    type="search" title="Type something ..." placeholder="Trump Sharks Miami ..." autofocus/>
             <button v-on:keyup.enter="key" @click="search"
                     id="searchBtn" title="Launch the research"
                     class="margin-30-top-xs border-none color-yang transition-3 bg-turquoise hover-bg-concrete padding-5 padding-15-right-left">
               <span class="hide-m show-xs">Search</span>
               <span class="hide show-m hide-xs">GO</span>
             </button>-->
        </div>
      </header>

      <!-- @@@ FILTER BAR @@@ -->
      <button class="accordion txt-size-medium">
        <span>&#9660;</span>
        <span>Filters</span>
      </button>
      <div class="panel">
        <section class="row-column-m border-silver border-bottom flex-x-center align-center">
          <div class="cell-margin-0 border-right border-silver">
            <ul class="list-unstyled list-inline inline-block list-block-xl">
              <li class="padding-top-bottom txt-b color-green-sea">
                Research filters
              </li>
              <li class="padding-top-bottom">
                <span class="margin-right-left">between</span>
                <input id="inputDateRangeFrom" name="inputDateRangeFrom" type="date"/>
              </li>
              <li class="margin-15-bottom-xl">
                <span class="margin-right-left">and</span>
                <input id="inputDateRangeTo" name="inputDateRangeTo" type="date"/>
              </li>
            </ul>
          </div>
          <div v-if="Object.keys(facts).length !== 0" class="cell-6-margin-0 border-top-m border-silver">
            <ul class="list-unstyled list-inline inline-block list-block-xl">
              <li class="padding-top-bottom txt-b color-green-sea">
                Result filters
              </li>
              <li class="padding-top-bottom">
                <input class="dateCheck" id="inputDate" name="inputDate" type="checkbox" v-model="dateOrder"
                       @click="orderDate">
                <label for="inputDate" class="color-turquoise">date</label>
              </li>
              <li class="vertical-middle padding-top-bottom">
                <div class="onoffswitch">
                  <input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="myonoffswitch" checked
                         @click="orderTruthiness" v-model="truthinessOrder">
                  <label class="onoffswitch-label" for="myonoffswitch">
                    <span class="onoffswitch-inner"></span>
                    <span class="onoffswitch-switch"></span>
                  </label>
                </div>
              </li>
            </ul>
          </div>
        </section>
      </div>


      <!-- @@@ FACTS CONTAINER @@@ -->
      <section id="factsBlock" class="container-small margin-auto margin-50-top-bottom">

        <div v-if="loading">
          <loader class="loader"></loader>
        </div>
        <div>
          <div v-if="Object.keys(facts).length === 0 && !loading && queryHasBeenSent" class="row-column flex-y-center">
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
          <div v-else-if="!queryHasBeenSent" class="row">
            <div class="cell-12">
              <div class="txt-size-jumbo align-center">
                <span class="txt-upper color-turquoise APP_font_bebase">what</span>
                <span class="color-asbestos txt-size-giant APP_font_vincentia">is</span>
                <span class="">it</span>
                <span class="color-turquoise">?</span>
              </div>
              <p class="margin-50-top">
                Facts Checker is a project realized in surroundings of the training called DNR2-i at the university of Caen. The aim of this project was to develop a
                " <span class="txt-b">Hoax Search Engine</span>
                ". Indeed, with the search bar above, users are able to research several hoax according different keywords from the website
                <a class="txt-b hover-color-green-sea color-turquoise" title="Link to Politifact.com"
                   href="http://www.politifact.com/truth-o-meter/statements/">Politifact.com</a>. Each hoax get an authenticity rate and some filters are available in order to sort the result of the research by date and by authneticity rate.
              </p>
              <h3 class="margin-50-top">Used Technologies</h3>
              <ul class="list-style-circle">
                <li class="padding-top-bottom">
                  <a class="color-turquoise hover-color-green-sea" href="http://elasticlunr.com/"
                     title="Link to Elasticlunr.js" target="_blank">Elasticlunr.js</a>
                </li>
                <li class="padding-top-bottom">
                  <a class="color-turquoise hover-color-green-sea" href="https://nodejs.org/en/"
                     title="Link to Node.js" target="_blank">Node.js</a>
                </li>
                <li class="padding-top-bottom">
                  <a class="color-turquoise hover-color-green-sea" href="https://github.com/"
                     title="Link to GitHub" target="_blank">GitHub</a>
                </li>
                <li class="padding-top-bottom">
                  <a class="color-turquoise hover-color-green-sea" href="https://www.npmjs.com/"
                     title="Link to Npm" target="_blank">Npm</a>
                </li>
                <li class="padding-top-bottom">
                  <a class="color-turquoise hover-color-green-sea" href="https://vuejs.org/"
                     title="Link to Vue.js" target="_blank">Vue.js</a>
                </li>
              </ul>
            </div>
          </div>
          <div v-else v-for="fact in facts"
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

  import Filter from './modules/class/Filter'

  export default {
    components: {
      Loader
    },
    data () {
      return {
        query: '',
        facts: {},
        loading: false,
        queryHasBeenSent: false,
        /* ******* Filter variables ******* */
        dateOrder: false,
        truthinessOrder: false
      }
    },
    methods: {
      search () {
        this.loading = true
        this.$http.get(`http://localhost:4000/search/${this.query}`).then(response => {
          this.facts = response.body
          this.loading = false
          this.queryHasBeenSent = true
        }, response => {
          this.loading = false
          this.queryHasBeenSent = true
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
      },
      orderDate () {
        let filter = new Filter(this.facts)
        this.dateOrder ? filter.orderArrayByDateAsc() : filter.orderArrayByDateDesc()
      },
      orderTruthiness () {
        let filter = new Filter(this.facts)
        this.facts = this.truthinessOrder ? filter.orderArrayByTruthinessTrue() : filter.orderArrayByTruthinessFalse()
      }
    },
    mounted () {
      window.onload = function () {
        let acc = document.getElementsByClassName('accordion')
        let i

        for (i = 0; i < acc.length; i++) {
          acc[i].onclick = function () {
            if (this.firstChild.innerHTML.charCodeAt(0) === 9660) {
              this.firstChild.innerHTML = '\u25B2'
            } else {
              this.firstChild.innerHTML = '\u25BC'
            }
            this.classList.toggle('active')
            let panel = this.nextElementSibling
            if (panel.style.maxHeight) {
              panel.style.maxHeight = null
            } else {
              panel.style.maxHeight = panel.scrollHeight + 'px'
            }
          }
        }
      }
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
