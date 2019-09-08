function displayResults(data){
    console.log(data);
    $('.results-list').empty();

    for (let i = 0; i < data.length; i++){
        $('#results-list').append(
            `<li><h2><a href='${data[i].html_url}'>${data[i].name}</a></h2></li>`)
    };

    $('#results').removeClass('hidden');
}

function getRepos(handle) {
  const searchURL = 'https://api.github.com/users/'+handle+'/repos';
  console.log(searchURL);

  fetch(searchURL)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(data => displayResults(data))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}


function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const handle = $('#js-search-handle').val();
    getRepos(handle);
  });
}

$(watchForm);