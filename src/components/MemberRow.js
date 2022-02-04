import React from "react";
import "./MemberRow.css";

export const MemberRow = ({
  id,
  age,
  name,
  rating,
  activities,
  setCurrentActivity,
  removeMember,
}) => {
  const handleClick = (e, activity) => {
    setCurrentActivity(activity);
  };

  return (
    <div className="MemberRow__container">
      <div className="MemberRow__info">
        Name: {name}, Age: {age}, Rating: {rating}, Activities:{" "}
        {activities.map((activity) => (
          <b key={activity}>
            <button
              className="MemberRow__activityButton"
              onClick={(e) => handleClick(e, activity)}
            >
              {activity}
            </button>
            ,
          </b>
        ))}{" "}
      </div>
      <div className="MemberRow__info">
        <button
          className="MemberRow__cancelButton"
          onClick={() => removeMember(id)}
        >
          X
        </button>
      </div>
    </div>
  );
};
