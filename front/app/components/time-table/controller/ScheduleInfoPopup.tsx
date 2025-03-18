import { useRef, useState } from "react";

// 스케쥴 정보 팝업 컴포넌트
// 팝업 컴포넌트 컨트롤
// - move: 특정 타겟 위에 커서 올라갈 경우, 해당 타겟의 정보를 팝업에 표시
// - leave: 특정 타겟 위에 커서 빠져나갈 경우, 팝업 숨김, 타겟 정보 초기화

const useScheduleInfoPopup = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  const [data, setData] = useState<{
    start: string;
    end: string;
    user: string;
  } | null>(null);

  const onMouseOver = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    const target = e.target as HTMLDivElement;

    if (target.className !== "schedule") return;

    if (!popupRef.current) return;
    popupRef.current.style.top = `${e.clientY + 10}px`;
    popupRef.current.style.left = `${e.clientX + 10}px`;

    if (targetRef.current) return;
    targetRef.current = target;
    const { start = "", end = "", user = "" } = target.dataset;
    setData({ start, end, user });
    popupRef.current.style.opacity = "1";
  };

  const onMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (!popupRef.current) return;
    if (popupRef.current.style.opacity === "0") return;
    targetRef.current = null;
    popupRef.current.style.opacity = "0";
  };

  return {
    popupRef,
    Popup: () => (
      <>
        <div id="schedule-popup" className="z-20" ref={popupRef}>
          <div className="popup-header">
            <h2>{data?.user}</h2>
          </div>
          <div className="popup-content">
            <div className="content-block">start: {data?.start}</div>
            <div className="content-block">end: {data?.end}</div>
          </div>
        </div>
      </>
    ),
    popupCtlr: { onMouseOver, onMouseLeave },
  };
};

export default useScheduleInfoPopup;
