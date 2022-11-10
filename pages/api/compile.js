import { PythonShell } from "python-shell";

export default async (req, res) => {
  const sourceCode = JSON.parse(req.body);
  PythonShell.runString(sourceCode, null, function (err, results) {
    try {
      if (err) throw err;
      const resultsToJson = JSON.stringify(results);
      res.status(200).send(resultsToJson);
    } catch (err) {
      const errorMessage = JSON.stringify(err.message);
      res.status(400).send(errorMessage);
    }
  });
};
