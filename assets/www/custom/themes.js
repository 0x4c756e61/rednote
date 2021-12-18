if ( window.localStorage.getItem("custom_css") != null && window.localStorage.getItem("custom_css") != "" ) {
    document.getElementsByTagName("body")[0].insertAdjacentHTML("beforeend", window.localStorage.getItem("custom_css"))
};
if ( window.localStorage.getItem("custom_css_theme") != "" ) {
    // alert(window.localStorage.getItem("custom_css_theme"))
    // alert(window.localStorage.getItem("custom_css_img"))
    document.getElementsByTagName("body")[0].insertAdjacentHTML("beforeend", window.localStorage.getItem("custom_css_theme") );
    document.getElementById("logobruh").setAttribute("src", window.localStorage.getItem("custom_css_theme_img"));
    document.getElementById("logo_pannel").setAttribute("src", window.localStorage.getItem("custom_css_theme_img")); // TODO: Need to fix that
};