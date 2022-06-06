const qs = require('qs');


export async function getAllClassIds() {
  const res = await fetch('https://frozen-depths-76264.herokuapp.com/api/classes');
  const data = await res.json();
  const params = data.data.map((lab) => {
    const slug = lab.attributes['slug'];
    return {
      params: {
        slug: slug,
      },
    };
  });

  return params;

}




export async function getClassData(slug) {
  const classQuery = qs.stringify({
    filters: {
      slug: {
        $eq: slug,
      },
    },
    populate: '*',
  }, {
    encodeValuesOnly: true,
  });

  const labQuery = qs.stringify({
    filters: {
      class: {
        slug: {
          $eq: slug,
        },
      },
    },
    populate: '*',
  }, {
    encodeValuesOnly: true,
  });

  const res = await fetch(`https://frozen-depths-76264.herokuapp.com/api/classes?${classQuery}`);
  const json = await res.json();
  const classData = json.data;


  const labRes = await fetch(`https://frozen-depths-76264.herokuapp.com/api/labs?${labQuery}`)
  const labJson = await labRes.json();
  const labData = labJson.data;
  const data = {
    classData: classData,
    labData: labData
  }

  return {
    data,
  };
}
