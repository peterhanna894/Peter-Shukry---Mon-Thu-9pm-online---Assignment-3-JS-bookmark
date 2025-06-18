var siteName = document.getElementById("bookmarkName");
var siteURL = document.getElementById("bookmarkURL");
var submitBtn = document.getElementById("submitBtn");
var tableContent = document.getElementById("tableContent");
var bookmarks = [];
// localStorage.removeItem("bookmarksList");
displayAllBookmarks();
function displayBookmark(itemIndex){
    var newBookmark = `
              <tr>
                <td>${itemIndex + 1}</td>
                <td>${bookmarks[itemIndex].siteName}</td>              
                <td>
                  <button class="btn btn-success" onclick="visitSite(${itemIndex})">
                    <i class="fa-solid fa-eye pe-2"></i>Visit
                  </button>
                </td>
                <td>
                  <button class="btn btn-danger pe-2" onclick="deleteSite(${itemIndex})">
                    <i class="fa-solid fa-trash-can"></i>
                    Delete
                  </button>
                </td>
            </tr>
            `;
    tableContent.innerHTML += newBookmark;

}
function visitSite(index){
    var url = bookmarks[index].siteURL;
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
        url = "https://" + url;
    }
    window.open(url, "_blank")
    // window.open(bookmarks[index].siteURL)
}
function deleteSite(index){
    bookmarks.splice(index, 1);
    localStorage.setItem("bookmarksList", JSON.stringify(bookmarks));
    displayAllBookmarks();
}
function displayAllBookmarks(){
    tableContent.innerHTML=""
    if (localStorage.getItem("bookmarksList")) {
        bookmarks = JSON.parse(localStorage.getItem("bookmarksList"));
        for (var x = 0; x < bookmarks.length; x++) {
            displayBookmark(x);
        }
    }
}
console.log(typeof (bookmarks));

  console.log(bookmarks);
  
var nameRegex = /^\w{3,}(\s+\w+)*$/;
var urlRegex = /^(https?:\/\/)?(w{3}\.)?\w+\.\w{2,}\/?(:\d{2,5})?(\/\w+)*$/;

siteName.addEventListener("input", function () {
    validate(siteName, nameRegex);
});

siteURL.addEventListener("input", function () {
    validate(siteURL, urlRegex);
});

function validate(element, regex) {
    var testRegex = regex;
    if (testRegex.test(element.value)) {
        element.classList.add("is-valid");
        element.classList.remove("is-invalid");
        return true;
    } else {
        element.classList.add("is-invalid");
        element.classList.remove("is-valid");
        return false;
    }
}
submitBtn.addEventListener("click" ,function(){
    if (validate(siteName, nameRegex) && validate(siteURL, urlRegex)){
        bookmarks.push({
            siteName: siteName.value,
            siteURL: siteURL.value
        });
        localStorage.setItem("bookmarksList", JSON.stringify(bookmarks));
      openAlertSucc();
     
    }else{
       
        openAlertFail();
    }
    displayAllBookmarks();
    console.log(bookmarks);
    
})

function openAlertSucc(){
    Swal.fire({
        position: "center",
        icon: "success",
        title: "Your website has been saved",
        showConfirmButton: false,
        timer: 1500
    });
    cleanForm();
}
function openAlertFail(){

    if (!validate(siteName, nameRegex) && !validate(siteURL, urlRegex)) {
        Swal.fire({
            title: "Insert a valid website name and URL",
            icon: "error"
        });
    } else if (!validate(siteName, nameRegex)){
        Swal.fire({
            title: "Insert a valid website name",
            icon: "error"
          });
    } else if (!validate(siteURL, urlRegex)){
        Swal.fire({
            title: "Insert a valid website URL",
            icon: "error"
        });
    }
}
function cleanForm(){
    siteURL.value="";
    siteName.value="";
}