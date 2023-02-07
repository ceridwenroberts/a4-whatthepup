$(function () {
  getFact();
  $factModal = "#factModal";
  $("#factBtn").on("click", function () {
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
            "<div class=errContainer><p>Something went very wrong. Please try again.</p><img src='images/MrHappyFace-400x400-1.jpeg' alt='World's ugliest dog looking like himself'><div>"
          );
          factErrMess.appendTo("#factHead");

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

        $("<p>" + fact + "</p>").appendTo("#factHead");
      })
      .catch((error) => {
        $(".errContainer").append(error);

        console.error(error);
        console.error(`${error.name}: ${error.message}`);
      });
  }

  let breedTypes = [];
  let thisBreedType = [];

  $(".wrapper").hide();
  $(".fetchBtn").on("click", function () {
    $(".wrapper").show();
    $(this).hide();
    $(".subhead").hide();
    $("h1").css("padding", "1vw");
    $();
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
            "<div class=errContainer><p>Someone droped the ball on this. Please, try again!</p><img src='./images/tripping-dachshound.jpeg' alt='dachshound tripping'><div>"
          );
          dogsErrMess.appendTo("header");

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
        //PRE-FILTER ALL WITHOUT PHOTO
        let noPhotoSubstr = "dogbreed/dog-default";
        dogs = dogs.filter((dogs) => {
          return String(dogs.imgThumb).includes(noPhotoSubstr) === false;
        });
        //PRE-FILTER DUPLICATE
        dogs = dogs.filter((dogs) => {
          return dogs.id !== 248;
        });

        firstBig(dogs);
        filterBtns(breedTypes);
      })
      .catch((error) => {
        $(".errContainer").append(error);

        console.error(error);
        console.error(`${error.name}: ${error.message}`);
      });
  }

  function firstBig(dogs) {
    $.each(dogs, function (index, value) {
      //LIST OF BREED TYPES
      thisBreedType = this.breedType.toLowerCase();

      let breedExists = breedTypes.includes(thisBreedType);
      if (!breedExists) {
        breedTypes.push(thisBreedType);
      }
      let breedClassName = thisBreedType.replace(/\s+/g, "");

      //IMAGE GRID
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
        $("#imgBox").attr({
          src: this.imgThumb,
          alt: "image of a " + this.breedName,
        });
        $(".breedName").html("<h3>" + this.breedName + "</h3>");
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
    });
  }
});

function filterBtns(breedTypes, dogs) {
  const findMixed = breedTypes.findIndex((el) => el == "mixed breed dogs");
  let newBreedTypes = breedTypes.push(breedTypes.splice(4, 1)[0]);

  $.each(breedTypes, function (index, value) {
    let buttonName = this;

    let breedNameTag = this.replace(/\s+/g, "");
    let breedClassSelectorClass = "." + this.replace(/\s+/g, "");
    let dataValue = $(this).data(breedNameTag);

    $("<button class='filterBtn' role='button'>" + this + "</button>")
      .data("filter", breedNameTag)
      .appendTo(".filterContainer")
      .on("click", function (breedTypes) {
        $(".fetchBtn").prop("disabled", false);
      });
  });

  $(".filterBtn").eq(-1).addClass("mixedHybridBtn");
  $(".filterBtn").eq(-2).addClass("mixedHybridBtn");

  $("<button class='filterBtn active' id='allBtn' role='button'>All</button>")
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
      $("." + filter).show();
    }
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
