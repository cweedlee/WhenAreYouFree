import Page from "~/components/page";

const infoPage = () => {
  return (
    <Page>
      <h1>WhenRUfree?</h1>
      <p>you can set schedule with your friends, collegues, and else....</p>
      <p>
        WhenRUfree is a <b>free</b> web application that helps you schedule
        events with your friends.
      </p>

      <li>expires 7 days after closed</li>
      <li>if email addr is provided, you can get available time via email.</li>
    </Page>
  );
};

export default infoPage;
