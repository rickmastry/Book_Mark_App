//Listen for form submit
document.getElementById('myForm').addEventListener('submit',saveBookmark);

//Saves bookmark
function saveBookmark(e){

	//Get form values
	var siteName =document.getElementById('siteName').value;
	var siteUrl =document.getElementById('siteUrl').value;

    if(!validateForm(siteName, siteUrl)){
    	return false;
    }

	var bookmark ={
		name: siteName,
		url: siteUrl
	}

	if(localStorage.getItem('bookmarks') === null){
		//Init array
		var bookmarks = [];
		//Add to array
		bookmarks.push(bookmark);
		//Set to local staorage
		localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
	}else{
		//Get bookmarks from localStorage
		var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
		//Add bookmarks to array
		bookmarks.push(bookmark);
		//Re-set back to LocalStorage
		localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
	}

  //Clear form
  document.getElementById('myForm').reset();	

 //Refetch bookmarks
	fetchBookmarks();

	
 //Prevents form from submitting   
    e.preventDefault();
}
 
//Delete bookmark
function deleteBookmark(url){
//Get bookmarks from LocalStorage
var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
//Loop through bookmarks
for(var i = 0; i < bookmarks.length; i++){
   if(bookmarks[i].url == url){
   	//Remove from array
   	bookmarks.splice(i, 1);

   }

 }
 //Reset back to localStorage
 localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
 //Refetch bookmarks
 fetchBookmarks();

} 
//Fetch bookmarks
function fetchBookmarks(){
	//Get bookmarks from localStorage
	var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    //Get output id
	var bookmarksResults = document.getElementById('bookmarksResults');
	//build our output
	bookmarksResults.innerHTML = '';
	for(var i = 0; i < bookmarks.length; i++){
		var name = bookmarks[i].name;
		var url = bookmarks[i].url;

		bookmarksResults.innerHTML += '<div class="well">' +
		                               '<h3>'+name+
		                               ' <a class="btn btn-default" target="_blank" href="'+url+'">Visit</a> ' +
		                               ' <a onclick="deleteBookmark(\''+url+'\')"class="btn btn-danger" href="#">Delete</a> ' +
		                               '</h3>'+
		                               '</div>';

	}
}


function validateForm(siteName, siteUrl){
	if(!siteName || !siteUrl){
        alert('Please fill in the form');
        return false;
	}

	var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);

    if(!siteUrl.match(regex)){
      alert('Please use a valid Url');
      return false;
    }

	  return true;
}