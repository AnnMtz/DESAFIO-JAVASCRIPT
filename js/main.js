var pet ="";
//método post
const addPet = (petObject)=>{
  $.post( "https://jquerycrud-ed8dc.firebaseio.com/ana.json", /*URL*/
    JSON.stringify(petObject), /*Objeto a postear*/
    function( data ) { /*callback*/
      console.log( data);
  }, "json");
}

//método get
function getData(){
  console.log("getting data")
  $.ajax({
      url: "https://jquerycrud-ed8dc.firebaseio.com/ana.json",
      type: "GET",
      success: function(response){
          printData(response)
      }
  });
}

//Método Update
function updateData(updatedObject){
    $.ajax({
       url: 'https://jquerycrud-ed8dc.firebaseio.com/ana/-LeK6izE4DBMIBDffGFY.json',
       type: 'PUT',
       data: JSON.stringify(updatedObject),
       success: function(response) {
         console.log(response)
       }
    });
}

//Método delete
function deleteData(id){
  $.ajax({
     url: `https://jquerycrud-ed8dc.firebaseio.com/ana/${id}.json`,
     type: 'DELETE',
     success: function(response) {
       console.log(response)
       getData()
     }
  });
}

function printData(dataToPrint) {
    $(".data-wrapper").empty();
  $.each(dataToPrint,(key,value)=>{
    console.log(`key ${key}, value ${value}, name ${value.name}, breed: ${value.breed}`)
    $(".data-wrapper").append(
        `
        <div class="col col-sm-6 col-md-4 mb-4" data-id="${key}">
          <div class="card">
            <img src="img/perrito-saludando.jpg" class="card-img-top" alt="...">
              <div class="card-body">
                  <h5 class="card-title">${value.name}</h5>
                  <p class="card-text">${value.description}</p>
                  <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">¡Adoptar!</button>
                  <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h5 class="modal-title" id="exampleModalLabel">Adoption information</h5>
                          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                        <div class="modal-body">
                          <form>
                            <div class="form-group">Escribe tu nombre
                              <label for="recipient-name" class="col-form-label"></label>
                              <input type="text" class="form-control" id="recipient-name">
                            </div>
                            <div class="form-group">Escribe tu dirección
                              <label for="recipient-address" class="col-form-label"></label>
                              <input type="text" class="form-control" id="recipient-address">
                            </div>
                            <div class="form-group">¿Cual es tu número telefonico?
                              <label for="recipient-phone" class="col-form-label"></label>
                              <input type="number" class="form-control" id="recipient-number">
                            </div>
                            <div class="form-group">Ingresa tu email
                              <label for="recipient-email" class="col-form-label"></label>
                              <input type="text" class="form-control" id="recipient-email">
                          </div>
                          <div class="form-group">¿Has tenido mascotas en casa?
                            <label for="recipient-question" class="col-form-label"></label>
                            <input type="text" class="form-control" id="recipient-question">
                          </div>
                          </form>
                        </div>
                        <div class="modal-footer">
                          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                          <button type="button" id="adopted" class="btn btn-primary">Send message</button>
                        </div>
                      </div>
                    </div>
		  </div>
              </div>
          </div>
      </div>`
      )
  })
  $('#adopted').click((event) => {
    getData()
    console.log('adios');
    let id =$(event.target).parent().data('id');
    deleteData(id);
    $(event.target).parent().fadeOut("fast", ()=> {});
    console.log('adios');
    
  });
}

const loadContent = (file) => {
  if(file == 'views/register.html') {
    console.log("caso uno")
    $('.container-wrapper').load(file, function() {
      $('#submit-button').click(()=> {
        console.log('jojojolj');
        
        let name = $('#pet-name').val();
        let description = $('#pet-description').val();
        let petObject = {name,description};
        addPet(petObject)
      })
    })
  
  } else if (file == 'views/adoption.html') {
    console.log("caso dos")
    $('.container-wrapper').load(file, function() {
      getData()
    })
  }
}

function validateInput(forminput) {
  $(forminput).removeClass("border-danger")
  $(forminput).removeClass("border-succes")
  if ($(forminput).val() === "") {
    $(forminput).addClass("border-danger")
    $("<p class='text-danger error animated fadeInLeft faster'>No dejes espacios en blanco</p>").insertAfter(forminput);
    return false;
  } else {
    $(forminput).addClass("border-success")
    return $(forminput).val()
  }
}

function validateForm() {
  $(".error").remove()
  let name = validateInput("#pet-name");
  let description = validateInput("#pet-description");
  let image = validateInput("#pet-image");
  if (name && description && image) {

    let petObject = {
      name,
      description,
      image
    };
    return petObject
  } else {
    return false
  }
}

function agregar() {
let result = validateForm();
if (!result) {
  $("#submit").removeClass("animated shake faster").width('100%').addClass("animated shake faster")
} else {
  $("#submit").fadeOut();
  $("form").append('<div class="alert text-center alert-success  animated bounceInDown" role="alert">Gracias!!</div>')
  postData(result)
  setTimeout(()=> {
    loadContent("./views/adoption.html")
  },2000);
}
}


function validateAdoptionForm() {
  $(".error").remove()
  let name = validateInput("#recipient-name");
  let address = validateInput("#recipient-address");
  let phone = validateInput("#recipient-phone");
  let email = validateInput("#recipient-email")
  let question = validateInput("#recipient-question")
  if (name && address && phone && email && question) {
    let adoptantObject = {
      name,
      address,
      phone,
      email,
      question
    };
    return adoptantObject
  } else {
    return false
  }
}

function adoptar() {
  let result = validateAdoptionForm();
  if (!result) {
    $("#adopted").removeClass("animated shake faster").width('100%').addClass("animated shake faster")
  } else {
    $("#adopted").fadeOut();
    $("form").append()('<div class="alert text-center alert-success  animated bounceInDown" role="alert">Gracias!!</div>')
    postData(result)
    setTimeout(()=> {
      // loadContent("./views/adoption.html")
    deleteData(petid,afterDelete);
  },1000);
}
}

function afterDelete() {
  $("form").append(`
  <div class="alert text-center alert-success animated bounceInDown" role="alert">Gracias por darme un nuevo hogar!
  <span class="animated infinite zoomIn heartBeat delay-2s">&hearts;</span><br>
  Te contactaremos vía telefónica o email<br>
  <a href="javascript:" onclick="loadHTML('./views/adoption.html');">Ver mas opciones</a>
  </div>`
  )
}
