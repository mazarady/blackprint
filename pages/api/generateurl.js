export default async (req, res) => {
  const hashedCode = req.body.data;
  const genUrl = await fetch(`${process.env.STRAPI_PUBLIC_BASE_URL}/sharecode`);
  const genUrlRes = await genUrl.json();
  const {
    data: {
      attributes: {
        url: { data },
      },
    },
  } = genUrlRes;
  const length = Object.keys(data[0]).length + 1;
  const encodedKey = btoa(length.toString());
  const body = {
    data: { url: { data: [{ ...data[0], [encodedKey]: hashedCode }] } },
  };

  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  };

  const addNewCode = await fetch(
    `${process.env.STRAPI_PUBLIC_BASE_URL}/sharecode`,
    requestOptions
  );

  if (genUrlRes) {
    res.status(200).send(JSON.stringify({ data: encodedKey }));
  }
  res.status(400).send();
};
