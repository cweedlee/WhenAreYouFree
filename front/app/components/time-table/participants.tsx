import { AUTHTYPE, type ParticipantType } from "~/types/eventTypes";
import Callout from "../callout";

const className =
  "hover:underline-offset-1 hover:underline transition-all transition-duration-3000 animate-in";
function showName(participant: ParticipantType) {
  return participant?.username || participant?.email;
}

const Participants = ({
  participants,
}: {
  participants: ParticipantType[];
}) => {
  // const onHover = (e: React.MouseEvent<HTMLDivElement>) => {
  //   e.preventDefault();
  //   e.stopPropagation();
  //   const target = e.target as HTMLDivElement;
  //   console.log(target.dataset.email);
  //   const targetData = document.querySelector(
  //     `[data-user="${target.dataset.username}"]`
  //   ) as HTMLDivElement;
  //   if (targetData) {
  //     targetData.style.backgroundColor = "red";
  //   }
  // };

  return (
    <Callout className="w-full">
      <h3 className="text-sm text-gray-500">Participants</h3>
      <div className="grid w-full grid-cols-[repeat(auto-fit,minmax(8rem,1fr))] gap-2">
        {participants &&
          participants.length > 0 &&
          participants.map((participant, key) => (
            <p
              key={key}
              data-email={participant.email}
              className={className}
              // onMouseOver={onHover}
            >
              {showName(participant)}
            </p>
          ))}
      </div>
    </Callout>
  );
};

export default Participants;
