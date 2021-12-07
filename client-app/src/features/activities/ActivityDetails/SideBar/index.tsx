import { Container } from "./styles";

export default function SideBar() {
  return (
    <Container>
      <header>3 people going</header>

      <div className="container-people">
        <div className="content">
          <div className="left-side">
            <img src="/assets/user.png" alt="User" />
          </div>
          <div className="rest-side">
            <h3>Bob</h3>
            <span>Following</span>
          </div>
          <div className="hosted">
            <span>Host</span>
          </div>
        </div>
        <div className="content">
          <div className="left-side">
            <img src="/assets/user.png" alt="User" />
          </div>
          <div className="rest-side">
            <h3>Bob</h3>
            <span>Following</span>
          </div>
        </div>
      </div>
    </Container>
  );
}
