import { currentStoreState, locationState, mapState } from "@/atom";
import { StoreType } from "@/interface";
import { useCallback, useEffect } from "react";
import { useRecoilValue, useSetRecoilState, useRecoilState } from "recoil";

interface MarkerProps {
  stores: StoreType[];
}

export default function Markers({ stores }: MarkerProps) {
  const map = useRecoilValue(mapState);
  const setCurrentStore = useSetRecoilState(currentStoreState);
  const [location, setLocation] = useRecoilState(locationState);

  const loadKakaoMarkers = useCallback(() => {
    if (map) {
      //좌표 찍기!
      stores?.map((store) => {
        var imageSrc = store?.category
            ? `/images/markers/${store?.category}.png`
            : "/images/markers/default.png",
          imageSize = new window.kakao.maps.Size(40, 40),
          imageOption = { offset: new window.kakao.maps.Point(27, 69) };

        var markerImage = new window.kakao.maps.MarkerImage(
          imageSrc,
          imageSize,
          imageOption
        );

        let markerPosition = new window.kakao.maps.LatLng(
          store?.lat,
          store?.lng
        );

        let marker = new window.kakao.maps.Marker({
          position: markerPosition,
          image: markerImage
        });
        marker.setMap(map);

        let content = `<div class="infoWindow">${store?.name}</div>`;

        var customOverlay = new window.kakao.maps.CustomOverlay({
          position: markerPosition,
          content: content,
          xAnchor: 0.6,
          yAnchor: 0.91
        });

        window.kakao.maps.event.addListener(marker, "mouseover", function () {
          customOverlay.setMap(map);
        });

        window.kakao.maps.event.addListener(marker, "mouseout", function () {
          customOverlay.setMap(null);
        });
        // 선택한 가게를 저장
        window.kakao.maps.event.addListener(marker, "click", function () {
          setCurrentStore(store);
          setLocation({ ...location, lat: store.lat, lng: store.lng });
        });
      });
    }
  }, [location, map, setCurrentStore, setLocation, stores]);
  useEffect(() => {
    loadKakaoMarkers();
  }, [map, loadKakaoMarkers]);
  return <></>;
}
