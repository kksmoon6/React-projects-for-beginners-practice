import React, { useState, useEffect } from 'react';

// Mock API - 실제 프로젝트에서는 실제 API 서비스를 import
const mockCallApi = async (endpoint: string, params: any) => {
  // 실제 API 호출 시뮬레이션
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return {
    data: {
      userEventBanner: [
        {
          popupImg: '/images/banner1.jpg',
          popupAlt: '이벤트 배너 1',
          linkUrl: 'https://example.com/event1'
        },
        {
          popupImg: '/images/banner2.jpg', 
          popupAlt: '이벤트 배너 2',
          linkUrl: 'https://example.com/event2'
        }
      ]
    }
  };
};

/**
 * 이벤트 배너 데이터 타입
 */
interface EventBannerItem {
  popupImg: string;
  popupAlt: string;
  linkUrl?: string;
}

interface EventBannerProps {
  popupType?: string;
  maxCount?: number;
  className?: string;
}

/**
 * 이벤트 배너 컴포넌트
 * API에서 배너 목록을 가져와서 표시
 */
const EventBanner: React.FC<EventBannerProps> = ({ 
  popupType = 'J', 
  maxCount = 2,
  className = ''
}) => {
  const [banners, setBanners] = useState<EventBannerItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * 이벤트 배너 API 호출
   */
  const fetchEventBanners = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await mockCallApi('EVENT_BANNER', { popupType });
      
      if (response.data?.userEventBanner) {
        setBanners(response.data.userEventBanner.slice(0, maxCount));
      } else {
        setBanners([]);
      }
    } catch (err) {
      console.error('이벤트 배너 로딩 실패:', err);
      setError('이벤트 배너를 불러올 수 없습니다.');
      setBanners([]);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * 배너 클릭 핸들러
   */
  const handleBannerClick = (banner: EventBannerItem, e: React.MouseEvent) => {
    e.preventDefault();
    
    if (banner.linkUrl) {
      // 실제 링크가 있다면 새 창에서 열기
      window.open(banner.linkUrl, '_blank', 'noopener,noreferrer');
    } else {
      // 링크가 없다면 기본 동작 방지
      console.log('배너 클릭:', banner.popupAlt);
    }
  };

  // 컴포넌트 마운트 시 배너 로딩
  useEffect(() => {
    fetchEventBanners();
  }, [popupType, maxCount]);

  // 로딩 중 상태
  if (isLoading) {
    return (
      <div className={`advertiseWrap loading ${className}`}>
        <p>이벤트 배너 로딩 중...</p>
      </div>
    );
  }

  // 에러 상태
  if (error) {
    return (
      <div className={`advertiseWrap error ${className}`}>
        <p>{error}</p>
      </div>
    );
  }

  // 배너가 없는 경우
  if (banners.length === 0) {
    return null;
  }

  // 배너 렌더링
  return (
    <div className={`advertiseWrap ${className}`}>
      <ul className="clear">
        {banners.map((banner, index) => (
          <li key={index}>
            <a 
              href="#none" 
              onClick={(e) => handleBannerClick(banner, e)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleBannerClick(banner, e as any);
                }
              }}
              role="button"
              tabIndex={0}
              aria-label={`이벤트 배너: ${banner.popupAlt}`}
            >
              <img
                src={`${process.env.REACT_APP_CMS_PATH}${banner.popupImg}`}
                alt={banner.popupAlt}
                onError={(e) => {
                  // 이미지 로딩 실패 시 대체 처리
                  e.currentTarget.style.display = 'none';
                }}
              />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default React.memo(EventBanner);