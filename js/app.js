(function () {
  'use strict';

  var Vue = window.Vue;

  new Vue({
    el: '#app',

    data: {
      url: 'https://api.github.com/users/fengyuanchen/repos?per_page=100',
      repos: [],
      loading: true
    },

    created: function () {
      this.load();
    },

    methods: {
      load: function () {
        var vm = this;
        var xhr = new XMLHttpRequest();

        xhr.onabort = xhr.onerror = function(e) {
          console.log(e);
        };

        xhr.onload = function(e) {
          var data = [];

          try {
            data = JSON.parse(e.target.response);
            data.sort(vm.sort);
          } catch (e) {
            console.log(e.message);
          }

          vm.loading = false;
          vm.repos = data;
        };

        xhr.open('get', this.url);
        xhr.send();
      },

      sort: function (a, b) {
        return (b.stargazers_count - a.stargazers_count) || this.getSortOrder(a.name, b.name);
      },

      getSortOrder: function (a, b) {
        var n = Math.min(a.length, b.length);
        var order = 0;
        var i = 0;

        while (!order && i < n) {
          order = a.charCodeAt(i) - b.charCodeAt(i++);
        }

        return order;
      }
    }
  });
})();
