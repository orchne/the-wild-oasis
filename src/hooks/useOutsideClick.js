import { useEffect, useRef } from "react";

export default function useOutsideClick(handler, listenCapturing = true) {
  const ref = useRef();

  useEffect(
    function () {
      function handleClickedOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          handler();
        }
      }

      document.addEventListener("click", handleClickedOutside, listenCapturing);

      return () =>
        document.removeEventListener(
          "click",
          handleClickedOutside,
          listenCapturing
        );
    },
    [handler, listenCapturing]
  );

  return ref;
}
