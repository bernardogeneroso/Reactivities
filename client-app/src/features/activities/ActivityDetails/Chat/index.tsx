import { MdEditNote } from "react-icons/md";

import { Container } from "./styles";

export default function Chat() {
  return (
    <Container>
      <header>Chat about this event</header>

      <div className="sub-container">
        <div className="chat-container">
          <div className="message-container">
            <img src="/assets/user.png" alt="User" />
            <div className="rest-side">
              <div className="header-message">
                <h3>Matt</h3>
                <span>Today at 5:42PM</span>
              </div>
              <div className="message">How artistic!</div>
              <button type="button">Reply</button>
            </div>
          </div>
          <div className="message-container">
            <img src="/assets/user.png" alt="User" />
            <div className="rest-side">
              <div className="header-message">
                <h3>Joe Mama</h3>
                <span>5 days ago</span>
              </div>
              <div className="message">
                Dude, this is awesome. Thanks so much
              </div>
              <button type="button">Reply</button>
            </div>
          </div>
        </div>

        <form>
          <textarea
            name=""
            cols={30}
            rows={10}
            placeholder="Write your message from here..."
          ></textarea>

          <button type="submit">
            <div className="icon">
              <MdEditNote size={20} />
            </div>
            <div className="text">Add reply</div>
          </button>
        </form>
      </div>
    </Container>
  );
}
