import Button from "../../../../app/components/Button";
import { Container } from "./styles";

export default function Header() {
  return (
    <Container>
      <div className="content">
        <img src={`/assets/categoryImages/music.jpg`} alt="Music" />
        <div className="hover-image">
          <h1>Test mobx with redirect</h1>
          <span>2021-01-10</span>
          <span className="hostedBy">
            Hosted by <span>Bob</span>
          </span>
        </div>
      </div>
      <div className="footer">
        <div className="actions">
          <Button situation="default">Join activity</Button>
          <Button situation="none">Cancel attendance</Button>
        </div>
        <div className="rest-side">
          <Button situation="master">Manage event</Button>
        </div>
      </div>
    </Container>
  );
}
