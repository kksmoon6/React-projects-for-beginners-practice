import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useParams } from 'react-router-dom';
import './RouterDemo.css';

// 1. 홈 페이지 컴포넌트
const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="page">
      <h2>🏠 홈 페이지</h2>
      <p>React Router 학습용 홈페이지입니다.</p>
      <div className="button-group">
        <button onClick={() => navigate('/about')}>
          About 페이지로 이동
        </button>
        <button onClick={() => navigate('/products')}>
          상품 목록으로 이동
        </button>
      </div>
    </div>
  );
};

// 2. About 페이지 컴포넌트
const About = () => {
  return (
    <div className="page">
      <h2>ℹ️ About 페이지</h2>
      <p>이 애플리케이션은 React Router 학습을 위한 예제입니다.</p>
      <div className="features">
        <h3>React Router 기능들:</h3>
        <ul>
          <li>페이지 간 이동 (Link, useNavigate)</li>
          <li>URL 파라미터 처리</li>
          <li>중첩 라우팅</li>
          <li>프로그래밍적 내비게이션</li>
        </ul>
      </div>
    </div>
  );
};

// 3. 상품 목록 페이지
const ProductList = () => {
  const products = [
    { id: 1, name: '노트북', price: 1200000 },
    { id: 2, name: '마우스', price: 50000 },
    { id: 3, name: '키보드', price: 120000 },
    { id: 4, name: '모니터', price: 300000 },
  ];

  return (
    <div className="page">
      <h2>🛍️ 상품 목록</h2>
      <div className="product-grid">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <h3>{product.name}</h3>
            <p className="price">{product.price.toLocaleString()}원</p>
            <Link to={`/products/${product.id}`} className="detail-link">
              상세보기
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

// 4. 상품 상세 페이지 (URL 파라미터 사용)
const ProductDetail = () => {
  const { id } = useParams(); // URL에서 파라미터 추출
  const navigate = useNavigate();
  
  const products = {
    1: { name: '노트북', price: 1200000, description: '고성능 게이밍 노트북' },
    2: { name: '마우스', price: 50000, description: '무선 게이밍 마우스' },
    3: { name: '키보드', price: 120000, description: '기계식 키보드' },
    4: { name: '모니터', price: 300000, description: '4K UHD 모니터' },
  };

  const product = products[id];

  if (!product) {
    return (
      <div className="page error-page">
        <h2>❌ 상품을 찾을 수 없습니다</h2>
        <button onClick={() => navigate('/products')}>
          상품 목록으로 돌아가기
        </button>
      </div>
    );
  }

  return (
    <div className="page">
      <h2>📱 상품 상세정보</h2>
      <div className="product-detail">
        <h3>{product.name}</h3>
        <p className="price">{product.price.toLocaleString()}원</p>
        <p className="description">{product.description}</p>
        <div className="button-group">
          <button onClick={() => navigate('/products')}>
            목록으로 돌아가기
          </button>
          <button onClick={() => navigate(-1)} className="back-btn">
            이전 페이지
          </button>
        </div>
      </div>
    </div>
  );
};

// 5. 404 Not Found 페이지
const NotFound = () => {
  const navigate = useNavigate();
  
  return (
    <div className="page error-page">
      <h2>🚫 404 - 페이지를 찾을 수 없습니다</h2>
      <p>요청하신 페이지가 존재하지 않습니다.</p>
      <button onClick={() => navigate('/')}>
        홈으로 돌아가기
      </button>
    </div>
  );
};

// 6. 내비게이션 컴포넌트
const Navigation = () => {
  return (
    <nav className="navigation">
      <div className="nav-brand">
        <Link to="/">🚀 Router Demo</Link>
      </div>
      <ul className="nav-links">
        <li><Link to="/">홈</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/products">상품목록</Link></li>
      </ul>
    </nav>
  );
};

// 7. 메인 Router 컴포넌트
const RouterDemo = () => {
  return (
    <div className="router-demo">
      <h1>🎯 React Router 학습</h1>
      
      <Router>
        <Navigation />
        
        <main className="main-content">
          <Routes>
            {/* 각 Route는 특정 path에서 보여줄 컴포넌트를 정의 */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="*" element={<NotFound />} /> {/* 404 처리 */}
          </Routes>
        </main>
      </Router>

      <div className="learning-notes">
        <h3>📚 학습 포인트:</h3>
        <ul>
          <li><strong>BrowserRouter:</strong> HTML5 History API를 사용한 라우터</li>
          <li><strong>Routes & Route:</strong> URL 경로와 컴포넌트 매핑</li>
          <li><strong>Link:</strong> 페이지 새로고침 없이 이동</li>
          <li><strong>useNavigate:</strong> 프로그래밍적 페이지 이동</li>
          <li><strong>useParams:</strong> URL 파라미터 추출</li>
          <li><strong>동적 라우팅:</strong> :id 같은 파라미터 사용</li>
        </ul>
      </div>
    </div>
  );
};

export default RouterDemo;