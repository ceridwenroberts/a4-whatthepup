$(function () {
  getFact();
  $factModal = "#factModal";
  $("#factBtn").on("click", function () {
    console.log("clicked");
    $factModal.showModal();
  });

  function getFact() {
    const optionsFacts = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "074d0d51f3msha1ec7833e172563p1a1f31jsne8f36279c7e2",
        "X-RapidAPI-Host": "dog-facts2.p.rapidapi.com",
      },
    };

    fetch("https://dog-facts2.p.rapidapi.com/facts", optionsFacts)
      .then((response) => {
        if (!response.ok) {
          let factErrMess = $(
            "<p>Someone droped the ball on this. Please, try again!</p>"
          );
          factErrMess.appendTo("#fact-btn-container");

          switch (response.status) {
            case 400:
              throw new Error(`Bad request. status: ${response.status}`);
            case 401:
              throw new Error(`Unauthorized. status: ${response.status}`);
            case 403:
              throw new Error(`Forbidden. status: ${response.status}`);
            case 404:
              throw new Error(`Not found. status: ${response.status}`);
            default:
              throw new Error(`HTTP error! status: ${response.status}`);
          }
        } else {
          return response.json();
        }
      })
      .then((data) => {
        let fact = data.facts;
        console.log(fact);

        $("<p>" + fact + "</p>").appendTo("#factHead");
      })
      .catch((err) => console.error(err));
  }

  console.log("responsive-image-grid.js");
  let breedTypes = [];
  let thisBreedType = [];

  $(".wrapper").hide();
  $(".fetchBtn").on("click", function () {
    $(".wrapper").show();
    $(this).hide();
    $(".subhead").hide();
    $("h1").css("padding", "1vw");
  });

  $(".fetchBtn").on("click", function () {
    getFromDogBreedDbAll();
  });

  function getFromDogBreedDbAll() {
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "074d0d51f3msha1ec7833e172563p1a1f31jsne8f36279c7e2",
        "X-RapidAPI-Host": "dogbreeddb.p.rapidapi.com",
      },
    };

    fetch("https://dogbreeddb.p.rapidapi.com/", options)
      .then((response) => {
        if (!response.ok) {
          let dogsErrMess = $(
            "<img src='./images/tripping-dachshound.jpeg' alt='dachshound tripping'><p>Something went wrong. Please, try agian!</p>"
          );
          dogsErrMess.appendTo(".filterContainer");

          switch (response.status) {
            case 400:
              throw new Error(`Bad request. status: ${response.status}`);
            case 401:
              throw new Error(`Unauthorized. status: ${response.status}`);
            case 403:
              throw new Error(`Forbidden. status: ${response.status}`);
            case 404:
              throw new Error(`Not found. status: ${response.status}`);
            default:
              throw new Error(`HTTP error! status: ${response.status}`);
          }
        } else {
          return response.json();
        }
      })
      .then((dogs) => {
        //****PRE-FILTER ALL WITHOUT PHOTO */
        let noPhotoSubstr = "dogbreed/dog-default";
        dogs = dogs.filter((dogs) => {
          return String(dogs.imgThumb).includes(noPhotoSubstr) === false;
        });
        //****PRE-FILTER DUPLICATE */
        dogs = dogs.filter((dogs) => {
          return dogs.id !== 248;
        });

        firstBig(dogs);
        filterBtns(breedTypes);
      })
      .catch((error) => {
        $("main")
          .append("<div class='error'>")
          .text("Something went wrong: " + error);

        console.error(error);
        console.log("test ", error);
        console.error(`${error.name}: ${error.message}`);
      }); //DEVELOP!!!
  } //fn getFromBreedDbAll

  $(".filterBtn").on("click", function () {
    console.log("clicked " + this.breedName + " button");
  });

  function firstBig(dogs) {
    $.each(dogs, function (index, value) {
      //****LIST OF BREED TYPES */
      // console.log(`${index}: ${value}`);
      thisBreedType = this.breedType.toLowerCase();

      let breedExists = breedTypes.includes(thisBreedType);
      if (!breedExists) {
        breedTypes.push(thisBreedType);
      }
      let breedClassName = thisBreedType.replace(/\s+/g, "");

      //****IMAGE GRID */

      const $breedBox = $(
        "<div class='breedBox  " + breedClassName + "'></div>"
      );

      const $imgThumb = $("<img class='imgThumb '>");
      $imgThumb
        .attr({ src: this.imgThumb, id: this.id })
        .addClass(thisBreedType.replace(/\s+/g, ""));

      const $breedNameThumb = $(
        "<div class='breedNameThumb hiddenTitle'><h3 class='breedNameThumbText'>" +
          this.breedName +
          "</h3></div>"
      );

      $breedBox.append($imgThumb);
      $breedBox.hover(
        function () {
          $(this).append($breedNameThumb);
        },
        function () {
          $(this).find("div").last().remove();
        }
      );

      $infoModal = "#infoModal";
      $openInfoModal = $breedBox;
      $closeInfoModal = "#closeInfoModal";

      $breedBox.on("click", (event) => {
        infoModal.showModal();
        $("#imgBox").attr("src", this.imgThumb);
        $(".breedName").html("<h3>" + this.breedName + "</h3>");
        // console.log(this.breedName);
        $(".breedDescription").html(this.breedDescription);
        $(".breedType").html("<span>Breed type: </span>" + this.breedType);
        $(".origin").html("<span>Origin:</span> " + this.origin);
        $(".furColor").html("<span>Fur colour:</span> " + this.furColor);
        $(".height").html(
          "<span>Height:</span> " +
            this.minHeightInches +
            " - " +
            this.maxHeightInches +
            " in"
        );
        $(".weight").html(
          "<span>Weight: </span>" +
            this.minWeightPounds +
            " - " +
            this.maxWeightPounds +
            " lb"
        );
        $(".lifeSpan").html(
          "<span>Life span</span>: " +
            this.minLifeSpan +
            " - " +
            this.maxLifeSpan +
            " years"
        );
      });

      $("#infoModal").on("click", (event) => {
        infoModal.close();
      });

      $(".wrapper").append($breedBox);

      //****INFOBOX */
      $("<div class='infoBox'></div>")
        .appendTo("breedBox")
        .text(function (dogs) {
          $.each(value, function (key, value) {
            return key, value;
          });
        });
    });
  }
}); //ready

function filterBtns(breedTypes, dogs) {
  const findMixed = breedTypes.findIndex((el) => el == "mixed breed dogs");
  console.log(findMixed);
  let newBreedTypes = breedTypes.push(breedTypes.splice(4, 1)[0]);
  console.log(newBreedTypes);
  console.log(breedTypes);

  $.each(breedTypes, function (index, value) {
    let buttonName = this;

    let breedNameTag = this.replace(/\s+/g, "");
    let breedClassSelectorClass = "." + this.replace(/\s+/g, "");
    let dataValue = $(this).data(breedNameTag);
    console.log(breedNameTag);

    // $("<button class='bone filterBtn' role='button'><div class='c1'></div><div class='c2'></div><div class='c3'></div><div class='c4'></div><div class='b1'><div class='b2'>" + this + "</div></div></button>")

    $("<button class='filterBtn' role='button'>" + this + "</button>")
      .data("filter", breedNameTag)
      // .addClass(this.val)
      .appendTo(".filterContainer")
      .on("click", function (breedTypes) {
        // $(this).toggleClass("active");
        // $(breedClassSelectorClass).toggleClass("hidden");
        $(".fetchBtn").prop("disabled", false);

        console.log("value: " + dataValue);
        // var filter = $(this).data()
        console.log("breedNameTag: " + breedNameTag);
      });
  });

  $(".filterBtn").eq(-1).addClass("mixedHybridBtn");
  $(".filterBtn").eq(-2).addClass("mixedHybridBtn");

  //All button
  $("<button class='filterBtn' role='button'>All</button>")
    .data("filter", "all")
    .addClass("all")
    .appendTo(".filterContainer");

  $(".filterBtn").on("click", function () {
    $(".filterBtn").removeClass("active");
    $(this).addClass("active");
    var filter = $(this).data("filter");
    if (filter === "all") {
      $(".breedBox").find("*").show();
    } else {
      $(".breedBox")
        .find("*")
        .not("." + filter)
        .hide();
      console.log(filter);
      $("." + filter).show();
    }
  });
}

function draftAllSort() {
  $("<button class='filterBtn'>All</button>")
    .addClass("all")
    .appendTo(".filterContainer")
    .on("click", function (breedTypes) {
      $(this).toggleClass("active");
      $(".filterBtn").addClass("active");
      // $('.fetchBtn').prop("disabled", false);
      // $(breedClassSelector).toggleClass("hidden");
      $(".breedBox").find("*").show();
    });
}

function sortFilterBtns() {
  $("button").click(function () {
    var filter = $(this).data("filter");
    if (filter === "all") {
      $(".item").show();
    } else {
      $(".item")
        .not("." + filter)
        .hide();
      $("." + filter).show();
    }
  });
}
