import './App.css';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';

const Page = ({ content }) => {
  return <h2>{content}</h2>;
};

const Header = () => (
  <header>
    <nav>대표 메뉴</nav>
    <Outlet></Outlet>
  </header>
);

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Header />}>
            <Route index element={<Page content={"나는 루트 '/'"} />} />
            {/* 4개의 하위 컴포넌트 중에 index가 붙은 것이 대표가 되기 때문에 나는 루트만 출력 */}
            <Route
              path="about"
              element={<Page content={"나는 about '/about'"} />}
            />
            <Route
              path="products"
              element={<Page content={"나는 products '/products'"} />}
            />
            <Route
              path="*"
              element={<Page content={'error! 잘못된 경로입니다.'} />} // * 은 와일드 카드. url값으로 정해진 값외에 올 경우 처리
            />
          </Route>
        </Routes>
        <div className="App">
          <h1>React Router V6</h1>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
