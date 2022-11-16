const qs = require("qs");
import jwt_decode from "jwt-decode";

export async function getUserSubmission(lab, jwt) {
  const { id } = jwt_decode(jwt);
  let fetchUser = await fetch(
    `${process.env.STRAPI_PUBLIC_BASE_URL}/users/${id}`,
    {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    }
  );
  let userJson = await fetchUser.json();
  const { username } = userJson;

  const userCodeQuery = qs.stringify(
    {
      filters: {
        lab: {
          slug: {
            $eq: lab,
          },
        },
        users_permissions_user: {
          username: {
            $eq: username,
          }
        },
      },
    },
    {
      encodeValuesOnly: true,
    }
  );

  const userSubmissionRes = await fetch(
    `${process.env.STRAPI_PUBLIC_BASE_URL}/submissionhistories?${userCodeQuery}`,
    {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    }
  );

  const userSubmishJson = await userSubmissionRes.json();
  const userData = userSubmishJson.data;
  let data = {}
  if (userData.length < 1) {
    data = {
      userSubmission: ''
    }
    return {
      data
    }
  }
  else {
    data = {
      userSubmission: userData[0].attributes.sourcecode,
    };

    return {
      data,
    };
  }
};
