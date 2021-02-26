import Vue from 'vue'
import Router from 'vue-router'
import UIIndex from '@/components/index.vue'
import HourWeek from '@/demo/hour-week.vue'
import FilterSelect from '@/demo/filter-select.vue'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'UIIndex',
    component: UIIndex,
    children: [{
        path: '/',
        redirect: '/hourweek'
      },
      {
        path: '/hourweek',
        name: "HourWeek",
        component: HourWeek,
        mate: {
          title: '时间选择器',
          nav: 'hourweek'
        }
      },
      {
        path: '/filter-select',
        name: 'FilterSelect',
        component: FilterSelect,
        mate: {
          title: 'select选择器',
          nav: 'filter-select'
        }
      }
    ]
  }]
})
