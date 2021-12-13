import { FiSearch } from "react-icons/fi";
import { Link } from "react-router-dom";

import { Container } from "./styles";

export default function NotFound() {
  return (
    <Container>
      <FiSearch size={60} />
      <h1>Oops - we've locked everywhere and could not find this.</h1>
      <Link to="/activities">
        <button>Return to activities page</button>
      </Link>
    </Container>
  );
}
