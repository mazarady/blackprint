const qs = require("qs");
import jwt_decode from "jwt-decode";

export default async (req, res) => {
  const { lab: labId, username, jwt, sourceCode } = req.body;
  const { id: userId } = jwt_decode(jwt);
  const userCodeQuery = qs.stringify(
    {
      filters: {
        lab: {
          id: {
            $eq: labId,
          },
        },
        users_permissions_user: {
          username: {
            $eq: username,
          },
        },
      },
    },
    {
      encodeValuesOnly: true,
    }
  );

  try {
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

    if (userData.length == 0) {
      const sourceCodeData = {
        users_permissions_user: userId,
        sourcecode: sourceCode,
        lab: labId,
      };
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify({ data: sourceCodeData }),
      };
      const userSubmissionReq = await fetch(
        `${process.env.STRAPI_PUBLIC_BASE_URL}/submissionhistories`,
        requestOptions
      );
      res.status(200).send(userSubmissionReq);
    } else {
      const putId = userData[0].id;
      const sourceCodeData = {
        users_permissions_user: userId,
        sourcecode: sourceCode,
        lab: labId,
      };
      const requestOptions = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify({ data: sourceCodeData }),
      };
      const putUserEditSubmission = await fetch(
        `${process.env.STRAPI_PUBLIC_BASE_URL}/submissionhistories/${putId}`,
        requestOptions
      );
      res.status(200).send(putUserEditSubmission);
    }
  } catch (err) {
    res.status(400).send();
  }
};
