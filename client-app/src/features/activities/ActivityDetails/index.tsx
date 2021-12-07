import Chat from "./Chat";
import Header from "./Header";
import Information from "./Information";
import SideBar from "./SideBar";

import { Container } from "./styles";

export default function ActivityDetails() {
  return (
    <Container>
      <Header />
      <Information />
      <Chat />
      <SideBar />
    </Container>
  );
}
