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
      console.log(idx + " " + cat.clickCount);
      this.cats[idx] = cat;
    }
  }

  var octopus = {
    getCatToDisplay: function () {
      return model.getCat(this.selectedCat);
    },
    renderViews: function (idx) {
      this.selectedCat = idx;
      viewCat.render();
      viewAdmin.render();
    },
    getCats: function () {
      return model.getCats();
    },
    putCat: function (cat) {
      console.log(cat);
      model.putCat(this.selectedCat, cat);
      this.renderViews(this.selectedCat);
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
      viewAdmin.init();
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
  };

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
              octopus.renderViews(i);
              return false;
            }
          })(id));

          li.appendChild(name);
          self.ul.appendChild(li);
          id++;
        })
      }
  };

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
  };

  var viewAdmin = {
    init: function () {
      self = this;
      this.adminForm = document.getElementById('adminForm');
      this.adminEnable = document.getElementById('adminEnable');
      this.adminCancel = document.getElementById('adminCancel');
      this.adminSave = document.getElementById('adminSave');
      this.catName = document.getElementById('catName');
      this.catUrl = document.getElementById('catUrl');
      this.catClicks = document.getElementById('catClicks');

      this.adminEnable.addEventListener('click', function () {
        self.adminEnable.disabled = true;
        self.render();
      });
      this.adminCancel.addEventListener('click', function () {
        self.adminEnable.disabled = false;
        self.render();
      });
      this.adminSave.addEventListener('click', function () {
        self.adminEnable.disabled = false;
        octopus.putCat({
          name: self.catName.value,
          imageLocation: self.catUrl.value,
          clickCount: self.catClicks.value
        });
        self.render();
      });
      this.render();
    },
    render: function () {
      var cat = octopus.getCatToDisplay();
      this.catName.value = cat.name;
      this.catUrl.value = cat.imageLocation;
      this.catClicks.value = cat.clickCount;
      if (this.adminEnable.disabled) {
        this.adminForm.style.visibility = "visible";
      } else {
        this.adminForm.style.visibility = "hidden";
      }
    }
  }

  octopus.init();
})();
