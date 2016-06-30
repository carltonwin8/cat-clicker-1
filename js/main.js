(function () {
  "use strict";
  var model = {
    cats: [],
    init: function () {

    },
    addCat: function(name, imageLocation) {
      this.cats.push({
        name: name,
        imageLocation: imageLocation,
        clickCount: 0
      });
    },
    getCat: function(idx) {
      return this.cats[idx];
    },
    getCats: function() {
      return this.cats;
    },
    putCat: function(idx, cat) {
      this.cats[idx] = cat;
    }
  }

  var octopus = {
    getCatToDisplay: function () {
      return model.getCat(this.selectedCat);
    },
    showCat: function (idx) {
      this.selectedCat = idx;
      viewCat.render();
    },
    getCats: function () {
      return model.getCats();
    },
    incrementDisplayedCatsClick: function () {
      var cat = model.getCat(this.selectedCat);
      cat.clickCount++;
      model.putCat(this.selectedCat,cat);
      return cat.clickCount;
    },
    init: function() {
      this.selectedCat = 0;
      model.init();
      this.setupModelData();
      viewCatList.init();
      viewCat.init();
    },
    setupModelData: function() {
      var cats = [{
        name: "cat1",
        imageLocation: "images/1_cat.jpg"
      },{
        name: "cat2",
        imageLocation: "images/2_cat.jpg"
      },{
        name: "cat3",
        imageLocation: "images/3_cat.jpg"
      },{
        name: "cat4",
        imageLocation: "images/4_cat.jpg"
      },{
        name: "cat5",
        imageLocation: "images/5_cat.jpg"
      }];
      cats.forEach(function (cat) {
        model.addCat(cat.name, cat.imageLocation);
      })
    }
  }

  var viewCatList = {
      init: function () {
        self = this;
        this.ul = document.getElementById('cats');
        this.render();
      },
      render: function () {
        var id=0;
        octopus.getCats().forEach(function (cat) {
          var li = document.createElement('li');
          var name = document.createElement('a');
          var txt = document.createTextNode(cat.name);
          name.setAttribute('href',cat.name);
          name.appendChild(txt);
          name.addEventListener('click', (function (i) {
            return function (e) {
              e.preventDefault();
              octopus.showCat(i);
              return false;
            }
          })(id));

          li.appendChild(name);
          self.ul.appendChild(li);
          id++;
        })
      }
  }

  var viewCat = {
    init: function () {
      this.name = document.getElementById('name');
      this.imageLocation = document.getElementById('image');
      this.clickCount = document.getElementById('clicks');
      document.getElementById('image').addEventListener('click', function () {
          document.getElementById('clicks').innerText = octopus.incrementDisplayedCatsClick();
      });
      this.render();
    },
    render: function () {
      var cat = octopus.getCatToDisplay();
      this.name.innerText = cat.name;
      this.imageLocation.src = cat.imageLocation;
      this.clickCount.innerText = cat.clickCount;
    }
  }

  octopus.init();
})();
