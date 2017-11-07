var hockey = document.getElementById('hockey'),

function fieldInView (el) {
var pos = el.offsetTop - 20;
window.scrollTo(0, pos);
}