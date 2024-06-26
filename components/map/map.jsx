import { Circle, MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import MarkerIcon from '../../public/assets/images/maps/marker-icon.png'
import MarkerShadow from '../../public/assets/images/maps/marker-shadow.png'
import 'leaflet/dist/leaflet.css'

export default function Map({
    latitude,
    longitude,
    address,
    radius,
    PanMap,
    fillBlueOptions,
}) {
    return (
        <MapContainer
            id="map"
            center={[latitude, longitude]}
            zoom={13}
            scrollWheelZoom={true}
            style={{
                width: '100%',
                height: '300px',
                borderRadius: '6px',
                overflow: 'hidden',
            }}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker
                position={[latitude, longitude]}
                icon={
                    new L.icon({
                        iconUrl: MarkerIcon.src,
                        iconRetinaUrl: MarkerIcon.src,
                        iconSize: [25, 41],
                        iconAnchor: [12.5, 41],
                        popupAnchor: [0, -41],
                        shadowUrl: MarkerShadow.src,
                        shadowSize: [41, 41],
                    })
                }
            >
                <Popup>{address}</Popup>
            </Marker>
            <Circle
                center={[latitude, longitude]}
                pathOptions={fillBlueOptions}
                radius={radius}
            />
            <PanMap />
        </MapContainer>
    )
}
