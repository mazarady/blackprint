export default async (req, res) => {
  const queryParam = req.body.data;
  const getSourceCode = await fetch(
    `${process.env.STRAPI_PUBLIC_BASE_URL}/sharecode`
  );
  const getSourceCodeRes = await getSourceCode.json();
  const {
    data: {
      attributes: {
        url: { data },
      },
    },
  } = getSourceCodeRes;

  const sourceCode = data[0][queryParam];

  if (sourceCode) {
    res.status(200).send(JSON.stringify({ data: sourceCode }));
  }
  res.status(404).send();
};
