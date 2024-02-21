import { mapState } from "@/atom";
import { StoreType } from "@/interface";
import { Dispatch, SetStateAction, useCallback, useEffect } from "react";
import { useRecoilValue } from "recoil";

interface MarkerProps {
  store: StoreType;
}

export default function Marker({ store }: MarkerProps) {
  const map = useRecoilValue(mapState);
  const loadKakaoMarker = useCallback(() => {
    if (map && store) {
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

      let markerPosition = new window.kakao.maps.LatLng(store?.lat, store?.lng);

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
    }
  }, [map, store]);
  useEffect(() => {
    loadKakaoMarker();
  }, [map, loadKakaoMarker]);
  return <></>;
}
