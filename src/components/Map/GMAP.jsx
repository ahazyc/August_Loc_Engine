let map;
const google = window.google
function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 8,
  });
}
<script src="//maps.googleapis.com/maps/api/js?key=AIzaSyCDnt3zhAcYQGXU5YPlUTB-cNT9V7g62AA"></script>
export default initMap