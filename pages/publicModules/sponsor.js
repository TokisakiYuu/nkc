document.addEventListener("DOMContentLoaded", function() {
  new Vue({
    el: "#sponsor",
    data: {
      open: false,
      selected: 0,
      custom: 0
    },
    methods: {
      openForm: function(el) {
        this.open = !this.open;
      },
      inputCustomAmount: function(e) {
        var el = e.target;
        var val = el.value;
        if(val === "元") return el.value = "";
        var numbers = val.match(/[0-9]{1}/g);
        if (numbers) {
          var num = numbers.join("");
          this.custom = parseInt(num);
          console.log(this.custom);
          el.value = num + "元";
        } else {
          el.value = "";
        }
        var cursor_pos = el.value.length - 1;
        el.setSelectionRange(cursor_pos, cursor_pos);
      },
      select: function(el) {
        this.custom = 0;
        this.selected = parseInt($(el).data("key"));
      },
      confirm: function() {
        if(this.custom !== 0) {
          alert("你要赞助 " + this.custom + "元");
        } else {
          alert("你要赞助 " + this.selected + "元");
        }
      }
    }
  });
});