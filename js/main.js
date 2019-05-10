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
        <div class="col col-sm-6 col-md-4 mb-4">
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
                            <div class="form-group">¿Por qué quieres adoptarlo?
                              <label for="recipient-question" class="col-form-label"></label>
                              <input type="text" class="form-control" id="recipient-question">
                            </div>
                            <div class="form-group">¿Has tenido mascotas en casa?
                              <label for="recipient-question-1" class="col-form-label"></label>
                              <input type="text" class="form-control" id="recipient-question-1">
                          </div>
                          <div class="form-group">¿Quien se va a encargar de la mascota?
                            <label for="recipient-question-2" class="col-form-label"></label>
                            <input type="text" class="form-control" id="recipient-question-2">
                          </div>
                          </form>
                        </div>
                        <div class="modal-footer">
                          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                          <button type="button" class="btn btn-primary">Send message</button>
                        </div>
                      </div>
                    </div>
                  </div>
              </div>
          </div>
      </div>`
      )
  })
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
