import Container from "../../components/layouts/Container";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";

export default function PageHome() {
    const ResizeMap = () => {
        const map = useMap() as any;
        map._onResize();
        return null;
    };
    return (
        <>
            <MapContainer
                style={{ height: "310px" }}
                center={[51.505, -0.09]}
                zoom={15}
                scrollWheelZoom={false}
            >
                <ResizeMap />
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
                />
                <Marker position={[51.505, -0.09]}>
                    <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker>
            </MapContainer>
            <Container>
                <h1 className="text-5xl">Homepage</h1>
            </Container>
        </>
    );
}
