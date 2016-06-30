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
  selectedCat: 0,
  getCatToDisplay: function () {
    return model.getCat(this.selectedCat);
  },
  showCat: function (idx) {
    this.selectedCat = idx;
    view2.showCat(model.getCat(idx));
  },
  incrementDisplayedCatsClick: function () {
    var cat = model.getCat(this.selectedCat);
    cat.clickCount++;
    model.putCat(this.selectedCat,cat);
    return cat.clickCount;
  },
  init: function() {
    model.init();
    this.setupModelData();
    view1.init();
    view2.init();
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

var view1 = {
    init: function () {
      var ul = document.getElementById('cats');
      var id=0;
      model.getCats().forEach(function (cat) {
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
        ul.appendChild(li);
        id++;
      })
    }
}

var view2 = {
  init: function () {
    this.showCat(octopus.getCatToDisplay());
    document.getElementById('image').addEventListener('click', function () {
        document.getElementById('clicks').innerText = octopus.incrementDisplayedCatsClick();
    });
  },
  showCat: function (cat) {
    document.getElementById('name').innerText = cat.name;
    document.getElementById('image').src = cat.imageLocation;
    document.getElementById('clicks').innerText = cat.clickCount;
  }
}

octopus.init();
