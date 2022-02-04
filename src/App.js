import react, { useState, useEffect } from "react";
import "./App.css";
import { MemberRow } from "./components/MemberRow";
import { memberData } from "./services/mock_api";

function App() {
  const [members, setMembers] = useState(memberData);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [activities, setActivities] = useState(null);
  const [currentActivity, setCurrentActivity] = useState("");

  useEffect(() => {
    const currActivities = {};
    members.forEach((member) => {
      member.activities.forEach((activity) => {
        if (activity in currActivities) {
          currActivities[activity] += 1;
        } else {
          currActivities[activity] = 1;
        }
      });
    });
    setActivities(currActivities);
    console.log(currActivities);
  }, []);

  const membersSearch =
    search.length > 0
      ? members.filter((member) =>
          member.name.toLowerCase().includes(search.toLowerCase())
        )
      : members;

  const membersToShow =
    filter.length > 0
      ? membersSearch.filter((member) =>
          member.activities.includes(filter.toLowerCase())
        )
      : membersSearch;

  const removeMember = (id) => {
    const newMembers = members.filter((member) => member.id !== id);
    setMembers(newMembers);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className="App">
      <div className="App__Header">
        <h1 className="App__HeaderName">Outdoor Adventure Club</h1>
      </div>
      <div className="App__Container">
        <div className="App__input">
          Search: <input value={search} onChange={handleSearch} />
        </div>
        <div className="App__input">
          Filter:{" "}
          <input value={filter} onChange={(e) => setFilter(e.target.value)} />
        </div>
        {currentActivity.length > 0 ? (
          <div className="App__input">
            Activity Count for {currentActivity}: {activities[currentActivity]}
          </div>
        ) : (
          <p>*Click an activity to see the count</p>
        )}
        <div className="App__input"></div>
        <div className="App__list">
          {membersToShow.map((member) => (
            <MemberRow
              {...member}
              setCurrentActivity={setCurrentActivity}
              removeMember={removeMember}
              key={member.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
