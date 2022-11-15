const qs = require("qs");

export async function getClassData(slug, jwt) {
  const classQuery = qs.stringify(
    {
      filters: {
        slug: {
          $eq: slug,
        },
      },
      populate: "*",
    },
    {
      encodeValuesOnly: true,
    }
  );

  const labQuery = qs.stringify(
    {
      filters: {
        class: {
          slug: {
            $eq: slug,
          },
        },
      },
      populate: {
        instructions: {
          populate: ["videos"],
        },
      },
    },
    {
      encodeValuesOnly: true,
    }
  );

  const res = await fetch(
    `${process.env.STRAPI_PUBLIC_BASE_URL}/classes?${classQuery}`
  );
  const json = await res.json();
  const classData = json.data;

  const labRes = await fetch(
    `${process.env.STRAPI_PUBLIC_BASE_URL}/labs?${labQuery}`,
    {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    }
  );

  const labJson = await labRes.json();
  const labData = labJson.data;
  const data = {
    classData: classData,
    labData: labData,
  };

  return {
    data,
  };
}


export async function getCodeData(slug, lab, jwt) {
  const labQuery = qs.stringify(
    {
      filters: {
        class: {
          slug: {
            $eq: slug,
          },
        },
        slug: {
          $eq: lab
        }
      },
      populate: {
        instructions: {
          populate: ["videos"],
        },
        pythonfile: {
          populate: '%2A'
        }
      },
    },
    {
      encodeValuesOnly: true,
    }
  );

  const labRes = await fetch(
    `${process.env.STRAPI_PUBLIC_BASE_URL}/labs?${labQuery}`,
    {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    }
  );

  const labJson = await labRes.json();
  const labData = labJson.data;
  const data = {
    labData: labData,
  };

  return {
    data,
  };
}
