document.getElementById('myForm').addEventListener('submit',saveBookmark);

function saveBookmark(e){

	//Ge the form values
	
	var siteName=document.getElementById('sitename').value;
	var siteUrl=document.getElementById('siteurl').value;
	
	var book={
		site: siteName,
		link: siteUrl
			
	}
	//console.log(book)
	//local storage 
	/*localStorage.setItem('item','localhost');
	console.log(localStorage.getItem('item'));*/
	
	if(!validateForm(siteName,siteUrl)){
	return false;
	}
		
	
	if(localStorage.getItem('bookmarks')===null){
		
		var bookmarks=[];
		bookmarks.push(book);
		localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
	}
	
	else{
		var bookmarks=JSON.parse(localStorage.getItem('bookmarks'));
		bookmarks.push(book);
		localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
		
	}
	
	document.getElementById('myForm').reset();
	fectchBookmarks();
	e.preventDefault();
}
 function validateForm(siteName,siteUrl){
	 
	 if(!siteName || !siteUrl){
			alert('Please enter the fields');
			return false;
		}
		
		var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
		var regex = new RegExp(expression);
		
		if(!siteUrl.match(regex)){
			
			alert('please use a valid URL');
			return false;
		}
 
 return true;
 }


function deleteBookmarks(url){
	
	var bookmarks=JSON.parse(localStorage.getItem('bookmarks'));
	
	for(var i=0;i<bookmarks.length;i++){
		if(bookmarks[i].link===url){
			bookmarks.splice(i,1);
						}
		localStorage.setItem('bookmarks',JSON.stringify(bookmarks));	
		fectchBookmarks();
	}
}

function fectchBookmarks(){
	
	var bookmarks=JSON.parse(localStorage.getItem('bookmarks'));
	var bookmarkresult=document.getElementById('BookmarksResults');
	bookmarkresult.innerHTML='';
	for(var i=0;i<bookmarks.length;i++){
		
		var name=bookmarks[i].site;
		var url=bookmarks[i].link;
		
		bookmarkresult.innerHTML+='<div class="breadcrumb">'+
								'<h3>'+name+
								' <a class="btn btn-primary" target="_blank" href="'+url+'">visit</a> '+
								' <a onclick="deleteBookmarks(\''+url+'\')" class="btn btn-danger" href="#">delete</a> '+
								'</h3>'+
								'</div>'+
								'<br>';
	}
	
	
}