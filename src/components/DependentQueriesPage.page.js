import axios from "axios";
import React from "react";
import { useQuery } from "react-query";

const fetchUsersByEmail = (email) => {
  return axios.get(`http://localhost:4000/users/${email}`);
};

const fetchCoursesByChannelId = (channelId) => {
  return axios.get(`http://localhost:4000/channels/${channelId}`);
};

function DependentQueriesPagePage({ email }) {
  const { data: user } = useQuery(["user", email], () =>
    fetchUsersByEmail(email)
  );

  const channelId = user?.data.channelId;

  const { data: course } = useQuery(
    ["courses", channelId],
    () => fetchCoursesByChannelId(channelId),
    {
      enabled: !!channelId, //enables api call just after channelId has its value and isn't undefined
    }
  );

  return <div>DependentQueriesPagePage</div>;
}

export default DependentQueriesPagePage;
