import React from 'react';
import ReactDOM from 'react-dom';

/**
 * 공용 레이어 팝업 컴포넌트
 * Portal 패턴을 사용하여 document.body에 직접 렌더링
 */

interface LayerProps {
  children: React.ReactNode;
  show: boolean;
  className?: string;
  onBackdropClick?: () => void;
}

/**
 * React.memo 최적화를 위한 비교 함수
 */
const areEquals = (prevProps: LayerProps, nextProps: LayerProps) =>
  prevProps.show === nextProps.show && 
  prevProps.className === nextProps.className;

/**
 * 레이어 팝업 컴포넌트
 * @param children - 팝업 내용
 * @param show - 표시 여부
 * @param className - 추가 CSS 클래스
 * @param onBackdropClick - 배경 클릭 시 콜백
 */
const ComLayerBox: React.FC<LayerProps> = ({ 
  children, 
  show, 
  className = '',
  onBackdropClick 
}) => {
  // 팝업이 표시될 때 body에 modal 클래스 추가 (스크롤 방지 등)
  React.useEffect(() => {
    if (show) {
      document.body.classList.add('modal');
      
      // cleanup 함수로 팝업 닫힐 때 클래스 제거
      return () => {
        document.body.classList.remove('modal');
      };
    } else {
      document.body.classList.remove('modal');
    }
  }, [show]);

  // 팝업이 표시되지 않으면 null 반환
  if (!show) {
    return null;
  }

  // Portal을 사용하여 document.body에 직접 렌더링
  return ReactDOM.createPortal(
    <div className={`layerPopup m-full ${className}`}>
      <div 
        className="deemed" 
        onClick={onBackdropClick}
        role="button"
        tabIndex={-1}
        aria-label="팝업 닫기"
      />
      {children}
    </div>,
    document.body
  );
};

export default React.memo(ComLayerBox, areEquals);