// var postObject = {
//   'name': 'Gogdo',
//   'breed': 'Black Cat'
// }
// $('body').load("index.html");

// $("#submit-button").click(()=>{
//   let name = $("#pet-name").val();
//   let breed = $("#pet-breed").val();
//   let age = $("#pet-age").val();

//   let petObject = {name,breed,age};
//   console.log(petObject)
//   addPet(petObject)
  
// })

/*método post*/
const addPet = (petObject)=>{
  $.post( "https://jquerycrud-ed8dc.firebaseio.com/ana.json", /*URL*/
    JSON.stringify(petObject), /*Objeto a postear*/
    function( data ) { /*callback*/
      console.log( data);
  }, "json");
}

/*método get*/
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

/*Método Update*/
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

/*Método delete*/
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
              <img src="img/loki.jpj" class="card-img-top" alt="...">
              <div class="card-body">
                  <h5 class="card-title">${value.name}</h5>
                  <p class="card-text">${value.description}</p>
                  <a href="#" class="btn btn-primary">¡Adoptar!</a>
              </div>
          </div>
      </div>`
      )
  })
}

// const loadContent = (file) => {
//   // $('.container-wrapper').load(file)
//   if(file == 'adoption.html') {
//     $('.container-wrapper').load(file, function(){
//       getData()
//     })
//   } else if (file == 'register.html') {
//     $('.container-wrapper').load(file, function(){
//     $("#submit-button").click(()=>{
//       let name = $("#pet-name").val();
//       let breed = $("#pet-breed").val();
//       let age = $("#pet-age").val();
    
//       let petObject = {name,breed,age};
//       console.log(petObject)
//       addPet(petObject) 
//     })
//   })
//   }

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
    //function(){
  //   setTimeout(function(){
  //     getData()
  //   },2000)
  // })
//}
/*
const loadContent = (file) => {
  $('.container-wrapper').load(file,function(){
    setTimeout(function(){
      getData()
    },1000)
})*/
